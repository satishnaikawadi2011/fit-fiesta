import React, { useState } from 'react';
import apiClient from '../api/client';
import { setNotifications } from '../app/features/user';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../components/layout/Layout';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import NotificationListItem from '../components/NotificationListItem';

const NotificationsPage = () => {
	const [
		page,
		setPage
	] = useState(2);
	const [
		loading,
		setLoading
	] = useState(false);

	const dispatch = useAppDispatch();
	const { notifications } = useAppSelector((state) => state.user);

	const [
		hasMore,
		setHasMore
	] = useState(notifications.length > 5);

	console.log('Here');

	const fetchMoreNotifications = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);

		const data: any = await apiClient.get(`http://localhost:5000/api/user/notifications?limit=5&page=${page}`);
		if (data.data.length == 0) setHasMore(false);
		dispatch(
			setNotifications([
				...notifications,
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
				dataLength={notifications.length} //This is important field to render the next data
				next={fetchMoreNotifications}
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
				<Box boxShadow="base" bg={'gray.50'}>
					<Heading m={5} fontSize={'lg'}>
						Notifications
					</Heading>
					{notifications.map((n) => {
						return <NotificationListItem key={n._id} notification={n} />;
					})}
				</Box>
			</InfiniteScroll>
		</Layout>
	);
};

export default NotificationsPage;
