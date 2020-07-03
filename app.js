     const express 	= require('express'),
	 	bodyParser 	= require('body-parser'),
	           app  = express(),
	         fetch 	= require('node-fetch'),
	     parseJson 	= require('parse-json');

global.fetch = fetch;
app.use(express.static("public"));

//Setting Unsplash Api
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const unsplash = new Unsplash({
  accessKey: "y6J7kHQIy4hZW1nyGXsLEYYePhNxsiUaJhyaCspYTuY",
  secret: "4Uvj8P1wDFGAtiCMcHNQhhauQKv3VZpb4xZTvJ73FyY"
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let photos =[];
let searchFlag = 0;

app.get('/',function(req,res){
	
	unsplash.photos.listPhotos(2, 20, "latest")
	.then(toJson)
	.then(json => {
		photos=[];
		json.forEach(function(data){
			photos.push(data);
		});
		searchFlag=0;
		res.render("index.ejs",{pics:json,searchFlag:searchFlag});
	});
});


//Searching in photos whith given keyword!
app.post('/search',function(req,res){
	let myMap = new Map();
	photos.forEach(function(photo){
		let stringVal  = photo.alt_description;
		myMap.set(stringVal,photo.urls.small);
	});
	
	let searchkey = req.body.searchkey;
	let foundData = [];
	for (let [key, value] of myMap.entries()) {
		let str = key;
		let	reg = new RegExp(searchkey);
		let result = str.match(reg);
		if(result){
			foundData.push(value);
		}
		
	}
	
searchFlag =1;
	res.render("index.ejs",{pics:foundData,searchFlag:searchFlag});
});

app.listen(81,function(){
	console.log("Running Blogs App at port no 81.....");
});