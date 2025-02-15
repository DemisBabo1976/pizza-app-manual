import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Lista Pizze</h1>
            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza._id}>
                        <h2>{pizza.name}</h2>
                        <p>{pizza.description}</p>
                        <p>Prezzo: {pizza.price}</p>
                        <img src={pizza.imageUrl} alt={pizza.name} style={{ width: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PizzaList;