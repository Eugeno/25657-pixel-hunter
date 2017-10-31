const createElement = (markup) => {
  const el = document.createElement(`div`);
  el.innerHTML = markup;
  return el;
};

const main = document.querySelector(`main`);
const changeView = (view) => {
  main.innerHTML = ``;
  main.appendChild(view.element);
};

export {createElement, changeView};
