const URL = `https://es.dump.academy/pixel-hunter/questions`;

const preloadImages = (sources) => {
  return new Promise((resolve) => {
    let counter = 0;
    let total = 0;
    const onLoad = () => {
      counter++;
      if (counter === total) {
        resolve(sources);
      }
    };
    sources.forEach((question) => {
      total += question.data.length;
      question.data.forEach((image) => {
        const img = document.createElement(`img`);
        img.onload = img.onerror = onLoad;
        img.src = image.src;
      });
    });
  });
};

class Loader {
  static loadData() {
    return fetch(URL).then((result) => result.json());
  }
}

export {Loader, preloadImages};
