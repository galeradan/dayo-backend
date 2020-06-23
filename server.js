const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./gql-schema');
// const graphqlSchema = require('./gql-schema');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
require('dotenv').config()


const app = express() 
let port = process.env.PORT || 4000


app.use(cors(), bodyParser.json());
app.use('/graphql', graphqlHTTP({schema: graphqlSchema, graphiql: true}));


// mongoose.connect('mongodb://localhost:27017/merng_dayo');
// console.log(process.env.MONGO_USER)
mongoose.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@dayo-db-3ito1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
		
	)



mongoose.connection.once('open', ()=>{
	console.log("Now connected to MongoDB Atlas!");
}).then(()=>{
		app.listen(port,function(){
		console.log(`Now listening for requests on port`);
		})
	}).catch(err =>{
		console.log(err)
	})





