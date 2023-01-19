import { create } from 'apisauce';
import { store } from '../app/store';
import { BACKEND_DEV_URL } from '../constants';

const apiClient = create({
	baseURL: BACKEND_DEV_URL
});

export default apiClient;
