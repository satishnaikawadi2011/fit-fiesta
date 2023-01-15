import { validatePostData } from './../validation/validatePost';
import Post, { IPost } from './../models/Post';
import { Request, Response } from 'express';

export const createPost = async (req: any, res: Response) => {
	try {
		const { content, image, location } = req.body;
		const message = await validatePostData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}
		const post = new Post({ content, location, image, user: req.id });
		await post.save();
		return res.status(201).json({ post });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const likePost = async (req: any, res: Response) => {
	try {
		const { postId } = req.params;
		const userId = req.id;
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'Post not found!' });
		}

		const userIndex = post.likesUsers.indexOf(userId);
		if (userIndex === -1) {
			post.likesCount += 1;
			post.likesUsers.push(userId);
		}
		else {
			post.likesCount -= 1;
			post.likesUsers.splice(userIndex, 1);
		}

		await post.save();
		res.status(200).json({ post });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
