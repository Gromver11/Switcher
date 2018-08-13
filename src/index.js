const app = window => {

  const Element = window.Element;
  if (!Element.prototype.closest) {

    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
  const document = window.document;

  window.addEventListener("load", init);
  function init() {
    document.documentElement.classList.add("togglr");
  }
  document.addEventListener("click", ftogglr);

  function ftogglr(event) {
    const target = event.target;
    const toggleClass = target.closest("[data-togglr-toggle]");
    const selector = target.closest("[data-toggl-target]");
    const selectorValue = selector.dataset.togglTarget;
    const addClass = target.closest("[data-togglr-add]");
    const removeClass = target.closest("[data-togglr-remove]");
    const selectorValueEl = document.querySelectorAll(selectorValue);
    const exclusive = target.closest("[data-togglr-exclusive]");
    const exclusiveAdd = target.closest("[data-togglr-exclusiveAdd]");

    if (toggleClass !== null) {
      const toggleClassValue = toggleClass.dataset.togglrToggle;
      selectorValueEl.forEach(function (element) {
        element.classList.toggle(toggleClassValue);
      })
    }
    else if (addClass !== null) {
      const addClassValue = addClass.dataset.togglrAdd;
      selectorValueEl.forEach(function (element) {
        element.classList.add(addClassValue);
      })
    }
    else if (removeClass !== null) {
      const removeClassValue = removeClass.dataset.togglrRemove;
      selectorValueEl.forEach(function (element) {
        element.classList.remove(removeClassValue);
      })
    }
    else if (exclusive !== null) {
      const exclusiveValue = exclusive.dataset.togglrExclusive;
      selectorValueEl.forEach(function (element) {
        element.classList.add(exclusiveValue);
        element.nextElementSibling.classList.remove(exclusiveValue);
        element.previousElementSibling.classList.remove(exclusiveValue);
      })

    }

    else if (exclusiveAdd !== null) {
      const exclusiveAddValue = exclusiveAdd.dataset.togglrExclusiveadd;
      selectorValueEl.forEach(function (element) {
        element.classList.add(exclusiveAddValue);
        element.nextElementSibling.classList.add(exclusiveAddValue);
        element.previousElementSibling.classList.add(exclusiveAddValue);
      })
    }
    else {
      console.log("Togglr does not work!")
    }
  };
};
//Переменные окружения

if (process.env.BROWSER) {
  app(window);
}

module.exports = app;





