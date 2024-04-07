import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'; // Import Pagination component
import ResultCard from './ResultCard';

const Search = () => {
    const [makeName, setMakeName] = useState('');
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10; // Number of results per page

    const saerchM = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/search?make=${makeName}`);
            setResults(response.data);
            setCurrentPage(1); // Reset to first page with new results
        } catch (error) {
            console.error('Error fetching data: ', error);
            setResults([]);
        }
    };

    // Calculate total pages
    const pageCount = Math.ceil(results.length / resultsPerPage);

    // Get current results
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    // Change page
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter car make"
                value={makeName}
                onChange={(e) => setMakeName(e.target.value)}
                style={{ width: "300px", height: "30px"}} // Increase the width of the input box
            />
            <button onClick={saerchM}>Search</button>
            <Grid container spacing={2} justifyContent="center">
                {currentResults.map((car, index) => (
                    <Grid item key={index}>
                        <ResultCard car={car} />
                    </Grid>
                ))}
            </Grid>
            {results.length > 0 && (
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    showFirstButton
                    showLastButton
                    sx={{ marginTop: 2, justifyContent: "center", display: 'flex' }}
                />
            )}
        </div>
    );
};

export default Search;
