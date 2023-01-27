export interface IPost {
	_id: string;
	content: string;
	location?: string;
	image?: string;
	user: {
		fullName: string;
		username: string;
		_id: string;
	};
	group?: string;
	comments?: string[];
	likesCount: number;
	likesUsers?: string[];
	createdAt: string;
	updatedAt: string;
}
