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
		<Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display='flex' gap={1} alignItems='center' component={Paper}>

			{mostrarInputBusca && (
				<TextField size='small' placeholder='Pesquisar...'
					value={textoDaBusca} onChange={(e) => mudarTextoDeBusca?.(e.target.value)} />
			)}

			<Box flex={1} display='flex' justifyContent='end'>
				{mostrarBotaoNovo && (
					<Button variant='contained' color='primary' endIcon={<Icon>add</Icon>} onClick={clicarEmNovo} disableElevation>
						{textoBotaoNovo}
					</Button>
				)}
			</Box>
		</Box>
	);
}