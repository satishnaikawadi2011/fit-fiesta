import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
		images:
			[
				{
					type: String
				}
			],
		user:
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
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

module.exports = mongoose.model('Post', PostSchema);
