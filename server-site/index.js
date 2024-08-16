const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        await client.connect();

        const productCollection = client.db('phCommerceDB').collection('products');


        app.get('/products', async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 0;
                const size = parseInt(req.query.size) || 10;
                const search = req.query.search || '';
                const sortOption = req.query.sort || '';
                const brandname = req.query.brandname || '';
                const category = req.query.category || ''; // Get category from query params

                console.log(req.query);

                // Create a query object with $or to search by productname and category, and filter by brandname and category
                let query = {};

                if (search) {
                    query.$or = [
                        { productname: { $regex: search, $options: 'i' } },
                        { category: { $regex: search, $options: 'i' } }
                    ];
                }

                if (brandname) {
                    query.brandname = { $regex: brandname, $options: 'i' };
                }

                if (category) {
                    query.category = { $regex: category, $options: 'i' }; // Add category filter
                }

                // Create a sort object
                let sort = {};
                if (sortOption === 'low-to-high') {
                    sort.price = 1; // Sort by price in ascending order
                } else if (sortOption === 'high-to-low') {
                    sort.price = -1; // Sort by price in descending order
                } else if (sortOption === 'date') {
                    sort.productcreationdate = -1; // Sort by date in descending order (newest first)
                }

                const result = await productCollection.find(query)
                    .sort(sort) // Apply the sorting
                    .skip(page * size)
                    .limit(size)
                    .toArray();

                const totalProducts = await productCollection.countDocuments(query);

                res.json({
                    products: result,
                    count: totalProducts,
                });
            } catch (error) {
                console.error('Error fetching products data:', error);
                res.status(500).json({ message: 'Internal server error', error: error.message });
            }
        });




        // pasinition 
        app.get('/productcount', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            // console.log(count);
            res.send({ count })
        })


        // app.get('/products', async (req, res) => {
        //     try {
        //         const page = req.query.page || 0;
        //         const size = req.query.size || 10;
        //         console.log(page, size);

        //         // const product = productCollection.find();
        //         const result = await productCollection.find()
        //             .skip(page * size)
        //             .limit(size)
        //             .toArray();

        //         res.send(result)
        //     } catch (error) {
        //         console.error('Error products data:', error);
        //         res.status(500).json({ message: 'Internal server error', error: error.message });
        //     }
        // })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('TripRex server is running')
});

app.listen(port, () => {
    console.log(`PH Commerce is running port on ${port}`)
})