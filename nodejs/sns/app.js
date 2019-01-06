const express=require("express")
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
const path=require("path")
const session=require("express-session")
const flash=require("connect-flash")
//server로 들어오는 요청들을 처리하기 위한 router
const pageRouter=require("./routes/page")
//서버 기본 객체
const app=express();
//views는 epxress와 함꼐 사용할 템플릿이 있는경우 템플릿의 위치를 지정한다.
app.set("views",path.join(__dirname,"views"))
//view,즉 템플릿 엔진에 사용될 엔진 이름을 지정한다. 여기서는 pug
app.set("view engine","pug")
//사용할 포트번호 지정
app.set("port",process.env.PORT||8001)
//로그를 남겨주는 미들웨어, dev모드에서는 접속시간등 자세한정보를 console에 보여준다.
app.use(morgan("dev"))
//정적파일이 있는 위치를 설정한다.
//static을 지정한 이후로는 정적파일을 load할때 public에 접근하지않고 javascript등의 필요한 파일들에 접근할 수 있다.
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
//body-parser로 url을 이용해서 data를 보낼때 사용. body-parser를 사용하지 않을꺼면 extended를 true로해주면된다.
app.use(express.urlencoded({extended:false}))
//cookie파서를 이용해서 쿠키를 파싱해준다. 넘겨준 string으로 암호화한다.
app.use(cookieParser("snssecret"))
//쿠키 세팅에대한 설정값.
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"snssecret",
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));
//flash를 사용할 경우 지정
app.use(flash())

//현재 서버에 "/"로 접속할경우 pageRouter로 보내준다.
app.use("/",pageRouter)
//여기까지왔다는것은 다른 미들웨어에서 처리를 못해줬다는거임.
//위에서 "/"path에 대해서만 router를 지정해주었기 떄문에, "/"가 아닌 다른 path를 넘길경우 404에러로 보냄
app.use((req,res,next)=>{
    const err=new Error("notFound")
    err.status=404;
    next(err);
})

app.use((err,req,res)=>{
    //에러핸들링. 넘겨받은 에러의 메시지와 정보를 response에 넣어줌
    res.locals.message=err.message;
    res.locals.error=req.app.get('env')==="development"?err:{};
    res.status(err.status||500);
    //에러정보를 response에 넣어준뒤, error페이지로 레더링해줌.
    //현재 템플릿 엔진을 사용하기때문에 error페이지로 렌더링하는것은 views에 있는 error.pug임
    res.render("error");
})

app.listen(app.get("port"),()=>{
    console.log(app.get("port"),"에서 대기중입니다.")
})

