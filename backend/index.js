const connectToMongo = require('./db');  //imports from db.js
const express = require('express')
connectToMongo();  //you need to install nodemon to connect to database

//index.js is actually an express server hence we need to copy the boilerplate code for the same

const app = express()
const port = 5000 //because react app will run on port 3000
var cors = require('cors')
app.use(cors())

app.use(express.json) //you need to use this middleware in order to use request.body 

// app.get('/', (req, res) => {
//   res.send('Hello Ajinkya!')
// })

// app.get('/api/v1/login', (req, res) => { //you can see Hello Login written on localhost:3000/api/v1/login
//   res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello signup!')
// })

//Available Routes:
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})