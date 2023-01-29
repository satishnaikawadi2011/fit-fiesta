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
	Text
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { FormikProps } from 'formik/dist/types';
import { useState } from 'react';
import * as Yup from 'yup';
import AppFormField from '../components/form/AppFormField';
import Logo from '../components/Logo';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface FormValues {
	username: string;
	fullName: string;
	email: string;
	password: string;
	location: string;
	height?: number;
	weight?: number;
	targetWeight?: number;
}

const initialValues: FormValues = {
	email: '',
	username: '',
	fullName: '',
	location: '',
	password: ''
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
	location: Yup.string().required('location is a required field !'),
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
			.positive('targetWeight must be a positive number')
});

const RegisterPage = () => {
	const navigate = useNavigate();
	const [
		showPassword,
		setShowPassword
	] = useState(false);
	const onSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ handleSubmit }: FormikProps<FormValues>) => {
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
										<AppFormField isRequired label="Location" name="location" />
										<AppFormField isRequired label="Weight" name="weight" type="number" />
										<AppFormField isRequired label="Height" name="height" type="number" />
										<AppFormField
											isRequired
											label="Target Weight"
											name="targetWeight"
											type="number"
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
