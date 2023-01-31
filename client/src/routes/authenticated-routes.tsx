import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages';
import EventsPage from '../pages/events';
import NotFoundPage from '../pages/not-found';
import ProfilePage from '../pages/profile';
import ResourcesPage from '../pages/resources';

export type RoutePathType = '/' | '/events' | '/resources' | '/profile';

export interface RouteType {
	path: RoutePathType;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <HomePage /> },
	{ path: '/events', element: <EventsPage /> },
	{ path: '/resources', element: <ResourcesPage /> },
	{ path: '/profile', element: <ProfilePage /> }
];

const AuthenticatedRoutes = () => {
	return (
		<Router>
			<Routes>
				{ClientRoutes.map((route) => {
					return <Route key={route.path} path={route.path} element={route.element} />;
				})}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
};

export default AuthenticatedRoutes;
