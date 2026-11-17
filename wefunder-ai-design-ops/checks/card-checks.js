function cardChecks(root){
  const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});
  const rgb=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='#000';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return [d[0],d[1],d[2],d[3]/255]};
  const lin=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
  const lum=c=>0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2]);
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)};
  const bgOf=el=>{while(el){const c=rgb(getComputedStyle(el).backgroundColor);if(c[3]>0.99)return c;el=el.parentElement}return [255,255,255,1]};
  const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
  const all=[root,...root.querySelectorAll('*')].filter(vis);
  const own=e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  const txt=all.filter(own);
  const scale=[12,13,14,16,18,20,24],wts=[400,500,600];
  const o={contrast:[],under12:[],offScale:[],weights:[],caps:[],radii:[],tabular:[]};
  txt.forEach(e=>{const s=getComputedStyle(e),fs=parseFloat(s.fontSize),fw=parseInt(s.fontWeight),t=e.textContent.trim().slice(0,28);
    const r=ratio(rgb(s.color),bgOf(e));if(r<4.5)o.contrast.push(t+' '+r.toFixed(2));
    if(fs<12)o.under12.push(t+' '+fs);
    if(!scale.includes(fs))o.offScale.push(t+' '+fs);
    if(!wts.includes(fw))o.weights.push(t+' '+fw);
    if(s.textTransform==='uppercase'||/^(?=.*[A-Z]{3})[A-Z0-9 $,-]{4,}$/.test(e.textContent.trim()))o.caps.push(t);
    if(/\d/.test(e.textContent)&&e.textContent.trim().length<40&&!s.fontVariantNumeric.includes('tabular'))o.tabular.push(t);
  });
  const rs=new Set();all.filter(e=>e!==root||true).forEach(e=>{const s=getComputedStyle(e);['borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius'].forEach(k=>{const v=s[k];if(v!=='0px')rs.add(parseFloat(v)>=999||v.includes('%')?'pill':v)})});
  o.radii=[...rs].filter(r=>!['5px','6px','12px','pill'].includes(r));
  const css=[...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch(_){return []}}).map(r=>r.cssText).join('\n');
  o.states={hover:/:hover/.test(css),focus:/:focus-visible/.test(css),disabled:/:disabled|\[disabled\]/.test(css)};
  o.tap=[].slice.call(root.querySelectorAll("button,a,[role=button]")).filter(vis).filter(function(b){var r=b.getBoundingClientRect();var big=r.width>200&&r.height>200;return !big&&(r.height<40||r.width<40)}).map(function(b){var r=b.getBoundingClientRect();return (b.textContent.trim().slice(0,20)||b.getAttribute("aria-label"))+" "+Math.round(r.width)+"x"+Math.round(r.height)});o.width=Math.round(root.getBoundingClientRect().width);
  return o;
}
