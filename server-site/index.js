const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7utjicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const productCollection = client.db('phCommerceDB').collection('products');


        app.get('/products', async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 0;
                const size = parseInt(req.query.size) || 10;
                const search = req.query.search || '';
                const sortOption = req.query.sort || '';
                const brandname = req.query.brandname || '';
                const category = req.query.category || '';
                const minPrice = parseFloat(req.query.minPrice) || 0;
                const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;

                console.log(req.query);

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
                    query.category = { $regex: category, $options: 'i' };
                }

                // price range condition
                query.price = { $gte: minPrice, $lte: maxPrice };

                // sort object
                let sort = {};
                if (sortOption === 'low-to-high') {
                    sort.price = 1;
                } else if (sortOption === 'high-to-low') {
                    sort.price = -1;
                } else if (sortOption === 'date') {
                    sort.productcreationdate = -1;
                }

                const result = await productCollection.find(query)
                    .sort(sort)
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
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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