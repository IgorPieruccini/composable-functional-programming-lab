const Box = (arg) => ({
  map: (func) => Box(func(arg)),
  fold: (func) => func(arg),
});

const boxResult = Box("__igor__")
  .map((value) => value.replace(/_/g, ""))
  .map((value) => value.toUpperCase())
  .fold((res) => res);

console.log({ boxResult });

const LazyBox = (arg) => ({
  map: (func) => LazyBox(() => func(arg())),
  fold: (func) => func(arg()),
});
const boxLazyResult = LazyBox(() => "__igor__")
  .map((value) => value.replace(/_/g, ""))
  .map((value) => value.toUpperCase())
  .fold((res) => res);

console.log({ boxLazyResult });
