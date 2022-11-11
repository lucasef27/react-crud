import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material';

interface IFerramentasDaListagemProps {
	textoDaBusca?: string;
	mostrarInputBusca?: boolean;
	mudarTextoDeBusca?: (novoTexto: string) => void;
	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	clicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({ textoDaBusca = '', mostrarInputBusca = false, mudarTextoDeBusca, textoBotaoNovo = 'Novo', mostrarBotaoNovo = true, clicarEmNovo }) => {
	const theme = useTheme();

	return (
		<Box gap={1} marginX={1} padding={1} paddingX={2} display='flex' alignItems='center' height={theme.spacing(5)} component={Paper}>

			{mostrarInputBusca && (
				<TextField size='small' placeholder='Pesquisar...'
					value={textoDaBusca} onChange={(e) => mudarTextoDeBusca?.(e.target.value)} />
			)}

			<Box flex={1} display='flex' justifyContent='end'>
				{mostrarBotaoNovo && (
					<Button variant='contained' color='primary' startIcon={<Icon>add</Icon>} onClick={clicarEmNovo} disableElevation>
						{textoBotaoNovo}
					</Button>
				)}
			</Box>
		</Box>
	);
}