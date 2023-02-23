export interface IMessage {
	_id: string;
	sender: string;
	receiver?: string;
	group?: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	readBy: string[];
}
