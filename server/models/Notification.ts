import * as mongoose from 'mongoose';
import { io } from '../app';
import { IGroup } from './Group';
import { IUser } from './User';
const Schema = mongoose.Schema;

export type NotificationType =
	| 'connection_request_made'
	| 'connection_request_accepted'
	| 'connection_request_rejected'
	| 'removed_from_connection'
	| 'connection_request_withdrawn'
	| 'join_group_request_made'
	| 'join_group_request_accepted'
	| 'join_group_request_rejected'
	| 'join_group_request_withdrawn';

export const getNotificationMessage = (type: NotificationType, user?: IUser, group?: IGroup) => {
	switch (type) {
		case 'connection_request_made':
			return `@${user!.username} has sent you a connection request.`;
		case 'connection_request_accepted':
			return `Your connection request with @${user!.username} has been accepted.`;
		case 'connection_request_rejected':
			return `Your connection request with @${user!.username} has been rejected.`;
		case 'removed_from_connection':
			return `You have been removed from @${user!.username}'s connections.`;
		case 'connection_request_withdrawn':
			return `@${user!.username} has withdrawn their connection request.`;
		case 'join_group_request_accepted':
			return `Your request to join group ${group!.name} has been accepted.`;
		case 'join_group_request_made':
			return `@${user!.username} has sent you a request to join group ${group!.name}.`;
		case 'join_group_request_rejected':
			return `Your request to join group ${group!.name} has been rejected.`;
		case 'join_group_request_withdrawn':
			return `@${user!.username} has withdrawn their request to join group ${group!.name}.`;
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

// Notification.watch().on('change', (data: any) => {
// 	io.emit('notification', data?.fullDocument);
// });

export default Notification;
