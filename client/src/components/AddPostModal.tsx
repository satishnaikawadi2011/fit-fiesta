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

interface Props {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const AddPostModal: React.FC<Props> = ({ isOpen, onOpen, onClose }) => {
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
		content,
		setContent
	] = useState('');
	const [
		location,
		setLocation
	] = useState('');
	const [
		group,
		setGroup
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

	const addPostHandler = () => {
		if (!content) {
			setErrors({ content: 'Post content is required' });
		}
		else {
			console.log(file, content, location, group);
			setContent('');
			setLocation('');
			setFile('');
			setGroup('');
			setErrors({});
		}
	};

	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add a post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl isRequired isInvalid={errors.content}>
							<FormLabel>What's on your mind?</FormLabel>
							<Textarea value={content} onChange={(e) => setContent(e.target.value)} ref={initialRef} />
							<FormErrorMessage>{errors.content}</FormErrorMessage>
						</FormControl>

						<input
							type="file"
							onChange={handleImageChange}
							style={{ display: 'none' }}
							ref={hiddenFileInput}
						/>
						<Button onClick={handleUploadImageClick} mt={3} variant={'outline'} colorScheme="primary">
							Choose a Image
						</Button>
						{previewUrl && <Image mt={3} src={previewUrl} />}
						<FormControl mt={4}>
							<FormLabel>Location</FormLabel>
							<Input value={location} onChange={(e) => setLocation(e.target.value)} />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Do you want to share it in any specific group ?</FormLabel>
							<Select
								value={group}
								onChange={(e) => setGroup(e.target.value)}
								placeholder="Select group "
							>
								<option value="option1">Option 1</option>
								<option value="option2">Option 2</option>
								<option value="option3">Option 3</option>
							</Select>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="primary" onClick={addPostHandler} mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
};

export default AddPostModal;
