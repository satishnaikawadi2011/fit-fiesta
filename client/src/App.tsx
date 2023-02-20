import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Box, Center, Spinner } from '@chakra-ui/react';
import useApiUpdated from './hooks/useApiUpdated';
import { INotification } from './types/Notification';
import userApi from './api/user';
import { increaseUnreadNotificationsCount, setNotifications, setUnreadNotificationsCount } from './app/features/user';
import { IUser } from './types/User';
import { updateUser } from './app/features/auth';
import socket from './socket';
import MessageContactListItem from './components/messaging/MessageContactListItem';
import Message from './components/messaging/Message';

function App() {
	const dispatch = useAppDispatch();
	const { notifications } = useAppSelector((state) => state.user);
	const [
		runFetchCalls,
		setRunFetchCalls
	] = useState(false);
	const { data: notificationData, request: getNotificationsReq, loading: notificationLoad } = useApiUpdated<
		INotification[]
	>(userApi.getNotifications);

	const { data: userData, request: getUserDetailsReq, loading: getUserLoading } = useApiUpdated<{ user: IUser }>(
		userApi.getUserDetails
	);

	const { data: unreadCntData, request: getUnreadCntReq, loading: unreadCntLoad } = useApiUpdated<{
		unreadCount: number;
	}>(userApi.getUnreadNotificationsCount);

	useEffect(() => {
		getAllDataFromStorage();
	}, []);

	useEffect(
		() => {
			if (runFetchCalls) {
				getNotificationsReq();
				getUserDetailsReq();
				getUnreadCntReq();
			}
		},
		[
			runFetchCalls
		]
	);

	useEffect(
		() => {
			if (notificationData) {
				dispatch(setNotifications(notificationData));
			}
		},
		[
			notificationData
		]
	);

	useEffect(
		() => {
			if (unreadCntData) {
				dispatch(setUnreadNotificationsCount(unreadCntData.unreadCount));
			}
		},
		[
			unreadCntData
		]
	);

	useEffect(
		() => {
			if (userData) {
				dispatch(updateUser(userData.user));
			}
		},
		[
			userData
		]
	);

	const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	const isTokenExpired = isExpired(expiryDate);

	useEffect(
		() => {
			if (!isTokenExpired && user) {
				setRunFetchCalls(true);
			}
		},
		[
			user,
			isExpired
		]
	);

	useEffect(
		() => {
			console.log('Sockets');
			const eventListener = (data: INotification) => {
				console.log('Sockets Here');
				if (user && data.recipients.includes(user!._id)) {
					dispatch(increaseUnreadNotificationsCount(1));
				}
			};
			socket.on('notification', eventListener);

			return () => {
				socket.off('notification', eventListener);
			};
		},
		[
			socket,
			user
		]
	);

	if (notificationLoad || getUserLoading) {
		return (
			<Center height={'100vh'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
			</Center>
		);
	}

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		// return <AuthenticatedRoutes />;
		return (
			<Box>
				<Message message={contactList[0].latestMessage as any} />
				<Message message={contactList[1].latestMessage as any} />
				<Message message={contactList[2].latestMessage as any} />
			</Box>
		);
	}
	return <UnauthenticatedRoutes />;
}

const contactList = [
	{
		latestMessage:
			{
				_id: '1',
				sender:
					{
						_id: '1',
						fullName: 'John Doe',
						username: 'johndoe',
						profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
					},
				receiver: '2',
				content: 'Hello, how are you?',
				read: true,
				createdAt: '2022-02-18T10:45:00Z',
				updatedAt: '2022-02-18T10:45:00Z'
			},
		name: 'Jane Smith',
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
	},
	{
		latestMessage:
			{
				_id: '2',
				sender:
					{
						_id: '63dcda35cdee5a239718395e',
						fullName: 'Jane Smith',
						username: 'janesmith',
						profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
					},
				receiver: '1',
				content: "I'm good, thanks for asking. How about you?",
				read: true,
				createdAt: '2022-02-19T08:30:00Z',
				updatedAt: '2022-02-19T08:30:00Z'
			},
		name: 'John Doe',
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
	},
	{
		latestMessage:
			{
				_id: '3',
				sender:
					{
						_id: '3',
						fullName: 'Alice Smith',
						username: 'alicesmith',
						profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
					},
				group: '1',
				content:
					"Hey everyone, how's it going?Hey everyone, how's it going?Hey everyone, how's it going? Hey everyone, how's it goingHey everyone, how's it goingHey everyone, how's it going",
				read: false,
				createdAt: '2022-02-18T18:15:00Z',
				updatedAt: '2022-02-18T18:15:00Z'
			},
		name: 'Group Chat',
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
	}
];

export default App;
