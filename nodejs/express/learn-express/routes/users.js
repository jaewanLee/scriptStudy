var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/flash',function(req,res){
  req.session.message="new message"
  req.flash('message','flash Message`')
  res.redirect('/users/flash/result')
})
router.get('/flash/result',function(req,res){
  res.send(`${req.session.message} ${req.flash("message")}`)
})

module.exports = router;
