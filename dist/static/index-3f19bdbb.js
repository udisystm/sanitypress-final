import{P as L,G as M,N as $,a5 as E,F as y,I as S,a0 as j}from"./index-973dc220.js";class v{constructor(t,e,s,i,h,r,n,o,a,u=0,f){this.p=t,this.stack=e,this.state=s,this.reducePos=i,this.pos=h,this.score=r,this.buffer=n,this.bufferBase=o,this.curContext=a,this.lookAhead=u,this.parent=f}toString(){return`[${this.stack.filter((t,e)=>e%3==0).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`}static start(t,e,s=0){let i=t.parser.context;return new v(t,[],e,s,s,0,[],0,i?new N(i,i.start):null,0,null)}get context(){return this.curContext?this.curContext.context:null}pushState(t,e){this.stack.push(this.state,e,this.bufferBase+this.buffer.length),this.state=t}reduce(t){var e;let s=t>>19,i=t&65535,{parser:h}=this.p,r=this.reducePos<this.pos-25;r&&this.setLookAhead(this.pos);let n=h.dynamicPrecedence(i);if(n&&(this.score+=n),s==0){this.pushState(h.getGoto(this.state,i,!0),this.reducePos),i<h.minRepeatTerm&&this.storeNode(i,this.reducePos,this.reducePos,r?8:4,!0),this.reduceContext(i,this.reducePos);return}let o=this.stack.length-(s-1)*3-(t&262144?6:0),a=o?this.stack[o-2]:this.p.ranges[0].from,u=this.reducePos-a;u>=2e3&&!(!((e=this.p.parser.nodeSet.types[i])===null||e===void 0)&&e.isAnonymous)&&(a==this.p.lastBigReductionStart?(this.p.bigReductionCount++,this.p.lastBigReductionSize=u):this.p.lastBigReductionSize<u&&(this.p.bigReductionCount=1,this.p.lastBigReductionStart=a,this.p.lastBigReductionSize=u));let f=o?this.stack[o-1]:0,p=this.bufferBase+this.buffer.length-f;if(i<h.minRepeatTerm||t&131072){let c=h.stateFlag(this.state,1)?this.pos:this.reducePos;this.storeNode(i,a,c,p+4,!0)}if(t&262144)this.state=this.stack[o];else{let c=this.stack[o-3];this.state=h.getGoto(c,i,!0)}for(;this.stack.length>o;)this.stack.pop();this.reduceContext(i,a)}storeNode(t,e,s,i=4,h=!1){if(t==0&&(!this.stack.length||this.stack[this.stack.length-1]<this.buffer.length+this.bufferBase)){let r=this,n=this.buffer.length;if(n==0&&r.parent&&(n=r.bufferBase-r.parent.bufferBase,r=r.parent),n>0&&r.buffer[n-4]==0&&r.buffer[n-1]>-1){if(e==s)return;if(r.buffer[n-2]>=e){r.buffer[n-2]=s;return}}}if(!h||this.pos==s)this.buffer.push(t,e,s,i);else{let r=this.buffer.length;if(r>0&&this.buffer[r-4]!=0){let n=!1;for(let o=r;o>0&&this.buffer[o-2]>s;o-=4)if(this.buffer[o-1]>=0){n=!0;break}if(n)for(;r>0&&this.buffer[r-2]>s;)this.buffer[r]=this.buffer[r-4],this.buffer[r+1]=this.buffer[r-3],this.buffer[r+2]=this.buffer[r-2],this.buffer[r+3]=this.buffer[r-1],r-=4,i>4&&(i-=4)}this.buffer[r]=t,this.buffer[r+1]=e,this.buffer[r+2]=s,this.buffer[r+3]=i}}shift(t,e,s,i){if(t&131072)this.pushState(t&65535,this.pos);else if(t&262144)this.pos=i,this.shiftContext(e,s),e<=this.p.parser.maxNode&&this.buffer.push(e,s,i,4);else{let h=t,{parser:r}=this.p;(i>this.pos||e<=r.maxNode)&&(this.pos=i,r.stateFlag(h,1)||(this.reducePos=i)),this.pushState(h,s),this.shiftContext(e,s),e<=r.maxNode&&this.buffer.push(e,s,i,4)}}apply(t,e,s,i){t&65536?this.reduce(t):this.shift(t,e,s,i)}useNode(t,e){let s=this.p.reused.length-1;(s<0||this.p.reused[s]!=t)&&(this.p.reused.push(t),s++);let i=this.pos;this.reducePos=this.pos=i+t.length,this.pushState(e,i),this.buffer.push(s,i,this.reducePos,-1),this.curContext&&this.updateContext(this.curContext.tracker.reuse(this.curContext.context,t,this,this.p.stream.reset(this.pos-t.length)))}split(){let t=this,e=t.buffer.length;for(;e>0&&t.buffer[e-2]>t.reducePos;)e-=4;let s=t.buffer.slice(e),i=t.bufferBase+e;for(;t&&i==t.bufferBase;)t=t.parent;return new v(this.p,this.stack.slice(),this.state,this.reducePos,this.pos,this.score,s,i,this.curContext,this.lookAhead,t)}recoverByDelete(t,e){let s=t<=this.p.parser.maxNode;s&&this.storeNode(t,this.pos,e,4),this.storeNode(0,this.pos,e,s?8:4),this.pos=this.reducePos=e,this.score-=190}canShift(t){for(let e=new G(this);;){let s=this.p.parser.stateSlot(e.state,4)||this.p.parser.hasAction(e.state,t);if(s==0)return!1;if(!(s&65536))return!0;e.reduce(s)}}recoverByInsert(t){if(this.stack.length>=300)return[];let e=this.p.parser.nextStates(this.state);if(e.length>8||this.stack.length>=120){let i=[];for(let h=0,r;h<e.length;h+=2)(r=e[h+1])!=this.state&&this.p.parser.hasAction(r,t)&&i.push(e[h],r);if(this.stack.length<120)for(let h=0;i.length<8&&h<e.length;h+=2){let r=e[h+1];i.some((n,o)=>o&1&&n==r)||i.push(e[h],r)}e=i}let s=[];for(let i=0;i<e.length&&s.length<4;i+=2){let h=e[i+1];if(h==this.state)continue;let r=this.split();r.pushState(h,this.pos),r.storeNode(0,r.pos,r.pos,4,!0),r.shiftContext(e[i],this.pos),r.reducePos=this.pos,r.score-=200,s.push(r)}return s}forceReduce(){let{parser:t}=this.p,e=t.stateSlot(this.state,5);if(!(e&65536))return!1;if(!t.validAction(this.state,e)){let s=e>>19,i=e&65535,h=this.stack.length-s*3;if(h<0||t.getGoto(this.stack[h],i,!1)<0){let r=this.findForcedReduction();if(r==null)return!1;e=r}this.storeNode(0,this.pos,this.pos,4,!0),this.score-=100}return this.reducePos=this.pos,this.reduce(e),!0}findForcedReduction(){let{parser:t}=this.p,e=[],s=(i,h)=>{if(!e.includes(i))return e.push(i),t.allActions(i,r=>{if(!(r&393216))if(r&65536){let n=(r>>19)-h;if(n>1){let o=r&65535,a=this.stack.length-n*3;if(a>=0&&t.getGoto(this.stack[a],o,!1)>=0)return n<<19|65536|o}}else{let n=s(r,h+1);if(n!=null)return n}})};return s(this.state,0)}forceAll(){for(;!this.p.parser.stateFlag(this.state,2);)if(!this.forceReduce()){this.storeNode(0,this.pos,this.pos,4,!0);break}return this}get deadEnd(){if(this.stack.length!=3)return!1;let{parser:t}=this.p;return t.data[t.stateSlot(this.state,1)]==65535&&!t.stateSlot(this.state,4)}restart(){this.storeNode(0,this.pos,this.pos,4,!0),this.state=this.stack[0],this.stack.length=0}sameState(t){if(this.state!=t.state||this.stack.length!=t.stack.length)return!1;for(let e=0;e<this.stack.length;e+=3)if(this.stack[e]!=t.stack[e])return!1;return!0}get parser(){return this.p.parser}dialectEnabled(t){return this.p.parser.dialect.flags[t]}shiftContext(t,e){this.curContext&&this.updateContext(this.curContext.tracker.shift(this.curContext.context,t,this,this.p.stream.reset(e)))}reduceContext(t,e){this.curContext&&this.updateContext(this.curContext.tracker.reduce(this.curContext.context,t,this,this.p.stream.reset(e)))}emitContext(){let t=this.buffer.length-1;(t<0||this.buffer[t]!=-3)&&this.buffer.push(this.curContext.hash,this.pos,this.pos,-3)}emitLookAhead(){let t=this.buffer.length-1;(t<0||this.buffer[t]!=-4)&&this.buffer.push(this.lookAhead,this.pos,this.pos,-4)}updateContext(t){if(t!=this.curContext.context){let e=new N(this.curContext.tracker,t);e.hash!=this.curContext.hash&&this.emitContext(),this.curContext=e}}setLookAhead(t){t>this.lookAhead&&(this.emitLookAhead(),this.lookAhead=t)}close(){this.curContext&&this.curContext.tracker.strict&&this.emitContext(),this.lookAhead>0&&this.emitLookAhead()}}class N{constructor(t,e){this.tracker=t,this.context=e,this.hash=t.strict?t.hash(e):0}}class G{constructor(t){this.start=t,this.state=t.state,this.stack=t.stack,this.base=this.stack.length}reduce(t){let e=t&65535,s=t>>19;s==0?(this.stack==this.start.stack&&(this.stack=this.stack.slice()),this.stack.push(this.state,0,0),this.base+=3):this.base-=(s-1)*3;let i=this.start.p.parser.getGoto(this.stack[this.base-3],e,!0);this.state=i}}class A{constructor(t,e,s){this.stack=t,this.pos=e,this.index=s,this.buffer=t.buffer,this.index==0&&this.maybeNext()}static create(t,e=t.bufferBase+t.buffer.length){return new A(t,e,e-t.bufferBase)}maybeNext(){let t=this.stack.parent;t!=null&&(this.index=this.stack.bufferBase-t.bufferBase,this.stack=t,this.buffer=t.buffer)}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}next(){this.index-=4,this.pos-=4,this.index==0&&this.maybeNext()}fork(){return new A(this.stack,this.pos,this.index)}}function x(l,t=Uint16Array){if(typeof l!="string")return l;let e=null;for(let s=0,i=0;s<l.length;){let h=0;for(;;){let r=l.charCodeAt(s++),n=!1;if(r==126){h=65535;break}r>=92&&r--,r>=34&&r--;let o=r-32;if(o>=46&&(o-=46,n=!0),h+=o,n)break;h*=46}e?e[i++]=h:e=new t(h)}return e}class P{constructor(){this.start=-1,this.value=-1,this.end=-1,this.extended=-1,this.lookAhead=0,this.mask=0,this.context=0}}const R=new P;class U{constructor(t,e){this.input=t,this.ranges=e,this.chunk="",this.chunkOff=0,this.chunk2="",this.chunk2Pos=0,this.next=-1,this.token=R,this.rangeIndex=0,this.pos=this.chunkPos=e[0].from,this.range=e[0],this.end=e[e.length-1].to,this.readNext()}resolveOffset(t,e){let s=this.range,i=this.rangeIndex,h=this.pos+t;for(;h<s.from;){if(!i)return null;let r=this.ranges[--i];h-=s.from-r.to,s=r}for(;e<0?h>s.to:h>=s.to;){if(i==this.ranges.length-1)return null;let r=this.ranges[++i];h+=r.from-s.to,s=r}return h}clipPos(t){if(t>=this.range.from&&t<this.range.to)return t;for(let e of this.ranges)if(e.to>t)return Math.max(t,e.from);return this.end}peek(t){let e=this.chunkOff+t,s,i;if(e>=0&&e<this.chunk.length)s=this.pos+t,i=this.chunk.charCodeAt(e);else{let h=this.resolveOffset(t,1);if(h==null)return-1;if(s=h,s>=this.chunk2Pos&&s<this.chunk2Pos+this.chunk2.length)i=this.chunk2.charCodeAt(s-this.chunk2Pos);else{let r=this.rangeIndex,n=this.range;for(;n.to<=s;)n=this.ranges[++r];this.chunk2=this.input.chunk(this.chunk2Pos=s),s+this.chunk2.length>n.to&&(this.chunk2=this.chunk2.slice(0,n.to-s)),i=this.chunk2.charCodeAt(0)}}return s>=this.token.lookAhead&&(this.token.lookAhead=s+1),i}acceptToken(t,e=0){let s=e?this.resolveOffset(e,-1):this.pos;if(s==null||s<this.token.start)throw new RangeError("Token end out of bounds");this.token.value=t,this.token.end=s}acceptTokenTo(t,e){this.token.value=t,this.token.end=e}getChunk(){if(this.pos>=this.chunk2Pos&&this.pos<this.chunk2Pos+this.chunk2.length){let{chunk:t,chunkPos:e}=this;this.chunk=this.chunk2,this.chunkPos=this.chunk2Pos,this.chunk2=t,this.chunk2Pos=e,this.chunkOff=this.pos-this.chunkPos}else{this.chunk2=this.chunk,this.chunk2Pos=this.chunkPos;let t=this.input.chunk(this.pos),e=this.pos+t.length;this.chunk=e>this.range.to?t.slice(0,this.range.to-this.pos):t,this.chunkPos=this.pos,this.chunkOff=0}}readNext(){return this.chunkOff>=this.chunk.length&&(this.getChunk(),this.chunkOff==this.chunk.length)?this.next=-1:this.next=this.chunk.charCodeAt(this.chunkOff)}advance(t=1){for(this.chunkOff+=t;this.pos+t>=this.range.to;){if(this.rangeIndex==this.ranges.length-1)return this.setDone();t-=this.range.to-this.pos,this.range=this.ranges[++this.rangeIndex],this.pos=this.range.from}return this.pos+=t,this.pos>=this.token.lookAhead&&(this.token.lookAhead=this.pos+1),this.readNext()}setDone(){return this.pos=this.chunkPos=this.end,this.range=this.ranges[this.rangeIndex=this.ranges.length-1],this.chunk="",this.next=-1}reset(t,e){if(e?(this.token=e,e.start=t,e.lookAhead=t+1,e.value=e.extended=-1):this.token=R,this.pos!=t){if(this.pos=t,t==this.end)return this.setDone(),this;for(;t<this.range.from;)this.range=this.ranges[--this.rangeIndex];for(;t>=this.range.to;)this.range=this.ranges[++this.rangeIndex];t>=this.chunkPos&&t<this.chunkPos+this.chunk.length?this.chunkOff=t-this.chunkPos:(this.chunk="",this.chunkOff=0),this.readNext()}return this}read(t,e){if(t>=this.chunkPos&&e<=this.chunkPos+this.chunk.length)return this.chunk.slice(t-this.chunkPos,e-this.chunkPos);if(t>=this.chunk2Pos&&e<=this.chunk2Pos+this.chunk2.length)return this.chunk2.slice(t-this.chunk2Pos,e-this.chunk2Pos);if(t>=this.range.from&&e<=this.range.to)return this.input.read(t,e);let s="";for(let i of this.ranges){if(i.from>=e)break;i.to>t&&(s+=this.input.read(Math.max(i.from,t),Math.min(i.to,e)))}return s}}class m{constructor(t,e){this.data=t,this.id=e}token(t,e){let{parser:s}=e.p;F(this.data,t,e,this.id,s.data,s.tokenPrecTable)}}m.prototype.contextual=m.prototype.fallback=m.prototype.extend=!1;class H{constructor(t,e,s){this.precTable=e,this.elseToken=s,this.data=typeof t=="string"?x(t):t}token(t,e){let s=t.pos,i=0;for(;;){let h=t.next<0,r=t.resolveOffset(1,1);if(F(this.data,t,e,0,this.data,this.precTable),t.token.value>-1)break;if(this.elseToken==null)return;if(h||i++,r==null)break;t.reset(r,t.token)}i&&(t.reset(s,t.token),t.acceptToken(this.elseToken,i))}}H.prototype.contextual=m.prototype.fallback=m.prototype.extend=!1;class Y{constructor(t,e={}){this.token=t,this.contextual=!!e.contextual,this.fallback=!!e.fallback,this.extend=!!e.extend}}function F(l,t,e,s,i,h){let r=0,n=1<<s,{dialect:o}=e.p.parser;t:for(;n&l[r];){let a=l[r+1];for(let c=r+3;c<a;c+=2)if((l[c+1]&n)>0){let d=l[c];if(o.allows(d)&&(t.token.value==-1||t.token.value==d||W(d,t.token.value,i,h))){t.acceptToken(d);break}}let u=t.next,f=0,p=l[r+2];if(t.next<0&&p>f&&l[a+p*3-3]==65535){r=l[a+p*3-1];continue t}for(;f<p;){let c=f+p>>1,d=a+c+(c<<1),b=l[d],O=l[d+1]||65536;if(u<b)p=c;else if(u>=O)f=c+1;else{r=l[d+2],t.advance();continue t}}break}}function z(l,t,e){for(let s=t,i;(i=l[s])!=65535;s++)if(i==e)return s-t;return-1}function W(l,t,e,s){let i=z(e,s,t);return i<0||z(e,s,l)<i}const g=typeof process<"u"&&process.env&&/\bparse\b/.test({}.LOG);let T=null;function I(l,t,e){let s=l.cursor(j.IncludeAnonymous);for(s.moveTo(t);;)if(!(e<0?s.childBefore(t):s.childAfter(t)))for(;;){if((e<0?s.to<t:s.from>t)&&!s.type.isError)return e<0?Math.max(0,Math.min(s.to-1,t-25)):Math.min(l.length,Math.max(s.from+1,t+25));if(e<0?s.prevSibling():s.nextSibling())break;if(!s.parent())return e<0?0:l.length}}class q{constructor(t,e){this.fragments=t,this.nodeSet=e,this.i=0,this.fragment=null,this.safeFrom=-1,this.safeTo=-1,this.trees=[],this.start=[],this.index=[],this.nextFragment()}nextFragment(){let t=this.fragment=this.i==this.fragments.length?null:this.fragments[this.i++];if(t){for(this.safeFrom=t.openStart?I(t.tree,t.from+t.offset,1)-t.offset:t.from,this.safeTo=t.openEnd?I(t.tree,t.to+t.offset,-1)-t.offset:t.to;this.trees.length;)this.trees.pop(),this.start.pop(),this.index.pop();this.trees.push(t.tree),this.start.push(-t.offset),this.index.push(0),this.nextStart=this.safeFrom}else this.nextStart=1e9}nodeAt(t){if(t<this.nextStart)return null;for(;this.fragment&&this.safeTo<=t;)this.nextFragment();if(!this.fragment)return null;for(;;){let e=this.trees.length-1;if(e<0)return this.nextFragment(),null;let s=this.trees[e],i=this.index[e];if(i==s.children.length){this.trees.pop(),this.start.pop(),this.index.pop();continue}let h=s.children[i],r=this.start[e]+s.positions[i];if(r>t)return this.nextStart=r,null;if(h instanceof S){if(r==t){if(r<this.safeFrom)return null;let n=r+h.length;if(n<=this.safeTo){let o=h.prop(y.lookAhead);if(!o||n+o<this.fragment.to)return h}}this.index[e]++,r+h.length>=Math.max(this.safeFrom,t)&&(this.trees.push(h),this.start.push(r),this.index.push(0))}else this.index[e]++,this.nextStart=r+h.length}}}class J{constructor(t,e){this.stream=e,this.tokens=[],this.mainToken=null,this.actions=[],this.tokens=t.tokenizers.map(s=>new P)}getActions(t){let e=0,s=null,{parser:i}=t.p,{tokenizers:h}=i,r=i.stateSlot(t.state,3),n=t.curContext?t.curContext.hash:0,o=0;for(let a=0;a<h.length;a++){if(!(1<<a&r))continue;let u=h[a],f=this.tokens[a];if(!(s&&!u.fallback)&&((u.contextual||f.start!=t.pos||f.mask!=r||f.context!=n)&&(this.updateCachedToken(f,u,t),f.mask=r,f.context=n),f.lookAhead>f.end+25&&(o=Math.max(f.lookAhead,o)),f.value!=0)){let p=e;if(f.extended>-1&&(e=this.addActions(t,f.extended,f.end,e)),e=this.addActions(t,f.value,f.end,e),!u.extend&&(s=f,e>p))break}}for(;this.actions.length>e;)this.actions.pop();return o&&t.setLookAhead(o),!s&&t.pos==this.stream.end&&(s=new P,s.value=t.p.parser.eofTerm,s.start=s.end=t.pos,e=this.addActions(t,s.value,s.end,e)),this.mainToken=s,this.actions}getMainToken(t){if(this.mainToken)return this.mainToken;let e=new P,{pos:s,p:i}=t;return e.start=s,e.end=Math.min(s+1,i.stream.end),e.value=s==i.stream.end?i.parser.eofTerm:0,e}updateCachedToken(t,e,s){let i=this.stream.clipPos(s.pos);if(e.token(this.stream.reset(i,t),s),t.value>-1){let{parser:h}=s.p;for(let r=0;r<h.specialized.length;r++)if(h.specialized[r]==t.value){let n=h.specializers[r](this.stream.read(t.start,t.end),s);if(n>=0&&s.p.parser.dialect.allows(n>>1)){n&1?t.extended=n>>1:t.value=n>>1;break}}}else t.value=0,t.end=this.stream.clipPos(i+1)}putAction(t,e,s,i){for(let h=0;h<i;h+=3)if(this.actions[h]==t)return i;return this.actions[i++]=t,this.actions[i++]=e,this.actions[i++]=s,i}addActions(t,e,s,i){let{state:h}=t,{parser:r}=t.p,{data:n}=r;for(let o=0;o<2;o++)for(let a=r.stateSlot(h,o?2:1);;a+=3){if(n[a]==65535)if(n[a+1]==1)a=k(n,a+2);else{i==0&&n[a+1]==2&&(i=this.putAction(k(n,a+2),e,s,i));break}n[a]==e&&(i=this.putAction(k(n,a+1),e,s,i))}return i}}class K{constructor(t,e,s,i){this.parser=t,this.input=e,this.ranges=i,this.recovering=0,this.nextStackID=9812,this.minStackPos=0,this.reused=[],this.stoppedAt=null,this.lastBigReductionStart=-1,this.lastBigReductionSize=0,this.bigReductionCount=0,this.stream=new U(e,i),this.tokens=new J(t,this.stream),this.topTerm=t.top[1];let{from:h}=i[0];this.stacks=[v.start(this,t.top[0],h)],this.fragments=s.length&&this.stream.end-h>t.bufferLength*4?new q(s,t.nodeSet):null}get parsedPos(){return this.minStackPos}advance(){let t=this.stacks,e=this.minStackPos,s=this.stacks=[],i,h;if(this.bigReductionCount>300&&t.length==1){let[r]=t;for(;r.forceReduce()&&r.stack.length&&r.stack[r.stack.length-2]>=this.lastBigReductionStart;);this.bigReductionCount=this.lastBigReductionSize=0}for(let r=0;r<t.length;r++){let n=t[r];for(;;){if(this.tokens.mainToken=null,n.pos>e)s.push(n);else{if(this.advanceStack(n,s,t))continue;{i||(i=[],h=[]),i.push(n);let o=this.tokens.getMainToken(n);h.push(o.value,o.end)}}break}}if(!s.length){let r=i&&V(i);if(r)return g&&console.log("Finish with "+this.stackID(r)),this.stackToTree(r);if(this.parser.strict)throw g&&i&&console.log("Stuck with token "+(this.tokens.mainToken?this.parser.getName(this.tokens.mainToken.value):"none")),new SyntaxError("No parse at "+e);this.recovering||(this.recovering=5)}if(this.recovering&&i){let r=this.stoppedAt!=null&&i[0].pos>this.stoppedAt?i[0]:this.runRecovery(i,h,s);if(r)return g&&console.log("Force-finish "+this.stackID(r)),this.stackToTree(r.forceAll())}if(this.recovering){let r=this.recovering==1?1:this.recovering*3;if(s.length>r)for(s.sort((n,o)=>o.score-n.score);s.length>r;)s.pop();s.some(n=>n.reducePos>e)&&this.recovering--}else if(s.length>1){t:for(let r=0;r<s.length-1;r++){let n=s[r];for(let o=r+1;o<s.length;o++){let a=s[o];if(n.sameState(a)||n.buffer.length>500&&a.buffer.length>500)if((n.score-a.score||n.buffer.length-a.buffer.length)>0)s.splice(o--,1);else{s.splice(r--,1);continue t}}}s.length>12&&s.splice(12,s.length-12)}this.minStackPos=s[0].pos;for(let r=1;r<s.length;r++)s[r].pos<this.minStackPos&&(this.minStackPos=s[r].pos);return null}stopAt(t){if(this.stoppedAt!=null&&this.stoppedAt<t)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=t}advanceStack(t,e,s){let i=t.pos,{parser:h}=this,r=g?this.stackID(t)+" -> ":"";if(this.stoppedAt!=null&&i>this.stoppedAt)return t.forceReduce()?t:null;if(this.fragments){let a=t.curContext&&t.curContext.tracker.strict,u=a?t.curContext.hash:0;for(let f=this.fragments.nodeAt(i);f;){let p=this.parser.nodeSet.types[f.type.id]==f.type?h.getGoto(t.state,f.type.id):-1;if(p>-1&&f.length&&(!a||(f.prop(y.contextHash)||0)==u))return t.useNode(f,p),g&&console.log(r+this.stackID(t)+` (via reuse of ${h.getName(f.type.id)})`),!0;if(!(f instanceof S)||f.children.length==0||f.positions[0]>0)break;let c=f.children[0];if(c instanceof S&&f.positions[0]==0)f=c;else break}}let n=h.stateSlot(t.state,4);if(n>0)return t.reduce(n),g&&console.log(r+this.stackID(t)+` (via always-reduce ${h.getName(n&65535)})`),!0;if(t.stack.length>=8400)for(;t.stack.length>6e3&&t.forceReduce(););let o=this.tokens.getActions(t);for(let a=0;a<o.length;){let u=o[a++],f=o[a++],p=o[a++],c=a==o.length||!s,d=c?t:t.split(),b=this.tokens.mainToken;if(d.apply(u,f,b?b.start:d.pos,p),g&&console.log(r+this.stackID(d)+` (via ${u&65536?`reduce of ${h.getName(u&65535)}`:"shift"} for ${h.getName(f)} @ ${i}${d==t?"":", split"})`),c)return!0;d.pos>i?e.push(d):s.push(d)}return!1}advanceFully(t,e){let s=t.pos;for(;;){if(!this.advanceStack(t,null,null))return!1;if(t.pos>s)return D(t,e),!0}}runRecovery(t,e,s){let i=null,h=!1;for(let r=0;r<t.length;r++){let n=t[r],o=e[r<<1],a=e[(r<<1)+1],u=g?this.stackID(n)+" -> ":"";if(n.deadEnd&&(h||(h=!0,n.restart(),g&&console.log(u+this.stackID(n)+" (restarted)"),this.advanceFully(n,s))))continue;let f=n.split(),p=u;for(let c=0;f.forceReduce()&&c<10&&(g&&console.log(p+this.stackID(f)+" (via force-reduce)"),!this.advanceFully(f,s));c++)g&&(p=this.stackID(f)+" -> ");for(let c of n.recoverByInsert(o))g&&console.log(u+this.stackID(c)+" (via recover-insert)"),this.advanceFully(c,s);this.stream.end>n.pos?(a==n.pos&&(a++,o=0),n.recoverByDelete(o,a),g&&console.log(u+this.stackID(n)+` (via recover-delete ${this.parser.getName(o)})`),D(n,s)):(!i||i.score<n.score)&&(i=n)}return i}stackToTree(t){return t.close(),S.build({buffer:A.create(t),nodeSet:this.parser.nodeSet,topID:this.topTerm,maxBufferLength:this.parser.bufferLength,reused:this.reused,start:this.ranges[0].from,length:t.pos-this.ranges[0].from,minRepeatType:this.parser.minRepeatTerm})}stackID(t){let e=(T||(T=new WeakMap)).get(t);return e||T.set(t,e=String.fromCodePoint(this.nextStackID++)),e+t}}function D(l,t){for(let e=0;e<t.length;e++){let s=t[e];if(s.pos==l.pos&&s.sameState(l)){t[e].score<l.score&&(t[e]=l);return}}t.push(l)}class Q{constructor(t,e,s){this.source=t,this.flags=e,this.disabled=s}allows(t){return!this.disabled||this.disabled[t]==0}}const C=l=>l;class Z{constructor(t){this.start=t.start,this.shift=t.shift||C,this.reduce=t.reduce||C,this.reuse=t.reuse||C,this.hash=t.hash||(()=>0),this.strict=t.strict!==!1}}class w extends L{constructor(t){if(super(),this.wrappers=[],t.version!=14)throw new RangeError(`Parser version (${t.version}) doesn't match runtime version (14)`);let e=t.nodeNames.split(" ");this.minRepeatTerm=e.length;for(let n=0;n<t.repeatNodeCount;n++)e.push("");let s=Object.keys(t.topRules).map(n=>t.topRules[n][1]),i=[];for(let n=0;n<e.length;n++)i.push([]);function h(n,o,a){i[n].push([o,o.deserialize(String(a))])}if(t.nodeProps)for(let n of t.nodeProps){let o=n[0];typeof o=="string"&&(o=y[o]);for(let a=1;a<n.length;){let u=n[a++];if(u>=0)h(u,o,n[a++]);else{let f=n[a+-u];for(let p=-u;p>0;p--)h(n[a++],o,f);a++}}}this.nodeSet=new M(e.map((n,o)=>$.define({name:o>=this.minRepeatTerm?void 0:n,id:o,props:i[o],top:s.indexOf(o)>-1,error:o==0,skipped:t.skippedNodes&&t.skippedNodes.indexOf(o)>-1}))),t.propSources&&(this.nodeSet=this.nodeSet.extend(...t.propSources)),this.strict=!1,this.bufferLength=E;let r=x(t.tokenData);this.context=t.context,this.specializerSpecs=t.specialized||[],this.specialized=new Uint16Array(this.specializerSpecs.length);for(let n=0;n<this.specializerSpecs.length;n++)this.specialized[n]=this.specializerSpecs[n].term;this.specializers=this.specializerSpecs.map(B),this.states=x(t.states,Uint32Array),this.data=x(t.stateData),this.goto=x(t.goto),this.maxTerm=t.maxTerm,this.tokenizers=t.tokenizers.map(n=>typeof n=="number"?new m(r,n):n),this.topRules=t.topRules,this.dialects=t.dialects||{},this.dynamicPrecedences=t.dynamicPrecedences||null,this.tokenPrecTable=t.tokenPrec,this.termNames=t.termNames||null,this.maxNode=this.nodeSet.types.length-1,this.dialect=this.parseDialect(),this.top=this.topRules[Object.keys(this.topRules)[0]]}createParse(t,e,s){let i=new K(this,t,e,s);for(let h of this.wrappers)i=h(i,t,e,s);return i}getGoto(t,e,s=!1){let i=this.goto;if(e>=i[0])return-1;for(let h=i[e+1];;){let r=i[h++],n=r&1,o=i[h++];if(n&&s)return o;for(let a=h+(r>>1);h<a;h++)if(i[h]==t)return o;if(n)return-1}}hasAction(t,e){let s=this.data;for(let i=0;i<2;i++)for(let h=this.stateSlot(t,i?2:1),r;;h+=3){if((r=s[h])==65535)if(s[h+1]==1)r=s[h=k(s,h+2)];else{if(s[h+1]==2)return k(s,h+2);break}if(r==e||r==0)return k(s,h+1)}return 0}stateSlot(t,e){return this.states[t*6+e]}stateFlag(t,e){return(this.stateSlot(t,0)&e)>0}validAction(t,e){return!!this.allActions(t,s=>s==e?!0:null)}allActions(t,e){let s=this.stateSlot(t,4),i=s?e(s):void 0;for(let h=this.stateSlot(t,1);i==null;h+=3){if(this.data[h]==65535)if(this.data[h+1]==1)h=k(this.data,h+2);else break;i=e(k(this.data,h+1))}return i}nextStates(t){let e=[];for(let s=this.stateSlot(t,1);;s+=3){if(this.data[s]==65535)if(this.data[s+1]==1)s=k(this.data,s+2);else break;if(!(this.data[s+2]&1)){let i=this.data[s+1];e.some((h,r)=>r&1&&h==i)||e.push(this.data[s],i)}}return e}configure(t){let e=Object.assign(Object.create(w.prototype),this);if(t.props&&(e.nodeSet=this.nodeSet.extend(...t.props)),t.top){let s=this.topRules[t.top];if(!s)throw new RangeError(`Invalid top rule name ${t.top}`);e.top=s}return t.tokenizers&&(e.tokenizers=this.tokenizers.map(s=>{let i=t.tokenizers.find(h=>h.from==s);return i?i.to:s})),t.specializers&&(e.specializers=this.specializers.slice(),e.specializerSpecs=this.specializerSpecs.map((s,i)=>{let h=t.specializers.find(n=>n.from==s.external);if(!h)return s;let r=Object.assign(Object.assign({},s),{external:h.to});return e.specializers[i]=B(r),r})),t.contextTracker&&(e.context=t.contextTracker),t.dialect&&(e.dialect=this.parseDialect(t.dialect)),t.strict!=null&&(e.strict=t.strict),t.wrap&&(e.wrappers=e.wrappers.concat(t.wrap)),t.bufferLength!=null&&(e.bufferLength=t.bufferLength),e}hasWrappers(){return this.wrappers.length>0}getName(t){return this.termNames?this.termNames[t]:String(t<=this.maxNode&&this.nodeSet.types[t].name||t)}get eofTerm(){return this.maxNode+1}get topNode(){return this.nodeSet.types[this.top[1]]}dynamicPrecedence(t){let e=this.dynamicPrecedences;return e==null?0:e[t]||0}parseDialect(t){let e=Object.keys(this.dialects),s=e.map(()=>!1);if(t)for(let h of t.split(" ")){let r=e.indexOf(h);r>=0&&(s[r]=!0)}let i=null;for(let h=0;h<e.length;h++)if(!s[h])for(let r=this.dialects[e[h]],n;(n=this.data[r++])!=65535;)(i||(i=new Uint8Array(this.maxTerm+1)))[n]=1;return new Q(t,s,i)}static deserialize(t){return new w(t)}}function k(l,t){return l[t]|l[t+1]<<16}function V(l){let t=null;for(let e of l){let s=e.p.stoppedAt;(e.pos==e.p.stream.end||s!=null&&e.pos>s)&&e.p.parser.stateFlag(e.state,2)&&(!t||t.score<e.score)&&(t=e)}return t}function B(l){if(l.external){let t=l.extend?1:0;return(e,s)=>l.external(e,s)<<1|t}return l.get}export{Z as C,Y as E,w as L,H as a};
