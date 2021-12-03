const Box = (x) => ({
  chain: (f) => f(x),
  ap: (other) => other.map(x),
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: () => `Box(${x})`,
});

// take (x) => x + 1 and pass as the arg function of the seconds box
const res = Box((x) => x + 1).ap(Box(2));
console.log(
  "result1",
  res.chain((x) => x)
);

const res2 = Box((x) => (y) => x + y)
  .ap(Box(2))
  .ap(Box(3));
console.log(
  "result2",
  res2.chain((x) => x)
);
