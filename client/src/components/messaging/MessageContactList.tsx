import { ArrowBackIcon, Search2Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, useColorMode, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { IMessage } from '../../types/Message';
import MessageContactListItem from './MessageContactListItem';
import MessageContactListItemSkeleton from './skeletons/MessageContactListItemSkeleton';

export interface IContactListItem {
	latestMessage?: IMessage;
	name: string;
	profileImg: string;
	_id: string;
	type: 'group' | 'user';
}

interface Props {
	contacts: IContactListItem[];
	loading?: boolean;
}

const MessageContactList: React.FC<Props> = ({ contacts, loading = false }) => {
	const [
		isLargerScreen
	] = useMediaQuery('(min-width: 768px)');
	const [
		focused,
		setFocused
	] = React.useState(false);
	const [
		query,
		setQuery
	] = React.useState('');
	const { colorMode } = useColorMode();

	const filteredContacts = React.useMemo(
		() => contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
		[
			contacts,
			query
		]
	);

	const onFocus = () => setFocused(true);
	const onBlur = () => setFocused(false);
	return (
		<Box width={'full'}>
			<Box
				width={

						isLargerScreen ? '30vw' :
						'100vw'
				}
				position={'fixed'}
				zIndex={2}
				top={0}
				height={'60px'}
			>
				<InputGroup width={'95%'} mt={2} mx={'auto'}>
					<InputLeftElement
						pointerEvents="none"
						children={

								!focused && query === '' ? <Search2Icon color="gray.500" /> :
								<ArrowBackIcon cursor={'pointer'} onClick={() => setQuery('')} color="gray.500" />
						}
					/>
					<Input
						placeholder="Search or start  new chat"
						bgColor={

								colorMode === 'dark' ? '#454D52' :
								'#EDF2F7'
						}
						border="none"
						_focus={{ outline: 'none', border: 'none' }}
						onFocus={onFocus}
						onBlur={onBlur}
						type="text"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
				</InputGroup>
			</Box>

			<Box mt={'60px'} height={'calc(100vh - 60px)'}>
				{
					!loading ? filteredContacts.map((c) => {
						return (
							<React.Fragment key={c._id}>
								<MessageContactListItem
									type={c.type}
									_id={c._id}
									name={c.name}
									profileImg={c.profileImg}
									latestMessage={c.latestMessage}
								/>
							</React.Fragment>
						);
					}) :
					[
						1,
						2,
						3,
						4
					].map((c) => {
						return (
							<React.Fragment key={c}>
								<MessageContactListItemSkeleton />
							</React.Fragment>
						);
					})}
			</Box>
		</Box>
	);
};

export default MessageContactList;
