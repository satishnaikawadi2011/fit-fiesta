import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
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
		location:
			{
				type: String
			},
		category:
			{
				type: String,
				required: true
			},
		url:
			{
				type: String
			}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Resource', ResourceSchema);
