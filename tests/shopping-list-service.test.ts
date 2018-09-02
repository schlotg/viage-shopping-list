import { ShoppingListService, Item } from '../src/services/shopping-list-service';
import { item1 as item, item2, items } from './common';

test('Should instantiate the service', () => {
  expect(ShoppingListService).not.toBeNull();
});

test('Service should add item and save return item on getItem()', () => {
  ShoppingListService.clear();
  ShoppingListService.addItem(item);
  const returned_item = ShoppingListService.getItem(item._id);
  expect(item).toEqual(returned_item);
});

test('Service should clear items on clear()', () => {
  let returned_item = ShoppingListService.getItem(item._id);
  expect(item).toEqual(returned_item);
  ShoppingListService.clear();
  returned_item = ShoppingListService.getItem(item._id);
  expect(item).not.toEqual(returned_item);
});

test('Service should remove items on remove()', () => {
  ShoppingListService.clear();
  ShoppingListService.addItem(item);
  ShoppingListService.removeItem(item._id);
  const returned_item = ShoppingListService.getItem(item._id);
  expect(item).not.toEqual(returned_item);
});

test('Service forEach should iterate through all the items', () => {
  ShoppingListService.clear();
  ShoppingListService.addItem(item);
  ShoppingListService.addItem(item2);
  const returnItems = [];
  ShoppingListService.forEach((item: Item) => returnItems.push(item));
  expect(items).toEqual(returnItems);
});

test('Service should generate an unique id for every item added', () => {
  ShoppingListService.clear();
  ShoppingListService.addItem(item);
  ShoppingListService.addItem(item2);
  expect(item._id).toBeTruthy();
  expect(item2._id).toBeTruthy();
  expect(item._id).not.toEqual(item2._id);
});