const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


var db;
var dbURL = "mongodb://localhost:27017/";

MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, dbClient) => {
    if (err) throw err
    db = dbClient.db('details')
    console.log("connected to db")
})

//list
router.get("/users", (req, res) => {
    db.collection('users').find({}).toArray((err, usersList) => {
        if (err) throw err
        res.send(usersList)
    })
})

//creating users
router.post("/users/create", (req, res) => {
    db.collection('users').insertOne(
        { name: req.body.name, age: req.body.age, city: req.body.city }, (err, result) => {
            if (err) throw err
            console.log("user created")
        })
})

//updating users
router.put("/users/update", (req, res) => {
    db.collection('users').updateOne({ _id: ObjectId(req.body._id) }, { $set: { name: req.body.name, age: req.body.age, city: req.body.city } }, (err, result) => {
        if (err) throw err
        console.log('user updated')
    })
})

//deleting users
router.delete("/users/delete", (req, res) => {
    db.collection('users').deleteOne({ _id: ObjectId(req.body._id) }, (err, result) => {
        if (err) throw err
        console.log("user deleted")
    })
})


app.use("/api", router)

app.listen(3002, () => console.log('server is running'))