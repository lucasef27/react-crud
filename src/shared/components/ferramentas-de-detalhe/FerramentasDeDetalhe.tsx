
import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';

interface IFerramentasDeDetalheProps {
	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	mostrarBotaolVoltar?: boolean;
	mostrarBotaoApagar?: boolean;
	mostrarBotaoSalvar?: boolean;
	mostrarBotaoSalvarEFechar?: boolean;

	clicarEmNovo?: () => void;
	clicarEmVoltar?: () => void;
	clicarEmApagar?: () => void;
	clicarEmSalvar?: () => void;
	clicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
	textoBotaoNovo = 'Novo',

	mostrarBotaoApagar = true,
	mostrarBotaoNovo = true,
	mostrarBotaoSalvar = true,
	mostrarBotaoSalvarEFechar = false,
	mostrarBotaolVoltar = true,

	clicarEmNovo,
	clicarEmApagar,
	clicarEmSalvar,
	clicarEmSalvarEFechar,
	clicarEmVoltar

}) => {
	const theme = useTheme();
	return (
		<Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

			{mostrarBotaoSalvar && (
				<Button variant='contained' color='primary' onClick={clicarEmSalvar} startIcon={<Icon>save</Icon>} disableElevation>
					Salvar
				</Button>
			)}
			{mostrarBotaoSalvarEFechar && (
				<Button variant='outlined' color='primary' onClick={clicarEmSalvarEFechar} startIcon={<Icon>save</Icon>} disableElevation>
					Salvar e voltar
				</Button>
			)}
			{mostrarBotaoApagar && (
				<Button variant='outlined' color='primary' onClick={clicarEmApagar} startIcon={<Icon>delete</Icon>} disableElevation>
					Apagar
				</Button>
			)}

			{mostrarBotaoNovo && (
				<Button variant='outlined' color='primary' onClick={clicarEmNovo} startIcon={<Icon>add</Icon>} disableElevation>
					{textoBotaoNovo}
				</Button>
			)}

			<Divider variant='middle' orientation='vertical' />
			{mostrarBotaolVoltar && (
				<Button variant='outlined' color='primary' onClick={clicarEmVoltar} startIcon={<Icon>arrow_back</Icon>} disableElevation>
					Voltar
				</Button>
			)}
		</Box>
	);
}