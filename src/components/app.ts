import { ShoppingList } from './shopping-list';
import { ShoppingListAdd } from './shopping-list-add';
import { shoppingListService } from '../services/shopping-list-service';
import { createRouter, Component } from 'viage';

export class App extends Component {
  constructor() {
    super('app');
    document.querySelector('title').textContent = "Shopping List";

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">Shopping List</h1>
      <div attach="portal"></div>
    `);
    const router = createRouter('main', this.attachments.portal, true);

    router.addStates([
      { name: 'home', component: ShoppingList,  paramsList: [] },
      { name: 'add', component: ShoppingListAdd,  paramsList: [] },
      { name: 'edit', component: ShoppingListAdd,  paramsList: ['id'] },
    ]);

    router.setDefaultState('#home');

    shoppingListService.addEventListener('update', (data: any) => console.log(data));
  }
}
