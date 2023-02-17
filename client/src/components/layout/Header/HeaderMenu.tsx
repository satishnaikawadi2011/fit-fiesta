import { DeleteIcon } from '@chakra-ui/icons';
import {
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	MenuItem,
	Flex,
	Avatar,
	Box,
	Text,
	Button,
	Divider,
	Link,
	forwardRef,
	Icon
} from '@chakra-ui/react';
import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../app/features/auth';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IUser } from '../../../types/User';
import AppBadge from '../../app/badge/AppBadge';

interface Props {
	user: IUser;
}

const CustomMenuButton = forwardRef((props, ref) => {
	const { user } = useAppSelector((state) => state.auth);
	const { unreadNotificationsCount } = useAppSelector((state) => state.user);
	return (
		<Box ref={ref} {...props}>
			<AppBadge content={unreadNotificationsCount} bgColor="#FA3E3E" hideZero contentColor="#fff">
				<Flex flexDirection={'column'} alignItems="center" cursor={'pointer'}>
					<Avatar src={user!.profileImg} size={'sm'} />
					<Flex alignItems="center">
						<Text fontSize={'sm'}>Me</Text>
						<Icon ml={1} as={AiFillCaretDown} />
					</Flex>
				</Flex>
			</AppBadge>
		</Box>
	);
});

const HeaderMenu: React.FC<Props> = ({ user }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { unreadNotificationsCount } = useAppSelector((state) => state.user);

	return (
		<Menu>
			<MenuButton as={CustomMenuButton} aria-label="Options" />
			<MenuList p={2}>
				<Flex alignItems={'center'}>
					<Avatar src={user.profileImg} size="md" />
					<Box mx={2}>
						<Text fontSize={'md'} fontWeight={'medium'}>
							{user.fullName}
						</Text>
						<Text fontSize={'sm'} fontWeight={'light'}>
							@{user.username}
						</Text>
					</Box>
				</Flex>
				<Button
					onClick={() => navigate('/profile')}
					mt={3}
					variant="outline"
					colorScheme={'primary'}
					width={'100%'}
					rounded={'full'}
					size={'xs'}
				>
					View Profile
				</Button>
				<Divider mt={3} />
				<Link
					onClick={() => {
						dispatch(logout());
						navigate('/login');
					}}
					fontSize={'sm'}
					fontWeight={'light'}
				>
					Sign Out
				</Link>
				<Divider mt={2} />
				<Flex justifyContent={'space-between'}>
					<Link
						onClick={() => {
							navigate('/notifications');
						}}
						fontSize={'sm'}
						fontWeight={'light'}
					>
						Notificaations
					</Link>
					<AppBadge content={unreadNotificationsCount} bgColor="#FA3E3E" hideZero contentColor="#fff" />
				</Flex>
			</MenuList>
		</Menu>
	);
};

export default HeaderMenu;
