const express = require('express')
const { Socket } = require('socket.io')
const router = express.Router()
const Bin = require('../models/bin')
let gSocket;

// PARENT ROUTE PATH: [localhost]/[sub]

module.exports = function(io){
    io.on("connection", (socket) => {
        gSocket = socket
        console.log("User has connected")
        socket.on("message", payload => {
            console.log("Client said: ", payload)
        })
        socket.on("disconnect", () => {
            gSocket = null
            console.log("User has disconnected")
        })
    })

    // ***********CONNECTION TO HARDWARE***************
    router.get("/api", (req, res) => {
        const level = req.query.level
        const smell = req.query.smell
        if(!gSocket){}else{
            gSocket.emit("readings", {level, smell}, () => {
                console.log("Message successfully received")
            })
        }
        res.status(200).json({level, smell})
        // Connect to database and save last reading
        const newBinData = new Bin({level, smell})
        newBinData.save().then(() => {
            console.log("Bin data saved successfully")
        }).catch(e => res.json({msg: "Unable to save new sensor readings"}))
    })
    // ***********CONNECTION TO USER INTERFACE************
    router.get("/ui", (req, res) => {
        // Connect to database and get last readings
        Bin.find({}).sort({created: 1}).then((resp) => {
            res.json({bin: resp, msg: "Success Getting Bin"})
        }).catch(e => {
            console.log(e)
            res.json({bin: null, msg: "Error While trying to get bin"})
        })
    })

    return router
}