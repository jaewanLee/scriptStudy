const fs=require("fs")

fs.writeFile("./writeme.txt","text is written",(err)=>{
    if(err){
        throw err
    }
    else{
        fs.readFile("./writeme.txt",(err,data)=>{
            if(err){
                throw err
            }
            else{
                console.log(data.toString())
            }
        })
    }
})