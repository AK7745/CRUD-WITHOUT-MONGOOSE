const { json } = require('body-parser')
const { connectToDb, getDb } = require('./db')
const express = require('express')
const { ObjectID } = require('bson')

//intilize app and middleware
app = express()
app.use(express.json())

// DB connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => console.log("the app is listening now"))
    }
    db = getDb()
})


//Routes
app.get('/books', (req, res) => {
    books = []
    db.collection('books').find()
        .sort({ author: 1 })
        .forEach(book => { books.push(book) })
        .then(() => { res.status(200).json(books) })
        .catch(() => {
            res.status(500).json({ error: "could not connect to server" })
        })
})
//cR(one)ud
app.get('/books/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {

        db.collection('books')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((doc) => res.status(200).json(doc))
            .catch((err) => res.status(500).json({ error: "could not find the server" }))



    } else {
        res.status(500).json({ error: "invalid ID" })
    }

})
//Crud
app.post('/books',(req,res)=>{
    const book=req.body
    db.collection('books').insertOne(book)
      .then(result=>{res.status(201).json(result)})
      .catch((err)=>res.status(500).json({error:"Posting failed"}))
})

//cruD
app.delete('/books/:id',(req,res)=>{
    if (ObjectID.isValid(req.params.id)) {

        db.collection('books')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((doc) => res.status(200).json(doc))
            .catch((err) => res.status(500).json({ error: "could not delete the file" }))



    } else {
        res.status(500).json({ error: "invalid ID" })
    }

})

app.patch('/books/:id', (req, res) => {
    const updates=req.body
    if (ObjectID.isValid(req.params.id)) {
        db.collection('books')
            .updateOne({ _id: ObjectID(req.params.id) },{$set:updates})
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(500).json({ error: "could not Update" }))



    } else {
        res.status(500).json({ error: "invalid ID" })
    }

})

