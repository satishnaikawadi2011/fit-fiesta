import { Center, Grid, GridItem, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import AddButtons from '../components/AddButtons';
import Layout from '../components/layout/Layout';
import Post from '../components/Post';
import UserProfileCard from '../components/UserProfileCard';
import postApi from '../api/post'
import useApi from '../hooks/useApi';
import { IPost } from '../types/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import apiClient from '../api/client';

const HomePage = () => {

	const [posts, setPosts] = useState<IPost[]>([]);
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false)

	const { user } = useAppSelector(state => state.auth)

	const fetchPosts = async () => {
		setLoading(true)
		const data:any = await apiClient.get('http://localhost:5000/api/post?limit=1&page=1')
		setPosts(data.data);
		setLoading(false)
	}
	
	
	useEffect(() => {
		fetchPosts();
		setPage(page + 1);
	}, [])
	
	
	const fetchMorePosts = async () => {
		setPage(prevPage => prevPage + 1);
		setLoading(true)
		const data: any = await apiClient.get(`http://localhost:5000/api/post?limit=1&page=${page}`)
		if (data.data.length == 0) setHasMore(false)
		// console.log(data.data,page)
		setPosts([...posts,...data.data]);
		setLoading(false)
	}


	return (
		<Layout title="Home">
			<Grid templateColumns="1fr 2fr" gap={4}>
				<GridItem
					marginTop={'6rem'}
					padding={4}
					height={'calc(100vh - 6rem)'}
					position={'fixed'}
					width={'33vw'}
					left={0}
				>
					<UserProfileCard
						username={user!.username}
						weight={user!.weight!}
						targetWeight={user?.targetWeight!}
						height={user?.height!}
						connections={user?.connections?.length!}
						fullName={user!.fullName}
					/>
				</GridItem>
				<GridItem />
				<GridItem marginTop={'6rem'} padding={10}>
					<AddButtons />
					{loading  && <Center>
						<Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='primary.300'
  size='xl'
/>
					</Center>}
					
					
<InfiniteScroll
  dataLength={posts.length} //This is important field to render the next data
  next={fetchMorePosts}
  hasMore={hasMore}
  loader={<Center>
						<Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='primary.300'
  size='xl'
/>
					</Center>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
						{posts.map(post => {
	  return <Post key={post._id}
						postImage={post.image}
						username={post.user}
						name={post.user}
		  				postText={post.content}
		  				date={post.createdAt}
						likeCounts={post.likesCount}
					/>
  })}
</InfiniteScroll>
					{/* <Post
						postImage="https://cdn.pixabay.com/photo/2017/05/16/19/43/bicycle-2318682_1280.jpg"
						username="satish_011e"
						name="Satish Naikawadi"
						postText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure tempore fuga dolore magnam dignissimos corporis aut ipsam! Repudiandae, in."
						date={new Date().toISOString()}
						likeCounts={10}
					/>
					<Post
						postImage="https://cdn.pixabay.com/photo/2017/05/16/19/43/bicycle-2318682_1280.jpg"
						username="satish_011e"
						name="Satish Naikawadi"
						postText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure tempore fuga dolore magnam dignissimos corporis aut ipsam! Repudiandae, in."
						date={new Date().toISOString()}
						likeCounts={10}
					/> */}
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default HomePage;
