import { Component } from 'viage';
import { ShoppingListService } from '../services/shopping-list-service';
import { States } from './app';
import * as logo from '../assets/logo.png';

interface ComponentParams {
  id?: string;
}

export class ShoppingListAdd extends Component {

  params: ComponentParams = {id: ''};
  fields = ['quantity', 'name', 'description'];

  constructor() {
    super('shopping-list-add');
  }

  init(params: ComponentParams) {
    this.setHTML(`
    <div style="background-image: url(${logo}); width: 129px; height: 128px; margin-left: auto; margin-right: auto; margin-bottom: 20px;"></div>
    <h3 class="not-mobile" style="margin-left: 6px; color: green">${params && params.id ? 'Edit' : 'Add Item'}</h3>
    <div class="quantity-container">
      <label class="label">Quantity</label>
      <input class="input" type="number" attach="quantity"/>
    </div>
    <div class="name-container">
      <label class="label">Name</label>
      <input class="input" type="text" attach="name"/>
    </div>
    <div class="description-container">
      <label class="label">Description</label>
      <input class="input" type="text" attach="description"/>
    </div>
    <div>
      <button class="save-button button green" attach="save">Save</button>
      <button class="button blue" attach="back">Back</button>
    <div>
    `);
    const attachments = this.attachments;
    this.params = params;
    if (params && params.id) {
      this.updateItem();
    }

    attachments.save.addEventListener('click', () => {
      const item: any = { purchased: false };
      this.fields.forEach(k => item[k] = (<HTMLInputElement>attachments[k]).value);
      item.quantity = parseInt(item.quantity); // ensure this is a number
      if (!this.params.id) {
        ShoppingListService.addItem(item);
      } else {
        const data: any = ShoppingListService.getItem(this.params.id);
        this.fields.forEach(k => data[k] = item[k]);
        ShoppingListService.save();
      }
      const homeUrl = this.router.createUrl<void>(States.HOME);
      this.router.go(homeUrl);
    });

    // handle back
    attachments.back.addEventListener('click', () => this.router.back());
    return this;
  }

  updateItem() {
    const data: any = ShoppingListService.getItem(this.params.id);
    this.fields.forEach((k: string) => (<HTMLInputElement>this.attachments[k]).value = data && data[k]);
  }
}