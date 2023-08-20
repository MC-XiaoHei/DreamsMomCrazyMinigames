import{c as N,r as S,w as de,k as ue,h as y,V as he,_ as fe,E as K,H as z,W as $,s as me,N as F,I as ge,J as pe,L as I,X as ve,Y,d as _e}from"./index.b3d3122f.js";import{Q as ye}from"./QSpinner.0859004f.js";import{c as be,h as we}from"./render.01033038.js";import{M as Te}from"./MinigameCard.097d15cb.js";import"./use-router-link.6fd818a9.js";import"./QAvatar.591eda1e.js";const ke={ratio:[String,Number]};function Se(e,t){return N(()=>{const s=Number(e.ratio||(t!==void 0?t.value:void 0));return isNaN(s)!==!0&&s>0?{paddingBottom:`${100/s}%`}:null})}const Me=16/9;var Ce=be({name:"QImg",props:{...ke,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Me},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:t,emit:s}){const i=S(e.initialRatio),n=Se(e,i);let r=null,a=!1;const c=[S(null),S(L())],d=S(0),u=S(!1),h=S(!1),g=N(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),v=N(()=>({width:e.width,height:e.height})),ne=N(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),oe=N(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));de(()=>Q(),U);function Q(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function L(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function U(l){r!==null&&(clearTimeout(r),r=null),h.value=!1,l===null?(u.value=!1,c[d.value^1].value=L()):u.value=!0,c[d.value].value=l}function re({target:l}){a!==!0&&(r!==null&&(clearTimeout(r),r=null),i.value=l.naturalHeight===0?.5:l.naturalWidth/l.naturalHeight,V(l,1))}function V(l,B){a===!0||B===1e3||(l.complete===!0?ae(l):r=setTimeout(()=>{r=null,V(l,B+1)},50))}function ae(l){a!==!0&&(d.value=d.value^1,c[d.value].value=null,u.value=!1,h.value=!1,s("load",l.currentSrc||l.src))}function le(l){r!==null&&(clearTimeout(r),r=null),u.value=!1,h.value=!0,c[d.value].value=null,c[d.value^1].value=L(),s("error",l)}function X(l){const B=c[l].value,R={key:"img_"+l,class:ne.value,style:oe.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...B};return d.value===l?(R.class+=" q-img__image--waiting",Object.assign(R,{onLoad:re,onError:le})):R.class+=" q-img__image--loaded",y("div",{class:"q-img__container absolute-full",key:"img"+l},y("img",R))}function ce(){return u.value!==!0?y("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},we(t[h.value===!0?"error":"default"])):y("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():e.noSpinner===!0?void 0:[y(ye,{color:e.spinnerColor,size:e.spinnerSize})])}return U(Q()),ue(()=>{a=!0,r!==null&&(clearTimeout(r),r=null)}),()=>{const l=[];return n.value!==null&&l.push(y("div",{key:"filler",style:n.value})),h.value!==!0&&(c[0].value!==null&&l.push(X(0)),c[1].value!==null&&l.push(X(1))),l.push(y(he,{name:"q-transition--fade"},ce)),y("div",{class:g.value,style:v.value,role:"img","aria-label":e.alt},l)}}});const Z=new Set,f=new WeakMap,C=new WeakMap,w=new WeakMap,A=new WeakMap,Pe=new WeakMap,P=new WeakMap,W=new WeakMap,O=new WeakSet;let T;const _="__aa_tgt",x="__aa_del",Ee=e=>{const t=ze(e);t&&t.forEach(s=>Ie(s))},Ne=e=>{e.forEach(t=>{t.target===T&&Be(),f.has(t.target)&&k(t.target)})};function Oe(e){const t=A.get(e);t==null||t.disconnect();let s=f.get(e),i=0;const n=5;s||(s=E(e),f.set(e,s));const{offsetWidth:r,offsetHeight:a}=T,d=[s.top-n,r-(s.left+n+s.width),a-(s.top+n+s.height),s.left-n].map(h=>`${-1*Math.floor(h)}px`).join(" "),u=new IntersectionObserver(()=>{++i>1&&k(e)},{root:T,threshold:1,rootMargin:d});u.observe(e),A.set(e,u)}function k(e){clearTimeout(W.get(e));const t=q(e),s=typeof t=="function"?500:t.duration;W.set(e,setTimeout(async()=>{const i=w.get(e);try{await(i==null?void 0:i.finished),f.set(e,E(e)),Oe(e)}catch{}},s))}function Be(){clearTimeout(W.get(T)),W.set(T,setTimeout(()=>{Z.forEach(e=>ie(e,t=>ee(()=>k(t))))},100))}function Re(e){setTimeout(()=>{Pe.set(e,setInterval(()=>ee(k.bind(null,e)),2e3))},Math.round(2e3*Math.random()))}function ee(e){typeof requestIdleCallback=="function"?requestIdleCallback(()=>e()):requestAnimationFrame(()=>e())}let D,M;typeof window!="undefined"&&(T=document.documentElement,D=new MutationObserver(Ee),M=new ResizeObserver(Ne),M.observe(T));function ze(e){return e.reduce((i,n)=>[...i,...Array.from(n.addedNodes),...Array.from(n.removedNodes)],[]).every(i=>i.nodeName==="#comment")?!1:e.reduce((i,n)=>{if(i===!1)return!1;if(n.target instanceof Element){if(j(n.target),!i.has(n.target)){i.add(n.target);for(let r=0;r<n.target.children.length;r++){const a=n.target.children.item(r);if(!!a){if(x in a)return!1;j(n.target,a),i.add(a)}}}if(n.removedNodes.length)for(let r=0;r<n.removedNodes.length;r++){const a=n.removedNodes[r];if(x in a)return!1;a instanceof Element&&(i.add(a),j(n.target,a),C.set(a,[n.previousSibling,n.nextSibling]))}}return i},new Set)}function j(e,t){!t&&!(_ in e)?Object.defineProperty(e,_,{value:e}):t&&!(_ in t)&&Object.defineProperty(t,_,{value:e})}function Ie(e){var t;const s=e.isConnected,i=f.has(e);s&&C.has(e)&&C.delete(e),w.has(e)&&((t=w.get(e))===null||t===void 0||t.cancel()),i&&s?qe(e):i&&!s?$e(e):Le(e)}function p(e){return Number(e.replace(/[^0-9.\-]/g,""))}function We(e){let t=e.parentElement;for(;t;){if(t.scrollLeft||t.scrollTop)return{x:t.scrollLeft,y:t.scrollTop};t=t.parentElement}return{x:0,y:0}}function E(e){const t=e.getBoundingClientRect(),{x:s,y:i}=We(e);return{top:t.top+i,left:t.left+s,width:t.width,height:t.height}}function te(e,t,s){let i=t.width,n=t.height,r=s.width,a=s.height;const c=getComputedStyle(e);if(c.getPropertyValue("box-sizing")==="content-box"){const u=p(c.paddingTop)+p(c.paddingBottom)+p(c.borderTopWidth)+p(c.borderBottomWidth),h=p(c.paddingLeft)+p(c.paddingRight)+p(c.borderRightWidth)+p(c.borderLeftWidth);i-=h,r-=h,n-=u,a-=u}return[i,r,n,a].map(Math.round)}function q(e){return _ in e&&P.has(e[_])?P.get(e[_]):{duration:250,easing:"ease-in-out"}}function se(e){if(_ in e)return e[_]}function H(e){const t=se(e);return t?O.has(t):!1}function ie(e,...t){t.forEach(s=>s(e,P.has(e)));for(let s=0;s<e.children.length;s++){const i=e.children.item(s);i&&t.forEach(n=>n(i,P.has(i)))}}function qe(e){const t=f.get(e),s=E(e);if(!H(e))return f.set(e,s);let i;if(!t)return;const n=q(e);if(typeof n!="function"){const r=t.left-s.left,a=t.top-s.top,[c,d,u,h]=te(e,t,s),g={transform:`translate(${r}px, ${a}px)`},v={transform:"translate(0, 0)"};c!==d&&(g.width=`${c}px`,v.width=`${d}px`),u!==h&&(g.height=`${u}px`,v.height=`${h}px`),i=e.animate([g,v],{duration:n.duration,easing:n.easing})}else i=new Animation(n(e,"remain",t,s)),i.play();w.set(e,i),f.set(e,s),i.addEventListener("finish",k.bind(null,e))}function Le(e){const t=E(e);f.set(e,t);const s=q(e);if(!H(e))return;let i;typeof s!="function"?i=e.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:s.duration*1.5,easing:"ease-in"}):(i=new Animation(s(e,"add",t)),i.play()),w.set(e,i),i.addEventListener("finish",k.bind(null,e))}function $e(e){var t;if(!C.has(e)||!f.has(e))return;const[s,i]=C.get(e);Object.defineProperty(e,x,{value:!0}),i&&i.parentNode&&i.parentNode instanceof Element?i.parentNode.insertBefore(e,i):s&&s.parentNode?s.parentNode.appendChild(e):(t=se(e))===null||t===void 0||t.appendChild(e);function n(){var v;e.remove(),f.delete(e),C.delete(e),w.delete(e),(v=A.get(e))===null||v===void 0||v.disconnect()}if(!H(e))return n();const[r,a,c,d]=Fe(e),u=q(e),h=f.get(e);let g;Object.assign(e.style,{position:"absolute",top:`${r}px`,left:`${a}px`,width:`${c}px`,height:`${d}px`,margin:0,pointerEvents:"none",transformOrigin:"center",zIndex:100}),typeof u!="function"?g=e.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:u.duration,easing:"ease-out"}):(g=new Animation(u(e,"remove",h)),g.play()),w.set(e,g),g.addEventListener("finish",n)}function Fe(e){const t=f.get(e),[s,,i]=te(e,t,E(e));let n=e.parentElement;for(;n&&(getComputedStyle(n).position==="static"||n instanceof HTMLBodyElement);)n=n.parentElement;n||(n=document.body);const r=getComputedStyle(n),a=f.get(n)||E(n),c=Math.round(t.top-a.top)-p(r.borderTopWidth),d=Math.round(t.left-a.left)-p(r.borderLeftWidth);return[c,d,s,i]}function je(e,t={}){return D&&M&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches&&typeof t!="function"&&!t.disrespectUserMotionPreference||(O.add(e),getComputedStyle(e).position==="static"&&Object.assign(e.style,{position:"relative"}),ie(e,k,Re,n=>M==null?void 0:M.observe(n)),typeof t=="function"?P.set(e,t):P.set(e,{duration:250,easing:"ease-in-out",...t}),D.observe(e,{childList:!0}),Z.add(e))),Object.freeze({parent:e,enable:()=>{O.add(e)},disable:()=>{O.delete(e)},isEnabled:()=>O.has(e)})}const Ae={mounted:(e,t)=>{je(e,t.value||{})}},o=new Map;o.set(1,"emerald");o.set(2,"emerald");o.set(3,"wheat");o.set(4,"wheat");o.set(5,"wooden_hoe");o.set(6,"wooden_hoe");o.set(7,"clay");o.set(8,"clay");o.set(9,"brick");o.set(10,"brick");o.set(11,"yellow_dye");o.set(12,"yellow_dye");o.set(13,"blue_dye");o.set(14,"blue_dye");o.set(15,"light_blue_dye");o.set(16,"light_blue_dye");o.set(17,"white_dye");o.set(18,"white_dye");o.set(19,"orange_dye");o.set(20,"orange_dye");o.set(21,"green_candle");o.set(22,"green_candle");o.set(23,"red_candle");o.set(24,"red_candle");o.set(25,"purple_candle");o.set(26,"purple_candle");o.set(27,"brown_candle");o.set(28,"brown_candle");o.set(29,"magenta_stained_glass_pane_top");o.set(30,"pink_stained_glass_pane_top");o.set(31,"blue_stained_glass_pane_top");o.set(32,"light_blue_stained_glass_pane_top");o.set(33,"red_stained_glass_pane_top");o.set(34,"yellow_stained_glass_pane_top");o.set(35,"purple_stained_glass_pane_top");o.set(36,"oak_hanging_sign");o.set(37,"spruce_hanging_sign");o.set(38,"gold_nugget");o.set(39,"coal");o.set(40,"wheat_seeds");o.set(41,"beetroot_seeds");o.set(42,"dead_bush");o.set(43,"flower_pot");o.set(44,"string");o.set(45,"lead");const m=new Map;m.set(1,"burn_pottery_sherd");m.set(2,"danger_pottery_sherd");m.set(3,"friend_pottery_sherd");m.set(4,"heart_pottery_sherd");m.set(5,"heartbreak_pottery_sherd");m.set(6,"howl_pottery_sherd");m.set(7,"sheaf_pottery_sherd");m.set(8,"host_armor_trim_smithing_template");m.set(9,"raiser_armor_trim_smithing_template");m.set(10,"shaper_armor_trim_smithing_template");m.set(11,"wayfinder_armor_trim_smithing_template");m.set(12,"music_disc_relic");const xe={class:"q-pa-md row container full-height full-width"},De={class:"q-pa-md"},He={class:"row container",oncontextmenu:"return false"},Qe=["src"],Ue=["src"],Ve=["src"];let G,J,b;const Xe=K({name:"RescueCaptainOhm",methods:{setProgress(e){switch(e){case 0:b=150;break;case 1:b=102;break;case 2:b=56;break;case 3:b=12;break}this.blockSrc=`suspicious_gravel_${e}`},randomItem(){const e=Math.floor(Math.random()*57)+1;e<46?this.itemSrc=o.get(e):this.itemSrc=m.get(e-45)},refresh(){Math.floor(Math.random()*100)<=90?(this.isSuspicious=!0,this.setProgress(0),this.randomItem()):(this.isSuspicious=!1,this.blockSrc="gravel")},onUpdateTimer(){this.mode=="break"?this.timer>=10&&(this.timer=0,this.refresh(),this.stopTimer(),this.startTimer()):this.isSuspicious&&(this.checkTimer=Math.round(this.timer/14),this.setProgress(this.checkTimer),this.checkTimer==4&&(this.checkTimer=0,this.stopTimer(),this.refresh()))},startCheck(){this.mode="check",this.startPress()},startBreak(e){if(e.button==2){this.mode="check",this.startPress();return}this.mode="break",this.startPress()},startPress(){this.pressing||(this.startTimer(),this.pressing=!0)},startTimer(){G=setInterval(()=>{this.timer++,this.onUpdateTimer()},100)},stopPress(){this.stopTimer(),this.pressing&&(this.pressing=!1)},stopTimer(){clearInterval(G),this.checkTimerRunning||(this.checkTimerRunning=!0,J=setInterval(()=>{this.checkTimer>0&&(this.checkTimer--,this.setProgress(this.checkTimer)),this.checkTimer==0&&(clearInterval(J),this.checkTimerRunning=!1)},500)),this.timer=0}},data(){b=150;let e;return e=0,{blockSrc:"gravel",itemSrc:"",isSuspicious:!1,mode:"break",pressing:!1,timer:e,checkTimer:0,checkTimerRunning:!1}}}),Ye=K({...Xe,setup(e){return(t,s)=>(z(),$("div",xe,[me((z(),ge(Te,{ref:"rescueCaptainOhm",title:"\u62EF\u6551\u5411\u5BFC\u8001\u677F\uFF01",caption:"\u6316\u6316\u6316\u626B\u626B\u626B...",style:{"max-width":"350px"}},{default:pe(()=>[I("div",De,[I("div",He,[I("div",{class:"image-container",onMousedown:s[0]||(s[0]=(...i)=>t.startBreak&&t.startBreak(...i)),onMouseleave:s[1]||(s[1]=(...i)=>t.stopPress&&t.stopPress(...i)),onMouseup:s[2]||(s[2]=(...i)=>t.stopPress&&t.stopPress(...i)),onTouchstart:s[3]||(s[3]=(...i)=>t.startBreak&&t.startBreak(...i)),onTouchcancel:s[4]||(s[4]=(...i)=>t.stopPress&&t.stopPress(...i)),onTouchend:s[5]||(s[5]=(...i)=>t.stopPress&&t.stopPress(...i))},[I("img",{class:"block-img mc-img",src:"/minigame-assets/rescue-captain-ohm/"+t.blockSrc+".png",alt:""},null,8,Qe),t.isSuspicious?(z(),$("img",{key:0,class:"item-img mc-img",src:"/minigame-assets/rescue-captain-ohm/item/"+t.itemSrc+".png",style:ve("width: 100%;clip-path: inset(0 0 "+(F(b)+150)+"px 0);margin-bottom: "+F(b)+"px;margin-top: 2rem"),alt:""},null,12,Ue)):Y("",!0),t.timer!=0&&t.mode=="break"?(z(),$("img",{key:1,class:"overlay-img mc-img",src:"/minigame-assets/rescue-captain-ohm/destroy_stage_"+(this.timer-1).toString()+".png",alt:""},null,8,Ve)):Y("",!0)],32),_e(Ce,{onMousedown:t.startCheck,onMouseleave:t.stopPress,onMouseup:t.stopPress,onTouchstart:t.startCheck,onTouchcancel:t.stopPress,onTouchend:t.stopPress,ref:"container",src:"/minigame-assets/rescue-captain-ohm/container.png",alt:"",class:"col-12 mc-img",width:"80px",height:"80px",style:{"margin-top":"2rem"}},null,8,["onMousedown","onMouseleave","onMouseup","onTouchstart","onTouchcancel","onTouchend"])])])]),_:1})),[[F(Ae)]])]))}});var st=fe(Ye,[["__scopeId","data-v-14770dd9"]]);export{st as default};
