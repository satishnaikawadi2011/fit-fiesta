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
	Textarea,
	useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import apiSauce from 'apisauce';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const AddEventModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

	const { token, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const api = apiSauce.create({
		baseURL: 'http://localhost:5000/api/event',
		headers:
			{
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`
			}
	});

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

	const [
		loading,
		setLoading
	] = useState(false);

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

	const addEventHandler = async () => {
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
			const formData = new FormData();
			formData.append('name', name);
			if (location) {
				formData.append('location', location);
			}
			if (group) {
				formData.append('group', group);
			}
			formData.append('image', file);
			formData.append('description', description);
			formData.append('date', startDate);

			setLoading(true);
			const d: any = await api.post('/', formData);
			const data = d.data;

			setName('');
			setDescription('');
			setLocation('');
			setFile('');
			setGroup('');
			setStartDate(new Date());
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
					<ModalHeader>Add a event</ModalHeader>
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
							</React.Fragment>}
					</ModalBody>

					<ModalFooter>
						<Button isDisabled={loading} colorScheme="primary" onClick={addEventHandler} mr={3}>
							Add
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

export default AddEventModal;
