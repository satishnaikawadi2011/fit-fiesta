import { FormControl, FormErrorMessage, FormLabel, Select, SelectProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';

export interface InputOptionsType {
	key: string | number;
	value: string | number;
}

export interface Props {
	inputOptions: InputOptionsType[];
	label: string;
	name: string;
}

const AppFormSelectField: React.FC<Props & SelectProps> = ({
	isRequired,
	name,
	inputOptions,
	label,
	placeholder,
	...props
}) => {
	const { errors, touched, setFieldTouched, values, setFieldValue } = useFormikContext();
	let formErrors: any = errors;
	let formTouched: any = touched;
	let myValues = values as any;

	const options = (
		<React.Fragment>
			{inputOptions.map((opt: InputOptionsType) => {
				return (
					<option key={opt.key} value={opt.value}>
						{opt.key}
					</option>
				);
			})}
		</React.Fragment>
	);

	return (
		<FormControl mt={4} isRequired>
			<FormLabel>{label}</FormLabel>
			<Select
				name={name}
				onChange={(e) => setFieldValue(name, e.target.value)}
				value={myValues[name]}
				onBlur={() => setFieldTouched(name)}
				{...props}
			>
				<option value="default" disabled>
					{placeholder}
				</option>
				{options}
			</Select>
			{formErrors[name] && formTouched[name] && <FormErrorMessage>{formErrors[name]}</FormErrorMessage>}
		</FormControl>
	);
};

export default AppFormSelectField;
