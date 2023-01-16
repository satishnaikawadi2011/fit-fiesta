import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IGroup {
	name: string;
	description: string;
	members: string[];
	events: string[];
	posts: string[];
	image: string;
}

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
		image:
			{
				type: String
			},
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

const Group = mongoose.model('Group', GroupSchema);

export default Group;
