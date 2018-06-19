import { Component } from 'viage';
import { ShoppingListService } from '../services/shopping-list-service';
import { ShoppingListElement } from './shopping-list-element';
import { ShoppingListAdd } from './shopping-list-add';
import { getRouter } from 'viage';

export class ShoppingList extends Component {

  constructor(){
    super('shopping-list');
    this.setHTML(`
      <button attach="add">Add</button>
      <button attach="clear">Clear</button>
      <div attach="list" style="margin-top:20px;width:575px"></div>
    `);
    this.updateList();
    this.addServiceListener(ShoppingListService, 'update', () => this.updateList());
    this.attachments.clear.addEventListener('click', () => ShoppingListService.clear());
    this.attachments.add.addEventListener('click', () => getRouter('main').go('#add'));
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
