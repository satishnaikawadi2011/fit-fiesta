import {
	Box,
	Flex,
	Heading,
	Button,
	Stack,
	useColorModeValue,
	useBreakpointValue,
	useMediaQuery
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import { PRIMARY } from '../../constants/colors';
import Logo from '../Logo';

const Header = () => {
	const [
		isLargerThan418
	] = useMediaQuery('(min-width: 418px)');
	const navigate = useNavigate();
	const headingColor = useColorModeValue('gray.800', 'white');

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Flex alignItems="center" cursor={'pointer'} onClick={() => navigate('/')}>
						<Logo width={'5rem'} height={'5rem'} fill={PRIMARY} />
						{isLargerThan418 && (
							<Heading size={'lg'} textAlign={'left'} fontFamily={'heading'} color={headingColor}>
								{APP_NAME}
							</Heading>
						)}
					</Flex>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
					<Button fontSize={'sm'} fontWeight={400} onClick={() => navigate('/login')}>
						Sign In
					</Button>
					<Button
						// display={{ base: 'none', md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'primary.300'}
						_hover={{
							bg: 'primary.400'
						}}
						onClick={() => navigate('/join')}
					>
						Sign Up
					</Button>
				</Stack>
			</Flex>
		</Box>
	);
};

export default Header;
