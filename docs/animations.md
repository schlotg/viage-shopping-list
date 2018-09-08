# Viage Shopping List Tutorial

## Adding Animations
It turns out that there is a fairly comprehensive animation engine built into every modern browser. Viage is unobtrusive enough to not get in the way of using it to as it was intended. You can find a lot of information on the web for CSS animations especially on the MDN website. To illustrate how to use animations in a Viage project we are going to add them to the Router to fade the current state out and then the new one in. We will use both the CSS animation engine built into browsers and a pure javascript implementation.

## Hooking the Router
The Viage Router has an API function called **setStateChangedCallback()** this function calls your callback when a router state changes is about to happen. It expects a returned Promise in the callback. When resolve is called on the Promise it signals the router to go ahead and make the state change. Let's start with hooking the router. Add the following lines to the bottom of the App.init() function in app.ts:

```Javascript
  import { createRouter, Component, StateInfo } from 'viage';

...
  class App
  ...
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
        { name: States.ADD, component: ShoppingListAdd,  type: 'NORMAL' },
        { name: States.EDIT, component: ShoppingListAdd,  type: 'NORMAL' },
      ]);

      // add a animation handler for router state changes
      router.setStateChangedCallback((stateInfo: StateInfo) => this.stateChanged(stateInfo));

      // start off by going to the state the page was loaded on
      router.start();

      return this;
    }
  ...
```

## Adding a stateChanged() function
Next we need to add a stateChanged function to our App class. Add the following function to the App class in App.ts:

```Javascript
  stateChanged(stateInfo: StateInfo): Promise<void> {
    return  new Promise((resolve) => {
      console.log('Router State Changed', stateInfo);
      resolve();
    });
  }
```

If you run the application at this point every time you trigger a Router state change you will see the it's output in the browser's debug console. Incidentally, this is a great way to debug Route State issues. Notice that the callback returns a promise right away but then calls resolve when its ready fro the Router state change.

## Defining CSS Transition Classes
Add the following CSS styling to index.css:

```Css
  .fadeout {
    transition: .5s;
    opacity: 0;
  }

  .fadein {
    transition: .5s;
    opacity: 1;
  }
```

These classes, when attached to a DOM element, will animate from the current opacity value to the target one in .5 seconds. Now all we have to do is add these classes to our portal DOM element. at the right times

## Adding and removing classes on the Portal element
Modify the the **stateChanged()** function so it now looks like this:

```Javascript
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
```
Notice that when our callback gets called we make sure all the animation classes are removed from the portal element which essentially resets it. Then we add the fadeout animation class which starts the fadeout animation. It is set to take .5 seconds so we set a timeout for 500ms. When this timeout fires it triggers the actual Router state change by call resolve() on the Promise, and then starts the fadein animation by attaching the fadein class. You can also use CSS animation events to trigger the fade in.

## Animating using Typescript only
Of course you can animated just using Typescript as well. To do this we will need to create an animation loop that adjusts the values of opacity on each iteration. To do that we will utilize the **requestAnimationFrame()** function. Replace the stateChanged function defined above with the two functions listed below:

```Javascript
  stateChanged(stateInfo: StateInfo): Promise<void> {
    this.alpha = 1;
    this.inc = -.1;
    return  new Promise((resolve) => this.animate(resolve));
  }

  animate(resolve: any) {
    const style = this.attachments.portal.style;
    requestAnimationFrame(() => {
      style.opacity = `${this.alpha}`;
      this.alpha += this.inc;
      if (this.alpha < 0) {
        this.inc = -this.inc;
        resolve();
      }
      (this.inc > 0 && this.alpha >= 1) ? style.opacity = 1.0 : this.animate(resolve);
    });
  }

```

Additionally you will need to add alpha and inc as members to the App class like so:

```Javascript
export class App extends Component {

  private title = 'Shopping List';
  private alpha = 1;
  private inc = -.1;

  ...

```

When stateChanged gets called it resets the aplha and inc variables to their initial state and then calls **animate().** This function continually calls itself until it has animated the alpha value to zero and then back up to 1. When the value reaches o it also triggers the actual state change by calling resolve.

## Wrap Up
Both animation types work pretty well and it is just a matter of user preference as which one to use. I personally lean towards using CSS transitions as they are res-usable and easy to adjust in a style sheet

### [Next (Responsive Design)](responsive.md)

