CREATE TABLE public.pushplus_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), event_type text NOT NULL, dedupe_key text NOT NULL UNIQUE, created_at timestamptz NOT NULL DEFAULT now(), status text NOT NULL DEFAULT 'pending', provider_reference text);
GRANT ALL ON public.pushplus_events TO service_role;
ALTER TABLE public.pushplus_events ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.dispatch_pushplus_event() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN
PERFORM net.http_post(url := 'https://gianldlquknsdhfpqqfe.supabase.co/functions/v1/pushplus-event-notify', headers := '{"Content-Type":"application/json"}'::jsonb, body := jsonb_build_object('event_id', NEW.id), timeout_milliseconds := 10000);
RETURN NEW;
EXCEPTION WHEN OTHERS THEN RAISE WARNING 'PushPlus event enqueue failed'; RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.dispatch_pushplus_event() FROM PUBLIC;
CREATE TRIGGER dispatch_pushplus_event AFTER INSERT ON public.pushplus_events FOR EACH ROW EXECUTE FUNCTION public.dispatch_pushplus_event();
CREATE OR REPLACE FUNCTION public.capture_pushplus_business_events() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN
IF TG_TABLE_NAME = 'inquiries' THEN
INSERT INTO public.pushplus_events(event_type,dedupe_key) VALUES ('new_inquiry','inquiry:' || NEW.id) ON CONFLICT DO NOTHING;
ELSIF TG_TABLE_NAME = 'chat_messages' THEN
IF NEW.role='user' AND NOT COALESCE(NEW.is_staff_reply,false) THEN
IF NEW.content ~* '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}' OR NEW.content ~ '\+?[0-9][0-9 ()-]{7,}[0-9]' THEN
INSERT INTO public.pushplus_events(event_type,dedupe_key) VALUES ('lead_captured','lead:' || NEW.session_id) ON CONFLICT DO NOTHING;
END IF;
IF NEW.content ~* '(human|live agent|sales consultant|real person|人工|真人)' THEN
INSERT INTO public.pushplus_events(event_type,dedupe_key) VALUES ('handoff_requested','handoff-request:' || NEW.session_id) ON CONFLICT DO NOTHING;
END IF;
ELSIF COALESCE(NEW.is_staff_reply,false) THEN
INSERT INTO public.pushplus_events(event_type,dedupe_key) VALUES ('human_joined','human-joined:' || NEW.session_id) ON CONFLICT DO NOTHING;
END IF;
ELSIF TG_TABLE_NAME='chat_sessions' THEN
IF NEW.assigned_to IS NOT NULL AND OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
INSERT INTO public.pushplus_events(event_type,dedupe_key) VALUES ('human_joined','human-joined:' || NEW.session_id) ON CONFLICT DO NOTHING;
END IF;
END IF;
RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.capture_pushplus_business_events() FROM PUBLIC;
CREATE TRIGGER pushplus_new_inquiry AFTER INSERT ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.capture_pushplus_business_events();
CREATE TRIGGER pushplus_chat_business_events AFTER INSERT ON public.chat_messages FOR EACH ROW EXECUTE FUNCTION public.capture_pushplus_business_events();
CREATE TRIGGER pushplus_human_assignment AFTER UPDATE OF assigned_to ON public.chat_sessions FOR EACH ROW EXECUTE FUNCTION public.capture_pushplus_business_events();