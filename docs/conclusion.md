# Viage Shopping List Tutorial

## Testing
Although not covered in the tutorial, Viage works very well with [Jest](https://jestjs.io/en/) test framework. Specifically Viage uses the [ts-jest](https://github.com/kulshekhar/ts-jest#supports-synthetic-modules) project so that all the tests can be written in Typescript and work seamlessly with Viage. The Viage CLI creates all the necessary hooks so that all you have to do is add tests to the test directory. You can use this project as an example for how to write functional and unit tests for a Viage project. To execute the tests type:

```Javascript
    npm run test
```

The Jest page has excellant documentation and is a great resource for Viage Testing

## Conclusion

### Size
At this point, we have a very functional application. If you type ```npm run build``` you will see that the final Javascript file size of bundle.js is 19kb and the index.html file is 667 bytes. That is remarkably small compared to the same app built in most other frameworks.

### Amount of Code
The amount of coding required to produce this app is on par with most of the popular frameworks if not smaller. However, the amount of specific framework knowledge required to effectively use Viage is small. Viage should work with most Javascript libraries right out of the box. The Component / Service model is reasonably effective at keeping code organized, resusable, maintainable, and scalable.


| Framework | Size          |
|-----------|---------------|
| Viage     | 19KB          |
| Angular   | 351KB         |
| React     | 158KB         |


For the sake of codes size and complexity comparisons, I have implemented this same app in React and Angular. You can find them and a running Viage version here:

[Viage](https://schlotg.github.io/shopping-list.html#home)

[React - running](https://schlotg.github.io/react-shopping-list/index)

[React - project](https://github.com/schlotg/react-shopping-list)

[Angular - running](https://schlotg.github.io/angular-shopping-list/home)

[Angular - project](https://github.com/schlotg/angular-shopping-list)
