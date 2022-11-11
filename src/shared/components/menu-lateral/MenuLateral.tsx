import { Drawer, useTheme, Avatar, Divider, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../../contexts';


interface IMenuLateralProps {
	children: React.ReactNode
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box width={theme.spacing(28)} display='flex' flexDirection='column' height='100%'>
					<Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
						<Avatar src="src\static\images\weg.png" sx={{ height: theme.spacing(12), width: theme.spacing(12) }} />
					</Box>
					<Divider />

					<Box flex={1}>
						<List component="nav">
							<ListItemButton>
								<ListItemIcon>
									<Icon>home</Icon>
								</ListItemIcon>
								<ListItemText primary="Página inicial" />
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