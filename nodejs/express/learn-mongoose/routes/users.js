var express = require('express');
var User=require("../schemas/user")

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("user.js router get with /")
  //users.js로 /형태가 들어올경우
  User.find({})
  .then((users)=>{
    res.json(users);
  })
  .catch((err)=>{
    console.error(err)
    next(err)
  })
});

router.post("/",function(req,res,next){
  const user=new User({
    name : req.body.name,
    age: req.body.age,
    married:req.body.married,
  })
  user.save()
  .then((result)=>{
    console.log(result)
    res.status(201).json(result)
  })
  .catch((err)=>{
    console.error(err)
    next(err)
  })
})

module.exports = router;
