import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

function CustomerForm({ onSubmit, initialCustomer }) {
  const [firstName, setFirstName] = useState(initialCustomer?.firstName || '');
  const [lastName, setLastName] = useState(initialCustomer?.lastName || '');
  const [phone, setPhone] = useState(initialCustomer?.phone || '');
  const [address, setAddress] = useState(initialCustomer?.address || '');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      firstName,
      lastName,
      phone,
      address
    };

    try {
      if (initialCustomer) {
          await axios.patch(`http://localhost:5000/customers/${initialCustomer._id}`, customerData);
      } else {
          await axios.post('http://localhost:5000/customers', customerData);
      }
      onSubmit(); // Chiama la funzione per aggiornare la lista
    } catch (error) {
        console.error("Errore durante il salvataggio del cliente:", error);
        //TODO: Gestire l'errore in modo più appropriato
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Nome" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField label="Cognome" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
       <TextField label="Telefono" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField label="Indirizzo" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button type="submit" variant="contained" color="primary">
        Salva
      </Button>
    </Box>
  );
}

export default CustomerForm;