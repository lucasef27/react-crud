import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from 'yup';
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";

interface IFormData {
	email: string;
	nomeCompleto: string;
	cidadeId: number
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
	nomeCompleto: yup.string().required().min(3),
	email: yup.string().required().email(),
	cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');
	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
		} else {
			formRef.current?.setData({
				nomeCompleto: '',
				email: '',
				cidadeId: undefined
			})
		}
	}, [id]);

	const handleSave = (dados: IFormData) => {

		formValidationSchema.validate(dados, { abortEarly: false })
			.then((dadosValidados) => {
				setIsLoading(true);
				if (id === 'nova') {
					PessoasService.create(dadosValidados)
						.then((e) => {
							setIsLoading(false);
							if (e instanceof Error) {
								alert(e.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/pessoas');
								} else {
									navigate(`/pessoas/detalhe/${e}`)
								}
							}
						})
				} else {
					PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados })
						.then((e) => {
							setIsLoading(false);
							if (e instanceof Error) {
								alert(e.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/pessoas');
								}
							}
						})
				}
			})
			.catch((error: yup.ValidationError) => {
				const validationError: IVFormErrors = {};
				error.inner.forEach(e => {
					if (!e.path) return;

					validationError[e.path] = e.message;
				});
				formRef.current?.setErrors(validationError);
			});


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

					clicarEmSalvar={save}
					clicarEmSalvarEFechar={saveAndClose}
					clicarEmApagar={() => handleDelete(Number(id))}
					clicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					clicarEmVoltar={() => navigate('/pessoas')}
				/>
			}>


			<VForm ref={formRef} onSubmit={handleSave}>
				<Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
					<Grid container direction='column' padding={2} spacing={2}>
						{isLoading && (
							<Grid item>
								<LinearProgress variant="indeterminate" />
							</Grid>
						)}
						<Grid item>
							<Typography variant="h6">Geral</Typography>
						</Grid>

						<Grid container item direction='row'>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<VTextField fullWidth name="nomeCompleto" label="Nome completo" disabled={isLoading} onChange={e => setNome(e.target.value)} />
							</Grid>
						</Grid>
						<Grid container item direction='row'>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<VTextField fullWidth name="email" label="Email" disabled={isLoading} />
							</Grid>
						</Grid>
						<Grid container item direction='row'>
							<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
								<AutoCompleteCidade
									isExternalLoading={isLoading} />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</VForm>

		</LayoutBaseDePagina >
	)
}