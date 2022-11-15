
import { Box, Paper, useTheme, Button, Icon, Divider, Skeleton, Typography, useMediaQuery } from '@mui/material';

interface IFerramentasDeDetalheProps {
	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	mostrarBotaoVoltar?: boolean;
	mostrarBotaoApagar?: boolean;
	mostrarBotaoSalvar?: boolean;
	mostrarBotaoSalvarEFechar?: boolean;

	mostrarBotaoNovoCarregando?: boolean;
	mostrarBotaoVoltarCarregando?: boolean;
	mostrarBotaoApagarCarregando?: boolean;
	mostrarBotaoSalvarCarregando?: boolean;
	mostrarBotaoSalvarEFecharCarregando?: boolean;

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
	mostrarBotaoVoltar = true,
	mostrarBotaoSalvarEFechar = false,

	mostrarBotaoApagarCarregando = false,
	mostrarBotaoNovoCarregando = false,
	mostrarBotaoSalvarCarregando = false,
	mostrarBotaoVoltarCarregando = false,
	mostrarBotaoSalvarEFecharCarregando = false,

	clicarEmNovo,
	clicarEmApagar,
	clicarEmSalvar,
	clicarEmSalvarEFechar,
	clicarEmVoltar

}) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

			{(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
				<Button variant='contained' color='primary' onClick={clicarEmSalvar} startIcon={<Icon>save</Icon>} disableElevation>
					<Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						Salvar
					</Typography>
				</Button>
			)}
			{mostrarBotaoSalvarCarregando && (
				<Skeleton width={110} height={60} />
			)}

			{(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
				<Button variant='outlined' color='primary' onClick={clicarEmSalvarEFechar} startIcon={<Icon>save</Icon>} disableElevation>
					<Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						Salvar e voltar
					</Typography>
				</Button>
			)}
			{(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
				<Skeleton width={180} height={60} />
			)}

			{(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
				<Button variant='outlined' color='primary' onClick={clicarEmApagar} startIcon={<Icon>delete</Icon>} disableElevation>
					<Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						Apagar
					</Typography>
				</Button>
			)}
			{mostrarBotaoApagarCarregando && (
				<Skeleton width={110} height={60} />
			)}

			{(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
				<Button variant='outlined' color='primary' onClick={clicarEmNovo} startIcon={<Icon>add</Icon>} disableElevation>
					<Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						{textoBotaoNovo}
					</Typography>
				</Button>
			)}
			{(mostrarBotaoNovoCarregando && !smDown) && (
				<Skeleton width={110} height={60} />
			)}

			{(mostrarBotaoVoltar && mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar) && (
				<Divider variant='middle' orientation='vertical' />
			)}

			{(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
				<Button variant='outlined' color='primary' onClick={clicarEmVoltar} startIcon={<Icon>arrow_back</Icon>} disableElevation>
					<Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
						Voltar	</Typography>
				</Button>
			)}
			{mostrarBotaoVoltarCarregando && (
				<Skeleton width={110} height={60} />
			)}
		</Box>
	);
}