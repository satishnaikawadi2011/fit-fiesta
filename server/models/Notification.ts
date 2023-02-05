import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface INotification {
	message: string;
	recipient: string;
	read: boolean;
}

const NotificationSchema = new Schema(
	{
		recipient:
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true
			},
		message:
			{
				type: String,
				required: true
			},
		read:
			{
				type: Boolean,
				default: false
			},
		image:
			{
				type: String,
				required: true
			}
	},
	{ timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
