const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/signup.html");
})

app.post("/", function (req,res){
    const fname= req.body.fname;
    const lname= req.body.lname;
    const email= req.body.email;
    
    const data= {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]
    };
    const JSONdata = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/2fe1493153"
    const options ={
           method : "post",
           auth : "isha:7c2b47753c467273baf91ced3a33c4d9-us21"
    }

    const request = https.request(url,options, function(response){
            
          if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
          }
          else{
            res.sendFile(__dirname + "/failure.html");
          }
        
        response.on("data",function (data){
               console.log(JSON.parse(data));
          })
    })
     request.write(JSONdata);
     request.end();

        
   
})

app.post("/failure", function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000.");
});
