import { createContext, useState, useCallback, useContext } from 'react';

interface IDrawerContextData {
	isDrawerOpen: boolean;
	drawerOptions: IDrawerOption[];
	toggleDrawerOpen: () => void;
	setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerOption {
	icon: string;
	path: string;
	label: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

interface IDrawerProviderProps {
	children: React.ReactNode
}

export const useDrawerContext = () => {
	return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
	}, []);

	const handleSetDrawerOpen = useCallback((newDrawerOptions: IDrawerOption[]) => {
		setDrawerOptions(newDrawerOptions);
	}, []);

	return (
		<DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOption: handleSetDrawerOpen }}>
			{children}
		</DrawerContext.Provider>
	)
}