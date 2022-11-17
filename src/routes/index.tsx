import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/index';
import { useEffect } from 'react';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';

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
				icon: 'people',
				path: '/pessoas',
				label: 'Pessoas'
			}
		]);
	}, []);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard />} />

			<Route path='/pessoas' element={<ListagemDePessoas />} />
			<Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas/>} />

			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
}