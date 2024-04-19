const express = require("express");
const router = express.Router()
const Stock = require('../models/stock.js');


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


  // router.get('/users', async (req, res) => {
  //   try {
  //     const users = await User.find({});
  //     if (!users.length) {
  //       return res.status(404).json({ message: 'No users found.' })
  //   }
  //   res.status(200).json(stocks);
  //   } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: `${err}` })
  //   }
  // });

  router.get('/home', async (req, res) => {
    res.json({ message: "Welcome to the Home page"})
  });
  
  
  // router.post('/add', async (req, res) => {
  //   try {
  //     const { itemName, productNumber, stockCount, expirationDate, brandName } = req.body;
  //     if (!itemName || !productNumber || !stockCount || !expirationDate || !brandName) {
  //       return res.status(400).json({ message: 'All fields are required.' });
  //     }
  //     const newStock = new Stock({
  //       itemName,
  //       productNumber,
  //           stockCount,
  //           expirationDate,
  //           brandName
  //         });
  //         await newStock.save();
  //       res.status(201).json(newStock);
  //     } catch (error) {
  //       console.error('Could not add new stock item:', error);
  //     }
  //   });
    

    router.get('/', (req, res) => {
        console.log("Something happened")
        res.send('Hello World!!!');
      });
      

      module.exports = router;