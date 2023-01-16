import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IResource {
	name: string;
	description: string;
	location: string;
	image: string;
	category: string;
	url: string;
}

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
		image:
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

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
