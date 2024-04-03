const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const path = require('path')
const {expressjwt} = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'client', 'dist')))

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

connectToDb()

app.use('/api/main/',expressjwt({secret: process.env.SECRET, algorithms: ["HS256"]}) )
app.use('/api/main/goal', require('./routes/goalRouter'))
app.use('/api/auth', require('./routes/authRouter'))

app.use((err, req, res, next) => {
    console.log(err)

    return res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))