import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

const PostSkeleton = () => {
	return (
		<Box mb={4} boxShadow="md" bg={'gray.100'}>
			<Stack padding={'4'}>
				<Flex align="center">
					<Skeleton width="40px" height="40px" mr={2} />
					<Box width={'100%'}>
						<Flex width={'100%'} alignItems={'center'} justifyContent="space-between">
							<Skeleton width="170px" height="7px" mb={2} />
							<Skeleton width="50px" height="5px" />
						</Flex>
						<Skeleton width="100px" height="5px" />
					</Box>
				</Flex>
				<Skeleton width="90%" height="5px" mx={'auto'} />
				<Skeleton width="45%" height="5px" mx={'auto'} />
			</Stack>
			<Box mt={2}>
				<Box mt={2}>
					<Skeleton width="100%" height="400px" mx={'auto'} />
				</Box>
			</Box>
		</Box>
	);
};

export default PostSkeleton;
