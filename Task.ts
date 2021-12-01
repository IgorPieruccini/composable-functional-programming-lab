import { LazyBox } from "./LazyBox";

type TaskFunctionProps = (
  rej: <Reject>(arg: Reject) => ReturnType<typeof LazyBox>,
  res: <TResponse>(arg: TResponse) => ReturnType<typeof LazyBox>
) => ReturnType<typeof LazyBox>;

const Task = (func: TaskFunctionProps) => {
  const rej = <Reject>(err: Reject) => LazyBox(() => err);
  const res = <TResponse>(result: TResponse) => LazyBox(() => result);

  return func(rej, res);
};

const someTask = Task((reject, response) => {
  return response("test");
});

someTask
  .map((value) => value.length > 3)
  .map((t) => t)
  .fork(
    (error) => {
      console.log(error);
    },
    (result) => {
      console.log(result);
    }
  );
