import { compose } from "ramda";
import {
  addElement,
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
  init();
};

request.onerror = (ev) => {
  console.log({ ev });
};

const addNameToDB = () => (name: string) => {
  const transaction = connection.transaction("names", "readwrite");
  const store = transaction.objectStore("names");
  const request = store.add(name, name);

  request.onerror = (ev) => {
    console.log({ ev });
  };

  request.onsuccess = (ev) => {
    console.log({ ev });
  };
};

const listDB =
  <T>(storeName: string) =>
  () => {
    return new Promise((resolve, reject) => {
      const transaction = connection.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const cursor = store.openCursor();
      const values: T[] = [];
      cursor.onsuccess = (ev: Event) => {
        const val = cursor.result;
        if (val) {
          values.push(val.value);
          val.continue();
        } else {
          resolve(values);
        }
      };
      cursor.onerror = (ev: Event) => {
        console.log({ ev });
        reject(ev);
      };
    });
  };

const init = async () => {
  const createNameList = compose(listDB("names"));

  const addName = compose(
    addNameToDB(),
    getValueFrom(),
    getElementById("name-input")
  );

  const createButton = compose(
    addInnerHTML("Add name"),
    addOnClick(() => addName()),
    addElement("button")
  );

  const createInput = compose(
    addInnerHTML("name: "),
    addPlaceHolder("username"),
    addElement("input", "name-input")
  );

  createInput(document.body);
  createButton(document.body);
  const names = await createNameList();
  console.log(JSON.stringify(names));
};
