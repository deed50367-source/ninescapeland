-- Create quick reply templates table
CREATE TABLE public.quick_reply_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quick_reply_templates ENABLE ROW LEVEL SECURITY;

-- Staff and admins can view templates
CREATE POLICY "Staff and admins can view templates"
ON public.quick_reply_templates
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Staff and admins can insert templates
CREATE POLICY "Staff and admins can insert templates"
ON public.quick_reply_templates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Staff and admins can update templates
CREATE POLICY "Staff and admins can update templates"
ON public.quick_reply_templates
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Admins can delete templates
CREATE POLICY "Admins can delete templates"
ON public.quick_reply_templates
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_quick_reply_templates_updated_at
BEFORE UPDATE ON public.quick_reply_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for category
CREATE INDEX idx_quick_reply_templates_category ON public.quick_reply_templates(category);

-- Insert some default templates
INSERT INTO public.quick_reply_templates (title, content, category, sort_order) VALUES
('欢迎语', '您好！感谢您联系我们，请问有什么可以帮助您的？', '常用', 1),
('稍等片刻', '请稍等，我正在为您查询相关信息...', '常用', 2),
('转接专员', '您的问题需要专业人员处理，我将为您转接相关专员，请稍候。', '常用', 3),
('感谢咨询', '感谢您的咨询！如有其他问题，欢迎随时联系我们。祝您生活愉快！', '常用', 4),
('产品咨询', '我们提供室内游乐场、蹦床公园、软体游乐设施和忍者障碍课程等多种产品。请问您对哪种产品感兴趣？', '产品', 5),
('报价说明', '关于报价，我们需要了解您的场地面积、预期项目类型和预算范围。方便告诉我们这些信息吗？', '产品', 6),
('联系方式', '您可以通过以下方式联系我们：邮箱 info@example.com，或填写网站上的询价表单。', '联系', 7);