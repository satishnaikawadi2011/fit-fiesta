import { useEffect } from 'react';
import { setUnreadNotificationsCount } from '../app/features/user';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import NotificationListItem from '../components/NotificationListItem';
import socket from '../socket';
import { INotification } from '../types/Notification';
import useApiUpdated from '../hooks/useApiUpdated';
import userApi from '../api/user';
import useInfiniteScrollPagination from '../hooks/useInfiniteScroll';
import useBlockBgColor from '../hooks/useBlockBgColor';

const NotificationsPage = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const blockBg = useBlockBgColor();

	const {
		hasMore,
		lastItemRef,
		loading,
		items: notifications,
		setItems: setNotifications
	} = useInfiniteScrollPagination<INotification>('/api/user/notifications', 5);

	const { request: readAllReq } = useApiUpdated<any>(userApi.markAllNotificationsAsRead);

	useEffect(
		() => {
			const eventListener = (data: INotification) => {
				if (user && data.recipients.includes(user!._id)) {
					setNotifications([
						data,
						...notifications
					]);
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

	const closePageHandler = async () => {
		await readAllReq();
		dispatch(setUnreadNotificationsCount(0));
	};

	useEffect(() => {
		return () => {
			closePageHandler();
		};
	}, []);

	return (
		<Layout title="Home" withProfile>
			<Box boxShadow="base" bg={blockBg} py={3}>
				<Heading m={5} fontSize={'lg'}>
					Notifications
				</Heading>
				{notifications.map((item, index) => {
					if (notifications.length === index + 1) {
						return <NotificationListItem refe={lastItemRef} key={item._id} notification={item} />;
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
