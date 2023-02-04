import { DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IUser } from '../../types/User';
import userApi from '../../api/user';
import { userLog } from '../../utils/swal/userLog';
import { removeConnection } from '../../app/features/user';

interface Props {
	user: IUser;
}

const ConnectionMenu: React.FC<Props> = ({ user }) => {
	const dispatch = useAppDispatch();
	const { data: removeConnData, error: removeConnErr, errorMsg, loading, request: removeConn } = useApiUpdated<any>(
		userApi.removeConnection
	);

	useEffect(
		() => {
			if (removeConnData && !removeConnErr) {
				userLog('success', 'Connection removed successfully!').then(() => {
					dispatch(removeConnection(user._id));
				});
			}
		},
		[
			removeConnData,
			removeConnErr
		]
	);

	const removeHandler = async () => {
		await removeConn(user._id);
	};

	return (
		<Menu>
			<MenuButton as={IconButton} aria-label="Options" icon={<BsThreeDots />} variant="outline" />
			<MenuList>
				<MenuItem onClick={removeHandler} icon={<DeleteIcon />}>
					Remove Connection
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ConnectionMenu;
