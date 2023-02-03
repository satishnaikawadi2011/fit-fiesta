import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Connections from '../components/my-network/Connections';
import Invitations from '../components/my-network/Invitations';
import MyNetworkPageLayout from '../components/my-network/MyNetworkPageLayout';

const MyNetworkPage = () => {
	const { activeMyNetworkOption } = useAppSelector((state) => state.common);

	return (
		<MyNetworkPageLayout>
			{activeMyNetworkOption === 'invitations' && <Invitations />}
			{activeMyNetworkOption === 'connections' && <Connections />}
		</MyNetworkPageLayout>
	);
};

export default MyNetworkPage;
