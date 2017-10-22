import { currentState } from './data'

const main = document.querySelector(`main`);
const renderBlock = (blockElement) => {
  main.innerHTML = ``;
  main.appendChild(blockElement);
  console.log(currentState);
};

export default renderBlock;
