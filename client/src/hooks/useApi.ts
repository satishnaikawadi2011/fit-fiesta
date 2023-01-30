import { useState } from 'react';

const useApi = (apiFunc: Function) => {
	const [
		data,
		setData
	] = useState();
	const [
		error,
		setError
	] = useState(false);
	const [
		loading,
		setLoading
	] = useState(false);

	const [errorMsg, setErrorMsg] = useState('')

	const request = async (...args: any) => {
		setError(false)
		setErrorMsg('')
		setLoading(true);
		const response = await apiFunc(...args);
		setLoading(false);

		if (!response?.ok) {
			console.log(response)
			setErrorMsg(response.data.message)
			return setError(true);
		}

		setError(false);
		setData(response.data);
		setErrorMsg('')
	};

	return { data, loading, error, request,errorMsg };
};

export default useApi;