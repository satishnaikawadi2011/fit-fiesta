import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	useColorModeValue,
	VisuallyHidden,
	Heading,
	Flex
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import Logo from '../Logo';
import { APP_NAME } from '../../constants';
import { useNavigate } from 'react-router-dom';

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const Footer = () => {
	const navigate = useNavigate();
	return (
		<Box bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<Flex alignItems={'center'} cursor={'pointer'} onClick={() => navigate('/')}>
					<Logo width={'5rem'} height={'5rem'} fill="#A2D2FF" />
					<Heading as="h1" size="lg" noOfLines={1}>
						{APP_NAME}
					</Heading>
				</Flex>
				<Text>© 2023 {APP_NAME}. All rights reserved</Text>
				<Stack direction={'row'} spacing={6}>
					<SocialButton label={'Twitter'} href={'#'}>
						<FaTwitter />
					</SocialButton>
					<SocialButton label={'YouTube'} href={'#'}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={'Instagram'} href={'#'}>
						<FaInstagram />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;
