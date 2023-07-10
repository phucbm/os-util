/**!
 * OS Utility v0.0.1
 * @author phucbm
 * @homepage https://github.com/phucbm/os-util
 * @license MIT 2023
 */var t={d:(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function r({target:t,attributeName:e="",defaultOptions:r={},numericValues:n=[],onIsString:o,dev:a=!1}){if(!t)return a&&console.warn("Target not found!",t),r;if(!t.hasAttribute(e))return void console.warn("Attribute not found from target",e);const i=t.getAttribute(e);if(!i.length)return r;if(!function(t){try{return JSON.parse(t)&&!!t}catch(t){return!1}}(i))return"function"==typeof o?o(i):console.warn("Not a JSON string",i),r;let u=JSON.parse(i);for(const[t,e]of Object.entries(u))"false"===e?u[t]=!1:"true"===e?u[t]=!0:n.includes(t)&&"string"==typeof e&&e.length>0?u[t]=parseFloat(e):u[t]=e;return{...r,...u}}t.d(e,{y:()=>r});var n=e.y;export{n as getOptionsFromAttribute};