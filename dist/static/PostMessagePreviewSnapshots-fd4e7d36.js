import{a8 as w,a9 as g,r as o,cA as P,ai as _,cV as S,aP as x,cW as E,cX as M,cY as k,aR as R,cn as h,cU as U,bm as y,bh as D,aA as $,cZ as j}from"./sanity-b2fc26b5.js";function A(u){return w(function(p,t){var a=!1,r=0;p.subscribe(g(t,function(e){return(a||(a=!u(e,r++)))&&t.next(e)}))})}const F=u=>{const{comlink:p,refs:t,perspective:a}=u,r=P(),e=_(),c=o.useMemo(()=>new S,[]),d=o.useMemo(()=>c.asObservable().pipe(x(b=>E(b.map(s=>{const l={...s,_id:M(s._id)},m=a==="previewDrafts"?r.observeForPreview(l,e.get(l._type)).pipe(k(),A(i=>i.snapshot===null)):R,f={...s,_id:h(s._id)},v=r.observeForPreview(f,e.get(f._type));return U(v.pipe(y(m)),m).pipe(D(i=>!!i.snapshot),$(i=>{const n=i.snapshot;return{_id:h(n._id),title:n.title,subtitle:n.subtitle,description:n.description,imageUrl:n.imageUrl}}))}))),j(0)),[r,c,e,a]);return o.useEffect(()=>{const b=d.subscribe(s=>{p.post({type:"presentation/preview-snapshots",data:{snapshots:s}})});return()=>{b.unsubscribe()}},[p,d]),o.useEffect(()=>{c.next(t)},[t,c]),null};var O=o.memo(F);export{O as default};
