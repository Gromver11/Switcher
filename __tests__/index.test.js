import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

const app = require('../src/index');

const createWindowWith = (body) =>
  new JSDOM(`<!DOCTYPE html><html><body>${body}</body></html>`).window;

describe('app', () => {
  it('При клике на элемент добавляется класс на указанный блок', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block' data-togglr-add='active-block'>click me</button><div class='block'>my block</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    expect(block.classList.contains('active-block')).toBe(true);
  });
  it('При клике на элемент удаляется класс с указанного блока', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block' data-togglr-remove='active-block'>click me</button><div class='block active-block'>my block</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    expect(block.classList.contains('active-block')).toBe(false);
  });
  it('Находим манипулирующий элелемент снаружи кликнутого', () => {
    const window = createWindowWith(
      "<button data-toggl-target='.block' data-togglr-remove='active-block'><span>click me</span></button><div class='block active-block'>my block</div>"
    );
    app(window);
    const span = window.document.querySelector('span');
    span.click();
    const btn = window.document.querySelector('button');
    expect(btn.hasAttribute('data-toggl-target')).toBe(true);
  });
  it('При клике на элемент переключается класс у указанного блока', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block' data-togglr-toggle='active-block'>click me</button><div class='block'>my block</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    expect(block.classList.contains('active-block')).toBe(true);
    btn.click();
    expect(block.classList.contains('active-block')).toBe(false);
  });
  it('При клике на манипулирующий элемент переключает класс у целевого и удаляет этот класс у соседних элементов', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block' data-togglr-exclusive='color'>click me</button><div class='color another-block'>hello</div><div class='block'>my block</div><div class='color other-block'>World</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    const fblock = window.document.querySelector('.other-block');
    const sblock = window.document.querySelector('.another-block');
    expect(block.classList.contains('color')).toBe(true);
    expect(fblock.classList.contains('color')).toBe(false);
    expect(sblock.classList.contains('color')).toBe(false);
  });
  it('При клике на манипулирующий элемент добавляет класс на целевой элемент и удаляет этот класс у соседних элементов', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block' data-togglr-exclusiveAdd='color'>click me</button><div class='another-block color'>hello</div><div class='block'>my block</div><div class='other-block color'>World</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    const fblock = window.document.querySelector('.other-block');
    const sblock = window.document.querySelector('.another-block');
    expect(block.classList.contains('color')).toBe(true);
    expect(fblock.classList.contains('color')).toBe(false);
    expect(sblock.classList.contains('color')).toBe(false);
  });
  it('Проверка успешной инициализации', () => {
    app(window);
    const dcl = window.document.createEvent('Event');
    dcl.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(dcl);
    expect(window.document.documentElement.classList.contains('togglr')).toBe(
      true
    );
  });
  it('Проверка срабатывания класса по умолчанию', () => {
    const window = createWindowWith(
      "<button data-togglr-target='.block'>click me</button><div class='block'>my block</div>"
    );
    app(window);
    const btn = window.document.querySelector('button');
    btn.click();
    const block = window.document.querySelector('.block');
    expect(block.classList.contains('IsActive')).toBe(true);
  });
});
