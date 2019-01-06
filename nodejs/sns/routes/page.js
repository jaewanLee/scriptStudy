const express=require("express")

const router=express.Router()

router.get("/profile",(req,res)=>{
    res.render("profile",{title:"my info",user:null})
})

router.get("/join",(req,res)=>{
    res.render("join",{
        title:"signup",
        user:null,
        joinError:req.flash("join Error")
    })
})

router.get("/",(req,res,next)=>{
    //next파라미터는 같은 주소의 router를 관리할수 있게해준다. 지금은 사용하지 않음
    res.render("main",{
        title:"SNS",
        twits:[],
        user:null,
        loginError:req.flash("loginError")
    })
})

module.exports=router;