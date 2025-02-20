import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography,
    Paper, Box,
    IconButton, Toolbar, AppBar, Grid, Card, CardContent,
    Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [settings, setSettings] = useState(null);
    const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [key, setKey] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const ordersResponse = await axios.get('http://localhost:5000/orders');
                setOrders(ordersResponse.data);

                const settingsResponse = await axios.get('http://localhost:5000/settings');
                setSettings(settingsResponse.data);

                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const generateTimeSlots = () => {
        if (!settings) return [];

        const startTime = settings.startTime;
        const endTime = settings.endTime;
        const prepTime = settings.prepTime;

        const timeSlots = [];
        let currentTime = startTime;

        while (currentTime <= endTime) {
            timeSlots.push(currentTime);
            const [hours, minutes] = currentTime.split(':');
            let newMinutes = parseInt(minutes) + prepTime;
            let newHours = parseInt(hours);

            if (newMinutes >= 60) {
                newHours += Math.floor(newMinutes / 60);
                newMinutes = newMinutes % 60;
            }

            currentTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

            if (newHours > 23) {
                break;
            }
        }

        return timeSlots;
    };

    const timeSlots = generateTimeSlots();

    if (loading) {
        return <div>Caricamento ordini in corso...</div>;
    }

    if (error) {
        return <div>Errore: {error.message}</div>;
    }

    if (!settings) {
        return <div>Caricamento impostazioni in corso...</div>;
    }

    const ordersByTimeSlot = timeSlots.map(timeSlot => {
        return orders.filter(order => order.deliveryTime === timeSlot);
    });

    const handleCallClient = () => {
        console.log("Calling a client...");
    };

    const handleInsertOrder = () => {
        console.log("Inserting a new order...");
    };

    const rowHeight = 150;
    const visibleRows = 3;
    const maxHeight = rowHeight * visibleRows;

    const handleOpenCustomerForm = () => {
        setSelectedCustomer(null);
        setIsCustomerFormOpen(true);
    };

    const handleEditCustomer = (customer) => {
        setSelectedCustomer(customer);
        setIsCustomerFormOpen(true);
    };

    const handleCloseCustomerForm = () => {
        setIsCustomerFormOpen(false);
        setSelectedCustomer(null);
    };

    const handleCustomerFormSubmit = () => {
        handleCloseCustomerForm();
        setKey(key + 1);
    };

    return (
        <Container maxWidth="md" className="pizza-list-container">
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="h1">
                        Gestione Ordini
                    </Typography>
                    <Box>
                        <IconButton aria-label="Richiama Cliente" onClick={handleCallClient}>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton aria-label="Inserisci Ordine" onClick={handleInsertOrder}>
                            <NoteAddIcon />
                        </IconButton>
                        <Button variant="contained" color="primary" onClick={handleOpenCustomerForm}>
                            Nuovo Cliente
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Paper elevation={3} sx={{ padding: 2, mt: 0 }}>
                <Typography variant="h6" gutterBottom>Orari</Typography>
                <Box sx={{
                    maxHeight: maxHeight,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                }}>
                    <Grid container spacing={2} justifyContent="center">
                        {timeSlots.map((timeSlot, index) => {
                            const orderCount = ordersByTimeSlot[index].length;
                            const ordersForThisSlot = ordersByTimeSlot[index];

                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={timeSlot}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            textAlign: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '150px',
                                        }}
                                    >
                                        <Typography variant="subtitle1">{timeSlot}</Typography>
                                        <RestaurantMenuIcon />
                                        <Typography variant="body1">{orderCount} Ordini</Typography>
                                        {ordersForThisSlot.map(order => (
                                            <Typography key={order._id} variant="caption">
                                                {order.customer?.firstName} {order.customer?.lastName}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
               <CustomerList key = {key} onEditCustomer = {handleEditCustomer} />
            </Paper>

            <Dialog open={isCustomerFormOpen} onClose={handleCloseCustomerForm}>
                <DialogTitle>{selectedCustomer ? 'Modifica Cliente' : 'Nuovo Cliente'}</DialogTitle>
                <DialogContent>
                    <CustomerForm initialCustomer={selectedCustomer} onSubmit={handleCustomerFormSubmit} />
                </DialogContent>                
            </Dialog>
        </Container>
    );
}

export default OrderPage;