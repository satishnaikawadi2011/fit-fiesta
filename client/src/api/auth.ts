import { IUser } from '../types/User';
import client from './client';

const endpoint = '/user';

const loginUser = (username: string, password: string) => {
	return client.post(`${endpoint}/login`, { username, password });
};

const registerUser = ({ fullName, email, password, username, height, weight, targetWeight, location }: IUser) => {
	return client.post(`${endpoint}/register`, {
		fullName,
		email,
		password,
		username,
		height,
		weight,
		targetWeight,
		location
	});
};

export default {
	loginUser,
	registerUser
};
