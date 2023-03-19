import { Center, Spinner } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '../../api/client';
import { useAppSelector } from '../../app/hooks';
import { BACKEND_URL } from '../../constants';
import { IGroup } from '../../types/Group';
import GroupCard from '../group/GroupCard';

const SearchGroups = () => {
	const [
		groups,
		setGroups
	] = useState<IGroup[]>([]);

	const { searchTerm } = useAppSelector((state) => state.common);

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

	const lastElementRef = useCallback(
		(node: any) => {
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

	const fetchData = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/group/search/${searchTerm}?limit=4&page=${pageNumber}`);
		if (!data.data || !data.data.length) {
			setHasMore(false);
		}

		setGroups([
			...groups,
			...data.data
		]);
		setLoading(false);
	};

	useEffect(
		() => {
			if (searchTerm) {
				fetchData();
			}
		},
		[
			pageNumber,
			searchTerm
		]
	);

	return (
		<React.Fragment>
			{groups.map((item, index) => {
				if (groups.length === index + 1) {
					return <GroupCard refe={lastElementRef} key={item._id} group={item} />;
				}
				return <GroupCard key={item._id} group={item} />;
			})}
			{loading && (
				<Center>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
				</Center>
			)}
			{!hasMore && (
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			)}
		</React.Fragment>
	);
};

export default SearchGroups;
