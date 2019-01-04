const http = require("http")
const fs = require("fs")
const url = require("url")
const qs = require("querystring")

//expected cookie value : `session=${randomInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`
const parseCookie = (cookie = "") =>{
    console.log(`default cookie ${cookie}`)
    let result=cookie.split(";")
    //epxected value : [session=rand,expires=1234,httponly,path=/]
    console.log(`split as ; ${result}`)
    result=result.map(v=>v.split("="))
    //expected value : [[session,rand],[expires,1234],httponly,[path,/]]
    console.log(`first map ${result}`)
    result=result.map(([k,...vs])=>[k,vs.join("=")])
    //expected value : [[session,rand],[expires,1234],httponly,[path,/]]
    console.log(`second map ; ${result}`)
    result=result.reduce((acc,[k,v])=>{
        acc[k.trim()]=decodeURIComponent(v)
        return acc
    },{})
    //expected value : {session : rand , expires : 1234 , path : /}
    return result
}

let session={}

http.createServer((req, res) => {
        const cookies = parseCookie(req.headers.cookie)
        console.log(cookies)
        console.log(cookies.session)
        if (req.url.startsWith("/login")) {
            const {
                query
            } = url.parse(req.url)
            const {
                name
            } = qs.parse(query)
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 5)
            const randomInt = +new Date()
            session[randomInt] = {
                name,
                expires,
            }
            res.writeHead(302, {
                Location: '/',
                "Set-Cookie": `session=${randomInt};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
            });
            res.end()
        } else if (cookies.session && session[cookies.session].name) {
            console.log(session[cookies.session])
            res.writeHead(200, {
                'Content-Type': `text/html;charset=utf-8`
            })
            if (session[cookies.session].name)
                res.end(`${session[cookies.session].name} hi~`)
        } else {
            fs.readFile("./server4.html", (err, data) => {
                if (err) {
                    throw err;
                } else {
                    res.end(data)
                }
            })
        }
    })
    .listen(8080, () => {
        console.log("8080 port is on")
    })