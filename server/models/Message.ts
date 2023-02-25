import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IMessage {
	sender: string;
	receiver?: string;
	group?: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	readBy: string[];
}

const MessageSchema = new Schema(
	{
		sender:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
		receiver:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
		group:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Group'
			},
		content:
			{
				type: String,
				required: true
			},
		readBy:
			[
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				}
			]
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
