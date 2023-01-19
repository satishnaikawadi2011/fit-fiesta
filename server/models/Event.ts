import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IEvent {
	name: string;
	image?: string;
	description?: string;
	location?: string;
	date: Date;
	group?: string;
	user: string;
}

const EventSchema = new Schema(
	{
		name:
			{
				type: String,
				required: true
			},
		image:
			{
				type: String
			},
		description:
			{
				type: String
			},
		location:
			{
				type: String
			},
		date:
			{
				type: Date,
				required: true
			},
		group:
			{
				type: Schema.Types.ObjectId,
				ref: 'Group'
			},
		user:
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				required: true
			}
	},
	{ timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);

export default Event;
