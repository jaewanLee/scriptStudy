const crypto=require("crypto");

crypto.randomBytes(64,(err,buf)=>{
    // randomBytes로 랜덤하게 64비트 문자열을 만들어줌 그게 buf
    console.log("original buf",buf);
    //만들어진 buf를 64bit크기의 salt라는 문자열로 치환해줌
    const salt=buf.toString('base64');
    console.log("salt :",salt)
    //salt를 사용해서 passsword라는 비밀번호 문자열을 sha512암호화해줌
    crypto.pbkdf2("password",salt,10000,64,"sha512",(err,key)=>{
        //key가 결과값
        console.log("password : ",key.toString('base64'))
    })
})

const cipher=crypto.createCipher("aes-256-cbc","key")
let result=cipher.update("password","utf8","base64")
console.log("result:",result)