import { Component } from 'viage';
import { Item, shoppingListService } from '../services/shopping-list-service';
import { States } from './app';
import * as html from './shopping-list-element.html';

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
    this.setHTML(html, {
      description: this.item.description,
      name: this.item.name,
      quantity: this.item.quantity.toString()
    });
    const attachments = this.a;
    const remove = () => shoppingListService.removeItem(this.item._id);
    const enable1 = () => {
      this.item.purchased = this.getAttachment<HTMLInputElement>('enabled').checked;
      shoppingListService.save();
    };
    const enable2 = () => {
      this.item.purchased = this.getAttachment<HTMLInputElement>('m_enabled').checked;
      shoppingListService.save();
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