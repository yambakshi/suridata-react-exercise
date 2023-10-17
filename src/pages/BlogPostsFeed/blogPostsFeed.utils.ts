import { BlogPost, BlogPostRow } from "../../types";
import { BlogLanguage } from "../../enums";


export const formatBlogPosts = (data: BlogPost[]): BlogPostRow[] => {
    return data.map(({ id, title, body }) => ({
        id,
        title: {
            [BlogLanguage.English]: title,
            [BlogLanguage.Spanish]: '',
            [BlogLanguage.French]: ''
        },
        body: {
            [BlogLanguage.English]: body,
            [BlogLanguage.Spanish]: '',
            [BlogLanguage.French]: ''
        },
        thumbsUp: false,
        thumbsDown: false
    }));
}