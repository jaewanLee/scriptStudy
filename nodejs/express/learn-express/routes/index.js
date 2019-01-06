var express = require('express');
var User = require('../learn-sequilize/models').User

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', {
        user
      })
    })
    .catch((err)=>{
      console.log(err);
      next(err);
    })

});
module.exports = router;
