import renderBlock from './render-block';
import moduleIntro from './module_intro';
import getElementFromTemplate from './get-element';
import footerTemplate from './footer';

const main = document.querySelector(`main`);
const ready = () => {
  renderBlock(moduleIntro);
  main.appendChild(getElementFromTemplate(footerTemplate));
};

document.addEventListener(`DOMContentLoaded`, ready);
