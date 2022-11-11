import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../../contexts';

interface IMenuLateralProps {
	children: React.ReactNode
}

interface IListItemLinkProps {
	to: string;
	label: string;
	icon: string;
	onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
	const navigate = useNavigate();
	const resolvedPath = useResolvedPath(to);
	const match = useMatch({ path: resolvedPath.pathname, end: false });


	const handleClick = () => {
		navigate(to);
		onClick?.(); // verifica se a função é undefined, se for excuta nada
	}
	return (
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				<Icon>{icon}</Icon>
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	);
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
	const { toggleTheme } = useAppThemeContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
					<Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar src="src/static/images/weg.png" sx={{ height: theme.spacing(12), width: theme.spacing(12) }} />
					</Box>
					<Divider />
					<Box flex={1}>
						<List component="nav">
							{drawerOptions.map(drawerOption => (
								<ListItemLink key={drawerOption.path} icon={drawerOption.icon} label={drawerOption.label} to={drawerOption.path} onClick={smDown ? toggleDrawerOpen : undefined} />
							))}
						</List>
					</Box>

					<Box>
						<List component="nav">
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									<Icon>dark_mode</Icon>
								</ListItemIcon>
								<ListItemText primary='Alterar tema' />
							</ListItemButton>
						</List>
					</Box>

				</Box>
			</Drawer>
			<Box height='100%' marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
}