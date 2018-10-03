import polyfill from './polyfill';

const app = (window) => {
  const { document, Element } = window;
  if (!Element.prototype.closest) {
    Element.prototype.closest = polyfill;
  }
  function init() {
    document.documentElement.classList.add('togglr');
  }
  document.addEventListener('DOMContentLoaded', init);

  function ftogglr(event) {
    event.preventDefault();
    const { target } = event;
    const controlItem = target.closest('[data-toggl-target]');
    if (controlItem === null) {
      console.error('Error detected');
      return;
    }
    const selectorValue = controlItem.dataset.togglTarget;
    const selectorValueEl = document.querySelectorAll(selectorValue);
    const attributeToAction = {
      'data-togglr-toggle': () => {
        selectorValueEl.forEach((element) => {
          element.classList.toggle(controlItem.dataset.togglrToggle);
        });
      },
      'data-togglr-remove': () => {
        selectorValueEl.forEach((element) => {
          element.classList.remove(controlItem.dataset.togglrRemove);
        });
      },
      'data-togglr-add': () => {
        selectorValueEl.forEach((element) => {
          element.classList.add(controlItem.dataset.togglrAdd);
        });
      },
      'data-togglr-exclusive': () => {
        selectorValueEl.forEach((element) => {
          element.classList.add(controlItem.dataset.togglrExclusive);
          element.nextElementSibling.classList.remove(controlItem.dataset.togglrExclusive);
          element.previousElementSibling.classList.remove(controlItem.dataset.togglrExclusive);
        });
      },
      'data-togglr-exclusiveAdd': () => {
        selectorValueEl.forEach((element) => {
          element.classList.add(controlItem.dataset.togglrExclusiveadd);
          element.nextElementSibling.classList.add(controlItem.dataset.togglrExclusiveadd);
          element.previousElementSibling.classList.add(controlItem.dataset.togglrExclusiveadd);
        });
      },
    };
    const attributeOnELement = Object.keys(attributeToAction).find(attr => controlItem.hasAttribute(attr));
    if (attributeOnELement) { attributeToAction[attributeOnELement](); }
  }
  document.addEventListener('click', ftogglr);
};
export default app;
