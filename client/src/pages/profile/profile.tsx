import { Box, Center, Spinner } from '@chakra-ui/react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Layout from '../../components/layout/Layout';
import UserProfile from '../../components/user/UserProfile';
import useApiUpdated from '../../hooks/useApiUpdated';
import { IUser } from '../../types/User';
import userApi from '../../api/user';
import { useEffect } from 'react';
import NotFoundPage from '../not-found';
const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const params: any = useParams();
	const { data, error, loading, request: getUserProfile } = useApiUpdated<{ user: IUser }>(userApi.getUserProfile);

	useEffect(() => {
		getUserProfile(params.username);
	}, []);

	if (params.username === user!.username) {
		return <Navigate to="/profile" />;
	}

	if (error) {
		return <NotFoundPage />;
	}

	if (loading || !data) {
		return (
			<Center height={'100vh'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
			</Center>
		);
	}

	return (
		<Layout title="Profile">
			<Box mx={{ base: '0px', md: '30px' }} width={{}}>
				<UserProfile user={data.user!} />
			</Box>
		</Layout>
	);
};

export default ProfilePage;
