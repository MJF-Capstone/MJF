const express = require("express");
require('dotenv').config()
const cors = require("cors")
const { dbConnect } = require('./db.js')
const port = process.env.PORT || 8000;
const app = express();

const Message = require('./model/Messages.js')

const userAuth = require('./controllers/user-auth.js')
app.use(express.json())
app.use(cors())
app.use('/user-auth', userAuth)

app.listen(port, () => {
  dbConnect()
  console.log('listening on port: ' + port)
})