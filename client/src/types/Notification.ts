export type NotificationType =
	| 'connection_request_made'
	| 'connection_request_accepted'
	| 'connection_request_rejected'
	| 'removed_from_connection'
	| 'connection_request_withdrawn';

export interface INotification {
	message: string;
	recipients: string[];
	read: boolean;
	type: NotificationType;
	image: string;
	createdAt: string;
	updatedAt: string;
	_id: string;
}
