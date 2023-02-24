import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyNetworkNavigationType, setActiveMyNetworkOption } from '../../app/features/common';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useBlockBgColor from '../../hooks/useBlockBgColor';

const NavigationCard = () => {
	const blockBg = useBlockBgColor();

	return (
		<Box w={'full'} bg={blockBg} boxShadow={'lg'} rounded={'md'} overflow={'hidden'}>
			<Text m={3} ml={5} fontWeight={'light'} fontSize={'xs'}>
				Manage my network
			</Text>
			<Item title="Invitations" name="invitations" />
			<Item title="Connections" name="connections" />
			<Item title="Sent Requests" name="sent requests" />
			<Item title="People" name="people" />
			<Item title="Received Group Requests" name="received_group_requests" />
			<Item title="Sent Group Requests" name="sent_group_requests" />
		</Box>
	);
};

interface Props {
	title: string;
	name: MyNetworkNavigationType;
}

const Item: React.FC<Props> = ({ title, name }) => {
	const navigate = useNavigate();
	const { activeMyNetworkOption } = useAppSelector((state) => state.common);
	const { colorMode } = useColorMode();
	const dispatch = useAppDispatch();
	const isActive = name === activeMyNetworkOption;
	return (
		<Flex
			position={'relative'}
			onClick={() => {
				dispatch(setActiveMyNetworkOption(name));
				navigate(`/my-network/${name}`);
			}}
			p={2}
			pl={5}
			_hover={{
				bgColor:

						colorMode === 'dark' ? '#454D52' :
						'#EDF2F7'
			}}
			cursor={'pointer'}
			transition={'all 0.5s'}
		>
			{isActive && <Box position={'absolute'} top={0} bottom={0} left={0} width={1} bgColor={'green.500'} />}
			<Text>{title}</Text>
		</Flex>
	);
};

export default NavigationCard;
