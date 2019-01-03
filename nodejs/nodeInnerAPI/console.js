const string="abcd";
const number=1;
const boolean=true;
const ojb={
    outside:
{
    inside:{
        "key":"value"
    }
}}
console.time("time")
console.log("just log")
console.log(string,number,boolean)
console.error("error log")

console.dir(ojb,{colors:false,depth:2})
console.dir(ojb,{colors:true,depth:1})

console.time("check time")

for(var i=0;i<100000;i++){
    continue;
}
console.timeEnd("end time")

function b(){
    console.trace("tracking err location")
}

function a(){
    b()
}

a()

console.timeEnd("all finish time")