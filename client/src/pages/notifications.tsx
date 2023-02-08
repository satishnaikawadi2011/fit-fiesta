import React, { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';
import { setNotifications } from '../app/features/user';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from '../components/layout/Layout';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import NotificationListItem from '../components/NotificationListItem';

const NotificationsPage = () => {
	// const [
	// 	page,
	// 	setPage
	// ] = useState(2);
	// const [
	// 	loading,
	// 	setLoading
	// ] = useState(false);

	const dispatch = useAppDispatch();
	const { notifications } = useAppSelector((state) => state.user);

	// const [
	// 	hasMore,
	// 	setHasMore
	// ] = useState(notifications.length > 0);

	// console.log('Here');

	// const fetchMoreNotifications = async () => {
	// 	setPage((prevPage) => prevPage + 1);
	// 	setLoading(true);

	// 	const data: any = await apiClient.get(`http://localhost:5000/api/user/notifications?limit=5&page=${page}`);
	// 	if (data.data.length == 0) setHasMore(false);
	// 	dispatch(
	// 		setNotifications([
	// 			...notifications,
	// 			...data.data
	// 		])
	// 	);
	// 	setLoading(false);
	// };

	// return (
	// 	<Layout title="Home" withProfile>
	// 		{loading && (
	// 			<Center>
	// 				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
	// 			</Center>
	// 		)}

	// 		<InfiniteScroll
	// 			dataLength={notifications.length} //This is important field to render the next data
	// 			next={fetchMoreNotifications}
	// 			hasMore={hasMore}
	// 			loader={
	// 				<Center>
	// 					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
	// 				</Center>
	// 			}
	// 			endMessage={
	// 				<p style={{ textAlign: 'center' }}>
	// 					<b>Yay! You have seen it all</b>
	// 				</p>
	// 			}
	// 		>
	// 			<Box boxShadow="base" bg={'gray.50'}>
	// 				<Heading m={5} fontSize={'lg'}>
	// 					Notifications
	// 				</Heading>
	// 				{notifications.map((n) => {
	// 					return <NotificationListItem key={n._id} notification={n} />;
	// 				})}
	// 			</Box>
	// 		</InfiniteScroll>
	// 	</Layout>
	// );

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

	const lastBookElementRef = useCallback(
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
		// Make API call to fetch data for the current page number
		const data: any = await apiClient.get(
			`http://localhost:5000/api/user/notifications?limit=5&page=${pageNumber}`
		);
		if (!data.data || !data.data.length) {
			setHasMore(false);
		}
		dispatch(
			setNotifications([
				...notifications,
				...data.data
			])
		);
		setLoading(false);
	};

	useEffect(
		() => {
			fetchData();
		},
		[
			pageNumber
		]
	);

	return (
		<Layout title="Home" withProfile>
			<Box boxShadow="base" bg={'gray.50'}>
				<Heading m={5} fontSize={'lg'}>
					Notifications
				</Heading>
				{notifications.map((item, index) => {
					if (notifications.length === index + 1) {
						return <NotificationListItem refe={lastBookElementRef} key={item._id} notification={item} />;
					}
					return <NotificationListItem key={item._id} notification={item} />;
				})}
				{loading && <div>Loading...</div>}
				{!hasMore && <div>No more items to display</div>}
			</Box>
		</Layout>
	);
};

export default NotificationsPage;
