import { City, Country, State } from 'country-state-city';

export const getStateCode = (state: string) => {
    const states = State.getAllStates();
    return states.find(s => s.name === state)?.isoCode
};

export const getCountryCode = (country: string) => {
    const countries = Country.getAllCountries();
    return countries.find(c => c.name === country)?.isoCode
};
