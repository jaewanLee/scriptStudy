const http = require("http")
const fs = require("fs")
const url = require("url")
const qs = require("querystring")

//parameter에 값을 지정하면, parameter로 아무것도 안들어왔을때 기본값을 지정할 수 있다.
const parseCookies = (cookie = '') =>
    cookie
    //넘겨받은 cookie(string)의 값이 (";")을 기준으로 구분된 배열로 return된다
    .split(";")
    //map과 reduce를 쓰기위해서는 기본적으로 배열이라는 가정이 있어야됨.
    //넘겨받는 cookie파라미터는 header에서 오는 cookie이기때문에 기본적으로 배열형태임
    //map은 배열내의 값들을 하나씩 돌면서 정의된 함수의 작업들을 해준다.
    //map의 return값은 정의된 함수의 결과물들이 모인 배열이다.
    //return 값이 v.slpit이기떄문에 각각의 키/value가 2중배열로 저장되어 return될것이다.
    .map(v =>
        v.split("="))

    //함수의 parameter에서 첫 파라미터를 지정하고 ...이후 파라미터를 쓰는것은 정확한 한개의 파라미터가 고정되어있고
    //그 이후에 몇개의 파라미터가 올지 모를떄 사용한다.
    //뒤에 넘겨받은 다수의 파라미터는 하나의 커다란 배열로 취급된다.
    //배열의 join()은 각 값들을 "="이라는 값을 추가하여 하나의 문자열로 만든다.
    .map(([k, ...vs]) => {
        return [k, vs.join("=")];
    })
    //첫번쨰인자에는 함수를 두번쨰인자에는 return할 초기값을 넣어준다.
    //함수의 첫번쨰인자는 앞에서 넣어준 초기 인자값이다. 
    //두번쨰인자는 함수내에서 값으로 사용할 value로, reduce를 실행한 대상(배열)의 순차값이다.
    //여기서는 이전의 return한 값이 이중배열이기떄문에 파라미터로 배열형태를 넣어줬따.
    .reduce((acc, [k, v]) => {
        //return할 배열중 k에 해당하는 값에 v값을 넣는다.
        //trim은 공백제거, decodeURI는 인코딩을 해제해준다.
        acc[k.trim()] = decodeURIComponent(v);
        //[k,v]배열을 모두 돌아서 key-value를 지정해주면 함수형태로 return한다
        return acc;
    }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    //버튼을 누른경우 입장
    if (req.url.startsWith('/login')) {
        //url이 parse값에 따라서 나눠짐
        const {
            query
        } = url.parse(req.url)
        //parsed를 해서 query에 해당하는 값만 가져옴
        console.log("parsed URL",query)
        //queryString을 사용해서 query를 다시 파싱함
        //이방식은 url파싱방식으로보면됨
        const {
            name
        } = qs.parse(query)
        //query에 해당하는 값중 name이라는 key값에 해당하는것만 가져옴
        console.log(name)
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5)
        //header에 cookie 값을 설정값과 함꼐 넣어줌.
        //302 response를 넣어주면 원하는 url로 redirect해줌 -> url은 header에 location에 넣어주면 됩니다.
        //cookie의 옵션중 expire은 만료시간. 
        //httpOnly는 자바스크립트 사용불가
        //path는 쿠키가 전송되리 특정 url
        res.writeHead(302, {
            Location: '/',
            "Set-Cookie": `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()};HttpOnly;Path=/`,
        })
        //end를 하게되면 url이 "/"인 곳으로 redirect합니다.
        res.end();
    } else if (cookies.name) {
        //cookie에 name값이 설정되어있음
        res.writeHead(200, {
            "Content-Type": `text/html;charset=utf-8`
        });
        res.end(`${cookies.name} hi!`)
    } 
    //첫 입장 할때
    else {
        //html파일을 읽어서 넘겨줌.
        fs.readFile("./server4.html", (err, data) => {
            if (err) {
                throw err;
            }
            res.end(data)
        })
    }
}).listen(8080, () => {
    console.log("server is ready")
})