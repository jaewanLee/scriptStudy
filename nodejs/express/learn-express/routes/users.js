var express = require('express');
var User=require("../learn-sequilize/models").User;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll()
  .then((users)=>{
    res.json(users);
  }).
  catch((err)=>{
    console.error(err)
    next(err);
  })
});
router.post('/',function(req,res,next){
  User.create({
    name:req.body.name,
    age:req.body.age,
    married:req.body.married,
  })  
  .then((result)=>{
    console.log(result)
    res.status(200).json(result)
  })
  .catch((err)=>{
    console.error(err);
    next(err)
  })
})

router.get('/flash',function(req,res){
  req.session.message="new message"
  req.flash('message','flash Message`')
  res.redirect('/users/flash/result')
})
router.get('/flash/result',function(req,res){
  res.send(`${req.session.message} ${req.flash("message")}`)
})

module.exports = router;
