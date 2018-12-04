import { Service } from 'viage';

export interface Item {
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
  _id?: string; // added by the service
}

class ShoppingListService extends Service {

  private list: Item[] = [];
  private count = 1;

  private generateId() {
    this.count += 1;
    return this.count.toString(16);
  }

  constructor() {
    super();
    debugger;
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

  save() {
    if (window.localStorage) {
      window.localStorage.setItem('ShoppingList',
        JSON.stringify({ list: this.list, count: this.count }));
    }
    this.dispatchEvent<Item[]>('update', this.list);
  }

  private findIndex(id: string): number {
    let i = 0;
    const list = this.list;
    for (; i < list.length; i += 1) {
      if (list[i]._id === id) { break; }
    }
    return i;
  }

  addItem(item: Item) {
    item._id = item._id || this.generateId();
    this.list.push(item);
    this.save();
  }

  removeItem(id: string) {
    const i = this.findIndex(id);
    this.list.splice(i, 1);
    this.save();
  }

  getItem(id: string): Item {
    const i = this.findIndex(id);
    return this.list[i];
  }

  forEach(cb: (item: Item, i?: number) => void) {
    this.list.forEach(cb);
  }

  clear() {
    this.list = [];
    this.save();
  }
}
export const shoppingListService = new ShoppingListService();
