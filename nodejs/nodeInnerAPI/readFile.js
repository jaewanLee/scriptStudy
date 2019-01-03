const fs=require("fs");

fs.readFile("./readme.txt",(err,data)=>{
    if(err){
        throw err
    }
    else{
        console.log(data)
        console.log(data.toString())
    }
})