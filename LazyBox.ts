export const LazyBox = <Response>(arg: () => Response) => ({
  map: <MapResponse>(func: (a: Response) => MapResponse) =>
    LazyBox(() => func(arg())),

  chain: <ChainResponse>(func: (a: Response) => ChainResponse) => func(arg()),

  fork: <Reject>(
    error: (arg: Reject) => void,
    success: (res: Response) => void
  ) => {
    try {
      return success(arg());
    } catch (e) {
      return error(e as Reject);
    }
  },
});
