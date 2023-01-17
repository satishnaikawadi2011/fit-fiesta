export interface IUser {
	_id: string;
	fullName: string;
	username: string;
	email: string;
	password: string;
	location?: string;
	weight?: number;
	height?: number;
	targetWeight?: number;
	groups?: Array<string>;
	events?: Array<string>;
	posts?: Array<string>;
	connections?: Array<string>;
	pendingConnections?: Array<string>;
	createdAt: string;
	updatedAt: string;
}
