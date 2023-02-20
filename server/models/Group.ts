import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IGroup {
	name: string;
	description: string;
	members: string[];
	events: string[];
	posts: string[];
	profileImg: string;
	admin: string;
	coverImg: string;
	latestMessage?: string;
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
		admin:
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
		profileImg:
			{
				type: String,
				default:
					'https://res.cloudinary.com/dyfm31f1n/image/upload/v1675624958/fit-fiesta/placeholders/group_utrk67.jpg'
			},
		coverImg:
			{
				type: String,
				default:
					'https://res.cloudinary.com/dyfm31f1n/image/upload/v1675059731/fit-fiesta/placeholders/bg_qr4vtm.jpg'
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
			],
		latestMessage:
			{
				type: Schema.Types.ObjectId,
				ref: 'Message'
			}
	},
	{ timestamps: true }
);

const Group = mongoose.model('Group', GroupSchema);

export default Group;
