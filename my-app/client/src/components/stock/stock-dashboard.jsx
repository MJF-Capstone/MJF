import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

function StockDashboard() {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);    
    const [currentStock, setCurrentStock] = useState({
    // const [formData, setFormData] = useState({

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
        // setFormData(stock);
        setCurrentStock(stock);
        setIsEditing(true);
        setIsAddingNew(false);
    };

    // const handleSave = () => {
    //     if (currentStock?._id) {
    //     const url = `http://localhost:8000/stock/update/${currentStock._id}`;
    //     axios.put(url, currentStock)
    //         .then(response => {
    //             const updatedStock = stocks.map(stock => {
    //                 if (stock._id === currentStock._id) {
    //                     return {...stock, ...response.data};
    //                 }
    //                 return stock;
    //     })
    //     setStocks(updatedStock)
    //     setIsEditing(false);
    //     setIsAddingNew(false);
    // })
   
    // const handleSave = async () => {
    //     const url = isEditing ? `http://localhost:8000/stock/update/${currentStock._id}` : 'http://localhost:8000/stock/add';
    //     try {
    //         const response = isEditing 
            //   ? await axios.put(`http://localhost:8000/stock/update/${formData._id}`, formData)
    //             : await axios.post('http://localhost:8000/stock/add', formData);

    //         const updatedStocks = isEditing 
                // ? stocks.map(stock => stock._id === formData._id ? { ...stock, ...response.data } : stock)
    //             : [...stocks, response.data];
            
    //         setStocks(updatedStocks);
    //         handleClose();
    //     } catch (error) {
    //         console.error('Could not update/add stock', error);
    //         setError('Failed to update/add stock');
    //     }
    // };
    // {
    //     "itemName": "12oz Paper Cups",
    //     "productNumber": "PC004",
    //     "stockCount": "1000",
    //     "expirationDate": "N/A",
    //     "brandName": "Eco Cups"
    //   }




    // const handleAddNewStock = async () => {
    //     axios.post('http://localhost:8000/stock/add', formData)
    //         .then(response => {
    //             setStocks([...stocks, response.data]);
    //             setFormData({
    //                 itemName: '',
    //                 productNumber: '',
    //                 stockCount: '',
    //                 expirationDate: '',
    //                 brandName: ''
    //             });
    //             setIsAddingNew(false);
    //         })
    //         .catch(error => {
    //             console.error('Failed to add item:', error);
    //             setError('Failed to add item');
    //         });
    // };
    // const handleClose = () => {
    //     setIsEditing(false);
    // };






    // const handleDelete = async () => {
    //     if (formData._id) {
    //         const url = `http://localhost:8000/stock/delete/${formData._id}`;
    //         try {
    //             await axios.delete(url);
    //             setStocks(stocks.filter(stock => stock._id !== formData._id));
    //             handleClose();
    //         } catch (error) {
    //             console.error('Could not delete stock', error);
    //             setError('Failed to delete stock');
    //         }
    //     }
    // };
    // const handleClose = () => {
    //     setIsEditing(false);
    //     setAddingNew(false);
    // };

    // const handleAddNewStock = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8000/stock/add', formData);
    //         setStocks([...stocks, response.data]);
    //         setFormData({
    //             itemName: '',
    //             productNumber: '',
    //             stockCount: '',
    //             expirationDate: '',
    //             brandName: ''
    //         });
    //         } catch (error) {
    //             console.error('Failed to add item:', error.response.data);
    //             setError('Failed to add item');
    //         }
    //         setAddingNew(true);
    //         setIsEditing(false);  
    //     };

    //         const handleChange = (e) => {
    //             const { name, value } = e.target;
    //             if (isEditing) {
    //                 setCurrentStock(prevState => ({
    //                 ...prevState,
    //                 [name]: value
    //             }));
    //         } else {
    //             setFormData(prevState => ({
    //                 ...prevState,
    //                 [name]: value
    //             }));
    //         }
    //     };
     
        //     console.log('Item added successfully:', response.data);
        //     console.log("Editing stock:", stock._id)
        //     setCurrentStock(stock);
        //     setFormData(true);
        // };
         
        // const handleChange = (e) => {
        //     const { name, value } = e.target;
        //     if (isEditing || isAddingNew) {
        //         setCurrentStock(prevState => ({
        //             ...prevState,
        //             [name]: value
        //         }));
        //     } 
        // };
        
//         const handleClose = () => {
//             setIsEditing(false);
//             setIsAddingNew(false);
//             setFormData({
//                 itemName: '',
//                 productNumber: '',
//                 stockCount: '',
//                 expirationDate: '',
//                 brandName: ''
//             });
//         };
        
//         const openAddNew = () => {
//             setIsAddingNew(true);
//             setIsEditing(false);
//             setFormData({
//                 itemName: '',
//                 productNumber: '',
//                 stockCount: '',
//                 expirationDate: '',
//                 brandName: ''
//             });
//         };
//         const handleChange = (e) => {
//             const { name, value } = e.target;
//             if (isEditing || isAddingNew) {
//                 setCurrentStock(prevState => ({
        
//                 ...prevState,
//                 [name]: value
//             }));
//         };
//     };

//     return (
//         <div className="stockDashboardContainer">
//             <h1>Inventory</h1>
//             <button type="button" className="addButton" onClick={openAddNew}>Add New Item</button>
//             {stocks.length > 0 ? (
//                 <ul>
//                     {stocks.map(stock => (
//                         <li key={stock._id} onClick={() => handleEditClick(stock)}>
//                             {/* <span onClick={() => handleEditClick(stock)}> */}
//                                 {stock.itemName} - Quantity: {stock.stockCount}<br/>
//                             {/* </span> */}
//                         </li>
//                     ))}
//                 </ul>
//             ) : <p>{error || 'No stocks found.'}</p>}
//             {(isEditing || isAddingNew) && (
//                    <div className="modal-container" onClick={handleClose}>
//                     <div className="editModal" onClick={e => e.stopPropagation()}>
//                         <form onSubmit={(e) => e.preventDefault()}>
//                         <label>Item Name:
//                                 <input type="text" name="itemName" value={currentStock.itemName || ''} onChange={handleChange} required />
//                             </label>
//                             <label>Product Number:
//                                 <input type="text" name="productNumber" value={currentStock.productNumber || ''} onChange={handleChange} />
//                             </label>
//                             <label>Stock Count:
//                                 <input type="number" name="stockCount" value={currentStock.stockCount || ''} onChange={handleChange} required />
//                             </label>
//                             <label>Expiration Date:
//                                 <input type="date" name="expirationDate" value={currentStock.expirationDate || ''} onChange={handleChange} />
//                             </label>
//                             <label>Brand Name:
//                                 <input type="text" name="brandName" value={currentStock.brandName || ''} onChange={handleChange} required />
//                             </label>
//                             <br/>
//                             <button className="editbutton" onClick={handleSave}>Save</button>
//                             <button className="editbutton" onClick={handleClose}>Cancel</button>
//                             {isEditing && (
//                                 <div className="deleteModal">
//                                     <p>Are you sure you want to delete this item?</p>
//                                     <button className="editbutton" onClick={handleDelete}>Yes</button>
//                                     <button className="editbutton" onClick={handleClose}>No</button>
//                                 </div>
//                             )}
//                         </form>
//                             </div>
//                             </div>
//                             )}
//                             </div>
//     );
// }
//                         <br/>
//                 {currentStock.itemName}
//                             <label>
//                                 Item Name:
//                                 <input className="inputField" type="text" value={(currentStock.itemName || '')} onChange={(e) => handleChange(e, 'itemName')} />
//                              </label><br/><br/>
//                              <label>
//                                 Quantity:
//                                 <input className="inputField" type="number" value={currentStock.stockCount || ''} onChange={(e) => handleChange(e, 'stockCount')} />
//                               </label>
//                               <br/>
//                               <button className="editbutton" type="button" onClick={handleSave}>Save</button>
//                               <button className="editbutton" type="button" onClick={handleClose}>Cancel</button>
//                               <div className="deleteModal">
//                                 <p>Delete this item?</p>
//                                 <button className="editbutton" type="button" onClick={handleDelete}>Yes</button>
//                                 <button className="editbutton" type="button" onClick= {handleClose}>No</button>
//                             </div>
//                         </form>
//                     </div>
            
//                     </>
//             }
//             )
            
//             }
//         </div>

//         )
        







const handleSave = async () => {
    const url = isEditing ? `http://localhost:8000/stock/update/${currentStock._id}` : 'http://localhost:8000/stock/add';
    try {
        const response = await axios[isEditing ? 'put' : 'post'](url, currentStock);
        const updatedStocks = isEditing ? stocks.map(stock => stock._id === currentStock._id ? { ...stock, ...response.data } : stock) : [...stocks, response.data];
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
    <div className="stockDashboardContainer">
        <h1>Inventory</h1>
        <button type="button" className="addButton" onClick={openAddNew}>Add New Item</button>
        {stocks.length > 0 ? (
            <ul>
                {stocks.map(stock => (
                    <li key={stock._id} onClick={() => handleEditClick(stock)}>
                        {stock.itemName} - Quantity: {stock.stockCount}<br/>
                    </li>
                ))}
            </ul>
        ) : <p>{error || 'No stocks found.'}</p>}
        {(isEditing || isAddingNew) && (
            <div className="modal-container" onClick={handleClose}>
                <div className="editModal" onClick={e => e.stopPropagation()}>
                    <form onSubmit={e => e.preventDefault()}>
                        <label>Item Name:
                            <input type="text" input className="inputField" name="itemName" value={currentStock.itemName || ''} onChange={handleChange} required />
                        </label>
                        <label>Product Number:
                            <input type="text" input className="inputField" name="productNumber" value={currentStock.productNumber || ''} onChange={handleChange} />
                        </label>
                        <label>Stock Count:
                            <input type="number" input className="inputField" name="stockCount" value={currentStock.stockCount || ''} onChange={handleChange} required />
                        </label>
                        <label>Expiration Date:
                            <input type="date" input className="inputField" name="expirationDate" value={currentStock.expirationDate || ''} onChange={handleChange} />
                        </label>
                        <label>Brand Name:
                            <input type="text" input className="inputField"name="brandName" value={currentStock.brandName || ''} onChange={handleChange} required />
                        </label>
                        <button className="editbutton" onClick={handleSave}>Save</button>
                        <button className="editbutton" onClick={handleClose}>Cancel</button>
                            {isEditing && (
                                <div className="deleteModal">
                                    <p>Are you sure you want to delete this item?</p>
                                    <button className="editbutton" onClick={handleDelete}>Yes</button>
                                    <button className="editbutton" onClick={handleClose}>No</button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StockDashboard;
















    // const handleSave = () => {
    //     if (currentStock?._id) {
    //     const url = `http://localhost:8000/stock/update/${currentStock._id}`;
    //     axios.put(url, currentStock)
    //         .then(response => {
    //             const updatedStock = stocks.map(stock => {
    //                 if (stock._id === currentStock._id) {
    //                     return {...stock, ...response.data};
    //                 }
    //                 return stock;
    //     })
    //     setStocks(updatedStock)
    //     setIsEditing(false);
    //     setIsAddingNew(false);
    // })
       // .catch(error => {
    //             console.error('Could not updated stock', error);
    //             setError('fafiled to update stock');
    //         });
    //     }
    // };



    // const handleDelete = async () => {
    //     if (currentStock?._id) {
    //     const url = `http://localhost:8000/stock/delete/${currentStock._id}`;
    //     try {
    //         await axios.delete(url);
    //         const filteredStocks = stocks.filter(stock => stock._id !== currentStock._id);
    //         setStocks(filteredStocks)
    //         setIsEditing(false);
    //     } catch (error) {
    //         console.error('could not delete stock', error);
    //         setError('failed to delete stock');
    //     }
    // };
    // }
    