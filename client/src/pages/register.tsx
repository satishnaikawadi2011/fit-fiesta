import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	InputRightElement,
	Link,
	Stack,
	useColorModeValue,
	Text,
	useColorMode
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { FormikProps } from 'formik/dist/types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import AppFormField from '../components/form/AppFormField';
import Logo from '../components/Logo';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth';
import { useAppDispatch } from '../app/hooks';
import useApi from '../hooks/useApi';
import jwtDecode from 'jwt-decode';
import { saveToLocalStorage, setExpiryDate, setToken, setUser } from '../app/features/auth';
import { userLog } from '../utils/swal/userLog';
import AppFormSelectField, { InputOptionsType } from '../components/form/AppFormSelectField';
import { City, Country, State } from 'country-state-city';
interface FormValues {
	username: string;
	fullName: string;
	email: string;
	password: string;
	height?: number;
	weight?: number;
	targetWeight?: number;
	country: string;
	state: string;
	city: string;
}

const indiaCode = Country.getAllCountries().find((c) => c.name === 'India')!.isoCode;
const maharashtraCode = State.getStatesOfCountry(indiaCode).find((s) => s.name === 'Maharashtra')!.isoCode;
const mumbai = City.getCitiesOfState(indiaCode, maharashtraCode).find((c) => c.name === 'Mumbai')!.name;

const initialValues: FormValues = {
	email: '',
	username: '',
	fullName: '',
	password: '',
	city: '',
	state: '',
	country: ''
};

const validationSchema = Yup.object({
	email: Yup.string().email('Please enter valid email !').required('email is a required field !'),
	username:
		Yup.string().required('username is a required field !').min(4, 'username must be minimum of 4 characters !'),
	password:
		Yup.string()
			.required('password is a required field !')
			.min(4, 'password must be minimum of 6 characters long !')
			.max(12, 'username can be maximum of 12 characters !'),
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

const RegisterPage = () => {
	const navigate = useNavigate();
	const [
		showPassword,
		setShowPassword
	] = useState(false);

	const dispatch = useAppDispatch();
	const {colorMode} = useColorMode()

	const { data, loading, error, request: registerUser, errorMsg } = useApi(authApi.registerUser);

	useEffect(
		() => {
			if (data) {
				let registerData = data as any;
				const token = registerData.token;
				const decodedToken: any = jwtDecode(token);
				const expiryDate = new Date(decodedToken.exp * 1000);
				const user = registerData.user;
				dispatch(setExpiryDate(expiryDate.toISOString()));
				dispatch(setUser(user));
				dispatch(setToken(token));
				saveToLocalStorage(user, expiryDate.toISOString(), token);
				navigate('/');
			}
		},
		[
			data
		]
	);

	const showError = async () => {
		if (error) {
			const d = await userLog('error', errorMsg,colorMode);
			console.log(d);
		}
	};

	useEffect(
		() => {
			showError();
		},
		[
			error,
			errorMsg
		]
	);

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

		console.log(location);
		await registerUser({
			email: values.email,
			fullName: values.fullName,
			password: values.password,
			username: values.username,
			height: values.height,
			targetWeight: values.targetWeight,
			weight: values.weight,
			location
		});
	};

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ handleSubmit, values }: FormikProps<FormValues>) => {
					return (
						<Flex
							minH={'100vh'}
							align={'center'}
							justify={'center'}
							bg={useColorModeValue('gray.50', 'gray.800')}
						>
							<Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
								<Stack align={'center'}>
									<HStack>
										<Logo width={'5rem'} height={'5rem'} fill="#A2D2FF" />
										<Heading
											fontSize={'4xl'}
											fontStyle="italic"
											color={'primary.200'}
											textAlign={'center'}
										>
											FitFiesta
										</Heading>
									</HStack>
									<Heading fontSize={'4xl'} textAlign={'center'}>
										Sign up
									</Heading>
									<Text fontSize={'lg'} color={'gray.600'}>
										to enjoy all of our cool features ✌️
									</Text>
								</Stack>
								<Box
									w={500}
									rounded={'lg'}
									bg={useColorModeValue('white', 'gray.700')}
									boxShadow={'lg'}
									p={8}
								>
									<Stack>
										<AppFormField isRequired label="Full Name" name="fullName" />
										<AppFormField isRequired label="Email" name="email" />
										<AppFormField isRequired label="Username" name="username" />
										<AppFormField
											isRequired
											label="Password"
											name="password"
											type={

													showPassword ? 'text' :
													'password'
											}
											withIcon
											iconSide="right"
											iconElement={
												<InputRightElement h={'full'}>
													<Button
														variant={'ghost'}
														onClick={() => setShowPassword((showPassword) => !showPassword)}
													>
														{
															showPassword ? <ViewIcon /> :
															<ViewOffIcon />}
													</Button>
												</InputRightElement>
											}
										/>
								
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
											inputOptions={updatedStates(values.country,)}
										/>
										<AppFormSelectField
											isRequired
											name="city"
											label="City"
											inputOptions={updatedCities(values.country, values.state)}
										/>
										<Stack spacing={10} pt={2}>
											<Button
												loadingText="Submitting"
												size="lg"
												bg={'primary.300'}
												color={'white'}
												_hover={{
													bg: 'primary.400'
												}}
												onClick={handleSubmit as any}
												isLoading={loading}
											>
												Sign up
											</Button>
										</Stack>
										<Stack pt={6}>
											<Text align={'center'}>
												Already a user?{' '}
												<Link onClick={() => navigate('/login')} color={'primary.400'}>
													Login
												</Link>
											</Text>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Flex>
					);
				}}
			</Formik>
		</div>
	);
};

export default RegisterPage;
