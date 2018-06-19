import { Component } from 'viage';
import { shoppingListService } from '../services/shopping-list-service';
import { getRouter } from 'viage';

export class ShoppingListAdd extends Component {

  params = {id: ''};
  fields = ['quantity', 'name', 'description'];
  handler: any;

  constructor(params: any) {
    super('shopping-list-add');
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
      this.updateList();
    }

    attachments.save.addEventListener('click', () => {
      const item: any = {enabled: false};
      this.fields.forEach(k => item[k] = attachments[k].value);
      if (!(this.params.id)) {
        shoppingListService.addItem(item);
      } else {
        const data: any = shoppingListService.getItem(this.params.id);
        this.fields.forEach(k => data[k] = item[k]);
        shoppingListService.save();
      }
      getRouter('main').go('#home');
    });

    // handle back
    attachments.back.addEventListener('click', () => getRouter('main').back());

    // handle changes in data
    this.addServiceListener(shoppingListService, 'update', () => this.updateList());
  }

  updateList() {
    const data: any = shoppingListService.getItem(this.params.id);
    this.fields.forEach(k => this.attachments[k].value = data && data[k]);
  }
}