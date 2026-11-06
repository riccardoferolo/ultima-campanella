(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const se=Object.freeze({PASSO:1/60,ALTEZZA_OCCHI:1.6,RAGGIO_GIOCATORE:.35,RAGGIO_ZOMBIE:.35,VELOCITA:4.2,VELOCITA_CORSA:6.2,PUNTI_INIZIALI:500,PUNTI_COLPO:10,PUNTI_UCCISIONE:60,PUNTI_TESTA:100,PUNTI_COLTELLO:130,PUNTI_ASSA:10,VITA:100,VITA_FERRO:250,RIGENERA_DOPO:4,RIGENERA_AL_SECONDO:60,DANNO_ZOMBIE:45,PORTATA_ZOMBIE:1.15,ATTESA_ATTACCO:1.4,TEMPO_A_TERRA:30,RIANIMA_IN:4,RIANIMA_RAPIDO:1.5,RIANIMA_DISTANZA:1.8,ASSE_PER_FINESTRA:6,ROMPI_ASSE_OGNI:1.5,RICOSTRUISCI_OGNI:.8,DISTANZA_FINESTRA:2.2,SCAVALCA:.9,ZOMBIE_VIVI_MAX:20,INTERVALLO:10,VELOCITA_CAMMINA:1.1,VELOCITA_CORRE:3.6,DISTANZA_ACQUISTO:2,COSTO_CASSA:950,DURATA_CASSA:8,COSTO_POTENZIA:5e3,DURATA_POTENZIA:3,ATTESA_RITIRO:10,CONTO_ALLA_ROVESCIA:5,PRIMO_ROUND_TRA:3,PROBABILITA_BONUS:.035,BONUS_PER_ROUND:4,DURATA_BONUS_A_TERRA:25,DISTANZA_BONUS:1.3,PUNTI_BOMBA:400,PUNTI_CARPENTIERE:200,COSTO_CASSA_SALDI:10,DISTANZA_FRAMMENTO:1.6,PUNTI_SEGRETO:1e3}),ke=i=>Object.freeze({pallini:1,dispersione:.02,automatica:!1,...i}),un=(i,e,t,n=null)=>Object.freeze({raggio:i,danno:e,tipo:t,colore:n}),cn=i=>ke({famiglia:"aliena",aliena:!0,...i}),ds=Object.freeze({pistola:ke({nome:"Pistola P9",famiglia:"pistola",modello:"Pistol_1",danno:40,cadenza:.22,caricatore:8,riserva:48,ricarica:1.4,dispersione:.004}),pistolaAuto:ke({nome:"Pistola automatica R-18",famiglia:"pistola",modello:"Pistol_2",danno:34,cadenza:.06,automatica:!0,caricatore:20,riserva:120,ricarica:1.8,dispersione:.03}),tattica:ke({nome:"Pistola tattica T-40",famiglia:"pistola",modello:"Pistol_3",danno:55,cadenza:.18,caricatore:12,riserva:72,ricarica:1.5,dispersione:.005}),raffica:ke({nome:"Pistola a raffica R-93",famiglia:"pistola",modello:"Pistol_4",danno:38,cadenza:.05,automatica:!0,caricatore:30,riserva:150,ricarica:2,dispersione:.035}),pesante:ke({nome:"Pistola pesante .45",famiglia:"pistola",modello:"Pistol_5",danno:80,cadenza:.25,caricatore:8,riserva:56,ricarica:1.6,dispersione:.006}),aquila:ke({nome:"Pistola Aquila .50",famiglia:"pistola",modello:"Pistol_6",danno:140,cadenza:.35,caricatore:7,riserva:42,ricarica:2.2,dispersione:.008}),magnum:ke({nome:"Revolver .357",famiglia:"revolver",modello:"Revolver_1",danno:160,cadenza:.45,caricatore:6,riserva:36,ricarica:3,dispersione:.006}),ufficiale:ke({nome:"Revolver d'ordinanza",famiglia:"revolver",modello:"Revolver_2",danno:130,cadenza:.4,caricatore:6,riserva:42,ricarica:2.8,dispersione:.007}),cannaLunga:ke({nome:"Revolver canna lunga",famiglia:"revolver",modello:"Revolver_3",danno:210,cadenza:.55,caricatore:6,riserva:36,ricarica:3.1,dispersione:.004}),toro:ke({nome:"Revolver Toro .500",famiglia:"revolver",modello:"Revolver_4",danno:260,cadenza:.6,caricatore:5,riserva:30,ricarica:3.2,dispersione:.008}),sceriffo:ke({nome:"Revolver dello sceriffo",famiglia:"revolver",modello:"Revolver_5",danno:120,cadenza:.3,caricatore:6,riserva:48,ricarica:2.6,dispersione:.009}),mitra:ke({nome:"Mitra MK-5",famiglia:"mitra",modello:"SubmachineGun_1",danno:32,cadenza:.075,automatica:!0,caricatore:30,riserva:150,ricarica:2.2,dispersione:.03}),scorpione:ke({nome:"Mitra Scorpione",famiglia:"mitra",modello:"SubmachineGun_2",danno:26,cadenza:.05,automatica:!0,caricatore:20,riserva:140,ricarica:1.7,dispersione:.045}),vettore:ke({nome:"Mitra Vettore",famiglia:"mitra",modello:"SubmachineGun_3",danno:30,cadenza:.05,automatica:!0,caricatore:25,riserva:150,ricarica:2.1,dispersione:.025}),mitraglietta:ke({nome:"Mitraglietta U-9",famiglia:"mitra",modello:"SubmachineGun_4",danno:28,cadenza:.055,automatica:!0,caricatore:32,riserva:160,ricarica:2,dispersione:.04}),p50:ke({nome:"Mitra P-50",famiglia:"mitra",modello:"SubmachineGun_5",danno:34,cadenza:.065,automatica:!0,caricatore:50,riserva:200,ricarica:3,dispersione:.028}),assalto:ke({nome:"Fucile d'assalto KV-47",famiglia:"assalto",modello:"AssaultRifle_2",danno:60,cadenza:.1,automatica:!0,caricatore:30,riserva:150,ricarica:2.4,dispersione:.018}),kvCorto:ke({nome:"KV-47 corto",famiglia:"assalto",modello:"AssaultRifle_1",danno:52,cadenza:.085,automatica:!0,caricatore:30,riserva:150,ricarica:2.1,dispersione:.026}),galil:ke({nome:"Fucile G-35",famiglia:"assalto",modello:"AssaultRifle_3",danno:58,cadenza:.09,automatica:!0,caricatore:35,riserva:175,ricarica:2.6,dispersione:.02}),battaglia:ke({nome:"Fucile da battaglia S-17",famiglia:"battaglia",modello:"AssaultRifle_4",danno:85,cadenza:.12,automatica:!0,caricatore:20,riserva:120,ricarica:2.5,dispersione:.016}),kv74:ke({nome:"Fucile KV-74",famiglia:"assalto",modello:"AssaultRifle_5",danno:55,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.3,dispersione:.015}),carabina:ke({nome:"Carabina M-4",famiglia:"assalto",modello:"AssaultRifle2_1",danno:50,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.2,dispersione:.014}),tiratore:ke({nome:"Fucile da tiratore MR-16",famiglia:"battaglia",modello:"AssaultRifle2_2",danno:120,cadenza:.18,caricatore:20,riserva:120,ricarica:2.4,dispersione:.006}),commando:ke({nome:"Carabina Commando",famiglia:"assalto",modello:"AssaultRifle2_3",danno:46,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2,dispersione:.022}),m4corta:ke({nome:"Carabina corta M-4C",famiglia:"assalto",modello:"AssaultRifle2_4",danno:48,cadenza:.075,automatica:!0,caricatore:30,riserva:180,ricarica:2.1,dispersione:.018}),bullpup:ke({nome:"Fucile bullpup F-2000",famiglia:"assalto",modello:"Bullpup_1",danno:48,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2.5,dispersione:.016}),fam3:ke({nome:"Fucile Fam-3",famiglia:"assalto",modello:"Bullpup_2",danno:45,cadenza:.06,automatica:!0,caricatore:25,riserva:175,ricarica:2.4,dispersione:.02}),mitragliatrice:ke({nome:"Mitragliatrice HM-6",famiglia:"mitragliatrice",modello:"Bullpup_3",danno:55,cadenza:.07,automatica:!0,caricatore:100,riserva:300,ricarica:4,dispersione:.035}),pompa:ke({nome:"Fucile a pompa 870",famiglia:"pompa",modello:"Shotgun_1",danno:35,cadenza:.85,caricatore:6,riserva:36,ricarica:3,pallini:8,dispersione:.07}),sp12:ke({nome:"Fucile SP-12",famiglia:"pompa",modello:"Shotgun_2",danno:32,cadenza:.3,caricatore:8,riserva:48,ricarica:3.2,pallini:8,dispersione:.075}),aa12:ke({nome:"Fucile automatico AA-12",famiglia:"pompa",modello:"Shotgun_3",danno:28,cadenza:.2,automatica:!0,caricatore:20,riserva:80,ricarica:3.5,pallini:6,dispersione:.08}),caccia:ke({nome:"Fucile da caccia",famiglia:"pompa",modello:"Shotgun_4",danno:38,cadenza:.6,caricatore:7,riserva:42,ricarica:2.8,pallini:7,dispersione:.06}),doppietta:ke({nome:"Doppietta a canne mozze",famiglia:"pompa",modello:"Shotgun_SawedOff",danno:40,cadenza:.25,caricatore:2,riserva:40,ricarica:2.2,pallini:10,dispersione:.1}),sfondamento:ke({nome:"Pompa da sfondamento",famiglia:"pompa",modello:"Shotgun_ShortStock",danno:42,cadenza:.7,caricatore:5,riserva:35,ricarica:2.6,pallini:8,dispersione:.09}),precisione:ke({nome:"Precisione L-96",famiglia:"precisione",modello:"SniperRifle_1",danno:500,cadenza:1.2,caricatore:5,riserva:30,ricarica:3,dispersione:0,mirino:!0}),dsv:ke({nome:"Precisione semiauto D-SV",famiglia:"precisione",modello:"SniperRifle_2",danno:300,cadenza:.4,caricatore:10,riserva:50,ricarica:2.8,dispersione:0,mirino:!0}),anticarro:ke({nome:"Anticarro .50 B-82",famiglia:"precisione",modello:"SniperRifle_3",danno:900,cadenza:1,caricatore:10,riserva:40,ricarica:3.6,dispersione:0,mirino:!0}),notturno:ke({nome:"Precisione notturna N-7",famiglia:"precisione",modello:"SniperRifle_4",danno:420,cadenza:.9,caricatore:6,riserva:36,ricarica:2.9,dispersione:0,mirino:!0}),bipiede:ke({nome:"Precisione col bipiede M-24",famiglia:"precisione",modello:"SniperRifle_5",danno:650,cadenza:1.3,caricatore:5,riserva:30,ricarica:3.2,dispersione:0,mirino:!0}),cacciatore:ke({nome:"Carabina del cacciatore",famiglia:"precisione",modello:"SniperRifle_6",danno:360,cadenza:.8,caricatore:5,riserva:40,ricarica:2.6,dispersione:0,mirino:!0}),raggi:cn({nome:"Pistola a raggi",modello:"Gun_Pistol",colore:4777471,danno:600,cadenza:.35,caricatore:20,riserva:160,ricarica:2.6,dispersione:.006,esplosione:un(1.8,400,"energia")}),plasma:cn({nome:"Pistola al plasma",modello:"Gun_Pistol",colore:6160234,danno:140,cadenza:.09,automatica:!0,caricatore:40,riserva:240,ricarica:2.2,dispersione:.02,esplosione:un(.9,80,"energia")}),gravitonica:cn({nome:"Pistola gravitonica",modello:"Gun_Pistol",colore:11560703,danno:900,cadenza:.7,caricatore:8,riserva:64,ricarica:2.8,dispersione:.004,esplosione:un(2.6,700,"energia")}),ioni:cn({nome:"Revolver a ioni",modello:"Gun_Revolver",colore:16767050,danno:1100,cadenza:.5,caricatore:6,riserva:48,ricarica:2.6,dispersione:.004,esplosione:un(1.2,300,"energia")}),fulmine:cn({nome:"Spara-fulmini",modello:"Gun_Revolver",colore:12577023,danno:800,cadenza:.8,caricatore:8,riserva:40,ricarica:3,dispersione:.004,esplosione:un(5,600,"fulmine")}),impulsi:cn({nome:"Revolver a impulsi",modello:"Gun_Revolver",colore:16732120,danno:450,cadenza:.25,caricatore:12,riserva:96,ricarica:2.4,dispersione:.01,esplosione:un(1.5,250,"energia")}),fucilePlasma:cn({nome:"Fucile al plasma",modello:"Gun_Rifle",colore:4063115,danno:180,cadenza:.08,automatica:!0,caricatore:50,riserva:300,ricarica:2.8,dispersione:.018,esplosione:un(1,110,"energia")}),lanciafiamme:cn({nome:"Fiammatore stellare",modello:"Gun_Rifle",colore:16742938,danno:30,cadenza:.05,automatica:!0,caricatore:100,riserva:300,ricarica:3.5,pallini:5,dispersione:.15,portata:7,fiamma:!0}),lanciagranate:cn({nome:"Lancia-sfere",modello:"Gun_Rifle",colore:16727976,danno:300,cadenza:.9,caricatore:4,riserva:32,ricarica:2.5,dispersione:.01,esplosione:un(3,900,"fuoco",16727976)}),lanciarazzi:cn({nome:"Cannone a particelle",modello:"Gun_Sniper",colore:16724016,danno:500,cadenza:1.2,caricatore:3,riserva:18,ricarica:3,dispersione:.006,esplosione:un(3.5,1400,"fuoco")}),laser:cn({nome:"Precisione al laser",modello:"Gun_Sniper",colore:5232895,danno:1600,cadenza:.6,caricatore:8,riserva:48,ricarica:2.8,dispersione:0,mirino:!0,esplosione:un(.8,300,"energia")}),disintegratore:cn({nome:"Disintegratore",modello:"Gun_Sniper",colore:14725375,danno:700,cadenza:.1,automatica:!0,caricatore:60,riserva:360,ricarica:3,dispersione:.01,esplosione:un(2,500,"energia"),segreta:!0})}),Id=Object.freeze({pistola:"Pistola Rovente",pompa:"Pompa Tempesta",mitra:"Mitra Vespa",assalto:"Assalto Lupo",mitragliatrice:"Mitragliatrice Tuono",precisione:"Precisione Falco",raggi:"Raggi Supernova",disintegratore:"Fine del Mondo"}),Il=Object.freeze(["Furia","Spettro","Cobra","Drago","Valanga","Inferno","Tempesta","Lupo","Falco","Vespa","Uragano","Tuono","Vipera"]);function Pd(i,e,t){return Object.freeze({...i,nome:Id[e]??`${i.nome} ${Il[t%Il.length]}`,danno:i.danno*2,caricatore:Math.round(i.caricatore*1.5),riserva:i.riserva*2,ricarica:i.ricarica*.85,esplosione:i.esplosione?un(i.esplosione.raggio*1.4,i.esplosione.danno*2,i.esplosione.tipo,i.esplosione.colore):void 0,potenziata:!0,base:e})}const xt=Object.freeze({...ds,...Object.fromEntries(Object.entries(ds).map(([i,e],t)=>[`${i}+`,Pd(e,i,t)]))}),Ld=Object.freeze(Object.keys(ds)),Uh=i=>i.endsWith("+")?null:`${i}+`,ps=i=>i.endsWith("+")?i.slice(0,-1):i,Ao=Object.freeze({danno:150,attesa:.6,portata:1.6}),Nd=Object.freeze({pistola:1,revolver:.9,mitra:1,assalto:1,battaglia:.8,mitragliatrice:.6,pompa:.9,precisione:.7,aliena:.35}),zh=Object.freeze(Ld.filter(i=>i!=="pistola"&&!ds[i].segreta)),Pl=Object.freeze(Object.fromEntries(zh.map(i=>[i,Nd[ds[i].famiglia]]))),Gi=Object.freeze({ferro:Object.freeze({nome:"Bibita Ferro",descrizione:"più vita",costo:2500,colore:12597547}),lampo:Object.freeze({nome:"Bibita Lampo",descrizione:"ricarica veloce",costo:2e3,colore:2600544}),ritorno:Object.freeze({nome:"Bibita Ritorno",descrizione:"rianimi in fretta",costo:1500,colore:3049182})}),bo=Object.freeze({normale:Object.freeze({nome:"Zombie",vita:1,velocita:1,danno:1,portata:1,punti:1}),magro:Object.freeze({nome:"Scuoiato",vita:.7,velocita:1.15,danno:1.1,portata:1.05,punti:1.2,corre:!0})}),Fh=Object.freeze(Object.keys(bo));function Od(i){return{normale:1,magro:i>=2?.25+Math.min(.35,(i-2)*.04):0}}function Dd(i,e){const t=Object.entries(Od(i)).filter(([,r])=>r>0);let n=e*t.reduce((r,[,s])=>r+s,0);for(const[r,s]of t)if(n-=s,n<0)return r;return t[t.length-1][0]}const Tn=Object.freeze({bomba:Object.freeze({nome:"Bomba!",descrizione:"tutti gli zombie saltano in aria",colore:16738858,simbolo:"BOOM"}),munizioni:Object.freeze({nome:"Munizioni al massimo",descrizione:"tutte le armi cariche",colore:10215773,simbolo:"MAX"}),doppi:Object.freeze({nome:"Punti doppi",descrizione:"per 30 secondi",colore:16767050,simbolo:"x2",durata:30}),secco:Object.freeze({nome:"Colpo secco",descrizione:"ogni colpo uccide, 30 secondi",colore:15921906,simbolo:"☠",durata:30}),saldi:Object.freeze({nome:"Saldi!",descrizione:"la cassa costa 10 punti, 30 secondi",colore:5227519,simbolo:"%",durata:30}),carpentiere:Object.freeze({nome:"Carpentiere",descrizione:"tutte le finestre riparate",colore:12749646,simbolo:"⚒"}),infinite:Object.freeze({nome:"Caricatore infinito",descrizione:"niente ricarica per 30 secondi",colore:16732120,simbolo:"∞",durata:30})}),yi=Object.freeze(Object.keys(Tn)),Bh=Object.freeze(yi.filter(i=>Tn[i].durata));function Ud(i){return 6+3*(i-1)}function zd(i){return i<10?150+100*(i-1):Math.round(950*1.1**(i-9))}function Fd(i){return i<=2?0:i===3?.25:i===4?.5:i<8?.8:1}function Bd(i){return Math.max(.6,2-(i-1)*.15)}function kh(i){const e=i+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),[((t^t>>>14)>>>0)/4294967296,e]}function kd(){return Math.floor(Math.random()*4294967296)>>>0}const Eo=.3,ms=3.2,kc=Object.freeze([Object.freeze({id:"atrio",nome:"Atrio",x0:-8,z0:-6,x1:8,z1:6,pavimento:"piastrelle"}),Object.freeze({id:"corridoio",nome:"Corridoio",x0:-2,z0:6,x1:2,z1:22,pavimento:"piastrelle"}),Object.freeze({id:"palestra",nome:"Palestra",x0:8,z0:-8,x1:24,z1:8,pavimento:"parquet"}),Object.freeze({id:"mensa",nome:"Mensa",x0:-16,z0:10,x1:-2,z1:24,pavimento:"linoleum"}),Object.freeze({id:"laboratorio",nome:"Laboratorio",x0:-2,z0:22,x1:8,z1:32,pavimento:"piastrelle"}),Object.freeze({id:"caldaia",nome:"Caldaia",x0:18,z0:-16,x1:26,z1:-8,pavimento:"cemento"}),Object.freeze({id:"cortile",nome:"Cortile",x0:8,z0:8,x1:26,z1:30,pavimento:"asfalto",aperto:!0}),Object.freeze({id:"sala",nome:"Sala d'attesa",x0:-48,z0:-5,x1:-28,z1:5,pavimento:"parquet",sala:!0})]),Si=Object.freeze({x0:-18,z0:-18,x1:28,z1:34}),Qe=(i,e,t)=>({x0:e,z0:i-Eo/2,x1:t,z1:i+Eo/2}),at=(i,e,t)=>({x0:i-Eo/2,z0:e,x1:i+Eo/2,z1:t}),Vc=Object.freeze([Qe(-6,-8,-5),Qe(-6,-3,3),Qe(-6,5,8),at(-8,-6,-1),at(-8,1,6),Qe(6,-8,-1),Qe(6,1,8),at(8,-8,-1),at(8,1,8),at(-2,6,13),at(-2,15,22),at(2,6,13),at(2,15,22),Qe(22,-2,-1),Qe(22,1,8),Qe(-8,8,15),Qe(-8,17,20),Qe(-8,22,24),at(24,-8,-4),at(24,-2,3),at(24,5,8),Qe(8,8,10),Qe(8,12,24),Qe(10,-16,-12),Qe(10,-10,-2),at(-16,10,15),at(-16,17,24),Qe(24,-16,-10),Qe(24,-8,-2),at(-2,22,24),at(-2,24,27),at(-2,29,32),at(8,22,32),Qe(32,-2,0),Qe(32,2,8),at(18,-16,-8),Qe(-8,24,26),at(26,-16,-13),at(26,-11,-8),Qe(-16,18,21),Qe(-16,23,26),Qe(-5,-48,-28),Qe(5,-48,-28),at(-48,-5,5),at(-28,-5,5)].map(Object.freeze)),Vh=Object.freeze([at(8,8,22),Qe(30,8,16),Qe(30,18,26),at(26,8,18),at(26,20,30),Qe(8,24,26)].map(Object.freeze)),Ns=2.6,Hc=Object.freeze([Object.freeze({x0:18,z0:5.2,x1:22.5,z1:7.8,altezza:1.2,tipo:"tribuna"}),Object.freeze({x0:11.5,z0:-3,x1:13,z1:-2,altezza:.9,tipo:"cavallina"}),Object.freeze({x0:-6.5,z0:1.5,x1:-4.5,z1:2.5,altezza:.8,tipo:"banco"}),Object.freeze({x0:-14,z0:12.5,x1:-10,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:12.5,x1:-4,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:16.5,x1:-10,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:16.5,x1:-4,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:20.5,x1:-10,z1:21.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-15.6,z0:22.6,x1:-11,z1:23.6,altezza:1.1,tipo:"bancone"}),Object.freeze({x0:0,z0:25,x1:2.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:4,z0:25,x1:6.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:0,z0:29,x1:2.5,z1:30,altezza:.95,tipo:"bancone"}),Object.freeze({x0:18.9,z0:-14,x1:21.2,z1:-11.8,altezza:2.6,tipo:"caldaia"}),Object.freeze({x0:19,z0:22,x1:24.5,z1:24.6,altezza:2.8,tipo:"pulmino"}),Object.freeze({x0:11.2,z0:16.2,x1:11.8,z1:16.8,altezza:4,tipo:"albero"}),Object.freeze({x0:21.7,z0:13.2,x1:22.3,z1:13.8,altezza:4,tipo:"albero"}),Object.freeze({x0:12.2,z0:26.2,x1:12.8,z1:26.8,altezza:4,tipo:"albero"}),Object.freeze({x0:15,z0:11.6,x1:17.5,z1:12.1,altezza:.5,tipo:"panchina"}),Object.freeze({x0:9.2,z0:20,x1:9.7,z1:22.5,altezza:.5,tipo:"panchina"}),Object.freeze({x0:16.85,z0:19.85,x1:17.15,z1:20.15,altezza:3,tipo:"lampione"}),Object.freeze({x0:10.35,z0:27.35,x1:10.65,z1:27.65,altezza:3,tipo:"lampione"})]);function Bt(i,e,t,n,r,s,o,a=!1){const c=t==="z"?{x:(r+s)/2,z:n}:{x:n,z:(r+s)/2},l=t==="z"?Qe(n,r,s):at(n,r,s),u=t==="z"?{x:0,z:o}:{x:o,z:0};return Object.freeze({id:i,zona:e,asse:t,centro:Object.freeze(c),scatola:Object.freeze(l),esterno:Object.freeze({x:c.x+u.x*1.1,z:c.z+u.z*1.1}),interno:Object.freeze({x:c.x-u.x*1.1,z:c.z-u.z*1.1}),comparsa:Object.freeze({x:c.x+u.x*4,z:c.z+u.z*4}),fuori:Object.freeze(u),recinzione:a})}const On=Object.freeze([Bt("a1","atrio","z",-6,-5,-3,-1),Bt("a2","atrio","z",-6,3,5,-1),Bt("a3","atrio","x",-8,-1,1,-1),Bt("c2","corridoio","x",2,13,15,1),Bt("p1","palestra","z",-8,15,17,-1),Bt("p2","palestra","x",24,-4,-2,1),Bt("p3","palestra","x",24,3,5,1),Bt("m1","mensa","x",-16,15,17,-1),Bt("m2","mensa","z",24,-10,-8,1),Bt("m3","mensa","z",10,-12,-10,-1),Bt("l1","laboratorio","z",32,0,2,1),Bt("l2","laboratorio","x",-2,27,29,-1),Bt("g1","cortile","z",30,16,18,1,!0),Bt("g2","cortile","x",26,18,20,1,!0),Bt("k1","caldaia","z",-16,21,23,-1),Bt("k2","caldaia","x",26,-13,-11,1)]);function $i(i,e,t,n,r){return Object.freeze({id:i,nome:e,costo:t,zone:Object.freeze(n),scatola:Object.freeze(r),centro:Object.freeze({x:(r.x0+r.x1)/2,z:(r.z0+r.z1)/2})})}const Wi=Object.freeze([$i("corridoio","Porta del corridoio",750,["atrio","corridoio"],Qe(6,-1,1)),$i("palestra","Porta della palestra",1e3,["atrio","palestra"],at(8,-1,1)),$i("mensa","Porta della mensa",1250,["corridoio","mensa"],at(-2,13,15)),$i("laboratorio","Porta del laboratorio",1500,["corridoio","laboratorio"],Qe(22,-1,1)),$i("caldaia","Porta della caldaia",1e3,["palestra","caldaia"],Qe(-8,20,22)),$i("cortile","Porta del cortile",1250,["palestra","cortile"],Qe(8,10,12))]),Zn=Object.freeze([Object.freeze({id:"muro-pompa",tipo:"arma",arma:"pompa",costo:800,munizioni:400,zona:"atrio",posizione:Object.freeze({x:-5,z:5.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-mitra",tipo:"arma",arma:"mitra",costo:1200,munizioni:600,zona:"corridoio",posizione:Object.freeze({x:-1.84,z:10}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-assalto",tipo:"arma",arma:"assalto",costo:1500,munizioni:750,zona:"palestra",posizione:Object.freeze({x:14,z:7.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-precisione",tipo:"arma",arma:"precisione",costo:1750,munizioni:900,zona:"mensa",posizione:Object.freeze({x:-15.84,z:20}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"bibita-ferro",tipo:"bevanda",bevanda:"ferro",zona:"atrio",posizione:Object.freeze({x:7,z:4.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-lampo",tipo:"bevanda",bevanda:"lampo",zona:"corridoio",posizione:Object.freeze({x:1.45,z:19.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-ritorno",tipo:"bevanda",bevanda:"ritorno",zona:"palestra",posizione:Object.freeze({x:23,z:-6.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"cassa",tipo:"cassa",zona:"palestra",posizione:Object.freeze({x:16,z:7.2}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"interruttore",tipo:"interruttore",zona:"caldaia",posizione:Object.freeze({x:25.7,z:-9.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"potenziatore",tipo:"potenziatore",zona:"laboratorio",posizione:Object.freeze({x:6.6,z:30.6}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-raffica",tipo:"arma",arma:"raffica",costo:900,munizioni:450,zona:"laboratorio",posizione:Object.freeze({x:7.84,z:24.2}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-carabina",tipo:"arma",arma:"carabina",costo:1600,munizioni:800,zona:"cortile",posizione:Object.freeze({x:18,z:8.16}),verso:Object.freeze({x:0,z:1})}),Object.freeze({id:"muro-doppietta",tipo:"arma",arma:"doppietta",costo:1e3,munizioni:500,zona:"caldaia",posizione:Object.freeze({x:18.16,z:-9.6}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"campanella",tipo:"campanella",zona:"atrio",posizione:Object.freeze({x:-3,z:5.84}),verso:Object.freeze({x:0,z:-1})})]);function Hh(i){if(i.tipo==="arma"||i.tipo==="interruttore"||i.tipo==="campanella")return null;const{x:e,z:t}=i.posizione,n=i.tipo==="potenziatore"?.8:.5,r=i.tipo==="potenziatore"?.6:.35;return i.verso.x!==0?{x0:e-r,z0:t-n,x1:e+r,z1:t+n}:{x0:e-n,z0:t-r,x1:e+n,z1:t+r}}const To=Object.freeze([Object.freeze({x:-1.5,z:0}),Object.freeze({x:1.5,z:0})]),Vd=Object.freeze([Object.freeze({x:-45,z:-1.2}),Object.freeze({x:-45,z:1.2})]),Os=Object.freeze({x:-28.16,z:0,verso:Object.freeze({x:-1,z:0})}),ki=Object.freeze([Object.freeze({id:0,x:19.6,z:-15.3,y:.25}),Object.freeze({id:1,x:-13.4,z:13,y:.86}),Object.freeze({id:2,x:12.5,z:27.7,y:.25})]),vn=(i,e,t,n)=>Object.freeze({x0:i-t/2,z0:e-n/2,x1:i+t/2,z1:e+n/2,altezza:1}),Gh=Object.freeze([{modello:"covered_car",x:30.5,z:13.5,rot:.15},{modello:"covered_car",x:31.2,z:25.5,rot:-.2},{modello:"covered_car",x:2.5,z:36.5,rot:Math.PI/2+.1},{modello:"barrel_03",x:25.2,z:9,rot:.3,solido:vn(25.2,9,.65,.65)},{modello:"barrel_03",x:24.4,z:9.3,rot:1.2,solido:vn(24.4,9.3,.65,.65)},{modello:"old_military_crate",x:9.5,z:14.5,rot:Math.PI/2,solido:vn(9.5,14.5,1,1.85)},{modello:"metal_trash_can",x:22,z:28.9,rot:Math.PI,solido:vn(22,28.9,1.9,.6)},{modello:"trashbag",x:25.3,z:28.9,rot:0},{modello:"trashbag",x:24.6,z:29.2,rot:2},{modello:"wooden_crate_01",x:25.2,z:26.4,rot:.2},{modello:"wooden_crate_01",x:24.9,z:11.4,rot:1.4},{modello:"barrel_03",x:18.5,z:25.2,rot:0,solido:vn(18.5,25.2,.65,.65)},{modello:"trashbag",x:9,z:9.1,rot:.8},{modello:"wooden_crate_01",x:18.6,z:-12.9,rot:Math.PI/2},{modello:"wooden_crate_01",x:25.3,z:-15.2,rot:.3},{modello:"trashbag",x:-10.2,z:23.3,rot:0},{modello:"barrel_03",x:7.3,z:23.1,rot:0,solido:vn(7.3,23.1,.65,.65)},{modello:"old_military_crate",x:10.2,z:-7.3,rot:0,solido:vn(10.2,-7.3,1.85,1)},{modello:"metal_office_desk",x:-5.5,z:2,rot:0},{modello:"painted_wooden_chair_01",x:-5.5,z:2.75,rot:Math.PI},{modello:"sofa_02",x:-44.5,z:4.3,rot:Math.PI,solido:vn(-44.5,4.3,1.85,.85)},{modello:"sofa_02",x:-40,z:4.3,rot:Math.PI,solido:vn(-40,4.3,1.85,.85)},{modello:"painted_wooden_chair_01",x:-36,z:-4.4,rot:0},{modello:"painted_wooden_chair_01",x:-35,z:-4.4,rot:.2},{modello:"barrel_03",x:-29,z:-4,rot:0,solido:vn(-29,-4,.65,.65)},{modello:"barrel_03",x:-29,z:4,rot:1,solido:vn(-29,4,.65,.65)}].map(Object.freeze));function Gc(i){const e=new Set(["atrio"]);for(const t of Wi)i.has(t.id)&&t.zone.forEach(n=>e.add(n));return e}function Wc(i){return[...Vc,...Vh,...Hc,...On.map(e=>e.scatola),...Wi.filter(e=>!i.has(e.id)).map(e=>e.scatola),...Zn.map(Hh).filter(Boolean),...Gh.filter(e=>e.solido).map(e=>e.solido)]}const Hd=.2,Ll=(i,e,t)=>Math.min(t,Math.max(e,i));function Gd(i,e,t,n){const r=Ll(i,n.x0,n.x1),s=Ll(e,n.z0,n.z1),o=i-r,a=e-s,c=o*o+a*a;if(c>=t*t)return[i,e];if(c>1e-9){const f=Math.sqrt(c);return[r+o/f*t,s+a/f*t]}const l=[[i-n.x0,n.x0-t,e],[n.x1-i,n.x1+t,e],[e-n.z0,i,n.z0-t],[n.z1-e,i,n.z1+t]],[,u,h]=l.reduce((f,d)=>d[0]<f[0]?d:f);return[u,h]}function Wh(i,e,t,n,r){let{x:s,z:o}=i;const a=Math.max(1,Math.ceil(Math.hypot(e,t)/Hd));for(let c=0;c<a;c++){s+=e/a,o+=t/a;for(let l=0;l<2;l++)for(const u of r)[s,o]=Gd(s,o,n,u)}return{x:s,z:o}}function Wd(i,e,t){const n=e.x-i.x,r=e.z-i.z;for(const s of t){let o=0,a=1,c=!1;for(const[l,u,h,f]of[[i.x,n,s.x0,s.x1],[i.z,r,s.z0,s.z1]]){if(Math.abs(u)<1e-9){(l<h||l>f)&&(c=!0);continue}let d=(h-l)/u,_=(f-l)/u;d>_&&([d,_]=[_,d]),o=Math.max(o,d),a=Math.min(a,_)}if(!c&&o<=a)return!1}return!0}function Nl(i,e,t,n=0){return i>=t.x0-n&&i<=t.x1+n&&e>=t.z0-n&&e<=t.z1+n}const fo=Object.freeze({raggio:.32,basso:0,alto:1.45}),Wa=Object.freeze({raggio:.17,altezza:1.62});function Xd(i,e,t,n=0,r=ms){let s=0,o=1/0;for(const[a,c,l,u]of[[i.x,e.x,t.x0,t.x1],[i.y,e.y,n,r],[i.z,e.z,t.z0,t.z1]]){if(Math.abs(c)<1e-9){if(a<l||a>u)return 1/0;continue}let h=(l-a)/c,f=(u-a)/c;if(h>f&&([h,f]=[f,h]),s=Math.max(s,h),o=Math.min(o,f),s>o)return 1/0}return s}function jd(i,e,t,n){const r=i.x-t.x,s=i.y-t.y,o=i.z-t.z,a=r*e.x+s*e.y+o*e.z,c=r*r+s*s+o*o-n*n,l=a*a-c;if(l<0)return 1/0;const u=-a-Math.sqrt(l);return u>=0?u:1/0}function qd(i,e,t,n,r,s,o){const a=i.x-t,c=i.z-n,l=e.x*e.x+e.z*e.z;if(l<1e-12)return 1/0;const u=a*e.x+c*e.z,h=a*a+c*c-r*r,f=u*u-l*h;if(f<0)return 1/0;const d=(-u-Math.sqrt(f))/l;if(d<0)return 1/0;const _=i.y+e.y*d;return _>=s&&_<=o?d:1/0}function Yd(i,e,t){let n=1/0;for(const r of t)n=Math.min(n,Xd(i,e,r,0,r.altezza??ms));return n}function Xh(i,e,t,n,r=1/0){const s=Math.min(r,Yd(i,e,n));let o=null;for(const a of t){const c=jd(i,e,a.testa??{x:a.x,y:Wa.altezza,z:a.z},Wa.raggio),l=qd(i,e,a.x,a.z,a.raggio??fo.raggio,fo.basso,a.alto??fo.alto),u=Math.min(c,l);u>=s||o&&u>=o.t||(o={id:a.id,t:u,testa:c<=l})}return o??{id:null,t:s,testa:!1}}function $d(i,e,t){const n=[];for(const r of e){const s=Math.hypot(r.x-i.x,fo.alto/2-i.y,r.z-i.z);s<t&&n.push({id:r.id,fattore:1-s/t})}return n}function jh(i,e){const t=Math.cos(e);return{x:Math.sin(i)*t,y:Math.sin(e),z:Math.cos(i)*t}}function Kd(i,e,t){if(e<=0)return i;const n=i.x+(t()-.5)*2*e,r=i.y+(t()-.5)*2*e,s=i.z+(t()-.5)*2*e,o=Math.hypot(n,r,s);return{x:n/o,y:r/o,z:s/o}}const Zd=.5,qh=.35,wo=i=>({tipo:i,caricatore:xt[i].caricatore,riserva:xt[i].riserva});function Yh(){return{armi:[wo("pistola")],attiva:0,attesa:0,ricarica:0,cambio:0,coltello:0}}const $t=i=>i.armi[i.attiva],$h=i=>i.ricarica>0||i.cambio>0||i.coltello>0;function Jd(i,e){if(i.attesa=Math.max(0,i.attesa-e),i.cambio=Math.max(0,i.cambio-e),i.coltello=Math.max(0,i.coltello-e),i.ricarica<=0||(i.ricarica-=e,i.ricarica>0))return!1;i.ricarica=0;const t=$t(i),n=xt[t.tipo].caricatore-t.caricatore,r=Math.min(n,t.riserva);return t.caricatore+=r,t.riserva-=r,!0}function Qd(i){const e=$t(i);return $h(i)||i.attesa>0||e.caricatore<=0?null:(e.caricatore-=1,i.attesa=xt[e.tipo].cadenza,xt[e.tipo])}function Zo(i,e=[]){const t=$t(i);return $h(i)||t.riserva<=0||t.caricatore>=xt[t.tipo].caricatore?!1:(i.ricarica=xt[t.tipo].ricarica*(e.includes("lampo")?Zd:1),!0)}function ep(i){return i.coltello>0||i.cambio>0?!1:(i.ricarica=0,i.coltello=Ao.attesa,!0)}function Ol(i,e=(i.attiva+1)%i.armi.length){return e===i.attiva||!i.armi[e]?!1:(i.attiva=e,i.ricarica=0,i.cambio=qh,!0)}function tp(i,e,t=null){var s;const n=(s=$t(i))==null?void 0:s.tipo,r=new Map(i.armi.map(o=>[o.tipo,o]));i.armi=e.map(o=>o===t?wo(o):r.get(o)??wo(o)),i.attiva=Math.max(0,i.armi.findIndex(o=>o.tipo===(t??n))),t&&(i.cambio=qh,i.ricarica=0)}function Dl(i,e){const t=i.armi.find(n=>n.tipo===e);t&&Object.assign(t,wo(e))}function Xa(i){Object.assign(i,Yh())}const Gr=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z);function np(i,e){var s;if(e.fase==="attesa")return null;const t=e.giocatori.find(o=>o.id!==i.id&&o.stato==="terra"&&Gr(o,i)<=se.RIANIMA_DISTANZA);if(t)return{tipo:"rianima",testo:`Tieni premuto F per rianimare ${t.nome}`,bersaglio:t.id};const n=[];for(const o of ki){if((s=e.frammenti)!=null&&s.includes(o.id))continue;const a=Gr(o,i);a<=se.DISTANZA_FRAMMENTO&&n.push({d:a-1,tipo:"frammento",id:o.id,acquisto:`frammento:${o.id}`,testo:"Premi F per raccogliere lo strano frammento luminoso"})}for(const o of Wi){if(e.porte.has(o.id))continue;const a=Gr(o.centro,i);a<=se.DISTANZA_ACQUISTO&&n.push({d:a,tipo:"compra",acquisto:`porta:${o.id}`,costo:o.costo,testo:`Premi F per aprire: ${o.nome} [${o.costo}]`})}for(const o of On){if(e.finestre[o.id]>=se.ASSE_PER_FINESTRA)continue;const a=Gr(o.interno,i);a<=se.DISTANZA_FINESTRA&&n.push({d:a+.5,tipo:"assa",finestra:o.id,testo:"Tieni premuto F per rimettere le assi"})}const r=Gc(e.porte);for(const o of Zn){if(!r.has(o.zona))continue;const a=Gr(o.posizione,i);a>se.DISTANZA_ACQUISTO||n.push({d:a,tipo:"compra",acquisto:o.id,...rp(o,i,e)})}return n.sort((o,a)=>o.d-a.d),n[0]??null}function ip(i,e){const t=e.potenziatore;return e.corrente?t.stato==="pronta"&&t.per===i.id?{costo:0,testo:`Premi F per prendere: ${xt[t.arma].nome}`}:t.stato!=="libero"?{costo:1/0,testo:t.per===i.id?"Il potenziatore sta lavorando…":"Il potenziatore è occupato"}:(i.armaAttiva?Uh(i.armaAttiva):null)?{costo:se.COSTO_POTENZIA,testo:`Premi F per potenziare: ${xt[i.armaAttiva].nome} [${se.COSTO_POTENZIA}]`}:{costo:1/0,testo:"Questa arma è già potenziata"}:{costo:1/0,testo:"Il potenziatore non ha corrente: accendila in caldaia"}}function rp(i,e,t){var s;if(i.tipo==="arma"){const o=e.armi.some(c=>ps(c)===i.arma),a=o?i.munizioni:i.costo;return{costo:a,testo:o?`Premi F per le munizioni: ${xt[i.arma].nome} [${a}]`:`Premi F per comprare: ${xt[i.arma].nome} [${a}]`}}if(i.tipo==="bevanda"){const o=Gi[i.bevanda];return e.bevande.includes(i.bevanda)?{costo:1/0,testo:`${o.nome}: ce l'hai già`}:{costo:o.costo,testo:`Premi F per bere: ${o.nome}, ${o.descrizione} [${o.costo}]`}}if(i.tipo==="interruttore")return t.corrente?{costo:1/0,testo:"La corrente è accesa"}:{costo:0,testo:"Premi F per accendere la corrente"};if(i.tipo==="potenziatore")return ip(e,t);if(i.tipo==="campanella")return{costo:0,testo:"Premi F per suonare la vecchia campanella"};const n=t.cassa;if(n.stato==="aperta"&&n.per===e.id)return{costo:0,testo:`Premi F per prendere: ${xt[n.arma].nome}`};if(n.stato==="aperta")return{costo:1/0,testo:"La cassa è occupata"};const r=((s=t.effetti)==null?void 0:s.saldi)>0?se.COSTO_CASSA_SALDI:se.COSTO_CASSA;return{costo:r,testo:`Premi F per la cassa a sorpresa [${r}]${r<se.COSTO_CASSA?" SALDI!":""}`}}const Er=.5,gs=Math.ceil((Si.x1-Si.x0)/Er),Ro=Math.ceil((Si.z1-Si.z0)/Er),Kh=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]],Jo=new Map,fn=(i,e)=>e*gs+i,Zh=(i,e)=>[Math.floor((i-Si.x0)/Er),Math.floor((e-Si.z0)/Er)],Jh=(i,e)=>[Si.x0+(i+.5)*Er,Si.z0+(e+.5)*Er],Co=(i,e)=>i>=0&&e>=0&&i<gs&&e<Ro;function sp(i){const e=[...i].sort().join(",");if(Jo.has(e))return Jo.get(e);const t=Wc(i),n=new Uint8Array(gs*Ro);for(let s=0;s<Ro;s++)for(let o=0;o<gs;o++){const[a,c]=Jh(o,s),l=kc.some(h=>Nl(a,c,h)),u=t.some(h=>Nl(a,c,h,se.RAGGIO_ZOMBIE));n[fn(o,s)]=l&&!u?1:0}const r={libera:n};return Jo.set(e,r),r}function op(i,e){const t=new Float32Array(gs*Ro).fill(1/0),n=[];for(const{x:r,z:s}of e){const[o,a]=Zh(r,s);Co(o,a)&&(t[fn(o,a)]=0,n.push([o,a]))}for(let r=0;r<n.length;r++){const[s,o]=n[r],a=t[fn(s,o)];for(const[c,l,u]of Kh){const h=s+c,f=o+l;if(!Co(h,f)||!i.libera[fn(h,f)]||c&&l&&(!i.libera[fn(s+c,o)]||!i.libera[fn(s,o+l)]))continue;const d=a+u;d>=t[fn(h,f)]||(t[fn(h,f)]=d,n.push([h,f]))}}return{distanze:t,libera:i.libera}}function ap(i,e,t){const[n,r]=Zh(e,t);if(!Co(n,r))return null;let s=i.distanze[fn(n,r)],o=null;for(const[u,h]of Kh){const f=n+u,d=r+h;if(!Co(f,d)||u&&h&&(!i.libera[fn(n+u,r)]||!i.libera[fn(n,r+h)]))continue;const _=i.distanze[fn(f,d)];_<s&&(s=_,o=[f,d])}if(!o)return null;const[a,c]=Jh(o[0],o[1]),l=Math.hypot(a-e,c-t)||1;return{x:(a-e)/l,z:(c-t)/l}}const Qh=3,_s=.8,cp=2e3,lp=.25,ef=4,up=.55,Ul=.75,hp="disintegratore",zl=Object.freeze({x:-3,z:4.4}),Ai=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Xc=i=>On.find(e=>e.id===i),tf=i=>bo[i.tipo]??bo.normale,fp=()=>Object.fromEntries(yi.filter(i=>Tn[i].durata).map(i=>[i,0]));function Tr(i,e,t){e.punti+=Math.round(t)*(i.effetti.doppi>0?2:1)}function Pn(i){const[e,t]=kh(i.rng);return i.rng=t,e}function dp({seme:i,giocatori:e=[],sala:t=!1}){const n={seme:i>>>0,rng:(i^1540483477)>>>0,tempo:0,fase:t?"attesa":"intervallo",timerFase:t?0:Qh,conto:null,bonus:[],bonusRound:0,prossimoBonus:1,effetti:fp(),frammenti:[],segreto:!1,campanella:!1,round:0,daGenerare:0,attesaComparsa:0,prossimoId:1,zombie:[],finestre:Object.fromEntries(On.map(r=>[r.id,se.ASSE_PER_FINESTRA])),porte:[],giocatori:[],cassa:{stato:"chiusa",arma:null,per:null,timer:0},corrente:!1,potenziatore:{stato:"libero",arma:null,per:null,timer:0},campo:null,attesaCampo:0};return e.forEach(r=>jc(n,r)),n}function jc(i,{id:e,nome:t}){const n=i.giocatori.find(a=>a.id===e);if(n)return n.nome=t,n;const r=i.fase==="attesa"?Vd:To,s=r[i.giocatori.length%r.length],o={id:e,nome:t,x:s.x,z:s.z,yaw:i.fase==="attesa"?Math.PI/2:Math.PI,pitch:0,pronto:!1,stato:"vivo",vita:se.VITA,vitaMax:se.VITA,ultimoDanno:-1/0,timerTerra:0,punti:se.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,progressoRianimazione:0,attesaAssa:0,colpi:0,uccisioni:0,teletrasporto:0};return i.giocatori.push(o),o}function nf(i,e){i.giocatori=i.giocatori.filter(t=>t.id!==e)}const bi=i=>i.giocatori.filter(e=>e.stato==="vivo");function pp(i,e){for(const t of i.giocatori){const n=e==null?void 0:e[t.id];n&&(t.armaAttiva=t.armi.includes(n.arma)?n.arma:t.armaAttiva,t.colpi=Number.isFinite(n.colpi)?n.colpi:t.colpi,!(t.stato!=="vivo"||(n.tp??0)<t.teletrasporto)&&(t.x=n.x,t.z=n.z,t.yaw=n.yaw,t.pitch=n.pitch))}}function ja(i,e,t,n,r={}){e.armi.includes(t)||(e.armi.length<2?e.armi.push(t):e.armi[e.armi.indexOf(e.armaAttiva)]=t),e.armaAttiva=t,n.push({k:"acquisto",a:e.id,arma:t,armi:[...e.armi],...r})}function mp(i,e,t,n,r){e.armi.includes(n)&&(e.armaAttiva=n);const s=Gc(new Set(i.porte));if(t.startsWith("porta:")){const h=Wi.find(f=>`porta:${f.id}`===t);if(!h||i.porte.includes(h.id)||e.punti<h.costo||Ai(e,h.centro)>se.DISTANZA_ACQUISTO+_s)return;e.punti-=h.costo,i.porte.push(h.id),r.push({k:"porta",id:h.id,da:e.id});return}const o=Zn.find(h=>h.id===t);if(!o||!s.has(o.zona)||Ai(e,o.posizione)>se.DISTANZA_ACQUISTO+_s)return;if(o.tipo==="arma"){const h=e.armi.find(d=>ps(d)===o.arma),f=h?o.munizioni:o.costo;if(e.punti<f)return;e.punti-=f,h?r.push({k:"munizioni",a:e.id,arma:h}):ja(i,e,o.arma,r);return}if(o.tipo==="interruttore"){if(i.corrente)return;i.corrente=!0,r.push({k:"corrente",da:e.id});return}if(o.tipo==="potenziatore"){gp(i,e,r);return}if(o.tipo==="campanella"){const h=!i.campanella;i.campanella=!0,h&&rf(i,zl.x,zl.z,yi[Math.floor(Pn(i)*yi.length)],r),r.push({k:"campanella",da:e.id,regalo:h});return}if(o.tipo==="bevanda"){const h=Gi[o.bevanda];if(e.bevande.includes(o.bevanda)||e.punti<h.costo)return;e.punti-=h.costo,e.bevande.push(o.bevanda),o.bevanda==="ferro"&&(e.vitaMax=se.VITA_FERRO,e.vita=se.VITA_FERRO),r.push({k:"bevanda",a:e.id,bevanda:o.bevanda});return}const a=i.cassa;if(a.stato==="aperta"&&a.per===e.id){const h=a.arma;Object.assign(a,{stato:"chiusa",arma:null,per:null,timer:0}),ja(i,e,h,r,{daCassa:!0});return}const c=i.effetti.saldi>0?se.COSTO_CASSA_SALDI:se.COSTO_CASSA;if(a.stato!=="chiusa"||e.punti<c)return;e.punti-=c;const l=new Set(e.armi.map(ps)),u=vp(zh.filter(h=>!l.has(h)),Pn(i));Object.assign(a,{stato:"aperta",arma:u,per:e.id,timer:se.DURATA_CASSA}),r.push({k:"cassa",a:e.id,arma:u})}function gp(i,e,t){const n=i.potenziatore;if(n.stato==="pronta"&&n.per===e.id){const s=e.armi.indexOf(ps(n.arma));s>=0?e.armi[s]=n.arma:e.armi.length<2?e.armi.push(n.arma):e.armi[e.armi.indexOf(e.armaAttiva)]=n.arma,e.armaAttiva=n.arma,t.push({k:"acquisto",a:e.id,arma:n.arma,armi:[...e.armi],potenziata:!0}),Object.assign(n,{stato:"libero",arma:null,per:null,timer:0});return}const r=Uh(e.armaAttiva);!i.corrente||n.stato!=="libero"||!r||e.punti<se.COSTO_POTENZIA||(e.punti-=se.COSTO_POTENZIA,Object.assign(n,{stato:"lavora",arma:r,per:e.id,timer:se.DURATA_POTENZIA}),t.push({k:"potenzia",a:e.id,arma:r}))}function _p(i,e,t){const n=i.potenziatore;if(n.stato!=="libero"&&(n.timer-=e,!(n.timer>0))){if(n.stato==="lavora"){Object.assign(n,{stato:"pronta",timer:se.ATTESA_RITIRO}),t.push({k:"potenziataPronta",a:n.per,arma:n.arma});return}Object.assign(n,{stato:"libero",arma:null,per:null,timer:0})}}function vp(i,e){const t=i.reduce((r,s)=>r+Pl[s],0);let n=e*t;for(const r of i)if(n-=Pl[r],n<0)return r;return i[i.length-1]}function xp(i,e,t,n){const r=i.zombie.find(o=>o.id===t.zombie&&o.stato!=="morto");if(!r)return;const s=i.effetti.secco>0?r.vita:Math.min(cp,Math.max(0,Number(t.danno)||0));if(r.vita-=s,r.vita>0){Tr(i,e,se.PUNTI_COLPO),n.push({k:"colpito",zombie:r.id,testa:!!t.testa,da:e.id});return}r.stato="morto",r.timer=ef,n.push({k:"ucciso",zombie:r.id,testa:!!t.testa,da:e.id,x:r.x,z:r.z}),e.uccisioni+=1,Tr(i,e,(t.coltello?se.PUNTI_COLTELLO:t.testa?se.PUNTI_TESTA:se.PUNTI_UCCISIONE)*tf(r).punti),Mp(i,r,n)}function Mp(i,e,t){if(i.bonusRound>=se.BONUS_PER_ROUND||Pn(i)>=se.PROBABILITA_BONUS)return;const r=(e.stato==="arriva"||e.stato==="assi")&&e.finestra?Xc(e.finestra).interno:e;i.bonusRound+=1,rf(i,r.x,r.z,yi[Math.floor(Pn(i)*yi.length)],t)}function rf(i,e,t,n,r=[]){const s={id:i.prossimoBonus++,tipo:n,x:e,z:t,timer:se.DURATA_BONUS_A_TERRA};return i.bonus.push(s),r.push({k:"bonusCompare",id:s.id,tipo:n,x:e,z:t}),s}function yp(i,e,t,n){const r=Tn[e.tipo];if(r.durata&&(i.effetti[e.tipo]=r.durata),e.tipo==="bomba"){for(const s of i.zombie)s.stato!=="morto"&&(s.stato="morto",s.timer=ef,n.push({k:"ucciso",zombie:s.id,testa:!1,da:null,x:s.x,z:s.z,bomba:!0}));for(const s of bi(i))Tr(i,s,se.PUNTI_BOMBA)}if(e.tipo==="carpentiere"){for(const s of On)i.finestre[s.id]=se.ASSE_PER_FINESTRA;for(const s of bi(i))Tr(i,s,se.PUNTI_CARPENTIERE)}n.push({k:"bonus",tipo:e.tipo,da:t.id,x:e.x,z:e.z})}function Sp(i,e,t){for(const n of Object.keys(i.effetti))i.effetti[n]=Math.max(0,i.effetti[n]-e);i.bonus=i.bonus.filter(n=>{n.timer-=e;const r=bi(i).find(s=>Ai(s,n)<=se.DISTANZA_BONUS);return r?(yp(i,n,r,t),!1):n.timer>0})}function Ap(i,e,t,n){const r=ki.find(s=>s.id===t);if(!(!r||i.fase==="attesa"||i.frammenti.includes(t))&&!(Ai(e,r)>se.DISTANZA_FRAMMENTO+_s)&&(i.frammenti.push(t),n.push({k:"frammento",id:t,da:e.id,trovati:i.frammenti.length,totale:ki.length}),!(i.frammenti.length<ki.length))){i.segreto=!0;for(const s of bi(i))Tr(i,s,se.PUNTI_SEGRETO),ja(i,s,hp,n,{segreto:!0});n.push({k:"segreto"})}}function bp(i,e){i.zombie=[],i.conto=null,i.fase="intervallo",i.timerFase=Qh,i.giocatori.forEach((t,n)=>{const r=To[n%To.length];Object.assign(t,{x:r.x,z:r.z,yaw:Math.PI,stato:"vivo",vita:se.VITA,vitaMax:se.VITA,punti:se.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],pronto:!1,uccisioni:0,teletrasporto:t.teletrasporto+1})}),e.push({k:"via"})}function Ep(i,e,t){if(!(i.giocatori.length>0&&i.giocatori.every(r=>r.pronto))){i.conto!==null&&t.push({k:"contoAnnullato"}),i.conto=null;return}if(i.conto===null){i.conto=se.CONTO_ALLA_ROVESCIA,t.push({k:"conto",secondi:se.CONTO_ALLA_ROVESCIA});return}i.conto-=e,i.conto<=0&&bp(i,t)}function Tp(i,e,t,n){const r=Xc(t);!r||e.attesaAssa>0||i.finestre[r.id]>=se.ASSE_PER_FINESTRA||Ai(e,r.interno)>se.DISTANZA_FINESTRA+_s||i.zombie.some(s=>s.finestra===r.id&&s.stato==="scavalca")||(i.finestre[r.id]+=1,Tr(i,e,se.PUNTI_ASSA),e.attesaAssa=se.RICOSTRUISCI_OGNI,n.push({k:"assaMessa",finestra:r.id,da:e.id}))}function wp(i,e,t){for(const n of e??[]){const r=i.giocatori.find(s=>s.id===n.da);if(r){if(n.tipo==="rianima"){r.rianimando=!!n.attivo;continue}if(!(r.stato!=="vivo"||i.fase==="fine"))if(n.tipo==="colpo")xp(i,r,n,t);else if(n.tipo==="pronto")r.pronto=i.fase==="attesa"&&!!n.attivo;else{if(i.fase==="attesa")continue;n.tipo==="compra"?mp(i,r,String(n.acquisto),n.arma,t):n.tipo==="assa"?Tp(i,r,n.finestra,t):n.tipo==="frammento"&&Ap(i,r,Number(n.id),t)}}}}function Rp(i){const e=Gc(new Set(i.porte)),t=On.filter(c=>e.has(c.zona)),n=t[Math.floor(Pn(i)*t.length)],r=Dd(i.round,Pn(i)),s=bo[r],o=!!s.corre||Pn(i)<Fd(i.round),a=Math.round(zd(i.round)*s.vita);i.zombie.push({id:i.prossimoId++,x:n.comparsa.x+(Pn(i)-.5)*2,z:n.comparsa.z+(Pn(i)-.5)*2,yaw:Math.atan2(-n.fuori.x,-n.fuori.z),stato:"arriva",finestra:n.id,vita:a,vitaMax:a,tipo:r,corre:o,variante:Math.floor(Pn(i)*4),timer:0,attesa:0,bersaglio:null})}function Cp(i,e,t){if(i.fase==="attesa"){Ep(i,e,t);return}if(i.fase==="intervallo"){if(i.timerFase-=e,i.timerFase>0)return;i.round+=1,i.bonusRound=0,i.fase="gioco",i.daGenerare=Ud(i.round),i.attesaComparsa=1;for(const r of i.giocatori){if(r.stato!=="morto")continue;const s=To[0];Object.assign(r,{stato:"vivo",vita:se.VITA,vitaMax:se.VITA,x:s.x,z:s.z,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,teletrasporto:r.teletrasporto+1}),t.push({k:"rinato",a:r.id})}t.push({k:"round",round:i.round});return}if(i.fase!=="gioco")return;i.attesaComparsa-=e;const n=i.zombie.filter(r=>r.stato!=="morto").length;if(i.attesaComparsa<=0&&i.daGenerare>0&&n<se.ZOMBIE_VIVI_MAX){Rp(i),i.daGenerare-=1,i.attesaComparsa=Bd(i.round);return}i.daGenerare===0&&n===0&&(i.fase="intervallo",i.timerFase=se.INTERVALLO,t.push({k:"fineRound",round:i.round}))}function Ip(i,e,t){let n=null;for(const r of bi(i)){const s=Ai(r,e);s>3||n&&s>=n.d||!Wd(e,r,t)||(n={g:r,d:s})}return n}function Pp(i,e,t){const n=new Set(i.porte);i.attesaCampo-=e,(!i.campo||i.attesaCampo<=0)&&(i.campo=op(sp(n),bi(i)),i.attesaCampo=lp);const r=Wc(n);for(const s of i.zombie){s.attesa=Math.max(0,s.attesa-e);const o=tf(s),a=(s.corre?se.VELOCITA_CORRE:se.VELOCITA_CAMMINA)*o.velocita,c=se.PORTATA_ZOMBIE*o.portata,l=Xc(s.finestra);if(s.stato==="morto"){s.timer-=e;continue}if(s.stato==="arriva"){const d=l.esterno.x-s.x,_=l.esterno.z-s.z,v=Math.hypot(d,_);if(v<.3)s.stato="assi",s.timer=se.ROMPI_ASSE_OGNI;else{const m=Math.min(v,a*e);s.x+=d/v*m,s.z+=_/v*m,s.yaw=Math.atan2(d,_)}continue}if(s.stato==="assi"){s.yaw=Math.atan2(-l.fuori.x,-l.fuori.z);const d=i.zombie.some(_=>_!==s&&_.finestra===s.finestra&&_.stato==="scavalca");i.finestre[s.finestra]>0?(s.timer-=e,s.timer<=0&&(i.finestre[s.finestra]-=1,s.timer=se.ROMPI_ASSE_OGNI,t.push({k:"assaRotta",finestra:s.finestra}))):d||(s.stato="scavalca",s.timer=se.SCAVALCA);continue}if(s.stato==="scavalca"){s.timer-=e;const d=1-Math.max(0,s.timer)/se.SCAVALCA;s.x=l.esterno.x+(l.interno.x-l.esterno.x)*d,s.z=l.esterno.z+(l.interno.z-l.esterno.z)*d,s.timer<=0&&(s.stato="dentro");continue}const u=Ip(i,s,r);if(s.stato==="attacco"){if(s.timer-=e,u&&(s.yaw=Math.atan2(u.g.x-s.x,u.g.z-s.z)),s.timer>0)continue;const d=i.giocatori.find(_=>_.id===s.bersaglio&&_.stato==="vivo");d&&Ai(d,s)<=c+.4&&Np(i,d,t,se.DANNO_ZOMBIE*o.danno),s.stato="dentro",s.attesa=se.ATTESA_ATTACCO;continue}if(u&&u.d<=c&&s.attesa===0){s.stato="attacco",s.timer=up,s.bersaglio=u.g.id,t.push({k:"attacco",zombie:s.id});continue}if(u&&u.d<=c*.8)continue;const h=u&&u.d<1.5?{x:(u.g.x-s.x)/u.d,z:(u.g.z-s.z)/u.d}:ap(i.campo,s.x,s.z);if(!h)continue;const f=Wh(s,h.x*a*e,h.z*a*e,se.RAGGIO_ZOMBIE,r);s.x=f.x,s.z=f.z,s.yaw=Math.atan2(h.x,h.z)}Lp(i.zombie.filter(s=>s.stato==="dentro"||s.stato==="arriva"||s.stato==="assi")),i.zombie=i.zombie.filter(s=>s.stato!=="morto"||s.timer>0)}function Lp(i){for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){const n=i[e],r=i[t],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a>=Ul||a<1e-6)continue;const c=(Ul-a)/2,l=n.stato==="assi",u=r.stato==="assi";l||(n.x-=s/a*c,n.z-=o/a*c),u||(r.x+=s/a*c,r.z+=o/a*c)}}function Np(i,e,t,n=se.DANNO_ZOMBIE){e.vita-=n,e.ultimoDanno=i.tempo,t.push({k:"ferito",a:e.id}),!(e.vita>0)&&(Object.assign(e,{stato:"terra",vita:0,timerTerra:se.TEMPO_A_TERRA,bevande:[],vitaMax:se.VITA,progressoRianimazione:0,rianimando:!1}),t.push({k:"aTerra",a:e.id}))}function Op(i,e,t){for(const n of i.giocatori){if(n.attesaAssa=Math.max(0,n.attesaAssa-e),n.stato==="vivo"&&i.tempo-n.ultimoDanno>se.RIGENERA_DOPO&&(n.vita=Math.min(n.vitaMax,n.vita+se.RIGENERA_AL_SECONDO*e)),n.stato!=="terra")continue;const r=bi(i).find(s=>s.rianimando&&Ai(s,n)<=se.RIANIMA_DISTANZA+_s);if(r){n.progressoRianimazione+=e;const s=r.bevande.includes("ritorno")?se.RIANIMA_RAPIDO:se.RIANIMA_IN;n.progressoRianimazione>=s&&(Object.assign(n,{stato:"vivo",vita:se.VITA,progressoRianimazione:0,ultimoDanno:i.tempo}),t.push({k:"rianimato",a:n.id,da:r.id}));continue}n.progressoRianimazione=0,n.timerTerra-=e,n.timerTerra<=0&&(n.stato="morto",n.rianimando=!1,t.push({k:"morto",a:n.id}))}}function Dp(i,e,t){const n=i.cassa;n.stato==="aperta"&&(n.timer-=e,!(n.timer>0)&&(Object.assign(n,{stato:"chiusa",arma:null,per:null,timer:0}),t.push({k:"cassaChiusa"})))}function Up(i,e,{posizioni:t={},azioni:n=[]}={}){const r=[];return i.fase==="fine"||(i.tempo+=e,pp(i,t),wp(i,n,r),Cp(i,e,r),Pp(i,e,r),Op(i,e,r),Dp(i,e,r),_p(i,e,r),Sp(i,e,r),i.giocatori.length>0&&bi(i).length===0&&(i.fase="fine",r.push({k:"fine",round:i.round,giocatori:i.giocatori.map(s=>({nome:s.nome,punti:s.punti,uccisioni:s.uccisioni}))}))),r}const sf=Object.freeze(["arriva","assi","scavalca","dentro","attacco","morto"]),of=Object.freeze(["vivo","terra","morto"]),af=Object.freeze(["intervallo","gioco","fine","attesa"]),cf=Object.freeze(["libero","lavora","pronta"]),zt=i=>Math.round(i*100)/100;function lf(i){return{t:Math.round(i.tempo*1e3)/1e3,f:af.indexOf(i.fase),r:i.round,tf:zt(Math.max(0,i.timerFase)),z:i.zombie.map(e=>[e.id,zt(e.x),zt(e.z),zt(e.yaw),sf.indexOf(e.stato),e.corre?1:0,e.variante,Math.max(0,Math.round(e.vita/e.vitaMax*100)),Math.max(0,Fh.indexOf(e.tipo??"normale"))]),w:On.map(e=>i.finestre[e.id]),p:[...i.porte],g:i.giocatori.map(e=>({id:e.id,n:e.nome,x:zt(e.x),z:zt(e.z),y:zt(e.yaw),p:zt(e.pitch),s:of.indexOf(e.stato),v:Math.round(e.vita),vm:e.vitaMax,pt:e.punti,a:e.armaAttiva,ar:[...e.armi],b:[...e.bevande],c:e.colpi,tt:zt(e.timerTerra),pr:zt(e.progressoRianimazione),ri:e.rianimando?1:0,u:e.uccisioni,tp:e.teletrasporto,ok:e.pronto?1:0})),c:[i.cassa.stato==="aperta"?1:0,i.cassa.arma??"",i.cassa.per??"",zt(i.cassa.timer)],e:i.corrente?1:0,k:[cf.indexOf(i.potenziatore.stato),i.potenziatore.arma??"",i.potenziatore.per??"",zt(i.potenziatore.timer)],b:(i.bonus??[]).map(e=>[e.id,yi.indexOf(e.tipo),zt(e.x),zt(e.z),zt(e.timer)]),x:Bh.map(e=>{var t;return zt(((t=i.effetti)==null?void 0:t[e])??0)}),fr:[...i.frammenti??[]],cp:i.campanella?1:0,co:i.conto===null||i.conto===void 0?-1:zt(i.conto)}}function uf(i){return{tempo:i.t,fase:af[i.f],round:i.r,timerFase:i.tf,zombie:i.z.map(([e,t,n,r,s,o,a,c,l])=>({id:e,x:t,z:n,yaw:r,stato:sf[s],corre:!!o,variante:a,vita:c,tipo:Fh[l]??"normale"})),finestre:Object.fromEntries(On.map((e,t)=>[e.id,i.w[t]])),porte:new Set(i.p),giocatori:i.g.map(e=>({id:e.id,nome:e.n,x:e.x,z:e.z,yaw:e.y,pitch:e.p,stato:of[e.s],vita:e.v,vitaMax:e.vm,punti:e.pt,armaAttiva:e.a,armi:e.ar,bevande:e.b,colpi:e.c,timerTerra:e.tt,progressoRianimazione:e.pr,rianimando:!!e.ri,uccisioni:e.u,teletrasporto:e.tp,pronto:!!e.ok})),cassa:{stato:i.c[0]?"aperta":"chiusa",arma:i.c[1]||null,per:i.c[2]||null,timer:i.c[3]},corrente:!!i.e,potenziatore:{stato:cf[i.k[0]],arma:i.k[1]||null,per:i.k[2]||null,timer:i.k[3]},bonus:(i.b??[]).map(([e,t,n,r,s])=>({id:e,tipo:yi[t],x:n,z:r,timer:s})),effetti:Object.fromEntries(Bh.map((e,t)=>{var n;return[e,((n=i.x)==null?void 0:n[t])??0]})),frammenti:i.fr??[],campanella:!!i.cp,conto:i.co===void 0||i.co<0?null:i.co}}const po=(i,e,t)=>i+(e-i)*t;function zp(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}function Fl(i,e,t,n){const r=new Map(i.map(s=>[s.id,s]));return e.map(s=>{const o=r.get(s.id);if(!o||o.teletrasporto!==s.teletrasporto)return s;const a={...s,x:po(o.x,s.x,t),z:po(o.z,s.z,t),yaw:zp(o.yaw,s.yaw,t)};return n&&(a.pitch=po(o.pitch,s.pitch,t)),a})}function Fp(i,e,t){const n=Math.min(1,Math.max(0,t));return{...e,tempo:po(i.tempo,e.tempo,n),zombie:Fl(i.zombie,e.zombie,n,!1),giocatori:Fl(i.giocatori,e.giocatori,n,!0)}}const Bp="https://dxqmblsmawdtqhtekfnf.supabase.co",kp="sb_publishable_mjj5GumFWTwYleVvkV4pcw_tibE8HUI",Vp=Object.freeze([{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]),Hp=6e3,Gp=25e3,Bl=1e3,Wp=15e3,Xp=1e3,hf="zombie",jp=200;function Io(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function qp(i){const e=new BroadcastChannel(`${hf}-${i}`),t=Io(),n=Io();return e.onmessage=r=>t.avvisa(r.data),{invia:r=>e.postMessage(r),suMessaggio:t.aggiungi,suStato:r=>{n.aggiungi(r),r("online")},chiudi:()=>e.close()}}function Yp(i){const e=`realtime:${hf}-${i}`,t=`${Bp.replace(/^http/,"ws")}/realtime/v1/websocket?apikey=${encodeURIComponent(kp)}&vsn=1.0.0`,n=Io(),r=Io(),s=[];let o=null,a=!1,c=0,l=null,u=null,h=Bl,f=!1,d="connessione";const _=x=>{d=x,r.avvisa(x)},v=(x,M,g=e)=>{(o==null?void 0:o.readyState)===WebSocket.OPEN&&o.send(JSON.stringify({topic:g,event:x,payload:M,ref:String(++c),join_ref:"1"}))},m=x=>v("broadcast",{type:"broadcast",event:"m",payload:x});function p(){if(f)return;_("connessione"),a=!1;const x=new WebSocket(t);o=x,x.onopen=()=>{v("phx_join",{config:{broadcast:{self:!1,ack:!1},presence:{key:""},private:!1}}),clearInterval(l),l=setInterval(()=>v("heartbeat",{},"phoenix"),Gp)},x.onmessage=M=>{var E,A,w,C;let g;try{g=JSON.parse(M.data)}catch{return}g.topic===e&&(g.event==="phx_reply"&&!a&&((E=g.payload)==null?void 0:E.status)!=="ok"?(console.error("Supabase ha rifiutato l'ingresso nel canale della stanza:",(A=g.payload)==null?void 0:A.response),x.close()):g.event==="phx_reply"&&((w=g.payload)==null?void 0:w.status)==="ok"&&!a?(a=!0,h=Bl,_("online"),s.splice(0).forEach(m)):g.event==="broadcast"&&((C=g.payload)==null?void 0:C.event)==="m"?n.avvisa(g.payload.payload):(g.event==="phx_error"||g.event==="phx_close")&&x.close())},x.onclose=()=>{o!==x||f||(clearInterval(l),a=!1,_("offline"),u=setTimeout(p,h),h=Math.min(Wp,h*2))}}return p(),{invia(x,{scartabile:M=!1}={}){if(a){m(x);return}M||(s.length>=jp&&s.shift(),s.push(x))},suMessaggio:n.aggiungi,suStato:x=>{r.aggiungi(x),x(d)},chiudi(){f=!0,clearTimeout(u),clearInterval(l),o==null||o.close()}}}function $p(i,{locale:e=!1}={}){return e?qp(i):Yp(i)}const kl="ABCDEFGHJKLMNPQRSTUVWXYZ",Kp=16,Zp=64;function Jp(i=Math.random){return Array.from({length:4},()=>kl[Math.floor(i()*kl.length)]).join("")}function ff(i){const e=String(i??"").trim().toUpperCase();return/^[A-HJ-NP-Z]{4}$/.test(e)?e:null}function vs(i){return String(i??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,Kp)||null}const Dt=i=>typeof i=="number"&&Number.isFinite(i),xs=(i,e=Zp)=>typeof i=="string"&&i.length>0&&i.length<=e,Ms=i=>typeof i=="string"&&Object.hasOwn(xt,i),Vl=(i,e)=>Array.isArray(i)&&i.every(t=>Array.isArray(t)&&t.length===e&&t.every(Dt));function Qp(i){return!!i&&typeof i=="object"&&xs(i.id)&&typeof i.n=="string"&&[i.x,i.z,i.y,i.p,i.s,i.v,i.vm,i.pt,i.c,i.tt,i.pr,i.ri,i.u,i.tp].every(Dt)&&Ms(i.a)&&Array.isArray(i.ar)&&i.ar.every(Ms)&&Array.isArray(i.b)&&i.b.every(e=>Object.hasOwn(Gi,e))}function em(i){return!!i&&typeof i=="object"&&[i.t,i.f,i.r,i.tf].every(Dt)&&Vl(i.z,9)&&Array.isArray(i.w)&&i.w.every(Dt)&&Array.isArray(i.p)&&i.p.every(e=>xs(e))&&Array.isArray(i.g)&&i.g.every(Qp)&&Array.isArray(i.c)&&i.c.length===4&&Dt(i.e)&&Array.isArray(i.k)&&i.k.length===4&&[0,1,2].includes(i.k[0])&&Dt(i.k[3])&&(i.k[1]===""||Ms(i.k[1]))&&Vl(i.b,5)&&Array.isArray(i.x)&&i.x.every(Dt)&&Array.isArray(i.fr)&&i.fr.every(Dt)&&Dt(i.cp)&&Dt(i.co)}function tm(i){return!i||typeof i!="object"?!1:i.tipo==="colpo"?Dt(i.zombie)&&Dt(i.danno):i.tipo==="compra"?xs(i.acquisto)&&(i.arma===void 0||Ms(i.arma)):i.tipo==="assa"?xs(i.finestra):i.tipo==="rianima"||i.tipo==="pronto"?typeof i.attivo=="boolean":i.tipo==="frammento"?Dt(i.id):!1}const nm={ciao:i=>vs(i.nome)!==null&&xs(i.id),lobby:i=>vs(i.nomeHost)!==null,inizia:i=>Dt(i.seme),g:i=>[i.x,i.z,i.yaw,i.pitch,i.colpi,i.tp].every(Dt)&&Ms(i.arma),az:i=>tm(i.a),st:i=>Dt(i.g)&&em(i.ist),ev:i=>Array.isArray(i.eventi)&&i.eventi.every(e=>e&&typeof e.k=="string"),ping:i=>Dt(i.n),pong:i=>Dt(i.n)};function im(i){if(!i||typeof i!="object"||typeof i.t!="string")return null;const e=nm[i.t];return e&&e(i)?i:null}const rm=5e3,sm=2500,om=64*1024;function Hl(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function am({segnali:i,sonoHost:e,mioId:t,soloRiserva:n=!1}){const r=Hl(),s=Hl();let o=null,a=null,c={},l="attesa",u=null,h=null,f=0,d=[],_=0;const v=L=>{l!==L&&(l=L,s.avvisa(L))},m=(L,D={},q={})=>i.invia({tipo:L,da:t,a:o,...D},q);function p(L){const D=im(L);D&&(f=performance.now(),r.avvisa(D))}function x(){var L,D;((L=c.veloce)==null?void 0:L.readyState)!=="open"||((D=c.sicuro)==null?void 0:D.readyState)!=="open"||(clearTimeout(u),v("diretto"))}function M(){clearTimeout(u),u=setTimeout(()=>{l!=="diretto"&&v("riserva")},Hp)}function g(L){c[L.label]=L,L.onmessage=D=>{let q;try{q=JSON.parse(D.data)}catch{return}p(q)},L.onopen=x,L.onclose=()=>{c[L.label]===L&&l==="diretto"&&v("riserva")}}function E(){for(const L of Object.values(c))L.onopen=L.onclose=L.onmessage=null,L.close();c={},a&&(a.onicecandidate=a.onconnectionstatechange=a.ondatachannel=null,a.close()),a=null}function A(){if(E(),v("collegamento"),n)return clearTimeout(u),v("riserva"),null;const L=new RTCPeerConnection({iceServers:Vp});return a=L,L.onicecandidate=D=>{D.candidate&&m("ice",{c:D.candidate.toJSON()})},L.onconnectionstatechange=()=>{a===L&&(L.connectionState==="connected"?x():["failed","closed","disconnected"].includes(L.connectionState)&&l==="diretto"&&v("riserva"))},L.ondatachannel=D=>g(D.channel),M(),L}async function w(L){for(const D of d.splice(0)){if(a!==L)return;await L.addIceCandidate(D).catch(()=>{})}}async function C(L){o=L,_=performance.now(),f=performance.now(),d=[],m("benvenuto");const D=A();if(!D)return;g(D.createDataChannel("veloce",{ordered:!1,maxRetransmits:0})),g(D.createDataChannel("sicuro"));const q=await D.createOffer();a===D&&(await D.setLocalDescription(q),a===D&&m("offerta",{sdp:D.localDescription.toJSON()}))}async function S(L){const D=A();if(!D||(await D.setRemoteDescription(L),a!==D))return;await w(D);const q=await D.createAnswer();a===D&&(await D.setLocalDescription(q),a===D&&m("risposta",{sdp:D.localDescription.toJSON()}))}const y=L=>{console.error("Collegamento diretto non riuscito, passo dalla riserva:",L),v("riserva")};function N(L){o!==L&&(o=L,clearInterval(h),n?A():(v("collegamento"),M()))}function k(L){if(!(!L||typeof L!="object"||typeof L.da!="string"||L.da===t)){if(e&&L.tipo==="ciao"){if(L.da===o){l==="collegamento"&&performance.now()-_>sm&&C(L.da).catch(y);return}if(o&&performance.now()-f<rm){i.invia({tipo:"occupata",da:t,a:L.da});return}C(L.da).catch(y);return}if(L.a===t){if(!e&&(L.tipo==="benvenuto"||L.tipo==="offerta"&&!o)&&N(L.da),!e&&L.tipo==="occupata"){o||v("occupata");return}if(L.da===o)if(!e&&L.tipo==="offerta")S(L.sdp).catch(y);else if(e&&L.tipo==="risposta"&&a){const D=a;D.setRemoteDescription(L.sdp).then(()=>w(D)).catch(y)}else L.tipo==="ice"?a!=null&&a.remoteDescription?a.addIceCandidate(L.c).catch(()=>{}):d.push(L.c):L.tipo==="gioco"&&p(L.m)}}}if(i.suMessaggio(k),!e){const L=()=>i.invia({tipo:"ciao",da:t});L(),h=setInterval(L,Xp)}return{get modo(){return l},get altroId(){return o},silenzio:()=>f?performance.now()-f:1/0,suMessaggio:r.aggiungi,suStato:s.aggiungi,invia(L,{veloce:D=!1}={}){if(l==="diretto"){const q=D?c.veloce:c.sicuro;if((q==null?void 0:q.readyState)==="open"){(!D||q.bufferedAmount<om)&&q.send(JSON.stringify(L));return}}o&&(l==="riserva"||l==="diretto")&&m("gioco",{m:L},{scartabile:D})},chiudi(){clearInterval(h),clearTimeout(u),E(),i.chiudi()}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qc="170",cm=0,Gl=1,lm=2,df=1,um=2,Yn=3,ni=0,Kt=1,dn=2,xi=0,Vi=1,ys=2,Wl=3,Xl=4,hm=5,zi=100,fm=101,dm=102,pm=103,mm=104,gm=200,_m=201,vm=202,xm=203,qa=204,Ya=205,Mm=206,ym=207,Sm=208,Am=209,bm=210,Em=211,Tm=212,wm=213,Rm=214,$a=0,Ka=1,Za=2,wr=3,Ja=4,Qa=5,ec=6,tc=7,pf=0,Cm=1,Im=2,Mi=0,Pm=1,Lm=2,Nm=3,mf=4,Om=5,Dm=6,Um=7,jl="attached",zm="detached",gf=300,Rr=301,Cr=302,nc=303,ic=304,zo=306,Ei=1e3,_i=1001,Po=1002,It=1003,_f=1004,rs=1005,on=1006,mo=1007,Jn=1008,ii=1009,vf=1010,xf=1011,Ss=1012,Yc=1013,Xi=1014,En=1015,ws=1016,$c=1017,Kc=1018,Ir=1020,Mf=35902,yf=1021,Sf=1022,mn=1023,Af=1024,bf=1025,yr=1026,Pr=1027,Zc=1028,Jc=1029,Ef=1030,Qc=1031,el=1033,go=33776,_o=33777,vo=33778,xo=33779,rc=35840,sc=35841,oc=35842,ac=35843,cc=36196,lc=37492,uc=37496,hc=37808,fc=37809,dc=37810,pc=37811,mc=37812,gc=37813,_c=37814,vc=37815,xc=37816,Mc=37817,yc=37818,Sc=37819,Ac=37820,bc=37821,Mo=36492,Ec=36494,Tc=36495,Tf=36283,wc=36284,Rc=36285,Cc=36286,wf=2200,Fm=2201,Bm=2202,As=2300,bs=2301,Qo=2302,gr=2400,_r=2401,Lo=2402,tl=2500,km=2501,Vm=0,Rf=1,Ic=2,Hm=3200,Gm=3201,Cf=0,Wm=1,mi="",Tt="srgb",Jt="srgb-linear",Fo="linear",ct="srgb",Ki=7680,ql=519,Xm=512,jm=513,qm=514,If=515,Ym=516,$m=517,Km=518,Zm=519,Pc=35044,Yl="300 es",Qn=2e3,No=2001;class qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $l=1234567;const as=Math.PI/180,Lr=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Ct(i,e,t){return Math.max(e,Math.min(t,i))}function nl(i,e){return(i%e+e)%e}function Jm(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Qm(i,e,t){return i!==e?(t-i)/(e-i):0}function cs(i,e,t){return(1-t)*i+t*e}function e0(i,e,t,n){return cs(i,e,1-Math.exp(-t*n))}function t0(i,e=1){return e-Math.abs(nl(i,e*2)-e)}function n0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function i0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function r0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function s0(i,e){return i+Math.random()*(e-i)}function o0(i){return i*(.5-Math.random())}function a0(i){i!==void 0&&($l=i);let e=$l+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function c0(i){return i*as}function l0(i){return i*Lr}function u0(i){return(i&i-1)===0&&i!==0}function h0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function f0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function d0(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),_=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*_,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*_,a*l);break;case"ZYZ":i.set(c*_,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Lc={DEG2RAD:as,RAD2DEG:Lr,generateUUID:wn,clamp:Ct,euclideanModulo:nl,mapLinear:Jm,inverseLerp:Qm,lerp:cs,damp:e0,pingpong:t0,smoothstep:n0,smootherstep:i0,randInt:r0,randFloat:s0,randFloatSpread:o0,seededRandom:a0,degToRad:c0,radToDeg:l0,isPowerOfTwo:u0,ceilPowerOfTwo:h0,floorPowerOfTwo:f0,setQuaternionFromProperEuler:d0,normalize:ot,denormalize:bn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,s,o,a,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],v=r[0],m=r[3],p=r[6],x=r[1],M=r[4],g=r[7],E=r[2],A=r[5],w=r[8];return s[0]=o*v+a*x+c*E,s[3]=o*m+a*M+c*A,s[6]=o*p+a*g+c*w,s[1]=l*v+u*x+h*E,s[4]=l*m+u*M+h*A,s[7]=l*p+u*g+h*w,s[2]=f*v+d*x+_*E,s[5]=f*m+d*M+_*A,s[8]=f*p+d*g+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,_=t*h+n*f+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(r*l-u*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-a*t)*v,e[6]=d*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ea.makeScale(e,t)),this}rotate(e){return this.premultiply(ea.makeRotation(-e)),this}translate(e,t){return this.premultiply(ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Ve;function Pf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function p0(){const i=Es("canvas");return i.style.display="block",i}const Kl={};function ss(i){i in Kl||(Kl[i]=!0,console.warn(i))}function m0(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function g0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function _0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const je={enabled:!0,workingColorSpace:Jt,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ct&&(i.r=ti(i.r),i.g=ti(i.g),i.b=ti(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ct&&(i.r=Sr(i.r),i.g=Sr(i.g),i.b=Sr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===mi?Fo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Sr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Zl=[.64,.33,.3,.6,.15,.06],Jl=[.2126,.7152,.0722],Ql=[.3127,.329],eu=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tu=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[Jt]:{primaries:Zl,whitePoint:Ql,transfer:Fo,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:Jl,workingColorSpaceConfig:{unpackColorSpace:Tt},outputColorSpaceConfig:{drawingBufferColorSpace:Tt}},[Tt]:{primaries:Zl,whitePoint:Ql,transfer:ct,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:Jl,outputColorSpaceConfig:{drawingBufferColorSpace:Tt}}});let Zi;class v0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=Es("canvas")),Zi.width=e.width,Zi.height=e.height;const n=Zi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ti(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let x0=0;class Lf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ta(r[o].image)):s.push(ta(r[o]))}else s=ta(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ta(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?v0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M0=0;class Pt extends qi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=_i,r=_i,s=on,o=Jn,a=mn,c=ii,l=Pt.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=wn(),this.name="",this.source=new Lf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case _i:e.x=e.x<0?0:1;break;case Po:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case _i:e.y=e.y<0?0:1;break;case Po:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=gf;Pt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,r=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],_=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,g=(d+1)/2,E=(p+1)/2,A=(u+f)/4,w=(h+v)/4,C=(_+m)/4;return M>g&&M>E?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=A/n,s=w/n):g>E?g<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(g),n=A/r,s=C/r):E<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),n=w/s,r=C/s),this.set(n,r,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(h-v)/x,this.z=(f-u)/x,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class y0 extends qi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ji extends y0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Nf extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class S0 extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],d=s[o+1],_=s[o+2],v=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=v;return}if(h!==v||c!==f||l!==d||u!==_){let m=1-a;const p=c*f+l*d+u*_+h*v,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),A=Math.atan2(E,p*x);m=Math.sin(m*A)/E,a=Math.sin(a*A)/E}const g=a*x;if(c=c*m+f*g,l=l*m+d*g,u=u*m+_*g,h=h*m+v*g,m===1-a){const E=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=E,l*=E,u*=E,h*=E}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],f=s[o+1],d=s[o+2],_=s[o+3];return e[t]=a*_+u*h+c*d-l*f,e[t+1]=c*_+u*f+l*h-a*d,e[t+2]=l*_+u*d+a*f-c*h,e[t+3]=u*_-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),f=c(n/2),d=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"YZX":this._x=f*u*h+l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h-f*d*_;break;case"XZY":this._x=f*u*h-l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(nu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(nu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return na.copy(this).projectOnVector(e),this.sub(na)}reflect(e){return this.sub(na.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new P,nu=new Rn;class ri{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xn):xn.fromBufferAttribute(s,o),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wr),Us.subVectors(this.max,Wr),Ji.subVectors(e.a,Wr),Qi.subVectors(e.b,Wr),er.subVectors(e.c,Wr),ai.subVectors(Qi,Ji),ci.subVectors(er,Qi),Ri.subVectors(Ji,er);let t=[0,-ai.z,ai.y,0,-ci.z,ci.y,0,-Ri.z,Ri.y,ai.z,0,-ai.x,ci.z,0,-ci.x,Ri.z,0,-Ri.x,-ai.y,ai.x,0,-ci.y,ci.x,0,-Ri.y,Ri.x,0];return!ia(t,Ji,Qi,er,Us)||(t=[1,0,0,0,1,0,0,0,1],!ia(t,Ji,Qi,er,Us))?!1:(zs.crossVectors(ai,ci),t=[zs.x,zs.y,zs.z],ia(t,Ji,Qi,er,Us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new P,new P,new P,new P,new P,new P,new P,new P],xn=new P,Ds=new ri,Ji=new P,Qi=new P,er=new P,ai=new P,ci=new P,Ri=new P,Wr=new P,Us=new P,zs=new P,Ci=new P;function ia(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ci.fromArray(i,s);const a=r.x*Math.abs(Ci.x)+r.y*Math.abs(Ci.y)+r.z*Math.abs(Ci.z),c=e.dot(Ci),l=t.dot(Ci),u=n.dot(Ci);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const A0=new ri,Xr=new P,ra=new P;class Un{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):A0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);const t=Xr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Xr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ra.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(ra)),this.expandByPoint(Xr.copy(e.center).sub(ra))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new P,sa=new P,Fs=new P,li=new P,oa=new P,Bs=new P,aa=new P;class Bo{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){sa.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),li.copy(this.origin).sub(sa);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fs),a=li.dot(this.direction),c=-li.dot(Fs),l=li.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*c-a,f=o*a-c,_=s*u,h>=0)if(f>=-_)if(f<=_){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=_?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(sa).addScaledVector(Fs,f),d}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),r=Gn.dot(Gn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,r,s){oa.subVectors(t,e),Bs.subVectors(n,e),aa.crossVectors(oa,Bs);let o=this.direction.dot(aa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;li.subVectors(this.origin,e);const c=a*this.direction.dot(Bs.crossVectors(li,Bs));if(c<0)return null;const l=a*this.direction.dot(oa.cross(li));if(l<0||c+l>o)return null;const u=-a*li.dot(aa);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ue{constructor(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m){Ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m)}set(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ue().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/tr.setFromMatrixColumn(e,0).length(),s=1/tr.setFromMatrixColumn(e,1).length(),o=1/tr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,_=a*u,v=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+_*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=_+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,_=l*u,v=l*h;t[0]=f+v*a,t[4]=_*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,_=l*u,v=l*h;t[0]=f-v*a,t[4]=-o*h,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,_=a*u,v=a*h;t[0]=c*u,t[4]=_*l-d,t[8]=f*l+v,t[1]=c*h,t[5]=v*l+f,t[9]=d*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,_=a*c,v=a*l;t[0]=c*u,t[4]=v-f*h,t[8]=_*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+_,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*c,d=o*l,_=a*c,v=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(b0,e,E0)}lookAt(e,t,n){const r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ui.crossVectors(n,tn),ui.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ui.crossVectors(n,tn)),ui.normalize(),ks.crossVectors(tn,ui),r[0]=ui.x,r[4]=ks.x,r[8]=tn.x,r[1]=ui.y,r[5]=ks.y,r[9]=tn.y,r[2]=ui.z,r[6]=ks.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],v=n[6],m=n[10],p=n[14],x=n[3],M=n[7],g=n[11],E=n[15],A=r[0],w=r[4],C=r[8],S=r[12],y=r[1],N=r[5],k=r[9],L=r[13],D=r[2],q=r[6],j=r[10],ie=r[14],R=r[3],X=r[7],K=r[11],ee=r[15];return s[0]=o*A+a*y+c*D+l*R,s[4]=o*w+a*N+c*q+l*X,s[8]=o*C+a*k+c*j+l*K,s[12]=o*S+a*L+c*ie+l*ee,s[1]=u*A+h*y+f*D+d*R,s[5]=u*w+h*N+f*q+d*X,s[9]=u*C+h*k+f*j+d*K,s[13]=u*S+h*L+f*ie+d*ee,s[2]=_*A+v*y+m*D+p*R,s[6]=_*w+v*N+m*q+p*X,s[10]=_*C+v*k+m*j+p*K,s[14]=_*S+v*L+m*ie+p*ee,s[3]=x*A+M*y+g*D+E*R,s[7]=x*w+M*N+g*q+E*X,s[11]=x*C+M*k+g*j+E*K,s[15]=x*S+M*L+g*ie+E*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],v=e[7],m=e[11],p=e[15];return _*(+s*c*h-r*l*h-s*a*f+n*l*f+r*a*d-n*c*d)+v*(+t*c*d-t*l*f+s*o*f-r*o*d+r*l*u-s*c*u)+m*(+t*l*h-t*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-t*c*h+t*a*f+r*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],v=e[13],m=e[14],p=e[15],x=h*m*l-v*f*l+v*c*d-a*m*d-h*c*p+a*f*p,M=_*f*l-u*m*l-_*c*d+o*m*d+u*c*p-o*f*p,g=u*v*l-_*h*l+_*a*d-o*v*d-u*a*p+o*h*p,E=_*h*c-u*v*c-_*a*f+o*v*f+u*a*m-o*h*m,A=t*x+n*M+r*g+s*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=x*w,e[1]=(v*f*s-h*m*s-v*r*d+n*m*d+h*r*p-n*f*p)*w,e[2]=(a*m*s-v*c*s+v*r*l-n*m*l-a*r*p+n*c*p)*w,e[3]=(h*c*s-a*f*s-h*r*l+n*f*l+a*r*d-n*c*d)*w,e[4]=M*w,e[5]=(u*m*s-_*f*s+_*r*d-t*m*d-u*r*p+t*f*p)*w,e[6]=(_*c*s-o*m*s-_*r*l+t*m*l+o*r*p-t*c*p)*w,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*d+t*c*d)*w,e[8]=g*w,e[9]=(_*h*s-u*v*s-_*n*d+t*v*d+u*n*p-t*h*p)*w,e[10]=(o*v*s-_*a*s+_*n*l-t*v*l-o*n*p+t*a*p)*w,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*d-t*a*d)*w,e[12]=E*w,e[13]=(u*v*r-_*h*r+_*n*f-t*v*f-u*n*m+t*h*m)*w,e[14]=(_*a*r-o*v*r-_*n*c+t*v*c+o*n*m-t*a*m)*w,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,_=s*h,v=o*u,m=o*h,p=a*h,x=c*l,M=c*u,g=c*h,E=n.x,A=n.y,w=n.z;return r[0]=(1-(v+p))*E,r[1]=(d+g)*E,r[2]=(_-M)*E,r[3]=0,r[4]=(d-g)*A,r[5]=(1-(f+p))*A,r[6]=(m+x)*A,r[7]=0,r[8]=(_+M)*w,r[9]=(m-x)*w,r[10]=(1-(f+v))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=tr.set(r[0],r[1],r[2]).length();const o=tr.set(r[4],r[5],r[6]).length(),a=tr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Mn.copy(this);const l=1/s,u=1/o,h=1/a;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=h,Mn.elements[9]*=h,Mn.elements[10]*=h,t.setFromRotationMatrix(Mn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Qn){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let d,_;if(a===Qn)d=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===No)d=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Qn){const c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(o-s),f=(t+e)*l,d=(n+r)*u;let _,v;if(a===Qn)_=(o+s)*h,v=-2*h;else if(a===No)_=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const tr=new P,Mn=new Ue,b0=new P(0,0,0),E0=new P(1,1,1),ui=new P,ks=new P,tn=new P,iu=new Ue,ru=new Rn;class Dn{constructor(e=0,t=0,n=0,r=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ct(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return iu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(iu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ru.setFromEuler(this),this.setFromQuaternion(ru,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class Of{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let T0=0;const su=new P,nr=new Rn,Wn=new Ue,Vs=new P,jr=new P,w0=new P,R0=new Rn,ou=new P(1,0,0),au=new P(0,1,0),cu=new P(0,0,1),lu={type:"added"},C0={type:"removed"},ir={type:"childadded",child:null},ca={type:"childremoved",child:null};class ft extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new P,t=new Dn,n=new Rn,r=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Ve}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Of,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.multiply(nr),this}rotateOnWorldAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.premultiply(nr),this}rotateX(e){return this.rotateOnAxis(ou,e)}rotateY(e){return this.rotateOnAxis(au,e)}rotateZ(e){return this.rotateOnAxis(cu,e)}translateOnAxis(e,t){return su.copy(e).applyQuaternion(this.quaternion),this.position.add(su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ou,e)}translateY(e){return this.translateOnAxis(au,e)}translateZ(e){return this.translateOnAxis(cu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vs.copy(e):Vs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),jr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(jr,Vs,this.up):Wn.lookAt(Vs,jr,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),nr.setFromRotationMatrix(Wn),this.quaternion.premultiply(nr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lu),ir.child=e,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(C0),ca.child=e,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lu),ir.child=e,this.dispatchEvent(ir),ir.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,e,w0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jr,R0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ft.DEFAULT_UP=new P(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new P,Xn=new P,la=new P,jn=new P,rr=new P,sr=new P,uu=new P,ua=new P,ha=new P,fa=new P,da=new tt,pa=new tt,ma=new tt;class pn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),yn.subVectors(e,t),r.cross(yn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){yn.subVectors(r,t),Xn.subVectors(n,t),la.subVectors(e,t);const o=yn.dot(yn),a=yn.dot(Xn),c=yn.dot(la),l=Xn.dot(Xn),u=Xn.dot(la),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,_=(o*u-a*c)*f;return s.set(1-d-_,_,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,jn.x),c.addScaledVector(o,jn.y),c.addScaledVector(a,jn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return da.setScalar(0),pa.setScalar(0),ma.setScalar(0),da.fromBufferAttribute(e,t),pa.fromBufferAttribute(e,n),ma.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(da,s.x),o.addScaledVector(pa,s.y),o.addScaledVector(ma,s.z),o}static isFrontFacing(e,t,n,r){return yn.subVectors(n,t),Xn.subVectors(e,t),yn.cross(Xn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return yn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),yn.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;rr.subVectors(r,n),sr.subVectors(s,n),ua.subVectors(e,n);const c=rr.dot(ua),l=sr.dot(ua);if(c<=0&&l<=0)return t.copy(n);ha.subVectors(e,r);const u=rr.dot(ha),h=sr.dot(ha);if(u>=0&&h<=u)return t.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(rr,o);fa.subVectors(e,s);const d=rr.dot(fa),_=sr.dot(fa);if(_>=0&&d<=_)return t.copy(s);const v=d*l-c*_;if(v<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(sr,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return uu.subVectors(s,r),a=(h-u)/(h-u+(d-_)),t.copy(r).addScaledVector(uu,a);const p=1/(m+v+f);return o=v*p,a=f*p,t.copy(n).addScaledVector(rr,o).addScaledVector(sr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function ga(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=je.workingColorSpace){if(e=nl(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ga(o,s,e+1/3),this.g=ga(o,s,e),this.b=ga(o,s,e-1/3)}return je.toWorkingColorSpace(this,r),this}setStyle(e,t=Tt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=Df[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return je.fromWorkingColorSpace(Vt.copy(this),e),Math.round(Ct(Vt.r*255,0,255))*65536+Math.round(Ct(Vt.g*255,0,255))*256+Math.round(Ct(Vt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(Vt.copy(this),t);const n=Vt.r,r=Vt.g,s=Vt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Tt){je.fromWorkingColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,r=Vt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Hs);const n=cs(hi.h,Hs.h,t),r=cs(hi.s,Hs.s,t),s=cs(hi.l,Hs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new we;we.NAMES=Df;let I0=0;class Cn extends qi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=wn(),this.name="",this.blending=Vi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qa,this.blendDst=Ya,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==qa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ya&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class bt extends Cn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=pf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new P,Gs=new ae;class Zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Pc&&(e.usage=this.usage),e}}class Uf extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class zf extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class lt extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let P0=0;const ln=new Ue,_a=new ft,or=new P,nn=new ri,qr=new ri,Ot=new P;class Ut extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pf(e)?zf:Uf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return _a.lookAt(e),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(or).negate(),this.translate(or.x,or.y,or.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new lt(n,3))}else{for(let n=0,r=t.count;n<r;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];qr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(nn.min,qr.min),nn.expandByPoint(Ot),Ot.addVectors(nn.max,qr.max),nn.expandByPoint(Ot)):(nn.expandByPoint(qr.min),nn.expandByPoint(qr.max))}nn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ot));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ot.fromBufferAttribute(a,l),c&&(or.fromBufferAttribute(e,l),Ot.add(or)),r=Math.max(r,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new P,c[C]=new P;const l=new P,u=new P,h=new P,f=new ae,d=new ae,_=new ae,v=new P,m=new P;function p(C,S,y){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,C),d.fromBufferAttribute(s,S),_.fromBufferAttribute(s,y),u.sub(l),h.sub(l),d.sub(f),_.sub(f);const N=1/(d.x*_.y-_.x*d.y);isFinite(N)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(N),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(N),a[C].add(v),a[S].add(v),a[y].add(v),c[C].add(m),c[S].add(m),c[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,S=x.length;C<S;++C){const y=x[C],N=y.start,k=y.count;for(let L=N,D=N+k;L<D;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const M=new P,g=new P,E=new P,A=new P;function w(C){E.fromBufferAttribute(r,C),A.copy(E);const S=a[C];M.copy(S),M.sub(E.multiplyScalar(E.dot(S))).normalize(),g.crossVectors(A,S);const N=g.dot(c[C])<0?-1:1;o.setXYZW(C,M.x,M.y,M.z,N)}for(let C=0,S=x.length;C<S;++C){const y=x[C],N=y.start,k=y.count;for(let L=N,D=N+k;L<D;L+=3)w(e.getX(L+0)),w(e.getX(L+1)),w(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new P,s=new P,o=new P,a=new P,c=new P,l=new P,u=new P,h=new P;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,_=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let p=0;p<u;p++)f[_++]=l[d++]}return new Zt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hu=new Ue,Ii=new Bo,Ws=new Un,fu=new P,Xs=new P,js=new P,qs=new P,va=new P,Ys=new P,du=new P,$s=new P;class Me extends ft{constructor(e=new Ut,t=new bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ys.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(va.fromBufferAttribute(h,e),o?Ys.addScaledVector(va,u):Ys.addScaledVector(va.sub(t),u))}t.add(Ys)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!(Ws.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Ws,fu)===null||Ii.origin.distanceToSquared(fu)>(e.far-e.near)**2))&&(hu.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(hu),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let g=x,E=M;g<E;g+=3){const A=a.getX(g),w=a.getX(g+1),C=a.getX(g+2);r=Ks(this,p,e,n,l,u,h,A,w,C),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const x=a.getX(m),M=a.getX(m+1),g=a.getX(m+2);r=Ks(this,o,e,n,l,u,h,x,M,g),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let g=x,E=M;g<E;g+=3){const A=g,w=g+1,C=g+2;r=Ks(this,p,e,n,l,u,h,A,w,C),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const x=m,M=m+1,g=m+2;r=Ks(this,o,e,n,l,u,h,x,M,g),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function L0(i,e,t,n,r,s,o,a){let c;if(e.side===Kt?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===ni,a),c===null)return null;$s.copy(a),$s.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo($s);return l<t.near||l>t.far?null:{distance:l,point:$s.clone(),object:i}}function Ks(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Xs),i.getVertexPosition(c,js),i.getVertexPosition(l,qs);const u=L0(i,e,t,n,Xs,js,qs,du);if(u){const h=new P;pn.getBarycoord(du,Xs,js,qs,h),r&&(u.uv=pn.getInterpolatedAttribute(r,a,c,l,h,new ae)),s&&(u.uv1=pn.getInterpolatedAttribute(s,a,c,l,h,new ae)),o&&(u.normal=pn.getInterpolatedAttribute(o,a,c,l,h,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new P,materialIndex:0};pn.getNormal(Xs,js,qs,f.normal),u.face=f,u.barycoord=h}return u}class sn extends Ut{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,r,o,2),_("x","z","y",1,-1,e,n,-t,r,o,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(h,2));function _(v,m,p,x,M,g,E,A,w,C,S){const y=g/w,N=E/C,k=g/2,L=E/2,D=A/2,q=w+1,j=C+1;let ie=0,R=0;const X=new P;for(let K=0;K<j;K++){const ee=K*N-L;for(let ne=0;ne<q;ne++){const Te=ne*y-k;X[v]=Te*x,X[m]=ee*M,X[p]=D,l.push(X.x,X.y,X.z),X[v]=0,X[m]=0,X[p]=A>0?1:-1,u.push(X.x,X.y,X.z),h.push(ne/w),h.push(1-K/C),ie+=1}}for(let K=0;K<C;K++)for(let ee=0;ee<w;ee++){const ne=f+ee+q*K,Te=f+ee+q*(K+1),H=f+(ee+1)+q*(K+1),Y=f+(ee+1)+q*K;c.push(ne,Te,Y),c.push(Te,H,Y),R+=6}a.addGroup(d,R,S),d+=R,f+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Nr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Yt(i){const e={};for(let t=0;t<i.length;t++){const n=Nr(i[t]);for(const r in n)e[r]=n[r]}return e}function N0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ff(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const O0={clone:Nr,merge:Yt};var D0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,U0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends Cn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=D0,this.fragmentShader=U0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Nr(e.uniforms),this.uniformsGroups=N0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Bf extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new P,pu=new ae,mu=new ae;class Xt extends Bf{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,pu,mu),t.subVectors(mu,pu)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(as*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ar=-90,cr=1;class z0 extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Xt(ar,cr,e,t);r.layers=this.layers,this.add(r);const s=new Xt(ar,cr,e,t);s.layers=this.layers,this.add(s);const o=new Xt(ar,cr,e,t);o.layers=this.layers,this.add(o);const a=new Xt(ar,cr,e,t);a.layers=this.layers,this.add(a);const c=new Xt(ar,cr,e,t);c.layers=this.layers,this.add(c);const l=new Xt(ar,cr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===No)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class kf extends Pt{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Rr,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class F0 extends ji{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new kf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:on}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new sn(5,5,5),s=new Ti({name:"CubemapFromEquirect",uniforms:Nr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:xi});s.uniforms.tEquirect.value=t;const o=new Me(r,s),a=t.minFilter;return t.minFilter===Jn&&(t.minFilter=on),new z0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const xa=new P,B0=new P,k0=new Ve;class Di{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=xa.subVectors(n,t).cross(B0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(xa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||k0.getNormalMatrix(e),r=this.coplanarPoint(xa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Un,Zs=new P;class il{constructor(e=new Di,t=new Di,n=new Di,r=new Di,s=new Di,o=new Di){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],d=r[8],_=r[9],v=r[10],m=r[11],p=r[12],x=r[13],M=r[14],g=r[15];if(n[0].setComponents(c-s,f-l,m-d,g-p).normalize(),n[1].setComponents(c+s,f+l,m+d,g+p).normalize(),n[2].setComponents(c+o,f+u,m+_,g+x).normalize(),n[3].setComponents(c-o,f-u,m-_,g-x).normalize(),n[4].setComponents(c-a,f-h,m-v,g-M).normalize(),t===Qn)n[5].setComponents(c+a,f+h,m+v,g+M).normalize();else if(t===No)n[5].setComponents(a,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Zs.x=r.normal.x>0?e.max.x:e.min.x,Zs.y=r.normal.y>0?e.max.y:e.min.y,Zs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vf(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function V0(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],v=h[d];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const v=h[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class rn extends Ut{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,f=t/c,d=[],_=[],v=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let M=0;M<l;M++){const g=M*h-s;_.push(g,-x,0),v.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const M=x+l*p,g=x+l*(p+1),E=x+1+l*(p+1),A=x+1+l*p;d.push(M,g,A),d.push(g,E,A)}this.setIndex(d),this.setAttribute("position",new lt(_,3)),this.setAttribute("normal",new lt(v,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.width,e.height,e.widthSegments,e.heightSegments)}}var H0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,G0=`#ifdef USE_ALPHAHASH
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
#endif`,W0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,X0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,q0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Y0=`#ifdef USE_AOMAP
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
#endif`,$0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,K0=`#ifdef USE_BATCHING
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
#endif`,Z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,J0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Q0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tg=`#ifdef USE_IRIDESCENCE
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
#endif`,ng=`#ifdef USE_BUMPMAP
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
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
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
#endif`,hg=`#define PI 3.141592653589793
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
} // validated`,fg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dg=`vec3 transformedNormal = objectNormal;
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
#endif`,pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_g=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vg="gl_FragColor = linearToOutputTexel( gl_FragColor );",xg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sg=`#ifdef USE_ENVMAP
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
#endif`,Ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
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
#endif`,Eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cg=`#ifdef USE_GRADIENTMAP
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
}`,Ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ng=`uniform bool receiveShadow;
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
#endif`,Og=`#ifdef USE_ENVMAP
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
#endif`,Dg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bg=`PhysicalMaterial material;
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
#endif`,kg=`struct PhysicalMaterial {
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
}`,Vg=`
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
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$g=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zg=`#if defined( USE_POINTS_UV )
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
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,e_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,t_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,n_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i_=`#ifdef USE_MORPHTARGETS
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
#endif`,r_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,o_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,a_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,u_=`#ifdef USE_NORMALMAP
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
#endif`,h_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,f_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,d_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,p_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,m_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,g_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,__=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,v_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,x_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,M_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,S_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,E_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,T_=`float getShadowMask() {
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
}`,w_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,R_=`#ifdef USE_SKINNING
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
#endif`,C_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I_=`#ifdef USE_SKINNING
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
#endif`,P_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,L_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,D_=`#ifdef USE_TRANSMISSION
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
#endif`,U_=`#ifdef USE_TRANSMISSION
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
#endif`,z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const V_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,H_=`uniform sampler2D t2D;
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
}`,G_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,X_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`#include <common>
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
}`,Y_=`#if DEPTH_PACKING == 3200
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
}`,$_=`#define DISTANCE
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
}`,K_=`#define DISTANCE
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
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`uniform float scale;
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
}`,ev=`uniform vec3 diffuse;
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
}`,tv=`#include <common>
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
}`,nv=`uniform vec3 diffuse;
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
}`,iv=`#define LAMBERT
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
}`,rv=`#define LAMBERT
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
}`,sv=`#define MATCAP
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
}`,ov=`#define MATCAP
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
}`,av=`#define NORMAL
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
}`,cv=`#define NORMAL
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
}`,lv=`#define PHONG
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
}`,uv=`#define PHONG
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
}`,hv=`#define STANDARD
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
}`,fv=`#define STANDARD
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
}`,dv=`#define TOON
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
}`,pv=`#define TOON
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
}`,mv=`uniform float size;
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
}`,gv=`uniform vec3 diffuse;
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
}`,_v=`#include <common>
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
}`,vv=`uniform vec3 color;
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
}`,xv=`uniform float rotation;
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
}`,Mv=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:H0,alphahash_pars_fragment:G0,alphamap_fragment:W0,alphamap_pars_fragment:X0,alphatest_fragment:j0,alphatest_pars_fragment:q0,aomap_fragment:Y0,aomap_pars_fragment:$0,batching_pars_vertex:K0,batching_vertex:Z0,begin_vertex:J0,beginnormal_vertex:Q0,bsdfs:eg,iridescence_fragment:tg,bumpmap_pars_fragment:ng,clipping_planes_fragment:ig,clipping_planes_pars_fragment:rg,clipping_planes_pars_vertex:sg,clipping_planes_vertex:og,color_fragment:ag,color_pars_fragment:cg,color_pars_vertex:lg,color_vertex:ug,common:hg,cube_uv_reflection_fragment:fg,defaultnormal_vertex:dg,displacementmap_pars_vertex:pg,displacementmap_vertex:mg,emissivemap_fragment:gg,emissivemap_pars_fragment:_g,colorspace_fragment:vg,colorspace_pars_fragment:xg,envmap_fragment:Mg,envmap_common_pars_fragment:yg,envmap_pars_fragment:Sg,envmap_pars_vertex:Ag,envmap_physical_pars_fragment:Og,envmap_vertex:bg,fog_vertex:Eg,fog_pars_vertex:Tg,fog_fragment:wg,fog_pars_fragment:Rg,gradientmap_pars_fragment:Cg,lightmap_pars_fragment:Ig,lights_lambert_fragment:Pg,lights_lambert_pars_fragment:Lg,lights_pars_begin:Ng,lights_toon_fragment:Dg,lights_toon_pars_fragment:Ug,lights_phong_fragment:zg,lights_phong_pars_fragment:Fg,lights_physical_fragment:Bg,lights_physical_pars_fragment:kg,lights_fragment_begin:Vg,lights_fragment_maps:Hg,lights_fragment_end:Gg,logdepthbuf_fragment:Wg,logdepthbuf_pars_fragment:Xg,logdepthbuf_pars_vertex:jg,logdepthbuf_vertex:qg,map_fragment:Yg,map_pars_fragment:$g,map_particle_fragment:Kg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:Qg,morphinstance_vertex:e_,morphcolor_vertex:t_,morphnormal_vertex:n_,morphtarget_pars_vertex:i_,morphtarget_vertex:r_,normal_fragment_begin:s_,normal_fragment_maps:o_,normal_pars_fragment:a_,normal_pars_vertex:c_,normal_vertex:l_,normalmap_pars_fragment:u_,clearcoat_normal_fragment_begin:h_,clearcoat_normal_fragment_maps:f_,clearcoat_pars_fragment:d_,iridescence_pars_fragment:p_,opaque_fragment:m_,packing:g_,premultiplied_alpha_fragment:__,project_vertex:v_,dithering_fragment:x_,dithering_pars_fragment:M_,roughnessmap_fragment:y_,roughnessmap_pars_fragment:S_,shadowmap_pars_fragment:A_,shadowmap_pars_vertex:b_,shadowmap_vertex:E_,shadowmask_pars_fragment:T_,skinbase_vertex:w_,skinning_pars_vertex:R_,skinning_vertex:C_,skinnormal_vertex:I_,specularmap_fragment:P_,specularmap_pars_fragment:L_,tonemapping_fragment:N_,tonemapping_pars_fragment:O_,transmission_fragment:D_,transmission_pars_fragment:U_,uv_pars_fragment:z_,uv_pars_vertex:F_,uv_vertex:B_,worldpos_vertex:k_,background_vert:V_,background_frag:H_,backgroundCube_vert:G_,backgroundCube_frag:W_,cube_vert:X_,cube_frag:j_,depth_vert:q_,depth_frag:Y_,distanceRGBA_vert:$_,distanceRGBA_frag:K_,equirect_vert:Z_,equirect_frag:J_,linedashed_vert:Q_,linedashed_frag:ev,meshbasic_vert:tv,meshbasic_frag:nv,meshlambert_vert:iv,meshlambert_frag:rv,meshmatcap_vert:sv,meshmatcap_frag:ov,meshnormal_vert:av,meshnormal_frag:cv,meshphong_vert:lv,meshphong_frag:uv,meshphysical_vert:hv,meshphysical_frag:fv,meshtoon_vert:dv,meshtoon_frag:pv,points_vert:mv,points_frag:gv,shadow_vert:_v,shadow_frag:vv,sprite_vert:xv,sprite_frag:Mv},le={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Ln={basic:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new we(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Yt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Yt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Yt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new we(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Yt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Yt([le.points,le.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Yt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Yt([le.common,le.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Yt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Yt([le.sprite,le.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Yt([le.common,le.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Yt([le.lights,le.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Ln.physical={uniforms:Yt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Js={r:0,b:0,g:0},Li=new Dn,yv=new Ue;function Sv(i,e,t,n,r,s,o){const a=new we(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function _(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function v(x){let M=!1;const g=_(x);g===null?p(a,c):g&&g.isColor&&(p(g,1),M=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,M){const g=_(M);g&&(g.isCubeTexture||g.mapping===zo)?(u===void 0&&(u=new Me(new sn(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:Nr(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Li.copy(M.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yv.makeRotationFromEuler(Li)),u.material.toneMapped=je.getTransfer(g.colorSpace)!==ct,(h!==g||f!==g.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=g,f=g.version,d=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new Me(new rn(2,2),new Ti({name:"BackgroundMaterial",uniforms:Nr(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=je.getTransfer(g.colorSpace)!==ct,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||f!==g.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=g,f=g.version,d=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(Js,Ff(i)),n.buffers.color.setClear(Js.r,Js.g,Js.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:v,addToRenderList:m}}function Av(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(y,N,k,L,D){let q=!1;const j=h(L,k,N);s!==j&&(s=j,l(s.object)),q=d(y,L,k,D),q&&_(y,L,k,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,g(y,N,k,L),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,N,k){const L=k.wireframe===!0;let D=n[y.id];D===void 0&&(D={},n[y.id]=D);let q=D[N.id];q===void 0&&(q={},D[N.id]=q);let j=q[L];return j===void 0&&(j=f(c()),q[L]=j),j}function f(y){const N=[],k=[],L=[];for(let D=0;D<t;D++)N[D]=0,k[D]=0,L[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:L,object:y,attributes:{},index:null}}function d(y,N,k,L){const D=s.attributes,q=N.attributes;let j=0;const ie=k.getAttributes();for(const R in ie)if(ie[R].location>=0){const K=D[R];let ee=q[R];if(ee===void 0&&(R==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),R==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor)),K===void 0||K.attribute!==ee||ee&&K.data!==ee.data)return!0;j++}return s.attributesNum!==j||s.index!==L}function _(y,N,k,L){const D={},q=N.attributes;let j=0;const ie=k.getAttributes();for(const R in ie)if(ie[R].location>=0){let K=q[R];K===void 0&&(R==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),R==="instanceColor"&&y.instanceColor&&(K=y.instanceColor));const ee={};ee.attribute=K,K&&K.data&&(ee.data=K.data),D[R]=ee,j++}s.attributes=D,s.attributesNum=j,s.index=L}function v(){const y=s.newAttributes;for(let N=0,k=y.length;N<k;N++)y[N]=0}function m(y){p(y,0)}function p(y,N){const k=s.newAttributes,L=s.enabledAttributes,D=s.attributeDivisors;k[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),D[y]!==N&&(i.vertexAttribDivisor(y,N),D[y]=N)}function x(){const y=s.newAttributes,N=s.enabledAttributes;for(let k=0,L=N.length;k<L;k++)N[k]!==y[k]&&(i.disableVertexAttribArray(k),N[k]=0)}function M(y,N,k,L,D,q,j){j===!0?i.vertexAttribIPointer(y,N,k,D,q):i.vertexAttribPointer(y,N,k,L,D,q)}function g(y,N,k,L){v();const D=L.attributes,q=k.getAttributes(),j=N.defaultAttributeValues;for(const ie in q){const R=q[ie];if(R.location>=0){let X=D[ie];if(X===void 0&&(ie==="instanceMatrix"&&y.instanceMatrix&&(X=y.instanceMatrix),ie==="instanceColor"&&y.instanceColor&&(X=y.instanceColor)),X!==void 0){const K=X.normalized,ee=X.itemSize,ne=e.get(X);if(ne===void 0)continue;const Te=ne.buffer,H=ne.type,Y=ne.bytesPerElement,ue=H===i.INT||H===i.UNSIGNED_INT||X.gpuType===Yc;if(X.isInterleavedBufferAttribute){const ce=X.data,Ie=ce.stride,Oe=X.offset;if(ce.isInstancedInterleavedBuffer){for(let ze=0;ze<R.locationSize;ze++)p(R.location+ze,ce.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ze=0;ze<R.locationSize;ze++)m(R.location+ze);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let ze=0;ze<R.locationSize;ze++)M(R.location+ze,ee/R.locationSize,H,K,Ie*Y,(Oe+ee/R.locationSize*ze)*Y,ue)}else{if(X.isInstancedBufferAttribute){for(let ce=0;ce<R.locationSize;ce++)p(R.location+ce,X.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let ce=0;ce<R.locationSize;ce++)m(R.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Te);for(let ce=0;ce<R.locationSize;ce++)M(R.location+ce,ee/R.locationSize,H,K,ee*Y,ee/R.locationSize*ce*Y,ue)}}else if(j!==void 0){const K=j[ie];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(R.location,K);break;case 3:i.vertexAttrib3fv(R.location,K);break;case 4:i.vertexAttrib4fv(R.location,K);break;default:i.vertexAttrib1fv(R.location,K)}}}}x()}function E(){C();for(const y in n){const N=n[y];for(const k in N){const L=N[k];for(const D in L)u(L[D].object),delete L[D];delete N[k]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const N=n[y.id];for(const k in N){const L=N[k];for(const D in L)u(L[D].object),delete L[D];delete N[k]}delete n[y.id]}function w(y){for(const N in n){const k=n[N];if(k[y.id]===void 0)continue;const L=k[y.id];for(const D in L)u(L[D].object),delete L[D];delete k[y.id]}}function C(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function bv(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<l.length;_++)o(l[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let _=0;for(let v=0;v<h;v++)_+=u[v]*f[v];t.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Ev(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==mn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==ii&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==En&&!C)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),g=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:g,vertexTextures:E,maxSamples:A}}function Tv(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Di,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):l();else{const x=s?0:n,M=x*4;let g=p.clippingState||null;c.value=g,g=u(_,f,M,d);for(let E=0;E!==M;++E)g[E]=t[E];p.clippingState=g,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,_!==!0||m===null){const p=d+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,g=d;M!==v;++M,g+=4)o.copy(h[M]).applyMatrix4(x,a),o.normal.toArray(m,g),m[g+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function wv(i){let e=new WeakMap;function t(o,a){return a===nc?o.mapping=Rr:a===ic&&(o.mapping=Cr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===nc||a===ic)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new F0(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class rl extends Bf{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const vr=4,gu=[.125,.215,.35,.446,.526,.582],Fi=20,Ma=new rl,_u=new we;let ya=null,Sa=0,Aa=0,ba=!1;const Ui=(1+Math.sqrt(5))/2,lr=1/Ui,vu=[new P(-Ui,lr,0),new P(Ui,lr,0),new P(-lr,0,Ui),new P(lr,0,Ui),new P(0,Ui,-lr),new P(0,Ui,lr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Nc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ya=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ya,Sa,Aa),this._renderer.xr.enabled=ba,e.scissorTest=!1,Qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Rr||e.mapping===Cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ya=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:ws,format:mn,colorSpace:Jt,depthBuffer:!1},r=xu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xu(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rv(s)),this._blurMaterial=Cv(s,e,t)}return r}_compileMaterial(e){const t=new Me(this._lodPlanes[0],e);this._renderer.compile(t,Ma)}_sceneToCubeUV(e,t,n,r){const a=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(_u),u.toneMapping=Mi,u.autoClear=!1;const d=new bt({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),_=new Me(new sn,d);let v=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,v=!0):(d.color.copy(_u),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;Qs(r,x*M,p>2?M:0,M,M),u.setRenderTarget(r),v&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Rr||e.mapping===Cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Me(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Qs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ma)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=vu[(r-s-1)%vu.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Me(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Fi-1),v=s/_,m=isFinite(s)?1+Math.floor(u*v):Fi;m>Fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);const p=[];let x=0;for(let w=0;w<Fi;++w){const C=w/v,S=Math.exp(-C*C/2);p.push(S),w===0?x+=S:w<m&&(x+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=_,f.mipInt.value=M-n;const g=this._sizeLods[r],E=3*g*(r>M-vr?r-M+vr:0),A=4*(this._cubeSize-g);Qs(t,E,A,3*g,2*g),c.setRenderTarget(t),c.render(h,Ma)}}function Rv(i){const e=[],t=[],n=[];let r=i;const s=i-vr+1+gu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-vr?c=gu[o-i+vr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,v=3,m=2,p=1,x=new Float32Array(v*_*d),M=new Float32Array(m*_*d),g=new Float32Array(p*_*d);for(let A=0;A<d;A++){const w=A%3*2/3-1,C=A>2?0:-1,S=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];x.set(S,v*_*A),M.set(f,m*_*A);const y=[A,A,A,A,A,A];g.set(y,p*_*A)}const E=new Ut;E.setAttribute("position",new Zt(x,v)),E.setAttribute("uv",new Zt(M,m)),E.setAttribute("faceIndex",new Zt(g,p)),e.push(E),r>vr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xu(i,e,t){const n=new ji(i,e,t);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Cv(i,e,t){const n=new Float32Array(Fi),r=new P(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:sl(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Mu(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function yu(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function sl(){return`

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
	`}function Iv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===nc||c===ic,u=c===Rr||c===Cr;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Nc(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Nc(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Pv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ss("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Lv(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const v=f.morphAttributes[_];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const _ in d){const v=d[_];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,_=h.attributes.position;let v=0;if(d!==null){const x=d.array;v=d.version;for(let M=0,g=x.length;M<g;M+=3){const E=x[M+0],A=x[M+1],w=x[M+2];f.push(E,A,A,w,w,E)}}else if(_!==void 0){const x=_.array;v=_.version;for(let M=0,g=x.length/3-1;M<g;M+=3){const E=M+0,A=M+1,w=M+2;f.push(E,A,A,w,w,E)}}else return;const m=new(Pf(f)?zf:Uf)(f,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Nv(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,s,f*o),t.update(d,n,1)}function l(f,d,_){_!==0&&(i.drawElementsInstanced(n,d,s,f*o,_),t.update(d,n,_))}function u(f,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,n,1)}function h(f,d,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,v,0,_);let p=0;for(let x=0;x<_;x++)p+=d[x]*v[x];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ov(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Dv(i,e,t){const n=new WeakMap,r=new tt;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),_===!0&&(M=2),v===!0&&(M=3);let g=a.attributes.position.count*M,E=1;g>e.maxTextureSize&&(E=Math.ceil(g/e.maxTextureSize),g=e.maxTextureSize);const A=new Float32Array(g*E*4*h),w=new Nf(A,g,E,h);w.type=En,w.needsUpdate=!0;const C=M*4;for(let y=0;y<h;y++){const N=m[y],k=p[y],L=x[y],D=g*E*4*y;for(let q=0;q<N.count;q++){const j=q*C;d===!0&&(r.fromBufferAttribute(N,q),A[D+j+0]=r.x,A[D+j+1]=r.y,A[D+j+2]=r.z,A[D+j+3]=0),_===!0&&(r.fromBufferAttribute(k,q),A[D+j+4]=r.x,A[D+j+5]=r.y,A[D+j+6]=r.z,A[D+j+7]=0),v===!0&&(r.fromBufferAttribute(L,q),A[D+j+8]=r.x,A[D+j+9]=r.y,A[D+j+10]=r.z,A[D+j+11]=L.itemSize===4?r.w:1)}}f={count:h,texture:w,size:new ae(g,E)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const _=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Uv(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Hf extends Pt{constructor(e,t,n,r,s,o,a,c,l,u=yr){if(u!==yr&&u!==Pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yr&&(n=Xi),n===void 0&&u===Pr&&(n=Ir),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:It,this.minFilter=c!==void 0?c:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gf=new Pt,Su=new Hf(1,1),Wf=new Nf,Xf=new S0,jf=new kf,Au=[],bu=[],Eu=new Float32Array(16),Tu=new Float32Array(9),wu=new Float32Array(4);function zr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Au[r];if(s===void 0&&(s=new Float32Array(r),Au[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ko(i,e){let t=bu[e];t===void 0&&(t=new Int32Array(e),bu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function zv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function Bv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function Vv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;wu.set(n),i.uniformMatrix2fv(this.addr,!1,wu),Nt(t,n)}}function Hv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Tu.set(n),i.uniformMatrix3fv(this.addr,!1,Tu),Nt(t,n)}}function Gv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Eu.set(n),i.uniformMatrix4fv(this.addr,!1,Eu),Nt(t,n)}}function Wv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function jv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function qv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function Yv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function Kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function Zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Jv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Su.compareFunction=If,s=Su):s=Gf,t.setTexture2D(e||s,r)}function Qv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Xf,r)}function ex(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||jf,r)}function tx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Wf,r)}function nx(i){switch(i){case 5126:return zv;case 35664:return Fv;case 35665:return Bv;case 35666:return kv;case 35674:return Vv;case 35675:return Hv;case 35676:return Gv;case 5124:case 35670:return Wv;case 35667:case 35671:return Xv;case 35668:case 35672:return jv;case 35669:case 35673:return qv;case 5125:return Yv;case 36294:return $v;case 36295:return Kv;case 36296:return Zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Jv;case 35679:case 36299:case 36307:return Qv;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return tx}}function ix(i,e){i.uniform1fv(this.addr,e)}function rx(i,e){const t=zr(e,this.size,2);i.uniform2fv(this.addr,t)}function sx(i,e){const t=zr(e,this.size,3);i.uniform3fv(this.addr,t)}function ox(i,e){const t=zr(e,this.size,4);i.uniform4fv(this.addr,t)}function ax(i,e){const t=zr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cx(i,e){const t=zr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lx(i,e){const t=zr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ux(i,e){i.uniform1iv(this.addr,e)}function hx(i,e){i.uniform2iv(this.addr,e)}function fx(i,e){i.uniform3iv(this.addr,e)}function dx(i,e){i.uniform4iv(this.addr,e)}function px(i,e){i.uniform1uiv(this.addr,e)}function mx(i,e){i.uniform2uiv(this.addr,e)}function gx(i,e){i.uniform3uiv(this.addr,e)}function _x(i,e){i.uniform4uiv(this.addr,e)}function vx(i,e,t){const n=this.cache,r=e.length,s=ko(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Gf,s[o])}function xx(i,e,t){const n=this.cache,r=e.length,s=ko(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Xf,s[o])}function Mx(i,e,t){const n=this.cache,r=e.length,s=ko(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||jf,s[o])}function yx(i,e,t){const n=this.cache,r=e.length,s=ko(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Wf,s[o])}function Sx(i){switch(i){case 5126:return ix;case 35664:return rx;case 35665:return sx;case 35666:return ox;case 35674:return ax;case 35675:return cx;case 35676:return lx;case 5124:case 35670:return ux;case 35667:case 35671:return hx;case 35668:case 35672:return fx;case 35669:case 35673:return dx;case 5125:return px;case 36294:return mx;case 36295:return gx;case 36296:return _x;case 35678:case 36198:case 36298:case 36306:case 35682:return vx;case 35679:case 36299:case 36307:return xx;case 35680:case 36300:case 36308:case 36293:return Mx;case 36289:case 36303:case 36311:case 36292:return yx}}class Ax{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nx(t.type)}}class bx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sx(t.type)}}class Ex{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Ea=/(\w+)(\])?(\[|\.)?/g;function Ru(i,e){i.seq.push(e),i.map[e.id]=e}function Tx(i,e,t){const n=i.name,r=n.length;for(Ea.lastIndex=0;;){const s=Ea.exec(n),o=Ea.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ru(t,l===void 0?new Ax(a,i,e):new bx(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new Ex(a),Ru(t,h)),t=h}}}class yo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Tx(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Cu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const wx=37297;let Rx=0;function Cx(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Iu=new Ve;function Ix(i){je._getMatrix(Iu,je.workingColorSpace,i);const e=`mat3( ${Iu.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Fo:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Pu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Cx(i.getShaderSource(e),o)}else return r}function Px(i,e){const t=Ix(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Lx(i,e){let t;switch(e){case Pm:t="Linear";break;case Lm:t="Reinhard";break;case Nm:t="Cineon";break;case mf:t="ACESFilmic";break;case Dm:t="AgX";break;case Um:t="Neutral";break;case Om:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const eo=new P;function Nx(){je.getLuminanceCoefficients(eo);const i=eo.x.toFixed(4),e=eo.y.toFixed(4),t=eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ox(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function Dx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ux(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function os(i){return i!==""}function Lu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(i){return i.replace(zx,Bx)}const Fx=new Map;function Bx(i,e){let t=Ge[e];if(t===void 0){const n=Fx.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oc(t)}const kx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ou(i){return i.replace(kx,Vx)}function Vx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Du(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Hx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===df?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===um?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function Gx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Rr:case Cr:e="ENVMAP_TYPE_CUBE";break;case zo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Wx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Cr:e="ENVMAP_MODE_REFRACTION";break}return e}function Xx(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case pf:e="ENVMAP_BLENDING_MULTIPLY";break;case Cm:e="ENVMAP_BLENDING_MIX";break;case Im:e="ENVMAP_BLENDING_ADD";break}return e}function jx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function qx(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Hx(t),l=Gx(t),u=Wx(t),h=Xx(t),f=jx(t),d=Ox(t),_=Dx(s),v=r.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(os).join(`
`),p.length>0&&(p+=`
`)):(m=[Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),p=[Du(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mi?"#define TONE_MAPPING":"",t.toneMapping!==Mi?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Mi?Lx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Px("linearToOutputTexel",t.outputColorSpace),Nx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(os).join(`
`)),o=Oc(o),o=Lu(o,t),o=Nu(o,t),a=Oc(a),a=Lu(a,t),a=Nu(a,t),o=Ou(o),a=Ou(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+o,g=x+p+a,E=Cu(r,r.VERTEX_SHADER,M),A=Cu(r,r.FRAGMENT_SHADER,g);r.attachShader(v,E),r.attachShader(v,A),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(N){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(v).trim(),L=r.getShaderInfoLog(E).trim(),D=r.getShaderInfoLog(A).trim();let q=!0,j=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,E,A);else{const ie=Pu(r,E,"vertex"),R=Pu(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+k+`
`+ie+`
`+R)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(L===""||D==="")&&(j=!1);j&&(N.diagnostics={runnable:q,programLog:k,vertexShader:{log:L,prefix:m},fragmentShader:{log:D,prefix:p}})}r.deleteShader(E),r.deleteShader(A),C=new yo(r,v),S=Ux(r,v)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(v,wx)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=A,this}let Yx=0;class $x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Kx(e),t.set(e,n)),n}}class Kx{constructor(e){this.id=Yx++,this.code=e,this.usedTimes=0}}function Zx(i,e,t,n,r,s,o){const a=new Of,c=new $x,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,N,k,L){const D=k.fog,q=L.geometry,j=S.isMeshStandardMaterial?k.environment:null,ie=(S.isMeshStandardMaterial?t:e).get(S.envMap||j),R=ie&&ie.mapping===zo?ie.image.height:null,X=_[S.type];S.precision!==null&&(d=r.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const K=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ee=K!==void 0?K.length:0;let ne=0;q.morphAttributes.position!==void 0&&(ne=1),q.morphAttributes.normal!==void 0&&(ne=2),q.morphAttributes.color!==void 0&&(ne=3);let Te,H,Y,ue;if(X){const st=Ln[X];Te=st.vertexShader,H=st.fragmentShader}else Te=S.vertexShader,H=S.fragmentShader,c.update(S),Y=c.getVertexShaderID(S),ue=c.getFragmentShaderID(S);const ce=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Oe=L.isInstancedMesh===!0,ze=L.isBatchedMesh===!0,dt=!!S.map,Xe=!!S.matcap,vt=!!ie,F=!!S.aoMap,jt=!!S.lightMap,qe=!!S.bumpMap,Ye=!!S.normalMap,Pe=!!S.displacementMap,pt=!!S.emissiveMap,Re=!!S.metalnessMap,I=!!S.roughnessMap,b=S.anisotropy>0,V=S.clearcoat>0,J=S.dispersion>0,te=S.iridescence>0,Z=S.sheen>0,be=S.transmission>0,fe=b&&!!S.anisotropyMap,ge=V&&!!S.clearcoatMap,Ke=V&&!!S.clearcoatNormalMap,re=V&&!!S.clearcoatRoughnessMap,ve=te&&!!S.iridescenceMap,Le=te&&!!S.iridescenceThicknessMap,Ne=Z&&!!S.sheenColorMap,xe=Z&&!!S.sheenRoughnessMap,$e=!!S.specularMap,He=!!S.specularColorMap,ut=!!S.specularIntensityMap,U=be&&!!S.transmissionMap,he=be&&!!S.thicknessMap,$=!!S.gradientMap,Q=!!S.alphaMap,me=S.alphaTest>0,de=!!S.alphaHash,Fe=!!S.extensions;let Mt=Mi;S.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Mt=i.toneMapping);const Ft={shaderID:X,shaderType:S.type,shaderName:S.name,vertexShader:Te,fragmentShader:H,defines:S.defines,customVertexShaderID:Y,customFragmentShaderID:ue,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:ze,batchingColor:ze&&L._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&L.instanceColor!==null,instancingMorph:Oe&&L.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Jt,alphaToCoverage:!!S.alphaToCoverage,map:dt,matcap:Xe,envMap:vt,envMapMode:vt&&ie.mapping,envMapCubeUVHeight:R,aoMap:F,lightMap:jt,bumpMap:qe,normalMap:Ye,displacementMap:f&&Pe,emissiveMap:pt,normalMapObjectSpace:Ye&&S.normalMapType===Wm,normalMapTangentSpace:Ye&&S.normalMapType===Cf,metalnessMap:Re,roughnessMap:I,anisotropy:b,anisotropyMap:fe,clearcoat:V,clearcoatMap:ge,clearcoatNormalMap:Ke,clearcoatRoughnessMap:re,dispersion:J,iridescence:te,iridescenceMap:ve,iridescenceThicknessMap:Le,sheen:Z,sheenColorMap:Ne,sheenRoughnessMap:xe,specularMap:$e,specularColorMap:He,specularIntensityMap:ut,transmission:be,transmissionMap:U,thicknessMap:he,gradientMap:$,opaque:S.transparent===!1&&S.blending===Vi&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:me,alphaHash:de,combine:S.combine,mapUv:dt&&v(S.map.channel),aoMapUv:F&&v(S.aoMap.channel),lightMapUv:jt&&v(S.lightMap.channel),bumpMapUv:qe&&v(S.bumpMap.channel),normalMapUv:Ye&&v(S.normalMap.channel),displacementMapUv:Pe&&v(S.displacementMap.channel),emissiveMapUv:pt&&v(S.emissiveMap.channel),metalnessMapUv:Re&&v(S.metalnessMap.channel),roughnessMapUv:I&&v(S.roughnessMap.channel),anisotropyMapUv:fe&&v(S.anisotropyMap.channel),clearcoatMapUv:ge&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&v(S.sheenRoughnessMap.channel),specularMapUv:$e&&v(S.specularMap.channel),specularColorMapUv:He&&v(S.specularColorMap.channel),specularIntensityMapUv:ut&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:he&&v(S.thicknessMap.channel),alphaMapUv:Q&&v(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ye||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!q.attributes.uv&&(dt||Q),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ie,skinning:L.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ne,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Mt,decodeVideoTexture:dt&&S.map.isVideoTexture===!0&&je.getTransfer(S.map.colorSpace)===ct,decodeVideoTextureEmissive:pt&&S.emissiveMap.isVideoTexture===!0&&je.getTransfer(S.emissiveMap.colorSpace)===ct,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===dn,flipSided:S.side===Kt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Fe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&S.extensions.multiDraw===!0||ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ft.vertexUv1s=l.has(1),Ft.vertexUv2s=l.has(2),Ft.vertexUv3s=l.has(3),l.clear(),Ft}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)y.push(N),y.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(x(y,S),M(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function g(S){const y=_[S.type];let N;if(y){const k=Ln[y];N=O0.clone(k.uniforms)}else N=S.uniforms;return N}function E(S,y){let N;for(let k=0,L=u.length;k<L;k++){const D=u[k];if(D.cacheKey===y){N=D,++N.usedTimes;break}}return N===void 0&&(N=new qx(i,y,S,s),u.push(N)),N}function A(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function w(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:g,acquireProgram:E,releaseProgram:A,releaseShaderCache:w,programs:u,dispose:C}}function Jx(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Qx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Uu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function zu(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,d,_,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function a(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function c(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||Qx),n.length>1&&n.sort(f||Uu),r.length>1&&r.sort(f||Uu)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function eM(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new zu,i.set(n,[o])):r>=s.length?(o=new zu,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function tM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new we};break;case"SpotLight":t={position:new P,direction:new P,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function nM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let iM=0;function rM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function sM(i){const e=new tM,t=nM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const r=new P,s=new Ue,o=new Ue;function a(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,_=0,v=0,m=0,p=0,x=0,M=0,g=0,E=0,A=0,w=0;l.sort(rM);for(let S=0,y=l.length;S<y;S++){const N=l[S],k=N.color,L=N.intensity,D=N.distance,q=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=k.r*L,h+=k.g*L,f+=k.b*L;else if(N.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(N.sh.coefficients[j],L);w++}else if(N.isDirectionalLight){const j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const ie=N.shadow,R=t.get(N);R.shadowIntensity=ie.intensity,R.shadowBias=ie.bias,R.shadowNormalBias=ie.normalBias,R.shadowRadius=ie.radius,R.shadowMapSize=ie.mapSize,n.directionalShadow[d]=R,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=N.shadow.matrix,x++}n.directional[d]=j,d++}else if(N.isSpotLight){const j=e.get(N);j.position.setFromMatrixPosition(N.matrixWorld),j.color.copy(k).multiplyScalar(L),j.distance=D,j.coneCos=Math.cos(N.angle),j.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),j.decay=N.decay,n.spot[v]=j;const ie=N.shadow;if(N.map&&(n.spotLightMap[E]=N.map,E++,ie.updateMatrices(N),N.castShadow&&A++),n.spotLightMatrix[v]=ie.matrix,N.castShadow){const R=t.get(N);R.shadowIntensity=ie.intensity,R.shadowBias=ie.bias,R.shadowNormalBias=ie.normalBias,R.shadowRadius=ie.radius,R.shadowMapSize=ie.mapSize,n.spotShadow[v]=R,n.spotShadowMap[v]=q,g++}v++}else if(N.isRectAreaLight){const j=e.get(N);j.color.copy(k).multiplyScalar(L),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=j,m++}else if(N.isPointLight){const j=e.get(N);if(j.color.copy(N.color).multiplyScalar(N.intensity),j.distance=N.distance,j.decay=N.decay,N.castShadow){const ie=N.shadow,R=t.get(N);R.shadowIntensity=ie.intensity,R.shadowBias=ie.bias,R.shadowNormalBias=ie.normalBias,R.shadowRadius=ie.radius,R.shadowMapSize=ie.mapSize,R.shadowCameraNear=ie.camera.near,R.shadowCameraFar=ie.camera.far,n.pointShadow[_]=R,n.pointShadowMap[_]=q,n.pointShadowMatrix[_]=N.shadow.matrix,M++}n.point[_]=j,_++}else if(N.isHemisphereLight){const j=e.get(N);j.skyColor.copy(N.color).multiplyScalar(L),j.groundColor.copy(N.groundColor).multiplyScalar(L),n.hemi[p]=j,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==_||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==x||C.numPointShadows!==M||C.numSpotShadows!==g||C.numSpotMaps!==E||C.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=g,n.spotShadowMap.length=g,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=g+E-A,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=w,C.directionalLength=d,C.pointLength=_,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=x,C.numPointShadows=M,C.numSpotShadows=g,C.numSpotMaps=E,C.numLightProbes=w,n.version=iM++)}function c(l,u){let h=0,f=0,d=0,_=0,v=0;const m=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const M=l[p];if(M.isDirectionalLight){const g=n.directional[h];g.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),h++}else if(M.isSpotLight){const g=n.spot[d];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),g.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const g=n.rectArea[_];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),g.halfWidth.set(M.width*.5,0,0),g.halfHeight.set(0,M.height*.5,0),g.halfWidth.applyMatrix4(o),g.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const g=n.point[f];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const g=n.hemi[v];g.direction.setFromMatrixPosition(M.matrixWorld),g.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Fu(i){const e=new sM(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function oM(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Fu(i),e.set(r,[a])):s>=o.length?(a=new Fu(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class aM extends Cn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Hm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cM extends Cn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const lM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uM=`uniform sampler2D shadow_pass;
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
}`;function hM(i,e,t){let n=new il;const r=new ae,s=new ae,o=new tt,a=new aM({depthPacking:Gm}),c=new cM,l={},u=t.maxTextureSize,h={[ni]:Kt,[Kt]:ni,[dn]:dn},f=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:lM,fragmentShader:uM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new Ut;_.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Me(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=df;let p=this.type;this.render=function(A,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),k=i.state;k.setBlending(xi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const L=p!==Yn&&this.type===Yn,D=p===Yn&&this.type!==Yn;for(let q=0,j=A.length;q<j;q++){const ie=A[q],R=ie.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;r.copy(R.mapSize);const X=R.getFrameExtents();if(r.multiply(X),s.copy(R.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,R.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,R.mapSize.y=s.y)),R.map===null||L===!0||D===!0){const ee=this.type!==Yn?{minFilter:It,magFilter:It}:{};R.map!==null&&R.map.dispose(),R.map=new ji(r.x,r.y,ee),R.map.texture.name=ie.name+".shadowMap",R.camera.updateProjectionMatrix()}i.setRenderTarget(R.map),i.clear();const K=R.getViewportCount();for(let ee=0;ee<K;ee++){const ne=R.getViewport(ee);o.set(s.x*ne.x,s.y*ne.y,s.x*ne.z,s.y*ne.w),k.viewport(o),R.updateMatrices(ie,ee),n=R.getFrustum(),g(w,C,R.camera,ie,this.type)}R.isPointLightShadow!==!0&&this.type===Yn&&x(R,C),R.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,N)};function x(A,w){const C=e.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ji(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,C,f,v,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,C,d,v,null)}function M(A,w,C,S){let y=null;const N=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)y=N;else if(y=C.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const k=y.uuid,L=w.uuid;let D=l[k];D===void 0&&(D={},l[k]=D);let q=D[L];q===void 0&&(q=y.clone(),D[L]=q,w.addEventListener("dispose",E)),y=q}if(y.visible=w.visible,y.wireframe=w.wireframe,S===Yn?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:h[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const k=i.properties.get(y);k.light=C}return y}function g(A,w,C,S,y){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Yn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const L=e.update(A),D=A.material;if(Array.isArray(D)){const q=L.groups;for(let j=0,ie=q.length;j<ie;j++){const R=q[j],X=D[R.materialIndex];if(X&&X.visible){const K=M(A,X,S,y);A.onBeforeShadow(i,A,w,C,L,K,R),i.renderBufferDirect(C,null,L,K,A,R),A.onAfterShadow(i,A,w,C,L,K,R)}}}else if(D.visible){const q=M(A,D,S,y);A.onBeforeShadow(i,A,w,C,L,q,null),i.renderBufferDirect(C,null,L,q,A,null),A.onAfterShadow(i,A,w,C,L,q,null)}}const k=A.children;for(let L=0,D=k.length;L<D;L++)g(k[L],w,C,S,y)}function E(A){A.target.removeEventListener("dispose",E);for(const C in l){const S=l[C],y=A.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const fM={[$a]:Ka,[Za]:ec,[Ja]:tc,[wr]:Qa,[Ka]:$a,[ec]:Za,[tc]:Ja,[Qa]:wr};function dM(i,e){function t(){let U=!1;const he=new tt;let $=null;const Q=new tt(0,0,0,0);return{setMask:function(me){$!==me&&!U&&(i.colorMask(me,me,me,me),$=me)},setLocked:function(me){U=me},setClear:function(me,de,Fe,Mt,Ft){Ft===!0&&(me*=Mt,de*=Mt,Fe*=Mt),he.set(me,de,Fe,Mt),Q.equals(he)===!1&&(i.clearColor(me,de,Fe,Mt),Q.copy(he))},reset:function(){U=!1,$=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,he=!1,$=null,Q=null,me=null;return{setReversed:function(de){if(he!==de){const Fe=e.get("EXT_clip_control");he?Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.ZERO_TO_ONE_EXT):Fe.clipControlEXT(Fe.LOWER_LEFT_EXT,Fe.NEGATIVE_ONE_TO_ONE_EXT);const Mt=me;me=null,this.setClear(Mt)}he=de},getReversed:function(){return he},setTest:function(de){de?ce(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(de){$!==de&&!U&&(i.depthMask(de),$=de)},setFunc:function(de){if(he&&(de=fM[de]),Q!==de){switch(de){case $a:i.depthFunc(i.NEVER);break;case Ka:i.depthFunc(i.ALWAYS);break;case Za:i.depthFunc(i.LESS);break;case wr:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case Qa:i.depthFunc(i.GEQUAL);break;case ec:i.depthFunc(i.GREATER);break;case tc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=de}},setLocked:function(de){U=de},setClear:function(de){me!==de&&(he&&(de=1-de),i.clearDepth(de),me=de)},reset:function(){U=!1,$=null,Q=null,me=null,he=!1}}}function r(){let U=!1,he=null,$=null,Q=null,me=null,de=null,Fe=null,Mt=null,Ft=null;return{setTest:function(st){U||(st?ce(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(st){he!==st&&!U&&(i.stencilMask(st),he=st)},setFunc:function(st,gn,kn){($!==st||Q!==gn||me!==kn)&&(i.stencilFunc(st,gn,kn),$=st,Q=gn,me=kn)},setOp:function(st,gn,kn){(de!==st||Fe!==gn||Mt!==kn)&&(i.stencilOp(st,gn,kn),de=st,Fe=gn,Mt=kn)},setLocked:function(st){U=st},setClear:function(st){Ft!==st&&(i.clearStencil(st),Ft=st)},reset:function(){U=!1,he=null,$=null,Q=null,me=null,de=null,Fe=null,Mt=null,Ft=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,x=null,M=null,g=null,E=null,A=null,w=new we(0,0,0),C=0,S=!1,y=null,N=null,k=null,L=null,D=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,ie=0;const R=i.getParameter(i.VERSION);R.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(R)[1]),j=ie>=1):R.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),j=ie>=2);let X=null,K={};const ee=i.getParameter(i.SCISSOR_BOX),ne=i.getParameter(i.VIEWPORT),Te=new tt().fromArray(ee),H=new tt().fromArray(ne);function Y(U,he,$,Q){const me=new Uint8Array(4),de=i.createTexture();i.bindTexture(U,de),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Fe=0;Fe<$;Fe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(he+Fe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return de}const ue={};ue[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),ue[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ue[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(i.DEPTH_TEST),o.setFunc(wr),qe(!1),Ye(Gl),ce(i.CULL_FACE),F(xi);function ce(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Ie(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Oe(U,he){return h[U]!==he?(i.bindFramebuffer(U,he),h[U]=he,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=he),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=he),!0):!1}function ze(U,he){let $=d,Q=!1;if(U){$=f.get(he),$===void 0&&($=[],f.set(he,$));const me=U.textures;if($.length!==me.length||$[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Fe=me.length;de<Fe;de++)$[de]=i.COLOR_ATTACHMENT0+de;$.length=me.length,Q=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,Q=!0);Q&&i.drawBuffers($)}function dt(U){return _!==U?(i.useProgram(U),_=U,!0):!1}const Xe={[zi]:i.FUNC_ADD,[fm]:i.FUNC_SUBTRACT,[dm]:i.FUNC_REVERSE_SUBTRACT};Xe[pm]=i.MIN,Xe[mm]=i.MAX;const vt={[gm]:i.ZERO,[_m]:i.ONE,[vm]:i.SRC_COLOR,[qa]:i.SRC_ALPHA,[bm]:i.SRC_ALPHA_SATURATE,[Sm]:i.DST_COLOR,[Mm]:i.DST_ALPHA,[xm]:i.ONE_MINUS_SRC_COLOR,[Ya]:i.ONE_MINUS_SRC_ALPHA,[Am]:i.ONE_MINUS_DST_COLOR,[ym]:i.ONE_MINUS_DST_ALPHA,[Em]:i.CONSTANT_COLOR,[Tm]:i.ONE_MINUS_CONSTANT_COLOR,[wm]:i.CONSTANT_ALPHA,[Rm]:i.ONE_MINUS_CONSTANT_ALPHA};function F(U,he,$,Q,me,de,Fe,Mt,Ft,st){if(U===xi){v===!0&&(Ie(i.BLEND),v=!1);return}if(v===!1&&(ce(i.BLEND),v=!0),U!==hm){if(U!==m||st!==S){if((p!==zi||g!==zi)&&(i.blendEquation(i.FUNC_ADD),p=zi,g=zi),st)switch(U){case Vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,M=null,E=null,A=null,w.set(0,0,0),C=0,m=U,S=st}return}me=me||he,de=de||$,Fe=Fe||Q,(he!==p||me!==g)&&(i.blendEquationSeparate(Xe[he],Xe[me]),p=he,g=me),($!==x||Q!==M||de!==E||Fe!==A)&&(i.blendFuncSeparate(vt[$],vt[Q],vt[de],vt[Fe]),x=$,M=Q,E=de,A=Fe),(Mt.equals(w)===!1||Ft!==C)&&(i.blendColor(Mt.r,Mt.g,Mt.b,Ft),w.copy(Mt),C=Ft),m=U,S=!1}function jt(U,he){U.side===dn?Ie(i.CULL_FACE):ce(i.CULL_FACE);let $=U.side===Kt;he&&($=!$),qe($),U.blending===Vi&&U.transparent===!1?F(xi):F(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),pt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function Ye(U){U!==cm?(ce(i.CULL_FACE),U!==N&&(U===Gl?i.cullFace(i.BACK):U===lm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),N=U}function Pe(U){U!==k&&(j&&i.lineWidth(U),k=U)}function pt(U,he,$){U?(ce(i.POLYGON_OFFSET_FILL),(L!==he||D!==$)&&(i.polygonOffset(he,$),L=he,D=$)):Ie(i.POLYGON_OFFSET_FILL)}function Re(U){U?ce(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function I(U){U===void 0&&(U=i.TEXTURE0+q-1),X!==U&&(i.activeTexture(U),X=U)}function b(U,he,$){$===void 0&&(X===null?$=i.TEXTURE0+q-1:$=X);let Q=K[$];Q===void 0&&(Q={type:void 0,texture:void 0},K[$]=Q),(Q.type!==U||Q.texture!==he)&&(X!==$&&(i.activeTexture($),X=$),i.bindTexture(U,he||ue[U]),Q.type=U,Q.texture=he)}function V(){const U=K[X];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ge(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ke(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Le(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(U){Te.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Te.copy(U))}function xe(U){H.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),H.copy(U))}function $e(U,he){let $=l.get(he);$===void 0&&($=new WeakMap,l.set(he,$));let Q=$.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(he,U.name),$.set(U,Q))}function He(U,he){const Q=l.get(he).get(U);c.get(he)!==Q&&(i.uniformBlockBinding(he,Q,U.__bindingPointIndex),c.set(he,Q))}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},X=null,K={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,x=null,M=null,g=null,E=null,A=null,w=new we(0,0,0),C=0,S=!1,y=null,N=null,k=null,L=null,D=null,Te.set(0,0,i.canvas.width,i.canvas.height),H.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:Ie,bindFramebuffer:Oe,drawBuffers:ze,useProgram:dt,setBlending:F,setMaterial:jt,setFlipSided:qe,setCullFace:Ye,setLineWidth:Pe,setPolygonOffset:pt,setScissorTest:Re,activeTexture:I,bindTexture:b,unbindTexture:V,compressedTexImage2D:J,compressedTexImage3D:te,texImage2D:ve,texImage3D:Le,updateUBOMapping:$e,uniformBlockBinding:He,texStorage2D:Ke,texStorage3D:re,texSubImage2D:Z,texSubImage3D:be,compressedTexSubImage2D:fe,compressedTexSubImage3D:ge,scissor:Ne,viewport:xe,reset:ut}}function Bu(i,e,t,n){const r=pM(n);switch(t){case yf:return i*e;case Af:return i*e;case bf:return i*e*2;case Zc:return i*e/r.components*r.byteLength;case Jc:return i*e/r.components*r.byteLength;case Ef:return i*e*2/r.components*r.byteLength;case Qc:return i*e*2/r.components*r.byteLength;case Sf:return i*e*3/r.components*r.byteLength;case mn:return i*e*4/r.components*r.byteLength;case el:return i*e*4/r.components*r.byteLength;case go:case _o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vo:case xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sc:case ac:return Math.max(i,16)*Math.max(e,8)/4;case rc:case oc:return Math.max(i,8)*Math.max(e,8)/2;case cc:case lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case mc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case vc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ac:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case bc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Mo:case Ec:case Tc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Tf:case wc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pM(i){switch(i){case ii:case vf:return{byteLength:1,components:1};case Ss:case xf:case ws:return{byteLength:2,components:1};case $c:case Kc:return{byteLength:2,components:4};case Xi:case Yc:case En:return{byteLength:4,components:1};case Mf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function mM(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ae,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,b){return d?new OffscreenCanvas(I,b):Es("canvas")}function v(I,b,V){let J=1;const te=Re(I);if((te.width>V||te.height>V)&&(J=V/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Z=Math.floor(J*te.width),be=Math.floor(J*te.height);h===void 0&&(h=_(Z,be));const fe=b?_(Z,be):h;return fe.width=Z,fe.height=be,fe.getContext("2d").drawImage(I,0,0,Z,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Z+"x"+be+")."),fe}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(I,b,V,J,te=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Z=b;if(b===i.RED&&(V===i.FLOAT&&(Z=i.R32F),V===i.HALF_FLOAT&&(Z=i.R16F),V===i.UNSIGNED_BYTE&&(Z=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.R8UI),V===i.UNSIGNED_SHORT&&(Z=i.R16UI),V===i.UNSIGNED_INT&&(Z=i.R32UI),V===i.BYTE&&(Z=i.R8I),V===i.SHORT&&(Z=i.R16I),V===i.INT&&(Z=i.R32I)),b===i.RG&&(V===i.FLOAT&&(Z=i.RG32F),V===i.HALF_FLOAT&&(Z=i.RG16F),V===i.UNSIGNED_BYTE&&(Z=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RG8UI),V===i.UNSIGNED_SHORT&&(Z=i.RG16UI),V===i.UNSIGNED_INT&&(Z=i.RG32UI),V===i.BYTE&&(Z=i.RG8I),V===i.SHORT&&(Z=i.RG16I),V===i.INT&&(Z=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),V===i.UNSIGNED_INT&&(Z=i.RGB32UI),V===i.BYTE&&(Z=i.RGB8I),V===i.SHORT&&(Z=i.RGB16I),V===i.INT&&(Z=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),V===i.UNSIGNED_INT&&(Z=i.RGBA32UI),V===i.BYTE&&(Z=i.RGBA8I),V===i.SHORT&&(Z=i.RGBA16I),V===i.INT&&(Z=i.RGBA32I)),b===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),b===i.RGBA){const be=te?Fo:je.getTransfer(J);V===i.FLOAT&&(Z=i.RGBA32F),V===i.HALF_FLOAT&&(Z=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Z=be===ct?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function g(I,b){let V;return I?b===null||b===Xi||b===Ir?V=i.DEPTH24_STENCIL8:b===En?V=i.DEPTH32F_STENCIL8:b===Ss&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Xi||b===Ir?V=i.DEPTH_COMPONENT24:b===En?V=i.DEPTH_COMPONENT32F:b===Ss&&(V=i.DEPTH_COMPONENT16),V}function E(I,b){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==It&&I.minFilter!==on?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function A(I){const b=I.target;b.removeEventListener("dispose",A),C(b),b.isVideoTexture&&u.delete(b)}function w(I){const b=I.target;b.removeEventListener("dispose",w),y(b)}function C(I){const b=n.get(I);if(b.__webglInit===void 0)return;const V=I.source,J=f.get(V);if(J){const te=J[b.__cacheKey];te.usedTimes--,te.usedTimes===0&&S(I),Object.keys(J).length===0&&f.delete(V)}n.remove(I)}function S(I){const b=n.get(I);i.deleteTexture(b.__webglTexture);const V=I.source,J=f.get(V);delete J[b.__cacheKey],o.memory.textures--}function y(I){const b=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let te=0;te<b.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(b.__webglFramebuffer[J][te]);else i.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)i.deleteFramebuffer(b.__webglFramebuffer[J]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=I.textures;for(let J=0,te=V.length;J<te;J++){const Z=n.get(V[J]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(V[J])}n.remove(I)}let N=0;function k(){N=0}function L(){const I=N;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),N+=1,I}function D(I){const b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function q(I,b){const V=n.get(I);if(I.isVideoTexture&&Pe(I),I.isRenderTargetTexture===!1&&I.version>0&&V.__version!==I.version){const J=I.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(V,I,b);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function j(I,b){const V=n.get(I);if(I.version>0&&V.__version!==I.version){H(V,I,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function ie(I,b){const V=n.get(I);if(I.version>0&&V.__version!==I.version){H(V,I,b);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function R(I,b){const V=n.get(I);if(I.version>0&&V.__version!==I.version){Y(V,I,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}const X={[Ei]:i.REPEAT,[_i]:i.CLAMP_TO_EDGE,[Po]:i.MIRRORED_REPEAT},K={[It]:i.NEAREST,[_f]:i.NEAREST_MIPMAP_NEAREST,[rs]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[mo]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},ee={[Xm]:i.NEVER,[Zm]:i.ALWAYS,[jm]:i.LESS,[If]:i.LEQUAL,[qm]:i.EQUAL,[Km]:i.GEQUAL,[Ym]:i.GREATER,[$m]:i.NOTEQUAL};function ne(I,b){if(b.type===En&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===on||b.magFilter===mo||b.magFilter===rs||b.magFilter===Jn||b.minFilter===on||b.minFilter===mo||b.minFilter===rs||b.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,X[b.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,X[b.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,X[b.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,K[b.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,K[b.minFilter]),b.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ee[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===It||b.minFilter!==rs&&b.minFilter!==Jn||b.type===En&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Te(I,b){let V=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",A));const J=b.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const Z=D(b);if(Z!==I.__cacheKey){te[Z]===void 0&&(te[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),te[Z].usedTimes++;const be=te[I.__cacheKey];be!==void 0&&(te[I.__cacheKey].usedTimes--,be.usedTimes===0&&S(b)),I.__cacheKey=Z,I.__webglTexture=te[Z].texture}return V}function H(I,b,V){let J=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=i.TEXTURE_3D);const te=Te(I,b),Z=b.source;t.bindTexture(J,I.__webglTexture,i.TEXTURE0+V);const be=n.get(Z);if(Z.version!==be.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const fe=je.getPrimaries(je.workingColorSpace),ge=b.colorSpace===mi?null:je.getPrimaries(b.colorSpace),Ke=b.colorSpace===mi||fe===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let re=v(b.image,!1,r.maxTextureSize);re=pt(b,re);const ve=s.convert(b.format,b.colorSpace),Le=s.convert(b.type);let Ne=M(b.internalFormat,ve,Le,b.colorSpace,b.isVideoTexture);ne(J,b);let xe;const $e=b.mipmaps,He=b.isVideoTexture!==!0,ut=be.__version===void 0||te===!0,U=Z.dataReady,he=E(b,re);if(b.isDepthTexture)Ne=g(b.format===Pr,b.type),ut&&(He?t.texStorage2D(i.TEXTURE_2D,1,Ne,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Ne,re.width,re.height,0,ve,Le,null));else if(b.isDataTexture)if($e.length>0){He&&ut&&t.texStorage2D(i.TEXTURE_2D,he,Ne,$e[0].width,$e[0].height);for(let $=0,Q=$e.length;$<Q;$++)xe=$e[$],He?U&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,xe.width,xe.height,ve,Le,xe.data):t.texImage2D(i.TEXTURE_2D,$,Ne,xe.width,xe.height,0,ve,Le,xe.data);b.generateMipmaps=!1}else He?(ut&&t.texStorage2D(i.TEXTURE_2D,he,Ne,re.width,re.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,ve,Le,re.data)):t.texImage2D(i.TEXTURE_2D,0,Ne,re.width,re.height,0,ve,Le,re.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){He&&ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ne,$e[0].width,$e[0].height,re.depth);for(let $=0,Q=$e.length;$<Q;$++)if(xe=$e[$],b.format!==mn)if(ve!==null)if(He){if(U)if(b.layerUpdates.size>0){const me=Bu(xe.width,xe.height,b.format,b.type);for(const de of b.layerUpdates){const Fe=xe.data.subarray(de*me/xe.data.BYTES_PER_ELEMENT,(de+1)*me/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,de,xe.width,xe.height,1,ve,Fe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,xe.width,xe.height,re.depth,ve,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,Ne,xe.width,xe.height,re.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,xe.width,xe.height,re.depth,ve,Le,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,Ne,xe.width,xe.height,re.depth,0,ve,Le,xe.data)}else{He&&ut&&t.texStorage2D(i.TEXTURE_2D,he,Ne,$e[0].width,$e[0].height);for(let $=0,Q=$e.length;$<Q;$++)xe=$e[$],b.format!==mn?ve!==null?He?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,$,Ne,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?U&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,xe.width,xe.height,ve,Le,xe.data):t.texImage2D(i.TEXTURE_2D,$,Ne,xe.width,xe.height,0,ve,Le,xe.data)}else if(b.isDataArrayTexture)if(He){if(ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,he,Ne,re.width,re.height,re.depth),U)if(b.layerUpdates.size>0){const $=Bu(re.width,re.height,b.format,b.type);for(const Q of b.layerUpdates){const me=re.data.subarray(Q*$/re.data.BYTES_PER_ELEMENT,(Q+1)*$/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,re.width,re.height,1,ve,Le,me)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ve,Le,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,re.width,re.height,re.depth,0,ve,Le,re.data);else if(b.isData3DTexture)He?(ut&&t.texStorage3D(i.TEXTURE_3D,he,Ne,re.width,re.height,re.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ve,Le,re.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,re.width,re.height,re.depth,0,ve,Le,re.data);else if(b.isFramebufferTexture){if(ut)if(He)t.texStorage2D(i.TEXTURE_2D,he,Ne,re.width,re.height);else{let $=re.width,Q=re.height;for(let me=0;me<he;me++)t.texImage2D(i.TEXTURE_2D,me,Ne,$,Q,0,ve,Le,null),$>>=1,Q>>=1}}else if($e.length>0){if(He&&ut){const $=Re($e[0]);t.texStorage2D(i.TEXTURE_2D,he,Ne,$.width,$.height)}for(let $=0,Q=$e.length;$<Q;$++)xe=$e[$],He?U&&t.texSubImage2D(i.TEXTURE_2D,$,0,0,ve,Le,xe):t.texImage2D(i.TEXTURE_2D,$,Ne,ve,Le,xe);b.generateMipmaps=!1}else if(He){if(ut){const $=Re(re);t.texStorage2D(i.TEXTURE_2D,he,Ne,$.width,$.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Le,re)}else t.texImage2D(i.TEXTURE_2D,0,Ne,ve,Le,re);m(b)&&p(J),be.__version=Z.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function Y(I,b,V){if(b.image.length!==6)return;const J=Te(I,b),te=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+V);const Z=n.get(te);if(te.version!==Z.__version||J===!0){t.activeTexture(i.TEXTURE0+V);const be=je.getPrimaries(je.workingColorSpace),fe=b.colorSpace===mi?null:je.getPrimaries(b.colorSpace),ge=b.colorSpace===mi||be===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ke=b.isCompressedTexture||b.image[0].isCompressedTexture,re=b.image[0]&&b.image[0].isDataTexture,ve=[];for(let Q=0;Q<6;Q++)!Ke&&!re?ve[Q]=v(b.image[Q],!0,r.maxCubemapSize):ve[Q]=re?b.image[Q].image:b.image[Q],ve[Q]=pt(b,ve[Q]);const Le=ve[0],Ne=s.convert(b.format,b.colorSpace),xe=s.convert(b.type),$e=M(b.internalFormat,Ne,xe,b.colorSpace),He=b.isVideoTexture!==!0,ut=Z.__version===void 0||J===!0,U=te.dataReady;let he=E(b,Le);ne(i.TEXTURE_CUBE_MAP,b);let $;if(Ke){He&&ut&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,$e,Le.width,Le.height);for(let Q=0;Q<6;Q++){$=ve[Q].mipmaps;for(let me=0;me<$.length;me++){const de=$[me];b.format!==mn?Ne!==null?He?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,de.width,de.height,Ne,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,$e,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,0,0,de.width,de.height,Ne,xe,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me,$e,de.width,de.height,0,Ne,xe,de.data)}}}else{if($=b.mipmaps,He&&ut){$.length>0&&he++;const Q=Re(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,$e,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(re){He?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ve[Q].width,ve[Q].height,Ne,xe,ve[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,$e,ve[Q].width,ve[Q].height,0,Ne,xe,ve[Q].data);for(let me=0;me<$.length;me++){const Fe=$[me].image[Q].image;He?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,Fe.width,Fe.height,Ne,xe,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,$e,Fe.width,Fe.height,0,Ne,xe,Fe.data)}}else{He?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ne,xe,ve[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,$e,Ne,xe,ve[Q]);for(let me=0;me<$.length;me++){const de=$[me];He?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,0,0,Ne,xe,de.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,me+1,$e,Ne,xe,de.image[Q])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),Z.__version=te.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function ue(I,b,V,J,te,Z){const be=s.convert(V.format,V.colorSpace),fe=s.convert(V.type),ge=M(V.internalFormat,be,fe,V.colorSpace),Ke=n.get(b),re=n.get(V);if(re.__renderTarget=b,!Ke.__hasExternalTextures){const ve=Math.max(1,b.width>>Z),Le=Math.max(1,b.height>>Z);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,ge,ve,Le,b.depth,0,be,fe,null):t.texImage2D(te,Z,ge,ve,Le,0,be,fe,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,re.__webglTexture,0,qe(b)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,re.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(I,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,I),b.depthBuffer){const J=b.depthTexture,te=J&&J.isDepthTexture?J.type:null,Z=g(b.stencilBuffer,te),be=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=qe(b);Ye(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe,Z,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,Z,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Z,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,I)}else{const J=b.textures;for(let te=0;te<J.length;te++){const Z=J[te],be=s.convert(Z.format,Z.colorSpace),fe=s.convert(Z.type),ge=M(Z.internalFormat,be,fe,Z.colorSpace),Ke=qe(b);V&&Ye(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ke,ge,b.width,b.height):Ye(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ke,ge,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ge,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(b.depthTexture);J.__renderTarget=b,(!J.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q(b.depthTexture,0);const te=J.__webglTexture,Z=qe(b);if(b.depthTexture.format===yr)Ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(b.depthTexture.format===Pr)Ye(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Oe(I){const b=n.get(I),V=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){const J=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){const te=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),b.__depthDisposeCallback=te}b.__boundDepthTexture=J}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Ie(b.__webglFramebuffer,I)}else if(V){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=i.createRenderbuffer(),ce(b.__webglDepthbuffer[J],I,!1);else{const te=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ce(b.__webglDepthbuffer,I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(I,b,V){const J=n.get(I);b!==void 0&&ue(J.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Oe(I)}function dt(I){const b=I.texture,V=n.get(I),J=n.get(b);I.addEventListener("dispose",w);const te=I.textures,Z=I.isWebGLCubeRenderTarget===!0,be=te.length>1;if(be||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=b.version,o.memory.textures++),Z){V.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[fe]=[];for(let ge=0;ge<b.mipmaps.length;ge++)V.__webglFramebuffer[fe][ge]=i.createFramebuffer()}else V.__webglFramebuffer[fe]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let fe=0;fe<b.mipmaps.length;fe++)V.__webglFramebuffer[fe]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(be)for(let fe=0,ge=te.length;fe<ge;fe++){const Ke=n.get(te[fe]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Ye(I)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let fe=0;fe<te.length;fe++){const ge=te[fe];V.__webglColorRenderbuffer[fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[fe]);const Ke=s.convert(ge.format,ge.colorSpace),re=s.convert(ge.type),ve=M(ge.internalFormat,Ke,re,ge.colorSpace,I.isXRRenderTarget===!0),Le=qe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,ve,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,V.__webglColorRenderbuffer[fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(V.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),ne(i.TEXTURE_CUBE_MAP,b);for(let fe=0;fe<6;fe++)if(b.mipmaps&&b.mipmaps.length>0)for(let ge=0;ge<b.mipmaps.length;ge++)ue(V.__webglFramebuffer[fe][ge],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ge);else ue(V.__webglFramebuffer[fe],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(b)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let fe=0,ge=te.length;fe<ge;fe++){const Ke=te[fe],re=n.get(Ke);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),ne(i.TEXTURE_2D,Ke),ue(V.__webglFramebuffer,I,Ke,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,0),m(Ke)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let fe=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(fe=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,J.__webglTexture),ne(fe,b),b.mipmaps&&b.mipmaps.length>0)for(let ge=0;ge<b.mipmaps.length;ge++)ue(V.__webglFramebuffer[ge],I,b,i.COLOR_ATTACHMENT0,fe,ge);else ue(V.__webglFramebuffer,I,b,i.COLOR_ATTACHMENT0,fe,0);m(b)&&p(fe),t.unbindTexture()}I.depthBuffer&&Oe(I)}function Xe(I){const b=I.textures;for(let V=0,J=b.length;V<J;V++){const te=b[V];if(m(te)){const Z=x(I),be=n.get(te).__webglTexture;t.bindTexture(Z,be),p(Z),t.unbindTexture()}}}const vt=[],F=[];function jt(I){if(I.samples>0){if(Ye(I)===!1){const b=I.textures,V=I.width,J=I.height;let te=i.COLOR_BUFFER_BIT;const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(I),fe=b.length>1;if(fe)for(let ge=0;ge<b.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ge=0;ge<b.length;ge++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),fe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);const Ke=n.get(b[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ke,0)}i.blitFramebuffer(0,0,V,J,0,0,V,J,te,i.NEAREST),c===!0&&(vt.length=0,F.length=0,vt.push(i.COLOR_ATTACHMENT0+ge),I.depthBuffer&&I.resolveDepthBuffer===!1&&(vt.push(Z),F.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),fe)for(let ge=0;ge<b.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,be.__webglColorRenderbuffer[ge]);const Ke=n.get(b[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,Ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const b=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function qe(I){return Math.min(r.maxSamples,I.samples)}function Ye(I){const b=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Pe(I){const b=o.render.frame;u.get(I)!==b&&(u.set(I,b),I.update())}function pt(I,b){const V=I.colorSpace,J=I.format,te=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||V!==Jt&&V!==mi&&(je.getTransfer(V)===ct?(J!==mn||te!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function Re(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=k,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=ie,this.setTextureCube=R,this.rebindTextures=ze,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ye}function gM(i,e){function t(n,r=mi){let s;const o=je.getTransfer(r);if(n===ii)return i.UNSIGNED_BYTE;if(n===$c)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vf)return i.BYTE;if(n===xf)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===Yc)return i.INT;if(n===Xi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ws)return i.HALF_FLOAT;if(n===yf)return i.ALPHA;if(n===Sf)return i.RGB;if(n===mn)return i.RGBA;if(n===Af)return i.LUMINANCE;if(n===bf)return i.LUMINANCE_ALPHA;if(n===yr)return i.DEPTH_COMPONENT;if(n===Pr)return i.DEPTH_STENCIL;if(n===Zc)return i.RED;if(n===Jc)return i.RED_INTEGER;if(n===Ef)return i.RG;if(n===Qc)return i.RG_INTEGER;if(n===el)return i.RGBA_INTEGER;if(n===go||n===_o||n===vo||n===xo)if(o===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===go)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_o)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===go)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_o)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rc||n===sc||n===oc||n===ac)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===rc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===oc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ac)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cc||n===lc||n===uc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===cc||n===lc)return o===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===uc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hc||n===fc||n===dc||n===pc||n===mc||n===gc||n===_c||n===vc||n===xc||n===Mc||n===yc||n===Sc||n===Ac||n===bc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===hc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===fc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_c)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Mc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ac)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===bc)return o===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Mo||n===Ec||n===Tc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Mo)return o===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ec)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Tc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tf||n===wc||n===Rc||n===Cc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Mo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Rc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class _M extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class St extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vM={type:"move"};class Ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const xM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MM=`
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

}`;class yM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Pt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ti({vertexShader:xM,fragmentShader:MM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Me(new rn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class SM extends qi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,_=null;const v=new yM,m=t.getContextAttributes();let p=null,x=null;const M=[],g=[],E=new ae;let A=null;const w=new Xt;w.viewport=new tt;const C=new Xt;C.viewport=new tt;const S=[w,C],y=new _M;let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let Y=M[H];return Y===void 0&&(Y=new Ta,M[H]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(H){let Y=M[H];return Y===void 0&&(Y=new Ta,M[H]=Y),Y.getGripSpace()},this.getHand=function(H){let Y=M[H];return Y===void 0&&(Y=new Ta,M[H]=Y),Y.getHandSpace()};function L(H){const Y=g.indexOf(H.inputSource);if(Y===-1)return;const ue=M[Y];ue!==void 0&&(ue.update(H.inputSource,H.frame,l||o),ue.dispatchEvent({type:H.type,data:H.inputSource}))}function D(){r.removeEventListener("select",L),r.removeEventListener("selectstart",L),r.removeEventListener("selectend",L),r.removeEventListener("squeeze",L),r.removeEventListener("squeezestart",L),r.removeEventListener("squeezeend",L),r.removeEventListener("end",D),r.removeEventListener("inputsourceschange",q);for(let H=0;H<M.length;H++){const Y=g[H];Y!==null&&(g[H]=null,M[H].disconnect(Y))}N=null,k=null,v.reset(),e.setRenderTarget(p),d=null,f=null,h=null,r=null,x=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",L),r.addEventListener("selectstart",L),r.addEventListener("selectend",L),r.addEventListener("squeeze",L),r.addEventListener("squeezestart",L),r.addEventListener("squeezeend",L),r.addEventListener("end",D),r.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,Y),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ji(d.framebufferWidth,d.framebufferHeight,{format:mn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,ue=null,ce=null;m.depth&&(ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=m.stencil?Pr:yr,ue=m.stencil?Ir:Xi);const Ie={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(Ie),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new ji(f.textureWidth,f.textureHeight,{format:mn,type:ii,depthTexture:new Hf(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Te.setContext(r),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q(H){for(let Y=0;Y<H.removed.length;Y++){const ue=H.removed[Y],ce=g.indexOf(ue);ce>=0&&(g[ce]=null,M[ce].disconnect(ue))}for(let Y=0;Y<H.added.length;Y++){const ue=H.added[Y];let ce=g.indexOf(ue);if(ce===-1){for(let Oe=0;Oe<M.length;Oe++)if(Oe>=g.length){g.push(ue),ce=Oe;break}else if(g[Oe]===null){g[Oe]=ue,ce=Oe;break}if(ce===-1)break}const Ie=M[ce];Ie&&Ie.connect(ue)}}const j=new P,ie=new P;function R(H,Y,ue){j.setFromMatrixPosition(Y.matrixWorld),ie.setFromMatrixPosition(ue.matrixWorld);const ce=j.distanceTo(ie),Ie=Y.projectionMatrix.elements,Oe=ue.projectionMatrix.elements,ze=Ie[14]/(Ie[10]-1),dt=Ie[14]/(Ie[10]+1),Xe=(Ie[9]+1)/Ie[5],vt=(Ie[9]-1)/Ie[5],F=(Ie[8]-1)/Ie[0],jt=(Oe[8]+1)/Oe[0],qe=ze*F,Ye=ze*jt,Pe=ce/(-F+jt),pt=Pe*-F;if(Y.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(pt),H.translateZ(Pe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Ie[10]===-1)H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Re=ze+Pe,I=dt+Pe,b=qe-pt,V=Ye+(ce-pt),J=Xe*dt/I*Re,te=vt*dt/I*Re;H.projectionMatrix.makePerspective(b,V,J,te,Re,I),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function X(H,Y){Y===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(Y.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let Y=H.near,ue=H.far;v.texture!==null&&(v.depthNear>0&&(Y=v.depthNear),v.depthFar>0&&(ue=v.depthFar)),y.near=C.near=w.near=Y,y.far=C.far=w.far=ue,(N!==y.near||k!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),N=y.near,k=y.far),w.layers.mask=H.layers.mask|2,C.layers.mask=H.layers.mask|4,y.layers.mask=w.layers.mask|C.layers.mask;const ce=H.parent,Ie=y.cameras;X(y,ce);for(let Oe=0;Oe<Ie.length;Oe++)X(Ie[Oe],ce);Ie.length===2?R(y,w,C):y.projectionMatrix.copy(w.projectionMatrix),K(H,y,ce)};function K(H,Y,ue){ue===null?H.matrix.copy(Y.matrixWorld):(H.matrix.copy(ue.matrixWorld),H.matrix.invert(),H.matrix.multiply(Y.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Lr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(H){c=H,f!==null&&(f.fixedFoveation=H),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=H)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let ee=null;function ne(H,Y){if(u=Y.getViewerPose(l||o),_=Y,u!==null){const ue=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let ce=!1;ue.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let Oe=0;Oe<ue.length;Oe++){const ze=ue[Oe];let dt=null;if(d!==null)dt=d.getViewport(ze);else{const vt=h.getViewSubImage(f,ze);dt=vt.viewport,Oe===0&&(e.setRenderTargetTextures(x,vt.colorTexture,f.ignoreDepthValues?void 0:vt.depthStencilTexture),e.setRenderTarget(x))}let Xe=S[Oe];Xe===void 0&&(Xe=new Xt,Xe.layers.enable(Oe),Xe.viewport=new tt,S[Oe]=Xe),Xe.matrix.fromArray(ze.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(ze.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(dt.x,dt.y,dt.width,dt.height),Oe===0&&(y.matrix.copy(Xe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push(Xe)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){const Oe=h.getDepthInformation(ue[0]);Oe&&Oe.isValid&&Oe.texture&&v.init(e,Oe,r.renderState)}}for(let ue=0;ue<M.length;ue++){const ce=g[ue],Ie=M[ue];ce!==null&&Ie!==void 0&&Ie.update(ce,Y,l||o)}ee&&ee(H,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),_=null}const Te=new Vf;Te.setAnimationLoop(ne),this.setAnimationLoop=function(H){ee=H},this.dispose=function(){}}}const Ni=new Dn,AM=new Ue;function bM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ff(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,M,g){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,g)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,g=x.envMapRotation;M&&(m.envMap.value=M,Ni.copy(g),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),m.envMapRotation.value.setFromMatrix4(AM.makeRotationFromEuler(Ni)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function EM(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const g=M.program;n.uniformBlockBinding(x,g)}function l(x,M){let g=r[x.id];g===void 0&&(_(x),g=u(x),r[x.id]=g,x.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(x,E);const A=e.render.frame;s[x.id]!==A&&(f(x),s[x.id]=A)}function u(x){const M=h();x.__bindingPointIndex=M;const g=i.createBuffer(),E=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,g),i.bufferData(i.UNIFORM_BUFFER,E,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,g),g}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=r[x.id],g=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,w=g.length;A<w;A++){const C=Array.isArray(g[A])?g[A]:[g[A]];for(let S=0,y=C.length;S<y;S++){const N=C[S];if(d(N,A,S,E)===!0){const k=N.__offset,L=Array.isArray(N.value)?N.value:[N.value];let D=0;for(let q=0;q<L.length;q++){const j=L[q],ie=v(j);typeof j=="number"||typeof j=="boolean"?(N.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,k+D,N.__data)):j.isMatrix3?(N.__data[0]=j.elements[0],N.__data[1]=j.elements[1],N.__data[2]=j.elements[2],N.__data[3]=0,N.__data[4]=j.elements[3],N.__data[5]=j.elements[4],N.__data[6]=j.elements[5],N.__data[7]=0,N.__data[8]=j.elements[6],N.__data[9]=j.elements[7],N.__data[10]=j.elements[8],N.__data[11]=0):(j.toArray(N.__data,D),D+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,M,g,E){const A=x.value,w=M+"_"+g;if(E[w]===void 0)return typeof A=="number"||typeof A=="boolean"?E[w]=A:E[w]=A.clone(),!0;{const C=E[w];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return E[w]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function _(x){const M=x.uniforms;let g=0;const E=16;for(let w=0,C=M.length;w<C;w++){const S=Array.isArray(M[w])?M[w]:[M[w]];for(let y=0,N=S.length;y<N;y++){const k=S[y],L=Array.isArray(k.value)?k.value:[k.value];for(let D=0,q=L.length;D<q;D++){const j=L[D],ie=v(j),R=g%E,X=R%ie.boundary,K=R+X;g+=X,K!==0&&E-K<ie.storage&&(g+=E-K),k.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=g,g+=ie.storage}}}const A=g%E;return A>0&&(g+=E-A),x.__size=g,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const g=o.indexOf(M.__bindingPointIndex);o.splice(g,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class TM{constructor(e={}){const{canvas:t=p0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this.toneMapping=Mi,this.toneMappingExposure=1;const g=this;let E=!1,A=0,w=0,C=null,S=-1,y=null;const N=new tt,k=new tt;let L=null;const D=new we(0);let q=0,j=t.width,ie=t.height,R=1,X=null,K=null;const ee=new tt(0,0,j,ie),ne=new tt(0,0,j,ie);let Te=!1;const H=new il;let Y=!1,ue=!1;const ce=new Ue,Ie=new Ue,Oe=new P,ze=new tt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function vt(){return C===null?R:1}let F=n;function jt(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qc}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",de,!1),F===null){const z="webgl2";if(F=jt(z,T),F===null)throw jt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let qe,Ye,Pe,pt,Re,I,b,V,J,te,Z,be,fe,ge,Ke,re,ve,Le,Ne,xe,$e,He,ut,U;function he(){qe=new Pv(F),qe.init(),He=new gM(F,qe),Ye=new Ev(F,qe,e,He),Pe=new dM(F,qe),Ye.reverseDepthBuffer&&f&&Pe.buffers.depth.setReversed(!0),pt=new Ov(F),Re=new Jx,I=new mM(F,qe,Pe,Re,Ye,He,pt),b=new wv(g),V=new Iv(g),J=new V0(F),ut=new Av(F,J),te=new Lv(F,J,pt,ut),Z=new Uv(F,te,J,pt),Ne=new Dv(F,Ye,I),re=new Tv(Re),be=new Zx(g,b,V,qe,Ye,ut,re),fe=new bM(g,Re),ge=new eM,Ke=new oM(qe),Le=new Sv(g,b,V,Pe,Z,d,c),ve=new hM(g,Z,Ye),U=new EM(F,pt,Ye,Pe),xe=new bv(F,qe,pt),$e=new Nv(F,qe,pt),pt.programs=be.programs,g.capabilities=Ye,g.extensions=qe,g.properties=Re,g.renderLists=ge,g.shadowMap=ve,g.state=Pe,g.info=pt}he();const $=new SM(g,F);this.xr=$,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=qe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=qe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(T){T!==void 0&&(R=T,this.setSize(j,ie,!1))},this.getSize=function(T){return T.set(j,ie)},this.setSize=function(T,z,G=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=T,ie=z,t.width=Math.floor(T*R),t.height=Math.floor(z*R),G===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(j*R,ie*R).floor()},this.setDrawingBufferSize=function(T,z,G){j=T,ie=z,R=G,t.width=Math.floor(T*G),t.height=Math.floor(z*G),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(N)},this.getViewport=function(T){return T.copy(ee)},this.setViewport=function(T,z,G,W){T.isVector4?ee.set(T.x,T.y,T.z,T.w):ee.set(T,z,G,W),Pe.viewport(N.copy(ee).multiplyScalar(R).round())},this.getScissor=function(T){return T.copy(ne)},this.setScissor=function(T,z,G,W){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,z,G,W),Pe.scissor(k.copy(ne).multiplyScalar(R).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(T){Pe.setScissorTest(Te=T)},this.setOpaqueSort=function(T){X=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(T=!0,z=!0,G=!0){let W=0;if(T){let B=!1;if(C!==null){const oe=C.texture.format;B=oe===el||oe===Qc||oe===Jc}if(B){const oe=C.texture.type,pe=oe===ii||oe===Xi||oe===Ss||oe===Ir||oe===$c||oe===Kc,ye=Le.getClearColor(),Se=Le.getClearAlpha(),De=ye.r,Be=ye.g,Ae=ye.b;pe?(_[0]=De,_[1]=Be,_[2]=Ae,_[3]=Se,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=De,v[1]=Be,v[2]=Ae,v[3]=Se,F.clearBufferiv(F.COLOR,0,v))}else W|=F.COLOR_BUFFER_BIT}z&&(W|=F.DEPTH_BUFFER_BIT),G&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",de,!1),ge.dispose(),Ke.dispose(),Re.dispose(),b.dispose(),V.dispose(),Z.dispose(),ut.dispose(),U.dispose(),be.dispose(),$.dispose(),$.removeEventListener("sessionstart",Sl),$.removeEventListener("sessionend",Al),wi.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=pt.autoReset,z=ve.enabled,G=ve.autoUpdate,W=ve.needsUpdate,B=ve.type;he(),pt.autoReset=T,ve.enabled=z,ve.autoUpdate=G,ve.needsUpdate=W,ve.type=B}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Fe(T){const z=T.target;z.removeEventListener("dispose",Fe),Mt(z)}function Mt(T){Ft(T),Re.remove(T)}function Ft(T){const z=Re.get(T).programs;z!==void 0&&(z.forEach(function(G){be.releaseProgram(G)}),T.isShaderMaterial&&be.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,G,W,B,oe){z===null&&(z=dt);const pe=B.isMesh&&B.matrixWorld.determinant()<0,ye=wd(T,z,G,W,B);Pe.setMaterial(W,pe);let Se=G.index,De=1;if(W.wireframe===!0){if(Se=te.getWireframeAttribute(G),Se===void 0)return;De=2}const Be=G.drawRange,Ae=G.attributes.position;let Je=Be.start*De,ht=(Be.start+Be.count)*De;oe!==null&&(Je=Math.max(Je,oe.start*De),ht=Math.min(ht,(oe.start+oe.count)*De)),Se!==null?(Je=Math.max(Je,0),ht=Math.min(ht,Se.count)):Ae!=null&&(Je=Math.max(Je,0),ht=Math.min(ht,Ae.count));const mt=ht-Je;if(mt<0||mt===1/0)return;ut.setup(B,W,ye,G,Se);let Qt,nt=xe;if(Se!==null&&(Qt=J.get(Se),nt=$e,nt.setIndex(Qt)),B.isMesh)W.wireframe===!0?(Pe.setLineWidth(W.wireframeLinewidth*vt()),nt.setMode(F.LINES)):nt.setMode(F.TRIANGLES);else if(B.isLine){let Ee=W.linewidth;Ee===void 0&&(Ee=1),Pe.setLineWidth(Ee*vt()),B.isLineSegments?nt.setMode(F.LINES):B.isLineLoop?nt.setMode(F.LINE_LOOP):nt.setMode(F.LINE_STRIP)}else B.isPoints?nt.setMode(F.POINTS):B.isSprite&&nt.setMode(F.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)nt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(qe.get("WEBGL_multi_draw"))nt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ee=B._multiDrawStarts,Vn=B._multiDrawCounts,it=B._multiDrawCount,_n=Se?J.get(Se).bytesPerElement:1,Yi=Re.get(W).currentProgram.getUniforms();for(let en=0;en<it;en++)Yi.setValue(F,"_gl_DrawID",en),nt.render(Ee[en]/_n,Vn[en])}else if(B.isInstancedMesh)nt.renderInstances(Je,mt,B.count);else if(G.isInstancedBufferGeometry){const Ee=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Vn=Math.min(G.instanceCount,Ee);nt.renderInstances(Je,mt,Vn)}else nt.render(Je,mt)};function st(T,z,G){T.transparent===!0&&T.side===dn&&T.forceSinglePass===!1?(T.side=Kt,T.needsUpdate=!0,Ls(T,z,G),T.side=ni,T.needsUpdate=!0,Ls(T,z,G),T.side=dn):Ls(T,z,G)}this.compile=function(T,z,G=null){G===null&&(G=T),p=Ke.get(G),p.init(z),M.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),T!==G&&T.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const W=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const oe=B.material;if(oe)if(Array.isArray(oe))for(let pe=0;pe<oe.length;pe++){const ye=oe[pe];st(ye,G,B),W.add(ye)}else st(oe,G,B),W.add(oe)}),M.pop(),p=null,W},this.compileAsync=function(T,z,G=null){const W=this.compile(T,z,G);return new Promise(B=>{function oe(){if(W.forEach(function(pe){Re.get(pe).currentProgram.isReady()&&W.delete(pe)}),W.size===0){B(T);return}setTimeout(oe,10)}qe.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let gn=null;function kn(T){gn&&gn(T)}function Sl(){wi.stop()}function Al(){wi.start()}const wi=new Vf;wi.setAnimationLoop(kn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(T){gn=T,$.setAnimationLoop(T),T===null?wi.stop():wi.start()},$.addEventListener("sessionstart",Sl),$.addEventListener("sessionend",Al),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(z),z=$.getCamera()),T.isScene===!0&&T.onBeforeRender(g,T,z,C),p=Ke.get(T,M.length),p.init(z),M.push(p),Ie.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),H.setFromProjectionMatrix(Ie),ue=this.localClippingEnabled,Y=re.init(this.clippingPlanes,ue),m=ge.get(T,x.length),m.init(),x.push(m),$.enabled===!0&&$.isPresenting===!0){const oe=g.xr.getDepthSensingMesh();oe!==null&&Ko(oe,z,-1/0,g.sortObjects)}Ko(T,z,0,g.sortObjects),m.finish(),g.sortObjects===!0&&m.sort(X,K),Xe=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Xe&&Le.addToRenderList(m,T),this.info.render.frame++,Y===!0&&re.beginShadows();const G=p.state.shadowsArray;ve.render(G,T,z),Y===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,B=m.transmissive;if(p.setupLights(),z.isArrayCamera){const oe=z.cameras;if(B.length>0)for(let pe=0,ye=oe.length;pe<ye;pe++){const Se=oe[pe];El(W,B,T,Se)}Xe&&Le.render(T);for(let pe=0,ye=oe.length;pe<ye;pe++){const Se=oe[pe];bl(m,T,Se,Se.viewport)}}else B.length>0&&El(W,B,T,z),Xe&&Le.render(T),bl(m,T,z);C!==null&&(I.updateMultisampleRenderTarget(C),I.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(g,T,z),ut.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],Y===!0&&re.setGlobalState(g.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Ko(T,z,G,W){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||H.intersectsSprite(T)){W&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ie);const pe=Z.update(T),ye=T.material;ye.visible&&m.push(T,pe,ye,G,ze.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||H.intersectsObject(T))){const pe=Z.update(T),ye=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),ze.copy(pe.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(Ie)),Array.isArray(ye)){const Se=pe.groups;for(let De=0,Be=Se.length;De<Be;De++){const Ae=Se[De],Je=ye[Ae.materialIndex];Je&&Je.visible&&m.push(T,pe,Je,G,ze.z,Ae)}}else ye.visible&&m.push(T,pe,ye,G,ze.z,null)}}const oe=T.children;for(let pe=0,ye=oe.length;pe<ye;pe++)Ko(oe[pe],z,G,W)}function bl(T,z,G,W){const B=T.opaque,oe=T.transmissive,pe=T.transparent;p.setupLightsView(G),Y===!0&&re.setGlobalState(g.clippingPlanes,G),W&&Pe.viewport(N.copy(W)),B.length>0&&Ps(B,z,G),oe.length>0&&Ps(oe,z,G),pe.length>0&&Ps(pe,z,G),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function El(T,z,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new ji(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")||qe.has("EXT_color_buffer_float")?ws:ii,minFilter:Jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const oe=p.state.transmissionRenderTarget[W.id],pe=W.viewport||N;oe.setSize(pe.z,pe.w);const ye=g.getRenderTarget();g.setRenderTarget(oe),g.getClearColor(D),q=g.getClearAlpha(),q<1&&g.setClearColor(16777215,.5),g.clear(),Xe&&Le.render(G);const Se=g.toneMapping;g.toneMapping=Mi;const De=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Y===!0&&re.setGlobalState(g.clippingPlanes,W),Ps(T,G,W),I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe),qe.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let Ae=0,Je=z.length;Ae<Je;Ae++){const ht=z[Ae],mt=ht.object,Qt=ht.geometry,nt=ht.material,Ee=ht.group;if(nt.side===dn&&mt.layers.test(W.layers)){const Vn=nt.side;nt.side=Kt,nt.needsUpdate=!0,Tl(mt,G,W,Qt,nt,Ee),nt.side=Vn,nt.needsUpdate=!0,Be=!0}}Be===!0&&(I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe))}g.setRenderTarget(ye),g.setClearColor(D,q),De!==void 0&&(W.viewport=De),g.toneMapping=Se}function Ps(T,z,G){const W=z.isScene===!0?z.overrideMaterial:null;for(let B=0,oe=T.length;B<oe;B++){const pe=T[B],ye=pe.object,Se=pe.geometry,De=W===null?pe.material:W,Be=pe.group;ye.layers.test(G.layers)&&Tl(ye,z,G,Se,De,Be)}}function Tl(T,z,G,W,B,oe){T.onBeforeRender(g,z,G,W,B,oe),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(g,z,G,W,T,oe),B.transparent===!0&&B.side===dn&&B.forceSinglePass===!1?(B.side=Kt,B.needsUpdate=!0,g.renderBufferDirect(G,z,W,B,T,oe),B.side=ni,B.needsUpdate=!0,g.renderBufferDirect(G,z,W,B,T,oe),B.side=dn):g.renderBufferDirect(G,z,W,B,T,oe),T.onAfterRender(g,z,G,W,B,oe)}function Ls(T,z,G){z.isScene!==!0&&(z=dt);const W=Re.get(T),B=p.state.lights,oe=p.state.shadowsArray,pe=B.state.version,ye=be.getParameters(T,B.state,oe,z,G),Se=be.getProgramCacheKey(ye);let De=W.programs;W.environment=T.isMeshStandardMaterial?z.environment:null,W.fog=z.fog,W.envMap=(T.isMeshStandardMaterial?V:b).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Fe),De=new Map,W.programs=De);let Be=De.get(Se);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===pe)return Rl(T,ye),Be}else ye.uniforms=be.getUniforms(T),T.onBeforeCompile(ye,g),Be=be.acquireProgram(ye,Se),De.set(Se,Be),W.uniforms=ye.uniforms;const Ae=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ae.clippingPlanes=re.uniform),Rl(T,ye),W.needsLights=Cd(T),W.lightsStateVersion=pe,W.needsLights&&(Ae.ambientLightColor.value=B.state.ambient,Ae.lightProbe.value=B.state.probe,Ae.directionalLights.value=B.state.directional,Ae.directionalLightShadows.value=B.state.directionalShadow,Ae.spotLights.value=B.state.spot,Ae.spotLightShadows.value=B.state.spotShadow,Ae.rectAreaLights.value=B.state.rectArea,Ae.ltc_1.value=B.state.rectAreaLTC1,Ae.ltc_2.value=B.state.rectAreaLTC2,Ae.pointLights.value=B.state.point,Ae.pointLightShadows.value=B.state.pointShadow,Ae.hemisphereLights.value=B.state.hemi,Ae.directionalShadowMap.value=B.state.directionalShadowMap,Ae.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ae.spotShadowMap.value=B.state.spotShadowMap,Ae.spotLightMatrix.value=B.state.spotLightMatrix,Ae.spotLightMap.value=B.state.spotLightMap,Ae.pointShadowMap.value=B.state.pointShadowMap,Ae.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function wl(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=yo.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Rl(T,z){const G=Re.get(T);G.outputColorSpace=z.outputColorSpace,G.batching=z.batching,G.batchingColor=z.batchingColor,G.instancing=z.instancing,G.instancingColor=z.instancingColor,G.instancingMorph=z.instancingMorph,G.skinning=z.skinning,G.morphTargets=z.morphTargets,G.morphNormals=z.morphNormals,G.morphColors=z.morphColors,G.morphTargetsCount=z.morphTargetsCount,G.numClippingPlanes=z.numClippingPlanes,G.numIntersection=z.numClipIntersection,G.vertexAlphas=z.vertexAlphas,G.vertexTangents=z.vertexTangents,G.toneMapping=z.toneMapping}function wd(T,z,G,W,B){z.isScene!==!0&&(z=dt),I.resetTextureUnits();const oe=z.fog,pe=W.isMeshStandardMaterial?z.environment:null,ye=C===null?g.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Jt,Se=(W.isMeshStandardMaterial?V:b).get(W.envMap||pe),De=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ae=!!G.morphAttributes.position,Je=!!G.morphAttributes.normal,ht=!!G.morphAttributes.color;let mt=Mi;W.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(mt=g.toneMapping);const Qt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,nt=Qt!==void 0?Qt.length:0,Ee=Re.get(W),Vn=p.state.lights;if(Y===!0&&(ue===!0||T!==y)){const an=T===y&&W.id===S;re.setState(W,T,an)}let it=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Vn.state.version||Ee.outputColorSpace!==ye||B.isBatchedMesh&&Ee.batching===!1||!B.isBatchedMesh&&Ee.batching===!0||B.isBatchedMesh&&Ee.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ee.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ee.instancing===!1||!B.isInstancedMesh&&Ee.instancing===!0||B.isSkinnedMesh&&Ee.skinning===!1||!B.isSkinnedMesh&&Ee.skinning===!0||B.isInstancedMesh&&Ee.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ee.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ee.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ee.instancingMorph===!1&&B.morphTexture!==null||Ee.envMap!==Se||W.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==re.numPlanes||Ee.numIntersection!==re.numIntersection)||Ee.vertexAlphas!==De||Ee.vertexTangents!==Be||Ee.morphTargets!==Ae||Ee.morphNormals!==Je||Ee.morphColors!==ht||Ee.toneMapping!==mt||Ee.morphTargetsCount!==nt)&&(it=!0):(it=!0,Ee.__version=W.version);let _n=Ee.currentProgram;it===!0&&(_n=Ls(W,z,B));let Yi=!1,en=!1,Vr=!1;const gt=_n.getUniforms(),In=Ee.uniforms;if(Pe.useProgram(_n.program)&&(Yi=!0,en=!0,Vr=!0),W.id!==S&&(S=W.id,en=!0),Yi||y!==T){Pe.buffers.depth.getReversed()?(ce.copy(T.projectionMatrix),g0(ce),_0(ce),gt.setValue(F,"projectionMatrix",ce)):gt.setValue(F,"projectionMatrix",T.projectionMatrix),gt.setValue(F,"viewMatrix",T.matrixWorldInverse);const si=gt.map.cameraPosition;si!==void 0&&si.setValue(F,Oe.setFromMatrixPosition(T.matrixWorld)),Ye.logarithmicDepthBuffer&&gt.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&gt.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,en=!0,Vr=!0)}if(B.isSkinnedMesh){gt.setOptional(F,B,"bindMatrix"),gt.setOptional(F,B,"bindMatrixInverse");const an=B.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),gt.setValue(F,"boneTexture",an.boneTexture,I))}B.isBatchedMesh&&(gt.setOptional(F,B,"batchingTexture"),gt.setValue(F,"batchingTexture",B._matricesTexture,I),gt.setOptional(F,B,"batchingIdTexture"),gt.setValue(F,"batchingIdTexture",B._indirectTexture,I),gt.setOptional(F,B,"batchingColorTexture"),B._colorsTexture!==null&&gt.setValue(F,"batchingColorTexture",B._colorsTexture,I));const Hr=G.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0)&&Ne.update(B,G,_n),(en||Ee.receiveShadow!==B.receiveShadow)&&(Ee.receiveShadow=B.receiveShadow,gt.setValue(F,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(In.envMap.value=Se,In.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&z.environment!==null&&(In.envMapIntensity.value=z.environmentIntensity),en&&(gt.setValue(F,"toneMappingExposure",g.toneMappingExposure),Ee.needsLights&&Rd(In,Vr),oe&&W.fog===!0&&fe.refreshFogUniforms(In,oe),fe.refreshMaterialUniforms(In,W,R,ie,p.state.transmissionRenderTarget[T.id]),yo.upload(F,wl(Ee),In,I)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(yo.upload(F,wl(Ee),In,I),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&gt.setValue(F,"center",B.center),gt.setValue(F,"modelViewMatrix",B.modelViewMatrix),gt.setValue(F,"normalMatrix",B.normalMatrix),gt.setValue(F,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const an=W.uniformsGroups;for(let si=0,oi=an.length;si<oi;si++){const Cl=an[si];U.update(Cl,_n),U.bind(Cl,_n)}}return _n}function Rd(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Cd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,z,G){Re.get(T.texture).__webglTexture=z,Re.get(T.depthTexture).__webglTexture=G;const W=Re.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,z){const G=Re.get(T);G.__webglFramebuffer=z,G.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,G=0){C=T,A=z,w=G;let W=!0,B=null,oe=!1,pe=!1;if(T){const Se=Re.get(T);if(Se.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(F.FRAMEBUFFER,null),W=!1;else if(Se.__webglFramebuffer===void 0)I.setupRenderTarget(T);else if(Se.__hasExternalTextures)I.rebindTextures(T,Re.get(T.texture).__webglTexture,Re.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ae=T.depthTexture;if(Se.__boundDepthTexture!==Ae){if(Ae!==null&&Re.has(Ae)&&(T.width!==Ae.image.width||T.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(T)}}const De=T.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(pe=!0);const Be=Re.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[z])?B=Be[z][G]:B=Be[z],oe=!0):T.samples>0&&I.useMultisampledRTT(T)===!1?B=Re.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?B=Be[G]:B=Be,N.copy(T.viewport),k.copy(T.scissor),L=T.scissorTest}else N.copy(ee).multiplyScalar(R).floor(),k.copy(ne).multiplyScalar(R).floor(),L=Te;if(Pe.bindFramebuffer(F.FRAMEBUFFER,B)&&W&&Pe.drawBuffers(T,B),Pe.viewport(N),Pe.scissor(k),Pe.setScissorTest(L),oe){const Se=Re.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Se.__webglTexture,G)}else if(pe){const Se=Re.get(T.texture),De=z||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Se.__webglTexture,G||0,De)}S=-1},this.readRenderTargetPixels=function(T,z,G,W,B,oe,pe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye){Pe.bindFramebuffer(F.FRAMEBUFFER,ye);try{const Se=T.texture,De=Se.format,Be=Se.type;if(!Ye.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-W&&G>=0&&G<=T.height-B&&F.readPixels(z,G,W,B,He.convert(De),He.convert(Be),oe)}finally{const Se=C!==null?Re.get(C).__webglFramebuffer:null;Pe.bindFramebuffer(F.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(T,z,G,W,B,oe,pe){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&pe!==void 0&&(ye=ye[pe]),ye){const Se=T.texture,De=Se.format,Be=Se.type;if(!Ye.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=T.width-W&&G>=0&&G<=T.height-B){Pe.bindFramebuffer(F.FRAMEBUFFER,ye);const Ae=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.bufferData(F.PIXEL_PACK_BUFFER,oe.byteLength,F.STREAM_READ),F.readPixels(z,G,W,B,He.convert(De),He.convert(Be),0);const Je=C!==null?Re.get(C).__webglFramebuffer:null;Pe.bindFramebuffer(F.FRAMEBUFFER,Je);const ht=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await m0(F,ht,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,oe),F.deleteBuffer(Ae),F.deleteSync(ht),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,z=null,G=0){T.isTexture!==!0&&(ss("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-G),B=Math.floor(T.image.width*W),oe=Math.floor(T.image.height*W),pe=z!==null?z.x:0,ye=z!==null?z.y:0;I.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,G,0,0,pe,ye,B,oe),Pe.unbindTexture()},this.copyTextureToTexture=function(T,z,G=null,W=null,B=0){T.isTexture!==!0&&(ss("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],z=arguments[2],B=arguments[3]||0,G=null);let oe,pe,ye,Se,De,Be,Ae,Je,ht;const mt=T.isCompressedTexture?T.mipmaps[B]:T.image;G!==null?(oe=G.max.x-G.min.x,pe=G.max.y-G.min.y,ye=G.isBox3?G.max.z-G.min.z:1,Se=G.min.x,De=G.min.y,Be=G.isBox3?G.min.z:0):(oe=mt.width,pe=mt.height,ye=mt.depth||1,Se=0,De=0,Be=0),W!==null?(Ae=W.x,Je=W.y,ht=W.z):(Ae=0,Je=0,ht=0);const Qt=He.convert(z.format),nt=He.convert(z.type);let Ee;z.isData3DTexture?(I.setTexture3D(z,0),Ee=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(I.setTexture2DArray(z,0),Ee=F.TEXTURE_2D_ARRAY):(I.setTexture2D(z,0),Ee=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);const Vn=F.getParameter(F.UNPACK_ROW_LENGTH),it=F.getParameter(F.UNPACK_IMAGE_HEIGHT),_n=F.getParameter(F.UNPACK_SKIP_PIXELS),Yi=F.getParameter(F.UNPACK_SKIP_ROWS),en=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,mt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,mt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Se),F.pixelStorei(F.UNPACK_SKIP_ROWS,De),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Be);const Vr=T.isDataArrayTexture||T.isData3DTexture,gt=z.isDataArrayTexture||z.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const In=Re.get(T),Hr=Re.get(z),an=Re.get(In.__renderTarget),si=Re.get(Hr.__renderTarget);Pe.bindFramebuffer(F.READ_FRAMEBUFFER,an.__webglFramebuffer),Pe.bindFramebuffer(F.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let oi=0;oi<ye;oi++)Vr&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Re.get(T).__webglTexture,B,Be+oi),T.isDepthTexture?(gt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Re.get(z).__webglTexture,B,ht+oi),F.blitFramebuffer(Se,De,oe,pe,Ae,Je,oe,pe,F.DEPTH_BUFFER_BIT,F.NEAREST)):gt?F.copyTexSubImage3D(Ee,B,Ae,Je,ht+oi,Se,De,oe,pe):F.copyTexSubImage2D(Ee,B,Ae,Je,ht+oi,Se,De,oe,pe);Pe.bindFramebuffer(F.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else gt?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(Ee,B,Ae,Je,ht,oe,pe,ye,Qt,nt,mt.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(Ee,B,Ae,Je,ht,oe,pe,ye,Qt,mt.data):F.texSubImage3D(Ee,B,Ae,Je,ht,oe,pe,ye,Qt,nt,mt):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,B,Ae,Je,oe,pe,Qt,nt,mt.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,B,Ae,Je,mt.width,mt.height,Qt,mt.data):F.texSubImage2D(F.TEXTURE_2D,B,Ae,Je,oe,pe,Qt,nt,mt);F.pixelStorei(F.UNPACK_ROW_LENGTH,Vn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,it),F.pixelStorei(F.UNPACK_SKIP_PIXELS,_n),F.pixelStorei(F.UNPACK_SKIP_ROWS,Yi),F.pixelStorei(F.UNPACK_SKIP_IMAGES,en),B===0&&z.generateMipmaps&&F.generateMipmap(Ee),Pe.unbindTexture()},this.copyTextureToTexture3D=function(T,z,G=null,W=null,B=0){return T.isTexture!==!0&&(ss("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,T=arguments[2],z=arguments[3],B=arguments[4]||0),ss('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,z,G,W,B)},this.initRenderTarget=function(T){Re.get(T).__webglFramebuffer===void 0&&I.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?I.setTextureCube(T,0):T.isData3DTexture?I.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?I.setTexture2DArray(T,0):I.setTexture2D(T,0),Pe.unbindTexture()},this.resetState=function(){A=0,w=0,C=null,Pe.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class ol{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=t,this.far=n}clone(){return new ol(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class al extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class qf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Pc,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qt=new P;class Ts{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),r=ot(r,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ts(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Rs extends Cn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ur;const Yr=new P,hr=new P,fr=new P,dr=new ae,$r=new ae,Yf=new Ue,to=new P,Kr=new P,no=new P,ku=new ae,wa=new ae,Vu=new ae;class Vo extends ft{constructor(e=new Rs){if(super(),this.isSprite=!0,this.type="Sprite",ur===void 0){ur=new Ut;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qf(t,5);ur.setIndex([0,1,2,0,2,3]),ur.setAttribute("position",new Ts(n,3,0,!1)),ur.setAttribute("uv",new Ts(n,2,3,!1))}this.geometry=ur,this.material=e,this.center=new ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),Yf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),fr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-fr.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;io(to.set(-.5,-.5,0),fr,o,hr,r,s),io(Kr.set(.5,-.5,0),fr,o,hr,r,s),io(no.set(.5,.5,0),fr,o,hr,r,s),ku.set(0,0),wa.set(1,0),Vu.set(1,1);let a=e.ray.intersectTriangle(to,Kr,no,!1,Yr);if(a===null&&(io(Kr.set(-.5,.5,0),fr,o,hr,r,s),wa.set(0,1),a=e.ray.intersectTriangle(to,no,Kr,!1,Yr),a===null))return;const c=e.ray.origin.distanceTo(Yr);c<e.near||c>e.far||t.push({distance:c,point:Yr.clone(),uv:pn.getInterpolation(Yr,to,Kr,no,ku,wa,Vu,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function io(i,e,t,n,r,s){dr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?($r.x=s*dr.x-r*dr.y,$r.y=r*dr.x+s*dr.y):$r.copy(dr),i.copy(e),i.x+=$r.x,i.y+=$r.y,i.applyMatrix4(Yf)}const Hu=new P,Gu=new tt,Wu=new tt,wM=new P,Xu=new Ue,ro=new P,Ra=new Un,ju=new Ue,Ca=new Bo;class RM extends Me{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jl,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ri),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ra.copy(this.boundingSphere),Ra.applyMatrix4(r),e.ray.intersectsSphere(Ra)!==!1&&(ju.copy(r).invert(),Ca.copy(e.ray).applyMatrix4(ju),!(this.boundingBox!==null&&Ca.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ca)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;Gu.fromBufferAttribute(r.attributes.skinIndex,e),Wu.fromBufferAttribute(r.attributes.skinWeight,e),Hu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Wu.getComponent(s);if(o!==0){const a=Gu.getComponent(s);Xu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(wM.copy(Hu).applyMatrix4(Xu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class $f extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kf extends Pt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=It,u=It,h,f){super(null,o,a,c,l,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qu=new Ue,CM=new Ue;class cl{constructor(e=[],t=[]){this.uuid=wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:CM;qu.multiplyMatrices(a,t[s]),qu.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new cl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Kf(t,e,e,mn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new $f),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class Dc extends Zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const pr=new Ue,Yu=new Ue,so=[],$u=new ri,IM=new Ue,Zr=new Me,Jr=new Un;class PM extends Me{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,IM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,pr),$u.copy(e.boundingBox).applyMatrix4(pr),this.boundingBox.union($u)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Un),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,pr),Jr.copy(e.boundingSphere).applyMatrix4(pr),this.boundingSphere.union(Jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Zr.geometry=this.geometry,Zr.material=this.material,Zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(n),e.ray.intersectsSphere(Jr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pr),Yu.multiplyMatrices(n,pr),Zr.matrixWorld=Yu,Zr.raycast(e,so);for(let o=0,a=so.length;o<a;o++){const c=so[o];c.instanceId=s,c.object=this,t.push(c)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kf(new Float32Array(r*this.count),r,this.count,Zc,En));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ll extends Cn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oo=new P,Do=new P,Ku=new Ue,Qr=new Bo,oo=new Un,Ia=new P,Zu=new P;class Ho extends ft{constructor(e=new Ut,t=new ll){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Oo.fromBufferAttribute(t,r-1),Do.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Oo.distanceTo(Do);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(r),oo.radius+=s,e.ray.intersectsSphere(oo)===!1)return;Ku.copy(r).invert(),Qr.copy(e.ray).applyMatrix4(Ku);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let v=d,m=_-1;v<m;v+=l){const p=u.getX(v),x=u.getX(v+1),M=ao(this,e,Qr,c,p,x);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(_-1),m=u.getX(d),p=ao(this,e,Qr,c,v,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let v=d,m=_-1;v<m;v+=l){const p=ao(this,e,Qr,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=ao(this,e,Qr,c,_-1,d);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ao(i,e,t,n,r,s){const o=i.geometry.attributes.position;if(Oo.fromBufferAttribute(o,r),Do.fromBufferAttribute(o,s),t.distanceSqToSegment(Oo,Do,Ia,Zu)>n)return;Ia.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ia);if(!(c<e.near||c>e.far))return{distance:c,point:Zu.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const Ju=new P,Qu=new P;class LM extends Ho{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ju.fromBufferAttribute(t,r),Qu.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ju.distanceTo(Qu);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class NM extends Ho{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Zf extends Cn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eh=new Ue,Uc=new Bo,co=new Un,lo=new P;class OM extends ft{constructor(e=new Ut,t=new Zf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(r),co.radius+=s,e.ray.intersectsSphere(co)===!1)return;eh.copy(r).invert(),Uc.copy(e.ray).applyMatrix4(eh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let _=f,v=d;_<v;_++){const m=l.getX(_);lo.fromBufferAttribute(h,m),th(lo,m,c,r,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let _=f,v=d;_<v;_++)lo.fromBufferAttribute(h,_),th(lo,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function th(i,e,t,n,r,s,o){const a=Uc.distanceSqToPoint(i);if(a<t){const c=new P;Uc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Go extends Pt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],f=n[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new ae:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new P,r=[],s=[],o=[],a=new P,c=new Ue;for(let d=0;d<=e;d++){const _=d/e;r[d]=this.getTangentAt(_,new P)}s[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Ct(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,_))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ct(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let _=1;_<=e;_++)s[_].applyMatrix4(c.makeRotationAxis(r[_],d*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ul extends zn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ae){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class DM extends ul{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function hl(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const uo=new P,Pa=new hl,La=new hl,Na=new hl;class UM extends zn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(uo.subVectors(r[0],r[1]).add(r[0]),l=uo);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(uo.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=uo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),Pa.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,_,v,m),La.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,_,v,m),Na.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,_,v,m)}else this.curveType==="catmullrom"&&(Pa.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),La.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Na.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Pa.calc(c),La.calc(c),Na.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nh(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function zM(i,e){const t=1-i;return t*t*e}function FM(i,e){return 2*(1-i)*i*e}function BM(i,e){return i*i*e}function ls(i,e,t,n){return zM(i,e)+FM(i,t)+BM(i,n)}function kM(i,e){const t=1-i;return t*t*t*e}function VM(i,e){const t=1-i;return 3*t*t*i*e}function HM(i,e){return 3*(1-i)*i*i*e}function GM(i,e){return i*i*i*e}function us(i,e,t,n,r){return kM(i,e)+VM(i,t)+HM(i,n)+GM(i,r)}class Jf extends zn{constructor(e=new ae,t=new ae,n=new ae,r=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ae){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(us(e,r.x,s.x,o.x,a.x),us(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class WM extends zn{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(us(e,r.x,s.x,o.x,a.x),us(e,r.y,s.y,o.y,a.y),us(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qf extends zn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class XM extends zn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ed extends zn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(ls(e,r.x,s.x,o.x),ls(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jM extends zn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(ls(e,r.x,s.x,o.x),ls(e,r.y,s.y,o.y),ls(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class td extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(nh(a,c.x,l.x,u.x,h.x),nh(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ae().fromArray(r))}return this}}var ih=Object.freeze({__proto__:null,ArcCurve:DM,CatmullRomCurve3:UM,CubicBezierCurve:Jf,CubicBezierCurve3:WM,EllipseCurve:ul,LineCurve:Qf,LineCurve3:XM,QuadraticBezierCurve:ed,QuadraticBezierCurve3:jM,SplineCurve:td});class qM extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ih[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new ih[r.type]().fromJSON(r))}return this}}class YM extends qM{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Qf(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new ed(this.currentPoint.clone(),new ae(e,t),new ae(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Jf(this.currentPoint.clone(),new ae(e,t),new ae(n,r),new ae(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new td(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new ul(e,t,n,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wo extends Ut{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Ct(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/t,h=new P,f=new ae,d=new P,_=new P,v=new P;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(_)}for(let x=0;x<=t;x++){const M=n+x*u*r,g=Math.sin(M),E=Math.cos(M);for(let A=0;A<=e.length-1;A++){h.x=e[A].x*g,h.y=e[A].y,h.z=e[A].x*E,o.push(h.x,h.y,h.z),f.x=x/t,f.y=A/(e.length-1),a.push(f.x,f.y);const w=c[3*A+0]*g,C=c[3*A+1],S=c[3*A+0]*E;l.push(w,C,S)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const g=M+x*e.length,E=g,A=g+e.length,w=g+e.length+1,C=g+1;s.push(E,A,C),s.push(w,C,A)}this.setIndex(s),this.setAttribute("position",new lt(o,3)),this.setAttribute("uv",new lt(a,2)),this.setAttribute("normal",new lt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wo(e.points,e.segments,e.phiStart,e.phiLength)}}class fl extends Wo{constructor(e=1,t=1,n=4,r=8){const s=new YM;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new fl(e.radius,e.length,e.capSegments,e.radialSegments)}}class Xo extends Ut{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new P,u=new ae;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*r;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new lt(o,3)),this.setAttribute("normal",new lt(a,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class An extends Ut{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let _=0;const v=[],m=n/2;let p=0;x(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new lt(h,3)),this.setAttribute("normal",new lt(f,3)),this.setAttribute("uv",new lt(d,2));function x(){const g=new P,E=new P;let A=0;const w=(t-e)/n;for(let C=0;C<=s;C++){const S=[],y=C/s,N=y*(t-e)+e;for(let k=0;k<=r;k++){const L=k/r,D=L*c+a,q=Math.sin(D),j=Math.cos(D);E.x=N*q,E.y=-y*n+m,E.z=N*j,h.push(E.x,E.y,E.z),g.set(q,w,j).normalize(),f.push(g.x,g.y,g.z),d.push(L,1-y),S.push(_++)}v.push(S)}for(let C=0;C<r;C++)for(let S=0;S<s;S++){const y=v[S][C],N=v[S+1][C],k=v[S+1][C+1],L=v[S][C+1];(e>0||S!==0)&&(u.push(y,N,L),A+=3),(t>0||S!==s-1)&&(u.push(N,k,L),A+=3)}l.addGroup(p,A,0),p+=A}function M(g){const E=_,A=new ae,w=new P;let C=0;const S=g===!0?e:t,y=g===!0?1:-1;for(let k=1;k<=r;k++)h.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),_++;const N=_;for(let k=0;k<=r;k++){const D=k/r*c+a,q=Math.cos(D),j=Math.sin(D);w.x=S*j,w.y=m*y,w.z=S*q,h.push(w.x,w.y,w.z),f.push(0,y,0),A.x=q*.5+.5,A.y=j*.5*y+.5,d.push(A.x,A.y),_++}for(let k=0;k<r;k++){const L=E+k,D=N+k;g===!0?u.push(D,D+1,L):u.push(D+1,D,L),C+=3}l.addGroup(p,C,g===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new An(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dl extends Ut{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),u(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new P,g=new P,E=new P;for(let A=0;A<t.length;A+=3)d(t[A+0],M),d(t[A+1],g),d(t[A+2],E),c(M,g,E,x)}function c(x,M,g,E){const A=E+1,w=[];for(let C=0;C<=A;C++){w[C]=[];const S=x.clone().lerp(g,C/A),y=M.clone().lerp(g,C/A),N=A-C;for(let k=0;k<=N;k++)k===0&&C===A?w[C][k]=S:w[C][k]=S.clone().lerp(y,k/N)}for(let C=0;C<A;C++)for(let S=0;S<2*(A-C)-1;S++){const y=Math.floor(S/2);S%2===0?(f(w[C][y+1]),f(w[C+1][y]),f(w[C][y])):(f(w[C][y+1]),f(w[C+1][y+1]),f(w[C+1][y]))}}function l(x){const M=new P;for(let g=0;g<s.length;g+=3)M.x=s[g+0],M.y=s[g+1],M.z=s[g+2],M.normalize().multiplyScalar(x),s[g+0]=M.x,s[g+1]=M.y,s[g+2]=M.z}function u(){const x=new P;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const g=m(x)/2/Math.PI+.5,E=p(x)/Math.PI+.5;o.push(g,1-E)}_(),h()}function h(){for(let x=0;x<o.length;x+=6){const M=o[x+0],g=o[x+2],E=o[x+4],A=Math.max(M,g,E),w=Math.min(M,g,E);A>.9&&w<.1&&(M<.2&&(o[x+0]+=1),g<.2&&(o[x+2]+=1),E<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function d(x,M){const g=x*3;M.x=e[g+0],M.y=e[g+1],M.z=e[g+2]}function _(){const x=new P,M=new P,g=new P,E=new P,A=new ae,w=new ae,C=new ae;for(let S=0,y=0;S<s.length;S+=9,y+=6){x.set(s[S+0],s[S+1],s[S+2]),M.set(s[S+3],s[S+4],s[S+5]),g.set(s[S+6],s[S+7],s[S+8]),A.set(o[y+0],o[y+1]),w.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),E.copy(x).add(M).add(g).divideScalar(3);const N=m(E);v(A,y+0,x,N),v(w,y+2,M,N),v(C,y+4,g,N)}}function v(x,M,g,E){E<0&&x.x===1&&(o[M]=x.x-1),g.x===0&&g.z===0&&(o[M]=E/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dl(e.vertices,e.indices,e.radius,e.details)}}class pl extends dl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new pl(e.radius,e.detail)}}class jo extends Ut{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new P,f=new P,d=[],_=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n;let g=0;p===0&&o===0?g=.5/t:p===n&&c===Math.PI&&(g=-.5/t);for(let E=0;E<=t;E++){const A=E/t;h.x=-e*Math.cos(r+A*s)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(r+A*s)*Math.sin(o+M*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(A+g,1-M),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const M=u[p][x+1],g=u[p][x],E=u[p+1][x],A=u[p+1][x+1];(p!==0||o>0)&&d.push(M,g,A),(p!==n-1||c<Math.PI)&&d.push(g,E,A)}this.setIndex(d),this.setAttribute("position",new lt(_,3)),this.setAttribute("normal",new lt(v,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ml extends Ut{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new P,h=new P,f=new P;for(let d=0;d<=n;d++)for(let _=0;_<=r;_++){const v=_/r*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(_/r),l.push(d/n)}for(let d=1;d<=n;d++)for(let _=1;_<=r;_++){const v=(r+1)*d+_-1,m=(r+1)*(d-1)+_-1,p=(r+1)*(d-1)+_,x=(r+1)*d+_;o.push(v,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ml(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Et extends Cn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cf,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fn extends Et{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ho(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function $M(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function KM(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function rh(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=i[a+c]}return r}function nd(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class Cs{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ZM extends Cs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:gr,endingEnd:gr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case _r:s=e,a=2*t-n;break;case Lo:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case _r:o=e,c=2*n-t;break;case Lo:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,_=(n-t)/(r-t),v=_*_,m=v*_,p=-f*m+2*f*v-f*_,x=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*_+1,M=(-1-d)*m+(1.5+d)*v+.5*_,g=d*m-d*v;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+x*o[l+E]+M*o[c+E]+g*o[h+E];return s}}class id extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*h+o[c+f]*u;return s}}class JM extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Bn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ho(t,this.TimeBufferType),this.values=ho(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ho(e.times,Array),values:ho(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new JM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new id(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ZM(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case As:t=this.InterpolantFactoryMethodDiscrete;break;case bs:t=this.InterpolantFactoryMethodLinear;break;case Qo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return As;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return Qo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&$M(r))for(let a=0,c=r.length;a!==c;++a){const l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Qo,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let _=0;_!==n;++_){const v=t[h+_];if(v!==t[f+_]||v!==t[d+_]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=bs;class Fr extends Bn{constructor(e,t,n){super(e,t,n)}}Fr.prototype.ValueTypeName="bool";Fr.prototype.ValueBufferType=Array;Fr.prototype.DefaultInterpolation=As;Fr.prototype.InterpolantFactoryMethodLinear=void 0;Fr.prototype.InterpolantFactoryMethodSmooth=void 0;class rd extends Bn{}rd.prototype.ValueTypeName="color";class Or extends Bn{}Or.prototype.ValueTypeName="number";class QM extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t);let l=e*a;for(let u=l+a;l!==u;l+=4)Rn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class Dr extends Bn{InterpolantFactoryMethodLinear(e){return new QM(this.times,this.values,this.getValueSize(),e)}}Dr.prototype.ValueTypeName="quaternion";Dr.prototype.InterpolantFactoryMethodSmooth=void 0;class Br extends Bn{constructor(e,t,n){super(e,t,n)}}Br.prototype.ValueTypeName="string";Br.prototype.ValueBufferType=Array;Br.prototype.DefaultInterpolation=As;Br.prototype.InterpolantFactoryMethodLinear=void 0;Br.prototype.InterpolantFactoryMethodSmooth=void 0;class Ur extends Bn{}Ur.prototype.ValueTypeName="vector";class zc{constructor(e="",t=-1,n=[],r=tl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=wn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ty(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Bn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=KM(c);c=rh(c,1,u),l=rh(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Or(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=r[h];f||(r[h]=f=[]),f.push(l)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,_,v){if(d.length!==0){const m=[],p=[];nd(d,m,p,_),m.length!==0&&v.push(new h(f,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let v=0;v<f[_].morphTargets.length;v++)d[f[_].morphTargets[v]]=-1;for(const v in d){const m=[],p=[];for(let x=0;x!==f[_].morphTargets.length;++x){const M=f[_];m.push(M.time),p.push(M.morphTarget===v?1:0)}r.push(new Or(".morphTargetInfluence["+v+"]",m,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(Ur,d+".position",f,"pos",r),n(Dr,d+".quaternion",f,"rot",r),n(Ur,d+".scale",f,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ey(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Or;case"vector":case"vector2":case"vector3":case"vector4":return Ur;case"color":return rd;case"quaternion":return Dr;case"bool":case"boolean":return Fr;case"string":return Br}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function ty(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ey(i.type);if(i.times===void 0){const t=[],n=[];nd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const vi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class ny{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],_=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null}}}const iy=new ny;class kr{constructor(e){this.manager=e!==void 0?e:iy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}kr.DEFAULT_MATERIAL_NAME="__DEFAULT";const qn={};class ry extends Error{constructor(e,t){super(e),this.response=t}}class sd extends kr{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(qn[e]!==void 0){qn[e].push({onLoad:t,onProgress:n,onError:r});return}qn[e]=[],qn[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=qn[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,_=d!==0;let v=0;const m=new ReadableStream({start(p){x();function x(){h.read().then(({done:M,value:g})=>{if(M)p.close();else{v+=g.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:d});for(let A=0,w=u.length;A<w;A++){const C=u[A];C.onProgress&&C.onProgress(E)}p.enqueue(g),x()}},M=>{p.error(M)})}}});return new Response(m)}else throw new ry(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(_=>d.decode(_))}}}).then(l=>{vi.add(e,l);const u=qn[e];delete qn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=qn[e];if(u===void 0)throw this.manager.itemError(e),l;delete qn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class sy extends kr{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vi.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Es("img");function c(){u(),vi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class od extends kr{constructor(e){super(e)}load(e,t,n,r){const s=new Pt,o=new sy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class qo extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ad extends qo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Oa=new Ue,sh=new P,oh=new P;class gl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;sh.setFromMatrixPosition(e.matrixWorld),t.position.copy(sh),oh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(oh),t.updateMatrixWorld(),Oa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class oy extends gl{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Lr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class cd extends qo{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new oy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ah=new Ue,es=new P,Da=new P;class ay extends gl{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),es.setFromMatrixPosition(e.matrixWorld),n.position.copy(es),Da.copy(n.position),Da.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Da),n.updateMatrixWorld(),r.makeTranslation(-es.x,-es.y,-es.z),ah.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ah)}}class ei extends qo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ay}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class cy extends gl{constructor(){super(new rl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _l extends qo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new cy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class hs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ly extends kr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vi.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return vi.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),vi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});vi.add(e,c),s.manager.itemStart(e)}}class uy{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){Rn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const o=this._workIndex*s;Rn.multiplyQuaternionsFlat(e,o,e,t,e,n),Rn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){const o=1-r;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*r}}}const vl="\\[\\]\\.:\\/",hy=new RegExp("["+vl+"]","g"),xl="[^"+vl+"]",fy="[^"+vl.replace("\\.","")+"]",dy=/((?:WC+[\/:])*)/.source.replace("WC",xl),py=/(WCOD+)?/.source.replace("WCOD",fy),my=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xl),gy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xl),_y=new RegExp("^"+dy+py+my+gy+"$"),vy=["material","materials","bones","map"];class xy{constructor(e,t,n){const r=n||rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class rt{constructor(e,t,n){this.path=t,this.parsedPath=n||rt.parseTrackName(t),this.node=rt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new rt.Composite(e,t,n):new rt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(hy,"")}static parseTrackName(e){const t=_y.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);vy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=rt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[r];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}rt.Composite=xy;rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};rt.prototype.GetterByBindingType=[rt.prototype._getValue_direct,rt.prototype._getValue_array,rt.prototype._getValue_arrayElement,rt.prototype._getValue_toArray];rt.prototype.SetterByBindingTypeAndVersioning=[[rt.prototype._setValue_direct,rt.prototype._setValue_direct_setNeedsUpdate,rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_array,rt.prototype._setValue_array_setNeedsUpdate,rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_arrayElement,rt.prototype._setValue_arrayElement_setNeedsUpdate,rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[rt.prototype._setValue_fromArray,rt.prototype._setValue_fromArray_setNeedsUpdate,rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class My{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:gr,endingEnd:gr};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Fm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case km:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case tl:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const o=n===Bm;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===wf){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){const a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=_r,r.endingEnd=_r):(e?r.endingStart=this.zeroSlopeAtStart?_r:gr:r.endingStart=Lo,t?r.endingEnd=this.zeroSlopeAtEnd?_r:gr:r.endingEnd=Lo)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const yy=new Float32Array(1);class ld extends qi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==s;++h){const f=r[h],d=f.name;let _=u[d];if(_!==void 0)++_.referenceCount,o[h]=_;else{if(_=o[h],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,c,d));continue}const v=t&&t._propertyBindings[h].binding.parsedPath;_=new uy(rt.create(n,d,v),f.ValueTypeName,f.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,c,d),o[h]=_}a[h].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new id(new Float32Array(2),new Float32Array(2),1,yy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let o=typeof e=="string"?zc.findByName(r,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=tl),c!==void 0){const h=c.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new My(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?zc.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(r,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qc);function Uo(i){const e=new Map,t=new Map,n=i.clone();return ud(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function ud(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)ud(i.children[n],e.children[n],t)}class Sy extends al{constructor(){super();const e=new sn;e.deleteAttribute("uv");const t=new Et({side:Kt}),n=new Et,r=new ei(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new Me(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new Me(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new Me(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new Me(e,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new Me(e,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const u=new Me(e,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const h=new Me(e,n);h.position.set(-2.193,-.369,-5.547),h.rotation.set(0,.516,0),h.scale.set(3.875,3.487,2.986),this.add(h);const f=new Me(e,mr(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new Me(e,mr(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const _=new Me(e,mr(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const v=new Me(e,mr(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);const m=new Me(e,mr(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new Me(e,mr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function mr(i){const e=new bt;return e.color.setScalar(i),e}function hd(i){let e=i>>>0;return()=>{const[t,n]=kh(e);return e=n,t}}const _t=64;function At(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e;const s=r.getContext("2d");t(s,i,e,hd(i*31+e));const o=new Go(r);return o.colorSpace=Tt,o.anisotropy=4,n&&(o.wrapS=o.wrapT=Ei),o}const Ay=Object.freeze(["muro","piastrelle","parquet","soffitto","legno","legnoChiaro","porta","terra","linoleum","cemento","asfalto","metallo"]);async function by(i="./texture/"){const e=new od,t=async(r,s)=>{const o=await e.loadAsync(`${i}${r}.jpg`);return o.wrapS=o.wrapT=Ei,o.anisotropy=8,s&&(o.colorSpace=Tt),o},n=await Promise.all(Ay.map(async r=>{const[s,o,a]=await Promise.all([t(`${r}_diff`,!0),t(`${r}_nor`,!1),t(`${r}_rough`,!1)]);return[r,{map:s,normalMap:o,roughnessMap:a}]}));return Object.fromEntries(n)}function Rt(i,e,t,n,r,s){for(let o=0;o<s;o++)i.fillStyle=r[Math.floor(n()*r.length)],i.fillRect(Math.floor(n()*e),Math.floor(n()*t),1+Math.floor(n()*2),1+Math.floor(n()*2))}function di(i,e,t,n,r,s){for(let o=0;o<s;o++){i.fillStyle=r;const a=n()*e,c=n()*t;for(let l=0;l<14;l++)i.fillRect(Math.floor(a+(n()-.5)*10),Math.floor(c+(n()-.5)*10),2,2)}}function Ey(){const i=At(_t,_t,(g,E,A,w)=>{g.fillStyle="#b9ae8e",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#a99f80","#c5bb9c","#9c9274"],500),g.fillStyle="#3f5b48",g.fillRect(0,Math.floor(A*.62),E,Math.ceil(A*.38));for(let C=0;C<E;C+=8)for(let S=Math.floor(A*.62);S<A;S+=8)g.fillStyle=(C+S)%16?"#466751":"#3a5443",g.fillRect(C,S,7,7);g.fillStyle="#2c2a22",g.fillRect(0,Math.floor(A*.6),E,2),di(g,E,A*.6,w,"rgba(70,55,30,0.35)",5)}),e=At(_t,_t,(g,E,A,w)=>{for(let C=0;C<E;C+=16)for(let S=0;S<A;S+=16)g.fillStyle=(C+S)/16%2?"#8d8a80":"#5f5d57",g.fillRect(C,S,16,16);Rt(g,E,A,w,["#4b4943","#9b988e","#3a3934"],400),g.fillStyle="#2a2925";for(let C=0;C<E;C+=16)g.fillRect(C,0,1,A),g.fillRect(0,C,E,1)}),t=At(_t,_t,(g,E,A,w)=>{for(let C=0;C<A;C+=8){const S=C/8%2?0:16;for(let y=-S;y<E;y+=32){const N=120+Math.floor(w()*30);g.fillStyle=`rgb(${N},${Math.floor(N*.68)},${Math.floor(N*.4)})`,g.fillRect(y,C,31,7)}}Rt(g,E,A,w,["#5e3d22","#8e6238"],300),g.fillStyle="#d8d0b0",g.fillRect(0,30,E,1)}),n=At(_t,_t,(g,E,A,w)=>{g.fillStyle="#8f8b7c",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#7e7a6c","#a19d8d","#6a675b"],600),g.fillStyle="#4f4c43";for(let C=0;C<E;C+=32)g.fillRect(C,0,2,A),g.fillRect(0,C,E,2);di(g,E,A,w,"rgba(90,70,30,0.4)",3)}),r=At(_t,16,(g,E,A,w)=>{g.fillStyle="#6b4a2b",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#5a3d22","#7d5834","#4a311b"],200),g.fillStyle="#3a2614",g.fillRect(0,0,E,1),g.fillRect(0,A-1,E,1),g.fillStyle="#9a9a9a",g.fillRect(4,6,2,2),g.fillRect(E-6,7,2,2)}),s=At(_t,_t,(g,E,A,w)=>{for(let C=0;C<E;C+=8){const S=70+Math.floor(w()*25);g.fillStyle=`rgb(${S},${Math.floor(S*.72)},${Math.floor(S*.45)})`,g.fillRect(C,0,7,A)}Rt(g,E,A,w,["#3b2817","#56391f"],200),g.strokeStyle="#8f8f8f",g.lineWidth=2,g.beginPath(),g.moveTo(0,18),g.lineTo(E,46),g.moveTo(E,18),g.lineTo(0,46),g.stroke()}),o=At(_t,_t,(g,E,A,w)=>{for(let C=0;C<E;C+=16){g.fillStyle="#4b6a7f",g.fillRect(C,0,15,A),g.fillStyle="#2d4150";for(let S=6;S<20;S+=3)g.fillRect(C+4,S,8,1);g.fillStyle="#c0c0c0",g.fillRect(C+12,30,2,5)}Rt(g,E,A,w,["#6b5a3a","#3a4d5a"],300)},!0),a=At(_t,_t,(g,E,A,w)=>{g.fillStyle="#2b2a1e",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#3a3824","#22301a","#1d1c14","#34452a"],900)}),c=At(_t*2,_t,(g,E,A,w)=>{g.fillStyle="#5b4026",g.fillRect(0,0,E,A),g.fillStyle="#1f3327",g.fillRect(4,4,E-8,A-8),Rt(g,E,A,w,["#2a4434","#18281e"],300),g.fillStyle="rgba(230,230,220,0.85)",g.font="bold 13px monospace",g.fillText("NON USCITE",14,26),g.fillText("DI NOTTE",22,44),g.fillStyle="rgba(120,10,10,0.8)",g.fillRect(90,46,20,2)},!1),l=At(32,32,(g,E,A,w)=>{g.fillStyle="#3a3d40",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#2b2d30","#4a4e52","#55493a"],120)}),u=At(32,32,(g,E,A,w)=>{g.fillStyle="#8a6a44",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#6e5333","#9e7c52"],150);for(let C=0;C<A;C+=8)g.fillStyle="#5a4126",g.fillRect(0,C,E,1)}),h=At(_t,_t,(g,E,A,w)=>{for(let C=0;C<E;C+=32)for(let S=0;S<A;S+=32)g.fillStyle=(C+S)/32%2?"#b8ad86":"#6f8a6a",g.fillRect(C,S,32,32);Rt(g,E,A,w,["#9a916e","#5c7358","#c9bf9a","#4a4536"],500),di(g,E,A,w,"rgba(60,45,25,0.35)",3)}),f=At(_t,_t,(g,E,A,w)=>{g.fillStyle="#5d5c58",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#4e4d49","#6b6a65","#3f3e3a","#74706a"],900),g.strokeStyle="#2f2e2b",g.lineWidth=1,g.beginPath(),g.moveTo(4,10),g.lineTo(22,26),g.lineTo(30,24),g.lineTo(50,44),g.stroke(),di(g,E,A,w,"rgba(40,30,15,0.5)",4)}),d=At(_t,_t,(g,E,A,w)=>{g.fillStyle="#2f3032",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#3a3b3d","#262729","#45464a","#1f2022"],1100),g.fillStyle="rgba(210,200,160,0.55)",g.fillRect(0,31,E,2),di(g,E,A,w,"rgba(20,20,20,0.6)",3)}),_=At(32,32,(g,E,A)=>{g.clearRect(0,0,E,A),g.strokeStyle="#8d9499",g.lineWidth=1;for(let w=-32;w<64;w+=8)g.beginPath(),g.moveTo(w,0),g.lineTo(w+32,32),g.moveTo(w+32,0),g.lineTo(w,32),g.stroke()}),v=At(_t*2,_t,(g,E,A,w)=>{g.fillStyle="#d9a21b",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#b9861a","#e5b43a","#6b4a1a"],700),g.fillStyle="#1b2228";for(let C=6;C<E-10;C+=20)g.fillRect(C,10,15,16);g.fillStyle="#111",g.fillRect(0,34,E,4),g.font="bold 10px monospace",g.fillText("SCUOLABUS",30,50),di(g,E,A,w,"rgba(90,50,20,0.6)",5)}),m=At(16,32,(g,E,A,w)=>{g.fillStyle="#3b2c1e",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#2a1f15","#4a3828"],120)}),p=At(32,32,(g,E,A,w)=>{g.fillStyle="#1f3a1e",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#15281a","#2b4d24","#183020"],300)}),x=At(32,32,(g,E,A,w)=>{g.fillStyle="#4b5237",g.fillRect(0,0,E,A),di(g,E,A,w,"rgba(35,40,25,0.9)",7),di(g,E,A,w,"rgba(110,98,66,0.8)",5),Rt(g,E,A,w,["#3c4230","#585f40"],160)}),M=At(64,32,(g,E,A,w)=>{g.fillStyle="#5b4632",g.fillRect(0,0,E,A),Rt(g,E,A,w,["#4a3828","#6b5440"],260),g.fillStyle="rgba(0,0,0,0.35)";for(let C=4;C<E;C+=8)for(let S=4;S<A;S+=8)g.fillRect(C,S,2,2)});return{muro:i,piastrelle:e,parquet:t,soffitto:n,legno:r,porta:s,armadietti:o,terra:a,lavagna:c,metallo:l,legnoChiaro:u,linoleum:h,cemento:f,asfalto:d,rete:_,pulmino:v,corteccia:m,fogliame:p,mimetica:x,pannello:M}}function xr(i,{larghezza:e=128,altezza:t=64,sfondo:n=null,colore:r="#f2efe6",font:s="bold 14px monospace",bordo:o=null}={}){return At(e,t,a=>{n&&(a.fillStyle=n,a.fillRect(0,0,e,t)),o&&(a.strokeStyle=o,a.lineWidth=3,a.strokeRect(2,2,e-4,t-4)),a.fillStyle=r,a.font=s,a.textAlign="center",a.textBaseline="middle",i.forEach((c,l)=>a.fillText(c,e/2,(l+1)*t/(i.length+1)))},!1)}function ch(i,e){if(e===Vm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ic||e===Rf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Ic)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Yo extends kr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Iy(t)}),this.register(function(t){return new Py(t)}),this.register(function(t){return new ky(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new Ny(t)}),this.register(function(t){return new Oy(t)}),this.register(function(t){return new Dy(t)}),this.register(function(t){return new Uy(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new zy(t)}),this.register(function(t){return new Ly(t)}),this.register(function(t){return new By(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Wy(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=hs.extractUrlBase(e);o=hs.resolveURL(l,this.path)}else o=hs.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new sd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===fd){try{o[We.KHR_BINARY_GLTF]=new Xy(e)}catch(h){r&&r(h);return}s=JSON.parse(o[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new rS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case We.KHR_MATERIALS_UNLIT:o[h]=new Ry;break;case We.KHR_DRACO_MESH_COMPRESSION:o[h]=new jy(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:o[h]=new qy;break;case We.KHR_MESH_QUANTIZATION:o[h]=new Yy;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function Ty(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class wy{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new we(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Jt);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new _l(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ei(u),l.distance=h;break;case"spot":l=new cd(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Kn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class Ry{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return bt}extendParams(e,t,n){const r=[];e.color=new we(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Jt),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,Tt))}return Promise.all(r)}}class Cy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Iy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ae(a,a)}return Promise.all(s)}}class Py{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Ly{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Ny{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Jt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Tt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Oy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Dy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(a[0],a[1],a[2],Jt),Promise.all(s)}}class Uy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class zy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(a[0],a[1],a[2],Jt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Tt)),Promise.all(s)}}class Fy{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class By{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class ky{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Vy{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Hy{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Gy{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,r.mode,r.filter),d})})}else return null}}class Wy{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const l of r.primitives)if(l.mode!==hn.TRIANGLES&&l.mode!==hn.TRIANGLE_STRIP&&l.mode!==hn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const _ of h){const v=new Ue,m=new P,p=new Rn,x=new P(1,1,1),M=new PM(_.geometry,_.material,f);for(let g=0;g<f;g++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,g),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,g),c.SCALE&&x.fromBufferAttribute(c.SCALE,g),M.setMatrixAt(g,v.compose(m,p,x));for(const g in c)if(g==="_COLOR_0"){const E=c[g];M.instanceColor=new Dc(E.array,E.itemSize,E.normalized)}else g!=="TRANSLATION"&&g!=="ROTATION"&&g!=="SCALE"&&_.geometry.setAttribute(g,c[g]);ft.prototype.copy.call(M,_),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const fd="glTF",ts=12,lh={JSON:1313821514,BIN:5130562};class Xy{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ts),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==fd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-ts,s=new DataView(e,ts);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===lh.JSON){const l=new Uint8Array(e,ts+o,a);this.content=n.decode(l)}else if(c===lh.BIN){const l=ts+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class jy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=Fc[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=Fc[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=Ar[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){r.decodeDracoFile(u,function(d){for(const _ in d.attributes){const v=d.attributes[_],m=c[_];m!==void 0&&(v.normalized=m)}h(d)},a,l,Jt,f)})})}}class qy{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Yy{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class dd extends Cs{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,h=(n-t)/u,f=h*h,d=f*h,_=e*l,v=_-l,m=-2*d+3*f,p=d-f,x=1-m,M=p-f+h;for(let g=0;g!==a;g++){const E=o[v+g+a],A=o[v+g+c]*u,w=o[_+g+a],C=o[_+g]*u;s[g]=x*E+M*A+m*w+p*C}return s}}const $y=new Rn;class Ky extends dd{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return $y.fromArray(s).normalize().toArray(s),s}}const hn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ar={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uh={9728:It,9729:on,9984:_f,9985:mo,9986:rs,9987:Jn},hh={33071:_i,33648:Po,10497:Ei},Ua={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Fc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},pi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Zy={CUBICSPLINE:void 0,LINEAR:bs,STEP:As},za={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Jy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Et({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ni})),i.DefaultMaterial}function Oi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Kn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Qy(i,e,t){let n=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(r){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function eS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function tS(i){let e;const t=i.extensions&&i.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fa(t.attributes):e=i.indices+":"+Fa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Fa(i.targets[n]);return e}function Fa(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Bc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function nS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const iS=new Ue;class rS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ty,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new od(this.options.manager):this.textureLoader=new ly(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Oi(s,a,r),Kn(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(hs.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=Ua[r.type],a=Ar[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new Zt(l,o,c))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Ua[r.type],l=Ar[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,_=r.normalized===!0;let v,m;if(d&&d!==h){const p=Math.floor(f/d),x="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let M=t.cache.get(x);M||(v=new l(a,p*d,r.count*d/u),M=new qf(v,d/u),t.cache.add(x,M)),m=new Ts(M,c,f%d/u,_)}else a===null?v=new l(r.count*c):v=new l(a,f,r.count*c),m=new Zt(v,c,_);if(r.sparse!==void 0){const p=Ua.SCALAR,x=Ar[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,g=r.sparse.values.byteOffset||0,E=new x(o[1],M,r.sparse.count*p),A=new l(o[2],g,r.sparse.count*c);a!==null&&(m=new Zt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,C=E.length;w<C;w++){const S=E[w];if(m.setX(S,A[w*c]),c>=2&&m.setY(S,A[w*c+1]),c>=3&&m.setZ(S,A[w*c+2]),c>=4&&m.setW(S,A[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=uh[f.magFilter]||on,u.minFilter=uh[f.minFilter]||Jn,u.wrapS=hh[f.wrapS]||Ei,u.wrapT=hh[f.wrapT]||Ei,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==It&&u.minFilter!==on,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=r.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let _=f;t.isImageBitmapLoader===!0&&(_=function(v){const m=new Pt(v);m.needsUpdate=!0,f(m)}),t.load(hs.resolveURL(h,s.path),_,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Kn(h,o),h.userData.mimeType=o.mimeType||nS(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Zf,Cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new ll,Cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Et}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[We.KHR_MATERIALS_UNLIT]){const h=r[We.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Jt),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Tt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=dn);const u=s.alphaMode||za.OPAQUE;if(u===za.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===za.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==bt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ae(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==bt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==bt){const h=s.emissiveFactor;a.emissive=new we().setRGB(h[0],h[1],h[2],Jt)}return s.emissiveTexture!==void 0&&o!==bt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Tt)),Promise.all(l).then(function(){const h=new o(a);return s.name&&(h.name=s.name),Kn(h,s),t.associations.set(h,{materials:e}),s.extensions&&Oi(r,h,s),h})}createUniqueName(e){const t=rt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return fh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=tS(l),h=r[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[We.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=fh(new Ut,l,t),r[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?Jy(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,_=u.length;d<_;d++){const v=u[d],m=o[d];let p;const x=l[d];if(m.mode===hn.TRIANGLES||m.mode===hn.TRIANGLE_STRIP||m.mode===hn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new RM(v,x):new Me(v,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===hn.TRIANGLE_STRIP?p.geometry=ch(p.geometry,Rf):m.mode===hn.TRIANGLE_FAN&&(p.geometry=ch(p.geometry,Ic));else if(m.mode===hn.LINES)p=new LM(v,x);else if(m.mode===hn.LINE_STRIP)p=new Ho(v,x);else if(m.mode===hn.LINE_LOOP)p=new NM(v,x);else if(m.mode===hn.POINTS)p=new OM(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&eS(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Kn(p,s),m.extensions&&Oi(r,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,_=h.length;d<_;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&Oi(r,h[0],s),h[0];const f=new St;s.extensions&&Oi(r,f,s),t.associations.set(f,{meshes:e});for(let d=0,_=h.length;d<_;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(Lc.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new rl(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new Ue;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new cl(a,c)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=r.channels.length;h<f;h++){const d=r.channels[h],_=r.samplers[d.sampler],v=d.target,m=v.node,p=r.parameters!==void 0?r.parameters[_.input]:_.input,x=r.parameters!==void 0?r.parameters[_.output]:_.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(_),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],_=h[2],v=h[3],m=h[4],p=[];for(let x=0,M=f.length;x<M;x++){const g=f[x],E=d[x],A=_[x],w=v[x],C=m[x];if(g===void 0)continue;g.updateMatrix&&g.updateMatrix();const S=n._createAnimationTracks(g,E,A,w,C);if(S)for(let y=0;y<S.length;y++)p.push(S[y])}return new zc(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,iS)});for(let d=0,_=h.length;d<_;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new $f:l.length>1?u=new St:l.length===1?u=l[0]:u=new ft,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=o),Kn(u,s),s.extensions&&Oi(n,u,s),s.matrix!==void 0){const h=new Ue;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new St;n.name&&(s.name=r.createUniqueName(n.name)),Kn(s,n),n.extensions&&Oi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of r.associations)(f instanceof Cn||f instanceof Pt)&&h.set(f,d);return u.traverse(f=>{const d=r.associations.get(f);d!=null&&h.set(f,d)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,c=[];pi[s.path]===pi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(pi[s.path]){case pi.weights:l=Or;break;case pi.rotation:l=Dr;break;case pi.position:case pi.scale:l=Ur;break;default:switch(n.itemSize){case 1:l=Or;break;case 2:case 3:default:l=Ur;break}break}const u=r.interpolation!==void 0?Zy[r.interpolation]:bs,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const _=new l(c[f]+"."+pi[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Bc(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof Dr?Ky:dd;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function sS(i,e,t){const n=e.attributes,r=new ri;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=Bc(Ar[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new P,c=new P;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,_=f.max;if(d!==void 0&&_!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(_[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(_[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(_[2]))),f.normalized){const v=Bc(Ar[f.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new Un;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function fh(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Fc[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return je.workingColorSpace!==Jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),Kn(i,e),sS(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?Qy(i,e.targets,t):i})}const oS="./modelli/armi.glb",aS="./modelli/aliene.glb",cS="Bayonet",lS=new we(10312959),uS=new we(3803760);function hS(i){return i.map?{metalness:.55,roughness:.4}:/Wood/i.test(i.name)?{metalness:0,roughness:.62}:/Glass/i.test(i.name)?{metalness:.3,roughness:.08}:/Metal|Main|Black|Grey/i.test(i.name)?{metalness:.75,roughness:.38}:{metalness:.1,roughness:.6}}function fS(i){const e=new Et({name:i.name,color:i.color.clone(),map:i.map??null,emissive:i.emissiveMap?new we(16777215):new we(0),emissiveMap:i.emissiveMap??null,flatShading:!0,...hS(i)});for(const t of[e.map,e.emissiveMap])t&&(t.anisotropy=4,t.needsUpdate=!0);return e}async function dh(i,e){const t=await new Yo().loadAsync(i),n=new Map;for(const r of[...t.scene.children])r.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>(n.has(a)||n.set(a,fS(a)),n.get(a)));s.material=Array.isArray(s.material)?o:o[0]}),e.set(r.name,r)}async function dS(){const i=new Map;return await Promise.all([dh(oS,i),dh(aS,i)]),i}function pS(i,e){return{libreria:e,varianti:new Map,guanto:new Et({color:2369322,roughness:.85}),nocche:new Et({color:3817284,roughness:.7}),manica:new Et({map:i.mimetica??null,color:i.mimetica?16777215:4870710,roughness:.95}),polsino:new Et({color:1776927,roughness:.9})}}function mS(i,e,t,n){const r=`${e.uuid}|${t}`;return i.varianti.has(r)||i.varianti.set(r,n(e.clone())),i.varianti.get(r)}function gS(i,e,t){const n=e.colore!==void 0?new we(e.colore):null,r=`${e.colore??"vera"}|${e.potenziata?"p":""}`;!n&&!e.potenziata||i.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>mS(t,a,r,c=>(n&&(c.emissive.copy(n).multiplyScalar(e.potenziata?1.6:1.1),c.color.lerp(n,.18)),e.potenziata&&(c.color.lerp(lS,n?.25:.45),n||c.emissive.copy(uS)),c)));s.material=Array.isArray(s.material)?o:o[0]})}function br(i,e){const t=i==="coltello"?{modello:cS}:xt[i]??xt[ps(i)],n=e.libreria.get(t.modello),r=n.clone();r.position.set(0,0,0),r.rotation.set(0,0,0),i!=="coltello"&&gS(r,t,e);const s=n.userData,o=new P().fromArray(s.bocca??[0,.03,-.3]),a=s.presa?new P().fromArray(s.presa):null;return{gruppo:r,bocca:o,presa:a,lunghezza:s.lunghezza??.5,colore:t.colore??null}}function Bi(i,e,t,n,r){const s=new P(...n),o=new P(...r),a=new Me(new fl(t,s.distanceTo(o),3,8),e);return a.position.copy(s).add(o).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new P(0,1,0),o.clone().sub(s).normalize()),i.add(a),a}function pd(i,e,t,n){const r=new P(...t),s=new P(...n),o=s.clone().sub(r),a=new Me(new An(.036,.03,o.length(),10),e.manica);a.position.copy(r).add(s).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new P(0,1,0),o.clone().normalize());const c=new Me(new An(.031,.031,.04,10),e.polsino);c.position.copy(r).addScaledVector(o.clone().normalize(),.02),c.quaternion.copy(a.quaternion),i.add(a,c)}function _S(i){const e=new St;Bi(e,i.guanto,.026,[.012,-.03,.032],[.008,-.075,.05]);for(let t=0;t<4;t++){const n=-.03-t*.014;Bi(e,i.guanto,.0085,[.026,n,.03],[.012,n-.004,-.004]),Bi(e,i.nocche,.0082,[.012,n-.004,-.004],[-.014,n-.006,.006])}return Bi(e,i.guanto,.0095,[-.012,-.012,.048],[-.014,-.004,.01]),pd(e,i,[.01,-.085,.07],[.07,-.22,.36]),e}function vS(i){const e=new St;Bi(e,i.guanto,.025,[-.012,-.03,.03],[-.006,-.03,-.02]);for(let t=0;t<4;t++){const n=.012-t*.015;Bi(e,i.guanto,.0085,[.006,-.032,n],[.024,-.008,n-.004])}return Bi(e,i.guanto,.009,[-.024,-.02,.02],[-.026,.004,-.012]),pd(e,i,[-.02,-.05,.04],[-.1,-.26,.22]),e}const $n=ms,ph=.9,mh=2.3,ns=2.4,xS=Object.freeze([[0,0,!0,16765594],[0,14,!0,16765594],[12,0,!1,16765594],[20,0,!0,16765594],[-9,17,!1,16769968],[3,27,!1,14217471],[22,-10.5,!0,16738880]]),gh=16,MS=17,yS=Object.freeze([[17,20,12375295],[10.5,27.5,13163775]]),SS=Object.freeze({banco:"legnoChiaro",tavolo:"legnoChiaro",bancone:"metallo",cavallina:"legno"});function md(i,e,t,n,r=0){const s=new sn(i,e,t),o=s.attributes.uv,a=[[t,e],[t,e],[i,t],[i,t],[i,e],[i,e]],c=new Set([0,1,4,5]);for(let l=0;l<6;l++){const u=c.has(l)?r/n:0;for(let h=0;h<4;h++){const f=l*4+h;o.setXY(f,o.getX(f)*a[l][0]/n,o.getY(f)*a[l][1]/n+u)}}return s}function Sn(i,e,t,n,r,s=$n){const o=new Me(md(t.x1-t.x0,r-n,t.z1-t.z0,s,n),e);return o.position.set((t.x0+t.x1)/2,(n+r)/2,(t.z0+t.z1)/2),i.add(o),o}function Ba(i,e,t,n,r,s,o,a,c=!1){const l=new rn(r-t,s-n).rotateX(c?Math.PI/2:-Math.PI/2),u=l.attributes.uv;for(let f=0;f<u.count;f++)u.setXY(f,u.getX(f)*(r-t)/a,u.getY(f)*(s-n)/a);const h=new Me(l,e);return h.position.set((t+r)/2,o,(n+s)/2),i.add(h),h}function is(i,e){i.rotation.y=Math.atan2(e.x,e.z)}function AS(i,e,t,n,r){const s=(R,X={})=>new Et({...r[R],metalness:0,...X}),o={muro:s("muro"),soffitto:s("soffitto"),piastrelle:s("piastrelle"),parquet:s("parquet"),legno:s("legno"),legnoChiaro:s("legnoChiaro"),porta:s("porta"),armadietti:new Et({map:e.armadietti,metalness:.4,roughness:.6}),terra:s("terra"),linoleum:s("linoleum"),cemento:s("cemento"),asfalto:s("asfalto"),rete:new Et({map:e.rete,transparent:!0,alphaTest:.4,side:dn,metalness:.6,roughness:.5}),palo:new Et({color:5922918,metalness:.7,roughness:.45}),corteccia:new Et({map:e.corteccia,roughness:1}),metallo:s("metallo",{metalness:.55})},a=hd(77);Ba(i,o.terra,-60,-60,80,80,-.02,4);for(const R of kc)Ba(i,o[R.pavimento],R.x0,R.z0,R.x1,R.z1,0,R.aperto?4:2),R.aperto||Ba(i,o.soffitto,R.x0,R.z0,R.x1,R.z1,$n,2,!0);for(const R of Vc)Sn(i,o.muro,R,0,$n);for(const R of Vh){Sn(i,o.rete,R,0,Ns,1);const X=Math.max(R.x1-R.x0,R.z1-R.z0);for(let K=0;K<=X;K+=3){const ee=new Me(new An(.05,.05,Ns+.2,5),o.palo);ee.position.set(R.x1-R.x0>R.z1-R.z0?R.x0+K:(R.x0+R.x1)/2,(Ns+.2)/2,R.x1-R.x0>R.z1-R.z0?(R.z0+R.z1)/2:R.z0+K),i.add(ee)}}const c=new Me(new Xo(6,16),new bt({color:14674165,fog:!1}));c.position.set(-60,70,120),c.lookAt(0,0,0),i.add(c);const l=new Map;for(const R of On){const X=R.recinzione?.15:ph,K=R.recinzione?Ns-.2:mh;R.recinzione||(Sn(i,o.muro,R.scatola,0,ph),Sn(i,o.muro,R.scatola,mh,$n));const ee=R.asse==="z"?R.scatola.x1-R.scatola.x0:R.scatola.z1-R.scatola.z0,ne=[];for(let Te=0;Te<se.ASSE_PER_FINESTRA;Te++){const H=new Me(md(ee+.35,.17,.05,1),o.legno),Y=X+.15+Te*(K-X-.3)/(se.ASSE_PER_FINESTRA-1);H.position.set(R.centro.x+R.fuori.x*.2,Y,R.centro.z+R.fuori.z*.2),H.rotation.y=R.asse==="z"?0:Math.PI/2,H.rotation.z=(a()-.5)*.5,i.add(H),ne.push(H)}l.set(R.id,ne)}const u=new Map;for(const R of Wi){Sn(i,o.muro,R.scatola,ns,$n);const X=Sn(i,o.porta,R.scatola,0,ns,ns);u.set(R.id,{anta:X,apertura:0})}for(const R of Hc)if(R.tipo==="tribuna")for(let X=0;X<3;X++){const K=(R.z1-R.z0)/3;Sn(i,o.legnoChiaro,{x0:R.x0,x1:R.x1,z0:R.z1-K*(X+1),z1:R.z1-K*X},0,R.altezza*((3-X)/3),1)}else if(R.tipo==="albero"){const X=(R.x0+R.x1)/2,K=(R.z0+R.z1)/2,ee=new Me(new An(.12,.3,4.2,9),o.corteccia);ee.position.set(X,2.1,K),i.add(ee);for(const[ne,Te,H]of[[.4,2.6,1.6],[2.5,3.1,1.3],[4.3,3.5,1.1],[1.6,3.8,.9]]){const Y=new Me(new An(.03,.08,H,6),o.corteccia);Y.position.set(X+Math.cos(ne)*H*.4,Te+H*.3,K+Math.sin(ne)*H*.4),Y.rotation.set(Math.sin(ne)*.9,0,-Math.cos(ne)*.9),i.add(Y)}}else if(R.tipo==="pulmino"){const X=n.get("covered_car").clone();X.position.set((R.x0+R.x1)/2,0,(R.z0+R.z1)/2),X.rotation.y=Math.PI/2,X.scale.setScalar(1.2),i.add(X)}else{if(R.tipo==="banco")continue;if(R.tipo==="lampione")Sn(i,o.palo,R,0,R.altezza+1.5,1);else if(R.tipo==="panchina")Sn(i,o.legno,R,.3,R.altezza,1);else if(R.tipo==="caldaia"){const X=Math.min(R.x1-R.x0,R.z1-R.z0)/2,K=new Me(new An(X,X,R.altezza,10),o.metallo);K.position.set((R.x0+R.x1)/2,R.altezza/2,(R.z0+R.z1)/2);const ee=new Me(new An(.15,.15,$n-R.altezza,6),o.metallo);ee.position.set(K.position.x,R.altezza+($n-R.altezza)/2,K.position.z);const ne=new Me(new rn(.5,.3),new bt({color:16734746}));ne.position.set(K.position.x+X+.01,.6,K.position.z),ne.rotation.y=Math.PI/2,i.add(K,ee,ne)}else Sn(i,o[SS[R.tipo]??"legno"],R,0,R.altezza,1)}for(const[R,X,K,ee]of[[-1.85,-1.7,6.6,9.3],[-1.85,-1.7,10.8,16.4],[1.7,1.85,6.6,12.4],[1.7,1.85,15.6,21.4]])Sn(i,o.armadietti,{x0:R,x1:X,z0:K,z1:ee},0,1.9,1.9);const h=new Me(new rn(2.4,1.2),new Et({map:e.lavagna,roughness:.9}));h.position.set(4,1.6,5.83),h.rotation.y=Math.PI,i.add(h);for(const R of Zn){const{x:X,z:K}=R.posizione;if(R.tipo==="arma"){const ee=new St;ee.position.set(X,0,K),is(ee,R.verso);const{gruppo:ne,lunghezza:Te}=br(R.arma,t);ne.rotation.y=Math.PI/2,ne.position.set(-Te*.12,1.55,.08);const H=new Me(new rn(Math.max(.7,Te+.25),.62),o.legno);H.position.set(0,1.5,.012);const Y=new Me(new rn(1,.22),new bt({map:xr([xt[R.arma].nome.toUpperCase(),`${R.costo}`],{larghezza:160,altezza:36,colore:"#ecebe2",font:"bold 12px monospace"}),transparent:!0}));Y.position.set(0,1.08,.015),ee.add(H,ne,Y),i.add(ee)}else if(R.tipo==="bevanda"){const ee=Gi[R.bevanda],ne=new St,Te=new Me(new sn(.95,2,.65),new Et({color:new we(ee.colore).multiplyScalar(.55),metalness:.5,roughness:.35}));Te.position.y=1;const H=new Me(new rn(.8,1.2),new bt({map:xr([ee.nome.split(" ")[0].toUpperCase(),ee.nome.split(" ")[1].toUpperCase(),`${ee.costo}`],{larghezza:64,altezza:96,sfondo:`#${ee.colore.toString(16).padStart(6,"0")}`,font:"bold 12px monospace",bordo:"#111"})}));H.position.set(0,1.2,.33),ne.add(Te,H),ne.position.set(X,0,K),is(ne,R.verso),i.add(ne)}}const f=Zn.find(R=>R.tipo==="interruttore"),d=new St,_=new Me(new sn(.6,.8,.15),o.metallo),v=new Me(new An(.03,.03,.35,8),new Et({color:12067867,roughness:.4}));v.position.set(0,.12,.12);const m=new Me(new jo(.05,8,6),new bt({color:12067867}));m.position.set(.2,.3,.09),d.add(_,v,m),d.position.set(f.posizione.x,1.4,f.posizione.z),is(d,f.verso),i.add(d);const p=Zn.find(R=>R.tipo==="potenziatore"),x=new St,M=new Me(new sn(1.6,1.9,1.15),s("metallo",{color:9406120,metalness:.65}));M.position.y=.95;const g=new Me(new rn(1.2,.45),new bt({map:xr(["POTENZIATORE",`${se.COSTO_POTENZIA}`],{larghezza:128,altezza:48,sfondo:"#1a0b2e",colore:"#d6b8ff",font:"bold 12px monospace",bordo:"#7d3cff"})}));g.position.set(0,1.55,.58);const E=new Me(new ml(.35,.04,6,18),new bt({color:3809376}));E.position.set(0,.9,.6);const A=new ei(10771711,0,5,1.5);A.position.set(0,1.4,1),x.add(M,g,E,A),x.position.set(p.posizione.x,0,p.posizione.z),is(x,p.verso),i.add(x);const w=new Map;let C=null;const S=Zn.find(R=>R.tipo==="cassa"),y=new St,N=n.get("old_military_crate").clone();N.scale.setScalar(.62);const k=new St;k.position.set(0,.56,-.3);const L=new Me(new rn(.3,.3),new bt({map:xr(["?"],{larghezza:32,altezza:32,colore:"#7dd3fc",font:"bold 28px monospace"}),transparent:!0}));L.position.set(0,.6,.05);const D=new ei(8246268,0,4,1.5);D.position.set(0,1,.3),y.add(N,k,L,D),y.position.set(S.posizione.x,0,S.posizione.z),is(y,S.verso),i.add(y);const q=new Map;let j=null;const ie=xS.map(([R,X,K,ee])=>{const ne=new ei(ee,gh,MS,1.5);ne.position.set(R,$n-.4,X);const Te=new Me(new sn(1.2,.06,.3),new bt({color:16773583}));return Te.position.set(R,$n-.04,X),i.add(ne,Te),{luce:ne,plafoniera:Te,tremola:K,base:gh}});for(const[R,X,K]of yS){const ee=new ei(K,24,22,1.3);ee.position.set(R,4.3,X);const ne=new Me(new sn(.5,.15,.5),new bt({color:15266047}));ne.position.set(R,4.55,X),i.add(ee,ne)}return{aggiorna(R,X,K){for(const Y of On)l.get(Y.id).forEach((ue,ce)=>{ue.visible=ce<R.finestre[Y.id]});for(const Y of Wi){const ue=u.get(Y.id);R.porte.has(Y.id)&&(ue.apertura=Math.min(1,ue.apertura+X*1.5)),ue.anta.position.y=ns/2+ue.apertura*ns,ue.anta.visible=ue.apertura<1}for(const Y of ie){const ue=Y.tremola&&Math.sin(K*13.7+Y.luce.position.x)>.93;Y.luce.intensity=ue?.6:Y.base,Y.plafoniera.material.color.setHex(ue?2762272:16773583)}v.rotation.x=Lc.lerp(v.rotation.x,R.corrente?-2.4:0,Math.min(1,X*5)),m.material.color.setHex(R.corrente?3997546:12067867);const ee=R.potenziatore.stato==="lavora";E.material.color.setHex(R.corrente?ee?14725375:10771711:3809376),E.rotation.z+=X*(ee?9:R.corrente?1:0),A.intensity=R.corrente?ee?6+Math.sin(K*20)*3:2.5:0;const ne=R.potenziatore.stato==="pronta"?R.potenziatore.arma:null;if(C!==ne){if(w.forEach(Y=>{Y.visible=!1}),ne){if(!w.has(ne)){const{gruppo:Y}=br(ne,t);Y.scale.setScalar(1.2),x.add(Y),w.set(ne,Y)}w.get(ne).visible=!0}C=ne}if(ne){const Y=w.get(ne);Y.position.set(0,2.25+Math.sin(K*2)*.05,.2),Y.rotation.y=K*1.8}const Te=R.cassa.stato==="aperta";k.rotation.x=Lc.lerp(k.rotation.x,Te?-1.3:0,Math.min(1,X*6)),D.intensity=Te?3+Math.sin(K*6):.6;const H=Te?R.cassa.arma:null;if(j!==H){if(q.forEach(Y=>{Y.visible=!1}),H){if(!q.has(H)){const{gruppo:Y}=br(H,t);Y.scale.setScalar(1.15),y.add(Y),q.set(H,Y)}q.get(H).visible=!0}j=H}if(H){const Y=q.get(H);Y.position.set(0,1.15+Math.sin(K*2)*.05,0),Y.rotation.y=K*1.5}}}}const bS=.25,_h=2.6,So=Object.freeze([{tinta:16777215,scala:1},{tinta:13095359,scala:.95},{tinta:14733263,scala:1.06},{tinta:10721940,scala:1.02}]),Mr=Object.freeze({normale:{url:"./modelli/zombie.glb",scala:.01,varianti:!0,clip:{cammina:"cammina",cammina2:"cammina2",corre:"corre",attacco:"attacco",attacco2:"attacco2",muore:"muore",fermo:"fermo"},velocita:{cammina:1,cammina2:.9,corre:1.05,attacco:1.6,attacco2:1.7,muore:1.2,fermo:1}},magro:{url:"./modelli/zombi_magro.glb",scala:.25,clip:{cammina:"walk",cammina2:"walk2",corre:"run",attacco:"attack2",attacco2:"attack1_r",muore:"dead1",fermo:"idle"},velocita:{},riserva:{tinta:10252902,scala:.94}}});function ES(i){i.traverse(e=>{if(e.isMesh){e.frustumCulled=!1;for(const t of[].concat(e.material))t.map&&(t.map.anisotropy=4,t.map.needsUpdate=!0)}})}function TS(i,e){return e.map(t=>{const n=new Map;return i.traverse(r=>{if(r.isMesh)for(const s of[].concat(r.material)){if(n.has(s))continue;const o=s.clone();o.color=new we(t),n.set(s,o)}}),n})}async function wS(){const i=new Map,e=n=>(i.has(n)||i.set(n,new Yo().loadAsync(n)),i.get(n)),t=new Map;return await Promise.all(Object.entries(Mr).map(async([n,r])=>{let s=r,o;try{o=await e(r.url)}catch(c){if(!r.riserva)throw c;o=await e(Mr.normale.url),s={...Mr.normale,varianti:!1,tinta:r.riserva.tinta,scala:Mr.normale.scala*r.riserva.scala}}ES(o.scene);const a=s.varianti?So.map(c=>c.tinta):[s.tinta??null];t.set(n,{dati:s,modello:o.scene,clip:new Map(o.animations.map(c=>[c.name,c])),materialiVariante:a[0]===null?null:TS(o.scene,a)})})),t}function RS(i,e){return i.stato==="morto"?"muore":i.stato==="assi"?"attacco":i.stato==="attacco"?"attacco2":i.stato==="dentro"&&!e?"fermo":i.corre?"corre":i.variante%2?"cammina2":"cammina"}function CS(i,e){const t=new Map;function n(o){const a=e.get(o.tipo)??e.get("normale"),{dati:c}=a,l=new St,u=Uo(a.modello),h=c.varianti?So[o.variante%So.length]:{scala:1};if(u.scale.setScalar(c.scala*h.scala),a.materialiVariante){const m=a.materialiVariante[c.varianti?o.variante%So.length:0];u.traverse(p=>{p.isMesh&&(p.material=Array.isArray(p.material)?p.material.map(x=>m.get(x)??x):m.get(p.material)??p.material)})}u.traverse(m=>{m.isSkinnedMesh&&(m.frustumCulled=!0,m.computeBoundingSphere(),m.boundingSphere.radius*=1.8)}),l.add(u),i.add(l);let f=null;u.traverse(m=>{!f&&m.isBone&&/head$/i.test(m.name)&&(f=m)});const d=new ld(u),_=new Map;for(const[m,p]of Object.entries(c.clip)){const x=a.clip.get(p);if(!x)continue;const M=d.clipAction(x);M.timeScale=c.velocita[m]??1,m==="muore"&&(M.setLoop(wf,1),M.clampWhenFinished=!0),_.set(m,M)}const v={radice:l,corpo:u,testa:f,mixer:d,azioni:_,dati:c,attuale:null,ultimaPosizione:new ae(o.x,o.z),tempoMorto:0,fase:Math.random()*3};return t.set(o.id,v),v}function r(o,a){const c=o.azioni.has(a)?a:a==="cammina2"?"cammina":a==="attacco2"?"attacco":a;if(o.attuale===c)return;const l=o.azioni.get(c);if(!l)return;const u=o.azioni.get(o.attuale);l.reset(),c!=="muore"&&(l.time=o.fase),l.play(),u&&u.crossFadeTo(l,bS,!1),o.attuale=c}function s(o){const a=t.get(o);a&&(i.remove(a.radice),a.mixer.stopAllAction(),a.mixer.uncacheRoot(a.corpo),a.corpo.traverse(c=>{var l;return(l=c.skeleton)==null?void 0:l.dispose()}),t.delete(o))}return{aggiorna(o,a){const c=new Set;for(const l of o.zombie){c.add(l.id);const u=t.get(l.id)??n(l),h=Math.hypot(l.x-u.ultimaPosizione.x,l.z-u.ultimaPosizione.y);u.ultimaPosizione.set(l.x,l.z),r(u,RS(l,h>.2*a)),u.radice.position.set(l.x,0,l.z),u.radice.rotation.y=l.yaw,l.stato==="morto"?(u.tempoMorto+=a,u.tempoMorto>_h&&(u.radice.position.y=-(u.tempoMorto-_h)*.6)):u.tempoMorto=0,u.mixer.update(a)}for(const l of[...t.keys()])c.has(l)||s(l)},bersagli(o){const a=new P;return o.zombie.filter(c=>c.stato!=="morto").map(c=>{const l=t.get(c.id),u=Mr[c.tipo]??Mr.normale,h={id:c.id,x:c.x,z:c.z,alto:u.alto,raggio:u.raggio};return l!=null&&l.testa?(l.testa.getWorldPosition(a),{...h,testa:{x:a.x,y:a.y+.06,z:a.z}}):{...h,testa:{x:c.x,y:u.testa??Wa.altezza,z:c.z}}})},posizioneTesta(o){const a=t.get(o);return a!=null&&a.testa?a.testa.getWorldPosition(new P):null},svuota(){for(const o of[...t.keys()])s(o)}}}const IS=Object.freeze(["./modelli/soldato.glb"]),PS=.2;function vh(i,e){const t=new Vo(new Rs({map:xr([i],{larghezza:128,altezza:32,colore:e,font:"bold 16px monospace"}),depthTest:!1,transparent:!0}));return t.scale.set(1.4,.35,1),t.renderOrder=20,t}async function LS(){return Promise.all(IS.map(async i=>{const e=await new Yo().loadAsync(i);return e.scene.traverse(t=>{t.isMesh&&(t.frustumCulled=!1)}),{modello:e.scene,clip:new Map(e.animations.map(t=>[t.name,t]))}}))}function NS(i,e,t,n){const r=new St,s=new St,o=Uo(n.modello);o.rotation.y=Math.PI;let a=null;o.traverse(x=>{!a&&x.isBone&&/RightHand$/.test(x.name)&&(a=x)}),s.add(o),r.add(s);const c=new St;r.add(c);const l=new ld(o),u=new Map;for(const[x,M]of Object.entries({fermo:"Idle",cammina:"Walk",corre:"Run"})){const g=n.clip.get(M);g&&u.set(x,l.clipAction(g))}let h=null;const f=new Map;let d=null;const _=vh(e,"#e8f4ff");_.position.y=2.3;const v=vh(`▼ ${e} A TERRA`,"#ff5a4e");v.position.y=1.2,v.visible=!1,r.add(_,v),i.add(r);const m=new P;function p(x){var g;if(h===x||!u.has(x))return;const M=u.get(x);M.reset().play(),(g=u.get(h))==null||g.crossFadeTo(M,PS,!1),h=x}return{aggiorna(x,M){r.visible=x.stato!=="morto",r.position.set(x.x,0,x.z),r.rotation.y=x.yaw;const g=x.stato==="terra";if(p(g?"fermo":x.inMovimento?x.corsa?"corre":"cammina":"fermo"),l.update(M),s.rotation.x=g?-Math.PI/2:0,s.position.y=g?.25:0,_.visible=!g,v.visible=g,c.visible=!g,d!==x.armaAttiva){if(f.forEach(E=>{E.visible=!1}),!f.has(x.armaAttiva)){const{gruppo:E}=br(x.armaAttiva,t);E.rotation.y=Math.PI,c.add(E),f.set(x.armaAttiva,E)}f.get(x.armaAttiva).visible=!0,d=x.armaAttiva}a?(r.updateMatrixWorld(!0),a.getWorldPosition(m),r.worldToLocal(m),c.position.copy(m)):c.position.set(.15,1.3,.35),c.rotation.x=-x.pitch},chiudi(){i.remove(r),l.stopAllAction(),l.uncacheRoot(o),o.traverse(x=>{var M;return(M=x.skeleton)==null?void 0:M.dispose()}),_.material.map.dispose(),_.material.dispose(),v.material.map.dispose(),v.material.dispose()}}}const OS="./modelli/arredi.glb";async function DS(){const i=await new Yo().loadAsync(OS),e=new Map;for(const t of[...i.scene.children])t.traverse(n=>{n.isMesh&&(n.castShadow=!1,n.receiveShadow=!1)}),e.set(t.name,t);return e}function US(i,e){for(const t of Gh){const n=e.get(t.modello);if(!n)continue;const r=n.clone();r.position.set(t.x,0,t.z),r.rotation.y=t.rot??0,t.scala&&r.scale.setScalar(t.scala),i.add(r)}}function zS(i,e,t,n){return new Me(new rn(e,t),new bt({map:xr(i,n),transparent:!0}))}function FS(i){const e=zS(["SALA D'ATTESA","","ASPETTATE IL VOSTRO AMICO","","INVIO: SONO PRONTO"],3.6,2.2,{larghezza:512,altezza:320,sfondo:"#101418",colore:"#e9f2f7",font:"bold 30px sans-serif",bordo:"#2fb7a0"});e.position.set(Os.x,1.75,Os.z),e.rotation.y=Math.atan2(Os.verso.x,Os.verso.z),i.add(e);const t=new ei(16769712,16,18,1.4);t.position.set(-38,ms-.4,0);const n=new Me(new sn(1.4,.06,.35),new bt({color:16773583}));n.position.set(-38,ms-.04,0),i.add(t,n)}function BS(i){const e=Tn[i],t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),r=`#${e.colore.toString(16).padStart(6,"0")}`,s=n.createRadialGradient(32,32,4,32,32,31);s.addColorStop(0,r),s.addColorStop(.55,`${r}99`),s.addColorStop(1,`${r}00`),n.fillStyle=s,n.fillRect(0,0,64,64),n.fillStyle="#0b0d10",n.beginPath(),n.arc(32,32,17,0,Math.PI*2),n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke(),n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.font=`bold ${e.simbolo.length>2?11:18}px monospace`,n.fillText(e.simbolo,32,33);const o=new Go(t);return o.magFilter=It,o.colorSpace=Tt,o}function kS(i){const e=new Map(Object.keys(Tn).map(r=>[r,new Rs({map:BS(r),transparent:!0,depthWrite:!1})])),t=new Map;let n=0;return{aggiorna(r,s){n+=s;const o=new Set;for(const a of r.bonus??[]){if(o.add(a.id),!t.has(a.id)){const l=new Vo(e.get(a.tipo));l.scale.setScalar(.7),i.add(l),t.set(a.id,l)}const c=t.get(a.id);c.position.set(a.x,.9+Math.sin(n*3+a.id)*.12,a.z),c.visible=a.timer>5||Math.sin(n*18)>0}for(const[a,c]of t)o.has(a)||(i.remove(c),t.delete(a))},svuota(){for(const r of t.values())i.remove(r);t.clear()}}}function VS(i){const e=new Et({color:2898730,emissive:3800938,emissiveIntensity:.9,roughness:.4,metalness:.3,flatShading:!0}),t=ki.map(f=>{const d=new Me(new pl(.09,0),e);return d.position.set(f.x,f.y,f.z),d.scale.set(1,.75,1.2),i.add(d),d}),n=Zn.find(f=>f.tipo==="campanella"),r=[[0,.02],[.05,.03],[.07,.08],[.085,.16],[.13,.22],[.14,.24],[0,.24]].map(([f,d])=>new ae(f,-d)),s=new St,o=new Et({color:11569722,metalness:.85,roughness:.35}),a=new Me(new Wo(r,14),o);a.material.side=dn;const c=new Me(new An(.015,.015,.22,6).rotateX(Math.PI/2),new Et({color:2829099,metalness:.7,roughness:.5}));c.position.set(0,0,-.1);const l=new Me(new jo(.025,8,6),o);l.position.y=-.22,s.add(a,c,l),s.position.set(n.posizione.x,2.35,n.posizione.z+n.verso.z*.12),i.add(s);let u=0,h=0;return{suona(){u=1},aggiorna(f,d){h+=d;const _=new Set(f.frammenti??[]);t.forEach((v,m)=>{v.visible=f.fase!=="attesa"&&!_.has(ki[m].id),v.rotation.y+=d*1.5,v.position.y=ki[m].y+Math.sin(h*2+m)*.03}),e.emissiveIntensity=.6+Math.sin(h*4)*.35,u=Math.max(0,u-d*.6),s.rotation.x=Math.sin(h*14)*.5*u}}}const HS=220,GS=50;function WS(){const i=document.createElement("canvas");i.width=i.height=16;const e=i.getContext("2d");e.fillStyle="#fff",e.fillRect(4,4,8,8),e.fillRect(2,6,12,4),e.fillRect(6,2,4,12);const t=new Go(i);return t.magFilter=It,t.minFilter=It,t}const XS={sangue:{colore:9047309,vita:.6,gravita:-7,dimensione:.12,sparsa:2.4,additivo:!1},scintilla:{colore:16765562,vita:.25,gravita:-2,dimensione:.07,sparsa:3,additivo:!0},polvere:{colore:9208432,vita:.7,gravita:.4,dimensione:.18,sparsa:.8,additivo:!1},legno:{colore:7031339,vita:.9,gravita:-8,dimensione:.1,sparsa:2.5,additivo:!1},energia:{colore:6285823,vita:.45,gravita:.5,dimensione:.28,sparsa:4,additivo:!0},fuoco:{colore:16747050,vita:.55,gravita:1.2,dimensione:.34,sparsa:3.5,additivo:!0},fiamma:{colore:16742938,vita:.35,gravita:1.5,dimensione:.22,sparsa:.6,additivo:!0}},xh=Object.freeze({energia:6285823,fuoco:16747050,fulmine:14217471}),Mh=.14,yh=.18,jS=25;function qS(i){const e=WS(),t=[],n=[];for(let h=0;h<HS;h++){const f=new Vo(new Rs({map:e,transparent:!0,depthWrite:!1}));f.visible=!1,i.add(f),t.push({sprite:f,velocita:new P,vita:0,durata:1,tipo:null})}const r=[],s=new ei(6285823,0,9,1.4);i.add(s);let o=0;const a=[],c=new Xo(.35,6).rotateX(-Math.PI/2),l=new bt({color:4851206,transparent:!0,opacity:.85,depthWrite:!1});function u(h,f,d,_=null,v=null,m=.6){const p=XS[h];for(let x=0;x<d&&t.length;x++){const M=t.pop();M.tipo=p,M.vita=0,M.durata=p.vita*(.6+Math.random()*.8),M.velocita.set((Math.random()-.5)*p.sparsa,Math.random()*p.sparsa*.6,(Math.random()-.5)*p.sparsa),_&&M.velocita.addScaledVector(_,p.sparsa*m),M.sprite.position.copy(f),M.sprite.material.color.setHex(v??p.colore),M.sprite.material.blending=p.additivo?ys:Vi,M.sprite.scale.setScalar(p.dimensione),M.sprite.visible=!0,n.push(M)}}return{sangue(h,f){u("sangue",h,10,f)},impatto(h){u("scintilla",h,5),u("polvere",h,3)},schegge(h){u("legno",h,10)},raggio(h,f,d=8319231){const _=new Ut().setFromPoints([h,f]),v=new Ho(_,new ll({color:d,transparent:!0,blending:ys}));i.add(v),r.push({linea:v,vita:Mh})},esplosione(h,f="energia",d=null){const _=d??xh[f]??xh.energia;u(f==="fuoco"?"fuoco":"energia",h,f==="fuoco"?30:22,null,_),f==="fuoco"&&u("polvere",h,8),s.color.setHex(_),s.position.copy(h),o=yh},fiamma(h,f,d){u("fiamma",h,4,f,d,6)},macchia(h,f){const d=a.length>=GS?a.shift():new Me(c,l);d.position.set(h+(Math.random()-.5)*.4,.012+a.length*1e-4,f+(Math.random()-.5)*.4),d.scale.setScalar(.6+Math.random()*.8),i.add(d),a.push(d)},aggiorna(h){o=Math.max(0,o-h),s.intensity=jS*(o/yh);for(let f=r.length-1;f>=0;f--){const d=r[f];d.vita-=h,d.linea.material.opacity=Math.max(0,d.vita/Mh),!(d.vita>0)&&(i.remove(d.linea),d.linea.geometry.dispose(),d.linea.material.dispose(),r.splice(f,1))}for(let f=n.length-1;f>=0;f--){const d=n[f];if(d.vita+=h,d.vita>=d.durata||d.sprite.position.y<0){d.sprite.visible=!1,n.splice(f,1),t.push(d);continue}d.velocita.y+=d.tipo.gravita*h,d.sprite.position.addScaledVector(d.velocita,h),d.sprite.material.opacity=1-d.vita/d.durata}},svuota(){for(const h of n.splice(0))h.sprite.visible=!1,t.push(h);for(const h of a.splice(0))i.remove(h)}}}const Sh=new P(.11,-.095,-.29),YS=new P(0,-.068,-.24),$S=.05,KS=new P(-.018,-.05,.04),ZS=16774084;function JS(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d");e.fillStyle="#ffffff";for(let n=0;n<8;n++){const r=n/8*Math.PI*2;e.beginPath(),e.moveTo(16,16),e.lineTo(16+Math.cos(r)*15,16+Math.sin(r)*15),e.lineTo(16+Math.cos(r+.3)*6,16+Math.sin(r+.3)*6),e.fill()}const t=new Go(i);return t.magFilter=It,t}function QS(i){const e=new al,t=new Xt(60,1,.01,10);e.add(new ad(13227752,3155484,2.6));const n=new _l(16773328,2);n.position.set(1,2,1),e.add(n);const r=new St;r.add(_S(i));const s=vS(i);r.add(s),e.add(r);const o=new Map,a=new Vo(new Rs({map:JS(),blending:ys,transparent:!0,depthTest:!1}));a.scale.setScalar(.18),a.visible=!1,r.add(a);const c=br("coltello",i);c.gruppo.visible=!1,e.add(c.gruppo);let l=null,u=0,h=0,f=0;const d=Sh.clone();function _(v){if(l===v)return;if(o.forEach(p=>{p.gruppo.visible=!1}),!o.has(v)){const p=br(v,i);r.add(p.gruppo),o.set(v,p)}const m=o.get(v);m.gruppo.visible=!0,a.position.copy(m.bocca),a.material.color.setHex(m.colore??ZS),a.scale.setScalar(m.colore?.24:.18),s.visible=!0,s.position.copy(m.presa??KS),l=v}return{scena:e,camera:t,mostra:_,spara(){u=1,h=$S,a.material.rotation=Math.random()*Math.PI},get lampoAcceso(){return h>0},get coloreLampo(){return a.material.color.getHex()},aggiorna({dt:v,movimento:m,mira:p,ricarica:x,cambio:M,coltellata:g,corsa:E}){f+=v*(E?14:9)*m,u=Math.max(0,u-v*9),h=Math.max(0,h-v),a.visible=h>0;const A=p?YS:Sh;d.lerp(A,Math.min(1,v*14));const w=p?.2:1;if(r.position.set(d.x+Math.cos(f)*.012*m*w,d.y+Math.abs(Math.sin(f))*.014*m*w-x*.25-M*.3-(E?.04:0),d.z+u*.05),r.rotation.set(u*.12+x*.8,(E?.5:0)+(p?0:.06),x*.4),c.gruppo.visible=g>0,g>0){const C=1-g;c.gruppo.position.set(.25-C*.45,-.18+Math.sin(C*Math.PI)*.06,-.4),c.gruppo.rotation.set(0,-.6+C*1.4,-.4)}},nascondi(v){r.visible=!v}}}const eA=.5,Ah=.1,tA=50,nA=58,iA=1.5,ka=395275,bh=72,rA=52,sA=20,oA=725794,aA=24,cA=40,lA=.01;function Eh(i,e,t,n){const r=new St;n.forEach(o=>r.add(o)),r.position.set(-40,0,0),e.add(r);const s=[];e.traverse(o=>{o.visible||(s.push(o),o.visible=!0)}),i.compile(e,t),s.forEach(o=>{o.visible=!1}),e.remove(r)}const uA=(i,e)=>kc.some(t=>t.aperto&&i>=t.x0&&i<=t.x1&&e>=t.z0&&e<=t.z1);async function hA(i){const e=new TM({antialias:!0,powerPreference:"high-performance"});e.setPixelRatio(1),e.outputColorSpace=Tt,e.toneMapping=mf,e.toneMappingExposure=1.2,e.autoClear=!1,i.appendChild(e.domElement);const t=new al;t.background=new we(ka),t.fog=new ol(ka,3,24),t.add(new ad(8359587,1774863,.55));const n=new _l(7375032,.6);n.position.set(-20,30,-30),t.add(n);const r=new Xt(bh,1,.05,120);r.rotation.order="YXZ";const s=new cd(16773328,28,24,.45,.55,1.3);s.position.set(.15,-.1,0);const o=new ft;o.position.set(0,0,-1),s.target=o;const a=new ei(16761466,0,9,1.5);r.add(s,o,a),t.add(r);const c=new Nc(e).fromScene(new Sy,.04).texture;t.environment=c,t.environmentIntensity=.12;const l=Ey(),[u,h,f,d,_]=await Promise.all([dS(),wS(),LS(),DS(),by()]),v=pS(l,u),m=AS(t,l,v,d,_);US(t,d),FS(t);const p=kS(t),x=VS(t),M=CS(t,h),g=qS(t),E=QS(v);E.scena.environment=c,E.scena.environmentIntensity=.5,E.mostra("pistola"),Eh(e,t,r,[...[...h.values()].map(R=>Uo(R.modello)),...f.map(R=>Uo(R.modello))]),Eh(e,E.scena,E.camera,[]);const A=new Map,w=new Map;let C=0,S=0,y=1,N=0,k=0;function L(){const R=Math.max(1,Math.floor(i.clientWidth*y)),X=Math.max(1,Math.floor(i.clientHeight*y));e.setSize(R,X,!1),r.aspect=R/X,r.updateProjectionMatrix(),E.camera.aspect=R/X,E.camera.updateProjectionMatrix()}const D=new ResizeObserver(L);D.observe(i),L();function q(R,X,K){const ee=new Set;R.giocatori.forEach((ne,Te)=>{if(ne.id===X)return;ee.add(ne.id),A.has(ne.id)||A.set(ne.id,NS(t,ne.nome,v,f[Te%f.length]));const H=w.get(ne.id)??ne;w.set(ne.id,{x:ne.x,z:ne.z}),A.get(ne.id).aggiorna({...ne,inMovimento:Math.hypot(ne.x-H.x,ne.z-H.z)>.5*K},K)});for(const[ne,Te]of A)ee.has(ne)||(Te.chiudi(),A.delete(ne))}function j(R){if(N+=1,k+=R,k<iA)return;const X=N/k;N=0,k=0;const K=X<tA?Math.max(eA,y-Ah):X>nA?Math.min(1,y+Ah/2):y;Math.abs(K-y)<.01||(y=K,L())}function ie(R,{io:X,mioId:K,dt:ee,arma:ne,movimento:Te,corsa:H,inMira:Y,cannocchiale:ue,ricarica:ce,cambio:Ie,coltellata:Oe,aTerra:ze,morto:dt}){C+=ee,j(ee),S+=ee*Te*(H?13:9);const Xe=ze?.45:se.ALTEZZA_OCCHI;r.position.set(X.x,Xe+Math.sin(S)*lA*Te*(Y?0:1),X.z),r.rotation.y=X.yaw+Math.PI,r.rotation.x=X.pitch,r.rotation.z=ze?.35:0;const vt=ue?sA:Y?rA:bh;Math.abs(r.fov-vt)>.1&&(r.fov+=(vt-r.fov)*Math.min(1,ee*14),r.updateProjectionMatrix()),a.intensity=E.lampoAcceso?14:0,E.lampoAcceso&&a.color.setHex(E.coloreLampo);const F=uA(X.x,X.z),jt=Math.min(1,ee*2);t.fog.far+=((F?cA:aA)-t.fog.far)*jt,t.fog.color.lerp(new we(F?oA:ka),jt),t.background.copy(t.fog.color),m.aggiorna(R,ee,C),M.aggiorna(R,ee),p.aggiorna(R,ee),x.aggiorna(R,ee),q(R,K,ee),g.aggiorna(ee),E.mostra(ne),E.nascondi(ze||dt||ue),E.aggiorna({dt:ee,movimento:Te,mira:Y,ricarica:ce,cambio:Ie,coltellata:Oe,corsa:H}),e.clear(),e.render(t,r),e.clearDepth(),e.render(E.scena,E.camera)}return{disegna:ie,camera:r,spara:()=>E.spara(),bocca(){return new P(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position)},raggio(R,X){const K=new P(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position);g.raggio(K,new P(R.x,R.y,R.z),X)},campanella:()=>x.suona(),bersagli:R=>M.bersagli(R),effetti:g,svuota(){M.svuota(),g.svuota(),p.svuota();for(const R of A.values())R.chiudi();A.clear(),w.clear()},chiudi(){D.disconnect(),e.dispose(),e.domElement.remove()}}}const Th=.0022,wh=1.45,fA=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","Space","KeyR","KeyF","KeyV","KeyQ","Digit1","Digit2","Enter","NumpadEnter"]);function dA(i){const e=new Set,t={dyaw:0,dpitch:0,sparo:!1,sparoPremuto:!1,mira:!1,fPremuto:!1,fRilasciato:!1,azioni:[]};let n=!1,r=()=>{};const s=()=>document.pointerLockElement===i,o=()=>{var p,x;const m=(p=i.requestPointerLock)==null?void 0:p.call(i);(x=m==null?void 0:m.catch)==null||x.call(m,()=>r(!1))};function a(m){!n||!fA.has(m.code)||(m.preventDefault(),!m.repeat&&(e.add(m.code),m.code==="KeyR"?t.azioni.push("ricarica"):m.code==="KeyV"?t.azioni.push("coltello"):m.code==="KeyQ"?t.azioni.push("cambia"):m.code==="Digit1"?t.azioni.push({arma:0}):m.code==="Digit2"?t.azioni.push({arma:1}):m.code==="KeyF"?t.fPremuto=!0:(m.code==="Enter"||m.code==="NumpadEnter")&&t.azioni.push("pronto")))}function c(m){e.delete(m.code),m.code==="KeyF"&&(t.fRilasciato=!0)}function l(m){!n||!s()||(t.dyaw-=m.movementX*Th,t.dpitch-=m.movementY*Th)}function u(m){if(n){if(!s()){o();return}m.button===0?(t.sparo=!0,t.sparoPremuto=!0):m.button===2&&(t.mira=!0)}}function h(m){m.button===0?t.sparo=!1:m.button===2&&(t.mira=!1)}function f(m){n&&s()&&t.azioni.push("cambia")}function d(){e.clear(),t.sparo=!1,t.mira=!1,e.has("KeyF")&&(t.fRilasciato=!0)}const _=()=>{s()||d(),r(s())};window.addEventListener("keydown",a),window.addEventListener("keyup",c),window.addEventListener("blur",d),document.addEventListener("mousemove",l),i.addEventListener("mousedown",u),window.addEventListener("mouseup",h),i.addEventListener("wheel",f,{passive:!0}),i.addEventListener("contextmenu",m=>m.preventDefault()),document.addEventListener("pointerlockchange",_);const v=(...m)=>m.some(p=>e.has(p));return{attiva(m){n=m,m||(d(),s()&&document.exitPointerLock())},blocca:o,suBlocco(m){r=m},get bloccato(){return s()},applicaVista(m){m.yaw+=t.dyaw,m.pitch=Math.max(-wh,Math.min(wh,m.pitch+t.dpitch)),t.dyaw=0,t.dpitch=0},leggi(){const m={avanti:(v("KeyW","ArrowUp")?1:0)-(v("KeyS","ArrowDown")?1:0),lato:(v("KeyD","ArrowRight")?1:0)-(v("KeyA","ArrowLeft")?1:0),corsa:v("ShiftLeft","ShiftRight"),sparo:t.sparo,sparoPremuto:t.sparoPremuto,mira:t.mira,f:v("KeyF"),fPremuto:t.fPremuto,fRilasciato:t.fRilasciato,azioni:t.azioni.splice(0)};return t.sparoPremuto=!1,t.fPremuto=!1,t.fRilasciato=!1,m}}}const Ht=i=>document.getElementById(i),pA=2200,mA=140;function gA(){const i={radice:Ht("hud"),vignetta:Ht("vignetta"),cannocchiale:Ht("cannocchiale"),mirino:Ht("mirino"),segno:Ht("segno"),round:Ht("round"),punti:Ht("punti"),nomeArma:Ht("nome-arma"),munizioni:Ht("munizioni"),bibite:Ht("bibite"),avviso:Ht("avviso"),suggerimento:Ht("suggerimento"),barra:Ht("barra-rianima"),terra:Ht("stato-terra"),rete:Ht("rete"),clicca:Ht("clicca")},e=document.createElement("div");e.id="sala",e.hidden=!0;const t=document.createElement("div");t.id="effetti",i.radice.append(e,t);let n="",r="",s=0,o=0,a=null,c="";function l(h,f="pericolo"){i.avviso.textContent=h,i.avviso.classList.toggle("bene",f==="bene"),i.avviso.classList.add("visibile"),s=performance.now()+pA}function u(h,f){const d=[...h.giocatori].sort((p,x)=>p.id===f?-1:x.id===f?1:0),_=d.map(p=>`${p.id}:${p.punti}:${p.nome}`).join("|");if(_===c)return;c=_;const v=d.find(p=>p.id===f),m=v&&a!==null&&v.punti>a?v.punti-a:0;if(a=(v==null?void 0:v.punti)??null,i.punti.replaceChildren(...d.map(p=>{const x=document.createElement("div");x.className=p.id===f?"":"altro";const M=document.createElement("span");return M.textContent=p.nome,x.append(M,String(p.punti)),x})),m>0){const p=document.createElement("div");p.className="guadagno",p.textContent=`+${m}`,i.punti.prepend(p)}}return{mostra(h){i.radice.hidden=!h},avviso:l,segno(h){i.segno.classList.add("visibile"),i.segno.classList.toggle("testa",h),o=performance.now()+mA},aggiorna({vista:h,mioId:f,arma:d,suggerimento:_,rianimazione:v,inMira:m,cannocchiale:p,bloccato:x,rete:M,apertura:g}){const E=h.giocatori.find(D=>D.id===f),A=performance.now();A>s&&i.avviso.classList.remove("visibile"),A>o&&i.segno.classList.remove("visibile"),i.round.textContent=h.round>0?String(h.round):"",i.round.classList.toggle("lampeggia",h.fase==="intervallo"&&h.round>0),u(h,f),i.nomeArma.textContent=xt[d.tipo].nome,i.nomeArma.classList.toggle("potenziata",d.tipo.endsWith("+")),i.munizioni.textContent=`${d.caricatore} / ${d.riserva}`,i.munizioni.classList.toggle("poche",d.caricatore<=Math.ceil(xt[d.tipo].caricatore/4));const w=(E==null?void 0:E.bevande)??[];i.bibite.dataset.chiave!==w.join()&&(i.bibite.dataset.chiave=w.join(),i.bibite.replaceChildren(...w.map(D=>{const q=document.createElement("i");return q.style.background=`#${Gi[D].colore.toString(16).padStart(6,"0")}`,q.title=Gi[D].nome,q})));const C=E&&E.stato==="vivo"?1-E.vita/E.vitaMax:E?1:0;i.vignetta.style.opacity=String(Math.min(.9,C*1.1)),i.cannocchiale.hidden=!p,i.mirino.classList.toggle("nascosto",m||(E==null?void 0:E.stato)!=="vivo"),i.mirino.style.setProperty("--apertura",`${g}px`),i.suggerimento.textContent=_??"",i.barra.hidden=v===null,v!==null&&(i.barra.querySelector("i").style.width=`${Math.min(100,v*100)}%`);const S=(E==null?void 0:E.stato)==="terra",y=(E==null?void 0:E.stato)==="morto";i.terra.hidden=!S&&!y,S&&(i.terra.textContent=`SEI A TERRA — ${Math.ceil(E.timerTerra)} s
il tuo amico deve rianimarti`),y&&(i.terra.textContent="SEI MORTO — torni al prossimo round"),i.rete.textContent=M,i.clicca.hidden=x;const N=h.fase==="attesa";if(e.hidden=!N,N){const D=h.conto===null?null:Math.ceil(h.conto),q=`${D}|${h.giocatori.map(j=>`${j.nome}:${j.pronto}`).join()}|${E==null?void 0:E.pronto}`;if(q!==n){n=q;const j=document.createElement("h3");j.textContent=D===null?"SALA D'ATTESA":`SI PARTE TRA ${D}`;const ie=h.giocatori.map(X=>{const K=document.createElement("div");return K.className=X.pronto?"pronto":"",K.textContent=`${X.nome} — ${X.pronto?"PRONTO":"si sta preparando"}`,K}),R=document.createElement("p");R.textContent=E!=null&&E.pronto?"Invio: aspetta, non sono pronto":"Premi INVIO quando sei pronto",e.replaceChildren(j,...ie,R)}}const k=Object.entries(h.effetti??{}).filter(([,D])=>D>0),L=k.map(([D,q])=>`${D}${Math.ceil(q)}`).join();L!==r&&(r=L,t.replaceChildren(...k.map(([D,q])=>{const j=document.createElement("span");return j.style.setProperty("--colore",`#${Tn[D].colore.toString(16).padStart(6,"0")}`),j.textContent=`${Tn[D].simbolo} ${Tn[D].nome} ${Math.ceil(q)}`,j})))}}}const _A=.5,Rh=Object.freeze({pistola:{durata:.18,filtro:1800,volume:.6,botto:110},revolver:{durata:.3,filtro:1300,volume:.85,botto:75},pompa:{durata:.45,filtro:900,volume:1,botto:60},mitra:{durata:.12,filtro:2200,volume:.45,botto:130},assalto:{durata:.16,filtro:1500,volume:.6,botto:90},battaglia:{durata:.22,filtro:1250,volume:.75,botto:80},mitragliatrice:{durata:.2,filtro:1100,volume:.7,botto:70},precisione:{durata:.6,filtro:2600,volume:1,botto:55},aliena:{durata:.3,filtro:3e3,volume:.35,botto:0,raggio:!0}});function vA(){let i=null,e=null,t=null;function n(){if(i){i.state==="suspended"&&i.resume();return}i=new AudioContext,e=i.createGain(),e.gain.value=_A,e.connect(i.destination),t=i.createBuffer(1,i.sampleRate*2,i.sampleRate);const l=t.getChannelData(0);for(let d=0;d<l.length;d++)l[d]=Math.random()*2-1;const u=i.createBufferSource();u.buffer=t,u.loop=!0;const h=i.createBiquadFilter();h.type="lowpass",h.frequency.value=220;const f=i.createGain();f.gain.value=.05,u.connect(h).connect(f).connect(e),u.start()}const r=()=>i&&i.state==="running";function s({durata:l,da:u,a:h=u,tipo:f="lowpass",volume:d=.5,ritardo:_=0,destinazione:v=e}){const m=i.currentTime+_,p=i.createBufferSource();p.buffer=t,p.playbackRate.value=.8+Math.random()*.4;const x=i.createBiquadFilter();x.type=f,x.frequency.setValueAtTime(u,m),x.frequency.exponentialRampToValueAtTime(Math.max(20,h),m+l);const M=i.createGain();M.gain.setValueAtTime(d,m),M.gain.exponentialRampToValueAtTime(.001,m+l),p.connect(x).connect(M).connect(v),p.start(m,Math.random()),p.stop(m+l+.05)}function o(l,{durata:u=.2,tipo:h="sine",volume:f=.2,ritardo:d=0,scendi:_=null,destinazione:v=e}){const m=i.currentTime+d,p=i.createOscillator();p.type=h,p.frequency.setValueAtTime(l,m),_&&p.frequency.exponentialRampToValueAtTime(_,m+u);const x=i.createGain();x.gain.setValueAtTime(f,m),x.gain.exponentialRampToValueAtTime(.001,m+u),p.connect(x).connect(v),p.start(m),p.stop(m+u+.05)}function a(l,u){const h=i.createStereoPanner();h.pan.value=Math.max(-1,Math.min(1,Math.sin(u)));const f=i.createGain();return f.gain.value=Math.max(0,1-l/22),h.connect(f).connect(e),h}const c={vuoto:()=>o(900,{durata:.04,tipo:"square",volume:.12}),ricarica:()=>{o(500,{durata:.05,tipo:"square",volume:.12,ritardo:.05}),o(320,{durata:.06,tipo:"square",volume:.14,ritardo:.35})},coltello:()=>s({durata:.18,da:3e3,a:900,tipo:"bandpass",volume:.5}),carne:()=>{s({durata:.12,da:700,a:200,volume:.6}),o(90,{durata:.1,volume:.25,scendi:50})},testa:()=>{s({durata:.16,da:1200,a:300,volume:.8}),o(1400,{durata:.06,tipo:"triangle",volume:.12})},assaRotta:()=>{s({durata:.3,da:1400,a:300,tipo:"bandpass",volume:.9}),o(120,{durata:.12,volume:.3,scendi:70})},assaMessa:()=>{o(180,{durata:.08,tipo:"square",volume:.25}),o(160,{durata:.08,tipo:"square",volume:.25,ritardo:.16})},porta:()=>{s({durata:1.2,da:400,a:120,volume:.6}),o(55,{durata:1,tipo:"sawtooth",volume:.12})},acquisto:()=>{o(988,{durata:.12,tipo:"triangle",volume:.25}),o(1319,{durata:.3,tipo:"triangle",volume:.25,ritardo:.1})},bevanda:()=>{[523,659,784].forEach((l,u)=>o(l,{durata:.25,tipo:"triangle",volume:.2,ritardo:u*.12}))},cassa:()=>{[880,740,988,659,1175].forEach((l,u)=>o(l,{durata:.4,tipo:"sine",volume:.18,ritardo:u*.22}))},round:()=>{[98,92.5,87.3,73.4].forEach((l,u)=>o(l,{durata:1.1,tipo:"sawtooth",volume:.16,ritardo:u*.55})),s({durata:2.5,da:300,a:60,volume:.3})},fineRound:()=>{[73.4,87.3,110].forEach((l,u)=>o(l,{durata:.9,tipo:"triangle",volume:.18,ritardo:u*.4}))},ferito:()=>{o(70,{durata:.25,volume:.6,scendi:40}),s({durata:.2,da:500,a:150,volume:.5})},aTerra:()=>{o(60,{durata:1.5,tipo:"sawtooth",volume:.25,scendi:30})},rianimato:()=>{o(440,{durata:.3,tipo:"triangle",volume:.2}),o(660,{durata:.5,tipo:"triangle",volume:.2,ritardo:.2})},corrente:()=>{o(60,{durata:.25,tipo:"square",volume:.4}),o(110,{durata:2.2,tipo:"sawtooth",volume:.12,ritardo:.2,scendi:120}),s({durata:.6,da:2e3,a:200,volume:.4})},potenzia:()=>{for(let l=0;l<6;l++)o(220+l*70,{durata:.45,tipo:"sawtooth",volume:.08,ritardo:l*.45});s({durata:3,da:300,a:2e3,tipo:"bandpass",volume:.3})},potenziata:()=>{[392,523,659,1046].forEach((l,u)=>o(l,{durata:.4,tipo:"triangle",volume:.22,ritardo:u*.09}))},conto:()=>o(660,{durata:.15,tipo:"square",volume:.15}),bonusCompare:()=>{[1046,1318].forEach((l,u)=>o(l,{durata:.25,tipo:"sine",volume:.15,ritardo:u*.1}))},bonus:()=>{[523,784,1046,1568].forEach((l,u)=>o(l,{durata:.35,tipo:"triangle",volume:.2,ritardo:u*.08})),s({durata:.8,da:4e3,a:600,tipo:"bandpass",volume:.25})},bomba:()=>{o(45,{durata:2.5,tipo:"sawtooth",volume:.5,scendi:25}),s({durata:2.5,da:1500,a:60,volume:1})},frammento:()=>{[1568,2093,2637].forEach((l,u)=>o(l,{durata:.6,tipo:"sine",volume:.12,ritardo:u*.15}))},segreto:()=>{[262,330,392,523,392,523,659,784,1046].forEach((l,u)=>o(l,{durata:.5,tipo:"triangle",volume:.16,ritardo:u*.18})),s({durata:3,da:200,a:3e3,tipo:"bandpass",volume:.3})},campanella:()=>{for(let l=0;l<6;l++)o(1175,{durata:.5,tipo:"sine",volume:.18,ritardo:l*.16}),o(1760,{durata:.3,tipo:"sine",volume:.08,ritardo:l*.16})},fine:()=>{[196,165,131,98].forEach((l,u)=>o(l,{durata:1.2,tipo:"sawtooth",volume:.18,ritardo:u*.6}))}};return{prepara:n,suona(l){var u;r()&&((u=c[l])==null||u.call(c))},sparo(l,u=0,h=0){var _;if(!r())return;const f=Rh[(_=xt[l])==null?void 0:_.famiglia]??Rh.pistola,d=u>0?a(u,h):e;if(f.raggio){o(1400,{durata:f.durata,tipo:"square",volume:.12,scendi:180,destinazione:d}),o(700,{durata:f.durata*1.4,tipo:"sine",volume:.25,scendi:90,destinazione:d}),s({durata:.5,da:900,a:80,volume:.5,ritardo:.08,destinazione:d});return}s({durata:f.durata,da:f.filtro*2,a:f.filtro*.3,volume:f.volume,destinazione:d}),o(f.botto,{durata:f.durata*.8,volume:f.volume*.6,scendi:f.botto*.4,destinazione:d})},lamento(l,u){if(!r()||l>20)return;const h=a(l,u),f=70+Math.random()*50,d=i.currentTime,_=i.createOscillator();_.type="sawtooth",_.frequency.setValueAtTime(f,d),_.frequency.linearRampToValueAtTime(f*(.7+Math.random()*.5),d+.9);const v=i.createBiquadFilter();v.type="bandpass",v.frequency.value=400+Math.random()*300,v.Q.value=4;const m=i.createGain();m.gain.setValueAtTime(.001,d),m.gain.linearRampToValueAtTime(.35,d+.15),m.gain.exponentialRampToValueAtTime(.001,d+1),_.connect(v).connect(m).connect(h),_.start(d),_.stop(d+1.05)}}}const Ml=new URLSearchParams(location.search),Ch=Ml.has("locale"),Ih=Ml.has("riserva"),gd="campanella.nome",xA={diretto:50,riserva:100},MA={diretto:.1,riserva:.22},yA=33,SA=1e3,AA=1e3,bA=1e4,_d=.25,EA=.5,TA=.05,wA=.3,RA=.3,CA=.12,Ph=40,IA=60,PA=64,LA=1,Ce=i=>document.getElementById(i),NA=["schermata-inizio","schermata-stanza","schermata-fine"].map(Ce),$o=i=>NA.forEach(e=>{e.hidden=e.id!==i}),yt=gA(),Ze=vA(),Hi=dA(Ce("mondo"));let Wt=null;const O={mioId:crypto.randomUUID(),nome:null,sonoHost:!1,stanza:null,coll:null,nomeAltro:null,idAltro:null,fase:"inizio",partita:null,semeCorrente:null,buffer:[],scarto:null,ultimoArrivo:0,vista:null,azioniLocali:[],azioniRemote:[],remoto:null,accumulo:0,ultimaIstantanea:0,ultimoInvioG:0,ultimoPing:0,ultimoCiao:0,lobbyRicevuta:!1,ping:null,statoSegnali:null,colpiVisti:new Map},_e={x:0,z:0,yaw:Math.PI,pitch:0,pronto:!1,tp:0,colpi:0,movimento:0,corsa:!1,inMira:!1},et=Yh(),Gt={inRianimazione:!1,ultimaAssa:0,ultimoVuoto:0,sparoForzato:!1,ultimoAcquisto:{id:null,quando:0}},Va=new Map,Nn=()=>O.coll&&(O.coll.modo==="diretto"||O.coll.modo==="riserva"),vd=()=>{var i;return((i=O.coll)==null?void 0:i.modo)==="diretto"?"diretto":"riserva"};function yl(i,e){const t=`${e}|${[...i].sort().join(",")}`;if(!Va.has(t)){const n=e?[...Vc,...Hc,...Wi.filter(r=>!i.has(r.id)).map(r=>r.scatola),...Zn.map(Hh).filter(Boolean).map(r=>({...r,altezza:2}))]:Wc(i);Va.set(t,n)}return Va.get(t)}function OA(){try{return localStorage.getItem(gd)??""}catch{return""}}function DA(i){try{return localStorage.setItem(gd,i),!0}catch{return!1}}function gi(i){var e;O.sonoHost?O.azioniLocali.push({da:O.mioId,...i}):(e=O.coll)==null||e.invia({t:"az",a:i})}function UA(){return!O.coll||!O.idAltro&&O.sonoHost?O.sonoHost?"da solo":"":O.coll.modo==="diretto"?`diretto${O.ping!==null?` · ${O.ping} ms`:""}`:O.coll.modo==="riserva"?`via Supabase${O.ping!==null?` · ${O.ping} ms`:""}`:"collegamento…"}function fs(){var e;const i=Ce("t-stato");Ce("t-codice").textContent=O.stanza,Ce("blocco-link").hidden=!O.sonoHost,Ce("parti").hidden=!O.sonoHost,((e=O.coll)==null?void 0:e.modo)==="occupata"?(i.textContent="Questa stanza ha già due giocatori.",i.dataset.tipo="errore"):O.statoSegnali==="offline"&&!Nn()?(i.textContent="Il server dei collegamenti non risponde, riprovo…",i.dataset.tipo="errore"):Nn()&&O.nomeAltro?(i.textContent=`Insieme a ${O.nomeAltro} ${O.coll.modo==="diretto"?"(diretto)":"(via Supabase)"}`,i.dataset.tipo="ok"):(i.textContent=O.sonoHost?"Aspetto il tuo amico… mandagli il link. Puoi anche entrare da solo.":"Mi collego alla stanza…",i.dataset.tipo="attesa"),Ce("parti").textContent=O.nomeAltro&&Nn()?"Entrate nella scuola":"Entra da solo",Ce("nota-stanza").textContent=O.sonoHost?"Se il tuo amico arriva dopo, entra direttamente nella partita.":O.nomeAltro?`Aspetta che ${O.nomeAltro} apra la scuola.`:""}function xd(){!O.sonoHost||!Nn()||(O.coll.invia({t:"lobby",nomeHost:O.nome,ospite:O.idAltro}),O.fase==="gioco"&&O.coll.invia({t:"inizia",seme:O.semeCorrente}))}function Md(i,e){Ze.prepara(),O.sonoHost=i,O.stanza=e,O.fase="stanza";const t=$p(e,{locale:Ch});t.suStato(r=>{O.statoSegnali=r,fs()}),O.coll=am({segnali:t,sonoHost:i,mioId:O.mioId,soloRiserva:Ih}),O.coll.suStato(()=>{fs(),Nn()&&xd()}),O.coll.suMessaggio(zA);const n=[Ch?"locale":null,Ih?"riserva":null].filter(Boolean).map(r=>`&${r}`).join("");Ce("link").value=`${location.origin}${location.pathname}?stanza=${e}${n}`,$o("schermata-stanza"),fs(),i&&Ce("parti").focus()}function Is(i){Ce("errore-inizio").textContent=i}function yd(){const i=vs(Ce("nome").value);return i?(DA(i),O.nome=i,i):(Is("Scrivi il tuo nome: lo vedrà il tuo amico."),Ce("nome").focus(),null)}function Sd(i,e=!1){var t;if(O.fase="gioco",O.semeCorrente=i,O.buffer=[],O.scarto=null,O.vista=null,O.accumulo=0,O.azioniLocali=[],O.azioniRemote=[],O.remoto=null,O.colpiVisti.clear(),Xa(et),Object.assign(_e,{pronto:!1,tp:0,colpi:0,pitch:0}),Gt.inRianimazione=!1,Wt.svuota(),O.sonoHost){const n=[{id:O.mioId,nome:O.nome}];O.idAltro&&Nn()&&n.push({id:O.idAltro,nome:O.nomeAltro}),O.partita=dp({seme:i,giocatori:n,sala:!0})}$o(null),yt.mostra(!0),Hi.attiva(!0),(t=document.activeElement)==null||t.blur(),e&&Hi.blocca()}function Ad(){if(!O.sonoHost)return;const i=kd();Sd(i,!0),Nn()&&O.coll.invia({t:"inizia",seme:i})}function bd(i){O.fase==="gioco"&&(O.fase="fine",Hi.attiva(!1),Ze.suona("fine"),Ce("t-dettaglio").textContent=i.round>1?`Siete sopravvissuti fino al round ${i.round}.`:"Non siete andati oltre il primo round.",Ce("t-tabella").replaceChildren(...i.giocatori.map(e=>{const t=document.createElement("div");return t.textContent=`${e.nome} — ${e.uccisioni} zombie, ${e.punti} punti`,t})),Ce("rigioca").hidden=!O.sonoHost,Ce("t-attesa-host").textContent=O.sonoHost?"":`Aspetta che ${O.nomeAltro} faccia ripartire.`,$o("schermata-fine"),O.sonoHost&&Ce("rigioca").focus())}function Ha(i){var e,t;return((t=(e=O.vista)==null?void 0:e.giocatori.find(n=>n.id===i))==null?void 0:t.nome)??"Il tuo amico"}function Ed(i){for(const e of i){const t=e.a===O.mioId;switch(e.k){case"round":Ze.suona("round"),yt.avviso(`Round ${e.round}`);break;case"fineRound":Ze.suona("fineRound");break;case"ucciso":Wt.effetti.macchia(e.x,e.z),e.bomba&&Wt.effetti.esplosione({x:e.x,y:1,z:e.z},"fuoco");break;case"via":Xa(et),Ze.suona("round"),yt.avviso("Si comincia! Restate vicini","bene");break;case"conto":Ze.suona("conto");break;case"contoAnnullato":yt.avviso("Partenza annullata: qualcuno non è pronto");break;case"bonusCompare":Ze.suona("bonusCompare");break;case"bonus":Ze.suona(e.tipo==="bomba"?"bomba":"bonus"),yt.avviso(`${Tn[e.tipo].nome} — ${Tn[e.tipo].descrizione}`,"bene"),e.tipo==="munizioni"&&et.armi.forEach(n=>Dl(et,n.tipo));break;case"frammento":Ze.suona("frammento"),yt.avviso(`Frammento di meteorite ${e.trovati}/${e.totale}`,"bene");break;case"segreto":Ze.suona("segreto"),yt.avviso("La meteorite si risveglia: avete il Disintegratore!","bene");break;case"campanella":Ze.suona("campanella"),Wt.campanella(),e.regalo&&yt.avviso("L'ultima campanella vi ha lasciato un regalo…","bene");break;case"assaRotta":Ze.suona("assaRotta");break;case"assaMessa":Ze.suona("assaMessa");break;case"porta":Ze.suona("porta"),yt.avviso("Porta aperta","bene");break;case"acquisto":if(!t)break;tp(et,e.armi,e.arma),Ze.suona(e.potenziata?"potenziata":"acquisto"),yt.avviso(xt[e.arma].nome,"bene");break;case"corrente":Ze.suona("corrente"),yt.avviso("Corrente accesa!","bene");break;case"potenzia":t&&(Ze.suona("potenzia"),yt.avviso("Potenziamento in corso…","bene"));break;case"potenziataPronta":t&&yt.avviso("Ritira l'arma potenziata!","bene");break;case"munizioni":t&&(Dl(et,e.arma),Ze.suona("acquisto"));break;case"bevanda":t&&(Ze.suona("bevanda"),yt.avviso(Gi[e.bevanda].nome,"bene"));break;case"cassa":t&&(Ze.suona("cassa"),yt.avviso(`Prendi: ${xt[e.arma].nome}`,"bene"));break;case"ferito":t&&Ze.suona("ferito");break;case"aTerra":Ze.suona("aTerra"),yt.avviso(t?"Sei a terra!":`${Ha(e.a)} è a terra!`);break;case"rianimato":Ze.suona("rianimato"),yt.avviso(t?"Sei di nuovo in piedi":`${Ha(e.a)} è di nuovo in piedi`,"bene");break;case"morto":yt.avviso(t?"Sei morto":`${Ha(e.a)} è morto`);break;case"rinato":t&&Xa(et);break;case"fine":bd(e);break}}}function zA(i){switch(i.t){case"ciao":if(!O.sonoHost)return;O.nomeAltro=vs(i.nome),O.partita&&O.idAltro&&O.idAltro!==i.id&&nf(O.partita,O.idAltro),O.idAltro=i.id,O.fase==="gioco"&&O.partita&&jc(O.partita,{id:i.id,nome:O.nomeAltro}),xd(),fs();return;case"lobby":if(O.sonoHost)return;O.lobbyRicevuta=i.ospite===O.mioId,O.nomeAltro=vs(i.nomeHost),fs();return;case"inizia":if(O.sonoHost||O.fase==="gioco"&&i.seme===O.semeCorrente)return;Sd(i.seme);return;case"g":if(!O.sonoHost)return;Lh(),O.remoto={x:i.x,z:i.z,yaw:i.yaw,pitch:i.pitch,arma:i.arma,colpi:i.colpi,tp:i.tp};return;case"az":if(!O.sonoHost||!O.idAltro)return;if(Lh(),O.azioniRemote.length>=PA){const e=O.azioniRemote.findIndex(t=>t.tipo==="colpo"||t.tipo==="assa");O.azioniRemote.splice(e>=0?e:0,1)}O.azioniRemote.push({...i.a,da:O.idAltro});return;case"st":{if(O.sonoHost||O.fase==="stanza"||i.g!==O.semeCorrente)return;const e=O.buffer[O.buffer.length-1];if(e&&i.ist.t<=e.vista.tempo)return;O.ultimoArrivo=performance.now();const t=i.ist.t-O.ultimoArrivo/1e3,n=O.scarto===null||Math.abs(t-O.scarto)>EA;O.scarto=n?t:O.scarto+(t-O.scarto)*TA,O.buffer.push({vista:uf(i.ist)}),O.buffer.length>Ph&&O.buffer.splice(0,O.buffer.length-Ph);return}case"ev":!O.sonoHost&&O.fase==="gioco"&&Ed(i.eventi);return;case"ping":O.sonoHost||O.coll.invia({t:"pong",n:i.n});return;case"pong":O.sonoHost&&(O.ping=Math.round(performance.now()-i.n));return}}function Lh(){O.fase!=="gioco"||!O.partita||!O.idAltro||O.partita.giocatori.some(i=>i.id===O.idAltro)||jc(O.partita,{id:O.idAltro,nome:O.nomeAltro??"Amico"})}function FA(i,e){const t=O.partita;if(O.idAltro&&t.giocatori.some(n=>n.id===O.idAltro)&&O.coll.silenzio()>bA&&nf(t,O.idAltro),O.fase==="gioco"){O.accumulo=Math.min(O.accumulo+i,_d);const n=[];for(;O.accumulo>=se.PASSO;){const r={};_e.pronto&&(r[O.mioId]={x:_e.x,z:_e.z,yaw:_e.yaw,pitch:_e.pitch,arma:$t(et).tipo,colpi:_e.colpi,tp:_e.tp}),O.remoto&&O.idAltro&&(r[O.idAltro]=O.remoto);const s=[...O.azioniLocali.splice(0),...O.azioniRemote.splice(0)];n.push(...Up(t,se.PASSO,{posizioni:r,azioni:s})),O.accumulo-=se.PASSO}n.length&&Nn()&&O.coll.invia({t:"ev",eventi:n}),Ed(n)}Nn()&&e-O.ultimaIstantanea>=xA[vd()]&&(O.coll.invia({t:"st",g:O.semeCorrente,ist:lf(t)},{veloce:!0}),O.ultimaIstantanea=e)}function BA(i){O.fase!=="gioco"||!_e.pronto||i-O.ultimoInvioG<yA||(O.coll.invia({t:"g",x:_e.x,z:_e.z,yaw:_e.yaw,pitch:_e.pitch,arma:$t(et).tipo,colpi:_e.colpi,tp:_e.tp},{veloce:!0}),O.ultimoInvioG=i)}let Nh=performance.now();function kA(){const i=performance.now(),e=Math.min(_d,(i-Nh)/1e3);Nh=i,O.coll&&Nn()&&(O.sonoHost&&i-O.ultimoPing>SA&&(O.coll.invia({t:"ping",n:i}),O.ultimoPing=i),!O.sonoHost&&!O.lobbyRicevuta&&i-O.ultimoCiao>AA&&(O.coll.invia({t:"ciao",nome:O.nome,id:O.mioId}),O.ultimoCiao=i)),!(O.fase!=="gioco"&&O.fase!=="fine")&&(O.sonoHost&&O.partita?FA(e,i):O.sonoHost||BA(i))}function VA(i){if(O.buffer.length===0||O.scarto===null)return null;const e=i/1e3+O.scarto-MA[vd()];for(;O.buffer.length>2&&O.buffer[1].vista.tempo<=e;)O.buffer.shift();const[t,n]=O.buffer;return n&&e>t.vista.tempo?Fp(t.vista,n.vista,(e-t.vista.tempo)/Math.max(1e-6,n.vista.tempo-t.vista.tempo)):t.vista}function HA(i,e,t){const n=e.stato==="vivo"&&O.fase==="gioco";_e.inMira=n&&i.mira&&et.ricarica===0,_e.corsa=n&&i.corsa&&i.avanti>0&&!_e.inMira;const r=Math.hypot(i.avanti,i.lato);if(_e.movimento=n&&r>0?1:0,!_e.movimento)return;const s=(_e.corsa?se.VELOCITA_CORSA:se.VELOCITA)*(_e.inMira?.6:1),o=i.avanti/r,a=i.lato/r,c=(Math.sin(_e.yaw)*o-Math.cos(_e.yaw)*a)*s*t,l=(Math.cos(_e.yaw)*o+Math.sin(_e.yaw)*a)*s*t,u=Wh(_e,c,l,se.RAGGIO_GIOCATORE,yl(O.vista.porte,!1));_e.x=u.x,_e.z=u.z}function GA(i,e){_e.colpi+=1,Wt.spara(),Ze.sparo($t(et).tipo);const t={x:_e.x,y:se.ALTEZZA_OCCHI,z:_e.z},n=jh(_e.yaw,_e.pitch),r=Wt.bersagli(e),s=yl(e.porte,!0),o=new Map;for(let a=0;a<i.pallini;a++){const c=Kd(n,i.dispersione*(_e.inMira?.4:1)*(_e.movimento?1.6:1),Math.random),l=Xh(t,c,r,s,i.portata??(i.esplosione?IA:1/0));if(i.fiamma&&Wt.effetti.fiamma(Wt.bocca(),c,i.colore),!Number.isFinite(l.t))continue;const u={x:t.x+c.x*l.t,y:t.y+c.y*l.t,z:t.z+c.z*l.t};if(i.esplosione){Wt.raggio(u,i.colore??void 0),Wt.effetti.esplosione(u,i.esplosione.tipo,i.esplosione.colore??i.colore??null);for(const{id:f,fattore:d}of $d(u,r,i.esplosione.raggio)){if(f===l.id)continue;const _=o.get(f)??{danno:0,testa:!1};_.danno+=Math.round(i.esplosione.danno*d),o.set(f,_)}}if(l.id===null){Wt.effetti.impatto(u);continue}Wt.effetti.sangue(u,c);const h=o.get(l.id)??{danno:0,testa:!1};h.danno+=l.testa?i.danno*2:i.danno,h.testa||(h.testa=l.testa),o.set(l.id,h)}for(const[a,{danno:c,testa:l}]of o)gi({tipo:"colpo",zombie:a,danno:c,testa:l}),yt.segno(l),Ze.suona(l?"testa":"carne")}function WA(i,e,t,n){var a;if(Jd(et,n)&&Ze.suona("ricarica"),e.stato!=="vivo"||O.fase!=="gioco")return;for(const c of i.azioni)if(c==="pronto")t.fase==="attesa"&&gi({tipo:"pronto",attivo:!e.pronto});else if(c==="ricarica"&&Zo(et,e.bevande))Ze.suona("ricarica");else if(c==="cambia")Ol(et);else if((c==null?void 0:c.arma)!==void 0)Ol(et,c.arma);else if(c==="coltello"&&ep(et)){Ze.suona("coltello");const l=jh(_e.yaw,Math.min(_e.pitch,-.15)),u=Xh({x:_e.x,y:se.ALTEZZA_OCCHI,z:_e.z},l,Wt.bersagli(t),yl(t.porte,!0),Ao.portata);u.id!==null&&(gi({tipo:"colpo",zombie:u.id,danno:Ao.danno,coltello:!0}),Ze.suona("carne"),yt.segno(!1))}const r=xt[$t(et).tipo],s=Gt.sparoForzato||(r.automatica?i.sparo:i.sparoPremuto);if(Gt.sparoForzato=!1,!s||_e.corsa)return;if($t(et).caricatore===0){!Zo(et,e.bevande)&&performance.now()/1e3-Gt.ultimoVuoto>RA&&(Ze.suona("vuoto"),Gt.ultimoVuoto=performance.now()/1e3);return}const o=Qd(et);o&&(((a=t.effetti)==null?void 0:a.infinite)>0&&($t(et).caricatore+=1),GA(o,t),$t(et).caricatore===0&&Zo(et,e.bevande))}function XA(i,e,t){const n=e.stato==="vivo"&&O.fase==="gioco"?np({id:O.mioId,x:_e.x,z:_e.z,armi:e.armi,bevande:e.bevande,armaAttiva:$t(et).tipo},t):null;if(Gt.inRianimazione&&(!i.f||(n==null?void 0:n.tipo)!=="rianima")&&(gi({tipo:"rianima",attivo:!1}),Gt.inRianimazione=!1),!n)return null;const r=performance.now()/1e3,s=Gt.ultimoAcquisto.id===n.acquisto&&r-Gt.ultimoAcquisto.quando<LA;return i.fPremuto&&n.tipo==="compra"&&!s&&Number.isFinite(n.costo)&&(n.costo>e.punti?yt.avviso("Non hai abbastanza punti"):(gi({tipo:"compra",acquisto:n.acquisto,arma:$t(et).tipo}),Gt.ultimoAcquisto={id:n.acquisto,quando:r})),i.fPremuto&&n.tipo==="frammento"&&!s&&(gi({tipo:"frammento",id:n.id}),Gt.ultimoAcquisto={id:n.acquisto,quando:r}),i.f&&n.tipo==="rianima"&&!Gt.inRianimazione&&(gi({tipo:"rianima",attivo:!0}),Gt.inRianimazione=!0),i.f&&n.tipo==="assa"&&r-Gt.ultimaAssa>wA&&(gi({tipo:"assa",finestra:n.finestra}),Gt.ultimaAssa=r),n}function jA(i,e){for(const t of i.zombie){if(t.stato==="morto"||Math.random()>e*CA)continue;const n=t.x-_e.x,r=t.z-_e.z;Ze.lamento(Math.hypot(n,r),Math.atan2(n,r)-_e.yaw)}for(const t of i.giocatori){if(t.id===O.mioId)continue;const n=O.colpiVisti.get(t.id)??t.colpi;t.colpi>n&&Ze.sparo(t.armaAttiva,Math.hypot(t.x-_e.x,t.z-_e.z)+1,Math.atan2(t.x-_e.x,t.z-_e.z)-_e.yaw),O.colpiVisti.set(t.id,t.colpi)}}let Oh=performance.now(),Ga=60;function Td(i){const e=Math.min(.1,(i-Oh)/1e3);if(Oh=i,e>0&&(Ga+=(1/e-Ga)*.05),(O.fase==="gioco"||O.fase==="fine")&&Wt){const t=O.sonoHost?O.partita?uf(lf(O.partita)):null:VA(i),n=t==null?void 0:t.giocatori.find(r=>r.id===O.mioId);if(t&&n){O.vista=t,(!_e.pronto||n.teletrasporto>_e.tp)&&Object.assign(_e,{x:n.x,z:n.z,yaw:n.yaw,tp:n.teletrasporto,pronto:!0}),t.fase==="fine"&&O.fase==="gioco"&&bd({round:t.round,giocatori:t.giocatori.map(l=>({nome:l.nome,punti:l.punti,uccisioni:l.uccisioni}))});const r=Hi.leggi();Hi.applicaVista(_e),HA(r,n,e),WA(r,n,t,e);const s=XA(r,n,t);jA(t,e);const o=t.giocatori.find(l=>l.id!==O.mioId&&l.stato==="terra"),a=$t(et).tipo,c=_e.inMira&&xt[a].mirino===!0;Wt.disegna(t,{io:_e,mioId:O.mioId,dt:e,arma:a,movimento:_e.movimento,corsa:_e.corsa,inMira:_e.inMira,cannocchiale:c,ricarica:et.ricarica>0?Math.sin(Math.min(1,et.ricarica)*Math.PI):0,cambio:et.cambio>0?1:0,coltellata:et.coltello/Ao.attesa,aTerra:n.stato==="terra",morto:n.stato==="morto"}),yt.aggiorna({vista:t,mioId:O.mioId,arma:$t(et),suggerimento:(s==null?void 0:s.testo)??null,rianimazione:Gt.inRianimazione&&o?o.progressoRianimazione/(n.bevande.includes("ritorno")?se.RIANIMA_RAPIDO:se.RIANIMA_IN):null,inMira:_e.inMira,cannocchiale:c,bloccato:Hi.bloccato||O.fase!=="gioco",rete:[UA(),`${Math.round(Ga)} fps`].filter(Boolean).join(" · "),apertura:6+(_e.movimento?6:0)+(_e.corsa?8:0)-(_e.inMira?4:0)})}}requestAnimationFrame(Td)}Ce("crea").addEventListener("click",()=>{yd()&&Md(!0,Jp())});Ce("entra").addEventListener("click",()=>{if(!yd())return;const i=ff(Ce("codice").value);if(!i){Is("Il codice ha 4 lettere (es. KXRT)."),Ce("codice").focus();return}Md(!1,i)});Ce("modulo-inizio").addEventListener("submit",i=>i.preventDefault());Ce("nome").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("crea").disabled||(i.preventDefault(),(Ce("codice").value.trim()?Ce("entra"):Ce("crea")).click())});Ce("codice").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("entra").disabled||(i.preventDefault(),Ce("entra").click())});Ce("codice").addEventListener("input",()=>Is(""));Ce("nome").addEventListener("input",()=>Is(""));Ce("copia").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(Ce("link").value),Ce("copia").textContent="Copiato!"}catch{Ce("link").select(),Ce("copia").textContent="Premi Ctrl+C"}});Ce("parti").addEventListener("click",Ad);Ce("rigioca").addEventListener("click",Ad);Hi.suBlocco(i=>{i&&Ze.prepara()});Ce("nome").value=OA();const Dh=ff(Ml.get("stanza"));Dh&&(Ce("codice").value=Dh,Ce("crea").classList.remove("primario"),Ce("entra").classList.add("primario"));$o("schermata-inizio");Ce("nome").focus();requestAnimationFrame(Td);const qA=new Worker(new URL(""+new URL("orologio-worker-CqtP_hGM.js",import.meta.url).href,import.meta.url));qA.onmessage=kA;hA(Ce("mondo")).then(i=>{Wt=i,Ce("crea").disabled=!1,Ce("crea").textContent="Crea una stanza",Ce("entra").disabled=!1}).catch(i=>{console.error("Caricamento della grafica non riuscito:",i),Is("Non riesco a caricare la grafica del gioco. Ricarica la pagina."),Ce("crea").textContent="Errore"});
