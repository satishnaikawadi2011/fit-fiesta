import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IPost {
	content: string;
	location: string;
	image: string;
	user: string;
	comments: string[];
	likesCount: number;
	likesUsers: string[];
}

const PostSchema = new Schema(
	{
		content:
			{
				type: String,
				required: true
			},
		location:
			{
				type: String
			},
		image:
			{
				type: String
			},
		user:
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
		group:
			{
				type: Schema.Types.ObjectId,
				ref: 'Group'
			},
		comments:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Comment'
				}
			],
		likesCount:
			{
				type: Number,
				default: 0
			},
		likesUsers:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}
			]
	},
	{ timestamps: true }
);

PostSchema.index({ content: 'text', location: 'text' });

const Post = mongoose.model('Post', PostSchema);

export default Post;
