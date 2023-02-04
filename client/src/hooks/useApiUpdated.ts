import { useState } from 'react';

type ReturnData<T> = {
  data: T | undefined;
  error: boolean;
  loading: boolean;
  request: (...args: any[]) => void;
  errorMsg: string;
};

const useApiUpdated = <T>(apiFunc:any): ReturnData<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const request = async (...args: any): Promise<void> => {
    setError(false);
    setErrorMsg('');
    setLoading(true);
    const response:any = await apiFunc(...args);
    console.log('Here', response);
    setLoading(false);

	if (!response?.ok) {
			console.log(response)
			setErrorMsg(response.data.message)
			return setError(true);
		}

    setError(false);
    setData(response.data);
    setErrorMsg('');
  };

  return { data, loading, error, request, errorMsg };
};

export default useApiUpdated;
