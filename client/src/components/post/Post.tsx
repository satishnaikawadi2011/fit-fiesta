import { ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text, Link, Stack, Divider, Button, HStack, Center } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { likePost } from '../../app/features/post';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CommentInput from './CommentInput';
import postApi from '../../api/post';
import useApi from '../../hooks/useApi';
import { PRIMARY } from '../../constants/colors';
import apiClient from '../../api/client';
import Comment from './Comment';
import { IComment } from '../../types/Comment';
import ReactDOM from 'react-dom';
import useApiUpdated from '../../hooks/useApiUpdated';
import PostSkeleton from './skeletons/PostSkeleton';
import useBlockBgColor from '../../hooks/useBlockBgColor';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';

interface PostProps {
	_id: string;
	name: string;
	username: string;
	date: string;
	postText: string;
	postImage?: string;
	likeCounts: number;
	likesUsers?: string[];
	refe?: any;
}

dayjs.extend(relativeTime);

const Post: React.FC<PostProps> = ({ _id,refe, name, username, date, postText, postImage, likeCounts, likesUsers }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate()
	const { request: likePostReq } = useApi(postApi.likePost);
	const { request: addCommReq, data: newComm, loading: newCommLoad }: any = useApi(postApi.addComment);
	const { data: commentCountData, loading: commCntLoad, request: getCommCount } = useApiUpdated<{ commentCount: number }>(
		postApi.getCommentCount
	);
	const { user } = useAppSelector((state) => state.auth);

	const [
		showComm,
		setShowComm
	] = useState(false);
	const [
		comment,
		setComment
	] = useState('');
	const [
		page,
		setPage
	] = useState(1);
	const [
		comments,
		setComments
	] = useState<IComment[]>([]);
	const [
		loading,
		setLoading
	] = useState(false);
	const [
		hasMore,
		setHasMore
	] = useState(true);
	const blockBg = useBlockBgColor()
	const isEmpty = comment === '' || comment.trim() === '';

	const addCommentHandler = async () => {
		await addCommReq(_id, comment);
		setComment('');
	};

	const alreadyLiked = likesUsers!.includes(user!._id);

	const likePostHandler = () => {
		dispatch(likePost({ userId: user!._id, postId: _id }));
		likePostReq(_id);
	};

	useEffect(
		() => {
			if (showComm) {
				fetchComments();
			}
		},
		[
			showComm
		]
	);

	useEffect(() => {
		getCommCount(_id);
	}, []);

	const fetchComments = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`${BACKEND_URL}/post/comments/${_id}?page=1&limit=1`);
		setComments(data.data);
		setLoading(false);
	};

	const fetchMoreComments = async () => {
		setPage(page + 1);
		setLoading(true);
		const data: any = await apiClient.get(
			`${BACKEND_URL}/post/comments/${_id}?page=${page + 1}&limit=1`
		);
		setComments([
			...comments,
			...data.data
		]);
		if (data.data.length === 0) setHasMore(false);
		setLoading(false);
		console.log(hasMore);
	};

	useEffect(
		() => {
			if (newComm) {
				fetchComments();
			}
		},
		[
			newComm
		]
	);

	if (commCntLoad) {
		return <PostSkeleton />;
	}

	return (
		<Box mb={4} boxShadow="md" bg={blockBg} ref={refe}>
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
						<Link onClick={() => navigate(`/profile/${username}`)} fontSize="sm" color="gray.500">
							@{username}
						</Link>
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
					{commentCountData?.commentCount} comments
				</Text>
			</Flex>
			<Divider />
			<HStack m={2}>
				<Button
					width={'100%'}
					color={

							alreadyLiked ? PRIMARY :
							''
					}
					leftIcon={
						<FaThumbsUp
							color={

									alreadyLiked ? PRIMARY :
									''
							}
						/>
					}
					bgColor={'transparent'}
					onClick={likePostHandler}
				>
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
						mb={3}
					/>
					{!isEmpty && (
						<Center>
							<Button
								rounded={'full'}
							width={'95%'}
							color="white"
							bgColor={'primary.300'}
							_hover={{ bgColor: 'primary.400' }}
							onClick={addCommentHandler}
							isLoading={newCommLoad}
						>
							Post
						</Button>
						</Center>
					)}
					{comments.map((c: any, i) => {
						if (comments.length - 1 === i) {
							return (
								<React.Fragment key={c._id}>
									<Comment
										comment={c.content}
										date={c.createdAt}
										name={c.user.fullName}
										username={c.user.username}
									/>
									<Center>
										<Button
											m={2}
											rounded={'full'}
											bg="primary.300"
											color="white"
											_hover={{ bg: 'primary.400' }}
											width={'95%'}
											onClick={() => {
												fetchMoreComments();
											}}
											isDisabled={!hasMore}
										>
											Load More
										</Button>
									</Center>
								</React.Fragment>
							);
						}
						else {
							return (
								<Comment
									key={c._id}
									comment={c.content}
									date={c.createdAt}
									name={c.user.fullName}
									username={c.user.username}
								/>
							);
						}
					})}
				</div>
			)}
		</Box>
	);
};

export default Post;
