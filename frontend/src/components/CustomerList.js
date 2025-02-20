import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CustomerList({ onEditCustomer }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error("Errore durante il caricamento dei clienti:", error);
        //TODO: Gestire l'errore in modo più appropriato (es. visualizzare un messaggio all'utente)
      }
    }
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      console.error("Errore durante l'eliminazione del cliente:", error);
      //TODO: Gestire l'errore in modo più appropriato
    }
  };

  return (
    <Box sx={{ maxHeight: customers.length > 4 ? '200px' : 'auto', overflowY: 'auto' }}>
      <List>
        {customers.map(customer => (
          <ListItem key={customer._id} secondaryAction={
            <Box>
              <IconButton edge="end" aria-label="edit" onClick={() => onEditCustomer(customer)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(customer._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }>
            <ListItemText primary={`${customer.firstName} ${customer.lastName}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default CustomerList;