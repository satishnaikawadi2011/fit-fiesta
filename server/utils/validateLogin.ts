export const validateLogin = (username: string, password: string) => {
	if (!username || username.trim() == '') {
		return 'username is required field!';
	}
	else if (!password || password.trim() == '') {
		return 'password is required field!';
	}
};
