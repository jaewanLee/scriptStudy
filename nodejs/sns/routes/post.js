const express=require("express")
const multer=require("multer")
const path=require("path")
const fs=require("fs")

const {Post,Hashtag,User} =require("../models")
const {isLoggedIn}=require("./middlewares")

const router=express.Router();
fs.readdir("uploads",(error)=>{
    if(error){
        console.error("there is no uploads file i will make it!")
        fs.mkdirSync("uploads")
    }
})
//multer객체.
//stroage에는 저장소위치와 파일이름을 결정한다.세번째 파라미터인 cb가 멀터에 값을 정하는부분
const upload=multer({
    stroage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,"uploads/")
        },
        filename(req,file,cb){
            //ext는 file의 확장자를 가져옴
            const ext=path.extname(file.originalname)
            cb(null,path.basename(file.originalname,ext)+new Date().valueOf()+ext);
        },
    }),
    limits:{fileSize:5*1024*1024}
})

//upload는 멀터객체를 가지고있는 미들웨어임
//upload.single은 이미지 파일 하나를 만들떄 사용하며 필요에따라 .array,fileds,none등이 사용하가능함
router.post("/img",isLoggedIn,upload.single("img"),(req,res)=>{
    console.log("req.file")
    res.json({url:`/img/${req.file.filename}`})
})

//게시글 업로드처리. 이미지는 위에서 처리했기떄문에 이미지를 이미지자체로처리하지 않고 url text로 처리함.따라서 none을 사용
const upload2=multer()
router.post("/",isLoggedIn,upload2.none(),async (req,res,next)=>{
    try{
        //넘겨받은 post값으로 postDB를 만들음
        const post=await Post.create({
            content:req.body.content,
            img:req.body.url,
            userId:req.user.id
        })
        //requst body에서 hashtag를 정규식 검사를 통해 가져옴
        const hashtag=req.body.content.match(/#[^\s]*/g);
        if(hashtag){
            //hastag 컬럼이 정상이라면, 존재하는 hashtag형태를 db에 만들어주거나 이미존재하다면 가져옴
            const result=await Promise.all(hashtag.map(tag=>Hashtag.findOrCreate({
                where:{title:tag.slice(1).toLowerCase()},
            })));
            //배열형태로 가져온 전체 해쉬태그들중 첫번쨰값인 title즉 해쉬태그 이름들을 저장함.
            await post.addHashtags(result.map(r=>r[0]))
        }
        res.redirect("/");
    }
    catch(error){
        console.error(error)
        next(error)
    }
})

router.get("/hashtag",async (req,res,next)=>{
    const query=req.query.hashtag;
    if(!query){
        return res.redirect("/")
    }
    try{
        const hastag=await Hashtag.find({
            where:{
                title:query
            }
        })
        let poasts=[];
        if(hastag){
            poasts=await Hashtag.find({
                include: [{
                    model:User
                }]
            })
        }
        return res.render("main",{
            title:`${query} | NodeBird`,
            user:req.user,
            twits:poasts,
        })
    }catch(error){
        console.error(error)
        return next(error)
    }
})

module.exports=router;