import { Box, Center, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import MessageContactList, { IContactListItem } from '../components/messaging/MessageContactList';
import MessageList from '../components/messaging/MessageList';
import useApiUpdated from '../hooks/useApiUpdated';
import userApi from '../api/user';
import messageApi from '../api/message';
import { IGroup } from '../types/Group';
import { IUser } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setContacts } from '../app/features/chat';
import beginChatImg from '../assets/begin-chat.png';
import { IMessage } from '../types/Message';

export interface IContacts {
	groups: IGroup[];
	connections: IUser[];
}

const MessangerPage = () => {
	const [
		isLargerScreen
	] = useMediaQuery('(min-width: 768px)');
	const dispatch = useAppDispatch();
	const { data: contactsData, loading: contactsLoad, request: getContacts, error: contactsErr } = useApiUpdated<{
		groups: IGroup[];
		connections: IUser[];
	}>(userApi.getContacts);
	const { data: messagesData, error: messagesErr, loading: messagesLoad, request: getMessages } = useApiUpdated<
		IMessage[]
	>(messageApi.getMessages);
	const { contacts, selectedContact } = useAppSelector((state) => state.chat);

	useEffect(() => {
		getContacts();
	}, []);

	useEffect(
		() => {
			if (selectedContact) {
			}
		},
		[
			selectedContact
		]
	);

	useEffect(
		() => {
			if (contactsData && !contactsErr) {
				dispatch(setContacts(transformContacts(contactsData)));
			}
		},
		[
			contactsData,
			contactsErr
		]
	);

	return (
		<React.Fragment>
			{
				isLargerScreen ? <Flex overflowY={'auto'}>
					<Box width={'30vw'} overflow={'auto'}>
						<MessageContactList contacts={contacts} />
					</Box>
					<Box width={'70vw'} overflow={'auto'} style={{ height: 'calc(100vh)', overflowY: 'scroll' }}>
						{/* <MessageList messages={messages} /> */}
						{!selectedContact && (
							<Center height={'100%'}>
								<div style={{ height: '100%' }}>
									<Image src={beginChatImg} height={'80%'} />
									<Text textAlign={'center'}>Please select a contact or group to chat with them</Text>
								</div>
							</Center>
						)}
					</Box>
				</Flex> :
				<MessageContactList contacts={contacts} />}
		</React.Fragment>
	);
};

export default MessangerPage;

const transformContacts = (contactsData: IContacts) => {
	const contacts: IContactListItem[] = [];
	contactsData.groups.forEach((g) => {
		contacts.push({ _id: g._id, name: g.name, profileImg: g.profileImg, latestMessage: g.latestMessage as any });
	});
	contactsData.connections.forEach((c) => {
		const latMsg: any =

				c.latestMessages.length !== 0 ? c.latestMessages[0].message :
				undefined;
		contacts.push({ _id: c._id, name: c.fullName, profileImg: c.profileImg!, latestMessage: latMsg });
	});

	return contacts;
};
