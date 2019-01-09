const jwt=require("jsonwebtoken")

exports.isLoggedIn=(req,res,next)=>{
    //로그인 여부 판별
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).send("need login")
    }
}

exports.isNotLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/')
    }
}

exports.verifyToken=(req,res,next)=>{
    try{
        req.decoded=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        return next();
    }catch (error){
        if(error.name==="TokenExpiredError"){
            return res.status(419).json({
                code:419,
                message:"token is expired",
            })
        }
        return res.status(401).json({
            code:401,
            message:"unauthorized token"
        })
    }
}