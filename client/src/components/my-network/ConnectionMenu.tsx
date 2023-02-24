import { DeleteIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, IconButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IUser } from '../../types/User';
import userApi from '../../api/user';
import { userLog } from '../../utils/swal/userLog';
import { removeConnection } from '../../app/features/user';
import { updateUser } from '../../app/features/auth';

interface Props {
	user: IUser;
}

const ConnectionMenu: React.FC<Props> = ({ user }) => {
	const dispatch = useAppDispatch();
	const { user: authUser } = useAppSelector((state) => state.auth);
	const { data: removeConnData, error: removeConnErr, errorMsg, loading, request: removeConn } = useApiUpdated<any>(
		userApi.removeConnection
	);
	const { colorMode } = useColorMode();

	useEffect(
		() => {
			if (removeConnData && !removeConnErr) {
				userLog('success', 'Connection removed successfully!', colorMode).then(() => {
					dispatch(removeConnection(user._id));
					const updatedConns = authUser!.connections!.filter((c) => c !== user._id);
					dispatch(updateUser({ connections: updatedConns }));
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
