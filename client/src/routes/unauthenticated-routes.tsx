import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing-page';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/not-found';
import RegisterPage from '../pages/register';

type RoutePathType = '/' | '/join' | '/login';

export interface RouteType {
	path: RoutePathType;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <LandingPage /> },
	{ path: '/join', element: <RegisterPage /> },
	{ path: '/login', element: <LoginPage /> }
];

const UnauthenticatedRoutes = () => {
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

export default UnauthenticatedRoutes;
