const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://NandiniNegi:nandini123@cluster0.tuvn301.mongodb.net/"
const client = new MongoClient(uri);
client.connect();

async function getData(){
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('Blackcoffer');
        const collection = database.collection('user');

        app.get('/', async (req, res) => {
            const data = await collection.find({}).toArray();
            res.json(data);
        });

    } catch (error) {
        console.error(err);
    }
}

app.listen(3000,()=>{
    console.log(`http://localhost:3000`)
    getData()
})