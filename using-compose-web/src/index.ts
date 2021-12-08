import { ap, apply, compose, composeP, composeWith, forEach } from "ramda";
import {
  addElement,
  addInnerHTML,
  addOnClick,
  addPlaceHolder,
  getElementById,
  getValueFrom,
  removeElement,
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
  (): Promise<T[]> => {
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
  const createItemList = forEach((name: string) => {
    compose(
      addInnerHTML(name),
      addElement("li"),
      getElementById("name-list")
    )();
  });

  const removeItemList = compose(removeElement(), getElementById("name-list"));

  const createNameList = compose(
    listDB<string>("names"),
    addElement("ul", "name-list")
  );

  const addName = compose(
    addNameToDB(),
    getValueFrom(),
    getElementById("name-input")
  );

  const onCreate = async () => {
    addName();
    removeItemList();
    const names = await createNameList(document.body);
    createItemList(names);
  };

  const createButton = compose(
    addInnerHTML("Add name"),
    addOnClick(() => onCreate()),
    addElement("button")
  );

  const createInput = compose(
    addInnerHTML("name: "),
    addPlaceHolder("username"),
    addElement("input", "name-input")
  );

  const createInitialUI = (element: HTMLElement) =>
    ap([createInput, createButton], [element]);

  createInitialUI(document.body);
  const names = await createNameList(document.body);
  createItemList(names);
};
