class AbstractView {
  get template() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    const el = document.createElement(`div`);
    el.innerHTML = this.template;
    return el;
  }

  bind() {

  }
}

export default AbstractView;
