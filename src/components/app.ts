import { ShoppingList } from './shopping-list';
import { ShoppingListAdd } from './shopping-list-add';
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
    document.querySelector('title').textContent = this.title;

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">${this.title}</h1>
      <div attach="portal"></div>
    `);

    const router = createRouter('main', this.attachments.portal, 'HASH');
    router.addStates([
      { name: States.HOME, component: ShoppingList,  type: 'DEFAULT' },
      { name: States.ADD, component: ShoppingListAdd,  type: 'NORMAL' },
      { name: States.EDIT, component: ShoppingListAdd,  type: 'NORMAL' },
    ]);
    // start of by going to the state the page was loaded on
    router.start();
  }
}
