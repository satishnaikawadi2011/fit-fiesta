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
	Center
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCountryCode, getStateCode } from '../../utils/country-state-city/getIsoCodes';
import * as Yup from 'yup';
import { City, Country, State } from 'country-state-city';
import AppFormSelectField, { InputOptionsType } from '../form/AppFormSelectField';
import { Formik, FormikProps } from 'formik';
import AppFormField from '../form/AppFormField';
import userApi from '../../api/user'
import useApi from '../../hooks/useApi';
import { updateUser } from '../../app/features/auth';
import AppAlert from '../AppAlert';

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

	const {data,error,errorMsg,loading,request:editUserProfileReq} = useApi(userApi.editUserProfile)

	const { user } = useAppSelector((state) => state.auth);
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


	useEffect(() => {
		if (!error && data) {
			const d: any = (data as any).user;
			dispatch(updateUser(d));
			onClose()
		}
	},[data,error])
	

	const onSubmit = async (values: FormValues) => {
		console.log(values);
		const country = Country.getCountryByCode(values.country)!.name;
		const state = State.getStatesOfCountry(values.country).find((s) => s.isoCode === values.state)?.name;
		let location = `${country}`
		let city = ''
		// const location = `${values.city}, ${state}, ${country}`;
		if (state) {
			location = `${state} ,` + location;
			city = values.city;
			location = `${city} ,` + location;
		} else {
			city = '';
		}

		let userData:any = {
			fullName: values.fullName,
			height: values.height,
			targetWeight: values.targetWeight,
			weight: values.weight,
			location
		}

		if (values.email !== user!.email) userData.email = values.email;
		if (values.username !== user!.username) userData.username = values.username;

		await editUserProfileReq(userData);
	};

	return (
		<React.Fragment>
			<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={onSubmit}
								>
				{({ handleSubmit, values }: FormikProps<FormValues>) => {
					return <Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={

						!loading ? onClose :
						() => {}
				}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit profile</ModalHeader>
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
								
											<React.Fragment>
												{errorMsg && <AppAlert mb={3} title='Error!' description={errorMsg} status='error' />}
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
										
							</React.Fragment>}
					</ModalBody>

					<ModalFooter>
						<Button isDisabled={loading} colorScheme="primary" onClick={handleSubmit as any} mr={3}>
							Submit
						</Button>
						<Button  isDisabled={loading} onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
				}}
			</Formik>
			
		</React.Fragment>
	);
};

export default EditProfileModal;
