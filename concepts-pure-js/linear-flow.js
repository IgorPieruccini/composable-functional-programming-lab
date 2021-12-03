// to create a linear flow the function has to receive a value and return an object
// that contains function parameters that return the method it self
const Box = (arg) => ({
  map: (f) => Box(f(arg)),
  finally: (f) => f(arg),
});

const result = Box(" Igor ")
  .map((str) => str.trim())
  .map((str) => str.toUpperCase())
  .finally((res) => res);

console.log(result);

// map does not necessary need to be a use map to loop over stuff it has more todo with a composition within a context
// in this case Box is the context (container types; compose different behaviour)

// another example
const moneyToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\$/g, ""))
    .map((res) => res);

const percentToFloat = (str) =>
  Box(str)
    .map((str) => str.replace(/\%/g, ""))
    .map((str) => parseFloat(str))
    .map((n) => n * 0.01);

const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .map((cost) =>
      percentToFloat(discount).finally((savings) => cost - cost * savings)
    )
    .finally((res) => res);

console.log(applyDiscount("$40", "10%"));
