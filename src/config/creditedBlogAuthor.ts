import { novemberBlogAuthor } from "./novemberBlogMatrix";
import { november11BlogAuthor } from "./november11BlogMatrix";
import { november18BlogAuthor } from "./november18BlogMatrix";

export function creditedBlogAuthor(slug: string | undefined): string | undefined {
  return november18BlogAuthor(slug) ?? november11BlogAuthor(slug) ?? novemberBlogAuthor(slug);
}