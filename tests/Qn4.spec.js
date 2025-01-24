import axios from 'axios';
import { fetchPosts } from '../tasks/Qn4';

describe('JsonPlaceholder Posts API', () => {
    it('should fetch posts with default limit', async () => {
        const posts = await fetchPosts();

        expect(posts).toBeDefined();
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeLessThanOrEqual(10);
    });

    it('should fetch posts with custom limit', async () => {
        const customLimit = 5;
        const posts = await fetchPosts(customLimit);

        expect(posts.length).toBe(customLimit);
    });

    it('should have correct post structure', async () => {
        const posts = await fetchPosts(1);
        const post = posts[0];

        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('body');
    });

    it('should handle fetch errors', async () => {
        const originalAxios = axios.get;
        axios.get = jest.fn().mockRejectedValue(new Error('Network error'));

        await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts');

        axios.get = originalAxios;
    });
});