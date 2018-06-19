import { createRouter, Component } from 'viage';

export class App extends Component {
  constructor() {
    super('app');
    document.querySelector('title').textContent = "Shopping List";

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">Shopping List</h1>
    `);
  }
}
