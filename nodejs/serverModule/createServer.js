const http=require("http")

http.createServer((req,res)=>{
    res.write("<h1>Heelo Node!</h1>")
    res.end("<p>Hello Server<\p>")
}).listen(8080,()=>{
    console.log("wating on 8080 port")
}).on("error",(error)=>{
    console.error("error")
})