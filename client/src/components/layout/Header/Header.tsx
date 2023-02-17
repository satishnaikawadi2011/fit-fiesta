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

const Header: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state.auth);

	return (
		<Flex
			zIndex={1000}
			width={'100vw'}
			position={'fixed'}
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="0.5rem"
			bg={'gray.100'}
			top={0}
			color={

					colorMode === 'light' ? 'black' :
					'white'
			}
			boxShadow="md"
		>
			<Flex align="center" mr={5}>
				<Logo width={'5rem'} height={'5rem'} fill="#A2D2FF" cursor={'pointer'} onClick={() => navigate('/')} />
				<SearchBar />
			</Flex>
			<HStack width={{ md: 'auto' }} spacing={{ sm: '10', md: '10' }} alignItems="center" ml="auto">
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
