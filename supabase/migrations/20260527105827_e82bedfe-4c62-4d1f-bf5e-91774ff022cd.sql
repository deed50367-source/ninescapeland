
-- 1. Remove sensitive tables from realtime publication
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='chat_messages') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.chat_messages';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname='supabase_realtime' AND schemaname='public' AND tablename='chat_sessions') THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime DROP TABLE public.chat_sessions';
  END IF;
END $$;

-- 2. Tighten chat_sessions INSERT policy: require well-formed session_id
DROP POLICY IF EXISTS "Anyone can create chat sessions" ON public.chat_sessions;
CREATE POLICY "Anyone can create chat sessions"
ON public.chat_sessions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND assigned_to IS NULL
  AND notes IS NULL
  AND session_id IS NOT NULL
  AND length(session_id) BETWEEN 16 AND 128
);

-- 3. Tighten chat_messages INSERT policy: require existing session
DROP POLICY IF EXISTS "Anyone can insert own chat messages" ON public.chat_messages;
CREATE POLICY "Anyone can insert own chat messages"
ON public.chat_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (is_staff_reply IS NULL OR is_staff_reply = false)
  AND session_id IS NOT NULL
  AND length(session_id) BETWEEN 16 AND 128
  AND EXISTS (SELECT 1 FROM public.chat_sessions s WHERE s.session_id = chat_messages.session_id)
);

-- 4. Lock down trigger-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- 5. Restrict storage listing on public 'assets' bucket (objects remain publicly readable by URL)
DROP POLICY IF EXISTS "Public can list assets" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can list assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Allow public read of individual objects (needed for public bucket URL access)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname='storage' AND tablename='objects' 
      AND policyname='Public read assets objects'
  ) THEN
    CREATE POLICY "Public read assets objects"
    ON storage.objects
    FOR SELECT
    TO anon, authenticated
    USING (bucket_id = 'assets' AND name IS NOT NULL);
  END IF;
END $$;
