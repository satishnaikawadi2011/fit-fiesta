import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Textarea
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiSauce from 'apisauce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateUser } from '../../app/features/auth';
import { BACKEND_URL } from '../../constants';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const CreateGroupModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

	const { token, user: authUser } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const api = apiSauce.create({
		baseURL: `${BACKEND_URL}/group`,
		headers:
			{
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`
			}
	});

	const [
		loading,
		setLoading
	] = useState(false);

	const [
		file,
		setFile
	] = useState<any>('');
	const [
		previewUrl,
		setPreviewUrl
	] = useState('');

	const [
		name,
		setName
	] = useState('');
	const [
		description,
		setDescription
	] = useState('');

	const [
		errors,
		setErrors
	] = React.useState<any>({});

	const handleUploadImageClick = () => {
		hiddenFileInput.current.click();
	};

	const handleImageChange = (e: any) => {
		setFile((e.target.files as any)[0]);
		console.log(e.target.files[0]);
		if (e.target.files && e.target.files[0]) {
			setPreviewUrl(URL.createObjectURL((e.target.files as any)[0]));
		}
	};

	const createGroupHandler = async () => {
		if (!name) {
			setErrors({ name: 'Group name is required' });
		}
		else if (!description) {
			setErrors({ description: 'Group description is required' });
		}
		else {
			console.log(file, name, description);
			const formData = new FormData();
			formData.append('name', name);
			formData.append('image', file);
			formData.append('description', description);

			setLoading(true);
			const d: any = await api.post('/', formData);
			const data = d.data;
			const groups = authUser!.groups!;
			const updatedGroups = [
				...groups,
				data.group._id
			];
			dispatch(updateUser({ groups: updatedGroups }));

			setName('');
			setDescription('');
			setFile('');
			setErrors({});
			setLoading(false);
			onClose();
		}
	};

	return (
		<React.Fragment>
			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={

						!loading ? onClose :
						() => {}
				}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create a group</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{
							loading ? <Center>
								<Spinner
									thickness="4px"
									speed="0.65s"
									emptyColor="gray.200"
									color="primary.300"
									size="xl"
								/>
							</Center> :
							<React.Fragment>
								<FormControl isRequired isInvalid={errors.name}>
									<FormLabel>Name</FormLabel>
									<Input value={name} onChange={(e) => setName(e.target.value)} ref={initialRef} />
									<FormErrorMessage>{errors.name}</FormErrorMessage>
								</FormControl>
								<FormControl mt={4} isRequired isInvalid={errors.description}>
									<FormLabel>Description</FormLabel>
									<Input value={description} onChange={(e) => setDescription(e.target.value)} />
									<FormErrorMessage>{errors.description}</FormErrorMessage>
								</FormControl>
								<input
									type="file"
									onChange={handleImageChange}
									style={{ display: 'none' }}
									ref={hiddenFileInput}
									accept="image/*"
								/>
								<Button
									onClick={handleUploadImageClick}
									mt={3}
									variant={'outline'}
									colorScheme="primary"
								>
									Choose a Image
								</Button>
								{previewUrl && <Image mt={3} src={previewUrl} />}
							</React.Fragment>}
					</ModalBody>
					<ModalFooter>
						<Button isDisabled={loading} colorScheme="primary" onClick={createGroupHandler} mr={3}>
							Create
						</Button>
						<Button isDisabled={loading} onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default CreateGroupModal;
