# Viage Shopping List Tutorial

## Services
In Viage Services are used to manage data or any other global resource. Components should only contain other components and the glu-logic to display data to the user. In contrast Services should not contain and display logic and handle all aspects of managing the data that is being displayed including notifying components when data has changed. Services are singletons and do need to be instantiated, you cna use them directly by importing them.

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

Services extend the base class Service, and then exports a single instance of the service. To use it in a component you just need to import it:

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



