setInterval(()=>{
    console.log("start")
    try{
        throw new Error("error")
    }
    catch(error){
        console.error(error)
    }
},1000)