import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { FcAddImage, FcCalendar, FcConferenceCall, FcSurvey } from 'react-icons/fc';

interface ItemProps {
	title: string;
	Icon: IconType;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Item: React.FC<ItemProps> = ({ Icon, title, onClick }) => {
	return (
		<Flex onClick={onClick} cursor={'pointer'} alignItems={'center'}>
			<Icon size={20} />
			<Text ml={2} fontWeight={'medium'} fontSize={'md'}>
				{title}
			</Text>
		</Flex>
	);
};

const AddButtons = () => {
	return (
		<Flex height={50} justifyContent={'space-around'} boxShadow="md" rounded={'md'} m={10}>
			<Item Icon={FcAddImage} title="Post" />
			<Item Icon={FcCalendar} title="Event" />
			<Item Icon={FcSurvey} title="Resources" />
			<Item Icon={FcConferenceCall} title="Group" />
		</Flex>
	);
};

export default AddButtons;
