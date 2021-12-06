export const addElementTo =
  (elementTag: keyof HTMLElementTagNameMap, id?: string) =>
  (element: HTMLElement) => {
    const _el = document.createElement(elementTag);
    if (id) _el.id = id;
    element.appendChild(_el);
    return _el;
  };

export const getElementById = (id: string) => () => {
  return document.getElementById(id);
};

export const addInnerHTML = (val: string) => (element: HTMLElement) => {
  element.innerHTML = val;
  return element;
};

export const addOnClick = (func: Function) => (element: HTMLElement) => {
  element.onclick = () => func();
  return element;
};

export const addPlaceHolder = (val: string) => (element: HTMLInputElement) => {
  element.placeholder = val;
  return element;
};

export const getValueFrom = () => (element: HTMLInputElement) => {
  return element.value;
};
