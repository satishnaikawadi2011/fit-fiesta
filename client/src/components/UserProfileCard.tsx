import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react';
import { USER_AVATAR_PLACEHOLDER, USER_COVER_IMAGE } from '../constants';

interface Props {
	fullName: string;
	username: string;
	weight: number;
	height: number;
	targetWeight: number;
	connections: number;
}

const UserProfileCard: React.FC<Props> = ({ connections, fullName, height, targetWeight, username, weight }) => {
	return (
		<Center py={6}>
			<Box
				maxW={'270px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.800')}
				boxShadow={'2xl'}
				rounded={'md'}
				overflow={'hidden'}
			>
				<Image h={'120px'} w={'full'} src={USER_COVER_IMAGE} objectFit={'cover'} />
				<Flex justify={'center'} mt={-12}>
					<Avatar
						size={'xl'}
						src={USER_AVATAR_PLACEHOLDER}
						// alt={'Author'}
						css={{
							border: '2px solid white'
						}}
					/>
				</Flex>

				<Box p={6}>
					<Stack spacing={0} align={'center'} mb={5}>
						<Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
							{fullName}
						</Heading>
						<Text color={'gray.500'}>@{username}</Text>
					</Stack>

					<Stack>
						<Stack direction={'row'} justify={'center'} spacing={6}>
							<Stack spacing={0} align={'center'}>
								<Text fontWeight={600}>{connections}</Text>
								<Text fontSize={'sm'} color={'gray.500'}>
									Connection
								</Text>
							</Stack>
							<Stack spacing={0} align={'center'}>
								<Text fontWeight={600}>{height} cm</Text>
								<Text fontSize={'sm'} color={'gray.500'}>
									Height
								</Text>
							</Stack>
						</Stack>
						<Stack mt={2} direction={'row'} justify={'center'} spacing={6}>
							<Stack spacing={0} align={'center'}>
								<Text fontWeight={600}>{weight} kg</Text>
								<Text fontSize={'sm'} color={'gray.500'}>
									Weight
								</Text>
							</Stack>
							<Stack spacing={0} align={'center'}>
								<Text fontWeight={600}>{targetWeight} kg</Text>
								<Text fontSize={'sm'} color={'gray.500'}>
									Target Weight
								</Text>
							</Stack>
						</Stack>
					</Stack>
					<Button
						w={'full'}
						mt={8}
						color={'white'}
						rounded={'md'}
						bgColor={'primary.300'}
						_hover={{
							transform: 'translateY(-2px)',
							boxShadow: 'lg',
							bgColor: 'primary.400'
						}}
					>
						View Profile
					</Button>
				</Box>
			</Box>
		</Center>
	);
};

export default UserProfileCard;
