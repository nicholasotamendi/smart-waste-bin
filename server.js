require('dotenv').config()
const path = require('path')
const http = require('http')
const express = require('express')
const socket = require('socket.io')
const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

server = http.createServer(app)
const io = socket(server, {cors: {origin: '*'}})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection to Databse Successful"))

app.use(cors())
app.use(express.json())
app.use("/", require('./routes/bin')(io))
app.use("/users", require('./routes/users'))

if(process.env.NODE_ENV == "production"){
    // Set static folder
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port: `, PORT))