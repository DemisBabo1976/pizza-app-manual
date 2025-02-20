import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import CategoryList from './components/CategoryList';
import HomePage from './components/HomePage';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Fastfood as FastfoodIcon, Category as CategoryIcon, ShoppingCart as ShoppingCartIcon, Home as HomeIcon, AccountCircle as AccountCircleIcon} from '@mui/icons-material';
import AdminDashboard from './components/admin/AdminDashboard';
import OrderPage from './components/OrderPage'; // Importa il componente OrderPage

const drawerWidth = 240;

function App() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };
  

    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Pizza App
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Toolbar />
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/pizzas">
                            <ListItemIcon>
                                <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pizze" />
                        </ListItem>
                        <ListItem button component={Link} to="/categories">
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categorie" />
                        </ListItem>
                        <ListItem button component={Link} to="/orders">
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ordini" />
                       </ListItem>
                         {/*LASCIA CODICE ATTIVO*/}
                    <ListItem button component={Link} to="/admin">
                      <ListItemIcon>
                          <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Admin" />
                    </ListItem>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:  '7rem' }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pizzas" element={<PizzaList />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/orders" element={<OrderPage />} /> {/* Correzione: Usa OrderPage invece di OrderList */}
                        {/*CHIAMARE CORRETTAMENTE LA PAGINA ADMIN*/}
                        <Route path="/admin/*" element={<AdminDashboard />} />
                    </Routes>
                    <Outlet />
                </Box>
            </Box>
        </Router>
    );
}

export default App;