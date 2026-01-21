const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getPosts = async () => {
    const response = await fetch(`${API_URL}/api/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
};

export const getPost = async (id: string) => {
    const response = await fetch(`${API_URL}/api/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
};

export const createPost = async (postData: any) => {
    const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
};

export const deletePost = async (id: string) => {
    const response = await fetch(`${API_URL}/api/posts/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
};
