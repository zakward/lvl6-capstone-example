const express = require('express')
const goalRouter = express.Router()
const Goal = require('../models/goal')

goalRouter.post('/', async (req, res, next) => {
    try {
        req.body.user = req.auth._id
        const newGoal = new Goal(req.body)
        const savedGoal = await newGoal.save()
        return res.status(201).send(savedGoal)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

goalRouter.get('/', async(req, res, next) => {
    try {
        const allGoals = await Goal.find()
        return res.status(200).send(allGoals)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

goalRouter.get("/usersGoals", async(req, res, next) => {
    try {
        const userGoals = await Goal.find({user: req.auth._id})
        return res.status(200).send(userGoals)


    } catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = goalRouter
