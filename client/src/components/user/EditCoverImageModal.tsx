import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Center,
	Avatar,
    Text,
    Image
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

const EditCoverImageModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

	const { token, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const api = apiSauce.create({
		baseURL: `${BACKEND_URL}/user`,
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
		loading,
		setLoading
    ] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

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

	const changeProfileImageHandler = async () => {
        console.log(file);
        setErrorMsg('')
		const formData = new FormData();
		formData.append('image', file);
		setLoading(true);
		const d: any = await api.post('/coverImg', formData);
        const data = d.data;
        
        if (!d?.ok) {
			console.log(d)
			setErrorMsg(data.message)
			return
		}

		dispatch(updateUser(data));

        setFile('');
        setErrorMsg('')
		setLoading(false);
		onClose();
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
					<ModalHeader>Add background image</ModalHeader>
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
								<input
									type="file"
									onChange={handleImageChange}
									style={{ display: 'none' }}
									ref={hiddenFileInput}
									accept="image/*"
								/>
								<Image mt={3} src={previewUrl || user!.coverImg} width={'100%'} height={250} />
								<Center>
									<Button
										onClick={handleUploadImageClick}
										mt={3}
										variant={'outline'}
										colorScheme="primary"
									>
										Choose a Image
									</Button>
                                    </Center>
                                   {errorMsg &&  <Center mt={3}>
                                        <Text fontSize={'sm'} color={'red.500'}>{errorMsg}</Text>
                                    </Center>}
							</React.Fragment>}
					</ModalBody>

					<ModalFooter>
						<Button isDisabled={loading} colorScheme="primary" onClick={changeProfileImageHandler} mr={3}>
							Change
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

export default EditCoverImageModal;
