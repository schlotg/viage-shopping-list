import { Component } from 'viage';
import { ShoppingListService } from '../services/shopping-list-service';
import { States } from './app';

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
      <h3>${params && params.id ? 'Edit' : 'Add Item'}</h3>
      <table>
        <tr>
          <th>Quantity</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td><input type="number" attach="quantity" style="width: 60px" /></td>
          <td><input type="text" attach="name" style="width: 100px" /></td>
          <td><input type="text" attach="description" style="width: 300px" /></td>
        </tr>
      </table>
      <button attach="save">Save</button>
      <button attach="back">Back</button>
    `);
    const attachments = this.attachments;
    this.params = params;
    if (params && params.id) {
      this.updateItem();
    }

    attachments.save.addEventListener('click', () => {
      const item: any = { purchased: false };
      this.fields.forEach(k => item[k] = attachments[k].value);
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
  }

  updateItem() {
    const data: any = ShoppingListService.getItem(this.params.id);
    this.fields.forEach((k: string) => this.attachments[k].value = data && data[k]);
  }
}