import { Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setActiveLink } from '../../../app/features/ui';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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
	Icon: IconType;
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
		navigate(path);
	};

	return (
		<VStack cursor={'pointer'} onClick={handleLinkClick}>
			<Icon size={25} />
			<Text
				color={

						isActive ? 'primary.300' :
						'black'
				}
				fontWeight={

						isActive ? 'medium' :
						'normal'
				}
				display={{ sm: 'none', md: 'inline-block' }}
			>
				{title}
			</Text>
		</VStack>
	);
};

export default LinkItem;
