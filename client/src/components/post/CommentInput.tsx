import { Input, InputProps, useColorMode } from '@chakra-ui/react';
import React from 'react';

const CommentInput: React.FC<InputProps> = ({ ...props }) => {
	const { colorMode } = useColorMode();
	return (
		<React.Fragment>
			<Input
				placeholder="Add a comment..."
				bgColor={

						colorMode === 'dark' ? '#454D52' :
						'#EDF2F7'
				}
				{...props}
			/>
		</React.Fragment>
	);
};

export default CommentInput;
