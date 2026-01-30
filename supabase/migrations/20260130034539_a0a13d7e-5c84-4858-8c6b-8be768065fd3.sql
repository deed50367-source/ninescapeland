-- Step 1: Drop ALL existing SELECT/UPDATE policies first
DROP POLICY IF EXISTS "Staff can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admin and staff can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Only authenticated staff and admins can view chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admins can view all chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can view assigned chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admin and staff can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff and admins can update chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Admins can update all chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Staff can update assigned chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update own session" ON public.chat_sessions;

DROP POLICY IF EXISTS "Staff can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin and staff can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff and admins can view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff can view assigned inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admin and staff can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff and admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Only admin and staff can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Staff can update assigned inquiries" ON public.inquiries;