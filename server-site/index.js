const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qshy1cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        const userCollection = client.db('EasyPayDB').collection('User');



        app.post('/signup', async (req, res) => {
            const { name, email, password } = req.body;

            // Check if the user already exists
            const userExists = await userCollection.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create the new user
            const newUser = {
                name,
                email,
                password: hashedPassword
            };

            await userCollection.insertOne(newUser);

            res.status(201).json({ status: 200, message: 'User created successfully', data: newUser });
        });

        app.post('/login', async (req, res) => {
            const { email, password } = req.body;

            // Check if the user exists
            const user = await userCollection.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            // Compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            res.status(200).json({ statu: 200, message: 'Login successful', data: email });
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('MFS Services server is running')
});

app.listen(port, () => {
    console.log(`MFS Services is running port on ${port}`)
})