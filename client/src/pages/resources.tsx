import { Center, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../api/client';
import { setResources } from '../app/features/resource';
import Resource from '../components/Resource';
import useInfiniteScrollPagination from '../hooks/useInfiniteScroll';
import { IResource } from '../types/Resource';

const ResourcesPage = () => {
	const dispatch = useAppDispatch();
	const { resources } = useAppSelector((state) => state.resource);
	const { hasMore, lastItemRef, loading, items } = useInfiniteScrollPagination<IResource>('/api/resource', 3);

	useEffect(
		() => {
			if (items) {
				dispatch(setResources(items));
			}
		},
		[
			items
		]
	);

	return (
		<Layout title="Home" withProfile>
			{resources.map((resource, index) => {
				if (resources.length === index + 1) {
					return <Resource refe={lastItemRef} key={resource._id} resource={resource} />;
				}
				return <Resource key={resource._id} resource={resource} />;
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
		</Layout>
	);
};

export default ResourcesPage;
