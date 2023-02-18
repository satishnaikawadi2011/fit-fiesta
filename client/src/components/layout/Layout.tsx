import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../../app/hooks';
import { APP_NAME } from '../../constants';
import UserProfileCard from '../user/UserProfileCard';
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

const Layout: React.FC<Props> = ({ title, children, className, style, header = true, withProfile }) => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<React.Fragment>
			<Helmet>
				<title>
					{title} | {APP_NAME}
				</title>
			</Helmet>
			{header && <Header />}
			<div className={`${classes.content} ${className}`} style={{ ...style }}>
				{withProfile && (
					<Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4}>
						<GridItem
							marginTop={'80px'}
							px={{ base: '20px' }}
							// height={'calc(100vh - 6rem)'}
							position={{ base: 'relative', md: 'fixed' }}
							width={{ base: 'full', md: '33vw' }}
							left={0}
						>
							<UserProfileCard user={user!} />
						</GridItem>
						<GridItem />
						<GridItem px={{ base: '20px' }} marginTop={{ base: '0px', md: '80px' }}>
							{children}
						</GridItem>
					</Grid>
				)}
				{!withProfile && <Box marginTop={'7rem'}>{children}</Box>}
			</div>
		</React.Fragment>
	);
};

export default Layout;
