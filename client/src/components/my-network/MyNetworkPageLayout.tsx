import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { MyNetworkNavigationType } from '../../app/features/common';
import { useAppSelector } from '../../app/hooks';
import Layout from '../layout/Layout';
import NavigationCard from './NavigationCard';

interface Props {
	children?: any;
}

const MyNetworkPageLayout: React.FC<Props> = ({ children }) => {
	const { activeMyNetworkOption } = useAppSelector((state) => state.common);
	return (
		<Layout title={`${activeMyNetworkOption} | My Network`}>
			<Grid templateColumns="1fr 2fr" gap={4}>
				<GridItem height={'calc(100vh - 6rem)'} position={'fixed'} width={'33vw'} left={0}>
					<NavigationCard />
				</GridItem>
				<GridItem />
				<GridItem padding={10}>{children}</GridItem>
			</Grid>
		</Layout>
	);
};

export default MyNetworkPageLayout;
