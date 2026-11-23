#!/usr/bin/env python3
"""Revision-bound Hostinger acceptance. No credentials; uses public HTTP only."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import sys
import time
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

ORIGIN = 'https://indoorplaygroundsolution.com'
ASSET_ORIGIN = 'https://ninescapeland.lovable.app'

class PageEvidence(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.language = ''
        self.tags = {}
        self.h1 = []
        self.schemas = []
        self.assets = set()
        self.text = []
        self.active = None
        self.depth = 0
        self.skip = 0
        self.body = False
        self.head = False
        self.buffer = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.language = a.get('lang', '')
        if tag == 'head': self.head = True
        if tag == 'body': self.body = True
        if tag == 'meta' and self.head:
            key = a.get('name') or a.get('property')
            if key in ('description', 'og:title', 'og:description', 'og:url', 'og:type', 'twitter:card', 'twitter:title', 'twitter:description', 'robots'):
                self.tags.setdefault(key, []).append(a.get('content', ''))
        if tag == 'link' and self.head:
            if a.get('rel') == 'canonical': self.tags.setdefault('canonical', []).append(a.get('href', ''))
            if a.get('rel') == 'alternate' and 'hreflang' in a:
                self.tags.setdefault('alternate:' + a['hreflang'], []).append(a.get('href', ''))
        for key in ('src', 'href'):
            path = a.get(key, '').split('?')[0]
            if path.startswith('/assets/') and path.endswith(('.js', '.css')): self.assets.add(path)
            if path.startswith('/__l5e/assets-v1/'): self.assets.add(path)
        if self.active: self.depth += 1
        elif (tag == 'title' and self.head) or tag == 'h1' or (tag == 'script' and a.get('type') == 'application/ld+json'):
            self.active = tag
            self.depth = 1
            self.buffer = []
        if tag in ('script', 'style'): self.skip += 1

    def handle_endtag(self, tag):
        if self.active:
            # H1 inline spans nest; HTML void elements are not expected in these fields.
            self.depth -= 1
            if self.depth == 0:
                value = ''.join(self.buffer)
                if self.active == 'title': self.tags.setdefault('title', []).append(value.strip())
                elif self.active == 'h1': self.h1.append(' '.join(value.split()))
                else: self.schemas.append(json.loads(value))
                self.active = None
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
        if tag == 'head': self.head = False
        if tag == 'body': self.body = False

    def handle_data(self, data):
        if self.active: self.buffer.append(data)
        if self.body and not self.skip: self.text.append(data)

    def result(self):
        return dict(language=self.language, tags=self.tags, h1=self.h1,
                    schemas=sorted(json.dumps(x, sort_keys=True, ensure_ascii=False) for x in self.schemas),
                    body_text=' '.join(' '.join(self.text).split()))

def evidence(html):
    parser = PageEvidence()
    parser.feed(html)
    return parser.result(), parser.assets

def digest(data): return hashlib.sha256(data).hexdigest()

def request(url, max_bytes=None):
    headers = {'User-Agent': 'NinescapeLand-Deployment-Acceptance/1.0', 'Cache-Control': 'no-cache'}
    with urlopen(Request(url, headers=headers), timeout=25) as response:
        data = response.read() if max_bytes is None else response.read(max_bytes)
        return response.status, response.headers.get('Content-Type', ''), data

def local_errors(route, page):
    errors = []
    lang = route.split('/')[1] if route.split('/')[1] in ('ar', 'de', 'es', 'pt', 'fr') else 'en'
    if page['language'] != lang: errors.append('language')
    for key in ('title', 'description', 'canonical', 'og:title', 'og:description', 'og:url', 'og:type', 'twitter:card'):
        values = page['tags'].get(key, [])
        if len(values) != 1 or not values[0].strip(): errors.append(key)
    if page['tags'].get('canonical') != [ORIGIN + route]: errors.append('canonical route')
    if len(page['h1']) != 1 or not page['h1'][0]: errors.append('H1')
    if not page['schemas']: errors.append('JSON-LD')
    return errors

def media(dist):
    for pointer in Path('src').rglob('*.asset.json'):
        asset = json.loads(pointer.read_text())
        path = asset['url']
        if not path.startswith('/__l5e/assets-v1/'): continue
        if '..' in path.split('/') or urlsplit(path).query: raise ValueError('Unsafe asset pointer')
        status, content_type, data = request(ASSET_ORIGIN + path)
        if status != 200 or len(data) != asset['size'] or 'text/html' in content_type:
            raise ValueError(f'Invalid CDN delivery for {pointer.name}')
        destination = dist / path.lstrip('/')
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(data)
        print(f'Staged {pointer.name}: {len(data)} bytes')

def manifest(dist, revision):
    pages, assets = {}, set()
    for file in sorted(dist.rglob('index.html')):
        relative = file.relative_to(dist).parent.as_posix()
        route = '/' if relative == '.' else '/' + relative
        page, linked = evidence(file.read_text())
        problems = local_errors(route, page)
        if problems: raise ValueError(f'Invalid capture {route}: {problems}')
        pages[route] = page
        assets.update(linked)
    if not pages: raise ValueError('No captured pages')
    for file in (dist / '__l5e').rglob('*') if (dist / '__l5e').exists() else []:
        if file.is_file(): assets.add('/' + file.relative_to(dist).as_posix())
    for path in ('/sitemap.xml', '/assets/prerender-styles.css'):
        if (dist / path.lstrip('/')).exists(): assets.add(path)
    result = dict(revision=revision, pages=pages,
                  assets={path: digest((dist / path.lstrip('/')).read_bytes()) for path in sorted(assets)})
    # Do not publish the detailed content inventory; only the release revision goes live.
    Path('deployment-manifest.json').write_text(json.dumps(result, ensure_ascii=False))
    (dist / 'deployment-version.json').write_text(json.dumps({'revision': revision, 'routes': len(pages)}))
    print(f'Manifest: {len(pages)} captures, {len(assets)} assets, revision {revision}')

def differences(expected, actual):
    return [key for key in expected if expected[key] != actual.get(key)]

def verify(manifest_file, report_file):
    inventory = json.loads(Path(manifest_file).read_text())
    revision = inventory['revision']
    report = dict(revision=revision, origin=ORIGIN, results=[], failures=[])
    def checked(item):
        kind, path, expected = item
        error = ''
        for attempt in range(3):
            try:
                status, content_type, data = request(ORIGIN + path)
                if status != 200: raise ValueError(f'HTTP {status}')
                if kind == 'revision':
                    if json.loads(data).get('revision') != revision: raise ValueError('Deployed revision mismatch')
                elif kind == 'page':
                    if 'text/html' not in content_type: raise ValueError('Not HTML')
                    actual, _ = evidence(data.decode('utf-8'))
                    mismatch = differences(expected, actual)
                    if mismatch: raise ValueError('Mismatch: ' + ', '.join(mismatch))
                else:
                    if digest(data) != expected: raise ValueError('Asset checksum mismatch')
                return dict(kind=kind, path=path, passed=True)
            except Exception as exc:
                error = str(exc)
                if attempt < 2: time.sleep(2 * (attempt + 1))
        return dict(kind=kind, path=path, passed=False, error=error)
    items = [('revision', '/deployment-version.json', None)]
    items += [('page', path, expected) for path, expected in inventory['pages'].items()]
    items += [('asset', path, expected) for path, expected in inventory['assets'].items()]
    with ThreadPoolExecutor(max_workers=3) as pool:
        for result in pool.map(checked, items):
            report['results'].append(result)
            if not result['passed']:
                report['failures'].append(result)
                print('FAIL', result['path'], result['error'])
    for prefix in ('', '/ar'):
        path = prefix + '/deployment-nonexistent-' + revision[:12]
        try:
            status, _, _ = request(ORIGIN + path)
        except HTTPError as exc: status = exc.code
        except Exception: status = 0
        result = dict(kind='404', path=path, passed=status == 404, status=status)
        report['results'].append(result)
        if not result['passed']: report['failures'].append(result)
    Path(report_file).write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print(f"Production acceptance: {len(report['results']) - len(report['failures'])}/{len(report['results'])} passed")
    if report['failures']: raise ValueError('Production acceptance failed; see report')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['media', 'manifest', 'verify'])
    parser.add_argument('--dist', default='dist')
    parser.add_argument('--revision', default='')
    parser.add_argument('--manifest', default='deployment-manifest.json')
    parser.add_argument('--report', default='production-acceptance.json')
    args = parser.parse_args()
    try:
        if args.action == 'media': media(Path(args.dist))
        elif args.action == 'manifest':
            if not args.revision: raise ValueError('Revision required')
            manifest(Path(args.dist), args.revision)
        else: verify(args.manifest, args.report)
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
