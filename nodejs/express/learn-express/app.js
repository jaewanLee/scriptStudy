var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session')
var flash=require('connect-flash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter=require('./learn-sequilize/routes/users')
var sequelize=require("./learn-sequilize/models").sequelize
var connect=require("mongoose")

var app = express();
connect();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req,res,next){
  console.log(req.url,"나도 미들웨어다!!")
  // next(createError(404))
  next()
})

//사용자 접속했을때, 접속 경로 및 시간/브라우저등을 로그로 제공(morgan)
app.use(logger("dev"))
app.user(express.static(path.join(__dirname,'public')))
//body-Parser가 node에 내장되어있는형태로, json형식을 서버에서 수식할떄 사용
app.use(express.json());
//body-parser로 url을 이요해서 data를 보낼때 사용
app.use(express.urlencoded({ extended: false }));
//cookie파싱해줌. "secret code"를 인자로넣어서 쿠키암호화가능
app.use(cookieParser("secret code"));
app.use(session({
  //변경사항이 없을때도 재저장여부 확인
  resave : false,
  //초기 사황에서 저장할 내용이 없더라도 세션 저장확인
  saveUninitialized: false,
  //cookieParser에서 지정한 secret값과 같게 설정해줘야함
  secret : 'secre code',
  cookie:{
    httpOnly:true,
    secure:false,
  }
}))
app.use(flash())
//정적파일 제공
app.use(express.static(path.join(__dirname, 'public')));
// //이렇게되면 pulbic이라는 위치가 localhost/img로 됨. 만일 파일이 없으면 router로 요청을 넘김
// app.use("/img",path.join(__dirname,"public"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('comments',commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //이곳에서 지정한 message와 error값이 render에 전달된다.
  res.locals.message = err.message;
  //app의 env를 키값으로 app객체에 접근한다. app객체로부터 이게 dev환경인지 확인해서 dev일떄만 err을 보여준다.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //render가 플랫폼 파일을 렌더링해주는 기능임.
  //여기서 상단에 rednering대상을 pug를 사용한 view로 지정했기떄문에 view에 있는 error.pug파일을 불러온다.
  res.render('error');
});

module.exports = app;
