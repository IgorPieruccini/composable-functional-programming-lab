// pure functional error handling, code branching, null checks

const FuncSuccess = (arg) => ({
  map: (func) => FuncSuccess(func(arg)),
  finally: (_, RightFunc) => RightFunc(arg),
});

const FuncError = (arg) => ({
  map: (func) => FuncError(arg), // skips the function call
  finally: (leftFunc, _) => leftFunc(arg),
});

const findColor = (name) => {
  const found = { black: "#black", green: "#green", blue: "#blue" }[name];
  return found ? FuncSuccess(found) : FuncError("color could not be found");
};

const result = findColor("red")
  .map((name) => name.slice(1))
  .map((name) => name.toUpperCase())
  .finally(
    (error) => ({ error }),
    (result) => result
  );

console.log(result);
