import { Component } from 'viage';
import { Item, ShoppingListService } from '../services/shopping-list-service';
import { States } from './app';

interface Id {
  id: string;
}

export class ShoppingListElement extends Component {

  private item: Item;

  constructor() {
    super('shopping-list-element');
  }

  init(item: Item) {
    this.item = item;
    this.setHTML(`
      <div style="width: 100%; margin-top: 5px; margin-bottom: 5px;">
        <input attach="enabled" type="checkbox" ${item.purchased ? "checked": ""} />
        <span style="width: 30px; display: inline-block">${item.quantity}</span>
        <span style="width: 100px; display: inline-block">${item.name}</span>
        <span style="width: 300px; display: inline-block">${item.description}</span>
        <button attach="delete" style="padding: 1px;">Delete</button>
        <button attach="edit" style="padding: 1px;">Edit</button>
      </div>
    `);
    const attachments = this.attachments;
    attachments.delete.addEventListener('click', () => {
      ShoppingListService.removeItem(this.item._id);
    });
    attachments.enabled.addEventListener('click', () => {
      this.item.purchased = attachments.enabled.checked;
      ShoppingListService.save();
    });
    this.attachments.edit.addEventListener('click', () => {
      const url = this.router.createUrl<Id>(States.EDIT, {id: this.item._id});
      this.router.go(url);
    });
    return this;
  }
}