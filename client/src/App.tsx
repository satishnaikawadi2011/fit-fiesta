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
import GroupCard from './components/group/GroupCard';
import GroupDetails from './components/group/GroupDetails';

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

	const group = {
		_id: '63ee1bdf1f21091dd599bfdd',
		name: 'Second Group With Image',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
		members:
			[
				'63dd5c27a9c7110986043aa0',
				'63dcda35cdee5a239718395e'
			],
		admin:
			{
				_id: '63dd5c27a9c7110986043aa0',
				fullName: 'Sam Doe',
				username: 'sammy',
				email: 'sam@doe.com',
				password: '$2a$10$KdXE9RPrskeLyxZNvE3fweHIAzYc9GJgxb/HL8wBFPhtGxNoYq7V6',
				profileImg:
					'https://res.cloudinary.com/dyfm31f1n/image/upload/v1675059905/fit-fiesta/placeholders/blank-profile-picture-gdb207bae8_1280_zymz7e.png',
				coverImg:
					'https://res.cloudinary.com/dyfm31f1n/image/upload/v1675059731/fit-fiesta/placeholders/bg_qr4vtm.jpg',
				location: 'Jacobs Well ,Queensland ,Australia',
				weight: 67,
				height: 167,
				targetWeight: 56,
				groups:
					[
						'63ee1b881f21091dd599bfd9',
						'63ee1bdf1f21091dd599bfdd'
					],
				events: [],
				posts: [],
				connections:
					[
						'63dcda35cdee5a239718395e'
					],
				pendingConnections: [],
				sentConnections: [],
				createdAt: '2023-02-03T19:10:31.787Z',
				updatedAt: '2023-02-16T21:27:43.302Z',
				__v: 95,
				groupPendingRequests: [],
				groupSentRequests: [],
				receivedGroupJoinRequests: [],
				sentGroupJoinRequests: []
			},
		profileImg: 'https://res.cloudinary.com/dyfm31f1n/image/upload/v1676549086/fit-fiesta/nqqrlykycmrjtnh6fijb.png',
		coverImg: 'https://res.cloudinary.com/dyfm31f1n/image/upload/v1675059731/fit-fiesta/placeholders/bg_qr4vtm.jpg',
		events: [],
		posts: [],
		createdAt: '2023-02-16T12:04:47.016Z',
		updatedAt: '2023-02-16T21:27:43.178Z',
		__v: 1
	};

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		// return <AuthenticatedRoutes />;
		return <GroupDetails group={group as any} />;
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
