import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('http://localhost:5000/orders');
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Caricamento ordini in corso...</div>;
    }

    if (error) {
        return <div>Errore: {error.message}</div>;
    }

    return (
        <Container maxWidth="md" className="pizza-list-container">
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Gestione Ordini
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Ordine #{order._id}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Cliente: {order.customer.firstName} {order.customer.lastName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Tipo: {order.orderType}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Orario: {order.deliveryTime}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Totale: {order.totalPrice} €
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default OrderPage;