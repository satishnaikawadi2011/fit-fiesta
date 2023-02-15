// In this function, if the number is greater than or equal to 1, 000, 000, it calculates the number in
//     millions by dividing the number by 1, 000, 000 and rounding to the nearest whole number.It then
//     returns a string representation with an "m" suffix.If the number is between 1, 000 and 1, 000, 000,
//     it calculates the number in thousands by dividing the number by 1, 000 and rounding to the nearest
//      whole number, and returns a string representation with a "k" suffix.If the number is less
//      than 1, 000, it simply returns the number as a string.

export const numberToString = (num: number) => {
	if (num < 1000) {
		return num.toString();
	}
	else if (num < 1000000) {
		const numInK = Math.round(num / 1000);
		return numInK.toString() + 'k';
	}
	else {
		const numInM = Math.round(num / 1000000);
		return numInM.toString() + 'm';
	}
};
