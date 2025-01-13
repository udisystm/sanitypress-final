var y=Object.defineProperty;var F=(c,t,e)=>t in c?y(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var d=(c,t,e)=>(F(c,typeof t!="symbol"?t+"":t,e),e);import{r as L,j as B,bt as O}from"./sanity-b2fc26b5.js";/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */const a=class a{constructor(t,e,s,o){d(this,"size");d(this,"mask");d(this,"modules",[]);d(this,"isFunction",[]);if(this.version=t,this.errorCorrectionLevel=e,t<a.MIN_VERSION||t>a.MAX_VERSION)throw new RangeError("Version value out of range");if(o<-1||o>7)throw new RangeError("Mask value out of range");this.size=t*4+17;const n=[];for(let i=0;i<this.size;i++)n.push(!1);for(let i=0;i<this.size;i++)this.modules.push(n.slice()),this.isFunction.push(n.slice());this.drawFunctionPatterns();const r=this.addEccAndInterleave(s);if(this.drawCodewords(r),o==-1){let i=1e9;for(let u=0;u<8;u++){this.applyMask(u),this.drawFormatBits(u);const h=this.getPenaltyScore();h<i&&(o=u,i=h),this.applyMask(u)}}w(0<=o&&o<=7),this.mask=o,this.applyMask(o),this.drawFormatBits(o),this.isFunction=[]}static encodeText(t,e){const s=P.makeSegments(t);return a.encodeSegments(s,e)}static encodeBinary(t,e){const s=P.makeBytes(t);return a.encodeSegments([s],e)}static encodeSegments(t,e,s=1,o=40,n=-1,r=!0){if(!(a.MIN_VERSION<=s&&s<=o&&o<=a.MAX_VERSION)||n<-1||n>7)throw new RangeError("Invalid value");let i,u;for(i=s;;i++){const l=a.getNumDataCodewords(i,e)*8,m=P.getTotalBits(t,i);if(m<=l){u=m;break}if(i>=o)throw new RangeError("Data too long")}for(const l of[p.MEDIUM,p.QUARTILE,p.HIGH])r&&u<=a.getNumDataCodewords(i,l)*8&&(e=l);const h=[];for(const l of t){g(l.mode.modeBits,4,h),g(l.numChars,l.mode.numCharCountBits(i),h);for(const m of l.getData())h.push(m)}w(h.length==u);const M=a.getNumDataCodewords(i,e)*8;w(h.length<=M),g(0,Math.min(4,M-h.length),h),g(0,(8-h.length%8)%8,h),w(h.length%8==0);for(let l=236;h.length<M;l^=253)g(l,8,h);const E=[];for(;E.length*8<h.length;)E.push(0);return h.forEach((l,m)=>E[m>>>3]|=l<<7-(m&7)),new a(i,e,E,n)}getModule(t,e){return 0<=t&&t<this.size&&0<=e&&e<this.size&&this.modules[e][t]}getModules(){return this.modules}drawFunctionPatterns(){for(let s=0;s<this.size;s++)this.setFunctionModule(6,s,s%2==0),this.setFunctionModule(s,6,s%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const t=this.getAlignmentPatternPositions(),e=t.length;for(let s=0;s<e;s++)for(let o=0;o<e;o++)s==0&&o==0||s==0&&o==e-1||s==e-1&&o==0||this.drawAlignmentPattern(t[s],t[o]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(t){const e=this.errorCorrectionLevel.formatBits<<3|t;let s=e;for(let n=0;n<10;n++)s=s<<1^(s>>>9)*1335;const o=(e<<10|s)^21522;w(o>>>15==0);for(let n=0;n<=5;n++)this.setFunctionModule(8,n,N(o,n));this.setFunctionModule(8,7,N(o,6)),this.setFunctionModule(8,8,N(o,7)),this.setFunctionModule(7,8,N(o,8));for(let n=9;n<15;n++)this.setFunctionModule(14-n,8,N(o,n));for(let n=0;n<8;n++)this.setFunctionModule(this.size-1-n,8,N(o,n));for(let n=8;n<15;n++)this.setFunctionModule(8,this.size-15+n,N(o,n));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let t=this.version;for(let s=0;s<12;s++)t=t<<1^(t>>>11)*7973;const e=this.version<<12|t;w(e>>>18==0);for(let s=0;s<18;s++){const o=N(e,s),n=this.size-11+s%3,r=Math.floor(s/3);this.setFunctionModule(n,r,o),this.setFunctionModule(r,n,o)}}drawFinderPattern(t,e){for(let s=-4;s<=4;s++)for(let o=-4;o<=4;o++){const n=Math.max(Math.abs(o),Math.abs(s)),r=t+o,i=e+s;0<=r&&r<this.size&&0<=i&&i<this.size&&this.setFunctionModule(r,i,n!=2&&n!=4)}}drawAlignmentPattern(t,e){for(let s=-2;s<=2;s++)for(let o=-2;o<=2;o++)this.setFunctionModule(t+o,e+s,Math.max(Math.abs(o),Math.abs(s))!=1)}setFunctionModule(t,e,s){this.modules[e][t]=s,this.isFunction[e][t]=!0}addEccAndInterleave(t){const e=this.version,s=this.errorCorrectionLevel;if(t.length!=a.getNumDataCodewords(e,s))throw new RangeError("Invalid argument");const o=a.NUM_ERROR_CORRECTION_BLOCKS[s.ordinal][e],n=a.ECC_CODEWORDS_PER_BLOCK[s.ordinal][e],r=Math.floor(a.getNumRawDataModules(e)/8),i=o-r%o,u=Math.floor(r/o),h=[],M=a.reedSolomonComputeDivisor(n);for(let l=0,m=0;l<o;l++){const R=t.slice(m,m+u-n+(l<i?0:1));m+=R.length;const b=a.reedSolomonComputeRemainder(R,M);l<i&&R.push(0),h.push(R.concat(b))}const E=[];for(let l=0;l<h[0].length;l++)h.forEach((m,R)=>{(l!=u-n||R>=i)&&E.push(m[l])});return w(E.length==r),E}drawCodewords(t){if(t.length!=Math.floor(a.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let e=0;for(let s=this.size-1;s>=1;s-=2){s==6&&(s=5);for(let o=0;o<this.size;o++)for(let n=0;n<2;n++){const r=s-n,i=s+1&2?o:this.size-1-o;!this.isFunction[i][r]&&e<t.length*8&&(this.modules[i][r]=N(t[e>>>3],7-(e&7)),e++)}}w(e==t.length*8)}applyMask(t){if(t<0||t>7)throw new RangeError("Mask value out of range");for(let e=0;e<this.size;e++)for(let s=0;s<this.size;s++){let o;switch(t){case 0:o=(s+e)%2==0;break;case 1:o=e%2==0;break;case 2:o=s%3==0;break;case 3:o=(s+e)%3==0;break;case 4:o=(Math.floor(s/3)+Math.floor(e/2))%2==0;break;case 5:o=s*e%2+s*e%3==0;break;case 6:o=(s*e%2+s*e%3)%2==0;break;case 7:o=((s+e)%2+s*e%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[e][s]&&o&&(this.modules[e][s]=!this.modules[e][s])}}getPenaltyScore(){let t=0;for(let n=0;n<this.size;n++){let r=!1,i=0;const u=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[n][h]==r?(i++,i==5?t+=a.PENALTY_N1:i>5&&t++):(this.finderPenaltyAddHistory(i,u),r||(t+=this.finderPenaltyCountPatterns(u)*a.PENALTY_N3),r=this.modules[n][h],i=1);t+=this.finderPenaltyTerminateAndCount(r,i,u)*a.PENALTY_N3}for(let n=0;n<this.size;n++){let r=!1,i=0;const u=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][n]==r?(i++,i==5?t+=a.PENALTY_N1:i>5&&t++):(this.finderPenaltyAddHistory(i,u),r||(t+=this.finderPenaltyCountPatterns(u)*a.PENALTY_N3),r=this.modules[h][n],i=1);t+=this.finderPenaltyTerminateAndCount(r,i,u)*a.PENALTY_N3}for(let n=0;n<this.size-1;n++)for(let r=0;r<this.size-1;r++){const i=this.modules[n][r];i==this.modules[n][r+1]&&i==this.modules[n+1][r]&&i==this.modules[n+1][r+1]&&(t+=a.PENALTY_N2)}let e=0;for(const n of this.modules)e=n.reduce((r,i)=>r+(i?1:0),e);const s=this.size*this.size,o=Math.ceil(Math.abs(e*20-s*10)/s)-1;return w(0<=o&&o<=9),t+=o*a.PENALTY_N4,w(0<=t&&t<=2568888),t}getAlignmentPatternPositions(){if(this.version==1)return[];{const t=Math.floor(this.version/7)+2,e=this.version==32?26:Math.ceil((this.version*4+4)/(t*2-2))*2,s=[6];for(let o=this.size-7;s.length<t;o-=e)s.splice(1,0,o);return s}}static getNumRawDataModules(t){if(t<a.MIN_VERSION||t>a.MAX_VERSION)throw new RangeError("Version number out of range");let e=(16*t+128)*t+64;if(t>=2){const s=Math.floor(t/7)+2;e-=(25*s-10)*s-55,t>=7&&(e-=36)}return w(208<=e&&e<=29648),e}static getNumDataCodewords(t,e){return Math.floor(a.getNumRawDataModules(t)/8)-a.ECC_CODEWORDS_PER_BLOCK[e.ordinal][t]*a.NUM_ERROR_CORRECTION_BLOCKS[e.ordinal][t]}static reedSolomonComputeDivisor(t){if(t<1||t>255)throw new RangeError("Degree out of range");const e=[];for(let o=0;o<t-1;o++)e.push(0);e.push(1);let s=1;for(let o=0;o<t;o++){for(let n=0;n<e.length;n++)e[n]=a.reedSolomonMultiply(e[n],s),n+1<e.length&&(e[n]^=e[n+1]);s=a.reedSolomonMultiply(s,2)}return e}static reedSolomonComputeRemainder(t,e){const s=e.map(o=>0);for(const o of t){const n=o^s.shift();s.push(0),e.forEach((r,i)=>s[i]^=a.reedSolomonMultiply(r,n))}return s}static reedSolomonMultiply(t,e){if(t>>>8||e>>>8)throw new RangeError("Byte out of range");let s=0;for(let o=7;o>=0;o--)s=s<<1^(s>>>7)*285,s^=(e>>>o&1)*t;return w(s>>>8==0),s}finderPenaltyCountPatterns(t){const e=t[1];w(e<=this.size*3);const s=e>0&&t[2]==e&&t[3]==e*3&&t[4]==e&&t[5]==e;return(s&&t[0]>=e*4&&t[6]>=e?1:0)+(s&&t[6]>=e*4&&t[0]>=e?1:0)}finderPenaltyTerminateAndCount(t,e,s){return t&&(this.finderPenaltyAddHistory(e,s),e=0),e+=this.size,this.finderPenaltyAddHistory(e,s),this.finderPenaltyCountPatterns(s)}finderPenaltyAddHistory(t,e){e[0]==0&&(t+=this.size),e.pop(),e.unshift(t)}};d(a,"MIN_VERSION",1),d(a,"MAX_VERSION",40),d(a,"PENALTY_N1",3),d(a,"PENALTY_N2",3),d(a,"PENALTY_N3",40),d(a,"PENALTY_N4",10),d(a,"ECC_CODEWORDS_PER_BLOCK",[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]]),d(a,"NUM_ERROR_CORRECTION_BLOCKS",[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]]);let S=a;function g(c,t,e){if(t<0||t>31||c>>>t)throw new RangeError("Value out of range");for(let s=t-1;s>=0;s--)e.push(c>>>s&1)}function N(c,t){return(c>>>t&1)!=0}function w(c){if(!c)throw new Error("Assertion error")}const f=class f{constructor(t,e,s){if(this.mode=t,this.numChars=e,this.bitData=s,e<0)throw new RangeError("Invalid argument");this.bitData=s.slice()}static makeBytes(t){const e=[];for(const s of t)g(s,8,e);return new f(I.BYTE,t.length,e)}static makeNumeric(t){if(!f.isNumeric(t))throw new RangeError("String contains non-numeric characters");const e=[];for(let s=0;s<t.length;){const o=Math.min(t.length-s,3);g(parseInt(t.substring(s,s+o),10),o*3+1,e),s+=o}return new f(I.NUMERIC,t.length,e)}static makeAlphanumeric(t){if(!f.isAlphanumeric(t))throw new RangeError("String contains unencodable characters in alphanumeric mode");const e=[];let s;for(s=0;s+2<=t.length;s+=2){let o=f.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s))*45;o+=f.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s+1)),g(o,11,e)}return s<t.length&&g(f.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s)),6,e),new f(I.ALPHANUMERIC,t.length,e)}static makeSegments(t){return t==""?[]:f.isNumeric(t)?[f.makeNumeric(t)]:f.isAlphanumeric(t)?[f.makeAlphanumeric(t)]:[f.makeBytes(f.toUtf8ByteArray(t))]}static makeEci(t){const e=[];if(t<0)throw new RangeError("ECI assignment value out of range");if(t<128)g(t,8,e);else if(t<16384)g(2,2,e),g(t,14,e);else if(t<1e6)g(6,3,e),g(t,21,e);else throw new RangeError("ECI assignment value out of range");return new f(I.ECI,0,e)}static isNumeric(t){return f.NUMERIC_REGEX.test(t)}static isAlphanumeric(t){return f.ALPHANUMERIC_REGEX.test(t)}getData(){return this.bitData.slice()}static getTotalBits(t,e){let s=0;for(const o of t){const n=o.mode.numCharCountBits(e);if(o.numChars>=1<<n)return 1/0;s+=4+n+o.bitData.length}return s}static toUtf8ByteArray(t){t=encodeURI(t);const e=[];for(let s=0;s<t.length;s++)t.charAt(s)!="%"?e.push(t.charCodeAt(s)):(e.push(parseInt(t.substring(s+1,s+3),16)),s+=2);return e}};d(f,"NUMERIC_REGEX",/^[0-9]*$/),d(f,"ALPHANUMERIC_REGEX",/^[A-Z0-9 $%*+./:-]*$/),d(f,"ALPHANUMERIC_CHARSET","0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:");let P=f;const A=class A{constructor(t,e){this.ordinal=t,this.formatBits=e}};d(A,"LOW",new A(0,1)),d(A,"MEDIUM",new A(1,0)),d(A,"QUARTILE",new A(2,3)),d(A,"HIGH",new A(3,2));let p=A;const C=class C{constructor(t,e){this.modeBits=t,this.numBitsCharCount=e}numCharCountBits(t){return this.numBitsCharCount[Math.floor((t+7)/17)]}};d(C,"NUMERIC",new C(1,[10,12,14])),d(C,"ALPHANUMERIC",new C(2,[9,11,13])),d(C,"BYTE",new C(4,[8,16,16])),d(C,"KANJI",new C(8,[8,10,12])),d(C,"ECI",new C(7,[0,0,0]));let I=C;const T={L:p.LOW,M:p.MEDIUM,Q:p.QUARTILE,H:p.HIGH},D=128,z="L",U="#000000",v=!1,k=1,H=4,Y=0;function $(c,t=0){const e=[];return c.forEach(function(s,o){let n=null;s.forEach(function(r,i){if(!r&&n!==null){e.push(`M${n+t} ${o+t}h${i-n}v1H${n+t}z`),n=null;return}if(i===s.length-1){if(!r)return;n===null?e.push(`M${i+t},${o+t} h1v1H${i+t}z`):e.push(`M${n+t},${o+t} h${i+1-n}v1H${n+t}z`);return}r&&n===null&&(n=i)})}),e.join("")}function G(c,t){return c.slice().map((e,s)=>s<t.y||s>=t.y+t.h?e:e.map((o,n)=>n<t.x||n>=t.x+t.w?o:!1))}function X(c,t,e,s){if(!s)return null;const o=(c.length+e*2)/t,n=s*o,r=s*o,i=c.length/2-n/2,u=c.length/2-r/2,h=Math.floor(i),M=Math.floor(u),E=Math.ceil(n+i-h),l=Math.ceil(r+u-M);return{x:i,y:u,h:r,w:n,excavation:{x:h,y:M,w:E,h:l}}}function V(c,t){return t!=null?Math.max(Math.floor(t),0):c?H:Y}function j({value:c,level:t,minVersion:e,includeMargin:s,marginSize:o,logoSize:n,size:r}){const i=L.useMemo(()=>{const l=P.makeSegments(c);return S.encodeSegments(l,T[t],e)},[c,t,e]),{cells:u,margin:h,numCells:M,calculatedImageSettings:E}=L.useMemo(()=>{const l=i.getModules(),m=V(s,o),R=l.length+m*2,b=X(l,r,m,n);return{cells:l,margin:m,numCells:R,calculatedImageSettings:b}},[i,r,n,s,o]);return{qrcode:i,margin:h,cells:u,numCells:M,calculatedImageSettings:E}}function K(c){const{value:t,size:e=D,level:s=z,color:o=U,minVersion:n=k,title:r,logoSize:i}=c,u=void 0,{margin:h,cells:M,numCells:E,calculatedImageSettings:l}=j({value:t,level:s,minVersion:n,includeMargin:v,marginSize:u,logoSize:i,size:e}),m=L.useMemo(()=>i&&(l!=null&&l.excavation)?G(M,l.excavation):M,[l==null?void 0:l.excavation,M,i]),R=$(m,h);return B.jsxs("svg",{height:e,width:e,viewBox:`0 0 ${E} ${E}`,role:"img",children:[!!r&&B.jsx("title",{children:r}),B.jsx(O.path,{fill:o,d:R,shapeRendering:"crispEdges",initial:{opacity:0},animate:{opacity:2},exit:{opacity:-1}})]})}const W=L.memo(K);W.displayName="Memo(QRCodeSVG)";export{W as default};
