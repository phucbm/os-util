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

