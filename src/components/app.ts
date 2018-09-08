import { ShoppingList } from './shopping-list';
import { ShoppingListAdd } from './shopping-list-add';
import { createRouter, Component, StateInfo } from 'viage';

export enum States {
  HOME = 'home',
  ADD = 'add',
  EDIT = 'edit'
};

export class App extends Component {

  private title = 'Shopping List';

  constructor() {
    super('app');
  }

  init() {
    document.querySelector('title').textContent = this.title;

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">${this.title}</h1>
      <div class="portal" attach="portal"></div>
    `);

    const router = createRouter('main', this.attachments.portal, 'HASH');
    router.addStates([
      { name: States.HOME, component: ShoppingList,  type: 'DEFAULT' },
      { name: States.ADD, component: ShoppingListAdd,  type: 'NORMAL' },
      { name: States.EDIT, component: ShoppingListAdd,  type: 'NORMAL' },
    ]);

    // add a animation handler for router state changes
    router.setStateChangedCallback((stateInfo: StateInfo) => this.stateChanged(stateInfo));

    // start off by going to the state the page was loaded on
    router.start();
    return this;
  }

  stateChanged(stateInfo: StateInfo): Promise<void> {
    return  new Promise((resolve) => {
      const portal = this.attachments.portal;
      portal.classList.remove('fadeout');
      portal.classList.remove('fadein');
      portal.classList.add('fadeout');
      setTimeout(() => {
        resolve();
        portal.classList.add('fadein');
      }, 500);
    });
  }
}
