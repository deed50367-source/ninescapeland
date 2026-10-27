import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';
import { shouldNotify, notificationContent } from './rules.ts';

const schema = z.object({ message_id: z.string().uuid(), session_id: z.string().min(16).max(128) });
const respond = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
});

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return respond({ error: 'Invalid notification reference' }, 400);
    const url = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const token = Deno.env.get('PUSHPLUS_TOKEN');
    if (!url || !serviceKey || !token) return respond({ error: 'Notification configuration missing' }, 503);
    const db = createClient(url, serviceKey);
    // The unguessable message/session pair is a capability reference, not a
    // user-supplied notification. Read persisted rows; never forward request text.
    const { data: message, error } = await db.from('chat_messages')
      .select('id, role, is_staff_reply, created_at')
      .eq('id', parsed.data.message_id).eq('session_id', parsed.data.session_id).maybeSingle();
    if (error) return respond({ error: 'Message lookup failed' }, 503);
    if (!message || !shouldNotify(message)) return respond({ error: 'Message not eligible' }, 404);
    const { error: claimError } = await db.from('chat_push_notifications').insert({ message_id: message.id });
    if (claimError?.code === '23505') return respond({ status: 'already_processed' });
    if (claimError) return respond({ error: 'Notification claim failed' }, 503);
    const push = await fetch('https://www.pushplus.plus/send', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, topic: 'Solution Website', channel: 'wechat',
        title: '网站访客新消息', content: notificationContent(message.created_at), template: 'txt' }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await push.json();
    const accepted = push.ok && result.code === 200;
    await db.from('chat_push_notifications').update({
      status: accepted ? 'submitted' : 'failed',
      provider_reference: accepted && typeof result.data === 'string' ? result.data : null,
    }).eq('message_id', message.id);
    // Never log provider payloads: they can contain credential-bearing details.
    console.log('PushPlus visitor notification', accepted ? 'submitted' : 'failed', message.id);
    return respond({ status: accepted ? 'submitted' : 'failed', provider_code: result.code }, accepted ? 200 : 502);
  } catch {
    console.error('PushPlus notification failed without automatic replay');
    return respond({ error: 'Notification outcome unavailable' }, 503);
  }
});