const {
    odd,
    even
} = require("./var")

function checkOddOreven(num) {
    if (num % 2)
        return odd;
    else
        return even;
}
module.exports = checkOddOreven;