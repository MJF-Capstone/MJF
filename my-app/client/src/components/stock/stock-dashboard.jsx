import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

function StockDashboard() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [currentStock, setCurrentStock] = useState({
        itemName: '',
        productNumber: '',
        stockCount: '',
        expirationDate: '',
        brandName: ''
    });

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
        const response = await axios[isEditing ? 'put' : 'post'](url,
currentStock);
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
            await
axios.delete(`http://localhost:8000/stock/delete/${currentStock._id}`);
            const filteredStocks = stocks.filter(stock => stock._id
!== currentStock._id);
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
        brandName: ''
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
        brandName: ''
    });
};

return (
    <div className="homeBackgroundImage" style={{
        backgroundImage:
"url('https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
              }}>
        <div className="Name">
        {/* <header className="App-header"> */}
          <p1>Coffee </p1>
          <p3>Keeper</p3>
        {/* <div className="stockDashboardContainer"> */}
            {/* <div className="backgroundImage1" style={{ */}
        {/* backgroundImage:
"url('https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8')"
*/}
      {/* }}> */}
        <h1>Inventory</h1>
        <button type="button" className="addButton"
onClick={openAddNew}>Add New Item</button>
        {/* <div className="stockImages"> */}
        {stocks.length > 0 ? (
            <ul>
                {stocks.map(stock => (
                    <li key={stock._id} onClick={() => handleEditClick(stock)}>
                         {/* <div className="stock-item"> */}
                         {/* <img src={stock.imageUrl}
alt={stock.itemName} style={{ width: '100px', height: '100px' }} />
*/}
                         {/* </div> */}
                         <img src={stock.imageUrl}></img>
                          <h3>{stock.itemName}</h3>
                            <p>Quantity: {stock.stockCount}</p>
                        {/* {stock.itemName} - Quantity:
{stock.stockCount}<br/> */}
                    </li>
                ))}
            </ul>
        ) : <p>{error || 'No stocks found.'}</p>}
        {(isEditing || isAddingNew) && (
            <div className="modal-container" onClick={handleClose}>
                <div className="editModal" onClick={e => e.stopPropagation()}>
                    <form onSubmit={e => e.preventDefault()}>
                        <label>Item Name:
                            <input type="text" input
className="inputField" name="itemName" value={currentStock.itemName ||
''} onChange={handleChange} required />
                        </label>
                        <label>Product Number:
                            <input type="text" input
className="inputField" name="productNumber"
value={currentStock.productNumber || ''} onChange={handleChange} />
                        </label>
                        <label>Stock Count:
                            <input type="number" input
className="inputField" name="stockCount"
value={currentStock.stockCount || ''} onChange={handleChange} required
/>
                        </label>
                        <label>Expiration Date:
                            <input type="date" input
className="inputField" name="expirationDate"
value={currentStock.expirationDate || ''} onChange={handleChange} />
                        </label>
                        <label>Brand Name:
                            <input type="text" input
className="inputField"name="brandName" value={currentStock.brandName
|| ''} onChange={handleChange} required />
                        </label>
                        <button className="editbutton"
onClick={handleSave}>Save</button>
                        <button className="editbutton"
onClick={handleClose}>Cancel</button>
                            {isEditing && (
                                <div className="deleteModal">
                                    <p>Are you sure you want to delete
this item?</p>
                                    <button className="editbutton"
onClick={handleDelete}>Yes</button>
                                    <button className="editbutton"
onClick={handleClose}>No</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
            </div>
            </div>
            // </div>
        // </div>
    );
}

export default StockDashboard;

