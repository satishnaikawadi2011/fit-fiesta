import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Formik } from 'formik';
import { FormikProps } from 'formik/dist/types';
import React from 'react';
import * as Yup from 'yup';
import AppFormField from '../components/form/AppFormField';

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
			.required('Weight is required')
			.min(0, 'Weight must be greater than 0')
			.max(1000, 'Weight is not realistic')
			.positive('Weight must be a positive number'),
	height:
		Yup.number()
			.required('Height is required')
			.min(0, 'Height must be greater than 0')
			.max(300, 'Height is not realistic')
			.positive('Height must be a positive number'),
	targetWeight:
		Yup.number()
			.required('targetWeight is required')
			.min(0, 'targetWeight must be greater than 0')
			.max(1000, 'targetWeight is not realistic')
			.positive('targetWeight must be a positive number')
});

const RegisterPage = () => {
	const handleSubmit = () => {};

	return (
		<div>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({  }: FormikProps<FormValues>) => {
					return (
						<form>
							<AppFormField isRequired label="Full Name" name="fullName" />
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default RegisterPage;
