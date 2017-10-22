const main = document.querySelector(`main`);
const renderBlock = (blockElement) => {
  main.innerHTML = ``;
  main.appendChild(blockElement);
};

export default renderBlock;
