//* Importing
// const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

//* Middleware
// app.use(bodyParse.json());
app.use(cors());
app.use(express.json());

//* Schema
const foodSchema = new mongoose.Schema({
	name: String,
	calories: Number,
	protein: Number,
	carbs: Number,
	fats: Number,
	fibre: Number,
	weight: Number,
});
//* Schema Model
const foodModel = new mongoose.model('foods', foodSchema);

//* Database Connectivity
mongoose
	.connect('mongodb://localhost:27017/Nutrition', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully Connected With Database');
	});

//* All Data Get Request
app.get('/foods', async (req, res) => {
	console.log('All Data Get Request');
	let foods = await foodModel.find({});
	res.send(foods);
});

//* Single Data Get Request
app.get('/food/:name', async (req, res) => {
	console.log('Single Data Get Request');
	let name = req.params.name;
	let food = await foodModel.find({ name: name });
	res.send(food);
});

//* Post Request
app.post('/food/create', (req, res) => {
	console.log('Post Request');
	const food = req.body;
	let foodObj = new foodModel(food);
	foodObj.save().then(() => {
		console.log(foodObj);
	});
	res.send(foodObj);
});

//* Server
app.listen(port, () => {
	console.log('Server Has Started');
});
