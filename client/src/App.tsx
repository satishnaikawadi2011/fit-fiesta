import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import React, { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import apiClient from './api/client';
import { Box, Flex, Image, Icon, Text, Heading, Divider } from '@chakra-ui/react';
import { ImLocation2 } from 'react-icons/im';
import { CalendarIcon } from '@chakra-ui/icons';
import { GrAddCircle } from 'react-icons/gr';
import Event from './components/Event';
import Resource from './components/Resource';
import UserProfile from './components/user/UserProfile';
import EditProfileImageModal from './components/user/EditProfileImageModal';
import EditCoverImageModal from './components/user/EditCoverImageModal';
import EditProfileModal from './components/user/EditProfileModal';
import SearchPageCard from './components/search-page/SearchPageCard';
import InvitationListItem from './components/my-network/InvitationListItem';
import AppBadge from './components/app/badge/AppBadge';

function App() {
	useEffect(() => {
		getAllDataFromStorage();
	}, []);
	const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	const isTokenExpired = isExpired(expiryDate);

	if (!isTokenExpired && user) {
		apiClient.setHeader('Authorization', `Bearer ${token}`);
		return <AuthenticatedRoutes />;
		// return <InvitationListItem />;
		// return (
		// 	<AppBadge content={2} bgColor="red">
		// 		<GrAddCircle size={100} />
		// 	</AppBadge>
		// );
	}
	return <UnauthenticatedRoutes />;

	// return <UserProfile user={user as any} />;
}

export default App;
