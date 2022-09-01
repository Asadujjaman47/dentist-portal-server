const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()

// middleware
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("hellloooooooooooooooooo");
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.umejdfy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const appointmentCollection = client.db("doctorsPortal").collection("appointments");
    // perform actions on the collection object


    app.post('/addAppointment', (req, res) => {
        const appointment = req.body;
        // console.log(appointment); 
        appointmentCollection.insertOne(appointment)
            .then(result => {
                res.send(result.acknowledged);
            })
    })

    app.get('/appointments', (req, res) => {
        appointmentCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.post('/appointmentByDate', (req, res) => {
        const date = req.body;
        // console.log(date.date);
        appointmentCollection.find({ date: date.date })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })









    // client.close();
});







app.listen(process.env.POST || port)