const express=require("express")
const axios=require("axios")
const router=express.Router();
const URL="http://localhost:8002/v1"

const request=async (req,api)=>{
    try{
        if(!req.session.jwt){
            const tokenResult=await axios.post(`${URL}/token`,{
                clientSecret:process.env.CLIENT_SECRET,
            })
            req.session.jwt=tokenResult.data.token;
        }
        return await axios.get(`${URL}${api}`,{
            headers:{authorization:req.session.jwt}
        })
    }
    catch(error){
        console.error(error)
        if(error.response.status<500){
            return error.response;
        }
        throw error;
    }
}

router.get("/mypost",async (req,res,next)=>{
    try{
        console.log("in my post")
        const result=await request(req,"/posts/my")
        res.json(result.data)
        console.log("finish my post")
    }
    catch(error){
        console.error(error)
        next(error)
    }

})

router.get("/search/:hashtag",async (req,res,next)=>{
    try{
        const result=await request(
            req,`/post/hashtag/${encodeURIComponent(req.params.hashtag)}`
        )
        res.json(result.data);
    }
    catch(error){
        if(error.code){
            console.error(error)
            next(error)
        }
    }
})

router.get("/test",async (req,res,next)=>{
    try{
        if(!req.session.jwt){
            const toeknResult=await axios.post("http://localhost:8002/v1/token",{
                clientSecret:process.env.CLIENT_SECRET,
            })
            if(toeknResult.data && toeknResult.data.code==200){
                req.session.jwt=toeknResult.data.token;
            }else{
                return res.json(toeknResult.data);
            }
        }
        const result=await axios.get("http://localhost:8002/v1/test",{
            headers:{authorization:req.session.jwt},
        })
        return res.json(result.data)
    }
    catch(error){
        console.log(error)
        if(error.response.status===419){
            return res.json(error.response.data);
        }
        return next(error);
    }
})

module.exports=router;