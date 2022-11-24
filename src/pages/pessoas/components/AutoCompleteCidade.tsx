import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from '@unform/core';
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { useDebounce } from "../../../shared/hooks";

type TAutoCompleteOption = {
	id: number,
	label: string,
}

interface IAutoCompleteCidadeProps {
	isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
	const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
	const { debounce } = useDebounce();
	const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [busca, setBusca] = useState('');
	const [selectId, setSelectId] = useState<number | undefined>(defaultValue);

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => selectId,
			setValue: (_, newSelectedId) => setSelectId(newSelectedId)
		})
	}, [registerField, fieldName, selectId]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CidadesService.getAll(1, busca)
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						//alert(result.message);

					} else {
						console.log(result);
						setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
					}
				});
		});
	}, [busca]);


	const autoCompleteSelectedOption = useMemo(() => {
		if (!selectId) return null;

		const selectedOption = opcoes.find(e => e.id === selectId);
		if (!selectedOption) return null;

		return selectedOption;
	}, [selectId, opcoes]);

	return (
		<Autocomplete
			value={autoCompleteSelectedOption}
			loading={isLoading}
			disabled={isExternalLoading}
			popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
			onInputChange={(_, newValue) => setBusca(newValue)}
			onChange={(_, newVale) => { setSelectId(newVale?.id); setBusca(''); clearError() }}
			options={opcoes}
			openText='Abrir'
			closeText='Fechar'
			noOptionsText='Sem opções'
			loadingText='Carregando...'
			disablePortal
			renderInput={(params) => (
				<TextField
					{...params}
					label='Cidade'
					error={!!error}
					helperText={error}
				/>
			)}
		/>
	);
}