import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
	{
		name:
			{
				type: String,
				required: true
			},
		description:
			{
				type: String
			},
		members:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}
			],
		events:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Event'
				}
			],
		posts:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'Post'
				}
			]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Group', GroupSchema);
