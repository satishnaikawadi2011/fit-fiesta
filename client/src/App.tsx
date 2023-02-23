import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Box, Center, Flex, Image, Spinner, Text, useMediaQuery } from '@chakra-ui/react';
import useApiUpdated from './hooks/useApiUpdated';
import { INotification } from './types/Notification';
import userApi from './api/user';
import { increaseUnreadNotificationsCount, setNotifications, setUnreadNotificationsCount } from './app/features/user';
import { IUser } from './types/User';
import { updateUser } from './app/features/auth';
import socket from './socket';
import MessageContactListItem from './components/messaging/MessageContactListItem';
import Message from './components/messaging/Message';
import MessageContactList from './components/messaging/MessageContactList';
import MessageList from './components/messaging/MessageList';
import beginChatImg from './assets/begin-chat.png';
import { IMessage } from './types/Message';
import { addMessage, addToUnreadContacts, setUnreadContacts, updateLatestMessage } from './app/features/chat';

function App() {
	const dispatch = useAppDispatch();
	const { selectedContact } = useAppSelector((state) => state.chat);
	const [
		isLargerScreen
	] = useMediaQuery('(min-width: 768px)');
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
		return <AuthenticatedRoutes />;
		// return ;
		// return (
		// 	<React.Fragment>
		// 		{
		// 			isLargerScreen ? <Flex overflowY={'auto'}>
		// 				<Box width={'30vw'} overflow={'auto'}>
		// 					<MessageContactList contacts={contactList as any} />
		// 				</Box>
		// 				<Box width={'70vw'} overflow={'auto'} style={{ height: 'calc(100vh)', overflowY: 'scroll' }}>
		// 					{/* <MessageList messages={messages} /> */}
		// 					<Center height={'100%'}>
		// 						<div style={{ height: '100%' }}>
		// 							<Image src={beginChatImg} height={'80%'} />
		// 							<Text textAlign={'center'}>Please select a contact or group to chat with them</Text>
		// 						</div>
		// 					</Center>
		// 				</Box>
		// 			</Flex> :
		// 			<MessageContactList contacts={contactList as any} />}
		// 	</React.Fragment>
		// );
	}
	return <UnauthenticatedRoutes />;
}

const messages: any[] = [];

for (let i = 0; i < 10; i++) {
	const message = {
		_id: `message_${i}`,
		sender:
			{
				_id: `user_${i}`,
				fullName: `User ${i}`,
				username: `user${i}`,
				profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png'
			},
		receiver: `receiver_${i}`,
		content: `This is message number ${i}`,
		read: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};

	messages.push(message);
}

console.log(messages);

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
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png',
		_id: 1
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
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png',
		_id: 2
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
		profileImg: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__480.png',
		_id: 3
	}
];

export default App;
