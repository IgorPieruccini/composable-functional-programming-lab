import { compose } from "./compose";
import {
  addElementTo,
  addInnerHTML,
  addOnClick,
  addPlaceHolder,
  getElementById,
  getValueFrom,
} from "./utils";

let connection: IDBDatabase;
const request = window.indexedDB.open("app-name-db", 1);

request.onupgradeneeded = () => {
  const db = request.result;
  db.createObjectStore("names");
};

request.onsuccess = function (this: IDBRequest<IDBDatabase>) {
  connection = this.result;
};

request.onerror = (ev) => {};

export const addNameToDB = () => (name: string) => {
  const transaction = connection.transaction("names", "readwrite");
  const store = transaction.objectStore("names");
  const request = store.add(name, name);

  request.onerror = (e) => {
    console.log({ e });
  };

  request.onsuccess = (e) => {
    console.log({ e });
  };
};

const init = () => {
  const addName = compose(
    getElementById("name-input"),
    getValueFrom(),
    addNameToDB()
  );

  const createButton = compose(
    addElementTo("button"),
    addInnerHTML("Add name"),
    addOnClick(() => addName(null))
  );

  const createInput = compose(
    addElementTo("p"),
    addInnerHTML("name: "),
    addElementTo("input", "name-input"),
    addPlaceHolder("username")
  );

  createInput<HTMLInputElement>(document.body);
  createButton<HTMLButtonElement>(document.body);
};

init();
