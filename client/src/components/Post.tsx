import { ChatIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Image,
	Text,
	Icon,
	IconButton,
	Link,
	useColorMode,
	Stack,
	Divider,
	Button,
	HStack
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { FaHeart, FaShare, FaThumbsUp } from 'react-icons/fa';
import CommentInput from './CommentInput';

interface PostProps {
	name: string;
	username: string;
	date: string;
	postText: string;
	postImage?: string;
	likeCounts: number;
}

dayjs.extend(relativeTime);

const Post: React.FC<PostProps> = ({ name, username, date, postText, postImage, likeCounts }) => {
	const [
		showComm,
		setShowComm
	] = useState(false);
	const [
		comment,
		setComment
	] = useState('');
	const isEmpty = comment === '' || comment.trim() === '';
	const commentCounts = 20;

	const addPostHandler = () => {
		setComment('');
	};

	return (
		<Box mb={4} boxShadow="md">
			<Stack padding={'4'}>
				<Flex align="center">
					<Image
						src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
						alt="Profile"
						width="40px"
						height="40px"
						mr={2}
					/>
					<Box width={'100%'}>
						<Flex width={'100%'} alignItems={'center'} justifyContent="space-between">
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
				<Text>{postText}</Text>
			</Stack>
			<Box mt={2}>
				{postImage && (
					<Box mt={2}>
						<Image src={postImage} alt="Post Image" />
					</Box>
				)}
			</Box>
			<Flex justifyContent={'space-between'} m={2}>
				<Text fontSize={'sm'}>{likeCounts} likes</Text>
				<Text onClick={() => setShowComm(true)} cursor={'pointer'} fontSize={'sm'}>
					{commentCounts} comments
				</Text>
			</Flex>
			<Divider />
			<HStack m={2}>
				<Button width={'100%'} leftIcon={<FaThumbsUp />} bgColor={'transparent'}>
					Like
				</Button>
				<Button
					width={'100%'}
					leftIcon={<ChatIcon />}
					bgColor={'transparent'}
					onClick={() => setShowComm(true)}
				>
					Comment
				</Button>
			</HStack>
			{showComm && (
				<div>
					<CommentInput
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						mt={2}
						width="96%"
						marginX={'2%'}
					/>
					{!isEmpty && (
						<Button
							ml={6}
							mt={2}
							rounded={'full'}
							width={'20'}
							color="white"
							bgColor={'primary.300'}
							_hover={{ bgColor: 'primary.400' }}
							onClick={addPostHandler}
						>
							Post
						</Button>
					)}
				</div>
			)}
		</Box>
	);
};

export default Post;
