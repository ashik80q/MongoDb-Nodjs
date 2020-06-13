const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });


const users = ['Ashik', 'Ali', 'sha', 'Tamim'];

app.get('/product',(req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("product");
        collection.find({name:"mobile"}).limit(5).toArray((err, documents)=>{
    
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
                
            }
            else{
               
                res.send(documents);
            }
            
            
        });
          
        client.close();
      });
      

});



app.get('/users/:id', (req, res) =>{
    
    const id = req.params.id;
    const name = users [id];
    res.send({id, name});
})
//post
app.post('/addProduct', (req, res)=>{
    
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("product");
        collection.insertOne(product,(err, result) =>{
    
            if(err){
                console.log(err);
                res.status(500).send({massage:err});
                
            }
            else{
               
                res.send(result.ops[0]);
            }
            
        
        })
          
        client.close();
      });
      
})

const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log('listen to port 4000'));