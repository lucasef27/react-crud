import { Routes, Route } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/index';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
	const { setDrawerOption } = useDrawerContext();


	useEffect(() => {
		setDrawerOption([
			{
			icon: 'home',
			path: '/pagina-inicial',
			label: 'Página inicial'
		},
		{
			icon: 'star',
			path: '/cidades',
			label: 'Cidades'
		}
	]); 
	}, []);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard/>} />
			{/*<Route path='*' element={<Navigate to='/pagina-inicial' />} />*/}
		</Routes>
	);
}