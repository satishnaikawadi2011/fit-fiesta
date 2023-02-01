import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../app/features/common';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SearchPageLayout from '../components/search-page/SearchPageLayout';
import SearchPosts from '../components/search-page/SearchPosts';

const SearchPage = () => {
	const { searchTerm } = useAppSelector((state) => state.common);
	const navigate = useNavigate();

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
			<SearchPosts />
		</SearchPageLayout>
	);
};

export default SearchPage;
