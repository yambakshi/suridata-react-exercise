import { Language } from "../enums";

export type BlogPostRow = {
    id: string;
    title: { [key in Language]: string };
    body: { [key in Language]: string };
    thumbsUp: boolean;
    thumbsDown: boolean;
}