const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const authRoute = require('./routes/authRoute');
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected!"))
.catch((e) => console.log("Database not connected", e))

const app = express()
const port = 8000

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

//app.use('/', require('./routes/authRoute'))
app.use('/', authRoute)

app.listen(port, () => { console.log(`Server is running on port ${port}`) })