# OS Util

[![npm version](https://badgen.net/npm/v/@phucbm/os-util?icon=npm)](https://www.npmjs.com/package/@phucbm/os-util)
[![npm downloads](https://badgen.net/npm/dm/@phucbm/os-util?icon=npm)](https://www.npmjs.com/package/@phucbm/os-util)
[![npm dependents](https://badgen.net/npm/dependents/@phucbm/os-util?icon=npm)](https://www.npmjs.com/package/@phucbm/os-util)
[![github stars](https://badgen.net/github/stars/phucbm/os-util?icon=github)](https://github.com/phucbm/os-util/)
[![jsdelivr npm rank](https://badgen.net/jsdelivr/rank/npm/@phucbm/os-util?icon=npm)](https://www.npmjs.com/package/@phucbm/os-util)
[![github license](https://badgen.net/github/license/phucbm/os-util?icon=github)](https://github.com/phucbm/os-util/blob/main/LICENSE)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)

https://www.npmjs.com/package/@phucbm/os-util

## Install

```shell
# Install
npm i @phucbm/os-util
```

## Features

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

```js
import {EventsManager} from "@phucbm/os-util";
```

In your plugin constructor

```js
// init events manager
this.events = new EventsManager(this, {
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
# 1. Export the new function in index.js
# 2. Update version in package.json
# 3. Run publish
npm publish

# Dev
npm run dev
```
