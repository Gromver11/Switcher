import polyfill from './polyfill';

const app = (window) => {
  const { document, Element } = window;
  if (!Element.prototype.closest) {
    Element.prototype.closest = polyfill;
  }
  function init() {
    document.documentElement.classList.add('togglr');
  }
  window.addEventListener('DOMContentloaded', init);

  function ftogglr(event) {
    const { target } = event;
    const controlItem = target.closest('[data-toggl-target]');
    if (controlItem === null) {
      console.error('Error detected');
      return;
    }
    const selectorValue = controlItem.dataset.togglTarget;
    const selectorValueEl = document.querySelectorAll(selectorValue);
    if (controlItem.hasAttribute('data-togglr-toggle')) {
      const toggleClassValue = controlItem.dataset.togglrToggle;
      selectorValueEl.forEach((element) => {
        element.classList.toggle(toggleClassValue);
      });
    } else if (controlItem.hasAttribute('data-togglr-add')) {
      const addClassValue = controlItem.dataset.togglrAdd;
      selectorValueEl.forEach((element) => {
        element.classList.add(addClassValue);
      });
    } else if (controlItem.hasAttribute('data-togglr-remove')) {
      const removeClassValue = controlItem.dataset.togglrRemove;
      selectorValueEl.forEach((element) => {
        element.classList.remove(removeClassValue);
      });
    } else if (controlItem.hasAttribute('data-togglr-exclusive')) {
      const exclusiveValue = controlItem.dataset.togglrExclusive;
      selectorValueEl.forEach((element) => {
        element.classList.add(exclusiveValue);
        element.nextElementSibling.classList.remove(exclusiveValue);
        element.previousElementSibling.classList.remove(exclusiveValue);
      });
    } else if (controlItem.hasAttribute('data-togglr-exclusiveAdd')) {
      const exclusiveAddValue = controlItem.dataset.togglrExclusiveadd;
      selectorValueEl.forEach((element) => {
        element.classList.add(exclusiveAddValue);
        element.nextElementSibling.classList.add(exclusiveAddValue);
        element.previousElementSibling.classList.add(exclusiveAddValue);
      });
    } else if (controlItem.hasAttribute('data-prevent-default')) {
      event.preventDefault();
    }
  }
  document.addEventListener('click', ftogglr);
};
export default app;
