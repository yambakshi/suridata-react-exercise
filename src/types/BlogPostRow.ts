import { BlogLanguage } from "../enums";

export type BlogPostRow = {
    id: string;
    title: { [key in BlogLanguage]: string };
    body: { [key in BlogLanguage]: string };
    thumbsUp: boolean;
    thumbsDown: boolean;
}