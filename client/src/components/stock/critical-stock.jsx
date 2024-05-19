import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import '../../App.css';

function CriticalStock() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/stock/criticalstock')
            .then(response => {
                setStocks(response.data);
            })
            .catch(error => {
                console.error('Error fetching stocks:', error);
                setError('Failed to fetch stocks.');
            });
    }, []);

    const chartData = {
        labels: stocks.map(stock => stock.itemName),
        datasets: [
            {
                label: 'Stock Levels',
                data: stocks.map(stock => stock.stockCount),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="homeBackgroundImage" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}>
            <div className="flex-container">
                {/* Your navigation and other components */}
            </div>
            <div className="stockDashboardContainer">
                {stocks.length > 0 ? (
                    <div>
                        <h2>Stock Levels</h2>
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <p>{error || 'No stocks found.'}</p>
                )}
            </div>
        </div>
    );
}

export default CriticalStock;
