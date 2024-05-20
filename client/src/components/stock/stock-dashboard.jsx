import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../App.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Ticks } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


function StockDashboard() {
    const chartRef = useRef(null);
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentStock, setCurrentStock] = useState({
        itemName: '',
        productNumber: '',
        stockCount: '',
        expirationDate: '',
        brandName: '',
        imageUrl: ''
    });
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if(messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []); // Scroll to bottom whenever stocks change


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

    const handleEditClick = (stock) => {
        console.log("Editing stock:", stock._id)
        setCurrentStock(stock);
        setIsEditing(true);
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        const url = isEditing ?
            `http://localhost:8000/stock/update/${currentStock._id}` :
            'http://localhost:8000/stock/add';
        try {
            const response = await axios[isEditing ? 'put' : 'post'](url, currentStock);
            const updatedStocks = isEditing ? stocks.map(stock =>
                stock._id === currentStock._id ? { ...stock, ...response.data } :
                    stock) : [...stocks, response.data];
            setStocks(updatedStocks);
            handleClose();
        } catch (error) {
            console.error('Could not update/add stock', error);
            setError('Failed to update/add stock');
        }
    };

    const handleDelete = async () => {
        if (currentStock._id) {
            try {
                await axios.delete(`http://localhost:8000/stock/delete/${currentStock._id}`);
                const filteredStocks = stocks.filter(stock => stock._id !== currentStock._id);
                setStocks(filteredStocks);
                handleClose();
            } catch (error) {
                console.error('could not delete stock', error);
                setError('Failed to delete stock');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStock(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        setIsEditing(false);
        setIsAddingNew(false);
        setCurrentStock({
            itemName: '',
            productNumber: '',
            stockCount: '',
            expirationDate: '',
            brandName: '',
            imageUrl: ''
        });
    };

    const openAddNew = () => {
        setIsAddingNew(true);
        setIsEditing(false);
        setCurrentStock({
            itemName: '',
            productNumber: '',
            stockCount: '',
            expirationDate: '',
            brandName: '',
            imageUrl: ''
        });
    };

    const filteredStocks = stocks.filter(stock =>
        stock.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const criticalThreshold = 10;

    
    const chartData = {
        labels: stocks.map(stock => stock.itemName),
        datasets: [
            {
                label: 'Stock Levels',
                data: stocks.map(stock => stock.stockCount),
                fill: false,
            backgroundColor: stocks.map(stock => {
                // Check if the stock count is below the critical threshold
                if (stock.stockCount < criticalThreshold) {
                    // If below threshold, return red color
                    return 'rgb(205, 31, 31, 0.849)'; // Red color
                } else {
                    // If not, return default color
                    return 'rgb(255, 228, 196)'; // Default color
                }
                
            }),
            // borderColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(182, 68, 1)',
        },
    ],
};
    const chartOptions = {
        scales: {
            
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 20,
                    },
                },
            },

            x: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 20,
                    },
                },
            },
        },

    plugins: {
        legend: {
            labels: {
                // Configuring the legend label color and font size
                color: 'rgba(255, 255, 255, 0.7)', // White with opacity
                font: {
                    size: 20, // Font size
                },
            },
        },
    },
}

    return (
        <div className="homeBackgroundImage" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}>
            <div className="flex-container">
                <div className="nameNav">
                    <p1>Coffee</p1>
                    <p3>Keeper</p3>
                    {/* <h5 className="navBanner">.</h5> */}
                </div>
                <div className="nameNav2">
                    {/* <h1> */}
                        <a href='http://localhost:3000/userprofile' button type="button" className="homeButton">Home</a>
                        <button type="button" className="homeButton" onClick={openAddNew}>Add</button>
                </div>
                <div>
                        
                </div>
            </div>
            <div className="stockDashboardContainer">
            <input
                        type="text"
                        placeholder="Search for Items..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="searchField"
                    />
                {stocks.length > 0 ? (
                    <ul>
                        {filteredStocks.map(stock => (
                            <li key={stock._id} onClick={() => handleEditClick(stock)}>
                                <img src={stock.imageUrl} alt={stock.itemName} />
                                <h3>{stock.itemName}</h3>
                                <h3>Quantity: {stock.stockCount}</h3>
                            </li>
                        ))}
                         <div ref={messagesEndRef}></div>
                    </ul>
                ) : <p>{error || 'No stocks found.'}</p>}
                {(isEditing || isAddingNew) && (
                    <div className="modal-container" onClick={handleClose}>
                        <div className="editModal" onClick={e => e.stopPropagation()}>
                            <form onSubmit={e => e.preventDefault()}>
                                <label>Item Name:
                                    <input type="text" className="inputField" name="itemName" value={currentStock.itemName || ''} onChange={handleChange} required />
                                </label>
                                <label>Product Number:
                                    <input type="text" className="inputField" name="productNumber" value={currentStock.productNumber || ''} onChange={handleChange} />
                                </label>
                                <label>Stock Count:
                                    <input type="number" className="inputField" name="stockCount" value={currentStock.stockCount || ''} onChange={handleChange} required />
                                </label>
                                <label>Expiration Date:
                                    <input type="date" className="inputField" name="expirationDate" value={currentStock.expirationDate || ''} onChange={handleChange} />
                                </label>
                                <label>Brand Name:
                                    <input type="text" className="inputField" name="brandName" value={currentStock.brandName || ''} onChange={handleChange} required />
                                </label>
                                <label>Image:
                                    <input type="text" className="inputField" name="imageUrl" value={currentStock.imageUrl || ''} onChange={handleChange} required />
                                </label>
                                <button className="registrationButton3" onClick={handleSave}>Save</button>
                                <button className="registrationButton3" onClick={handleClose}>Cancel</button>
                                {isEditing && (
                                    <div className="deleteModal">
                                        <p>Are you sure you want to delete this item?</p>
                                        <button className="registrationButton3" onClick={handleDelete}>Yes</button>
                                        <button className="registrationButton3" onClick={handleClose}>No</button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
             <div>
                 <h2></h2>
                 <Bar ref={chartRef} data={chartData} options={chartOptions} />
            </div>
         </div>
        </div>
    );
}

export default StockDashboard;
