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
	Textarea,
	useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { isValidURL } from '../utils/isValidURL';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const AddResourceModal: React.FC<Props> = ({ isOpen, onClose }) => {
	// const { isOpen, onOpen, onClose } = useDisclosure();

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
		location,
		setLocation
	] = useState('');
	const [
		url,
		setUrl
	] = useState('');
	const [
		category,
		setCategory
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

	const addResourceHandler = () => {
		if (!name) {
			setErrors({ name: 'Resource name is required' });
		}
		else if (!description) {
			setErrors({ description: 'Resource description is required' });
		}
		else if (!url) {
			setErrors({ url: 'Resource url is required' });
		}
		else if (!category) {
			setErrors({ category: 'Resource category is required' });
		}
		else if (!isValidURL(url)) {
			setErrors({ url: 'Please enter a valid url' });
		}
		else {
			console.log(file, name, description, category, url);
			setName('');
			setDescription('');
			setCategory('');
			setUrl('');
			setLocation('');
			setFile('');
			setErrors({});
		}
	};

	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add a resource</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
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
						<Button onClick={handleUploadImageClick} mt={3} variant={'outline'} colorScheme="primary">
							Choose a Image
						</Button>
						{previewUrl && <Image mt={3} src={previewUrl} />}
						<FormControl mt={4}>
							<FormLabel>Location</FormLabel>
							<Input value={location} onChange={(e) => setLocation(e.target.value)} />
						</FormControl>
						<FormControl mt={4} isRequired isInvalid={errors.url}>
							<FormLabel>URL</FormLabel>
							<Input value={url} onChange={(e) => setUrl(e.target.value)} />
							<FormErrorMessage>{errors.url}</FormErrorMessage>
						</FormControl>
						<FormControl mt={4} isRequired isInvalid={errors.category}>
							<FormLabel>Category</FormLabel>
							<Input value={category} onChange={(e) => setCategory(e.target.value)} />
							<FormErrorMessage>{errors.category}</FormErrorMessage>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="primary" onClick={addResourceHandler} mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default AddResourceModal;
