const { JSDOM } = require("jsdom");

const app = require("../src/index.js");
const createWindowWith = body => {
  return new JSDOM(`<!DOCTYPE html><body>fuck<div>${body}</body></div>`).window;
};

describe("app", () => {
  it("При клике на элемент добавляется класс на указанный блок", () => {
    const window = createWindowWith(
      "<button data-toggl-target='.block' data-togglr-add='active-block'>click me</button><div class='block'>kill</div>"
    );
    app(window);
    const btn = window.document.querySelector("button");
    btn.click();
    const block = window.document.querySelector(".block");
    expect(block.classList.contains("active-block")).toBe(true);
  });
  it("При клике на элемен удаляется класс с указанного блока", () => {
    const window = createWindowWith(
      "<button data-toggl-target='.block' data-togglr-remove='active-block'>click me</button><div class='block active-block'>kill</div>"
    );
    app(window);
    const btn = window.document.querySelector("button");
    btn.click();
    const block = window.document.querySelector(".block");
    expect(block.classList.contains("active-block")).toBe(false);
  });
  it("Находим манипулирующий элелемент снаружи кликнутого", () => {
    const window = createWindowWith(
      "<button data-toggl-target='.block' data-togglr-remove='active-block'><span>click me</span></button><div class='block active-block'>kill</div>"
    );
    app(window);
    const span = window.document.querySelector("span");
    span.click();
    const btn = span.closest("button");
    expect(btn.hasAttribute("data-toggl-target")).toBe(true);
  });
});

