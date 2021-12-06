import fs from "fs";
import { arrayToObject, compose } from "./compose";
import { Link, LinkState } from "./types";

const mock: LinkState = {
  jira: {
    url: "jira.url",
    title: "jira",
    groupId: "default",
    userId: "igor",
  },
  slack: {
    url: "slack.url",
    title: "slack",
    groupId: "default",
    userId: "anika",
  },
  aws: {
    url: "aws.url",
    title: "aws",
    groupId: "work",
    userId: "igor",
  },
};

const allLinksFormUser = (user: string) => (list: Array<Link>) =>
  list.filter((obj) => obj.userId === user);

const allLinksFromGroup = (group: string) => (list: Array<Link>) =>
  list.filter((obj) => obj.groupId === group);

const addLinkToState = (link: Link) => (state: LinkState) => ({
  ...state,
  [link.title]: link,
});

const saveLinkToFile = (path: string) => (data: LinkState) => {
  fs.writeFileSync(path, JSON.stringify(data));
  return data;
};

const readLinkFromFile = (path: string) => () => {
  return JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
};

const allUserLinksFromGroup = compose(
  allLinksFormUser("igor"),
  allLinksFromGroup("work"),
  arrayToObject("title")
);

const result = allUserLinksFromGroup<LinkState>(Object.values(mock));
console.log({ result });

const removeLinkFromState = (title: string) => (state: LinkState) => {
  return Object.values(state).filter((link) => link.title !== title);
};

const saveNewLink = compose(
  readLinkFromFile("db.json"),
  addLinkToState({
    title: "anika",
    groupId: "default",
    url: "anika.url",
    userId: "anika",
  }),
  saveLinkToFile("db.json")
);

const removeLink = compose(
  readLinkFromFile("db.json"),
  removeLinkFromState("test"),
  arrayToObject("title"),
  saveLinkToFile("db.json")
);

saveNewLink(null);
removeLink(null);
