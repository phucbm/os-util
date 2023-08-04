/**
 * Events Manager v0.0.2
 * An util class to manage event with these features:
 * 1. Able to assign event via context.options or context.config
 * 2. Able to assign event via method on()
 * 3. Consistently fire an event with fire() method
 */
export class EventsManager{
    constructor(context, options){
        // requires context to access events from context.options or context.config
        if(!context) return;
        this.context = context;

        this.options = {
            names: [],
            ...options
        };


        // list of available event names
        this.eventNames = this.options.names;

        // list of events to be fired
        this.eventsList = [];
    }


    /**
     * Fire an event
     * @param eventName
     * @param obj
     */
    fire(eventName, obj = {}){
        // only when event exists
        if(!this.eventNames.includes(eventName)){
            console.warn(`Cannot fire unrecognized event "${eventName}"`, this, obj);
            return;
        }
        const response = {
            instance: this.context,
            eventName,
            ...obj
        };

        // fire event from option
        const contextOptions = this.context.config ? this.context.config : this.context.options;
        if(contextOptions){
            const eventFromOption = contextOptions[eventName];
            if(typeof eventFromOption === 'function') eventFromOption(response);
        }

        // fire event from late-assign list
        const eventFromList = this.eventsList[eventName];
        if(!!eventFromList?.length){
            eventFromList.forEach(callback => {
                if(typeof callback === 'function') callback(response);
            });
        }
    }


    /**
     * Add custom event listener
     */
    add(eventName, callback){
        eventName = getValidatedEventName(eventName);

        // only add registered event names
        const hasEvent = this.eventNames.includes(eventName);
        if(!hasEvent){
            console.warn(`Cannot add unrecognized event "${eventName}"`);
            return;
        }

        // create initial array of events
        if(typeof this.eventsList[eventName] === 'undefined') this.eventsList[eventName] = [];

        // save callback to the array
        this.eventsList[eventName].push(callback);
    }
}


/**
 * Get validated event name
 * make sure event name always has "on" at the beginning
 * @param name
 * @returns {string}
 */
function getValidatedEventName(name){
    let newName = name;

    // input: "onInit" => "onInit"
    // if name starts with "on"
    if(name.slice(0, 2) !== 'on'){
        // not start with "on" => uppercase the first letter and add "on" to the beginning
        newName = newName.charAt(0).toUpperCase() + newName.slice(1);
        newName = "on" + newName;
    }

    //console.log('getValidatedEventName', name, '=>', newName);
    return newName;
}