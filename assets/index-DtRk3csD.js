(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const te=Object.freeze({PASSO:1/60,ALTEZZA_OCCHI:1.6,RAGGIO_GIOCATORE:.35,RAGGIO_ZOMBIE:.35,VELOCITA:4.2,VELOCITA_CORSA:6.2,PUNTI_INIZIALI:500,PUNTI_COLPO:10,PUNTI_UCCISIONE:60,PUNTI_TESTA:100,PUNTI_COLTELLO:130,PUNTI_ASSA:10,VITA:100,VITA_FERRO:250,RIGENERA_DOPO:4,RIGENERA_AL_SECONDO:60,DANNO_ZOMBIE:45,PORTATA_ZOMBIE:1.15,ATTESA_ATTACCO:1.4,TEMPO_A_TERRA:30,RIANIMA_IN:4,RIANIMA_RAPIDO:1.5,RIANIMA_DISTANZA:1.8,ASSE_PER_FINESTRA:6,ROMPI_ASSE_OGNI:1.5,RICOSTRUISCI_OGNI:.8,DISTANZA_FINESTRA:2.2,SCAVALCA:.9,ZOMBIE_VIVI_MAX:20,INTERVALLO:10,VELOCITA_CAMMINA:1.1,VELOCITA_CORRE:3.6,DISTANZA_ACQUISTO:2,DISTANZA_PROVA:1.3,COSTO_CASSA:950,DURATA_CASSA:8,COSTO_POTENZIA:5e3,DURATA_POTENZIA:3,ATTESA_RITIRO:10,CONTO_ALLA_ROVESCIA:5,PRIMO_ROUND_TRA:3,VITA_MANICHINO:3e3,RINASCITA_MANICHINO:3,PROBABILITA_BONUS:.035,BONUS_PER_ROUND:4,DURATA_BONUS_A_TERRA:25,DISTANZA_BONUS:1.3,PUNTI_BOMBA:400,PUNTI_CARPENTIERE:200,COSTO_CASSA_SALDI:10,DISTANZA_FRAMMENTO:1.6,PUNTI_SEGRETO:1e3}),Be=i=>Object.freeze({pallini:1,dispersione:.02,automatica:!1,...i}),hn=(i,e,t,n=null)=>Object.freeze({raggio:i,danno:e,tipo:t,colore:n}),cn=i=>Be({famiglia:"aliena",aliena:!0,...i}),ms=Object.freeze({pistola:Be({nome:"Pistola P9",famiglia:"pistola",modello:"Pistol_1",danno:40,cadenza:.22,caricatore:8,riserva:48,ricarica:1.4,dispersione:.004}),pistolaAuto:Be({nome:"Pistola automatica R-18",famiglia:"pistola",modello:"Pistol_2",danno:34,cadenza:.06,automatica:!0,caricatore:20,riserva:120,ricarica:1.8,dispersione:.03}),tattica:Be({nome:"Pistola tattica T-40",famiglia:"pistola",modello:"Pistol_3",danno:55,cadenza:.18,caricatore:12,riserva:72,ricarica:1.5,dispersione:.005}),raffica:Be({nome:"Pistola a raffica R-93",famiglia:"pistola",modello:"Pistol_4",danno:38,cadenza:.05,automatica:!0,caricatore:30,riserva:150,ricarica:2,dispersione:.035}),pesante:Be({nome:"Pistola pesante .45",famiglia:"pistola",modello:"Pistol_5",danno:80,cadenza:.25,caricatore:8,riserva:56,ricarica:1.6,dispersione:.006}),aquila:Be({nome:"Pistola Aquila .50",famiglia:"pistola",modello:"Pistol_6",danno:140,cadenza:.35,caricatore:7,riserva:42,ricarica:2.2,dispersione:.008}),magnum:Be({nome:"Revolver .357",famiglia:"revolver",modello:"Revolver_1",danno:160,cadenza:.45,caricatore:6,riserva:36,ricarica:3,dispersione:.006}),ufficiale:Be({nome:"Revolver d'ordinanza",famiglia:"revolver",modello:"Revolver_2",danno:130,cadenza:.4,caricatore:6,riserva:42,ricarica:2.8,dispersione:.007}),cannaLunga:Be({nome:"Revolver canna lunga",famiglia:"revolver",modello:"Revolver_3",danno:210,cadenza:.55,caricatore:6,riserva:36,ricarica:3.1,dispersione:.004}),toro:Be({nome:"Revolver Toro .500",famiglia:"revolver",modello:"Revolver_4",danno:260,cadenza:.6,caricatore:5,riserva:30,ricarica:3.2,dispersione:.008}),sceriffo:Be({nome:"Revolver dello sceriffo",famiglia:"revolver",modello:"Revolver_5",danno:120,cadenza:.3,caricatore:6,riserva:48,ricarica:2.6,dispersione:.009}),mitra:Be({nome:"Mitra MK-5",famiglia:"mitra",modello:"SubmachineGun_1",danno:32,cadenza:.075,automatica:!0,caricatore:30,riserva:150,ricarica:2.2,dispersione:.03}),scorpione:Be({nome:"Mitra Scorpione",famiglia:"mitra",modello:"SubmachineGun_2",danno:26,cadenza:.05,automatica:!0,caricatore:20,riserva:140,ricarica:1.7,dispersione:.045}),vettore:Be({nome:"Mitra Vettore",famiglia:"mitra",modello:"SubmachineGun_3",danno:30,cadenza:.05,automatica:!0,caricatore:25,riserva:150,ricarica:2.1,dispersione:.025}),mitraglietta:Be({nome:"Mitraglietta U-9",famiglia:"mitra",modello:"SubmachineGun_4",danno:28,cadenza:.055,automatica:!0,caricatore:32,riserva:160,ricarica:2,dispersione:.04}),p50:Be({nome:"Mitra P-50",famiglia:"mitra",modello:"SubmachineGun_5",danno:34,cadenza:.065,automatica:!0,caricatore:50,riserva:200,ricarica:3,dispersione:.028}),assalto:Be({nome:"Fucile d'assalto KV-47",famiglia:"assalto",modello:"AssaultRifle_2",danno:60,cadenza:.1,automatica:!0,caricatore:30,riserva:150,ricarica:2.4,dispersione:.018}),kvCorto:Be({nome:"KV-47 corto",famiglia:"assalto",modello:"AssaultRifle_1",danno:52,cadenza:.085,automatica:!0,caricatore:30,riserva:150,ricarica:2.1,dispersione:.026}),galil:Be({nome:"Fucile G-35",famiglia:"assalto",modello:"AssaultRifle_3",danno:58,cadenza:.09,automatica:!0,caricatore:35,riserva:175,ricarica:2.6,dispersione:.02}),battaglia:Be({nome:"Fucile da battaglia S-17",famiglia:"battaglia",modello:"AssaultRifle_4",danno:85,cadenza:.12,automatica:!0,caricatore:20,riserva:120,ricarica:2.5,dispersione:.016}),kv74:Be({nome:"Fucile KV-74",famiglia:"assalto",modello:"AssaultRifle_5",danno:55,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.3,dispersione:.015}),carabina:Be({nome:"Carabina M-4",famiglia:"assalto",modello:"AssaultRifle2_1",danno:50,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.2,dispersione:.014}),tiratore:Be({nome:"Fucile da tiratore MR-16",famiglia:"battaglia",modello:"AssaultRifle2_2",danno:120,cadenza:.18,caricatore:20,riserva:120,ricarica:2.4,dispersione:.006}),commando:Be({nome:"Carabina Commando",famiglia:"assalto",modello:"AssaultRifle2_3",danno:46,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2,dispersione:.022}),m4corta:Be({nome:"Carabina corta M-4C",famiglia:"assalto",modello:"AssaultRifle2_4",danno:48,cadenza:.075,automatica:!0,caricatore:30,riserva:180,ricarica:2.1,dispersione:.018}),bullpup:Be({nome:"Fucile bullpup F-2000",famiglia:"assalto",modello:"Bullpup_1",danno:48,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2.5,dispersione:.016}),fam3:Be({nome:"Fucile Fam-3",famiglia:"assalto",modello:"Bullpup_2",danno:45,cadenza:.06,automatica:!0,caricatore:25,riserva:175,ricarica:2.4,dispersione:.02}),mitragliatrice:Be({nome:"Mitragliatrice HM-6",famiglia:"mitragliatrice",modello:"Bullpup_3",danno:55,cadenza:.07,automatica:!0,caricatore:100,riserva:300,ricarica:4,dispersione:.035}),pompa:Be({nome:"Fucile a pompa 870",famiglia:"pompa",modello:"Shotgun_1",danno:35,cadenza:.85,caricatore:6,riserva:36,ricarica:3,pallini:8,dispersione:.07}),sp12:Be({nome:"Fucile SP-12",famiglia:"pompa",modello:"Shotgun_2",danno:32,cadenza:.3,caricatore:8,riserva:48,ricarica:3.2,pallini:8,dispersione:.075}),aa12:Be({nome:"Fucile automatico AA-12",famiglia:"pompa",modello:"Shotgun_3",danno:28,cadenza:.2,automatica:!0,caricatore:20,riserva:80,ricarica:3.5,pallini:6,dispersione:.08}),caccia:Be({nome:"Fucile da caccia",famiglia:"pompa",modello:"Shotgun_4",danno:38,cadenza:.6,caricatore:7,riserva:42,ricarica:2.8,pallini:7,dispersione:.06}),doppietta:Be({nome:"Doppietta a canne mozze",famiglia:"pompa",modello:"Shotgun_SawedOff",danno:40,cadenza:.25,caricatore:2,riserva:40,ricarica:2.2,pallini:10,dispersione:.1}),sfondamento:Be({nome:"Pompa da sfondamento",famiglia:"pompa",modello:"Shotgun_ShortStock",danno:42,cadenza:.7,caricatore:5,riserva:35,ricarica:2.6,pallini:8,dispersione:.09}),precisione:Be({nome:"Precisione L-96",famiglia:"precisione",modello:"SniperRifle_1",danno:500,cadenza:1.2,caricatore:5,riserva:30,ricarica:3,dispersione:0,mirino:!0}),dsv:Be({nome:"Precisione semiauto D-SV",famiglia:"precisione",modello:"SniperRifle_2",danno:300,cadenza:.4,caricatore:10,riserva:50,ricarica:2.8,dispersione:0,mirino:!0}),anticarro:Be({nome:"Anticarro .50 B-82",famiglia:"precisione",modello:"SniperRifle_3",danno:900,cadenza:1,caricatore:10,riserva:40,ricarica:3.6,dispersione:0,mirino:!0}),notturno:Be({nome:"Precisione notturna N-7",famiglia:"precisione",modello:"SniperRifle_4",danno:420,cadenza:.9,caricatore:6,riserva:36,ricarica:2.9,dispersione:0,mirino:!0}),bipiede:Be({nome:"Precisione col bipiede M-24",famiglia:"precisione",modello:"SniperRifle_5",danno:650,cadenza:1.3,caricatore:5,riserva:30,ricarica:3.2,dispersione:0,mirino:!0}),cacciatore:Be({nome:"Carabina del cacciatore",famiglia:"precisione",modello:"SniperRifle_6",danno:360,cadenza:.8,caricatore:5,riserva:40,ricarica:2.6,dispersione:0,mirino:!0}),raggi:cn({nome:"Pistola a raggi",modello:"Gun_Pistol",colore:4777471,danno:600,cadenza:.35,caricatore:20,riserva:160,ricarica:2.6,dispersione:.006,esplosione:hn(1.8,400,"energia")}),plasma:cn({nome:"Pistola al plasma",modello:"Gun_Pistol",colore:6160234,danno:140,cadenza:.09,automatica:!0,caricatore:40,riserva:240,ricarica:2.2,dispersione:.02,esplosione:hn(.9,80,"energia")}),gravitonica:cn({nome:"Pistola gravitonica",modello:"Gun_Pistol",colore:11560703,danno:900,cadenza:.7,caricatore:8,riserva:64,ricarica:2.8,dispersione:.004,esplosione:hn(2.6,700,"energia")}),ioni:cn({nome:"Revolver a ioni",modello:"Gun_Revolver",colore:16767050,danno:1100,cadenza:.5,caricatore:6,riserva:48,ricarica:2.6,dispersione:.004,esplosione:hn(1.2,300,"energia")}),fulmine:cn({nome:"Spara-fulmini",modello:"Gun_Revolver",colore:12577023,danno:800,cadenza:.8,caricatore:8,riserva:40,ricarica:3,dispersione:.004,esplosione:hn(5,600,"fulmine")}),impulsi:cn({nome:"Revolver a impulsi",modello:"Gun_Revolver",colore:16732120,danno:450,cadenza:.25,caricatore:12,riserva:96,ricarica:2.4,dispersione:.01,esplosione:hn(1.5,250,"energia")}),fucilePlasma:cn({nome:"Fucile al plasma",modello:"Gun_Rifle",colore:4063115,danno:180,cadenza:.08,automatica:!0,caricatore:50,riserva:300,ricarica:2.8,dispersione:.018,esplosione:hn(1,110,"energia")}),lanciafiamme:cn({nome:"Fiammatore stellare",modello:"Gun_Rifle",colore:16742938,danno:30,cadenza:.05,automatica:!0,caricatore:100,riserva:300,ricarica:3.5,pallini:5,dispersione:.15,portata:7,fiamma:!0}),lanciagranate:cn({nome:"Lancia-sfere",modello:"Gun_Rifle",colore:16727976,danno:300,cadenza:.9,caricatore:4,riserva:32,ricarica:2.5,dispersione:.01,esplosione:hn(3,900,"fuoco",16727976)}),lanciarazzi:cn({nome:"Cannone a particelle",modello:"Gun_Sniper",colore:16724016,danno:500,cadenza:1.2,caricatore:3,riserva:18,ricarica:3,dispersione:.006,esplosione:hn(3.5,1400,"fuoco")}),laser:cn({nome:"Precisione al laser",modello:"Gun_Sniper",colore:5232895,danno:1600,cadenza:.6,caricatore:8,riserva:48,ricarica:2.8,dispersione:0,mirino:!0,esplosione:hn(.8,300,"energia")}),disintegratore:cn({nome:"Disintegratore",modello:"Gun_Sniper",colore:14725375,danno:700,cadenza:.1,automatica:!0,caricatore:60,riserva:360,ricarica:3,dispersione:.01,esplosione:hn(2,500,"energia"),segreta:!0})}),Dd=Object.freeze({pistola:"Pistola Rovente",pompa:"Pompa Tempesta",mitra:"Mitra Vespa",assalto:"Assalto Lupo",mitragliatrice:"Mitragliatrice Tuono",precisione:"Precisione Falco",raggi:"Raggi Supernova",disintegratore:"Fine del Mondo"}),zl=Object.freeze(["Furia","Spettro","Cobra","Drago","Valanga","Inferno","Tempesta","Lupo","Falco","Vespa","Uragano","Tuono","Vipera"]);function zd(i,e,t){return Object.freeze({...i,nome:Dd[e]??`${i.nome} ${zl[t%zl.length]}`,danno:i.danno*2,caricatore:Math.round(i.caricatore*1.5),riserva:i.riserva*2,ricarica:i.ricarica*.85,esplosione:i.esplosione?hn(i.esplosione.raggio*1.4,i.esplosione.danno*2,i.esplosione.tipo,i.esplosione.colore):void 0,potenziata:!0,base:e})}const ct=Object.freeze({...ms,...Object.fromEntries(Object.entries(ms).map(([i,e],t)=>[`${i}+`,zd(e,i,t)]))}),Gh=Object.freeze(Object.keys(ms)),Wh=i=>i.endsWith("+")?null:`${i}+`,gs=i=>i.endsWith("+")?i.slice(0,-1):i,bo=Object.freeze({danno:150,attesa:.6,portata:1.6}),Ud=Object.freeze({pistola:1,revolver:.9,mitra:1,assalto:1,battaglia:.8,mitragliatrice:.6,pompa:.9,precisione:.7,aliena:.35}),Xh=Object.freeze(Gh.filter(i=>i!=="pistola"&&!ms[i].segreta)),Ul=Object.freeze(Object.fromEntries(Xh.map(i=>[i,Ud[ms[i].famiglia]]))),Wi=Object.freeze({ferro:Object.freeze({nome:"Bibita Ferro",descrizione:"più vita",costo:2500,colore:12597547}),lampo:Object.freeze({nome:"Bibita Lampo",descrizione:"ricarica veloce",costo:2e3,colore:2600544}),ritorno:Object.freeze({nome:"Bibita Ritorno",descrizione:"rianimi in fretta",costo:1500,colore:3049182})}),Eo=Object.freeze({normale:Object.freeze({nome:"Zombie",vita:1,velocita:1,danno:1,portata:1,punti:1}),base:Object.freeze({nome:"Zombie verde",vita:1,velocita:1,danno:1,portata:1,punti:1}),scheletro:Object.freeze({nome:"Costola",vita:.6,velocita:1.25,danno:.8,portata:1,punti:1,corre:!0}),braccio:Object.freeze({nome:"Braccione",vita:1.5,velocita:.95,danno:1.3,portata:1.45,punti:1.5}),grasso:Object.freeze({nome:"Ciccione",vita:3.2,velocita:.65,danno:1.7,portata:1.1,punti:2.5}),cane:Object.freeze({nome:"Cane infetto",vita:.45,velocita:1.55,danno:.6,portata:.9,punti:1,corre:!0}),manichino:Object.freeze({nome:"Manichino",vita:1,velocita:0,danno:0,portata:0,punti:0})}),jh=Object.freeze(Object.keys(Eo));function Fd(i){return{normale:.55,base:.45,scheletro:i>=3?.18:0,braccio:i>=4?.15:0,grasso:i>=5?.1+Math.min(.1,(i-5)*.01):0,cane:i>=6?.12:0}}function Bd(i,e){const t=Object.entries(Fd(i)).filter(([,r])=>r>0);let n=e*t.reduce((r,[,s])=>r+s,0);for(const[r,s]of t)if(n-=s,n<0)return r;return t[t.length-1][0]}const Tn=Object.freeze({bomba:Object.freeze({nome:"Bomba!",descrizione:"tutti gli zombie saltano in aria",colore:16738858,simbolo:"BOOM"}),munizioni:Object.freeze({nome:"Munizioni al massimo",descrizione:"tutte le armi cariche",colore:10215773,simbolo:"MAX"}),doppi:Object.freeze({nome:"Punti doppi",descrizione:"per 30 secondi",colore:16767050,simbolo:"x2",durata:30}),secco:Object.freeze({nome:"Colpo secco",descrizione:"ogni colpo uccide, 30 secondi",colore:15921906,simbolo:"☠",durata:30}),saldi:Object.freeze({nome:"Saldi!",descrizione:"la cassa costa 10 punti, 30 secondi",colore:5227519,simbolo:"%",durata:30}),carpentiere:Object.freeze({nome:"Carpentiere",descrizione:"tutte le finestre riparate",colore:12749646,simbolo:"⚒"}),infinite:Object.freeze({nome:"Caricatore infinito",descrizione:"niente ricarica per 30 secondi",colore:16732120,simbolo:"∞",durata:30})}),Si=Object.freeze(Object.keys(Tn)),qh=Object.freeze(Si.filter(i=>Tn[i].durata));function kd(i){return 6+3*(i-1)}function Vd(i){return i<10?150+100*(i-1):Math.round(950*1.1**(i-9))}function Hd(i){return i<=2?0:i===3?.25:i===4?.5:i<8?.8:1}function Gd(i){return Math.max(.6,2-(i-1)*.15)}function Yh(i){const e=i+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),[((t^t>>>14)>>>0)/4294967296,e]}function Wd(){return Math.floor(Math.random()*4294967296)>>>0}const To=.3,_s=3.2,Gc=Object.freeze([Object.freeze({id:"atrio",nome:"Atrio",x0:-8,z0:-6,x1:8,z1:6,pavimento:"piastrelle"}),Object.freeze({id:"corridoio",nome:"Corridoio",x0:-2,z0:6,x1:2,z1:22,pavimento:"piastrelle"}),Object.freeze({id:"palestra",nome:"Palestra",x0:8,z0:-8,x1:24,z1:8,pavimento:"parquet"}),Object.freeze({id:"mensa",nome:"Mensa",x0:-16,z0:10,x1:-2,z1:24,pavimento:"linoleum"}),Object.freeze({id:"laboratorio",nome:"Laboratorio",x0:-2,z0:22,x1:8,z1:32,pavimento:"piastrelle"}),Object.freeze({id:"caldaia",nome:"Caldaia",x0:18,z0:-16,x1:26,z1:-8,pavimento:"cemento"}),Object.freeze({id:"cortile",nome:"Cortile",x0:8,z0:8,x1:26,z1:30,pavimento:"asfalto",aperto:!0}),Object.freeze({id:"sala",nome:"Sala d'attesa",x0:-48,z0:-5,x1:-28,z1:5,pavimento:"parquet",sala:!0})]),$i=Object.freeze({x0:-48,z0:-5,x1:-28,z1:5}),Ai=Object.freeze({x0:-18,z0:-18,x1:28,z1:34}),tt=(i,e,t)=>({x0:e,z0:i-To/2,x1:t,z1:i+To/2}),lt=(i,e,t)=>({x0:i-To/2,z0:e,x1:i+To/2,z1:t}),Wc=Object.freeze([tt(-6,-8,-5),tt(-6,-3,3),tt(-6,5,8),lt(-8,-6,-1),lt(-8,1,6),tt(6,-8,-1),tt(6,1,8),lt(8,-8,-1),lt(8,1,8),lt(-2,6,13),lt(-2,15,22),lt(2,6,13),lt(2,15,22),tt(22,-2,-1),tt(22,1,8),tt(-8,8,15),tt(-8,17,20),tt(-8,22,24),lt(24,-8,-4),lt(24,-2,3),lt(24,5,8),tt(8,8,10),tt(8,12,24),tt(10,-16,-12),tt(10,-10,-2),lt(-16,10,15),lt(-16,17,24),tt(24,-16,-10),tt(24,-8,-2),lt(-2,22,24),lt(-2,24,27),lt(-2,29,32),lt(8,22,32),tt(32,-2,0),tt(32,2,8),lt(18,-16,-8),tt(-8,24,26),lt(26,-16,-13),lt(26,-11,-8),tt(-16,18,21),tt(-16,23,26),tt(-5,-48,-28),tt(5,-48,-28),lt(-48,-5,5),lt(-28,-5,5)].map(Object.freeze)),Kh=Object.freeze([lt(8,8,22),tt(30,8,16),tt(30,18,26),lt(26,8,18),lt(26,20,30),tt(8,24,26)].map(Object.freeze)),Ns=2.6,Xc=Object.freeze([Object.freeze({x0:18,z0:5.2,x1:22.5,z1:7.8,altezza:1.2,tipo:"tribuna"}),Object.freeze({x0:11.5,z0:-3,x1:13,z1:-2,altezza:.9,tipo:"cavallina"}),Object.freeze({x0:-6.5,z0:1.5,x1:-4.5,z1:2.5,altezza:.8,tipo:"banco"}),Object.freeze({x0:-14,z0:12.5,x1:-10,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:12.5,x1:-4,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:16.5,x1:-10,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:16.5,x1:-4,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:20.5,x1:-10,z1:21.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-15.6,z0:22.6,x1:-11,z1:23.6,altezza:1.1,tipo:"bancone"}),Object.freeze({x0:0,z0:25,x1:2.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:4,z0:25,x1:6.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:0,z0:29,x1:2.5,z1:30,altezza:.95,tipo:"bancone"}),Object.freeze({x0:18.9,z0:-14,x1:21.2,z1:-11.8,altezza:2.6,tipo:"caldaia"}),Object.freeze({x0:19,z0:22,x1:24.5,z1:24.6,altezza:2.8,tipo:"pulmino"}),Object.freeze({x0:11.2,z0:16.2,x1:11.8,z1:16.8,altezza:4,tipo:"albero"}),Object.freeze({x0:21.7,z0:13.2,x1:22.3,z1:13.8,altezza:4,tipo:"albero"}),Object.freeze({x0:12.2,z0:26.2,x1:12.8,z1:26.8,altezza:4,tipo:"albero"}),Object.freeze({x0:15,z0:11.6,x1:17.5,z1:12.1,altezza:.5,tipo:"panchina"}),Object.freeze({x0:9.2,z0:20,x1:9.7,z1:22.5,altezza:.5,tipo:"panchina"}),Object.freeze({x0:16.85,z0:19.85,x1:17.15,z1:20.15,altezza:3,tipo:"lampione"}),Object.freeze({x0:10.35,z0:27.35,x1:10.65,z1:27.65,altezza:3,tipo:"lampione"})]);function Bt(i,e,t,n,r,s,o,a=!1){const c=t==="z"?{x:(r+s)/2,z:n}:{x:n,z:(r+s)/2},l=t==="z"?tt(n,r,s):lt(n,r,s),u=t==="z"?{x:0,z:o}:{x:o,z:0};return Object.freeze({id:i,zona:e,asse:t,centro:Object.freeze(c),scatola:Object.freeze(l),esterno:Object.freeze({x:c.x+u.x*1.1,z:c.z+u.z*1.1}),interno:Object.freeze({x:c.x-u.x*1.1,z:c.z-u.z*1.1}),comparsa:Object.freeze({x:c.x+u.x*4,z:c.z+u.z*4}),fuori:Object.freeze(u),recinzione:a})}const Dn=Object.freeze([Bt("a1","atrio","z",-6,-5,-3,-1),Bt("a2","atrio","z",-6,3,5,-1),Bt("a3","atrio","x",-8,-1,1,-1),Bt("c2","corridoio","x",2,13,15,1),Bt("p1","palestra","z",-8,15,17,-1),Bt("p2","palestra","x",24,-4,-2,1),Bt("p3","palestra","x",24,3,5,1),Bt("m1","mensa","x",-16,15,17,-1),Bt("m2","mensa","z",24,-10,-8,1),Bt("m3","mensa","z",10,-12,-10,-1),Bt("l1","laboratorio","z",32,0,2,1),Bt("l2","laboratorio","x",-2,27,29,-1),Bt("g1","cortile","z",30,16,18,1,!0),Bt("g2","cortile","x",26,18,20,1,!0),Bt("k1","caldaia","z",-16,21,23,-1),Bt("k2","caldaia","x",26,-13,-11,1)]);function Zi(i,e,t,n,r){return Object.freeze({id:i,nome:e,costo:t,zone:Object.freeze(n),scatola:Object.freeze(r),centro:Object.freeze({x:(r.x0+r.x1)/2,z:(r.z0+r.z1)/2})})}const Xi=Object.freeze([Zi("corridoio","Porta del corridoio",750,["atrio","corridoio"],tt(6,-1,1)),Zi("palestra","Porta della palestra",1e3,["atrio","palestra"],lt(8,-1,1)),Zi("mensa","Porta della mensa",1250,["corridoio","mensa"],lt(-2,13,15)),Zi("laboratorio","Porta del laboratorio",1500,["corridoio","laboratorio"],tt(22,-1,1)),Zi("caldaia","Porta della caldaia",1e3,["palestra","caldaia"],tt(-8,20,22)),Zi("cortile","Porta del cortile",1250,["palestra","cortile"],tt(8,10,12))]),Zn=Object.freeze([Object.freeze({id:"muro-pompa",tipo:"arma",arma:"pompa",costo:800,munizioni:400,zona:"atrio",posizione:Object.freeze({x:-5,z:5.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-mitra",tipo:"arma",arma:"mitra",costo:1200,munizioni:600,zona:"corridoio",posizione:Object.freeze({x:-1.84,z:10}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-assalto",tipo:"arma",arma:"assalto",costo:1500,munizioni:750,zona:"palestra",posizione:Object.freeze({x:14,z:7.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-precisione",tipo:"arma",arma:"precisione",costo:1750,munizioni:900,zona:"mensa",posizione:Object.freeze({x:-15.84,z:20}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"bibita-ferro",tipo:"bevanda",bevanda:"ferro",zona:"atrio",posizione:Object.freeze({x:7,z:4.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-lampo",tipo:"bevanda",bevanda:"lampo",zona:"corridoio",posizione:Object.freeze({x:1.45,z:19.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-ritorno",tipo:"bevanda",bevanda:"ritorno",zona:"palestra",posizione:Object.freeze({x:23,z:-6.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"cassa",tipo:"cassa",zona:"palestra",posizione:Object.freeze({x:16,z:7.2}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"interruttore",tipo:"interruttore",zona:"caldaia",posizione:Object.freeze({x:25.7,z:-9.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"potenziatore",tipo:"potenziatore",zona:"laboratorio",posizione:Object.freeze({x:6.6,z:30.6}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-raffica",tipo:"arma",arma:"raffica",costo:900,munizioni:450,zona:"laboratorio",posizione:Object.freeze({x:7.84,z:24.2}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-carabina",tipo:"arma",arma:"carabina",costo:1600,munizioni:800,zona:"cortile",posizione:Object.freeze({x:18,z:8.16}),verso:Object.freeze({x:0,z:1})}),Object.freeze({id:"muro-doppietta",tipo:"arma",arma:"doppietta",costo:1e3,munizioni:500,zona:"caldaia",posizione:Object.freeze({x:18.16,z:-9.6}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"campanella",tipo:"campanella",zona:"atrio",posizione:Object.freeze({x:-3,z:5.84}),verso:Object.freeze({x:0,z:-1})})]);function $h(i){if(i.tipo==="arma"||i.tipo==="interruttore"||i.tipo==="campanella")return null;const{x:e,z:t}=i.posizione,n=i.tipo==="potenziatore"?.8:.5,r=i.tipo==="potenziatore"?.6:.35;return i.verso.x!==0?{x0:e-r,z0:t-n,x1:e+r,z1:t+n}:{x0:e-n,z0:t-r,x1:e+n,z1:t+r}}const wo=Object.freeze([Object.freeze({x:-1.5,z:0}),Object.freeze({x:1.5,z:0})]),Xd=Object.freeze([Object.freeze({x:-45,z:-1.2}),Object.freeze({x:-45,z:1.2})]),Zh=Gh.filter(i=>!ct[i].segreta),qa=Math.ceil(Zh.length/2),jd=18.4/qa,jc=Object.freeze(Zh.map((i,e)=>{const t=e<qa,n=t?e:e-qa;return Object.freeze({arma:i,x:-47.2+jd*(n+.5),z:t?-4.84:4.84,verso:Object.freeze({x:0,z:t?1:-1})})})),qd=Object.freeze([Object.freeze({x:-31.5,z:-2.6}),Object.freeze({x:-30.5,z:0}),Object.freeze({x:-31.5,z:2.6})]),Os=Object.freeze({x:-28.16,z:0,verso:Object.freeze({x:-1,z:0})}),ki=Object.freeze([Object.freeze({id:0,x:19.6,z:-15.3,y:.25}),Object.freeze({id:1,x:-13.4,z:13,y:.86}),Object.freeze({id:2,x:12.5,z:27.7,y:.25})]),Mn=(i,e,t,n)=>Object.freeze({x0:i-t/2,z0:e-n/2,x1:i+t/2,z1:e+n/2,altezza:1}),Jh=Object.freeze([{modello:"Container_Red",x:30.5,z:13.5,rot:Math.PI/2},{modello:"Container_Green",x:31,z:25.5,rot:Math.PI/2+.08},{modello:"Container_Green",x:2.5,z:36.5,rot:.05},{modello:"WaterTower",x:35,z:36,rot:0},{modello:"TownSign",x:13,z:35.5,rot:0},{modello:"StreetLights",x:21,z:33.5,rot:Math.PI},{modello:"StreetLights",x:30,z:6,rot:-Math.PI/2},{modello:"Barrel",x:25.2,z:9,rot:.3,solido:Mn(25.2,9,.7,.7)},{modello:"Barrel",x:24.4,z:9.3,rot:1.2,solido:Mn(24.4,9.3,.7,.7)},{modello:"TrafficCone_1",x:13.8,z:9.4,rot:0},{modello:"TrafficCone_2",x:14.6,z:9.1,rot:.6},{modello:"TrafficBarrier_1",x:9.5,z:14.5,rot:Math.PI/2,solido:Mn(9.5,14.5,.9,1.56)},{modello:"PlasticBarrier",x:22,z:28.7,rot:.1,solido:Mn(22,28.7,1.04,.4)},{modello:"TrashBag_1",x:25.3,z:28.9,rot:0},{modello:"TrashBag_2",x:24.4,z:29.2,rot:2},{modello:"Pallet",x:25.2,z:26.4,rot:.2},{modello:"Pallet_Broken",x:24.9,z:11.4,rot:1.4},{modello:"Wheels_Stack",x:18.5,z:25.2,rot:0,solido:Mn(18.5,25.2,.66,.6)},{modello:"FireHydrant",x:9,z:9.1,rot:.8},{modello:"Blood_1",x:15,z:18,rot:.4},{modello:"Blood_2",x:3,z:-2.5,rot:1.1},{modello:"Blood_3",x:0,z:17,rot:0},{modello:"Blood_2",x:-9,z:15,rot:2.2},{modello:"Blood_3",x:20,z:1,rot:.7},{modello:"Blood_1",x:2,z:28,rot:2.6},{modello:"Pipes",x:18.5,z:-12.9,rot:0,solido:Mn(18.5,-12.9,.75,3.36)},{modello:"CinderBlock",x:25.3,z:-15.3,rot:.3},{modello:"CinderBlock",x:25.1,z:-14.8,rot:1.5},{modello:"TrashBag_1",x:-10.2,z:23.3,rot:0},{modello:"Barrel",x:7.3,z:23.1,rot:0,solido:Mn(7.3,23.1,.7,.7)},{modello:"Chest",x:9.6,z:-7.2,rot:0,solido:Mn(9.6,-7.2,.64,.48)},{modello:"Couch",x:-44.5,z:3.9,rot:Math.PI,solido:Mn(-44.5,3.9,3,1.2)},{modello:"Barrel",x:-29,z:-4,rot:0,solido:Mn(-29,-4,.7,.7)},{modello:"Barrel",x:-29,z:4,rot:1,solido:Mn(-29,4,.7,.7)}].map(Object.freeze));function qc(i){const e=new Set(["atrio"]);for(const t of Xi)i.has(t.id)&&t.zone.forEach(n=>e.add(n));return e}function Yc(i){return[...Wc,...Kh,...Xc,...Dn.map(e=>e.scatola),...Xi.filter(e=>!i.has(e.id)).map(e=>e.scatola),...Zn.map($h).filter(Boolean),...Jh.filter(e=>e.solido).map(e=>e.solido)]}const Yd=.2,Fl=(i,e,t)=>Math.min(t,Math.max(e,i));function Kd(i,e,t,n){const r=Fl(i,n.x0,n.x1),s=Fl(e,n.z0,n.z1),o=i-r,a=e-s,c=o*o+a*a;if(c>=t*t)return[i,e];if(c>1e-9){const f=Math.sqrt(c);return[r+o/f*t,s+a/f*t]}const l=[[i-n.x0,n.x0-t,e],[n.x1-i,n.x1+t,e],[e-n.z0,i,n.z0-t],[n.z1-e,i,n.z1+t]],[,u,h]=l.reduce((f,d)=>d[0]<f[0]?d:f);return[u,h]}function Qh(i,e,t,n,r){let{x:s,z:o}=i;const a=Math.max(1,Math.ceil(Math.hypot(e,t)/Yd));for(let c=0;c<a;c++){s+=e/a,o+=t/a;for(let l=0;l<2;l++)for(const u of r)[s,o]=Kd(s,o,n,u)}return{x:s,z:o}}function $d(i,e,t){const n=e.x-i.x,r=e.z-i.z;for(const s of t){let o=0,a=1,c=!1;for(const[l,u,h,f]of[[i.x,n,s.x0,s.x1],[i.z,r,s.z0,s.z1]]){if(Math.abs(u)<1e-9){(l<h||l>f)&&(c=!0);continue}let d=(h-l)/u,_=(f-l)/u;d>_&&([d,_]=[_,d]),o=Math.max(o,d),a=Math.min(a,_)}if(!c&&o<=a)return!1}return!0}function Bl(i,e,t,n=0){return i>=t.x0-n&&i<=t.x1+n&&e>=t.z0-n&&e<=t.z1+n}const po=Object.freeze({raggio:.32,basso:0,alto:1.45}),Ya=Object.freeze({raggio:.17,altezza:1.62});function Zd(i,e,t,n=0,r=_s){let s=0,o=1/0;for(const[a,c,l,u]of[[i.x,e.x,t.x0,t.x1],[i.y,e.y,n,r],[i.z,e.z,t.z0,t.z1]]){if(Math.abs(c)<1e-9){if(a<l||a>u)return 1/0;continue}let h=(l-a)/c,f=(u-a)/c;if(h>f&&([h,f]=[f,h]),s=Math.max(s,h),o=Math.min(o,f),s>o)return 1/0}return s}function Jd(i,e,t,n){const r=i.x-t.x,s=i.y-t.y,o=i.z-t.z,a=r*e.x+s*e.y+o*e.z,c=r*r+s*s+o*o-n*n,l=a*a-c;if(l<0)return 1/0;const u=-a-Math.sqrt(l);return u>=0?u:1/0}function Qd(i,e,t,n,r,s,o){const a=i.x-t,c=i.z-n,l=e.x*e.x+e.z*e.z;if(l<1e-12)return 1/0;const u=a*e.x+c*e.z,h=a*a+c*c-r*r,f=u*u-l*h;if(f<0)return 1/0;const d=(-u-Math.sqrt(f))/l;if(d<0)return 1/0;const _=i.y+e.y*d;return _>=s&&_<=o?d:1/0}function ep(i,e,t){let n=1/0;for(const r of t)n=Math.min(n,Zd(i,e,r,0,r.altezza??_s));return n}function ef(i,e,t,n,r=1/0){const s=Math.min(r,ep(i,e,n));let o=null;for(const a of t){const c=Jd(i,e,a.testa??{x:a.x,y:Ya.altezza,z:a.z},Ya.raggio),l=Qd(i,e,a.x,a.z,a.raggio??po.raggio,po.basso,a.alto??po.alto),u=Math.min(c,l);u>=s||o&&u>=o.t||(o={id:a.id,t:u,testa:c<=l})}return o??{id:null,t:s,testa:!1}}function tp(i,e,t){const n=[];for(const r of e){const s=Math.hypot(r.x-i.x,po.alto/2-i.y,r.z-i.z);s<t&&n.push({id:r.id,fattore:1-s/t})}return n}function tf(i,e){const t=Math.cos(e);return{x:Math.sin(i)*t,y:Math.sin(e),z:Math.cos(i)*t}}function np(i,e,t){if(e<=0)return i;const n=i.x+(t()-.5)*2*e,r=i.y+(t()-.5)*2*e,s=i.z+(t()-.5)*2*e,o=Math.hypot(n,r,s);return{x:n/o,y:r/o,z:s/o}}const ip=.5,nf=.35,Ro=i=>({tipo:i,caricatore:ct[i].caricatore,riserva:ct[i].riserva});function rf(){return{armi:[Ro("pistola")],attiva:0,attesa:0,ricarica:0,cambio:0,coltello:0}}const Yt=i=>i.armi[i.attiva],sf=i=>i.ricarica>0||i.cambio>0||i.coltello>0;function rp(i,e){if(i.attesa=Math.max(0,i.attesa-e),i.cambio=Math.max(0,i.cambio-e),i.coltello=Math.max(0,i.coltello-e),i.ricarica<=0||(i.ricarica-=e,i.ricarica>0))return!1;i.ricarica=0;const t=Yt(i),n=ct[t.tipo].caricatore-t.caricatore,r=Math.min(n,t.riserva);return t.caricatore+=r,t.riserva-=r,!0}function sp(i){const e=Yt(i);return sf(i)||i.attesa>0||e.caricatore<=0?null:(e.caricatore-=1,i.attesa=ct[e.tipo].cadenza,ct[e.tipo])}function ea(i,e=[]){const t=Yt(i);return sf(i)||t.riserva<=0||t.caricatore>=ct[t.tipo].caricatore?!1:(i.ricarica=ct[t.tipo].ricarica*(e.includes("lampo")?ip:1),!0)}function op(i){return i.coltello>0||i.cambio>0?!1:(i.ricarica=0,i.coltello=bo.attesa,!0)}function kl(i,e=(i.attiva+1)%i.armi.length){return e===i.attiva||!i.armi[e]?!1:(i.attiva=e,i.ricarica=0,i.cambio=nf,!0)}function ap(i,e,t=null){var s;const n=(s=Yt(i))==null?void 0:s.tipo,r=new Map(i.armi.map(o=>[o.tipo,o]));i.armi=e.map(o=>o===t?Ro(o):r.get(o)??Ro(o)),i.attiva=Math.max(0,i.armi.findIndex(o=>o.tipo===(t??n))),t&&(i.cambio=nf,i.ricarica=0)}function Vl(i,e){const t=i.armi.find(n=>n.tipo===e);t&&Object.assign(t,Ro(e))}function Ka(i){Object.assign(i,rf())}const _r=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z);function cp(i){let e=null;for(const r of jc){const s=_r(r,i);s<=te.DISTANZA_PROVA&&(!e||s<e.d)&&(e={d:s,posto:r})}if(!e)return null;const t=e.posto.arma,n=i.armi.includes(t);return{tipo:"prova",arma:t,acquisto:`prova:${t}`,testo:n?`${ct[t].nome}: ce l'hai già`:`Premi F per provare: ${ct[t].nome}`}}function lp(i,e){var s;if(e.fase==="attesa")return cp(i);const t=e.giocatori.find(o=>o.id!==i.id&&o.stato==="terra"&&_r(o,i)<=te.RIANIMA_DISTANZA);if(t)return{tipo:"rianima",testo:`Tieni premuto F per rianimare ${t.nome}`,bersaglio:t.id};const n=[];for(const o of ki){if((s=e.frammenti)!=null&&s.includes(o.id))continue;const a=_r(o,i);a<=te.DISTANZA_FRAMMENTO&&n.push({d:a-1,tipo:"frammento",id:o.id,acquisto:`frammento:${o.id}`,testo:"Premi F per raccogliere lo strano frammento luminoso"})}for(const o of Xi){if(e.porte.has(o.id))continue;const a=_r(o.centro,i);a<=te.DISTANZA_ACQUISTO&&n.push({d:a,tipo:"compra",acquisto:`porta:${o.id}`,costo:o.costo,testo:`Premi F per aprire: ${o.nome} [${o.costo}]`})}for(const o of Dn){if(e.finestre[o.id]>=te.ASSE_PER_FINESTRA)continue;const a=_r(o.interno,i);a<=te.DISTANZA_FINESTRA&&n.push({d:a+.5,tipo:"assa",finestra:o.id,testo:"Tieni premuto F per rimettere le assi"})}const r=qc(e.porte);for(const o of Zn){if(!r.has(o.zona))continue;const a=_r(o.posizione,i);a>te.DISTANZA_ACQUISTO||n.push({d:a,tipo:"compra",acquisto:o.id,...hp(o,i,e)})}return n.sort((o,a)=>o.d-a.d),n[0]??null}function up(i,e){const t=e.potenziatore;return e.corrente?t.stato==="pronta"&&t.per===i.id?{costo:0,testo:`Premi F per prendere: ${ct[t.arma].nome}`}:t.stato!=="libero"?{costo:1/0,testo:t.per===i.id?"Il potenziatore sta lavorando…":"Il potenziatore è occupato"}:(i.armaAttiva?Wh(i.armaAttiva):null)?{costo:te.COSTO_POTENZIA,testo:`Premi F per potenziare: ${ct[i.armaAttiva].nome} [${te.COSTO_POTENZIA}]`}:{costo:1/0,testo:"Questa arma è già potenziata"}:{costo:1/0,testo:"Il potenziatore non ha corrente: accendila in caldaia"}}function hp(i,e,t){var s;if(i.tipo==="arma"){const o=e.armi.some(c=>gs(c)===i.arma),a=o?i.munizioni:i.costo;return{costo:a,testo:o?`Premi F per le munizioni: ${ct[i.arma].nome} [${a}]`:`Premi F per comprare: ${ct[i.arma].nome} [${a}]`}}if(i.tipo==="bevanda"){const o=Wi[i.bevanda];return e.bevande.includes(i.bevanda)?{costo:1/0,testo:`${o.nome}: ce l'hai già`}:{costo:o.costo,testo:`Premi F per bere: ${o.nome}, ${o.descrizione} [${o.costo}]`}}if(i.tipo==="interruttore")return t.corrente?{costo:1/0,testo:"La corrente è accesa"}:{costo:0,testo:"Premi F per accendere la corrente"};if(i.tipo==="potenziatore")return up(e,t);if(i.tipo==="campanella")return{costo:0,testo:"Premi F per suonare la vecchia campanella"};const n=t.cassa;if(n.stato==="aperta"&&n.per===e.id)return{costo:0,testo:`Premi F per prendere: ${ct[n.arma].nome}`};if(n.stato==="aperta")return{costo:1/0,testo:"La cassa è occupata"};const r=((s=t.effetti)==null?void 0:s.saldi)>0?te.COSTO_CASSA_SALDI:te.COSTO_CASSA;return{costo:r,testo:`Premi F per la cassa a sorpresa [${r}]${r<te.COSTO_CASSA?" SALDI!":""}`}}const Er=.5,vs=Math.ceil((Ai.x1-Ai.x0)/Er),Co=Math.ceil((Ai.z1-Ai.z0)/Er),of=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]],ta=new Map,dn=(i,e)=>e*vs+i,af=(i,e)=>[Math.floor((i-Ai.x0)/Er),Math.floor((e-Ai.z0)/Er)],cf=(i,e)=>[Ai.x0+(i+.5)*Er,Ai.z0+(e+.5)*Er],Io=(i,e)=>i>=0&&e>=0&&i<vs&&e<Co;function fp(i){const e=[...i].sort().join(",");if(ta.has(e))return ta.get(e);const t=Yc(i),n=new Uint8Array(vs*Co);for(let s=0;s<Co;s++)for(let o=0;o<vs;o++){const[a,c]=cf(o,s),l=Gc.some(h=>Bl(a,c,h)),u=t.some(h=>Bl(a,c,h,te.RAGGIO_ZOMBIE));n[dn(o,s)]=l&&!u?1:0}const r={libera:n};return ta.set(e,r),r}function dp(i,e){const t=new Float32Array(vs*Co).fill(1/0),n=[];for(const{x:r,z:s}of e){const[o,a]=af(r,s);Io(o,a)&&(t[dn(o,a)]=0,n.push([o,a]))}for(let r=0;r<n.length;r++){const[s,o]=n[r],a=t[dn(s,o)];for(const[c,l,u]of of){const h=s+c,f=o+l;if(!Io(h,f)||!i.libera[dn(h,f)]||c&&l&&(!i.libera[dn(s+c,o)]||!i.libera[dn(s,o+l)]))continue;const d=a+u;d>=t[dn(h,f)]||(t[dn(h,f)]=d,n.push([h,f]))}}return{distanze:t,libera:i.libera}}function pp(i,e,t){const[n,r]=af(e,t);if(!Io(n,r))return null;let s=i.distanze[dn(n,r)],o=null;for(const[u,h]of of){const f=n+u,d=r+h;if(!Io(f,d)||u&&h&&(!i.libera[dn(n+u,r)]||!i.libera[dn(n,r+h)]))continue;const _=i.distanze[dn(f,d)];_<s&&(s=_,o=[f,d])}if(!o)return null;const[a,c]=cf(o[0],o[1]),l=Math.hypot(a-e,c-t)||1;return{x:(a-e)/l,z:(c-t)/l}}const lf=3,Tr=.8,mp=2e3,gp=.25,uf=4,_p=.55,Hl=.75,vp="disintegratore",Gl=Object.freeze({x:-3,z:4.4}),ti=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Kc=i=>Dn.find(e=>e.id===i),hf=i=>Eo[i.tipo]??Eo.normale,xp=()=>Object.fromEntries(Si.filter(i=>Tn[i].durata).map(i=>[i,0]));function wr(i,e,t){e.punti+=Math.round(t)*(i.effetti.doppi>0?2:1)}function Pn(i){const[e,t]=Yh(i.rng);return i.rng=t,e}function Mp({seme:i,giocatori:e=[],sala:t=!1}){const n={seme:i>>>0,rng:(i^1540483477)>>>0,tempo:0,fase:t?"attesa":"intervallo",timerFase:t?0:lf,conto:null,bonus:[],bonusRound:0,prossimoBonus:1,effetti:xp(),frammenti:[],segreto:!1,campanella:!1,round:0,daGenerare:0,attesaComparsa:0,prossimoId:1,zombie:[],finestre:Object.fromEntries(Dn.map(r=>[r.id,te.ASSE_PER_FINESTRA])),porte:[],giocatori:[],cassa:{stato:"chiusa",arma:null,per:null,timer:0},corrente:!1,potenziatore:{stato:"libero",arma:null,per:null,timer:0},campo:null,attesaCampo:0};return e.forEach(r=>$c(n,r)),t&&qd.forEach((r,s)=>n.zombie.push(yp(n,r,s))),n}function yp(i,e,t){return{id:i.prossimoId++,x:e.x,z:e.z,yaw:-Math.PI/2,stato:"dentro",finestra:null,tipo:"manichino",vita:te.VITA_MANICHINO,vitaMax:te.VITA_MANICHINO,corre:!1,variante:t,timer:0,attesa:0,bersaglio:null}}function $c(i,{id:e,nome:t}){const n=i.giocatori.find(a=>a.id===e);if(n)return n.nome=t,n;const r=i.fase==="attesa"?Xd:wo,s=r[i.giocatori.length%r.length],o={id:e,nome:t,x:s.x,z:s.z,yaw:i.fase==="attesa"?Math.PI/2:Math.PI,pitch:0,pronto:!1,stato:"vivo",vita:te.VITA,vitaMax:te.VITA,ultimoDanno:-1/0,timerTerra:0,punti:te.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,progressoRianimazione:0,attesaAssa:0,colpi:0,uccisioni:0,teletrasporto:0};return i.giocatori.push(o),o}function ff(i,e){i.giocatori=i.giocatori.filter(t=>t.id!==e)}const bi=i=>i.giocatori.filter(e=>e.stato==="vivo");function Sp(i,e){for(const t of i.giocatori){const n=e==null?void 0:e[t.id];n&&(t.armaAttiva=t.armi.includes(n.arma)?n.arma:t.armaAttiva,t.colpi=Number.isFinite(n.colpi)?n.colpi:t.colpi,!(t.stato!=="vivo"||(n.tp??0)<t.teletrasporto)&&(t.x=n.x,t.z=n.z,t.yaw=n.yaw,t.pitch=n.pitch))}}function Po(i,e,t,n,r={}){e.armi.includes(t)||(e.armi.length<2?e.armi.push(t):e.armi[e.armi.indexOf(e.armaAttiva)]=t),e.armaAttiva=t,n.push({k:"acquisto",a:e.id,arma:t,armi:[...e.armi],...r})}function Ap(i,e,t,n,r){e.armi.includes(n)&&(e.armaAttiva=n);const s=qc(new Set(i.porte));if(t.startsWith("porta:")){const h=Xi.find(f=>`porta:${f.id}`===t);if(!h||i.porte.includes(h.id)||e.punti<h.costo||ti(e,h.centro)>te.DISTANZA_ACQUISTO+Tr)return;e.punti-=h.costo,i.porte.push(h.id),r.push({k:"porta",id:h.id,da:e.id});return}const o=Zn.find(h=>h.id===t);if(!o||!s.has(o.zona)||ti(e,o.posizione)>te.DISTANZA_ACQUISTO+Tr)return;if(o.tipo==="arma"){const h=e.armi.find(d=>gs(d)===o.arma),f=h?o.munizioni:o.costo;if(e.punti<f)return;e.punti-=f,h?r.push({k:"munizioni",a:e.id,arma:h}):Po(i,e,o.arma,r);return}if(o.tipo==="interruttore"){if(i.corrente)return;i.corrente=!0,r.push({k:"corrente",da:e.id});return}if(o.tipo==="potenziatore"){bp(i,e,r);return}if(o.tipo==="campanella"){const h=!i.campanella;i.campanella=!0,h&&df(i,Gl.x,Gl.z,Si[Math.floor(Pn(i)*Si.length)],r),r.push({k:"campanella",da:e.id,regalo:h});return}if(o.tipo==="bevanda"){const h=Wi[o.bevanda];if(e.bevande.includes(o.bevanda)||e.punti<h.costo)return;e.punti-=h.costo,e.bevande.push(o.bevanda),o.bevanda==="ferro"&&(e.vitaMax=te.VITA_FERRO,e.vita=te.VITA_FERRO),r.push({k:"bevanda",a:e.id,bevanda:o.bevanda});return}const a=i.cassa;if(a.stato==="aperta"&&a.per===e.id){const h=a.arma;Object.assign(a,{stato:"chiusa",arma:null,per:null,timer:0}),Po(i,e,h,r,{daCassa:!0});return}const c=i.effetti.saldi>0?te.COSTO_CASSA_SALDI:te.COSTO_CASSA;if(a.stato!=="chiusa"||e.punti<c)return;e.punti-=c;const l=new Set(e.armi.map(gs)),u=Tp(Xh.filter(h=>!l.has(h)),Pn(i));Object.assign(a,{stato:"aperta",arma:u,per:e.id,timer:te.DURATA_CASSA}),r.push({k:"cassa",a:e.id,arma:u})}function bp(i,e,t){const n=i.potenziatore;if(n.stato==="pronta"&&n.per===e.id){const s=e.armi.indexOf(gs(n.arma));s>=0?e.armi[s]=n.arma:e.armi.length<2?e.armi.push(n.arma):e.armi[e.armi.indexOf(e.armaAttiva)]=n.arma,e.armaAttiva=n.arma,t.push({k:"acquisto",a:e.id,arma:n.arma,armi:[...e.armi],potenziata:!0}),Object.assign(n,{stato:"libero",arma:null,per:null,timer:0});return}const r=Wh(e.armaAttiva);!i.corrente||n.stato!=="libero"||!r||e.punti<te.COSTO_POTENZIA||(e.punti-=te.COSTO_POTENZIA,Object.assign(n,{stato:"lavora",arma:r,per:e.id,timer:te.DURATA_POTENZIA}),t.push({k:"potenzia",a:e.id,arma:r}))}function Ep(i,e,t){const n=i.potenziatore;if(n.stato!=="libero"&&(n.timer-=e,!(n.timer>0))){if(n.stato==="lavora"){Object.assign(n,{stato:"pronta",timer:te.ATTESA_RITIRO}),t.push({k:"potenziataPronta",a:n.per,arma:n.arma});return}Object.assign(n,{stato:"libero",arma:null,per:null,timer:0})}}function Tp(i,e){const t=i.reduce((r,s)=>r+Ul[s],0);let n=e*t;for(const r of i)if(n-=Ul[r],n<0)return r;return i[i.length-1]}function wp(i,e,t,n){const r=i.zombie.find(a=>a.id===t.zombie&&a.stato!=="morto");if(!r)return;const s=r.tipo==="manichino",o=!s&&i.effetti.secco>0?r.vita:Math.min(mp,Math.max(0,Number(t.danno)||0));if(r.vita-=o,r.vita>0){s||wr(i,e,te.PUNTI_COLPO),n.push({k:"colpito",zombie:r.id,testa:!!t.testa,da:e.id});return}r.stato="morto",r.timer=s?te.RINASCITA_MANICHINO:uf,n.push({k:"ucciso",zombie:r.id,testa:!!t.testa,da:e.id,x:r.x,z:r.z}),!s&&(e.uccisioni+=1,wr(i,e,(t.coltello?te.PUNTI_COLTELLO:t.testa?te.PUNTI_TESTA:te.PUNTI_UCCISIONE)*hf(r).punti),Rp(i,r,n))}function Rp(i,e,t){if(i.bonusRound>=te.BONUS_PER_ROUND||Pn(i)>=te.PROBABILITA_BONUS)return;const r=(e.stato==="arriva"||e.stato==="assi")&&e.finestra?Kc(e.finestra).interno:e;i.bonusRound+=1,df(i,r.x,r.z,Si[Math.floor(Pn(i)*Si.length)],t)}function df(i,e,t,n,r=[]){const s={id:i.prossimoBonus++,tipo:n,x:e,z:t,timer:te.DURATA_BONUS_A_TERRA};return i.bonus.push(s),r.push({k:"bonusCompare",id:s.id,tipo:n,x:e,z:t}),s}function Cp(i,e,t,n){const r=Tn[e.tipo];if(r.durata&&(i.effetti[e.tipo]=r.durata),e.tipo==="bomba"){for(const s of i.zombie)s.stato==="morto"||s.tipo==="manichino"||(s.stato="morto",s.timer=uf,n.push({k:"ucciso",zombie:s.id,testa:!1,da:null,x:s.x,z:s.z,bomba:!0}));for(const s of bi(i))wr(i,s,te.PUNTI_BOMBA)}if(e.tipo==="carpentiere"){for(const s of Dn)i.finestre[s.id]=te.ASSE_PER_FINESTRA;for(const s of bi(i))wr(i,s,te.PUNTI_CARPENTIERE)}n.push({k:"bonus",tipo:e.tipo,da:t.id,x:e.x,z:e.z})}function Ip(i,e,t){for(const n of Object.keys(i.effetti))i.effetti[n]=Math.max(0,i.effetti[n]-e);i.bonus=i.bonus.filter(n=>{n.timer-=e;const r=bi(i).find(s=>ti(s,n)<=te.DISTANZA_BONUS);return r?(Cp(i,n,r,t),!1):n.timer>0})}function Pp(i,e,t,n){if(i.fase!=="attesa")return;const r=jc.find(s=>s.arma===t);if(!(!r||ti(e,r)>te.DISTANZA_PROVA+Tr)){if(e.armi.includes(t)){e.armaAttiva=t;return}Po(i,e,t,n,{prova:!0})}}function Lp(i,e,t,n){const r=ki.find(s=>s.id===t);if(!(!r||i.fase==="attesa"||i.frammenti.includes(t))&&!(ti(e,r)>te.DISTANZA_FRAMMENTO+Tr)&&(i.frammenti.push(t),n.push({k:"frammento",id:t,da:e.id,trovati:i.frammenti.length,totale:ki.length}),!(i.frammenti.length<ki.length))){i.segreto=!0;for(const s of bi(i))wr(i,s,te.PUNTI_SEGRETO),Po(i,s,vp,n,{segreto:!0});n.push({k:"segreto"})}}function Np(i,e){i.zombie=[],i.conto=null,i.fase="intervallo",i.timerFase=lf,i.giocatori.forEach((t,n)=>{const r=wo[n%wo.length];Object.assign(t,{x:r.x,z:r.z,yaw:Math.PI,stato:"vivo",vita:te.VITA,vitaMax:te.VITA,punti:te.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],pronto:!1,uccisioni:0,teletrasporto:t.teletrasporto+1})}),e.push({k:"via"})}function Op(i,e,t){if(!(i.giocatori.length>0&&i.giocatori.every(r=>r.pronto))){i.conto!==null&&t.push({k:"contoAnnullato"}),i.conto=null;return}if(i.conto===null){i.conto=te.CONTO_ALLA_ROVESCIA,t.push({k:"conto",secondi:te.CONTO_ALLA_ROVESCIA});return}i.conto-=e,i.conto<=0&&Np(i,t)}function Dp(i,e,t,n){const r=Kc(t);!r||e.attesaAssa>0||i.finestre[r.id]>=te.ASSE_PER_FINESTRA||ti(e,r.interno)>te.DISTANZA_FINESTRA+Tr||i.zombie.some(s=>s.finestra===r.id&&s.stato==="scavalca")||(i.finestre[r.id]+=1,wr(i,e,te.PUNTI_ASSA),e.attesaAssa=te.RICOSTRUISCI_OGNI,n.push({k:"assaMessa",finestra:r.id,da:e.id}))}function zp(i,e,t){for(const n of e??[]){const r=i.giocatori.find(s=>s.id===n.da);if(r){if(n.tipo==="rianima"){r.rianimando=!!n.attivo;continue}if(!(r.stato!=="vivo"||i.fase==="fine"))if(n.tipo==="colpo")wp(i,r,n,t);else if(n.tipo==="pronto")r.pronto=i.fase==="attesa"&&!!n.attivo;else if(n.tipo==="prova")Pp(i,r,String(n.arma),t);else{if(i.fase==="attesa")continue;n.tipo==="compra"?Ap(i,r,String(n.acquisto),n.arma,t):n.tipo==="assa"?Dp(i,r,n.finestra,t):n.tipo==="frammento"&&Lp(i,r,Number(n.id),t)}}}}function Up(i){const e=qc(new Set(i.porte)),t=Dn.filter(c=>e.has(c.zona)),n=t[Math.floor(Pn(i)*t.length)],r=Bd(i.round,Pn(i)),s=Eo[r],o=!!s.corre||r!=="grasso"&&Pn(i)<Hd(i.round),a=Math.round(Vd(i.round)*s.vita);i.zombie.push({id:i.prossimoId++,x:n.comparsa.x+(Pn(i)-.5)*2,z:n.comparsa.z+(Pn(i)-.5)*2,yaw:Math.atan2(-n.fuori.x,-n.fuori.z),stato:"arriva",finestra:n.id,vita:a,vitaMax:a,tipo:r,corre:o,variante:Math.floor(Pn(i)*4),timer:0,attesa:0,bersaglio:null})}function Fp(i,e,t){if(i.fase==="attesa"){Op(i,e,t);return}if(i.fase==="intervallo"){if(i.timerFase-=e,i.timerFase>0)return;i.round+=1,i.bonusRound=0,i.fase="gioco",i.daGenerare=kd(i.round),i.attesaComparsa=1;for(const r of i.giocatori){if(r.stato!=="morto")continue;const s=wo[0];Object.assign(r,{stato:"vivo",vita:te.VITA,vitaMax:te.VITA,x:s.x,z:s.z,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,teletrasporto:r.teletrasporto+1}),t.push({k:"rinato",a:r.id})}t.push({k:"round",round:i.round});return}if(i.fase!=="gioco")return;i.attesaComparsa-=e;const n=i.zombie.filter(r=>r.stato!=="morto").length;if(i.attesaComparsa<=0&&i.daGenerare>0&&n<te.ZOMBIE_VIVI_MAX){Up(i),i.daGenerare-=1,i.attesaComparsa=Gd(i.round);return}i.daGenerare===0&&n===0&&(i.fase="intervallo",i.timerFase=te.INTERVALLO,t.push({k:"fineRound",round:i.round}))}function Bp(i,e,t){let n=null;for(const r of bi(i)){const s=ti(r,e);s>3||n&&s>=n.d||!$d(e,r,t)||(n={g:r,d:s})}return n}function kp(i,e,t){const n=new Set(i.porte);i.attesaCampo-=e,(!i.campo||i.attesaCampo<=0)&&(i.campo=dp(fp(n),bi(i)),i.attesaCampo=gp);const r=Yc(n);for(const s of i.zombie){if(s.tipo==="manichino"){Vp(s,e);continue}s.attesa=Math.max(0,s.attesa-e);const o=hf(s),a=(s.corre?te.VELOCITA_CORRE:te.VELOCITA_CAMMINA)*o.velocita,c=te.PORTATA_ZOMBIE*o.portata,l=Kc(s.finestra);if(s.stato==="morto"){s.timer-=e;continue}if(s.stato==="arriva"){const d=l.esterno.x-s.x,_=l.esterno.z-s.z,v=Math.hypot(d,_);if(v<.3)s.stato="assi",s.timer=te.ROMPI_ASSE_OGNI;else{const m=Math.min(v,a*e);s.x+=d/v*m,s.z+=_/v*m,s.yaw=Math.atan2(d,_)}continue}if(s.stato==="assi"){s.yaw=Math.atan2(-l.fuori.x,-l.fuori.z);const d=i.zombie.some(_=>_!==s&&_.finestra===s.finestra&&_.stato==="scavalca");i.finestre[s.finestra]>0?(s.timer-=e,s.timer<=0&&(i.finestre[s.finestra]-=1,s.timer=te.ROMPI_ASSE_OGNI,t.push({k:"assaRotta",finestra:s.finestra}))):d||(s.stato="scavalca",s.timer=te.SCAVALCA);continue}if(s.stato==="scavalca"){s.timer-=e;const d=1-Math.max(0,s.timer)/te.SCAVALCA;s.x=l.esterno.x+(l.interno.x-l.esterno.x)*d,s.z=l.esterno.z+(l.interno.z-l.esterno.z)*d,s.timer<=0&&(s.stato="dentro");continue}const u=Bp(i,s,r);if(s.stato==="attacco"){if(s.timer-=e,u&&(s.yaw=Math.atan2(u.g.x-s.x,u.g.z-s.z)),s.timer>0)continue;const d=i.giocatori.find(_=>_.id===s.bersaglio&&_.stato==="vivo");d&&ti(d,s)<=c+.4&&Gp(i,d,t,te.DANNO_ZOMBIE*o.danno),s.stato="dentro",s.attesa=te.ATTESA_ATTACCO;continue}if(u&&u.d<=c&&s.attesa===0){s.stato="attacco",s.timer=_p,s.bersaglio=u.g.id,t.push({k:"attacco",zombie:s.id});continue}if(u&&u.d<=c*.8)continue;const h=u&&u.d<1.5?{x:(u.g.x-s.x)/u.d,z:(u.g.z-s.z)/u.d}:pp(i.campo,s.x,s.z);if(!h)continue;const f=Qh(s,h.x*a*e,h.z*a*e,te.RAGGIO_ZOMBIE,r);s.x=f.x,s.z=f.z,s.yaw=Math.atan2(h.x,h.z)}Hp(i.zombie.filter(s=>s.tipo!=="manichino"&&(s.stato==="dentro"||s.stato==="arriva"||s.stato==="assi"))),i.zombie=i.zombie.filter(s=>s.tipo==="manichino"||s.stato!=="morto"||s.timer>0)}function Vp(i,e){i.stato==="morto"&&(i.timer-=e,!(i.timer>0)&&(i.stato="dentro",i.vita=i.vitaMax))}function Hp(i){for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){const n=i[e],r=i[t],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a>=Hl||a<1e-6)continue;const c=(Hl-a)/2,l=n.stato==="assi",u=r.stato==="assi";l||(n.x-=s/a*c,n.z-=o/a*c),u||(r.x+=s/a*c,r.z+=o/a*c)}}function Gp(i,e,t,n=te.DANNO_ZOMBIE){e.vita-=n,e.ultimoDanno=i.tempo,t.push({k:"ferito",a:e.id}),!(e.vita>0)&&(Object.assign(e,{stato:"terra",vita:0,timerTerra:te.TEMPO_A_TERRA,bevande:[],vitaMax:te.VITA,progressoRianimazione:0,rianimando:!1}),t.push({k:"aTerra",a:e.id}))}function Wp(i,e,t){for(const n of i.giocatori){if(n.attesaAssa=Math.max(0,n.attesaAssa-e),n.stato==="vivo"&&i.tempo-n.ultimoDanno>te.RIGENERA_DOPO&&(n.vita=Math.min(n.vitaMax,n.vita+te.RIGENERA_AL_SECONDO*e)),n.stato!=="terra")continue;const r=bi(i).find(s=>s.rianimando&&ti(s,n)<=te.RIANIMA_DISTANZA+Tr);if(r){n.progressoRianimazione+=e;const s=r.bevande.includes("ritorno")?te.RIANIMA_RAPIDO:te.RIANIMA_IN;n.progressoRianimazione>=s&&(Object.assign(n,{stato:"vivo",vita:te.VITA,progressoRianimazione:0,ultimoDanno:i.tempo}),t.push({k:"rianimato",a:n.id,da:r.id}));continue}n.progressoRianimazione=0,n.timerTerra-=e,n.timerTerra<=0&&(n.stato="morto",n.rianimando=!1,t.push({k:"morto",a:n.id}))}}function Xp(i,e,t){const n=i.cassa;n.stato==="aperta"&&(n.timer-=e,!(n.timer>0)&&(Object.assign(n,{stato:"chiusa",arma:null,per:null,timer:0}),t.push({k:"cassaChiusa"})))}function jp(i,e,{posizioni:t={},azioni:n=[]}={}){const r=[];return i.fase==="fine"||(i.tempo+=e,Sp(i,t),zp(i,n,r),Fp(i,e,r),kp(i,e,r),Wp(i,e,r),Xp(i,e,r),Ep(i,e,r),Ip(i,e,r),i.giocatori.length>0&&bi(i).length===0&&(i.fase="fine",r.push({k:"fine",round:i.round,giocatori:i.giocatori.map(s=>({nome:s.nome,punti:s.punti,uccisioni:s.uccisioni}))}))),r}const pf=Object.freeze(["arriva","assi","scavalca","dentro","attacco","morto"]),mf=Object.freeze(["vivo","terra","morto"]),gf=Object.freeze(["intervallo","gioco","fine","attesa"]),_f=Object.freeze(["libero","lavora","pronta"]),Ut=i=>Math.round(i*100)/100;function vf(i){return{t:Math.round(i.tempo*1e3)/1e3,f:gf.indexOf(i.fase),r:i.round,tf:Ut(Math.max(0,i.timerFase)),z:i.zombie.map(e=>[e.id,Ut(e.x),Ut(e.z),Ut(e.yaw),pf.indexOf(e.stato),e.corre?1:0,e.variante,Math.max(0,Math.round(e.vita/e.vitaMax*100)),Math.max(0,jh.indexOf(e.tipo??"normale"))]),w:Dn.map(e=>i.finestre[e.id]),p:[...i.porte],g:i.giocatori.map(e=>({id:e.id,n:e.nome,x:Ut(e.x),z:Ut(e.z),y:Ut(e.yaw),p:Ut(e.pitch),s:mf.indexOf(e.stato),v:Math.round(e.vita),vm:e.vitaMax,pt:e.punti,a:e.armaAttiva,ar:[...e.armi],b:[...e.bevande],c:e.colpi,tt:Ut(e.timerTerra),pr:Ut(e.progressoRianimazione),ri:e.rianimando?1:0,u:e.uccisioni,tp:e.teletrasporto,ok:e.pronto?1:0})),c:[i.cassa.stato==="aperta"?1:0,i.cassa.arma??"",i.cassa.per??"",Ut(i.cassa.timer)],e:i.corrente?1:0,k:[_f.indexOf(i.potenziatore.stato),i.potenziatore.arma??"",i.potenziatore.per??"",Ut(i.potenziatore.timer)],b:(i.bonus??[]).map(e=>[e.id,Si.indexOf(e.tipo),Ut(e.x),Ut(e.z),Ut(e.timer)]),x:qh.map(e=>{var t;return Ut(((t=i.effetti)==null?void 0:t[e])??0)}),fr:[...i.frammenti??[]],cp:i.campanella?1:0,co:i.conto===null||i.conto===void 0?-1:Ut(i.conto)}}function xf(i){return{tempo:i.t,fase:gf[i.f],round:i.r,timerFase:i.tf,zombie:i.z.map(([e,t,n,r,s,o,a,c,l])=>({id:e,x:t,z:n,yaw:r,stato:pf[s],corre:!!o,variante:a,vita:c,tipo:jh[l]??"normale"})),finestre:Object.fromEntries(Dn.map((e,t)=>[e.id,i.w[t]])),porte:new Set(i.p),giocatori:i.g.map(e=>({id:e.id,nome:e.n,x:e.x,z:e.z,yaw:e.y,pitch:e.p,stato:mf[e.s],vita:e.v,vitaMax:e.vm,punti:e.pt,armaAttiva:e.a,armi:e.ar,bevande:e.b,colpi:e.c,timerTerra:e.tt,progressoRianimazione:e.pr,rianimando:!!e.ri,uccisioni:e.u,teletrasporto:e.tp,pronto:!!e.ok})),cassa:{stato:i.c[0]?"aperta":"chiusa",arma:i.c[1]||null,per:i.c[2]||null,timer:i.c[3]},corrente:!!i.e,potenziatore:{stato:_f[i.k[0]],arma:i.k[1]||null,per:i.k[2]||null,timer:i.k[3]},bonus:(i.b??[]).map(([e,t,n,r,s])=>({id:e,tipo:Si[t],x:n,z:r,timer:s})),effetti:Object.fromEntries(qh.map((e,t)=>{var n;return[e,((n=i.x)==null?void 0:n[t])??0]})),frammenti:i.fr??[],campanella:!!i.cp,conto:i.co===void 0||i.co<0?null:i.co}}const mo=(i,e,t)=>i+(e-i)*t;function qp(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}function Wl(i,e,t,n){const r=new Map(i.map(s=>[s.id,s]));return e.map(s=>{const o=r.get(s.id);if(!o||o.teletrasporto!==s.teletrasporto)return s;const a={...s,x:mo(o.x,s.x,t),z:mo(o.z,s.z,t),yaw:qp(o.yaw,s.yaw,t)};return n&&(a.pitch=mo(o.pitch,s.pitch,t)),a})}function Yp(i,e,t){const n=Math.min(1,Math.max(0,t));return{...e,tempo:mo(i.tempo,e.tempo,n),zombie:Wl(i.zombie,e.zombie,n,!1),giocatori:Wl(i.giocatori,e.giocatori,n,!0)}}const Kp="https://dxqmblsmawdtqhtekfnf.supabase.co",$p="sb_publishable_mjj5GumFWTwYleVvkV4pcw_tibE8HUI",Zp=Object.freeze([{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]),Jp=6e3,Qp=25e3,Xl=1e3,em=15e3,tm=1e3,Mf="zombie",nm=200;function Lo(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function im(i){const e=new BroadcastChannel(`${Mf}-${i}`),t=Lo(),n=Lo();return e.onmessage=r=>t.avvisa(r.data),{invia:r=>e.postMessage(r),suMessaggio:t.aggiungi,suStato:r=>{n.aggiungi(r),r("online")},chiudi:()=>e.close()}}function rm(i){const e=`realtime:${Mf}-${i}`,t=`${Kp.replace(/^http/,"ws")}/realtime/v1/websocket?apikey=${encodeURIComponent($p)}&vsn=1.0.0`,n=Lo(),r=Lo(),s=[];let o=null,a=!1,c=0,l=null,u=null,h=Xl,f=!1,d="connessione";const _=x=>{d=x,r.avvisa(x)},v=(x,M,g=e)=>{(o==null?void 0:o.readyState)===WebSocket.OPEN&&o.send(JSON.stringify({topic:g,event:x,payload:M,ref:String(++c),join_ref:"1"}))},m=x=>v("broadcast",{type:"broadcast",event:"m",payload:x});function p(){if(f)return;_("connessione"),a=!1;const x=new WebSocket(t);o=x,x.onopen=()=>{v("phx_join",{config:{broadcast:{self:!1,ack:!1},presence:{key:""},private:!1}}),clearInterval(l),l=setInterval(()=>v("heartbeat",{},"phoenix"),Qp)},x.onmessage=M=>{var E,b,w,C;let g;try{g=JSON.parse(M.data)}catch{return}g.topic===e&&(g.event==="phx_reply"&&!a&&((E=g.payload)==null?void 0:E.status)!=="ok"?(console.error("Supabase ha rifiutato l'ingresso nel canale della stanza:",(b=g.payload)==null?void 0:b.response),x.close()):g.event==="phx_reply"&&((w=g.payload)==null?void 0:w.status)==="ok"&&!a?(a=!0,h=Xl,_("online"),s.splice(0).forEach(m)):g.event==="broadcast"&&((C=g.payload)==null?void 0:C.event)==="m"?n.avvisa(g.payload.payload):(g.event==="phx_error"||g.event==="phx_close")&&x.close())},x.onclose=()=>{o!==x||f||(clearInterval(l),a=!1,_("offline"),u=setTimeout(p,h),h=Math.min(em,h*2))}}return p(),{invia(x,{scartabile:M=!1}={}){if(a){m(x);return}M||(s.length>=nm&&s.shift(),s.push(x))},suMessaggio:n.aggiungi,suStato:x=>{r.aggiungi(x),x(d)},chiudi(){f=!0,clearTimeout(u),clearInterval(l),o==null||o.close()}}}function sm(i,{locale:e=!1}={}){return e?im(i):rm(i)}const jl="ABCDEFGHJKLMNPQRSTUVWXYZ",om=16,am=64;function cm(i=Math.random){return Array.from({length:4},()=>jl[Math.floor(i()*jl.length)]).join("")}function yf(i){const e=String(i??"").trim().toUpperCase();return/^[A-HJ-NP-Z]{4}$/.test(e)?e:null}function xs(i){return String(i??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,om)||null}const Dt=i=>typeof i=="number"&&Number.isFinite(i),Ms=(i,e=am)=>typeof i=="string"&&i.length>0&&i.length<=e,Rr=i=>typeof i=="string"&&Object.hasOwn(ct,i),ql=(i,e)=>Array.isArray(i)&&i.every(t=>Array.isArray(t)&&t.length===e&&t.every(Dt));function lm(i){return!!i&&typeof i=="object"&&Ms(i.id)&&typeof i.n=="string"&&[i.x,i.z,i.y,i.p,i.s,i.v,i.vm,i.pt,i.c,i.tt,i.pr,i.ri,i.u,i.tp].every(Dt)&&Rr(i.a)&&Array.isArray(i.ar)&&i.ar.every(Rr)&&Array.isArray(i.b)&&i.b.every(e=>Object.hasOwn(Wi,e))}function um(i){return!!i&&typeof i=="object"&&[i.t,i.f,i.r,i.tf].every(Dt)&&ql(i.z,9)&&Array.isArray(i.w)&&i.w.every(Dt)&&Array.isArray(i.p)&&i.p.every(e=>Ms(e))&&Array.isArray(i.g)&&i.g.every(lm)&&Array.isArray(i.c)&&i.c.length===4&&Dt(i.e)&&Array.isArray(i.k)&&i.k.length===4&&[0,1,2].includes(i.k[0])&&Dt(i.k[3])&&(i.k[1]===""||Rr(i.k[1]))&&ql(i.b,5)&&Array.isArray(i.x)&&i.x.every(Dt)&&Array.isArray(i.fr)&&i.fr.every(Dt)&&Dt(i.cp)&&Dt(i.co)}function hm(i){return!i||typeof i!="object"?!1:i.tipo==="colpo"?Dt(i.zombie)&&Dt(i.danno):i.tipo==="compra"?Ms(i.acquisto)&&(i.arma===void 0||Rr(i.arma)):i.tipo==="assa"?Ms(i.finestra):i.tipo==="rianima"||i.tipo==="pronto"?typeof i.attivo=="boolean":i.tipo==="prova"?Rr(i.arma):i.tipo==="frammento"?Dt(i.id):!1}const fm={ciao:i=>xs(i.nome)!==null&&Ms(i.id),lobby:i=>xs(i.nomeHost)!==null,inizia:i=>Dt(i.seme),g:i=>[i.x,i.z,i.yaw,i.pitch,i.colpi,i.tp].every(Dt)&&Rr(i.arma),az:i=>hm(i.a),st:i=>Dt(i.g)&&um(i.ist),ev:i=>Array.isArray(i.eventi)&&i.eventi.every(e=>e&&typeof e.k=="string"),ping:i=>Dt(i.n),pong:i=>Dt(i.n)};function dm(i){if(!i||typeof i!="object"||typeof i.t!="string")return null;const e=fm[i.t];return e&&e(i)?i:null}const pm=5e3,mm=2500,gm=64*1024;function Yl(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function _m({segnali:i,sonoHost:e,mioId:t,soloRiserva:n=!1}){const r=Yl(),s=Yl();let o=null,a=null,c={},l="attesa",u=null,h=null,f=0,d=[],_=0;const v=P=>{l!==P&&(l=P,s.avvisa(P))},m=(P,D={},G={})=>i.invia({tipo:P,da:t,a:o,...D},G);function p(P){const D=dm(P);D&&(f=performance.now(),r.avvisa(D))}function x(){var P,D;((P=c.veloce)==null?void 0:P.readyState)!=="open"||((D=c.sicuro)==null?void 0:D.readyState)!=="open"||(clearTimeout(u),v("diretto"))}function M(){clearTimeout(u),u=setTimeout(()=>{l!=="diretto"&&v("riserva")},Jp)}function g(P){c[P.label]=P,P.onmessage=D=>{let G;try{G=JSON.parse(D.data)}catch{return}p(G)},P.onopen=x,P.onclose=()=>{c[P.label]===P&&l==="diretto"&&v("riserva")}}function E(){for(const P of Object.values(c))P.onopen=P.onclose=P.onmessage=null,P.close();c={},a&&(a.onicecandidate=a.onconnectionstatechange=a.ondatachannel=null,a.close()),a=null}function b(){if(E(),v("collegamento"),n)return clearTimeout(u),v("riserva"),null;const P=new RTCPeerConnection({iceServers:Zp});return a=P,P.onicecandidate=D=>{D.candidate&&m("ice",{c:D.candidate.toJSON()})},P.onconnectionstatechange=()=>{a===P&&(P.connectionState==="connected"?x():["failed","closed","disconnected"].includes(P.connectionState)&&l==="diretto"&&v("riserva"))},P.ondatachannel=D=>g(D.channel),M(),P}async function w(P){for(const D of d.splice(0)){if(a!==P)return;await P.addIceCandidate(D).catch(()=>{})}}async function C(P){o=P,_=performance.now(),f=performance.now(),d=[],m("benvenuto");const D=b();if(!D)return;g(D.createDataChannel("veloce",{ordered:!1,maxRetransmits:0})),g(D.createDataChannel("sicuro"));const G=await D.createOffer();a===D&&(await D.setLocalDescription(G),a===D&&m("offerta",{sdp:D.localDescription.toJSON()}))}async function S(P){const D=b();if(!D||(await D.setRemoteDescription(P),a!==D))return;await w(D);const G=await D.createAnswer();a===D&&(await D.setLocalDescription(G),a===D&&m("risposta",{sdp:D.localDescription.toJSON()}))}const y=P=>{console.error("Collegamento diretto non riuscito, passo dalla riserva:",P),v("riserva")};function N(P){o!==P&&(o=P,clearInterval(h),n?b():(v("collegamento"),M()))}function V(P){if(!(!P||typeof P!="object"||typeof P.da!="string"||P.da===t)){if(e&&P.tipo==="ciao"){if(P.da===o){l==="collegamento"&&performance.now()-_>mm&&C(P.da).catch(y);return}if(o&&performance.now()-f<pm){i.invia({tipo:"occupata",da:t,a:P.da});return}C(P.da).catch(y);return}if(P.a===t){if(!e&&(P.tipo==="benvenuto"||P.tipo==="offerta"&&!o)&&N(P.da),!e&&P.tipo==="occupata"){o||v("occupata");return}if(P.da===o)if(!e&&P.tipo==="offerta")S(P.sdp).catch(y);else if(e&&P.tipo==="risposta"&&a){const D=a;D.setRemoteDescription(P.sdp).then(()=>w(D)).catch(y)}else P.tipo==="ice"?a!=null&&a.remoteDescription?a.addIceCandidate(P.c).catch(()=>{}):d.push(P.c):P.tipo==="gioco"&&p(P.m)}}}if(i.suMessaggio(V),!e){const P=()=>i.invia({tipo:"ciao",da:t});P(),h=setInterval(P,tm)}return{get modo(){return l},get altroId(){return o},silenzio:()=>f?performance.now()-f:1/0,suMessaggio:r.aggiungi,suStato:s.aggiungi,invia(P,{veloce:D=!1}={}){if(l==="diretto"){const G=D?c.veloce:c.sicuro;if((G==null?void 0:G.readyState)==="open"){(!D||G.bufferedAmount<gm)&&G.send(JSON.stringify(P));return}}o&&(l==="riserva"||l==="diretto")&&m("gioco",{m:P},{scartabile:D})},chiudi(){clearInterval(h),clearTimeout(u),E(),i.chiudi()}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zc="170",vm=0,Kl=1,xm=2,Sf=1,Mm=2,Yn=3,ni=0,Qt=1,pn=2,Mi=0,Vi=1,ys=2,$l=3,Zl=4,ym=5,Ui=100,Sm=101,Am=102,bm=103,Em=104,Tm=200,wm=201,Rm=202,Cm=203,$a=204,Za=205,Im=206,Pm=207,Lm=208,Nm=209,Om=210,Dm=211,zm=212,Um=213,Fm=214,Ja=0,Qa=1,ec=2,Cr=3,tc=4,nc=5,ic=6,rc=7,Jc=0,Bm=1,km=2,yi=0,Vm=1,Hm=2,Gm=3,Wm=4,Xm=5,jm=6,qm=7,Jl="attached",Ym="detached",Af=300,Ir=301,Pr=302,sc=303,oc=304,Bo=306,Ei=1e3,_i=1001,No=1002,pt=1003,bf=1004,os=1005,sn=1006,go=1007,Jn=1008,ii=1009,Ef=1010,Tf=1011,Ss=1012,Qc=1013,ji=1014,En=1015,ws=1016,el=1017,tl=1018,Lr=1020,wf=35902,Rf=1021,Cf=1022,gn=1023,If=1024,Pf=1025,Sr=1026,Nr=1027,nl=1028,il=1029,Lf=1030,rl=1031,sl=1033,_o=33776,vo=33777,xo=33778,Mo=33779,ac=35840,cc=35841,lc=35842,uc=35843,hc=36196,fc=37492,dc=37496,pc=37808,mc=37809,gc=37810,_c=37811,vc=37812,xc=37813,Mc=37814,yc=37815,Sc=37816,Ac=37817,bc=37818,Ec=37819,Tc=37820,wc=37821,yo=36492,Rc=36494,Cc=36495,Nf=36283,Ic=36284,Pc=36285,Lc=36286,ol=2200,Km=2201,$m=2202,As=2300,bs=2301,na=2302,vr=2400,xr=2401,Oo=2402,al=2500,Zm=2501,Jm=0,Of=1,Nc=2,Qm=3200,e0=3201,cl=0,t0=1,mi="",Rt="srgb",$t="srgb-linear",ko="linear",ut="srgb",Ji=7680,Ql=519,n0=512,i0=513,r0=514,Df=515,s0=516,o0=517,a0=518,c0=519,Oc=35044,eu="300 es",Qn=2e3,Do=2001;class Yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tu=1234567;const ls=Math.PI/180,Or=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function It(i,e,t){return Math.max(e,Math.min(t,i))}function ll(i,e){return(i%e+e)%e}function l0(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function u0(i,e,t){return i!==e?(t-i)/(e-i):0}function us(i,e,t){return(1-t)*i+t*e}function h0(i,e,t,n){return us(i,e,1-Math.exp(-t*n))}function f0(i,e=1){return e-Math.abs(ll(i,e*2)-e)}function d0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function p0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function m0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function g0(i,e){return i+Math.random()*(e-i)}function _0(i){return i*(.5-Math.random())}function v0(i){i!==void 0&&(tu=i);let e=tu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function x0(i){return i*ls}function M0(i){return i*Or}function y0(i){return(i&i-1)===0&&i!==0}function S0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function A0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function b0(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),f=o((e-n)/2),d=s((n-e)/2),_=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*h,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*_,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*_,a*l);break;case"ZYZ":i.set(c*_,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Dc={DEG2RAD:ls,RAD2DEG:Or,generateUUID:wn,clamp:It,euclideanModulo:ll,mapLinear:l0,inverseLerp:u0,lerp:us,damp:h0,pingpong:f0,smoothstep:d0,smootherstep:p0,randInt:m0,randFloat:g0,randFloatSpread:_0,seededRandom:v0,degToRad:x0,radToDeg:M0,isPowerOfTwo:y0,ceilPowerOfTwo:S0,floorPowerOfTwo:A0,setQuaternionFromProperEuler:b0,normalize:at,denormalize:bn};class se{constructor(e=0,t=0){se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,t,n,r,s,o,a,c,l){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],v=r[0],m=r[3],p=r[6],x=r[1],M=r[4],g=r[7],E=r[2],b=r[5],w=r[8];return s[0]=o*v+a*x+c*E,s[3]=o*m+a*M+c*b,s[6]=o*p+a*g+c*w,s[1]=l*v+u*x+h*E,s[4]=l*m+u*M+h*b,s[7]=l*p+u*g+h*w,s[2]=f*v+d*x+_*E,s[5]=f*m+d*M+_*b,s[8]=f*p+d*g+_*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,_=t*h+n*f+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(r*l-u*n)*v,e[2]=(a*n-r*o)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-a*t)*v,e[6]=d*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ia.makeScale(e,t)),this}rotate(e){return this.premultiply(ia.makeRotation(-e)),this}translate(e,t){return this.premultiply(ia.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ia=new ke;function zf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function E0(){const i=Es("canvas");return i.style.display="block",i}const nu={};function as(i){i in nu||(nu[i]=!0,console.warn(i))}function T0(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function w0(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function R0(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Xe={enabled:!0,workingColorSpace:$t,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ut&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ut&&(i.r=Ar(i.r),i.g=Ar(i.g),i.b=Ar(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===mi?ko:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const iu=[.64,.33,.3,.6,.15,.06],ru=[.2126,.7152,.0722],su=[.3127,.329],ou=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xe.define({[$t]:{primaries:iu,whitePoint:su,transfer:ko,toXYZ:ou,fromXYZ:au,luminanceCoefficients:ru,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:iu,whitePoint:su,transfer:ut,toXYZ:ou,fromXYZ:au,luminanceCoefficients:ru,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}});let Qi;class C0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qi===void 0&&(Qi=Es("canvas")),Qi.width=e.width,Qi.height=e.height;const n=Qi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ei(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let I0=0;class Uf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ra(r[o].image)):s.push(ra(r[o]))}else s=ra(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ra(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?C0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let P0=0;class Pt extends Yi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=_i,r=_i,s=sn,o=Jn,a=gn,c=ii,l=Pt.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=wn(),this.name="",this.source=new Uf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Af)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case _i:e.x=e.x<0?0:1;break;case No:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case _i:e.y=e.y<0?0:1;break;case No:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Af;Pt.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,n=0,r=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],_=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,g=(d+1)/2,E=(p+1)/2,b=(u+f)/4,w=(h+v)/4,C=(_+m)/4;return M>g&&M>E?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=b/n,s=w/n):g>E?g<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(g),n=b/r,s=C/r):E<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),n=w/s,r=C/s),this.set(n,r,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(h-v)/x,this.z=(f-u)/x,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L0 extends Yi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Uf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qi extends L0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ff extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=pt,this.minFilter=pt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class N0 extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=pt,this.minFilter=pt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],d=s[o+1],_=s[o+2],v=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=_,e[t+3]=v;return}if(h!==v||c!==f||l!==d||u!==_){let m=1-a;const p=c*f+l*d+u*_+h*v,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const E=Math.sqrt(M),b=Math.atan2(E,p*x);m=Math.sin(m*b)/E,a=Math.sin(a*b)/E}const g=a*x;if(c=c*m+f*g,l=l*m+d*g,u=u*m+_*g,h=h*m+v*g,m===1-a){const E=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=E,l*=E,u*=E,h*=E}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],f=s[o+1],d=s[o+2],_=s[o+3];return e[t]=a*_+u*h+c*d-l*f,e[t+1]=c*_+u*f+l*h-a*d,e[t+2]=l*_+u*d+a*f-c*h,e[t+3]=u*_-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),f=c(n/2),d=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"YZX":this._x=f*u*h+l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h-f*d*_;break;case"XZY":this._x=f*u*h-l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sa.copy(this).projectOnVector(e),this.sub(sa)}reflect(e){return this.sub(sa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sa=new L,cu=new Rn;class ri{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(s,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xr),zs.subVectors(this.max,Xr),er.subVectors(e.a,Xr),tr.subVectors(e.b,Xr),nr.subVectors(e.c,Xr),ai.subVectors(tr,er),ci.subVectors(nr,tr),Ri.subVectors(er,nr);let t=[0,-ai.z,ai.y,0,-ci.z,ci.y,0,-Ri.z,Ri.y,ai.z,0,-ai.x,ci.z,0,-ci.x,Ri.z,0,-Ri.x,-ai.y,ai.x,0,-ci.y,ci.x,0,-Ri.y,Ri.x,0];return!oa(t,er,tr,nr,zs)||(t=[1,0,0,0,1,0,0,0,1],!oa(t,er,tr,nr,zs))?!1:(Us.crossVectors(ai,ci),t=[Us.x,Us.y,Us.z],oa(t,er,tr,nr,zs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new L,new L,new L,new L,new L,new L,new L,new L],yn=new L,Ds=new ri,er=new L,tr=new L,nr=new L,ai=new L,ci=new L,Ri=new L,Xr=new L,zs=new L,Us=new L,Ci=new L;function oa(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ci.fromArray(i,s);const a=r.x*Math.abs(Ci.x)+r.y*Math.abs(Ci.y)+r.z*Math.abs(Ci.z),c=e.dot(Ci),l=t.dot(Ci),u=n.dot(Ci);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const O0=new ri,jr=new L,aa=new L;class zn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):O0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jr.subVectors(e,this.center);const t=jr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(jr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jr.copy(e.center).add(aa)),this.expandByPoint(jr.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new L,ca=new L,Fs=new L,li=new L,la=new L,Bs=new L,ua=new L;class Vo{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ca.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),li.copy(this.origin).sub(ca);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fs),a=li.dot(this.direction),c=-li.dot(Fs),l=li.lengthSq(),u=Math.abs(1-o*o);let h,f,d,_;if(u>0)if(h=o*c-a,f=o*a-c,_=s*u,h>=0)if(f>=-_)if(f<=_){const v=1/u;h*=v,f*=v,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=_?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ca).addScaledVector(Fs,f),d}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),r=Gn.dot(Gn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,r,s){la.subVectors(t,e),Bs.subVectors(n,e),ua.crossVectors(la,Bs);let o=this.direction.dot(ua),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;li.subVectors(this.origin,e);const c=a*this.direction.dot(Bs.crossVectors(li,Bs));if(c<0)return null;const l=a*this.direction.dot(la.cross(li));if(l<0||c+l>o)return null;const u=-a*li.dot(ua);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m)}set(e,t,n,r,s,o,a,c,l,u,h,f,d,_,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ir.setFromMatrixColumn(e,0).length(),s=1/ir.setFromMatrixColumn(e,1).length(),o=1/ir.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,_=a*u,v=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+_*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=_+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,_=l*u,v=l*h;t[0]=f+v*a,t[4]=_*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,_=l*u,v=l*h;t[0]=f-v*a,t[4]=-o*h,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,d=o*h,_=a*u,v=a*h;t[0]=c*u,t[4]=_*l-d,t[8]=f*l+v,t[1]=c*h,t[5]=v*l+f,t[9]=d*l-_,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,_=a*c,v=a*l;t[0]=c*u,t[4]=v-f*h,t[8]=_*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+_,t[10]=f-v*h}else if(e.order==="XZY"){const f=o*c,d=o*l,_=a*c,v=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+v,t[5]=o*u,t[9]=d*h-_,t[2]=_*h-d,t[6]=a*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(D0,e,z0)}lookAt(e,t,n){const r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ui.crossVectors(n,tn),ui.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ui.crossVectors(n,tn)),ui.normalize(),ks.crossVectors(tn,ui),r[0]=ui.x,r[4]=ks.x,r[8]=tn.x,r[1]=ui.y,r[5]=ks.y,r[9]=tn.y,r[2]=ui.z,r[6]=ks.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],v=n[6],m=n[10],p=n[14],x=n[3],M=n[7],g=n[11],E=n[15],b=r[0],w=r[4],C=r[8],S=r[12],y=r[1],N=r[5],V=r[9],P=r[13],D=r[2],G=r[6],R=r[10],j=r[14],B=r[3],K=r[7],Z=r[11],ce=r[15];return s[0]=o*b+a*y+c*D+l*B,s[4]=o*w+a*N+c*G+l*K,s[8]=o*C+a*V+c*R+l*Z,s[12]=o*S+a*P+c*j+l*ce,s[1]=u*b+h*y+f*D+d*B,s[5]=u*w+h*N+f*G+d*K,s[9]=u*C+h*V+f*R+d*Z,s[13]=u*S+h*P+f*j+d*ce,s[2]=_*b+v*y+m*D+p*B,s[6]=_*w+v*N+m*G+p*K,s[10]=_*C+v*V+m*R+p*Z,s[14]=_*S+v*P+m*j+p*ce,s[3]=x*b+M*y+g*D+E*B,s[7]=x*w+M*N+g*G+E*K,s[11]=x*C+M*V+g*R+E*Z,s[15]=x*S+M*P+g*j+E*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],_=e[3],v=e[7],m=e[11],p=e[15];return _*(+s*c*h-r*l*h-s*a*f+n*l*f+r*a*d-n*c*d)+v*(+t*c*d-t*l*f+s*o*f-r*o*d+r*l*u-s*c*u)+m*(+t*l*h-t*a*d-s*o*h+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-t*c*h+t*a*f+r*o*h-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],_=e[12],v=e[13],m=e[14],p=e[15],x=h*m*l-v*f*l+v*c*d-a*m*d-h*c*p+a*f*p,M=_*f*l-u*m*l-_*c*d+o*m*d+u*c*p-o*f*p,g=u*v*l-_*h*l+_*a*d-o*v*d-u*a*p+o*h*p,E=_*h*c-u*v*c-_*a*f+o*v*f+u*a*m-o*h*m,b=t*x+n*M+r*g+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return e[0]=x*w,e[1]=(v*f*s-h*m*s-v*r*d+n*m*d+h*r*p-n*f*p)*w,e[2]=(a*m*s-v*c*s+v*r*l-n*m*l-a*r*p+n*c*p)*w,e[3]=(h*c*s-a*f*s-h*r*l+n*f*l+a*r*d-n*c*d)*w,e[4]=M*w,e[5]=(u*m*s-_*f*s+_*r*d-t*m*d-u*r*p+t*f*p)*w,e[6]=(_*c*s-o*m*s-_*r*l+t*m*l+o*r*p-t*c*p)*w,e[7]=(o*f*s-u*c*s+u*r*l-t*f*l-o*r*d+t*c*d)*w,e[8]=g*w,e[9]=(_*h*s-u*v*s-_*n*d+t*v*d+u*n*p-t*h*p)*w,e[10]=(o*v*s-_*a*s+_*n*l-t*v*l-o*n*p+t*a*p)*w,e[11]=(u*a*s-o*h*s-u*n*l+t*h*l+o*n*d-t*a*d)*w,e[12]=E*w,e[13]=(u*v*r-_*h*r+_*n*f-t*v*f-u*n*m+t*h*m)*w,e[14]=(_*a*r-o*v*r-_*n*c+t*v*c+o*n*m-t*a*m)*w,e[15]=(o*h*r-u*a*r+u*n*c-t*h*c-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,_=s*h,v=o*u,m=o*h,p=a*h,x=c*l,M=c*u,g=c*h,E=n.x,b=n.y,w=n.z;return r[0]=(1-(v+p))*E,r[1]=(d+g)*E,r[2]=(_-M)*E,r[3]=0,r[4]=(d-g)*b,r[5]=(1-(f+p))*b,r[6]=(m+x)*b,r[7]=0,r[8]=(_+M)*w,r[9]=(m-x)*w,r[10]=(1-(f+v))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ir.set(r[0],r[1],r[2]).length();const o=ir.set(r[4],r[5],r[6]).length(),a=ir.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Sn.copy(this);const l=1/s,u=1/o,h=1/a;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=u,Sn.elements[5]*=u,Sn.elements[6]*=u,Sn.elements[8]*=h,Sn.elements[9]*=h,Sn.elements[10]*=h,t.setFromRotationMatrix(Sn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Qn){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let d,_;if(a===Qn)d=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Do)d=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Qn){const c=this.elements,l=1/(t-e),u=1/(n-r),h=1/(o-s),f=(t+e)*l,d=(n+r)*u;let _,v;if(a===Qn)_=(o+s)*h,v=-2*h;else if(a===Do)_=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=v,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ir=new L,Sn=new ze,D0=new L(0,0,0),z0=new L(1,1,1),ui=new L,ks=new L,tn=new L,lu=new ze,uu=new Rn;class Cn{constructor(e=0,t=0,n=0,r=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-It(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(It(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(It(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return lu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uu.setFromEuler(this),this.setFromQuaternion(uu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class Bf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let U0=0;const hu=new L,rr=new Rn,Wn=new ze,Vs=new L,qr=new L,F0=new L,B0=new Rn,fu=new L(1,0,0),du=new L(0,1,0),pu=new L(0,0,1),mu={type:"added"},k0={type:"removed"},sr={type:"childadded",child:null},ha={type:"childremoved",child:null};class mt extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new L,t=new Cn,n=new Rn,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ze},normalMatrix:{value:new ke}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.multiply(rr),this}rotateOnWorldAxis(e,t){return rr.setFromAxisAngle(e,t),this.quaternion.premultiply(rr),this}rotateX(e){return this.rotateOnAxis(fu,e)}rotateY(e){return this.rotateOnAxis(du,e)}rotateZ(e){return this.rotateOnAxis(pu,e)}translateOnAxis(e,t){return hu.copy(e).applyQuaternion(this.quaternion),this.position.add(hu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fu,e)}translateY(e){return this.translateOnAxis(du,e)}translateZ(e){return this.translateOnAxis(pu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vs.copy(e):Vs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(qr,Vs,this.up):Wn.lookAt(Vs,qr,this.up),this.quaternion.setFromRotationMatrix(Wn),r&&(Wn.extractRotation(r.matrixWorld),rr.setFromRotationMatrix(Wn),this.quaternion.premultiply(rr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mu),sr.child=e,this.dispatchEvent(sr),sr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(k0),ha.child=e,this.dispatchEvent(ha),ha.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mu),sr.child=e,this.dispatchEvent(sr),sr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,e,F0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,B0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}mt.DEFAULT_UP=new L(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new L,Xn=new L,fa=new L,jn=new L,or=new L,ar=new L,gu=new L,da=new L,pa=new L,ma=new L,ga=new nt,_a=new nt,va=new nt;class mn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),An.subVectors(e,t),r.cross(An);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){An.subVectors(r,t),Xn.subVectors(n,t),fa.subVectors(e,t);const o=An.dot(An),a=An.dot(Xn),c=An.dot(fa),l=Xn.dot(Xn),u=Xn.dot(fa),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,_=(o*u-a*c)*f;return s.set(1-d-_,_,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,jn.x),c.addScaledVector(o,jn.y),c.addScaledVector(a,jn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return ga.setScalar(0),_a.setScalar(0),va.setScalar(0),ga.fromBufferAttribute(e,t),_a.fromBufferAttribute(e,n),va.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ga,s.x),o.addScaledVector(_a,s.y),o.addScaledVector(va,s.z),o}static isFrontFacing(e,t,n,r){return An.subVectors(n,t),Xn.subVectors(e,t),An.cross(Xn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),An.cross(Xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;or.subVectors(r,n),ar.subVectors(s,n),da.subVectors(e,n);const c=or.dot(da),l=ar.dot(da);if(c<=0&&l<=0)return t.copy(n);pa.subVectors(e,r);const u=or.dot(pa),h=ar.dot(pa);if(u>=0&&h<=u)return t.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(or,o);ma.subVectors(e,s);const d=or.dot(ma),_=ar.dot(ma);if(_>=0&&d<=_)return t.copy(s);const v=d*l-c*_;if(v<=0&&l>=0&&_<=0)return a=l/(l-_),t.copy(n).addScaledVector(ar,a);const m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return gu.subVectors(s,r),a=(h-u)/(h-u+(d-_)),t.copy(r).addScaledVector(gu,a);const p=1/(m+v+f);return o=v*p,a=f*p,t.copy(n).addScaledVector(or,o).addScaledVector(ar,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function xa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Xe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xe.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Xe.workingColorSpace){if(e=ll(e,1),t=It(t,0,1),n=It(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=xa(o,s,e+1/3),this.g=xa(o,s,e),this.b=xa(o,s,e-1/3)}return Xe.toWorkingColorSpace(this,r),this}setStyle(e,t=Rt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=kf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return Xe.fromWorkingColorSpace(Vt.copy(this),e),Math.round(It(Vt.r*255,0,255))*65536+Math.round(It(Vt.g*255,0,255))*256+Math.round(It(Vt.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xe.workingColorSpace){Xe.fromWorkingColorSpace(Vt.copy(this),t);const n=Vt.r,r=Vt.g,s=Vt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Xe.workingColorSpace){return Xe.fromWorkingColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=Rt){Xe.fromWorkingColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,r=Vt.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Hs);const n=us(hi.h,Hs.h,t),r=us(hi.s,Hs.s,t),s=us(hi.l,Hs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new be;be.NAMES=kf;let V0=0;class _n extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=wn(),this.name="",this.blending=Vi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$a,this.blendDst=Za,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$a&&(n.blendSrc=this.blendSrc),this.blendDst!==Za&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class wt extends _n{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new L,Gs=new se;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Oc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Oc&&(e.usage=this.usage),e}}class Vf extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Hf extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ht extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let H0=0;const ln=new ze,Ma=new mt,cr=new L,nn=new ri,Yr=new ri,Ot=new L;class zt extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zf(e)?Hf:Vf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return Ma.lookAt(e),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ht(n,3))}else{for(let n=0,r=t.count;n<r;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Yr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(nn.min,Yr.min),nn.expandByPoint(Ot),Ot.addVectors(nn.max,Yr.max),nn.expandByPoint(Ot)):(nn.expandByPoint(Yr.min),nn.expandByPoint(Yr.max))}nn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ot));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ot.fromBufferAttribute(a,l),c&&(cr.fromBufferAttribute(e,l),Ot.add(cr)),r=Math.max(r,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new L,c[C]=new L;const l=new L,u=new L,h=new L,f=new se,d=new se,_=new se,v=new L,m=new L;function p(C,S,y){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,C),d.fromBufferAttribute(s,S),_.fromBufferAttribute(s,y),u.sub(l),h.sub(l),d.sub(f),_.sub(f);const N=1/(d.x*_.y-_.x*d.y);isFinite(N)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(N),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(N),a[C].add(v),a[S].add(v),a[y].add(v),c[C].add(m),c[S].add(m),c[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,S=x.length;C<S;++C){const y=x[C],N=y.start,V=y.count;for(let P=N,D=N+V;P<D;P+=3)p(e.getX(P+0),e.getX(P+1),e.getX(P+2))}const M=new L,g=new L,E=new L,b=new L;function w(C){E.fromBufferAttribute(r,C),b.copy(E);const S=a[C];M.copy(S),M.sub(E.multiplyScalar(E.dot(S))).normalize(),g.crossVectors(b,S);const N=g.dot(c[C])<0?-1:1;o.setXYZW(C,M.x,M.y,M.z,N)}for(let C=0,S=x.length;C<S;++C){const y=x[C],N=y.start,V=y.count;for(let P=N,D=N+V;P<D;P+=3)w(e.getX(P+0)),w(e.getX(P+1)),w(e.getX(P+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,_=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*u;for(let p=0;p<u;p++)f[_++]=l[d++]}return new Kt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _u=new ze,Ii=new Vo,Ws=new zn,vu=new L,Xs=new L,js=new L,qs=new L,ya=new L,Ys=new L,xu=new L,Ks=new L;class Pe extends mt{constructor(e=new zt,t=new wt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ys.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(ya.fromBufferAttribute(h,e),o?Ys.addScaledVector(ya,u):Ys.addScaledVector(ya.sub(t),u))}t.add(Ys)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!(Ws.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Ws,vu)===null||Ii.origin.distanceToSquared(vu)>(e.far-e.near)**2))&&(_u.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(_u),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let g=x,E=M;g<E;g+=3){const b=a.getX(g),w=a.getX(g+1),C=a.getX(g+2);r=$s(this,p,e,n,l,u,h,b,w,C),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const x=a.getX(m),M=a.getX(m+1),g=a.getX(m+2);r=$s(this,o,e,n,l,u,h,x,M,g),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,v=f.length;_<v;_++){const m=f[_],p=o[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let g=x,E=M;g<E;g+=3){const b=g,w=g+1,C=g+2;r=$s(this,p,e,n,l,u,h,b,w,C),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=_,p=v;m<p;m+=3){const x=m,M=m+1,g=m+2;r=$s(this,o,e,n,l,u,h,x,M,g),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function G0(i,e,t,n,r,s,o,a){let c;if(e.side===Qt?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===ni,a),c===null)return null;Ks.copy(a),Ks.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ks);return l<t.near||l>t.far?null:{distance:l,point:Ks.clone(),object:i}}function $s(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Xs),i.getVertexPosition(c,js),i.getVertexPosition(l,qs);const u=G0(i,e,t,n,Xs,js,qs,xu);if(u){const h=new L;mn.getBarycoord(xu,Xs,js,qs,h),r&&(u.uv=mn.getInterpolatedAttribute(r,a,c,l,h,new se)),s&&(u.uv1=mn.getInterpolatedAttribute(s,a,c,l,h,new se)),o&&(u.normal=mn.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};mn.getNormal(Xs,js,qs,f.normal),u.face=f,u.barycoord=h}return u}class rn extends zt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,r,o,2),_("x","z","y",1,-1,e,n,-t,r,o,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(h,2));function _(v,m,p,x,M,g,E,b,w,C,S){const y=g/w,N=E/C,V=g/2,P=E/2,D=b/2,G=w+1,R=C+1;let j=0,B=0;const K=new L;for(let Z=0;Z<R;Z++){const ce=Z*N-P;for(let xe=0;xe<G;xe++){const pe=xe*y-V;K[v]=pe*x,K[m]=ce*M,K[p]=D,l.push(K.x,K.y,K.z),K[v]=0,K[m]=0,K[p]=b>0?1:-1,u.push(K.x,K.y,K.z),h.push(xe/w),h.push(1-Z/C),j+=1}}for(let Z=0;Z<C;Z++)for(let ce=0;ce<w;ce++){const xe=f+ce+G*Z,pe=f+ce+G*(Z+1),q=f+(ce+1)+G*(Z+1),ne=f+(ce+1)+G*Z;c.push(xe,pe,ne),c.push(pe,q,ne),B+=6}a.addGroup(d,B,S),d+=B,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function qt(i){const e={};for(let t=0;t<i.length;t++){const n=Dr(i[t]);for(const r in n)e[r]=n[r]}return e}function W0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Gf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Xe.workingColorSpace}const X0={clone:Dr,merge:qt};var j0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,q0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends _n{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j0,this.fragmentShader=q0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dr(e.uniforms),this.uniformsGroups=W0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Wf extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new L,Mu=new se,yu=new se;class Xt extends Wf{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Or*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,Mu,yu),t.subVectors(yu,Mu)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ls*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const lr=-90,ur=1;class Y0 extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Xt(lr,ur,e,t);r.layers=this.layers,this.add(r);const s=new Xt(lr,ur,e,t);s.layers=this.layers,this.add(s);const o=new Xt(lr,ur,e,t);o.layers=this.layers,this.add(o);const a=new Xt(lr,ur,e,t);a.layers=this.layers,this.add(a);const c=new Xt(lr,ur,e,t);c.layers=this.layers,this.add(c);const l=new Xt(lr,ur,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Do)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Xf extends Pt{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Ir,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class K0 extends qi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Xf(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new rn(5,5,5),s=new Ti({name:"CubemapFromEquirect",uniforms:Dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qt,blending:Mi});s.uniforms.tEquirect.value=t;const o=new Pe(r,s),a=t.minFilter;return t.minFilter===Jn&&(t.minFilter=sn),new Y0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const Sa=new L,$0=new L,Z0=new ke;class Di{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Sa.subVectors(n,t).cross($0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Sa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Z0.getNormalMatrix(e),r=this.coplanarPoint(Sa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new zn,Zs=new L;class ul{constructor(e=new Di,t=new Di,n=new Di,r=new Di,s=new Di,o=new Di){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],d=r[8],_=r[9],v=r[10],m=r[11],p=r[12],x=r[13],M=r[14],g=r[15];if(n[0].setComponents(c-s,f-l,m-d,g-p).normalize(),n[1].setComponents(c+s,f+l,m+d,g+p).normalize(),n[2].setComponents(c+o,f+u,m+_,g+x).normalize(),n[3].setComponents(c-o,f-u,m-_,g-x).normalize(),n[4].setComponents(c-a,f-h,m-v,g-M).normalize(),t===Qn)n[5].setComponents(c+a,f+h,m+v,g+M).normalize();else if(t===Do)n[5].setComponents(a,h,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Zs.x=r.normal.x>0?e.max.x:e.min.x,Zs.y=r.normal.y>0?e.max.y:e.min.y,Zs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jf(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function J0(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){const _=h[f],v=h[d];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++f,h[f]=v)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){const v=h[d];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Jt extends zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=e/a,f=t/c,d=[],_=[],v=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let M=0;M<l;M++){const g=M*h-s;_.push(g,-x,0),v.push(0,0,1),m.push(M/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const M=x+l*p,g=x+l*(p+1),E=x+1+l*(p+1),b=x+1+l*p;d.push(M,g,b),d.push(g,E,b)}this.setIndex(d),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Q0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eg=`#ifdef USE_ALPHAHASH
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
#endif`,tg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ng=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ig=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sg=`#ifdef USE_AOMAP
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
#endif`,og=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ag=`#ifdef USE_BATCHING
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
#endif`,cg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ug=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fg=`#ifdef USE_IRIDESCENCE
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
#endif`,dg=`#ifdef USE_BUMPMAP
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
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_g=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Sg=`#define PI 3.141592653589793
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
} // validated`,Ag=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bg=`vec3 transformedNormal = objectNormal;
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
#endif`,Eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ig=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Lg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ng=`#ifdef USE_ENVMAP
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
#endif`,Og=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dg=`#ifdef USE_ENVMAP
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
#endif`,zg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ug=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kg=`#ifdef USE_GRADIENTMAP
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
}`,Vg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wg=`uniform bool receiveShadow;
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
#endif`,Xg=`#ifdef USE_ENVMAP
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
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$g=`PhysicalMaterial material;
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
#endif`,Zg=`struct PhysicalMaterial {
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
}`,Jg=`
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
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
#endif`,e_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,n_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,s_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,a_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,c_=`#if defined( USE_POINTS_UV )
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
#endif`,l_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,h_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,f_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,d_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p_=`#ifdef USE_MORPHTARGETS
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
#endif`,m_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,__=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,v_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,y_=`#ifdef USE_NORMALMAP
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
#endif`,S_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,A_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,b_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,R_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,C_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,I_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,P_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,L_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,O_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,z_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,U_=`float getShadowMask() {
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
}`,F_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,B_=`#ifdef USE_SKINNING
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
#endif`,k_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,V_=`#ifdef USE_SKINNING
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
#endif`,H_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,G_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,W_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,X_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,j_=`#ifdef USE_TRANSMISSION
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
#endif`,q_=`#ifdef USE_TRANSMISSION
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
#endif`,Y_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const J_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Q_=`uniform sampler2D t2D;
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
}`,ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`#include <common>
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
}`,sv=`#if DEPTH_PACKING == 3200
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
}`,ov=`#define DISTANCE
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
}`,av=`#define DISTANCE
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
}`,cv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uv=`uniform float scale;
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
}`,hv=`uniform vec3 diffuse;
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
}`,fv=`#include <common>
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
}`,dv=`uniform vec3 diffuse;
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
}`,pv=`#define LAMBERT
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
}`,mv=`#define LAMBERT
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
}`,gv=`#define MATCAP
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
}`,_v=`#define MATCAP
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
}`,vv=`#define NORMAL
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
}`,xv=`#define NORMAL
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
}`,Mv=`#define PHONG
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
}`,yv=`#define PHONG
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
}`,Sv=`#define STANDARD
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
}`,Av=`#define STANDARD
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
}`,bv=`#define TOON
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
}`,Ev=`#define TOON
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
}`,Tv=`uniform float size;
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
}`,wv=`uniform vec3 diffuse;
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
}`,Rv=`#include <common>
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
}`,Cv=`uniform vec3 color;
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
}`,Iv=`uniform float rotation;
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
}`,Pv=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Q0,alphahash_pars_fragment:eg,alphamap_fragment:tg,alphamap_pars_fragment:ng,alphatest_fragment:ig,alphatest_pars_fragment:rg,aomap_fragment:sg,aomap_pars_fragment:og,batching_pars_vertex:ag,batching_vertex:cg,begin_vertex:lg,beginnormal_vertex:ug,bsdfs:hg,iridescence_fragment:fg,bumpmap_pars_fragment:dg,clipping_planes_fragment:pg,clipping_planes_pars_fragment:mg,clipping_planes_pars_vertex:gg,clipping_planes_vertex:_g,color_fragment:vg,color_pars_fragment:xg,color_pars_vertex:Mg,color_vertex:yg,common:Sg,cube_uv_reflection_fragment:Ag,defaultnormal_vertex:bg,displacementmap_pars_vertex:Eg,displacementmap_vertex:Tg,emissivemap_fragment:wg,emissivemap_pars_fragment:Rg,colorspace_fragment:Cg,colorspace_pars_fragment:Ig,envmap_fragment:Pg,envmap_common_pars_fragment:Lg,envmap_pars_fragment:Ng,envmap_pars_vertex:Og,envmap_physical_pars_fragment:Xg,envmap_vertex:Dg,fog_vertex:zg,fog_pars_vertex:Ug,fog_fragment:Fg,fog_pars_fragment:Bg,gradientmap_pars_fragment:kg,lightmap_pars_fragment:Vg,lights_lambert_fragment:Hg,lights_lambert_pars_fragment:Gg,lights_pars_begin:Wg,lights_toon_fragment:jg,lights_toon_pars_fragment:qg,lights_phong_fragment:Yg,lights_phong_pars_fragment:Kg,lights_physical_fragment:$g,lights_physical_pars_fragment:Zg,lights_fragment_begin:Jg,lights_fragment_maps:Qg,lights_fragment_end:e_,logdepthbuf_fragment:t_,logdepthbuf_pars_fragment:n_,logdepthbuf_pars_vertex:i_,logdepthbuf_vertex:r_,map_fragment:s_,map_pars_fragment:o_,map_particle_fragment:a_,map_particle_pars_fragment:c_,metalnessmap_fragment:l_,metalnessmap_pars_fragment:u_,morphinstance_vertex:h_,morphcolor_vertex:f_,morphnormal_vertex:d_,morphtarget_pars_vertex:p_,morphtarget_vertex:m_,normal_fragment_begin:g_,normal_fragment_maps:__,normal_pars_fragment:v_,normal_pars_vertex:x_,normal_vertex:M_,normalmap_pars_fragment:y_,clearcoat_normal_fragment_begin:S_,clearcoat_normal_fragment_maps:A_,clearcoat_pars_fragment:b_,iridescence_pars_fragment:E_,opaque_fragment:T_,packing:w_,premultiplied_alpha_fragment:R_,project_vertex:C_,dithering_fragment:I_,dithering_pars_fragment:P_,roughnessmap_fragment:L_,roughnessmap_pars_fragment:N_,shadowmap_pars_fragment:O_,shadowmap_pars_vertex:D_,shadowmap_vertex:z_,shadowmask_pars_fragment:U_,skinbase_vertex:F_,skinning_pars_vertex:B_,skinning_vertex:k_,skinnormal_vertex:V_,specularmap_fragment:H_,specularmap_pars_fragment:G_,tonemapping_fragment:W_,tonemapping_pars_fragment:X_,transmission_fragment:j_,transmission_pars_fragment:q_,uv_pars_fragment:Y_,uv_pars_vertex:K_,uv_vertex:$_,worldpos_vertex:Z_,background_vert:J_,background_frag:Q_,backgroundCube_vert:ev,backgroundCube_frag:tv,cube_vert:nv,cube_frag:iv,depth_vert:rv,depth_frag:sv,distanceRGBA_vert:ov,distanceRGBA_frag:av,equirect_vert:cv,equirect_frag:lv,linedashed_vert:uv,linedashed_frag:hv,meshbasic_vert:fv,meshbasic_frag:dv,meshlambert_vert:pv,meshlambert_frag:mv,meshmatcap_vert:gv,meshmatcap_frag:_v,meshnormal_vert:vv,meshnormal_frag:xv,meshphong_vert:Mv,meshphong_frag:yv,meshphysical_vert:Sv,meshphysical_frag:Av,meshtoon_vert:bv,meshtoon_frag:Ev,points_vert:Tv,points_frag:wv,shadow_vert:Rv,shadow_frag:Cv,sprite_vert:Iv,sprite_frag:Pv},oe={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Ln={basic:{uniforms:qt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:qt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new be(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:qt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:qt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:qt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new be(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:qt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:qt([oe.points,oe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:qt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:qt([oe.common,oe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:qt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:qt([oe.sprite,oe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:qt([oe.common,oe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:qt([oe.lights,oe.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Ln.physical={uniforms:qt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Js={r:0,b:0,g:0},Li=new Cn,Lv=new ze;function Nv(i,e,t,n,r,s,o){const a=new be(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function _(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?t:e).get(M)),M}function v(x){let M=!1;const g=_(x);g===null?p(a,c):g&&g.isColor&&(p(g,1),M=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,M){const g=_(M);g&&(g.isCubeTexture||g.mapping===Bo)?(u===void 0&&(u=new Pe(new rn(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:Dr(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Li.copy(M.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Lv.makeRotationFromEuler(Li)),u.material.toneMapped=Xe.getTransfer(g.colorSpace)!==ut,(h!==g||f!==g.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=g,f=g.version,d=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(l===void 0&&(l=new Pe(new Jt(2,2),new Ti({name:"BackgroundMaterial",uniforms:Dr(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=g,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Xe.getTransfer(g.colorSpace)!==ut,g.matrixAutoUpdate===!0&&g.updateMatrix(),l.material.uniforms.uvTransform.value.copy(g.matrix),(h!==g||f!==g.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=g,f=g.version,d=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,M){x.getRGB(Js,Gf(i)),n.buffers.color.setClear(Js.r,Js.g,Js.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(x,M=1){a.set(x),c=M,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:v,addToRenderList:m}}function Ov(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(y,N,V,P,D){let G=!1;const R=h(P,V,N);s!==R&&(s=R,l(s.object)),G=d(y,P,V,D),G&&_(y,P,V,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,g(y,N,V,P),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,N,V){const P=V.wireframe===!0;let D=n[y.id];D===void 0&&(D={},n[y.id]=D);let G=D[N.id];G===void 0&&(G={},D[N.id]=G);let R=G[P];return R===void 0&&(R=f(c()),G[P]=R),R}function f(y){const N=[],V=[],P=[];for(let D=0;D<t;D++)N[D]=0,V[D]=0,P[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:P,object:y,attributes:{},index:null}}function d(y,N,V,P){const D=s.attributes,G=N.attributes;let R=0;const j=V.getAttributes();for(const B in j)if(j[B].location>=0){const Z=D[B];let ce=G[B];if(ce===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor)),Z===void 0||Z.attribute!==ce||ce&&Z.data!==ce.data)return!0;R++}return s.attributesNum!==R||s.index!==P}function _(y,N,V,P){const D={},G=N.attributes;let R=0;const j=V.getAttributes();for(const B in j)if(j[B].location>=0){let Z=G[B];Z===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor));const ce={};ce.attribute=Z,Z&&Z.data&&(ce.data=Z.data),D[B]=ce,R++}s.attributes=D,s.attributesNum=R,s.index=P}function v(){const y=s.newAttributes;for(let N=0,V=y.length;N<V;N++)y[N]=0}function m(y){p(y,0)}function p(y,N){const V=s.newAttributes,P=s.enabledAttributes,D=s.attributeDivisors;V[y]=1,P[y]===0&&(i.enableVertexAttribArray(y),P[y]=1),D[y]!==N&&(i.vertexAttribDivisor(y,N),D[y]=N)}function x(){const y=s.newAttributes,N=s.enabledAttributes;for(let V=0,P=N.length;V<P;V++)N[V]!==y[V]&&(i.disableVertexAttribArray(V),N[V]=0)}function M(y,N,V,P,D,G,R){R===!0?i.vertexAttribIPointer(y,N,V,D,G):i.vertexAttribPointer(y,N,V,P,D,G)}function g(y,N,V,P){v();const D=P.attributes,G=V.getAttributes(),R=N.defaultAttributeValues;for(const j in G){const B=G[j];if(B.location>=0){let K=D[j];if(K===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(K=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(K=y.instanceColor)),K!==void 0){const Z=K.normalized,ce=K.itemSize,xe=e.get(K);if(xe===void 0)continue;const pe=xe.buffer,q=xe.type,ne=xe.bytesPerElement,Me=q===i.INT||q===i.UNSIGNED_INT||K.gpuType===Qc;if(K.isInterleavedBufferAttribute){const ae=K.data,we=ae.stride,Ne=K.offset;if(ae.isInstancedInterleavedBuffer){for(let Ge=0;Ge<B.locationSize;Ge++)p(B.location+Ge,ae.meshPerAttribute);y.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ge=0;Ge<B.locationSize;Ge++)m(B.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let Ge=0;Ge<B.locationSize;Ge++)M(B.location+Ge,ce/B.locationSize,q,Z,we*ne,(Ne+ce/B.locationSize*Ge)*ne,Me)}else{if(K.isInstancedBufferAttribute){for(let ae=0;ae<B.locationSize;ae++)p(B.location+ae,K.meshPerAttribute);y.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ae=0;ae<B.locationSize;ae++)m(B.location+ae);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let ae=0;ae<B.locationSize;ae++)M(B.location+ae,ce/B.locationSize,q,Z,ce*ne,ce/B.locationSize*ae*ne,Me)}}else if(R!==void 0){const Z=R[j];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(B.location,Z);break;case 3:i.vertexAttrib3fv(B.location,Z);break;case 4:i.vertexAttrib4fv(B.location,Z);break;default:i.vertexAttrib1fv(B.location,Z)}}}}x()}function E(){C();for(const y in n){const N=n[y];for(const V in N){const P=N[V];for(const D in P)u(P[D].object),delete P[D];delete N[V]}delete n[y]}}function b(y){if(n[y.id]===void 0)return;const N=n[y.id];for(const V in N){const P=N[V];for(const D in P)u(P[D].object),delete P[D];delete N[V]}delete n[y.id]}function w(y){for(const N in n){const V=n[N];if(V[y.id]===void 0)continue;const P=V[y.id];for(const D in P)u(P[D].object),delete P[D];delete V[y.id]}}function C(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:C,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function Dv(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function a(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<l.length;_++)o(l[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let _=0;for(let v=0;v<h;v++)_+=u[v]*f[v];t.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function zv(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==gn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const C=w===ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==ii&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==En&&!C)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),g=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:g,vertexTextures:E,maxSamples:b}}function Uv(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Di,a=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const _=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):l();else{const x=s?0:n,M=x*4;let g=p.clippingState||null;c.value=g,g=u(_,f,M,d);for(let E=0;E!==M;++E)g[E]=t[E];p.clippingState=g,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,_){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=c.value,_!==!0||m===null){const p=d+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,g=d;M!==v;++M,g+=4)o.copy(h[M]).applyMatrix4(x,a),o.normal.toArray(m,g),m[g+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Fv(i){let e=new WeakMap;function t(o,a){return a===sc?o.mapping=Ir:a===oc&&(o.mapping=Pr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===sc||a===oc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new K0(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class hl extends Wf{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Mr=4,Su=[.125,.215,.35,.446,.526,.582],Fi=20,Aa=new hl,Au=new be;let ba=null,Ea=0,Ta=0,wa=!1;const zi=(1+Math.sqrt(5))/2,hr=1/zi,bu=[new L(-zi,hr,0),new L(zi,hr,0),new L(-hr,0,zi),new L(hr,0,zi),new L(0,zi,-hr),new L(0,zi,hr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Eu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Ea,Ta),this._renderer.xr.enabled=wa,e.scissorTest=!1,Qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ir||e.mapping===Pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Ea=this._renderer.getActiveCubeFace(),Ta=this._renderer.getActiveMipmapLevel(),wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:ws,format:gn,colorSpace:$t,depthBuffer:!1},r=Tu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tu(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bv(s)),this._blurMaterial=kv(s,e,t)}return r}_compileMaterial(e){const t=new Pe(this._lodPlanes[0],e);this._renderer.compile(t,Aa)}_sceneToCubeUV(e,t,n,r){const a=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Au),u.toneMapping=yi,u.autoClear=!1;const d=new wt({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),_=new Pe(new rn,d);let v=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,v=!0):(d.color.copy(Au),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const M=this._cubeSize;Qs(r,x*M,p>2?M:0,M,M),u.setRenderTarget(r),v&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ir||e.mapping===Pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Pe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Qs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Aa)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=bu[(r-s-1)%bu.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Pe(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Fi-1),v=s/_,m=isFinite(s)?1+Math.floor(u*v):Fi;m>Fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);const p=[];let x=0;for(let w=0;w<Fi;++w){const C=w/v,S=Math.exp(-C*C/2);p.push(S),w===0?x+=S:w<m&&(x+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=_,f.mipInt.value=M-n;const g=this._sizeLods[r],E=3*g*(r>M-Mr?r-M+Mr:0),b=4*(this._cubeSize-g);Qs(t,E,b,3*g,2*g),c.setRenderTarget(t),c.render(h,Aa)}}function Bv(i){const e=[],t=[],n=[];let r=i;const s=i-Mr+1+Su.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-Mr?c=Su[o-i+Mr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,v=3,m=2,p=1,x=new Float32Array(v*_*d),M=new Float32Array(m*_*d),g=new Float32Array(p*_*d);for(let b=0;b<d;b++){const w=b%3*2/3-1,C=b>2?0:-1,S=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];x.set(S,v*_*b),M.set(f,m*_*b);const y=[b,b,b,b,b,b];g.set(y,p*_*b)}const E=new zt;E.setAttribute("position",new Kt(x,v)),E.setAttribute("uv",new Kt(M,m)),E.setAttribute("faceIndex",new Kt(g,p)),e.push(E),r>Mr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Tu(i,e,t){const n=new qi(i,e,t);return n.texture.mapping=Bo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function kv(i,e,t){const n=new Float32Array(Fi),r=new L(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function wu(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ru(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function fl(){return`

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
	`}function Vv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===sc||c===oc,u=c===Ir||c===Pr;if(l||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Eu(i)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Eu(i)),h=l?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Hv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&as("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Gv(i,e,t,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const v=f.morphAttributes[_];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER);const d=h.morphAttributes;for(const _ in d){const v=d[_];for(let m=0,p=v.length;m<p;m++)e.update(v[m],i.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,_=h.attributes.position;let v=0;if(d!==null){const x=d.array;v=d.version;for(let M=0,g=x.length;M<g;M+=3){const E=x[M+0],b=x[M+1],w=x[M+2];f.push(E,b,b,w,w,E)}}else if(_!==void 0){const x=_.array;v=_.version;for(let M=0,g=x.length/3-1;M<g;M+=3){const E=M+0,b=M+1,w=M+2;f.push(E,b,b,w,w,E)}}else return;const m=new(zf(f)?Hf:Vf)(f,1);m.version=v;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Wv(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,s,f*o),t.update(d,n,1)}function l(f,d,_){_!==0&&(i.drawElementsInstanced(n,d,s,f*o,_),t.update(d,n,_))}function u(f,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,n,1)}function h(f,d,_,v){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,v,0,_);let p=0;for(let x=0;x<_;x++)p+=d[x]*v[x];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Xv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function jv(i,e,t){const n=new WeakMap,r=new nt;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),_===!0&&(M=2),v===!0&&(M=3);let g=a.attributes.position.count*M,E=1;g>e.maxTextureSize&&(E=Math.ceil(g/e.maxTextureSize),g=e.maxTextureSize);const b=new Float32Array(g*E*4*h),w=new Ff(b,g,E,h);w.type=En,w.needsUpdate=!0;const C=M*4;for(let y=0;y<h;y++){const N=m[y],V=p[y],P=x[y],D=g*E*4*y;for(let G=0;G<N.count;G++){const R=G*C;d===!0&&(r.fromBufferAttribute(N,G),b[D+R+0]=r.x,b[D+R+1]=r.y,b[D+R+2]=r.z,b[D+R+3]=0),_===!0&&(r.fromBufferAttribute(V,G),b[D+R+4]=r.x,b[D+R+5]=r.y,b[D+R+6]=r.z,b[D+R+7]=0),v===!0&&(r.fromBufferAttribute(P,G),b[D+R+8]=r.x,b[D+R+9]=r.y,b[D+R+10]=r.z,b[D+R+11]=P.itemSize===4?r.w:1)}}f={count:h,texture:w,size:new se(g,E)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const _=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function qv(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(r.get(h)!==l&&(e.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class qf extends Pt{constructor(e,t,n,r,s,o,a,c,l,u=Sr){if(u!==Sr&&u!==Nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Sr&&(n=ji),n===void 0&&u===Nr&&(n=Lr),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:pt,this.minFilter=c!==void 0?c:pt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Yf=new Pt,Cu=new qf(1,1),Kf=new Ff,$f=new N0,Zf=new Xf,Iu=[],Pu=[],Lu=new Float32Array(16),Nu=new Float32Array(9),Ou=new Float32Array(4);function Br(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Iu[r];if(s===void 0&&(s=new Float32Array(r),Iu[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ho(i,e){let t=Pu[e];t===void 0&&(t=new Int32Array(e),Pu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Yv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function Zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function Jv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Ou.set(n),i.uniformMatrix2fv(this.addr,!1,Ou),Nt(t,n)}}function Qv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Nu.set(n),i.uniformMatrix3fv(this.addr,!1,Nu),Nt(t,n)}}function ex(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,n))return;Lu.set(n),i.uniformMatrix4fv(this.addr,!1,Lu),Nt(t,n)}}function tx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function ix(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function sx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ox(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function cx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function lx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Cu.compareFunction=Df,s=Cu):s=Yf,t.setTexture2D(e||s,r)}function ux(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||$f,r)}function hx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Zf,r)}function fx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Kf,r)}function dx(i){switch(i){case 5126:return Yv;case 35664:return Kv;case 35665:return $v;case 35666:return Zv;case 35674:return Jv;case 35675:return Qv;case 35676:return ex;case 5124:case 35670:return tx;case 35667:case 35671:return nx;case 35668:case 35672:return ix;case 35669:case 35673:return rx;case 5125:return sx;case 36294:return ox;case 36295:return ax;case 36296:return cx;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return fx}}function px(i,e){i.uniform1fv(this.addr,e)}function mx(i,e){const t=Br(e,this.size,2);i.uniform2fv(this.addr,t)}function gx(i,e){const t=Br(e,this.size,3);i.uniform3fv(this.addr,t)}function _x(i,e){const t=Br(e,this.size,4);i.uniform4fv(this.addr,t)}function vx(i,e){const t=Br(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function xx(i,e){const t=Br(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mx(i,e){const t=Br(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function yx(i,e){i.uniform1iv(this.addr,e)}function Sx(i,e){i.uniform2iv(this.addr,e)}function Ax(i,e){i.uniform3iv(this.addr,e)}function bx(i,e){i.uniform4iv(this.addr,e)}function Ex(i,e){i.uniform1uiv(this.addr,e)}function Tx(i,e){i.uniform2uiv(this.addr,e)}function wx(i,e){i.uniform3uiv(this.addr,e)}function Rx(i,e){i.uniform4uiv(this.addr,e)}function Cx(i,e,t){const n=this.cache,r=e.length,s=Ho(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Yf,s[o])}function Ix(i,e,t){const n=this.cache,r=e.length,s=Ho(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$f,s[o])}function Px(i,e,t){const n=this.cache,r=e.length,s=Ho(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Zf,s[o])}function Lx(i,e,t){const n=this.cache,r=e.length,s=Ho(t,r);Lt(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Kf,s[o])}function Nx(i){switch(i){case 5126:return px;case 35664:return mx;case 35665:return gx;case 35666:return _x;case 35674:return vx;case 35675:return xx;case 35676:return Mx;case 5124:case 35670:return yx;case 35667:case 35671:return Sx;case 35668:case 35672:return Ax;case 35669:case 35673:return bx;case 5125:return Ex;case 36294:return Tx;case 36295:return wx;case 36296:return Rx;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Ix;case 35680:case 36300:case 36308:case 36293:return Px;case 36289:case 36303:case 36311:case 36292:return Lx}}class Ox{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dx(t.type)}}class Dx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nx(t.type)}}class zx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Ra=/(\w+)(\])?(\[|\.)?/g;function Du(i,e){i.seq.push(e),i.map[e.id]=e}function Ux(i,e,t){const n=i.name,r=n.length;for(Ra.lastIndex=0;;){const s=Ra.exec(n),o=Ra.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Du(t,l===void 0?new Ox(a,i,e):new Dx(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new zx(a),Du(t,h)),t=h}}}class So{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Ux(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function zu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Fx=37297;let Bx=0;function kx(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Uu=new ke;function Vx(i){Xe._getMatrix(Uu,Xe.workingColorSpace,i);const e=`mat3( ${Uu.elements.map(t=>t.toFixed(4))} )`;switch(Xe.getTransfer(i)){case ko:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+kx(i.getShaderSource(e),o)}else return r}function Hx(i,e){const t=Vx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Gx(i,e){let t;switch(e){case Vm:t="Linear";break;case Hm:t="Reinhard";break;case Gm:t="Cineon";break;case Wm:t="ACESFilmic";break;case jm:t="AgX";break;case qm:t="Neutral";break;case Xm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const eo=new L;function Wx(){Xe.getLuminanceCoefficients(eo);const i=eo.x.toFixed(4),e=eo.y.toFixed(4),t=eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function jx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function cs(i){return i!==""}function Bu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ku(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function zc(i){return i.replace(Yx,$x)}const Kx=new Map;function $x(i,e){let t=He[e];if(t===void 0){const n=Kx.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return zc(t)}const Zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vu(i){return i.replace(Zx,Jx)}function Jx(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Hu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Qx(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Mm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function eM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ir:case Pr:e="ENVMAP_TYPE_CUBE";break;case Bo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pr:e="ENVMAP_MODE_REFRACTION";break}return e}function nM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Jc:e="ENVMAP_BLENDING_MULTIPLY";break;case Bm:e="ENVMAP_BLENDING_MIX";break;case km:e="ENVMAP_BLENDING_ADD";break}return e}function iM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function rM(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Qx(t),l=eM(t),u=tM(t),h=nM(t),f=iM(t),d=Xx(t),_=jx(s),v=r.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(cs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(cs).join(`
`),p.length>0&&(p+=`
`)):(m=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),p=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?He.tonemapping_pars_fragment:"",t.toneMapping!==yi?Gx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Hx("linearToOutputTexel",t.outputColorSpace),Wx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cs).join(`
`)),o=zc(o),o=Bu(o,t),o=ku(o,t),a=zc(a),a=Bu(a,t),a=ku(a,t),o=Vu(o),a=Vu(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===eu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+o,g=x+p+a,E=zu(r,r.VERTEX_SHADER,M),b=zu(r,r.FRAGMENT_SHADER,g);r.attachShader(v,E),r.attachShader(v,b),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(N){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(v).trim(),P=r.getShaderInfoLog(E).trim(),D=r.getShaderInfoLog(b).trim();let G=!0,R=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,E,b);else{const j=Fu(r,E,"vertex"),B=Fu(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+V+`
`+j+`
`+B)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(P===""||D==="")&&(R=!1);R&&(N.diagnostics={runnable:G,programLog:V,vertexShader:{log:P,prefix:m},fragmentShader:{log:D,prefix:p}})}r.deleteShader(E),r.deleteShader(b),C=new So(r,v),S=qx(r,v)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(v,Fx)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bx++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=b,this}let sM=0;class oM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new aM(e),t.set(e,n)),n}}class aM{constructor(e){this.id=sM++,this.code=e,this.usedTimes=0}}function cM(i,e,t,n,r,s,o){const a=new Bf,c=new oM,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,y,N,V,P){const D=V.fog,G=P.geometry,R=S.isMeshStandardMaterial?V.environment:null,j=(S.isMeshStandardMaterial?t:e).get(S.envMap||R),B=j&&j.mapping===Bo?j.image.height:null,K=_[S.type];S.precision!==null&&(d=r.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const Z=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ce=Z!==void 0?Z.length:0;let xe=0;G.morphAttributes.position!==void 0&&(xe=1),G.morphAttributes.normal!==void 0&&(xe=2),G.morphAttributes.color!==void 0&&(xe=3);let pe,q,ne,Me;if(K){const ot=Ln[K];pe=ot.vertexShader,q=ot.fragmentShader}else pe=S.vertexShader,q=S.fragmentShader,c.update(S),ne=c.getVertexShaderID(S),Me=c.getFragmentShaderID(S);const ae=i.getRenderTarget(),we=i.state.buffers.depth.getReversed(),Ne=P.isInstancedMesh===!0,Ge=P.isBatchedMesh===!0,Mt=!!S.map,Ke=!!S.matcap,bt=!!j,k=!!S.aoMap,on=!!S.lightMap,je=!!S.bumpMap,qe=!!S.normalMap,Ie=!!S.displacementMap,gt=!!S.emissiveMap,Re=!!S.metalnessMap,I=!!S.roughnessMap,A=S.anisotropy>0,H=S.clearcoat>0,J=S.dispersion>0,ee=S.iridescence>0,$=S.sheen>0,Ee=S.transmission>0,ue=A&&!!S.anisotropyMap,me=H&&!!S.clearcoatMap,$e=H&&!!S.clearcoatNormalMap,ie=H&&!!S.clearcoatRoughnessMap,_e=ee&&!!S.iridescenceMap,Le=ee&&!!S.iridescenceThicknessMap,Oe=$&&!!S.sheenColorMap,ve=$&&!!S.sheenRoughnessMap,Ye=!!S.specularMap,Ve=!!S.specularColorMap,ft=!!S.specularIntensityMap,z=Ee&&!!S.transmissionMap,le=Ee&&!!S.thicknessMap,Y=!!S.gradientMap,Q=!!S.alphaMap,de=S.alphaTest>0,he=!!S.alphaHash,Ue=!!S.extensions;let yt=yi;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(yt=i.toneMapping);const Ft={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:pe,fragmentShader:q,defines:S.defines,customVertexShaderID:ne,customFragmentShaderID:Me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Ge,batchingColor:Ge&&P._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&P.instanceColor!==null,instancingMorph:Ne&&P.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:$t,alphaToCoverage:!!S.alphaToCoverage,map:Mt,matcap:Ke,envMap:bt,envMapMode:bt&&j.mapping,envMapCubeUVHeight:B,aoMap:k,lightMap:on,bumpMap:je,normalMap:qe,displacementMap:f&&Ie,emissiveMap:gt,normalMapObjectSpace:qe&&S.normalMapType===t0,normalMapTangentSpace:qe&&S.normalMapType===cl,metalnessMap:Re,roughnessMap:I,anisotropy:A,anisotropyMap:ue,clearcoat:H,clearcoatMap:me,clearcoatNormalMap:$e,clearcoatRoughnessMap:ie,dispersion:J,iridescence:ee,iridescenceMap:_e,iridescenceThicknessMap:Le,sheen:$,sheenColorMap:Oe,sheenRoughnessMap:ve,specularMap:Ye,specularColorMap:Ve,specularIntensityMap:ft,transmission:Ee,transmissionMap:z,thicknessMap:le,gradientMap:Y,opaque:S.transparent===!1&&S.blending===Vi&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:de,alphaHash:he,combine:S.combine,mapUv:Mt&&v(S.map.channel),aoMapUv:k&&v(S.aoMap.channel),lightMapUv:on&&v(S.lightMap.channel),bumpMapUv:je&&v(S.bumpMap.channel),normalMapUv:qe&&v(S.normalMap.channel),displacementMapUv:Ie&&v(S.displacementMap.channel),emissiveMapUv:gt&&v(S.emissiveMap.channel),metalnessMapUv:Re&&v(S.metalnessMap.channel),roughnessMapUv:I&&v(S.roughnessMap.channel),anisotropyMapUv:ue&&v(S.anisotropyMap.channel),clearcoatMapUv:me&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:$e&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&v(S.sheenRoughnessMap.channel),specularMapUv:Ye&&v(S.specularMap.channel),specularColorMapUv:Ve&&v(S.specularColorMap.channel),specularIntensityMapUv:ft&&v(S.specularIntensityMap.channel),transmissionMapUv:z&&v(S.transmissionMap.channel),thicknessMapUv:le&&v(S.thicknessMap.channel),alphaMapUv:Q&&v(S.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(qe||A),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!G.attributes.uv&&(Mt||Q),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:we,skinning:P.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:xe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:yt,decodeVideoTexture:Mt&&S.map.isVideoTexture===!0&&Xe.getTransfer(S.map.colorSpace)===ut,decodeVideoTextureEmissive:gt&&S.emissiveMap.isVideoTexture===!0&&Xe.getTransfer(S.emissiveMap.colorSpace)===ut,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===pn,flipSided:S.side===Qt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ue&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&S.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ft.vertexUv1s=l.has(1),Ft.vertexUv2s=l.has(2),Ft.vertexUv3s=l.has(3),l.clear(),Ft}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const N in S.defines)y.push(N),y.push(S.defines[N]);return S.isRawShaderMaterial===!1&&(x(y,S),M(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function g(S){const y=_[S.type];let N;if(y){const V=Ln[y];N=X0.clone(V.uniforms)}else N=S.uniforms;return N}function E(S,y){let N;for(let V=0,P=u.length;V<P;V++){const D=u[V];if(D.cacheKey===y){N=D,++N.usedTimes;break}}return N===void 0&&(N=new rM(i,y,S,s),u.push(N)),N}function b(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function w(S){c.remove(S)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:g,acquireProgram:E,releaseProgram:b,releaseShaderCache:w,programs:u,dispose:C}}function lM(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function uM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Gu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Wu(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,f,d,_,v,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:v,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=v,p.group=m),e++,p}function a(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function c(h,f,d,_,v,m){const p=o(h,f,d,_,v,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||uM),n.length>1&&n.sort(f||Gu),r.length>1&&r.sort(f||Gu)}function u(){for(let h=e,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function hM(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Wu,i.set(n,[o])):r>=s.length?(o=new Wu,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function fM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new be};break;case"SpotLight":t={position:new L,direction:new L,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function dM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let pM=0;function mM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gM(i){const e=new fM,t=dM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const r=new L,s=new ze,o=new ze;function a(l){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,_=0,v=0,m=0,p=0,x=0,M=0,g=0,E=0,b=0,w=0;l.sort(mM);for(let S=0,y=l.length;S<y;S++){const N=l[S],V=N.color,P=N.intensity,D=N.distance,G=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)u+=V.r*P,h+=V.g*P,f+=V.b*P;else if(N.isLightProbe){for(let R=0;R<9;R++)n.probe[R].addScaledVector(N.sh.coefficients[R],P);w++}else if(N.isDirectionalLight){const R=e.get(N);if(R.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const j=N.shadow,B=t.get(N);B.shadowIntensity=j.intensity,B.shadowBias=j.bias,B.shadowNormalBias=j.normalBias,B.shadowRadius=j.radius,B.shadowMapSize=j.mapSize,n.directionalShadow[d]=B,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=N.shadow.matrix,x++}n.directional[d]=R,d++}else if(N.isSpotLight){const R=e.get(N);R.position.setFromMatrixPosition(N.matrixWorld),R.color.copy(V).multiplyScalar(P),R.distance=D,R.coneCos=Math.cos(N.angle),R.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),R.decay=N.decay,n.spot[v]=R;const j=N.shadow;if(N.map&&(n.spotLightMap[E]=N.map,E++,j.updateMatrices(N),N.castShadow&&b++),n.spotLightMatrix[v]=j.matrix,N.castShadow){const B=t.get(N);B.shadowIntensity=j.intensity,B.shadowBias=j.bias,B.shadowNormalBias=j.normalBias,B.shadowRadius=j.radius,B.shadowMapSize=j.mapSize,n.spotShadow[v]=B,n.spotShadowMap[v]=G,g++}v++}else if(N.isRectAreaLight){const R=e.get(N);R.color.copy(V).multiplyScalar(P),R.halfWidth.set(N.width*.5,0,0),R.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=R,m++}else if(N.isPointLight){const R=e.get(N);if(R.color.copy(N.color).multiplyScalar(N.intensity),R.distance=N.distance,R.decay=N.decay,N.castShadow){const j=N.shadow,B=t.get(N);B.shadowIntensity=j.intensity,B.shadowBias=j.bias,B.shadowNormalBias=j.normalBias,B.shadowRadius=j.radius,B.shadowMapSize=j.mapSize,B.shadowCameraNear=j.camera.near,B.shadowCameraFar=j.camera.far,n.pointShadow[_]=B,n.pointShadowMap[_]=G,n.pointShadowMatrix[_]=N.shadow.matrix,M++}n.point[_]=R,_++}else if(N.isHemisphereLight){const R=e.get(N);R.skyColor.copy(N.color).multiplyScalar(P),R.groundColor.copy(N.groundColor).multiplyScalar(P),n.hemi[p]=R,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=oe.LTC_FLOAT_1,n.rectAreaLTC2=oe.LTC_FLOAT_2):(n.rectAreaLTC1=oe.LTC_HALF_1,n.rectAreaLTC2=oe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==_||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==x||C.numPointShadows!==M||C.numSpotShadows!==g||C.numSpotMaps!==E||C.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=g,n.spotShadowMap.length=g,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=g+E-b,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,C.directionalLength=d,C.pointLength=_,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=x,C.numPointShadows=M,C.numSpotShadows=g,C.numSpotMaps=E,C.numLightProbes=w,n.version=pM++)}function c(l,u){let h=0,f=0,d=0,_=0,v=0;const m=u.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const M=l[p];if(M.isDirectionalLight){const g=n.directional[h];g.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),h++}else if(M.isSpotLight){const g=n.spot[d];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),g.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const g=n.rectArea[_];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),g.halfWidth.set(M.width*.5,0,0),g.halfHeight.set(0,M.height*.5,0),g.halfWidth.applyMatrix4(o),g.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const g=n.point[f];g.position.setFromMatrixPosition(M.matrixWorld),g.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const g=n.hemi[v];g.direction.setFromMatrixPosition(M.matrixWorld),g.direction.transformDirection(m),v++}}}return{setup:a,setupView:c,state:n}}function Xu(i){const e=new gM(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function _M(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Xu(i),e.set(r,[a])):s>=o.length?(a=new Xu(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class vM extends _n{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Qm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class xM extends _n{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const MM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yM=`uniform sampler2D shadow_pass;
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
}`;function SM(i,e,t){let n=new ul;const r=new se,s=new se,o=new nt,a=new vM({depthPacking:e0}),c=new xM,l={},u=t.maxTextureSize,h={[ni]:Qt,[Qt]:ni,[pn]:pn},f=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:MM,fragmentShader:yM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new zt;_.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Pe(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sf;let p=this.type;this.render=function(b,w,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Mi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const P=p!==Yn&&this.type===Yn,D=p===Yn&&this.type!==Yn;for(let G=0,R=b.length;G<R;G++){const j=b[G],B=j.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const K=B.getFrameExtents();if(r.multiply(K),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/K.x),r.x=s.x*K.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/K.y),r.y=s.y*K.y,B.mapSize.y=s.y)),B.map===null||P===!0||D===!0){const ce=this.type!==Yn?{minFilter:pt,magFilter:pt}:{};B.map!==null&&B.map.dispose(),B.map=new qi(r.x,r.y,ce),B.map.texture.name=j.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const Z=B.getViewportCount();for(let ce=0;ce<Z;ce++){const xe=B.getViewport(ce);o.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),V.viewport(o),B.updateMatrices(j,ce),n=B.getFrustum(),g(w,C,B.camera,j,this.type)}B.isPointLightShadow!==!0&&this.type===Yn&&x(B,C),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,N)};function x(b,w){const C=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new qi(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,C,f,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,C,d,v,null)}function M(b,w,C,S){let y=null;const N=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(N!==void 0)y=N;else if(y=C.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=y.uuid,P=w.uuid;let D=l[V];D===void 0&&(D={},l[V]=D);let G=D[P];G===void 0&&(G=y.clone(),D[P]=G,w.addEventListener("dispose",E)),y=G}if(y.visible=w.visible,y.wireframe=w.wireframe,S===Yn?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:h[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=i.properties.get(y);V.light=C}return y}function g(b,w,C,S,y){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===Yn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const P=e.update(b),D=b.material;if(Array.isArray(D)){const G=P.groups;for(let R=0,j=G.length;R<j;R++){const B=G[R],K=D[B.materialIndex];if(K&&K.visible){const Z=M(b,K,S,y);b.onBeforeShadow(i,b,w,C,P,Z,B),i.renderBufferDirect(C,null,P,Z,b,B),b.onAfterShadow(i,b,w,C,P,Z,B)}}}else if(D.visible){const G=M(b,D,S,y);b.onBeforeShadow(i,b,w,C,P,G,null),i.renderBufferDirect(C,null,P,G,b,null),b.onAfterShadow(i,b,w,C,P,G,null)}}const V=b.children;for(let P=0,D=V.length;P<D;P++)g(V[P],w,C,S,y)}function E(b){b.target.removeEventListener("dispose",E);for(const C in l){const S=l[C],y=b.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const AM={[Ja]:Qa,[ec]:ic,[tc]:rc,[Cr]:nc,[Qa]:Ja,[ic]:ec,[rc]:tc,[nc]:Cr};function bM(i,e){function t(){let z=!1;const le=new nt;let Y=null;const Q=new nt(0,0,0,0);return{setMask:function(de){Y!==de&&!z&&(i.colorMask(de,de,de,de),Y=de)},setLocked:function(de){z=de},setClear:function(de,he,Ue,yt,Ft){Ft===!0&&(de*=yt,he*=yt,Ue*=yt),le.set(de,he,Ue,yt),Q.equals(le)===!1&&(i.clearColor(de,he,Ue,yt),Q.copy(le))},reset:function(){z=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let z=!1,le=!1,Y=null,Q=null,de=null;return{setReversed:function(he){if(le!==he){const Ue=e.get("EXT_clip_control");le?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT);const yt=de;de=null,this.setClear(yt)}le=he},getReversed:function(){return le},setTest:function(he){he?ae(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(he){Y!==he&&!z&&(i.depthMask(he),Y=he)},setFunc:function(he){if(le&&(he=AM[he]),Q!==he){switch(he){case Ja:i.depthFunc(i.NEVER);break;case Qa:i.depthFunc(i.ALWAYS);break;case ec:i.depthFunc(i.LESS);break;case Cr:i.depthFunc(i.LEQUAL);break;case tc:i.depthFunc(i.EQUAL);break;case nc:i.depthFunc(i.GEQUAL);break;case ic:i.depthFunc(i.GREATER);break;case rc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=he}},setLocked:function(he){z=he},setClear:function(he){de!==he&&(le&&(he=1-he),i.clearDepth(he),de=he)},reset:function(){z=!1,Y=null,Q=null,de=null,le=!1}}}function r(){let z=!1,le=null,Y=null,Q=null,de=null,he=null,Ue=null,yt=null,Ft=null;return{setTest:function(ot){z||(ot?ae(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(ot){le!==ot&&!z&&(i.stencilMask(ot),le=ot)},setFunc:function(ot,vn,kn){(Y!==ot||Q!==vn||de!==kn)&&(i.stencilFunc(ot,vn,kn),Y=ot,Q=vn,de=kn)},setOp:function(ot,vn,kn){(he!==ot||Ue!==vn||yt!==kn)&&(i.stencilOp(ot,vn,kn),he=ot,Ue=vn,yt=kn)},setLocked:function(ot){z=ot},setClear:function(ot){Ft!==ot&&(i.clearStencil(ot),Ft=ot)},reset:function(){z=!1,le=null,Y=null,Q=null,de=null,he=null,Ue=null,yt=null,Ft=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,x=null,M=null,g=null,E=null,b=null,w=new be(0,0,0),C=0,S=!1,y=null,N=null,V=null,P=null,D=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let R=!1,j=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(B)[1]),R=j>=1):B.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),R=j>=2);let K=null,Z={};const ce=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),pe=new nt().fromArray(ce),q=new nt().fromArray(xe);function ne(z,le,Y,Q){const de=new Uint8Array(4),he=i.createTexture();i.bindTexture(z,he),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<Y;Ue++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,de):i.texImage2D(le+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,de);return he}const Me={};Me[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(Cr),je(!1),qe(Kl),ae(i.CULL_FACE),k(Mi);function ae(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function we(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function Ne(z,le){return h[z]!==le?(i.bindFramebuffer(z,le),h[z]=le,z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=le),z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=le),!0):!1}function Ge(z,le){let Y=d,Q=!1;if(z){Y=f.get(le),Y===void 0&&(Y=[],f.set(le,Y));const de=z.textures;if(Y.length!==de.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let he=0,Ue=de.length;he<Ue;he++)Y[he]=i.COLOR_ATTACHMENT0+he;Y.length=de.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function Mt(z){return _!==z?(i.useProgram(z),_=z,!0):!1}const Ke={[Ui]:i.FUNC_ADD,[Sm]:i.FUNC_SUBTRACT,[Am]:i.FUNC_REVERSE_SUBTRACT};Ke[bm]=i.MIN,Ke[Em]=i.MAX;const bt={[Tm]:i.ZERO,[wm]:i.ONE,[Rm]:i.SRC_COLOR,[$a]:i.SRC_ALPHA,[Om]:i.SRC_ALPHA_SATURATE,[Lm]:i.DST_COLOR,[Im]:i.DST_ALPHA,[Cm]:i.ONE_MINUS_SRC_COLOR,[Za]:i.ONE_MINUS_SRC_ALPHA,[Nm]:i.ONE_MINUS_DST_COLOR,[Pm]:i.ONE_MINUS_DST_ALPHA,[Dm]:i.CONSTANT_COLOR,[zm]:i.ONE_MINUS_CONSTANT_COLOR,[Um]:i.CONSTANT_ALPHA,[Fm]:i.ONE_MINUS_CONSTANT_ALPHA};function k(z,le,Y,Q,de,he,Ue,yt,Ft,ot){if(z===Mi){v===!0&&(we(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),z!==ym){if(z!==m||ot!==S){if((p!==Ui||g!==Ui)&&(i.blendEquation(i.FUNC_ADD),p=Ui,g=Ui),ot)switch(z){case Vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.ONE,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}x=null,M=null,E=null,b=null,w.set(0,0,0),C=0,m=z,S=ot}return}de=de||le,he=he||Y,Ue=Ue||Q,(le!==p||de!==g)&&(i.blendEquationSeparate(Ke[le],Ke[de]),p=le,g=de),(Y!==x||Q!==M||he!==E||Ue!==b)&&(i.blendFuncSeparate(bt[Y],bt[Q],bt[he],bt[Ue]),x=Y,M=Q,E=he,b=Ue),(yt.equals(w)===!1||Ft!==C)&&(i.blendColor(yt.r,yt.g,yt.b,Ft),w.copy(yt),C=Ft),m=z,S=!1}function on(z,le){z.side===pn?we(i.CULL_FACE):ae(i.CULL_FACE);let Y=z.side===Qt;le&&(Y=!Y),je(Y),z.blending===Vi&&z.transparent===!1?k(Mi):k(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const Q=z.stencilWrite;a.setTest(Q),Q&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),gt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function je(z){y!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),y=z)}function qe(z){z!==vm?(ae(i.CULL_FACE),z!==N&&(z===Kl?i.cullFace(i.BACK):z===xm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),N=z}function Ie(z){z!==V&&(R&&i.lineWidth(z),V=z)}function gt(z,le,Y){z?(ae(i.POLYGON_OFFSET_FILL),(P!==le||D!==Y)&&(i.polygonOffset(le,Y),P=le,D=Y)):we(i.POLYGON_OFFSET_FILL)}function Re(z){z?ae(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function I(z){z===void 0&&(z=i.TEXTURE0+G-1),K!==z&&(i.activeTexture(z),K=z)}function A(z,le,Y){Y===void 0&&(K===null?Y=i.TEXTURE0+G-1:Y=K);let Q=Z[Y];Q===void 0&&(Q={type:void 0,texture:void 0},Z[Y]=Q),(Q.type!==z||Q.texture!==le)&&(K!==Y&&(i.activeTexture(Y),K=Y),i.bindTexture(z,le||Me[z]),Q.type=z,Q.texture=le)}function H(){const z=Z[K];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ue(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $e(){try{i.texStorage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ie(){try{i.texStorage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Le(){try{i.texImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Oe(z){pe.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),pe.copy(z))}function ve(z){q.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),q.copy(z))}function Ye(z,le){let Y=l.get(le);Y===void 0&&(Y=new WeakMap,l.set(le,Y));let Q=Y.get(z);Q===void 0&&(Q=i.getUniformBlockIndex(le,z.name),Y.set(z,Q))}function Ve(z,le){const Q=l.get(le).get(z);c.get(le)!==Q&&(i.uniformBlockBinding(le,Q,z.__bindingPointIndex),c.set(le,Q))}function ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},K=null,Z={},h={},f=new WeakMap,d=[],_=null,v=!1,m=null,p=null,x=null,M=null,g=null,E=null,b=null,w=new be(0,0,0),C=0,S=!1,y=null,N=null,V=null,P=null,D=null,pe.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ae,disable:we,bindFramebuffer:Ne,drawBuffers:Ge,useProgram:Mt,setBlending:k,setMaterial:on,setFlipSided:je,setCullFace:qe,setLineWidth:Ie,setPolygonOffset:gt,setScissorTest:Re,activeTexture:I,bindTexture:A,unbindTexture:H,compressedTexImage2D:J,compressedTexImage3D:ee,texImage2D:_e,texImage3D:Le,updateUBOMapping:Ye,uniformBlockBinding:Ve,texStorage2D:$e,texStorage3D:ie,texSubImage2D:$,texSubImage3D:Ee,compressedTexSubImage2D:ue,compressedTexSubImage3D:me,scissor:Oe,viewport:ve,reset:ft}}function ju(i,e,t,n){const r=EM(n);switch(t){case Rf:return i*e;case If:return i*e;case Pf:return i*e*2;case nl:return i*e/r.components*r.byteLength;case il:return i*e/r.components*r.byteLength;case Lf:return i*e*2/r.components*r.byteLength;case rl:return i*e*2/r.components*r.byteLength;case Cf:return i*e*3/r.components*r.byteLength;case gn:return i*e*4/r.components*r.byteLength;case sl:return i*e*4/r.components*r.byteLength;case _o:case vo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xo:case Mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cc:case uc:return Math.max(i,16)*Math.max(e,8)/4;case ac:case lc:return Math.max(i,8)*Math.max(e,8)/2;case hc:case fc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case bc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case yo:case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Nf:case Ic:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Pc:case Lc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function EM(i){switch(i){case ii:case Ef:return{byteLength:1,components:1};case Ss:case Tf:case ws:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case ji:case Qc:case En:return{byteLength:4,components:1};case wf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function TM(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new se,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,A){return d?new OffscreenCanvas(I,A):Es("canvas")}function v(I,A,H){let J=1;const ee=Re(I);if((ee.width>H||ee.height>H)&&(J=H/Math.max(ee.width,ee.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const $=Math.floor(J*ee.width),Ee=Math.floor(J*ee.height);h===void 0&&(h=_($,Ee));const ue=A?_($,Ee):h;return ue.width=$,ue.height=Ee,ue.getContext("2d").drawImage(I,0,0,$,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+$+"x"+Ee+")."),ue}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function x(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(I,A,H,J,ee=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let $=A;if(A===i.RED&&(H===i.FLOAT&&($=i.R32F),H===i.HALF_FLOAT&&($=i.R16F),H===i.UNSIGNED_BYTE&&($=i.R8)),A===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.R8UI),H===i.UNSIGNED_SHORT&&($=i.R16UI),H===i.UNSIGNED_INT&&($=i.R32UI),H===i.BYTE&&($=i.R8I),H===i.SHORT&&($=i.R16I),H===i.INT&&($=i.R32I)),A===i.RG&&(H===i.FLOAT&&($=i.RG32F),H===i.HALF_FLOAT&&($=i.RG16F),H===i.UNSIGNED_BYTE&&($=i.RG8)),A===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RG8UI),H===i.UNSIGNED_SHORT&&($=i.RG16UI),H===i.UNSIGNED_INT&&($=i.RG32UI),H===i.BYTE&&($=i.RG8I),H===i.SHORT&&($=i.RG16I),H===i.INT&&($=i.RG32I)),A===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGB8UI),H===i.UNSIGNED_SHORT&&($=i.RGB16UI),H===i.UNSIGNED_INT&&($=i.RGB32UI),H===i.BYTE&&($=i.RGB8I),H===i.SHORT&&($=i.RGB16I),H===i.INT&&($=i.RGB32I)),A===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&($=i.RGBA8UI),H===i.UNSIGNED_SHORT&&($=i.RGBA16UI),H===i.UNSIGNED_INT&&($=i.RGBA32UI),H===i.BYTE&&($=i.RGBA8I),H===i.SHORT&&($=i.RGBA16I),H===i.INT&&($=i.RGBA32I)),A===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),A===i.RGBA){const Ee=ee?ko:Xe.getTransfer(J);H===i.FLOAT&&($=i.RGBA32F),H===i.HALF_FLOAT&&($=i.RGBA16F),H===i.UNSIGNED_BYTE&&($=Ee===ut?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function g(I,A){let H;return I?A===null||A===ji||A===Lr?H=i.DEPTH24_STENCIL8:A===En?H=i.DEPTH32F_STENCIL8:A===Ss&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ji||A===Lr?H=i.DEPTH_COMPONENT24:A===En?H=i.DEPTH_COMPONENT32F:A===Ss&&(H=i.DEPTH_COMPONENT16),H}function E(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==pt&&I.minFilter!==sn?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function b(I){const A=I.target;A.removeEventListener("dispose",b),C(A),A.isVideoTexture&&u.delete(A)}function w(I){const A=I.target;A.removeEventListener("dispose",w),y(A)}function C(I){const A=n.get(I);if(A.__webglInit===void 0)return;const H=I.source,J=f.get(H);if(J){const ee=J[A.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(I),Object.keys(J).length===0&&f.delete(H)}n.remove(I)}function S(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const H=I.source,J=f.get(H);delete J[A.__cacheKey],o.memory.textures--}function y(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(A.__webglFramebuffer[J]))for(let ee=0;ee<A.__webglFramebuffer[J].length;ee++)i.deleteFramebuffer(A.__webglFramebuffer[J][ee]);else i.deleteFramebuffer(A.__webglFramebuffer[J]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[J])}else{if(Array.isArray(A.__webglFramebuffer))for(let J=0;J<A.__webglFramebuffer.length;J++)i.deleteFramebuffer(A.__webglFramebuffer[J]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let J=0;J<A.__webglColorRenderbuffer.length;J++)A.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[J]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const H=I.textures;for(let J=0,ee=H.length;J<ee;J++){const $=n.get(H[J]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(H[J])}n.remove(I)}let N=0;function V(){N=0}function P(){const I=N;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),N+=1,I}function D(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function G(I,A){const H=n.get(I);if(I.isVideoTexture&&Ie(I),I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){const J=I.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(H,I,A);return}}t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+A)}function R(I,A){const H=n.get(I);if(I.version>0&&H.__version!==I.version){q(H,I,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+A)}function j(I,A){const H=n.get(I);if(I.version>0&&H.__version!==I.version){q(H,I,A);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+A)}function B(I,A){const H=n.get(I);if(I.version>0&&H.__version!==I.version){ne(H,I,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+A)}const K={[Ei]:i.REPEAT,[_i]:i.CLAMP_TO_EDGE,[No]:i.MIRRORED_REPEAT},Z={[pt]:i.NEAREST,[bf]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[go]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},ce={[n0]:i.NEVER,[c0]:i.ALWAYS,[i0]:i.LESS,[Df]:i.LEQUAL,[r0]:i.EQUAL,[a0]:i.GEQUAL,[s0]:i.GREATER,[o0]:i.NOTEQUAL};function xe(I,A){if(A.type===En&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===sn||A.magFilter===go||A.magFilter===os||A.magFilter===Jn||A.minFilter===sn||A.minFilter===go||A.minFilter===os||A.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,K[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,K[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,K[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,Z[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,Z[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,ce[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===pt||A.minFilter!==os&&A.minFilter!==Jn||A.type===En&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function pe(I,A){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",b));const J=A.source;let ee=f.get(J);ee===void 0&&(ee={},f.set(J,ee));const $=D(A);if($!==I.__cacheKey){ee[$]===void 0&&(ee[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ee[$].usedTimes++;const Ee=ee[I.__cacheKey];Ee!==void 0&&(ee[I.__cacheKey].usedTimes--,Ee.usedTimes===0&&S(A)),I.__cacheKey=$,I.__webglTexture=ee[$].texture}return H}function q(I,A,H){let J=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(J=i.TEXTURE_3D);const ee=pe(I,A),$=A.source;t.bindTexture(J,I.__webglTexture,i.TEXTURE0+H);const Ee=n.get($);if($.version!==Ee.__version||ee===!0){t.activeTexture(i.TEXTURE0+H);const ue=Xe.getPrimaries(Xe.workingColorSpace),me=A.colorSpace===mi?null:Xe.getPrimaries(A.colorSpace),$e=A.colorSpace===mi||ue===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ie=v(A.image,!1,r.maxTextureSize);ie=gt(A,ie);const _e=s.convert(A.format,A.colorSpace),Le=s.convert(A.type);let Oe=M(A.internalFormat,_e,Le,A.colorSpace,A.isVideoTexture);xe(J,A);let ve;const Ye=A.mipmaps,Ve=A.isVideoTexture!==!0,ft=Ee.__version===void 0||ee===!0,z=$.dataReady,le=E(A,ie);if(A.isDepthTexture)Oe=g(A.format===Nr,A.type),ft&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Oe,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Oe,ie.width,ie.height,0,_e,Le,null));else if(A.isDataTexture)if(Ye.length>0){Ve&&ft&&t.texStorage2D(i.TEXTURE_2D,le,Oe,Ye[0].width,Ye[0].height);for(let Y=0,Q=Ye.length;Y<Q;Y++)ve=Ye[Y],Ve?z&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ve.width,ve.height,_e,Le,ve.data):t.texImage2D(i.TEXTURE_2D,Y,Oe,ve.width,ve.height,0,_e,Le,ve.data);A.generateMipmaps=!1}else Ve?(ft&&t.texStorage2D(i.TEXTURE_2D,le,Oe,ie.width,ie.height),z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,_e,Le,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,ie.width,ie.height,0,_e,Le,ie.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ve&&ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Oe,Ye[0].width,Ye[0].height,ie.depth);for(let Y=0,Q=Ye.length;Y<Q;Y++)if(ve=Ye[Y],A.format!==gn)if(_e!==null)if(Ve){if(z)if(A.layerUpdates.size>0){const de=ju(ve.width,ve.height,A.format,A.type);for(const he of A.layerUpdates){const Ue=ve.data.subarray(he*de/ve.data.BYTES_PER_ELEMENT,(he+1)*de/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,he,ve.width,ve.height,1,_e,Ue)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ve.width,ve.height,ie.depth,_e,ve.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Oe,ve.width,ve.height,ie.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,ve.width,ve.height,ie.depth,_e,Le,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,Oe,ve.width,ve.height,ie.depth,0,_e,Le,ve.data)}else{Ve&&ft&&t.texStorage2D(i.TEXTURE_2D,le,Oe,Ye[0].width,Ye[0].height);for(let Y=0,Q=Ye.length;Y<Q;Y++)ve=Ye[Y],A.format!==gn?_e!==null?Ve?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,ve.width,ve.height,_e,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,Oe,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?z&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,ve.width,ve.height,_e,Le,ve.data):t.texImage2D(i.TEXTURE_2D,Y,Oe,ve.width,ve.height,0,_e,Le,ve.data)}else if(A.isDataArrayTexture)if(Ve){if(ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Oe,ie.width,ie.height,ie.depth),z)if(A.layerUpdates.size>0){const Y=ju(ie.width,ie.height,A.format,A.type);for(const Q of A.layerUpdates){const de=ie.data.subarray(Q*Y/ie.data.BYTES_PER_ELEMENT,(Q+1)*Y/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,ie.width,ie.height,1,_e,Le,de)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,_e,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,ie.width,ie.height,ie.depth,0,_e,Le,ie.data);else if(A.isData3DTexture)Ve?(ft&&t.texStorage3D(i.TEXTURE_3D,le,Oe,ie.width,ie.height,ie.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,_e,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,ie.width,ie.height,ie.depth,0,_e,Le,ie.data);else if(A.isFramebufferTexture){if(ft)if(Ve)t.texStorage2D(i.TEXTURE_2D,le,Oe,ie.width,ie.height);else{let Y=ie.width,Q=ie.height;for(let de=0;de<le;de++)t.texImage2D(i.TEXTURE_2D,de,Oe,Y,Q,0,_e,Le,null),Y>>=1,Q>>=1}}else if(Ye.length>0){if(Ve&&ft){const Y=Re(Ye[0]);t.texStorage2D(i.TEXTURE_2D,le,Oe,Y.width,Y.height)}for(let Y=0,Q=Ye.length;Y<Q;Y++)ve=Ye[Y],Ve?z&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,_e,Le,ve):t.texImage2D(i.TEXTURE_2D,Y,Oe,_e,Le,ve);A.generateMipmaps=!1}else if(Ve){if(ft){const Y=Re(ie);t.texStorage2D(i.TEXTURE_2D,le,Oe,Y.width,Y.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,Oe,_e,Le,ie);m(A)&&p(J),Ee.__version=$.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ne(I,A,H){if(A.image.length!==6)return;const J=pe(I,A),ee=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+H);const $=n.get(ee);if(ee.version!==$.__version||J===!0){t.activeTexture(i.TEXTURE0+H);const Ee=Xe.getPrimaries(Xe.workingColorSpace),ue=A.colorSpace===mi?null:Xe.getPrimaries(A.colorSpace),me=A.colorSpace===mi||Ee===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const $e=A.isCompressedTexture||A.image[0].isCompressedTexture,ie=A.image[0]&&A.image[0].isDataTexture,_e=[];for(let Q=0;Q<6;Q++)!$e&&!ie?_e[Q]=v(A.image[Q],!0,r.maxCubemapSize):_e[Q]=ie?A.image[Q].image:A.image[Q],_e[Q]=gt(A,_e[Q]);const Le=_e[0],Oe=s.convert(A.format,A.colorSpace),ve=s.convert(A.type),Ye=M(A.internalFormat,Oe,ve,A.colorSpace),Ve=A.isVideoTexture!==!0,ft=$.__version===void 0||J===!0,z=ee.dataReady;let le=E(A,Le);xe(i.TEXTURE_CUBE_MAP,A);let Y;if($e){Ve&&ft&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ye,Le.width,Le.height);for(let Q=0;Q<6;Q++){Y=_e[Q].mipmaps;for(let de=0;de<Y.length;de++){const he=Y[de];A.format!==gn?Oe!==null?Ve?z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,0,0,he.width,he.height,Oe,he.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,Ye,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,0,0,he.width,he.height,Oe,ve,he.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de,Ye,he.width,he.height,0,Oe,ve,he.data)}}}else{if(Y=A.mipmaps,Ve&&ft){Y.length>0&&le++;const Q=Re(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ye,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ie){Ve?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_e[Q].width,_e[Q].height,Oe,ve,_e[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,_e[Q].width,_e[Q].height,0,Oe,ve,_e[Q].data);for(let de=0;de<Y.length;de++){const Ue=Y[de].image[Q].image;Ve?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,0,0,Ue.width,Ue.height,Oe,ve,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,Ye,Ue.width,Ue.height,0,Oe,ve,Ue.data)}}else{Ve?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Oe,ve,_e[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,Oe,ve,_e[Q]);for(let de=0;de<Y.length;de++){const he=Y[de];Ve?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,0,0,Oe,ve,he.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,de+1,Ye,Oe,ve,he.image[Q])}}}m(A)&&p(i.TEXTURE_CUBE_MAP),$.__version=ee.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function Me(I,A,H,J,ee,$){const Ee=s.convert(H.format,H.colorSpace),ue=s.convert(H.type),me=M(H.internalFormat,Ee,ue,H.colorSpace),$e=n.get(A),ie=n.get(H);if(ie.__renderTarget=A,!$e.__hasExternalTextures){const _e=Math.max(1,A.width>>$),Le=Math.max(1,A.height>>$);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,$,me,_e,Le,A.depth,0,Ee,ue,null):t.texImage2D(ee,$,me,_e,Le,0,Ee,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),qe(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,ee,ie.__webglTexture,0,je(A)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,ee,ie.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(I,A,H){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){const J=A.depthTexture,ee=J&&J.isDepthTexture?J.type:null,$=g(A.stencilBuffer,ee),Ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=je(A);qe(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,$,A.width,A.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,$,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,$,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ee,i.RENDERBUFFER,I)}else{const J=A.textures;for(let ee=0;ee<J.length;ee++){const $=J[ee],Ee=s.convert($.format,$.colorSpace),ue=s.convert($.type),me=M($.internalFormat,Ee,ue,$.colorSpace),$e=je(A);H&&qe(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,me,A.width,A.height):qe(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$e,me,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,me,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(A.depthTexture);J.__renderTarget=A,(!J.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),G(A.depthTexture,0);const ee=J.__webglTexture,$=je(A);if(A.depthTexture.format===Sr)qe(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(A.depthTexture.format===Nr)qe(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ne(I){const A=n.get(I),H=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const J=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),J){const ee=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,J.removeEventListener("dispose",ee)};J.addEventListener("dispose",ee),A.__depthDisposeCallback=ee}A.__boundDepthTexture=J}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");we(A.__webglFramebuffer,I)}else if(H){A.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[J]),A.__webglDepthbuffer[J]===void 0)A.__webglDepthbuffer[J]=i.createRenderbuffer(),ae(A.__webglDepthbuffer[J],I,!1);else{const ee=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),ae(A.__webglDepthbuffer,I,!1);else{const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ee)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(I,A,H){const J=n.get(I);A!==void 0&&Me(J.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Ne(I)}function Mt(I){const A=I.texture,H=n.get(I),J=n.get(A);I.addEventListener("dispose",w);const ee=I.textures,$=I.isWebGLCubeRenderTarget===!0,Ee=ee.length>1;if(Ee||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=A.version,o.memory.textures++),$){H.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[ue]=[];for(let me=0;me<A.mipmaps.length;me++)H.__webglFramebuffer[ue][me]=i.createFramebuffer()}else H.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let ue=0;ue<A.mipmaps.length;ue++)H.__webglFramebuffer[ue]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Ee)for(let ue=0,me=ee.length;ue<me;ue++){const $e=n.get(ee[ue]);$e.__webglTexture===void 0&&($e.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&qe(I)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){const me=ee[ue];H.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ue]);const $e=s.convert(me.format,me.colorSpace),ie=s.convert(me.type),_e=M(me.internalFormat,$e,ie,me.colorSpace,I.isXRRenderTarget===!0),Le=je(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,_e,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,H.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),xe(i.TEXTURE_CUBE_MAP,A);for(let ue=0;ue<6;ue++)if(A.mipmaps&&A.mipmaps.length>0)for(let me=0;me<A.mipmaps.length;me++)Me(H.__webglFramebuffer[ue][me],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else Me(H.__webglFramebuffer[ue],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(A)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ue=0,me=ee.length;ue<me;ue++){const $e=ee[ue],ie=n.get($e);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),xe(i.TEXTURE_2D,$e),Me(H.__webglFramebuffer,I,$e,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,0),m($e)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ue=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,J.__webglTexture),xe(ue,A),A.mipmaps&&A.mipmaps.length>0)for(let me=0;me<A.mipmaps.length;me++)Me(H.__webglFramebuffer[me],I,A,i.COLOR_ATTACHMENT0,ue,me);else Me(H.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,ue,0);m(A)&&p(ue),t.unbindTexture()}I.depthBuffer&&Ne(I)}function Ke(I){const A=I.textures;for(let H=0,J=A.length;H<J;H++){const ee=A[H];if(m(ee)){const $=x(I),Ee=n.get(ee).__webglTexture;t.bindTexture($,Ee),p($),t.unbindTexture()}}}const bt=[],k=[];function on(I){if(I.samples>0){if(qe(I)===!1){const A=I.textures,H=I.width,J=I.height;let ee=i.COLOR_BUFFER_BIT;const $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=n.get(I),ue=A.length>1;if(ue)for(let me=0;me<A.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let me=0;me<A.length;me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);const $e=n.get(A[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$e,0)}i.blitFramebuffer(0,0,H,J,0,0,H,J,ee,i.NEAREST),c===!0&&(bt.length=0,k.length=0,bt.push(i.COLOR_ATTACHMENT0+me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(bt.push($),k.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let me=0;me<A.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,Ee.__webglColorRenderbuffer[me]);const $e=n.get(A[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ee.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,$e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function je(I){return Math.min(r.maxSamples,I.samples)}function qe(I){const A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ie(I){const A=o.render.frame;u.get(I)!==A&&(u.set(I,A),I.update())}function gt(I,A){const H=I.colorSpace,J=I.format,ee=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==$t&&H!==mi&&(Xe.getTransfer(H)===ut?(J!==gn||ee!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),A}function Re(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=V,this.setTexture2D=G,this.setTexture2DArray=R,this.setTexture3D=j,this.setTextureCube=B,this.rebindTextures=Ge,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=on,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=qe}function wM(i,e){function t(n,r=mi){let s;const o=Xe.getTransfer(r);if(n===ii)return i.UNSIGNED_BYTE;if(n===el)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ef)return i.BYTE;if(n===Tf)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===Qc)return i.INT;if(n===ji)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===ws)return i.HALF_FLOAT;if(n===Rf)return i.ALPHA;if(n===Cf)return i.RGB;if(n===gn)return i.RGBA;if(n===If)return i.LUMINANCE;if(n===Pf)return i.LUMINANCE_ALPHA;if(n===Sr)return i.DEPTH_COMPONENT;if(n===Nr)return i.DEPTH_STENCIL;if(n===nl)return i.RED;if(n===il)return i.RED_INTEGER;if(n===Lf)return i.RG;if(n===rl)return i.RG_INTEGER;if(n===sl)return i.RGBA_INTEGER;if(n===_o||n===vo||n===xo||n===Mo)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===_o)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===_o)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ac||n===cc||n===lc||n===uc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ac)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hc||n===fc||n===dc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===hc||n===fc)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===dc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===pc||n===mc||n===gc||n===_c||n===vc||n===xc||n===Mc||n===yc||n===Sc||n===Ac||n===bc||n===Ec||n===Tc||n===wc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===pc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_c)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ac)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ec)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wc)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yo||n===Rc||n===Cc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===yo)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Rc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Cc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nf||n===Ic||n===Pc||n===Lc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===yo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ic)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Lr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class RM extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class At extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const CM={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(CM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const IM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PM=`
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

}`;class LM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Pt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ti({vertexShader:IM,fragmentShader:PM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pe(new Jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class NM extends Yi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,_=null;const v=new LM,m=t.getContextAttributes();let p=null,x=null;const M=[],g=[],E=new se;let b=null;const w=new Xt;w.viewport=new nt;const C=new Xt;C.viewport=new nt;const S=[w,C],y=new RM;let N=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ne=M[q];return ne===void 0&&(ne=new Ca,M[q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(q){let ne=M[q];return ne===void 0&&(ne=new Ca,M[q]=ne),ne.getGripSpace()},this.getHand=function(q){let ne=M[q];return ne===void 0&&(ne=new Ca,M[q]=ne),ne.getHandSpace()};function P(q){const ne=g.indexOf(q.inputSource);if(ne===-1)return;const Me=M[ne];Me!==void 0&&(Me.update(q.inputSource,q.frame,l||o),Me.dispatchEvent({type:q.type,data:q.inputSource}))}function D(){r.removeEventListener("select",P),r.removeEventListener("selectstart",P),r.removeEventListener("selectend",P),r.removeEventListener("squeeze",P),r.removeEventListener("squeezestart",P),r.removeEventListener("squeezeend",P),r.removeEventListener("end",D),r.removeEventListener("inputsourceschange",G);for(let q=0;q<M.length;q++){const ne=g[q];ne!==null&&(g[q]=null,M[q].disconnect(ne))}N=null,V=null,v.reset(),e.setRenderTarget(p),d=null,f=null,h=null,r=null,x=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",P),r.addEventListener("selectstart",P),r.addEventListener("selectend",P),r.addEventListener("squeeze",P),r.addEventListener("squeezestart",P),r.addEventListener("squeezeend",P),r.addEventListener("end",D),r.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(E),r.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new qi(d.framebufferWidth,d.framebufferHeight,{format:gn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,Me=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?Nr:Sr,Me=m.stencil?Lr:ji);const we={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(we),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new qi(f.textureWidth,f.textureHeight,{format:gn,type:ii,depthTexture:new qf(f.textureWidth,f.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G(q){for(let ne=0;ne<q.removed.length;ne++){const Me=q.removed[ne],ae=g.indexOf(Me);ae>=0&&(g[ae]=null,M[ae].disconnect(Me))}for(let ne=0;ne<q.added.length;ne++){const Me=q.added[ne];let ae=g.indexOf(Me);if(ae===-1){for(let Ne=0;Ne<M.length;Ne++)if(Ne>=g.length){g.push(Me),ae=Ne;break}else if(g[Ne]===null){g[Ne]=Me,ae=Ne;break}if(ae===-1)break}const we=M[ae];we&&we.connect(Me)}}const R=new L,j=new L;function B(q,ne,Me){R.setFromMatrixPosition(ne.matrixWorld),j.setFromMatrixPosition(Me.matrixWorld);const ae=R.distanceTo(j),we=ne.projectionMatrix.elements,Ne=Me.projectionMatrix.elements,Ge=we[14]/(we[10]-1),Mt=we[14]/(we[10]+1),Ke=(we[9]+1)/we[5],bt=(we[9]-1)/we[5],k=(we[8]-1)/we[0],on=(Ne[8]+1)/Ne[0],je=Ge*k,qe=Ge*on,Ie=ae/(-k+on),gt=Ie*-k;if(ne.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(gt),q.translateZ(Ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Re=Ge+Ie,I=Mt+Ie,A=je-gt,H=qe+(ae-gt),J=Ke*Mt/I*Re,ee=bt*Mt/I*Re;q.projectionMatrix.makePerspective(A,H,J,ee,Re,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function K(q,ne){ne===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ne.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let ne=q.near,Me=q.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(Me=v.depthFar)),y.near=C.near=w.near=ne,y.far=C.far=w.far=Me,(N!==y.near||V!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),N=y.near,V=y.far),w.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,y.layers.mask=w.layers.mask|C.layers.mask;const ae=q.parent,we=y.cameras;K(y,ae);for(let Ne=0;Ne<we.length;Ne++)K(we[Ne],ae);we.length===2?B(y,w,C):y.projectionMatrix.copy(w.projectionMatrix),Z(q,y,ae)};function Z(q,ne,Me){Me===null?q.matrix.copy(ne.matrixWorld):(q.matrix.copy(Me.matrixWorld),q.matrix.invert(),q.matrix.multiply(ne.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ne.projectionMatrix),q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Or*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let ce=null;function xe(q,ne){if(u=ne.getViewerPose(l||o),_=ne,u!==null){const Me=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let ae=!1;Me.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Ne=0;Ne<Me.length;Ne++){const Ge=Me[Ne];let Mt=null;if(d!==null)Mt=d.getViewport(Ge);else{const bt=h.getViewSubImage(f,Ge);Mt=bt.viewport,Ne===0&&(e.setRenderTargetTextures(x,bt.colorTexture,f.ignoreDepthValues?void 0:bt.depthStencilTexture),e.setRenderTarget(x))}let Ke=S[Ne];Ke===void 0&&(Ke=new Xt,Ke.layers.enable(Ne),Ke.viewport=new nt,S[Ne]=Ke),Ke.matrix.fromArray(Ge.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Ge.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),Ne===0&&(y.matrix.copy(Ke.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(Ke)}const we=r.enabledFeatures;if(we&&we.includes("depth-sensing")){const Ne=h.getDepthInformation(Me[0]);Ne&&Ne.isValid&&Ne.texture&&v.init(e,Ne,r.renderState)}}for(let Me=0;Me<M.length;Me++){const ae=g[Me],we=M[Me];ae!==null&&we!==void 0&&we.update(ae,ne,l||o)}ce&&ce(q,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),_=null}const pe=new jf;pe.setAnimationLoop(xe),this.setAnimationLoop=function(q){ce=q},this.dispose=function(){}}}const Ni=new Cn,OM=new ze;function DM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Gf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,x,M,g){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,g)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,M):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,g=x.envMapRotation;M&&(m.envMap.value=M,Ni.copy(g),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),m.envMapRotation.value.setFromMatrix4(OM.makeRotationFromEuler(Ni)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function zM(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){const g=M.program;n.uniformBlockBinding(x,g)}function l(x,M){let g=r[x.id];g===void 0&&(_(x),g=u(x),r[x.id]=g,x.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(x,E);const b=e.render.frame;s[x.id]!==b&&(f(x),s[x.id]=b)}function u(x){const M=h();x.__bindingPointIndex=M;const g=i.createBuffer(),E=x.__size,b=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,g),i.bufferData(i.UNIFORM_BUFFER,E,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,g),g}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=r[x.id],g=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let b=0,w=g.length;b<w;b++){const C=Array.isArray(g[b])?g[b]:[g[b]];for(let S=0,y=C.length;S<y;S++){const N=C[S];if(d(N,b,S,E)===!0){const V=N.__offset,P=Array.isArray(N.value)?N.value:[N.value];let D=0;for(let G=0;G<P.length;G++){const R=P[G],j=v(R);typeof R=="number"||typeof R=="boolean"?(N.__data[0]=R,i.bufferSubData(i.UNIFORM_BUFFER,V+D,N.__data)):R.isMatrix3?(N.__data[0]=R.elements[0],N.__data[1]=R.elements[1],N.__data[2]=R.elements[2],N.__data[3]=0,N.__data[4]=R.elements[3],N.__data[5]=R.elements[4],N.__data[6]=R.elements[5],N.__data[7]=0,N.__data[8]=R.elements[6],N.__data[9]=R.elements[7],N.__data[10]=R.elements[8],N.__data[11]=0):(R.toArray(N.__data,D),D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,M,g,E){const b=x.value,w=M+"_"+g;if(E[w]===void 0)return typeof b=="number"||typeof b=="boolean"?E[w]=b:E[w]=b.clone(),!0;{const C=E[w];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return E[w]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function _(x){const M=x.uniforms;let g=0;const E=16;for(let w=0,C=M.length;w<C;w++){const S=Array.isArray(M[w])?M[w]:[M[w]];for(let y=0,N=S.length;y<N;y++){const V=S[y],P=Array.isArray(V.value)?V.value:[V.value];for(let D=0,G=P.length;D<G;D++){const R=P[D],j=v(R),B=g%E,K=B%j.boundary,Z=B+K;g+=K,Z!==0&&E-Z<j.storage&&(g+=E-Z),V.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=g,g+=j.storage}}}const b=g%E;return b>0&&(g+=E-b),x.__size=g,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const g=o.indexOf(M.__bindingPointIndex);o.splice(g,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const x in r)i.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class UM{constructor(e={}){const{canvas:t=E0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=yi,this.toneMappingExposure=1;const g=this;let E=!1,b=0,w=0,C=null,S=-1,y=null;const N=new nt,V=new nt;let P=null;const D=new be(0);let G=0,R=t.width,j=t.height,B=1,K=null,Z=null;const ce=new nt(0,0,R,j),xe=new nt(0,0,R,j);let pe=!1;const q=new ul;let ne=!1,Me=!1;const ae=new ze,we=new ze,Ne=new L,Ge=new nt,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function bt(){return C===null?B:1}let k=n;function on(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zc}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",de,!1),t.addEventListener("webglcontextcreationerror",he,!1),k===null){const U="webgl2";if(k=on(U,T),k===null)throw on(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let je,qe,Ie,gt,Re,I,A,H,J,ee,$,Ee,ue,me,$e,ie,_e,Le,Oe,ve,Ye,Ve,ft,z;function le(){je=new Hv(k),je.init(),Ve=new wM(k,je),qe=new zv(k,je,e,Ve),Ie=new bM(k,je),qe.reverseDepthBuffer&&f&&Ie.buffers.depth.setReversed(!0),gt=new Xv(k),Re=new lM,I=new TM(k,je,Ie,Re,qe,Ve,gt),A=new Fv(g),H=new Vv(g),J=new J0(k),ft=new Ov(k,J),ee=new Gv(k,J,gt,ft),$=new qv(k,ee,J,gt),Oe=new jv(k,qe,I),ie=new Uv(Re),Ee=new cM(g,A,H,je,qe,ft,ie),ue=new DM(g,Re),me=new hM,$e=new _M(je),Le=new Nv(g,A,H,Ie,$,d,c),_e=new SM(g,$,qe),z=new zM(k,gt,qe,Ie),ve=new Dv(k,je,gt),Ye=new Wv(k,je,gt),gt.programs=Ee.programs,g.capabilities=qe,g.extensions=je,g.properties=Re,g.renderLists=me,g.shadowMap=_e,g.state=Ie,g.info=gt}le();const Y=new NM(g,k);this.xr=Y,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=je.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=je.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(R,j,!1))},this.getSize=function(T){return T.set(R,j)},this.setSize=function(T,U,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=T,j=U,t.width=Math.floor(T*B),t.height=Math.floor(U*B),W===!0&&(t.style.width=T+"px",t.style.height=U+"px"),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(R*B,j*B).floor()},this.setDrawingBufferSize=function(T,U,W){R=T,j=U,B=W,t.width=Math.floor(T*W),t.height=Math.floor(U*W),this.setViewport(0,0,T,U)},this.getCurrentViewport=function(T){return T.copy(N)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,U,W,X){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,U,W,X),Ie.viewport(N.copy(ce).multiplyScalar(B).round())},this.getScissor=function(T){return T.copy(xe)},this.setScissor=function(T,U,W,X){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,U,W,X),Ie.scissor(V.copy(xe).multiplyScalar(B).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(T){Ie.setScissorTest(pe=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){Z=T},this.getClearColor=function(T){return T.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(T=!0,U=!0,W=!0){let X=0;if(T){let F=!1;if(C!==null){const re=C.texture.format;F=re===sl||re===rl||re===il}if(F){const re=C.texture.type,fe=re===ii||re===ji||re===Ss||re===Lr||re===el||re===tl,ye=Le.getClearColor(),Se=Le.getClearAlpha(),De=ye.r,Fe=ye.g,Ae=ye.b;fe?(_[0]=De,_[1]=Fe,_[2]=Ae,_[3]=Se,k.clearBufferuiv(k.COLOR,0,_)):(v[0]=De,v[1]=Fe,v[2]=Ae,v[3]=Se,k.clearBufferiv(k.COLOR,0,v))}else X|=k.COLOR_BUFFER_BIT}U&&(X|=k.DEPTH_BUFFER_BIT),W&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",de,!1),t.removeEventListener("webglcontextcreationerror",he,!1),me.dispose(),$e.dispose(),Re.dispose(),A.dispose(),H.dispose(),$.dispose(),ft.dispose(),z.dispose(),Ee.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Rl),Y.removeEventListener("sessionend",Cl),wi.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const T=gt.autoReset,U=_e.enabled,W=_e.autoUpdate,X=_e.needsUpdate,F=_e.type;le(),gt.autoReset=T,_e.enabled=U,_e.autoUpdate=W,_e.needsUpdate=X,_e.type=F}function he(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ue(T){const U=T.target;U.removeEventListener("dispose",Ue),yt(U)}function yt(T){Ft(T),Re.remove(T)}function Ft(T){const U=Re.get(T).programs;U!==void 0&&(U.forEach(function(W){Ee.releaseProgram(W)}),T.isShaderMaterial&&Ee.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,W,X,F,re){U===null&&(U=Mt);const fe=F.isMesh&&F.matrixWorld.determinant()<0,ye=Ld(T,U,W,X,F);Ie.setMaterial(X,fe);let Se=W.index,De=1;if(X.wireframe===!0){if(Se=ee.getWireframeAttribute(W),Se===void 0)return;De=2}const Fe=W.drawRange,Ae=W.attributes.position;let Qe=Fe.start*De,dt=(Fe.start+Fe.count)*De;re!==null&&(Qe=Math.max(Qe,re.start*De),dt=Math.min(dt,(re.start+re.count)*De)),Se!==null?(Qe=Math.max(Qe,0),dt=Math.min(dt,Se.count)):Ae!=null&&(Qe=Math.max(Qe,0),dt=Math.min(dt,Ae.count));const _t=dt-Qe;if(_t<0||_t===1/0)return;ft.setup(F,X,ye,W,Se);let Zt,it=ve;if(Se!==null&&(Zt=J.get(Se),it=Ye,it.setIndex(Zt)),F.isMesh)X.wireframe===!0?(Ie.setLineWidth(X.wireframeLinewidth*bt()),it.setMode(k.LINES)):it.setMode(k.TRIANGLES);else if(F.isLine){let Te=X.linewidth;Te===void 0&&(Te=1),Ie.setLineWidth(Te*bt()),F.isLineSegments?it.setMode(k.LINES):F.isLineLoop?it.setMode(k.LINE_LOOP):it.setMode(k.LINE_STRIP)}else F.isPoints?it.setMode(k.POINTS):F.isSprite&&it.setMode(k.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)it.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(je.get("WEBGL_multi_draw"))it.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Te=F._multiDrawStarts,Vn=F._multiDrawCounts,rt=F._multiDrawCount,xn=Se?J.get(Se).bytesPerElement:1,Ki=Re.get(X).currentProgram.getUniforms();for(let en=0;en<rt;en++)Ki.setValue(k,"_gl_DrawID",en),it.render(Te[en]/xn,Vn[en])}else if(F.isInstancedMesh)it.renderInstances(Qe,_t,F.count);else if(W.isInstancedBufferGeometry){const Te=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Vn=Math.min(W.instanceCount,Te);it.renderInstances(Qe,_t,Vn)}else it.render(Qe,_t)};function ot(T,U,W){T.transparent===!0&&T.side===pn&&T.forceSinglePass===!1?(T.side=Qt,T.needsUpdate=!0,Ls(T,U,W),T.side=ni,T.needsUpdate=!0,Ls(T,U,W),T.side=pn):Ls(T,U,W)}this.compile=function(T,U,W=null){W===null&&(W=T),p=$e.get(W),p.init(U),M.push(p),W.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==W&&T.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const X=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const re=F.material;if(re)if(Array.isArray(re))for(let fe=0;fe<re.length;fe++){const ye=re[fe];ot(ye,W,F),X.add(ye)}else ot(re,W,F),X.add(re)}),M.pop(),p=null,X},this.compileAsync=function(T,U,W=null){const X=this.compile(T,U,W);return new Promise(F=>{function re(){if(X.forEach(function(fe){Re.get(fe).currentProgram.isReady()&&X.delete(fe)}),X.size===0){F(T);return}setTimeout(re,10)}je.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let vn=null;function kn(T){vn&&vn(T)}function Rl(){wi.stop()}function Cl(){wi.start()}const wi=new jf;wi.setAnimationLoop(kn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(T){vn=T,Y.setAnimationLoop(T),T===null?wi.stop():wi.start()},Y.addEventListener("sessionstart",Rl),Y.addEventListener("sessionend",Cl),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(U),U=Y.getCamera()),T.isScene===!0&&T.onBeforeRender(g,T,U,C),p=$e.get(T,M.length),p.init(U),M.push(p),we.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(we),Me=this.localClippingEnabled,ne=ie.init(this.clippingPlanes,Me),m=me.get(T,x.length),m.init(),x.push(m),Y.enabled===!0&&Y.isPresenting===!0){const re=g.xr.getDepthSensingMesh();re!==null&&Qo(re,U,-1/0,g.sortObjects)}Qo(T,U,0,g.sortObjects),m.finish(),g.sortObjects===!0&&m.sort(K,Z),Ke=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Ke&&Le.addToRenderList(m,T),this.info.render.frame++,ne===!0&&ie.beginShadows();const W=p.state.shadowsArray;_e.render(W,T,U),ne===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){const re=U.cameras;if(F.length>0)for(let fe=0,ye=re.length;fe<ye;fe++){const Se=re[fe];Pl(X,F,T,Se)}Ke&&Le.render(T);for(let fe=0,ye=re.length;fe<ye;fe++){const Se=re[fe];Il(m,T,Se,Se.viewport)}}else F.length>0&&Pl(X,F,T,U),Ke&&Le.render(T),Il(m,T,U);C!==null&&(I.updateMultisampleRenderTarget(C),I.updateRenderTargetMipmap(C)),T.isScene===!0&&T.onAfterRender(g,T,U),ft.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],ne===!0&&ie.setGlobalState(g.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Qo(T,U,W,X){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||q.intersectsSprite(T)){X&&Ge.setFromMatrixPosition(T.matrixWorld).applyMatrix4(we);const fe=$.update(T),ye=T.material;ye.visible&&m.push(T,fe,ye,W,Ge.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||q.intersectsObject(T))){const fe=$.update(T),ye=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ge.copy(T.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),Ge.copy(fe.boundingSphere.center)),Ge.applyMatrix4(T.matrixWorld).applyMatrix4(we)),Array.isArray(ye)){const Se=fe.groups;for(let De=0,Fe=Se.length;De<Fe;De++){const Ae=Se[De],Qe=ye[Ae.materialIndex];Qe&&Qe.visible&&m.push(T,fe,Qe,W,Ge.z,Ae)}}else ye.visible&&m.push(T,fe,ye,W,Ge.z,null)}}const re=T.children;for(let fe=0,ye=re.length;fe<ye;fe++)Qo(re[fe],U,W,X)}function Il(T,U,W,X){const F=T.opaque,re=T.transmissive,fe=T.transparent;p.setupLightsView(W),ne===!0&&ie.setGlobalState(g.clippingPlanes,W),X&&Ie.viewport(N.copy(X)),F.length>0&&Ps(F,U,W),re.length>0&&Ps(re,U,W),fe.length>0&&Ps(fe,U,W),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Pl(T,U,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new qi(1,1,{generateMipmaps:!0,type:je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float")?ws:ii,minFilter:Jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xe.workingColorSpace}));const re=p.state.transmissionRenderTarget[X.id],fe=X.viewport||N;re.setSize(fe.z,fe.w);const ye=g.getRenderTarget();g.setRenderTarget(re),g.getClearColor(D),G=g.getClearAlpha(),G<1&&g.setClearColor(16777215,.5),g.clear(),Ke&&Le.render(W);const Se=g.toneMapping;g.toneMapping=yi;const De=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),ne===!0&&ie.setGlobalState(g.clippingPlanes,X),Ps(T,W,X),I.updateMultisampleRenderTarget(re),I.updateRenderTargetMipmap(re),je.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let Ae=0,Qe=U.length;Ae<Qe;Ae++){const dt=U[Ae],_t=dt.object,Zt=dt.geometry,it=dt.material,Te=dt.group;if(it.side===pn&&_t.layers.test(X.layers)){const Vn=it.side;it.side=Qt,it.needsUpdate=!0,Ll(_t,W,X,Zt,it,Te),it.side=Vn,it.needsUpdate=!0,Fe=!0}}Fe===!0&&(I.updateMultisampleRenderTarget(re),I.updateRenderTargetMipmap(re))}g.setRenderTarget(ye),g.setClearColor(D,G),De!==void 0&&(X.viewport=De),g.toneMapping=Se}function Ps(T,U,W){const X=U.isScene===!0?U.overrideMaterial:null;for(let F=0,re=T.length;F<re;F++){const fe=T[F],ye=fe.object,Se=fe.geometry,De=X===null?fe.material:X,Fe=fe.group;ye.layers.test(W.layers)&&Ll(ye,U,W,Se,De,Fe)}}function Ll(T,U,W,X,F,re){T.onBeforeRender(g,U,W,X,F,re),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(g,U,W,X,T,re),F.transparent===!0&&F.side===pn&&F.forceSinglePass===!1?(F.side=Qt,F.needsUpdate=!0,g.renderBufferDirect(W,U,X,F,T,re),F.side=ni,F.needsUpdate=!0,g.renderBufferDirect(W,U,X,F,T,re),F.side=pn):g.renderBufferDirect(W,U,X,F,T,re),T.onAfterRender(g,U,W,X,F,re)}function Ls(T,U,W){U.isScene!==!0&&(U=Mt);const X=Re.get(T),F=p.state.lights,re=p.state.shadowsArray,fe=F.state.version,ye=Ee.getParameters(T,F.state,re,U,W),Se=Ee.getProgramCacheKey(ye);let De=X.programs;X.environment=T.isMeshStandardMaterial?U.environment:null,X.fog=U.fog,X.envMap=(T.isMeshStandardMaterial?H:A).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Ue),De=new Map,X.programs=De);let Fe=De.get(Se);if(Fe!==void 0){if(X.currentProgram===Fe&&X.lightsStateVersion===fe)return Ol(T,ye),Fe}else ye.uniforms=Ee.getUniforms(T),T.onBeforeCompile(ye,g),Fe=Ee.acquireProgram(ye,Se),De.set(Se,Fe),X.uniforms=ye.uniforms;const Ae=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ae.clippingPlanes=ie.uniform),Ol(T,ye),X.needsLights=Od(T),X.lightsStateVersion=fe,X.needsLights&&(Ae.ambientLightColor.value=F.state.ambient,Ae.lightProbe.value=F.state.probe,Ae.directionalLights.value=F.state.directional,Ae.directionalLightShadows.value=F.state.directionalShadow,Ae.spotLights.value=F.state.spot,Ae.spotLightShadows.value=F.state.spotShadow,Ae.rectAreaLights.value=F.state.rectArea,Ae.ltc_1.value=F.state.rectAreaLTC1,Ae.ltc_2.value=F.state.rectAreaLTC2,Ae.pointLights.value=F.state.point,Ae.pointLightShadows.value=F.state.pointShadow,Ae.hemisphereLights.value=F.state.hemi,Ae.directionalShadowMap.value=F.state.directionalShadowMap,Ae.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ae.spotShadowMap.value=F.state.spotShadowMap,Ae.spotLightMatrix.value=F.state.spotLightMatrix,Ae.spotLightMap.value=F.state.spotLightMap,Ae.pointShadowMap.value=F.state.pointShadowMap,Ae.pointShadowMatrix.value=F.state.pointShadowMatrix),X.currentProgram=Fe,X.uniformsList=null,Fe}function Nl(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=So.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function Ol(T,U){const W=Re.get(T);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function Ld(T,U,W,X,F){U.isScene!==!0&&(U=Mt),I.resetTextureUnits();const re=U.fog,fe=X.isMeshStandardMaterial?U.environment:null,ye=C===null?g.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:$t,Se=(X.isMeshStandardMaterial?H:A).get(X.envMap||fe),De=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Fe=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ae=!!W.morphAttributes.position,Qe=!!W.morphAttributes.normal,dt=!!W.morphAttributes.color;let _t=yi;X.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(_t=g.toneMapping);const Zt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,it=Zt!==void 0?Zt.length:0,Te=Re.get(X),Vn=p.state.lights;if(ne===!0&&(Me===!0||T!==y)){const an=T===y&&X.id===S;ie.setState(X,T,an)}let rt=!1;X.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Vn.state.version||Te.outputColorSpace!==ye||F.isBatchedMesh&&Te.batching===!1||!F.isBatchedMesh&&Te.batching===!0||F.isBatchedMesh&&Te.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Te.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Te.instancing===!1||!F.isInstancedMesh&&Te.instancing===!0||F.isSkinnedMesh&&Te.skinning===!1||!F.isSkinnedMesh&&Te.skinning===!0||F.isInstancedMesh&&Te.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Te.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Te.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Te.instancingMorph===!1&&F.morphTexture!==null||Te.envMap!==Se||X.fog===!0&&Te.fog!==re||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ie.numPlanes||Te.numIntersection!==ie.numIntersection)||Te.vertexAlphas!==De||Te.vertexTangents!==Fe||Te.morphTargets!==Ae||Te.morphNormals!==Qe||Te.morphColors!==dt||Te.toneMapping!==_t||Te.morphTargetsCount!==it)&&(rt=!0):(rt=!0,Te.__version=X.version);let xn=Te.currentProgram;rt===!0&&(xn=Ls(X,U,F));let Ki=!1,en=!1,Gr=!1;const vt=xn.getUniforms(),In=Te.uniforms;if(Ie.useProgram(xn.program)&&(Ki=!0,en=!0,Gr=!0),X.id!==S&&(S=X.id,en=!0),Ki||y!==T){Ie.buffers.depth.getReversed()?(ae.copy(T.projectionMatrix),w0(ae),R0(ae),vt.setValue(k,"projectionMatrix",ae)):vt.setValue(k,"projectionMatrix",T.projectionMatrix),vt.setValue(k,"viewMatrix",T.matrixWorldInverse);const si=vt.map.cameraPosition;si!==void 0&&si.setValue(k,Ne.setFromMatrixPosition(T.matrixWorld)),qe.logarithmicDepthBuffer&&vt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&vt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,en=!0,Gr=!0)}if(F.isSkinnedMesh){vt.setOptional(k,F,"bindMatrix"),vt.setOptional(k,F,"bindMatrixInverse");const an=F.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),vt.setValue(k,"boneTexture",an.boneTexture,I))}F.isBatchedMesh&&(vt.setOptional(k,F,"batchingTexture"),vt.setValue(k,"batchingTexture",F._matricesTexture,I),vt.setOptional(k,F,"batchingIdTexture"),vt.setValue(k,"batchingIdTexture",F._indirectTexture,I),vt.setOptional(k,F,"batchingColorTexture"),F._colorsTexture!==null&&vt.setValue(k,"batchingColorTexture",F._colorsTexture,I));const Wr=W.morphAttributes;if((Wr.position!==void 0||Wr.normal!==void 0||Wr.color!==void 0)&&Oe.update(F,W,xn),(en||Te.receiveShadow!==F.receiveShadow)&&(Te.receiveShadow=F.receiveShadow,vt.setValue(k,"receiveShadow",F.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(In.envMap.value=Se,In.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&U.environment!==null&&(In.envMapIntensity.value=U.environmentIntensity),en&&(vt.setValue(k,"toneMappingExposure",g.toneMappingExposure),Te.needsLights&&Nd(In,Gr),re&&X.fog===!0&&ue.refreshFogUniforms(In,re),ue.refreshMaterialUniforms(In,X,B,j,p.state.transmissionRenderTarget[T.id]),So.upload(k,Nl(Te),In,I)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(So.upload(k,Nl(Te),In,I),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&vt.setValue(k,"center",F.center),vt.setValue(k,"modelViewMatrix",F.modelViewMatrix),vt.setValue(k,"normalMatrix",F.normalMatrix),vt.setValue(k,"modelMatrix",F.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const an=X.uniformsGroups;for(let si=0,oi=an.length;si<oi;si++){const Dl=an[si];z.update(Dl,xn),z.bind(Dl,xn)}}return xn}function Nd(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function Od(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(T,U,W){Re.get(T.texture).__webglTexture=U,Re.get(T.depthTexture).__webglTexture=W;const X=Re.get(T);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,U){const W=Re.get(T);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(T,U=0,W=0){C=T,b=U,w=W;let X=!0,F=null,re=!1,fe=!1;if(T){const Se=Re.get(T);if(Se.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(k.FRAMEBUFFER,null),X=!1;else if(Se.__webglFramebuffer===void 0)I.setupRenderTarget(T);else if(Se.__hasExternalTextures)I.rebindTextures(T,Re.get(T.texture).__webglTexture,Re.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ae=T.depthTexture;if(Se.__boundDepthTexture!==Ae){if(Ae!==null&&Re.has(Ae)&&(T.width!==Ae.image.width||T.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(T)}}const De=T.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(fe=!0);const Fe=Re.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Fe[U])?F=Fe[U][W]:F=Fe[U],re=!0):T.samples>0&&I.useMultisampledRTT(T)===!1?F=Re.get(T).__webglMultisampledFramebuffer:Array.isArray(Fe)?F=Fe[W]:F=Fe,N.copy(T.viewport),V.copy(T.scissor),P=T.scissorTest}else N.copy(ce).multiplyScalar(B).floor(),V.copy(xe).multiplyScalar(B).floor(),P=pe;if(Ie.bindFramebuffer(k.FRAMEBUFFER,F)&&X&&Ie.drawBuffers(T,F),Ie.viewport(N),Ie.scissor(V),Ie.setScissorTest(P),re){const Se=Re.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+U,Se.__webglTexture,W)}else if(fe){const Se=Re.get(T.texture),De=U||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Se.__webglTexture,W||0,De)}S=-1},this.readRenderTargetPixels=function(T,U,W,X,F,re,fe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&fe!==void 0&&(ye=ye[fe]),ye){Ie.bindFramebuffer(k.FRAMEBUFFER,ye);try{const Se=T.texture,De=Se.format,Fe=Se.type;if(!qe.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-X&&W>=0&&W<=T.height-F&&k.readPixels(U,W,X,F,Ve.convert(De),Ve.convert(Fe),re)}finally{const Se=C!==null?Re.get(C).__webglFramebuffer:null;Ie.bindFramebuffer(k.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(T,U,W,X,F,re,fe){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=Re.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&fe!==void 0&&(ye=ye[fe]),ye){const Se=T.texture,De=Se.format,Fe=Se.type;if(!qe.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=T.width-X&&W>=0&&W<=T.height-F){Ie.bindFramebuffer(k.FRAMEBUFFER,ye);const Ae=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ae),k.bufferData(k.PIXEL_PACK_BUFFER,re.byteLength,k.STREAM_READ),k.readPixels(U,W,X,F,Ve.convert(De),Ve.convert(Fe),0);const Qe=C!==null?Re.get(C).__webglFramebuffer:null;Ie.bindFramebuffer(k.FRAMEBUFFER,Qe);const dt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await T0(k,dt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ae),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,re),k.deleteBuffer(Ae),k.deleteSync(dt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,U=null,W=0){T.isTexture!==!0&&(as("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,T=arguments[1]);const X=Math.pow(2,-W),F=Math.floor(T.image.width*X),re=Math.floor(T.image.height*X),fe=U!==null?U.x:0,ye=U!==null?U.y:0;I.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,W,0,0,fe,ye,F,re),Ie.unbindTexture()},this.copyTextureToTexture=function(T,U,W=null,X=null,F=0){T.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,T=arguments[1],U=arguments[2],F=arguments[3]||0,W=null);let re,fe,ye,Se,De,Fe,Ae,Qe,dt;const _t=T.isCompressedTexture?T.mipmaps[F]:T.image;W!==null?(re=W.max.x-W.min.x,fe=W.max.y-W.min.y,ye=W.isBox3?W.max.z-W.min.z:1,Se=W.min.x,De=W.min.y,Fe=W.isBox3?W.min.z:0):(re=_t.width,fe=_t.height,ye=_t.depth||1,Se=0,De=0,Fe=0),X!==null?(Ae=X.x,Qe=X.y,dt=X.z):(Ae=0,Qe=0,dt=0);const Zt=Ve.convert(U.format),it=Ve.convert(U.type);let Te;U.isData3DTexture?(I.setTexture3D(U,0),Te=k.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(I.setTexture2DArray(U,0),Te=k.TEXTURE_2D_ARRAY):(I.setTexture2D(U,0),Te=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,U.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,U.unpackAlignment);const Vn=k.getParameter(k.UNPACK_ROW_LENGTH),rt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),xn=k.getParameter(k.UNPACK_SKIP_PIXELS),Ki=k.getParameter(k.UNPACK_SKIP_ROWS),en=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,_t.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,_t.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Se),k.pixelStorei(k.UNPACK_SKIP_ROWS,De),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Fe);const Gr=T.isDataArrayTexture||T.isData3DTexture,vt=U.isDataArrayTexture||U.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const In=Re.get(T),Wr=Re.get(U),an=Re.get(In.__renderTarget),si=Re.get(Wr.__renderTarget);Ie.bindFramebuffer(k.READ_FRAMEBUFFER,an.__webglFramebuffer),Ie.bindFramebuffer(k.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let oi=0;oi<ye;oi++)Gr&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Re.get(T).__webglTexture,F,Fe+oi),T.isDepthTexture?(vt&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Re.get(U).__webglTexture,F,dt+oi),k.blitFramebuffer(Se,De,re,fe,Ae,Qe,re,fe,k.DEPTH_BUFFER_BIT,k.NEAREST)):vt?k.copyTexSubImage3D(Te,F,Ae,Qe,dt+oi,Se,De,re,fe):k.copyTexSubImage2D(Te,F,Ae,Qe,dt+oi,Se,De,re,fe);Ie.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else vt?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Te,F,Ae,Qe,dt,re,fe,ye,Zt,it,_t.data):U.isCompressedArrayTexture?k.compressedTexSubImage3D(Te,F,Ae,Qe,dt,re,fe,ye,Zt,_t.data):k.texSubImage3D(Te,F,Ae,Qe,dt,re,fe,ye,Zt,it,_t):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,F,Ae,Qe,re,fe,Zt,it,_t.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,F,Ae,Qe,_t.width,_t.height,Zt,_t.data):k.texSubImage2D(k.TEXTURE_2D,F,Ae,Qe,re,fe,Zt,it,_t);k.pixelStorei(k.UNPACK_ROW_LENGTH,Vn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,rt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,xn),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ki),k.pixelStorei(k.UNPACK_SKIP_IMAGES,en),F===0&&U.generateMipmaps&&k.generateMipmap(Te),Ie.unbindTexture()},this.copyTextureToTexture3D=function(T,U,W=null,X=null,F=0){return T.isTexture!==!0&&(as("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,T=arguments[2],U=arguments[3],F=arguments[4]||0),as('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,U,W,X,F)},this.initRenderTarget=function(T){Re.get(T).__webglFramebuffer===void 0&&I.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?I.setTextureCube(T,0):T.isData3DTexture?I.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?I.setTexture2DArray(T,0):I.setTexture2D(T,0),Ie.unbindTexture()},this.resetState=function(){b=0,w=0,C=null,Ie.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Xe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xe._getUnpackColorSpace()}}class dl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new dl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jf extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Qf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Oc,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new L;class Ts{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),r=at(r,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ts(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Rs extends _n{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let fr;const Kr=new L,dr=new L,pr=new L,mr=new se,$r=new se,ed=new ze,to=new L,Zr=new L,no=new L,qu=new se,Ia=new se,Yu=new se;class Go extends mt{constructor(e=new Rs){if(super(),this.isSprite=!0,this.type="Sprite",fr===void 0){fr=new zt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qf(t,5);fr.setIndex([0,1,2,0,2,3]),fr.setAttribute("position",new Ts(n,3,0,!1)),fr.setAttribute("uv",new Ts(n,2,3,!1))}this.geometry=fr,this.material=e,this.center=new se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),dr.setFromMatrixScale(this.matrixWorld),ed.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),pr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&dr.multiplyScalar(-pr.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;io(to.set(-.5,-.5,0),pr,o,dr,r,s),io(Zr.set(.5,-.5,0),pr,o,dr,r,s),io(no.set(.5,.5,0),pr,o,dr,r,s),qu.set(0,0),Ia.set(1,0),Yu.set(1,1);let a=e.ray.intersectTriangle(to,Zr,no,!1,Kr);if(a===null&&(io(Zr.set(-.5,.5,0),pr,o,dr,r,s),Ia.set(0,1),a=e.ray.intersectTriangle(to,no,Zr,!1,Kr),a===null))return;const c=e.ray.origin.distanceTo(Kr);c<e.near||c>e.far||t.push({distance:c,point:Kr.clone(),uv:mn.getInterpolation(Kr,to,Zr,no,qu,Ia,Yu,new se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function io(i,e,t,n,r,s){mr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?($r.x=s*mr.x-r*mr.y,$r.y=r*mr.x+s*mr.y):$r.copy(mr),i.copy(e),i.x+=$r.x,i.y+=$r.y,i.applyMatrix4(ed)}const Ku=new L,$u=new nt,Zu=new nt,FM=new L,Ju=new ze,ro=new L,Pa=new zn,Qu=new ze,La=new Vo;class BM extends Pe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jl,this.bindMatrix=new ze,this.bindMatrixInverse=new ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ri),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingBox.expandByPoint(ro)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new zn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ro),this.boundingSphere.expandByPoint(ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pa.copy(this.boundingSphere),Pa.applyMatrix4(r),e.ray.intersectsSphere(Pa)!==!1&&(Qu.copy(r).invert(),La.copy(e.ray).applyMatrix4(Qu),!(this.boundingBox!==null&&La.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,La)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ym?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;$u.fromBufferAttribute(r.attributes.skinIndex,e),Zu.fromBufferAttribute(r.attributes.skinWeight,e),Ku.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Zu.getComponent(s);if(o!==0){const a=$u.getComponent(s);Ju.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(FM.copy(Ku).applyMatrix4(Ju),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class td extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class nd extends Pt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=pt,u=pt,h,f){super(null,o,a,c,l,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const eh=new ze,kM=new ze;class pl{constructor(e=[],t=[]){this.uuid=wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:kM;eh.multiplyMatrices(a,t[s]),eh.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new pl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new nd(t,e,e,gn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new td),this.bones.push(o),this.boneInverses.push(new ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class Uc extends Kt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gr=new ze,th=new ze,so=[],nh=new ri,VM=new ze,Jr=new Pe,Qr=new zn;class HM extends Pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Uc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,VM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ri),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gr),nh.copy(e.boundingBox).applyMatrix4(gr),this.boundingBox.union(nh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gr),Qr.copy(e.boundingSphere).applyMatrix4(gr),this.boundingSphere.union(Qr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Jr.geometry=this.geometry,Jr.material=this.material,Jr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qr.copy(this.boundingSphere),Qr.applyMatrix4(n),e.ray.intersectsSphere(Qr)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,gr),th.multiplyMatrices(n,gr),Jr.matrixWorld=th,Jr.raycast(e,so);for(let o=0,a=so.length;o<a;o++){const c=so[o];c.instanceId=s,c.object=this,t.push(c)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Uc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new nd(new Float32Array(r*this.count),r,this.count,nl,En));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ml extends _n{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zo=new L,Uo=new L,ih=new ze,es=new Vo,oo=new zn,Na=new L,rh=new L;class Wo extends mt{constructor(e=new zt,t=new ml){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)zo.fromBufferAttribute(t,r-1),Uo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=zo.distanceTo(Uo);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oo.copy(n.boundingSphere),oo.applyMatrix4(r),oo.radius+=s,e.ray.intersectsSphere(oo)===!1)return;ih.copy(r).invert(),es.copy(e.ray).applyMatrix4(ih);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let v=d,m=_-1;v<m;v+=l){const p=u.getX(v),x=u.getX(v+1),M=ao(this,e,es,c,p,x);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(_-1),m=u.getX(d),p=ao(this,e,es,c,v,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let v=d,m=_-1;v<m;v+=l){const p=ao(this,e,es,c,v,v+1);p&&t.push(p)}if(this.isLineLoop){const v=ao(this,e,es,c,_-1,d);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ao(i,e,t,n,r,s){const o=i.geometry.attributes.position;if(zo.fromBufferAttribute(o,r),Uo.fromBufferAttribute(o,s),t.distanceSqToSegment(zo,Uo,Na,rh)>n)return;Na.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Na);if(!(c<e.near||c>e.far))return{distance:c,point:rh.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const sh=new L,oh=new L;class GM extends Wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)sh.fromBufferAttribute(t,r),oh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+sh.distanceTo(oh);e.setAttribute("lineDistance",new ht(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class WM extends Wo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class id extends _n{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ah=new ze,Fc=new Vo,co=new zn,lo=new L;class XM extends mt{constructor(e=new zt,t=new id){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),co.copy(n.boundingSphere),co.applyMatrix4(r),co.radius+=s,e.ray.intersectsSphere(co)===!1)return;ah.copy(r).invert(),Fc.copy(e.ray).applyMatrix4(ah);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let _=f,v=d;_<v;_++){const m=l.getX(_);lo.fromBufferAttribute(h,m),ch(lo,m,c,r,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let _=f,v=d;_<v;_++)lo.fromBufferAttribute(h,_),ch(lo,_,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ch(i,e,t,n,r,s,o){const a=Fc.distanceSqToPoint(i);if(a<t){const c=new L;Fc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Xo extends Pt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],f=n[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new se:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,r=[],s=[],o=[],a=new L,c=new ze;for(let d=0;d<=e;d++){const _=d/e;r[d]=this.getTangentAt(_,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(It(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,_))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(It(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let _=1;_<=e;_++)s[_].applyMatrix4(c.makeRotationAxis(r[_],d*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class gl extends Un{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new se){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class jM extends gl{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _l(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const uo=new L,Oa=new _l,Da=new _l,za=new _l;class qM extends Un{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new L){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(uo.subVectors(r[0],r[1]).add(r[0]),l=uo);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(uo.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=uo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),Oa.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,_,v,m),Da.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,_,v,m),za.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,_,v,m)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Da.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),za.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(Oa.calc(c),Da.calc(c),za.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lh(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function YM(i,e){const t=1-i;return t*t*e}function KM(i,e){return 2*(1-i)*i*e}function $M(i,e){return i*i*e}function hs(i,e,t,n){return YM(i,e)+KM(i,t)+$M(i,n)}function ZM(i,e){const t=1-i;return t*t*t*e}function JM(i,e){const t=1-i;return 3*t*t*i*e}function QM(i,e){return 3*(1-i)*i*i*e}function ey(i,e){return i*i*i*e}function fs(i,e,t,n,r){return ZM(i,e)+JM(i,t)+QM(i,n)+ey(i,r)}class rd extends Un{constructor(e=new se,t=new se,n=new se,r=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new se){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(fs(e,r.x,s.x,o.x,a.x),fs(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ty extends Un{constructor(e=new L,t=new L,n=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(fs(e,r.x,s.x,o.x,a.x),fs(e,r.y,s.y,o.y,a.y),fs(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class sd extends Un{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ny extends Un{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class od extends Un{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(hs(e,r.x,s.x,o.x),hs(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iy extends Un{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(hs(e,r.x,s.x,o.x),hs(e,r.y,s.y,o.y),hs(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ad extends Un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(lh(a,c.x,l.x,u.x,h.x),lh(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new se().fromArray(r))}return this}}var uh=Object.freeze({__proto__:null,ArcCurve:jM,CatmullRomCurve3:qM,CubicBezierCurve:rd,CubicBezierCurve3:ty,EllipseCurve:gl,LineCurve:sd,LineCurve3:ny,QuadraticBezierCurve:od,QuadraticBezierCurve3:iy,SplineCurve:ad});class ry extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uh[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new uh[r.type]().fromJSON(r))}return this}}class sy extends ry{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new sd(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new od(this.currentPoint.clone(),new se(e,t),new se(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new rd(this.currentPoint.clone(),new se(e,t),new se(n,r),new se(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ad(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new gl(e,t,n,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class jo extends zt{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=It(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/t,h=new L,f=new se,d=new L,_=new L,v=new L;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(v.x,v.y,v.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),c.push(d.x,d.y,d.z),v.copy(_)}for(let x=0;x<=t;x++){const M=n+x*u*r,g=Math.sin(M),E=Math.cos(M);for(let b=0;b<=e.length-1;b++){h.x=e[b].x*g,h.y=e[b].y,h.z=e[b].x*E,o.push(h.x,h.y,h.z),f.x=x/t,f.y=b/(e.length-1),a.push(f.x,f.y);const w=c[3*b+0]*g,C=c[3*b+1],S=c[3*b+0]*E;l.push(w,C,S)}}for(let x=0;x<t;x++)for(let M=0;M<e.length-1;M++){const g=M+x*e.length,E=g,b=g+e.length,w=g+e.length+1,C=g+1;s.push(E,b,C),s.push(w,C,b)}this.setIndex(s),this.setAttribute("position",new ht(o,3)),this.setAttribute("uv",new ht(a,2)),this.setAttribute("normal",new ht(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.points,e.segments,e.phiStart,e.phiLength)}}class vl extends jo{constructor(e=1,t=1,n=4,r=8){const s=new sy;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new vl(e.radius,e.length,e.capSegments,e.radialSegments)}}class qo extends zt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new L,u=new se;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=n+h/t*r;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,c.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new ht(o,3)),this.setAttribute("normal",new ht(a,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Nn extends zt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let _=0;const v=[],m=n/2;let p=0;x(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ht(h,3)),this.setAttribute("normal",new ht(f,3)),this.setAttribute("uv",new ht(d,2));function x(){const g=new L,E=new L;let b=0;const w=(t-e)/n;for(let C=0;C<=s;C++){const S=[],y=C/s,N=y*(t-e)+e;for(let V=0;V<=r;V++){const P=V/r,D=P*c+a,G=Math.sin(D),R=Math.cos(D);E.x=N*G,E.y=-y*n+m,E.z=N*R,h.push(E.x,E.y,E.z),g.set(G,w,R).normalize(),f.push(g.x,g.y,g.z),d.push(P,1-y),S.push(_++)}v.push(S)}for(let C=0;C<r;C++)for(let S=0;S<s;S++){const y=v[S][C],N=v[S+1][C],V=v[S+1][C+1],P=v[S][C+1];(e>0||S!==0)&&(u.push(y,N,P),b+=3),(t>0||S!==s-1)&&(u.push(N,V,P),b+=3)}l.addGroup(p,b,0),p+=b}function M(g){const E=_,b=new se,w=new L;let C=0;const S=g===!0?e:t,y=g===!0?1:-1;for(let V=1;V<=r;V++)h.push(0,m*y,0),f.push(0,y,0),d.push(.5,.5),_++;const N=_;for(let V=0;V<=r;V++){const D=V/r*c+a,G=Math.cos(D),R=Math.sin(D);w.x=S*R,w.y=m*y,w.z=S*G,h.push(w.x,w.y,w.z),f.push(0,y,0),b.x=G*.5+.5,b.y=R*.5*y+.5,d.push(b.x,b.y),_++}for(let V=0;V<r;V++){const P=E+V,D=N+V;g===!0?u.push(D,D+1,P):u.push(D+1,D,P),C+=3}l.addGroup(p,C,g===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xl extends zt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),u(),this.setAttribute("position",new ht(s,3)),this.setAttribute("normal",new ht(s.slice(),3)),this.setAttribute("uv",new ht(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new L,g=new L,E=new L;for(let b=0;b<t.length;b+=3)d(t[b+0],M),d(t[b+1],g),d(t[b+2],E),c(M,g,E,x)}function c(x,M,g,E){const b=E+1,w=[];for(let C=0;C<=b;C++){w[C]=[];const S=x.clone().lerp(g,C/b),y=M.clone().lerp(g,C/b),N=b-C;for(let V=0;V<=N;V++)V===0&&C===b?w[C][V]=S:w[C][V]=S.clone().lerp(y,V/N)}for(let C=0;C<b;C++)for(let S=0;S<2*(b-C)-1;S++){const y=Math.floor(S/2);S%2===0?(f(w[C][y+1]),f(w[C+1][y]),f(w[C][y])):(f(w[C][y+1]),f(w[C+1][y+1]),f(w[C+1][y]))}}function l(x){const M=new L;for(let g=0;g<s.length;g+=3)M.x=s[g+0],M.y=s[g+1],M.z=s[g+2],M.normalize().multiplyScalar(x),s[g+0]=M.x,s[g+1]=M.y,s[g+2]=M.z}function u(){const x=new L;for(let M=0;M<s.length;M+=3){x.x=s[M+0],x.y=s[M+1],x.z=s[M+2];const g=m(x)/2/Math.PI+.5,E=p(x)/Math.PI+.5;o.push(g,1-E)}_(),h()}function h(){for(let x=0;x<o.length;x+=6){const M=o[x+0],g=o[x+2],E=o[x+4],b=Math.max(M,g,E),w=Math.min(M,g,E);b>.9&&w<.1&&(M<.2&&(o[x+0]+=1),g<.2&&(o[x+2]+=1),E<.2&&(o[x+4]+=1))}}function f(x){s.push(x.x,x.y,x.z)}function d(x,M){const g=x*3;M.x=e[g+0],M.y=e[g+1],M.z=e[g+2]}function _(){const x=new L,M=new L,g=new L,E=new L,b=new se,w=new se,C=new se;for(let S=0,y=0;S<s.length;S+=9,y+=6){x.set(s[S+0],s[S+1],s[S+2]),M.set(s[S+3],s[S+4],s[S+5]),g.set(s[S+6],s[S+7],s[S+8]),b.set(o[y+0],o[y+1]),w.set(o[y+2],o[y+3]),C.set(o[y+4],o[y+5]),E.copy(x).add(M).add(g).divideScalar(3);const N=m(E);v(b,y+0,x,N),v(w,y+2,M,N),v(C,y+4,g,N)}}function v(x,M,g,E){E<0&&x.x===1&&(o[M]=x.x-1),g.x===0&&g.z===0&&(o[M]=E/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xl(e.vertices,e.indices,e.radius,e.details)}}class Yo extends xl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Yo(e.radius,e.detail)}}class Ko extends zt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,f=new L,d=[],_=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n;let g=0;p===0&&o===0?g=.5/t:p===n&&c===Math.PI&&(g=-.5/t);for(let E=0;E<=t;E++){const b=E/t;h.x=-e*Math.cos(r+b*s)*Math.sin(o+M*a),h.y=e*Math.cos(o+M*a),h.z=e*Math.sin(r+b*s)*Math.sin(o+M*a),_.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(b+g,1-M),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const M=u[p][x+1],g=u[p][x],E=u[p+1][x],b=u[p+1][x+1];(p!==0||o>0)&&d.push(M,g,b),(p!==n-1||c<Math.PI)&&d.push(g,E,b)}this.setIndex(d),this.setAttribute("position",new ht(_,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ko(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ml extends zt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new L,h=new L,f=new L;for(let d=0;d<=n;d++)for(let _=0;_<=r;_++){const v=_/r*s,m=d/n*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(_/r),l.push(d/n)}for(let d=1;d<=n;d++)for(let _=1;_<=r;_++){const v=(r+1)*d+_-1,m=(r+1)*(d-1)+_-1,p=(r+1)*(d-1)+_,x=(r+1)*d+_;o.push(v,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ml(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class yl extends _n{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fn extends yl{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return It(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ze extends _n{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cl,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function ho(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function oy(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ay(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function hh(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=i[a+c]}return r}function cd(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class Cs{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class cy extends Cs{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vr,endingEnd:vr}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case xr:s=e,a=2*t-n;break;case Oo:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case xr:o=e,c=2*n-t;break;case Oo:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,_=(n-t)/(r-t),v=_*_,m=v*_,p=-f*m+2*f*v-f*_,x=(1+f)*m+(-1.5-2*f)*v+(-.5+f)*_+1,M=(-1-d)*m+(1.5+d)*v+.5*_,g=d*m-d*v;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+x*o[l+E]+M*o[c+E]+g*o[h+E];return s}}class ld extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),h=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*h+o[c+f]*u;return s}}class ly extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class Bn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ho(t,this.TimeBufferType),this.values=ho(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ho(e.times,Array),values:ho(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ly(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ld(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new cy(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case As:t=this.InterpolantFactoryMethodDiscrete;break;case bs:t=this.InterpolantFactoryMethodLinear;break;case na:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return As;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return na}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&oy(r))for(let a=0,c=r.length;a!==c;++a){const l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===na,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let _=0;_!==n;++_){const v=t[h+_];if(v!==t[f+_]||v!==t[d+_]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}Bn.prototype.TimeBufferType=Float32Array;Bn.prototype.ValueBufferType=Float32Array;Bn.prototype.DefaultInterpolation=bs;class kr extends Bn{constructor(e,t,n){super(e,t,n)}}kr.prototype.ValueTypeName="bool";kr.prototype.ValueBufferType=Array;kr.prototype.DefaultInterpolation=As;kr.prototype.InterpolantFactoryMethodLinear=void 0;kr.prototype.InterpolantFactoryMethodSmooth=void 0;class ud extends Bn{}ud.prototype.ValueTypeName="color";class zr extends Bn{}zr.prototype.ValueTypeName="number";class uy extends Cs{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t);let l=e*a;for(let u=l+a;l!==u;l+=4)Rn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class Ur extends Bn{InterpolantFactoryMethodLinear(e){return new uy(this.times,this.values,this.getValueSize(),e)}}Ur.prototype.ValueTypeName="quaternion";Ur.prototype.InterpolantFactoryMethodSmooth=void 0;class Vr extends Bn{constructor(e,t,n){super(e,t,n)}}Vr.prototype.ValueTypeName="string";Vr.prototype.ValueBufferType=Array;Vr.prototype.DefaultInterpolation=As;Vr.prototype.InterpolantFactoryMethodLinear=void 0;Vr.prototype.InterpolantFactoryMethodSmooth=void 0;class Fr extends Bn{}Fr.prototype.ValueTypeName="vector";class Bc{constructor(e="",t=-1,n=[],r=al){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=wn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(fy(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Bn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=ay(c);c=hh(c,1,u),l=hh(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new zr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=r[h];f||(r[h]=f=[]),f.push(l)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,_,v){if(d.length!==0){const m=[],p=[];cd(d,m,p,_),m.length!==0&&v.push(new h(f,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let v=0;v<f[_].morphTargets.length;v++)d[f[_].morphTargets[v]]=-1;for(const v in d){const m=[],p=[];for(let x=0;x!==f[_].morphTargets.length;++x){const M=f[_];m.push(M.time),p.push(M.morphTarget===v?1:0)}r.push(new zr(".morphTargetInfluence["+v+"]",m,p))}c=d.length*o}else{const d=".bones["+t[h].name+"]";n(Fr,d+".position",f,"pos",r),n(Ur,d+".quaternion",f,"rot",r),n(Fr,d+".scale",f,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function hy(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return zr;case"vector":case"vector2":case"vector3":case"vector4":return Fr;case"color":return ud;case"quaternion":return Ur;case"bool":case"boolean":return kr;case"string":return Vr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function fy(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=hy(i.type);if(i.times===void 0){const t=[],n=[];cd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const vi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class dy{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],_=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null}}}const py=new dy;class Hr{constructor(e){this.manager=e!==void 0?e:py,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Hr.DEFAULT_MATERIAL_NAME="__DEFAULT";const qn={};class my extends Error{constructor(e,t){super(e),this.response=t}}class hd extends Hr{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=vi.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(qn[e]!==void 0){qn[e].push({onLoad:t,onProgress:n,onError:r});return}qn[e]=[],qn[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=qn[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,_=d!==0;let v=0;const m=new ReadableStream({start(p){x();function x(){h.read().then(({done:M,value:g})=>{if(M)p.close();else{v+=g.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:d});for(let b=0,w=u.length;b<w;b++){const C=u[b];C.onProgress&&C.onProgress(E)}p.enqueue(g),x()}},M=>{p.error(M)})}}});return new Response(m)}else throw new my(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(_=>d.decode(_))}}}).then(l=>{vi.add(e,l);const u=qn[e];delete qn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=qn[e];if(u===void 0)throw this.manager.itemError(e),l;delete qn[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class gy extends Hr{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vi.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Es("img");function c(){u(),vi.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class _y extends Hr{constructor(e){super(e)}load(e,t,n,r){const s=new Pt,o=new gy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class $o extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class fd extends $o{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ua=new ze,fh=new L,dh=new L;class Sl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ul,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fh.setFromMatrixPosition(e.matrixWorld),t.position.copy(fh),dh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dh),t.updateMatrixWorld(),Ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vy extends Sl{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Or*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class dd extends $o{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new vy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ph=new ze,ts=new L,Fa=new L;class xy extends Sl{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new se(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ts.setFromMatrixPosition(e.matrixWorld),n.position.copy(ts),Fa.copy(n.position),Fa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Fa),n.updateMatrixWorld(),r.makeTranslation(-ts.x,-ts.y,-ts.z),ph.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ph)}}class xi extends $o{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new xy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class My extends Sl{constructor(){super(new hl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Al extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new My}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ds{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class yy extends Hr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=vi.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return vi.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),vi.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});vi.add(e,c),s.manager.itemStart(e)}}class Sy{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){Rn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const o=this._workIndex*s;Rn.multiplyQuaternionsFlat(e,o,e,t,e,n),Rn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){const o=1-r;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*r}}}const bl="\\[\\]\\.:\\/",Ay=new RegExp("["+bl+"]","g"),El="[^"+bl+"]",by="[^"+bl.replace("\\.","")+"]",Ey=/((?:WC+[\/:])*)/.source.replace("WC",El),Ty=/(WCOD+)?/.source.replace("WCOD",by),wy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",El),Ry=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",El),Cy=new RegExp("^"+Ey+Ty+wy+Ry+"$"),Iy=["material","materials","bones","map"];class Py{constructor(e,t,n){const r=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ay,"")}static parseTrackName(e){const t=Cy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);Iy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[r];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=Py;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Ly{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:vr,endingEnd:vr};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Km,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Zm:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case al:default:for(let u=0,h=c.length;u!==h;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const o=n===$m;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===ol){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){const a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=xr,r.endingEnd=xr):(e?r.endingStart=this.zeroSlopeAtStart?xr:vr:r.endingStart=Oo,t?r.endingEnd=this.zeroSlopeAtEnd?xr:vr:r.endingEnd=Oo)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const Ny=new Float32Array(1);class pd extends Yi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let h=0;h!==s;++h){const f=r[h],d=f.name;let _=u[d];if(_!==void 0)++_.referenceCount,o[h]=_;else{if(_=o[h],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,c,d));continue}const v=t&&t._propertyBindings[h].binding.parsedPath;_=new Sy(st.create(n,d,v),f.ValueTypeName,f.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,c,d),o[h]=_}a[h].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const h=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new ld(new Float32Array(2),new Float32Array(2),1,Ny),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let o=typeof e=="string"?Bc.findByName(r,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=al),c!==void 0){const h=c.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new Ly(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?Bc.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(r,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,h=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zc);function Fo(i){const e=new Map,t=new Map,n=i.clone();return md(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function md(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)md(i.children[n],e.children[n],t)}function gd(i){let e=i>>>0;return()=>{const[t,n]=Yh(e);return e=n,t}}const xt=64;function Et(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e;const s=r.getContext("2d");t(s,i,e,gd(i*31+e));const o=new Xo(r);return o.colorSpace=Rt,o.magFilter=pt,o.minFilter=pt,o.generateMipmaps=!1,n&&(o.wrapS=o.wrapT=Ei),o}function Ct(i,e,t,n,r,s){for(let o=0;o<s;o++)i.fillStyle=r[Math.floor(n()*r.length)],i.fillRect(Math.floor(n()*e),Math.floor(n()*t),1+Math.floor(n()*2),1+Math.floor(n()*2))}function di(i,e,t,n,r,s){for(let o=0;o<s;o++){i.fillStyle=r;const a=n()*e,c=n()*t;for(let l=0;l<14;l++)i.fillRect(Math.floor(a+(n()-.5)*10),Math.floor(c+(n()-.5)*10),2,2)}}function Oy(){const i=Et(xt,xt,(g,E,b,w)=>{g.fillStyle="#b9ae8e",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#a99f80","#c5bb9c","#9c9274"],500),g.fillStyle="#3f5b48",g.fillRect(0,Math.floor(b*.62),E,Math.ceil(b*.38));for(let C=0;C<E;C+=8)for(let S=Math.floor(b*.62);S<b;S+=8)g.fillStyle=(C+S)%16?"#466751":"#3a5443",g.fillRect(C,S,7,7);g.fillStyle="#2c2a22",g.fillRect(0,Math.floor(b*.6),E,2),di(g,E,b*.6,w,"rgba(70,55,30,0.35)",5)}),e=Et(xt,xt,(g,E,b,w)=>{for(let C=0;C<E;C+=16)for(let S=0;S<b;S+=16)g.fillStyle=(C+S)/16%2?"#8d8a80":"#5f5d57",g.fillRect(C,S,16,16);Ct(g,E,b,w,["#4b4943","#9b988e","#3a3934"],400),g.fillStyle="#2a2925";for(let C=0;C<E;C+=16)g.fillRect(C,0,1,b),g.fillRect(0,C,E,1)}),t=Et(xt,xt,(g,E,b,w)=>{for(let C=0;C<b;C+=8){const S=C/8%2?0:16;for(let y=-S;y<E;y+=32){const N=120+Math.floor(w()*30);g.fillStyle=`rgb(${N},${Math.floor(N*.68)},${Math.floor(N*.4)})`,g.fillRect(y,C,31,7)}}Ct(g,E,b,w,["#5e3d22","#8e6238"],300),g.fillStyle="#d8d0b0",g.fillRect(0,30,E,1)}),n=Et(xt,xt,(g,E,b,w)=>{g.fillStyle="#8f8b7c",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#7e7a6c","#a19d8d","#6a675b"],600),g.fillStyle="#4f4c43";for(let C=0;C<E;C+=32)g.fillRect(C,0,2,b),g.fillRect(0,C,E,2);di(g,E,b,w,"rgba(90,70,30,0.4)",3)}),r=Et(xt,16,(g,E,b,w)=>{g.fillStyle="#6b4a2b",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#5a3d22","#7d5834","#4a311b"],200),g.fillStyle="#3a2614",g.fillRect(0,0,E,1),g.fillRect(0,b-1,E,1),g.fillStyle="#9a9a9a",g.fillRect(4,6,2,2),g.fillRect(E-6,7,2,2)}),s=Et(xt,xt,(g,E,b,w)=>{for(let C=0;C<E;C+=8){const S=70+Math.floor(w()*25);g.fillStyle=`rgb(${S},${Math.floor(S*.72)},${Math.floor(S*.45)})`,g.fillRect(C,0,7,b)}Ct(g,E,b,w,["#3b2817","#56391f"],200),g.strokeStyle="#8f8f8f",g.lineWidth=2,g.beginPath(),g.moveTo(0,18),g.lineTo(E,46),g.moveTo(E,18),g.lineTo(0,46),g.stroke()}),o=Et(xt,xt,(g,E,b,w)=>{for(let C=0;C<E;C+=16){g.fillStyle="#4b6a7f",g.fillRect(C,0,15,b),g.fillStyle="#2d4150";for(let S=6;S<20;S+=3)g.fillRect(C+4,S,8,1);g.fillStyle="#c0c0c0",g.fillRect(C+12,30,2,5)}Ct(g,E,b,w,["#6b5a3a","#3a4d5a"],300)},!0),a=Et(xt,xt,(g,E,b,w)=>{g.fillStyle="#2b2a1e",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#3a3824","#22301a","#1d1c14","#34452a"],900)}),c=Et(xt*2,xt,(g,E,b,w)=>{g.fillStyle="#5b4026",g.fillRect(0,0,E,b),g.fillStyle="#1f3327",g.fillRect(4,4,E-8,b-8),Ct(g,E,b,w,["#2a4434","#18281e"],300),g.fillStyle="rgba(230,230,220,0.85)",g.font="bold 13px monospace",g.fillText("NON USCITE",14,26),g.fillText("DI NOTTE",22,44),g.fillStyle="rgba(120,10,10,0.8)",g.fillRect(90,46,20,2)},!1),l=Et(32,32,(g,E,b,w)=>{g.fillStyle="#3a3d40",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#2b2d30","#4a4e52","#55493a"],120)}),u=Et(32,32,(g,E,b,w)=>{g.fillStyle="#8a6a44",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#6e5333","#9e7c52"],150);for(let C=0;C<b;C+=8)g.fillStyle="#5a4126",g.fillRect(0,C,E,1)}),h=Et(xt,xt,(g,E,b,w)=>{for(let C=0;C<E;C+=32)for(let S=0;S<b;S+=32)g.fillStyle=(C+S)/32%2?"#b8ad86":"#6f8a6a",g.fillRect(C,S,32,32);Ct(g,E,b,w,["#9a916e","#5c7358","#c9bf9a","#4a4536"],500),di(g,E,b,w,"rgba(60,45,25,0.35)",3)}),f=Et(xt,xt,(g,E,b,w)=>{g.fillStyle="#5d5c58",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#4e4d49","#6b6a65","#3f3e3a","#74706a"],900),g.strokeStyle="#2f2e2b",g.lineWidth=1,g.beginPath(),g.moveTo(4,10),g.lineTo(22,26),g.lineTo(30,24),g.lineTo(50,44),g.stroke(),di(g,E,b,w,"rgba(40,30,15,0.5)",4)}),d=Et(xt,xt,(g,E,b,w)=>{g.fillStyle="#2f3032",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#3a3b3d","#262729","#45464a","#1f2022"],1100),g.fillStyle="rgba(210,200,160,0.55)",g.fillRect(0,31,E,2),di(g,E,b,w,"rgba(20,20,20,0.6)",3)}),_=Et(32,32,(g,E,b)=>{g.clearRect(0,0,E,b),g.strokeStyle="#8d9499",g.lineWidth=1;for(let w=-32;w<64;w+=8)g.beginPath(),g.moveTo(w,0),g.lineTo(w+32,32),g.moveTo(w+32,0),g.lineTo(w,32),g.stroke()}),v=Et(xt*2,xt,(g,E,b,w)=>{g.fillStyle="#d9a21b",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#b9861a","#e5b43a","#6b4a1a"],700),g.fillStyle="#1b2228";for(let C=6;C<E-10;C+=20)g.fillRect(C,10,15,16);g.fillStyle="#111",g.fillRect(0,34,E,4),g.font="bold 10px monospace",g.fillText("SCUOLABUS",30,50),di(g,E,b,w,"rgba(90,50,20,0.6)",5)}),m=Et(16,32,(g,E,b,w)=>{g.fillStyle="#3b2c1e",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#2a1f15","#4a3828"],120)}),p=Et(32,32,(g,E,b,w)=>{g.fillStyle="#1f3a1e",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#15281a","#2b4d24","#183020"],300)}),x=Et(32,32,(g,E,b,w)=>{g.fillStyle="#4b5237",g.fillRect(0,0,E,b),di(g,E,b,w,"rgba(35,40,25,0.9)",7),di(g,E,b,w,"rgba(110,98,66,0.8)",5),Ct(g,E,b,w,["#3c4230","#585f40"],160)}),M=Et(64,32,(g,E,b,w)=>{g.fillStyle="#5b4632",g.fillRect(0,0,E,b),Ct(g,E,b,w,["#4a3828","#6b5440"],260),g.fillStyle="rgba(0,0,0,0.35)";for(let C=4;C<E;C+=8)for(let S=4;S<b;S+=8)g.fillRect(C,S,2,2)});return{muro:i,piastrelle:e,parquet:t,soffitto:n,legno:r,porta:s,armadietti:o,terra:a,lavagna:c,metallo:l,legnoChiaro:u,linoleum:h,cemento:f,asfalto:d,rete:_,pulmino:v,corteccia:m,fogliame:p,mimetica:x,pannello:M}}function yr(i,{larghezza:e=128,altezza:t=64,sfondo:n=null,colore:r="#f2efe6",font:s="bold 14px monospace",bordo:o=null}={}){return Et(e,t,a=>{n&&(a.fillStyle=n,a.fillRect(0,0,e,t)),o&&(a.strokeStyle=o,a.lineWidth=3,a.strokeRect(2,2,e-4,t-4)),a.fillStyle=r,a.font=s,a.textAlign="center",a.textBaseline="middle",i.forEach((c,l)=>a.fillText(c,e/2,(l+1)*t/(i.length+1)))},!1)}function mh(i,e){if(e===Jm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Nc||e===Of){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===Nc)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Zo extends Hr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new By(t)}),this.register(function(t){return new ky(t)}),this.register(function(t){return new Ky(t)}),this.register(function(t){return new $y(t)}),this.register(function(t){return new Zy(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Wy(t)}),this.register(function(t){return new Xy(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new jy(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Yy(t)}),this.register(function(t){return new qy(t)}),this.register(function(t){return new zy(t)}),this.register(function(t){return new Jy(t)}),this.register(function(t){return new Qy(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ds.extractUrlBase(e);o=ds.resolveURL(l,this.path)}else o=ds.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new hd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===_d){try{o[We.KHR_BINARY_GLTF]=new eS(e)}catch(h){r&&r(h);return}s=JSON.parse(o[We.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new dS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case We.KHR_MATERIALS_UNLIT:o[h]=new Uy;break;case We.KHR_DRACO_MESH_COMPRESSION:o[h]=new tS(s,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:o[h]=new nS;break;case We.KHR_MESH_QUANTIZATION:o[h]=new iS;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function Dy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class zy{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new be(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],$t);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Al(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new xi(u),l.distance=h;break;case"spot":l=new dd(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,$n(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class Uy{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return wt}extendParams(e,t,n){const r=[];e.color=new be(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],$t),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,Rt))}return Promise.all(r)}}class Fy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class By{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new se(a,a)}return Promise.all(s)}}class ky{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Vy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Hy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new be(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],$t)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Rt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Gy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Wy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new be().setRGB(a[0],a[1],a[2],$t),Promise.all(s)}}class Xy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class jy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new be().setRGB(a[0],a[1],a[2],$t),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Rt)),Promise.all(s)}}class qy{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Yy{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Fn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Ky{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class $y{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Zy{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Jy{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,r.mode,r.filter),d})})}else return null}}class Qy{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const l of r.primitives)if(l.mode!==fn.TRIANGLES&&l.mode!==fn.TRIANGLE_STRIP&&l.mode!==fn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const _ of h){const v=new ze,m=new L,p=new Rn,x=new L(1,1,1),M=new HM(_.geometry,_.material,f);for(let g=0;g<f;g++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,g),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,g),c.SCALE&&x.fromBufferAttribute(c.SCALE,g),M.setMatrixAt(g,v.compose(m,p,x));for(const g in c)if(g==="_COLOR_0"){const E=c[g];M.instanceColor=new Uc(E.array,E.itemSize,E.normalized)}else g!=="TRANSLATION"&&g!=="ROTATION"&&g!=="SCALE"&&_.geometry.setAttribute(g,c[g]);mt.prototype.copy.call(M,_),this.parser.assignFinalMaterial(M),d.push(M)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const _d="glTF",ns=12,gh={JSON:1313821514,BIN:5130562};class eS{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ns),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==_d)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-ns,s=new DataView(e,ns);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===gh.JSON){const l=new Uint8Array(e,ns+o,a);this.content=n.decode(l)}else if(c===gh.BIN){const l=ns+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class tS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=kc[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=kc[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],d=br[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){r.decodeDracoFile(u,function(d){for(const _ in d.attributes){const v=d.attributes[_],m=c[_];m!==void 0&&(v.normalized=m)}h(d)},a,l,$t,f)})})}}class nS{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class iS{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class vd extends Cs{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,h=(n-t)/u,f=h*h,d=f*h,_=e*l,v=_-l,m=-2*d+3*f,p=d-f,x=1-m,M=p-f+h;for(let g=0;g!==a;g++){const E=o[v+g+a],b=o[v+g+c]*u,w=o[_+g+a],C=o[_+g]*u;s[g]=x*E+M*b+m*w+p*C}return s}}const rS=new Rn;class sS extends vd{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return rS.fromArray(s).normalize().toArray(s),s}}const fn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},br={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},_h={9728:pt,9729:sn,9984:bf,9985:go,9986:os,9987:Jn},vh={33071:_i,33648:No,10497:Ei},Ba={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},kc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},pi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},oS={CUBICSPLINE:void 0,LINEAR:bs,STEP:As},ka={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function aS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new yl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ni})),i.DefaultMaterial}function Oi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function $n(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cS(i,e,t){let n=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;o.push(f)}if(r){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;a.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=h),s&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function lS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uS(i){let e;const t=i.extensions&&i.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Va(t.attributes):e=i.indices+":"+Va(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Va(i.targets[n]);return e}function Va(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Vc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const fS=new ze;class dS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Dy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new _y(this.options.manager):this.textureLoader=new yy(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new hd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return Oi(s,a,r),$n(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(ds.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=Ba[r.type],a=br[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new Kt(l,o,c))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Ba[r.type],l=br[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,_=r.normalized===!0;let v,m;if(d&&d!==h){const p=Math.floor(f/d),x="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let M=t.cache.get(x);M||(v=new l(a,p*d,r.count*d/u),M=new Qf(v,d/u),t.cache.add(x,M)),m=new Ts(M,c,f%d/u,_)}else a===null?v=new l(r.count*c):v=new l(a,f,r.count*c),m=new Kt(v,c,_);if(r.sparse!==void 0){const p=Ba.SCALAR,x=br[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,g=r.sparse.values.byteOffset||0,E=new x(o[1],M,r.sparse.count*p),b=new l(o[2],g,r.sparse.count*c);a!==null&&(m=new Kt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,C=E.length;w<C;w++){const S=E[w];if(m.setX(S,b[w*c]),c>=2&&m.setY(S,b[w*c+1]),c>=3&&m.setZ(S,b[w*c+2]),c>=4&&m.setW(S,b[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=_h[f.magFilter]||sn,u.minFilter=_h[f.minFilter]||Jn,u.wrapS=vh[f.wrapS]||Ei,u.wrapT=vh[f.wrapT]||Ei,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==pt&&u.minFilter!==sn,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=r.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let _=f;t.isImageBitmapLoader===!0&&(_=function(v){const m=new Pt(v);m.needsUpdate=!0,f(m)}),t.load(ds.resolveURL(h,s.path),_,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),$n(h,o),h.userData.mimeType=o.mimeType||hS(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[We.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new id,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new ml,_n.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return yl}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[We.KHR_MATERIALS_UNLIT]){const h=r[We.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new be(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],$t),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Rt)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=pn);const u=s.alphaMode||ka.OPAQUE;if(u===ka.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ka.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==wt&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new se(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==wt&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==wt){const h=s.emissiveFactor;a.emissive=new be().setRGB(h[0],h[1],h[2],$t)}return s.emissiveTexture!==void 0&&o!==wt&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Rt)),Promise.all(l).then(function(){const h=new o(a);return s.name&&(h.name=s.name),$n(h,s),t.associations.set(h,{materials:e}),s.extensions&&Oi(r,h,s),h})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return xh(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=uS(l),h=r[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[We.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=xh(new zt,l,t),r[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?aS(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,_=u.length;d<_;d++){const v=u[d],m=o[d];let p;const x=l[d];if(m.mode===fn.TRIANGLES||m.mode===fn.TRIANGLE_STRIP||m.mode===fn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new BM(v,x):new Pe(v,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===fn.TRIANGLE_STRIP?p.geometry=mh(p.geometry,Of):m.mode===fn.TRIANGLE_FAN&&(p.geometry=mh(p.geometry,Nc));else if(m.mode===fn.LINES)p=new GM(v,x);else if(m.mode===fn.LINE_STRIP)p=new Wo(v,x);else if(m.mode===fn.LINE_LOOP)p=new WM(v,x);else if(m.mode===fn.POINTS)p=new XM(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&lS(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),$n(p,s),m.extensions&&Oi(r,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,_=h.length;d<_;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&Oi(r,h[0],s),h[0];const f=new At;s.extensions&&Oi(r,f,s),t.associations.set(f,{meshes:e});for(let d=0,_=h.length;d<_;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Xt(Dc.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new hl(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),$n(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new ze;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new pl(a,c)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=r.channels.length;h<f;h++){const d=r.channels[h],_=r.samplers[d.sampler],v=d.target,m=v.node,p=r.parameters!==void 0?r.parameters[_.input]:_.input,x=r.parameters!==void 0?r.parameters[_.output]:_.output;v.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(_),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],_=h[2],v=h[3],m=h[4],p=[];for(let x=0,M=f.length;x<M;x++){const g=f[x],E=d[x],b=_[x],w=v[x],C=m[x];if(g===void 0)continue;g.updateMatrix&&g.updateMatrix();const S=n._createAnimationTracks(g,E,b,w,C);if(S)for(let y=0;y<S.length;y++)p.push(S[y])}return new Bc(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,fS)});for(let d=0,_=h.length;d<_;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new td:l.length>1?u=new At:l.length===1?u=l[0]:u=new mt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=o),$n(u,s),s.extensions&&Oi(n,u,s),s.matrix!==void 0){const h=new ze;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new At;n.name&&(s.name=r.createUniqueName(n.name)),$n(s,n),n.extensions&&Oi(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of r.associations)(f instanceof _n||f instanceof Pt)&&h.set(f,d);return u.traverse(f=>{const d=r.associations.get(f);d!=null&&h.set(f,d)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,c=[];pi[s.path]===pi.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(pi[s.path]){case pi.weights:l=zr;break;case pi.rotation:l=Ur;break;case pi.position:case pi.scale:l=Fr;break;default:switch(n.itemSize){case 1:l=zr;break;case 2:case 3:default:l=Fr;break}break}const u=r.interpolation!==void 0?oS[r.interpolation]:bs,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const _=new l(c[f]+"."+pi[s.path],t.array,h,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Vc(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof Ur?sS:vd;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function pS(i,e,t){const n=e.attributes,r=new ri;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){const u=Vc(br[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new L,c=new L;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,_=f.max;if(d!==void 0&&_!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(_[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(_[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(_[2]))),f.normalized){const v=Vc(br[f.componentType]);c.multiplyScalar(v)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new zn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function xh(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=kc[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return Xe.workingColorSpace!==$t&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xe.workingColorSpace}" not supported.`),$n(i,e),pS(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?cS(i,e.targets,t):i})}const mS="./modelli/armi.glb",gS="./modelli/aliene.glb",_S="Bayonet",vS=new be(10312959),xS=new be(3803760);function MS(i){const e=new Ze({name:i.name,color:i.color.clone(),map:i.map??null,emissive:i.emissiveMap?new be(16777215):new be(0),emissiveMap:i.emissiveMap??null,flatShading:!0});for(const t of[e.map,e.emissiveMap])t&&(t.magFilter=pt,t.needsUpdate=!0);return e}async function Mh(i,e){const t=await new Zo().loadAsync(i),n=new Map;for(const r of[...t.scene.children])r.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>(n.has(a)||n.set(a,MS(a)),n.get(a)));s.material=Array.isArray(s.material)?o:o[0]}),e.set(r.name,r)}async function yS(){const i=new Map;return await Promise.all([Mh(mS,i),Mh(gS,i)]),i}function SS(i,e){return{libreria:e,varianti:new Map,guanto:new Ze({color:2369322}),nocche:new Ze({color:3817284}),manica:new Ze({map:i.mimetica??null,color:i.mimetica?16777215:4870710}),polsino:new Ze({color:1776927})}}function AS(i,e,t,n){const r=`${e.uuid}|${t}`;return i.varianti.has(r)||i.varianti.set(r,n(e.clone())),i.varianti.get(r)}function bS(i,e,t){const n=e.colore!==void 0?new be(e.colore):null,r=`${e.colore??"vera"}|${e.potenziata?"p":""}`;!n&&!e.potenziata||i.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>AS(t,a,r,c=>(n&&(c.emissive.copy(n).multiplyScalar(e.potenziata?1.6:1.1),c.color.lerp(n,.18)),e.potenziata&&(c.color.lerp(vS,n?.25:.45),n||c.emissive.copy(xS)),c)));s.material=Array.isArray(s.material)?o:o[0]})}function Hi(i,e){const t=i==="coltello"?{modello:_S}:ct[i]??ct[gs(i)],n=e.libreria.get(t.modello),r=n.clone();r.position.set(0,0,0),r.rotation.set(0,0,0),i!=="coltello"&&bS(r,t,e);const s=n.userData,o=new L().fromArray(s.bocca??[0,.03,-.3]),a=s.presa?new L().fromArray(s.presa):null;return{gruppo:r,bocca:o,presa:a,lunghezza:s.lunghezza??.5,colore:t.colore??null}}function Bi(i,e,t,n,r){const s=new L(...n),o=new L(...r),a=new Pe(new vl(t,s.distanceTo(o),3,8),e);return a.position.copy(s).add(o).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new L(0,1,0),o.clone().sub(s).normalize()),i.add(a),a}function xd(i,e,t,n){const r=new L(...t),s=new L(...n),o=s.clone().sub(r),a=new Pe(new Nn(.036,.03,o.length(),10),e.manica);a.position.copy(r).add(s).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new L(0,1,0),o.clone().normalize());const c=new Pe(new Nn(.031,.031,.04,10),e.polsino);c.position.copy(r).addScaledVector(o.clone().normalize(),.02),c.quaternion.copy(a.quaternion),i.add(a,c)}function ES(i){const e=new At;Bi(e,i.guanto,.026,[.012,-.03,.032],[.008,-.075,.05]);for(let t=0;t<4;t++){const n=-.03-t*.014;Bi(e,i.guanto,.0085,[.026,n,.03],[.012,n-.004,-.004]),Bi(e,i.nocche,.0082,[.012,n-.004,-.004],[-.014,n-.006,.006])}return Bi(e,i.guanto,.0095,[-.012,-.012,.048],[-.014,-.004,.01]),xd(e,i,[.01,-.085,.07],[.07,-.22,.36]),e}function TS(i){const e=new At;Bi(e,i.guanto,.025,[-.012,-.03,.03],[-.006,-.03,-.02]);for(let t=0;t<4;t++){const n=.012-t*.015;Bi(e,i.guanto,.0085,[.006,-.032,n],[.024,-.008,n-.004])}return Bi(e,i.guanto,.009,[-.024,-.02,.02],[-.026,.004,-.012]),xd(e,i,[-.02,-.05,.04],[-.1,-.26,.22]),e}const Kn=_s,yh=.9,Sh=2.3,is=2.4,wS=Object.freeze([[-4,0,!0,16765594],[4,0,!1,16765594],[0,10,!1,16765594],[0,19,!0,16765594],[12,0,!1,16765594],[20,0,!0,16765594],[-9,13.5,!1,16769968],[-9,20.5,!0,16769968],[3,27,!1,14217471],[22,-10.5,!0,16738880]]),RS=Object.freeze([[17,20,12375295],[10.5,27.5,13163775]]),CS=Object.freeze({banco:"legnoChiaro",tavolo:"legnoChiaro",bancone:"metallo",cavallina:"legno"});function Md(i,e,t,n,r=0){const s=new rn(i,e,t),o=s.attributes.uv,a=[[t,e],[t,e],[i,t],[i,t],[i,e],[i,e]],c=new Set([0,1,4,5]);for(let l=0;l<6;l++){const u=c.has(l)?r/n:0;for(let h=0;h<4;h++){const f=l*4+h;o.setXY(f,o.getX(f)*a[l][0]/n,o.getY(f)*a[l][1]/n+u)}}return s}function un(i,e,t,n,r,s=Kn){const o=new Pe(Md(t.x1-t.x0,r-n,t.z1-t.z0,s,n),e);return o.position.set((t.x0+t.x1)/2,(n+r)/2,(t.z0+t.z1)/2),i.add(o),o}function Ha(i,e,t,n,r,s,o,a,c=!1){const l=new Jt(r-t,s-n).rotateX(c?Math.PI/2:-Math.PI/2),u=l.attributes.uv;for(let f=0;f<u.count;f++)u.setXY(f,u.getX(f)*(r-t)/a,u.getY(f)*(s-n)/a);const h=new Pe(l,e);return h.position.set((t+r)/2,o,(n+s)/2),i.add(h),h}function rs(i,e){i.rotation.y=Math.atan2(e.x,e.z)}function IS(i,e,t,n){const r={muro:new Ze({map:e.muro}),soffitto:new Ze({map:e.soffitto}),piastrelle:new Ze({map:e.piastrelle}),parquet:new Ze({map:e.parquet}),legno:new Ze({map:e.legno}),legnoChiaro:new Ze({map:e.legnoChiaro}),porta:new Ze({map:e.porta}),armadietti:new Ze({map:e.armadietti}),terra:new Ze({map:e.terra}),linoleum:new Ze({map:e.linoleum}),cemento:new Ze({map:e.cemento}),asfalto:new Ze({map:e.asfalto}),rete:new Ze({map:e.rete,transparent:!0,alphaTest:.4,side:pn}),palo:new Ze({color:5922918}),pulmino:new Ze({map:e.pulmino}),corteccia:new Ze({map:e.corteccia}),fogliame:new Ze({map:e.fogliame}),metallo:new Ze({map:e.metallo}),cornice:new Ze({color:2825488})},s=gd(77);Ha(i,r.terra,-60,-60,80,80,-.02,4);for(const R of Gc)Ha(i,r[R.pavimento],R.x0,R.z0,R.x1,R.z1,0,R.aperto?4:2),R.aperto||Ha(i,r.soffitto,R.x0,R.z0,R.x1,R.z1,Kn,2,!0);for(const R of Wc)un(i,r.muro,R,0,Kn);for(const R of Kh){un(i,r.rete,R,0,Ns,1);const j=Math.max(R.x1-R.x0,R.z1-R.z0);for(let B=0;B<=j;B+=3){const K=new Pe(new Nn(.05,.05,Ns+.2,5),r.palo);K.position.set(R.x1-R.x0>R.z1-R.z0?R.x0+B:(R.x0+R.x1)/2,(Ns+.2)/2,R.x1-R.x0>R.z1-R.z0?(R.z0+R.z1)/2:R.z0+B),i.add(K)}}const o=new Pe(new qo(6,16),new wt({color:14674165,fog:!1}));o.position.set(-60,70,120),o.lookAt(0,0,0),i.add(o);const a=new Map;for(const R of Dn){const j=R.recinzione?.15:yh,B=R.recinzione?Ns-.2:Sh;R.recinzione||(un(i,r.muro,R.scatola,0,yh),un(i,r.muro,R.scatola,Sh,Kn));const K=R.asse==="z"?R.scatola.x1-R.scatola.x0:R.scatola.z1-R.scatola.z0,Z=[];for(let ce=0;ce<te.ASSE_PER_FINESTRA;ce++){const xe=new Pe(Md(K+.35,.17,.05,1),r.legno),pe=j+.15+ce*(B-j-.3)/(te.ASSE_PER_FINESTRA-1);xe.position.set(R.centro.x+R.fuori.x*.2,pe,R.centro.z+R.fuori.z*.2),xe.rotation.y=R.asse==="z"?0:Math.PI/2,xe.rotation.z=(s()-.5)*.5,i.add(xe),Z.push(xe)}a.set(R.id,Z)}const c=new Map;for(const R of Xi){un(i,r.muro,R.scatola,is,Kn);const j=un(i,r.porta,R.scatola,0,is,is);c.set(R.id,{anta:j,apertura:0})}for(const R of Xc)if(R.tipo==="tribuna")for(let j=0;j<3;j++){const B=(R.z1-R.z0)/3;un(i,r.legnoChiaro,{x0:R.x0,x1:R.x1,z0:R.z1-B*(j+1),z1:R.z1-B*j},0,R.altezza*((3-j)/3),1)}else if(R.tipo==="albero"){const j=(R.x0+R.x1)/2,B=(R.z0+R.z1)/2,K=new Pe(new Nn(.22,.3,2.4,6),r.corteccia);K.position.set(j,1.2,B);const Z=new Pe(new Yo(1.8,0),r.fogliame);Z.position.set(j,3.6,B),Z.scale.set(1,1.2,1),i.add(K,Z)}else if(R.tipo==="pulmino"){un(i,r.pulmino,R,.4,R.altezza,3);for(const[j,B]of[[.8,0],[R.x1-R.x0-.8,0],[.8,R.z1-R.z0],[R.x1-R.x0-.8,R.z1-R.z0]]){const K=new Pe(new Nn(.42,.42,.3,10).rotateX(Math.PI/2),r.palo);K.position.set(R.x0+j,.42,R.z0+B),i.add(K)}}else if(R.tipo==="lampione")un(i,r.palo,R,0,R.altezza+1.5,1);else if(R.tipo==="panchina")un(i,r.legno,R,.3,R.altezza,1);else if(R.tipo==="caldaia"){const j=Math.min(R.x1-R.x0,R.z1-R.z0)/2,B=new Pe(new Nn(j,j,R.altezza,10),r.metallo);B.position.set((R.x0+R.x1)/2,R.altezza/2,(R.z0+R.z1)/2);const K=new Pe(new Nn(.15,.15,Kn-R.altezza,6),r.metallo);K.position.set(B.position.x,R.altezza+(Kn-R.altezza)/2,B.position.z);const Z=new Pe(new Jt(.5,.3),new wt({color:16734746}));Z.position.set(B.position.x+j+.01,.6,B.position.z),Z.rotation.y=Math.PI/2,i.add(B,K,Z)}else un(i,r[CS[R.tipo]??"legno"],R,0,R.altezza,1);for(const[R,j,B,K]of[[-1.85,-1.7,6.6,9.3],[-1.85,-1.7,10.8,16.4],[1.7,1.85,6.6,12.4],[1.7,1.85,15.6,21.4]])un(i,r.armadietti,{x0:R,x1:j,z0:B,z1:K},0,1.9,1.9);const l=new Pe(new Jt(2.4,1.2),new Ze({map:e.lavagna}));l.position.set(4,1.6,5.83),l.rotation.y=Math.PI,i.add(l);for(const R of Zn){const{x:j,z:B}=R.posizione;if(R.tipo==="arma"){const K=new At;K.position.set(j,0,B),rs(K,R.verso);const{gruppo:Z,lunghezza:ce}=Hi(R.arma,t);Z.rotation.y=Math.PI/2,Z.position.set(-ce*.12,1.55,.08);const xe=new Pe(new Jt(Math.max(.7,ce+.25),.62),new Ze({map:e.pannello}));xe.position.set(0,1.5,.012);const pe=new Pe(new Jt(1,.22),new wt({map:yr([ct[R.arma].nome.toUpperCase(),`${R.costo}`],{larghezza:160,altezza:36,colore:"#ecebe2",font:"bold 12px monospace"}),transparent:!0}));pe.position.set(0,1.08,.015),K.add(xe,Z,pe),i.add(K)}else if(R.tipo==="bevanda"){const K=Wi[R.bevanda],Z=new At,ce=new Pe(new rn(.95,2,.65),new Ze({color:new be(K.colore).multiplyScalar(.45)}));ce.position.y=1;const xe=new Pe(new Jt(.8,1.2),new wt({map:yr([K.nome.split(" ")[0].toUpperCase(),K.nome.split(" ")[1].toUpperCase(),`${K.costo}`],{larghezza:64,altezza:96,sfondo:`#${K.colore.toString(16).padStart(6,"0")}`,font:"bold 12px monospace",bordo:"#111"})}));xe.position.set(0,1.2,.33),Z.add(ce,xe),Z.position.set(j,0,B),rs(Z,R.verso),i.add(Z)}}const u=Zn.find(R=>R.tipo==="interruttore"),h=new At,f=new Pe(new rn(.6,.8,.15),r.metallo),d=new Pe(new rn(.08,.35,.08),new Ze({color:12067867}));d.position.set(0,.12,.12);const _=new Pe(new Ko(.05,8,6),new wt({color:12067867}));_.position.set(.2,.3,.09),h.add(f,d,_),h.position.set(u.posizione.x,1.4,u.posizione.z),rs(h,u.verso),i.add(h);const v=Zn.find(R=>R.tipo==="potenziatore"),m=new At,p=new Pe(new rn(1.6,1.9,1.15),new Ze({map:e.metallo,color:9406120}));p.position.y=.95;const x=new Pe(new Jt(1.2,.45),new wt({map:yr(["POTENZIATORE",`${te.COSTO_POTENZIA}`],{larghezza:128,altezza:48,sfondo:"#1a0b2e",colore:"#d6b8ff",font:"bold 12px monospace",bordo:"#7d3cff"})}));x.position.set(0,1.55,.58);const M=new Pe(new Ml(.35,.04,6,18),new wt({color:3809376}));M.position.set(0,.9,.6);const g=new xi(10771711,0,5,1.5);g.position.set(0,1.4,1),m.add(p,x,M,g),m.position.set(v.posizione.x,0,v.posizione.z),rs(m,v.verso),i.add(m);const E=new Map;let b=null;const w=Zn.find(R=>R.tipo==="cassa"),C=new At,S=n.get("Chest_Special").clone();S.scale.setScalar(1.35);const y=new At;y.position.set(0,.56,-.3);const N=new Pe(new Jt(.3,.3),new wt({map:yr(["?"],{larghezza:32,altezza:32,colore:"#7dd3fc",font:"bold 28px monospace"}),transparent:!0}));N.position.set(0,.85,.05);const V=new xi(8246268,0,4,1.5);V.position.set(0,1,.3),C.add(S,y,N,V),C.position.set(w.posizione.x,0,w.posizione.z),rs(C,w.verso),i.add(C);const P=new Map;let D=null;const G=wS.map(([R,j,B,K])=>{const Z=new xi(K,9,13,1.6);Z.position.set(R,Kn-.4,j);const ce=new Pe(new rn(1.2,.06,.3),new wt({color:16773583}));return ce.position.set(R,Kn-.04,j),i.add(Z,ce),{luce:Z,plafoniera:ce,tremola:B,base:9}});for(const[R,j,B]of RS){const K=new xi(B,24,22,1.3);K.position.set(R,4.3,j);const Z=new Pe(new rn(.5,.15,.5),new wt({color:15266047}));Z.position.set(R,4.55,j),i.add(K,Z)}return{aggiorna(R,j,B){for(const pe of Dn)a.get(pe.id).forEach((q,ne)=>{q.visible=ne<R.finestre[pe.id]});for(const pe of Xi){const q=c.get(pe.id);R.porte.has(pe.id)&&(q.apertura=Math.min(1,q.apertura+j*1.5)),q.anta.position.y=is/2+q.apertura*is,q.anta.visible=q.apertura<1}for(const pe of G){const q=pe.tremola&&Math.sin(B*13.7+pe.luce.position.x)>.93;pe.luce.intensity=q?.6:pe.base,pe.plafoniera.material.color.setHex(q?2762272:16773583)}d.rotation.x=Dc.lerp(d.rotation.x,R.corrente?-2.4:0,Math.min(1,j*5)),_.material.color.setHex(R.corrente?3997546:12067867);const K=R.potenziatore.stato==="lavora";M.material.color.setHex(R.corrente?K?14725375:10771711:3809376),M.rotation.z+=j*(K?9:R.corrente?1:0),g.intensity=R.corrente?K?6+Math.sin(B*20)*3:2.5:0;const Z=R.potenziatore.stato==="pronta"?R.potenziatore.arma:null;if(b!==Z){if(E.forEach(pe=>{pe.visible=!1}),Z){if(!E.has(Z)){const{gruppo:pe}=Hi(Z,t);pe.scale.setScalar(1.2),m.add(pe),E.set(Z,pe)}E.get(Z).visible=!0}b=Z}if(Z){const pe=E.get(Z);pe.position.set(0,2.25+Math.sin(B*2)*.05,.2),pe.rotation.y=B*1.8}const ce=R.cassa.stato==="aperta";y.rotation.x=Dc.lerp(y.rotation.x,ce?-1.3:0,Math.min(1,j*6)),V.intensity=ce?3+Math.sin(B*6):.6;const xe=ce?R.cassa.arma:null;if(D!==xe){if(P.forEach(pe=>{pe.visible=!1}),xe){if(!P.has(xe)){const{gruppo:pe}=Hi(xe,t);pe.scale.setScalar(1.15),C.add(pe),P.set(xe,pe)}P.get(xe).visible=!0}D=xe}if(xe){const pe=P.get(xe);pe.position.set(0,1.15+Math.sin(B*2)*.05,0),pe.rotation.y=B*1.5}}}}const PS=.25,Ah=2.6,ss=1.32,Ao=Object.freeze([{tinta:16777215,scala:1},{tinta:11126682,scala:.95},{tinta:14271427,scala:1.06},{tinta:9076600,scala:1.02}]),fo=Object.freeze({cammina:"Walk",corre:"Run",attacco:"Punch",attacco2:"Run_Attack",muore:"Death",fermo:"Idle"}),Hc=Object.freeze({normale:{url:"./modelli/zombie.glb",scala:.01,varianti:!0,clip:{cammina:"cammina",cammina2:"cammina2",corre:"corre",attacco:"attacco",attacco2:"attacco2",muore:"muore",fermo:"fermo"},velocita:{cammina:1,cammina2:.9,corre:1.05,attacco:1.6,attacco2:1.7,muore:1.2,fermo:1}},base:{url:"./modelli/zombi_base.glb",scala:ss,clip:fo,velocita:{cammina:.9,corre:1,attacco:1.2}},grasso:{url:"./modelli/zombi_grasso.glb",scala:ss*1.05,clip:fo,velocita:{cammina:.7,corre:.8,attacco:1},raggio:.45,alto:1.55},scheletro:{url:"./modelli/zombi_scheletro.glb",scala:ss,clip:{cammina:"Crawl",corre:"Crawl",attacco:"HitReact",attacco2:"HitReact",muore:"Death",fermo:"Idle"},velocita:{cammina:1.6,corre:2.2},alto:.9,testa:.75},braccio:{url:"./modelli/zombi_braccio.glb",scala:ss,clip:{...fo,corre:"Run_Arms"},velocita:{cammina:.9,corre:1,attacco:1.1}},cane:{url:"./modelli/cane.glb",scala:1.05,clip:{cammina:"Walk",corre:"Run",attacco:"Attack",attacco2:"Attack",muore:"Death",fermo:"Idle"},velocita:{corre:1.1,attacco:1.5},alto:.8,testa:.7,raggio:.3},manichino:{url:"./modelli/zombi_base.glb",scala:ss,tinta:13218959,clip:fo,velocita:{}}});function LS(i){i.traverse(e=>{if(e.isMesh){e.frustumCulled=!1;for(const t of[].concat(e.material))t.map&&(t.map.magFilter=pt,t.map.minFilter=pt,t.map.generateMipmaps=!1,t.map.needsUpdate=!0)}})}function NS(i,e){return e.map(t=>{const n=new Map;return i.traverse(r=>{if(r.isMesh)for(const s of[].concat(r.material)){if(n.has(s))continue;const o=s.clone();o.color=new be(t),n.set(s,o)}}),n})}async function OS(){const i=new Map,e=n=>(i.has(n)||i.set(n,new Zo().loadAsync(n)),i.get(n)),t=new Map;return await Promise.all(Object.entries(Hc).map(async([n,r])=>{const s=await e(r.url);LS(s.scene);const o=r.varianti?Ao.map(a=>a.tinta):[r.tinta??null];t.set(n,{dati:r,modello:s.scene,clip:new Map(s.animations.map(a=>[a.name,a])),materialiVariante:o[0]===null?null:NS(s.scene,o)})})),t}function DS(i,e){return i.stato==="morto"?"muore":i.stato==="assi"?"attacco":i.stato==="attacco"?"attacco2":i.tipo==="manichino"||i.stato==="dentro"&&!e?"fermo":i.corre?"corre":i.variante%2?"cammina2":"cammina"}function zS(i,e){const t=new Map;function n(o){const a=e.get(o.tipo)??e.get("normale"),{dati:c}=a,l=new At,u=Fo(a.modello),h=c.varianti?Ao[o.variante%Ao.length]:{scala:1};if(u.scale.setScalar(c.scala*h.scala),a.materialiVariante){const m=a.materialiVariante[c.varianti?o.variante%Ao.length:0];u.traverse(p=>{p.isMesh&&(p.material=Array.isArray(p.material)?p.material.map(x=>m.get(x)??x):m.get(p.material)??p.material)})}u.traverse(m=>{m.isSkinnedMesh&&(m.frustumCulled=!0,m.computeBoundingSphere(),m.boundingSphere.radius*=1.8)}),l.add(u),i.add(l);let f=null;u.traverse(m=>{!f&&m.isBone&&/Head$/.test(m.name)&&(f=m)});const d=new pd(u),_=new Map;for(const[m,p]of Object.entries(c.clip)){const x=a.clip.get(p);if(!x)continue;const M=d.clipAction(x);M.timeScale=c.velocita[m]??1,m==="muore"&&(M.setLoop(ol,1),M.clampWhenFinished=!0),_.set(m,M)}const v={radice:l,corpo:u,testa:f,mixer:d,azioni:_,dati:c,attuale:null,ultimaPosizione:new se(o.x,o.z),tempoMorto:0,fase:Math.random()*3};return t.set(o.id,v),v}function r(o,a){const c=o.azioni.has(a)?a:a==="cammina2"?"cammina":a==="attacco2"?"attacco":a;if(o.attuale===c)return;const l=o.azioni.get(c);if(!l)return;const u=o.azioni.get(o.attuale);l.reset(),c!=="muore"&&(l.time=o.fase),l.play(),u&&u.crossFadeTo(l,PS,!1),o.attuale=c}function s(o){const a=t.get(o);a&&(i.remove(a.radice),a.mixer.stopAllAction(),a.mixer.uncacheRoot(a.corpo),a.corpo.traverse(c=>{var l;return(l=c.skeleton)==null?void 0:l.dispose()}),t.delete(o))}return{aggiorna(o,a){const c=new Set;for(const l of o.zombie){c.add(l.id);const u=t.get(l.id)??n(l),h=Math.hypot(l.x-u.ultimaPosizione.x,l.z-u.ultimaPosizione.y);u.ultimaPosizione.set(l.x,l.z),r(u,DS(l,h>.2*a)),u.radice.position.set(l.x,0,l.z),u.radice.rotation.y=l.yaw,l.stato==="morto"?(u.tempoMorto+=a,l.tipo!=="manichino"&&u.tempoMorto>Ah&&(u.radice.position.y=-(u.tempoMorto-Ah)*.6)):u.tempoMorto=0,u.mixer.update(a)}for(const l of[...t.keys()])c.has(l)||s(l)},bersagli(o){const a=new L;return o.zombie.filter(c=>c.stato!=="morto").map(c=>{const l=t.get(c.id),u=Hc[c.tipo]??Hc.normale,h={id:c.id,x:c.x,z:c.z,alto:u.alto,raggio:u.raggio};return l!=null&&l.testa?(l.testa.getWorldPosition(a),{...h,testa:{x:a.x,y:a.y+.06,z:a.z}}):{...h,testa:{x:c.x,y:u.testa??Ya.altezza,z:c.z}}})},posizioneTesta(o){const a=t.get(o);return a!=null&&a.testa?a.testa.getWorldPosition(new L):null},svuota(){for(const o of[...t.keys()])s(o)}}}const US=Object.freeze(["./modelli/sopravvissuto_matt.glb","./modelli/sopravvissuto_shaun.glb"]),FS=1.3,BS=/^(SMG|Knife|WoodenBat|Pistol|Shotgun)/,kS=.2;function bh(i,e){const t=new Go(new Rs({map:yr([i],{larghezza:128,altezza:32,colore:e,font:"bold 16px monospace"}),depthTest:!1,transparent:!0}));return t.scale.set(1.4,.35,1),t.renderOrder=20,t}async function VS(){return Promise.all(US.map(async i=>{const e=await new Zo().loadAsync(i);return e.scene.traverse(t=>{t.isMesh&&(t.frustumCulled=!1);for(const n of t.isMesh?[].concat(t.material):[])n.map&&(n.map.magFilter=pt,n.map.needsUpdate=!0)}),{modello:e.scene,clip:new Map(e.animations.map(t=>[t.name,t]))}}))}function HS(i,e,t,n){const r=new At,s=Fo(n.modello);s.scale.setScalar(FS);const o=[];let a=null;s.traverse(x=>{BS.test(x.name)&&o.push(x),!a&&x.isBone&&/^Index1\.R$/.test(x.name)&&(a=x)}),o.forEach(x=>{x.visible=!1}),r.add(s);const c=new At;r.add(c);const l=new pd(s),u=new Map;for(const[x,M]of Object.entries({fermo:"Idle_Gun",cammina:"Walk_Gun",corre:"Run_Gun",terra:"Death"})){const g=n.clip.get(M);if(!g)continue;const E=l.clipAction(g);x==="terra"&&(E.setLoop(ol,1),E.clampWhenFinished=!0),u.set(x,E)}let h=null;const f=new Map;let d=null;const _=bh(e,"#e8f4ff");_.position.y=2.3;const v=bh(`▼ ${e} A TERRA`,"#ff5a4e");v.position.y=1.2,v.visible=!1,r.add(_,v),i.add(r);const m=new L;function p(x){var g;if(h===x||!u.has(x))return;const M=u.get(x);M.reset().play(),(g=u.get(h))==null||g.crossFadeTo(M,kS,!1),h=x}return{aggiorna(x,M){r.visible=x.stato!=="morto",r.position.set(x.x,0,x.z),r.rotation.y=x.yaw;const g=x.stato==="terra";if(p(g?"terra":x.inMovimento?x.corsa?"corre":"cammina":"fermo"),l.update(M),_.visible=!g,v.visible=g,c.visible=!g,d!==x.armaAttiva){if(f.forEach(E=>{E.visible=!1}),!f.has(x.armaAttiva)){const{gruppo:E}=Hi(x.armaAttiva,t);E.rotation.y=Math.PI,c.add(E),f.set(x.armaAttiva,E)}f.get(x.armaAttiva).visible=!0,d=x.armaAttiva}a?(r.updateMatrixWorld(!0),a.getWorldPosition(m),r.worldToLocal(m),c.position.copy(m)):c.position.set(.15,1.3,.35),c.rotation.x=-x.pitch},chiudi(){i.remove(r),l.stopAllAction(),l.uncacheRoot(s),s.traverse(x=>{var M;return(M=x.skeleton)==null?void 0:M.dispose()}),_.material.map.dispose(),_.material.dispose(),v.material.map.dispose(),v.material.dispose()}}}const GS="./modelli/oggetti.glb",WS=1.42,XS=1.05,jS="#1a1510";async function qS(){const i=await new Zo().loadAsync(GS),e=new Map;for(const t of[...i.scene.children])t.traverse(n=>{if(n.isMesh)for(const r of[].concat(n.material))r.map&&(r.map.magFilter=pt,r.map.needsUpdate=!0),r.flatShading=!0}),e.set(t.name,t);return e}function YS(i,e){for(const t of Jh){const n=e.get(t.modello);if(!n)continue;const r=n.clone();r.position.set(t.x,t.modello.startsWith("Blood")?.005:0,t.z),r.rotation.y=t.rot??0,t.scala&&r.scale.setScalar(t.scala),i.add(r)}}function Eh(i,e,t,n){return new Pe(new Jt(e,t),new wt({map:yr(i,n),transparent:!0}))}function KS(i,e,t){const n=new Ze({map:e.pannello});e.pannello.wrapS=Ei;for(const s of[$i.z0+.16,$i.z1-.16]){const o=new Pe(new Jt($i.x1-$i.x0-1.2,1.25),n);o.position.set(($i.x0+$i.x1)/2,1.3,s+Math.sign(-s)*.005),o.rotation.y=s<0?0:Math.PI,i.add(o)}for(const s of jc){const o=Math.atan2(s.verso.x,s.verso.z),a=new At;a.position.set(s.x,0,s.z),a.rotation.y=o;const{gruppo:c,lunghezza:l}=Hi(s.arma,t);c.rotation.y=Math.PI/2,c.position.set(-l*.15,WS+(l>.9?.12:0),.09);const u=Math.min(1,.62/l);c.scale.setScalar(u),a.add(c);const h=Eh([ct[s.arma].nome.toUpperCase()],.66,.11,{larghezza:192,altezza:32,sfondo:jS,colore:ct[s.arma].aliena?"#9ff3ff":"#f2e6c8",font:"bold 13px monospace",bordo:"#6b5440"});h.position.set(0,XS,.03),a.add(h),i.add(a)}const r=Eh(["SALA D'ATTESA","","F: PROVA UN'ARMA DAL MURO","SPARA AI MANICHINI","","INVIO: SONO PRONTO"],3.6,2.2,{larghezza:256,altezza:160,sfondo:"#101418",colore:"#e9f2f7",font:"bold 15px monospace",bordo:"#2fb7a0"});r.position.set(Os.x,1.75,Os.z),r.rotation.y=Math.atan2(Os.verso.x,Os.verso.z),i.add(r);for(const s of[-42,-34]){const o=new xi(16769712,10,14,1.4);o.position.set(s,_s-.4,0);const a=new Pe(new rn(1.4,.06,.35),new wt({color:16773583}));a.position.set(s,_s-.04,0),i.add(o,a)}}function $S(i){const e=Tn[i],t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),r=`#${e.colore.toString(16).padStart(6,"0")}`,s=n.createRadialGradient(32,32,4,32,32,31);s.addColorStop(0,r),s.addColorStop(.55,`${r}99`),s.addColorStop(1,`${r}00`),n.fillStyle=s,n.fillRect(0,0,64,64),n.fillStyle="#0b0d10",n.beginPath(),n.arc(32,32,17,0,Math.PI*2),n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke(),n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.font=`bold ${e.simbolo.length>2?11:18}px monospace`,n.fillText(e.simbolo,32,33);const o=new Xo(t);return o.magFilter=pt,o.colorSpace=Rt,o}function ZS(i){const e=new Map(Object.keys(Tn).map(r=>[r,new Rs({map:$S(r),transparent:!0,depthWrite:!1})])),t=new Map;let n=0;return{aggiorna(r,s){n+=s;const o=new Set;for(const a of r.bonus??[]){if(o.add(a.id),!t.has(a.id)){const l=new Go(e.get(a.tipo));l.scale.setScalar(.7),i.add(l),t.set(a.id,l)}const c=t.get(a.id);c.position.set(a.x,.9+Math.sin(n*3+a.id)*.12,a.z),c.visible=a.timer>5||Math.sin(n*18)>0}for(const[a,c]of t)o.has(a)||(i.remove(c),t.delete(a))},svuota(){for(const r of t.values())i.remove(r);t.clear()}}}function JS(i){const e=new Ze({color:2898730,emissive:3800938,emissiveIntensity:.9,flatShading:!0}),t=ki.map(f=>{const d=new Pe(new Yo(.09,0),e);return d.position.set(f.x,f.y,f.z),d.scale.set(1,.75,1.2),i.add(d),d}),n=Zn.find(f=>f.tipo==="campanella"),r=[[0,.02],[.05,.03],[.07,.08],[.085,.16],[.13,.22],[.14,.24],[0,.24]].map(([f,d])=>new se(f,-d)),s=new At,o=new Ze({color:11569722,emissive:2759685}),a=new Pe(new jo(r,14),o);a.material.side=pn;const c=new Pe(new Nn(.015,.015,.22,6).rotateX(Math.PI/2),new Ze({color:2829099}));c.position.set(0,0,-.1);const l=new Pe(new Ko(.025,8,6),o);l.position.y=-.22,s.add(a,c,l),s.position.set(n.posizione.x,2.35,n.posizione.z+n.verso.z*.12),i.add(s);let u=0,h=0;return{suona(){u=1},aggiorna(f,d){h+=d;const _=new Set(f.frammenti??[]);t.forEach((v,m)=>{v.visible=f.fase!=="attesa"&&!_.has(ki[m].id),v.rotation.y+=d*1.5,v.position.y=ki[m].y+Math.sin(h*2+m)*.03}),e.emissiveIntensity=.6+Math.sin(h*4)*.35,u=Math.max(0,u-d*.6),s.rotation.x=Math.sin(h*14)*.5*u}}}const QS=220,eA=50;function tA(){const i=document.createElement("canvas");i.width=i.height=16;const e=i.getContext("2d");e.fillStyle="#fff",e.fillRect(4,4,8,8),e.fillRect(2,6,12,4),e.fillRect(6,2,4,12);const t=new Xo(i);return t.magFilter=pt,t.minFilter=pt,t}const nA={sangue:{colore:9047309,vita:.6,gravita:-7,dimensione:.12,sparsa:2.4,additivo:!1},scintilla:{colore:16765562,vita:.25,gravita:-2,dimensione:.07,sparsa:3,additivo:!0},polvere:{colore:9208432,vita:.7,gravita:.4,dimensione:.18,sparsa:.8,additivo:!1},legno:{colore:7031339,vita:.9,gravita:-8,dimensione:.1,sparsa:2.5,additivo:!1},energia:{colore:6285823,vita:.45,gravita:.5,dimensione:.28,sparsa:4,additivo:!0},fuoco:{colore:16747050,vita:.55,gravita:1.2,dimensione:.34,sparsa:3.5,additivo:!0},fiamma:{colore:16742938,vita:.35,gravita:1.5,dimensione:.22,sparsa:.6,additivo:!0}},Th=Object.freeze({energia:6285823,fuoco:16747050,fulmine:14217471}),wh=.14,Rh=.18,iA=25;function rA(i){const e=tA(),t=[],n=[];for(let h=0;h<QS;h++){const f=new Go(new Rs({map:e,transparent:!0,depthWrite:!1}));f.visible=!1,i.add(f),t.push({sprite:f,velocita:new L,vita:0,durata:1,tipo:null})}const r=[],s=new xi(6285823,0,9,1.4);i.add(s);let o=0;const a=[],c=new qo(.35,6).rotateX(-Math.PI/2),l=new wt({color:4851206,transparent:!0,opacity:.85,depthWrite:!1});function u(h,f,d,_=null,v=null,m=.6){const p=nA[h];for(let x=0;x<d&&t.length;x++){const M=t.pop();M.tipo=p,M.vita=0,M.durata=p.vita*(.6+Math.random()*.8),M.velocita.set((Math.random()-.5)*p.sparsa,Math.random()*p.sparsa*.6,(Math.random()-.5)*p.sparsa),_&&M.velocita.addScaledVector(_,p.sparsa*m),M.sprite.position.copy(f),M.sprite.material.color.setHex(v??p.colore),M.sprite.material.blending=p.additivo?ys:Vi,M.sprite.scale.setScalar(p.dimensione),M.sprite.visible=!0,n.push(M)}}return{sangue(h,f){u("sangue",h,10,f)},impatto(h){u("scintilla",h,5),u("polvere",h,3)},schegge(h){u("legno",h,10)},raggio(h,f,d=8319231){const _=new zt().setFromPoints([h,f]),v=new Wo(_,new ml({color:d,transparent:!0,blending:ys}));i.add(v),r.push({linea:v,vita:wh})},esplosione(h,f="energia",d=null){const _=d??Th[f]??Th.energia;u(f==="fuoco"?"fuoco":"energia",h,f==="fuoco"?30:22,null,_),f==="fuoco"&&u("polvere",h,8),s.color.setHex(_),s.position.copy(h),o=Rh},fiamma(h,f,d){u("fiamma",h,4,f,d,6)},macchia(h,f){const d=a.length>=eA?a.shift():new Pe(c,l);d.position.set(h+(Math.random()-.5)*.4,.012+a.length*1e-4,f+(Math.random()-.5)*.4),d.scale.setScalar(.6+Math.random()*.8),i.add(d),a.push(d)},aggiorna(h){o=Math.max(0,o-h),s.intensity=iA*(o/Rh);for(let f=r.length-1;f>=0;f--){const d=r[f];d.vita-=h,d.linea.material.opacity=Math.max(0,d.vita/wh),!(d.vita>0)&&(i.remove(d.linea),d.linea.geometry.dispose(),d.linea.material.dispose(),r.splice(f,1))}for(let f=n.length-1;f>=0;f--){const d=n[f];if(d.vita+=h,d.vita>=d.durata||d.sprite.position.y<0){d.sprite.visible=!1,n.splice(f,1),t.push(d);continue}d.velocita.y+=d.tipo.gravita*h,d.sprite.position.addScaledVector(d.velocita,h),d.sprite.material.opacity=1-d.vita/d.durata}},svuota(){for(const h of n.splice(0))h.sprite.visible=!1,t.push(h);for(const h of a.splice(0))i.remove(h)}}}const Ch=new L(.11,-.095,-.29),sA=new L(0,-.068,-.24),oA=.05,aA=new L(-.018,-.05,.04),cA=16774084;function lA(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d");e.fillStyle="#ffffff";for(let n=0;n<8;n++){const r=n/8*Math.PI*2;e.beginPath(),e.moveTo(16,16),e.lineTo(16+Math.cos(r)*15,16+Math.sin(r)*15),e.lineTo(16+Math.cos(r+.3)*6,16+Math.sin(r+.3)*6),e.fill()}const t=new Xo(i);return t.magFilter=pt,t}function uA(i){const e=new Jf,t=new Xt(60,1,.01,10);e.add(new fd(13227752,3155484,2.6));const n=new Al(16773328,2);n.position.set(1,2,1),e.add(n);const r=new At;r.add(ES(i));const s=TS(i);r.add(s),e.add(r);const o=new Map,a=new Go(new Rs({map:lA(),blending:ys,transparent:!0,depthTest:!1}));a.scale.setScalar(.18),a.visible=!1,r.add(a);const c=Hi("coltello",i);c.gruppo.visible=!1,e.add(c.gruppo);let l=null,u=0,h=0,f=0;const d=Ch.clone();function _(v){if(l===v)return;if(o.forEach(p=>{p.gruppo.visible=!1}),!o.has(v)){const p=Hi(v,i);r.add(p.gruppo),o.set(v,p)}const m=o.get(v);m.gruppo.visible=!0,a.position.copy(m.bocca),a.material.color.setHex(m.colore??cA),a.scale.setScalar(m.colore?.24:.18),s.visible=!0,s.position.copy(m.presa??aA),l=v}return{scena:e,camera:t,mostra:_,spara(){u=1,h=oA,a.material.rotation=Math.random()*Math.PI},get lampoAcceso(){return h>0},get coloreLampo(){return a.material.color.getHex()},aggiorna({dt:v,movimento:m,mira:p,ricarica:x,cambio:M,coltellata:g,corsa:E}){f+=v*(E?14:9)*m,u=Math.max(0,u-v*9),h=Math.max(0,h-v),a.visible=h>0;const b=p?sA:Ch;d.lerp(b,Math.min(1,v*14));const w=p?.2:1;if(r.position.set(d.x+Math.cos(f)*.012*m*w,d.y+Math.abs(Math.sin(f))*.014*m*w-x*.25-M*.3-(E?.04:0),d.z+u*.05),r.rotation.set(u*.12+x*.8,(E?.5:0)+(p?0:.06),x*.4),c.gruppo.visible=g>0,g>0){const C=1-g;c.gruppo.position.set(.25-C*.45,-.18+Math.sin(C*Math.PI)*.06,-.4),c.gruppo.rotation.set(0,-.6+C*1.4,-.4)}},nascondi(v){r.visible=!v}}}const Ih=3,Ga=395275,Ph=72,hA=52,fA=20,dA=725794,pA=24,mA=40,gA=.01;function Lh(i,e,t,n){const r=new At;n.forEach(o=>r.add(o)),r.position.set(-40,0,0),e.add(r);const s=[];e.traverse(o=>{o.visible||(s.push(o),o.visible=!0)}),i.compile(e,t),s.forEach(o=>{o.visible=!1}),e.remove(r)}const _A=(i,e)=>Gc.some(t=>t.aperto&&i>=t.x0&&i<=t.x1&&e>=t.z0&&e<=t.z1);async function vA(i){const e=new UM({antialias:!1,powerPreference:"high-performance"});e.setPixelRatio(1),e.outputColorSpace=Rt,e.autoClear=!1,i.appendChild(e.domElement);const t=new Jf;t.background=new be(Ga),t.fog=new dl(Ga,3,24),t.add(new fd(8359587,1774863,.55));const n=new Al(7375032,.6);n.position.set(-20,30,-30),t.add(n);const r=new Xt(Ph,1,.05,120);r.rotation.order="YXZ";const s=new dd(16773328,28,24,.45,.55,1.3);s.position.set(.15,-.1,0);const o=new mt;o.position.set(0,0,-1),s.target=o;const a=new xi(16761466,0,9,1.5);r.add(s,o,a),t.add(r);const c=Oy(),[l,u,h,f]=await Promise.all([yS(),OS(),VS(),qS()]),d=SS(c,l),_=IS(t,c,d,f);YS(t,f),KS(t,c,d);const v=ZS(t),m=JS(t),p=zS(t,u),x=rA(t),M=uA(d);M.mostra("pistola"),Lh(e,t,r,[...[...u.values()].map(V=>Fo(V.modello)),...h.map(V=>Fo(V.modello))]),Lh(e,M.scena,M.camera,[]);const g=new Map,E=new Map;let b=0,w=0;function C(){const V=Math.max(1,Math.floor(i.clientWidth/Ih)),P=Math.max(1,Math.floor(i.clientHeight/Ih));e.setSize(V,P,!1),r.aspect=V/P,r.updateProjectionMatrix(),M.camera.aspect=V/P,M.camera.updateProjectionMatrix()}const S=new ResizeObserver(C);S.observe(i),C();function y(V,P,D){const G=new Set;V.giocatori.forEach((R,j)=>{if(R.id===P)return;G.add(R.id),g.has(R.id)||g.set(R.id,HS(t,R.nome,d,h[j%h.length]));const B=E.get(R.id)??R;E.set(R.id,{x:R.x,z:R.z}),g.get(R.id).aggiorna({...R,inMovimento:Math.hypot(R.x-B.x,R.z-B.z)>.5*D},D)});for(const[R,j]of g)G.has(R)||(j.chiudi(),g.delete(R))}function N(V,{io:P,mioId:D,dt:G,arma:R,movimento:j,corsa:B,inMira:K,cannocchiale:Z,ricarica:ce,cambio:xe,coltellata:pe,aTerra:q,morto:ne}){b+=G,w+=G*j*(B?13:9);const Me=q?.45:te.ALTEZZA_OCCHI;r.position.set(P.x,Me+Math.sin(w)*gA*j*(K?0:1),P.z),r.rotation.y=P.yaw+Math.PI,r.rotation.x=P.pitch,r.rotation.z=q?.35:0;const ae=Z?fA:K?hA:Ph;Math.abs(r.fov-ae)>.1&&(r.fov+=(ae-r.fov)*Math.min(1,G*14),r.updateProjectionMatrix()),a.intensity=M.lampoAcceso?14:0,M.lampoAcceso&&a.color.setHex(M.coloreLampo);const we=_A(P.x,P.z),Ne=Math.min(1,G*2);t.fog.far+=((we?mA:pA)-t.fog.far)*Ne,t.fog.color.lerp(new be(we?dA:Ga),Ne),t.background.copy(t.fog.color),_.aggiorna(V,G,b),p.aggiorna(V,G),v.aggiorna(V,G),m.aggiorna(V,G),y(V,D,G),x.aggiorna(G),M.mostra(R),M.nascondi(q||ne||Z),M.aggiorna({dt:G,movimento:j,mira:K,ricarica:ce,cambio:xe,coltellata:pe,corsa:B}),e.clear(),e.render(t,r),e.clearDepth(),e.render(M.scena,M.camera)}return{disegna:N,camera:r,spara:()=>M.spara(),bocca(){return new L(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position)},raggio(V,P){const D=new L(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position);x.raggio(D,new L(V.x,V.y,V.z),P)},campanella:()=>m.suona(),bersagli:V=>p.bersagli(V),effetti:x,svuota(){p.svuota(),x.svuota(),v.svuota();for(const V of g.values())V.chiudi();g.clear(),E.clear()},chiudi(){S.disconnect(),e.dispose(),e.domElement.remove()}}}const Nh=.0022,Oh=1.45,xA=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","Space","KeyR","KeyF","KeyV","KeyQ","Digit1","Digit2","Enter","NumpadEnter"]);function MA(i){const e=new Set,t={dyaw:0,dpitch:0,sparo:!1,sparoPremuto:!1,mira:!1,fPremuto:!1,fRilasciato:!1,azioni:[]};let n=!1,r=()=>{};const s=()=>document.pointerLockElement===i,o=()=>{var p,x;const m=(p=i.requestPointerLock)==null?void 0:p.call(i);(x=m==null?void 0:m.catch)==null||x.call(m,()=>r(!1))};function a(m){!n||!xA.has(m.code)||(m.preventDefault(),!m.repeat&&(e.add(m.code),m.code==="KeyR"?t.azioni.push("ricarica"):m.code==="KeyV"?t.azioni.push("coltello"):m.code==="KeyQ"?t.azioni.push("cambia"):m.code==="Digit1"?t.azioni.push({arma:0}):m.code==="Digit2"?t.azioni.push({arma:1}):m.code==="KeyF"?t.fPremuto=!0:(m.code==="Enter"||m.code==="NumpadEnter")&&t.azioni.push("pronto")))}function c(m){e.delete(m.code),m.code==="KeyF"&&(t.fRilasciato=!0)}function l(m){!n||!s()||(t.dyaw-=m.movementX*Nh,t.dpitch-=m.movementY*Nh)}function u(m){if(n){if(!s()){o();return}m.button===0?(t.sparo=!0,t.sparoPremuto=!0):m.button===2&&(t.mira=!0)}}function h(m){m.button===0?t.sparo=!1:m.button===2&&(t.mira=!1)}function f(m){n&&s()&&t.azioni.push("cambia")}function d(){e.clear(),t.sparo=!1,t.mira=!1,e.has("KeyF")&&(t.fRilasciato=!0)}const _=()=>{s()||d(),r(s())};window.addEventListener("keydown",a),window.addEventListener("keyup",c),window.addEventListener("blur",d),document.addEventListener("mousemove",l),i.addEventListener("mousedown",u),window.addEventListener("mouseup",h),i.addEventListener("wheel",f,{passive:!0}),i.addEventListener("contextmenu",m=>m.preventDefault()),document.addEventListener("pointerlockchange",_);const v=(...m)=>m.some(p=>e.has(p));return{attiva(m){n=m,m||(d(),s()&&document.exitPointerLock())},blocca:o,suBlocco(m){r=m},get bloccato(){return s()},applicaVista(m){m.yaw+=t.dyaw,m.pitch=Math.max(-Oh,Math.min(Oh,m.pitch+t.dpitch)),t.dyaw=0,t.dpitch=0},leggi(){const m={avanti:(v("KeyW","ArrowUp")?1:0)-(v("KeyS","ArrowDown")?1:0),lato:(v("KeyD","ArrowRight")?1:0)-(v("KeyA","ArrowLeft")?1:0),corsa:v("ShiftLeft","ShiftRight"),sparo:t.sparo,sparoPremuto:t.sparoPremuto,mira:t.mira,f:v("KeyF"),fPremuto:t.fPremuto,fRilasciato:t.fRilasciato,azioni:t.azioni.splice(0)};return t.sparoPremuto=!1,t.fPremuto=!1,t.fRilasciato=!1,m}}}const Ht=i=>document.getElementById(i),yA=2200,SA=140;function AA(){const i={radice:Ht("hud"),vignetta:Ht("vignetta"),cannocchiale:Ht("cannocchiale"),mirino:Ht("mirino"),segno:Ht("segno"),round:Ht("round"),punti:Ht("punti"),nomeArma:Ht("nome-arma"),munizioni:Ht("munizioni"),bibite:Ht("bibite"),avviso:Ht("avviso"),suggerimento:Ht("suggerimento"),barra:Ht("barra-rianima"),terra:Ht("stato-terra"),rete:Ht("rete"),clicca:Ht("clicca")},e=document.createElement("div");e.id="sala",e.hidden=!0;const t=document.createElement("div");t.id="effetti",i.radice.append(e,t);let n="",r="",s=0,o=0,a=null,c="";function l(h,f="pericolo"){i.avviso.textContent=h,i.avviso.classList.toggle("bene",f==="bene"),i.avviso.classList.add("visibile"),s=performance.now()+yA}function u(h,f){const d=[...h.giocatori].sort((p,x)=>p.id===f?-1:x.id===f?1:0),_=d.map(p=>`${p.id}:${p.punti}:${p.nome}`).join("|");if(_===c)return;c=_;const v=d.find(p=>p.id===f),m=v&&a!==null&&v.punti>a?v.punti-a:0;if(a=(v==null?void 0:v.punti)??null,i.punti.replaceChildren(...d.map(p=>{const x=document.createElement("div");x.className=p.id===f?"":"altro";const M=document.createElement("span");return M.textContent=p.nome,x.append(M,String(p.punti)),x})),m>0){const p=document.createElement("div");p.className="guadagno",p.textContent=`+${m}`,i.punti.prepend(p)}}return{mostra(h){i.radice.hidden=!h},avviso:l,segno(h){i.segno.classList.add("visibile"),i.segno.classList.toggle("testa",h),o=performance.now()+SA},aggiorna({vista:h,mioId:f,arma:d,suggerimento:_,rianimazione:v,inMira:m,cannocchiale:p,bloccato:x,rete:M,apertura:g}){const E=h.giocatori.find(D=>D.id===f),b=performance.now();b>s&&i.avviso.classList.remove("visibile"),b>o&&i.segno.classList.remove("visibile"),i.round.textContent=h.round>0?String(h.round):"",i.round.classList.toggle("lampeggia",h.fase==="intervallo"&&h.round>0),u(h,f),i.nomeArma.textContent=ct[d.tipo].nome,i.nomeArma.classList.toggle("potenziata",d.tipo.endsWith("+")),i.munizioni.textContent=`${d.caricatore} / ${d.riserva}`,i.munizioni.classList.toggle("poche",d.caricatore<=Math.ceil(ct[d.tipo].caricatore/4));const w=(E==null?void 0:E.bevande)??[];i.bibite.dataset.chiave!==w.join()&&(i.bibite.dataset.chiave=w.join(),i.bibite.replaceChildren(...w.map(D=>{const G=document.createElement("i");return G.style.background=`#${Wi[D].colore.toString(16).padStart(6,"0")}`,G.title=Wi[D].nome,G})));const C=E&&E.stato==="vivo"?1-E.vita/E.vitaMax:E?1:0;i.vignetta.style.opacity=String(Math.min(.9,C*1.1)),i.cannocchiale.hidden=!p,i.mirino.classList.toggle("nascosto",m||(E==null?void 0:E.stato)!=="vivo"),i.mirino.style.setProperty("--apertura",`${g}px`),i.suggerimento.textContent=_??"",i.barra.hidden=v===null,v!==null&&(i.barra.querySelector("i").style.width=`${Math.min(100,v*100)}%`);const S=(E==null?void 0:E.stato)==="terra",y=(E==null?void 0:E.stato)==="morto";i.terra.hidden=!S&&!y,S&&(i.terra.textContent=`SEI A TERRA — ${Math.ceil(E.timerTerra)} s
il tuo amico deve rianimarti`),y&&(i.terra.textContent="SEI MORTO — torni al prossimo round"),i.rete.textContent=M,i.clicca.hidden=x;const N=h.fase==="attesa";if(e.hidden=!N,N){const D=h.conto===null?null:Math.ceil(h.conto),G=`${D}|${h.giocatori.map(R=>`${R.nome}:${R.pronto}`).join()}|${E==null?void 0:E.pronto}`;if(G!==n){n=G;const R=document.createElement("h3");R.textContent=D===null?"SALA D'ATTESA":`SI PARTE TRA ${D}`;const j=h.giocatori.map(K=>{const Z=document.createElement("div");return Z.className=K.pronto?"pronto":"",Z.textContent=`${K.nome} — ${K.pronto?"PRONTO":"si sta preparando"}`,Z}),B=document.createElement("p");B.textContent=E!=null&&E.pronto?"Invio: aspetta, non sono pronto":"Prova le armi al muro (F) · INVIO quando sei pronto",e.replaceChildren(R,...j,B)}}const V=Object.entries(h.effetti??{}).filter(([,D])=>D>0),P=V.map(([D,G])=>`${D}${Math.ceil(G)}`).join();P!==r&&(r=P,t.replaceChildren(...V.map(([D,G])=>{const R=document.createElement("span");return R.style.setProperty("--colore",`#${Tn[D].colore.toString(16).padStart(6,"0")}`),R.textContent=`${Tn[D].simbolo} ${Tn[D].nome} ${Math.ceil(G)}`,R})))}}}const bA=.5,Dh=Object.freeze({pistola:{durata:.18,filtro:1800,volume:.6,botto:110},revolver:{durata:.3,filtro:1300,volume:.85,botto:75},pompa:{durata:.45,filtro:900,volume:1,botto:60},mitra:{durata:.12,filtro:2200,volume:.45,botto:130},assalto:{durata:.16,filtro:1500,volume:.6,botto:90},battaglia:{durata:.22,filtro:1250,volume:.75,botto:80},mitragliatrice:{durata:.2,filtro:1100,volume:.7,botto:70},precisione:{durata:.6,filtro:2600,volume:1,botto:55},aliena:{durata:.3,filtro:3e3,volume:.35,botto:0,raggio:!0}});function EA(){let i=null,e=null,t=null;function n(){if(i){i.state==="suspended"&&i.resume();return}i=new AudioContext,e=i.createGain(),e.gain.value=bA,e.connect(i.destination),t=i.createBuffer(1,i.sampleRate*2,i.sampleRate);const l=t.getChannelData(0);for(let d=0;d<l.length;d++)l[d]=Math.random()*2-1;const u=i.createBufferSource();u.buffer=t,u.loop=!0;const h=i.createBiquadFilter();h.type="lowpass",h.frequency.value=220;const f=i.createGain();f.gain.value=.05,u.connect(h).connect(f).connect(e),u.start()}const r=()=>i&&i.state==="running";function s({durata:l,da:u,a:h=u,tipo:f="lowpass",volume:d=.5,ritardo:_=0,destinazione:v=e}){const m=i.currentTime+_,p=i.createBufferSource();p.buffer=t,p.playbackRate.value=.8+Math.random()*.4;const x=i.createBiquadFilter();x.type=f,x.frequency.setValueAtTime(u,m),x.frequency.exponentialRampToValueAtTime(Math.max(20,h),m+l);const M=i.createGain();M.gain.setValueAtTime(d,m),M.gain.exponentialRampToValueAtTime(.001,m+l),p.connect(x).connect(M).connect(v),p.start(m,Math.random()),p.stop(m+l+.05)}function o(l,{durata:u=.2,tipo:h="sine",volume:f=.2,ritardo:d=0,scendi:_=null,destinazione:v=e}){const m=i.currentTime+d,p=i.createOscillator();p.type=h,p.frequency.setValueAtTime(l,m),_&&p.frequency.exponentialRampToValueAtTime(_,m+u);const x=i.createGain();x.gain.setValueAtTime(f,m),x.gain.exponentialRampToValueAtTime(.001,m+u),p.connect(x).connect(v),p.start(m),p.stop(m+u+.05)}function a(l,u){const h=i.createStereoPanner();h.pan.value=Math.max(-1,Math.min(1,Math.sin(u)));const f=i.createGain();return f.gain.value=Math.max(0,1-l/22),h.connect(f).connect(e),h}const c={vuoto:()=>o(900,{durata:.04,tipo:"square",volume:.12}),ricarica:()=>{o(500,{durata:.05,tipo:"square",volume:.12,ritardo:.05}),o(320,{durata:.06,tipo:"square",volume:.14,ritardo:.35})},coltello:()=>s({durata:.18,da:3e3,a:900,tipo:"bandpass",volume:.5}),carne:()=>{s({durata:.12,da:700,a:200,volume:.6}),o(90,{durata:.1,volume:.25,scendi:50})},testa:()=>{s({durata:.16,da:1200,a:300,volume:.8}),o(1400,{durata:.06,tipo:"triangle",volume:.12})},assaRotta:()=>{s({durata:.3,da:1400,a:300,tipo:"bandpass",volume:.9}),o(120,{durata:.12,volume:.3,scendi:70})},assaMessa:()=>{o(180,{durata:.08,tipo:"square",volume:.25}),o(160,{durata:.08,tipo:"square",volume:.25,ritardo:.16})},porta:()=>{s({durata:1.2,da:400,a:120,volume:.6}),o(55,{durata:1,tipo:"sawtooth",volume:.12})},acquisto:()=>{o(988,{durata:.12,tipo:"triangle",volume:.25}),o(1319,{durata:.3,tipo:"triangle",volume:.25,ritardo:.1})},bevanda:()=>{[523,659,784].forEach((l,u)=>o(l,{durata:.25,tipo:"triangle",volume:.2,ritardo:u*.12}))},cassa:()=>{[880,740,988,659,1175].forEach((l,u)=>o(l,{durata:.4,tipo:"sine",volume:.18,ritardo:u*.22}))},round:()=>{[98,92.5,87.3,73.4].forEach((l,u)=>o(l,{durata:1.1,tipo:"sawtooth",volume:.16,ritardo:u*.55})),s({durata:2.5,da:300,a:60,volume:.3})},fineRound:()=>{[73.4,87.3,110].forEach((l,u)=>o(l,{durata:.9,tipo:"triangle",volume:.18,ritardo:u*.4}))},ferito:()=>{o(70,{durata:.25,volume:.6,scendi:40}),s({durata:.2,da:500,a:150,volume:.5})},aTerra:()=>{o(60,{durata:1.5,tipo:"sawtooth",volume:.25,scendi:30})},rianimato:()=>{o(440,{durata:.3,tipo:"triangle",volume:.2}),o(660,{durata:.5,tipo:"triangle",volume:.2,ritardo:.2})},corrente:()=>{o(60,{durata:.25,tipo:"square",volume:.4}),o(110,{durata:2.2,tipo:"sawtooth",volume:.12,ritardo:.2,scendi:120}),s({durata:.6,da:2e3,a:200,volume:.4})},potenzia:()=>{for(let l=0;l<6;l++)o(220+l*70,{durata:.45,tipo:"sawtooth",volume:.08,ritardo:l*.45});s({durata:3,da:300,a:2e3,tipo:"bandpass",volume:.3})},potenziata:()=>{[392,523,659,1046].forEach((l,u)=>o(l,{durata:.4,tipo:"triangle",volume:.22,ritardo:u*.09}))},conto:()=>o(660,{durata:.15,tipo:"square",volume:.15}),bonusCompare:()=>{[1046,1318].forEach((l,u)=>o(l,{durata:.25,tipo:"sine",volume:.15,ritardo:u*.1}))},bonus:()=>{[523,784,1046,1568].forEach((l,u)=>o(l,{durata:.35,tipo:"triangle",volume:.2,ritardo:u*.08})),s({durata:.8,da:4e3,a:600,tipo:"bandpass",volume:.25})},bomba:()=>{o(45,{durata:2.5,tipo:"sawtooth",volume:.5,scendi:25}),s({durata:2.5,da:1500,a:60,volume:1})},frammento:()=>{[1568,2093,2637].forEach((l,u)=>o(l,{durata:.6,tipo:"sine",volume:.12,ritardo:u*.15}))},segreto:()=>{[262,330,392,523,392,523,659,784,1046].forEach((l,u)=>o(l,{durata:.5,tipo:"triangle",volume:.16,ritardo:u*.18})),s({durata:3,da:200,a:3e3,tipo:"bandpass",volume:.3})},campanella:()=>{for(let l=0;l<6;l++)o(1175,{durata:.5,tipo:"sine",volume:.18,ritardo:l*.16}),o(1760,{durata:.3,tipo:"sine",volume:.08,ritardo:l*.16})},fine:()=>{[196,165,131,98].forEach((l,u)=>o(l,{durata:1.2,tipo:"sawtooth",volume:.18,ritardo:u*.6}))}};return{prepara:n,suona(l){var u;r()&&((u=c[l])==null||u.call(c))},sparo(l,u=0,h=0){var _;if(!r())return;const f=Dh[(_=ct[l])==null?void 0:_.famiglia]??Dh.pistola,d=u>0?a(u,h):e;if(f.raggio){o(1400,{durata:f.durata,tipo:"square",volume:.12,scendi:180,destinazione:d}),o(700,{durata:f.durata*1.4,tipo:"sine",volume:.25,scendi:90,destinazione:d}),s({durata:.5,da:900,a:80,volume:.5,ritardo:.08,destinazione:d});return}s({durata:f.durata,da:f.filtro*2,a:f.filtro*.3,volume:f.volume,destinazione:d}),o(f.botto,{durata:f.durata*.8,volume:f.volume*.6,scendi:f.botto*.4,destinazione:d})},lamento(l,u){if(!r()||l>20)return;const h=a(l,u),f=70+Math.random()*50,d=i.currentTime,_=i.createOscillator();_.type="sawtooth",_.frequency.setValueAtTime(f,d),_.frequency.linearRampToValueAtTime(f*(.7+Math.random()*.5),d+.9);const v=i.createBiquadFilter();v.type="bandpass",v.frequency.value=400+Math.random()*300,v.Q.value=4;const m=i.createGain();m.gain.setValueAtTime(.001,d),m.gain.linearRampToValueAtTime(.35,d+.15),m.gain.exponentialRampToValueAtTime(.001,d+1),_.connect(v).connect(m).connect(h),_.start(d),_.stop(d+1.05)}}}const Tl=new URLSearchParams(location.search),zh=Tl.has("locale"),Uh=Tl.has("riserva"),yd="campanella.nome",TA={diretto:50,riserva:100},wA={diretto:.1,riserva:.22},RA=33,CA=1e3,IA=1e3,PA=1e4,Sd=.25,LA=.5,NA=.05,OA=.3,DA=.3,zA=.12,Fh=40,UA=60,FA=64,BA=1,Ce=i=>document.getElementById(i),kA=["schermata-inizio","schermata-stanza","schermata-fine"].map(Ce),Jo=i=>kA.forEach(e=>{e.hidden=e.id!==i}),St=AA(),Je=EA(),Gi=MA(Ce("mondo"));let Wt=null;const O={mioId:crypto.randomUUID(),nome:null,sonoHost:!1,stanza:null,coll:null,nomeAltro:null,idAltro:null,fase:"inizio",partita:null,semeCorrente:null,buffer:[],scarto:null,ultimoArrivo:0,vista:null,azioniLocali:[],azioniRemote:[],remoto:null,accumulo:0,ultimaIstantanea:0,ultimoInvioG:0,ultimoPing:0,ultimoCiao:0,lobbyRicevuta:!1,ping:null,statoSegnali:null,colpiVisti:new Map},ge={x:0,z:0,yaw:Math.PI,pitch:0,pronto:!1,tp:0,colpi:0,movimento:0,corsa:!1,inMira:!1},et=rf(),Gt={inRianimazione:!1,ultimaAssa:0,ultimoVuoto:0,sparoForzato:!1,ultimoAcquisto:{id:null,quando:0}},Wa=new Map,On=()=>O.coll&&(O.coll.modo==="diretto"||O.coll.modo==="riserva"),Ad=()=>{var i;return((i=O.coll)==null?void 0:i.modo)==="diretto"?"diretto":"riserva"};function wl(i,e){const t=`${e}|${[...i].sort().join(",")}`;if(!Wa.has(t)){const n=e?[...Wc,...Xc,...Xi.filter(r=>!i.has(r.id)).map(r=>r.scatola),...Zn.map($h).filter(Boolean).map(r=>({...r,altezza:2}))]:Yc(i);Wa.set(t,n)}return Wa.get(t)}function VA(){try{return localStorage.getItem(yd)??""}catch{return""}}function HA(i){try{return localStorage.setItem(yd,i),!0}catch{return!1}}function gi(i){var e;O.sonoHost?O.azioniLocali.push({da:O.mioId,...i}):(e=O.coll)==null||e.invia({t:"az",a:i})}function GA(){return!O.coll||!O.idAltro&&O.sonoHost?O.sonoHost?"da solo":"":O.coll.modo==="diretto"?`diretto${O.ping!==null?` · ${O.ping} ms`:""}`:O.coll.modo==="riserva"?`via Supabase${O.ping!==null?` · ${O.ping} ms`:""}`:"collegamento…"}function ps(){var e;const i=Ce("t-stato");Ce("t-codice").textContent=O.stanza,Ce("blocco-link").hidden=!O.sonoHost,Ce("parti").hidden=!O.sonoHost,((e=O.coll)==null?void 0:e.modo)==="occupata"?(i.textContent="Questa stanza ha già due giocatori.",i.dataset.tipo="errore"):O.statoSegnali==="offline"&&!On()?(i.textContent="Il server dei collegamenti non risponde, riprovo…",i.dataset.tipo="errore"):On()&&O.nomeAltro?(i.textContent=`Insieme a ${O.nomeAltro} ${O.coll.modo==="diretto"?"(diretto)":"(via Supabase)"}`,i.dataset.tipo="ok"):(i.textContent=O.sonoHost?"Aspetto il tuo amico… mandagli il link. Puoi anche entrare da solo.":"Mi collego alla stanza…",i.dataset.tipo="attesa"),Ce("parti").textContent=O.nomeAltro&&On()?"Entrate nella scuola":"Entra da solo",Ce("nota-stanza").textContent=O.sonoHost?"Se il tuo amico arriva dopo, entra direttamente nella partita.":O.nomeAltro?`Aspetta che ${O.nomeAltro} apra la scuola.`:""}function bd(){!O.sonoHost||!On()||(O.coll.invia({t:"lobby",nomeHost:O.nome,ospite:O.idAltro}),O.fase==="gioco"&&O.coll.invia({t:"inizia",seme:O.semeCorrente}))}function Ed(i,e){Je.prepara(),O.sonoHost=i,O.stanza=e,O.fase="stanza";const t=sm(e,{locale:zh});t.suStato(r=>{O.statoSegnali=r,ps()}),O.coll=_m({segnali:t,sonoHost:i,mioId:O.mioId,soloRiserva:Uh}),O.coll.suStato(()=>{ps(),On()&&bd()}),O.coll.suMessaggio(WA);const n=[zh?"locale":null,Uh?"riserva":null].filter(Boolean).map(r=>`&${r}`).join("");Ce("link").value=`${location.origin}${location.pathname}?stanza=${e}${n}`,Jo("schermata-stanza"),ps(),i&&Ce("parti").focus()}function Is(i){Ce("errore-inizio").textContent=i}function Td(){const i=xs(Ce("nome").value);return i?(HA(i),O.nome=i,i):(Is("Scrivi il tuo nome: lo vedrà il tuo amico."),Ce("nome").focus(),null)}function wd(i,e=!1){var t;if(O.fase="gioco",O.semeCorrente=i,O.buffer=[],O.scarto=null,O.vista=null,O.accumulo=0,O.azioniLocali=[],O.azioniRemote=[],O.remoto=null,O.colpiVisti.clear(),Ka(et),Object.assign(ge,{pronto:!1,tp:0,colpi:0,pitch:0}),Gt.inRianimazione=!1,Wt.svuota(),O.sonoHost){const n=[{id:O.mioId,nome:O.nome}];O.idAltro&&On()&&n.push({id:O.idAltro,nome:O.nomeAltro}),O.partita=Mp({seme:i,giocatori:n,sala:!0})}Jo(null),St.mostra(!0),Gi.attiva(!0),(t=document.activeElement)==null||t.blur(),e&&Gi.blocca()}function Rd(){if(!O.sonoHost)return;const i=Wd();wd(i,!0),On()&&O.coll.invia({t:"inizia",seme:i})}function Cd(i){O.fase==="gioco"&&(O.fase="fine",Gi.attiva(!1),Je.suona("fine"),Ce("t-dettaglio").textContent=i.round>1?`Siete sopravvissuti fino al round ${i.round}.`:"Non siete andati oltre il primo round.",Ce("t-tabella").replaceChildren(...i.giocatori.map(e=>{const t=document.createElement("div");return t.textContent=`${e.nome} — ${e.uccisioni} zombie, ${e.punti} punti`,t})),Ce("rigioca").hidden=!O.sonoHost,Ce("t-attesa-host").textContent=O.sonoHost?"":`Aspetta che ${O.nomeAltro} faccia ripartire.`,Jo("schermata-fine"),O.sonoHost&&Ce("rigioca").focus())}function Xa(i){var e,t;return((t=(e=O.vista)==null?void 0:e.giocatori.find(n=>n.id===i))==null?void 0:t.nome)??"Il tuo amico"}function Id(i){for(const e of i){const t=e.a===O.mioId;switch(e.k){case"round":Je.suona("round"),St.avviso(`Round ${e.round}`);break;case"fineRound":Je.suona("fineRound");break;case"ucciso":Wt.effetti.macchia(e.x,e.z),e.bomba&&Wt.effetti.esplosione({x:e.x,y:1,z:e.z},"fuoco");break;case"via":Ka(et),Je.suona("round"),St.avviso("Si comincia! Restate vicini","bene");break;case"conto":Je.suona("conto");break;case"contoAnnullato":St.avviso("Partenza annullata: qualcuno non è pronto");break;case"bonusCompare":Je.suona("bonusCompare");break;case"bonus":Je.suona(e.tipo==="bomba"?"bomba":"bonus"),St.avviso(`${Tn[e.tipo].nome} — ${Tn[e.tipo].descrizione}`,"bene"),e.tipo==="munizioni"&&et.armi.forEach(n=>Vl(et,n.tipo));break;case"frammento":Je.suona("frammento"),St.avviso(`Frammento di meteorite ${e.trovati}/${e.totale}`,"bene");break;case"segreto":Je.suona("segreto"),St.avviso("La meteorite si risveglia: avete il Disintegratore!","bene");break;case"campanella":Je.suona("campanella"),Wt.campanella(),e.regalo&&St.avviso("L'ultima campanella vi ha lasciato un regalo…","bene");break;case"assaRotta":Je.suona("assaRotta");break;case"assaMessa":Je.suona("assaMessa");break;case"porta":Je.suona("porta"),St.avviso("Porta aperta","bene");break;case"acquisto":if(!t)break;ap(et,e.armi,e.arma),Je.suona(e.potenziata?"potenziata":"acquisto"),St.avviso(ct[e.arma].nome,"bene");break;case"corrente":Je.suona("corrente"),St.avviso("Corrente accesa!","bene");break;case"potenzia":t&&(Je.suona("potenzia"),St.avviso("Potenziamento in corso…","bene"));break;case"potenziataPronta":t&&St.avviso("Ritira l'arma potenziata!","bene");break;case"munizioni":t&&(Vl(et,e.arma),Je.suona("acquisto"));break;case"bevanda":t&&(Je.suona("bevanda"),St.avviso(Wi[e.bevanda].nome,"bene"));break;case"cassa":t&&(Je.suona("cassa"),St.avviso(`Prendi: ${ct[e.arma].nome}`,"bene"));break;case"ferito":t&&Je.suona("ferito");break;case"aTerra":Je.suona("aTerra"),St.avviso(t?"Sei a terra!":`${Xa(e.a)} è a terra!`);break;case"rianimato":Je.suona("rianimato"),St.avviso(t?"Sei di nuovo in piedi":`${Xa(e.a)} è di nuovo in piedi`,"bene");break;case"morto":St.avviso(t?"Sei morto":`${Xa(e.a)} è morto`);break;case"rinato":t&&Ka(et);break;case"fine":Cd(e);break}}}function WA(i){switch(i.t){case"ciao":if(!O.sonoHost)return;O.nomeAltro=xs(i.nome),O.partita&&O.idAltro&&O.idAltro!==i.id&&ff(O.partita,O.idAltro),O.idAltro=i.id,O.fase==="gioco"&&O.partita&&$c(O.partita,{id:i.id,nome:O.nomeAltro}),bd(),ps();return;case"lobby":if(O.sonoHost)return;O.lobbyRicevuta=i.ospite===O.mioId,O.nomeAltro=xs(i.nomeHost),ps();return;case"inizia":if(O.sonoHost||O.fase==="gioco"&&i.seme===O.semeCorrente)return;wd(i.seme);return;case"g":if(!O.sonoHost)return;Bh(),O.remoto={x:i.x,z:i.z,yaw:i.yaw,pitch:i.pitch,arma:i.arma,colpi:i.colpi,tp:i.tp};return;case"az":if(!O.sonoHost||!O.idAltro)return;if(Bh(),O.azioniRemote.length>=FA){const e=O.azioniRemote.findIndex(t=>t.tipo==="colpo"||t.tipo==="assa");O.azioniRemote.splice(e>=0?e:0,1)}O.azioniRemote.push({...i.a,da:O.idAltro});return;case"st":{if(O.sonoHost||O.fase==="stanza"||i.g!==O.semeCorrente)return;const e=O.buffer[O.buffer.length-1];if(e&&i.ist.t<=e.vista.tempo)return;O.ultimoArrivo=performance.now();const t=i.ist.t-O.ultimoArrivo/1e3,n=O.scarto===null||Math.abs(t-O.scarto)>LA;O.scarto=n?t:O.scarto+(t-O.scarto)*NA,O.buffer.push({vista:xf(i.ist)}),O.buffer.length>Fh&&O.buffer.splice(0,O.buffer.length-Fh);return}case"ev":!O.sonoHost&&O.fase==="gioco"&&Id(i.eventi);return;case"ping":O.sonoHost||O.coll.invia({t:"pong",n:i.n});return;case"pong":O.sonoHost&&(O.ping=Math.round(performance.now()-i.n));return}}function Bh(){O.fase!=="gioco"||!O.partita||!O.idAltro||O.partita.giocatori.some(i=>i.id===O.idAltro)||$c(O.partita,{id:O.idAltro,nome:O.nomeAltro??"Amico"})}function XA(i,e){const t=O.partita;if(O.idAltro&&t.giocatori.some(n=>n.id===O.idAltro)&&O.coll.silenzio()>PA&&ff(t,O.idAltro),O.fase==="gioco"){O.accumulo=Math.min(O.accumulo+i,Sd);const n=[];for(;O.accumulo>=te.PASSO;){const r={};ge.pronto&&(r[O.mioId]={x:ge.x,z:ge.z,yaw:ge.yaw,pitch:ge.pitch,arma:Yt(et).tipo,colpi:ge.colpi,tp:ge.tp}),O.remoto&&O.idAltro&&(r[O.idAltro]=O.remoto);const s=[...O.azioniLocali.splice(0),...O.azioniRemote.splice(0)];n.push(...jp(t,te.PASSO,{posizioni:r,azioni:s})),O.accumulo-=te.PASSO}n.length&&On()&&O.coll.invia({t:"ev",eventi:n}),Id(n)}On()&&e-O.ultimaIstantanea>=TA[Ad()]&&(O.coll.invia({t:"st",g:O.semeCorrente,ist:vf(t)},{veloce:!0}),O.ultimaIstantanea=e)}function jA(i){O.fase!=="gioco"||!ge.pronto||i-O.ultimoInvioG<RA||(O.coll.invia({t:"g",x:ge.x,z:ge.z,yaw:ge.yaw,pitch:ge.pitch,arma:Yt(et).tipo,colpi:ge.colpi,tp:ge.tp},{veloce:!0}),O.ultimoInvioG=i)}let kh=performance.now();function qA(){const i=performance.now(),e=Math.min(Sd,(i-kh)/1e3);kh=i,O.coll&&On()&&(O.sonoHost&&i-O.ultimoPing>CA&&(O.coll.invia({t:"ping",n:i}),O.ultimoPing=i),!O.sonoHost&&!O.lobbyRicevuta&&i-O.ultimoCiao>IA&&(O.coll.invia({t:"ciao",nome:O.nome,id:O.mioId}),O.ultimoCiao=i)),!(O.fase!=="gioco"&&O.fase!=="fine")&&(O.sonoHost&&O.partita?XA(e,i):O.sonoHost||jA(i))}function YA(i){if(O.buffer.length===0||O.scarto===null)return null;const e=i/1e3+O.scarto-wA[Ad()];for(;O.buffer.length>2&&O.buffer[1].vista.tempo<=e;)O.buffer.shift();const[t,n]=O.buffer;return n&&e>t.vista.tempo?Yp(t.vista,n.vista,(e-t.vista.tempo)/Math.max(1e-6,n.vista.tempo-t.vista.tempo)):t.vista}function KA(i,e,t){const n=e.stato==="vivo"&&O.fase==="gioco";ge.inMira=n&&i.mira&&et.ricarica===0,ge.corsa=n&&i.corsa&&i.avanti>0&&!ge.inMira;const r=Math.hypot(i.avanti,i.lato);if(ge.movimento=n&&r>0?1:0,!ge.movimento)return;const s=(ge.corsa?te.VELOCITA_CORSA:te.VELOCITA)*(ge.inMira?.6:1),o=i.avanti/r,a=i.lato/r,c=(Math.sin(ge.yaw)*o-Math.cos(ge.yaw)*a)*s*t,l=(Math.cos(ge.yaw)*o+Math.sin(ge.yaw)*a)*s*t,u=Qh(ge,c,l,te.RAGGIO_GIOCATORE,wl(O.vista.porte,!1));ge.x=u.x,ge.z=u.z}function $A(i,e){ge.colpi+=1,Wt.spara(),Je.sparo(Yt(et).tipo);const t={x:ge.x,y:te.ALTEZZA_OCCHI,z:ge.z},n=tf(ge.yaw,ge.pitch),r=Wt.bersagli(e),s=wl(e.porte,!0),o=new Map;for(let a=0;a<i.pallini;a++){const c=np(n,i.dispersione*(ge.inMira?.4:1)*(ge.movimento?1.6:1),Math.random),l=ef(t,c,r,s,i.portata??(i.esplosione?UA:1/0));if(i.fiamma&&Wt.effetti.fiamma(Wt.bocca(),c,i.colore),!Number.isFinite(l.t))continue;const u={x:t.x+c.x*l.t,y:t.y+c.y*l.t,z:t.z+c.z*l.t};if(i.esplosione){Wt.raggio(u,i.colore??void 0),Wt.effetti.esplosione(u,i.esplosione.tipo,i.esplosione.colore??i.colore??null);for(const{id:f,fattore:d}of tp(u,r,i.esplosione.raggio)){if(f===l.id)continue;const _=o.get(f)??{danno:0,testa:!1};_.danno+=Math.round(i.esplosione.danno*d),o.set(f,_)}}if(l.id===null){Wt.effetti.impatto(u);continue}Wt.effetti.sangue(u,c);const h=o.get(l.id)??{danno:0,testa:!1};h.danno+=l.testa?i.danno*2:i.danno,h.testa||(h.testa=l.testa),o.set(l.id,h)}for(const[a,{danno:c,testa:l}]of o)gi({tipo:"colpo",zombie:a,danno:c,testa:l}),St.segno(l),Je.suona(l?"testa":"carne")}function ZA(i,e,t,n){var a;if(rp(et,n)&&Je.suona("ricarica"),e.stato!=="vivo"||O.fase!=="gioco")return;for(const c of i.azioni)if(c==="pronto")t.fase==="attesa"&&gi({tipo:"pronto",attivo:!e.pronto});else if(c==="ricarica"&&ea(et,e.bevande))Je.suona("ricarica");else if(c==="cambia")kl(et);else if((c==null?void 0:c.arma)!==void 0)kl(et,c.arma);else if(c==="coltello"&&op(et)){Je.suona("coltello");const l=tf(ge.yaw,Math.min(ge.pitch,-.15)),u=ef({x:ge.x,y:te.ALTEZZA_OCCHI,z:ge.z},l,Wt.bersagli(t),wl(t.porte,!0),bo.portata);u.id!==null&&(gi({tipo:"colpo",zombie:u.id,danno:bo.danno,coltello:!0}),Je.suona("carne"),St.segno(!1))}const r=ct[Yt(et).tipo],s=Gt.sparoForzato||(r.automatica?i.sparo:i.sparoPremuto);if(Gt.sparoForzato=!1,!s||ge.corsa)return;if(Yt(et).caricatore===0){!ea(et,e.bevande)&&performance.now()/1e3-Gt.ultimoVuoto>DA&&(Je.suona("vuoto"),Gt.ultimoVuoto=performance.now()/1e3);return}const o=sp(et);o&&(((a=t.effetti)==null?void 0:a.infinite)>0&&(Yt(et).caricatore+=1),$A(o,t),Yt(et).caricatore===0&&ea(et,e.bevande))}function JA(i,e,t){const n=e.stato==="vivo"&&O.fase==="gioco"?lp({id:O.mioId,x:ge.x,z:ge.z,armi:e.armi,bevande:e.bevande,armaAttiva:Yt(et).tipo},t):null;if(Gt.inRianimazione&&(!i.f||(n==null?void 0:n.tipo)!=="rianima")&&(gi({tipo:"rianima",attivo:!1}),Gt.inRianimazione=!1),!n)return null;const r=performance.now()/1e3,s=Gt.ultimoAcquisto.id===n.acquisto&&r-Gt.ultimoAcquisto.quando<BA;return i.fPremuto&&n.tipo==="compra"&&!s&&Number.isFinite(n.costo)&&(n.costo>e.punti?St.avviso("Non hai abbastanza punti"):(gi({tipo:"compra",acquisto:n.acquisto,arma:Yt(et).tipo}),Gt.ultimoAcquisto={id:n.acquisto,quando:r})),i.fPremuto&&(n.tipo==="prova"||n.tipo==="frammento")&&!s&&(gi(n.tipo==="prova"?{tipo:"prova",arma:n.arma}:{tipo:"frammento",id:n.id}),Gt.ultimoAcquisto={id:n.acquisto,quando:r}),i.f&&n.tipo==="rianima"&&!Gt.inRianimazione&&(gi({tipo:"rianima",attivo:!0}),Gt.inRianimazione=!0),i.f&&n.tipo==="assa"&&r-Gt.ultimaAssa>OA&&(gi({tipo:"assa",finestra:n.finestra}),Gt.ultimaAssa=r),n}function QA(i,e){for(const t of i.zombie){if(t.stato==="morto"||Math.random()>e*zA)continue;const n=t.x-ge.x,r=t.z-ge.z;Je.lamento(Math.hypot(n,r),Math.atan2(n,r)-ge.yaw)}for(const t of i.giocatori){if(t.id===O.mioId)continue;const n=O.colpiVisti.get(t.id)??t.colpi;t.colpi>n&&Je.sparo(t.armaAttiva,Math.hypot(t.x-ge.x,t.z-ge.z)+1,Math.atan2(t.x-ge.x,t.z-ge.z)-ge.yaw),O.colpiVisti.set(t.id,t.colpi)}}let Vh=performance.now(),ja=60;function Pd(i){const e=Math.min(.1,(i-Vh)/1e3);if(Vh=i,e>0&&(ja+=(1/e-ja)*.05),(O.fase==="gioco"||O.fase==="fine")&&Wt){const t=O.sonoHost?O.partita?xf(vf(O.partita)):null:YA(i),n=t==null?void 0:t.giocatori.find(r=>r.id===O.mioId);if(t&&n){O.vista=t,(!ge.pronto||n.teletrasporto>ge.tp)&&Object.assign(ge,{x:n.x,z:n.z,yaw:n.yaw,tp:n.teletrasporto,pronto:!0}),t.fase==="fine"&&O.fase==="gioco"&&Cd({round:t.round,giocatori:t.giocatori.map(l=>({nome:l.nome,punti:l.punti,uccisioni:l.uccisioni}))});const r=Gi.leggi();if(Gi.applicaVista(ge),KA(r,n,e),ZA(r,n,t,e),t.fase==="attesa")for(const l of et.armi)l.riserva=ct[l.tipo].riserva;const s=JA(r,n,t);QA(t,e);const o=t.giocatori.find(l=>l.id!==O.mioId&&l.stato==="terra"),a=Yt(et).tipo,c=ge.inMira&&ct[a].mirino===!0;Wt.disegna(t,{io:ge,mioId:O.mioId,dt:e,arma:a,movimento:ge.movimento,corsa:ge.corsa,inMira:ge.inMira,cannocchiale:c,ricarica:et.ricarica>0?Math.sin(Math.min(1,et.ricarica)*Math.PI):0,cambio:et.cambio>0?1:0,coltellata:et.coltello/bo.attesa,aTerra:n.stato==="terra",morto:n.stato==="morto"}),St.aggiorna({vista:t,mioId:O.mioId,arma:Yt(et),suggerimento:(s==null?void 0:s.testo)??null,rianimazione:Gt.inRianimazione&&o?o.progressoRianimazione/(n.bevande.includes("ritorno")?te.RIANIMA_RAPIDO:te.RIANIMA_IN):null,inMira:ge.inMira,cannocchiale:c,bloccato:Gi.bloccato||O.fase!=="gioco",rete:[GA(),`${Math.round(ja)} fps`].filter(Boolean).join(" · "),apertura:6+(ge.movimento?6:0)+(ge.corsa?8:0)-(ge.inMira?4:0)})}}requestAnimationFrame(Pd)}Ce("crea").addEventListener("click",()=>{Td()&&Ed(!0,cm())});Ce("entra").addEventListener("click",()=>{if(!Td())return;const i=yf(Ce("codice").value);if(!i){Is("Il codice ha 4 lettere (es. KXRT)."),Ce("codice").focus();return}Ed(!1,i)});Ce("modulo-inizio").addEventListener("submit",i=>i.preventDefault());Ce("nome").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("crea").disabled||(i.preventDefault(),(Ce("codice").value.trim()?Ce("entra"):Ce("crea")).click())});Ce("codice").addEventListener("keydown",i=>{i.key!=="Enter"||Ce("entra").disabled||(i.preventDefault(),Ce("entra").click())});Ce("codice").addEventListener("input",()=>Is(""));Ce("nome").addEventListener("input",()=>Is(""));Ce("copia").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(Ce("link").value),Ce("copia").textContent="Copiato!"}catch{Ce("link").select(),Ce("copia").textContent="Premi Ctrl+C"}});Ce("parti").addEventListener("click",Rd);Ce("rigioca").addEventListener("click",Rd);Gi.suBlocco(i=>{i&&Je.prepara()});Ce("nome").value=VA();const Hh=yf(Tl.get("stanza"));Hh&&(Ce("codice").value=Hh,Ce("crea").classList.remove("primario"),Ce("entra").classList.add("primario"));Jo("schermata-inizio");Ce("nome").focus();requestAnimationFrame(Pd);const eb=new Worker(new URL(""+new URL("orologio-worker-CqtP_hGM.js",import.meta.url).href,import.meta.url));eb.onmessage=qA;vA(Ce("mondo")).then(i=>{Wt=i,Ce("crea").disabled=!1,Ce("crea").textContent="Crea una stanza",Ce("entra").disabled=!1}).catch(i=>{console.error("Caricamento della grafica non riuscito:",i),Is("Non riesco a caricare la grafica del gioco. Ricarica la pagina."),Ce("crea").textContent="Errore"});
