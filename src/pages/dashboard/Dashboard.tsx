import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem, FerramentasDeDetalhe } from '../../shared/components';

export const Dashboard = () => {

	return (
		<LayoutBaseDePagina titulo="Página inicial" barraDeFerramentas={(
			<FerramentasDeDetalhe  mostrarBotaoSalvarEFechar/>
		)}>
			Testando
		</LayoutBaseDePagina>

	);

}