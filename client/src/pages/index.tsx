import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/layout/Layout';
import Post from '../components/Post';
import UserProfileCard from '../components/UserProfileCard';

const HomePage = () => {
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
						username="jonn"
						weight={80}
						targetWeight={70}
						height={170}
						connections={200}
						fullName="Jon Doe"
					/>
				</GridItem>
				<GridItem />
				<GridItem marginTop={'6rem'} padding={10}>
					<Post
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
					/>
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default HomePage;
