import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Button,
    Box,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Importa l'icona Pizza
import './PizzaAdmin.css';

const PizzaAdmin = () => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [newPizza, setNewPizza] = useState({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: '',
        ingredients: [],
        sizes: []
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);

    const fetchPizzas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/pizzas');
            setPizzas(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPizzas();
    }, []);

    const handleInputChange = (e) => {
        setNewPizza({ ...newPizza, [e.target.name]: e.target.value });
    };


    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        // Mostra l'immagine selezionata
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setNewPizza({...newPizza, imageUrl: e.target.result})
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Risposta da upload:", response.data);
            console.log("URL Immagine:", response.data.imageUrl);

            // Aggiorna l'URL dell'immagine con la risposta dal server
            setNewPizza({ ...newPizza, imageUrl: response.data.imageUrl });
        } catch (error) {
            setError(error);
            console.error('Errore durante l\'upload:', error);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click(); // Simula il click sull'input file nascosto
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("File Selezionato:", selectedFile);
        console.log("Dati Pizza:", newPizza);

        try {
            await handleUpload(); // Chiama sempre handleUpload

            if (selectedPizza) {
                // Se c'è una pizza selezionata, aggiornala
                await axios.put(`http://localhost:5000/pizzas/${selectedPizza._id}`, newPizza);
            } else {
                // Altrimenti, crea una nuova pizza
                await axios.post('http://localhost:5000/pizzas', newPizza);
            }
            fetchPizzas();
            setNewPizza({
                name: '',
                description: '',
                price: 0,
                imageUrl: '',
                category: '',
                ingredients: [],
                sizes: []
            });
            setSelectedPizza(null);
            setSelectedFile(null); // Resetta il file selezionato;
        } catch (err) {
            setError(err);
            console.error("ERRORE in handleSubmit", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pizzas/${id}`);
            fetchPizzas();
        } catch (err) {
            setSelectedFile(null); // Resetta il file selezionato;
            setError(err);
        };
    };

    const handleEdit = (pizza) => {
        setSelectedPizza(pizza);
        setNewPizza(pizza);
    };

    const filteredPizzas = pizzas.filter(pizza => {
        return (
            pizza.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
            pizza.category.toLowerCase().includes(categoryFilter.toLowerCase())
        );
    });

    return (
        <div>
            <h1>GESTIONE PIZZE</h1>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }} noValidate autoComplete="off">
                 <TextField required id="name" label="Nome" name="name" value={newPizza.name} onChange={handleInputChange} sx={{ width: '100%', m: 1 }} />
                <TextField id="description" label="Descrizione" name="description" value={newPizza.description} onChange={handleInputChange} sx={{ width: '100%', m: 1 }} />
                <TextField required id="price" label="Prezzo" name="price" value={newPizza.price} onChange={handleInputChange} type="number" sx={{ width: '100%', m: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', m: 1 }}>
                    <Button
                       variant="outlined"
                       onClick={handleBrowseClick}
                       size="small"
                       sx={{ m: 1, width: '100%', display: 'flex', height: '56px' }}
                    >
                   SFOGLIA IMMAGINE
                   </Button>
               </Box>

                     <input
                        type="file"
                         accept="image/*"
                         onChange={handleFileSelect}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                     {newPizza.imageUrl && <img src={newPizza.imageUrl} alt="Anteprima" style={{ maxWidth: '100px', maxHeight: '100px' }} />}

                <TextField required id="category" label="Categoria" name="category" value={newPizza.category} onChange={handleInputChange} sx={{ width: '100%', m: 1 }} />
                 <Box sx={{ display: 'flex', flexDirection: 'center', alignItems: 'flex', width: '100%', m: 1 }}> {/* Aggiunto un Box per contenere i filtri */}
                  <TextField
                        id="nameFilter"
                        label="Filtra per nome"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ flexGrow: 1, mr: 1 }}
                    />
                  </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', m: 1 }} startIcon={<AddIcon />}>{selectedPizza ? 'Aggiorna Pizza' : 'Aggiungi Pizza'}</Button>
            </Box>
            {loading ? (
                <div>Caricamento pizze in corso...</div>
            ) : error ? (
                <div>Errore: {error.message}</div>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Nome</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Descrizione</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Prezzo</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Categoria</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Immagine</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Azioni</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPizzas.map((pizza) => (
                                <TableRow
                                    key={pizza._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {pizza.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{textAlign: 'left'}}>{pizza.description}</TableCell>
                                    <TableCell align="right">
                                        {pizza.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{pizza.category}</TableCell>
                                    <TableCell align="right">
                                        {pizza.imageUrl ? (
                                            <img src={pizza.imageUrl} alt={pizza.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                        ) : (
                                            <FastfoodIcon style={{ fontSize: '50px', color: 'gray' }} />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit"  onClick={() => handleEdit(pizza)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDelete(pizza._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default PizzaAdmin;