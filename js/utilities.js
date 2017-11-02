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

const addIntroView = (view) => {
  view.element.classList.add(`intro-wrap`);
  main.appendChild(view.element);
};

const preloadImages = (sources) => {
  const images = [].concat(...sources.map((question) => question.data));
  const promises = images.map((image) => {
    return new Promise((resolve) => {
      const img = document.createElement(`img`);
      img.src = image.src;
      img.onload = img.onerror = () => resolve();
    });
  });
  return Promise.all(promises).then(() => sources);
};

export {createElement, changeView, addIntroView, preloadImages};
