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

function App() {
	// useEffect(() => {
	// 	getAllDataFromStorage();
	// }, []);
	// const { user, expiryDate, token } = useAppSelector((state) => state.auth);
	// const isTokenExpired = isExpired(expiryDate);

	// if (!isTokenExpired && user) {
	// 	apiClient.setHeader('Authorization', `Bearer ${token}`);
	// 	return <AuthenticatedRoutes />;
	// }
	// return <UnauthenticatedRoutes />;

	return (
		<React.Fragment>
			<Box width={600}>
				<Resource
					resource={{
						name: 'Fitness, Nutrition, and Self-Care for Musicians',
						createdAt: '2023-02-02T16:30:00',
						updatedAt: 'djdjd',
						description:
							`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique omnis cumque laudantium
						modi, voluptatibus doloribus pariatur aliquid enim harum excepturi, voluptatem officiis
						assumenda alias incidunt?`,
						// location: 'Mumbai',
						category: 'Gym',
						url: 'https://react-icons.github.io/react-icons'
						// image: 'https://cdn.pixabay.com/photo/2018/07/27/05/02/stones-3565221_1280.jpg'
					}}
				/>
			</Box>
		</React.Fragment>
	);
}

export default App;
