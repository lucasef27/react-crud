import {setLocale} from 'yup';

setLocale({
	mixed:{
		default: 'Campo não é valido',
		required: 'O campo é obrigatório',
	},
	string:{
		email: () => 'O campo precisa conter um email válido',
		max: ({max}) => `O campo pode ter no máximo ${max} caracteres`,
		min: ({min}) => `O campo precisa ter pelo menos ${min} de caracteres`,
		length: ({length}) => `O campo precisa ter exatamente ${length} caracteres`,
	},
	date: {
		max: ({max})=> `A data deve ser menos que ${max}`,
		min: ({min}) => `A data deve ser maior que ${min}`,
	},
	number:{
		integer: ()=> 'O campo precisa ter um valor inteiro',
		negative: ()=> 'O campo precisa ter um valor negativo',
		positive: () => 'O campo precisa ter um valor positivo',
		moreThan: ({more}) => `O campo precisa ter um vaor maior que ${more}`,
		lessThan: ({less}) => `O campo precisa ter um valor menos que ${less}`,
		max: ({max}) => `O campo pode ter um valor com menos de ${max} caracteres`,
		min: ({min}) => `O campo pode ter um valor com mais de ${min} de caracteres`,
	},
	boolean: {},
	object: {},
	array: {},
})