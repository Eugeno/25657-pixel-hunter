import renderBlock from './render-block';
import moduleIntro from './module_intro';

const ready = () => renderBlock(moduleIntro, `hasFooter`);

document.addEventListener(`DOMContentLoaded`, ready);
