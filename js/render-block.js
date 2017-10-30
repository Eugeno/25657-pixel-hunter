const main = document.querySelector(`main`);
const renderBlock = (view) => {
  main.innerHTML = ``;
  main.appendChild(view.element);
};

export default renderBlock;
