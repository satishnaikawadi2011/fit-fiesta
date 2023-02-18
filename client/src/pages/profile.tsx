import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import UserProfile from '../components/user/UserProfile';

const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<Layout title="Profile">
			<Box mx={{ base: '0px', md: '30px' }} width={{}}>
				<UserProfile user={user!} />
			</Box>
		</Layout>
	);
};

export default ProfilePage;
