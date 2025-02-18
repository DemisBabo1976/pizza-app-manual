import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Icon from '@mdi/react';
import { mdiAccountCog } from '@mdi/js';

function AdminMenu() {
    return (
        <Box sx={{ width: 240, flexShrink: 0, mt: 2 }}>
            <List>
                <ListItem button component={Link} to="/admin/pizzas">
                    <ListItemIcon>
                        <Icon path={mdiAccountCog} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Pizze" />
                </ListItem>
                <ListItem button component={Link} to="/admin/categories">
                    <ListItemIcon>
                        <Icon path={mdiAccountCog} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Categorie" />
                </ListItem>
                <ListItem button component={Link} to="/admin/orders">
                    <ListItemIcon>
                        <Icon path={mdiAccountCog} size={1} />
                    </ListItemIcon>
                    <ListItemText primary="Ordini" />
                </ListItem>
            </List>
        </Box>
    );
}

export default AdminMenu;