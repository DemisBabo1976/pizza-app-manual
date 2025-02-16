import React from 'react';
import {
    Routes,
    Route,
    Outlet,
} from 'react-router-dom';
import { Box } from '@mui/material';
import PizzaAdmin from './admin/PizzaAdmin';
import CategoryAdmin from './admin/CategoryAdmin';
import OrderAdmin from './admin/OrderAdmin';

function AdminRoute() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '7rem' }}>
            <Routes>
                <Route path="/" element={<PizzaAdmin />} />
                <Route path="/pizzas" element={<PizzaAdmin />} />
                <Route path="/categories" element={<CategoryAdmin />} />
                <Route path="/orders" element={<OrderAdmin />} />
            </Routes>
            <Outlet />
        </Box>
    );
}

export default AdminRoute;