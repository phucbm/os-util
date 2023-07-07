// public styles
import '@viivue/atomic-css';
import 'honcau';

// private style
import './style.scss';

// source script
import {getOptionsFromAttribute} from "@/get-options-from-attribute";


// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `[DEV] ${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

/**
 * Lib usage
 */
getOptionsFromAttribute()