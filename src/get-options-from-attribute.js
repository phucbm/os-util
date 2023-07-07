import {isJsonString} from "./is-json-string";

/**
 * Get options from attribute
 * @param target
 * @param attributeName
 * @param defaultOptions
 * @param numericValues
 * @returns {*}
 */
export function getOptionsFromAttribute(
    {
        target,
        attributeName = '',
        defaultOptions = {},
        numericValues = [] // convert these props to float
    }
){
    /**
     * Validate
     */
    // no attribute found
    if(!target.hasAttribute(attributeName)){
        console.warn('Attribute not found from target', attributeName);
        return;
    }

    // options from attribute
    const dataAttribute = target.getAttribute(attributeName);

    // no value found
    if(!dataAttribute.length){
        return;
    }

    // not a JSON string
    if(!isJsonString(dataAttribute)){
        console.warn('Not a JSON string', dataAttribute);
        return;
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