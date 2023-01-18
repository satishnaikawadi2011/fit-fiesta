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
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding="0.5rem"
			bg={

					colorMode === 'light' ? 'white' :
					'gray.800'
			}
			color={

					colorMode === 'light' ? 'black' :
					'white'
			}
			boxShadow="md"
		>
			<Flex align="center" mr={5}>
				{/* <Image src={logo} alt="Logo" width="40px" height="40px" mr={2} /> */}
				<Logo width={'5rem'} height={'5rem'} fill="#A2D2FF" />
				{/* <Text fontWeight="medium">LinkedIn</Text> */}
				<SearchBar onSearch={() => {}} />
			</Flex>
			{/* <Box display={{ sm: 'block', md: 'none' }} onClick={() => {}}>
				<svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
				</svg>
			</Box> */}
			<HStack width={{ md: 'auto' }} spacing={{ sm: '10', md: '10' }} alignItems="center" ml="auto">
				{/* <Link mr={4}>Home</Link> */}
				<LinkItem Icon={AiFillHome} title="Home" />
				<LinkItem Icon={GrResources} title="Resources" />
				<LinkItem Icon={MdGroups} title="Groups" />
				<LinkItem Icon={BiNetworkChart} title="My Network" />
				{/* <IconButton
					aria-label={`Switch to ${
						colorMode === 'light' ? 'dark' :
						'light'} mode`}
					icon={

							colorMode === 'light' ? <FaMoon /> :
							<FaSun />
					}
					onClick={toggleColorMode}
				/> */}
			</HStack>
		</Flex>
	);
};

export default Header;
