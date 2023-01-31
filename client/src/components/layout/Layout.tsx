import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../../app/hooks';
import { APP_NAME } from '../../constants';
import UserProfileCard from '../UserProfileCard';
import Header from './Header/Header';
import classes from './layout.module.css';

interface Props {
	title: string;
	children?: any;
	className?: string;
	style?: React.CSSProperties;
	header?: boolean;
	withProfile?: boolean;
}

const Layout: React.FC<Props> = ({ title, children, className, style, header = true,withProfile }) => {

		const { user } = useAppSelector(state => state.auth)
	return (
		<React.Fragment>
			<Helmet>
				<title>
					{title} | {APP_NAME}
				</title>
			</Helmet>
			{header && <Header />}
			<div className={`${classes.content} ${className}`} style={{ ...style }}>
				{withProfile && <Grid templateColumns="1fr 2fr" gap={4}>
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
					{children}
				</GridItem>
			</Grid>}
				{!withProfile && <Box marginTop={'7rem'}>
					{children}
				</Box>}
			</div>
		</React.Fragment>
	);
};

export default Layout;
