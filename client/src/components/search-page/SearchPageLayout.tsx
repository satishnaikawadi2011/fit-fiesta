import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import Layout from '../layout/Layout';
import SearchPageCard from './SearchPageCard';

interface Props {
	children?: any;
}

const SearchPageLayout: React.FC<Props> = ({ children }) => {
	const { searchTerm } = useAppSelector((state) => state.common);
	return (
		<Layout title={`${searchTerm} | Search`}>
			<Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4}>
				<GridItem
					px={{ base: '20px' }}
					position={{ base: 'relative', md: 'fixed' }}
					width={{ base: 'full', md: '33vw' }}
					left={0}
				>
					<SearchPageCard />
				</GridItem>
				<GridItem />
				<GridItem px={{ base: '20px' }}>{children}</GridItem>
			</Grid>
		</Layout>
	);
};

export default SearchPageLayout;
