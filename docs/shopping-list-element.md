# Viage Shopping List Tutorial

## Adding a Shopping List Element Component
Now we need a component to display a shopping list item.

### Generate a New Component
Use the CLI to generate a new component by typing:

```viage component shopping-list-element```

This will generate a empty component at src/components/shopping-list-element.ts

### Modify the Component

Modify the newly generated component so it looks like this:

```Javascript
import { Component } from 'viage';
import { Item, ShoppingListService } from '../services/shopping-list-service';
import { States } from './app';

interface Id {
  id: string;
}

export class ShoppingListElement extends Component {

  private item: Item;

  constructor(){
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
```

### Data
You will notice that the component has a member called *item*. This is a local copy of the data. Every time *init()* is called with a Item, the local copy is set and the component's HTML is replaced with new HTML that represents the new state. We use the back-tick strings template functionality to inject the various item values into the HTML.

### Attaching
There are two buttons in the component that need click handlers attached to them. Viage has a convienent way of accessing HTML elements within a component. When you specify *attach=name* in the HTML it will automatically be able to be accessed in *this.attachments[name]* . We utilize this feature to call addEventListeners to both the buttons and the purchased checkbox.

You can see that the delete button calls the *ShoppingListService.removeItem()* function. The purchased click handler triggers a save in the *ShoppingListService*. The edit button triggers a new Router state to edit the item. We will cover the Router in one of the later sections.

Notice that we are using the standard DOM APIs such as addEventListener().

### Routing
**this.router** is a an instance of the router used to create the component. We will get into more detaila bout routing soon but for now notice that we use the router to create a url by passing in the state name and data. We then call router.go(url) to change the router state. In this case when the edit button is clicked, the router changes to teh edit state.


### [Next (The Shopping List Component)](shopping-list.md)
