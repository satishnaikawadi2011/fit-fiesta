import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setSearchTerm } from '../app/features/common';
import { useAppDispatch } from '../app/hooks';
import SearchPageLayout from '../components/search-page/SearchPageLayout';

const SearchPage = () => {
	const dispatch = useAppDispatch();
	const params: any = useParams();

	useEffect(
		() => {
			const q = params.q;
			// console.log(location, params);

			dispatch(setSearchTerm(q));
		},
		[
			dispatch,
			params
		]
	);

	return (
		<SearchPageLayout>
			<h1>This is content !!!</h1>
		</SearchPageLayout>
	);
};

export default SearchPage;
