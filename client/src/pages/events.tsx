import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../api/client';
import { setEvents } from '../app/features/event';
import Event from '../components/Event';
import useInfiniteScrollPagination from '../hooks/useInfiniteScroll';
import { IEvent } from '../types/Event';

const EventsPage = () => {
	const dispatch = useAppDispatch();
	const { events } = useAppSelector((state) => state.event);

	const { hasMore, lastItemRef, loading, items } = useInfiniteScrollPagination<IEvent>('/api/event', 3);
	useEffect(
		() => {
			if (items) {
				dispatch(setEvents(items));
			}
		},
		[
			items
		]
	);

	return (
		<Layout title="Home" withProfile>
			{events.map((event, index) => {
				if (events.length === index + 1) {
					return (
						<Event
							refe={lastItemRef}
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
				}
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

export default EventsPage;
