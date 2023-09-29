import {isJsonString} from "./is-json-string";

/**
 * Get options from attribute v0.0.2
 * @param target
 * @param attributeName
 * @param defaultOptions
 * @param numericValues
 * @param onIsString
 * @param dev
 * @returns {*}
 */
export function getOptionsFromAttribute(
    {
        target,
        attributeName = '',
        defaultOptions = {},
        numericValues = [], // convert these props to float
        onIsString = undefined,
        dev = false,
    }
){
    /**
     * Validate
     */
    if(!target){
        console.warn('Requires target to get options from attribute!', target);
        return defaultOptions;
    }

    // no attribute found
    if(!target.hasAttribute(attributeName)){
        if(dev) console.warn('Attribute not found from target', attributeName);
        return defaultOptions;
    }

    // options from attribute
    const dataAttribute = target.getAttribute(attributeName);

    // no value found
    if(!dataAttribute.length){
        // return default options
        return defaultOptions;
    }

    // not a JSON string
    if(!isJsonString(dataAttribute)){
        if(typeof onIsString === 'function'){
            // exe callback if available
            onIsString(dataAttribute);
        }else{
            // throw warning if callback is not found
            console.warn('Not a JSON string', dataAttribute);
        }
        return defaultOptions;
    }

    /**
     * Parse JSON
     */
        // parse object from string
    let options = JSON.parse(dataAttribute);

    // loop through each prop
    for(const [key, value] of Object.entries(options)){
        // convert boolean string to real boolean
        if(value === "false") options[key] = false;
        else if(value === "true") options[key] = true;

        // convert string to float
        else if(numericValues.includes(key) && typeof value === 'string' && value.length > 0) options[key] = parseFloat(value);
        else options[key] = value;
    }

    return {...defaultOptions, ...options};
}