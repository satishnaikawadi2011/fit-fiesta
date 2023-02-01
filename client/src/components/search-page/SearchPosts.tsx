import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../../api/client';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IPost } from '../../types/Post';
import Post from '../Post';

const SearchPosts = () => {
	const [
		resultPosts,
		setResultPosts
	] = useState<IPost[]>([]);
	const [
		page,
		setPage
	] = useState(1);
	const [
		loading,
		setLoading
	] = useState(false);

	const { searchTerm } = useAppSelector((state) => state.common);

	const [
		hasMore,
		setHasMore
	] = useState(resultPosts.length > 0);

	const fetchPosts = async () => {
		setLoading(true);
		const data: any = await apiClient.get(`http://localhost:5000/api/post/search/${searchTerm}?limit=3&page=1`);
		setResultPosts(data.data);
		setLoading(false);
	};

	useEffect(() => {
		fetchPosts();
		setPage(page + 1);
	}, []);

	const fetchMorePosts = async () => {
		setPage((prevPage) => prevPage + 1);
		setLoading(true);
		const data: any = await apiClient.get(
			`http://localhost:5000/api/post/search/${searchTerm}?limit=3&page=${page}`
		);
		if (data.data.length == 0) setHasMore(false);
		setResultPosts([
			...resultPosts,
			...data.data
		]);
		setLoading(false);
	};
	return (
		<React.Fragment>
			<InfiniteScroll
				dataLength={resultPosts.length} //This is important field to render the next data
				next={fetchMorePosts}
				hasMore={hasMore}
				loader={
					<Center>
						<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
					</Center>
				}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{resultPosts.map((post) => {
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
			</InfiniteScroll>
		</React.Fragment>
	);
};

export default SearchPosts;
