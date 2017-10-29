import getElementFromTemplate from './get-element';

class AbstractView {
  get template() {
    throw new Error(`There are no template for view`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }
}

export default AbstractView;
