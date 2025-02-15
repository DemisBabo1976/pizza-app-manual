import React from 'react';
import {
    Routes,
    Route,
    Outlet,
} from 'react-router-dom';
import { Box } from '@mui/material';
import PizzaAdmin from './PizzaAdmin';
import CategoryAdmin from './CategoryAdmin';
import OrderAdmin from './OrderAdmin';

function AdminDashboard() {
    return (
    <>
      <h1>SONO DENTRO LA PAGINA ADMIN</h1>
        </>
    );
}

export default AdminDashboard;