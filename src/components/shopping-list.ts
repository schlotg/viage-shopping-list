import { Component } from 'viage';
import { ShoppingListService, Item } from '../services/shopping-list-service';
import { ShoppingListElement } from './shopping-list-element';
import { States } from './app';

export class ShoppingList extends Component {

  constructor(){
    super('shopping-list');
  }

  init() {
    this.setHTML(`
      <div class="logo-img"></div>
      <button attach="add" class="button green">Add</button>
      <button attach="clear" class="button red">Clear</button>
      <div attach="list" class="shopping-list"></div>
    `);
    this.updateList();
    this.addServiceListener<Item[]>(ShoppingListService, 'update', (list: Item[]) => this.updateList());
    this.attachments.clear.addEventListener('click', () => ShoppingListService.clear());
    this.attachments.add.addEventListener('click', () => {
      const addUrl = this.router.createUrl<void>(States.ADD);
      this.router.go(addUrl);
    });
    return this;
  }

  updateList(){
    this.clearComponents();
    this.attachments.list.innerHTML = '';
    ShoppingListService.forEach(e => {
      this.createComponent(ShoppingListElement).init(e)
        .attach(this.attachments.list);
    });
  }
}
