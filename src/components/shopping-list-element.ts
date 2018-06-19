import { Component } from 'viage';
import { Item, ShoppingListService } from '../services/shopping-list-service';
import { getRouter } from 'viage';

export class ShoppingListElement extends Component {

  private item: Item;

  constructor(){
    super('shopping-list-element');
  }

  init(item: Item) {
    this.item = item;
    this.setHTML(`
      <div style="width: 100%; margin-top: 5px; margin-bottom: 5px;">
        <input attach="enabled" type="checkbox" ${item.enabled ? "checked": ""} />
        <span style="width: 30px; display: inline-block">${item.quantity}</span>
        <span style="width: 100px; display: inline-block">${item.name}</span>
        <span style="width: 300px; display: inline-block">${item.description}</span>
        <button attach="delete">Delete</button>
        <button attach="edit">Edit</button>
      </div>
    `);
    this.attachments.delete.addEventListener('click', () => {
      ShoppingListService.removeItem(this.item._id);
    });
    const enabled = this.attachments.enabled;
    enabled.addEventListener('click', () => {
      this.item.enabled = enabled.checked;
      ShoppingListService.save();
    });
    this.attachments.edit.addEventListener('click', () => {
      getRouter('main').go(`#edit/${this.item._id}`);
    });
    return this;
  }
}