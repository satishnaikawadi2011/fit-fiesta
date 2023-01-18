import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

const CommentInput: React.FC<InputProps> = ({ ...props }) => {
	return (
		<React.Fragment>
			<Input placeholder="Add a comment..." rounded={'full'} {...props} />
		</React.Fragment>
	);
};

export default CommentInput;
