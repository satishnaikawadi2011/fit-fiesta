import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack, Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../types/User';

interface Props {
	user: IUser;
}

const UserProfileCard: React.FC<Props> = ({ user }) => {

	const navigate = useNavigate()
	const { connections, fullName, height, targetWeight, username, weight,profileImg,coverImg } = user!;
	return (
		<Center>
			<Box maxW={'300px'} w={'full'} bg={'gray.100'} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'}>
				<Image h={'120px'} w={'full'} src={coverImg} objectFit={'cover'} />
				<Flex justify={'center'} mt={-12}>
					<Avatar
						size={'xl'}
						src={profileImg}
						name={fullName}
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

				
					<Flex justify={'space-between'}>
						<Item label="Weight" value={`${weight} kg`} />
						<Item label="Target Weight" value={`${targetWeight} kg`} />
						<Item label="Connections" value={`${connections?.length}`} />
						<Item label="Height" value={`${height} cm`} />
					</Flex>
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
						onClick={() =>  navigate('/profile')}
					>
						View Profile
					</Button>
				</Box>
			</Box>
		</Center>
	);
};

export default UserProfileCard;

interface ItemProps {
	label: string;
	value: string;
}

const Item: React.FC<ItemProps> = ({ label, value }) => {
	return (
		<Flex direction={'column'} justifyContent="center" alignItems="center">
			<Text fontSize={'xs'} fontWeight={600}>
				{value}
			</Text>
			<Text fontSize={'xs'} color={'gray.500'}>
				{label}
			</Text>
		</Flex>
	);
};
