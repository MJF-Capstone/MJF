const express = require("express");
require('dotenv').config()
const cors = require("cors")
const { dbConnect } = require('./db.js')
const port = process.env.PORT || 8000;
const app = express();
const Stock = require('./controllers/Stock')

app.use(cors())
app.use(express.json())

  app.use('/stock', Stock);
  
  app.use((req, res, next) => {
    res.header("Content-Type",'application/json');
    next();
  });


  app.listen(port, async () => {
    await dbConnect()
    console.log('Server listening on port: ' + port)
  })

 