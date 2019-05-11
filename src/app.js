import closestForIe from './polyfills/closest';
import './polyfills/matches';
import './polyfills/forEach';
import './polyfills/Find';
import removeClassfromSiblings from './removeClassfromSiblings';

const app = (window) => {
  const { document, Element } = window;
  if (!Element.prototype.closest) {
    Element.prototype.closest = closestForIe;
  }
  function init() {
    document.documentElement.classList.add('togglr');
  }
  document.addEventListener('DOMContentLoaded', init);

  function switcher(event) {
    event.preventDefault();
    const { target } = event;
    const controlItem = target.closest('[data-togglr-target]');
    if (controlItem === null) {
      console.error('Error detected');
      return;
    }
    const selectorValue = controlItem.getAttribute('data-togglr-target');
    const selectorValueEl = document.querySelectorAll(selectorValue);
    const defClass = 'IsActive';
    const attributeToAction = {
      'data-togglr-toggle': () => {
        selectorValueEl.forEach((element) => {
          element.classList.toggle(controlItem.getAttribute('data-togglr-toggle'));
        });
      },
      'data-togglr-remove': () => {
        selectorValueEl.forEach((element) => {
          element.classList.remove(controlItem.getAttribute('data-togglr-remove'));
        });
      },
      'data-togglr-add': () => {
        selectorValueEl.forEach((element) => {
          element.classList.add(controlItem.getAttribute('data-togglr-add'));
        });
      },
      'data-togglr-exclusive': () => {
        selectorValueEl.forEach((element) => {
          removeClassfromSiblings(element, controlItem.getAttribute('data-togglr-exclusive'));
          element.classList.toggle(controlItem.getAttribute('data-togglr-exclusive'));
        });
      },
      'data-togglr-exclusiveAdd': () => {
        selectorValueEl.forEach((element) => {
          removeClassfromSiblings(element, controlItem.getAttribute('data-togglr-exclusiveAdd'));
          element.classList.add(controlItem.getAttribute('data-togglr-exclusiveAdd'));
        });
      },
      default: () => {
        selectorValueEl.forEach((element) => {
          element.classList.toggle(defClass);
        });
      },
    };
    const attributeOnELement = Object.keys(attributeToAction).find(attr => controlItem.hasAttribute(attr));
    if (attributeOnELement) { attributeToAction[attributeOnELement](); } else {
      attributeToAction.default();
    }
  }
  document.addEventListener('click', switcher);
};
export default app;
