import {
	Box,
	Flex,
	Image,
	Link,
	Text,
	useColorMode,
	IconButton,
	VStack,
	Stack,
	HStack,
	Divider
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from '../../Logo';
import { AiFillHome } from 'react-icons/ai';
import { GrResources } from 'react-icons/gr';
import { MdEventNote, MdGroups } from 'react-icons/md';
import { BiNetworkChart } from 'react-icons/bi';
import { PRIMARY } from '../../../constants/colors';
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

const Header: React.FC = () => {
	const blockBg = useBlockBgColor();
	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state.auth);

	const [
		isSearchModalOpen,
		setIsSearchModalOpen
	] = useState(false);

	return (
		<Flex
			zIndex={1000}
			width={'100vw'}
			position={'fixed'}
			height={'60px'}
			justifyContent={'space-between'}
			alignItems={'center'}
			bg={blockBg}
			top={0}
			boxShadow="md"
		>
			<SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
			<Flex align="center" mr={5}>
				<Box display={{ base: 'none', md: 'block' }}>
					<Logo
						width={'4rem'}
						height={'4rem'}
						fill="#A2D2FF"
						cursor={'pointer'}
						onClick={() => navigate('/')}
					/>
				</Box>
				<SearchBar />
			</Flex>
			<HStack height={'100%'} justifyContent={'space-around'} width={{ base: '100%', md: '50%' }}>
				<Box display={{ base: 'block', md: 'none' }}>
					<SearchIcon width={30} height={30} cursor="pointer" onClick={() => setIsSearchModalOpen(true)} />
				</Box>
				<LinkItem path="/" Icon={HomeIcon} title="Home" />
				<LinkItem path="/resources" Icon={ResourceIcon} title="Resources" />
				<LinkItem path="/events" Icon={EventIcon} title="Events" />
				<LinkItem path="/my-network/:section" Icon={ConnectionIcon} title="My Network" />
				<HeaderMenu user={user!} />
			</HStack>
		</Flex>
	);
};

export default Header;
