import { ShoppingListAdd } from '../src/components/shopping-list-add';
import { Item, ShoppingListService } from '../src/services/shopping-list-service';
import { createRouter, destroyRouter } from 'viage';
import { item, triggerClickEvent } from './common';

test('ShoppingListAdd should initialize in add mode correctly', () => {
  const add = new ShoppingListAdd();
  const mock = jest.spyOn(add, 'updateItem');
  add.init({ id: '' });
  expect(add.e.innerHTML).toMatchSnapshot();
  expect(add.e.querySelector('h3').textContent).toEqual('Add Item');
  expect(mock).not.toBeCalled();
  mock.mockRestore()
});

test('ShoppingListAdd should initialize in edit mode correctly', () => {
  const add = new ShoppingListAdd();
  const mock = jest.spyOn(add, 'updateItem');
  const mock2 = jest.spyOn(ShoppingListService, 'getItem');
  mock2.mockImplementation(() => item);
  add.init({ id: '5' });
  expect(add.e.innerHTML).toMatchSnapshot();
  expect(add.e.querySelector('h3').textContent).toEqual('Edit');
  expect(mock).toBeCalled();
  mock.mockRestore();
  mock2.mockRestore();
});

test('back event listener should trigger router.back()', () => {
  const add = new ShoppingListAdd();
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const mock = jest.spyOn(router, 'back');
  add.setRouter(router);
  add.init({ id: '' });
  triggerClickEvent(add.e.querySelector('[attach=back]'));
  expect(mock).toBeCalled();
  mock.mockRestore();
  destroyRouter('test');
});

test('Save click handler in add mode should call ShoppingListService.addItem() and call router.go()', () => {
  const add = new ShoppingListAdd();
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const goMock = jest.spyOn(router, 'go');
  const addItemMock = jest.spyOn(ShoppingListService, 'addItem');
  let savedItem: Item;
  addItemMock.mockImplementation((item: Item) => savedItem = item);
  add.setRouter(router);
  add.init({ id: '' });

  // add input data
  for(let k in item) {
    const e = add.e.querySelector(`[attach=${k}]`) as HTMLInputElement;
    if (e) { e.value = item[k]; }
  }

  triggerClickEvent(add.e.querySelector('[attach=save]'));
  expect(addItemMock).toBeCalled();
  expect(goMock).toBeCalled();
  expect(savedItem).toEqual(item);
  goMock.mockRestore();
  addItemMock.mockRestore();
});

test('Save click handler in edit mode should call ShoppingListService.getItem() and then ShoppingListService.save()', () => {
  const add = new ShoppingListAdd();
  const router = createRouter('test', document.createElement('div'), 'LOCATION' );
  const goMock = jest.spyOn(router, 'go');
  ShoppingListService.addItem(item);
  const saveMock = jest.spyOn(ShoppingListService, 'save');
  add.setRouter(router);
  add.init({ id: item._id });

  const modifedItem: any = { name:'Eggs',  description: 'Free Range', quantity: 12 };

  // add input data
  for(let k in modifedItem) {
    const e = add.e.querySelector(`[attach=${k}]`) as HTMLInputElement;
    if (e) { e.value = modifedItem[k]; }
  }

  modifedItem.purchased = false;
  modifedItem._id = item._id;

  triggerClickEvent(add.e.querySelector('[attach=save]'));
  expect(saveMock).toBeCalled();
  expect(goMock).toBeCalled();
  expect(modifedItem).toEqual(ShoppingListService.getItem(modifedItem._id));
  goMock.mockRestore();
  saveMock.mockRestore();
});
