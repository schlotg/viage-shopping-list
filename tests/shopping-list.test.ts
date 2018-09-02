import { ShoppingListService, Item } from '../src/services/shopping-list-service';
import { ShoppingList } from '../src/components/shopping-list';
import { createRouter } from 'viage';
import { item1, items, triggerClickEvent } from './common';

const consoleWarnMock = jest.spyOn(console, 'warn');
consoleWarnMock.mockImplementation(() => {});
const consoleErrorMock = jest.spyOn(console, 'error');
consoleErrorMock.mockImplementation(() => {});

test('ShoppingList should initialize correctly', () => {
  const mock = jest.spyOn(ShoppingListService, 'forEach');
  mock.mockImplementation((cb) => items.forEach(cb));
  const shoppingList = new ShoppingList();
  shoppingList.init();
  expect(shoppingList.e.innerHTML).toMatchSnapshot();
  const components = [];
  shoppingList.forEachComponents((component) => components.push(component));
  expect(components.length).toBe(2);
  mock.mockRestore();
});

test('Clear handler should call service.clear()', () => {
  const mock = jest.spyOn(ShoppingListService, 'clear');
  const shoppingList = new ShoppingList();
  shoppingList.init();
  const clear = shoppingList.e.querySelector('[attach=clear]') as HTMLElement;
  triggerClickEvent(clear);
  expect(mock).toBeCalled();
  mock.mockRestore();
});

test('Add handler should call router.go()', () => {
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const shoppingList = new ShoppingList();
  shoppingList.init();
  const add = shoppingList.e.querySelector('[attach=add]') as HTMLElement;
  const mock = jest.spyOn(router, 'go');
  const mock2 = jest.spyOn(router, 'createUrl');
  shoppingList.setRouter(router);
  triggerClickEvent(add);
  expect(mock).toBeCalled();
  mock.mockRestore();
  mock2.mockRestore();
});

test('Adding a item to the ShoppingListService should trigger an updateList() call', () => {
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const shoppingList = new ShoppingList();
  shoppingList.init();
  const mock = jest.spyOn(shoppingList, 'updateList');
  shoppingList.setRouter(router);
  ShoppingListService.addItem(item1);
  expect(mock).toBeCalled();
  mock.mockRestore();
});


