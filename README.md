# OS Util

### Get options from attribute

```js
import {getOptionsFromAttribute} from "@phucbm/os-util";
```

#### 1. Test cases for boolean and numeric values

```html

<section data-json='{"testNum":"480", "testFalse":"false", "testTrue":"true"}'>
</section>
```

```js
const options = getOptionsFromAttribute({
    target: document.querySelector('section'), // required, DOM element that holds the attribute
    attributeName: 'data-json', // required, attribute name that holds the value
    numericValues: ['testNum'], // optional, the props will be converted into numeric values
    defaultOptions: {}, // optional, options from attribute will override these default options, 
    // or return defaultOptions if options are not found
});
console.log(options); // => {"testNum": 480, "testFalse": false, "testTrue": true};
```

#### 2. Empty value

```html

<section data-json></section>
```

```js
const options = getOptionsFromAttribute({
    target: document.querySelector('section'),
    attributeName: 'data-json',
});
console.log(options); // => {}
```

#### 3. Value is just a string

```html

<section data-json="hello-world"></section>
```

```js
const options = getOptionsFromAttribute({
    target: document.querySelector('section'),
    attributeName: 'data-json',
    onIsString: value => {
        console.log(value); // => "hello-world"
    }
});
console.log(options); // => {}
```

### Events Manager

In your plugin constructor

```js
// init events manager
this.events = new EventManager(this, {
    names: ['onInit'] // register event names
});

// fire an event
this.events.fire('onInit', {source}); // the 2nd param is an object that will be passed to the callback
```

Create a method to assign late-events

```js
/**
 * Assign late-events
 */
function on(eventName, callback){
    this.events.add(eventName, callback);
}
```

Usage

```js
// add event from init
const instance = Plugin.init({
    onInit: data => {
        console.log('init', data)
    }
});

// add via method after init
instance.on('onInit', data => {
    console.log('init', data)
});

// with or without keyword on before the event name are all acceptable
instance.on('init', data => {
    console.log('init', data)
});
```

## Deployment

```shell
# Publish package
# 1. Update version in package.json
# 2. Run publish
npm publish

# Dev
npm run dev
```