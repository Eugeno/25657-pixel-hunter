const getElementFromTemplate = (markup) => {
  const el = document.createElement(`div`);
  el.innerHTML = markup;
  return el;
};
export default getElementFromTemplate;
