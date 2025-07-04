import type { Post } from '../types';

export const getAllPosts = async (): Promise<Post[]> => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return (await response.json()) as Post[];
};

export const getPostById = async (id: number): Promise<Post> => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return (await response.json()) as Post;
};
