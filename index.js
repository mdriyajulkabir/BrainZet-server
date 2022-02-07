const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId
// const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://brainZet:brainZet@cluster0.iyyd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run (){
    try {
        await client.connect();
        const database = client.db('BrainZet');
        const blogCollection = database.collection('allDestination')
       

        // GET API
        app.get('/destination', async(req, res)=>{
            const cursor = blogCollection.find({})
            const services = await cursor.toArray();
            res.send(services)
        })
        // GET SINGLE API
        app.get('/destination/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await blogCollection.findOne(query);
            res.json(service)

        }) 
        
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('  server is running');
})

app.listen(port, () => {
    console.log("server is running", port);
})