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
        <input attach="enabled" type="checkbox" ${item.purchased ? "checked": ""} />
        <span style="width: 30px; display: inline-block">${item.quantity}</span>
        <span style="width: 100px; display: inline-block">${item.name}</span>
        <span style="width: 300px; display: inline-block">${item.description}</span>
        <button attach="delete" style="padding: 1px;">Delete</button>
        <button attach="edit" style="padding: 1px;">Edit</button>
      </div>
    `);
    this.attachments.delete.addEventListener('click', () => {
      ShoppingListService.removeItem(this.item._id);
    });
    const purchased = this.attachments.enabled;
    purchased.addEventListener('click', () => {
      this.item.purchased = purchased.checked;
      ShoppingListService.save();
    });
    this.attachments.edit.addEventListener('click', () => {
      getRouter('main').go(`#edit/${this.item._id}`);
    });
    return this;
  }
}
```

### Data
You will notice that the component has a member called *item*. This is a local copy of the data. Every time *init()* is called with a Item, the local copy is set and the component's HTML is replaced with new HTML that represents the new state. We use the back-tick strings template functionality to inject the various item values into the HTML.

### Attaching
There are two buttons in the component that need click handlers attached to them. Viage has a convienent way of accessing HTML elements within a component. When you specify *attach=name* in the HTML it will automatically be able to be accessed in the *this.attachments[name]* . We utilize this feature to addEventListeners to both the buttons and the purchased checkbox.

You can see that the delete button calls the *ShoppingListService.removeItem()* function. The purchased click handler triggers a save in the *ShoppingListService*. The edit button triggers a new Router state to edit the item. We will cover the Router in one of the later sections.

Notice that we are using the standard DOM API addEventListener() instead of re-implementing it.

### [Next (The Shopping List Component)](shopping-list.md)
