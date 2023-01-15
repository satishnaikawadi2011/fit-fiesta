import User, { IUser } from '../models/User';

export const validateRegister = async (data: Partial<IUser>) => {
	const { username, email, fullName, location, height, weight, password, targetWeight } = data;
	if (!username || username!.trim() == '') {
		return 'username is required field!';
	}
	else if (!email || email!.trim() == '') {
		return 'email is required field!';
	}
	else if (!password || password!.trim() == '') {
		return 'password is required field!';
	}
	else if (!fullName || fullName!.trim() == '') {
		return 'fullName is required field!';
	}
	else if (!location || location!.trim() == '') {
		return 'location is required field!';
	}
	else if (!height) {
		return 'height is required field!';
	}
	else if (!weight) {
		return 'weight is required field!';
	}
	else if (!targetWeight) {
		return 'targetWeight is required field!';
	}
	else if (username!.trim().length < 4) {
		return 'username must be at least 4 characters long!';
	}
	else if (password!.length < 6 || password!.length > 12) {
		return 'password must be between 6 to 12 characters long!';
	}
	else if (!isValidEmail(email as any)) {
		return 'Please enter a valid email address!';
	}

	const user = await User.findOne({ email });
	if (user) {
		return 'user with this email already exists,login instead!';
	}
	const user2 = await User.findOne({ username });
	if (user2) {
		return 'This username is taken, try another one!';
	}
};

function isValidEmail(email: string) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
		return true;
	}
	return false;
}
