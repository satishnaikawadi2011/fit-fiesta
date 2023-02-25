import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Divider } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../../types/User';
import UserListItem from '../user/UserListItem';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	mutualConns: IUser[];
	withGroup?: boolean;
}

const MutualConnsModel: React.FC<Props> = ({ isOpen, onClose, mutualConns, name, withGroup = false }) => {
	const initialRef = React.useRef<any>(null);
	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					{
						withGroup ? <ModalHeader
						>{`${mutualConns.length} connections are in the group ${name}`}</ModalHeader> :
						<ModalHeader>{`${mutualConns.length} mutual connections with ${name}`}</ModalHeader>}
					<ModalCloseButton />
					<ModalBody pb={6}>
						{mutualConns.map((conn) => {
							return (
								<React.Fragment key={conn._id}>
									<UserListItem user={conn} />
									<Divider my={2} />
								</React.Fragment>
							);
						})}
					</ModalBody>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default MutualConnsModel;
