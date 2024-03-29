import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import SearchEvents from '../components/search-page/SearchEvents';
import SearchGroups from '../components/search-page/SearchGroups';
import SearchPageLayout from '../components/search-page/SearchPageLayout';
import SearchPeople from '../components/search-page/SearchPeople';
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
			{activeSearchOption === 'people' && <SearchPeople />}
			{activeSearchOption === 'groups' && <SearchGroups />}
		</SearchPageLayout>
	);
};

export default SearchPage;
