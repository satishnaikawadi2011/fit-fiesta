import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../app/features/auth';
import { useAppDispatch } from '../app/hooks';

const DummyPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return (
		<div>
			<h1>DummyPage</h1>
			<button
				onClick={() => {
					dispatch(logout());
					navigate('/login');
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default DummyPage;
