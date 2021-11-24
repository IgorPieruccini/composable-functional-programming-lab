const fs = require("fs");

const Success = (arg) => ({
  chain: (func) => func(arg),
  map: (func) => Success(func(arg)),
  finally: (error, result) => result(arg),
});

const Failure = (arg) => ({
  chain: (func) => Failure(arg),
  map: (func) => Failure(arg),
  finally: (error, result) => error(arg),
});

const TryCatch = (func) => {
  try {
    return Success(func());
  } catch (e) {
    return Failure(e);
  }
};

const getPort = () =>
  TryCatch(() => fs.readFileSync("config.json"))
    .chain((data) => TryCatch(() => JSON.parse(data)))
    .finally(
      (error) => ({
        error,
      }),
      (result) => result
    );

console.log(getPort());
