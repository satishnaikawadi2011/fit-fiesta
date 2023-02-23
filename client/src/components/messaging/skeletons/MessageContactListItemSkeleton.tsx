import { Flex, Skeleton, SkeletonCircle, Box } from '@chakra-ui/react';
import React from 'react';

const MessageContactListItemSkeleton = () => {
	return (
		<Flex
			width={'full'}
			height={'92px'}
			alignItems={'center'}
			pl={3}
			pr={2}
			_hover={{ bgColor: 'gray.100' }}
			cursor="pointer"
			transition={'all 0.5s'}
		>
			<SkeletonCircle mr={2} width={'50px'} height={'50px'} />
			<Box width={'full'}>
				<Flex mb={2} flexWrap="wrap" overflow="hidden" alignItems={'baseline'} justifyContent="space-between">
					<Skeleton height={'7px'} width={'40%'} />
					<Skeleton flexShrink={1} fontSize={'sm'} height={'3px'} width={'20%'} />
				</Flex>
				<Flex flexGrow={1}>
					<Box flexGrow={1}>
						<Skeleton height={'4px'} mb={1} width={'90%'} />
						<Skeleton height={'4px'} width={'50%'} />
					</Box>
				</Flex>
			</Box>
		</Flex>
	);
};

export default MessageContactListItemSkeleton;
