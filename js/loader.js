const URL = `https://es.dump.academy/pixel-hunter/questions`;

const preloadImages = (sources) => {
  return new Promise((resolve) => {
    const images = sources.map((question) => question.data.map((image) => image.src).join()).join().split(`,`);
    const promises = images.map((src) => {
      return new Promise((resolve2) => {
        const img = document.createElement(`img`);
        img.src = src;
        img.onload = img.onerror = () => resolve2();
      });
    });
    Promise.all(promises).then(() => resolve(sources));
  });
};

class Loader {
  static loadData() {
    return fetch(URL).then((result) => result.json());
  }
}

export {Loader, preloadImages};
