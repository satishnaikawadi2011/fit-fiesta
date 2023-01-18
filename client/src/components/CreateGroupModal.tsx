import {
	Button,
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
	Textarea
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const CreateGroupModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

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

	const createGroupHandler = () => {
		if (!name) {
			setErrors({ name: 'Group name is required' });
		}
		else if (!description) {
			setErrors({ description: 'Group description is required' });
		}
		else {
			console.log(file, name, description);
			setName('');
			setDescription('');
			setFile('');
			setErrors({});
		}
	};

	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create a group</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl isRequired isInvalid={errors.name}>
							<FormLabel>Name</FormLabel>
							<Textarea value={name} onChange={(e) => setName(e.target.value)} ref={initialRef} />
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
						<Button onClick={handleUploadImageClick} mt={3} variant={'outline'} colorScheme="primary">
							Choose a Image
						</Button>
						{previewUrl && <Image mt={3} src={previewUrl} />}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="primary" onClick={createGroupHandler} mr={3}>
							Create
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default CreateGroupModal;
