import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Connections from '../components/my-network/Connections';
import Invitations from '../components/my-network/Invitations';
import MyNetworkPageLayout from '../components/my-network/MyNetworkPageLayout';
import People from '../components/my-network/People';
import SentRequests from '../components/my-network/SentRequests';

const MyNetworkPage = () => {
	const { activeMyNetworkOption } = useAppSelector((state) => state.common);

	return (
		<MyNetworkPageLayout>
			{activeMyNetworkOption === 'invitations' && <Invitations />}
			{activeMyNetworkOption === 'connections' && <Connections />}
			{activeMyNetworkOption === 'people' && <People />}
			{activeMyNetworkOption === 'sent requests' && <SentRequests />}
		</MyNetworkPageLayout>
	);
};

export default MyNetworkPage;
