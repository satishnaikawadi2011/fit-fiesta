import { BASE_URL } from './../../../server/constants/index';
import { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';

type InfiniteScrollPaginationHook<T> = {
	items: T[];
	loading: boolean;
	hasMore: boolean;
	lastItemRef: (node: Element | null) => void;
	setItems: React.Dispatch<React.SetStateAction<T[]>>;
};

const useInfiniteScrollPagination = <T>(apiUrl: string, limit: number = 10): InfiniteScrollPaginationHook<T> => {
	const [
		items,
		setItems
	] = useState<T[]>([]);
	const [
		pageNumber,
		setPageNumber
	] = useState(1);
	const [
		hasMore,
		setHasMore
	] = useState(true);
	const [
		loading,
		setLoading
	] = useState(false);
	const observer: any = useRef();

	const fetchData = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`${BASE_URL}${apiUrl}?limit=${limit}&page=${pageNumber}`);
		if (!data.data || !data.data.length) {
			setHasMore(false);
		}

		setItems([
			...items,
			...data.data
		]);
		setLoading(false);
	};

	const lastItemRef = useCallback(
		(node: Element | null) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[
			loading,
			hasMore
		]
	);

	useEffect(
		() => {
			fetchData();
		},
		[
			pageNumber
		]
	);

	return {
		items,
		loading,
		hasMore,
		lastItemRef,
		setItems
	};
};

export default useInfiniteScrollPagination;
