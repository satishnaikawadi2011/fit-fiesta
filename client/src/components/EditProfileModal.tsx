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
	useDisclosure,
	Center
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiSauce from 'apisauce';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addPost } from '../app/features/post';
import { getCountryCode, getStateCode } from '../utils/country-state-city/getIsoCodes';
import * as Yup from 'yup';
import { City, Country, State } from 'country-state-city';
import AppFormSelectField, { InputOptionsType } from './form/AppFormSelectField';
import { Formik, FormikProps } from 'formik';
import AppFormField from './form/AppFormField';

interface FormValues {
	username: string;
	fullName: string;
	email: string;
	height?: number;
	weight?: number;
	targetWeight?: number;
	country: string;
	state: string;
	city: string;
}

const validationSchema = Yup.object({
	email: Yup.string().email('Please enter valid email !').required('email is a required field !'),
	username:
		Yup.string().required('username is a required field !').min(4, 'username must be minimum of 4 characters !'),
	fullName: Yup.string().required('fullName is a required field !'),
	weight:
		Yup.number()
			.required('Weight is a required field')
			.min(0, 'Weight must be greater than 0')
			.max(1000, 'Weight is not realistic')
			.positive('Weight must be a positive number'),
	height:
		Yup.number()
			.required('Height a is required field')
			.min(0, 'Height must be greater than 0')
			.max(300, 'Height is not realistic')
			.positive('Height must be a positive number'),
	targetWeight:
		Yup.number()
			.required('targetWeight is a required field')
			.min(0, 'targetWeight must be greater than 0')
			.max(1000, 'targetWeight is not realistic')
			.positive('targetWeight must be a positive number'),
	country: Yup.string().required('country is a required field'),
	state:
		Yup.string().when('country', {
			is: (country: string) => State.getStatesOfCountry(country).length !== 0,
			then: Yup.string().required('state is a required field')
		}),
	city:
		Yup.string().when(
			[
				'country',
				'state'
			],
			{
				is:
					(country: string, state: string) => {
						const statesAvailable = State.getStatesOfCountry(country).length !== 0;
						if (!statesAvailable) return false;

						const citiesAvailable = City.getCitiesOfState(country, state).length !== 0;
						return citiesAvailable;
					},
				then: Yup.string().required('city is a required field')
			}
		)
});

const updatedCountries: InputOptionsType[] = Country.getAllCountries().map((country) => ({
	key: country.name,
	value: country.isoCode
}));

const updatedStates = (countryCode: string) =>
	State.getStatesOfCountry(countryCode).map((state) => ({
		key: state.name,
		value: state.isoCode
	}));

const updatedCities = (countryCode: string, stateCode: string) =>
	City.getCitiesOfState(countryCode, stateCode).map((city) => ({
		key: city.name,
		value: city.name
	}));

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
	const initialRef = React.useRef<any>(null);
	const hiddenFileInput = React.useRef<any>(null);

	const { token, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	const iniCityName = user!.location!.split(',')[0].trim();
	const iniStateName = user!.location!.split(',')[1].trim();
	const iniCountryName = user!.location!.split(',')[2].trim();

	const initialValues: FormValues = {
		email: user!.email,
		username: user!.username,
		fullName: user!.fullName,
		city: iniCityName,
		state: getStateCode(iniStateName)!,
		country: getCountryCode(iniCountryName)!,
		height: user!.height,
		targetWeight: user!.targetWeight,
		weight: user!.weight
	};

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

	const onSubmit = async (values: FormValues) => {
		// console.log(values);
		// const country = Country.getCountryByCode(values.country)!.name;
		// const state = State.getStatesOfCountry(values.country).find((s) => s.isoCode === values.state)?.name;
		// let location = `${country}`
		// let city = ''
		// // const location = `${values.city}, ${state}, ${country}`;
		// if (state) {
		// 	location = `${state} ,` + location;
		// 	city = values.city;
		// 	location = `${city} ,` + location;
		// } else {
		// 	city = '';
		// }
		// console.log(location);
		// await registerUser({
		// 	email: values.email,
		// 	fullName: values.fullName,
		// 	password: values.password,
		// 	username: values.username,
		// 	height: values.height,
		// 	targetWeight: values.targetWeight,
		// 	weight: values.weight,
		// 	location
		// });
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
								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
								>
									{({ handleSubmit, values }: FormikProps<FormValues>) => {
										return (
											<React.Fragment>
												<AppFormField isRequired label="Full Name" name="fullName" />
												<AppFormField isRequired label="Email" name="email" />
												<AppFormField isRequired label="Username" name="username" />
												<AppFormField isRequired label="Weight" name="weight" type="number" />
												<AppFormField isRequired label="Height" name="height" type="number" />
												<AppFormField
													isRequired
													label="Target Weight"
													name="targetWeight"
													type="number"
												/>
												<AppFormSelectField
													isRequired
													name="country"
													label="Country"
													inputOptions={updatedCountries}
													placeholder="Select a country"
												/>
												<AppFormSelectField
													isReadOnly
													name="state"
													label="State"
													inputOptions={updatedStates(values.country)}
												/>
												<AppFormSelectField
													isRequired
													name="city"
													label="City"
													inputOptions={updatedCities(values.country, values.state)}
												/>
											</React.Fragment>
										);
									}}
								</Formik>
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

export default EditProfileModal;
