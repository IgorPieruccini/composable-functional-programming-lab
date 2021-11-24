const fs = require("fs");

const Task = (func) => {
  const rej = (err) => err;
  const res = (result) => result;

  const LazyBox = (arg) => ({
    map: (func) => LazyBox(() => func(arg())),
    chain: (func) => func(arg()),
    fork: (error, success) => {
      try {
        return success(arg());
      } catch (e) {
        return error(e);
      }
    },
  });

  return LazyBox(() => func(rej, res));
};

const readFile = (fileName, encoding) => {
  return Task((rej, res) => {
    try {
      const content = fs.readFileSync(fileName, { encoding });
      return res(content);
    } catch (e) {
      return rej(e);
    }
  });
};

const writeFile = (fileName, content) => {
  return Task((rej, res) => {
    try {
      fs.writeFileSync(fileName, content);
      return res("successfully replaced the content");
    } catch (e) {
      return rej({ error: e });
    }
  });
};

const replaceFileContent = readFile("config.json", "utf-8")
  .map((content) => content.replace(/8/g, 6))
  .chain((content) => writeFile("config.json", content))
  .map((data) => data);

replaceFileContent.fork(
  (error) => {
    console.log({ error });
  },
  (result) => {
    console.log({ result });
  }
);
