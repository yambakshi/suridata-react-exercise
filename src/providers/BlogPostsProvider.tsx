import { BlogPostsContext } from '../context/BlogPostsContext';
import { BlogPost, BlogPostRow } from '../types';
import React, { ReactElement } from 'react';
import { BlogLanguage } from '../enums';
import axios from 'axios';


const formatData = (data: BlogPost[]): BlogPostRow[] => {
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

export const BlogPostsProvider = ({ children }: { children: ReactElement }) => {
    const [blogPostsRows, setBlogPostsRows] = React.useState<BlogPostRow[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('https://my.api.mockaroo.com/posts', {
            headers: {
                'X-API-Key': '04d55c10',
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => {
            const blogPostsRows = formatData(data);
            setBlogPostsRows(blogPostsRows);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }, []);

    return (
        <BlogPostsContext.Provider value={{ blogPostsRows, loading, setBlogPostsRows }}>
            {children}
        </BlogPostsContext.Provider>
    );
};
