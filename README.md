# Viage Shopping List Tutorial
This is a Viage tutorial that demonstrates how to build a simple shopping list app from the ground up using the Viage framework and CLI. It assumes you are familiar with TypeScript and modern DOM APIs. The site for this tutorial found at the [Viage Website](https://schlotg.github.io)

## What is Viage?
Viage is a minimal web framework that is also fast and easy to use. You can find out more about it [here](https://schlotg.github.io/)

## Tutorial
You can view what we are about to build in its final form [here](https://schlotg.github.io/shopping-list.html#home)

### Installation
The first thing we need to do is install the Viage CLI. This assumes that you have Node 10.x or newer installed. If not, go to
[https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install it.

From a command prompt or terminal type:

``` npm install -g viage-cli```

### Clone this Repo
 Clone this git repo locally so you can run it locally or go through the tutorial and build it yourself at [Viage Website](https://schlotg.github.io)

### Run the App
The Viage CLI has created a new project that uses Webpack, TypeScript, and the Viage base classes to create a simple App that is easy to build off of. To test that everything is working correctly, in a command prompt or terminal type:

```npm run start```

If you look inside the package.json file you will see three entries under scripts: **build**, **build-embedded**, and **start**. 'build' does a release build, 'build-embedded' inlines the source into the HTML and 'start' builds in debug and launches the debug webserver to serve up the app. As you make changes to the code, it will automatically recompile and serve the changes to the browser.

Your default browser should have opened a new tab with the Viage app running in it. If not you can always go to: [http://localhost:8080/](http://localhost:8080/)

You should see "Shopping List" in the browser.
*Note - If you are running IE-11 or a really old browser you will see a message stating that your browser is not supported*

