// semi-group
const Sum = (x) => ({
  concat: (n) => Sum(n + x),
  fold: () => x,
});

// semi-group
const Reduce = (x) => ({
  concat: (n) => Reduce(n + x),
  fold: () => x,
});

const result = Sum(10).concat(2).concat(2).fold();
console.log({ result });

// this is a monoid
Sum.empty = () => Sum(0);

const List = {
  result: [],
  of: function (array) {
    List.result = array;
    return this;
  },
  fold: function (initialValue) {
    const list = List.foldMap(initialValue);
    return list;
  },
  foldMap: function (initialValue) {
    return List.result.reduce((acc, cur) => {
      return acc.concat(cur.fold());
    }, initialValue);
  },
};

const result3 = List.of([Sum(3), Sum(3)])
  .fold(Sum.empty())
  .fold();

console.log({ result3 });

const result4 = List.of([Sum(3), Reduce(2)])
  .fold(Sum.empty())
  .fold();

console.log({ result4 });
