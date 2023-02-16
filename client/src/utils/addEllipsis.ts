export const addEllipsis = (content: string, numChars: number): string => {
	if (content.length > numChars) {
		return content.slice(0, numChars) + '...';
	}
	else {
		return content;
	}
};
