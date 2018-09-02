import { Item, ShoppingListService } from '../src/services/shopping-list-service';
import { ShoppingListElement } from '../src/components/shopping-list-element';
import { createRouter, destroyRouter } from 'viage';
import { item1 as item, triggerClickEvent } from './common';

test('Shopping List Element should initialize correctly with test data', () => {
  const sle = new ShoppingListElement();
  sle.init(item);
  const html = sle.e.innerHTML;
  expect(html).toMatchSnapshot();
});

test('Shopping List Element delete handler should work', () => {
  const sle = new ShoppingListElement();
  sle.init(item);
  const mock = jest.spyOn(ShoppingListService, 'removeItem');
  const deleteElement = sle.e.querySelector('[attach=delete]') as HTMLElement;
  triggerClickEvent(deleteElement);
  expect(mock).toBeCalled();
  mock.mockRestore();
});

test('Shopping List Element edit handler should work', () => {
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const sle = new ShoppingListElement();
  sle.init(item);
  const mock = jest.spyOn(router, 'go');
  const mock2 = jest.spyOn(router, 'createUrl');
  sle.setRouter(router);
  const editElement = sle.e.querySelector('[attach=edit]') as HTMLElement;
  triggerClickEvent(editElement);
  expect(mock).toBeCalled();
  mock.mockRestore();
  mock2.mockRestore();
  destroyRouter('test');
});

test('Shopping List Element enabled handler should work', () => {
  const sle = new ShoppingListElement();
  sle.init(item);
  const mock = jest.spyOn(ShoppingListService, 'save');
  const element = sle.e.querySelector('[attach=enabled]') as HTMLInputElement;
  triggerClickEvent(element);
  expect(mock).toBeCalled();
  expect(element.checked).toBe(true);
  mock.mockRestore();
});
