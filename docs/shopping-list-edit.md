# Viage Shopping List Tutorial

## Adding Edit Functionality
It turns out that Adding and Editing an Item are very similar in functionality. It makes sense to use the *shopping-list-add* component to edit as well. We just have to be able to pass in a item id so that the add component knows how to pre-populate the component.

### Passing in Params
Viage Components, when constructed by the Router, will have the **init()** function called with any data in the state's url. Any JSON-able data can be passe into the **router.createUrl()** function and that data data will be pasee into the **init()** function. We can use that to adjust the header of this component based on whether it is being used as a Edit component or and Add component. Change the setHTML call in init to show the correct heading:

```Javascript
  init(params: ComponentParams) {
    this.setHTML(`
      <h3>${params && params.id ? 'Edit' : 'Add Item'}</h3>
  ...
```

### Handling Edit functionality
To make the edit functionality work we need to go get the item's data when the component loads so it can be edited. The whole file should now look like this:

```Javascript
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
      const item: any = {purchased: false};
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
      return this;
    });

    // handle back
    attachments.back.addEventListener('click', () => this.router.back());
  }

  updateItem() {
    const data: any = ShoppingListService.getItem(this.params.id);
    this.fields.forEach((k: string) => this.attachments[k].value = data && data[k]);
  }
}
```

To make things cleaner, there is now and updateItem function that takes care of getting data from the service and updating the appropraite HTML elements.


### Adding a new Router State
Let's add one more Router state to src/components/app.ts. Modify the router states in app.ts so they now look like this:

```Javascript
    router.addStates([
      { name: States.HOME, component: ShoppingList,  type: 'DEFAULT' },
      { name: States.ADD, component: ShoppingListAdd,  type: 'NORMAL' },
      { name: States.EDIT, component: ShoppingListAdd,  type: 'NORMAL' },
    ]);
```

The edit route will reuse the ShoppingListAdd component When the router changes state to the edit route, it will create a new ShoppingListAdd component, extract data from the url, and pass it in via the **init()** function.

### Test it out
Now our app has the ability to edit, save, delete, clear, and display our shopping list. The new edit functionality should look something like the image below:

![img4](img4.png)

### Functional but Ugly!
So our app is functional but it could sure use some style. Viage does not get in the way or try to interpret CSS. This lets you take full advantage of some of the amazing CSS features that are part of the modern DOM.

### [Next (Adding CSS)](css.md)
