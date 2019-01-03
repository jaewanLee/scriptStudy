const {
    odd,
    event
} = require("./var.js");
const checkNumber = require("./func.js");

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return event;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"))