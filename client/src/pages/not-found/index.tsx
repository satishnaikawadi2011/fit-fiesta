import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../constants';
import classes from './not-found.module.css';

const NotFoundPage = () => {
	let navigate = useNavigate();
	return (
		<div className={classes.vertically__center}>
			<Helmet>
				<title>Page Not Found | {APP_NAME}</title>
			</Helmet>
			<div className={classes.container}>
				<div className={classes.text__center}>
					<h1>😮</h1>
					<h2>Oops! Page Not Be Found</h2>
					<p>Sorry but the page you are looking for does not exist.</p>
					<a className={classes.link} onClick={() => navigate('/')}>
						Back to homepage
					</a>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
