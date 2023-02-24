import { useColorModeValue } from '@chakra-ui/react';

const useBlockBgColor = () => {
	const color = useColorModeValue('#DADEE1', '#212B31');
	return color;
};

export default useBlockBgColor;
