import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography, Container, TextField, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import './PizzaList.css';

function PizzaList() {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        async function fetchPizzas() {
            try {
                const response = await axios.get('http://localhost:5000/pizzas');
                setPizzas(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchPizzas();
    }, []);

    if (loading) {
        return <div>Caricamento pizze in corso...</div>;
    }

    if (error) {
        return <div>Errore: {error.message}</div>;
    }

    // Filtra e ordina le pizze in base ai filtri
    const filteredPizzas = [...pizzas]
        .filter(pizza => {
            return (
                pizza.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                pizza.category.toLowerCase().includes(categoryFilter.toLowerCase())
            );
        })
        .sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

    return (
        <Container maxWidth="md" className="pizza-list-container">
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Lista Pizze
            </Typography>

            {/* Contenitore per i filtri */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Filtra per nome"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <TextField
                    label="Filtra per categoria"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
            </Box>

            <Grid container spacing={4} justifyContent="center">
                {filteredPizzas.map((pizza) => (
                    <Grid item xs={12} sm={6} md={4} key={pizza._id}>
                        <Card className="pizza-card">
                            <CardMedia
                                component="div"
                                className="pizza-image-container"
                            >
                                {pizza.imageUrl ? (
                                    <img
                                        src={pizza.imageUrl}
                                        alt={pizza.name}
                                        className="pizza-image"
                                    />
                                ) : (
                                    <RestaurantMenuIcon style={{ fontSize: 80, color: '#aaa' }} />
                                )}
                            </CardMedia>
                            <CardContent className="pizza-content">
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {pizza.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {pizza.description}
                                </Typography>
                                <Typography variant="subtitle1" className="pizza-price">
                                    Prezzo: {pizza.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PizzaList;