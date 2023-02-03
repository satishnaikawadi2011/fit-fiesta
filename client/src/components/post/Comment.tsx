import {
	Box,
	Flex,
	Image,
	Text,
	Textarea,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	useColorMode,
	Link
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

interface CommentProps {
	name: string;
	username: string;
	date: string;
	comment: string;
}

dayjs.extend(relativeTime);

const Comment: React.FC<CommentProps> = ({ name, username, date, comment }) => {
	return (
		<Box mb={4} boxShadow="sm" padding={'4'} rounded={'lg'} bgColor="gray.100">
			<Flex align="center">
				<Image
					src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
					alt="Profile"
					width="40px"
					height="40px"
					mr={2}
				/>
				<Box width={'100%'}>
					<Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
						<Link fontWeight="medium">{name}</Link>
						<Text fontSize="sm" color="gray.500">
							{dayjs(date).fromNow(true)}
						</Text>
					</Flex>
					<Text fontSize="sm" color="gray.500">
						@{username}
					</Text>
				</Box>
			</Flex>
			<Box mt={2}>
				<Text>{comment}</Text>
			</Box>
		</Box>
	);
};

export default Comment;
