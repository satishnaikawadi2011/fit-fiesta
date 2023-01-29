import React, { useEffect, useState } from 'react';
import { FormikProps, Formik } from 'formik';
import { Button, Flex, Heading, Link, Stack, Image, InputRightElement, Text } from '@chakra-ui/react';
import * as Yup from 'yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AppFormField from '../components/form/AppFormField';
import authApi from '../api/auth';
import useApi from '../hooks/useApi';
import jwtDecode from 'jwt-decode';
import { useAppDispatch } from '../app/hooks';
import { saveToLocalStorage, setExpiryDate, setToken, setUser } from '../app/features/auth';
import { useNavigate } from 'react-router-dom';

interface FormValues {
	username: string;
	password: string;
}

const initialValues: FormValues = {
	username: '',
	password: ''
};

const validationSchema = Yup.object({
	username:
		Yup.string().required('username is a required field !').min(4, 'username must be minimum of 4 characters !'),
	password:
		Yup.string()
			.required('password is a required field !')
			.min(4, 'password must be minimum of 6 characters long !')
			.max(12, 'username can be maximum of 12 characters !')
});

const LoginPage = () => {
	const navigate = useNavigate();

	const [
		showPassword,
		setShowPassword
	] = useState(false);

	const dispatch = useAppDispatch();

	const { data, loading, error, request: loginUser } = useApi(authApi.loginUser);

	useEffect(
		() => {
			if (data) {
				let loginData = data as any;
				const token = loginData.token;
				const decodedToken: any = jwtDecode(token);
				const expiryDate = new Date(decodedToken.exp * 1000);
				const user = loginData.user;
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

	const onSubmit = async (values: FormValues) => {
		await loginUser(values.username, values.password);
	};

	return (
		<div>
			<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
				<Flex p={8} flex={1} align={'center'} justify={'center'}>
					<Stack spacing={4} w={'full'} maxW={'md'}>
						<Heading fontSize={'2xl'}>Sign in to your account</Heading>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							{({ handleSubmit }: FormikProps<FormValues>) => {
								return (
									<React.Fragment>
										<Stack>
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
															onClick={() =>
																setShowPassword((showPassword) => !showPassword)}
														>
															{
																showPassword ? <ViewIcon /> :
																<ViewOffIcon />}
														</Button>
													</InputRightElement>
												}
											/>
										</Stack>

										<Stack spacing={6}>
											<Button
												colorScheme={'blue'}
												variant={'solid'}
												onClick={handleSubmit as any}
												isLoading={error || loading}
											>
												Sign in
											</Button>
											<Stack pt={6}>
												<Text align={'center'}>
													Not a user?{' '}
													<Link onClick={() => navigate('/join')} color={'primary.400'}>
														Register
													</Link>
												</Text>
											</Stack>
										</Stack>
									</React.Fragment>
								);
							}}
						</Formik>
					</Stack>
				</Flex>
				<Flex flex={1}>
					<Image
						alt={'Login Image'}
						objectFit={'cover'}
						src="https://cdn.pixabay.com/photo/2017/07/17/15/41/silhouette-2512805_1280.jpg"
					/>
				</Flex>
			</Stack>
		</div>
	);
};

export default LoginPage;
