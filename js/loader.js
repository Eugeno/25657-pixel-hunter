const URL = `https://es.dump.academy/pixel-hunter/`;

class Loader {
  static async loadData() {
    const response = await fetch(`${URL}questions`);
    return response.json();
  }

  static async loadResults(name) {
    const response = await fetch(`${URL}stats/${name}`);
    return response.json();
  }

  static async saveResults(data) {
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
