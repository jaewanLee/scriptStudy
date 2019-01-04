const http = require("http")
//parameter에 값을 지정하면, parameter로 아무것도 안들어왔을때 기본값을 지정할 수 있다.
let cookieEx = "name=zerocho;year=1994"
let cookieString="abc;def;ghi"+''
cookieEx.split(";")
const parseCookies = (cookieParam = '') =>{
    return cookieParam.split(";")
}

let cookieResult = parseCookies(cookieEx)
console.log(cookieResult)
cookieResult = cookieResult.map((v) =>
    v.split("="))
console.log(cookieResult)
cookieResult = cookieResult.map(([k, ...vs]) => [k, vs.join("=")])
console.log(cookieResult)
cookieResult=    cookieResult.reduce((acc, [k, v]) => {
    //return할 배열중 k에 해당하는 값에 v값을 넣는다.
    //trim은 공백제거, decodeURI는 인코딩을 해제해준다.
    acc[k.trim()] = decodeURIComponent(v);
    //[k,v]배열을 모두 돌아서 key-value를 지정해주면 함수형태로 return한다
    return acc;
}, {});
console.log(cookieResult)
//map과 reduce를 쓰기위해서는 기본적으로 배열이라는 가정이 있어야됨.
//넘겨받는 cookie파라미터는 header에서 오는 cookie이기때문에 기본적으로 배열형태임
// cookie
//넘겨받은 cookie의 값이 (";")을 기준으로 구분된 배열로 return된다
// .split(";")
//map은 배열내의 값들을 하나씩 돌면서 정의된 함수의 작업들을 해준다.
//map의 return값은 정의된 함수의 결과물들이 모인 배열이다.
//return 값이 v.slpit이기떄문에 각각의 키/value가 2중배열로 저장되어 return될것이다.
// .map(v =>
//     v.split("="))

//함수의 parameter에서 첫 파라미터를 지정하고 ...이후 파라미터를 쓰는것은 정확한 한개의 파라미터가 고정되어있고
//그 이후에 몇개의 파라미터가 올지 모를떄 사용한다.
//뒤에 넘겨받은 다수의 파라미터는 하나의 커다란 배열로 취급된다.
//배열의 join()은 각 값들을 "="이라는 값을 추가하여 하나의 문자열로 만든다.
// .map(([k, ...vs]) => [k, vs.join("=")])

// .reduce((acc, [k, v]) => {
//     acc[k.trim()] = decodeURIComponent(v);
//     return acc;
// }, {});
http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies)
    res.writeHead(200, {
        "Set-Cookie": "mycookie=test"
    })
    res.end("Hello Cookie")
}).listen(8080, () => {
    console.log("server is ready")
})