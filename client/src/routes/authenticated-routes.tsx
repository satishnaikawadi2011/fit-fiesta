import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupDetailsPageLayout from '../components/group/GroupDetailsPageLayout';
import HomePage from '../pages';
import EventsPage from '../pages/events';
import MyNetworkPage from '../pages/my-network';
import NotFoundPage from '../pages/not-found';
import NotificationsPage from '../pages/notifications';
import ProfilePage from '../pages/profile';
import ResourcesPage from '../pages/resources';
import SearchPage from '../pages/search';

export type RoutePathType =
	| '/'
	| '/events'
	| '/resources'
	| '/profile'
	| '/search'
	| '/my-network/:section'
	| '/notifications'
	| '/group/:groupId';

export interface RouteType {
	path: RoutePathType;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <HomePage /> },
	{ path: '/events', element: <EventsPage /> },
	{ path: '/resources', element: <ResourcesPage /> },
	{ path: '/profile', element: <ProfilePage /> },
	{ path: '/search', element: <SearchPage /> },
	{ path: '/my-network/:section', element: <MyNetworkPage /> },
	{ path: '/notifications', element: <NotificationsPage /> },
	{ path: '/group/:groupId', element: <GroupDetailsPageLayout /> }
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
