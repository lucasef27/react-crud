import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from 'yup';

interface IFormData {
	nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
	nome: yup.string().required().min(3),
});

export const DetalheDeCidades: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');
	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

	useEffect(() => {
		if (id !== 'nova') {
			setIsLoading(true);

			CidadesService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);
					if (result instanceof Error) {
						alert(result.message);
						navigate('/cidades');
					} else {
						setNome(result.nome);
						formRef.current?.setData(result);
					}
				})
		} else {
			formRef.current?.setData({				
				nome: ''
			})
		}
	}, [id]);

	const handleSave = (dados: IFormData) => {

		formValidationSchema.validate(dados, { abortEarly: false })
			.then((dadosValidados) => {
				setIsLoading(true);
				if (id === 'nova') {
					CidadesService.create(dadosValidados)
						.then((e) => {
							setIsLoading(false);
							if (e instanceof Error) {
								alert(e.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/cidades');
								} else {
									navigate(`/cidades/detalhe/${e}`)
								}
							}
						})
				} else {
					CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados })
						.then((e) => {
							setIsLoading(false);
							if (e instanceof Error) {
								alert(e.message);
							} else {
								if (isSaveAndClose()) {
									navigate('/cidades');
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
		CidadesService.deleteById(id)
			.then(result => {
				if (result instanceof Error) {
					alert(result.message);
				} else {
					alert('Registro apagado com sucesso.');
					navigate('/cidades');
				}
			});

	}



	return (
		<LayoutBaseDePagina
			titulo={id === 'nova' ? 'Nova cidade' : nome}
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo="Nova"
					mostrarBotaoSalvarEFechar
					mostrarBotaoNovo={id !== 'nova'}
					mostrarBotaoApagar={id !== 'nova'}

					clicarEmSalvar={save}
					clicarEmSalvarEFechar={saveAndClose}
					clicarEmApagar={() => handleDelete(Number(id))}
					clicarEmNovo={() => navigate('/cidades/detalhe/nova')}
					clicarEmVoltar={() => navigate('/cidades')}
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
								<VTextField fullWidth name="nome" label="Nome" disabled={isLoading} onChange={e => setNome(e.target.value)} />
							</Grid>
						</Grid>						
					</Grid>
				</Box>
			</VForm>

		</LayoutBaseDePagina >
	)
}