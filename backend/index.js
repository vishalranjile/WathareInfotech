// username: vishalranjile12
// pass: 7PrXWn7IavOLfj8l


const express=require('express')
const app=express();
const port=3000;
const cors=require('cors');

// middleware
app.use(cors());
app.use(express.json());


// mondodb connection


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vishalranjile12:7PrXWn7IavOLfj8l@cluster0.cxzm61x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// creating database and collection
const database =client.db("wakhareproject");
const machinedata=database.collection("mdata");

// routes
app.post('/data',async(req,res)=>{
  const data=req.body;
  const result =await machinedata.insertOne(data);
  res.send(result);
})

app.get('/getdata',async(req,res)=>{
  const result=await machinedata.find().toArray();
  res.send(result);
})
app.get('/',(req,res)=>{
    res.send("Hey am express server");
})

app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
})

