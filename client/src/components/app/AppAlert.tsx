import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box, AlertProps } from '@chakra-ui/react';
import React from 'react';

interface Props {
	onClose?: () => void;
	title: string;
	description: string;
}

const AppAlert: React.FC<Props & AlertProps> = ({ onClose, description, title, ...props }) => {
	return (
		<Alert {...props}>
			<AlertIcon />
			<Box>
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</Box>
			<CloseButton alignSelf="flex-start" position="absolute" m={2} right={-1} top={-1} onClick={onClose} />
		</Alert>
	);
};

export default AppAlert;
