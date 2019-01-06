const moongoose=require("mongoose")

module.exports=()=>{
    const connect=()=>{
        if(process.env.NODE_EVN!=="production"){
            moongoose.set("debug",true)
        }
        moongoose.connect("mongodb://name:9595@localhost:27017/admin",{
            dbName:"nodejs"
        },(error)=>{
            if(error){
                console.log("mongoDB connect err",error)
            }
            else{
                console.log("mongoDB connect success")
            }
        })
    }
    connect()
    moongoose.connection.on("error",(error)=>{
        console.error("mongoDB error",error)
    })
    moongoose.connection.on("disconnected",()=>{
        console.error("mongoDB is disconnected, retry connectiong")
        connect()
    })
    require("./user")
    require("./comments")
}