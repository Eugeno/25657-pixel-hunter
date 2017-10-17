import footerTemplate from './footer';
import headerTemplate from './header';
import moduleIntro from './module_intro';

const main = document.querySelector(`main`);
const renderBlock = (blockElement, hasFooter, hasHeader) => {
  main.innerHTML = ``;
  if (hasHeader) {
    main.appendChild(headerTemplate);
    headerTemplate.querySelector(`.back`).addEventListener(`click`, () => renderBlock(moduleIntro, `hasFooter`));
  }
  main.appendChild(blockElement);
  if (hasFooter) {
    main.appendChild(footerTemplate);
  }
};

export default renderBlock;
