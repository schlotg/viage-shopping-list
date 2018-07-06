# Viage Shopping List Tutorial
This is a Viage tutorial that demonstrates how to build a simple shopping list app from the ground up using the [Viage framework and CLI. It assumes you are familiar with TypeScript and modern DOM APIs.

## What is Viage?
Viage is a minimal web framework that is also fast and easy to use. You can find out more about it [here](https://github.com/schlotg/viage)

## Tutorial
You can view what we are about to build in its final form [here](https://schlotg.github.io/shopping-list.html#home)

### Installation
The first thing we need to do is install the Viage CLI. This assumes that you have Node 10.x or newer installed. If not, go to
[https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install it.

From a command prompt or terminal type:

``` npm install -g viage-cli```


### Create the Project
The [Viage CLI](https://github.com/schlotg/viage-cli) makes it easy to create a new project quickly. For the sake of this demo, we are going to call our project **viage-shopping-list**. Open a command prompt or terminal into the directory you want this project created in and type:

``` viage app viage-shopping-list ```

Once created, change directories to the newly created viage-shopping-list directory.

``` cd viage-shopping-list```

### Run the App
The Viage CLI has created a new project that uses Webpack, TypeScript, and the Viage base classes to create a simple App that is easy to build off of. To test that everything is working correctly, in a command prompt or terminal type:

```npm run start```

If you look inside the package.json file you will see three entries under scripts: **build**, **build-embedded**, and **start**. 'build' does a release build, 'build-embedded' inlines the source into the HTML and 'start' builds in debug and launches the debug webserver to serve up the app. As you make changes to the code, it will automatically recompile and serve the changes to the browser.

Your default browser should have opened a new tab with the Viage app running in it. If not you can always got to: [http://localhost:8080/](http://localhost:8080/)

You should see "Hello From Viage" in browser.
*Note - If you are running IE-11 or a really old browser you will see a message stating that your browser is not supported*

### Change the Title and the Page Content
Components draw and interact with the user. Services are singletons that are responsible for managing data. Components usually live in the src/components directory, but you may organize them however you want as long as they are still somewhere in the src directory. This is also true of Services, they generally live in the src/services directory.

When code is compiled, it is compiled to a single dest/bundle.js file. When using the start command you won't see the dest folder as the development server sends the output elsewhere. However, if you compile using the 'npm run build' command, you will see the dest folder populated with the freshly compiled **bundle.js** file.

In your favorite editor, I recommend [Visual Studio Code](https://code.visualstudio.com/), open up the src/components/app.ts file and inside your projects directory change:

```title = 'Hello From Viage';```

to

```title = 'Shopping List';```

Save your changes and you should see your app instantly update in the browser. Your code should now look like this:

```Javascript
import { Component } from 'viage';

title = "Shopping List";

export class App extends Component {
  constructor() {
    super('app');
    document.querySelector('title').textContent = this.title;

    this.attach('page', true);
    this.setHTML(`
      <h1 style="text-align: center">${this.title}</h1>
    `);
  }
}
```

### Components
All components must derive off of the Component base class which is located in Viage/core. TypeScript classes must call the constructor of their base class first thing in the constructor. This is done with the super() call and a component HTML tag name must be passed down to the base class. In this case the component is app and if you inspect the DOM using the browser debug tools, you will see a DOM element named \<app\>. This DOM element represents an instance of the component and will contain any HTML specified in the *setHTML()* function.

On the next line you can see that we use the standard DOM API *querySelector()* to find the title element of the DOM and set its text content to the variable *title*. Again, these are just standard modern DOM APIs.

A component must have some place to render its HTML to. This is what the *attach()* function is for. **attach()** is defined in the Component base class. It attaches this component to a DOM element that matches the CSS selector passed in. In this case that it is **page**.

Lastly, we set the HTML for this component using the *setHTML()* function. It is also defined in the Component base class. Notice that we use the backtick string functionality of ES6 (also know as Template Strings). By taking advantage of this modern Javascript feature, we can write natural HTML that spans multiple lines and use the built-in templating to insert values. Notice that the title is inserted into the h1 tag using the ${this.title} syntax.

### Debugging
Open the Debugger in your favorite modern browser. My recommendation is to use Chrome as it seems to currently have the best development tools. Certainly the other major browsers are not far behind. You should be able to navigate to the app.ts file we just modified. In Chrome you can find it at:

```webpack/./src/components/app.ts```

Notice that you can debug it in its native TypeScript form. Place a breakpoint and reload the page. You should see the browser pause on your breakpoint, and you should be able to step and inspect your code in TypeScript.


### [Next (Services)](docs/services.md)


