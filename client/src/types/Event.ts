export interface IEvent {
	_id: string;
	name: string;
	image?: string;
	description: string;
	location?: string;
	date: string;
	group?: string;
	user: {
		fullName: string;
		username: string;
	};
	createdAt?: string;
	updatedAt?: string;
}
