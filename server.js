'use strict'
let req = require("express");
let express = req();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let config = require('./config/development');
let db = config.db;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = config.db.mongo.db;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server - DB =>" + dbName);

    const db = client.db(dbName);

    const csvFilePath = 'cars.csv'
    const csvtoJsonHere = require('csvtojson')

    async function csvtoJsonFunction (){
        csvtoJsonHere()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(JSON.stringify(jsonObj));
            _.chunk(jsonObj, 5, (data) => {
                let functionCallMade =  await insertCollection();
                console.log("functionCallMade====",functionCallMade.length)
                // console.log("functionCallMade====",functionCallMade)
            })
        })
    }


    (async () => {
       await csvtoJsonFunction()
      })();


      function insertCollection (){
        return new Promise(function(resolve,reject){
            try {
                const collection = db.collection('cars');
                collection.insertMany(data, function (err, result) {
                    console.log("Inserted into the collection", result);
                    resolve(result);
                });
            }catch(e){
                console.log("error",e);
                reject(e);
            }
        })
        
    }

    
});
// const jsonArray= csvtoJsonHere().fromFile(csvFilePath);


