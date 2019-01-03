const url=require("url");

const URL=url.URL;
const myURL=new URL("https://www.gitbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor")

console.log("new URL()",myURL)
console.log("url.foramt",url.format(myURL))

const parsedUrl=url.parse("https://www.gitbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor")
console.log("url.prase",parsedUrl)
console.log("rul.format()",url.format(parsedUrl))


