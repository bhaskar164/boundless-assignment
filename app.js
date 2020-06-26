const express = require('express'),
	  bodyParser = require('body-parser'),
	  app = express();
const fetch = require('node-fetch');
const parseJson = require('parse-json');
global.fetch = fetch;
// import Unsplash, { toJson } from "unsplash-js";
//Setting Unsplash Api
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
// const unsplash = new Unsplash({ accessKey: "y6J7kHQIy4hZW1nyGXsLEYYePhNxsiUaJhyaCspYTuY" });



const unsplash = new Unsplash({
  accessKey: "y6J7kHQIy4hZW1nyGXsLEYYePhNxsiUaJhyaCspYTuY",
  secret: "4Uvj8P1wDFGAtiCMcHNQhhauQKv3VZpb4xZTvJ73FyY"
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	
	unsplash.photos.listPhotos(2, 15, "latest")
	.then(toJson)
	.then(json => {
		console.log(json[0]);
		console.log(json[0]['urls'].small);
		res.render("index.ejs",{json:json});
	});
});

app.listen(81,function(){
	console.log("Running Blogs App at port no 81.....");
});