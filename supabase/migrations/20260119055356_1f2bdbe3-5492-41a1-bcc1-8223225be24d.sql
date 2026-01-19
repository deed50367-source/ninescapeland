-- Create chat_sessions table to track session status
CREATE TABLE public.chat_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id text UNIQUE NOT NULL,
    status text NOT NULL DEFAULT 'new',
    assigned_to uuid REFERENCES auth.users(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    last_message_at timestamp with time zone DEFAULT now(),
    notes text
);

-- Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_sessions
CREATE POLICY "Staff and admins can view chat sessions"
ON public.chat_sessions
FOR SELECT
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff and admins can insert chat sessions"
ON public.chat_sessions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Staff and admins can update chat sessions"
ON public.chat_sessions
FOR UPDATE
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Create index for faster lookups
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX idx_chat_sessions_session_id ON public.chat_sessions(session_id);

-- Enable realtime for chat_sessions
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;