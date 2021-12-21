const express = require('express');

const https = require('https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){

  query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=b6f4f0745b45a6af66fce5367068e5cd&units=metric"
  https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
  // console.log(data);
    const weatherData = JSON.parse(data)
    console.log(weatherData);
    const temperature = weatherData.main.temp
    console.log(temperature);
    const weatherDescription = weatherData.weather[0].description
    console.log(weatherDescription);
    const weatherIcon = weatherData.weather[0].icon
    const imageUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"

    res.write("<p>The weather is currently " + weatherDescription + "<p>")
    res.write("<h1>The temperature in " + query + " is " + temperature + " deg celcius</h1>")
    res.write("<img src="+imageUrl+">")
    res.send()
    })
  })
  console.log("Post request received");
})

app.listen(3000, function() {
  console.log("server is live on 3000");
})
