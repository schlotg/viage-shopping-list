import { App } from '../src/components/app';
import { ShoppingListService, Item } from '../src/services/shopping-list-service';
import { destroyRouter } from 'viage';
import { item1, item2, triggerClickEvent } from './common';

// create a functional test for each different router view
test('App should initialize in the home state and match the snapshot', () => {
  // initialize the data
  ShoppingListService.addItem(item1);
  ShoppingListService.addItem(item2);
  // create a new App
  const app = new App();
  expect(app.e.innerHTML).toMatchSnapshot();
  destroyRouter('main');
  location.href = '';
  ShoppingListService.clear();
});

test('App should go to add state and match the snapshot', () => {
  // initialize the data
  ShoppingListService.addItem(item1);
  ShoppingListService.addItem(item2);
  // create a new App
  const app = new App();
  // trigger add
  triggerClickEvent(app.e.querySelector('[attach=add]'));
  expect(app.e.innerHTML).toMatchSnapshot();
  destroyRouter('main');
  location.href = '';
  ShoppingListService.clear();
});

test('App should go to edit state and match the snapshot', () => {
  // initialize the data
  ShoppingListService.addItem(item1);
  ShoppingListService.addItem(item2);
  // create a new App
  const app = new App();
  // trigger edit
  triggerClickEvent(app.e.querySelector('[attach=edit]'));
  expect(app.e.innerHTML).toMatchSnapshot();
  destroyRouter('main');
  location.href = '';
  ShoppingListService.clear();
});

