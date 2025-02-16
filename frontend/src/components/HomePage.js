import React from 'react';
import { Box, Typography } from '@mui/material';

function HomePage() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%', // Altezza dinamica: dipende dal contenuto
            bgcolor: '#f5f5f5', // Sfondo chiaro come l'Admin,
        }}>
            <Typography variant="h2" gutterBottom>
                Benvenuto nella Pizza App!
            </Typography>
            <Typography variant="body1">
                Naviga tra le rotte nel menu per visualizzare i dati.
            </Typography>
        </Box>
    );
}

export default HomePage;