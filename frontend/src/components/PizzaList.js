import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Grid, Typography, Container, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import './PizzaList.css';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container maxWidth="md" className="pizza-list-container">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Lista Pizze
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {pizzas.map((pizza) => (
          <Grid item xs={12} sm={6} md={4} key={pizza._id}>
            <Card className="pizza-card">
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                }}
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
                {/* Sposta il prezzo qui */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography variant="subtitle1" className="pizza-price">
                    Prezzo: {pizza.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default PizzaList;