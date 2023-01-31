import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../api/client';
import { setEvents } from '../app/features/event';
import Event from '../components/Event';

const EventsPage = () => {
	const [
		page,
		setPage
	] = useState(1);
	const [
		loading,
		setLoading
	] = useState(false);

	const dispatch = useAppDispatch();
	const { events } = useAppSelector((state) => state.event);

	const [
		hasMore,
		setHasMore
	] = useState(events.length > 0);

	const fetchEvents = async () => {
		setLoading(true);
		const data: any = await apiClient.get('http://localhost:5000/api/event?limit=3&page=1');
		dispatch(setEvents(data.data));
		setLoading(false);
	};

	useEffect(() => {
		fetchEvents();
		setPage(page + 1);
	}, []);

	const fetchMoreEvents = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(`http://localhost:5000/api/event?limit=3&page=${page}`);
		if (data.data.length == 0) setHasMore(false);
		dispatch(
			setEvents([
				...events,
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
				dataLength={events.length} //This is important field to render the next data
				next={fetchMoreEvents}
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
				{events.map((event) => {
					return (
						<Event
							date={event.date}
							name={event.name}
							description={event.description}
							username={event.user.username}
							location={event.location}
							image={event.image}
							group={event.group}
							key={event._id}
						/>
					);
				})}
			</InfiniteScroll>
		</Layout>
	);
};

export default EventsPage;
