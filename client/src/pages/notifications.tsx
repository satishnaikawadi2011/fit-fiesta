import { useCallback, useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';
import { setNotifications } from '../app/features/user';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import NotificationListItem from '../components/NotificationListItem';
import socket from '../socket';
import { INotification } from '../types/Notification';

const NotificationsPage = () => {
	const dispatch = useAppDispatch();
	const { notifications } = useAppSelector((state) => state.user);
	const { user } = useAppSelector((state) => state.auth);

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

	useEffect(
		() => {
			const eventListener = (data: INotification) => {
				if (user && data.recipients.includes(user!._id)) {
					dispatch(
						setNotifications([
							data,
							...notifications
						])
					);
				}
			};
			socket.on('notification', eventListener);

			return () => {
				socket.off('notification', eventListener);
			};
		},
		[
			socket,
			user,
			notifications
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
			</Box>
		</Layout>
	);
};

export default NotificationsPage;
