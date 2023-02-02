import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../types/User';
import UserListItem from './UserListItem';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	name: string;
	mutualConns: IUser[];
}

const MutualConnsModel: React.FC<Props> = ({ isOpen, onClose, mutualConns, name }) => {
	const initialRef = React.useRef<any>(null);
	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{`${mutualConns.length} mutual connections with ${name}`}</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{mutualConns.map((conn) => {
							return <UserListItem key={conn._id} user={conn} />;
						})}
					</ModalBody>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default MutualConnsModel;
