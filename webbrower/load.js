var hw=document.getElementById("sw")
    hw.addEventListener('click',function(){
        alert("hello world")
    })

    // window.onload는 webpage가 전부 read되고난 뒤에 해당내용을 실행함
    //head에 body내용이 들어갈경우 사용가능함
    window.onload=function(){
    var cw=document.getElementById("sw")
    cw.addEventListener('click',function(){
        alert("hello world")
    })
}