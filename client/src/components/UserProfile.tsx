import { Avatar, Box, Flex, Heading, Image, Link, Text, Icon, FlexProps, Stack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../types/User';
import { GiBodyHeight } from 'react-icons/gi';
import { MdMail } from 'react-icons/md';
import { FaUserEdit, FaWeight } from 'react-icons/fa';
import { GrTarget } from 'react-icons/gr';

interface Props {
	user: IUser;
}

const wrapConn = (conn: number) => {
	if (conn > 500) {
		return `500+`;
	}
	else {
		return `${conn}`;
	}
};

const UserProfile: React.FC<Props> = ({ user }) => {
	const {
		_id,
		email,
		fullName,
		username,
		connections,
		targetWeight,
		weight,
		height,
		location,
		coverImg,
		profileImg
	} = user;
	return (
		<Box boxShadow="md" bg={'gray.100'} width={'100%'} mb={5} position={'relative'}>
			<Image width={'100%'} height={200} src={coverImg} />
			<Avatar left={'10%'} top={100} position={'absolute'} size="2xl" name={fullName} src={profileImg} />
			<Box bgColor="red">
				<IconButton
					aria-label="Edit profile"
					position={'absolute'}
					m={3}
					right={0}
					icon={<Icon as={FaUserEdit} />}
				/>
			</Box>
			<Box p={5} mt={5}>
				<Heading fontSize={'2xl'}>{fullName}</Heading>
				<Text>{`@${username}`}</Text>
				<Text mt={2} fontSize={'xs'} fontWeight={'light'}>
					{location}
				</Text>
				<Link color={'primary.400'} fontSize={'sm'}>
					{`${wrapConn(connections!.length)} connections`}
				</Link>
				<Flex alignItems={'center'} mt={5}>
					<Stack spacing={0} mr={10}>
						<Item Icon={<Icon as={GiBodyHeight} mr={3} />} Desc={`${height} cm`} mr={10} />
						<Item Icon={<Icon as={MdMail} mr={3} />} Desc={email} />
					</Stack>
					<Stack>
						<Item Icon={<Icon as={FaWeight} mr={3} />} Desc={`${weight} kg (weight)`} mr={10} />
						<Item Icon={<Icon as={GrTarget} mr={3} />} Desc={`${targetWeight} kg (target weight)`} />
					</Stack>
				</Flex>
			</Box>
		</Box>
	);
};

interface ItemProps {
	Icon: any;
	Desc: any;
}

const Item: React.FC<ItemProps & FlexProps> = ({ Icon, Desc, ...props }) => {
	return (
		<Flex alignItems={'center'} mb={2} {...props}>
			{Icon}
			{Desc}
		</Flex>
	);
};

export default UserProfile;
