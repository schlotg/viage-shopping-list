# Viage Shopping List Tutorial

## Creating the Shopping List Add Component
This component will be the view that is used to add an item to the Shopping List. Start by using the CLI to create a *shopping-list-add component*.

``` viage component shopping-list-add ```


Now modify the code so that it looks lke this:

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
      <h3>Add Item</h3>
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

    attachments.save.addEventListener('click', () => {
      const item: any = {purchased: false};
      this.fields.forEach(k => item[k] = attachments[k].value);
      item.quantity = parseInt(item.quantity); // ensure this is a number
      ShoppingListService.addItem(item);
      const homeUrl = this.router.createUrl<void>(States.HOME);
      this.router.go(homeUrl);
    });

    // handle back
    attachments.back.addEventListener('click', () => this.router.back());
    return this;
  }
}
```
### Attach attribute
This is very much like the other components that we have created. The HTML is simply a table of fields that can be edited. This was covered previously but I want to re-iterate. Notice a **attach="save"** and a **attach="back"** attribute in the button HTML. This is the only custom HTML attribute that Viage uses. It has very simple functionality. Putting an attach property in the HTML will instruct the **setHTML()** function to get the element from the DOM, once it is added, and put it in a collection of elements named **attachments**. This is merely a helper to allow the programmer quick and easy access through the **this.attachment** member. As an example, to access the save button merely write something like this:
```Javascript
  const save = this.attachments.save;
```

### Save Button
The *save* button has a click handler added to it and it gathers each input field and constructs an object that is sent to the *ShoppingListService.addItem()* function. Once the call is complete, it calls the router to go to the *home* state. In a app that calls a server to save, you might want to configure the service to return a promise whenever an async operation is performed.

### Back Button
The back button calls the *router.back()* function which tells the router to go back to the previous state or to the default state if no previous state exists. This is emulating the back button functionality on the browser. If fact if you hit the back button on the browser it will accomplish the same thing.

### Installing a Route
The only thing left is to let the router know about this new state. Add the following code into the src/components/app.ts file so that the router states match this:

```Javascript
router.addStates([
      { name: States.HOME, component: ShoppingList,  type: 'DEFAULT' },
      { name: States.ADD, component: ShoppingListAdd,  type: 'NORMAL' },,
    ]);
```

Don't forget to import the ShoppingListAdd component by adding the following to the top of the src/components/app.ts file:

```Javascript
import { ShoppingListAdd } from './shopping-list-add';
```

### Test it out
Finally we can add items to our shopping list and then display them. Press the add button on the app running in the browser and add some items. Your shopping-list-add screen should look like this:

![img2](img2.png)

And the populated list should now look something like this:

![img3](img3.png)

You should be able to Add, Delete, View, Mark as Purchased, and Clear the list. You can even refresh the browser and it will keep the list intact because the contents are saved and retrieved from Localstorage.

### Editing
The only functionality missing is the ability to edit an item.

### [Next (The Shopping List Edit Component)](shopping-list-edit.md)
