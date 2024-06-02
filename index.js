var con = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/register.html');
   

});
app.get('/about',function(req,res){
    res.sendFile(__dirname+'/about.html');
});
app.get('/contact',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
});
app.post('/',function(req, res){
    var name = req.body.name;
    var dropoff_time = req.body.dropoff;
    var pickup_time = req.body.pickup;
    var num = req.body.num;
    var location = req.body.location;
    var email = req.body.email;
    var mno = req.body.mno;
    // console.log(req.body);
    con.connect(function(error){
        if(error) throw error;
        var sql = "INSERT INTO travel(name, dropoff, pickup, num, location, email, mno) VALUES('"+name+"','"+dropoff_time+"','"+pickup_time+"','"+num+"','"+location+"','"+email+"','"+mno+"')";
        con.query(sql,function(error, result){
            if(error) throw error;
            
            res.send('Booking Successfull '+result.insertId);
        });
    });
});

app.listen(7000);