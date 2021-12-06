var request = window.indexedDB.open("link-db");

request.onupgradeneeded = (ev: Event) => {
  console.log("on upgrade needed");
  const db = request.result;
  const res = db.createObjectStore("igor");
  const t = res.add(
    {
      title: "igor",
      groupId: "default",
      url: "igor.url",
      userId: "igor",
    },
    "igor"
  );

  t.onsuccess = (ev: Event) => {
    console.log("on success t", { ev });
  };
};

request.onsuccess = (ev: Event) => {
  console.log("on success request", { ev });
  const db = request.result;
  const res = db.createObjectStore("link");
  const t = res.add(
    {
      title: "igor",
      groupId: "default",
      url: "igor.url",
      userId: "igor",
    },
    "igor"
  );
};

request.onerror = (ev) => {
  console.log("error", { ev });
};
