const URL = `https://es.dump.academy/pixel-hunter/`;
const DEFAULT_NAME = `123`;

class Loader {
  static loadData() {
    return fetch(`${URL}questions`).then((result) => result.json());
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${URL}stats/${name}`).then((result) => result.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}stats/${name}`, requestSettings);
  }
}

export default Loader;
