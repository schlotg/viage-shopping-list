import { Component } from 'viage';
import { ShoppingListService } from '../services/shopping-list-service';
import { ShoppingListElement } from './shopping-list-element';
import { States } from './app';

export class ShoppingList extends Component {

  constructor(){
    super('shopping-list');
  }

  init() {
    this.setHTML(`
      <button attach="add" style="color:#00c700">Add</button>
      <button attach="clear" style="color:#ff6e6e">Clear</button>
      <div attach="list" style="margin-top:20px; width:630px; padding:5px; background-color: #eeeeee"></div>
    `);
    this.updateList();
    this.addServiceListener(ShoppingListService, 'update', () => this.updateList());
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
