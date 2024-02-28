const express = require("express")
const authRouter = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")


authRouter.post("/signup", async (req, res, next)=> {
    try {
       const user = await User.findOne({username: req.body.username})
        if (user){
            res.status(403)
            return next(new Error(`User ${req.body.username} is already taken`));
        }
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({user: savedUser.withoutPassword(), token});
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

authRouter.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            res.status(403)
            return next(new Error("Incorrect Gamer Tag!"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err){
                res.status(403)
                return next(err)
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Incorrect Gamer Tag or Password!"))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({user: user.withoutPassword(), token})
        })
        
    } catch (error) {
        res.status(500)
        return next(error)
    }
})



module.exports = authRouter