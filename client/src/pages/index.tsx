import { Center, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AddButtons from '../components/AddButtons';
import Layout from '../components/layout/Layout';
import Post from '../components/post/Post';
import { setPosts } from '../app/features/post';
import useInfiniteScrollPagination from '../hooks/useInfiniteScroll';
import { IPost } from '../types/Post';

const HomePage = () => {
	const dispatch = useAppDispatch();
	const { posts } = useAppSelector((state) => state.post);

	const { hasMore, lastItemRef, loading, items } = useInfiniteScrollPagination<IPost>('/api/post', 2);

	useEffect(
		() => {
			if (items) {
				dispatch(setPosts(items));
			}
		},
		[
			items
		]
	);

	return (
		<Layout title="Home" withProfile>
			<AddButtons />

			{posts.map((post, index) => {
				if (posts.length === index + 1) {
					return (
						<Post
							_id={post._id}
							key={post._id}
							postImage={post.image}
							username={(post.user as any).username}
							name={(post.user as any).fullName}
							postText={post.content}
							date={post.createdAt}
							likeCounts={post.likesCount}
							likesUsers={post.likesUsers}
							refe={lastItemRef}
						/>
					);
				}
				return (
					<Post
						_id={post._id}
						key={post._id}
						postImage={post.image}
						username={(post.user as any).username}
						name={(post.user as any).fullName}
						postText={post.content}
						date={post.createdAt}
						likeCounts={post.likesCount}
						likesUsers={post.likesUsers}
					/>
				);
			})}
			{loading && (
				<Center>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
				</Center>
			)}
			{!hasMore && (
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			)}
		</Layout>
	);
};

export default HomePage;
