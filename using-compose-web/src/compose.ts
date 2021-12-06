export function compose(...args: Function[]) {
  return <Result>(arg: any): Result => {
    let result = arg;
    args.forEach((func) => {
      result = func(result);
    });
    return result;
  };
}

export const log = () => (value: any) => {
  console.log(value);
  return value;
};

type ArrayOfObject<T> = Array<T>;
type Object<C> = Record<string, C & string>;

export const arrayToObject =
  <T extends Object<T>>(key: string) =>
  (list: ArrayOfObject<T>): Object<T> =>
    list.reduce((acc, cur) => ({ ...acc, [cur[key]]: cur }), {});
