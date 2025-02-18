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
import './PizzaAdmin.css';
import Snackbar from '@mui/material/Snackbar';  // Import Snackbar
import Alert from '@mui/material/Alert';      // Import Alert

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
    const [openSnackbar, setOpenSnackbar] = useState(false); // Gestione dello stato della Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Messaggio della Snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Tipo di Snackbar: success, error, warning, info

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
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setNewPizza({...newPizza, imageUrl: e.target.result})
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

  const handleUpload = async () => {
   
    const data = new FormData()
    data.append('file', selectedFile)
  };

  const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

  const handleBrowseClick = () => {

      // Eseguiamo l'upload e la generazione della anteprima solo se esiste un file
      fileInputRef.current.click(); // Simula il click sull'input file nascosto
  };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Dati Pizza:", newPizza); // Aggiungi questo console.log

        try {
            

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
              setSnackbarMessage('Operazione eseguita con successo!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    }  catch (err) {
                setError(err);
                console.error("Errore durante il salvataggio della pizza:", err);
                if (err && err.response && err.response.data) {
                    setSnackbarMessage('Errore durante l\'azione: ' + err.response.data.message);
                } else {
                    setSnackbarMessage('Si è verificato un errore sconosciuto durante il salvataggio.');
                }
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pizzas/${id}`);
            fetchPizzas();
        } catch (err) {
            setSelectedFile(null); // Resetta il file selezionato;
            setError(err);
            setSnackbarMessage('Pizza eliminata con successo!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
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
            <h1>GESTIONE ARTICOLI</h1>
            <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }} noValidate autoComplete="off">
                 <TextField required id="name" label="Nome" name="name" value={newPizza.name} onChange={handleInputChange} sx={{ width: '100%', m: 1 }} />
                <TextField id="description" label="Descrizione" name="description" value={newPizza.description} onChange={handleInputChange} sx={{ width: '100%', m: 1 }} />
                <TextField required id="price" label="Prezzo" name="price" value={newPizza.price} onChange={handleInputChange} type="number" sx={{ width: '100%', m: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', m: 1 }}>
                    <TextField
                        id="imageUrl"
                        label="URL Immagine"
                        name="imageUrl"
                        value={newPizza.imageUrl}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1, mr: 1 }}
                     />
                    <Button
                       variant="outlined"
                       onClick={handleBrowseClick}
                       size="small"
                       sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5', height: '56px' }}
                     >
                     Sfoglia...
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
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', m: 1, width: '100%' }}>
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
                        sx={{ width: '100%' }}
                    />
                    <TextField
                        id="categoryFilter"
                        label="Filtra per categoria"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ width: '100%' }}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', m: 1 }} startIcon={<AddIcon />}>{selectedPizza ? 'Aggiorna Pizza' : 'Aggiungi Pizza'}</Button>
            </Box>
            {loading ? (
                <div>Caricamento pizze in corso...</div>
            ) : error ? (
                <div>Errore: {error.message}</div>
            ) : (
                <TableContainer component={Paper} sx={{ maxHeight: 400 }} className="table-container">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Nome</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Descrizione</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Prezzo</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Categoria</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Immagine</TableCell>
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
                                    <TableCell align="right">{pizza.category}</TableCell>
                                    <TableCell align="center">
                                        <img
                                          src={pizza.imageUrl ? pizza.imageUrl : "immagin/pizza-placeholder.png"}
                                          alt={pizza.name}
                                          style={{ maxWidth: '50px', maxHeight: '50px' }}
                                        />
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
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
              <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
              </Alert>
              </Snackbar>
        </div>
    );
}

export default PizzaAdmin;