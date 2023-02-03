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
	Spinner,
	Textarea,
	Center
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiSauce from 'apisauce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addPost } from '../../app/features/post';

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const AddPostModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

	const { token, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const api = apiSauce.create({
		baseURL: 'http://localhost:5000/api/post',
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

	const addPostHandler = async () => {
		if (!content) {
			setErrors({ content: 'Post content is required' });
		}
		else {
			console.log(file, content, location, group);
			const formData = new FormData();
			formData.append('content', content);
			formData.append('location', location);
			formData.append('group', group);
			formData.append('image', file);
			setLoading(true);
			const d: any = await api.post('/', formData);
			const data = d.data;
			dispatch(
				addPost({
					_id: data.post._id,
					content: data.post.content,
					createdAt: data.post.createdAt,
					likesCount: data.post.likesCount,
					image: data.post.image,
					location: data.post.location,
					group: data.post.group,
					updatedAt: data.post.updatedAt,
					user: { fullName: user!.fullName, username: user!.username, _id: user!._id },
					likesUsers: [],
					comments: []
				})
			);

			setContent('');
			setLocation('');
			setFile('');
			setGroup('');
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
					<ModalHeader>Add a post</ModalHeader>
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
								<FormControl isRequired isInvalid={errors.content}>
									<FormLabel>What's on your mind?</FormLabel>
									<Textarea
										value={content}
										onChange={(e) => setContent(e.target.value)}
										ref={initialRef}
									/>
									<FormErrorMessage>{errors.content}</FormErrorMessage>
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
							</React.Fragment>}
					</ModalBody>

					<ModalFooter>
						<Button isDisabled={loading} colorScheme="primary" onClick={addPostHandler} mr={3}>
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

export default AddPostModal;
