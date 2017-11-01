const URL = `https://es.dump.academy/pixel-hunter/questions`;

const preloadImages = (sources, callback) => {
  let counter = 0;
  const onLoad = () => {
    counter++;
    if (counter === sources.length) {
      callback();
    }
  };
  sources.forEach((source) => {
    const img = document.createElement(`img`);
    img.onload = img.onerror = onLoad;
    img.src = source;
  });
};

class Loader {
  static loadData() {
    return fetch(URL).then((result) => result.json());
  }
}

export {Loader, preloadImages};
