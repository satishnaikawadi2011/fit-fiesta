import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Center,
	Spinner,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
	ModalFooter
} from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../app/features/common';
import { useAppDispatch } from '../../app/hooks';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const SearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [
		query,
		setQuery
	] = React.useState('');
	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Search</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{
							<React.Fragment>
								<FormControl>
									<Input
										type="search"
										value={query}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
										placeholder="Search..."
										ref={initialRef}
									/>
								</FormControl>
							</React.Fragment>
						}
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="primary"
							mr={3}
							onClick={() => {
								if (!query || query.trim() === '') return;
								dispatch(setSearchTerm(query));
								if (location.pathname === '/search') {
									onClose();
									return;
								}
								navigate('/search');
								onClose();
							}}
						>
							Search
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default SearchModal;
