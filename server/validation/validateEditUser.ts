import User, { IUser } from '../models/User';

export const validateEditUser = async (data: Partial<IUser>) => {
	const { username, email, fullName, location, height, weight, targetWeight } = data;
	if (username && username!.trim() == '') {
		return 'username is required field!';
	}
	else if (email && email!.trim() == '') {
		return 'email is required field!';
	}
	else if (fullName && fullName!.trim() == '') {
		return 'fullName is required field!';
	}
	else if (location && location!.trim() == '') {
		return 'location is required field!';
	}
	else if (username && username!.trim().length < 4) {
		return 'username must be at least 4 characters long!';
	}
	else if (email && !isValidEmail(email as any)) {
		return 'Please enter a valid email address!';
	}

	if (email) {
		const user = await User.findOne({ email });
		if (user) {
			return 'user with this email already exists!';
		}
	}

	if (username) {
		const user2 = await User.findOne({ username });
		if (user2) {
			return 'This username is taken, try another one!';
		}
	}
};

function isValidEmail(email: string) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
		return true;
	}
	return false;
}
