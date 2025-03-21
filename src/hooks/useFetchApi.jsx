import { useState, useCallback } from 'react';
import axios from 'axios';

export function useFetchApi() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(async (url) => {
		setLoading(true);
		setError(null);

		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (error) {
			console.error(error);

			setError(
				error.response?.data?.message || error.message || 'An error occurred',
			);
		} finally {
			setLoading(false);
		}
	}, []);

	return { data, request, loading, error };
}
