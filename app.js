const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req,res){
  const query= req.body.CityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=9c1146067c527b4f3db3822a242bd18a"

  https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
         const weatherData =JSON.parse(data);
          const temp =weatherData.main.temp;
          const weatherDesc=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          const imagUrl="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
       res.write("<p>The weather is currently "+weatherDesc+".</p>");
       res.write("<h1>The temperture in "+query+" is currently "+temp+" K </h1>");
       res.write("<img src=" +imagUrl +">");
      })
  })


});



app.listen(3000,function(){
  console.log("Server Started!");
})
