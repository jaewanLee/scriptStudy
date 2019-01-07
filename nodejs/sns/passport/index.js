const local=require("./localStrategy")
const kakao=require("./kakaoStrategy")
const {User}=require("../models")

module.exports=(passport)=>{
    //passport라는 loginsession에서 사용.
    //session에 유저정보를 넣는과정
    passport.serializeUser((user,done)=>{
        //첫번째파라미터는 오류처리
        //두번쨰가 저장할 유저의 아이디
        //쿠키에 너무많은 정보를 저장하면안되기때문에 식별자 정도만 저장한다.
        done(null,user.id);
    })
    //매세션마다 실행됩니다.
    //이전에 저장했던 id를 받아서 정보를 조회하고 그 값에따라 처리를 해줍니다.
    //
    passport.deserializeUser((id,done)=>{
        User.find({
            where:{id},
            include:[{
                model:user,
                attributes:['id','nick'],
                as:"Followers",
            },{
                model:User,
                attributes:["id","nick"],
                as:"Followings"
            }],
        })
        //done의 user에 아이디값을 저장합니다.req.user를 통해 가져올수있음.
        .then(user=>done(null,user))
        .catch(err=>done(err))
    });

    local(passport);
    kakao(passport);
}
