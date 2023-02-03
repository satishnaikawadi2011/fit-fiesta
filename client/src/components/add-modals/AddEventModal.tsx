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
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const AddEventModal: React.FC<Props> = ({ isOpen, onClose }) => {
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
		group,
		setGroup
	] = useState('');
	const [
		startDate,
		setStartDate
	] = useState<any>(new Date());

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
		else if (!startDate) {
			setErrors({ date: 'Date and time is required' });
		}
		else {
			console.log(file, name, description, group, startDate, location);
			setName('');
			setDescription('');
			setLocation('');
			setFile('');
			setGroup('');
			setStartDate(new Date());
			setErrors({});
		}
	};

	return (
		<React.Fragment>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add a event</ModalHeader>
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
						<FormControl mt={4} isRequired isInvalid={errors.date}>
							<FormLabel>Date and time</FormLabel>
							<ReactDatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								showTimeSelect
								dateFormat="MMMM d, yyyy h:mm aa"
							/>
							<FormErrorMessage>{errors.date}</FormErrorMessage>
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

export default AddEventModal;
