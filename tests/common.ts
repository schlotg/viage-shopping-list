
import { Item } from '../src/services/shopping-list-service';
export const item: Item = { name: 'Dog Food', description: '30 lb bag', quantity: 1, purchased: false };
export const item1: Item = { name: 'Dog Food', description: '30 lb bag', quantity: 1, purchased: false, _id: '5' };
export const item2: Item = { name: 'Foo Bars', description: '1 Box', quantity: 12, purchased: false, _id: '6' };
export const items = [item1, item2];

export function triggerClickEvent(e: HTMLElement){
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  e.dispatchEvent(event);
}

// give the doc a title
document.title = 'test';

// suppress warns and errors during testing
const consoleWarnMock = jest.spyOn(console, 'warn');
consoleWarnMock.mockImplementation(() => {});
const consoleErrorMock = jest.spyOn(console, 'error');
consoleErrorMock.mockImplementation(() => {});
