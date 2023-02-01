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
			<Grid templateColumns="1fr 2fr" gap={4}>
				<GridItem height={'calc(100vh - 6rem)'} position={'fixed'} width={'33vw'} left={0}>
					<SearchPageCard />
				</GridItem>
				<GridItem />
				<GridItem padding={10}>{children}</GridItem>
			</Grid>
		</Layout>
	);
};

export default SearchPageLayout;
