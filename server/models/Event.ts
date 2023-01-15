import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
			}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
