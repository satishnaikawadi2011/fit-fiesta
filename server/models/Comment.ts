import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IComment {
	content: string;
	post: string;
	user: string;
}

const CommentSchema = new Schema(
	{
		content:
			{
				type: String,
				required: true
			},
		user:
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
		post:
			{
				type: Schema.Types.ObjectId,
				ref: 'Post',
				required: true
			}
	},
	{ timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
