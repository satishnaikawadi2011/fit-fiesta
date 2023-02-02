import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../app/hooks';
import Layout from '../components/layout/Layout';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<Layout title="Profile">
			<Box mx={'28'}>
				<UserProfile user={user!} />
			</Box>
		</Layout>
	);
};

export default ProfilePage;
