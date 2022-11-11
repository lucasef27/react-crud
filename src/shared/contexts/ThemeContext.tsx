import { createContext, useState, useCallback, useMemo, useContext } from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { DarkTheme, LightTheme } from './../themes';

interface IThemeContextData {
	themeName: 'light' | 'dark';
	toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IThemeContextProps {
	children: React.ReactNode
}

export const useAppThemeContext = () => {
	return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IThemeContextProps> = ({ children }) => {
	const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

	const toggleTheme = useCallback(() => {
		setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
	}, []);


	const theme = useMemo(() => {
		if (themeName === 'light') return LightTheme;

		return DarkTheme;
	}, [themeName]);


	return (
		<ThemeContext.Provider value={{ themeName, toggleTheme }}>
			<ThemeProvider theme={theme}>
				<Box width='100%' height='100%' bgcolor={theme.palette.background.default}>
					{children}
				</Box>
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}