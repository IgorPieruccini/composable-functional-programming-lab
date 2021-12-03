// Definition for Either(Right and Left)
// -------------------------------------
const Right = (x) => ({
  chain: (f) => f(x),
  ap: (other) => other.map(x),
  traverse: (of, f) => f(x).map(Right),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  ap: (other) => Left(x),
  traverse: (of, f) => of(Left(x)),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = (x) => (x !== null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const Either = {
  of: Right,
  tryCatch,
  fromNullable,
};
// -------------------------------------

const $ = (selector) => Either.of({ selector, height: 10 });

const getScreenSize = (screen) => (head) => (footer) => {
  return screen - head.height + footer.height;
};

const res = Either.of(getScreenSize(800)).ap($("header")).ap($("footer"));
console.log(
  "result",
  res.chain((x) => x)
);
