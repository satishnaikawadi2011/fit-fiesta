import { DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IUser } from '../../types/User';

interface Props {
	user: IUser;
}

const ConnectionMenu: React.FC<Props> = ({ user }) => {
	return (
		<Menu>
			<MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDots />} variant="outline" />
			<MenuList>
				<MenuItem icon={<DeleteIcon />}>Remove Connection</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ConnectionMenu;
