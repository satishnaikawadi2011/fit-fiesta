import { ReactElement } from 'react';
import { Text, Stack, Flex, useColorMode } from '@chakra-ui/react';
import useBlockBgColor from '../../hooks/useBlockBgColor';

interface FeatureProps {
	title: string;
	text: string;
	icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
	const blockBg = useBlockBgColor();
	const { colorMode } = useColorMode();
	return (
		<Stack>
			<Flex
				w={16}
				h={16}
				align={'center'}
				justify={'center'}
				alignSelf="center"
				color={'white'}
				rounded={'full'}
				bg={blockBg}
				mb={1}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
			<Text
				color={

						colorMode === 'dark' ? 'gray.300' :
						'gray.600'
				}
			>
				{text}
			</Text>
		</Stack>
	);
};

export default Feature;
