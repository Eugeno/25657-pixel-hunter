import renderBlock from './render-block';
import moduleIntro from './module_intro';

const ready = () => renderBlock(moduleIntro);

document.addEventListener(`DOMContentLoaded`, ready);
