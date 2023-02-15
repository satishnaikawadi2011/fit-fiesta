export interface IGroup {
	name: string;
	description: string;
	members: string[];
	events: string[];
	posts: string[];
	profileImg: string;
	admin: string;
	coverImg: string;
	createdAt?: string;
	updatedAt?: string;
	_id: string;
}
