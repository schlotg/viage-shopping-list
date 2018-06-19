# Viage Shopping List (In Progress)
A Viage tutorial that demonstrates how to build a simple shopping list app from the ground up using the Viage framework and CLI. It assumes you are familiar with TypeScript and Modern DOM APIs.

## What is Viage?
Viage is a minimal web framework that is also fast and easy to use. You can find out more about it [here](https://github.com/schlotg/viage)

## Tutorial

### Installation
The first thing we need to do is install the Viage CLI. This assumes that you have Node 10.x or newer installed. If not, go to
[https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install it.

From a command prompt or terminal type:

``` npm install -g viage-cli```


### Create the Project
The Viage CLI makes it easy to create a new project that is ready to go. We are going to call our project viage-shopping-list. Open a command prompt or terminal in your projects directory and type:

``` viage app viage-shopping-list ```

Once created, change directories to the new viage-shopping-list directory

``` cd viage-shopping-list```

### Run the App
The Viage CLI has created a new project that uses Webpack, TypeScript, and the Viage base classes to create a simple App that we can build off. To test that everything is working correctly, in a command prompt or terminal type:

```npm run start```

If you look inside the package.json file you will see to entries under scripts, build and start. 'build' does a release build and 'start' builds in debug and launches the debug webservere to serv up your app. As you make changes to the code it will automatically recompile and serve the changes to the browser.

Your default browser should have opened a new tab with the Viage app running in it. If not you can always got to: [http://localhost:8080/](http://localhost:8080/)

You should see "Hello From Viage" in browser.

### Change the Title and the Page Content
Components draw and interact with the user and Services are singleton responsible for managing data. Components usually live in the src/components directory but you may organize them however you want as long as they are in the src directory. This is also true of Services, they generally live in the src/services directory.

When code is compiled it is compiled to a single dest/bundle.js file. When using the start command you won't see it as the development server send the changes else where. However, if you compile using the 'npm run build' command you will see the dest folder populated with the bundle.js file.

In your favorite editor, I recommend Visual Studio Code, open up the src/components/app.t file inside your projects directory and change:

```document.querySelector('title').textContent = "Hello From Viage ";```

to

```document.querySelector('title').textContent = "Shopping List";```

Next change the HTML content so that it looks like:

``` <h1 style="text-align: center">Shopping List</h1> ```

Save your changes and you should see your app instantly update in the browser. Your code should now look like this:

```Javascript
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
```

### Components
All components must derive off of the Component base class which is located in Viage/core. TypeScript classes must call the constructor of their base class first thing in the constructor. This is done with the super() call and a component HTML tag name must be passed down to the base class. In this case the component is app and if you inspect the HTML using the browser debug tools you will see a DOM element named <app>. This DOM element represents an instance of our component and will contain any HTML specified in the setHTML() function.

In the next line you can see that we use the standard DOM API querySelector to find the title element of the DOM and set its text content to Shopping List. These are just standard modern DOM APIs.

A component must have some place to render its HTML to and that is where the attach() function comes in. This is defined in the Component base class and it attaches this component to a DOM element that matches the CSS selector 'page'.

Lastly, we set the HTML for this component using the setHTML function which is also defined in the Component base class. Notice that we use the backtick string functionality of ES6. This allows us to output HTML that spans multiple lines and use templating to insert values.




