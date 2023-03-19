import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../../api/client';
import { useAppSelector } from '../../app/hooks';
import { BACKEND_URL } from '../../constants';
import { IEvent } from '../../types/Event';
import { IResource } from '../../types/Resource';
import Event from '../Event';
import Resource from '../Resource';

const SearchResources = () => {
	const [
		resultResources,
		setResultResources
	] = useState<IResource[]>([]);
	const [
		page,
		setPage
	] = useState(1);
	const [
		loading,
		setLoading
	] = useState(false);

	const { searchTerm } = useAppSelector((state) => state.common);

	const [
		hasMore,
		setHasMore
	] = useState(resultResources.length > 0);

	const fetchResources = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/resource/search/${searchTerm}?limit=3&page=1`);
		setResultResources(data.data);
		// console.log(data);
		// console.log(resultEvents);
		setLoading(false);
	};

	useEffect(
		() => {
			if (searchTerm) {
				fetchResources();
				setPage(page + 1);
			}
		},
		[
			searchTerm
		]
	);

	const fetchMoreResources = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/resource/search/${searchTerm}?limit=3&page=${page}`);
		if (data.data.length == 0) setHasMore(false);
		setResultResources([
			...resultResources,
			...data.data
		]);
		setLoading(false);
	};
	return (
		<React.Fragment>
			{loading && (
				<Center>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
				</Center>
			)}
			<InfiniteScroll
				dataLength={resultResources.length} //This is important field to render the next data
				next={fetchMoreResources}
				hasMore={hasMore}
				loader={
					<Center>
						<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
					</Center>
				}
				endMessage={

						resultResources.length === 0 ? <p style={{ textAlign: 'center' }}>
							<b>No results found</b>
						</p> :
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
				}
			>
				{resultResources.map((r) => {
					return <Resource resource={r} />;
				})}
			</InfiniteScroll>
		</React.Fragment>
	);
};

export default SearchResources;
