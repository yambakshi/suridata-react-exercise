import { BlogPost, BlogPostRow } from "../../common/types";
import { Language } from "../../common/enums";

export const formatBlogPosts = (data: BlogPost[]): BlogPostRow[] => {
    return data.map(({ id, title, body }) => ({
        id,
        title: {
            [Language.English]: title,
            [Language.Spanish]: '',
            [Language.French]: ''
        },
        body: {
            [Language.English]: body,
            [Language.Spanish]: '',
            [Language.French]: ''
        },
        thumbsUp: false,
        thumbsDown: false
    }));
}