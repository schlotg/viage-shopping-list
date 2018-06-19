# Viage Shopping List Tutorial

## Services
In Viage, Services are used to manage data or any other global resource. Components should only contain other components and the glu-logic to display data to the user. In contrast, Services should not contain any display logic and handle all aspects of managing the data, including notifying components when data has changed. Services are singletons and do need to be instantiated, you can use them directly by importing them.

### Create a Service
Using the Viage CLI, create a new service by typing the following in a shell in your project's direrctory:

``` viage service shopping-list-service```

This will create a new file at src/services/shopping-list-service.ts. Open this file and it should look like this:

```Javascript
import { Service } from 'viage';

class ShoppingListServiceSingleton extends Service {
  constructor() {
    super();
  }
}
const service = new ShoppingListServiceSingleton ();
export const ShoppingListService = service;
```

Services extend the base class Service, and then export a single instance of the service. To use it in a component you just need to import it:

```Javascript
import { ShoppingListService } from '../service/shopping-list-service';
```

### Defining a Data interface
Let's start by defining an interface for the data. Insert the following lines just above the class declaration:

```Javascript
import { Service } from 'viage';

export interface Item {
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
  _id?: string; // added by the service
}

class ShoppingListServiceSingleton extends Service {
```

Each Shopping list item is going to have a name, description, quantity, and a purchased flag to indicated if purchased or not. The _id field will be used internally by the service to uniquely track each item. We export the interface so it can be used by components interacting with the data.

### Data Retrieval and Storage
Normally a service would save and retrieve data from a server. Viage doesn't try to duplicate functionality that is already in the DOM. I reccomend using the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch). It is an excellant modern interface that supports promises and is available across the 4 big browsers.

Since writing server code is beyond the scope of this tutorial we will write to the browser's local storage instead. Add the following code to the shopping-list-service:

```Javascript
class ShoppingListServiceSingleton extends Service {

  private list: Item[] = [];
  private count = 1;

  private generateId() {
    this.count += 1;
    return this.count.toString(16);
  }

  constructor() {
    super();
    if (window.localStorage) {
      const json = window.localStorage.getItem('ShoppingList');
      if (json) {
        const obj = JSON.parse(json) || {};
        this.count = obj.count || 0;
        const list = obj.list || [];
        list.forEach((e: Item) => this.addItem(e));
      }
    }
  }

  save() {
    if (window.localStorage) {
      window.localStorage.setItem('ShoppingList',
        JSON.stringify({ list: this.list, count: this.count }));
    }
    this.dispatchEvent('update', this.list);
  }
```

Our service now contains a local list of the data in a variable named *list*. There is also a local variable called *count* that the *generateId()* function uses to generate unique ids. The *contructor()* and the *save()* function contains code that stores and retrieves data from local storage.

Notice that everytime the *save()* function is called, we dispatch an event called *update*, that lets everyone that is listening know that the data has changed. The *dispatchEvent()* function is defined in the *Service* base class along with the ability to add and remove event listeners. More on that later.

### Getting and Setting Data
Next, we will add some getters and setters to make it easy to add, get, and remove data for the components. This is just standard Typescript. Add the following lines to our service:

```Javascript
  private findIndex(id: string): number {
    let i = 0;
    const list = this.list;
    for (; i < list.length; ++i) {
      if (list[i]._id === id) { break; }
    }
    return i;
  }

  addItem(item: Item) {
    item._id = item._id || this.generateId();
    this.list.push(item);
    this.save();
  }

  removeItem(id: string) {
    const i = this.findIndex(id);
    this.list.splice(i, 1);
    this.save();
  }

  getItem(id: string): Item {
    const i = this.findIndex(id);
    return this.list[i];
  }

  forEach(cb: (item: Item, i?: number) => void) {
    this.list.forEach(cb);
  }

  clear() {
    this.list = [];
    this.save();
  }
```

The function *findIndex* is just a helper function to find an element by id so that we can remove and get items. There is also a *forEach()* function that makes it easy to iterate across all of the items in our list.

Whew! That is the biggest file in our project but it actually does a lot and is great foundation for the rest of the app.

The final file should look like this:

```Javascript
import { Service } from 'viage';

export interface Item {
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
  _id?: string; // added by the service
}

class ShoppingListServiceSingleton extends Service {

  private list: Item[] = [];
  private count = 1;

  private generateId() {
    this.count += 1;
    return this.count.toString(16);
  }

  constructor() {
    super();
    if (window.localStorage) {
      const json = window.localStorage.getItem('ShoppingList');
      if (json) {
        const obj = JSON.parse(json) || {};
        this.count = obj.count || 0;
        const list = obj.list || [];
        list.forEach((e: Item) => this.addItem(e));
      }
    }
  }

  save() {
    if (window.localStorage) {
      window.localStorage.setItem('ShoppingList',
        JSON.stringify({ list: this.list, count: this.count }));
    }
    this.dispatchEvent('update', this.list);
  }

  private findIndex(id: string): number {
    let i = 0;
    const list = this.list;
    for (; i < list.length; ++i) {
      if (list[i]._id === id) { break; }
    }
    return i;
  }

  addItem(item: Item) {
    item._id = item._id || this.generateId();
    this.list.push(item);
    this.save();
  }

  removeItem(id: string) {
    const i = this.findIndex(id);
    this.list.splice(i, 1);
    this.save();
  }

  getItem(id: string): Item {
    const i = this.findIndex(id);
    return this.list[i];
  }

  forEach(cb: (item: Item, i?: number) => void) {
    this.list.forEach(cb);
  }

  clear() {
    this.list = [];
    this.save();
  }
}

const service = new ShoppingListServiceSingleton();
export const ShoppingListService = service;

```

### [Next (Adding a Shopping List Element Component)](shopping-list-element.md)