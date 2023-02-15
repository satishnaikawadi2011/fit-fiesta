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
import { increaseUnreadNotificationsCount, setNotifications, setUnreadNotificationsCount } from './app/features/user';
import { IUser } from './types/User';
import { updateUser } from './app/features/auth';
import socket from './socket';
import GroupCard from './components/GroupCard';

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
			<GroupCard
				group={
					{
						name: 'Java EE Professionals',
						profileImg:
							'https://media.licdn.com/dms/image/C4D07AQEsq3raakiWNA/group-logo_image-shrink_48x48/0/1631371734374?e=1677088800&v=beta&t=HJt4-jFNAE3uH4nmT0G_2RFSeSqFR-LjcXqcNT8cAjQ',
						description:
							'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae sit accusantium magnam inventore ea placeat velit vero officiis. Alias dolorum aperiam suscipit distinctio fuga, ratione error odit mollitia in adipisci reiciendis sapiente neque ea hic molestiae doloribus quaerat, sed nam? Facere eius facilis maxime, soluta, tenetur consequatur alias mollitia dicta voluptatum suscipit tempora veniam velit nobis dolores deleniti, quasi quaerat totam officia esse enim. Non explicabo, dignissimos exercitationem dicta labore fuga tempora ea velit vero, optio eos, quo placeat accusamus officiis vitae ducimus debitis sint? Totam reiciendis aspernatur nemo, sed ipsam culpa eveniet nesciunt nostrum dolorem beatae, optio ratione tempora?',
						members:
							[
								's',
								'b'
							],
						_id: ''
					} as any
				}
			/>
		);
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
