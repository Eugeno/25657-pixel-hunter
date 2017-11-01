const URL = `https://es.dump.academy/pixel-hunter/questions`;

class Loader {
  static loadData() {
    return fetch(URL).then((result) => result.json());
  }
}

export default Loader;
