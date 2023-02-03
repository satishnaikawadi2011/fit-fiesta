import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import MyNetworkPageLayout from '../components/my-network/MyNetworkPageLayout';

const MyNetworkPage = () => {
	const { activeMyNetworkOption } = useAppSelector((state) => state.common);

	return (
		<MyNetworkPageLayout>
			<h1>This is content</h1>
		</MyNetworkPageLayout>
	);
};

export default MyNetworkPage;
