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

async function preloadImages(sources) {
  const images = [].concat(...sources.map((question) => question.data));
  const promises = images.map((image) => {
    return new Promise((resolve) => {
      const img = document.createElement(`img`);
      img.src = image.src;
      img.onload = img.onerror = () => resolve();
    });
  });
  await Promise.all(promises);
  return sources;
}

export {createElement, changeView, preloadImages};
