const URL = `https://es.dump.academy/pixel-hunter/`;

class Loader {
  static loadData() {
    return fetch(`${URL}questions`).then((result) => result.json());
  }

  static loadResults(name) {
    return fetch(`${URL}stats/${name}`).then((result) => result.json());
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${URL}stats/${data.name}`, requestSettings);
  }
}

export default Loader;
