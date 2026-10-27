CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE TABLE public.chat_push_notifications (message_id uuid PRIMARY KEY REFERENCES public.chat_messages(id) ON DELETE CASCADE, status text NOT NULL DEFAULT 'pending', provider_reference text, created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.chat_push_notifications TO service_role;
ALTER TABLE public.chat_push_notifications ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.notify_visitor_chat_message() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$ BEGIN
IF NEW.role = 'user' AND COALESCE(NEW.is_staff_reply,false) = false THEN
PERFORM net.http_post(url := 'https://gianldlquknsdhfpqqfe.supabase.co/functions/v1/pushplus-chat-notify', headers := '{"Content-Type":"application/json"}'::jsonb, body := jsonb_build_object('message_id',NEW.id,'session_id',NEW.session_id), timeout_milliseconds := 10000);
END IF;
RETURN NEW;
EXCEPTION WHEN OTHERS THEN RAISE WARNING 'Visitor notification enqueue failed'; RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.notify_visitor_chat_message() FROM PUBLIC;
CREATE TRIGGER pushplus_visitor_message AFTER INSERT ON public.chat_messages FOR EACH ROW EXECUTE FUNCTION public.notify_visitor_chat_message();