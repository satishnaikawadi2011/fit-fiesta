import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { SearchOptionType, setActiveSearchOption } from '../../app/features/common';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useBlockBgColor from '../../hooks/useBlockBgColor';

const SearchPageCard = () => {
	const blockBg = useBlockBgColor();
	return (
		<Box w={'full'} bg={blockBg} boxShadow={'lg'} rounded={'md'} overflow={'hidden'}>
			<Text m={3} ml={5} fontWeight={'light'} fontSize={'xs'}>
				On this page
			</Text>
			<Item title="Posts" name="posts" />
			<Item title="People" name="people" />
			<Item title="Events" name="events" />
			<Item title="Resources" name="resources" />
			<Item title="Groups" name="groups" />
		</Box>
	);
};

interface Props {
	title: string;
	name: SearchOptionType;
}

const Item: React.FC<Props> = ({ title, name }) => {
	const { activeSearchOption } = useAppSelector((state) => state.common);
	const dispatch = useAppDispatch();
	const { colorMode } = useColorMode();
	const isActive = name === activeSearchOption;
	return (
		<Flex
			position={'relative'}
			onClick={() => dispatch(setActiveSearchOption(name))}
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

export default SearchPageCard;
