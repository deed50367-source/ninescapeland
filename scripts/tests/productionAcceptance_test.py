import importlib.util
from pathlib import Path
import unittest
spec = importlib.util.spec_from_file_location('production_acceptance', Path(__file__).resolve().parents[1] / 'production_acceptance.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ProductionAcceptanceTests(unittest.TestCase):
    def test_svg_accessibility_title_is_not_page_seo_title(self):
        page, _ = module.evidence('<html lang="ar"><head><title>المشاريع | NinescapeLand</title></head><body><h1>قصص نجاح عالمية</h1><svg><title>استكشف انتشارنا العالمي</title></svg></body></html>')
        self.assertEqual(page['tags']['title'], ['المشاريع | NinescapeLand'])
        self.assertEqual(page['h1'], ['قصص نجاح عالمية'])
    def test_real_duplicate_head_titles_still_fail(self):
        page, _ = module.evidence('<html lang="ar"><head><title>Projects</title><title>Home</title></head><body><h1>Projects</h1></body></html>')
        self.assertIn('title', module.local_errors('/ar/projects', page))
    def test_svg_title_cannot_substitute_for_missing_head_title(self):
        page, _ = module.evidence('<html lang="ar"><head></head><body><h1>Projects</h1><svg><title>World map</title></svg></body></html>')
        self.assertIn('title', module.local_errors('/ar/projects', page))
    def test_stale_metadata_fails_acceptance(self):
        expected = {'language': 'pt', 'tags': {'title': ['Contact'], 'canonical': [module.ORIGIN + '/pt/contact']}, 'h1': ['Contact']}
        actual = {**expected, 'tags': {'title': ['Home'], 'canonical': [module.ORIGIN + '/']}}
        self.assertEqual(module.differences(expected, actual), ['tags'])
    def test_wrong_language_fails_acceptance(self):
        self.assertEqual(module.differences({'language': 'ar'}, {'language': 'en'}), ['language'])
    def test_old_body_and_schema_fail_acceptance(self):
        self.assertEqual(module.differences({'body_text': 'Updated content', 'schemas': ['updated']}, {'body_text': 'Old content', 'schemas': ['old']}), ['body_text', 'schemas'])
    def test_changed_asset_has_different_digest(self):
        self.assertNotEqual(module.digest(b'current equipment video'), module.digest(b'old equipment video'))

    def test_cdn_resized_jpeg_is_accepted(self):
        self.assertTrue(module.image_ok('/__l5e/a/trampoline.jpg', 'image/jpeg', b'\xff\xd8\xff' + b'0' * 600))
    def test_html_served_for_image_fails(self):
        self.assertFalse(module.image_ok('/__l5e/a/trampoline.jpg', 'text/html', b'<!doctype html>' + b'0' * 600))
    def test_truncated_image_fails(self):
        self.assertFalse(module.image_ok('/__l5e/a/ninja.jpg', 'image/jpeg', b'\xff\xd8\xff'))

if __name__ == '__main__': unittest.main()
