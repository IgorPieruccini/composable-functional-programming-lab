export const addElement =
  (elementTag: keyof HTMLElementTagNameMap, id?: string) =>
  (element: HTMLElement) => {
    const _el = document.createElement(elementTag);
    if (id) _el.id = id;
    element.appendChild(_el);
    return _el;
  };

export const getElementById = (id: string) => () => {
  const element = document.getElementById(id);
  if (element) return element;
  throw "could not find element";
};

export const removeElement = () => (element: HTMLElement) => {
  console.log({ element });
  element.remove();
};

export const addInnerHTML = (val: string) => (element: HTMLElement) => {
  element.innerHTML = val;
  return element;
};

export const addOnClick = (func: Function) => (element: HTMLElement) => {
  element.onclick = () => func();
  return element;
};

export const addPlaceHolder = (val: string) => (element: HTMLElement) => {
  (element as HTMLInputElement).placeholder = val;
  return element;
};

export const getValueFrom = () => (element: HTMLElement) => {
  return (element as HTMLInputElement).value;
};
