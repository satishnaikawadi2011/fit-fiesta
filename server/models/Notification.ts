import * as mongoose from 'mongoose';
import { io } from '../app';
import { IUser } from './User';
const Schema = mongoose.Schema;

export type NotificationType =
	| 'connection_request_made'
	| 'connection_request_accepted'
	| 'connection_request_rejected'
	| 'removed_from_connection'
	| 'connection_request_withdrawn';

export const getNotificationMessage = (type: NotificationType, user: IUser) => {
	switch (type) {
		case 'connection_request_made':
			return `@${user.username} has sent you a connection request.`;
		case 'connection_request_accepted':
			return `Your connection request with @${user.username} has been accepted.`;
		case 'connection_request_rejected':
			return `Your connection request with @${user.username} has been rejected.`;
		case 'removed_from_connection':
			return `You have been removed from @${user.username}'s connections.`;
		case 'connection_request_withdrawn':
			return `@${user.username} has withdrawn their connection request.`;
	}
};

export interface INotification {
	message: string;
	recipients: string[];
	read: boolean;
	type: NotificationType;
	image: string;
}

const NotificationSchema = new Schema(
	{
		recipients:
			[
				{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}
			],
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
			},
		type:
			{
				type: String,
				required: true
			}
	},
	{ timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);

Notification.watch().on('change', (data: any) => {
	// console.log(data);
	io.emit('notification', data?.fullDocument);
});

export default Notification;
