const URL = `https://es.dump.academy/pixel-hunter/questions`;

const preloadImages = (sources) => {
  const images = [].concat(...sources.map((question) => question.data.map((image) => image.src)));
  const promises = images.map((src) => {
    return new Promise((resolve) => {
      const img = document.createElement(`img`);
      img.src = src;
      img.onload = img.onerror = () => resolve();
    });
  });
  return Promise.all(promises).then(() => sources);
};

class Loader {
  static loadData() {
    return fetch(URL).then((result) => result.json());
  }
}

export {Loader, preloadImages};
