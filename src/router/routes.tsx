import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Page404 from '../pages/404';
import Pokemon from '../pages/Pokemon';

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/pokemon/:id' element={<Pokemon />} />
			<Route path='*' element={<Page404 />} />
		</Routes>
	);
};

export default AppRouter;
