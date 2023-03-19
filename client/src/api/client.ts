import { create } from 'apisauce';
import { store } from '../app/store';
import { BACKEND_URL } from '../constants';

const apiClient = create({
	baseURL: BACKEND_URL
});

export default apiClient;
