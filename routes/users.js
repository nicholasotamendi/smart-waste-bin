const express = require('express')
const router = express.Router()
const User = require('../models/users')

// PARENT ROUTE PATH: [localhost]/users/[sub]

router.post("/signup", (req, res) => {
    // console.log("SIGN UP: ", req.body)
    User.find({email: req.body.email}).then(resp => {
        if(resp.length > 0){
            return res.json({user: null, msg: "Error! - This user Already exists"})
        }
    }).catch(e => {
        res.json({user: null, msg: "Unable to verify user data"})
        return;
    })
    const newUser = new User(req.body)
    newUser.save().then(resp => {
        // console.log("User successfully saved")
        res.json({user: resp, msg: "User Create Successful"})
    }).catch(e => {
        res.json({user: null, msg: "Error: in User Create"})
        return;
    })
})

router.post("/signin", (req, res) => {
    User.findOne({email: req.body.email}).then(resp => {
        if(!resp){
            return res.json({user: null, msg: "Error! - This user does not exist"})
        }else if(resp.password !== req.body.password){
            return res.json({user: null, msg: "Error! - Invalid Credential"})
        }
        res.json({user: resp, msg: "Sign In Success"})
    }).catch(e => {
        res.json({user: null, msg: "Unable to retrieve user data from Database"})
    })
})



router.post("/update", (req, res) => {
    // console.log("UPDATE REQ: ", req.body)
    User.findByIdAndUpdate(req.body.id,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        },
        {
            new: true
        }
        ).then((resp) => {
            // console.log("UPDATE: ", resp)
            res.json({user: resp, msg: "Update Successful"})
    }).catch(e => {
        res.json({user: null, msg: "Error! - Unable to update user data"})
    })
})

router.get("/load/:id", (req, res) => {
    User.findById(req.params.id).then(resp => {
        // console.log(resp)
        res.json({user: resp, msg: "User Found"})
    }).catch(e => res.json({user: null, msg: "Unable to retrieve user from database"}))
})

module.exports = router