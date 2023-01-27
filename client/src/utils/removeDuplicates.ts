export const removeDuplicates = (arr: any[]) => {
	const uniqueObjects = arr.filter((obj, index, self) => self.findIndex((t) => t._id === obj._id) === index);
	return uniqueObjects;
};
