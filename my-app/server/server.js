const express = require("express");
require('dotenv').config()
const cors = require("cors")
const { dbConnect } = require('./db.js')
const port = process.env.PORT || 8000;
const app = express();
const router = require('express').Router()
const Stock = require('./models/stock.js');


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log("Something happened")
  res.send('Hello World!!!');
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

app.use('/stock', router);
app.use((req, res, next) => {
  res.header("Content-Type",'application/json');
  next();
});

router.post('/add', async (req, res) => {
  try {
      const { itemName, productNumber, stockCount, expirationDate, brandName } = req.body;
      if (!itemName || !productNumber || !stockCount || !expirationDate || !brandName) {
          return res.status(400).json({ message: 'All fields are required.' });
      }
      const newStock = new Stock({
          itemName,
          productNumber,
          stockCount,
          expirationDate,
          brandName
      });
      await newStock.save();
      res.status(201).json(newStock);
  } catch (error) {
      console.error('Could not add new stock item:', error);
    }
});

app.listen(port, async () => {
  await dbConnect()
  console.log('Server listening on port: ' + port)
})

 