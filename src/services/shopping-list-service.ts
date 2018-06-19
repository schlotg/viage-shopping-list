import { Service } from 'viage';

export interface Item {
  name: string;
  description: string;
  quantity: number;
  enabled: boolean;
  _id?: string; // added by the service
}

class ShoppingListService extends Service {

  private list: Item[] = [];
  private count = 0;

  private generateId() {
    this.count += 1;
    return this.count.toString(16);
  }

  constructor() {
    super();
    if (window.localStorage) {
      const json = window.localStorage.getItem('ShoppingList');
      if (json) {
        const obj = JSON.parse(json) || {};
        this.count = obj.count || 0;
        const list = obj.list || [];
        list.forEach((e: Item) => this.addItem(e));
      }
    }
  }

  addItem(item: Item) {
    item._id = item._id || this.generateId();
    this.list.push(item);
    this.save();
  }

  removeItem(id: string) {
    let i = 0;
    const list = this.list;
    for (; i < list.length; ++i) {
      if (list[i]._id === id) {
        break;
      }
    }
    this.list.splice(i, 1);
    this.save();
  }

  getItem(id: string): Item {
    let i = 0;
    const list = this.list;
    for (; i < list.length; ++i) {
      if (list[i]._id === id) {
        break;
      }
    }
    return this.list[i];
  }

  forEach(cb: (item: Item, i?: number) => void) {
    this.list.forEach(cb);
  }

  save() {
    if (window.localStorage) {
      window.localStorage.setItem('ShoppingList',
        JSON.stringify({ list: this.list, count: this.count }));
    }
    this.dispatchEvent('update', this.list);
  }

  clear() {
    this.list = [];
    this.save();
  }
}

const service = new ShoppingListService();
export const shoppingListService = service;
