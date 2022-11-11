import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts/index';
import { Button } from '@mui/material';

export const AppRoutes = () => {
	const { toggleDrawerOpen } = useDrawerContext();

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle drawer</Button>} />
			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
}