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
import { FaHeart, FaShare, FaThumbsUp } from 'react-icons/fa';

interface PostProps {
	name: string;
	username: string;
	date: string;
	postText: string;
	postImage?: string;
	likeCounts: number;
}

const Post: React.FC<PostProps> = ({ name, username, date, postText, postImage, likeCounts }) => {
	const { colorMode } = useColorMode();
	const commentCounts = 20;
	return (
		<Box mb={4} width={500} boxShadow="md">
			<Stack padding={'4'}>
				<Flex align="center">
					<Image
						src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
						alt="Profile"
						width="40px"
						height="40px"
						mr={2}
					/>
					<Box>
						<Link fontWeight="medium">{name}</Link>
						<Text fontSize="sm" color="gray.500">
							@{username} - {date}
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
				<Text fontSize={'sm'}>{commentCounts} comments</Text>
			</Flex>
			<Divider />
			<HStack m={2}>
				<Button width={'100%'} leftIcon={<FaThumbsUp />} bgColor={'transparent'}>
					Like
				</Button>
				<Button width={'100%'} leftIcon={<ChatIcon />} bgColor={'transparent'}>
					Comment
				</Button>
			</HStack>
		</Box>
	);
};

export default Post;
