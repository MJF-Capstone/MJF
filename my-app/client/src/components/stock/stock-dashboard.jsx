import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

function StockDashboard() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/stock/stockdashboard')
            .then(response => {
                setStocks(response.data);
            })
            .catch(error => {
                console.error('Error fetching stocks:', error);
                setError('Failed to fetch stocks.');
            });
    }, []);

    return (
        <div className="stockDashboardContainer">
            <h1>Inventory</h1>
            {stocks.length > 0 ? (
                <ul>
                    {stocks.map(stock => (
                        <li key={stock._id}>
                            {stock.itemName} - Quantity: {stock.stockCount}
                        </li>
                    ))}
                </ul>
            ) : <p>{error || 'No stocks found.'}</p>}
        </div>
    );
}

export default StockDashboard;
