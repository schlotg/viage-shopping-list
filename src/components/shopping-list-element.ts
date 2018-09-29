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
      <div class="not-mobile list-item">
        <input attach="enabled" type="checkbox" ${item.purchased ? "checked": ""} />
        <span style="width: 30px; display: inline-block">${item.quantity}</span>
        <span style="width: 20%; display: inline-block">${item.name}</span>
        <span style="width: 40%; display: inline-block">${item.description}</span>
        <button attach="delete" style="padding: 1px; float: right">Delete</button>
        <button attach="edit" style="padding: 1px; float: right; margin-right: 10px;">Edit</button>
      </div>
      <div attach="m_edit" class="mobile list-item">
        <input attach="m_enabled" type="checkbox" ${item.purchased ? "checked": ""} />
        <span style="width: 30px; display: inline-block">${item.quantity}</span>
        <span style="width: 50%; display: inline-block">${item.name}</span>
        <button attach="m_delete" style="padding: 1px; float: right">X</button>
        <div style="display: block; margin-top:20px;">
          <label style="font-weight:800">Description: </label>
          <span style="width: 40%;" >${item.description}</span>
        </div>
      </div>

    `);
    const attachments = this.attachments;
    const remove = () => ShoppingListService.removeItem(this.item._id);
    const enable1 = () => {
      this.item.purchased = this.getAttachment<HTMLInputElement>('enabled').checked;
      ShoppingListService.save();
    };
    const enable2 = () => {
      this.item.purchased = this.getAttachment<HTMLInputElement>('m_enabled').checked;
      ShoppingListService.save();
    };
    const edit = () => {
      const url = this.router.createUrl<Id>(States.EDIT, {id: this.item._id});
      this.router.go(url);
    };
    attachments.delete.addEventListener('click', remove);
    attachments.m_delete.addEventListener('click', remove);
    attachments.enabled.addEventListener('click', enable1);
    attachments.m_enabled.addEventListener('click', enable2);
    this.attachments.edit.addEventListener('click', edit);
    this.attachments.m_edit.addEventListener('click', edit);
    return this;
  }
}