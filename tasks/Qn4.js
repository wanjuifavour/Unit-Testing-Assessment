import axios from 'axios';

export const fetchPosts = async (limit = 10) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: { _limit: limit }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
};