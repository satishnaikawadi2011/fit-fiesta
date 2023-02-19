export interface IMessage {
	_id: string;
	sender: string;
	receiver?: string;
	group?: string;
	content: string;
	read: boolean;
	createdAt: string;
	updatedAt: string;
}
