import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import SearchEvents from '../components/search-page/SearchEvents';
import SearchPageLayout from '../components/search-page/SearchPageLayout';
import SearchPosts from '../components/search-page/SearchPosts';
import SearchResources from '../components/search-page/SearchResources';

const SearchPage = () => {
	const { searchTerm } = useAppSelector((state) => state.common);
	const navigate = useNavigate();
	const { activeSearchOption } = useAppSelector((state) => state.common);

	useEffect(
		() => {
			if (!searchTerm) {
				navigate('/');
			}
		},
		[
			searchTerm
		]
	);

	return (
		<SearchPageLayout>
			<Flex mb={3} fontStyle={'italic'} fontSize={'lg'} fontWeight={'bold'}>
				<Text> Search results for :</Text>
				<Text ml={2} color="primary.300">
					{searchTerm}
				</Text>
			</Flex>
			{activeSearchOption === 'posts' && <SearchPosts />}
			{activeSearchOption === 'events' && <SearchEvents />}
			{activeSearchOption === 'resources' && <SearchResources />}
		</SearchPageLayout>
	);
};

export default SearchPage;
