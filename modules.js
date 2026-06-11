const math = require('./math.js')
// we can destructure it like below ⤵️
// const {add,sub} = require('./math.js')

// console.log(math);  // {}   // kyuki abhi math.js me function export nhi kia hai
console.log(math.add(2,5));  // 7
console.log(math.sub(5,2));  // 3

