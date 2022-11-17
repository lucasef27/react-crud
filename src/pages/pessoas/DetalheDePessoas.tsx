import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Form } from '@unform/web';
import { VTextField } from "../../shared/forms";
import { FormHandles } from '@unform/core';


interface IFormData {
	email: string;
	nomeCompleto: string;
	cidadeId: number
}

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');
	const formRef = useRef<FormHandles>(null);

	useEffect(() => {
		if (id !== 'nova') {
			setIsLoading(true);

			PessoasService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);
					if (result instanceof Error) {
						alert(result.message);
						navigate('/pessoas');
					} else {						
						setNome(result.nomeCompleto);
						formRef.current?.setData(result);
					}
				})
		}
	}, [id]);

	const handleSave = (dados: IFormData) => {
		setIsLoading(true);
		if (id === 'nova') {
			PessoasService.create(dados)
				.then((e) => {
					setIsLoading(false);
					if (e instanceof Error) {
						alert(e.message);
					} else {
						navigate(`pessoas/detalhe/${e}`)
					}
				})
		} else {
			PessoasService.updateById(Number(id), { id: Number(id), ...dados })
				.then((e) => {
					setIsLoading(false);
					if (e instanceof Error) {
						alert(e.message);
					}
				})
		}
	}

	const handleDelete = (id: number) => {
		PessoasService.deleteById(id)
			.then(result => {
				if (result instanceof Error) {
					alert(result.message);
				} else {
					alert('Registro apagado com sucesso.');
					navigate('/pessoas');
				}
			});

	}



	return (
		<LayoutBaseDePagina
			titulo={id === 'nova' ? 'Nova pessoa' : nome}
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo="Nova"
					mostrarBotaoSalvarEFechar
					mostrarBotaoNovo={id !== 'nova'}
					mostrarBotaoApagar={id !== 'nova'}

					clicarEmSalvar={() => formRef.current?.submitForm()}
					clicarEmSalvarEFechar={() => formRef.current?.submitForm()}
					clicarEmApagar={() => handleDelete(Number(id))}
					clicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					clicarEmVoltar={() => navigate('/pessoas')}
				/>
			}>


			<Form ref={formRef} onSubmit={handleSave}>

				<VTextField name="email" />
				<VTextField name="nomeCompleto" />
				<VTextField name="cidadeId" />

				<button type="submit">Submit</button>
			</Form>

		</LayoutBaseDePagina>
	)
}