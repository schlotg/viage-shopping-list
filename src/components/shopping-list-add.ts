import { Component } from 'viage';
import { shoppingListService, Item } from '../services/shopping-list-service';
import { States } from './app';
import * as html from './shopping-list-add.html';
import * as logo from '../assets/logo.png';

export class ShoppingListAdd extends Component {
  private item: Item = {
    purchased: false,
    quantity: 0,
    name: '',
    description: ''
  };

  constructor() {
    super('shopping-list-add');
  }

  init(params: { id: string }) {
    this.setHTML(html, { id: params && params.id, logo });

    // if in edit mode than update the item with the latest data from the service
    if (params && params.id) {
      const data = shoppingListService.getItem(params.id);
      if (data) {
        (<HTMLInputElement>this.a.quantity).value = data.quantity.toString();
        (<HTMLInputElement>this.a.name).value = data.name;
        (<HTMLInputElement>this.a.description).value = data.description;
        this.item = data;
      }
    }

    // add save handlers
    this.attachments.save.addEventListener('click', () => {
      this.item.quantity = parseInt((<HTMLInputElement>this.a.quantity).value);
      this.item.name = (<HTMLInputElement>this.a.name).value;
      this.item.description = (<HTMLInputElement>this.a.description).value;
      (params && params.id) ? shoppingListService.addItem(this.item) :
        shoppingListService.save();
      const homeUrl = this.router.createUrl(States.HOME);
      this.router.go(homeUrl);
    });

    // handle back
    this.attachments.back.addEventListener('click', () => this.router.back());
    return this;
  }
}
