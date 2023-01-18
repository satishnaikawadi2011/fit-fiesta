export const isExpired = (expiryDateString: string | null) => {
	if (expiryDateString === null) {
		return true;
	}
	const expiryDate = new Date(expiryDateString);
	const currentDate = new Date();
	return expiryDate < currentDate;
};
