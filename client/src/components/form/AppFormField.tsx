import { FormControl, FormHelperText, FormLabel, Input, InputProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';

interface Props {
	label: string;
	name: string;
}

const AppFormField: React.FC<InputProps & Props> = ({ label, name, isRequired, ...props }) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;

	return (
		<FormControl marginBottom={5} isInvalid={formErrors[name] && formTouched[name]} isRequired={isRequired}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<Input
				id={name}
				name={name}
				onChange={(e) => setFieldValue(name, e.target.value)}
				value={myValues[name]}
				onBlur={() => setFieldTouched(name)}
				{...props}
			/>
			{formErrors[name] && formTouched[name] && <FormHelperText color={'red'}>{formErrors[name]}</FormHelperText>}
		</FormControl>
	);
};

export default AppFormField;
