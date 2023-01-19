import './App.css';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { isExpired } from './utils/isExpired';
import AuthenticatedRoutes from './routes/authenticated-routes';
import { getAllDataFromStorage } from './utils/getAllDataFromStorage';
import Header from './components/layout/Header/Header';
import Post from './components/Post';
import PostPage from './components/Comment';
import AddPostModal from './components/AddPostModal';
import CreateGroupModal from './components/CreateGroupModal';
import { useDisclosure } from '@chakra-ui/react';
import AddResourceModal from './components/AddResourceModal';
import AddEventModal from './components/AddEventModal';
import UserProfileCard from './components/UserProfileCard';
import AddButtons from './components/AddButtons';

function App() {
	const { isOpen, onClose, onOpen } = useDisclosure();

	// useEffect(() => {
	// 	getAllDataFromStorage();
	// }, []);
	// const { user, expiryDate } = useAppSelector((state) => state.auth);
	// const isTokenExpired = isExpired(expiryDate);
	// return (
	// 	<Post
	// 		postImage="https://cdn.pixabay.com/photo/2017/05/16/19/43/bicycle-2318682_1280.jpg"
	// 		username="satish_011e"
	// 		name="Satish Naikawadi"
	// 		postText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure tempore fuga dolore magnam dignissimos corporis aut ipsam! Repudiandae, in."
	// 		date={new Date().toISOString()}
	// 		likeCounts={10}
	// 	/>
	// );
	// return (
	// 	<div>
	// 		<button onClick={onOpen}>Open</button>
	// 		<AddEventModal isOpen={isOpen} onClose={onClose} />
	// 	</div>
	// );

	return <AddButtons />;

	// if (!isTokenExpired && user) {
	// 	return <AuthenticatedRoutes />;
	// }
	// return <UnauthenticatedRoutes />;
}

export default App;
