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
		const image =
			req.file ? req.file.path :
			undefined;
		let g = undefined;
		if (group != '') g = group;
		const post = new Post({ content, location, image, user: req.id, group: g });
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

		const comments = await Comment.find({ post: postId })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.populate('user', [
				'fullName',
				'username'
			]);

		return res.status(200).json(comments);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================

// VVIMP

// The find, skip, limit, and sort are performed by the mongodb database on the server side.The result
// is then sent back to mongoose where the populate is performed by submitting additional queries.

// In the 'post' document in the database, the 'user' and 'group' fields contains an ObjectId, not an
// object, so the fields `user.fullName', 'user.username', and 'group.name' don't exist, and therefore
// don't match.

// In order to filter these fields on the database server, you would need to use aggregate with separate
// $lookup stages to retrieve the user and group documents in order for the server to consider
// those fields.

// Code With Problem

// export const searchPost = async (req: any, res: Response) => {
// 	try {
// 		const searchQuery = req.params.query;
// 		const page = req.query.page || 1;
// 		const limit = req.query.limit || 10;
// 		const skip = (page - 1) * limit;

// 		const posts = await Post.find({
// 			$or:
// 				[
// 					{ content: { $regex: searchQuery, $options: 'i' } },
// 					{ location: { $regex: searchQuery, $options: 'i' } },
// 					{ 'user.fullName': { $regex: searchQuery, $options: 'i' } },
// 					{ 'user.username': { $regex: searchQuery, $options: 'i' } },
// 					{ 'group.name': { $regex: searchQuery, $options: 'i' } }
// 				]
// 		})
// 			.populate('user')
// 			.populate('group')
// 			.skip(skip)
// 			.limit(limit)
// 			.sort({ createdAt: -1 });
// 		res.json(posts);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ message: 'Something went wrong!' });
// 	}
// };

// Correct Code
export const searchPost = async (req: any, res: Response) => {
	try {
		const searchQuery = req.params.query;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const posts = await Post.aggregate([
			{
				$lookup:
					{
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'userDoc'
					}
			},
			{
				$lookup:
					{
						from: 'groups',
						localField: 'group',
						foreignField: '_id',
						as: 'groupDoc'
					}
			},
			{
				$match:
					{
						$or:
							[
								{ content: { $regex: searchQuery, $options: 'i' } },
								{ location: { $regex: searchQuery, $options: 'i' } },
								{ 'userDoc.fullName': { $regex: searchQuery, $options: 'i' } },
								{ 'userDoc.username': { $regex: searchQuery, $options: 'i' } },
								{ 'groupDoc.name': { $regex: searchQuery, $options: 'i' } }
							]
					}
			},
			{
				$skip: skip
			},
			{
				$limit: limit
			},
			{
				$sort:
					{
						createdAt: -1
					}
			}
		]);

		const transformedPosts = posts.map((p) => {
			const post = {
				...p,
				user: p.userDoc[0],
				group:

						p.groupDoc.length > 0 ? p.groupDoc[0] :
						''
			};

			delete post.userDoc;
			delete post.groupDoc;
			return post;
		});

		res.json(transformedPosts);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================
// ========================================================================================================================

export const getCommentsCount = async (req: any, res: Response) => {
	try {
		const postId = req.params.postId;
		const commentCount = await Comment.countDocuments({ post: postId });
		res.status(200).json({ commentCount });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
