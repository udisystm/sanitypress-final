import{g as l,r as f,j as a}from"./sanity-b2fc26b5.js";var i=function s(t,r){if(t===r)return!0;if(t&&r&&typeof t=="object"&&typeof r=="object"){if(t.constructor!==r.constructor)return!1;var o,e,u;if(Array.isArray(t)){if(o=t.length,o!=r.length)return!1;for(e=o;e--!==0;)if(!s(t[e],r[e]))return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===r.toString();if(u=Object.keys(t),o=u.length,o!==Object.keys(r).length)return!1;for(e=o;e--!==0;)if(!Object.prototype.hasOwnProperty.call(r,u[e]))return!1;for(e=o;e--!==0;){var n=u[e];if(!s(t[n],r[n]))return!1}return!0}return t!==t&&r!==r};const p=l(i),c=f.createContext(null);function m(s){const{children:t,setDisplayedDocument:r,documentId:o}=s,e=f.useCallback(u=>r(n=>p(n,u)?n:u),[r]);return f.useEffect(()=>{if(o)return;const u=setTimeout(()=>r(null));return()=>clearTimeout(u)},[o,r]),a.jsx(c.Provider,{value:e,children:t})}function d(){return f.useContext(c)}export{m as D,p as i,d as u};
