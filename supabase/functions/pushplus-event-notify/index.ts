import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';
import { eventTitle, eventContent } from './rules.ts';
const schema = z.object({ event_id: z.string().uuid() });
const respond = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
});
Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
  let eventId: string | undefined;
  let db: ReturnType<typeof createClient> | undefined;
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return respond({ error: 'Invalid event reference' }, 400);
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const token = Deno.env.get('PUSHPLUS_TOKEN');
    if (!url || !key || !token) return respond({ error: 'Notification configuration missing' }, 503);
    db = createClient(url, key);
    eventId = parsed.data.event_id;
    // Only server-created opaque event references can be consumed. No client
    // message content, event type or recipient is accepted.
    const { data: event, error } = await db.from('pushplus_events')
      .update({ status: 'sending' }).eq('id', eventId).eq('status', 'pending')
      .select('event_type, created_at').maybeSingle();
    if (error) return respond({ error: 'Event claim failed' }, 503);
    if (!event) return respond({ status: 'not_pending' });
    const title = eventTitle(event.event_type);
    if (!title) return respond({ error: 'Unsupported event' }, 400);
    const response = await fetch('https://www.pushplus.plus/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, topic: 'Solution Website', channel: 'wechat',
        title, content: eventContent(event.event_type, event.created_at), template: 'txt' }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    const accepted = response.ok && result.code === 200;
    await db.from('pushplus_events').update({ status: accepted ? 'submitted' : 'failed',
      provider_reference: accepted && typeof result.data === 'string' ? result.data : null }).eq('id', eventId);
    console.log('PushPlus business event', event.event_type, accepted ? 'submitted' : 'failed');
    return respond({ status: accepted ? 'submitted' : 'failed', provider_code: result.code }, accepted ? 200 : 502);
  } catch {
    if (db && eventId) await db.from('pushplus_events').update({ status: 'unknown' }).eq('id', eventId).eq('status', 'sending');
    console.error('PushPlus event outcome unavailable; no automatic replay');
    return respond({ error: 'Notification outcome unavailable' }, 503);
  }
});