const LocalStrategy = require("passport-local").Strategy;

const {
    User
} = require("../models")

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        //passport localstrategy의 전략에관한 설정.
        //req.body에 있는 값과 같게해주면됨.
        usernameField: "email",
        passwordField: "password",
        //실제 전략이 있는곳.
        //위에넣어준 email과 password가 들어감.
        //done은 passport.authenticate의 콜백임.
    }, async (email,password,done)=>{
        try{
            const exUser=await User.find({where:{email}});
            if(exUser){
                const result=password===exUser.password
                if(result){
                    done(null,exUser)
                }else{
                    done(null,false,{message:"password is not correct"})
                }
            }else{
                done(null,false,{message:"unregistre user"})
            }
        }catch(error){
            console.error(error)
            done(error)
        }
    }))
}