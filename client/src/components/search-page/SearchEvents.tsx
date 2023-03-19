import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../../api/client';
import { useAppSelector } from '../../app/hooks';
import { BACKEND_URL } from '../../constants';
import { IEvent } from '../../types/Event';
import Event from '../Event';

const SearchEvents = () => {
	const [
		resultEvents,
		setResultEvents
	] = useState<IEvent[]>([]);
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
	] = useState(resultEvents.length > 0);

	const fetchEvents = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/event/search/${searchTerm}?limit=3&page=1`);
		setResultEvents(data.data);
		// console.log(data);
		// console.log(resultEvents);
		setLoading(false);
	};

	useEffect(
		() => {
			if (searchTerm) {
				fetchEvents();
				setPage(page + 1);
			}
		},
		[
			searchTerm
		]
	);

	const fetchMoreEvents = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/event/search/${searchTerm}?limit=3&page=${page}`);
		if (data.data.length == 0) setHasMore(false);
		setResultEvents([
			...resultEvents,
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
				dataLength={resultEvents.length} //This is important field to render the next data
				next={fetchMoreEvents}
				hasMore={hasMore}
				loader={
					<Center>
						<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
					</Center>
				}
				endMessage={

						resultEvents.length === 0 ? <p style={{ textAlign: 'center' }}>
							<b>No results found</b>
						</p> :
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
				}
			>
				{resultEvents.map((event) => {
					return (
						<Event
							key={event._id}
							date={event.date}
							description={event.description}
							name={event.name}
							username={event.user!.username}
							group={event.group}
							image={event.image}
							location={event.location}
						/>
					);
				})}
			</InfiniteScroll>
		</React.Fragment>
	);
};

export default SearchEvents;
