import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, FormHelperText } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomerForm.css';

function CustomerForm({ onSubmit, initialCustomer }) {
  const [firstName, setFirstName] = useState(initialCustomer?.firstName || '');
  const [lastName, setLastName] = useState(initialCustomer?.lastName || '');
  const [phone, setPhone] = useState(initialCustomer?.phone || '');
  const [address, setAddress] = useState(initialCustomer?.address || '');
  const [birthDate, setBirthDate] = useState(initialCustomer?.birthDate || null);
  const [email, setEmail] = useState(initialCustomer?.email || '');
  const [loyaltyPoints, setLoyaltyPoints] = useState(initialCustomer?.loyaltyPoints || 0);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione del numero di telefono
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError(true);
      return; // Interrompe l'invio del modulo
    } else {
      setPhoneError(false);
    }

    // Validazione di Nome o Cognome
    if (firstName.trim().length === 0 && lastName.trim().length === 0) {
      // Almeno uno tra nome e cognome deve essere presente
      alert("Inserisci almeno il Nome o il Cognome.");
      return; // Interrompe l'invio del modulo
    }

    const customerData = {
      firstName,
      lastName,
      phone,
      address,
      birthDate: birthDate || null,
      email,
      loyaltyPoints: parseInt(loyaltyPoints) || 0
    };

    console.log("Dati cliente da inviare:", customerData);

    try {
      if (initialCustomer) {
        await axios.patch(`http://localhost:5000/customers/${initialCustomer._id}`, customerData);
      } else {
        await axios.post(`http://localhost:5000/customers`, customerData);
      }
      onSubmit(); // Chiama la funzione per aggiornare la lista
    } catch (error) {
      console.error("Errore durante il salvataggio del cliente:", error);
      // TODO: Handle the error appropriately
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    if (phoneError) {
      setPhoneError(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Nome" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField label="Cognome" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField
        label="Telefono"
        fullWidth
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        error={phoneError}
        helperText={phoneError && "Il numero di telefono deve contenere esattamente 10 cifre."}
      />
      <TextField label="Indirizzo" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} />
      <DatePicker
        selected={birthDate}
        onChange={(date) => setBirthDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="GG/MM/AAAA"
        className="MuiTextField-root MuiInputBase-input"
        style={{ marginTop: '16px', marginBottom: '8px', width: '100%' }}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Punti Raccolti"
        fullWidth
        margin="normal"
        type="number"
        value={loyaltyPoints}
        onChange={(e) => setLoyaltyPoints(parseInt(e.target.value) || 0)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onSubmit}>Annulla</Button>
        <Button type="submit" variant="contained" color="primary" sx={{ ml: 1 }}>
          Salva
        </Button>
      </Box>
    </Box>
  );
}

export default CustomerForm;