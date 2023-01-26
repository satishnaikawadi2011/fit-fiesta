import { BASE_URL } from './../constants/index';
import { validatePostData } from './../validation/validatePost';
import Post, { IPost } from './../models/Post';
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import User from '../models/User';

export const createPost = async (req: any, res: Response) => {
	try {
		const { content, location, group } = req.body;
		const message = await validatePostData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}
		const image = req.file.path;
		const post = new Post({ content, location, image, user: req.id, group });
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

export const createComment = async (req: any, res: Response) => {
	try {
		const postId = req.params.postId;
		const userId = req.id;

		const { content } = req.body;

		if (!content || content.trim() === '') {
			return res.status(400).json({ message: 'content is a required field!' });
		}

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		const comment = new Comment({
			content,
			user: userId,
			post: postId
		});

		post.comments.push(comment.id);
		await post.save();
		await comment.save();

		return res.status(201).json({ comment });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getPosts = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const userId = req.id;

		const user = await User.findById(userId);
		const connectionIds = user!.connections;
		const groupIds = user!.groups;

		let query = {
			$or:
				[
					{
						user:
							{
								$in:
									[
										...connectionIds,
										userId
									]
							}
					},
					{ group: { $in: groupIds } }
				]
		};

		const posts = await Post.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).populate('user', [
			'fullName',
			'username'
		]);

		return res.status(200).json(posts);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const fetchComments = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 2;
		const skip = (page - 1) * limit;
		const postId = req.params.postId;

		const comments = await Comment.find({ post: postId }).skip(skip).limit(limit).sort({ createdAt: -1 });

		return res.status(200).json(comments);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
