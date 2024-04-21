import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

function StockDashboard() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentStock, setCurrentStock] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        setCurrentStock(stock);
        setIsEditing(true);
    };

    const handleSave = () => {
        axios.post(`http://localhost:8000/stock/update/${currentStock._id}`, currentStock)
            .then(response => {
                setIsEditing(false);
                setShowDeleteConfirm(false);
            }).catch(error => {
                console.error('Could not updated stock', error);
                setError('fafiled to update stock');
    });
};

    const handleClose = () => {
        setIsEditing(false);
        setShowDeleteConfirm(false);
    };

    const handleDeleteClick = (stock) => {
        setCurrentStock(stock);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/stock/delete${currentStock._id}`);
            setStocks(stocks.filter(stock => stock._id !== currentStock._id));
            setShowDeleteConfirm(false);
            setIsEditing(false);
        } catch (error) {
            console.error('could not delete stock', error);
            setError('failed to delete stock');
        }
    };

    return (
        <div className="stockDashboardContainer">
            <h1>Inventory</h1>
            {stocks.length > 0 ? (
                <ul>
                    {stocks.map(stock => (
                        <li key={stock._id}>
                            {stock.itemName} - Quantity: {stock.stockCount}<br/>
                            <button className="editbutton" onClick={() => handleEditClick(stock)}>Edit</button>
                            {/* <button className="editbutton" onClick={() => handleDeleteClick(stock)}>Delete</button> */}
                        </li>
                    ))}
                </ul>
            ) : <p>{error || 'No stocks found.'}</p>}
            {isEditing && currentStock && (
                <>
                    <div className="modal-container" onClick={handleClose}></div>
                    <div className="editModal">
                        <br/>
                        {currentStock.itemName}
                        <form>
                        <br/>
                            <label>
                                Item Name:
                                <input type="text" value={currentStock.itemName} onChange={(e) => setCurrentStock({...currentStock, itemName: e.target.value})} />
                             </label><br/><br/>
                             <label>
                                Quantity:
                                <input type="number" value={currentStock.stockCount} onChange={(e) => setCurrentStock({...currentStock, stockCount: e.target.value})} />
                              </label>
                              <button className="editbutton" type="button" onClick={handleSave}>Save</button>
                              <button className="editbutton" type="button" onClick={handleClose}>Cancel</button>
                              <div className="deleteModal">
                                <p>Delete this item?</p>
                                <button className="editbutton" type="button" onClick={confirmDelete}>Yes</button>
                                <button className="editbutton" type="button" onClick={() => setShowDeleteConfirm(false)}>No</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
          
        </div>
    );
}

export default StockDashboard;
