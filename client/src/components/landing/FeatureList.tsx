import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcCollaboration, FcShare, FcCalendar } from 'react-icons/fc';
import Feature from './Feature';

const FeatureList = () => {
	return (
		<Box p={4}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				<Feature
					icon={<Icon as={FcCollaboration} w={10} h={10} />}
					title={'Connecting with others'}
					text={
						'Users can connect with other users, join groups and communities based on their interests, and follow users they find inspiring or informative.'
					}
				/>
				<Feature
					icon={<Icon as={FcShare} w={10} h={10} />}
					title={'Sharing tips and advice'}
					text={
						'Users can share tips, advice, and information related to health and wellness. They can also share their personal stories, successes, and challenges.'
					}
				/>
				<Feature
					icon={<Icon as={FcCalendar} w={10} h={10} />}
					title={'Resources and events'}
					text={
						'Users can search and browse resources such as local health and wellness events, classes, workshops, and more.'
					}
				/>
			</SimpleGrid>
		</Box>
	);
};

export default FeatureList;
