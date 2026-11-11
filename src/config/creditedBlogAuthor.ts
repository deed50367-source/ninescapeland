import { novemberBlogAuthor } from "./novemberBlogMatrix";
import { november11BlogAuthor } from "./november11BlogMatrix";

export function creditedBlogAuthor(slug: string | undefined): string | undefined {
  return november11BlogAuthor(slug) ?? novemberBlogAuthor(slug);
}