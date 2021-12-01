const add = (x) => (y) => y + x;

const inc = add(1);

console.log(inc(2));

const modulo = (drv, dvd) => drv & dvd;
console.log("non-modular", modulo(4, 2));

const moduleFunc = (drv) => (dvd) => dvd % drv;

const isOdd = moduleFunc(2);

console.log(isOdd(2)); // false 0
console.log(isOdd(3)); // true 1

const filter = (method) => (values) => values.filter(method);

const getAllOdds = filter(isOdd);
console.log(getAllOdds([1, 2, 3]));

const replace = (regex) => (replace) => (str) => str.replace(regex, replace);
const censor = replace(/[aeiou]/gi)(" ");

console.log(censor("igor pieruccini"));
