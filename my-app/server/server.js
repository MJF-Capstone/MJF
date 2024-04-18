const express = require("express");
require('dotenv').config()
const cors = require("cors")
const { dbConnect } = require('./db.js')
const port = process.env.PORT || 8000;
const app = express();

// const Message = require('./models/Messages.js')

const userAuth = require('./controllers/user-auth.js')
app.use(express.json())
app.use(cors())
app.use('/user-auth', userAuth)

app.listen(port, () => {
  dbConnect()
  console.log('listening on port: ' + port)
})


// require('dotenv').config();
// const express = require("express");
// const { dbConnect } = require('./db.js');
// const router = require('express').Router()
// const DB_URL = process.env.DB_URL
// const port = process.env.PORT || 8000;
// const path = require('path')
// const app = express();
// const Room = require('./models/Room.js')
// const cors = require('cors')

// const { MongoClient, ObjectId } = require('mongodb')
// //creates new MongoClient instance and connects to MongoDB database
// const client = new MongoClient(DB_URL)

// const user = require('./controllers/user')

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cors())
// app.use(router);
// app.use('/auth', user)



// //root "directory" or our homepage
// app.get('/', (req, res) => {
//   res.send('Hello World!!!');
// });

// //function for creating a new chatroom
// router.post('/room', async (req, res) => {
//   try {
//     //information that will be collected and posted to the mongoose server
//     const { roomNumber, roomName, roomDescription, addedUsers } = req.body
//     const newRoom = new Room({
//       roomNumber,
//       roomName,
//       roomDescription,
//       addedUsers
//     });

//     //verification notification when new room is created, or an error is returned when something goes wrong
//     await newRoom.save()
//     res.status(201).json({ message: 'new Room created', newRoom })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: `${err}` })
//   }
// });

// //displays all rooms that have been created in a session
// router.get('/room/all', async (req, res) => {
//   try {
//     const rooms = await Room.find({});

//     if (!rooms) {
//     return res.status(404).json({ message: 'No rooms have been created, or found.' })
//   }
//   res.status(200).json(rooms);
//   } catch (err) {
//   console.log(err);
//   res.status(500).json({ message: `${err}` })
//   }
// });
 
// router.get('/messages/:roomId', async (req, res) => {
//   const { roomId } = req.params;
// });

// router.post('/send/:roomId', async (req, res) => {
//   const { roomId } = req.params;
//   const { body } = req.body;
// });

// app.listen(port, () => {
//   dbConnect ();
//   console.log('listening on port: ' + port) 
// })
