import './App.css';
import LandingPage from './pages/landing-page';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UnauthenticatedRoutes from './routes/unauthenticated-routes';

function App() {
	// return <h1>My App</h1>;
	return <UnauthenticatedRoutes />;
}

export default App;
