import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyPage from '../pages/dummy';
import NotFoundPage from '../pages/not-found';

type RoutePathType = '/' | '' | '';

export interface RouteType {
	path: RoutePathType;
	element: JSX.Element;
}

const ClientRoutes: RouteType[] = [
	{ path: '/', element: <DummyPage /> }
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