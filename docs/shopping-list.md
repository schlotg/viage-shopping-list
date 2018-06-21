# Viage Shopping List Tutorial

## Adding a Shopping List Component
Now we need a component to display all the shopping list elements. Start by using the CLI to create a *shopping-list component*.

``` viage component shopping-list ```

This will create the the file src/components/shopping-list.ts

## Modify the Code
Now modify the code in the new component so lit looks like the following:

```Javascript
import { Component } from 'viage';
import { ShoppingListService } from '../services/shopping-list-service';
import { ShoppingListElement } from './shopping-list-element';
import { getRouter } from 'viage';

export class ShoppingList extends Component {

  constructor(){
    super('shopping-list');
    this.setHTML(`
      <button attach="add" style="color:#00c700">Add</button>
      <button attach="clear" style="color:#ff6e6e">Clear</button>
      <div attach="list" style="margin-top:20px; width:630px;padding:5px;background-color:#eeeeee"></div>
    `);
    this.updateList();
    this.addServiceListener(ShoppingListService, 'update', () => this.updateList());
    this.attachments.clear.addEventListener('click', () => ShoppingListService.clear());
    this.attachments.add.addEventListener('click', () => getRouter('main').go('#add'));
  }

  updateList(){
    this.clearComponents();
    this.attachments.list.innerHTML = '';
    ShoppingListService.forEach(e => {
      this.createComponent(ShoppingListElement).init(e)
        .attach(this.attachments.list);
    });
  }
}
```

### List HTML
There are several things worth noting here. This component creates a Add button, Clear button, and a div that acts as a container to render the *ShoppingListElements* into. Just like the previous step we add click handlers to our buttons which will clear the list and tell the router to go to the Add state.

### Interacting with the Service
This component installs a update event listener on the *ShoppingListService*. If you recall, this gets fired everytime the data changes in the service. You'll note that we use the Viage Component API  *addServiceListener()* to add the event listener. This is because this function has a nice cleanup mechanism that automatically removes the listener when this component gets destroyed. It is not neccesary to do this with event listeners in the owning component's HTML. This due to the fact that the Component will destroy its HTML elements when it goes away which in turn destroys the event listeners.

### Drawing the List
The *updateList()* function first calls *clearComponents()* which clears out all the child components that this component ones. Next the containers children are cleared out by assigning the container's inner HTML to an empty string.

Next we call the *ShoppingListService.forEach()* to get each element from the service. Next we call the *createComponent()* function to create the *ShoppingListElement* and then init it with the item's data. The *createComponent()* function is a Viage API that creates the component and then adds it to *this.components[]* . When the component get's destroyed it will automatically destroy all the child components as well.

You will not that the *attach()* function is called on each newly created Component. The container element is passed in so that each child component will render into the container.

### Drawing the shopping-list Component
If you have been paying attention, you will have noticed that the *shopping-list-elements* render into the shopping-list component, but so far the shopping-list component is not attached to the DOM. In the next section we will take care of that by using the router.

### [Next (The Router)](routes.md)
