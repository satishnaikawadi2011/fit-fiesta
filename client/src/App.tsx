import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Button, Center, Spinner } from '@chakra-ui/react';
import useApiUpdated from './hooks/useApiUpdated';
import { INotification } from './types/Notification';
import userApi from './api/user';
import { increaseUnreadNotificationsCount, setNotifications, setUnreadNotificationsCount } from './app/features/user';
import { IUser } from './types/User';
import { updateUser } from './app/features/auth';
import socket from './socket';
import { addMessage, addToUnreadContacts, setUnreadContacts, updateLatestMessage } from './app/features/chat';
import { userLog } from './utils/swal/userLog';

function App() {
	const dispatch = useAppDispatch();
	const { selectedContact } = useAppSelector((state) => state.chat);
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

	const { data: unreadContactsData, request: getUnreadContacts, loading: unreadContsLoad } = useApiUpdated<string[]>(
		userApi.getContactsWithUnreadMsgs
	);

	useEffect(() => {
		getAllDataFromStorage();
	}, []);

	useEffect(
		() => {
			if (runFetchCalls) {
				getNotificationsReq();
				getUserDetailsReq();
				getUnreadCntReq();
				getUnreadContacts();
			}
		},
		[
			runFetchCalls
		]
	);

	useEffect(
		() => {
			if (unreadContactsData) {
				dispatch(setUnreadContacts(unreadContactsData));
			}
		},
		[
			unreadContactsData
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
			const eventListener = (data: INotification) => {
				console.log(data);
				if (user && data.recipients.includes(user!._id)) {
					console.log(data);
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

	useEffect(
		() => {
			const eventListener = (data: any) => {
				if (user) {
					if (data.receiver && data.receiver === user._id) {
						if (selectedContact && selectedContact._id === data.sender._id) {
							dispatch(addMessage(data));
						}
						else {
							dispatch(addToUnreadContacts(data.sender._id));
						}
						dispatch(updateLatestMessage({ contactId: data.sender._id, message: data }));
					}

					if (data.group && user.groups!.includes(data.group)) {
						if (selectedContact && selectedContact._id === data.group) {
							dispatch(addMessage(data));
						}
						else {
							dispatch(addToUnreadContacts(data.group));
						}
						dispatch(updateLatestMessage({ contactId: data.group, message: data }));
					}
				}
			};
			socket.on('message', eventListener);

			return () => {
				socket.off('message', eventListener);
			};
		},
		[
			socket,
			user,
			selectedContact
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
		return (
			<React.Fragment>
				<AuthenticatedRoutes />
				{/* <Button position={'absolute'} bottom={0} left={0} zIndex={1000} onClick={() => userLog('info', 'Hi')}>
					Click
				</Button> */}
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<UnauthenticatedRoutes />
		</React.Fragment>
	);
}

export default App;
