import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Box, Flex, Image, Icon, Text, Heading, Divider, Center, Spinner } from '@chakra-ui/react';
import { ImLocation2 } from 'react-icons/im';
import { CalendarIcon } from '@chakra-ui/icons';
import { GrAddCircle } from 'react-icons/gr';
import Event from './components/Event';
import Resource from './components/Resource';
import UserProfile from './components/user/UserProfile';
import EditProfileImageModal from './components/user/EditProfileImageModal';
import EditCoverImageModal from './components/user/EditCoverImageModal';
import EditProfileModal from './components/user/EditProfileModal';
import SearchPageCard from './components/search-page/SearchPageCard';
import InvitationListItem from './components/my-network/InvitationListItem';
import AppBadge from './components/app/badge/AppBadge';
import useApiUpdated from './hooks/useApiUpdated';
import { INotification } from './types/Notification';
import userApi from './api/user';
import { setNotifications } from './app/features/user';
import { IUser } from './types/User';
import { updateUser } from './app/features/auth';
import socket from './socket';

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

	useEffect(() => {
		getAllDataFromStorage();
	}, []);

	useEffect(
		() => {
			if (runFetchCalls) {
				getNotificationsReq();
				getUserDetailsReq();
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

	useEffect(() => {
		socket.on('notification', (data: INotification) => {
			console.log('Socket event', data);
			dispatch(
				setNotifications([
					data,
					...notifications
				])
			);
		});
	}, []);

	if (notificationLoad || getUserLoading) {
		return (
			<Center height={'100vh'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
			</Center>
		);
	}

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		return <AuthenticatedRoutes />;
		// return <InvitationListItem />;
		// return (
		// 	<AppBadge content={2} bgColor="red">
		// 		<GrAddCircle size={100} />
		// 	</AppBadge>
		// );
	}
	return <UnauthenticatedRoutes />;

	// return <UserProfile user={user as any} />;
}

export default App;
