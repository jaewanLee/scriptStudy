module.exports = (arr, c) -> "[ #{(c.compileNode(a) for a in arr).join ', '} ]"
