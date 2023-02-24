import { Box, Flex, HStack } from '@chakra-ui/react';
import Logo from '../../Logo';
import LinkItem from './LinkItem';
import SearchBar from '../Searchbar';
import { useNavigate } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';
import { useAppSelector } from '../../../app/hooks';
import HomeIcon from '../../../icons/HomeIcon';
import ResourceIcon from '../../../icons/ResourceIcon';
import EventIcon from '../../../icons/EventIcon';
import ConnectionIcon from '../../../icons/ConnectionIcon';
import { SearchIcon } from '@chakra-ui/icons';
import SearchModal from '../SearchModal';
import { useState } from 'react';
import useBlockBgColor from '../../../hooks/useBlockBgColor';
import { PRIMARY } from '../../../constants/colors';

const Header: React.FC = () => {
	const blockBg = useBlockBgColor();
	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state.auth);

	const [
		isSearchModalOpen,
		setIsSearchModalOpen
	] = useState(false);

	return (
		<Box zIndex={1000} width={'100vw'} position={'fixed'} height={'60px'} bg={blockBg} top={0} boxShadow="md">
			<Flex mx={'auto'} justifyContent={'space-between'} alignItems={'center'}>
				<SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
				<Flex align="center" mr={5}>
					<Box display={{ base: 'none', md: 'block' }}>
						<Logo
							width={'4rem'}
							height={'4rem'}
							fill={PRIMARY}
							cursor={'pointer'}
							onClick={() => navigate('/')}
						/>
					</Box>
					<SearchBar />
				</Flex>
				<HStack height={'100%'} justifyContent={'space-around'} width={{ base: '100%', md: '50%' }}>
					<Box display={{ base: 'block', md: 'none' }}>
						<SearchIcon
							width={30}
							height={30}
							cursor="pointer"
							onClick={() => setIsSearchModalOpen(true)}
						/>
					</Box>
					<LinkItem path="/" Icon={HomeIcon} title="Home" />
					<LinkItem path="/resources" Icon={ResourceIcon} title="Resources" />
					<LinkItem path="/events" Icon={EventIcon} title="Events" />
					<LinkItem path="/my-network/:section" Icon={ConnectionIcon} title="My Network" />
					<HeaderMenu user={user!} />
				</HStack>
			</Flex>
		</Box>
	);
};

export default Header;
