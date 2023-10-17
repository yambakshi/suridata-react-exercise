import { BlogPostRow } from "../types";
import React from "react";

export const BlogPostsContext = React.createContext<{
    blogPostsRows: BlogPostRow[],
    loading: boolean,
    setBlogPostsRows: Function
}>({ blogPostsRows: [], loading: true, setBlogPostsRows: () => { } });