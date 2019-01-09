const express=require("express")
const passport=require("passport")
const {isLoggedIn,isNotLoggedIn}=require("./middlewares")
const {User}=require("../models")

const router=express.Router()

//kakao로 들어오게되면 kakao전략 을실행해줌
//kakao로그인은 자체적으로 로그인 과정이 있기떄문에 우리가 req,res등을 직접호출해줄필요가 없음
router.get("/kakao",passport.authenticate("kakao"))
//kakao전략 실행중 아이디가 없을떄 실행되는 callback
//로그인 실패했을때 redirectURL만 넣어주면 로그인 및 회원가입후 내용들을 kakao에서 알아서해주고 우리는
//response만 받아서 처리하면됨.
//response처리는 kakaostrategy에서 진행함
router.get("/kakao/callback",passport.authenticate("kakao",{
    failrueRedirect:"/",
}),(req,res)=>{
    res.redirect("/");
})

//page가 기본으로설정되어있기떄문에 auth내의 path는 auth/join || auth.login같은 형태가됨
router.post("/join",isNotLoggedIn,async (req,res,next)=>{
    const {email,nick,password}=req.body;
    try{
        const exUser= await User.find({where:{email}})
        if(exUser){
            req.flash("joinError","already loggedIn email")
            return res.redirect("/join")
        }
        const hash=password;
        await User.create({
            email,
            nick,
            password:hash
        });
        return res.redirect("/")
    }
    catch(error){
        console.log(error)
        return next(error)
    }
})

router.post("/login",isNotLoggedIn,(req,res,next)=>{
    //첫번쨰 파라미터로 local을 넘겨주게되면 localStrategy에 해당하는 전략이 실행됨
        //passport.autheticate가 localStrategy의 done이라고보면됨. localStrategy에서 정한 전략이 완료되면 done을통해 두번쨰 파라미터에서 정의해준 내용을 콜백해줌.
    //전략에 성공할경우error는 null이되고 user정보가 넘어오지만 오류가있따면 error에 값을 넣어줌
    //info는 주로 전략에 실패할경우 에러메세지 출력을 위해 info내부에 {message:"값"}의 형태로넣어줌
    passport.authenticate("local",(authError,user,info)=>{
        if(authError){
            console.error(authError);
            return next(authError)
        }
        if(!user){
            req.flash("loginError",info.message)
            return res.redirect("/")
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect("/")
        })
    })(req,res,next);//미들웨어 내의 미들웨어는 (Req,res,next)를 붙입니다.?
})
router.get("/logout",isLoggedIn,(req,res)=>{
    req.logOut();
    req.session.destroy()
    res.redirect("/")
})

module.exports=router