 const express = require("express")
 const https = require("https")
 const bodyParser = require("body-parser")

 const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


var weatherTemp="";
var weatherDescription="";
var windSpeed="";
var city="";
var humidity="";
// var icon="";
// var imageUrl = "";
var icon="";
var imageUrl = "";

console.log(weatherDescription);
app.get("/",function(req,res){

// res.sendFile(__dirname+"/index.html");


res.render("appfile", {tempofweather: weatherTemp, descriptionofweather:weatherDescription,speedofwind:windSpeed, cityheading:city,humidityweather:humidity,weatherimage:imageUrl});

// const api = "552efebb92d67e4b020d5f69e225042b";
// const city = "London";
// const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api;
//   https.get(url,function(response){
//
// response.on("data",function(data){
//
//   // console.log(data);
//   const weatherData = JSON.parse(data);
//   console.log(weatherData);
//   const weatherTemp = weatherData.main.temp;
//   console.log(weatherTemp);
// })
//
//   });

})

app.post("/",function(req,res){


  const api = "552efebb92d67e4b020d5f69e225042b";
   city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units=metric";
    https.get(url,function(response){

  response.on("data",function(data){

    // console.log(data);
    const weatherData = JSON.parse(data);
    console.log(weatherData);
     weatherTemp = JSON.stringify(weatherData.main.temp);
    console.log(weatherTemp);
     weatherDescription = weatherData.weather[0].description;
    console.log(weatherDescription);
     windSpeed = JSON.stringify(weatherData.wind.speed);
    console.log(windSpeed);
     icon = weatherData.weather[0].icon;
     imageUrl =  "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
     humidity = JSON.stringify(weatherData.main.humidity);
     console.log(humidity);
     



  res.redirect("/");



  })


    })


});





app.listen(3000,function(){

  console.log("Listening at port 3000");
})
