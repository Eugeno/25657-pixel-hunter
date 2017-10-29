const renderBlock = (blockElement) => {
  const main = document.querySelector(`main`);
  main.innerHTML = ``;
  main.appendChild(blockElement);
};

export default renderBlock;
