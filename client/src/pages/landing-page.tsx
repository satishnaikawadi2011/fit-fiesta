import { Flex, Container, Heading, Stack, Text, Button, Icon, IconProps } from '@chakra-ui/react';
import FeatureList from '../components/landing/FeatureList';
import Footer from '../components/landing/Footer';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';

const LandingPage = () => {
	return (
		<div>
			<Header />
			<Container maxW={'5xl'}>
				<Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
					<Heading fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
						Find your tribe,{' '}
						<Text as={'span'} color={'primary.200'}>
							find your wellness
						</Text>
					</Heading>
					<Text color={'gray.500'} maxW={'3xl'}>
						Join our community of wellness enthusiasts and connect with others on their health journey.
						Share tips, advice and find local resources and events to support your well-being. Empower your
						journey to health and wellness with our social networking platform.
					</Text>
					<Stack spacing={6} direction={'row'}>
						<Button
							rounded={'full'}
							px={6}
							colorScheme={'primary'}
							bg={'primary.300'}
							_hover={{ bg: 'primary.400' }}
						>
							Join Now
						</Button>
						<Button rounded={'full'} px={6}>
							Log In
						</Button>
					</Stack>
					<Flex w={'full'}>
						<Hero height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} />
					</Flex>
					<FeatureList />
				</Stack>
			</Container>
			<Footer />
		</div>
	);
};

export default LandingPage;
