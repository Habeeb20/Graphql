const express = require('express')
const {ApolloServer} = require("@apollo/server")
const startStandaloneServer = require("@apollo/server/standalone")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectdb = require('./connection/connect')
const allTypeDef = require('./Schema/index.schema.js');
const allResolvers = require('./resolvers/user.resolver.js');


const port = process.env.PORT || 8002;
// const app = express();
// connectdb();

const app = new ApolloServer({
    typeDefs: allTypeDef,
    resolvers: allResolvers,
    includeStacktraceInErrorResponses: false
    
})

const mongoDB = process.env.MONGO_URL

mongoose.set('strictQuery', true)
mongoose.connect(mongoDB)
        .then(() => {
            console.log("connected to the database");
            return startStandaloneServer(app, {
                listen: {port: process.env.PORT},
                
                
        });
    })


app.listen(port, ()=> {
    console.log("server is connected")
})