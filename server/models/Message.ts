import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IMessage {
	sender: string;
	receiver?: string;
	group?: string;
	content: string;
	read: boolean;
	createdAt: string;
	updatedAt: string;
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
		read: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

Message.watch().on('change', (data: any) => {
	// io.emit('notification', data?.fullDocument);
});

export default Message;
