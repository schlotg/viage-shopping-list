# Viage Shopping List Tutorial

## Adding Routes
Viage has a built in hash router that is light weight and easy to use. The great thing about Viage is that if you want to use a different router, go for it! It should be fairly straightforward to integrate into your project given Viage's very small and unobtrusive footprint.

### Setting up the Router
Modify the code in src/components/app so it looks like the following:

```Javascript
import { ShoppingList } from './shopping-list';
import { createRouter, Component } from 'viage';

export enum States {
  HOME = 'home',
  ADD = 'add',
  EDIT = 'edit'
};

export class App extends Component {

  private title = 'Shopping List';

  constructor() {
    super('app');
  init() {
    document.querySelector('title').textContent = this.title;

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">${this.title}</h1>
      <div style="width: 100%; min-width: 654px" attach="portal"></div>
    `);

    const router = createRouter('main', this.attachments.portal, 'HASH');
    router.addStates([
      { name: States.HOME, component: ShoppingList,  type: 'DEFAULT' },
    ]);
    // start of by going to the state the page was loaded on
    router.start();
    return this;
  }
}
```

### Adding a Portal
The Router needs somewhere to render into. Notice that we added a new div that gets attached with the name *portal*. Whenever the router changes state it creates a new component and then attaches it to the portal.

### Creating a router
Next we create a router named *main*, give it our portal div to render into. In this example we are configuring the router to be a HASH router but it could just as easily be a 'LOCATION' or 'STANDALONE' router. You can read more about that in the Viage API documentation found [here](https://github.com/schlotg/viage/blob/master/docs/api.md). HASH and LOCATION routers use the DOM's location and history object so there can only be one of those at a time.

### Adding Router States
Next we add a home router state. Each state consists of a name, a componet to construct and attach on state change, and whether the state is a default state or a normal state. There should only be one default state and that is the state the router defaults two when it is first coming up or if the url doesn't make sense.

### Starting the Router
Once it is configured, we kick out the router by calling **start()**.

### Viewing the Changes so far
Our app is complete enough that it will actually render in the browser. It is not much to look at because there are no items in our shopping list yet. You should see something that looks like:

![img1](img1.png)

### Next Steps
Now we need to add the ability to add an element so we can actually have something in our list to view. The next section builds out the *shopping-list-add* component

### [Next (Adding a Shopping List add Component)](shopping-list-add.md)