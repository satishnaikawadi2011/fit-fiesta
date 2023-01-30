import { City, Country, State } from 'country-state-city';

export const isCityInCountry = (city: string, country: string) => {
	const cities = City.getCitiesOfCountry(country);
	if (!cities || !cities[0]) return false;
	return cities.some((c) => c.name === city);
};

export const isStateInCountry = (state: string, country: string) => {
	const states = State.getStatesOfCountry(country);
	return states.some((s) => s.name === state);
};

export const isCityInState = (city: string, state: string, country: string) => {
	const cities = City.getCitiesOfState(country, state);
	return cities.some((c) => c.name === city);
};
