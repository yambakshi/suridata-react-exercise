import axios from 'axios';


export const useBlogPosts = () => {
    const fetchBlogPosts = async () => {
        return axios.get('https://my.api.mockaroo.com/posts', {
            headers: {
                'X-API-Key': '04d55c10',
                'Content-Type': 'application/json'
            }
        }).catch(error => {
            console.error('Error fetching blog posts: ', error);
        })
    }

    return { fetchBlogPosts };
}