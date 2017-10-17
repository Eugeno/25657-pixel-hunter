import footerTemplate from './footer';

const main = document.querySelector(`main`);
const renderBlock = (blockElement, hasFooter) => {
  main.innerHTML = ``;
  main.appendChild(blockElement);
  if (hasFooter) {
    main.appendChild(footerTemplate);
  }
};

export default renderBlock;
