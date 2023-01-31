import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../api/client';
import { setResources } from '../app/features/resource';
import Resource from '../components/Resource';

const ResourcesPage = () => {
	const [
		page,
		setPage
	] = useState(1);
	const [
		loading,
		setLoading
	] = useState(false);

	const dispatch = useAppDispatch();
	const { resources } = useAppSelector((state) => state.resource);

	const [
		hasMore,
		setHasMore
	] = useState(resources.length > 0);

	const fetchResources = async () => {
		setLoading(true);
		const data: any = await apiClient.get('http://localhost:5000/api/resource?limit=3&page=1');
		dispatch(setResources(data.data));
		setLoading(false);
	};

	useEffect(() => {
		fetchResources();
		setPage(page + 1);
	}, []);

	const fetchMoreResources = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(`http://localhost:5000/api/resource?limit=3&page=${page}`);
		if (data.data.length == 0) setHasMore(false);
		dispatch(
			setResources([
				...resources,
				...data.data
			])
		);
		setLoading(false);
	};

	return (
		<Layout title="Home" withProfile>
			{loading && (
				<Center>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
				</Center>
			)}

			<InfiniteScroll
				dataLength={resources.length} //This is important field to render the next data
				next={fetchMoreResources}
				hasMore={hasMore}
				loader={
					<Center>
						<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
					</Center>
				}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{resources.map((resource) => {
					return <Resource resource={resource} />;
				})}
			</InfiniteScroll>
		</Layout>
	);
};

export default ResourcesPage;
