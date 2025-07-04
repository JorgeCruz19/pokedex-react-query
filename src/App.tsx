import AppRouter from './router/routes';
import { BrowserRouter } from 'react-router';

const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
};

export default App;
