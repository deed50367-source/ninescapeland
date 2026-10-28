import { MessageResponse } from '@/components/ai-elements/message';

/** Shared, safe markdown presentation for customer-service replies. */
export function ChatMessageContent({ content, role }: { content: string; role: string }) {
  if (role === 'user') {
    return <p className="text-sm whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{content}</p>;
  }

  return (
    <MessageResponse
      mode="static"
      controls={false}
      skipHtml
      className="min-w-0 text-sm leading-relaxed break-words [overflow-wrap:anywhere] [&_p]:my-2 [&_h1]:my-2 [&_h1]:text-base [&_h2]:my-2 [&_h2]:text-base [&_h3]:my-2 [&_h3]:text-sm [&_h4]:my-2 [&_h4]:text-sm [&_h5]:text-sm [&_h6]:text-sm [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:ps-5 [&_li]:my-1 [&_strong]:font-semibold [&_a]:text-inherit [&_a]:underline [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_table]:text-xs"
    >
      {content}
    </MessageResponse>
  );
}