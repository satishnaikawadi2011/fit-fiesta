import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';

interface Props {}

const AppFAB: React.FC<IconButtonProps & Props> = ({ ...props }) => {
	return (
		<IconButton
			size={'lg'}
			position={'fixed'}
			colorScheme={'primary'}
			bottom={5}
			left={5}
			rounded={'full'}
			{...props}
		/>
	);
};

export default AppFAB;
