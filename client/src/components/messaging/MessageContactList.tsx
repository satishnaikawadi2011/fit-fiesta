import { ArrowBackIcon, Search2Icon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { IMessage } from '../../types/Message';
import MessageContactListItem from './MessageContactListItem';

export interface IContactListItem {
	latestMessage?: IMessage;
	name: string;
	profileImg: string;
	_id: string;
	type: 'group' | 'user';
}

interface Props {
	contacts: IContactListItem[];
}

const MessageContactList: React.FC<Props> = ({ contacts }) => {
	const [
		focused,
		setFocused
	] = React.useState(false);
	const [
		query,
		setQuery
	] = React.useState('');

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
			<InputGroup width={'95%'} mx={'auto'} my={2}>
				<InputLeftElement
					pointerEvents="none"
					children={

							!focused && query === '' ? <Search2Icon color="gray.500" /> :
							<ArrowBackIcon cursor={'pointer'} onClick={() => setQuery('')} color="gray.500" />
					}
				/>
				<Input
					placeholder="Search or start  new chat"
					bgColor={'gray.100'}
					border="none"
					_focus={{ outline: 'none', border: 'none' }}
					onFocus={onFocus}
					onBlur={onBlur}
					type="text"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
			</InputGroup>

			{filteredContacts.map((c) => {
				return (
					<MessageContactListItem
						type={c.type}
						key={c._id}
						_id={c._id}
						name={c.name}
						profileImg={c.profileImg}
						latestMessage={c.latestMessage}
					/>
				);
			})}
		</Box>
	);
};

export default MessageContactList;
