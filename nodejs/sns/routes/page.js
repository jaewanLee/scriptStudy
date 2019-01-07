const express=require("express")
const {isLoggedIn,isNotLoggedIn}=require("./middlewares")

const router=express.Router()

//자기 프로필을 보기위해서는 자기자신이 로그인이 되어있어야함
//로그인이 되어있다면 isLoggedIn에서 inAuthenticated()가 참이디ㅗ어 next가 호출되고, render미들외어까지 넘어옴.
//false면 메인창으로 리다이렉트됨
router.get("/profile",isLoggedIn,(req,res)=>{
    res.render("profile",{title:"my info",user:req.user})
})

//회원가입이기떄문에 로그인 안되있는 경우만 가능.
router.get("/join",isNotLoggedIn,(req,res)=>{
    res.render("join",{
        title:"signup",
        user:req.user,
        joinError:req.flash("join Error")
    })
})

router.get("/",(req,res,next)=>{
    //next파라미터는 같은 주소의 router를 관리할수 있게해준다. 지금은 사용하지 않음
    res.render("main",{
        title:"SNS",
        twits:[],
        user:req.user,
        loginError:req.flash("loginError")
    })
})

module.exports=router;