var express = require('express');
var User=require("../schemas/user")

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //index가 기본이기떄문에 localhost/로 접속한경우
  //User value가 mongoDB에서 UserTable을 export한거이기떄문에 find하면 User데이터 전부를 가져옴
  console.log("index.js on router is entered")
  User.find({})
  //찾은 모든 user데이터를 users라는 변수로 mongoose.pug로 넘겨줌
  .then((users)=>{
    res.render("mongoose",{users})
  })
  .catch((err)=>{
    console.err(err)
    next(err)
  })
});

module.exports = router;
