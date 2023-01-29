import { CalendarIcon } from '@chakra-ui/icons';
import { Heading, Flex, Icon, Divider, Text, Box, Image, Link, Center, Collapse } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TbWorld } from 'react-icons/tb';
import { ImLocation2 } from 'react-icons/im';
import { BiCategory } from 'react-icons/bi';
import dayjs from 'dayjs';
import { IResource } from '../types/Resource';
import { BsChevronCompactDown } from 'react-icons/bs';

interface Props {
	resource: IResource;
}

const Resource: React.FC<Props> = ({ resource }) => {
	const { category, name, description, url, image, location } = resource;
	const [
		isOpen,
		setIsOpen
	] = useState<boolean>(!image);
	return (
		<Box mb={5} boxShadow="md" bg={'gray.100'} width={'100%'} roundedTop="2xl" overflow={'clip'}>
			{image && <Image src={image} />}
			<Box p={5}>
				<Heading mb={3} fontSize={'2xl'} fontWeight="medium">
					{name}
				</Heading>

				{location && <Item Icon={<Icon as={ImLocation2} mr={3} />} Desc={<Text>{location}</Text>} />}
				<Item Icon={<Icon as={BiCategory} mr={3} />} Desc={<Text>{category}</Text>} />
				<Item Icon={<Icon as={TbWorld} mr={3} />} Desc={<Link href={url}>More Info</Link>} />
			</Box>
			<Center>
				{image &&
				!isOpen && <Icon as={BsChevronCompactDown} cursor={'pointer'} onClick={() => setIsOpen(true)} />}
			</Center>
			<Divider borderWidth={1} />
			<Collapse in={isOpen}>
				<Box p={3}>
					<Heading mb={3} fontSize={'lg'} fontWeight="normal">
						Description
					</Heading>
					<Text fontWeight={'light'}>{description}</Text>
				</Box>
			</Collapse>
		</Box>
	);
};

interface ItemProps {
	Icon: any;
	Desc: any;
}

const Item: React.FC<ItemProps> = ({ Icon, Desc }) => {
	return (
		<Flex alignItems={'center'} mb={2}>
			{Icon}
			{Desc}
		</Flex>
	);
};

export default Resource;
