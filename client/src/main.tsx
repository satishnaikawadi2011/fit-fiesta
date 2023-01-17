import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './style/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</ReduxProvider>
	</React.StrictMode>
);
