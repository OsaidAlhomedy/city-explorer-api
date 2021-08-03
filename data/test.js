'use strict';

require('dotenv').config();
const express = require('express');
const server = express();

const axios = require('axios');

const cors = require('cors');
server.use(cors());

const PORT = process.env.PORT;

// http://localhost:3010/getPhotos?name=cars
server.get('/getPhotos',getPhotosHandler);

async function  getPhotosHandler(req,res) {
    const query = req.query.name;
    const URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_KEY}`;
    // console.log(req.query);
    // try {
    //     const result = await axios.get(URL);
    //     // console.log(result);
    //     res.send(result.data);
    // }
    // catch (err) {
    //     res.send(err);
    // }
    
    console.log('bafore promise');
        axios
        .get(URL)
        .then(result => {
            console.log('inside promise');
            
            let photoArray = result.data.results.map(item => {
                return new Photo(item);
            })
            
            res.send(photoArray);
        })
        .catch(err =>{
            res.send(err);
        })
        console.log('outside promise');
}

class Photo {
    constructor(item) {
        this.imgUrl = item.urls.raw;
        this.numLikes = item.likes
    }
}

// http://localhost:3010/test
server.get('/test',(req,res) => {
    res.send('test route');
})

// http://localhost:3010/
server.get('*',(req,res) => {
    res.status(404).send('route not found');
})


server.listen(PORT,()=>{
    console.log(`I am Listening on port: ${PORT}`);
})