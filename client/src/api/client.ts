import { create } from 'apisauce';
import { BACKEND_DEV_URL } from '../constants';

const apiClient = create({
	baseURL: BACKEND_DEV_URL
});

export default apiClient;
