(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const ue=Object.freeze({PASSO:1/60,ALTEZZA_OCCHI:1.6,RAGGIO_GIOCATORE:.35,RAGGIO_ZOMBIE:.35,VELOCITA:4.2,VELOCITA_CORSA:6.2,PUNTI_INIZIALI:500,PUNTI_COLPO:10,PUNTI_UCCISIONE:60,PUNTI_TESTA:100,PUNTI_COLTELLO:130,PUNTI_ASSA:10,VITA:100,VITA_FERRO:250,RIGENERA_DOPO:4,RIGENERA_AL_SECONDO:60,DANNO_ZOMBIE:45,PORTATA_ZOMBIE:1.15,ATTESA_ATTACCO:1.4,TEMPO_A_TERRA:30,RIANIMA_IN:4,RIANIMA_RAPIDO:1.5,RIANIMA_DISTANZA:1.8,ASSE_PER_FINESTRA:6,ROMPI_ASSE_OGNI:1.5,RICOSTRUISCI_OGNI:.8,DISTANZA_FINESTRA:2.2,SCAVALCA:.9,ZOMBIE_VIVI_MAX:20,INTERVALLO:10,VELOCITA_CAMMINA:1.1,VELOCITA_CORRE:3.6,DISTANZA_ACQUISTO:2,COSTO_CASSA:950,DURATA_CASSA:8,COSTO_POTENZIA:5e3,DURATA_POTENZIA:3,ATTESA_RITIRO:10}),ol=Object.freeze({pistola:Object.freeze({nome:"Pistola",danno:40,cadenza:.22,automatica:!1,caricatore:8,riserva:48,ricarica:1.4,pallini:1,dispersione:.004}),pompa:Object.freeze({nome:"Fucile a pompa",danno:35,cadenza:.85,automatica:!1,caricatore:6,riserva:36,ricarica:3,pallini:8,dispersione:.07}),mitra:Object.freeze({nome:"Mitra",danno:32,cadenza:.075,automatica:!0,caricatore:30,riserva:150,ricarica:2.2,pallini:1,dispersione:.03}),assalto:Object.freeze({nome:"Fucile d'assalto",danno:60,cadenza:.1,automatica:!0,caricatore:30,riserva:150,ricarica:2.4,pallini:1,dispersione:.018}),mitragliatrice:Object.freeze({nome:"Mitragliatrice",danno:55,cadenza:.07,automatica:!0,caricatore:100,riserva:300,ricarica:4,pallini:1,dispersione:.035}),precisione:Object.freeze({nome:"Fucile di precisione",danno:500,cadenza:1.2,automatica:!1,caricatore:5,riserva:30,ricarica:3,pallini:1,dispersione:0,mirino:!0}),raggi:Object.freeze({nome:"Pistola a raggi",danno:600,cadenza:.35,automatica:!1,caricatore:20,riserva:160,ricarica:2.6,pallini:1,dispersione:.006,esplosione:Object.freeze({raggio:1.8,danno:400})})}),Ff=Object.freeze({pistola:"Pistola Rovente",pompa:"Pompa Tempesta",mitra:"Mitra Vespa",assalto:"Assalto Lupo",mitragliatrice:"Mitragliatrice Tuono",precisione:"Precisione Falco",raggi:"Raggi Supernova"});function Bf(i,e){return Object.freeze({...i,nome:Ff[e],danno:i.danno*2,caricatore:Math.round(i.caricatore*1.5),riserva:i.riserva*2,ricarica:i.ricarica*.85,esplosione:i.esplosione?Object.freeze({raggio:i.esplosione.raggio*1.4,danno:i.esplosione.danno*2}):void 0,potenziata:!0,base:e})}const Tt=Object.freeze({...ol,...Object.fromEntries(Object.entries(ol).map(([i,e])=>[`${i}+`,Bf(e,i)]))}),oh=i=>i.endsWith("+")?null:`${i}+`,co=i=>i.endsWith("+")?i.slice(0,-1):i,lo=Object.freeze({danno:150,attesa:.6,portata:1.6}),kf=Object.freeze(["pompa","mitra","assalto","mitragliatrice","precisione","raggi"]),al=Object.freeze({pompa:1,mitra:1,assalto:1,mitragliatrice:.8,precisione:.8,raggi:.4}),Di=Object.freeze({ferro:Object.freeze({nome:"Bibita Ferro",descrizione:"più vita",costo:2500,colore:12597547}),lampo:Object.freeze({nome:"Bibita Lampo",descrizione:"ricarica veloce",costo:2e3,colore:2600544}),ritorno:Object.freeze({nome:"Bibita Ritorno",descrizione:"rianimi in fretta",costo:1500,colore:3049182})});function Vf(i){return 6+3*(i-1)}function Hf(i){return i<10?150+100*(i-1):Math.round(950*1.1**(i-9))}function Gf(i){return i<=2?0:i===3?.25:i===4?.5:i<8?.8:1}function Wf(i){return Math.max(.6,2-(i-1)*.15)}function ah(i){const e=i+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),[((t^t>>>14)>>>0)/4294967296,e]}function Xf(){return Math.floor(Math.random()*4294967296)>>>0}const uo=.3,mc=3.2,gc=Object.freeze([Object.freeze({id:"atrio",nome:"Atrio",x0:-8,z0:-6,x1:8,z1:6,pavimento:"piastrelle"}),Object.freeze({id:"corridoio",nome:"Corridoio",x0:-2,z0:6,x1:2,z1:22,pavimento:"piastrelle"}),Object.freeze({id:"palestra",nome:"Palestra",x0:8,z0:-8,x1:24,z1:8,pavimento:"parquet"}),Object.freeze({id:"mensa",nome:"Mensa",x0:-16,z0:10,x1:-2,z1:24,pavimento:"linoleum"}),Object.freeze({id:"laboratorio",nome:"Laboratorio",x0:-2,z0:22,x1:8,z1:32,pavimento:"piastrelle"}),Object.freeze({id:"caldaia",nome:"Caldaia",x0:18,z0:-16,x1:26,z1:-8,pavimento:"cemento"}),Object.freeze({id:"cortile",nome:"Cortile",x0:8,z0:8,x1:26,z1:30,pavimento:"asfalto",aperto:!0})]),di=Object.freeze({x0:-18,z0:-18,x1:28,z1:34}),rt=(i,e,t)=>({x0:e,z0:i-uo/2,x1:t,z1:i+uo/2}),ut=(i,e,t)=>({x0:i-uo/2,z0:e,x1:i+uo/2,z1:t}),_c=Object.freeze([rt(-6,-8,-5),rt(-6,-3,3),rt(-6,5,8),ut(-8,-6,-1),ut(-8,1,6),rt(6,-8,-1),rt(6,1,8),ut(8,-8,-1),ut(8,1,8),ut(-2,6,13),ut(-2,15,22),ut(2,6,13),ut(2,15,22),rt(22,-2,-1),rt(22,1,8),rt(-8,8,15),rt(-8,17,20),rt(-8,22,24),ut(24,-8,-4),ut(24,-2,3),ut(24,5,8),rt(8,8,10),rt(8,12,24),rt(10,-16,-12),rt(10,-10,-2),ut(-16,10,15),ut(-16,17,24),rt(24,-16,-10),rt(24,-8,-2),ut(-2,22,24),ut(-2,24,27),ut(-2,29,32),ut(8,22,32),rt(32,-2,0),rt(32,2,8),ut(18,-16,-8),rt(-8,24,26),ut(26,-16,-13),ut(26,-11,-8),rt(-16,18,21),rt(-16,23,26)].map(Object.freeze)),ch=Object.freeze([ut(8,8,22),rt(30,8,16),rt(30,18,26),ut(26,8,18),ut(26,20,30),rt(8,24,26)].map(Object.freeze)),vs=2.6,vc=Object.freeze([Object.freeze({x0:18,z0:5.2,x1:22.5,z1:7.8,altezza:1.2,tipo:"tribuna"}),Object.freeze({x0:11.5,z0:-3,x1:13,z1:-2,altezza:.9,tipo:"cavallina"}),Object.freeze({x0:-6.5,z0:1.5,x1:-4.5,z1:2.5,altezza:.8,tipo:"banco"}),Object.freeze({x0:-14,z0:12.5,x1:-10,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:12.5,x1:-4,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:16.5,x1:-10,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:16.5,x1:-4,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:20.5,x1:-10,z1:21.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-15.6,z0:22.6,x1:-11,z1:23.6,altezza:1.1,tipo:"bancone"}),Object.freeze({x0:0,z0:25,x1:2.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:4,z0:25,x1:6.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:0,z0:29,x1:2.5,z1:30,altezza:.95,tipo:"bancone"}),Object.freeze({x0:18.9,z0:-14,x1:21.2,z1:-11.8,altezza:2.6,tipo:"caldaia"}),Object.freeze({x0:19,z0:22,x1:24.5,z1:24.6,altezza:2.8,tipo:"pulmino"}),Object.freeze({x0:11.2,z0:16.2,x1:11.8,z1:16.8,altezza:4,tipo:"albero"}),Object.freeze({x0:21.7,z0:13.2,x1:22.3,z1:13.8,altezza:4,tipo:"albero"}),Object.freeze({x0:12.2,z0:26.2,x1:12.8,z1:26.8,altezza:4,tipo:"albero"}),Object.freeze({x0:15,z0:11.6,x1:17.5,z1:12.1,altezza:.5,tipo:"panchina"}),Object.freeze({x0:9.2,z0:20,x1:9.7,z1:22.5,altezza:.5,tipo:"panchina"}),Object.freeze({x0:16.85,z0:19.85,x1:17.15,z1:20.15,altezza:3,tipo:"lampione"}),Object.freeze({x0:10.35,z0:27.35,x1:10.65,z1:27.65,altezza:3,tipo:"lampione"})]);function Ut(i,e,t,n,r,s,o,a=!1){const c=t==="z"?{x:(r+s)/2,z:n}:{x:n,z:(r+s)/2},l=t==="z"?rt(n,r,s):ut(n,r,s),u=t==="z"?{x:0,z:o}:{x:o,z:0};return Object.freeze({id:i,zona:e,asse:t,centro:Object.freeze(c),scatola:Object.freeze(l),esterno:Object.freeze({x:c.x+u.x*1.1,z:c.z+u.z*1.1}),interno:Object.freeze({x:c.x-u.x*1.1,z:c.z-u.z*1.1}),comparsa:Object.freeze({x:c.x+u.x*4,z:c.z+u.z*4}),fuori:Object.freeze(u),recinzione:a})}const Yn=Object.freeze([Ut("a1","atrio","z",-6,-5,-3,-1),Ut("a2","atrio","z",-6,3,5,-1),Ut("a3","atrio","x",-8,-1,1,-1),Ut("c2","corridoio","x",2,13,15,1),Ut("p1","palestra","z",-8,15,17,-1),Ut("p2","palestra","x",24,-4,-2,1),Ut("p3","palestra","x",24,3,5,1),Ut("m1","mensa","x",-16,15,17,-1),Ut("m2","mensa","z",24,-10,-8,1),Ut("m3","mensa","z",10,-12,-10,-1),Ut("l1","laboratorio","z",32,0,2,1),Ut("l2","laboratorio","x",-2,27,29,-1),Ut("g1","cortile","z",30,16,18,1,!0),Ut("g2","cortile","x",26,18,20,1,!0),Ut("k1","caldaia","z",-16,21,23,-1),Ut("k2","caldaia","x",26,-13,-11,1)]);function ki(i,e,t,n,r){return Object.freeze({id:i,nome:e,costo:t,zone:Object.freeze(n),scatola:Object.freeze(r),centro:Object.freeze({x:(r.x0+r.x1)/2,z:(r.z0+r.z1)/2})})}const Ni=Object.freeze([ki("corridoio","Porta del corridoio",750,["atrio","corridoio"],rt(6,-1,1)),ki("palestra","Porta della palestra",1e3,["atrio","palestra"],ut(8,-1,1)),ki("mensa","Porta della mensa",1250,["corridoio","mensa"],ut(-2,13,15)),ki("laboratorio","Porta del laboratorio",1500,["corridoio","laboratorio"],rt(22,-1,1)),ki("caldaia","Porta della caldaia",1e3,["palestra","caldaia"],rt(-8,20,22)),ki("cortile","Porta del cortile",1250,["palestra","cortile"],rt(8,10,12))]),ci=Object.freeze([Object.freeze({id:"muro-pompa",tipo:"arma",arma:"pompa",costo:800,munizioni:400,zona:"atrio",posizione:Object.freeze({x:-5,z:5.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-mitra",tipo:"arma",arma:"mitra",costo:1200,munizioni:600,zona:"corridoio",posizione:Object.freeze({x:-1.84,z:10}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-assalto",tipo:"arma",arma:"assalto",costo:1500,munizioni:750,zona:"palestra",posizione:Object.freeze({x:14,z:7.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-precisione",tipo:"arma",arma:"precisione",costo:1750,munizioni:900,zona:"mensa",posizione:Object.freeze({x:-15.84,z:20}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"bibita-ferro",tipo:"bevanda",bevanda:"ferro",zona:"atrio",posizione:Object.freeze({x:7,z:4.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-lampo",tipo:"bevanda",bevanda:"lampo",zona:"corridoio",posizione:Object.freeze({x:1.45,z:19.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-ritorno",tipo:"bevanda",bevanda:"ritorno",zona:"palestra",posizione:Object.freeze({x:23,z:-6.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"cassa",tipo:"cassa",zona:"palestra",posizione:Object.freeze({x:16,z:7.2}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"interruttore",tipo:"interruttore",zona:"caldaia",posizione:Object.freeze({x:25.7,z:-9.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"potenziatore",tipo:"potenziatore",zona:"laboratorio",posizione:Object.freeze({x:6.6,z:30.6}),verso:Object.freeze({x:-1,z:0})})]);function lh(i){if(i.tipo==="arma"||i.tipo==="interruttore")return null;const{x:e,z:t}=i.posizione,n=i.tipo==="potenziatore"?.8:.5,r=i.tipo==="potenziatore"?.6:.35;return i.verso.x!==0?{x0:e-r,z0:t-n,x1:e+r,z1:t+n}:{x0:e-n,z0:t-r,x1:e+n,z1:t+r}}const Sa=Object.freeze([Object.freeze({x:-1.5,z:0}),Object.freeze({x:1.5,z:0})]);function xc(i){const e=new Set(["atrio"]);for(const t of Ni)i.has(t.id)&&t.zone.forEach(n=>e.add(n));return e}function Mc(i){return[..._c,...ch,...vc,...Yn.map(e=>e.scatola),...Ni.filter(e=>!i.has(e.id)).map(e=>e.scatola),...ci.map(lh).filter(Boolean)]}const jf=.2,cl=(i,e,t)=>Math.min(t,Math.max(e,i));function qf(i,e,t,n){const r=cl(i,n.x0,n.x1),s=cl(e,n.z0,n.z1),o=i-r,a=e-s,c=o*o+a*a;if(c>=t*t)return[i,e];if(c>1e-9){const f=Math.sqrt(c);return[r+o/f*t,s+a/f*t]}const l=[[i-n.x0,n.x0-t,e],[n.x1-i,n.x1+t,e],[e-n.z0,i,n.z0-t],[n.z1-e,i,n.z1+t]],[,u,h]=l.reduce((f,d)=>d[0]<f[0]?d:f);return[u,h]}function uh(i,e,t,n,r){let{x:s,z:o}=i;const a=Math.max(1,Math.ceil(Math.hypot(e,t)/jf));for(let c=0;c<a;c++){s+=e/a,o+=t/a;for(let l=0;l<2;l++)for(const u of r)[s,o]=qf(s,o,n,u)}return{x:s,z:o}}function Yf(i,e,t){const n=e.x-i.x,r=e.z-i.z;for(const s of t){let o=0,a=1,c=!1;for(const[l,u,h,f]of[[i.x,n,s.x0,s.x1],[i.z,r,s.z0,s.z1]]){if(Math.abs(u)<1e-9){(l<h||l>f)&&(c=!0);continue}let d=(h-l)/u,g=(f-l)/u;d>g&&([d,g]=[g,d]),o=Math.max(o,d),a=Math.min(a,g)}if(!c&&o<=a)return!1}return!0}function ll(i,e,t,n=0){return i>=t.x0-n&&i<=t.x1+n&&e>=t.z0-n&&e<=t.z1+n}const Zs=Object.freeze({raggio:.32,basso:0,alto:1.45}),ya=Object.freeze({raggio:.17,altezza:1.62});function Kf(i,e,t,n=0,r=mc){let s=0,o=1/0;for(const[a,c,l,u]of[[i.x,e.x,t.x0,t.x1],[i.y,e.y,n,r],[i.z,e.z,t.z0,t.z1]]){if(Math.abs(c)<1e-9){if(a<l||a>u)return 1/0;continue}let h=(l-a)/c,f=(u-a)/c;if(h>f&&([h,f]=[f,h]),s=Math.max(s,h),o=Math.min(o,f),s>o)return 1/0}return s}function Zf(i,e,t,n){const r=i.x-t.x,s=i.y-t.y,o=i.z-t.z,a=r*e.x+s*e.y+o*e.z,c=r*r+s*s+o*o-n*n,l=a*a-c;if(l<0)return 1/0;const u=-a-Math.sqrt(l);return u>=0?u:1/0}function $f(i,e,t,n,r,s,o){const a=i.x-t,c=i.z-n,l=e.x*e.x+e.z*e.z;if(l<1e-12)return 1/0;const u=a*e.x+c*e.z,h=a*a+c*c-r*r,f=u*u-l*h;if(f<0)return 1/0;const d=(-u-Math.sqrt(f))/l;if(d<0)return 1/0;const g=i.y+e.y*d;return g>=s&&g<=o?d:1/0}function Jf(i,e,t){let n=1/0;for(const r of t)n=Math.min(n,Kf(i,e,r,0,r.altezza??mc));return n}function hh(i,e,t,n,r=1/0){const s=Math.min(r,Jf(i,e,n));let o=null;for(const a of t){const c=Zf(i,e,a.testa??{x:a.x,y:ya.altezza,z:a.z},ya.raggio),l=$f(i,e,a.x,a.z,Zs.raggio,Zs.basso,Zs.alto),u=Math.min(c,l);u>=s||o&&u>=o.t||(o={id:a.id,t:u,testa:c<=l})}return o??{id:null,t:s,testa:!1}}function Qf(i,e,t){const n=[];for(const r of e){const s=Math.hypot(r.x-i.x,Zs.alto/2-i.y,r.z-i.z);s<t&&n.push({id:r.id,fattore:1-s/t})}return n}function fh(i,e){const t=Math.cos(e);return{x:Math.sin(i)*t,y:Math.sin(e),z:Math.cos(i)*t}}function ed(i,e,t){if(e<=0)return i;const n=i.x+(t()-.5)*2*e,r=i.y+(t()-.5)*2*e,s=i.z+(t()-.5)*2*e,o=Math.hypot(n,r,s);return{x:n/o,y:r/o,z:s/o}}const td=.5,dh=.35,ho=i=>({tipo:i,caricatore:Tt[i].caricatore,riserva:Tt[i].riserva});function ph(){return{armi:[ho("pistola")],attiva:0,attesa:0,ricarica:0,cambio:0,coltello:0}}const Zt=i=>i.armi[i.attiva],mh=i=>i.ricarica>0||i.cambio>0||i.coltello>0;function nd(i,e){if(i.attesa=Math.max(0,i.attesa-e),i.cambio=Math.max(0,i.cambio-e),i.coltello=Math.max(0,i.coltello-e),i.ricarica<=0||(i.ricarica-=e,i.ricarica>0))return!1;i.ricarica=0;const t=Zt(i),n=Tt[t.tipo].caricatore-t.caricatore,r=Math.min(n,t.riserva);return t.caricatore+=r,t.riserva-=r,!0}function id(i){const e=Zt(i);return mh(i)||i.attesa>0||e.caricatore<=0?null:(e.caricatore-=1,i.attesa=Tt[e.tipo].cadenza,Tt[e.tipo])}function Lo(i,e=[]){const t=Zt(i);return mh(i)||t.riserva<=0||t.caricatore>=Tt[t.tipo].caricatore?!1:(i.ricarica=Tt[t.tipo].ricarica*(e.includes("lampo")?td:1),!0)}function rd(i){return i.coltello>0||i.cambio>0?!1:(i.ricarica=0,i.coltello=lo.attesa,!0)}function ul(i,e=(i.attiva+1)%i.armi.length){return e===i.attiva||!i.armi[e]?!1:(i.attiva=e,i.ricarica=0,i.cambio=dh,!0)}function sd(i,e,t=null){var s;const n=(s=Zt(i))==null?void 0:s.tipo,r=new Map(i.armi.map(o=>[o.tipo,o]));i.armi=e.map(o=>o===t?ho(o):r.get(o)??ho(o)),i.attiva=Math.max(0,i.armi.findIndex(o=>o.tipo===(t??n))),t&&(i.cambio=dh,i.ricarica=0)}function od(i,e){const t=i.armi.find(n=>n.tipo===e);t&&Object.assign(t,ho(e))}function gh(i){Object.assign(i,ph())}const xs=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z);function ad(i,e){const t=e.giocatori.find(s=>s.id!==i.id&&s.stato==="terra"&&xs(s,i)<=ue.RIANIMA_DISTANZA);if(t)return{tipo:"rianima",testo:`Tieni premuto F per rianimare ${t.nome}`,bersaglio:t.id};const n=[];for(const s of Ni){if(e.porte.has(s.id))continue;const o=xs(s.centro,i);o<=ue.DISTANZA_ACQUISTO&&n.push({d:o,tipo:"compra",acquisto:`porta:${s.id}`,costo:s.costo,testo:`Premi F per aprire: ${s.nome} [${s.costo}]`})}for(const s of Yn){if(e.finestre[s.id]>=ue.ASSE_PER_FINESTRA)continue;const o=xs(s.interno,i);o<=ue.DISTANZA_FINESTRA&&n.push({d:o+.5,tipo:"assa",finestra:s.id,testo:"Tieni premuto F per rimettere le assi"})}const r=xc(e.porte);for(const s of ci){if(!r.has(s.zona))continue;const o=xs(s.posizione,i);o>ue.DISTANZA_ACQUISTO||n.push({d:o,tipo:"compra",acquisto:s.id,...ld(s,i,e)})}return n.sort((s,o)=>s.d-o.d),n[0]??null}function cd(i,e){const t=e.potenziatore;return e.corrente?t.stato==="pronta"&&t.per===i.id?{costo:0,testo:`Premi F per prendere: ${Tt[t.arma].nome}`}:t.stato!=="libero"?{costo:1/0,testo:t.per===i.id?"Il potenziatore sta lavorando…":"Il potenziatore è occupato"}:(i.armaAttiva?oh(i.armaAttiva):null)?{costo:ue.COSTO_POTENZIA,testo:`Premi F per potenziare: ${Tt[i.armaAttiva].nome} [${ue.COSTO_POTENZIA}]`}:{costo:1/0,testo:"Questa arma è già potenziata"}:{costo:1/0,testo:"Il potenziatore non ha corrente: accendila in caldaia"}}function ld(i,e,t){if(i.tipo==="arma"){const r=e.armi.some(o=>co(o)===i.arma),s=r?i.munizioni:i.costo;return{costo:s,testo:r?`Premi F per le munizioni: ${Tt[i.arma].nome} [${s}]`:`Premi F per comprare: ${Tt[i.arma].nome} [${s}]`}}if(i.tipo==="bevanda"){const r=Di[i.bevanda];return e.bevande.includes(i.bevanda)?{costo:1/0,testo:`${r.nome}: ce l'hai già`}:{costo:r.costo,testo:`Premi F per bere: ${r.nome}, ${r.descrizione} [${r.costo}]`}}if(i.tipo==="interruttore")return t.corrente?{costo:1/0,testo:"La corrente è accesa"}:{costo:0,testo:"Premi F per accendere la corrente"};if(i.tipo==="potenziatore")return cd(e,t);const n=t.cassa;return n.stato==="aperta"&&n.per===e.id?{costo:0,testo:`Premi F per prendere: ${Tt[n.arma].nome}`}:n.stato==="aperta"?{costo:1/0,testo:"La cassa è occupata"}:{costo:ue.COSTO_CASSA,testo:`Premi F per la cassa a sorpresa [${ue.COSTO_CASSA}]`}}const mr=.5,es=Math.ceil((di.x1-di.x0)/mr),fo=Math.ceil((di.z1-di.z0)/mr),_h=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]],Do=new Map,un=(i,e)=>e*es+i,vh=(i,e)=>[Math.floor((i-di.x0)/mr),Math.floor((e-di.z0)/mr)],xh=(i,e)=>[di.x0+(i+.5)*mr,di.z0+(e+.5)*mr],po=(i,e)=>i>=0&&e>=0&&i<es&&e<fo;function ud(i){const e=[...i].sort().join(",");if(Do.has(e))return Do.get(e);const t=Mc(i),n=new Uint8Array(es*fo);for(let s=0;s<fo;s++)for(let o=0;o<es;o++){const[a,c]=xh(o,s),l=gc.some(h=>ll(a,c,h)),u=t.some(h=>ll(a,c,h,ue.RAGGIO_ZOMBIE));n[un(o,s)]=l&&!u?1:0}const r={libera:n};return Do.set(e,r),r}function hd(i,e){const t=new Float32Array(es*fo).fill(1/0),n=[];for(const{x:r,z:s}of e){const[o,a]=vh(r,s);po(o,a)&&(t[un(o,a)]=0,n.push([o,a]))}for(let r=0;r<n.length;r++){const[s,o]=n[r],a=t[un(s,o)];for(const[c,l,u]of _h){const h=s+c,f=o+l;if(!po(h,f)||!i.libera[un(h,f)]||c&&l&&(!i.libera[un(s+c,o)]||!i.libera[un(s,o+l)]))continue;const d=a+u;d>=t[un(h,f)]||(t[un(h,f)]=d,n.push([h,f]))}}return{distanze:t,libera:i.libera}}function fd(i,e,t){const[n,r]=vh(e,t);if(!po(n,r))return null;let s=i.distanze[un(n,r)],o=null;for(const[u,h]of _h){const f=n+u,d=r+h;if(!po(f,d)||u&&h&&(!i.libera[un(n+u,r)]||!i.libera[un(n,r+h)]))continue;const g=i.distanze[un(f,d)];g<s&&(s=g,o=[f,d])}if(!o)return null;const[a,c]=xh(o[0],o[1]),l=Math.hypot(a-e,c-t)||1;return{x:(a-e)/l,z:(c-t)/l}}const dd=3,mo=.8,pd=2e3,md=.25,gd=4,_d=.55,hl=.75,gr=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Mh=i=>Yn.find(e=>e.id===i);function ar(i){const[e,t]=ah(i.rng);return i.rng=t,e}function vd({seme:i,giocatori:e=[]}){const t={seme:i>>>0,rng:(i^1540483477)>>>0,tempo:0,fase:"intervallo",timerFase:dd,round:0,daGenerare:0,attesaComparsa:0,prossimoId:1,zombie:[],finestre:Object.fromEntries(Yn.map(n=>[n.id,ue.ASSE_PER_FINESTRA])),porte:[],giocatori:[],cassa:{stato:"chiusa",arma:null,per:null,timer:0},corrente:!1,potenziatore:{stato:"libero",arma:null,per:null,timer:0},campo:null,attesaCampo:0};return e.forEach(n=>Sc(t,n)),t}function Sc(i,{id:e,nome:t}){const n=i.giocatori.find(o=>o.id===e);if(n)return n.nome=t,n;const r=Sa[i.giocatori.length%Sa.length],s={id:e,nome:t,x:r.x,z:r.z,yaw:Math.PI,pitch:0,stato:"vivo",vita:ue.VITA,vitaMax:ue.VITA,ultimoDanno:-1/0,timerTerra:0,punti:ue.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,progressoRianimazione:0,attesaAssa:0,colpi:0,uccisioni:0,teletrasporto:0};return i.giocatori.push(s),s}function Sh(i,e){i.giocatori=i.giocatori.filter(t=>t.id!==e)}const yo=i=>i.giocatori.filter(e=>e.stato==="vivo");function xd(i,e){for(const t of i.giocatori){const n=e==null?void 0:e[t.id];n&&(t.armaAttiva=t.armi.includes(n.arma)?n.arma:t.armaAttiva,t.colpi=Number.isFinite(n.colpi)?n.colpi:t.colpi,!(t.stato!=="vivo"||(n.tp??0)<t.teletrasporto)&&(t.x=n.x,t.z=n.z,t.yaw=n.yaw,t.pitch=n.pitch))}}function fl(i,e,t,n,r={}){e.armi.includes(t)||(e.armi.length<2?e.armi.push(t):e.armi[e.armi.indexOf(e.armaAttiva)]=t),e.armaAttiva=t,n.push({k:"acquisto",a:e.id,arma:t,armi:[...e.armi],...r})}function Md(i,e,t,n,r){e.armi.includes(n)&&(e.armaAttiva=n);const s=xc(new Set(i.porte));if(t.startsWith("porta:")){const u=Ni.find(h=>`porta:${h.id}`===t);if(!u||i.porte.includes(u.id)||e.punti<u.costo||gr(e,u.centro)>ue.DISTANZA_ACQUISTO+mo)return;e.punti-=u.costo,i.porte.push(u.id),r.push({k:"porta",id:u.id,da:e.id});return}const o=ci.find(u=>u.id===t);if(!o||!s.has(o.zona)||gr(e,o.posizione)>ue.DISTANZA_ACQUISTO+mo)return;if(o.tipo==="arma"){const u=e.armi.find(f=>co(f)===o.arma),h=u?o.munizioni:o.costo;if(e.punti<h)return;e.punti-=h,u?r.push({k:"munizioni",a:e.id,arma:u}):fl(i,e,o.arma,r);return}if(o.tipo==="interruttore"){if(i.corrente)return;i.corrente=!0,r.push({k:"corrente",da:e.id});return}if(o.tipo==="potenziatore"){Sd(i,e,r);return}if(o.tipo==="bevanda"){const u=Di[o.bevanda];if(e.bevande.includes(o.bevanda)||e.punti<u.costo)return;e.punti-=u.costo,e.bevande.push(o.bevanda),o.bevanda==="ferro"&&(e.vitaMax=ue.VITA_FERRO,e.vita=ue.VITA_FERRO),r.push({k:"bevanda",a:e.id,bevanda:o.bevanda});return}const a=i.cassa;if(a.stato==="aperta"&&a.per===e.id){const u=a.arma;Object.assign(a,{stato:"chiusa",arma:null,per:null,timer:0}),fl(i,e,u,r,{daCassa:!0});return}if(a.stato!=="chiusa"||e.punti<ue.COSTO_CASSA)return;e.punti-=ue.COSTO_CASSA;const c=new Set(e.armi.map(co)),l=Ad(kf.filter(u=>!c.has(u)),ar(i));Object.assign(a,{stato:"aperta",arma:l,per:e.id,timer:ue.DURATA_CASSA}),r.push({k:"cassa",a:e.id,arma:l})}function Sd(i,e,t){const n=i.potenziatore;if(n.stato==="pronta"&&n.per===e.id){const s=e.armi.indexOf(co(n.arma));s>=0?e.armi[s]=n.arma:e.armi.length<2?e.armi.push(n.arma):e.armi[e.armi.indexOf(e.armaAttiva)]=n.arma,e.armaAttiva=n.arma,t.push({k:"acquisto",a:e.id,arma:n.arma,armi:[...e.armi],potenziata:!0}),Object.assign(n,{stato:"libero",arma:null,per:null,timer:0});return}const r=oh(e.armaAttiva);!i.corrente||n.stato!=="libero"||!r||e.punti<ue.COSTO_POTENZIA||(e.punti-=ue.COSTO_POTENZIA,Object.assign(n,{stato:"lavora",arma:r,per:e.id,timer:ue.DURATA_POTENZIA}),t.push({k:"potenzia",a:e.id,arma:r}))}function yd(i,e,t){const n=i.potenziatore;if(n.stato!=="libero"&&(n.timer-=e,!(n.timer>0))){if(n.stato==="lavora"){Object.assign(n,{stato:"pronta",timer:ue.ATTESA_RITIRO}),t.push({k:"potenziataPronta",a:n.per,arma:n.arma});return}Object.assign(n,{stato:"libero",arma:null,per:null,timer:0})}}function Ad(i,e){const t=i.reduce((r,s)=>r+al[s],0);let n=e*t;for(const r of i)if(n-=al[r],n<0)return r;return i[i.length-1]}function Ed(i,e,t,n){const r=i.zombie.find(o=>o.id===t.zombie&&o.stato!=="morto");if(!r)return;const s=Math.min(pd,Math.max(0,Number(t.danno)||0));if(r.vita-=s,r.vita>0){e.punti+=ue.PUNTI_COLPO,n.push({k:"colpito",zombie:r.id,testa:!!t.testa,da:e.id});return}r.stato="morto",r.timer=gd,e.uccisioni+=1,e.punti+=t.coltello?ue.PUNTI_COLTELLO:t.testa?ue.PUNTI_TESTA:ue.PUNTI_UCCISIONE,n.push({k:"ucciso",zombie:r.id,testa:!!t.testa,da:e.id,x:r.x,z:r.z})}function bd(i,e,t,n){const r=Mh(t);!r||e.attesaAssa>0||i.finestre[r.id]>=ue.ASSE_PER_FINESTRA||gr(e,r.interno)>ue.DISTANZA_FINESTRA+mo||i.zombie.some(s=>s.finestra===r.id&&s.stato==="scavalca")||(i.finestre[r.id]+=1,e.punti+=ue.PUNTI_ASSA,e.attesaAssa=ue.RICOSTRUISCI_OGNI,n.push({k:"assaMessa",finestra:r.id,da:e.id}))}function Td(i,e,t){for(const n of e??[]){const r=i.giocatori.find(s=>s.id===n.da);if(r){if(n.tipo==="rianima"){r.rianimando=!!n.attivo;continue}r.stato!=="vivo"||i.fase==="fine"||(n.tipo==="colpo"?Ed(i,r,n,t):n.tipo==="compra"?Md(i,r,String(n.acquisto),n.arma,t):n.tipo==="assa"&&bd(i,r,n.finestra,t))}}}function wd(i){const e=xc(new Set(i.porte)),t=Yn.filter(o=>e.has(o.zona)),n=t[Math.floor(ar(i)*t.length)],r=ar(i)<Gf(i.round),s=Hf(i.round);i.zombie.push({id:i.prossimoId++,x:n.comparsa.x+(ar(i)-.5)*2,z:n.comparsa.z+(ar(i)-.5)*2,yaw:Math.atan2(-n.fuori.x,-n.fuori.z),stato:"arriva",finestra:n.id,vita:s,vitaMax:s,corre:r,variante:Math.floor(ar(i)*4),timer:0,attesa:0,bersaglio:null})}function Rd(i,e,t){if(i.fase==="intervallo"){if(i.timerFase-=e,i.timerFase>0)return;i.round+=1,i.fase="gioco",i.daGenerare=Vf(i.round),i.attesaComparsa=1;for(const r of i.giocatori){if(r.stato!=="morto")continue;const s=Sa[0];Object.assign(r,{stato:"vivo",vita:ue.VITA,vitaMax:ue.VITA,x:s.x,z:s.z,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,teletrasporto:r.teletrasporto+1}),t.push({k:"rinato",a:r.id})}t.push({k:"round",round:i.round});return}if(i.fase!=="gioco")return;i.attesaComparsa-=e;const n=i.zombie.filter(r=>r.stato!=="morto").length;if(i.attesaComparsa<=0&&i.daGenerare>0&&n<ue.ZOMBIE_VIVI_MAX){wd(i),i.daGenerare-=1,i.attesaComparsa=Wf(i.round);return}i.daGenerare===0&&n===0&&(i.fase="intervallo",i.timerFase=ue.INTERVALLO,t.push({k:"fineRound",round:i.round}))}function Cd(i,e,t){let n=null;for(const r of yo(i)){const s=gr(r,e);s>3||n&&s>=n.d||!Yf(e,r,t)||(n={g:r,d:s})}return n}function Id(i,e,t){const n=new Set(i.porte);i.attesaCampo-=e,(!i.campo||i.attesaCampo<=0)&&(i.campo=hd(ud(n),yo(i)),i.attesaCampo=md);const r=Mc(n);for(const s of i.zombie){s.attesa=Math.max(0,s.attesa-e);const o=s.corre?ue.VELOCITA_CORRE:ue.VELOCITA_CAMMINA,a=Mh(s.finestra);if(s.stato==="morto"){s.timer-=e;continue}if(s.stato==="arriva"){const h=a.esterno.x-s.x,f=a.esterno.z-s.z,d=Math.hypot(h,f);if(d<.3)s.stato="assi",s.timer=ue.ROMPI_ASSE_OGNI;else{const g=Math.min(d,o*e);s.x+=h/d*g,s.z+=f/d*g,s.yaw=Math.atan2(h,f)}continue}if(s.stato==="assi"){s.yaw=Math.atan2(-a.fuori.x,-a.fuori.z);const h=i.zombie.some(f=>f!==s&&f.finestra===s.finestra&&f.stato==="scavalca");i.finestre[s.finestra]>0?(s.timer-=e,s.timer<=0&&(i.finestre[s.finestra]-=1,s.timer=ue.ROMPI_ASSE_OGNI,t.push({k:"assaRotta",finestra:s.finestra}))):h||(s.stato="scavalca",s.timer=ue.SCAVALCA);continue}if(s.stato==="scavalca"){s.timer-=e;const h=1-Math.max(0,s.timer)/ue.SCAVALCA;s.x=a.esterno.x+(a.interno.x-a.esterno.x)*h,s.z=a.esterno.z+(a.interno.z-a.esterno.z)*h,s.timer<=0&&(s.stato="dentro");continue}const c=Cd(i,s,r);if(s.stato==="attacco"){if(s.timer-=e,c&&(s.yaw=Math.atan2(c.g.x-s.x,c.g.z-s.z)),s.timer>0)continue;const h=i.giocatori.find(f=>f.id===s.bersaglio&&f.stato==="vivo");h&&gr(h,s)<=ue.PORTATA_ZOMBIE+.4&&Ld(i,h,t),s.stato="dentro",s.attesa=ue.ATTESA_ATTACCO;continue}if(c&&c.d<=ue.PORTATA_ZOMBIE&&s.attesa===0){s.stato="attacco",s.timer=_d,s.bersaglio=c.g.id,t.push({k:"attacco",zombie:s.id});continue}if(c&&c.d<=ue.PORTATA_ZOMBIE*.8)continue;const l=c&&c.d<1.5?{x:(c.g.x-s.x)/c.d,z:(c.g.z-s.z)/c.d}:fd(i.campo,s.x,s.z);if(!l)continue;const u=uh(s,l.x*o*e,l.z*o*e,ue.RAGGIO_ZOMBIE,r);s.x=u.x,s.z=u.z,s.yaw=Math.atan2(l.x,l.z)}Pd(i.zombie.filter(s=>s.stato==="dentro"||s.stato==="arriva"||s.stato==="assi")),i.zombie=i.zombie.filter(s=>s.stato!=="morto"||s.timer>0)}function Pd(i){for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){const n=i[e],r=i[t],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a>=hl||a<1e-6)continue;const c=(hl-a)/2,l=n.stato==="assi",u=r.stato==="assi";l||(n.x-=s/a*c,n.z-=o/a*c),u||(r.x+=s/a*c,r.z+=o/a*c)}}function Ld(i,e,t){e.vita-=ue.DANNO_ZOMBIE,e.ultimoDanno=i.tempo,t.push({k:"ferito",a:e.id}),!(e.vita>0)&&(Object.assign(e,{stato:"terra",vita:0,timerTerra:ue.TEMPO_A_TERRA,bevande:[],vitaMax:ue.VITA,progressoRianimazione:0,rianimando:!1}),t.push({k:"aTerra",a:e.id}))}function Dd(i,e,t){for(const n of i.giocatori){if(n.attesaAssa=Math.max(0,n.attesaAssa-e),n.stato==="vivo"&&i.tempo-n.ultimoDanno>ue.RIGENERA_DOPO&&(n.vita=Math.min(n.vitaMax,n.vita+ue.RIGENERA_AL_SECONDO*e)),n.stato!=="terra")continue;const r=yo(i).find(s=>s.rianimando&&gr(s,n)<=ue.RIANIMA_DISTANZA+mo);if(r){n.progressoRianimazione+=e;const s=r.bevande.includes("ritorno")?ue.RIANIMA_RAPIDO:ue.RIANIMA_IN;n.progressoRianimazione>=s&&(Object.assign(n,{stato:"vivo",vita:ue.VITA,progressoRianimazione:0,ultimoDanno:i.tempo}),t.push({k:"rianimato",a:n.id,da:r.id}));continue}n.progressoRianimazione=0,n.timerTerra-=e,n.timerTerra<=0&&(n.stato="morto",n.rianimando=!1,t.push({k:"morto",a:n.id}))}}function Nd(i,e,t){const n=i.cassa;n.stato==="aperta"&&(n.timer-=e,!(n.timer>0)&&(Object.assign(n,{stato:"chiusa",arma:null,per:null,timer:0}),t.push({k:"cassaChiusa"})))}function Ud(i,e,{posizioni:t={},azioni:n=[]}={}){const r=[];return i.fase==="fine"||(i.tempo+=e,xd(i,t),Td(i,n,r),Rd(i,e,r),Id(i,e,r),Dd(i,e,r),Nd(i,e,r),yd(i,e,r),i.giocatori.length>0&&yo(i).length===0&&(i.fase="fine",r.push({k:"fine",round:i.round,giocatori:i.giocatori.map(s=>({nome:s.nome,punti:s.punti,uccisioni:s.uccisioni}))}))),r}const yh=Object.freeze(["arriva","assi","scavalca","dentro","attacco","morto"]),Ah=Object.freeze(["vivo","terra","morto"]),Eh=Object.freeze(["intervallo","gioco","fine"]),bh=Object.freeze(["libero","lavora","pronta"]),on=i=>Math.round(i*100)/100;function Th(i){return{t:Math.round(i.tempo*1e3)/1e3,f:Eh.indexOf(i.fase),r:i.round,tf:on(Math.max(0,i.timerFase)),z:i.zombie.map(e=>[e.id,on(e.x),on(e.z),on(e.yaw),yh.indexOf(e.stato),e.corre?1:0,e.variante,Math.max(0,Math.round(e.vita/e.vitaMax*100))]),w:Yn.map(e=>i.finestre[e.id]),p:[...i.porte],g:i.giocatori.map(e=>({id:e.id,n:e.nome,x:on(e.x),z:on(e.z),y:on(e.yaw),p:on(e.pitch),s:Ah.indexOf(e.stato),v:Math.round(e.vita),vm:e.vitaMax,pt:e.punti,a:e.armaAttiva,ar:[...e.armi],b:[...e.bevande],c:e.colpi,tt:on(e.timerTerra),pr:on(e.progressoRianimazione),ri:e.rianimando?1:0,u:e.uccisioni,tp:e.teletrasporto})),c:[i.cassa.stato==="aperta"?1:0,i.cassa.arma??"",i.cassa.per??"",on(i.cassa.timer)],e:i.corrente?1:0,k:[bh.indexOf(i.potenziatore.stato),i.potenziatore.arma??"",i.potenziatore.per??"",on(i.potenziatore.timer)]}}function wh(i){return{tempo:i.t,fase:Eh[i.f],round:i.r,timerFase:i.tf,zombie:i.z.map(([e,t,n,r,s,o,a,c])=>({id:e,x:t,z:n,yaw:r,stato:yh[s],corre:!!o,variante:a,vita:c})),finestre:Object.fromEntries(Yn.map((e,t)=>[e.id,i.w[t]])),porte:new Set(i.p),giocatori:i.g.map(e=>({id:e.id,nome:e.n,x:e.x,z:e.z,yaw:e.y,pitch:e.p,stato:Ah[e.s],vita:e.v,vitaMax:e.vm,punti:e.pt,armaAttiva:e.a,armi:e.ar,bevande:e.b,colpi:e.c,timerTerra:e.tt,progressoRianimazione:e.pr,rianimando:!!e.ri,uccisioni:e.u,teletrasporto:e.tp})),cassa:{stato:i.c[0]?"aperta":"chiusa",arma:i.c[1]||null,per:i.c[2]||null,timer:i.c[3]},corrente:!!i.e,potenziatore:{stato:bh[i.k[0]],arma:i.k[1]||null,per:i.k[2]||null,timer:i.k[3]}}}const $s=(i,e,t)=>i+(e-i)*t;function Od(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}function dl(i,e,t,n){const r=new Map(i.map(s=>[s.id,s]));return e.map(s=>{const o=r.get(s.id);if(!o||o.teletrasporto!==s.teletrasporto)return s;const a={...s,x:$s(o.x,s.x,t),z:$s(o.z,s.z,t),yaw:Od(o.yaw,s.yaw,t)};return n&&(a.pitch=$s(o.pitch,s.pitch,t)),a})}function zd(i,e,t){const n=Math.min(1,Math.max(0,t));return{...e,tempo:$s(i.tempo,e.tempo,n),zombie:dl(i.zombie,e.zombie,n,!1),giocatori:dl(i.giocatori,e.giocatori,n,!0)}}const Fd="https://dxqmblsmawdtqhtekfnf.supabase.co",Bd="sb_publishable_mjj5GumFWTwYleVvkV4pcw_tibE8HUI",kd=Object.freeze([{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]),Vd=6e3,Hd=25e3,pl=1e3,Gd=15e3,Wd=1e3,Rh="zombie",Xd=200;function go(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function jd(i){const e=new BroadcastChannel(`${Rh}-${i}`),t=go(),n=go();return e.onmessage=r=>t.avvisa(r.data),{invia:r=>e.postMessage(r),suMessaggio:t.aggiungi,suStato:r=>{n.aggiungi(r),r("online")},chiudi:()=>e.close()}}function qd(i){const e=`realtime:${Rh}-${i}`,t=`${Fd.replace(/^http/,"ws")}/realtime/v1/websocket?apikey=${encodeURIComponent(Bd)}&vsn=1.0.0`,n=go(),r=go(),s=[];let o=null,a=!1,c=0,l=null,u=null,h=pl,f=!1,d="connessione";const g=_=>{d=_,r.avvisa(_)},v=(_,M,x=e)=>{(o==null?void 0:o.readyState)===WebSocket.OPEN&&o.send(JSON.stringify({topic:x,event:_,payload:M,ref:String(++c),join_ref:"1"}))},m=_=>v("broadcast",{type:"broadcast",event:"m",payload:_});function p(){if(f)return;g("connessione"),a=!1;const _=new WebSocket(t);o=_,_.onopen=()=>{v("phx_join",{config:{broadcast:{self:!1,ack:!1},presence:{key:""},private:!1}}),clearInterval(l),l=setInterval(()=>v("heartbeat",{},"phoenix"),Hd)},_.onmessage=M=>{var C,b,T,P;let x;try{x=JSON.parse(M.data)}catch{return}x.topic===e&&(x.event==="phx_reply"&&!a&&((C=x.payload)==null?void 0:C.status)!=="ok"?(console.error("Supabase ha rifiutato l'ingresso nel canale della stanza:",(b=x.payload)==null?void 0:b.response),_.close()):x.event==="phx_reply"&&((T=x.payload)==null?void 0:T.status)==="ok"&&!a?(a=!0,h=pl,g("online"),s.splice(0).forEach(m)):x.event==="broadcast"&&((P=x.payload)==null?void 0:P.event)==="m"?n.avvisa(x.payload.payload):(x.event==="phx_error"||x.event==="phx_close")&&_.close())},_.onclose=()=>{o!==_||f||(clearInterval(l),a=!1,g("offline"),u=setTimeout(p,h),h=Math.min(Gd,h*2))}}return p(),{invia(_,{scartabile:M=!1}={}){if(a){m(_);return}M||(s.length>=Xd&&s.shift(),s.push(_))},suMessaggio:n.aggiungi,suStato:_=>{r.aggiungi(_),_(d)},chiudi(){f=!0,clearTimeout(u),clearInterval(l),o==null||o.close()}}}function Yd(i,{locale:e=!1}={}){return e?jd(i):qd(i)}const ml="ABCDEFGHJKLMNPQRSTUVWXYZ",Kd=16,Zd=64;function $d(i=Math.random){return Array.from({length:4},()=>ml[Math.floor(i()*ml.length)]).join("")}function Ch(i){const e=String(i??"").trim().toUpperCase();return/^[A-HJ-NP-Z]{4}$/.test(e)?e:null}function ts(i){return String(i??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,Kd)||null}const tn=i=>typeof i=="number"&&Number.isFinite(i),ns=(i,e=Zd)=>typeof i=="string"&&i.length>0&&i.length<=e,is=i=>typeof i=="string"&&Object.hasOwn(Tt,i),Jd=(i,e)=>Array.isArray(i)&&i.every(t=>Array.isArray(t)&&t.length===e&&t.every(tn));function Qd(i){return!!i&&typeof i=="object"&&ns(i.id)&&typeof i.n=="string"&&[i.x,i.z,i.y,i.p,i.s,i.v,i.vm,i.pt,i.c,i.tt,i.pr,i.ri,i.u,i.tp].every(tn)&&is(i.a)&&Array.isArray(i.ar)&&i.ar.every(is)&&Array.isArray(i.b)&&i.b.every(e=>Object.hasOwn(Di,e))}function ep(i){return!!i&&typeof i=="object"&&[i.t,i.f,i.r,i.tf].every(tn)&&Jd(i.z,8)&&Array.isArray(i.w)&&i.w.every(tn)&&Array.isArray(i.p)&&i.p.every(e=>ns(e))&&Array.isArray(i.g)&&i.g.every(Qd)&&Array.isArray(i.c)&&i.c.length===4&&tn(i.e)&&Array.isArray(i.k)&&i.k.length===4&&[0,1,2].includes(i.k[0])&&tn(i.k[3])&&(i.k[1]===""||is(i.k[1]))}function tp(i){return!i||typeof i!="object"?!1:i.tipo==="colpo"?tn(i.zombie)&&tn(i.danno):i.tipo==="compra"?ns(i.acquisto)&&(i.arma===void 0||is(i.arma)):i.tipo==="assa"?ns(i.finestra):i.tipo==="rianima"?typeof i.attivo=="boolean":!1}const np={ciao:i=>ts(i.nome)!==null&&ns(i.id),lobby:i=>ts(i.nomeHost)!==null,inizia:i=>tn(i.seme),g:i=>[i.x,i.z,i.yaw,i.pitch,i.colpi,i.tp].every(tn)&&is(i.arma),az:i=>tp(i.a),st:i=>tn(i.g)&&ep(i.ist),ev:i=>Array.isArray(i.eventi)&&i.eventi.every(e=>e&&typeof e.k=="string"),ping:i=>tn(i.n),pong:i=>tn(i.n)};function ip(i){if(!i||typeof i!="object"||typeof i.t!="string")return null;const e=np[i.t];return e&&e(i)?i:null}const rp=5e3,sp=2500,op=64*1024;function gl(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function ap({segnali:i,sonoHost:e,mioId:t,soloRiserva:n=!1}){const r=gl(),s=gl();let o=null,a=null,c={},l="attesa",u=null,h=null,f=0,d=[],g=0;const v=I=>{l!==I&&(l=I,s.avvisa(I))},m=(I,F={},Y={})=>i.invia({tipo:I,da:t,a:o,...F},Y);function p(I){const F=ip(I);F&&(f=performance.now(),r.avvisa(F))}function _(){var I,F;((I=c.veloce)==null?void 0:I.readyState)!=="open"||((F=c.sicuro)==null?void 0:F.readyState)!=="open"||(clearTimeout(u),v("diretto"))}function M(){clearTimeout(u),u=setTimeout(()=>{l!=="diretto"&&v("riserva")},Vd)}function x(I){c[I.label]=I,I.onmessage=F=>{let Y;try{Y=JSON.parse(F.data)}catch{return}p(Y)},I.onopen=_,I.onclose=()=>{c[I.label]===I&&l==="diretto"&&v("riserva")}}function C(){for(const I of Object.values(c))I.onopen=I.onclose=I.onmessage=null,I.close();c={},a&&(a.onicecandidate=a.onconnectionstatechange=a.ondatachannel=null,a.close()),a=null}function b(){if(C(),v("collegamento"),n)return clearTimeout(u),v("riserva"),null;const I=new RTCPeerConnection({iceServers:kd});return a=I,I.onicecandidate=F=>{F.candidate&&m("ice",{c:F.candidate.toJSON()})},I.onconnectionstatechange=()=>{a===I&&(I.connectionState==="connected"?_():["failed","closed","disconnected"].includes(I.connectionState)&&l==="diretto"&&v("riserva"))},I.ondatachannel=F=>x(F.channel),M(),I}async function T(I){for(const F of d.splice(0)){if(a!==I)return;await I.addIceCandidate(F).catch(()=>{})}}async function P(I){o=I,g=performance.now(),f=performance.now(),d=[],m("benvenuto");const F=b();if(!F)return;x(F.createDataChannel("veloce",{ordered:!1,maxRetransmits:0})),x(F.createDataChannel("sicuro"));const Y=await F.createOffer();a===F&&(await F.setLocalDescription(Y),a===F&&m("offerta",{sdp:F.localDescription.toJSON()}))}async function A(I){const F=b();if(!F||(await F.setRemoteDescription(I),a!==F))return;await T(F);const Y=await F.createAnswer();a===F&&(await F.setLocalDescription(Y),a===F&&m("risposta",{sdp:F.localDescription.toJSON()}))}const S=I=>{console.error("Collegamento diretto non riuscito, passo dalla riserva:",I),v("riserva")};function D(I){o!==I&&(o=I,clearInterval(h),n?b():(v("collegamento"),M()))}function H(I){if(!(!I||typeof I!="object"||typeof I.da!="string"||I.da===t)){if(e&&I.tipo==="ciao"){if(I.da===o){l==="collegamento"&&performance.now()-g>sp&&P(I.da).catch(S);return}if(o&&performance.now()-f<rp){i.invia({tipo:"occupata",da:t,a:I.da});return}P(I.da).catch(S);return}if(I.a===t){if(!e&&(I.tipo==="benvenuto"||I.tipo==="offerta"&&!o)&&D(I.da),!e&&I.tipo==="occupata"){o||v("occupata");return}if(I.da===o)if(!e&&I.tipo==="offerta")A(I.sdp).catch(S);else if(e&&I.tipo==="risposta"&&a){const F=a;F.setRemoteDescription(I.sdp).then(()=>T(F)).catch(S)}else I.tipo==="ice"?a!=null&&a.remoteDescription?a.addIceCandidate(I.c).catch(()=>{}):d.push(I.c):I.tipo==="gioco"&&p(I.m)}}}if(i.suMessaggio(H),!e){const I=()=>i.invia({tipo:"ciao",da:t});I(),h=setInterval(I,Wd)}return{get modo(){return l},get altroId(){return o},silenzio:()=>f?performance.now()-f:1/0,suMessaggio:r.aggiungi,suStato:s.aggiungi,invia(I,{veloce:F=!1}={}){if(l==="diretto"){const Y=F?c.veloce:c.sicuro;if((Y==null?void 0:Y.readyState)==="open"){(!F||Y.bufferedAmount<op)&&Y.send(JSON.stringify(I));return}}o&&(l==="riserva"||l==="diretto")&&m("gioco",{m:I},{scartabile:F})},chiudi(){clearInterval(h),clearTimeout(u),C(),i.chiudi()}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yc="170",cp=0,_l=1,lp=2,Ih=1,up=2,Hn=3,Kn=0,$t=1,Sn=2,hi=0,Pi=1,rs=2,vl=3,xl=4,hp=5,wi=100,fp=101,dp=102,pp=103,mp=104,gp=200,_p=201,vp=202,xp=203,Aa=204,Ea=205,Mp=206,Sp=207,yp=208,Ap=209,Ep=210,bp=211,Tp=212,wp=213,Rp=214,ba=0,Ta=1,wa=2,_r=3,Ra=4,Ca=5,Ia=6,Pa=7,Ac=0,Cp=1,Ip=2,fi=0,Pp=1,Lp=2,Dp=3,Np=4,Up=5,Op=6,zp=7,Ml="attached",Fp="detached",Ph=300,vr=301,xr=302,La=303,Da=304,Ao=306,Ui=1e3,li=1001,_o=1002,St=1003,Lh=1004,qr=1005,nn=1006,Js=1007,Xn=1008,Zn=1009,Dh=1010,Nh=1011,ss=1012,Ec=1013,Oi=1014,An=1015,fs=1016,bc=1017,Tc=1018,Mr=1020,Uh=35902,Oh=1021,zh=1022,dn=1023,Fh=1024,Bh=1025,fr=1026,Sr=1027,wc=1028,Rc=1029,kh=1030,Cc=1031,Ic=1033,Qs=33776,eo=33777,to=33778,no=33779,Na=35840,Ua=35841,Oa=35842,za=35843,Fa=36196,Ba=37492,ka=37496,Va=37808,Ha=37809,Ga=37810,Wa=37811,Xa=37812,ja=37813,qa=37814,Ya=37815,Ka=37816,Za=37817,$a=37818,Ja=37819,Qa=37820,ec=37821,io=36492,tc=36494,nc=36495,Vh=36283,ic=36284,rc=36285,sc=36286,Hh=2200,Bp=2201,kp=2202,os=2300,as=2301,No=2302,cr=2400,lr=2401,vo=2402,Pc=2500,Vp=2501,Hp=0,Gh=1,oc=2,Gp=3200,Wp=3201,Lc=0,Xp=1,ai="",wt="srgb",qt="srgb-linear",Eo="linear",ot="srgb",Vi=7680,Sl=519,jp=512,qp=513,Yp=514,Wh=515,Kp=516,Zp=517,$p=518,Jp=519,ac=35044,yl="300 es",jn=2e3,xo=2001;class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Al=1234567;const Zr=Math.PI/180,yr=180/Math.PI;function En(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Vt(i,e,t){return Math.max(e,Math.min(t,i))}function Dc(i,e){return(i%e+e)%e}function Qp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function em(i,e,t){return i!==e?(t-i)/(e-i):0}function $r(i,e,t){return(1-t)*i+t*e}function tm(i,e,t,n){return $r(i,e,1-Math.exp(-t*n))}function nm(i,e=1){return e-Math.abs(Dc(i,e*2)-e)}function im(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function om(i,e){return i+Math.random()*(e-i)}function am(i){return i*(.5-Math.random())}function cm(i){i!==void 0&&(Al=i);let e=Al+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lm(i){return i*Zr}function um(i){return i*yr}function hm(i){return(i&i-1)===0&&i!==0}function fm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function dm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function pm(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function yn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const cc={DEG2RAD:Zr,RAD2DEG:yr,generateUUID:En,clamp:Vt,euclideanModulo:Dc,mapLinear:Qp,inverseLerp:em,lerp:$r,damp:tm,pingpong:nm,smoothstep:im,smootherstep:rm,randInt:sm,randFloat:om,randFloatSpread:am,seededRandom:cm,degToRad:lm,radToDeg:um,isPowerOfTwo:hm,ceilPowerOfTwo:fm,floorPowerOfTwo:dm,setQuaternionFromProperEuler:pm,normalize:st,denormalize:yn};class Le{constructor(e=0,t=0){Le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,r,s,o,a,c,l){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],v=r[0],m=r[3],p=r[6],_=r[1],M=r[4],x=r[7],C=r[2],b=r[5],T=r[8];return s[0]=o*v+a*_+c*C,s[3]=o*m+a*M+c*b,s[6]=o*p+a*x+c*T,s[1]=l*v+u*_+h*C,s[4]=l*m+u*M+h*b,s[7]=l*p+u*x+h*T,s[2]=f*v+d*_+g*C,s[5]=f*m+d*M+g*b,s[8]=f*p+d*x+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,g=t*h+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*l-u*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-a*t)*v,e[6]=d*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Uo.makeScale(e,t)),this}rotate(e){return this.premultiply(Uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new ke;function Xh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function mm(){const i=cs("canvas");return i.style.display="block",i}const El={};function Yr(i){i in El||(El[i]=!0,console.warn(i))}function gm(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function _m(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function vm(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const je={enabled:!0,workingColorSpace:qt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ot&&(i.r=qn(i.r),i.g=qn(i.g),i.b=qn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ot&&(i.r=dr(i.r),i.g=dr(i.g),i.b=dr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ai?Eo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function dr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const bl=[.64,.33,.3,.6,.15,.06],Tl=[.2126,.7152,.0722],wl=[.3127,.329],Rl=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cl=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[qt]:{primaries:bl,whitePoint:wl,transfer:Eo,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:Tl,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:bl,whitePoint:wl,transfer:ot,toXYZ:Rl,fromXYZ:Cl,luminanceCoefficients:Tl,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}});let Hi;class xm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hi===void 0&&(Hi=cs("canvas")),Hi.width=e.width,Hi.height=e.height;const n=Hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=qn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(qn(t[n]/255)*255):t[n]=qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mm=0;class jh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=En(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Oo(r[o].image)):s.push(Oo(r[o]))}else s=Oo(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Oo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sm=0;class Rt extends Fi{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=li,r=li,s=nn,o=Xn,a=dn,c=Zn,l=Rt.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=En(),this.name="",this.source=new jh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ph)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ui:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case _o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ui:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case _o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=Ph;Rt.DEFAULT_ANISOTROPY=1;class Qe{constructor(e=0,t=0,n=0,r=1){Qe.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,x=(d+1)/2,C=(p+1)/2,b=(u+f)/4,T=(h+v)/4,P=(g+m)/4;return M>x&&M>C?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=T/n):x>C?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=b/r,s=P/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=T/s,r=P/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-v)/_,this.z=(f-u)/_,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ym extends Fi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Qe(0,0,e,t),this.scissorTest=!1,this.viewport=new Qe(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Rt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new jh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zi extends ym{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qh extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Am extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],v=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=v;return}if(h!==v||c!==f||l!==d||u!==g){let m=1-a;const p=c*f+l*d+u*g+h*v,_=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),b=Math.atan2(C,p*_);m=Math.sin(m*b)/C,a=Math.sin(a*b)/C}const x=a*_;if(c=c*m+f*x,l=l*m+d*x,u=u*m+g*x,h=h*m+v*x,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),f=c(n/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Vt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Il.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Il.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zo.copy(this).projectOnVector(e),this.sub(zo)}reflect(e){return this.sub(zo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Vt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new L,Il=new bn;class $n{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,_n):_n.fromBufferAttribute(s,o),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ms.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ms.copy(n.boundingBox)),Ms.applyMatrix4(e.matrixWorld),this.union(Ms)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Dr),Ss.subVectors(this.max,Dr),Gi.subVectors(e.a,Dr),Wi.subVectors(e.b,Dr),Xi.subVectors(e.c,Dr),ei.subVectors(Wi,Gi),ti.subVectors(Xi,Wi),gi.subVectors(Gi,Xi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-gi.z,gi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,gi.z,0,-gi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-gi.y,gi.x,0];return!Fo(t,Gi,Wi,Xi,Ss)||(t=[1,0,0,0,1,0,0,0,1],!Fo(t,Gi,Wi,Xi,Ss))?!1:(ys.crossVectors(ei,ti),t=[ys.x,ys.y,ys.z],Fo(t,Gi,Wi,Xi,Ss))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const On=[new L,new L,new L,new L,new L,new L,new L,new L],_n=new L,Ms=new $n,Gi=new L,Wi=new L,Xi=new L,ei=new L,ti=new L,gi=new L,Dr=new L,Ss=new L,ys=new L,_i=new L;function Fo(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){_i.fromArray(i,s);const a=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),c=e.dot(_i),l=t.dot(_i),u=n.dot(_i);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Em=new $n,Nr=new L,Bo=new L;class Pn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Em.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Nr.subVectors(e,this.center);const t=Nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Nr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Nr.copy(e.center).add(Bo)),this.expandByPoint(Nr.copy(e.center).sub(Bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new L,ko=new L,As=new L,ni=new L,Vo=new L,Es=new L,Ho=new L;class bo{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ko.copy(e).add(t).multiplyScalar(.5),As.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(ko);const s=e.distanceTo(t)*.5,o=-this.direction.dot(As),a=ni.dot(this.direction),c=-ni.dot(As),l=ni.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ko).addScaledVector(As,f),d}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),r=zn.dot(zn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,r,s){Vo.subVectors(t,e),Es.subVectors(n,e),Ho.crossVectors(Vo,Es);let o=this.direction.dot(Ho),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,e);const c=a*this.direction.dot(Es.crossVectors(ni,Es));if(c<0)return null;const l=a*this.direction.dot(Vo.cross(ni));if(l<0||c+l>o)return null;const u=-a*ni.dot(Ho);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(e,t,n,r,s,o,a,c,l,u,h,f,d,g,v,m){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,f,d,g,v,m)}set(e,t,n,r,s,o,a,c,l,u,h,f,d,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ji.setFromMatrixColumn(e,0).length(),s=1/ji.setFromMatrixColumn(e,1).length(),o=1/ji.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,v=l*h;t[0]=f+v*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,v=l*h;t[0]=f-v*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,v=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+v,t[1]=c*h,t[5]=v*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=v-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*c,d=o*l,g=a*c,v=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bm,e,Tm)}lookAt(e,t,n){const r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),ii.crossVectors(n,Qt),ii.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),ii.crossVectors(n,Qt)),ii.normalize(),bs.crossVectors(Qt,ii),r[0]=ii.x,r[4]=bs.x,r[8]=Qt.x,r[1]=ii.y,r[5]=bs.y,r[9]=Qt.y,r[2]=ii.z,r[6]=bs.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],_=n[3],M=n[7],x=n[11],C=n[15],b=r[0],T=r[4],P=r[8],A=r[12],S=r[1],D=r[5],H=r[9],I=r[13],F=r[2],Y=r[6],w=r[10],j=r[14],k=r[3],Z=r[7],Q=r[11],ae=r[15];return s[0]=o*b+a*S+c*F+l*k,s[4]=o*T+a*D+c*Y+l*Z,s[8]=o*P+a*H+c*w+l*Q,s[12]=o*A+a*I+c*j+l*ae,s[1]=u*b+h*S+f*F+d*k,s[5]=u*T+h*D+f*Y+d*Z,s[9]=u*P+h*H+f*w+d*Q,s[13]=u*A+h*I+f*j+d*ae,s[2]=g*b+v*S+m*F+p*k,s[6]=g*T+v*D+m*Y+p*Z,s[10]=g*P+v*H+m*w+p*Q,s[14]=g*A+v*I+m*j+p*ae,s[3]=_*b+M*S+x*F+C*k,s[7]=_*T+M*D+x*Y+C*Z,s[11]=_*P+M*H+x*w+C*Q,s[15]=_*A+M*I+x*j+C*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+s*c*h-r*l*h-s*a*f+n*l*f+r*a*d-n*c*d)+v*(+t*c*d-t*l*f+s*o*f-r*o*d+r*l*u-s*c*u)+m*(+t*l*h-t*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-t*c*h+t*a*f+r*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],v=e[13],m=e[14],p=e[15],_=h*m*l-v*f*l+v*c*d-a*m*d-h*c*p+a*f*p,M=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,x=u*v*l-g*h*l+g*a*d-o*v*d-u*a*p+o*h*p,C=g*h*c-u*v*c-g*a*f+o*v*f+u*a*m-o*h*m,b=t*_+n*M+r*x+s*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/b;return e[0]=_*T,e[1]=(v*f*s-h*m*s-v*r*d+n*m*d+h*r*p-n*f*p)*T,e[2]=(a*m*s-v*c*s+v*r*l-n*m*l-a*r*p+n*c*p)*T,e[3]=(h*c*s-a*f*s-h*r*l+n*f*l+a*r*d-n*c*d)*T,e[4]=M*T,e[5]=(u*m*s-g*f*s+g*r*d-t*m*d-u*r*p+t*f*p)*T,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*p-t*c*p)*T,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*d+t*c*d)*T,e[8]=x*T,e[9]=(g*h*s-u*v*s-g*n*d+t*v*d+u*n*p-t*h*p)*T,e[10]=(o*v*s-g*a*s+g*n*l-t*v*l-o*n*p+t*a*p)*T,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*d-t*a*d)*T,e[12]=C*T,e[13]=(u*v*r-g*h*r+g*n*f-t*v*f-u*n*m+t*h*m)*T,e[14]=(g*a*r-o*v*r-g*n*c+t*v*c+o*n*m-t*a*m)*T,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,g=s*h,v=o*u,m=o*h,p=a*h,_=c*l,M=c*u,x=c*h,C=n.x,b=n.y,T=n.z;return r[0]=(1-(v+p))*C,r[1]=(d+x)*C,r[2]=(g-M)*C,r[3]=0,r[4]=(d-x)*b,r[5]=(1-(f+p))*b,r[6]=(m+_)*b,r[7]=0,r[8]=(g+M)*T,r[9]=(m-_)*T,r[10]=(1-(f+v))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ji.set(r[0],r[1],r[2]).length();const o=ji.set(r[4],r[5],r[6]).length(),a=ji.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],vn.copy(this);const l=1/s,u=1/o,h=1/a;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,t.setFromRotationMatrix(vn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=jn){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let d,g;if(a===jn)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===xo)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=jn){const c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(o-s),f=(t+e)*l,d=(n+r)*u;let g,v;if(a===jn)g=(o+s)*h,v=-2*h;else if(a===xo)g=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ji=new L,vn=new ze,bm=new L(0,0,0),Tm=new L(1,1,1),ii=new L,bs=new L,Qt=new L,Pl=new ze,Ll=new bn;class Tn{constructor(e=0,t=0,n=0,r=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Yh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wm=0;const Dl=new L,qi=new bn,Fn=new ze,Ts=new L,Ur=new L,Rm=new L,Cm=new bn,Nl=new L(1,0,0),Ul=new L(0,1,0),Ol=new L(0,0,1),zl={type:"added"},Im={type:"removed"},Yi={type:"childadded",child:null},Go={type:"childremoved",child:null};class ft extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new L,t=new Tn,n=new bn,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ze},normalMatrix:{value:new ke}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(Nl,e)}rotateY(e){return this.rotateOnAxis(Ul,e)}rotateZ(e){return this.rotateOnAxis(Ol,e)}translateOnAxis(e,t){return Dl.copy(e).applyQuaternion(this.quaternion),this.position.add(Dl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nl,e)}translateY(e){return this.translateOnAxis(Ul,e)}translateZ(e){return this.translateOnAxis(Ol,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ts.copy(e):Ts.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Ur,Ts,this.up):Fn.lookAt(Ts,Ur,this.up),this.quaternion.setFromRotationMatrix(Fn),r&&(Fn.extractRotation(r.matrixWorld),qi.setFromRotationMatrix(Fn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zl),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Im),Go.child=e,this.dispatchEvent(Go),Go.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zl),Yi.child=e,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,e,Rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,Cm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ft.DEFAULT_UP=new L(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new L,Bn=new L,Wo=new L,kn=new L,Ki=new L,Zi=new L,Fl=new L,Xo=new L,jo=new L,qo=new L,Yo=new Qe,Ko=new Qe,Zo=new Qe;class fn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xn.subVectors(e,t),r.cross(xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){xn.subVectors(r,t),Bn.subVectors(n,t),Wo.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(Bn),c=xn.dot(Wo),l=Bn.dot(Bn),u=Bn.dot(Wo),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,kn.x),c.addScaledVector(o,kn.y),c.addScaledVector(a,kn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Yo.setScalar(0),Ko.setScalar(0),Zo.setScalar(0),Yo.fromBufferAttribute(e,t),Ko.fromBufferAttribute(e,n),Zo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Yo,s.x),o.addScaledVector(Ko,s.y),o.addScaledVector(Zo,s.z),o}static isFrontFacing(e,t,n,r){return xn.subVectors(n,t),Bn.subVectors(e,t),xn.cross(Bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),xn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return fn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Ki.subVectors(r,n),Zi.subVectors(s,n),Xo.subVectors(e,n);const c=Ki.dot(Xo),l=Zi.dot(Xo);if(c<=0&&l<=0)return t.copy(n);jo.subVectors(e,r);const u=Ki.dot(jo),h=Zi.dot(jo);if(u>=0&&h<=u)return t.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Ki,o);qo.subVectors(e,s);const d=Ki.dot(qo),g=Zi.dot(qo);if(g>=0&&d<=g)return t.copy(s);const v=d*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Zi,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Fl.subVectors(s,r),a=(h-u)/(h-u+(d-g)),t.copy(r).addScaledVector(Fl,a);const p=1/(m+v+f);return o=v*p,a=f*p,t.copy(n).addScaledVector(Ki,o).addScaledVector(Zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},ws={h:0,s:0,l:0};function $o(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=je.workingColorSpace){if(e=Dc(e,1),t=Vt(t,0,1),n=Vt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=$o(o,s,e+1/3),this.g=$o(o,s,e),this.b=$o(o,s,e-1/3)}return je.toWorkingColorSpace(this,r),this}setStyle(e,t=wt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const n=Kh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return je.fromWorkingColorSpace(zt.copy(this),e),Math.round(Vt(zt.r*255,0,255))*65536+Math.round(Vt(zt.g*255,0,255))*256+Math.round(Vt(zt.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(zt.copy(this),t);const n=zt.r,r=zt.g,s=zt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=wt){je.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,r=zt.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(ws);const n=$r(ri.h,ws.h,t),r=$r(ri.s,ws.s,t),s=$r(ri.l,ws.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new we;we.NAMES=Kh;let Pm=0;class pn extends Fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=En(),this.name="",this.blending=Pi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ea,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Pi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ea&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mt extends pn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new L,Rs=new Le;class jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ac,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rs.fromBufferAttribute(this,t),Rs.applyMatrix3(e),this.setXY(t,Rs.x,Rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ac&&(e.usage=this.usage),e}}class Zh extends jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class $h extends jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Lm=0;const an=new ze,Jo=new ft,$i=new L,en=new $n,Or=new $n,Pt=new L;class Dt extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xh(e)?$h:Zh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return Jo.lookAt(e),Jo.updateMatrix(),this.applyMatrix4(Jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _t(n,3))}else{for(let n=0,r=t.count;n<r;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Or.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(en.min,Or.min),en.expandByPoint(Pt),Pt.addVectors(en.max,Or.max),en.expandByPoint(Pt)):(en.expandByPoint(Or.min),en.expandByPoint(Or.max))}en.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Pt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Pt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Pt.fromBufferAttribute(a,l),c&&($i.fromBufferAttribute(e,l),Pt.add($i)),r=Math.max(r,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new L,c[P]=new L;const l=new L,u=new L,h=new L,f=new Le,d=new Le,g=new Le,v=new L,m=new L;function p(P,A,S){l.fromBufferAttribute(n,P),u.fromBufferAttribute(n,A),h.fromBufferAttribute(n,S),f.fromBufferAttribute(s,P),d.fromBufferAttribute(s,A),g.fromBufferAttribute(s,S),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),a[P].add(v),a[A].add(v),a[S].add(v),c[P].add(m),c[A].add(m),c[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,A=_.length;P<A;++P){const S=_[P],D=S.start,H=S.count;for(let I=D,F=D+H;I<F;I+=3)p(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const M=new L,x=new L,C=new L,b=new L;function T(P){C.fromBufferAttribute(r,P),b.copy(C);const A=a[P];M.copy(A),M.sub(C.multiplyScalar(C.dot(A))).normalize(),x.crossVectors(b,A);const D=x.dot(c[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,D)}for(let P=0,A=_.length;P<A;++P){const S=_[P],D=S.start,H=S.count;for(let I=D,F=D+H;I<F;I+=3)T(e.getX(I+0)),T(e.getX(I+1)),T(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new jt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bl=new ze,vi=new bo,Cs=new Pn,kl=new L,Is=new L,Ps=new L,Ls=new L,Qo=new L,Ds=new L,Vl=new L,Ns=new L;class Te extends ft{constructor(e=new Dt,t=new Mt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ds.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(Qo.fromBufferAttribute(h,e),o?Ds.addScaledVector(Qo,u):Ds.addScaledVector(Qo.sub(t),u))}t.add(Ds)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(s),vi.copy(e.ray).recast(e.near),!(Cs.containsPoint(vi.origin)===!1&&(vi.intersectSphere(Cs,kl)===null||vi.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Bl.copy(s).invert(),vi.copy(e.ray).applyMatrix4(Bl),!(n.boundingBox!==null&&vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=_,C=M;x<C;x+=3){const b=a.getX(x),T=a.getX(x+1),P=a.getX(x+2);r=Us(this,p,e,n,l,u,h,b,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=a.getX(m),M=a.getX(m+1),x=a.getX(m+2);r=Us(this,o,e,n,l,u,h,_,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=o[m.materialIndex],_=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=_,C=M;x<C;x+=3){const b=x,T=x+1,P=x+2;r=Us(this,p,e,n,l,u,h,b,T,P),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const _=m,M=m+1,x=m+2;r=Us(this,o,e,n,l,u,h,_,M,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Dm(i,e,t,n,r,s,o,a){let c;if(e.side===$t?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===Kn,a),c===null)return null;Ns.copy(a),Ns.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ns);return l<t.near||l>t.far?null:{distance:l,point:Ns.clone(),object:i}}function Us(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Is),i.getVertexPosition(c,Ps),i.getVertexPosition(l,Ls);const u=Dm(i,e,t,n,Is,Ps,Ls,Vl);if(u){const h=new L;fn.getBarycoord(Vl,Is,Ps,Ls,h),r&&(u.uv=fn.getInterpolatedAttribute(r,a,c,l,h,new Le)),s&&(u.uv1=fn.getInterpolatedAttribute(s,a,c,l,h,new Le)),o&&(u.normal=fn.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};fn.getNormal(Is,Ps,Ls,f.normal),u.face=f,u.barycoord=h}return u}class Kt extends Dt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new _t(l,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(h,2));function g(v,m,p,_,M,x,C,b,T,P,A){const S=x/T,D=C/P,H=x/2,I=C/2,F=b/2,Y=T+1,w=P+1;let j=0,k=0;const Z=new L;for(let Q=0;Q<w;Q++){const ae=Q*D-I;for(let xe=0;xe<Y;xe++){const ve=xe*S-H;Z[v]=ve*_,Z[m]=ae*M,Z[p]=F,l.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[p]=b>0?1:-1,u.push(Z.x,Z.y,Z.z),h.push(xe/T),h.push(1-Q/P),j+=1}}for(let Q=0;Q<P;Q++)for(let ae=0;ae<T;ae++){const xe=f+ae+Y*Q,ve=f+ae+Y*(Q+1),q=f+(ae+1)+Y*(Q+1),ne=f+(ae+1)+Y*Q;c.push(xe,ve,ne),c.push(ve,q,ne),k+=6}a.addGroup(d,k,A),d+=k,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ar(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Wt(i){const e={};for(let t=0;t<i.length;t++){const n=Ar(i[t]);for(const r in n)e[r]=n[r]}return e}function Nm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Um={clone:Ar,merge:Wt};var Om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends pn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Om,this.fragmentShader=zm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=Nm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qh extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new L,Hl=new Le,Gl=new Le;class Ht extends Qh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yr*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,Hl,Gl),t.subVectors(Gl,Hl)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ji=-90,Qi=1;class Fm extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(Ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new Ht(Ji,Qi,e,t);s.layers=this.layers,this.add(s);const o=new Ht(Ji,Qi,e,t);o.layers=this.layers,this.add(o);const a=new Ht(Ji,Qi,e,t);a.layers=this.layers,this.add(a);const c=new Ht(Ji,Qi,e,t);c.layers=this.layers,this.add(c);const l=new Ht(Ji,Qi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===jn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xo)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ef extends Rt{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:vr,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bm extends zi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ef(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:nn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Kt(5,5,5),s=new pi({name:"CubemapFromEquirect",uniforms:Ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:hi});s.uniforms.tEquirect.value=t;const o=new Te(r,s),a=t.minFilter;return t.minFilter===Xn&&(t.minFilter=nn),new Fm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const ea=new L,km=new L,Vm=new ke;class bi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ea.subVectors(n,t).cross(km.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ea),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Vm.getNormalMatrix(e),r=this.coplanarPoint(ea).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new Pn,Os=new L;class Nc{constructor(e=new bi,t=new bi,n=new bi,r=new bi,s=new bi,o=new bi){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],d=r[8],g=r[9],v=r[10],m=r[11],p=r[12],_=r[13],M=r[14],x=r[15];if(n[0].setComponents(c-s,f-l,m-d,x-p).normalize(),n[1].setComponents(c+s,f+l,m+d,x+p).normalize(),n[2].setComponents(c+o,f+u,m+g,x+_).normalize(),n[3].setComponents(c-o,f-u,m-g,x-_).normalize(),n[4].setComponents(c-a,f-h,m-v,x-M).normalize(),t===jn)n[5].setComponents(c+a,f+h,m+v,x+M).normalize();else if(t===xo)n[5].setComponents(a,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Os.x=r.normal.x>0?e.max.x:e.min.x,Os.y=r.normal.y>0?e.max.y:e.min.y,Os.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Os)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tf(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Hm(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],v=h[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const v=h[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Mn extends Dt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],v=[],m=[];for(let p=0;p<u;p++){const _=p*f-o;for(let M=0;M<l;M++){const x=M*h-s;g.push(x,-_,0),v.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<a;_++){const M=_+l*p,x=_+l*(p+1),C=_+1+l*(p+1),b=_+1+l*p;d.push(M,x,b),d.push(x,C,b)}this.setIndex(d),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ym=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Km=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$m=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Jm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,e0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,t0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,n0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,i0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,h0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,f0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,d0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,p0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,m0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,x0="gl_FragColor = linearToOutputTexel( gl_FragColor );",M0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,S0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,T0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,R0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,C0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,I0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,P0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,L0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,N0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,U0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,O0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,k0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,V0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,H0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,W0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,q0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,K0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,J0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ng=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ig=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,og=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ag=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ug=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,gg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_g=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ag=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,bg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ig=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ug=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Og=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$g=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,i_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,a_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,l_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,u_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,d_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,p_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,M_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,S_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Gm,alphahash_pars_fragment:Wm,alphamap_fragment:Xm,alphamap_pars_fragment:jm,alphatest_fragment:qm,alphatest_pars_fragment:Ym,aomap_fragment:Km,aomap_pars_fragment:Zm,batching_pars_vertex:$m,batching_vertex:Jm,begin_vertex:Qm,beginnormal_vertex:e0,bsdfs:t0,iridescence_fragment:n0,bumpmap_pars_fragment:i0,clipping_planes_fragment:r0,clipping_planes_pars_fragment:s0,clipping_planes_pars_vertex:o0,clipping_planes_vertex:a0,color_fragment:c0,color_pars_fragment:l0,color_pars_vertex:u0,color_vertex:h0,common:f0,cube_uv_reflection_fragment:d0,defaultnormal_vertex:p0,displacementmap_pars_vertex:m0,displacementmap_vertex:g0,emissivemap_fragment:_0,emissivemap_pars_fragment:v0,colorspace_fragment:x0,colorspace_pars_fragment:M0,envmap_fragment:S0,envmap_common_pars_fragment:y0,envmap_pars_fragment:A0,envmap_pars_vertex:E0,envmap_physical_pars_fragment:U0,envmap_vertex:b0,fog_vertex:T0,fog_pars_vertex:w0,fog_fragment:R0,fog_pars_fragment:C0,gradientmap_pars_fragment:I0,lightmap_pars_fragment:P0,lights_lambert_fragment:L0,lights_lambert_pars_fragment:D0,lights_pars_begin:N0,lights_toon_fragment:O0,lights_toon_pars_fragment:z0,lights_phong_fragment:F0,lights_phong_pars_fragment:B0,lights_physical_fragment:k0,lights_physical_pars_fragment:V0,lights_fragment_begin:H0,lights_fragment_maps:G0,lights_fragment_end:W0,logdepthbuf_fragment:X0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:q0,logdepthbuf_vertex:Y0,map_fragment:K0,map_pars_fragment:Z0,map_particle_fragment:$0,map_particle_pars_fragment:J0,metalnessmap_fragment:Q0,metalnessmap_pars_fragment:eg,morphinstance_vertex:tg,morphcolor_vertex:ng,morphnormal_vertex:ig,morphtarget_pars_vertex:rg,morphtarget_vertex:sg,normal_fragment_begin:og,normal_fragment_maps:ag,normal_pars_fragment:cg,normal_pars_vertex:lg,normal_vertex:ug,normalmap_pars_fragment:hg,clearcoat_normal_fragment_begin:fg,clearcoat_normal_fragment_maps:dg,clearcoat_pars_fragment:pg,iridescence_pars_fragment:mg,opaque_fragment:gg,packing:_g,premultiplied_alpha_fragment:vg,project_vertex:xg,dithering_fragment:Mg,dithering_pars_fragment:Sg,roughnessmap_fragment:yg,roughnessmap_pars_fragment:Ag,shadowmap_pars_fragment:Eg,shadowmap_pars_vertex:bg,shadowmap_vertex:Tg,shadowmask_pars_fragment:wg,skinbase_vertex:Rg,skinning_pars_vertex:Cg,skinning_vertex:Ig,skinnormal_vertex:Pg,specularmap_fragment:Lg,specularmap_pars_fragment:Dg,tonemapping_fragment:Ng,tonemapping_pars_fragment:Ug,transmission_fragment:Og,transmission_pars_fragment:zg,uv_pars_fragment:Fg,uv_pars_vertex:Bg,uv_vertex:kg,worldpos_vertex:Vg,background_vert:Hg,background_frag:Gg,backgroundCube_vert:Wg,backgroundCube_frag:Xg,cube_vert:jg,cube_frag:qg,depth_vert:Yg,depth_frag:Kg,distanceRGBA_vert:Zg,distanceRGBA_frag:$g,equirect_vert:Jg,equirect_frag:Qg,linedashed_vert:e_,linedashed_frag:t_,meshbasic_vert:n_,meshbasic_frag:i_,meshlambert_vert:r_,meshlambert_frag:s_,meshmatcap_vert:o_,meshmatcap_frag:a_,meshnormal_vert:c_,meshnormal_frag:l_,meshphong_vert:u_,meshphong_frag:h_,meshphysical_vert:f_,meshphysical_frag:d_,meshtoon_vert:p_,meshtoon_frag:m_,points_vert:g_,points_frag:__,shadow_vert:v_,shadow_frag:x_,sprite_vert:M_,sprite_frag:S_},re={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Rn={basic:{uniforms:Wt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Wt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new we(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Wt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Wt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Wt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new we(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Wt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Wt([re.points,re.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Wt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Wt([re.common,re.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Wt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Wt([re.sprite,re.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Wt([re.common,re.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Wt([re.lights,re.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Rn.physical={uniforms:Wt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const zs={r:0,b:0,g:0},Mi=new Tn,y_=new ze;function A_(i,e,t,n,r,s,o){const a=new we(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(_){let M=_.isScene===!0?_.background:null;return M&&M.isTexture&&(M=(_.backgroundBlurriness>0?t:e).get(M)),M}function v(_){let M=!1;const x=g(_);x===null?p(a,c):x&&x.isColor&&(p(x,1),M=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===Ao)?(u===void 0&&(u=new Te(new Kt(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Ar(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,b,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Mi.copy(M.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(y_.makeRotationFromEuler(Mi)),u.material.toneMapped=je.getTransfer(x.colorSpace)!==ot,(h!==x||f!==x.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,d=i.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Te(new Mn(2,2),new pi({name:"BackgroundMaterial",uniforms:Ar(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=je.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,M){_.getRGB(zs,Jh(i)),n.buffers.color.setClear(zs.r,zs.g,zs.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,p(a,c)},render:v,addToRenderList:m}}function E_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(S,D,H,I,F){let Y=!1;const w=h(I,H,D);s!==w&&(s=w,l(s.object)),Y=d(S,I,H,F),Y&&g(S,I,H,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(S,D,H,I),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,D,H){const I=H.wireframe===!0;let F=n[S.id];F===void 0&&(F={},n[S.id]=F);let Y=F[D.id];Y===void 0&&(Y={},F[D.id]=Y);let w=Y[I];return w===void 0&&(w=f(c()),Y[I]=w),w}function f(S){const D=[],H=[],I=[];for(let F=0;F<t;F++)D[F]=0,H[F]=0,I[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:I,object:S,attributes:{},index:null}}function d(S,D,H,I){const F=s.attributes,Y=D.attributes;let w=0;const j=H.getAttributes();for(const k in j)if(j[k].location>=0){const Q=F[k];let ae=Y[k];if(ae===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),Q===void 0||Q.attribute!==ae||ae&&Q.data!==ae.data)return!0;w++}return s.attributesNum!==w||s.index!==I}function g(S,D,H,I){const F={},Y=D.attributes;let w=0;const j=H.getAttributes();for(const k in j)if(j[k].location>=0){let Q=Y[k];Q===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor));const ae={};ae.attribute=Q,Q&&Q.data&&(ae.data=Q.data),F[k]=ae,w++}s.attributes=F,s.attributesNum=w,s.index=I}function v(){const S=s.newAttributes;for(let D=0,H=S.length;D<H;D++)S[D]=0}function m(S){p(S,0)}function p(S,D){const H=s.newAttributes,I=s.enabledAttributes,F=s.attributeDivisors;H[S]=1,I[S]===0&&(i.enableVertexAttribArray(S),I[S]=1),F[S]!==D&&(i.vertexAttribDivisor(S,D),F[S]=D)}function _(){const S=s.newAttributes,D=s.enabledAttributes;for(let H=0,I=D.length;H<I;H++)D[H]!==S[H]&&(i.disableVertexAttribArray(H),D[H]=0)}function M(S,D,H,I,F,Y,w){w===!0?i.vertexAttribIPointer(S,D,H,F,Y):i.vertexAttribPointer(S,D,H,I,F,Y)}function x(S,D,H,I){v();const F=I.attributes,Y=H.getAttributes(),w=D.defaultAttributeValues;for(const j in Y){const k=Y[j];if(k.location>=0){let Z=F[j];if(Z===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),Z!==void 0){const Q=Z.normalized,ae=Z.itemSize,xe=e.get(Z);if(xe===void 0)continue;const ve=xe.buffer,q=xe.type,ne=xe.bytesPerElement,Ae=q===i.INT||q===i.UNSIGNED_INT||Z.gpuType===Ec;if(Z.isInterleavedBufferAttribute){const ce=Z.data,De=ce.stride,Oe=Z.offset;if(ce.isInstancedInterleavedBuffer){for(let Ge=0;Ge<k.locationSize;Ge++)p(k.location+Ge,ce.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ge=0;Ge<k.locationSize;Ge++)m(k.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let Ge=0;Ge<k.locationSize;Ge++)M(k.location+Ge,ae/k.locationSize,q,Q,De*ne,(Oe+ae/k.locationSize*Ge)*ne,Ae)}else{if(Z.isInstancedBufferAttribute){for(let ce=0;ce<k.locationSize;ce++)p(k.location+ce,Z.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ce=0;ce<k.locationSize;ce++)m(k.location+ce);i.bindBuffer(i.ARRAY_BUFFER,ve);for(let ce=0;ce<k.locationSize;ce++)M(k.location+ce,ae/k.locationSize,q,Q,ae*ne,ae/k.locationSize*ce*ne,Ae)}}else if(w!==void 0){const Q=w[j];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(k.location,Q);break;case 3:i.vertexAttrib3fv(k.location,Q);break;case 4:i.vertexAttrib4fv(k.location,Q);break;default:i.vertexAttrib1fv(k.location,Q)}}}}_()}function C(){P();for(const S in n){const D=n[S];for(const H in D){const I=D[H];for(const F in I)u(I[F].object),delete I[F];delete D[H]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const H in D){const I=D[H];for(const F in I)u(I[F].object),delete I[F];delete D[H]}delete n[S.id]}function T(S){for(const D in n){const H=n[D];if(H[S.id]===void 0)continue;const I=H[S.id];for(const F in I)u(I[F].object),delete I[F];delete H[S.id]}}function P(){A(),o=!0,s!==r&&(s=r,l(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:A,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function b_(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*f[v];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function T_(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==dn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const P=T===fs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Zn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==An&&!P)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:C,maxSamples:b}}function w_(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new bi,a=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const _=s?0:n,M=_*4;let x=p.clippingState||null;c.value=x,x=u(g,f,M,d);for(let C=0;C!==M;++C)x[C]=t[C];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=d+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==v;++M,x+=4)o.copy(h[M]).applyMatrix4(_,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function R_(i){let e=new WeakMap;function t(o,a){return a===La?o.mapping=vr:a===Da&&(o.mapping=xr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===La||a===Da)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Bm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Uc extends Qh{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ur=4,Wl=[.125,.215,.35,.446,.526,.582],Ri=20,ta=new Uc,Xl=new we;let na=null,ia=0,ra=0,sa=!1;const Ti=(1+Math.sqrt(5))/2,er=1/Ti,jl=[new L(-Ti,er,0),new L(Ti,er,0),new L(-er,0,Ti),new L(er,0,Ti),new L(0,Ti,-er),new L(0,Ti,er),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class ql{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(na,ia,ra),this._renderer.xr.enabled=sa,e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vr||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:fs,format:dn,colorSpace:qt,depthBuffer:!1},r=Yl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=C_(s)),this._blurMaterial=I_(s,e,t)}return r}_compileMaterial(e){const t=new Te(this._lodPlanes[0],e);this._renderer.compile(t,ta)}_sceneToCubeUV(e,t,n,r){const a=new Ht(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Xl),u.toneMapping=fi,u.autoClear=!1;const d=new Mt({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1}),g=new Te(new Kt,d);let v=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,v=!0):(d.color.copy(Xl),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):_===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;Fs(r,_*M,p>2?M:0,M,M),u.setRenderTarget(r),v&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===vr||e.mapping===xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Te(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Fs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ta)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=jl[(r-s-1)%jl.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Te(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ri-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):Ri;m>Ri&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ri}`);const p=[];let _=0;for(let T=0;T<Ri;++T){const P=T/v,A=Math.exp(-P*P/2);p.push(A),T===0?_+=A:T<m&&(_+=2*A)}for(let T=0;T<p.length;T++)p[T]=p[T]/_;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const x=this._sizeLods[r],C=3*x*(r>M-ur?r-M+ur:0),b=4*(this._cubeSize-x);Fs(t,C,b,3*x,2*x),c.setRenderTarget(t),c.render(h,ta)}}function C_(i){const e=[],t=[],n=[];let r=i;const s=i-ur+1+Wl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-ur?c=Wl[o-i+ur-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let b=0;b<d;b++){const T=b%3*2/3-1,P=b>2?0:-1,A=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];_.set(A,v*g*b),M.set(f,m*g*b);const S=[b,b,b,b,b,b];x.set(S,p*g*b)}const C=new Dt;C.setAttribute("position",new jt(_,v)),C.setAttribute("uv",new jt(M,m)),C.setAttribute("faceIndex",new jt(x,p)),e.push(C),r>ur&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Yl(i,e,t){const n=new zi(i,e,t);return n.texture.mapping=Ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function I_(i,e,t){const n=new Float32Array(Ri),r=new L(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Kl(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Zl(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Oc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function P_(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===La||c===Da,u=c===vr||c===xr;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new ql(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new ql(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function L_(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Yr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function D_(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const v=d[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let v=0;if(d!==null){const _=d.array;v=d.version;for(let M=0,x=_.length;M<x;M+=3){const C=_[M+0],b=_[M+1],T=_[M+2];f.push(C,b,b,T,T,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let M=0,x=_.length/3-1;M<x;M+=3){const C=M+0,b=M+1,T=M+2;f.push(C,b,b,T,T,C)}}else return;const m=new(Xh(f)?$h:Zh)(f,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function N_(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,s,f*o),t.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,f*o,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,v,0,g);let p=0;for(let _=0;_<g;_++)p+=d[_]*v[_];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function U_(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function O_(i,e,t){const n=new WeakMap,r=new Qe;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let A=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let x=a.attributes.position.count*M,C=1;x>e.maxTextureSize&&(C=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const b=new Float32Array(x*C*4*h),T=new qh(b,x,C,h);T.type=An,T.needsUpdate=!0;const P=M*4;for(let S=0;S<h;S++){const D=m[S],H=p[S],I=_[S],F=x*C*4*S;for(let Y=0;Y<D.count;Y++){const w=Y*P;d===!0&&(r.fromBufferAttribute(D,Y),b[F+w+0]=r.x,b[F+w+1]=r.y,b[F+w+2]=r.z,b[F+w+3]=0),g===!0&&(r.fromBufferAttribute(H,Y),b[F+w+4]=r.x,b[F+w+5]=r.y,b[F+w+6]=r.z,b[F+w+7]=0),v===!0&&(r.fromBufferAttribute(I,Y),b[F+w+8]=r.x,b[F+w+9]=r.y,b[F+w+10]=r.z,b[F+w+11]=I.itemSize===4?r.w:1)}}f={count:h,texture:T,size:new Le(x,C)},n.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function z_(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class nf extends Rt{constructor(e,t,n,r,s,o,a,c,l,u=fr){if(u!==fr&&u!==Sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===fr&&(n=Oi),n===void 0&&u===Sr&&(n=Mr),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=c!==void 0?c:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rf=new Rt,$l=new nf(1,1),sf=new qh,of=new Am,af=new ef,Jl=[],Ql=[],eu=new Float32Array(16),tu=new Float32Array(9),nu=new Float32Array(4);function wr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Jl[r];if(s===void 0&&(s=new Float32Array(r),Jl[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function To(i,e){let t=Ql[e];t===void 0&&(t=new Int32Array(e),Ql[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function F_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function B_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function k_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function V_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function H_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;nu.set(n),i.uniformMatrix2fv(this.addr,!1,nu),It(t,n)}}function G_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;tu.set(n),i.uniformMatrix3fv(this.addr,!1,tu),It(t,n)}}function W_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Ct(t,n))return;eu.set(n),i.uniformMatrix4fv(this.addr,!1,eu),It(t,n)}}function X_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function j_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function q_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function Y_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function K_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Z_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function $_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function J_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function Q_(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?($l.compareFunction=Wh,s=$l):s=rf,t.setTexture2D(e||s,r)}function ev(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||of,r)}function tv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||af,r)}function nv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||sf,r)}function iv(i){switch(i){case 5126:return F_;case 35664:return B_;case 35665:return k_;case 35666:return V_;case 35674:return H_;case 35675:return G_;case 35676:return W_;case 5124:case 35670:return X_;case 35667:case 35671:return j_;case 35668:case 35672:return q_;case 35669:case 35673:return Y_;case 5125:return K_;case 36294:return Z_;case 36295:return $_;case 36296:return J_;case 35678:case 36198:case 36298:case 36306:case 35682:return Q_;case 35679:case 36299:case 36307:return ev;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return nv}}function rv(i,e){i.uniform1fv(this.addr,e)}function sv(i,e){const t=wr(e,this.size,2);i.uniform2fv(this.addr,t)}function ov(i,e){const t=wr(e,this.size,3);i.uniform3fv(this.addr,t)}function av(i,e){const t=wr(e,this.size,4);i.uniform4fv(this.addr,t)}function cv(i,e){const t=wr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function lv(i,e){const t=wr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function uv(i,e){const t=wr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function hv(i,e){i.uniform1iv(this.addr,e)}function fv(i,e){i.uniform2iv(this.addr,e)}function dv(i,e){i.uniform3iv(this.addr,e)}function pv(i,e){i.uniform4iv(this.addr,e)}function mv(i,e){i.uniform1uiv(this.addr,e)}function gv(i,e){i.uniform2uiv(this.addr,e)}function _v(i,e){i.uniform3uiv(this.addr,e)}function vv(i,e){i.uniform4uiv(this.addr,e)}function xv(i,e,t){const n=this.cache,r=e.length,s=To(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||rf,s[o])}function Mv(i,e,t){const n=this.cache,r=e.length,s=To(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||of,s[o])}function Sv(i,e,t){const n=this.cache,r=e.length,s=To(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||af,s[o])}function yv(i,e,t){const n=this.cache,r=e.length,s=To(t,r);Ct(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||sf,s[o])}function Av(i){switch(i){case 5126:return rv;case 35664:return sv;case 35665:return ov;case 35666:return av;case 35674:return cv;case 35675:return lv;case 35676:return uv;case 5124:case 35670:return hv;case 35667:case 35671:return fv;case 35668:case 35672:return dv;case 35669:case 35673:return pv;case 5125:return mv;case 36294:return gv;case 36295:return _v;case 36296:return vv;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return Mv;case 35680:case 36300:case 36308:case 36293:return Sv;case 36289:case 36303:case 36311:case 36292:return yv}}class Ev{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=iv(t.type)}}class bv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Av(t.type)}}class Tv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const oa=/(\w+)(\])?(\[|\.)?/g;function iu(i,e){i.seq.push(e),i.map[e.id]=e}function wv(i,e,t){const n=i.name,r=n.length;for(oa.lastIndex=0;;){const s=oa.exec(n),o=oa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){iu(t,l===void 0?new Ev(a,i,e):new bv(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Tv(a),iu(t,h)),t=h}}}class ro{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);wv(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function ru(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Rv=37297;let Cv=0;function Iv(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const su=new ke;function Pv(i){je._getMatrix(su,je.workingColorSpace,i);const e=`mat3( ${su.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Eo:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ou(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Iv(i.getShaderSource(e),o)}else return r}function Lv(i,e){const t=Pv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Dv(i,e){let t;switch(e){case Pp:t="Linear";break;case Lp:t="Reinhard";break;case Dp:t="Cineon";break;case Np:t="ACESFilmic";break;case Op:t="AgX";break;case zp:t="Neutral";break;case Up:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Bs=new L;function Nv(){je.getLuminanceCoefficients(Bs);const i=Bs.x.toFixed(4),e=Bs.y.toFixed(4),t=Bs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kr).join(`
`)}function Ov(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Kr(i){return i!==""}function au(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fv=/^[ \t]*#include +<([\w\d./]+)>/gm;function lc(i){return i.replace(Fv,kv)}const Bv=new Map;function kv(i,e){let t=He[e];if(t===void 0){const n=Bv.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return lc(t)}const Vv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lu(i){return i.replace(Vv,Hv)}function Hv(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function uu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Gv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ih?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===up?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function Wv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vr:case xr:e="ENVMAP_TYPE_CUBE";break;case Ao:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xr:e="ENVMAP_MODE_REFRACTION";break}return e}function jv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ac:e="ENVMAP_BLENDING_MULTIPLY";break;case Cp:e="ENVMAP_BLENDING_MIX";break;case Ip:e="ENVMAP_BLENDING_ADD";break}return e}function qv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Yv(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Gv(t),l=Wv(t),u=Xv(t),h=jv(t),f=qv(t),d=Uv(t),g=Ov(s),v=r.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),p.length>0&&(p+=`
`)):(m=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kr).join(`
`),p=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?He.tonemapping_pars_fragment:"",t.toneMapping!==fi?Dv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Lv("linearToOutputTexel",t.outputColorSpace),Nv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kr).join(`
`)),o=lc(o),o=au(o,t),o=cu(o,t),a=lc(a),a=au(a,t),a=cu(a,t),o=lu(o),a=lu(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=_+m+o,x=_+p+a,C=ru(r,r.VERTEX_SHADER,M),b=ru(r,r.FRAGMENT_SHADER,x);r.attachShader(v,C),r.attachShader(v,b),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function T(D){if(i.debug.checkShaderErrors){const H=r.getProgramInfoLog(v).trim(),I=r.getShaderInfoLog(C).trim(),F=r.getShaderInfoLog(b).trim();let Y=!0,w=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,C,b);else{const j=ou(r,C,"vertex"),k=ou(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+j+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(I===""||F==="")&&(w=!1);w&&(D.diagnostics={runnable:Y,programLog:H,vertexShader:{log:I,prefix:m},fragmentShader:{log:F,prefix:p}})}r.deleteShader(C),r.deleteShader(b),P=new ro(r,v),A=zv(r,v)}let P;this.getUniforms=function(){return P===void 0&&T(this),P};let A;this.getAttributes=function(){return A===void 0&&T(this),A};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(v,Rv)),S},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=b,this}let Kv=0;class Zv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $v(e),t.set(e,n)),n}}class $v{constructor(e){this.id=Kv++,this.code=e,this.usedTimes=0}}function Jv(i,e,t,n,r,s,o){const a=new Yh,c=new Zv,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(A){return l.add(A),A===0?"uv":`uv${A}`}function m(A,S,D,H,I){const F=H.fog,Y=I.geometry,w=A.isMeshStandardMaterial?H.environment:null,j=(A.isMeshStandardMaterial?t:e).get(A.envMap||w),k=j&&j.mapping===Ao?j.image.height:null,Z=g[A.type];A.precision!==null&&(d=r.getMaxPrecision(A.precision),d!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",d,"instead."));const Q=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ae=Q!==void 0?Q.length:0;let xe=0;Y.morphAttributes.position!==void 0&&(xe=1),Y.morphAttributes.normal!==void 0&&(xe=2),Y.morphAttributes.color!==void 0&&(xe=3);let ve,q,ne,Ae;if(Z){const it=Rn[Z];ve=it.vertexShader,q=it.fragmentShader}else ve=A.vertexShader,q=A.fragmentShader,c.update(A),ne=c.getVertexShaderID(A),Ae=c.getFragmentShaderID(A);const ce=i.getRenderTarget(),De=i.state.buffers.depth.getReversed(),Oe=I.isInstancedMesh===!0,Ge=I.isBatchedMesh===!0,vt=!!A.map,Ze=!!A.matcap,yt=!!j,B=!!A.aoMap,rn=!!A.lightMap,qe=!!A.bumpMap,Ye=!!A.normalMap,Ie=!!A.displacementMap,dt=!!A.emissiveMap,Re=!!A.metalnessMap,R=!!A.roughnessMap,y=A.anisotropy>0,V=A.clearcoat>0,$=A.dispersion>0,ee=A.iridescence>0,K=A.sheen>0,Ee=A.transmission>0,le=y&&!!A.anisotropyMap,pe=V&&!!A.clearcoatMap,$e=V&&!!A.clearcoatNormalMap,te=V&&!!A.clearcoatRoughnessMap,ge=ee&&!!A.iridescenceMap,Pe=ee&&!!A.iridescenceThicknessMap,Ne=K&&!!A.sheenColorMap,_e=K&&!!A.sheenRoughnessMap,Ke=!!A.specularMap,Ve=!!A.specularColorMap,ct=!!A.specularIntensityMap,U=Ee&&!!A.transmissionMap,oe=Ee&&!!A.thicknessMap,X=!!A.gradientMap,J=!!A.alphaMap,de=A.alphaTest>0,he=!!A.alphaHash,Fe=!!A.extensions;let xt=fi;A.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(xt=i.toneMapping);const Nt={shaderID:Z,shaderType:A.type,shaderName:A.name,vertexShader:ve,fragmentShader:q,defines:A.defines,customVertexShaderID:ne,customFragmentShaderID:Ae,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:d,batching:Ge,batchingColor:Ge&&I._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&I.instanceColor!==null,instancingMorph:Oe&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:qt,alphaToCoverage:!!A.alphaToCoverage,map:vt,matcap:Ze,envMap:yt,envMapMode:yt&&j.mapping,envMapCubeUVHeight:k,aoMap:B,lightMap:rn,bumpMap:qe,normalMap:Ye,displacementMap:f&&Ie,emissiveMap:dt,normalMapObjectSpace:Ye&&A.normalMapType===Xp,normalMapTangentSpace:Ye&&A.normalMapType===Lc,metalnessMap:Re,roughnessMap:R,anisotropy:y,anisotropyMap:le,clearcoat:V,clearcoatMap:pe,clearcoatNormalMap:$e,clearcoatRoughnessMap:te,dispersion:$,iridescence:ee,iridescenceMap:ge,iridescenceThicknessMap:Pe,sheen:K,sheenColorMap:Ne,sheenRoughnessMap:_e,specularMap:Ke,specularColorMap:Ve,specularIntensityMap:ct,transmission:Ee,transmissionMap:U,thicknessMap:oe,gradientMap:X,opaque:A.transparent===!1&&A.blending===Pi&&A.alphaToCoverage===!1,alphaMap:J,alphaTest:de,alphaHash:he,combine:A.combine,mapUv:vt&&v(A.map.channel),aoMapUv:B&&v(A.aoMap.channel),lightMapUv:rn&&v(A.lightMap.channel),bumpMapUv:qe&&v(A.bumpMap.channel),normalMapUv:Ye&&v(A.normalMap.channel),displacementMapUv:Ie&&v(A.displacementMap.channel),emissiveMapUv:dt&&v(A.emissiveMap.channel),metalnessMapUv:Re&&v(A.metalnessMap.channel),roughnessMapUv:R&&v(A.roughnessMap.channel),anisotropyMapUv:le&&v(A.anisotropyMap.channel),clearcoatMapUv:pe&&v(A.clearcoatMap.channel),clearcoatNormalMapUv:$e&&v(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(A.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&v(A.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&v(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&v(A.sheenColorMap.channel),sheenRoughnessMapUv:_e&&v(A.sheenRoughnessMap.channel),specularMapUv:Ke&&v(A.specularMap.channel),specularColorMapUv:Ve&&v(A.specularColorMap.channel),specularIntensityMapUv:ct&&v(A.specularIntensityMap.channel),transmissionMapUv:U&&v(A.transmissionMap.channel),thicknessMapUv:oe&&v(A.thicknessMap.channel),alphaMapUv:J&&v(A.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Ye||y),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!Y.attributes.uv&&(vt||J),fog:!!F,useFog:A.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:De,skinning:I.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:xe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:xt,decodeVideoTexture:vt&&A.map.isVideoTexture===!0&&je.getTransfer(A.map.colorSpace)===ot,decodeVideoTextureEmissive:dt&&A.emissiveMap.isVideoTexture===!0&&je.getTransfer(A.emissiveMap.colorSpace)===ot,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Sn,flipSided:A.side===$t,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Fe&&A.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&A.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Nt.vertexUv1s=l.has(1),Nt.vertexUv2s=l.has(2),Nt.vertexUv3s=l.has(3),l.clear(),Nt}function p(A){const S=[];if(A.shaderID?S.push(A.shaderID):(S.push(A.customVertexShaderID),S.push(A.customFragmentShaderID)),A.defines!==void 0)for(const D in A.defines)S.push(D),S.push(A.defines[D]);return A.isRawShaderMaterial===!1&&(_(S,A),M(S,A),S.push(i.outputColorSpace)),S.push(A.customProgramCacheKey),S.join()}function _(A,S){A.push(S.precision),A.push(S.outputColorSpace),A.push(S.envMapMode),A.push(S.envMapCubeUVHeight),A.push(S.mapUv),A.push(S.alphaMapUv),A.push(S.lightMapUv),A.push(S.aoMapUv),A.push(S.bumpMapUv),A.push(S.normalMapUv),A.push(S.displacementMapUv),A.push(S.emissiveMapUv),A.push(S.metalnessMapUv),A.push(S.roughnessMapUv),A.push(S.anisotropyMapUv),A.push(S.clearcoatMapUv),A.push(S.clearcoatNormalMapUv),A.push(S.clearcoatRoughnessMapUv),A.push(S.iridescenceMapUv),A.push(S.iridescenceThicknessMapUv),A.push(S.sheenColorMapUv),A.push(S.sheenRoughnessMapUv),A.push(S.specularMapUv),A.push(S.specularColorMapUv),A.push(S.specularIntensityMapUv),A.push(S.transmissionMapUv),A.push(S.thicknessMapUv),A.push(S.combine),A.push(S.fogExp2),A.push(S.sizeAttenuation),A.push(S.morphTargetsCount),A.push(S.morphAttributeCount),A.push(S.numDirLights),A.push(S.numPointLights),A.push(S.numSpotLights),A.push(S.numSpotLightMaps),A.push(S.numHemiLights),A.push(S.numRectAreaLights),A.push(S.numDirLightShadows),A.push(S.numPointLightShadows),A.push(S.numSpotLightShadows),A.push(S.numSpotLightShadowsWithMaps),A.push(S.numLightProbes),A.push(S.shadowMapType),A.push(S.toneMapping),A.push(S.numClippingPlanes),A.push(S.numClipIntersection),A.push(S.depthPacking)}function M(A,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),A.push(a.mask)}function x(A){const S=g[A.type];let D;if(S){const H=Rn[S];D=Um.clone(H.uniforms)}else D=A.uniforms;return D}function C(A,S){let D;for(let H=0,I=u.length;H<I;H++){const F=u[H];if(F.cacheKey===S){D=F,++D.usedTimes;break}}return D===void 0&&(D=new Yv(i,S,A,s),u.push(D)),D}function b(A){if(--A.usedTimes===0){const S=u.indexOf(A);u[S]=u[u.length-1],u.pop(),A.destroy()}}function T(A){c.remove(A)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:b,releaseShaderCache:T,programs:u,dispose:P}}function Qv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function ex(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function hu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fu(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,d,g,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function a(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function c(h,f,d,g,v,m){const p=o(h,f,d,g,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||ex),n.length>1&&n.sort(f||hu),r.length>1&&r.sort(f||hu)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function tx(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new fu,i.set(n,[o])):r>=s.length?(o=new fu,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function nx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new we};break;case"SpotLight":t={position:new L,direction:new L,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function ix(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let rx=0;function sx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ox(i){const e=new nx,t=ix(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const r=new L,s=new ze,o=new ze;function a(l){let u=0,h=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,_=0,M=0,x=0,C=0,b=0,T=0;l.sort(sx);for(let A=0,S=l.length;A<S;A++){const D=l[A],H=D.color,I=D.intensity,F=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=H.r*I,h+=H.g*I,f+=H.b*I;else if(D.isLightProbe){for(let w=0;w<9;w++)n.probe[w].addScaledVector(D.sh.coefficients[w],I);T++}else if(D.isDirectionalLight){const w=e.get(D);if(w.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const j=D.shadow,k=t.get(D);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=D.shadow.matrix,_++}n.directional[d]=w,d++}else if(D.isSpotLight){const w=e.get(D);w.position.setFromMatrixPosition(D.matrixWorld),w.color.copy(H).multiplyScalar(I),w.distance=F,w.coneCos=Math.cos(D.angle),w.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),w.decay=D.decay,n.spot[v]=w;const j=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,j.updateMatrices(D),D.castShadow&&b++),n.spotLightMatrix[v]=j.matrix,D.castShadow){const k=t.get(D);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=Y,x++}v++}else if(D.isRectAreaLight){const w=e.get(D);w.color.copy(H).multiplyScalar(I),w.halfWidth.set(D.width*.5,0,0),w.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=w,m++}else if(D.isPointLight){const w=e.get(D);if(w.color.copy(D.color).multiplyScalar(D.intensity),w.distance=D.distance,w.decay=D.decay,D.castShadow){const j=D.shadow,k=t.get(D);k.shadowIntensity=j.intensity,k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,k.shadowCameraNear=j.camera.near,k.shadowCameraFar=j.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=w,g++}else if(D.isHemisphereLight){const w=e.get(D);w.skyColor.copy(D.color).multiplyScalar(I),w.groundColor.copy(D.groundColor).multiplyScalar(I),n.hemi[p]=w,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==d||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==_||P.numPointShadows!==M||P.numSpotShadows!==x||P.numSpotMaps!==C||P.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+C-b,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=T,P.directionalLength=d,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=_,P.numPointShadows=M,P.numSpotShadows=x,P.numSpotMaps=C,P.numLightProbes=T,n.version=rx++)}function c(l,u){let h=0,f=0,d=0,g=0,v=0;const m=u.matrixWorldInverse;for(let p=0,_=l.length;p<_;p++){const M=l[p];if(M.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(M.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function du(i){const e=new ox(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function ax(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new du(i),e.set(r,[a])):s>=o.length?(a=new du(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class cx extends pn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Gp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lx extends pn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function fx(i,e,t){let n=new Nc;const r=new Le,s=new Le,o=new Qe,a=new cx({depthPacking:Wp}),c=new lx,l={},u=t.maxTextureSize,h={[Kn]:$t,[$t]:Kn,[Sn]:Sn},f=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:ux,fragmentShader:hx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Dt;g.setAttribute("position",new jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Te(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ih;let p=this.type;this.render=function(b,T,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const A=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),H=i.state;H.setBlending(hi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const I=p!==Hn&&this.type===Hn,F=p===Hn&&this.type!==Hn;for(let Y=0,w=b.length;Y<w;Y++){const j=b[Y],k=j.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const Z=k.getFrameExtents();if(r.multiply(Z),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,k.mapSize.y=s.y)),k.map===null||I===!0||F===!0){const ae=this.type!==Hn?{minFilter:St,magFilter:St}:{};k.map!==null&&k.map.dispose(),k.map=new zi(r.x,r.y,ae),k.map.texture.name=j.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const Q=k.getViewportCount();for(let ae=0;ae<Q;ae++){const xe=k.getViewport(ae);o.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),H.viewport(o),k.updateMatrices(j,ae),n=k.getFrustum(),x(T,P,k.camera,j,this.type)}k.isPointLightShadow!==!0&&this.type===Hn&&_(k,P),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(A,S,D)};function _(b,T){const P=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new zi(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(T,null,P,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(T,null,P,d,v,null)}function M(b,T,P,A){let S=null;const D=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)S=D;else if(S=P.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const H=S.uuid,I=T.uuid;let F=l[H];F===void 0&&(F={},l[H]=F);let Y=F[I];Y===void 0&&(Y=S.clone(),F[I]=Y,T.addEventListener("dispose",C)),S=Y}if(S.visible=T.visible,S.wireframe=T.wireframe,A===Hn?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:h[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const H=i.properties.get(S);H.light=P}return S}function x(b,T,P,A,S){if(b.visible===!1)return;if(b.layers.test(T.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Hn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const I=e.update(b),F=b.material;if(Array.isArray(F)){const Y=I.groups;for(let w=0,j=Y.length;w<j;w++){const k=Y[w],Z=F[k.materialIndex];if(Z&&Z.visible){const Q=M(b,Z,A,S);b.onBeforeShadow(i,b,T,P,I,Q,k),i.renderBufferDirect(P,null,I,Q,b,k),b.onAfterShadow(i,b,T,P,I,Q,k)}}}else if(F.visible){const Y=M(b,F,A,S);b.onBeforeShadow(i,b,T,P,I,Y,null),i.renderBufferDirect(P,null,I,Y,b,null),b.onAfterShadow(i,b,T,P,I,Y,null)}}const H=b.children;for(let I=0,F=H.length;I<F;I++)x(H[I],T,P,A,S)}function C(b){b.target.removeEventListener("dispose",C);for(const P in l){const A=l[P],S=b.target.uuid;S in A&&(A[S].dispose(),delete A[S])}}}const dx={[ba]:Ta,[wa]:Ia,[Ra]:Pa,[_r]:Ca,[Ta]:ba,[Ia]:wa,[Pa]:Ra,[Ca]:_r};function px(i,e){function t(){let U=!1;const oe=new Qe;let X=null;const J=new Qe(0,0,0,0);return{setMask:function(de){X!==de&&!U&&(i.colorMask(de,de,de,de),X=de)},setLocked:function(de){U=de},setClear:function(de,he,Fe,xt,Nt){Nt===!0&&(de*=xt,he*=xt,Fe*=xt),oe.set(de,he,Fe,xt),J.equals(oe)===!1&&(i.clearColor(de,he,Fe,xt),J.copy(oe))},reset:function(){U=!1,X=null,J.set(-1,0,0,0)}}}function n(){let U=!1,oe=!1,X=null,J=null,de=null;return{setReversed:function(he){if(oe!==he){const Fe=e.get("EXT_clip_control");oe?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);const xt=de;de=null,this.setClear(xt)}oe=he},getReversed:function(){return oe},setTest:function(he){he?ce(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(he){X!==he&&!U&&(i.depthMask(he),X=he)},setFunc:function(he){if(oe&&(he=dx[he]),J!==he){switch(he){case ba:i.depthFunc(i.NEVER);break;case Ta:i.depthFunc(i.ALWAYS);break;case wa:i.depthFunc(i.LESS);break;case _r:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=he}},setLocked:function(he){U=he},setClear:function(he){de!==he&&(oe&&(he=1-he),i.clearDepth(he),de=he)},reset:function(){U=!1,X=null,J=null,de=null,oe=!1}}}function r(){let U=!1,oe=null,X=null,J=null,de=null,he=null,Fe=null,xt=null,Nt=null;return{setTest:function(it){U||(it?ce(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(it){oe!==it&&!U&&(i.stencilMask(it),oe=it)},setFunc:function(it,mn,Nn){(X!==it||J!==mn||de!==Nn)&&(i.stencilFunc(it,mn,Nn),X=it,J=mn,de=Nn)},setOp:function(it,mn,Nn){(he!==it||Fe!==mn||xt!==Nn)&&(i.stencilOp(it,mn,Nn),he=it,Fe=mn,xt=Nn)},setLocked:function(it){U=it},setClear:function(it){Nt!==it&&(i.clearStencil(it),Nt=it)},reset:function(){U=!1,oe=null,X=null,J=null,de=null,he=null,Fe=null,xt=null,Nt=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,_=null,M=null,x=null,C=null,b=null,T=new we(0,0,0),P=0,A=!1,S=null,D=null,H=null,I=null,F=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let w=!1,j=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(k)[1]),w=j>=1):k.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),w=j>=2);let Z=null,Q={};const ae=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),ve=new Qe().fromArray(ae),q=new Qe().fromArray(xe);function ne(U,oe,X,J){const de=new Uint8Array(4),he=i.createTexture();i.bindTexture(U,he),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<X;Fe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(oe+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return he}const Ae={};Ae[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Ae[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ae[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(i.DEPTH_TEST),o.setFunc(_r),qe(!1),Ye(_l),ce(i.CULL_FACE),B(hi);function ce(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function De(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Oe(U,oe){return h[U]!==oe?(i.bindFramebuffer(U,oe),h[U]=oe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ge(U,oe){let X=d,J=!1;if(U){X=f.get(oe),X===void 0&&(X=[],f.set(oe,X));const de=U.textures;if(X.length!==de.length||X[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Fe=de.length;he<Fe;he++)X[he]=i.COLOR_ATTACHMENT0+he;X.length=de.length,J=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,J=!0);J&&i.drawBuffers(X)}function vt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const Ze={[wi]:i.FUNC_ADD,[fp]:i.FUNC_SUBTRACT,[dp]:i.FUNC_REVERSE_SUBTRACT};Ze[pp]=i.MIN,Ze[mp]=i.MAX;const yt={[gp]:i.ZERO,[_p]:i.ONE,[vp]:i.SRC_COLOR,[Aa]:i.SRC_ALPHA,[Ep]:i.SRC_ALPHA_SATURATE,[yp]:i.DST_COLOR,[Mp]:i.DST_ALPHA,[xp]:i.ONE_MINUS_SRC_COLOR,[Ea]:i.ONE_MINUS_SRC_ALPHA,[Ap]:i.ONE_MINUS_DST_COLOR,[Sp]:i.ONE_MINUS_DST_ALPHA,[bp]:i.CONSTANT_COLOR,[Tp]:i.ONE_MINUS_CONSTANT_COLOR,[wp]:i.CONSTANT_ALPHA,[Rp]:i.ONE_MINUS_CONSTANT_ALPHA};function B(U,oe,X,J,de,he,Fe,xt,Nt,it){if(U===hi){v===!0&&(De(i.BLEND),v=!1);return}if(v===!1&&(ce(i.BLEND),v=!0),U!==hp){if(U!==m||it!==A){if((p!==wi||x!==wi)&&(i.blendEquation(i.FUNC_ADD),p=wi,x=wi),it)switch(U){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rs:i.blendFunc(i.ONE,i.ONE);break;case vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rs:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,M=null,C=null,b=null,T.set(0,0,0),P=0,m=U,A=it}return}de=de||oe,he=he||X,Fe=Fe||J,(oe!==p||de!==x)&&(i.blendEquationSeparate(Ze[oe],Ze[de]),p=oe,x=de),(X!==_||J!==M||he!==C||Fe!==b)&&(i.blendFuncSeparate(yt[X],yt[J],yt[he],yt[Fe]),_=X,M=J,C=he,b=Fe),(xt.equals(T)===!1||Nt!==P)&&(i.blendColor(xt.r,xt.g,xt.b,Nt),T.copy(xt),P=Nt),m=U,A=!1}function rn(U,oe){U.side===Sn?De(i.CULL_FACE):ce(i.CULL_FACE);let X=U.side===$t;oe&&(X=!X),qe(X),U.blending===Pi&&U.transparent===!1?B(hi):B(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(U){S!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),S=U)}function Ye(U){U!==cp?(ce(i.CULL_FACE),U!==D&&(U===_l?i.cullFace(i.BACK):U===lp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),D=U}function Ie(U){U!==H&&(w&&i.lineWidth(U),H=U)}function dt(U,oe,X){U?(ce(i.POLYGON_OFFSET_FILL),(I!==oe||F!==X)&&(i.polygonOffset(oe,X),I=oe,F=X)):De(i.POLYGON_OFFSET_FILL)}function Re(U){U?ce(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function R(U){U===void 0&&(U=i.TEXTURE0+Y-1),Z!==U&&(i.activeTexture(U),Z=U)}function y(U,oe,X){X===void 0&&(Z===null?X=i.TEXTURE0+Y-1:X=Z);let J=Q[X];J===void 0&&(J={type:void 0,texture:void 0},Q[X]=J),(J.type!==U||J.texture!==oe)&&(Z!==X&&(i.activeTexture(X),Z=X),i.bindTexture(U,oe||Ae[U]),J.type=U,J.texture=oe)}function V(){const U=Q[Z];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $e(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(U){ve.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ve.copy(U))}function _e(U){q.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),q.copy(U))}function Ke(U,oe){let X=l.get(oe);X===void 0&&(X=new WeakMap,l.set(oe,X));let J=X.get(U);J===void 0&&(J=i.getUniformBlockIndex(oe,U.name),X.set(U,J))}function Ve(U,oe){const J=l.get(oe).get(U);c.get(oe)!==J&&(i.uniformBlockBinding(oe,J,U.__bindingPointIndex),c.set(oe,J))}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Z=null,Q={},h={},f=new WeakMap,d=[],g=null,v=!1,m=null,p=null,_=null,M=null,x=null,C=null,b=null,T=new we(0,0,0),P=0,A=!1,S=null,D=null,H=null,I=null,F=null,ve.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:De,bindFramebuffer:Oe,drawBuffers:Ge,useProgram:vt,setBlending:B,setMaterial:rn,setFlipSided:qe,setCullFace:Ye,setLineWidth:Ie,setPolygonOffset:dt,setScissorTest:Re,activeTexture:R,bindTexture:y,unbindTexture:V,compressedTexImage2D:$,compressedTexImage3D:ee,texImage2D:ge,texImage3D:Pe,updateUBOMapping:Ke,uniformBlockBinding:Ve,texStorage2D:$e,texStorage3D:te,texSubImage2D:K,texSubImage3D:Ee,compressedTexSubImage2D:le,compressedTexSubImage3D:pe,scissor:Ne,viewport:_e,reset:ct}}function pu(i,e,t,n){const r=mx(n);switch(t){case Oh:return i*e;case Fh:return i*e;case Bh:return i*e*2;case wc:return i*e/r.components*r.byteLength;case Rc:return i*e/r.components*r.byteLength;case kh:return i*e*2/r.components*r.byteLength;case Cc:return i*e*2/r.components*r.byteLength;case zh:return i*e*3/r.components*r.byteLength;case dn:return i*e*4/r.components*r.byteLength;case Ic:return i*e*4/r.components*r.byteLength;case Qs:case eo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case to:case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ua:case za:return Math.max(i,16)*Math.max(e,8)/4;case Na:case Oa:return Math.max(i,8)*Math.max(e,8)/2;case Fa:case Ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Qa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ec:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case io:case tc:case nc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vh:case ic:return Math.ceil(i/4)*Math.ceil(e/4)*8;case rc:case sc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mx(i){switch(i){case Zn:case Dh:return{byteLength:1,components:1};case ss:case Nh:case fs:return{byteLength:2,components:1};case bc:case Tc:return{byteLength:2,components:4};case Oi:case Ec:case An:return{byteLength:4,components:1};case Uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function gx(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Le,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,y){return d?new OffscreenCanvas(R,y):cs("canvas")}function v(R,y,V){let $=1;const ee=Re(R);if((ee.width>V||ee.height>V)&&($=V/Math.max(ee.width,ee.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor($*ee.width),Ee=Math.floor($*ee.height);h===void 0&&(h=g(K,Ee));const le=y?g(K,Ee):h;return le.width=K,le.height=Ee,le.getContext("2d").drawImage(R,0,0,K,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+K+"x"+Ee+")."),le}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,y,V,$,ee=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=y;if(y===i.RED&&(V===i.FLOAT&&(K=i.R32F),V===i.HALF_FLOAT&&(K=i.R16F),V===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.R8UI),V===i.UNSIGNED_SHORT&&(K=i.R16UI),V===i.UNSIGNED_INT&&(K=i.R32UI),V===i.BYTE&&(K=i.R8I),V===i.SHORT&&(K=i.R16I),V===i.INT&&(K=i.R32I)),y===i.RG&&(V===i.FLOAT&&(K=i.RG32F),V===i.HALF_FLOAT&&(K=i.RG16F),V===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RG8UI),V===i.UNSIGNED_SHORT&&(K=i.RG16UI),V===i.UNSIGNED_INT&&(K=i.RG32UI),V===i.BYTE&&(K=i.RG8I),V===i.SHORT&&(K=i.RG16I),V===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGB8UI),V===i.UNSIGNED_SHORT&&(K=i.RGB16UI),V===i.UNSIGNED_INT&&(K=i.RGB32UI),V===i.BYTE&&(K=i.RGB8I),V===i.SHORT&&(K=i.RGB16I),V===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),V===i.UNSIGNED_INT&&(K=i.RGBA32UI),V===i.BYTE&&(K=i.RGBA8I),V===i.SHORT&&(K=i.RGBA16I),V===i.INT&&(K=i.RGBA32I)),y===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),y===i.RGBA){const Ee=ee?Eo:je.getTransfer($);V===i.FLOAT&&(K=i.RGBA32F),V===i.HALF_FLOAT&&(K=i.RGBA16F),V===i.UNSIGNED_BYTE&&(K=Ee===ot?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(R,y){let V;return R?y===null||y===Oi||y===Mr?V=i.DEPTH24_STENCIL8:y===An?V=i.DEPTH32F_STENCIL8:y===ss&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Oi||y===Mr?V=i.DEPTH_COMPONENT24:y===An?V=i.DEPTH_COMPONENT32F:y===ss&&(V=i.DEPTH_COMPONENT16),V}function C(R,y){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==St&&R.minFilter!==nn?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function b(R){const y=R.target;y.removeEventListener("dispose",b),P(y),y.isVideoTexture&&u.delete(y)}function T(R){const y=R.target;y.removeEventListener("dispose",T),S(y)}function P(R){const y=n.get(R);if(y.__webglInit===void 0)return;const V=R.source,$=f.get(V);if($){const ee=$[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&A(R),Object.keys($).length===0&&f.delete(V)}n.remove(R)}function A(R){const y=n.get(R);i.deleteTexture(y.__webglTexture);const V=R.source,$=f.get(V);delete $[y.__cacheKey],o.memory.textures--}function S(R){const y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let ee=0;ee<y.__webglFramebuffer[$].length;ee++)i.deleteFramebuffer(y.__webglFramebuffer[$][ee]);else i.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)i.deleteFramebuffer(y.__webglFramebuffer[$]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=R.textures;for(let $=0,ee=V.length;$<ee;$++){const K=n.get(V[$]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(V[$])}n.remove(R)}let D=0;function H(){D=0}function I(){const R=D;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),D+=1,R}function F(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function Y(R,y){const V=n.get(R);if(R.isVideoTexture&&Ie(R),R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){const $=R.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,R,y);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+y)}function w(R,y){const V=n.get(R);if(R.version>0&&V.__version!==R.version){q(V,R,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+y)}function j(R,y){const V=n.get(R);if(R.version>0&&V.__version!==R.version){q(V,R,y);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+y)}function k(R,y){const V=n.get(R);if(R.version>0&&V.__version!==R.version){ne(V,R,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+y)}const Z={[Ui]:i.REPEAT,[li]:i.CLAMP_TO_EDGE,[_o]:i.MIRRORED_REPEAT},Q={[St]:i.NEAREST,[Lh]:i.NEAREST_MIPMAP_NEAREST,[qr]:i.NEAREST_MIPMAP_LINEAR,[nn]:i.LINEAR,[Js]:i.LINEAR_MIPMAP_NEAREST,[Xn]:i.LINEAR_MIPMAP_LINEAR},ae={[jp]:i.NEVER,[Jp]:i.ALWAYS,[qp]:i.LESS,[Wh]:i.LEQUAL,[Yp]:i.EQUAL,[$p]:i.GEQUAL,[Kp]:i.GREATER,[Zp]:i.NOTEQUAL};function xe(R,y){if(y.type===An&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===nn||y.magFilter===Js||y.magFilter===qr||y.magFilter===Xn||y.minFilter===nn||y.minFilter===Js||y.minFilter===qr||y.minFilter===Xn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Z[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Z[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Z[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Q[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Q[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ae[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===St||y.minFilter!==qr&&y.minFilter!==Xn||y.type===An&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ve(R,y){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",b));const $=y.source;let ee=f.get($);ee===void 0&&(ee={},f.set($,ee));const K=F(y);if(K!==R.__cacheKey){ee[K]===void 0&&(ee[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ee[K].usedTimes++;const Ee=ee[R.__cacheKey];Ee!==void 0&&(ee[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&A(y)),R.__cacheKey=K,R.__webglTexture=ee[K].texture}return V}function q(R,y,V){let $=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=i.TEXTURE_3D);const ee=ve(R,y),K=y.source;t.bindTexture($,R.__webglTexture,i.TEXTURE0+V);const Ee=n.get(K);if(K.version!==Ee.__version||ee===!0){t.activeTexture(i.TEXTURE0+V);const le=je.getPrimaries(je.workingColorSpace),pe=y.colorSpace===ai?null:je.getPrimaries(y.colorSpace),$e=y.colorSpace===ai||le===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let te=v(y.image,!1,r.maxTextureSize);te=dt(y,te);const ge=s.convert(y.format,y.colorSpace),Pe=s.convert(y.type);let Ne=M(y.internalFormat,ge,Pe,y.colorSpace,y.isVideoTexture);xe($,y);let _e;const Ke=y.mipmaps,Ve=y.isVideoTexture!==!0,ct=Ee.__version===void 0||ee===!0,U=K.dataReady,oe=C(y,te);if(y.isDepthTexture)Ne=x(y.format===Sr,y.type),ct&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Ne,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Ne,te.width,te.height,0,ge,Pe,null));else if(y.isDataTexture)if(Ke.length>0){Ve&&ct&&t.texStorage2D(i.TEXTURE_2D,oe,Ne,Ke[0].width,Ke[0].height);for(let X=0,J=Ke.length;X<J;X++)_e=Ke[X],Ve?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,X,Ne,_e.width,_e.height,0,ge,Pe,_e.data);y.generateMipmaps=!1}else Ve?(ct&&t.texStorage2D(i.TEXTURE_2D,oe,Ne,te.width,te.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te.width,te.height,ge,Pe,te.data)):t.texImage2D(i.TEXTURE_2D,0,Ne,te.width,te.height,0,ge,Pe,te.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ve&&ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Ne,Ke[0].width,Ke[0].height,te.depth);for(let X=0,J=Ke.length;X<J;X++)if(_e=Ke[X],y.format!==dn)if(ge!==null)if(Ve){if(U)if(y.layerUpdates.size>0){const de=pu(_e.width,_e.height,y.format,y.type);for(const he of y.layerUpdates){const Fe=_e.data.subarray(he*de/_e.data.BYTES_PER_ELEMENT,(he+1)*de/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,he,_e.width,_e.height,1,ge,Fe)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,_e.width,_e.height,te.depth,ge,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Ne,_e.width,_e.height,te.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,_e.width,_e.height,te.depth,ge,Pe,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,Ne,_e.width,_e.height,te.depth,0,ge,Pe,_e.data)}else{Ve&&ct&&t.texStorage2D(i.TEXTURE_2D,oe,Ne,Ke[0].width,Ke[0].height);for(let X=0,J=Ke.length;X<J;X++)_e=Ke[X],y.format!==dn?ge!==null?Ve?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,X,Ne,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,Pe,_e.data):t.texImage2D(i.TEXTURE_2D,X,Ne,_e.width,_e.height,0,ge,Pe,_e.data)}else if(y.isDataArrayTexture)if(Ve){if(ct&&t.texStorage3D(i.TEXTURE_2D_ARRAY,oe,Ne,te.width,te.height,te.depth),U)if(y.layerUpdates.size>0){const X=pu(te.width,te.height,y.format,y.type);for(const J of y.layerUpdates){const de=te.data.subarray(J*X/te.data.BYTES_PER_ELEMENT,(J+1)*X/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,te.width,te.height,1,ge,Pe,de)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,Pe,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,te.width,te.height,te.depth,0,ge,Pe,te.data);else if(y.isData3DTexture)Ve?(ct&&t.texStorage3D(i.TEXTURE_3D,oe,Ne,te.width,te.height,te.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,Pe,te.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,te.width,te.height,te.depth,0,ge,Pe,te.data);else if(y.isFramebufferTexture){if(ct)if(Ve)t.texStorage2D(i.TEXTURE_2D,oe,Ne,te.width,te.height);else{let X=te.width,J=te.height;for(let de=0;de<oe;de++)t.texImage2D(i.TEXTURE_2D,de,Ne,X,J,0,ge,Pe,null),X>>=1,J>>=1}}else if(Ke.length>0){if(Ve&&ct){const X=Re(Ke[0]);t.texStorage2D(i.TEXTURE_2D,oe,Ne,X.width,X.height)}for(let X=0,J=Ke.length;X<J;X++)_e=Ke[X],Ve?U&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,ge,Pe,_e):t.texImage2D(i.TEXTURE_2D,X,Ne,ge,Pe,_e);y.generateMipmaps=!1}else if(Ve){if(ct){const X=Re(te);t.texStorage2D(i.TEXTURE_2D,oe,Ne,X.width,X.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Pe,te)}else t.texImage2D(i.TEXTURE_2D,0,Ne,ge,Pe,te);m(y)&&p($),Ee.__version=K.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function ne(R,y,V){if(y.image.length!==6)return;const $=ve(R,y),ee=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const K=n.get(ee);if(ee.version!==K.__version||$===!0){t.activeTexture(i.TEXTURE0+V);const Ee=je.getPrimaries(je.workingColorSpace),le=y.colorSpace===ai?null:je.getPrimaries(y.colorSpace),pe=y.colorSpace===ai||Ee===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const $e=y.isCompressedTexture||y.image[0].isCompressedTexture,te=y.image[0]&&y.image[0].isDataTexture,ge=[];for(let J=0;J<6;J++)!$e&&!te?ge[J]=v(y.image[J],!0,r.maxCubemapSize):ge[J]=te?y.image[J].image:y.image[J],ge[J]=dt(y,ge[J]);const Pe=ge[0],Ne=s.convert(y.format,y.colorSpace),_e=s.convert(y.type),Ke=M(y.internalFormat,Ne,_e,y.colorSpace),Ve=y.isVideoTexture!==!0,ct=K.__version===void 0||$===!0,U=ee.dataReady;let oe=C(y,Pe);xe(i.TEXTURE_CUBE_MAP,y);let X;if($e){Ve&&ct&&t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ke,Pe.width,Pe.height);for(let J=0;J<6;J++){X=ge[J].mipmaps;for(let de=0;de<X.length;de++){const he=X[de];y.format!==dn?Ne!==null?Ve?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de,0,0,he.width,he.height,Ne,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de,Ke,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de,0,0,he.width,he.height,Ne,_e,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de,Ke,he.width,he.height,0,Ne,_e,he.data)}}}else{if(X=y.mipmaps,Ve&&ct){X.length>0&&oe++;const J=Re(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,oe,Ke,J.width,J.height)}for(let J=0;J<6;J++)if(te){Ve?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ge[J].width,ge[J].height,Ne,_e,ge[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ke,ge[J].width,ge[J].height,0,Ne,_e,ge[J].data);for(let de=0;de<X.length;de++){const Fe=X[de].image[J].image;Ve?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de+1,0,0,Fe.width,Fe.height,Ne,_e,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de+1,Ke,Fe.width,Fe.height,0,Ne,_e,Fe.data)}}else{Ve?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ne,_e,ge[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ke,Ne,_e,ge[J]);for(let de=0;de<X.length;de++){const he=X[de];Ve?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de+1,0,0,Ne,_e,he.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,de+1,Ke,Ne,_e,he.image[J])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),K.__version=ee.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Ae(R,y,V,$,ee,K){const Ee=s.convert(V.format,V.colorSpace),le=s.convert(V.type),pe=M(V.internalFormat,Ee,le,V.colorSpace),$e=n.get(y),te=n.get(V);if(te.__renderTarget=y,!$e.__hasExternalTextures){const ge=Math.max(1,y.width>>K),Pe=Math.max(1,y.height>>K);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,K,pe,ge,Pe,y.depth,0,Ee,le,null):t.texImage2D(ee,K,pe,ge,Pe,0,Ee,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ye(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,ee,te.__webglTexture,0,qe(y)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,ee,te.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(R,y,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){const $=y.depthTexture,ee=$&&$.isDepthTexture?$.type:null,K=x(y.stencilBuffer,ee),Ee=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=qe(y);Ye(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,K,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,R)}else{const $=y.textures;for(let ee=0;ee<$.length;ee++){const K=$[ee],Ee=s.convert(K.format,K.colorSpace),le=s.convert(K.type),pe=M(K.internalFormat,Ee,le,K.colorSpace),$e=qe(y);V&&Ye(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,pe,y.width,y.height):Ye(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e,pe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,pe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(R,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(y.depthTexture);$.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Y(y.depthTexture,0);const ee=$.__webglTexture,K=qe(y);if(y.depthTexture.format===fr)Ye(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(y.depthTexture.format===Sr)Ye(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Oe(R){const y=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const ee=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",ee)};$.addEventListener("dispose",ee),y.__depthDisposeCallback=ee}y.__boundDepthTexture=$}if(R.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");De(y.__webglFramebuffer,R)}else if(V){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=i.createRenderbuffer(),ce(y.__webglDepthbuffer[$],R,!1);else{const ee=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,K)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ce(y.__webglDepthbuffer,R,!1);else{const $=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(R,y,V){const $=n.get(R);y!==void 0&&Ae($.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Oe(R)}function vt(R){const y=R.texture,V=n.get(R),$=n.get(y);R.addEventListener("dispose",T);const ee=R.textures,K=R.isWebGLCubeRenderTarget===!0,Ee=ee.length>1;if(Ee||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=y.version,o.memory.textures++),K){V.__webglFramebuffer=[];for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[le]=[];for(let pe=0;pe<y.mipmaps.length;pe++)V.__webglFramebuffer[le][pe]=i.createFramebuffer()}else V.__webglFramebuffer[le]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)V.__webglFramebuffer[le]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let le=0,pe=ee.length;le<pe;le++){const $e=n.get(ee[le]);$e.__webglTexture===void 0&&($e.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Ye(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let le=0;le<ee.length;le++){const pe=ee[le];V.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[le]);const $e=s.convert(pe.format,pe.colorSpace),te=s.convert(pe.type),ge=M(pe.internalFormat,$e,te,pe.colorSpace,R.isXRRenderTarget===!0),Pe=qe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,ge,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,V.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),xe(i.TEXTURE_CUBE_MAP,y);for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)Ae(V.__webglFramebuffer[le][pe],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,pe);else Ae(V.__webglFramebuffer[le],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(y)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let le=0,pe=ee.length;le<pe;le++){const $e=ee[le],te=n.get($e);t.bindTexture(i.TEXTURE_2D,te.__webglTexture),xe(i.TEXTURE_2D,$e),Ae(V.__webglFramebuffer,R,$e,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,0),m($e)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,$.__webglTexture),xe(le,y),y.mipmaps&&y.mipmaps.length>0)for(let pe=0;pe<y.mipmaps.length;pe++)Ae(V.__webglFramebuffer[pe],R,y,i.COLOR_ATTACHMENT0,le,pe);else Ae(V.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,le,0);m(y)&&p(le),t.unbindTexture()}R.depthBuffer&&Oe(R)}function Ze(R){const y=R.textures;for(let V=0,$=y.length;V<$;V++){const ee=y[V];if(m(ee)){const K=_(R),Ee=n.get(ee).__webglTexture;t.bindTexture(K,Ee),p(K),t.unbindTexture()}}}const yt=[],B=[];function rn(R){if(R.samples>0){if(Ye(R)===!1){const y=R.textures,V=R.width,$=R.height;let ee=i.COLOR_BUFFER_BIT;const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(R),le=y.length>1;if(le)for(let pe=0;pe<y.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let pe=0;pe<y.length;pe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[pe]);const $e=n.get(y[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$e,0)}i.blitFramebuffer(0,0,V,$,0,0,V,$,ee,i.NEAREST),c===!0&&(yt.length=0,B.length=0,yt.push(i.COLOR_ATTACHMENT0+pe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(yt.push(K),B.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,yt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let pe=0;pe<y.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[pe]);const $e=n.get(y[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,$e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function qe(R){return Math.min(r.maxSamples,R.samples)}function Ye(R){const y=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ie(R){const y=o.render.frame;u.get(R)!==y&&(u.set(R,y),R.update())}function dt(R,y){const V=R.colorSpace,$=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==qt&&V!==ai&&(je.getTransfer(V)===ot?($!==dn||ee!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}function Re(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=H,this.setTexture2D=Y,this.setTexture2DArray=w,this.setTexture3D=j,this.setTextureCube=k,this.rebindTextures=Ge,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=rn,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ye}function _x(i,e){function t(n,r=ai){let s;const o=je.getTransfer(r);if(n===Zn)return i.UNSIGNED_BYTE;if(n===bc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dh)return i.BYTE;if(n===Nh)return i.SHORT;if(n===ss)return i.UNSIGNED_SHORT;if(n===Ec)return i.INT;if(n===Oi)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===fs)return i.HALF_FLOAT;if(n===Oh)return i.ALPHA;if(n===zh)return i.RGB;if(n===dn)return i.RGBA;if(n===Fh)return i.LUMINANCE;if(n===Bh)return i.LUMINANCE_ALPHA;if(n===fr)return i.DEPTH_COMPONENT;if(n===Sr)return i.DEPTH_STENCIL;if(n===wc)return i.RED;if(n===Rc)return i.RED_INTEGER;if(n===kh)return i.RG;if(n===Cc)return i.RG_INTEGER;if(n===Ic)return i.RGBA_INTEGER;if(n===Qs||n===eo||n===to||n===no)if(o===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Qs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===eo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===to)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===no)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Qs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===eo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===to)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===no)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Na||n===Ua||n===Oa||n===za)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Na)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ua)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Fa||n===Ba||n===ka)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Fa||n===Ba)return o===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ka)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===ja||n===qa||n===Ya||n===Ka||n===Za||n===$a||n===Ja||n===Qa||n===ec)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Va)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ha)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ga)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Xa)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qa)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ya)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ka)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Za)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$a)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ja)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Qa)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ec)return o===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===io||n===tc||n===nc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===io)return o===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vh||n===ic||n===rc||n===sc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===io)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ic)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===rc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class vx extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bt extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xx={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xx)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Rt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new pi({vertexShader:Mx,fragmentShader:Sx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Te(new Mn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ax extends Fi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const v=new yx,m=t.getContextAttributes();let p=null,_=null;const M=[],x=[],C=new Le;let b=null;const T=new Ht;T.viewport=new Qe;const P=new Ht;P.viewport=new Qe;const A=[T,P],S=new vx;let D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ne=M[q];return ne===void 0&&(ne=new aa,M[q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(q){let ne=M[q];return ne===void 0&&(ne=new aa,M[q]=ne),ne.getGripSpace()},this.getHand=function(q){let ne=M[q];return ne===void 0&&(ne=new aa,M[q]=ne),ne.getHandSpace()};function I(q){const ne=x.indexOf(q.inputSource);if(ne===-1)return;const Ae=M[ne];Ae!==void 0&&(Ae.update(q.inputSource,q.frame,l||o),Ae.dispatchEvent({type:q.type,data:q.inputSource}))}function F(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",Y);for(let q=0;q<M.length;q++){const ne=x[q];ne!==null&&(x[q]=null,M[q].disconnect(ne))}D=null,H=null,v.reset(),e.setRenderTarget(p),d=null,f=null,h=null,r=null,_=null,ve.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",F),r.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new zi(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,Ae=null,ce=null;m.depth&&(ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?Sr:fr,Ae=m.stencil?Mr:Oi);const De={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(De),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new zi(f.textureWidth,f.textureHeight,{format:dn,type:Zn,depthTexture:new nf(f.textureWidth,f.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),ve.setContext(r),ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(q){for(let ne=0;ne<q.removed.length;ne++){const Ae=q.removed[ne],ce=x.indexOf(Ae);ce>=0&&(x[ce]=null,M[ce].disconnect(Ae))}for(let ne=0;ne<q.added.length;ne++){const Ae=q.added[ne];let ce=x.indexOf(Ae);if(ce===-1){for(let Oe=0;Oe<M.length;Oe++)if(Oe>=x.length){x.push(Ae),ce=Oe;break}else if(x[Oe]===null){x[Oe]=Ae,ce=Oe;break}if(ce===-1)break}const De=M[ce];De&&De.connect(Ae)}}const w=new L,j=new L;function k(q,ne,Ae){w.setFromMatrixPosition(ne.matrixWorld),j.setFromMatrixPosition(Ae.matrixWorld);const ce=w.distanceTo(j),De=ne.projectionMatrix.elements,Oe=Ae.projectionMatrix.elements,Ge=De[14]/(De[10]-1),vt=De[14]/(De[10]+1),Ze=(De[9]+1)/De[5],yt=(De[9]-1)/De[5],B=(De[8]-1)/De[0],rn=(Oe[8]+1)/Oe[0],qe=Ge*B,Ye=Ge*rn,Ie=ce/(-B+rn),dt=Ie*-B;if(ne.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(dt),q.translateZ(Ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),De[10]===-1)q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Re=Ge+Ie,R=vt+Ie,y=qe-dt,V=Ye+(ce-dt),$=Ze*vt/R*Re,ee=yt*vt/R*Re;q.projectionMatrix.makePerspective(y,V,$,ee,Re,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Z(q,ne){ne===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ne.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ne=q.near,Ae=q.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(Ae=v.depthFar)),S.near=P.near=T.near=ne,S.far=P.far=T.far=Ae,(D!==S.near||H!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,H=S.far),T.layers.mask=q.layers.mask|2,P.layers.mask=q.layers.mask|4,S.layers.mask=T.layers.mask|P.layers.mask;const ce=q.parent,De=S.cameras;Z(S,ce);for(let Oe=0;Oe<De.length;Oe++)Z(De[Oe],ce);De.length===2?k(S,T,P):S.projectionMatrix.copy(T.projectionMatrix),Q(q,S,ce)};function Q(q,ne,Ae){Ae===null?q.matrix.copy(ne.matrixWorld):(q.matrix.copy(Ae.matrixWorld),q.matrix.invert(),q.matrix.multiply(ne.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=yr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ae=null;function xe(q,ne){if(u=ne.getViewerPose(l||o),g=ne,u!==null){const Ae=u.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let ce=!1;Ae.length!==S.cameras.length&&(S.cameras.length=0,ce=!0);for(let Oe=0;Oe<Ae.length;Oe++){const Ge=Ae[Oe];let vt=null;if(d!==null)vt=d.getViewport(Ge);else{const yt=h.getViewSubImage(f,Ge);vt=yt.viewport,Oe===0&&(e.setRenderTargetTextures(_,yt.colorTexture,f.ignoreDepthValues?void 0:yt.depthStencilTexture),e.setRenderTarget(_))}let Ze=A[Oe];Ze===void 0&&(Ze=new Ht,Ze.layers.enable(Oe),Ze.viewport=new Qe,A[Oe]=Ze),Ze.matrix.fromArray(Ge.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(Ge.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(vt.x,vt.y,vt.width,vt.height),Oe===0&&(S.matrix.copy(Ze.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ce===!0&&S.cameras.push(Ze)}const De=r.enabledFeatures;if(De&&De.includes("depth-sensing")){const Oe=h.getDepthInformation(Ae[0]);Oe&&Oe.isValid&&Oe.texture&&v.init(e,Oe,r.renderState)}}for(let Ae=0;Ae<M.length;Ae++){const ce=x[Ae],De=M[Ae];ce!==null&&De!==void 0&&De.update(ce,ne,l||o)}ae&&ae(q,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const ve=new tf;ve.setAnimationLoop(xe),this.setAnimationLoop=function(q){ae=q},this.dispose=function(){}}}const Si=new Tn,Ex=new ze;function bx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,_,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,_,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),M=_.envMap,x=_.envMapRotation;M&&(m.envMap.value=M,Si.copy(x),Si.x*=-1,Si.y*=-1,Si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),m.envMapRotation.value.setFromMatrix4(Ex.makeRotationFromEuler(Si)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Tx(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,M){const x=M.program;n.uniformBlockBinding(_,x)}function l(_,M){let x=r[_.id];x===void 0&&(g(_),x=u(_),r[_.id]=x,_.addEventListener("dispose",m));const C=M.program;n.updateUBOMapping(_,C);const b=e.render.frame;s[_.id]!==b&&(f(_),s[_.id]=b)}function u(_){const M=h();_.__bindingPointIndex=M;const x=i.createBuffer(),C=_.__size,b=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const M=r[_.id],x=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let b=0,T=x.length;b<T;b++){const P=Array.isArray(x[b])?x[b]:[x[b]];for(let A=0,S=P.length;A<S;A++){const D=P[A];if(d(D,b,A,C)===!0){const H=D.__offset,I=Array.isArray(D.value)?D.value:[D.value];let F=0;for(let Y=0;Y<I.length;Y++){const w=I[Y],j=v(w);typeof w=="number"||typeof w=="boolean"?(D.__data[0]=w,i.bufferSubData(i.UNIFORM_BUFFER,H+F,D.__data)):w.isMatrix3?(D.__data[0]=w.elements[0],D.__data[1]=w.elements[1],D.__data[2]=w.elements[2],D.__data[3]=0,D.__data[4]=w.elements[3],D.__data[5]=w.elements[4],D.__data[6]=w.elements[5],D.__data[7]=0,D.__data[8]=w.elements[6],D.__data[9]=w.elements[7],D.__data[10]=w.elements[8],D.__data[11]=0):(w.toArray(D.__data,F),F+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(_,M,x,C){const b=_.value,T=M+"_"+x;if(C[T]===void 0)return typeof b=="number"||typeof b=="boolean"?C[T]=b:C[T]=b.clone(),!0;{const P=C[T];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return C[T]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function g(_){const M=_.uniforms;let x=0;const C=16;for(let T=0,P=M.length;T<P;T++){const A=Array.isArray(M[T])?M[T]:[M[T]];for(let S=0,D=A.length;S<D;S++){const H=A[S],I=Array.isArray(H.value)?H.value:[H.value];for(let F=0,Y=I.length;F<Y;F++){const w=I[F],j=v(w),k=x%C,Z=k%j.boundary,Q=k+Z;x+=Z,Q!==0&&C-Q<j.storage&&(x+=C-Q),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=x,x+=j.storage}}}const b=x%C;return b>0&&(x+=C-b),_.__size=x,_.__cache={},this}function v(_){const M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),M}function m(_){const M=_.target;M.removeEventListener("dispose",m);const x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const _ in r)i.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class wx{constructor(e={}){const{canvas:t=mm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const _=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wt,this.toneMapping=fi,this.toneMappingExposure=1;const x=this;let C=!1,b=0,T=0,P=null,A=-1,S=null;const D=new Qe,H=new Qe;let I=null;const F=new we(0);let Y=0,w=t.width,j=t.height,k=1,Z=null,Q=null;const ae=new Qe(0,0,w,j),xe=new Qe(0,0,w,j);let ve=!1;const q=new Nc;let ne=!1,Ae=!1;const ce=new ze,De=new ze,Oe=new L,Ge=new Qe,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function yt(){return P===null?k:1}let B=n;function rn(E,O){return t.getContext(E,O)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yc}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",he,!1),B===null){const O="webgl2";if(B=rn(O,E),B===null)throw rn(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let qe,Ye,Ie,dt,Re,R,y,V,$,ee,K,Ee,le,pe,$e,te,ge,Pe,Ne,_e,Ke,Ve,ct,U;function oe(){qe=new L_(B),qe.init(),Ve=new _x(B,qe),Ye=new T_(B,qe,e,Ve),Ie=new px(B,qe),Ye.reverseDepthBuffer&&f&&Ie.buffers.depth.setReversed(!0),dt=new U_(B),Re=new Qv,R=new gx(B,qe,Ie,Re,Ye,Ve,dt),y=new R_(x),V=new P_(x),$=new Hm(B),ct=new E_(B,$),ee=new D_(B,$,dt,ct),K=new z_(B,ee,$,dt),Ne=new O_(B,Ye,R),te=new w_(Re),Ee=new Jv(x,y,V,qe,Ye,ct,te),le=new bx(x,Re),pe=new tx,$e=new ax(qe),Pe=new A_(x,y,V,Ie,K,d,c),ge=new fx(x,K,Ye),U=new Tx(B,dt,Ye,Ie),_e=new b_(B,qe,dt),Ke=new N_(B,qe,dt),dt.programs=Ee.programs,x.capabilities=Ye,x.extensions=qe,x.properties=Re,x.renderLists=pe,x.shadowMap=ge,x.state=Ie,x.info=dt}oe();const X=new Ax(x,B);this.xr=X,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=qe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=qe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(w,j,!1))},this.getSize=function(E){return E.set(w,j)},this.setSize=function(E,O,G=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=E,j=O,t.width=Math.floor(E*k),t.height=Math.floor(O*k),G===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(w*k,j*k).floor()},this.setDrawingBufferSize=function(E,O,G){w=E,j=O,k=G,t.width=Math.floor(E*G),t.height=Math.floor(O*G),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(ae)},this.setViewport=function(E,O,G,W){E.isVector4?ae.set(E.x,E.y,E.z,E.w):ae.set(E,O,G,W),Ie.viewport(D.copy(ae).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(xe)},this.setScissor=function(E,O,G,W){E.isVector4?xe.set(E.x,E.y,E.z,E.w):xe.set(E,O,G,W),Ie.scissor(H.copy(xe).multiplyScalar(k).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(E){Ie.setScissorTest(ve=E)},this.setOpaqueSort=function(E){Z=E},this.setTransparentSort=function(E){Q=E},this.getClearColor=function(E){return E.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(E=!0,O=!0,G=!0){let W=0;if(E){let z=!1;if(P!==null){const ie=P.texture.format;z=ie===Ic||ie===Cc||ie===Rc}if(z){const ie=P.texture.type,fe=ie===Zn||ie===Oi||ie===ss||ie===Mr||ie===bc||ie===Tc,Me=Pe.getClearColor(),Se=Pe.getClearAlpha(),Ue=Me.r,Be=Me.g,ye=Me.b;fe?(g[0]=Ue,g[1]=Be,g[2]=ye,g[3]=Se,B.clearBufferuiv(B.COLOR,0,g)):(v[0]=Ue,v[1]=Be,v[2]=ye,v[3]=Se,B.clearBufferiv(B.COLOR,0,v))}else W|=B.COLOR_BUFFER_BIT}O&&(W|=B.DEPTH_BUFFER_BIT),G&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",he,!1),pe.dispose(),$e.dispose(),Re.dispose(),y.dispose(),V.dispose(),K.dispose(),ct.dispose(),U.dispose(),Ee.dispose(),X.dispose(),X.removeEventListener("sessionstart",Jc),X.removeEventListener("sessionend",Qc),mi.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=dt.autoReset,O=ge.enabled,G=ge.autoUpdate,W=ge.needsUpdate,z=ge.type;oe(),dt.autoReset=E,ge.enabled=O,ge.autoUpdate=G,ge.needsUpdate=W,ge.type=z}function he(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Fe(E){const O=E.target;O.removeEventListener("dispose",Fe),xt(O)}function xt(E){Nt(E),Re.remove(E)}function Nt(E){const O=Re.get(E).programs;O!==void 0&&(O.forEach(function(G){Ee.releaseProgram(G)}),E.isShaderMaterial&&Ee.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,G,W,z,ie){O===null&&(O=vt);const fe=z.isMesh&&z.matrixWorld.determinant()<0,Me=Uf(E,O,G,W,z);Ie.setMaterial(W,fe);let Se=G.index,Ue=1;if(W.wireframe===!0){if(Se=ee.getWireframeAttribute(G),Se===void 0)return;Ue=2}const Be=G.drawRange,ye=G.attributes.position;let Je=Be.start*Ue,lt=(Be.start+Be.count)*Ue;ie!==null&&(Je=Math.max(Je,ie.start*Ue),lt=Math.min(lt,(ie.start+ie.count)*Ue)),Se!==null?(Je=Math.max(Je,0),lt=Math.min(lt,Se.count)):ye!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,ye.count));const pt=lt-Je;if(pt<0||pt===1/0)return;ct.setup(z,W,Me,G,Se);let Yt,et=_e;if(Se!==null&&(Yt=$.get(Se),et=Ke,et.setIndex(Yt)),z.isMesh)W.wireframe===!0?(Ie.setLineWidth(W.wireframeLinewidth*yt()),et.setMode(B.LINES)):et.setMode(B.TRIANGLES);else if(z.isLine){let be=W.linewidth;be===void 0&&(be=1),Ie.setLineWidth(be*yt()),z.isLineSegments?et.setMode(B.LINES):z.isLineLoop?et.setMode(B.LINE_LOOP):et.setMode(B.LINE_STRIP)}else z.isPoints?et.setMode(B.POINTS):z.isSprite&&et.setMode(B.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)et.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))et.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const be=z._multiDrawStarts,Un=z._multiDrawCounts,tt=z._multiDrawCount,gn=Se?$.get(Se).bytesPerElement:1,Bi=Re.get(W).currentProgram.getUniforms();for(let Jt=0;Jt<tt;Jt++)Bi.setValue(B,"_gl_DrawID",Jt),et.render(be[Jt]/gn,Un[Jt])}else if(z.isInstancedMesh)et.renderInstances(Je,pt,z.count);else if(G.isInstancedBufferGeometry){const be=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Un=Math.min(G.instanceCount,be);et.renderInstances(Je,pt,Un)}else et.render(Je,pt)};function it(E,O,G){E.transparent===!0&&E.side===Sn&&E.forceSinglePass===!1?(E.side=$t,E.needsUpdate=!0,_s(E,O,G),E.side=Kn,E.needsUpdate=!0,_s(E,O,G),E.side=Sn):_s(E,O,G)}this.compile=function(E,O,G=null){G===null&&(G=E),p=$e.get(G),p.init(O),M.push(p),G.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),E!==G&&E.traverseVisible(function(z){z.isLight&&z.layers.test(O.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const W=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ie=z.material;if(ie)if(Array.isArray(ie))for(let fe=0;fe<ie.length;fe++){const Me=ie[fe];it(Me,G,z),W.add(Me)}else it(ie,G,z),W.add(ie)}),M.pop(),p=null,W},this.compileAsync=function(E,O,G=null){const W=this.compile(E,O,G);return new Promise(z=>{function ie(){if(W.forEach(function(fe){Re.get(fe).currentProgram.isReady()&&W.delete(fe)}),W.size===0){z(E);return}setTimeout(ie,10)}qe.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let mn=null;function Nn(E){mn&&mn(E)}function Jc(){mi.stop()}function Qc(){mi.start()}const mi=new tf;mi.setAnimationLoop(Nn),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(E){mn=E,X.setAnimationLoop(E),E===null?mi.stop():mi.start()},X.addEventListener("sessionstart",Jc),X.addEventListener("sessionend",Qc),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(O),O=X.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,O,P),p=$e.get(E,M.length),p.init(O),M.push(p),De.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),q.setFromProjectionMatrix(De),Ae=this.localClippingEnabled,ne=te.init(this.clippingPlanes,Ae),m=pe.get(E,_.length),m.init(),_.push(m),X.enabled===!0&&X.isPresenting===!0){const ie=x.xr.getDepthSensingMesh();ie!==null&&Po(ie,O,-1/0,x.sortObjects)}Po(E,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Z,Q),Ze=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Ze&&Pe.addToRenderList(m,E),this.info.render.frame++,ne===!0&&te.beginShadows();const G=p.state.shadowsArray;ge.render(G,E,O),ne===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,z=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ie=O.cameras;if(z.length>0)for(let fe=0,Me=ie.length;fe<Me;fe++){const Se=ie[fe];tl(W,z,E,Se)}Ze&&Pe.render(E);for(let fe=0,Me=ie.length;fe<Me;fe++){const Se=ie[fe];el(m,E,Se,Se.viewport)}}else z.length>0&&tl(W,z,E,O),Ze&&Pe.render(E),el(m,E,O);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(x,E,O),ct.resetDefaultState(),A=-1,S=null,M.pop(),M.length>0?(p=M[M.length-1],ne===!0&&te.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function Po(E,O,G,W){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){W&&Ge.setFromMatrixPosition(E.matrixWorld).applyMatrix4(De);const fe=K.update(E),Me=E.material;Me.visible&&m.push(E,fe,Me,G,Ge.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const fe=K.update(E),Me=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ge.copy(E.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ge.copy(fe.boundingSphere.center)),Ge.applyMatrix4(E.matrixWorld).applyMatrix4(De)),Array.isArray(Me)){const Se=fe.groups;for(let Ue=0,Be=Se.length;Ue<Be;Ue++){const ye=Se[Ue],Je=Me[ye.materialIndex];Je&&Je.visible&&m.push(E,fe,Je,G,Ge.z,ye)}}else Me.visible&&m.push(E,fe,Me,G,Ge.z,null)}}const ie=E.children;for(let fe=0,Me=ie.length;fe<Me;fe++)Po(ie[fe],O,G,W)}function el(E,O,G,W){const z=E.opaque,ie=E.transmissive,fe=E.transparent;p.setupLightsView(G),ne===!0&&te.setGlobalState(x.clippingPlanes,G),W&&Ie.viewport(D.copy(W)),z.length>0&&gs(z,O,G),ie.length>0&&gs(ie,O,G),fe.length>0&&gs(fe,O,G),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function tl(E,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new zi(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?fs:Zn,minFilter:Xn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const ie=p.state.transmissionRenderTarget[W.id],fe=W.viewport||D;ie.setSize(fe.z,fe.w);const Me=x.getRenderTarget();x.setRenderTarget(ie),x.getClearColor(F),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),Ze&&Pe.render(G);const Se=x.toneMapping;x.toneMapping=fi;const Ue=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),ne===!0&&te.setGlobalState(x.clippingPlanes,W),gs(E,G,W),R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ye=0,Je=O.length;ye<Je;ye++){const lt=O[ye],pt=lt.object,Yt=lt.geometry,et=lt.material,be=lt.group;if(et.side===Sn&&pt.layers.test(W.layers)){const Un=et.side;et.side=$t,et.needsUpdate=!0,nl(pt,G,W,Yt,et,be),et.side=Un,et.needsUpdate=!0,Be=!0}}Be===!0&&(R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie))}x.setRenderTarget(Me),x.setClearColor(F,Y),Ue!==void 0&&(W.viewport=Ue),x.toneMapping=Se}function gs(E,O,G){const W=O.isScene===!0?O.overrideMaterial:null;for(let z=0,ie=E.length;z<ie;z++){const fe=E[z],Me=fe.object,Se=fe.geometry,Ue=W===null?fe.material:W,Be=fe.group;Me.layers.test(G.layers)&&nl(Me,O,G,Se,Ue,Be)}}function nl(E,O,G,W,z,ie){E.onBeforeRender(x,O,G,W,z,ie),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(x,O,G,W,E,ie),z.transparent===!0&&z.side===Sn&&z.forceSinglePass===!1?(z.side=$t,z.needsUpdate=!0,x.renderBufferDirect(G,O,W,z,E,ie),z.side=Kn,z.needsUpdate=!0,x.renderBufferDirect(G,O,W,z,E,ie),z.side=Sn):x.renderBufferDirect(G,O,W,z,E,ie),E.onAfterRender(x,O,G,W,z,ie)}function _s(E,O,G){O.isScene!==!0&&(O=vt);const W=Re.get(E),z=p.state.lights,ie=p.state.shadowsArray,fe=z.state.version,Me=Ee.getParameters(E,z.state,ie,O,G),Se=Ee.getProgramCacheKey(Me);let Ue=W.programs;W.environment=E.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(E.isMeshStandardMaterial?V:y).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",Fe),Ue=new Map,W.programs=Ue);let Be=Ue.get(Se);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===fe)return rl(E,Me),Be}else Me.uniforms=Ee.getUniforms(E),E.onBeforeCompile(Me,x),Be=Ee.acquireProgram(Me,Se),Ue.set(Se,Be),W.uniforms=Me.uniforms;const ye=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ye.clippingPlanes=te.uniform),rl(E,Me),W.needsLights=zf(E),W.lightsStateVersion=fe,W.needsLights&&(ye.ambientLightColor.value=z.state.ambient,ye.lightProbe.value=z.state.probe,ye.directionalLights.value=z.state.directional,ye.directionalLightShadows.value=z.state.directionalShadow,ye.spotLights.value=z.state.spot,ye.spotLightShadows.value=z.state.spotShadow,ye.rectAreaLights.value=z.state.rectArea,ye.ltc_1.value=z.state.rectAreaLTC1,ye.ltc_2.value=z.state.rectAreaLTC2,ye.pointLights.value=z.state.point,ye.pointLightShadows.value=z.state.pointShadow,ye.hemisphereLights.value=z.state.hemi,ye.directionalShadowMap.value=z.state.directionalShadowMap,ye.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ye.spotShadowMap.value=z.state.spotShadowMap,ye.spotLightMatrix.value=z.state.spotLightMatrix,ye.spotLightMap.value=z.state.spotLightMap,ye.pointShadowMap.value=z.state.pointShadowMap,ye.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function il(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=ro.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function rl(E,O){const G=Re.get(E);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function Uf(E,O,G,W,z){O.isScene!==!0&&(O=vt),R.resetTextureUnits();const ie=O.fog,fe=W.isMeshStandardMaterial?O.environment:null,Me=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:qt,Se=(W.isMeshStandardMaterial?V:y).get(W.envMap||fe),Ue=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),ye=!!G.morphAttributes.position,Je=!!G.morphAttributes.normal,lt=!!G.morphAttributes.color;let pt=fi;W.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pt=x.toneMapping);const Yt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,et=Yt!==void 0?Yt.length:0,be=Re.get(W),Un=p.state.lights;if(ne===!0&&(Ae===!0||E!==S)){const sn=E===S&&W.id===A;te.setState(W,E,sn)}let tt=!1;W.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Un.state.version||be.outputColorSpace!==Me||z.isBatchedMesh&&be.batching===!1||!z.isBatchedMesh&&be.batching===!0||z.isBatchedMesh&&be.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&be.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&be.instancing===!1||!z.isInstancedMesh&&be.instancing===!0||z.isSkinnedMesh&&be.skinning===!1||!z.isSkinnedMesh&&be.skinning===!0||z.isInstancedMesh&&be.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&be.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&be.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&be.instancingMorph===!1&&z.morphTexture!==null||be.envMap!==Se||W.fog===!0&&be.fog!==ie||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==te.numPlanes||be.numIntersection!==te.numIntersection)||be.vertexAlphas!==Ue||be.vertexTangents!==Be||be.morphTargets!==ye||be.morphNormals!==Je||be.morphColors!==lt||be.toneMapping!==pt||be.morphTargetsCount!==et)&&(tt=!0):(tt=!0,be.__version=W.version);let gn=be.currentProgram;tt===!0&&(gn=_s(W,O,z));let Bi=!1,Jt=!1,Pr=!1;const mt=gn.getUniforms(),wn=be.uniforms;if(Ie.useProgram(gn.program)&&(Bi=!0,Jt=!0,Pr=!0),W.id!==A&&(A=W.id,Jt=!0),Bi||S!==E){Ie.buffers.depth.getReversed()?(ce.copy(E.projectionMatrix),_m(ce),vm(ce),mt.setValue(B,"projectionMatrix",ce)):mt.setValue(B,"projectionMatrix",E.projectionMatrix),mt.setValue(B,"viewMatrix",E.matrixWorldInverse);const Jn=mt.map.cameraPosition;Jn!==void 0&&Jn.setValue(B,Oe.setFromMatrixPosition(E.matrixWorld)),Ye.logarithmicDepthBuffer&&mt.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&mt.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Jt=!0,Pr=!0)}if(z.isSkinnedMesh){mt.setOptional(B,z,"bindMatrix"),mt.setOptional(B,z,"bindMatrixInverse");const sn=z.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),mt.setValue(B,"boneTexture",sn.boneTexture,R))}z.isBatchedMesh&&(mt.setOptional(B,z,"batchingTexture"),mt.setValue(B,"batchingTexture",z._matricesTexture,R),mt.setOptional(B,z,"batchingIdTexture"),mt.setValue(B,"batchingIdTexture",z._indirectTexture,R),mt.setOptional(B,z,"batchingColorTexture"),z._colorsTexture!==null&&mt.setValue(B,"batchingColorTexture",z._colorsTexture,R));const Lr=G.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0)&&Ne.update(z,G,gn),(Jt||be.receiveShadow!==z.receiveShadow)&&(be.receiveShadow=z.receiveShadow,mt.setValue(B,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(wn.envMap.value=Se,wn.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(wn.envMapIntensity.value=O.environmentIntensity),Jt&&(mt.setValue(B,"toneMappingExposure",x.toneMappingExposure),be.needsLights&&Of(wn,Pr),ie&&W.fog===!0&&le.refreshFogUniforms(wn,ie),le.refreshMaterialUniforms(wn,W,k,j,p.state.transmissionRenderTarget[E.id]),ro.upload(B,il(be),wn,R)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(ro.upload(B,il(be),wn,R),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&mt.setValue(B,"center",z.center),mt.setValue(B,"modelViewMatrix",z.modelViewMatrix),mt.setValue(B,"normalMatrix",z.normalMatrix),mt.setValue(B,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const sn=W.uniformsGroups;for(let Jn=0,Qn=sn.length;Jn<Qn;Jn++){const sl=sn[Jn];U.update(sl,gn),U.bind(sl,gn)}}return gn}function Of(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function zf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,O,G){Re.get(E.texture).__webglTexture=O,Re.get(E.depthTexture).__webglTexture=G;const W=Re.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const G=Re.get(E);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,G=0){P=E,b=O,T=G;let W=!0,z=null,ie=!1,fe=!1;if(E){const Se=Re.get(E);if(Se.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(B.FRAMEBUFFER,null),W=!1;else if(Se.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Se.__hasExternalTextures)R.rebindTextures(E,Re.get(E.texture).__webglTexture,Re.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ye=E.depthTexture;if(Se.__boundDepthTexture!==ye){if(ye!==null&&Re.has(ye)&&(E.width!==ye.image.width||E.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(fe=!0);const Be=Re.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Be[O])?z=Be[O][G]:z=Be[O],ie=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?z=Re.get(E).__webglMultisampledFramebuffer:Array.isArray(Be)?z=Be[G]:z=Be,D.copy(E.viewport),H.copy(E.scissor),I=E.scissorTest}else D.copy(ae).multiplyScalar(k).floor(),H.copy(xe).multiplyScalar(k).floor(),I=ve;if(Ie.bindFramebuffer(B.FRAMEBUFFER,z)&&W&&Ie.drawBuffers(E,z),Ie.viewport(D),Ie.scissor(H),Ie.setScissorTest(I),ie){const Se=Re.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+O,Se.__webglTexture,G)}else if(fe){const Se=Re.get(E.texture),Ue=O||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Se.__webglTexture,G||0,Ue)}A=-1},this.readRenderTargetPixels=function(E,O,G,W,z,ie,fe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Re.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){Ie.bindFramebuffer(B.FRAMEBUFFER,Me);try{const Se=E.texture,Ue=Se.format,Be=Se.type;if(!Ye.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-W&&G>=0&&G<=E.height-z&&B.readPixels(O,G,W,z,Ve.convert(Ue),Ve.convert(Be),ie)}finally{const Se=P!==null?Re.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(B.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(E,O,G,W,z,ie,fe){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=Re.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){const Se=E.texture,Ue=Se.format,Be=Se.type;if(!Ye.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-W&&G>=0&&G<=E.height-z){Ie.bindFramebuffer(B.FRAMEBUFFER,Me);const ye=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ye),B.bufferData(B.PIXEL_PACK_BUFFER,ie.byteLength,B.STREAM_READ),B.readPixels(O,G,W,z,Ve.convert(Ue),Ve.convert(Be),0);const Je=P!==null?Re.get(P).__webglFramebuffer:null;Ie.bindFramebuffer(B.FRAMEBUFFER,Je);const lt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await gm(B,lt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ye),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,ie),B.deleteBuffer(ye),B.deleteSync(lt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,G=0){E.isTexture!==!0&&(Yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-G),z=Math.floor(E.image.width*W),ie=Math.floor(E.image.height*W),fe=O!==null?O.x:0,Me=O!==null?O.y:0;R.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,G,0,0,fe,Me,z,ie),Ie.unbindTexture()},this.copyTextureToTexture=function(E,O,G=null,W=null,z=0){E.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],O=arguments[2],z=arguments[3]||0,G=null);let ie,fe,Me,Se,Ue,Be,ye,Je,lt;const pt=E.isCompressedTexture?E.mipmaps[z]:E.image;G!==null?(ie=G.max.x-G.min.x,fe=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,Se=G.min.x,Ue=G.min.y,Be=G.isBox3?G.min.z:0):(ie=pt.width,fe=pt.height,Me=pt.depth||1,Se=0,Ue=0,Be=0),W!==null?(ye=W.x,Je=W.y,lt=W.z):(ye=0,Je=0,lt=0);const Yt=Ve.convert(O.format),et=Ve.convert(O.type);let be;O.isData3DTexture?(R.setTexture3D(O,0),be=B.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),be=B.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),be=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,O.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,O.unpackAlignment);const Un=B.getParameter(B.UNPACK_ROW_LENGTH),tt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),gn=B.getParameter(B.UNPACK_SKIP_PIXELS),Bi=B.getParameter(B.UNPACK_SKIP_ROWS),Jt=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,pt.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,pt.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Se),B.pixelStorei(B.UNPACK_SKIP_ROWS,Ue),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Be);const Pr=E.isDataArrayTexture||E.isData3DTexture,mt=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const wn=Re.get(E),Lr=Re.get(O),sn=Re.get(wn.__renderTarget),Jn=Re.get(Lr.__renderTarget);Ie.bindFramebuffer(B.READ_FRAMEBUFFER,sn.__webglFramebuffer),Ie.bindFramebuffer(B.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let Qn=0;Qn<Me;Qn++)Pr&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Re.get(E).__webglTexture,z,Be+Qn),E.isDepthTexture?(mt&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Re.get(O).__webglTexture,z,lt+Qn),B.blitFramebuffer(Se,Ue,ie,fe,ye,Je,ie,fe,B.DEPTH_BUFFER_BIT,B.NEAREST)):mt?B.copyTexSubImage3D(be,z,ye,Je,lt+Qn,Se,Ue,ie,fe):B.copyTexSubImage2D(be,z,ye,Je,lt+Qn,Se,Ue,ie,fe);Ie.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else mt?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(be,z,ye,Je,lt,ie,fe,Me,Yt,et,pt.data):O.isCompressedArrayTexture?B.compressedTexSubImage3D(be,z,ye,Je,lt,ie,fe,Me,Yt,pt.data):B.texSubImage3D(be,z,ye,Je,lt,ie,fe,Me,Yt,et,pt):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,z,ye,Je,ie,fe,Yt,et,pt.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,z,ye,Je,pt.width,pt.height,Yt,pt.data):B.texSubImage2D(B.TEXTURE_2D,z,ye,Je,ie,fe,Yt,et,pt);B.pixelStorei(B.UNPACK_ROW_LENGTH,Un),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,tt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,gn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Bi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,Jt),z===0&&O.generateMipmaps&&B.generateMipmap(be),Ie.unbindTexture()},this.copyTextureToTexture3D=function(E,O,G=null,W=null,z=0){return E.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,E=arguments[2],O=arguments[3],z=arguments[4]||0),Yr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,G,W,z)},this.initRenderTarget=function(E){Re.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Ie.unbindTexture()},this.resetState=function(){b=0,T=0,P=null,Ie.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class zc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=n}clone(){return new zc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class cf extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class lf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ac,this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Gt=new L;class ls{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ls(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wo extends pn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let tr;const zr=new L,nr=new L,ir=new L,rr=new Le,Fr=new Le,uf=new ze,ks=new L,Br=new L,Vs=new L,mu=new Le,ca=new Le,gu=new Le;class Fc extends ft{constructor(e=new wo){if(super(),this.isSprite=!0,this.type="Sprite",tr===void 0){tr=new Dt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new lf(t,5);tr.setIndex([0,1,2,0,2,3]),tr.setAttribute("position",new ls(n,3,0,!1)),tr.setAttribute("uv",new ls(n,2,3,!1))}this.geometry=tr,this.material=e,this.center=new Le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),nr.setFromMatrixScale(this.matrixWorld),uf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ir.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&nr.multiplyScalar(-ir.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;Hs(ks.set(-.5,-.5,0),ir,o,nr,r,s),Hs(Br.set(.5,-.5,0),ir,o,nr,r,s),Hs(Vs.set(.5,.5,0),ir,o,nr,r,s),mu.set(0,0),ca.set(1,0),gu.set(1,1);let a=e.ray.intersectTriangle(ks,Br,Vs,!1,zr);if(a===null&&(Hs(Br.set(-.5,.5,0),ir,o,nr,r,s),ca.set(0,1),a=e.ray.intersectTriangle(ks,Vs,Br,!1,zr),a===null))return;const c=e.ray.origin.distanceTo(zr);c<e.near||c>e.far||t.push({distance:c,point:zr.clone(),uv:fn.getInterpolation(zr,ks,Br,Vs,mu,ca,gu,new Le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Hs(i,e,t,n,r,s){rr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(Fr.x=s*rr.x-r*rr.y,Fr.y=r*rr.x+s*rr.y):Fr.copy(rr),i.copy(e),i.x+=Fr.x,i.y+=Fr.y,i.applyMatrix4(uf)}const _u=new L,vu=new Qe,xu=new Qe,Rx=new L,Mu=new ze,Gs=new L,la=new Pn,Su=new ze,ua=new bo;class Cx extends Te{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ml,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $n),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gs),this.boundingBox.expandByPoint(Gs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Gs),this.boundingSphere.expandByPoint(Gs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),la.copy(this.boundingSphere),la.applyMatrix4(r),e.ray.intersectsSphere(la)!==!1&&(Su.copy(r).invert(),ua.copy(e.ray).applyMatrix4(Su),!(this.boundingBox!==null&&ua.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ua)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Qe,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ml?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Fp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;vu.fromBufferAttribute(r.attributes.skinIndex,e),xu.fromBufferAttribute(r.attributes.skinWeight,e),_u.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=xu.getComponent(s);if(o!==0){const a=vu.getComponent(s);Mu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Rx.copy(_u).applyMatrix4(Mu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class hf extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ff extends Rt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=St,u=St,h,f){super(null,o,a,c,l,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yu=new ze,Ix=new ze;class Bc{constructor(e=[],t=[]){this.uuid=En(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Ix;yu.multiplyMatrices(a,t[s]),yu.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Bc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new ff(t,e,e,dn,An);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new hf),this.bones.push(o),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class uc extends jt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const sr=new ze,Au=new ze,Ws=[],Eu=new $n,Px=new ze,kr=new Te,Vr=new Pn;class Lx extends Te{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Px)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),Eu.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(Eu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),Vr.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,sr),Au.multiplyMatrices(n,sr),kr.matrixWorld=Au,kr.raycast(e,Ws);for(let o=0,a=Ws.length;o<a;o++){const c=Ws[o];c.instanceId=s,c.object=this,t.push(c)}Ws.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ff(new Float32Array(r*this.count),r,this.count,wc,An));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class kc extends pn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mo=new L,So=new L,bu=new ze,Hr=new bo,Xs=new Pn,ha=new L,Tu=new L;class Ro extends ft{constructor(e=new Dt,t=new kc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Mo.fromBufferAttribute(t,r-1),So.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Mo.distanceTo(So);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(r),Xs.radius+=s,e.ray.intersectsSphere(Xs)===!1)return;bu.copy(r).invert(),Hr.copy(e.ray).applyMatrix4(bu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){const p=u.getX(v),_=u.getX(v+1),M=js(this,e,Hr,c,p,_);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(d),p=js(this,e,Hr,c,v,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=d,m=g-1;v<m;v+=l){const p=js(this,e,Hr,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=js(this,e,Hr,c,g-1,d);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function js(i,e,t,n,r,s){const o=i.geometry.attributes.position;if(Mo.fromBufferAttribute(o,r),So.fromBufferAttribute(o,s),t.distanceSqToSegment(Mo,So,ha,Tu)>n)return;ha.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ha);if(!(c<e.near||c>e.far))return{distance:c,point:Tu.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const wu=new L,Ru=new L;class Dx extends Ro{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)wu.fromBufferAttribute(t,r),Ru.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+wu.distanceTo(Ru);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nx extends Ro{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class df extends pn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Cu=new ze,hc=new bo,qs=new Pn,Ys=new L;class Ux extends ft{constructor(e=new Dt,t=new df){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(r),qs.radius+=s,e.ray.intersectsSphere(qs)===!1)return;Cu.copy(r).invert(),hc.copy(e.ray).applyMatrix4(Cu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,v=d;g<v;g++){const m=l.getX(g);Ys.fromBufferAttribute(h,m),Iu(Ys,m,c,r,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,v=d;g<v;g++)Ys.fromBufferAttribute(h,g),Iu(Ys,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Iu(i,e,t,n,r,s,o){const a=hc.distanceSqToPoint(i);if(a<t){const c=new L;hc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Vc extends Rt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ds extends Dt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new L,u=new Le;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*r;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ds(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Cn extends Dt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;_(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new _t(h,3)),this.setAttribute("normal",new _t(f,3)),this.setAttribute("uv",new _t(d,2));function _(){const x=new L,C=new L;let b=0;const T=(t-e)/n;for(let P=0;P<=s;P++){const A=[],S=P/s,D=S*(t-e)+e;for(let H=0;H<=r;H++){const I=H/r,F=I*c+a,Y=Math.sin(F),w=Math.cos(F);C.x=D*Y,C.y=-S*n+m,C.z=D*w,h.push(C.x,C.y,C.z),x.set(Y,T,w).normalize(),f.push(x.x,x.y,x.z),d.push(I,1-S),A.push(g++)}v.push(A)}for(let P=0;P<r;P++)for(let A=0;A<s;A++){const S=v[A][P],D=v[A+1][P],H=v[A+1][P+1],I=v[A][P+1];(e>0||A!==0)&&(u.push(S,D,I),b+=3),(t>0||A!==s-1)&&(u.push(D,H,I),b+=3)}l.addGroup(p,b,0),p+=b}function M(x){const C=g,b=new Le,T=new L;let P=0;const A=x===!0?e:t,S=x===!0?1:-1;for(let H=1;H<=r;H++)h.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const D=g;for(let H=0;H<=r;H++){const F=H/r*c+a,Y=Math.cos(F),w=Math.sin(F);T.x=A*w,T.y=m*S,T.z=A*Y,h.push(T.x,T.y,T.z),f.push(0,S,0),b.x=Y*.5+.5,b.y=w*.5*S+.5,d.push(b.x,b.y),g++}for(let H=0;H<r;H++){const I=C+H,F=D+H;x===!0?u.push(F,F+1,I):u.push(F+1,F,I),P+=3}l.addGroup(p,P,x===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hc extends Cn{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Hc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gc extends Dt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),u(),this.setAttribute("position",new _t(s,3)),this.setAttribute("normal",new _t(s.slice(),3)),this.setAttribute("uv",new _t(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const M=new L,x=new L,C=new L;for(let b=0;b<t.length;b+=3)d(t[b+0],M),d(t[b+1],x),d(t[b+2],C),c(M,x,C,_)}function c(_,M,x,C){const b=C+1,T=[];for(let P=0;P<=b;P++){T[P]=[];const A=_.clone().lerp(x,P/b),S=M.clone().lerp(x,P/b),D=b-P;for(let H=0;H<=D;H++)H===0&&P===b?T[P][H]=A:T[P][H]=A.clone().lerp(S,H/D)}for(let P=0;P<b;P++)for(let A=0;A<2*(b-P)-1;A++){const S=Math.floor(A/2);A%2===0?(f(T[P][S+1]),f(T[P+1][S]),f(T[P][S])):(f(T[P][S+1]),f(T[P+1][S+1]),f(T[P+1][S]))}}function l(_){const M=new L;for(let x=0;x<s.length;x+=3)M.x=s[x+0],M.y=s[x+1],M.z=s[x+2],M.normalize().multiplyScalar(_),s[x+0]=M.x,s[x+1]=M.y,s[x+2]=M.z}function u(){const _=new L;for(let M=0;M<s.length;M+=3){_.x=s[M+0],_.y=s[M+1],_.z=s[M+2];const x=m(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;o.push(x,1-C)}g(),h()}function h(){for(let _=0;_<o.length;_+=6){const M=o[_+0],x=o[_+2],C=o[_+4],b=Math.max(M,x,C),T=Math.min(M,x,C);b>.9&&T<.1&&(M<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),C<.2&&(o[_+4]+=1))}}function f(_){s.push(_.x,_.y,_.z)}function d(_,M){const x=_*3;M.x=e[x+0],M.y=e[x+1],M.z=e[x+2]}function g(){const _=new L,M=new L,x=new L,C=new L,b=new Le,T=new Le,P=new Le;for(let A=0,S=0;A<s.length;A+=9,S+=6){_.set(s[A+0],s[A+1],s[A+2]),M.set(s[A+3],s[A+4],s[A+5]),x.set(s[A+6],s[A+7],s[A+8]),b.set(o[S+0],o[S+1]),T.set(o[S+2],o[S+3]),P.set(o[S+4],o[S+5]),C.copy(_).add(M).add(x).divideScalar(3);const D=m(C);v(b,S+0,_,D),v(T,S+2,M,D),v(P,S+4,x,D)}}function v(_,M,x,C){C<0&&_.x===1&&(o[M]=_.x-1),x.x===0&&x.z===0&&(o[M]=C/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gc(e.vertices,e.indices,e.radius,e.details)}}class Wc extends Gc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wc(e.radius,e.detail)}}class Ci extends Dt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const _=[],M=p/n;let x=0;p===0&&o===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const b=C/t;h.x=-e*Math.cos(r+b*s)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(r+b*s)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(b+x,1-M),_.push(l++)}u.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){const M=u[p][_+1],x=u[p][_],C=u[p+1][_],b=u[p+1][_+1];(p!==0||o>0)&&d.push(M,x,b),(p!==n-1||c<Math.PI)&&d.push(x,C,b)}this.setIndex(d),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class us extends Dt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new L,h=new L,f=new L;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const v=g/r*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/r),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const v=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,_=(r+1)*d+g;o.push(v,m,_),o.push(m,p,_)}this.setIndex(o),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(c,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Xc extends pn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ln extends Xc{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Vt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Xe extends pn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Ks(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ox(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function zx(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Pu(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=i[a+c]}return r}function pf(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class ps{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Fx extends ps{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cr,endingEnd:cr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case lr:s=e,a=2*t-n;break;case vo:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case lr:o=e,c=2*n-t;break;case vo:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),v=g*g,m=v*g,p=-f*m+2*f*v-f*g,_=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*g+1,M=(-1-d)*m+(1.5+d)*v+.5*g,x=d*m-d*v;for(let C=0;C!==a;++C)s[C]=p*o[u+C]+_*o[l+C]+M*o[c+C]+x*o[h+C];return s}}class mf extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*h+o[c+f]*u;return s}}class Bx extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Dn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ks(t,this.TimeBufferType),this.values=Ks(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ks(e.times,Array),values:Ks(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Bx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case os:t=this.InterpolantFactoryMethodDiscrete;break;case as:t=this.InterpolantFactoryMethodLinear;break;case No:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return os;case this.InterpolantFactoryMethodLinear:return as;case this.InterpolantFactoryMethodSmooth:return No}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&Ox(r))for(let a=0,c=r.length;a!==c;++a){const l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===No,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const v=t[h+g];if(v!==t[f+g]||v!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Dn.prototype.TimeBufferType=Float32Array;Dn.prototype.ValueBufferType=Float32Array;Dn.prototype.DefaultInterpolation=as;class Rr extends Dn{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="bool";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=os;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class gf extends Dn{}gf.prototype.ValueTypeName="color";class Er extends Dn{}Er.prototype.ValueTypeName="number";class kx extends ps{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t);let l=e*a;for(let u=l+a;l!==u;l+=4)bn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class br extends Dn{InterpolantFactoryMethodLinear(e){return new kx(this.times,this.values,this.getValueSize(),e)}}br.prototype.ValueTypeName="quaternion";br.prototype.InterpolantFactoryMethodSmooth=void 0;class Cr extends Dn{constructor(e,t,n){super(e,t,n)}}Cr.prototype.ValueTypeName="string";Cr.prototype.ValueBufferType=Array;Cr.prototype.DefaultInterpolation=os;Cr.prototype.InterpolantFactoryMethodLinear=void 0;Cr.prototype.InterpolantFactoryMethodSmooth=void 0;class Tr extends Dn{}Tr.prototype.ValueTypeName="vector";class fc{constructor(e="",t=-1,n=[],r=Pc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=En(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Hx(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Dn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=zx(c);c=Pu(c,1,u),l=Pu(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Er(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=r[h];f||(r[h]=f=[]),f.push(l)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,v){if(d.length!==0){const m=[],p=[];pf(d,m,p,g),m.length!==0&&v.push(new h(f,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let v=0;v<f[g].morphTargets.length;v++)d[f[g].morphTargets[v]]=-1;for(const v in d){const m=[],p=[];for(let _=0;_!==f[g].morphTargets.length;++_){const M=f[g];m.push(M.time),p.push(M.morphTarget===v?1:0)}r.push(new Er(".morphTargetInfluence["+v+"]",m,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(Tr,d+".position",f,"pos",r),n(br,d+".quaternion",f,"rot",r),n(Tr,d+".scale",f,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Vx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Er;case"vector":case"vector2":case"vector3":case"vector4":return Tr;case"color":return gf;case"quaternion":return br;case"bool":case"boolean":return Rr;case"string":return Cr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Hx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Vx(i.type);if(i.times===void 0){const t=[],n=[];pf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ui={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Gx{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const Wx=new Gx;class Ir{constructor(e){this.manager=e!==void 0?e:Wx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ir.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class Xx extends Error{constructor(e,t){super(e),this.response=t}}class _f extends Ir{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ui.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:n,onError:r});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Vn[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let v=0;const m=new ReadableStream({start(p){_();function _(){h.read().then(({done:M,value:x})=>{if(M)p.close();else{v+=x.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:d});for(let b=0,T=u.length;b<T;b++){const P=u[b];P.onProgress&&P.onProgress(C)}p.enqueue(x),_()}},M=>{p.error(M)})}}});return new Response(m)}else throw new Xx(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{ui.add(e,l);const u=Vn[e];delete Vn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=Vn[e];if(u===void 0)throw this.manager.itemError(e),l;delete Vn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jx extends Ir{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ui.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=cs("img");function c(){u(),ui.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class qx extends Ir{constructor(e){super(e)}load(e,t,n,r){const s=new Rt,o=new jx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Co extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class vf extends Co{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const fa=new ze,Lu=new L,Du=new L;class jc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nc,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Lu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Lu),Du.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Du),t.updateMatrixWorld(),fa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Yx extends jc{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=yr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class xf extends Co{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Yx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Nu=new ze,Gr=new L,da=new L;class Kx extends jc{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Le(4,2),this._viewportCount=6,this._viewports=[new Qe(2,1,1,1),new Qe(0,1,1,1),new Qe(3,1,1,1),new Qe(1,1,1,1),new Qe(3,0,1,1),new Qe(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Gr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gr),da.copy(n.position),da.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(da),n.updateMatrixWorld(),r.makeTranslation(-Gr.x,-Gr.y,-Gr.z),Nu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nu)}}class Ii extends Co{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Kx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zx extends jc{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qc extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Zx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Jr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class $x extends Ir{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ui.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return ui.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),ui.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});ui.add(e,c),s.manager.itemStart(e)}}class Jx{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){bn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const o=this._workIndex*s;bn.multiplyQuaternionsFlat(e,o,e,t,e,n),bn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){const o=1-r;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*r}}}const Yc="\\[\\]\\.:\\/",Qx=new RegExp("["+Yc+"]","g"),Kc="[^"+Yc+"]",eM="[^"+Yc.replace("\\.","")+"]",tM=/((?:WC+[\/:])*)/.source.replace("WC",Kc),nM=/(WCOD+)?/.source.replace("WCOD",eM),iM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Kc),rM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Kc),sM=new RegExp("^"+tM+nM+iM+rM+"$"),oM=["material","materials","bones","map"];class aM{constructor(e,t,n){const r=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Qx,"")}static parseTrackName(e){const t=sM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);oM.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[r];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=aM;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class cM{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:cr,endingEnd:cr};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Bp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Vp:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case Pc:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const o=n===kp;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===Hh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){const a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=lr,r.endingEnd=lr):(e?r.endingStart=this.zeroSlopeAtStart?lr:cr:r.endingStart=vo,t?r.endingEnd=this.zeroSlopeAtEnd?lr:cr:r.endingEnd=vo)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const lM=new Float32Array(1);class uM extends Fi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==s;++h){const f=r[h],d=f.name;let g=u[d];if(g!==void 0)++g.referenceCount,o[h]=g;else{if(g=o[h],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,d));continue}const v=t&&t._propertyBindings[h].binding.parsedPath;g=new Jx(nt.create(n,d,v),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,d),o[h]=g}a[h].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new mf(new Float32Array(2),new Float32Array(2),1,lM),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let o=typeof e=="string"?fc.findByName(r,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Pc),c!==void 0){const h=c.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new cM(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?fc.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(r,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yc);function Mf(i){let e=i>>>0;return()=>{const[t,n]=ah(e);return e=n,t}}const gt=64;function Et(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e;const s=r.getContext("2d");t(s,i,e,Mf(i*31+e));const o=new Vc(r);return o.colorSpace=wt,o.magFilter=St,o.minFilter=St,o.generateMipmaps=!1,n&&(o.wrapS=o.wrapT=Ui),o}function Lt(i,e,t,n,r,s){for(let o=0;o<s;o++)i.fillStyle=r[Math.floor(n()*r.length)],i.fillRect(Math.floor(n()*e),Math.floor(n()*t),1+Math.floor(n()*2),1+Math.floor(n()*2))}function or(i,e,t,n,r,s){for(let o=0;o<s;o++){i.fillStyle=r;const a=n()*e,c=n()*t;for(let l=0;l<14;l++)i.fillRect(Math.floor(a+(n()-.5)*10),Math.floor(c+(n()-.5)*10),2,2)}}function hM(){const i=Et(gt,gt,(_,M,x,C)=>{_.fillStyle="#b9ae8e",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#a99f80","#c5bb9c","#9c9274"],500),_.fillStyle="#3f5b48",_.fillRect(0,Math.floor(x*.62),M,Math.ceil(x*.38));for(let b=0;b<M;b+=8)for(let T=Math.floor(x*.62);T<x;T+=8)_.fillStyle=(b+T)%16?"#466751":"#3a5443",_.fillRect(b,T,7,7);_.fillStyle="#2c2a22",_.fillRect(0,Math.floor(x*.6),M,2),or(_,M,x*.6,C,"rgba(70,55,30,0.35)",5)}),e=Et(gt,gt,(_,M,x,C)=>{for(let b=0;b<M;b+=16)for(let T=0;T<x;T+=16)_.fillStyle=(b+T)/16%2?"#8d8a80":"#5f5d57",_.fillRect(b,T,16,16);Lt(_,M,x,C,["#4b4943","#9b988e","#3a3934"],400),_.fillStyle="#2a2925";for(let b=0;b<M;b+=16)_.fillRect(b,0,1,x),_.fillRect(0,b,M,1)}),t=Et(gt,gt,(_,M,x,C)=>{for(let b=0;b<x;b+=8){const T=b/8%2?0:16;for(let P=-T;P<M;P+=32){const A=120+Math.floor(C()*30);_.fillStyle=`rgb(${A},${Math.floor(A*.68)},${Math.floor(A*.4)})`,_.fillRect(P,b,31,7)}}Lt(_,M,x,C,["#5e3d22","#8e6238"],300),_.fillStyle="#d8d0b0",_.fillRect(0,30,M,1)}),n=Et(gt,gt,(_,M,x,C)=>{_.fillStyle="#8f8b7c",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#7e7a6c","#a19d8d","#6a675b"],600),_.fillStyle="#4f4c43";for(let b=0;b<M;b+=32)_.fillRect(b,0,2,x),_.fillRect(0,b,M,2);or(_,M,x,C,"rgba(90,70,30,0.4)",3)}),r=Et(gt,16,(_,M,x,C)=>{_.fillStyle="#6b4a2b",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#5a3d22","#7d5834","#4a311b"],200),_.fillStyle="#3a2614",_.fillRect(0,0,M,1),_.fillRect(0,x-1,M,1),_.fillStyle="#9a9a9a",_.fillRect(4,6,2,2),_.fillRect(M-6,7,2,2)}),s=Et(gt,gt,(_,M,x,C)=>{for(let b=0;b<M;b+=8){const T=70+Math.floor(C()*25);_.fillStyle=`rgb(${T},${Math.floor(T*.72)},${Math.floor(T*.45)})`,_.fillRect(b,0,7,x)}Lt(_,M,x,C,["#3b2817","#56391f"],200),_.strokeStyle="#8f8f8f",_.lineWidth=2,_.beginPath(),_.moveTo(0,18),_.lineTo(M,46),_.moveTo(M,18),_.lineTo(0,46),_.stroke()}),o=Et(gt,gt,(_,M,x,C)=>{for(let b=0;b<M;b+=16){_.fillStyle="#4b6a7f",_.fillRect(b,0,15,x),_.fillStyle="#2d4150";for(let T=6;T<20;T+=3)_.fillRect(b+4,T,8,1);_.fillStyle="#c0c0c0",_.fillRect(b+12,30,2,5)}Lt(_,M,x,C,["#6b5a3a","#3a4d5a"],300)},!0),a=Et(gt,gt,(_,M,x,C)=>{_.fillStyle="#2b2a1e",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#3a3824","#22301a","#1d1c14","#34452a"],900)}),c=Et(gt*2,gt,(_,M,x,C)=>{_.fillStyle="#5b4026",_.fillRect(0,0,M,x),_.fillStyle="#1f3327",_.fillRect(4,4,M-8,x-8),Lt(_,M,x,C,["#2a4434","#18281e"],300),_.fillStyle="rgba(230,230,220,0.85)",_.font="bold 13px monospace",_.fillText("NON USCITE",14,26),_.fillText("DI NOTTE",22,44),_.fillStyle="rgba(120,10,10,0.8)",_.fillRect(90,46,20,2)},!1),l=Et(32,32,(_,M,x,C)=>{_.fillStyle="#3a3d40",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#2b2d30","#4a4e52","#55493a"],120)}),u=Et(32,32,(_,M,x,C)=>{_.fillStyle="#8a6a44",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#6e5333","#9e7c52"],150);for(let b=0;b<x;b+=8)_.fillStyle="#5a4126",_.fillRect(0,b,M,1)}),h=Et(gt,gt,(_,M,x,C)=>{for(let b=0;b<M;b+=32)for(let T=0;T<x;T+=32)_.fillStyle=(b+T)/32%2?"#b8ad86":"#6f8a6a",_.fillRect(b,T,32,32);Lt(_,M,x,C,["#9a916e","#5c7358","#c9bf9a","#4a4536"],500),or(_,M,x,C,"rgba(60,45,25,0.35)",3)}),f=Et(gt,gt,(_,M,x,C)=>{_.fillStyle="#5d5c58",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#4e4d49","#6b6a65","#3f3e3a","#74706a"],900),_.strokeStyle="#2f2e2b",_.lineWidth=1,_.beginPath(),_.moveTo(4,10),_.lineTo(22,26),_.lineTo(30,24),_.lineTo(50,44),_.stroke(),or(_,M,x,C,"rgba(40,30,15,0.5)",4)}),d=Et(gt,gt,(_,M,x,C)=>{_.fillStyle="#2f3032",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#3a3b3d","#262729","#45464a","#1f2022"],1100),_.fillStyle="rgba(210,200,160,0.55)",_.fillRect(0,31,M,2),or(_,M,x,C,"rgba(20,20,20,0.6)",3)}),g=Et(32,32,(_,M,x)=>{_.clearRect(0,0,M,x),_.strokeStyle="#8d9499",_.lineWidth=1;for(let C=-32;C<64;C+=8)_.beginPath(),_.moveTo(C,0),_.lineTo(C+32,32),_.moveTo(C+32,0),_.lineTo(C,32),_.stroke()}),v=Et(gt*2,gt,(_,M,x,C)=>{_.fillStyle="#d9a21b",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#b9861a","#e5b43a","#6b4a1a"],700),_.fillStyle="#1b2228";for(let b=6;b<M-10;b+=20)_.fillRect(b,10,15,16);_.fillStyle="#111",_.fillRect(0,34,M,4),_.font="bold 10px monospace",_.fillText("SCUOLABUS",30,50),or(_,M,x,C,"rgba(90,50,20,0.6)",5)}),m=Et(16,32,(_,M,x,C)=>{_.fillStyle="#3b2c1e",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#2a1f15","#4a3828"],120)}),p=Et(32,32,(_,M,x,C)=>{_.fillStyle="#1f3a1e",_.fillRect(0,0,M,x),Lt(_,M,x,C,["#15281a","#2b4d24","#183020"],300)});return{muro:i,piastrelle:e,parquet:t,soffitto:n,legno:r,porta:s,armadietti:o,terra:a,lavagna:c,metallo:l,legnoChiaro:u,linoleum:h,cemento:f,asfalto:d,rete:g,pulmino:v,corteccia:m,fogliame:p}}function so(i,{larghezza:e=128,altezza:t=64,sfondo:n=null,colore:r="#f2efe6",font:s="bold 14px monospace",bordo:o=null}={}){return Et(e,t,a=>{n&&(a.fillStyle=n,a.fillRect(0,0,e,t)),o&&(a.strokeStyle=o,a.lineWidth=3,a.strokeRect(2,2,e-4,t-4)),a.fillStyle=r,a.font=s,a.textAlign="center",a.textBaseline="middle",i.forEach((c,l)=>a.fillText(c,e/2,(l+1)*t/(i.length+1)))},!1)}function fM(i,e){return Et(128,64,t=>{t.strokeStyle="rgba(235,235,225,0.9)",t.fillStyle="rgba(235,235,225,0.9)",t.lineWidth=2,t.beginPath(),i(t),t.stroke(),t.font="bold 10px monospace",t.textAlign="center",e.forEach((n,r)=>t.fillText(n,64,50+r*11))},!1)}function se(i,e,t,n,r,s,o,a,c=0,l=0,u=0){const h=new Te(new Kt(t,n,r),e);return h.position.set(s,o,a),h.rotation.set(c,l,u),i.add(h),h}function Ft(i,e,t,n,r,s,o,a=8){const c=new Te(new Cn(t,t,n,a).rotateX(Math.PI/2),e);return c.position.set(r,s,o),i.add(c),c}function Uu(i,e,t,n,r,s,o,a,c,l){for(let u=0;u<s;u++)se(i,e,o,a,c,t,n-u*a*.9,r-u*l,-u*.12)}function yi(i,e,t){se(i,e.scuro,.026,.005,.045,0,-.03,t),se(i,e.scuro,.026,.026,.005,0,-.018,t-.022),se(i,e.ferro,.005,.018,.005,0,-.012,t+.004,.3)}const dM={pistola(i,e){se(i,e.ferro,.038,.04,.19,0,.035,-.06);for(let t=0;t<4;t++)se(i,e.foro,.04,.03,.003,0,.035,.01+t*.007);return se(i,e.foro,.039,.012,.035,0,.042,-.07),se(i,e.scuro,.033,.026,.16,0,.004,-.055),Ft(i,e.scuro,.009,.02,0,.035,-.158),se(i,e.scuro,.033,.11,.048,0,-.055,.026,.22),se(i,e.impugnatura,.037,.08,.036,0,-.058,.03,.22),se(i,e.ferro,.035,.008,.05,0,-.11,.04,.22),yi(i,e,-.025),se(i,e.scuro,.012,.016,.012,0,.052,.04,-.4),se(i,e.scuro,.006,.012,.01,0,.061,-.145),se(i,e.scuro,.008,.012,.01,.011,.061,.022),se(i,e.scuro,.008,.012,.01,-.011,.061,.022),{bocca:new L(0,.035,-.17),presa:new L(-.03,-.07,.035)}},pompa(i,e){se(i,e.ferro,.055,.075,.22,0,.02,.02),se(i,e.foro,.056,.022,.07,0,.035,-.01),Ft(i,e.ferro,.019,.62,0,.045,-.33),Ft(i,e.scuro,.016,.5,0,.006,-.28),se(i,e.legno,.062,.058,.17,0,.006,-.32);for(let n=0;n<4;n++)se(i,e.foro,.064,.06,.006,0,.006,-.38+n*.035);const t=new Te(new Ci(.007,6,4),e.ferro);return t.position.set(0,.068,-.63),i.add(t),yi(i,e,.06),se(i,e.legno,.045,.1,.07,0,-.04,.13,.35),se(i,e.legno,.05,.11,.26,0,-.04,.27,-.12),se(i,e.scuro,.052,.12,.02,0,-.055,.405,-.12),{bocca:new L(0,.045,-.64),presa:new L(0,-.035,-.32)}},mitra(i,e){se(i,e.ferro,.055,.075,.3,0,.02,-.04),se(i,e.foro,.056,.02,.06,0,.035,-.04),Ft(i,e.scuro,.021,.12,0,.03,-.25);for(let n=0;n<4;n++)se(i,e.foro,.044,.008,.012,0,.03,-.21-n*.025);Ft(i,e.ferro,.011,.05,0,.03,-.33),Uu(i,e.scuro,0,-.06,-.08,3,.03,.055,.045,.012),se(i,e.scuro,.034,.1,.045,0,-.07,.07,.3),yi(i,e,.02),se(i,e.scuro,.03,.08,.03,0,-.06,-.17),se(i,e.ferro,.006,.006,.2,.022,0,.2),se(i,e.ferro,.006,.006,.2,-.022,0,.2),se(i,e.scuro,.05,.07,.012,0,-.01,.3),se(i,e.scuro,.008,.018,.008,0,.065,-.17);const t=new Te(new us(.01,.003,4,8),e.scuro);return t.position.set(0,.068,.07),i.add(t),{bocca:new L(0,.03,-.36),presa:new L(0,-.09,-.17)}},assalto(i,e){se(i,e.ferro,.055,.08,.34,0,.02,-.03),se(i,e.foro,.056,.022,.08,0,.035,-.02),se(i,e.legno,.062,.066,.22,0,.012,-.29);for(let t=0;t<5;t++)se(i,e.foro,.064,.012,.016,0,.03,-.21-t*.04);return Ft(i,e.scuro,.013,.2,0,.035,-.48),Ft(i,e.ferro,.018,.05,0,.035,-.59),se(i,e.scuro,.02,.03,.025,0,.055,-.42),se(i,e.scuro,.008,.045,.008,0,.085,-.42),se(i,e.scuro,.03,.025,.04,0,.072,.08),Uu(i,e.scuro,0,-.065,-.07,4,.032,.05,.05,.015),se(i,e.scuro,.035,.1,.045,0,-.065,.08,.3),yi(i,e,.03),se(i,e.legno,.05,.12,.3,0,-.025,.3,-.1),se(i,e.scuro,.052,.13,.02,0,-.04,.455,-.1),{bocca:new L(0,.035,-.62),presa:new L(0,-.035,-.28)}},mitragliatrice(i,e){se(i,e.ferro,.085,.11,.42,0,.02,-.05),Ft(i,e.scuro,.036,.42,0,.04,-.46,10);for(let t=0;t<6;t++)se(i,e.foro,.074,.014,.022,0,.04,-.32-t*.055);return Ft(i,e.ferro,.014,.1,0,.04,-.71),Ft(i,e.scuro,.022,.04,0,.04,-.77),se(i,e.legno,.11,.12,.14,.09,-.05,-.03),se(i,e.scuro,.112,.02,.142,.09,.005,-.03),se(i,e.scuro,.01,.05,.01,0,.1,-.12),se(i,e.scuro,.01,.05,.01,0,.1,.04),se(i,e.scuro,.012,.012,.17,0,.125,-.04),se(i,e.scuro,.01,.2,.01,.03,-.04,-.6,1.3),se(i,e.scuro,.01,.2,.01,-.03,-.04,-.6,1.3),se(i,e.scuro,.04,.11,.05,0,-.07,.11,.3),yi(i,e,.06),se(i,e.legno,.06,.13,.3,0,-.03,.33,-.08),{bocca:new L(0,.04,-.8),presa:new L(0,-.02,-.3)}},precisione(i,e){se(i,e.legno,.058,.07,.55,0,0,-.06),se(i,e.legno,.05,.13,.3,0,-.04,.32,-.1),se(i,e.legno,.04,.03,.15,0,.035,.28),se(i,e.scuro,.052,.14,.02,0,-.055,.475,-.1),Ft(i,e.ferro,.014,.5,0,.035,-.55),Ft(i,e.scuro,.02,.06,0,.035,-.82),Ft(i,e.scuro,.024,.32,0,.1,-.07),Ft(i,e.scuro,.032,.06,0,.1,-.25),Ft(i,e.scuro,.03,.05,0,.1,.1);const t=new Te(new ds(.027,10),e.vetro);t.position.set(0,.1,-.281),t.rotation.y=Math.PI,i.add(t),se(i,e.scuro,.03,.04,.02,0,.065,-.17),se(i,e.scuro,.03,.04,.02,0,.065,.02);const n=new Te(new Cn(.006,.006,.06,6).rotateZ(Math.PI/2),e.ferro);n.position.set(.045,.03,.08);const r=new Te(new Ci(.012,6,4),e.ferro);return r.position.set(.075,.03,.08),i.add(n,r),yi(i,e,.12),{bocca:new L(0,.035,-.86),presa:new L(0,-.04,-.3)}},raggi(i,e){Ft(i,e.cromo,.035,.2,0,.03,-.08,12);for(const s of[-.03,-.09,-.15]){const o=new Te(new us(.04,.008,4,12),e.energia);o.position.set(0,.03,s),i.add(o)}for(const s of[0,2.1,4.2])se(i,e.cromo,.006,.035,.07,Math.sin(s)*.045,.03+Math.cos(s)*.045,.02,0,0,-s);const t=new Te(new Hc(.06,.08,12,1,!0).rotateX(-Math.PI/2),e.cromo);t.position.set(0,.03,-.21),i.add(t);const n=new Te(new Ci(.018,8,6),e.energia);n.position.set(0,.03,-.2),i.add(n);const r=new Te(new Ci(.03,10,8),e.vetroEnergia);return r.position.set(0,.07,0),i.add(r),se(i,e.scuro,.034,.11,.05,0,-.05,.03,.25),se(i,e.impugnatura,.037,.08,.04,0,-.055,.035,.25),yi(i,e,-.02),se(i,e.cromo,.012,.04,.06,0,.085,-.04),{bocca:new L(0,.03,-.25),presa:new L(-.03,-.07,.04)}},coltello(i,e){return se(i,e.lama,.006,.035,.22,0,0,-.12),se(i,e.lama,.004,.012,.2,0,.022,-.11),se(i,e.ferro,.03,.05,.01,0,0,-.005),se(i,e.impugnatura,.026,.032,.1,0,0,.05),{bocca:new L(0,0,-.23),presa:null}}};function pM(i){return{ferro:new Xe({map:i.metallo}),scuro:new Xe({color:1908514}),foro:new Mt({color:328965}),legno:new Xe({map:i.legnoChiaro}),impugnatura:new Xe({color:3022872}),lama:new Xe({color:13159632}),vetro:new Mt({color:5211832}),pelle:new Xe({color:13145204}),cromo:new Xe({color:13226456}),energia:new Mt({color:4777471}),vetroEnergia:new Mt({color:8319231,transparent:!0,opacity:.75}),manica:new Xe({color:4016691}),ferroPotenziato:new Xe({map:i.metallo,color:13214463,emissive:4854928}),scuroPotenziato:new Xe({color:2822470,emissive:2752608}),legnoPotenziato:new Xe({map:i.legnoChiaro,color:11566335,emissive:3803760}),cromoPotenziato:new Xe({color:14862847,emissive:5906592})}}function mM(i){const e=new bt;se(e,i.pelle,.05,.06,.09,0,-.07,.03);for(let t=0;t<3;t++)se(e,i.pelle,.052,.014,.02,.004,-.045-t*.017,-.012);return se(e,i.pelle,.055,.055,.2,.01,-.11,.14,-.35),se(e,i.manica,.075,.075,.3,.03,-.18,.36,-.35),e}function gM(i){const e=new bt;se(e,i.pelle,.06,.035,.05,-.008,-.022,0);for(let t=0;t<3;t++)se(e,i.pelle,.064,.01,.013,-.006,-.002,-.018+t*.017);return se(e,i.pelle,.038,.038,.08,-.04,-.045,.035,-.6,.8),se(e,i.manica,.06,.06,.36,-.17,-.15,.16,-.6,.8),e}function hs(i,e){const t=new bt,n=i.endsWith("+"),r=n?i.slice(0,-1):i,s=n?{...e,ferro:e.ferroPotenziato,scuro:e.scuroPotenziato,legno:e.legnoPotenziato,cromo:e.cromoPotenziato,impugnatura:e.scuroPotenziato}:e,{bocca:o,presa:a}=dM[r](t,s);return{gruppo:t,bocca:o,presa:a}}const Gn=mc,Ou=.9,zu=2.3,Wr=2.4,_M=Object.freeze([[-4,0,!0,16765594],[4,0,!1,16765594],[0,10,!1,16765594],[0,19,!0,16765594],[12,0,!1,16765594],[20,0,!0,16765594],[-9,13.5,!1,16769968],[-9,20.5,!0,16769968],[3,27,!1,14217471],[22,-10.5,!0,16738880]]),vM=Object.freeze([[17,20,12375295],[10.5,27.5,13163775]]),xM=Object.freeze({banco:"legnoChiaro",tavolo:"legnoChiaro",bancone:"metallo",cavallina:"legno"});function oo(i,e,t,n,r=0){const s=new Kt(i,e,t),o=s.attributes.uv,a=[[t,e],[t,e],[i,t],[i,t],[i,e],[i,e]],c=new Set([0,1,4,5]);for(let l=0;l<6;l++){const u=c.has(l)?r/n:0;for(let h=0;h<4;h++){const f=l*4+h;o.setXY(f,o.getX(f)*a[l][0]/n,o.getY(f)*a[l][1]/n+u)}}return s}function cn(i,e,t,n,r,s=Gn){const o=new Te(oo(t.x1-t.x0,r-n,t.z1-t.z0,s,n),e);return o.position.set((t.x0+t.x1)/2,(n+r)/2,(t.z0+t.z1)/2),i.add(o),o}function pa(i,e,t,n,r,s,o,a,c=!1){const l=new Mn(r-t,s-n).rotateX(c?Math.PI/2:-Math.PI/2),u=l.attributes.uv;for(let f=0;f<u.count;f++)u.setXY(f,u.getX(f)*(r-t)/a,u.getY(f)*(s-n)/a);const h=new Te(l,e);return h.position.set((t+r)/2,o,(n+s)/2),i.add(h),h}const MM={pompa:i=>{i.rect(14,18,88,8),i.rect(90,22,26,14),i.rect(34,26,22,6)},precisione:i=>{i.rect(8,20,100,6),i.rect(40,10,34,8),i.rect(96,22,24,14),i.rect(70,26,6,10)},mitra:i=>{i.rect(30,14,60,14),i.rect(48,28,8,16),i.rect(76,28,8,10),i.rect(18,18,12,4)},assalto:i=>{i.rect(14,16,70,10),i.rect(84,16,30,14),i.rect(50,26,8,16),i.rect(70,26,6,8)}};function Xr(i,e){i.rotation.y=Math.atan2(e.x,e.z)}function SM(i,e,t){const n={muro:new Xe({map:e.muro}),soffitto:new Xe({map:e.soffitto}),piastrelle:new Xe({map:e.piastrelle}),parquet:new Xe({map:e.parquet}),legno:new Xe({map:e.legno}),legnoChiaro:new Xe({map:e.legnoChiaro}),porta:new Xe({map:e.porta}),armadietti:new Xe({map:e.armadietti}),terra:new Xe({map:e.terra}),linoleum:new Xe({map:e.linoleum}),cemento:new Xe({map:e.cemento}),asfalto:new Xe({map:e.asfalto}),rete:new Xe({map:e.rete,transparent:!0,alphaTest:.4,side:Sn}),palo:new Xe({color:5922918}),pulmino:new Xe({map:e.pulmino}),corteccia:new Xe({map:e.corteccia}),fogliame:new Xe({map:e.fogliame}),metallo:new Xe({map:e.metallo}),cornice:new Xe({color:2825488})},r=Mf(77);pa(i,n.terra,-60,-60,80,80,-.02,4);for(const w of gc)pa(i,n[w.pavimento],w.x0,w.z0,w.x1,w.z1,0,w.aperto?4:2),w.aperto||pa(i,n.soffitto,w.x0,w.z0,w.x1,w.z1,Gn,2,!0);for(const w of _c)cn(i,n.muro,w,0,Gn);for(const w of ch){cn(i,n.rete,w,0,vs,1);const j=Math.max(w.x1-w.x0,w.z1-w.z0);for(let k=0;k<=j;k+=3){const Z=new Te(new Cn(.05,.05,vs+.2,5),n.palo);Z.position.set(w.x1-w.x0>w.z1-w.z0?w.x0+k:(w.x0+w.x1)/2,(vs+.2)/2,w.x1-w.x0>w.z1-w.z0?(w.z0+w.z1)/2:w.z0+k),i.add(Z)}}const s=new Te(new ds(6,16),new Mt({color:14674165,fog:!1}));s.position.set(-60,70,120),s.lookAt(0,0,0),i.add(s);const o=new Map;for(const w of Yn){const j=w.recinzione?.15:Ou,k=w.recinzione?vs-.2:zu;w.recinzione||(cn(i,n.muro,w.scatola,0,Ou),cn(i,n.muro,w.scatola,zu,Gn));const Z=w.asse==="z"?w.scatola.x1-w.scatola.x0:w.scatola.z1-w.scatola.z0,Q=[];for(let ae=0;ae<ue.ASSE_PER_FINESTRA;ae++){const xe=new Te(oo(Z+.35,.17,.05,1),n.legno),ve=j+.15+ae*(k-j-.3)/(ue.ASSE_PER_FINESTRA-1);xe.position.set(w.centro.x+w.fuori.x*.2,ve,w.centro.z+w.fuori.z*.2),xe.rotation.y=w.asse==="z"?0:Math.PI/2,xe.rotation.z=(r()-.5)*.5,i.add(xe),Q.push(xe)}o.set(w.id,Q)}const a=new Map;for(const w of Ni){cn(i,n.muro,w.scatola,Wr,Gn);const j=cn(i,n.porta,w.scatola,0,Wr,Wr);a.set(w.id,{anta:j,apertura:0})}for(const w of vc)if(w.tipo==="tribuna")for(let j=0;j<3;j++){const k=(w.z1-w.z0)/3;cn(i,n.legnoChiaro,{x0:w.x0,x1:w.x1,z0:w.z1-k*(j+1),z1:w.z1-k*j},0,w.altezza*((3-j)/3),1)}else if(w.tipo==="albero"){const j=(w.x0+w.x1)/2,k=(w.z0+w.z1)/2,Z=new Te(new Cn(.22,.3,2.4,6),n.corteccia);Z.position.set(j,1.2,k);const Q=new Te(new Wc(1.8,0),n.fogliame);Q.position.set(j,3.6,k),Q.scale.set(1,1.2,1),i.add(Z,Q)}else if(w.tipo==="pulmino"){cn(i,n.pulmino,w,.4,w.altezza,3);for(const[j,k]of[[.8,0],[w.x1-w.x0-.8,0],[.8,w.z1-w.z0],[w.x1-w.x0-.8,w.z1-w.z0]]){const Z=new Te(new Cn(.42,.42,.3,10).rotateX(Math.PI/2),n.palo);Z.position.set(w.x0+j,.42,w.z0+k),i.add(Z)}}else if(w.tipo==="lampione")cn(i,n.palo,w,0,w.altezza+1.5,1);else if(w.tipo==="panchina")cn(i,n.legno,w,.3,w.altezza,1);else if(w.tipo==="caldaia"){const j=Math.min(w.x1-w.x0,w.z1-w.z0)/2,k=new Te(new Cn(j,j,w.altezza,10),n.metallo);k.position.set((w.x0+w.x1)/2,w.altezza/2,(w.z0+w.z1)/2);const Z=new Te(new Cn(.15,.15,Gn-w.altezza,6),n.metallo);Z.position.set(k.position.x,w.altezza+(Gn-w.altezza)/2,k.position.z);const Q=new Te(new Mn(.5,.3),new Mt({color:16734746}));Q.position.set(k.position.x+j+.01,.6,k.position.z),Q.rotation.y=Math.PI/2,i.add(k,Z,Q)}else cn(i,n[xM[w.tipo]??"legno"],w,0,w.altezza,1);for(const[w,j,k,Z]of[[-1.85,-1.7,6.6,9.3],[-1.85,-1.7,10.8,16.4],[1.7,1.85,6.6,12.4],[1.7,1.85,15.6,21.4]])cn(i,n.armadietti,{x0:w,x1:j,z0:k,z1:Z},0,1.9,1.9);const c=new Te(new Mn(2.4,1.2),new Xe({map:e.lavagna}));c.position.set(4,1.6,5.83),c.rotation.y=Math.PI,i.add(c);for(const w of ci){const{x:j,z:k}=w.posizione;if(w.tipo==="arma"){const Z=new Te(new Mn(1.4,.7),new Mt({map:fM(MM[w.arma],[Tt[w.arma].nome.toUpperCase(),`${w.costo}`]),transparent:!0}));Z.position.set(j+w.verso.x*.01,1.5,k+w.verso.z*.01),Xr(Z,w.verso),i.add(Z)}else if(w.tipo==="bevanda"){const Z=Di[w.bevanda],Q=new bt,ae=new Te(new Kt(.95,2,.65),new Xe({color:new we(Z.colore).multiplyScalar(.45)}));ae.position.y=1;const xe=new Te(new Mn(.8,1.2),new Mt({map:so([Z.nome.split(" ")[0].toUpperCase(),Z.nome.split(" ")[1].toUpperCase(),`${Z.costo}`],{larghezza:64,altezza:96,sfondo:`#${Z.colore.toString(16).padStart(6,"0")}`,font:"bold 12px monospace",bordo:"#111"})}));xe.position.set(0,1.2,.33),Q.add(ae,xe),Q.position.set(j,0,k),Xr(Q,w.verso),i.add(Q)}}const l=ci.find(w=>w.tipo==="interruttore"),u=new bt,h=new Te(new Kt(.6,.8,.15),n.metallo),f=new Te(new Kt(.08,.35,.08),new Xe({color:12067867}));f.position.set(0,.12,.12);const d=new Te(new Ci(.05,8,6),new Mt({color:12067867}));d.position.set(.2,.3,.09),u.add(h,f,d),u.position.set(l.posizione.x,1.4,l.posizione.z),Xr(u,l.verso),i.add(u);const g=ci.find(w=>w.tipo==="potenziatore"),v=new bt,m=new Te(new Kt(1.6,1.9,1.15),new Xe({map:e.metallo,color:9406120}));m.position.y=.95;const p=new Te(new Mn(1.2,.45),new Mt({map:so(["POTENZIATORE",`${ue.COSTO_POTENZIA}`],{larghezza:128,altezza:48,sfondo:"#1a0b2e",colore:"#d6b8ff",font:"bold 12px monospace",bordo:"#7d3cff"})}));p.position.set(0,1.55,.58);const _=new Te(new us(.35,.04,6,18),new Mt({color:3809376}));_.position.set(0,.9,.6);const M=new Ii(10771711,0,5,1.5);M.position.set(0,1.4,1),v.add(m,p,_,M),v.position.set(g.posizione.x,0,g.posizione.z),Xr(v,g.verso),i.add(v);const x=new Map;let C=null;const b=ci.find(w=>w.tipo==="cassa"),T=new bt,P=new Te(oo(1.1,.55,.6,.6),n.legnoChiaro);P.position.y=.28;const A=new bt;A.position.set(0,.56,-.3);const S=new Te(oo(1.12,.08,.62,.6),n.legnoChiaro);S.position.set(0,0,.3),A.add(S);const D=new Te(new Mn(.4,.4),new Mt({map:so(["?"],{larghezza:32,altezza:32,colore:"#7dd3fc",font:"bold 28px monospace"}),transparent:!0}));D.position.set(0,.3,.31);const H=new Ii(8246268,0,4,1.5);H.position.set(0,1,.3),T.add(P,A,D,H),T.position.set(b.posizione.x,0,b.posizione.z),Xr(T,b.verso),i.add(T);const I=new Map;let F=null;const Y=_M.map(([w,j,k,Z])=>{const Q=new Ii(Z,9,13,1.6);Q.position.set(w,Gn-.4,j);const ae=new Te(new Kt(1.2,.06,.3),new Mt({color:16773583}));return ae.position.set(w,Gn-.04,j),i.add(Q,ae),{luce:Q,plafoniera:ae,tremola:k,base:9}});for(const[w,j,k]of vM){const Z=new Ii(k,24,22,1.3);Z.position.set(w,4.3,j);const Q=new Te(new Kt(.5,.15,.5),new Mt({color:15266047}));Q.position.set(w,4.55,j),i.add(Z,Q)}return{aggiorna(w,j,k){for(const ve of Yn)o.get(ve.id).forEach((q,ne)=>{q.visible=ne<w.finestre[ve.id]});for(const ve of Ni){const q=a.get(ve.id);w.porte.has(ve.id)&&(q.apertura=Math.min(1,q.apertura+j*1.5)),q.anta.position.y=Wr/2+q.apertura*Wr,q.anta.visible=q.apertura<1}for(const ve of Y){const q=ve.tremola&&Math.sin(k*13.7+ve.luce.position.x)>.93;ve.luce.intensity=q?.6:ve.base,ve.plafoniera.material.color.setHex(q?2762272:16773583)}f.rotation.x=cc.lerp(f.rotation.x,w.corrente?-2.4:0,Math.min(1,j*5)),d.material.color.setHex(w.corrente?3997546:12067867);const Z=w.potenziatore.stato==="lavora";_.material.color.setHex(w.corrente?Z?14725375:10771711:3809376),_.rotation.z+=j*(Z?9:w.corrente?1:0),M.intensity=w.corrente?Z?6+Math.sin(k*20)*3:2.5:0;const Q=w.potenziatore.stato==="pronta"?w.potenziatore.arma:null;if(C!==Q){if(x.forEach(ve=>{ve.visible=!1}),Q){if(!x.has(Q)){const{gruppo:ve}=hs(Q,t);ve.scale.setScalar(1.2),v.add(ve),x.set(Q,ve)}x.get(Q).visible=!0}C=Q}if(Q){const ve=x.get(Q);ve.position.set(0,2.25+Math.sin(k*2)*.05,.2),ve.rotation.y=k*1.8}const ae=w.cassa.stato==="aperta";A.rotation.x=cc.lerp(A.rotation.x,ae?-1.3:0,Math.min(1,j*6)),H.intensity=ae?3+Math.sin(k*6):.6;const xe=ae?w.cassa.arma:null;if(F!==xe){if(I.forEach(ve=>{ve.visible=!1}),xe){if(!I.has(xe)){const{gruppo:ve}=hs(xe,t);ve.scale.setScalar(1.15),T.add(ve),I.set(xe,ve)}I.get(xe).visible=!0}F=xe}if(xe){const ve=I.get(xe);ve.position.set(0,1.15+Math.sin(k*2)*.05,0),ve.rotation.y=k*1.5}}}}function Fu(i,e){if(e===Hp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===oc||e===Gh){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===oc)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class yM extends Ir{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new wM(t)}),this.register(function(t){return new RM(t)}),this.register(function(t){return new zM(t)}),this.register(function(t){return new FM(t)}),this.register(function(t){return new BM(t)}),this.register(function(t){return new IM(t)}),this.register(function(t){return new PM(t)}),this.register(function(t){return new LM(t)}),this.register(function(t){return new DM(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new NM(t)}),this.register(function(t){return new CM(t)}),this.register(function(t){return new OM(t)}),this.register(function(t){return new UM(t)}),this.register(function(t){return new EM(t)}),this.register(function(t){return new kM(t)}),this.register(function(t){return new VM(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Jr.extractUrlBase(e);o=Jr.resolveURL(l,this.path)}else o=Jr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new _f(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Sf){try{o[We.KHR_BINARY_GLTF]=new HM(e)}catch(h){r&&r(h);return}s=JSON.parse(o[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new tS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case We.KHR_MATERIALS_UNLIT:o[h]=new bM;break;case We.KHR_DRACO_MESH_COMPRESSION:o[h]=new GM(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:o[h]=new WM;break;case We.KHR_MESH_QUANTIZATION:o[h]=new XM;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function AM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class EM{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new we(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],qt);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new qc(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ii(u),l.distance=h;break;case"spot":l=new xf(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Wn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class bM{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return Mt}extendParams(e,t,n){const r=[];e.color=new we(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],qt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,wt))}return Promise.all(r)}}class TM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class wM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Le(a,a)}return Promise.all(s)}}class RM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class CM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class IM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],qt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,wt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class PM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class LM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(a[0],a[1],a[2],qt),Promise.all(s)}}class DM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class NM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(a[0],a[1],a[2],qt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,wt)),Promise.all(s)}}class UM{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class OM{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Ln}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class zM{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class FM{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class BM{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class kM{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,r.mode,r.filter),d})})}else return null}}class VM{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const l of r.primitives)if(l.mode!==ln.TRIANGLES&&l.mode!==ln.TRIANGLE_STRIP&&l.mode!==ln.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const v=new ze,m=new L,p=new bn,_=new L(1,1,1),M=new Lx(g.geometry,g.material,f);for(let x=0;x<f;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&_.fromBufferAttribute(c.SCALE,x),M.setMatrixAt(x,v.compose(m,p,_));for(const x in c)if(x==="_COLOR_0"){const C=c[x];M.instanceColor=new uc(C.array,C.itemSize,C.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);ft.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Sf="glTF",jr=12,Bu={JSON:1313821514,BIN:5130562};class HM{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,jr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Sf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-jr,s=new DataView(e,jr);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Bu.JSON){const l=new Uint8Array(e,jr+o,a);this.content=n.decode(l)}else if(c===Bu.BIN){const l=jr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class GM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=dc[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=dc[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=pr[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){r.decodeDracoFile(u,function(d){for(const g in d.attributes){const v=d.attributes[g],m=c[g];m!==void 0&&(v.normalized=m)}h(d)},a,l,qt,f)})})}}class WM{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class XM{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class yf extends ps{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,v=g-l,m=-2*d+3*f,p=d-f,_=1-m,M=p-f+h;for(let x=0;x!==a;x++){const C=o[v+x+a],b=o[v+x+c]*u,T=o[g+x+a],P=o[g+x]*u;s[x]=_*C+M*b+m*T+p*P}return s}}const jM=new bn;class qM extends yf{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return jM.fromArray(s).normalize().toArray(s),s}}const ln={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},pr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ku={9728:St,9729:nn,9984:Lh,9985:Js,9986:qr,9987:Xn},Vu={33071:li,33648:_o,10497:Ui},ma={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},YM={CUBICSPLINE:void 0,LINEAR:as,STEP:os},ga={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function KM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Xc({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Kn})),i.DefaultMaterial}function Ai(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Wn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ZM(i,e,t){let n=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(r){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function $M(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function JM(i){let e;const t=i.extensions&&i.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+_a(t.attributes):e=i.indices+":"+_a(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+_a(i.targets[n]);return e}function _a(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function pc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function QM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const eS=new ze;class tS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new AM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new qx(this.options.manager):this.textureLoader=new $x(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _f(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Ai(s,a,r),Wn(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(Jr.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=ma[r.type],a=pr[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new jt(l,o,c))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=ma[r.type],l=pr[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let v,m;if(d&&d!==h){const p=Math.floor(f/d),_="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let M=t.cache.get(_);M||(v=new l(a,p*d,r.count*d/u),M=new lf(v,d/u),t.cache.add(_,M)),m=new ls(M,c,f%d/u,g)}else a===null?v=new l(r.count*c):v=new l(a,f,r.count*c),m=new jt(v,c,g);if(r.sparse!==void 0){const p=ma.SCALAR,_=pr[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,x=r.sparse.values.byteOffset||0,C=new _(o[1],M,r.sparse.count*p),b=new l(o[2],x,r.sparse.count*c);a!==null&&(m=new jt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,P=C.length;T<P;T++){const A=C[T];if(m.setX(A,b[T*c]),c>=2&&m.setY(A,b[T*c+1]),c>=3&&m.setZ(A,b[T*c+2]),c>=4&&m.setW(A,b[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=ku[f.magFilter]||nn,u.minFilter=ku[f.minFilter]||Xn,u.wrapS=Vu[f.wrapS]||Ui,u.wrapT=Vu[f.wrapT]||Ui,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==St&&u.minFilter!==nn,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=r.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(v){const m=new Rt(v);m.needsUpdate=!0,f(m)}),t.load(Jr.resolveURL(h,s.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Wn(h,o),h.userData.mimeType=o.mimeType||QM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new df,pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new kc,pn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Xc}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[We.KHR_MATERIALS_UNLIT]){const h=r[We.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],qt),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,wt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Sn);const u=s.alphaMode||ga.OPAQUE;if(u===ga.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ga.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Le(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==Mt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Mt){const h=s.emissiveFactor;a.emissive=new we().setRGB(h[0],h[1],h[2],qt)}return s.emissiveTexture!==void 0&&o!==Mt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,wt)),Promise.all(l).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Wn(h,s),t.associations.set(h,{materials:e}),s.extensions&&Ai(r,h,s),h})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Hu(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=JM(l),h=r[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[We.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=Hu(new Dt,l,t),r[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?KM(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const v=u[d],m=o[d];let p;const _=l[d];if(m.mode===ln.TRIANGLES||m.mode===ln.TRIANGLE_STRIP||m.mode===ln.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Cx(v,_):new Te(v,_),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===ln.TRIANGLE_STRIP?p.geometry=Fu(p.geometry,Gh):m.mode===ln.TRIANGLE_FAN&&(p.geometry=Fu(p.geometry,oc));else if(m.mode===ln.LINES)p=new Dx(v,_);else if(m.mode===ln.LINE_STRIP)p=new Ro(v,_);else if(m.mode===ln.LINE_LOOP)p=new Nx(v,_);else if(m.mode===ln.POINTS)p=new Ux(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&$M(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Wn(p,s),m.extensions&&Ai(r,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&Ai(r,h[0],s),h[0];const f=new bt;s.extensions&&Ai(r,f,s),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ht(cc.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Uc(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Wn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new ze;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Bc(a,c)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=r.channels.length;h<f;h++){const d=r.channels[h],g=r.samplers[d.sampler],v=d.target,m=v.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,_=r.parameters!==void 0?r.parameters[g.output]:g.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",_)),l.push(g),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],v=h[3],m=h[4],p=[];for(let _=0,M=f.length;_<M;_++){const x=f[_],C=d[_],b=g[_],T=v[_],P=m[_];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const A=n._createAnimationTracks(x,C,b,T,P);if(A)for(let S=0;S<A.length;S++)p.push(A[S])}return new fc(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,eS)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new hf:l.length>1?u=new bt:l.length===1?u=l[0]:u=new ft,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=o),Wn(u,s),s.extensions&&Ai(n,u,s),s.matrix!==void 0){const h=new ze;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new bt;n.name&&(s.name=r.createUniqueName(n.name)),Wn(s,n),n.extensions&&Ai(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of r.associations)(f instanceof pn||f instanceof Rt)&&h.set(f,d);return u.traverse(f=>{const d=r.associations.get(f);d!=null&&h.set(f,d)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,c=[];oi[s.path]===oi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(oi[s.path]){case oi.weights:l=Er;break;case oi.rotation:l=br;break;case oi.position:case oi.scale:l=Tr;break;default:switch(n.itemSize){case 1:l=Er;break;case 2:case 3:default:l=Tr;break}break}const u=r.interpolation!==void 0?YM[r.interpolation]:as,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+oi[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=pc(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof br?qM:yf;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function nS(i,e,t){const n=e.attributes,r=new $n;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){const u=pc(pr[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new L,c=new L;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const v=pc(pr[f.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new Pn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function Hu(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=dc[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return je.workingColorSpace!==qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),Wn(i,e),nS(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?ZM(i,e.targets,t):i})}function iS(i){const e=new Map,t=new Map,n=i.clone();return Af(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Af(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Af(i.children[n],e.children[n],t)}const rS=.01,sS=.25,Gu=2.6,ao=Object.freeze([{tinta:16777215,scala:1},{tinta:11126682,scala:.95},{tinta:14271427,scala:1.06},{tinta:9076600,scala:1.02}]),oS=Object.freeze({cammina:1,cammina2:.9,corre:1.05,attacco:1.6,attacco2:1.7,muore:1.2,fermo:1,urla:1.3});async function aS(i){const e=await new yM().loadAsync(i);e.scene.traverse(n=>{if(n.isMesh){n.frustumCulled=!1;for(const r of[].concat(n.material))r.map&&(r.map.magFilter=St,r.map.minFilter=St,r.map.generateMipmaps=!1,r.map.needsUpdate=!0)}});const t=ao.map(n=>{const r=new Map;return e.scene.traverse(s=>{if(s.isMesh)for(const o of[].concat(s.material)){if(r.has(o))continue;const a=o.clone();a.color=new we(n.tinta),r.set(o,a)}}),r});return{modello:e.scene,clip:new Map(e.animations.map(n=>[n.name,n])),materialiVariante:t}}function cS(i,e,t){return i.stato==="morto"?"muore":i.stato==="assi"?"attacco":i.stato==="attacco"?"attacco2":i.stato==="dentro"&&!t?"fermo":i.corre?"corre":i.variante%2?"cammina2":"cammina"}function lS(i,e){const t=new Map;function n(o){const a=new bt,c=iS(e.modello),l=ao[o.variante%ao.length];c.scale.setScalar(rS*l.scala),c.rotation.y=0;const u=e.materialiVariante[o.variante%ao.length];c.traverse(v=>{v.isMesh&&(v.material=Array.isArray(v.material)?v.material.map(m=>u.get(m)??m):u.get(v.material)??v.material)}),a.add(c),i.add(a);let h=null;c.traverse(v=>{!h&&v.isBone&&/Head$/.test(v.name)&&(h=v)});const f=new uM(c),d=new Map;for(const[v,m]of e.clip){const p=f.clipAction(m);p.timeScale=oS[v]??1,v==="muore"&&(p.setLoop(Hh,1),p.clampWhenFinished=!0),d.set(v,p)}const g={radice:a,corpo:c,testa:h,mixer:f,azioni:d,attuale:null,ultimaPosizione:new Le(o.x,o.z),tempoMorto:0,fase:Math.random()*3};return t.set(o.id,g),g}function r(o,a){if(o.attuale===a)return;const c=o.azioni.get(a);if(!c)return;const l=o.azioni.get(o.attuale);c.reset(),a!=="muore"&&(c.time=o.fase),c.play(),l&&l.crossFadeTo(c,sS,!1),o.attuale=a}function s(o){const a=t.get(o);a&&(i.remove(a.radice),a.mixer.stopAllAction(),a.mixer.uncacheRoot(a.corpo),a.corpo.traverse(c=>{var l;return(l=c.skeleton)==null?void 0:l.dispose()}),t.delete(o))}return{aggiorna(o,a){const c=new Set;for(const l of o.zombie){c.add(l.id);const u=t.get(l.id)??n(l),h=Math.hypot(l.x-u.ultimaPosizione.x,l.z-u.ultimaPosizione.y);u.ultimaPosizione.set(l.x,l.z);const f=h>.2*a;r(u,cS(l,u,f)),u.radice.position.set(l.x,0,l.z),u.radice.rotation.y=l.yaw,l.stato==="morto"&&(u.tempoMorto+=a,u.tempoMorto>Gu&&(u.radice.position.y=-(u.tempoMorto-Gu)*.6)),u.mixer.update(a)}for(const l of[...t.keys()])c.has(l)||s(l)},bersagli(o){const a=new L;return o.zombie.filter(c=>c.stato!=="morto").map(c=>{const l=t.get(c.id);return l!=null&&l.testa?(l.testa.getWorldPosition(a),{id:c.id,x:c.x,z:c.z,testa:{x:a.x,y:a.y+.06,z:a.z}}):{id:c.id,x:c.x,z:c.z,testa:{x:c.x,y:ya.altezza,z:c.z}}})},posizioneTesta(o){const a=t.get(o);return a!=null&&a.testa?a.testa.getWorldPosition(new L):null},svuota(){for(const o of[...t.keys()])s(o)}}}function Ei(i,e,t,n,r,s,o,a){const c=new Te(new Kt(e,t,n),new Xe({color:r}));return c.position.set(s,o,a),i.add(c),c}function Wu(i,e){const t=new Fc(new wo({map:so([i],{larghezza:128,altezza:32,colore:e,font:"bold 16px monospace"}),depthTest:!1,transparent:!0}));return t.scale.set(1.4,.35,1),t.renderOrder=20,t}function uS(i,e,t){const n=new bt,r=new bt;n.add(r);const s=[Ei(r,.17,.85,.2,3885615,.12,.43,0),Ei(r,.17,.85,.2,3885615,-.12,.43,0)];Ei(r,.48,.62,.28,5991237,0,1.18,0),Ei(r,.3,.3,.3,13804156,0,1.66,0),Ei(r,.32,.1,.32,3095076,0,1.83,0);const o=new bt;o.position.set(0,1.42,0),Ei(o,.12,.12,.5,5991237,.2,0,.22),Ei(o,.12,.12,.5,5991237,-.12,0,.3),r.add(o);const a=new Map;let c=null;const l=Wu(e,"#e8f4ff");l.position.y=2.15;const u=Wu(`▼ ${e} A TERRA`,"#ff5a4e");u.position.y=1.4,u.visible=!1,n.add(l,u),i.add(n);let h=0;return{aggiorna(f,d){n.visible=f.stato!=="morto",n.position.set(f.x,0,f.z),n.rotation.y=f.yaw;const g=f.stato==="terra";if(r.rotation.x=g?-Math.PI/2+.2:0,r.position.y=g?.25:0,l.visible=!g,u.visible=g,o.rotation.x=-f.pitch,h+=d*9,s[0].rotation.x=Math.sin(h)*.4*(f.inMovimento?1:0),s[1].rotation.x=-s[0].rotation.x,c!==f.armaAttiva){if(a.forEach(v=>{v.visible=!1}),!a.has(f.armaAttiva)){const{gruppo:v}=hs(f.armaAttiva,t);v.rotation.y=Math.PI,v.position.set(.05,-.02,.45),o.add(v),a.set(f.armaAttiva,v)}a.get(f.armaAttiva).visible=!0,c=f.armaAttiva}},chiudi(){i.remove(n);const f=new Set(Object.values(t));n.traverse(d=>{var g,v;(g=d.geometry)==null||g.dispose(),!(!d.material||f.has(d.material))&&((v=d.material.map)==null||v.dispose(),d.material.dispose())})}}}const hS=220,fS=50;function dS(){const i=document.createElement("canvas");i.width=i.height=16;const e=i.getContext("2d");e.fillStyle="#fff",e.fillRect(4,4,8,8),e.fillRect(2,6,12,4),e.fillRect(6,2,4,12);const t=new Vc(i);return t.magFilter=St,t.minFilter=St,t}const pS={sangue:{colore:9047309,vita:.6,gravita:-7,dimensione:.12,sparsa:2.4,additivo:!1},scintilla:{colore:16765562,vita:.25,gravita:-2,dimensione:.07,sparsa:3,additivo:!0},polvere:{colore:9208432,vita:.7,gravita:.4,dimensione:.18,sparsa:.8,additivo:!1},legno:{colore:7031339,vita:.9,gravita:-8,dimensione:.1,sparsa:2.5,additivo:!1},energia:{colore:6285823,vita:.45,gravita:.5,dimensione:.28,sparsa:4,additivo:!0}},Xu=.14,ju=.18,mS=25;function gS(i){const e=dS(),t=[],n=[];for(let h=0;h<hS;h++){const f=new Fc(new wo({map:e,transparent:!0,depthWrite:!1}));f.visible=!1,i.add(f),t.push({sprite:f,velocita:new L,vita:0,durata:1,tipo:null})}const r=[],s=new Ii(6285823,0,9,1.4);i.add(s);let o=0;const a=[],c=new ds(.35,6).rotateX(-Math.PI/2),l=new Mt({color:4851206,transparent:!0,opacity:.85,depthWrite:!1});function u(h,f,d,g=null){const v=pS[h];for(let m=0;m<d&&t.length;m++){const p=t.pop();p.tipo=v,p.vita=0,p.durata=v.vita*(.6+Math.random()*.8),p.velocita.set((Math.random()-.5)*v.sparsa,Math.random()*v.sparsa*.6,(Math.random()-.5)*v.sparsa),g&&p.velocita.addScaledVector(g,v.sparsa*.6),p.sprite.position.copy(f),p.sprite.material.color.setHex(v.colore),p.sprite.material.blending=v.additivo?rs:Pi,p.sprite.scale.setScalar(v.dimensione),p.sprite.visible=!0,n.push(p)}}return{sangue(h,f){u("sangue",h,10,f)},impatto(h){u("scintilla",h,5),u("polvere",h,3)},schegge(h){u("legno",h,10)},raggio(h,f){const d=new Dt().setFromPoints([h,f]),g=new Ro(d,new kc({color:8319231,transparent:!0,blending:rs}));i.add(g),r.push({linea:g,vita:Xu})},esplosione(h){u("energia",h,22),s.position.copy(h),o=ju},macchia(h,f){const d=a.length>=fS?a.shift():new Te(c,l);d.position.set(h+(Math.random()-.5)*.4,.012+a.length*1e-4,f+(Math.random()-.5)*.4),d.scale.setScalar(.6+Math.random()*.8),i.add(d),a.push(d)},aggiorna(h){o=Math.max(0,o-h),s.intensity=mS*(o/ju);for(let f=r.length-1;f>=0;f--){const d=r[f];d.vita-=h,d.linea.material.opacity=Math.max(0,d.vita/Xu),!(d.vita>0)&&(i.remove(d.linea),d.linea.geometry.dispose(),d.linea.material.dispose(),r.splice(f,1))}for(let f=n.length-1;f>=0;f--){const d=n[f];if(d.vita+=h,d.vita>=d.durata||d.sprite.position.y<0){d.sprite.visible=!1,n.splice(f,1),t.push(d);continue}d.velocita.y+=d.tipo.gravita*h,d.sprite.position.addScaledVector(d.velocita,h),d.sprite.material.opacity=1-d.vita/d.durata}},svuota(){for(const h of n.splice(0))h.sprite.visible=!1,t.push(h);for(const h of a.splice(0))i.remove(h)}}}const qu=new L(.17,-.17,-.36),_S=new L(0,-.075,-.3),vS=.05;function xS(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d");e.fillStyle="#fff3c4";for(let n=0;n<8;n++){const r=n/8*Math.PI*2;e.beginPath(),e.moveTo(16,16),e.lineTo(16+Math.cos(r)*15,16+Math.sin(r)*15),e.lineTo(16+Math.cos(r+.3)*6,16+Math.sin(r+.3)*6),e.fill()}const t=new Vc(i);return t.magFilter=St,t}function MS(i){const e=new cf,t=new Ht(60,1,.01,10);e.add(new vf(13227752,3155484,1.6));const n=new qc(16773328,1.2);n.position.set(1,2,1),e.add(n);const r=new bt;r.add(mM(i));const s=gM(i);r.add(s),e.add(r);const o=new Map,a=new Fc(new wo({map:xS(),blending:rs,transparent:!0,depthTest:!1}));a.scale.setScalar(.18),a.visible=!1,r.add(a);const c=hs("coltello",i);c.gruppo.visible=!1,e.add(c.gruppo);let l=null,u=0,h=0,f=0;const d=qu.clone();function g(v){if(l===v)return;if(o.forEach(p=>{p.gruppo.visible=!1}),!o.has(v)){const p=hs(v,i);r.add(p.gruppo),o.set(v,p)}const m=o.get(v);m.gruppo.visible=!0,a.position.copy(m.bocca),s.visible=m.presa!==null,m.presa&&s.position.copy(m.presa),l=v}return{scena:e,camera:t,mostra:g,spara(){u=1,h=vS,a.material.rotation=Math.random()*Math.PI},get lampoAcceso(){return h>0},aggiorna({dt:v,movimento:m,mira:p,ricarica:_,cambio:M,coltellata:x,corsa:C}){f+=v*(C?14:9)*m,u=Math.max(0,u-v*9),h=Math.max(0,h-v),a.visible=h>0;const b=p?_S:qu;d.lerp(b,Math.min(1,v*14));const T=p?.2:1;if(r.position.set(d.x+Math.cos(f)*.012*m*T,d.y+Math.abs(Math.sin(f))*.014*m*T-_*.25-M*.3-(C?.04:0),d.z+u*.05),r.rotation.set(u*.12+_*.8,(C?.5:0)+(p?0:.06),_*.4),c.gruppo.visible=x>0,x>0){const P=1-x;c.gruppo.position.set(.25-P*.45,-.18+Math.sin(P*Math.PI)*.06,-.4),c.gruppo.rotation.set(0,-.6+P*1.4,-.4)}},nascondi(v){r.visible=!v}}}const Yu=3,va=395275,Ku=72,SS=52,yS=20,AS="./modelli/zombie.glb",ES=725794,bS=24,TS=40,wS=(i,e)=>gc.some(t=>t.aperto&&i>=t.x0&&i<=t.x1&&e>=t.z0&&e<=t.z1);async function RS(i){const e=new wx({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(1),e.outputColorSpace=wt,e.autoClear=!1,i.appendChild(e.domElement);const t=new cf;t.background=new we(va),t.fog=new zc(va,3,24),t.add(new vf(8359587,1774863,.55));const n=new qc(7375032,.6);n.position.set(-20,30,-30),t.add(n);const r=new Ht(Ku,1,.05,120);r.rotation.order="YXZ";const s=new xf(16773328,28,24,.45,.55,1.3);s.position.set(.15,-.1,0);const o=new ft;o.position.set(0,0,-1),s.target=o;const a=new Ii(16761466,0,9,1.5);r.add(s,o,a),t.add(r);const c=hM(),l=pM(c),u=SM(t,c,l),h=lS(t,await aS(AS)),f=gS(t),d=MS(l),g=new Map,v=new Map;let m=0,p=0;function _(){const b=Math.max(1,Math.floor(i.clientWidth/Yu)),T=Math.max(1,Math.floor(i.clientHeight/Yu));e.setSize(b,T,!1),r.aspect=b/T,r.updateProjectionMatrix(),d.camera.aspect=b/T,d.camera.updateProjectionMatrix()}const M=new ResizeObserver(_);M.observe(i),_();function x(b,T,P){const A=new Set;for(const S of b.giocatori){if(S.id===T)continue;A.add(S.id),g.has(S.id)||g.set(S.id,uS(t,S.nome,l));const D=v.get(S.id)??S;v.set(S.id,{x:S.x,z:S.z}),g.get(S.id).aggiorna({...S,inMovimento:Math.hypot(S.x-D.x,S.z-D.z)>.5*P},P)}for(const[S,D]of g)A.has(S)||(D.chiudi(),g.delete(S))}function C(b,{io:T,mioId:P,dt:A,arma:S,movimento:D,corsa:H,inMira:I,cannocchiale:F,ricarica:Y,cambio:w,coltellata:j,aTerra:k,morto:Z}){m+=A,p+=A*D*(H?13:9);const Q=k?.45:ue.ALTEZZA_OCCHI;r.position.set(T.x,Q+Math.sin(p)*.035*D,T.z),r.rotation.y=T.yaw+Math.PI,r.rotation.x=T.pitch,r.rotation.z=k?.35:0;const ae=F?yS:I?SS:Ku;Math.abs(r.fov-ae)>.1&&(r.fov+=(ae-r.fov)*Math.min(1,A*14),r.updateProjectionMatrix()),a.intensity=d.lampoAcceso?14:0;const xe=wS(T.x,T.z),ve=Math.min(1,A*2);t.fog.far+=((xe?TS:bS)-t.fog.far)*ve,t.fog.color.lerp(new we(xe?ES:va),ve),t.background.copy(t.fog.color),u.aggiorna(b,A,m),h.aggiorna(b,A),x(b,P,A),f.aggiorna(A),d.mostra(S),d.nascondi(k||Z||F),d.aggiorna({dt:A,movimento:D,mira:I,ricarica:Y,cambio:w,coltellata:j,corsa:H}),e.clear(),e.render(t,r),e.clearDepth(),e.render(d.scena,d.camera)}return{disegna:C,camera:r,spara:()=>d.spara(),raggio(b){const T=new L(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position);f.raggio(T,new L(b.x,b.y,b.z))},bersagli:b=>h.bersagli(b),effetti:f,svuota(){h.svuota(),f.svuota();for(const b of g.values())b.chiudi();g.clear(),v.clear()},chiudi(){M.disconnect(),e.dispose(),e.domElement.remove()}}}const Zu=.0022,$u=1.45,CS=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","Space","KeyR","KeyF","KeyV","KeyQ","Digit1","Digit2"]);function IS(i){const e=new Set,t={dyaw:0,dpitch:0,sparo:!1,sparoPremuto:!1,mira:!1,fPremuto:!1,fRilasciato:!1,azioni:[]};let n=!1,r=()=>{};const s=()=>document.pointerLockElement===i,o=()=>{var p,_;const m=(p=i.requestPointerLock)==null?void 0:p.call(i);(_=m==null?void 0:m.catch)==null||_.call(m,()=>r(!1))};function a(m){!n||!CS.has(m.code)||(m.preventDefault(),!m.repeat&&(e.add(m.code),m.code==="KeyR"?t.azioni.push("ricarica"):m.code==="KeyV"?t.azioni.push("coltello"):m.code==="KeyQ"?t.azioni.push("cambia"):m.code==="Digit1"?t.azioni.push({arma:0}):m.code==="Digit2"?t.azioni.push({arma:1}):m.code==="KeyF"&&(t.fPremuto=!0)))}function c(m){e.delete(m.code),m.code==="KeyF"&&(t.fRilasciato=!0)}function l(m){!n||!s()||(t.dyaw-=m.movementX*Zu,t.dpitch-=m.movementY*Zu)}function u(m){if(n){if(!s()){o();return}m.button===0?(t.sparo=!0,t.sparoPremuto=!0):m.button===2&&(t.mira=!0)}}function h(m){m.button===0?t.sparo=!1:m.button===2&&(t.mira=!1)}function f(m){n&&s()&&t.azioni.push("cambia")}function d(){e.clear(),t.sparo=!1,t.mira=!1,e.has("KeyF")&&(t.fRilasciato=!0)}const g=()=>{s()||d(),r(s())};window.addEventListener("keydown",a),window.addEventListener("keyup",c),window.addEventListener("blur",d),document.addEventListener("mousemove",l),i.addEventListener("mousedown",u),window.addEventListener("mouseup",h),i.addEventListener("wheel",f,{passive:!0}),i.addEventListener("contextmenu",m=>m.preventDefault()),document.addEventListener("pointerlockchange",g);const v=(...m)=>m.some(p=>e.has(p));return{attiva(m){n=m,m||(d(),s()&&document.exitPointerLock())},blocca:o,suBlocco(m){r=m},get bloccato(){return s()},applicaVista(m){m.yaw+=t.dyaw,m.pitch=Math.max(-$u,Math.min($u,m.pitch+t.dpitch)),t.dyaw=0,t.dpitch=0},leggi(){const m={avanti:(v("KeyW","ArrowUp")?1:0)-(v("KeyS","ArrowDown")?1:0),lato:(v("KeyD","ArrowRight")?1:0)-(v("KeyA","ArrowLeft")?1:0),corsa:v("ShiftLeft","ShiftRight"),sparo:t.sparo,sparoPremuto:t.sparoPremuto,mira:t.mira,f:v("KeyF"),fPremuto:t.fPremuto,fRilasciato:t.fRilasciato,azioni:t.azioni.splice(0)};return t.sparoPremuto=!1,t.fPremuto=!1,t.fRilasciato=!1,m}}}const Bt=i=>document.getElementById(i),PS=2200,LS=140;function DS(){const i={radice:Bt("hud"),vignetta:Bt("vignetta"),cannocchiale:Bt("cannocchiale"),mirino:Bt("mirino"),segno:Bt("segno"),round:Bt("round"),punti:Bt("punti"),nomeArma:Bt("nome-arma"),munizioni:Bt("munizioni"),bibite:Bt("bibite"),avviso:Bt("avviso"),suggerimento:Bt("suggerimento"),barra:Bt("barra-rianima"),terra:Bt("stato-terra"),rete:Bt("rete"),clicca:Bt("clicca")};let e=0,t=0,n=null,r="";function s(a,c="pericolo"){i.avviso.textContent=a,i.avviso.classList.toggle("bene",c==="bene"),i.avviso.classList.add("visibile"),e=performance.now()+PS}function o(a,c){const l=[...a.giocatori].sort((d,g)=>d.id===c?-1:g.id===c?1:0),u=l.map(d=>`${d.id}:${d.punti}:${d.nome}`).join("|");if(u===r)return;r=u;const h=l.find(d=>d.id===c),f=h&&n!==null&&h.punti>n?h.punti-n:0;if(n=(h==null?void 0:h.punti)??null,i.punti.replaceChildren(...l.map(d=>{const g=document.createElement("div");g.className=d.id===c?"":"altro";const v=document.createElement("span");return v.textContent=d.nome,g.append(v,String(d.punti)),g})),f>0){const d=document.createElement("div");d.className="guadagno",d.textContent=`+${f}`,i.punti.prepend(d)}}return{mostra(a){i.radice.hidden=!a},avviso:s,segno(a){i.segno.classList.add("visibile"),i.segno.classList.toggle("testa",a),t=performance.now()+LS},aggiorna({vista:a,mioId:c,arma:l,suggerimento:u,rianimazione:h,inMira:f,cannocchiale:d,bloccato:g,rete:v,apertura:m}){const p=a.giocatori.find(T=>T.id===c),_=performance.now();_>e&&i.avviso.classList.remove("visibile"),_>t&&i.segno.classList.remove("visibile"),i.round.textContent=a.round>0?String(a.round):"",i.round.classList.toggle("lampeggia",a.fase==="intervallo"&&a.round>0),o(a,c),i.nomeArma.textContent=Tt[l.tipo].nome,i.nomeArma.classList.toggle("potenziata",l.tipo.endsWith("+")),i.munizioni.textContent=`${l.caricatore} / ${l.riserva}`,i.munizioni.classList.toggle("poche",l.caricatore<=Math.ceil(Tt[l.tipo].caricatore/4));const M=(p==null?void 0:p.bevande)??[];i.bibite.dataset.chiave!==M.join()&&(i.bibite.dataset.chiave=M.join(),i.bibite.replaceChildren(...M.map(T=>{const P=document.createElement("i");return P.style.background=`#${Di[T].colore.toString(16).padStart(6,"0")}`,P.title=Di[T].nome,P})));const x=p&&p.stato==="vivo"?1-p.vita/p.vitaMax:p?1:0;i.vignetta.style.opacity=String(Math.min(.9,x*1.1)),i.cannocchiale.hidden=!d,i.mirino.classList.toggle("nascosto",f||(p==null?void 0:p.stato)!=="vivo"),i.mirino.style.setProperty("--apertura",`${m}px`),i.suggerimento.textContent=u??"",i.barra.hidden=h===null,h!==null&&(i.barra.querySelector("i").style.width=`${Math.min(100,h*100)}%`);const C=(p==null?void 0:p.stato)==="terra",b=(p==null?void 0:p.stato)==="morto";i.terra.hidden=!C&&!b,C&&(i.terra.textContent=`SEI A TERRA — ${Math.ceil(p.timerTerra)} s
il tuo amico deve rianimarti`),b&&(i.terra.textContent="SEI MORTO — torni al prossimo round"),i.rete.textContent=v,i.clicca.hidden=g}}}const NS=.5,Ju=Object.freeze({pistola:{durata:.18,filtro:1800,volume:.6,botto:110},pompa:{durata:.45,filtro:900,volume:1,botto:60},mitra:{durata:.12,filtro:2200,volume:.45,botto:130},assalto:{durata:.16,filtro:1500,volume:.6,botto:90},mitragliatrice:{durata:.2,filtro:1100,volume:.7,botto:70},precisione:{durata:.6,filtro:2600,volume:1,botto:55},raggi:{durata:.3,filtro:3e3,volume:.35,botto:0,raggio:!0}});function US(){let i=null,e=null,t=null;function n(){if(i){i.state==="suspended"&&i.resume();return}i=new AudioContext,e=i.createGain(),e.gain.value=NS,e.connect(i.destination),t=i.createBuffer(1,i.sampleRate*2,i.sampleRate);const l=t.getChannelData(0);for(let d=0;d<l.length;d++)l[d]=Math.random()*2-1;const u=i.createBufferSource();u.buffer=t,u.loop=!0;const h=i.createBiquadFilter();h.type="lowpass",h.frequency.value=220;const f=i.createGain();f.gain.value=.05,u.connect(h).connect(f).connect(e),u.start()}const r=()=>i&&i.state==="running";function s({durata:l,da:u,a:h=u,tipo:f="lowpass",volume:d=.5,ritardo:g=0,destinazione:v=e}){const m=i.currentTime+g,p=i.createBufferSource();p.buffer=t,p.playbackRate.value=.8+Math.random()*.4;const _=i.createBiquadFilter();_.type=f,_.frequency.setValueAtTime(u,m),_.frequency.exponentialRampToValueAtTime(Math.max(20,h),m+l);const M=i.createGain();M.gain.setValueAtTime(d,m),M.gain.exponentialRampToValueAtTime(.001,m+l),p.connect(_).connect(M).connect(v),p.start(m,Math.random()),p.stop(m+l+.05)}function o(l,{durata:u=.2,tipo:h="sine",volume:f=.2,ritardo:d=0,scendi:g=null,destinazione:v=e}){const m=i.currentTime+d,p=i.createOscillator();p.type=h,p.frequency.setValueAtTime(l,m),g&&p.frequency.exponentialRampToValueAtTime(g,m+u);const _=i.createGain();_.gain.setValueAtTime(f,m),_.gain.exponentialRampToValueAtTime(.001,m+u),p.connect(_).connect(v),p.start(m),p.stop(m+u+.05)}function a(l,u){const h=i.createStereoPanner();h.pan.value=Math.max(-1,Math.min(1,Math.sin(u)));const f=i.createGain();return f.gain.value=Math.max(0,1-l/22),h.connect(f).connect(e),h}const c={vuoto:()=>o(900,{durata:.04,tipo:"square",volume:.12}),ricarica:()=>{o(500,{durata:.05,tipo:"square",volume:.12,ritardo:.05}),o(320,{durata:.06,tipo:"square",volume:.14,ritardo:.35})},coltello:()=>s({durata:.18,da:3e3,a:900,tipo:"bandpass",volume:.5}),carne:()=>{s({durata:.12,da:700,a:200,volume:.6}),o(90,{durata:.1,volume:.25,scendi:50})},testa:()=>{s({durata:.16,da:1200,a:300,volume:.8}),o(1400,{durata:.06,tipo:"triangle",volume:.12})},assaRotta:()=>{s({durata:.3,da:1400,a:300,tipo:"bandpass",volume:.9}),o(120,{durata:.12,volume:.3,scendi:70})},assaMessa:()=>{o(180,{durata:.08,tipo:"square",volume:.25}),o(160,{durata:.08,tipo:"square",volume:.25,ritardo:.16})},porta:()=>{s({durata:1.2,da:400,a:120,volume:.6}),o(55,{durata:1,tipo:"sawtooth",volume:.12})},acquisto:()=>{o(988,{durata:.12,tipo:"triangle",volume:.25}),o(1319,{durata:.3,tipo:"triangle",volume:.25,ritardo:.1})},bevanda:()=>{[523,659,784].forEach((l,u)=>o(l,{durata:.25,tipo:"triangle",volume:.2,ritardo:u*.12}))},cassa:()=>{[880,740,988,659,1175].forEach((l,u)=>o(l,{durata:.4,tipo:"sine",volume:.18,ritardo:u*.22}))},round:()=>{[98,92.5,87.3,73.4].forEach((l,u)=>o(l,{durata:1.1,tipo:"sawtooth",volume:.16,ritardo:u*.55})),s({durata:2.5,da:300,a:60,volume:.3})},fineRound:()=>{[73.4,87.3,110].forEach((l,u)=>o(l,{durata:.9,tipo:"triangle",volume:.18,ritardo:u*.4}))},ferito:()=>{o(70,{durata:.25,volume:.6,scendi:40}),s({durata:.2,da:500,a:150,volume:.5})},aTerra:()=>{o(60,{durata:1.5,tipo:"sawtooth",volume:.25,scendi:30})},rianimato:()=>{o(440,{durata:.3,tipo:"triangle",volume:.2}),o(660,{durata:.5,tipo:"triangle",volume:.2,ritardo:.2})},corrente:()=>{o(60,{durata:.25,tipo:"square",volume:.4}),o(110,{durata:2.2,tipo:"sawtooth",volume:.12,ritardo:.2,scendi:120}),s({durata:.6,da:2e3,a:200,volume:.4})},potenzia:()=>{for(let l=0;l<6;l++)o(220+l*70,{durata:.45,tipo:"sawtooth",volume:.08,ritardo:l*.45});s({durata:3,da:300,a:2e3,tipo:"bandpass",volume:.3})},potenziata:()=>{[392,523,659,1046].forEach((l,u)=>o(l,{durata:.4,tipo:"triangle",volume:.22,ritardo:u*.09}))},fine:()=>{[196,165,131,98].forEach((l,u)=>o(l,{durata:1.2,tipo:"sawtooth",volume:.18,ritardo:u*.6}))}};return{prepara:n,suona(l){var u;r()&&((u=c[l])==null||u.call(c))},sparo(l,u=0,h=0){if(!r())return;const f=Ju[l.replace(/\+$/,"")]??Ju.pistola,d=u>0?a(u,h):e;if(f.raggio){o(1400,{durata:f.durata,tipo:"square",volume:.12,scendi:180,destinazione:d}),o(700,{durata:f.durata*1.4,tipo:"sine",volume:.25,scendi:90,destinazione:d}),s({durata:.5,da:900,a:80,volume:.5,ritardo:.08,destinazione:d});return}s({durata:f.durata,da:f.filtro*2,a:f.filtro*.3,volume:f.volume,destinazione:d}),o(f.botto,{durata:f.durata*.8,volume:f.volume*.6,scendi:f.botto*.4,destinazione:d})},lamento(l,u){if(!r()||l>20)return;const h=a(l,u),f=70+Math.random()*50,d=i.currentTime,g=i.createOscillator();g.type="sawtooth",g.frequency.setValueAtTime(f,d),g.frequency.linearRampToValueAtTime(f*(.7+Math.random()*.5),d+.9);const v=i.createBiquadFilter();v.type="bandpass",v.frequency.value=400+Math.random()*300,v.Q.value=4;const m=i.createGain();m.gain.setValueAtTime(.001,d),m.gain.linearRampToValueAtTime(.35,d+.15),m.gain.exponentialRampToValueAtTime(.001,d+1),g.connect(v).connect(m).connect(h),g.start(d),g.stop(d+1.05)}}}const Zc=new URLSearchParams(location.search),Qu=Zc.has("locale"),eh=Zc.has("riserva"),Ef="campanella.nome",OS={diretto:50,riserva:100},zS={diretto:.1,riserva:.22},FS=33,BS=1e3,kS=1e3,VS=1e4,bf=.25,HS=.5,GS=.05,WS=.3,XS=.3,jS=.12,th=40,qS=60,YS=64,KS=1,Ce=i=>document.getElementById(i),ZS=["schermata-inizio","schermata-stanza","schermata-fine"].map(Ce),Io=i=>ZS.forEach(e=>{e.hidden=e.id!==i}),kt=DS(),ht=US(),Li=IS(Ce("mondo"));let hn=null;const N={mioId:crypto.randomUUID(),nome:null,sonoHost:!1,stanza:null,coll:null,nomeAltro:null,idAltro:null,fase:"inizio",partita:null,semeCorrente:null,buffer:[],scarto:null,ultimoArrivo:0,vista:null,azioniLocali:[],azioniRemote:[],remoto:null,accumulo:0,ultimaIstantanea:0,ultimoInvioG:0,ultimoPing:0,ultimoCiao:0,lobbyRicevuta:!1,ping:null,statoSegnali:null,colpiVisti:new Map},me={x:0,z:0,yaw:Math.PI,pitch:0,pronto:!1,tp:0,colpi:0,movimento:0,corsa:!1,inMira:!1},at=ph(),Xt={inRianimazione:!1,ultimaAssa:0,ultimoVuoto:0,sparoForzato:!1,ultimoAcquisto:{id:null,quando:0}},xa=new Map,In=()=>N.coll&&(N.coll.modo==="diretto"||N.coll.modo==="riserva"),Tf=()=>{var i;return((i=N.coll)==null?void 0:i.modo)==="diretto"?"diretto":"riserva"};function $c(i,e){const t=`${e}|${[...i].sort().join(",")}`;if(!xa.has(t)){const n=e?[..._c,...vc,...Ni.filter(r=>!i.has(r.id)).map(r=>r.scatola),...ci.map(lh).filter(Boolean).map(r=>({...r,altezza:2}))]:Mc(i);xa.set(t,n)}return xa.get(t)}function $S(){try{return localStorage.getItem(Ef)??""}catch{return""}}function JS(i){try{return localStorage.setItem(Ef,i),!0}catch{return!1}}function hr(i){var e;N.sonoHost?N.azioniLocali.push({da:N.mioId,...i}):(e=N.coll)==null||e.invia({t:"az",a:i})}function QS(){return!N.coll||!N.idAltro&&N.sonoHost?N.sonoHost?"da solo":"":N.coll.modo==="diretto"?`diretto${N.ping!==null?` · ${N.ping} ms`:""}`:N.coll.modo==="riserva"?`via Supabase${N.ping!==null?` · ${N.ping} ms`:""}`:"collegamento…"}function Qr(){var e;const i=Ce("t-stato");Ce("t-codice").textContent=N.stanza,Ce("blocco-link").hidden=!N.sonoHost,Ce("parti").hidden=!N.sonoHost,((e=N.coll)==null?void 0:e.modo)==="occupata"?(i.textContent="Questa stanza ha già due giocatori.",i.dataset.tipo="errore"):N.statoSegnali==="offline"&&!In()?(i.textContent="Il server dei collegamenti non risponde, riprovo…",i.dataset.tipo="errore"):In()&&N.nomeAltro?(i.textContent=`Insieme a ${N.nomeAltro} ${N.coll.modo==="diretto"?"(diretto)":"(via Supabase)"}`,i.dataset.tipo="ok"):(i.textContent=N.sonoHost?"Aspetto il tuo amico… mandagli il link. Puoi anche entrare da solo.":"Mi collego alla stanza…",i.dataset.tipo="attesa"),Ce("parti").textContent=N.nomeAltro&&In()?"Entrate nella scuola":"Entra da solo",Ce("nota-stanza").textContent=N.sonoHost?"Se il tuo amico arriva dopo, entra direttamente nella partita.":N.nomeAltro?`Aspetta che ${N.nomeAltro} apra la scuola.`:""}function wf(){!N.sonoHost||!In()||(N.coll.invia({t:"lobby",nomeHost:N.nome,ospite:N.idAltro}),N.fase==="gioco"&&N.coll.invia({t:"inizia",seme:N.semeCorrente}))}function Rf(i,e){ht.prepara(),N.sonoHost=i,N.stanza=e,N.fase="stanza";const t=Yd(e,{locale:Qu});t.suStato(r=>{N.statoSegnali=r,Qr()}),N.coll=ap({segnali:t,sonoHost:i,mioId:N.mioId,soloRiserva:eh}),N.coll.suStato(()=>{Qr(),In()&&wf()}),N.coll.suMessaggio(ey);const n=[Qu?"locale":null,eh?"riserva":null].filter(Boolean).map(r=>`&${r}`).join("");Ce("link").value=`${location.origin}${location.pathname}?stanza=${e}${n}`,Io("schermata-stanza"),Qr(),i&&Ce("parti").focus()}function ms(i){Ce("errore-inizio").textContent=i}function Cf(){const i=ts(Ce("nome").value);return i?(JS(i),N.nome=i,i):(ms("Scrivi il tuo nome: lo vedrà il tuo amico."),Ce("nome").focus(),null)}function If(i,e=!1){var t;if(N.fase="gioco",N.semeCorrente=i,N.buffer=[],N.scarto=null,N.vista=null,N.accumulo=0,N.azioniLocali=[],N.azioniRemote=[],N.remoto=null,N.colpiVisti.clear(),gh(at),Object.assign(me,{pronto:!1,tp:0,colpi:0,pitch:0}),Xt.inRianimazione=!1,hn.svuota(),N.sonoHost){const n=[{id:N.mioId,nome:N.nome}];N.idAltro&&In()&&n.push({id:N.idAltro,nome:N.nomeAltro}),N.partita=vd({seme:i,giocatori:n})}Io(null),kt.mostra(!0),Li.attiva(!0),(t=document.activeElement)==null||t.blur(),e&&Li.blocca()}function Pf(){if(!N.sonoHost)return;const i=Xf();If(i,!0),In()&&N.coll.invia({t:"inizia",seme:i})}function Lf(i){N.fase==="gioco"&&(N.fase="fine",Li.attiva(!1),ht.suona("fine"),Ce("t-dettaglio").textContent=i.round>1?`Siete sopravvissuti fino al round ${i.round}.`:"Non siete andati oltre il primo round.",Ce("t-tabella").replaceChildren(...i.giocatori.map(e=>{const t=document.createElement("div");return t.textContent=`${e.nome} — ${e.uccisioni} zombie, ${e.punti} punti`,t})),Ce("rigioca").hidden=!N.sonoHost,Ce("t-attesa-host").textContent=N.sonoHost?"":`Aspetta che ${N.nomeAltro} faccia ripartire.`,Io("schermata-fine"),N.sonoHost&&Ce("rigioca").focus())}function Ma(i){var e,t;return((t=(e=N.vista)==null?void 0:e.giocatori.find(n=>n.id===i))==null?void 0:t.nome)??"Il tuo amico"}function Df(i){for(const e of i){const t=e.a===N.mioId;switch(e.k){case"round":ht.suona("round"),kt.avviso(`Round ${e.round}`);break;case"fineRound":ht.suona("fineRound");break;case"ucciso":hn.effetti.macchia(e.x,e.z);break;case"assaRotta":ht.suona("assaRotta");break;case"assaMessa":ht.suona("assaMessa");break;case"porta":ht.suona("porta"),kt.avviso("Porta aperta","bene");break;case"acquisto":if(!t)break;sd(at,e.armi,e.arma),ht.suona(e.potenziata?"potenziata":"acquisto"),kt.avviso(Tt[e.arma].nome,"bene");break;case"corrente":ht.suona("corrente"),kt.avviso("Corrente accesa!","bene");break;case"potenzia":t&&(ht.suona("potenzia"),kt.avviso("Potenziamento in corso…","bene"));break;case"potenziataPronta":t&&kt.avviso("Ritira l'arma potenziata!","bene");break;case"munizioni":t&&(od(at,e.arma),ht.suona("acquisto"));break;case"bevanda":t&&(ht.suona("bevanda"),kt.avviso(Di[e.bevanda].nome,"bene"));break;case"cassa":t&&(ht.suona("cassa"),kt.avviso(`Prendi: ${Tt[e.arma].nome}`,"bene"));break;case"ferito":t&&ht.suona("ferito");break;case"aTerra":ht.suona("aTerra"),kt.avviso(t?"Sei a terra!":`${Ma(e.a)} è a terra!`);break;case"rianimato":ht.suona("rianimato"),kt.avviso(t?"Sei di nuovo in piedi":`${Ma(e.a)} è di nuovo in piedi`,"bene");break;case"morto":kt.avviso(t?"Sei morto":`${Ma(e.a)} è morto`);break;case"rinato":t&&gh(at);break;case"fine":Lf(e);break}}}function ey(i){switch(i.t){case"ciao":if(!N.sonoHost)return;N.nomeAltro=ts(i.nome),N.partita&&N.idAltro&&N.idAltro!==i.id&&Sh(N.partita,N.idAltro),N.idAltro=i.id,N.fase==="gioco"&&N.partita&&Sc(N.partita,{id:i.id,nome:N.nomeAltro}),wf(),Qr();return;case"lobby":if(N.sonoHost)return;N.lobbyRicevuta=i.ospite===N.mioId,N.nomeAltro=ts(i.nomeHost),Qr();return;case"inizia":if(N.sonoHost||N.fase==="gioco"&&i.seme===N.semeCorrente)return;If(i.seme);return;case"g":if(!N.sonoHost)return;nh(),N.remoto={x:i.x,z:i.z,yaw:i.yaw,pitch:i.pitch,arma:i.arma,colpi:i.colpi,tp:i.tp};return;case"az":if(!N.sonoHost||!N.idAltro)return;if(nh(),N.azioniRemote.length>=YS){const e=N.azioniRemote.findIndex(t=>t.tipo==="colpo"||t.tipo==="assa");N.azioniRemote.splice(e>=0?e:0,1)}N.azioniRemote.push({...i.a,da:N.idAltro});return;case"st":{if(N.sonoHost||N.fase==="stanza"||i.g!==N.semeCorrente)return;const e=N.buffer[N.buffer.length-1];if(e&&i.ist.t<=e.vista.tempo)return;N.ultimoArrivo=performance.now();const t=i.ist.t-N.ultimoArrivo/1e3,n=N.scarto===null||Math.abs(t-N.scarto)>HS;N.scarto=n?t:N.scarto+(t-N.scarto)*GS,N.buffer.push({vista:wh(i.ist)}),N.buffer.length>th&&N.buffer.splice(0,N.buffer.length-th);return}case"ev":!N.sonoHost&&N.fase==="gioco"&&Df(i.eventi);return;case"ping":N.sonoHost||N.coll.invia({t:"pong",n:i.n});return;case"pong":N.sonoHost&&(N.ping=Math.round(performance.now()-i.n));return}}function nh(){N.fase!=="gioco"||!N.partita||!N.idAltro||N.partita.giocatori.some(i=>i.id===N.idAltro)||Sc(N.partita,{id:N.idAltro,nome:N.nomeAltro??"Amico"})}function ty(i,e){const t=N.partita;if(N.idAltro&&t.giocatori.some(n=>n.id===N.idAltro)&&N.coll.silenzio()>VS&&Sh(t,N.idAltro),N.fase==="gioco"){N.accumulo=Math.min(N.accumulo+i,bf);const n=[];for(;N.accumulo>=ue.PASSO;){const r={};me.pronto&&(r[N.mioId]={x:me.x,z:me.z,yaw:me.yaw,pitch:me.pitch,arma:Zt(at).tipo,colpi:me.colpi,tp:me.tp}),N.remoto&&N.idAltro&&(r[N.idAltro]=N.remoto);const s=[...N.azioniLocali.splice(0),...N.azioniRemote.splice(0)];n.push(...Ud(t,ue.PASSO,{posizioni:r,azioni:s})),N.accumulo-=ue.PASSO}n.length&&In()&&N.coll.invia({t:"ev",eventi:n}),Df(n)}In()&&e-N.ultimaIstantanea>=OS[Tf()]&&(N.coll.invia({t:"st",g:N.semeCorrente,ist:Th(t)},{veloce:!0}),N.ultimaIstantanea=e)}function ny(i){N.fase!=="gioco"||!me.pronto||i-N.ultimoInvioG<FS||(N.coll.invia({t:"g",x:me.x,z:me.z,yaw:me.yaw,pitch:me.pitch,arma:Zt(at).tipo,colpi:me.colpi,tp:me.tp},{veloce:!0}),N.ultimoInvioG=i)}let ih=performance.now();function iy(){const i=performance.now(),e=Math.min(bf,(i-ih)/1e3);ih=i,N.coll&&In()&&(N.sonoHost&&i-N.ultimoPing>BS&&(N.coll.invia({t:"ping",n:i}),N.ultimoPing=i),!N.sonoHost&&!N.lobbyRicevuta&&i-N.ultimoCiao>kS&&(N.coll.invia({t:"ciao",nome:N.nome,id:N.mioId}),N.ultimoCiao=i)),!(N.fase!=="gioco"&&N.fase!=="fine")&&(N.sonoHost&&N.partita?ty(e,i):N.sonoHost||ny(i))}function ry(i){if(N.buffer.length===0||N.scarto===null)return null;const e=i/1e3+N.scarto-zS[Tf()];for(;N.buffer.length>2&&N.buffer[1].vista.tempo<=e;)N.buffer.shift();const[t,n]=N.buffer;return n&&e>t.vista.tempo?zd(t.vista,n.vista,(e-t.vista.tempo)/Math.max(1e-6,n.vista.tempo-t.vista.tempo)):t.vista}function sy(i,e,t){const n=e.stato==="vivo"&&N.fase==="gioco";me.inMira=n&&i.mira&&at.ricarica===0,me.corsa=n&&i.corsa&&i.avanti>0&&!me.inMira;const r=Math.hypot(i.avanti,i.lato);if(me.movimento=n&&r>0?1:0,!me.movimento)return;const s=(me.corsa?ue.VELOCITA_CORSA:ue.VELOCITA)*(me.inMira?.6:1),o=i.avanti/r,a=i.lato/r,c=(Math.sin(me.yaw)*o-Math.cos(me.yaw)*a)*s*t,l=(Math.cos(me.yaw)*o+Math.sin(me.yaw)*a)*s*t,u=uh(me,c,l,ue.RAGGIO_GIOCATORE,$c(N.vista.porte,!1));me.x=u.x,me.z=u.z}function oy(i,e){me.colpi+=1,hn.spara(),ht.sparo(Zt(at).tipo);const t={x:me.x,y:ue.ALTEZZA_OCCHI,z:me.z},n=fh(me.yaw,me.pitch),r=hn.bersagli(e),s=$c(e.porte,!0),o=new Map;for(let a=0;a<i.pallini;a++){const c=ed(n,i.dispersione*(me.inMira?.4:1)*(me.movimento?1.6:1),Math.random),l=hh(t,c,r,s,i.esplosione?qS:1/0);if(!Number.isFinite(l.t))continue;const u={x:t.x+c.x*l.t,y:t.y+c.y*l.t,z:t.z+c.z*l.t};if(i.esplosione){hn.raggio(u),hn.effetti.esplosione(u);for(const{id:f,fattore:d}of Qf(u,r,i.esplosione.raggio)){if(f===l.id)continue;const g=o.get(f)??{danno:0,testa:!1};g.danno+=Math.round(i.esplosione.danno*d),o.set(f,g)}}if(l.id===null){hn.effetti.impatto(u);continue}hn.effetti.sangue(u,c);const h=o.get(l.id)??{danno:0,testa:!1};h.danno+=l.testa?i.danno*2:i.danno,h.testa||(h.testa=l.testa),o.set(l.id,h)}for(const[a,{danno:c,testa:l}]of o)hr({tipo:"colpo",zombie:a,danno:c,testa:l}),kt.segno(l),ht.suona(l?"testa":"carne")}function ay(i,e,t,n){if(nd(at,n)&&ht.suona("ricarica"),e.stato!=="vivo"||N.fase!=="gioco")return;for(const a of i.azioni)if(a==="ricarica"&&Lo(at,e.bevande))ht.suona("ricarica");else if(a==="cambia")ul(at);else if((a==null?void 0:a.arma)!==void 0)ul(at,a.arma);else if(a==="coltello"&&rd(at)){ht.suona("coltello");const c=fh(me.yaw,Math.min(me.pitch,-.15)),l=hh({x:me.x,y:ue.ALTEZZA_OCCHI,z:me.z},c,hn.bersagli(t),$c(t.porte,!0),lo.portata);l.id!==null&&(hr({tipo:"colpo",zombie:l.id,danno:lo.danno,coltello:!0}),ht.suona("carne"),kt.segno(!1))}const r=Tt[Zt(at).tipo],s=Xt.sparoForzato||(r.automatica?i.sparo:i.sparoPremuto);if(Xt.sparoForzato=!1,!s||me.corsa)return;if(Zt(at).caricatore===0){!Lo(at,e.bevande)&&performance.now()/1e3-Xt.ultimoVuoto>XS&&(ht.suona("vuoto"),Xt.ultimoVuoto=performance.now()/1e3);return}const o=id(at);o&&(oy(o,t),Zt(at).caricatore===0&&Lo(at,e.bevande))}function cy(i,e,t){const n=e.stato==="vivo"&&N.fase==="gioco"?ad({id:N.mioId,x:me.x,z:me.z,armi:e.armi,bevande:e.bevande,armaAttiva:Zt(at).tipo},t):null;if(Xt.inRianimazione&&(!i.f||(n==null?void 0:n.tipo)!=="rianima")&&(hr({tipo:"rianima",attivo:!1}),Xt.inRianimazione=!1),!n)return null;const r=performance.now()/1e3,s=Xt.ultimoAcquisto.id===n.acquisto&&r-Xt.ultimoAcquisto.quando<KS;return i.fPremuto&&n.tipo==="compra"&&!s&&Number.isFinite(n.costo)&&(n.costo>e.punti?kt.avviso("Non hai abbastanza punti"):(hr({tipo:"compra",acquisto:n.acquisto,arma:Zt(at).tipo}),Xt.ultimoAcquisto={id:n.acquisto,quando:r})),i.f&&n.tipo==="rianima"&&!Xt.inRianimazione&&(hr({tipo:"rianima",attivo:!0}),Xt.inRianimazione=!0),i.f&&n.tipo==="assa"&&r-Xt.ultimaAssa>WS&&(hr({tipo:"assa",finestra:n.finestra}),Xt.ultimaAssa=r),n}function ly(i,e){for(const t of i.zombie){if(t.stato==="morto"||Math.random()>e*jS)continue;const n=t.x-me.x,r=t.z-me.z;ht.lamento(Math.hypot(n,r),Math.atan2(n,r)-me.yaw)}for(const t of i.giocatori){if(t.id===N.mioId)continue;const n=N.colpiVisti.get(t.id)??t.colpi;t.colpi>n&&ht.sparo(t.armaAttiva,Math.hypot(t.x-me.x,t.z-me.z)+1,Math.atan2(t.x-me.x,t.z-me.z)-me.yaw),N.colpiVisti.set(t.id,t.colpi)}}let rh=performance.now();function Nf(i){const e=Math.min(.1,(i-rh)/1e3);if(rh=i,(N.fase==="gioco"||N.fase==="fine")&&hn){const t=N.sonoHost?N.partita?wh(Th(N.partita)):null:ry(i),n=t==null?void 0:t.giocatori.find(r=>r.id===N.mioId);if(t&&n){N.vista=t,(!me.pronto||n.teletrasporto>me.tp)&&Object.assign(me,{x:n.x,z:n.z,yaw:n.yaw,tp:n.teletrasporto,pronto:!0}),t.fase==="fine"&&N.fase==="gioco"&&Lf({round:t.round,giocatori:t.giocatori.map(l=>({nome:l.nome,punti:l.punti,uccisioni:l.uccisioni}))});const r=Li.leggi();Li.applicaVista(me),sy(r,n,e),ay(r,n,t,e);const s=cy(r,n,t);ly(t,e);const o=t.giocatori.find(l=>l.id!==N.mioId&&l.stato==="terra"),a=Zt(at).tipo,c=me.inMira&&Tt[a].mirino===!0;hn.disegna(t,{io:me,mioId:N.mioId,dt:e,arma:a,movimento:me.movimento,corsa:me.corsa,inMira:me.inMira,cannocchiale:c,ricarica:at.ricarica>0?Math.sin(Math.min(1,at.ricarica)*Math.PI):0,cambio:at.cambio>0?1:0,coltellata:at.coltello/lo.attesa,aTerra:n.stato==="terra",morto:n.stato==="morto"}),kt.aggiorna({vista:t,mioId:N.mioId,arma:Zt(at),suggerimento:(s==null?void 0:s.testo)??null,rianimazione:Xt.inRianimazione&&o?o.progressoRianimazione/(n.bevande.includes("ritorno")?ue.RIANIMA_RAPIDO:ue.RIANIMA_IN):null,inMira:me.inMira,cannocchiale:c,bloccato:Li.bloccato||N.fase!=="gioco",rete:QS(),apertura:6+(me.movimento?6:0)+(me.corsa?8:0)-(me.inMira?4:0)})}}requestAnimationFrame(Nf)}Ce("crea").addEventListener("click",()=>{Cf()&&Rf(!0,$d())});Ce("entra").addEventListener("click",()=>{if(!Cf())return;const i=Ch(Ce("codice").value);if(!i){ms("Il codice ha 4 lettere (es. KXRT)."),Ce("codice").focus();return}Rf(!1,i)});Ce("modulo-inizio").addEventListener("submit",i=>i.preventDefault());Ce("nome").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("crea").disabled||(i.preventDefault(),(Ce("codice").value.trim()?Ce("entra"):Ce("crea")).click())});Ce("codice").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("entra").disabled||(i.preventDefault(),Ce("entra").click())});Ce("codice").addEventListener("input",()=>ms(""));Ce("nome").addEventListener("input",()=>ms(""));Ce("copia").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(Ce("link").value),Ce("copia").textContent="Copiato!"}catch{Ce("link").select(),Ce("copia").textContent="Premi Ctrl+C"}});Ce("parti").addEventListener("click",Pf);Ce("rigioca").addEventListener("click",Pf);Li.suBlocco(i=>{i&&ht.prepara()});Ce("nome").value=$S();const sh=Ch(Zc.get("stanza"));sh&&(Ce("codice").value=sh,Ce("crea").classList.remove("primario"),Ce("entra").classList.add("primario"));Io("schermata-inizio");Ce("nome").focus();requestAnimationFrame(Nf);const uy=new Worker(new URL(""+new URL("orologio-worker-CqtP_hGM.js",import.meta.url).href,import.meta.url));uy.onmessage=iy;RS(Ce("mondo")).then(i=>{hn=i,Ce("crea").disabled=!1,Ce("crea").textContent="Crea una stanza",Ce("entra").disabled=!1}).catch(i=>{console.error("Caricamento della grafica non riuscito:",i),ms("Non riesco a caricare la grafica del gioco. Ricarica la pagina."),Ce("crea").textContent="Errore"});
