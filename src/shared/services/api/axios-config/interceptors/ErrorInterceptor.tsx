import { ProductionQuantityLimitsRounded } from '@mui/icons-material';
import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {

	if (error.message == 'Network Error') {
		return Promise.reject(new Error('Erro de conexão.'));
	}

	if (error.status === 401) {
		//return Promise.reject(new Error('Erro de conexão.'));
	}

	return Promise.reject(error);
}