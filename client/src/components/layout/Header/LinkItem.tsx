import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setActiveLink } from '../../../app/features/ui';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PRIMARY } from '../../../constants/colors';
import { RoutePathType } from '../../../routes/authenticated-routes';

const matchUrl = (url: string): string | null => {
	const pattern = /^\/my-network\/[^\/]+$/;
	const match = url.match(pattern);
	if (match) {
		return match[0];
	}
	else {
		return null;
	}
};
interface Props {
	Icon: any;
	title: string;
	path: RoutePathType;
}

const LinkItem: React.FC<Props> = ({ Icon, title, path }) => {
	const { activeLink } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();

	let navigate = useNavigate();
	let location = useLocation();
	useEffect(
		() => {
			dispatch(setActiveLink(location.pathname as any));
		},
		[
			location
		]
	);

	const isActive =

			path !== '/my-network/:section' ? path === activeLink :
			matchUrl(location.pathname);

	const handleLinkClick = () => {
		setActiveLink(path);
		if (path !== '/my-network/:section') {
			navigate(path);
		}
		else {
			navigate('/my-network/invitations');
		}
	};

	return (
		<Flex
			cursor={'pointer'}
			onClick={handleLinkClick}
			flexDirection={'column'}
			display={'inline-flex'}
			alignItems="center"
		>
			<Box>{<Icon width={30} height={30} fill={isActive && PRIMARY} />}</Box>
			<Text
				color={

						isActive ? PRIMARY :
						'auto'
				}
				display={{ base: 'none', md: 'inline-block' }}
				fontSize={'sm'}
				fontWeight="light"
			>
				{title}
			</Text>
			{isActive && <Box display={{ base: 'none', md: 'block' }} width={'120%'} height={0.5} bgColor={PRIMARY} />}
		</Flex>
	);
};

export default LinkItem;
