const express = require("express");
const router = express.Router()
const Stock = require('../models/stock.js');


router.get('/', (req, res) => {
    console.log("Something happened")
    res.send('Hello World!!!');
  });
  
router.get('/home', async (req, res) => {
  res.json({ message: "Welcome to the Home page"})
});

router.get('/stockdashboard', async (req, res) => {
    try {
      const stocks = await Stock.find({});
      if (!stocks.length) {
        return res.status(404).json({ message: 'No stock found.' })
    }
    res.status(200).json(stocks);
    } catch (err) {
    console.log(err);
    res.status(500).json({ message: `${err}` })
    }
  });

router.put('/update/:id', async (req, res) => {
  console.log('You hit the UPDATE endpoint')
  const { id } = req.params;
  console.log("Received ID for update:", id);
  const { itemName, stockCount } = req.body;
  try {
    const updatedStock = await Stock.findByIdAndUpdate(id, { itemName, stockCount }, { new: true });
  if (!updatedStock) {
    return res.status(404).send('stock not found');
  }
    res.json(updatedStock);
  } catch (error) {
      console.log('error updating stock:', error);
    res.status(500).send('error updating stock');
}
});




router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Stock.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send('stock was not found');
  } 
  res.status(204).send();
} catch (error) {
  console.log('error deleting stock:', error);
  res.status(500).send('problem deleting stock');
}
});

router.post('/add', async (req, res) => {
  console.log('You hit the ADD endpoint');
  const { itemName, stockCount, productNumber, expirationDate, brandName } = req.body;
  try {
    const newStock = new Stock({
      itemName,
      productNumber,
      stockCount,
      expirationDate,
      brandName
    });

    const savedStock = await newStock.save();
    res.status(201).json(savedStock); 
  } catch (error) {
    console.error('Error adding new stock:', error);
    res.status(500).send('Error adding new stock');
  }
});

    module.exports = router;