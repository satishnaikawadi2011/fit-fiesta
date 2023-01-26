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
import { MdGroups } from 'react-icons/md';
import { BiNetworkChart } from 'react-icons/bi';
import { PRIMARY } from '../../../constants/colors';
import LinkItem from './LinkItem';
import SearchBar from '../Searchbar';

const Header: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();

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
			color={

					colorMode === 'light' ? 'black' :
					'white'
			}
			boxShadow="md"
		>
			<Flex align="center" mr={5}>
				<Logo width={'5rem'} height={'5rem'} fill="#A2D2FF" />
				<SearchBar onSearch={() => {}} />
			</Flex>
			<HStack width={{ md: 'auto' }} spacing={{ sm: '10', md: '10' }} alignItems="center" ml="auto">
				<LinkItem Icon={AiFillHome} title="Home" />
				<LinkItem Icon={GrResources} title="Resources" />
				<LinkItem Icon={MdGroups} title="Groups" />
				<LinkItem Icon={BiNetworkChart} title="My Network" />
			</HStack>
		</Flex>
	);
};

export default Header;
