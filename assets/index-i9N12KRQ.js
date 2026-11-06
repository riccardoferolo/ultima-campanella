(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const $=Object.freeze({PASSO:1/60,ALTEZZA_OCCHI:1.6,RAGGIO_GIOCATORE:.35,RAGGIO_ZOMBIE:.35,VELOCITA:4.2,VELOCITA_CORSA:6.2,PUNTI_INIZIALI:500,PUNTI_COLPO:10,PUNTI_UCCISIONE:60,PUNTI_TESTA:100,PUNTI_COLTELLO:130,PUNTI_ASSA:10,VITA:100,VITA_FERRO:250,RIGENERA_DOPO:4,RIGENERA_AL_SECONDO:60,DANNO_ZOMBIE:45,PORTATA_ZOMBIE:1.15,ATTESA_ATTACCO:1.4,TEMPO_A_TERRA:30,RIANIMA_IN:4,RIANIMA_RAPIDO:1.5,RIANIMA_DISTANZA:1.8,ASSE_PER_FINESTRA:6,ROMPI_ASSE_OGNI:1.5,RICOSTRUISCI_OGNI:.8,DISTANZA_FINESTRA:2.2,SCAVALCA:.9,ZOMBIE_VIVI_MAX:20,INTERVALLO:10,VELOCITA_CAMMINA:1.1,VELOCITA_CORRE:3.6,DISTANZA_ACQUISTO:2,COSTO_CASSA:950,DURATA_CASSA:8,COSTO_POTENZIA:5e3,DURATA_POTENZIA:3,ATTESA_RITIRO:10,CONTO_ALLA_ROVESCIA:5,PRIMO_ROUND_TRA:3,PROBABILITA_BONUS:.035,BONUS_PER_ROUND:4,DURATA_BONUS_A_TERRA:25,DISTANZA_BONUS:1.3,PUNTI_BOMBA:400,PUNTI_CARPENTIERE:200,COSTO_CASSA_SALDI:10,DISTANZA_FRAMMENTO:1.6,PUNTI_SEGRETO:1e3,GRANATE_INIZIALI:2,GRANATE_PER_ROUND:2,GRANATE_MASSIME:4,MICCIA_GRANATA:2.2,RAGGIO_GRANATA:4.5,VELOCITA_LANCIO:13,SPINTA_LANCIO:3,GRAVITA:14,OGNI_PRESIDE:5,PRESIDE_DOPO:6,PUNTI_BOSS:500,DISTANZA_FUSIBILE:1.6,FUSIBILI:3,DURATA_GENERATORE:75,DISTANZA_GENERATORE:7,PUNTI_FUSIBILE:250,VITA_CUSTODE:3e4,VELOCITA_SCATTO:7,DURATA_SCATTO:1.4,RINFORZI_FINALE_MAX:10,PUNTI_VITTORIA:5e3}),$e=i=>Object.freeze({pallini:1,dispersione:.02,automatica:!1,...i}),gn=(i,e,t,n=null)=>Object.freeze({raggio:i,danno:e,tipo:t,colore:n}),dn=i=>$e({famiglia:"aliena",aliena:!0,...i}),Ms=Object.freeze({pistola:$e({nome:"Pistola P9",famiglia:"pistola",modello:"Pistol_1",danno:40,cadenza:.22,caricatore:8,riserva:48,ricarica:1.4,dispersione:.004}),pistolaAuto:$e({nome:"Pistola automatica R-18",famiglia:"pistola",modello:"Pistol_2",danno:34,cadenza:.06,automatica:!0,caricatore:20,riserva:120,ricarica:1.8,dispersione:.03}),tattica:$e({nome:"Pistola tattica T-40",famiglia:"pistola",modello:"Pistol_3",danno:55,cadenza:.18,caricatore:12,riserva:72,ricarica:1.5,dispersione:.005}),raffica:$e({nome:"Pistola a raffica R-93",famiglia:"pistola",modello:"Pistol_4",danno:38,cadenza:.05,automatica:!0,caricatore:30,riserva:150,ricarica:2,dispersione:.035}),pesante:$e({nome:"Pistola pesante .45",famiglia:"pistola",modello:"Pistol_5",danno:80,cadenza:.25,caricatore:8,riserva:56,ricarica:1.6,dispersione:.006}),aquila:$e({nome:"Pistola Aquila .50",famiglia:"pistola",modello:"Pistol_6",danno:140,cadenza:.35,caricatore:7,riserva:42,ricarica:2.2,dispersione:.008}),magnum:$e({nome:"Revolver .357",famiglia:"revolver",modello:"Revolver_1",danno:160,cadenza:.45,caricatore:6,riserva:36,ricarica:3,dispersione:.006}),ufficiale:$e({nome:"Revolver d'ordinanza",famiglia:"revolver",modello:"Revolver_2",danno:130,cadenza:.4,caricatore:6,riserva:42,ricarica:2.8,dispersione:.007}),cannaLunga:$e({nome:"Revolver canna lunga",famiglia:"revolver",modello:"Revolver_3",danno:210,cadenza:.55,caricatore:6,riserva:36,ricarica:3.1,dispersione:.004}),toro:$e({nome:"Revolver Toro .500",famiglia:"revolver",modello:"Revolver_4",danno:260,cadenza:.6,caricatore:5,riserva:30,ricarica:3.2,dispersione:.008}),sceriffo:$e({nome:"Revolver dello sceriffo",famiglia:"revolver",modello:"Revolver_5",danno:120,cadenza:.3,caricatore:6,riserva:48,ricarica:2.6,dispersione:.009}),mitra:$e({nome:"Mitra MK-5",famiglia:"mitra",modello:"SubmachineGun_1",danno:32,cadenza:.075,automatica:!0,caricatore:30,riserva:150,ricarica:2.2,dispersione:.03}),scorpione:$e({nome:"Mitra Scorpione",famiglia:"mitra",modello:"SubmachineGun_2",danno:26,cadenza:.05,automatica:!0,caricatore:20,riserva:140,ricarica:1.7,dispersione:.045}),vettore:$e({nome:"Mitra Vettore",famiglia:"mitra",modello:"SubmachineGun_3",danno:30,cadenza:.05,automatica:!0,caricatore:25,riserva:150,ricarica:2.1,dispersione:.025}),mitraglietta:$e({nome:"Mitraglietta U-9",famiglia:"mitra",modello:"SubmachineGun_4",danno:28,cadenza:.055,automatica:!0,caricatore:32,riserva:160,ricarica:2,dispersione:.04}),p50:$e({nome:"Mitra P-50",famiglia:"mitra",modello:"SubmachineGun_5",danno:34,cadenza:.065,automatica:!0,caricatore:50,riserva:200,ricarica:3,dispersione:.028}),assalto:$e({nome:"Fucile d'assalto KV-47",famiglia:"assalto",modello:"AssaultRifle_2",danno:60,cadenza:.1,automatica:!0,caricatore:30,riserva:150,ricarica:2.4,dispersione:.018}),kvCorto:$e({nome:"KV-47 corto",famiglia:"assalto",modello:"AssaultRifle_1",danno:52,cadenza:.085,automatica:!0,caricatore:30,riserva:150,ricarica:2.1,dispersione:.026}),galil:$e({nome:"Fucile G-35",famiglia:"assalto",modello:"AssaultRifle_3",danno:58,cadenza:.09,automatica:!0,caricatore:35,riserva:175,ricarica:2.6,dispersione:.02}),battaglia:$e({nome:"Fucile da battaglia S-17",famiglia:"battaglia",modello:"AssaultRifle_4",danno:85,cadenza:.12,automatica:!0,caricatore:20,riserva:120,ricarica:2.5,dispersione:.016}),kv74:$e({nome:"Fucile KV-74",famiglia:"assalto",modello:"AssaultRifle_5",danno:55,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.3,dispersione:.015}),carabina:$e({nome:"Carabina M-4",famiglia:"assalto",modello:"AssaultRifle2_1",danno:50,cadenza:.08,automatica:!0,caricatore:30,riserva:180,ricarica:2.2,dispersione:.014}),tiratore:$e({nome:"Fucile da tiratore MR-16",famiglia:"battaglia",modello:"AssaultRifle2_2",danno:120,cadenza:.18,caricatore:20,riserva:120,ricarica:2.4,dispersione:.006}),commando:$e({nome:"Carabina Commando",famiglia:"assalto",modello:"AssaultRifle2_3",danno:46,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2,dispersione:.022}),m4corta:$e({nome:"Carabina corta M-4C",famiglia:"assalto",modello:"AssaultRifle2_4",danno:48,cadenza:.075,automatica:!0,caricatore:30,riserva:180,ricarica:2.1,dispersione:.018}),bullpup:$e({nome:"Fucile bullpup F-2000",famiglia:"assalto",modello:"Bullpup_1",danno:48,cadenza:.07,automatica:!0,caricatore:30,riserva:180,ricarica:2.5,dispersione:.016}),fam3:$e({nome:"Fucile Fam-3",famiglia:"assalto",modello:"Bullpup_2",danno:45,cadenza:.06,automatica:!0,caricatore:25,riserva:175,ricarica:2.4,dispersione:.02}),mitragliatrice:$e({nome:"Mitragliatrice HM-6",famiglia:"mitragliatrice",modello:"Bullpup_3",danno:55,cadenza:.07,automatica:!0,caricatore:100,riserva:300,ricarica:4,dispersione:.035}),pompa:$e({nome:"Fucile a pompa 870",famiglia:"pompa",modello:"Shotgun_1",danno:35,cadenza:.85,caricatore:6,riserva:36,ricarica:3,pallini:8,dispersione:.07}),sp12:$e({nome:"Fucile SP-12",famiglia:"pompa",modello:"Shotgun_2",danno:32,cadenza:.3,caricatore:8,riserva:48,ricarica:3.2,pallini:8,dispersione:.075}),aa12:$e({nome:"Fucile automatico AA-12",famiglia:"pompa",modello:"Shotgun_3",danno:28,cadenza:.2,automatica:!0,caricatore:20,riserva:80,ricarica:3.5,pallini:6,dispersione:.08}),caccia:$e({nome:"Fucile da caccia",famiglia:"pompa",modello:"Shotgun_4",danno:38,cadenza:.6,caricatore:7,riserva:42,ricarica:2.8,pallini:7,dispersione:.06}),doppietta:$e({nome:"Doppietta a canne mozze",famiglia:"pompa",modello:"Shotgun_SawedOff",danno:40,cadenza:.25,caricatore:2,riserva:40,ricarica:2.2,pallini:10,dispersione:.1}),sfondamento:$e({nome:"Pompa da sfondamento",famiglia:"pompa",modello:"Shotgun_ShortStock",danno:42,cadenza:.7,caricatore:5,riserva:35,ricarica:2.6,pallini:8,dispersione:.09}),precisione:$e({nome:"Precisione L-96",famiglia:"precisione",modello:"SniperRifle_1",danno:500,cadenza:1.2,caricatore:5,riserva:30,ricarica:3,dispersione:0,mirino:!0}),dsv:$e({nome:"Precisione semiauto D-SV",famiglia:"precisione",modello:"SniperRifle_2",danno:300,cadenza:.4,caricatore:10,riserva:50,ricarica:2.8,dispersione:0,mirino:!0}),anticarro:$e({nome:"Anticarro .50 B-82",famiglia:"precisione",modello:"SniperRifle_3",danno:900,cadenza:1,caricatore:10,riserva:40,ricarica:3.6,dispersione:0,mirino:!0}),notturno:$e({nome:"Precisione notturna N-7",famiglia:"precisione",modello:"SniperRifle_4",danno:420,cadenza:.9,caricatore:6,riserva:36,ricarica:2.9,dispersione:0,mirino:!0}),bipiede:$e({nome:"Precisione col bipiede M-24",famiglia:"precisione",modello:"SniperRifle_5",danno:650,cadenza:1.3,caricatore:5,riserva:30,ricarica:3.2,dispersione:0,mirino:!0}),cacciatore:$e({nome:"Carabina del cacciatore",famiglia:"precisione",modello:"SniperRifle_6",danno:360,cadenza:.8,caricatore:5,riserva:40,ricarica:2.6,dispersione:0,mirino:!0}),raggi:dn({nome:"Pistola a raggi",modello:"Gun_Pistol",colore:4777471,danno:600,cadenza:.35,caricatore:20,riserva:160,ricarica:2.6,dispersione:.006,esplosione:gn(1.8,400,"energia")}),plasma:dn({nome:"Pistola al plasma",modello:"Gun_Pistol",colore:6160234,danno:140,cadenza:.09,automatica:!0,caricatore:40,riserva:240,ricarica:2.2,dispersione:.02,esplosione:gn(.9,80,"energia")}),gravitonica:dn({nome:"Pistola gravitonica",modello:"Gun_Pistol",colore:11560703,danno:900,cadenza:.7,caricatore:8,riserva:64,ricarica:2.8,dispersione:.004,esplosione:gn(2.6,700,"energia")}),ioni:dn({nome:"Revolver a ioni",modello:"Gun_Revolver",colore:16767050,danno:1100,cadenza:.5,caricatore:6,riserva:48,ricarica:2.6,dispersione:.004,esplosione:gn(1.2,300,"energia")}),fulmine:dn({nome:"Spara-fulmini",modello:"Gun_Revolver",colore:12577023,danno:800,cadenza:.8,caricatore:8,riserva:40,ricarica:3,dispersione:.004,esplosione:gn(5,600,"fulmine")}),impulsi:dn({nome:"Revolver a impulsi",modello:"Gun_Revolver",colore:16732120,danno:450,cadenza:.25,caricatore:12,riserva:96,ricarica:2.4,dispersione:.01,esplosione:gn(1.5,250,"energia")}),fucilePlasma:dn({nome:"Fucile al plasma",modello:"Gun_Rifle",colore:4063115,danno:180,cadenza:.08,automatica:!0,caricatore:50,riserva:300,ricarica:2.8,dispersione:.018,esplosione:gn(1,110,"energia")}),lanciafiamme:dn({nome:"Fiammatore stellare",modello:"Gun_Rifle",colore:16742938,danno:30,cadenza:.05,automatica:!0,caricatore:100,riserva:300,ricarica:3.5,pallini:5,dispersione:.15,portata:7,fiamma:!0}),lanciagranate:dn({nome:"Lancia-sfere",modello:"Gun_Rifle",colore:16727976,danno:300,cadenza:.9,caricatore:4,riserva:32,ricarica:2.5,dispersione:.01,esplosione:gn(3,900,"fuoco",16727976)}),lanciarazzi:dn({nome:"Cannone a particelle",modello:"Gun_Sniper",colore:16724016,danno:500,cadenza:1.2,caricatore:3,riserva:18,ricarica:3,dispersione:.006,esplosione:gn(3.5,1400,"fuoco")}),laser:dn({nome:"Precisione al laser",modello:"Gun_Sniper",colore:5232895,danno:1600,cadenza:.6,caricatore:8,riserva:48,ricarica:2.8,dispersione:0,mirino:!0,esplosione:gn(.8,300,"energia")}),disintegratore:dn({nome:"Disintegratore",modello:"Gun_Sniper",colore:14725375,danno:700,cadenza:.1,automatica:!0,caricatore:60,riserva:360,ricarica:3,dispersione:.01,esplosione:gn(2,500,"energia"),segreta:!0})}),Kd=Object.freeze({pistola:"Pistola Rovente",pompa:"Pompa Tempesta",mitra:"Mitra Vespa",assalto:"Assalto Lupo",mitragliatrice:"Mitragliatrice Tuono",precisione:"Precisione Falco",raggi:"Raggi Supernova",disintegratore:"Fine del Mondo"}),jl=Object.freeze(["Furia","Spettro","Cobra","Drago","Valanga","Inferno","Tempesta","Lupo","Falco","Vespa","Uragano","Tuono","Vipera"]);function Zd(i,e,t){return Object.freeze({...i,nome:Kd[e]??`${i.nome} ${jl[t%jl.length]}`,danno:i.danno*2,caricatore:Math.round(i.caricatore*1.5),riserva:i.riserva*2,ricarica:i.ricarica*.85,esplosione:i.esplosione?gn(i.esplosione.raggio*1.4,i.esplosione.danno*2,i.esplosione.tipo,i.esplosione.colore):void 0,potenziata:!0,base:e})}const Tt=Object.freeze({...Ms,...Object.fromEntries(Object.entries(Ms).map(([i,e],t)=>[`${i}+`,Zd(e,i,t)]))}),Jd=Object.freeze(Object.keys(Ms)),nh=i=>i.endsWith("+")?null:`${i}+`,Ss=i=>i.endsWith("+")?i.slice(0,-1):i,Oo=Object.freeze({danno:150,attesa:.6,portata:1.6}),Qd=Object.freeze({pistola:1,revolver:.9,mitra:1,assalto:1,battaglia:.8,mitragliatrice:.6,pompa:.9,precisione:.7,aliena:.35}),ih=Object.freeze(Jd.filter(i=>i!=="pistola"&&!Ms[i].segreta)),ql=Object.freeze(Object.fromEntries(ih.map(i=>[i,Qd[Ms[i].famiglia]]))),Zi=Object.freeze({ferro:Object.freeze({nome:"Bibita Ferro",descrizione:"più vita",costo:2500,colore:12597547}),lampo:Object.freeze({nome:"Bibita Lampo",descrizione:"ricarica veloce",costo:2e3,colore:2600544}),ritorno:Object.freeze({nome:"Bibita Ritorno",descrizione:"rianimi in fretta",costo:1500,colore:3049182})}),Pr=Object.freeze({normale:Object.freeze({nome:"Zombie",vita:1,velocita:1,danno:1,portata:1,punti:1}),magro:Object.freeze({nome:"Scuoiato",vita:.7,velocita:1.15,danno:1.1,portata:1.05,punti:1.2,corre:!0}),preside:Object.freeze({nome:"Il Preside",vita:12,velocita:.85,danno:1.6,portata:1.3,punti:8,boss:!0,carica:1.4,rompe:3,infuria:.5}),custode:Object.freeze({nome:"Il Custode",vita:1,velocita:.9,danno:1.9,portata:1.6,punti:20,boss:!0,finale:!0,carica:1.6,attesa:.9})}),rh=Object.freeze(Object.keys(Pr));function ep(i){return{normale:1,magro:i>=2?.25+Math.min(.35,(i-2)*.04):0}}function tp(i,e){const t=Object.entries(ep(i)).filter(([,r])=>r>0);let n=e*t.reduce((r,[,s])=>r+s,0);for(const[r,s]of t)if(n-=s,n<0)return r;return t[t.length-1][0]}const Pn=Object.freeze({bomba:Object.freeze({nome:"Bomba!",descrizione:"tutti gli zombie saltano in aria",colore:16738858,simbolo:"BOOM"}),munizioni:Object.freeze({nome:"Munizioni al massimo",descrizione:"tutte le armi cariche",colore:10215773,simbolo:"MAX"}),doppi:Object.freeze({nome:"Punti doppi",descrizione:"per 30 secondi",colore:16767050,simbolo:"x2",durata:30}),secco:Object.freeze({nome:"Colpo secco",descrizione:"ogni colpo uccide, 30 secondi",colore:15921906,simbolo:"☠",durata:30}),saldi:Object.freeze({nome:"Saldi!",descrizione:"la cassa costa 10 punti, 30 secondi",colore:5227519,simbolo:"%",durata:30}),carpentiere:Object.freeze({nome:"Carpentiere",descrizione:"tutte le finestre riparate",colore:12749646,simbolo:"⚒"}),infinite:Object.freeze({nome:"Caricatore infinito",descrizione:"niente ricarica per 30 secondi",colore:16732120,simbolo:"∞",durata:30})}),kn=Object.freeze(Object.keys(Pn)),sh=Object.freeze(kn.filter(i=>Pn[i].durata));function np(i){return 6+3*(i-1)}function oh(i){return i<10?150+100*(i-1):Math.round(950*1.1**(i-9))}function ip(i){return i<=2?0:i===3?.25:i===4?.5:i<8?.8:1}function rp(i){return Math.round(oh(Math.max(1,i))*1.25)}function ah(i){return i>=2?1.7:1}function Jc(i){return i>2/3?1:i>1/3?2:3}function sp(i){return Math.max(.6,2-(i-1)*.15)}function ch(i){const e=i+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),[((t^t>>>14)>>>0)/4294967296,e]}function op(){return Math.floor(Math.random()*4294967296)>>>0}const No=.3,Vn=3.2,Ps=Object.freeze([Object.freeze({id:"atrio",nome:"Atrio",x0:-8,z0:-6,x1:8,z1:6,pavimento:"piastrelle"}),Object.freeze({id:"corridoio",nome:"Corridoio",x0:-2,z0:6,x1:2,z1:22,pavimento:"piastrelle"}),Object.freeze({id:"palestra",nome:"Palestra",x0:8,z0:-8,x1:24,z1:8,pavimento:"parquet"}),Object.freeze({id:"mensa",nome:"Mensa",x0:-16,z0:10,x1:-2,z1:24,pavimento:"linoleum"}),Object.freeze({id:"laboratorio",nome:"Laboratorio",x0:-2,z0:22,x1:8,z1:32,pavimento:"piastrelle"}),Object.freeze({id:"caldaia",nome:"Caldaia",x0:18,z0:-16,x1:26,z1:-8,pavimento:"cemento"}),Object.freeze({id:"cortile",nome:"Cortile",x0:8,z0:8,x1:26,z1:30,pavimento:"asfalto",aperto:!0}),Object.freeze({id:"androne",nome:"Androne",x0:-2,z0:-22,x1:2,z1:-6,pavimento:"linoleum"}),Object.freeze({id:"aula",nome:"Aula magna",x0:-12,z0:-38,x1:12,z1:-22,pavimento:"parquet"}),Object.freeze({id:"biblioteca",nome:"Biblioteca",x0:-26,z0:-38,x1:-12,z1:-24,pavimento:"parquet"}),Object.freeze({id:"campo",nome:"Campo sportivo",x0:12,z0:-42,x1:32,z1:-22,pavimento:"terra",aperto:!0}),Object.freeze({id:"rifugio",nome:"Rifugio antiaereo",x0:-12,z0:-54,x1:12,z1:-38,pavimento:"cemento"}),Object.freeze({id:"sala",nome:"Sala d'attesa",x0:-48,z0:-5,x1:-28,z1:5,pavimento:"parquet",sala:!0})]),Ci=Object.freeze({x0:-27,z0:-55,x1:33,z1:34}),ke=(i,e,t)=>({x0:e,z0:i-No/2,x1:t,z1:i+No/2}),He=(i,e,t)=>({x0:i-No/2,z0:e,x1:i+No/2,z1:t}),Qc=Object.freeze([ke(-6,-8,-5),ke(-6,-3,-1),ke(-6,1,3),ke(-6,5,8),He(-8,-6,-1),He(-8,1,6),ke(6,-8,-1),ke(6,1,8),He(8,-8,-1),He(8,1,8),He(-2,6,13),He(-2,15,22),He(2,6,13),He(2,15,22),ke(22,-2,-1),ke(22,1,8),ke(-8,8,15),ke(-8,17,20),ke(-8,22,24),He(24,-8,-4),He(24,-2,3),He(24,5,8),ke(8,8,10),ke(8,12,24),ke(10,-16,-12),ke(10,-10,-2),He(-16,10,15),He(-16,17,24),ke(24,-16,-10),ke(24,-8,-2),He(-2,22,24),He(-2,24,27),He(-2,29,32),He(8,22,32),ke(32,-2,0),ke(32,2,8),He(18,-16,-8),ke(-8,24,26),He(26,-16,-13),He(26,-11,-8),ke(-16,18,21),ke(-16,23,26),ke(-5,-48,-28),ke(5,-48,-28),He(-48,-5,5),He(-28,-5,5),He(-2,-22,-16),He(-2,-14,-6),He(2,-22,-6),ke(-22,-12,-8),ke(-22,-6,-1),ke(-22,1,6),ke(-22,8,12),He(-12,-38,-31),He(-12,-29,-22),He(12,-38,-31),He(12,-29,-22),ke(-38,-12,-1.5),ke(-38,1.5,12),ke(-24,-26,-20),ke(-24,-18,-12),He(-26,-38,-33),He(-26,-31,-24),ke(-38,-26,-12),He(-12,-54,-48),He(-12,-46,-38),He(12,-54,-48),He(12,-46,-38),ke(-54,-12,12)].map(Object.freeze)),lh=Object.freeze([He(8,8,22),ke(30,8,16),ke(30,18,26),He(26,8,18),He(26,20,30),ke(8,24,26),ke(-22,12,32),He(32,-42,-34),He(32,-32,-22),ke(-42,12,21),ke(-42,23,32)].map(Object.freeze)),ks=2.6,el=Object.freeze([Object.freeze({x0:18,z0:5.2,x1:22.5,z1:7.8,altezza:1.2,tipo:"tribuna"}),Object.freeze({x0:11.5,z0:-3,x1:13,z1:-2,altezza:.9,tipo:"cavallina"}),Object.freeze({x0:-6.5,z0:1.5,x1:-4.5,z1:2.5,altezza:.8,tipo:"banco"}),Object.freeze({x0:-14,z0:12.5,x1:-10,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:12.5,x1:-4,z1:13.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:16.5,x1:-10,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-8,z0:16.5,x1:-4,z1:17.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-14,z0:20.5,x1:-10,z1:21.5,altezza:.75,tipo:"tavolo"}),Object.freeze({x0:-15.6,z0:22.6,x1:-11,z1:23.6,altezza:1.1,tipo:"bancone"}),Object.freeze({x0:0,z0:25,x1:2.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:4,z0:25,x1:6.5,z1:26,altezza:.95,tipo:"bancone"}),Object.freeze({x0:0,z0:29,x1:2.5,z1:30,altezza:.95,tipo:"bancone"}),Object.freeze({x0:18.9,z0:-14,x1:21.2,z1:-11.8,altezza:2.6,tipo:"caldaia"}),Object.freeze({x0:19,z0:22,x1:24.5,z1:24.6,altezza:2.8,tipo:"pulmino"}),Object.freeze({x0:11.2,z0:16.2,x1:11.8,z1:16.8,altezza:4,tipo:"albero"}),Object.freeze({x0:21.7,z0:13.2,x1:22.3,z1:13.8,altezza:4,tipo:"albero"}),Object.freeze({x0:12.2,z0:26.2,x1:12.8,z1:26.8,altezza:4,tipo:"albero"}),Object.freeze({x0:15,z0:11.6,x1:17.5,z1:12.1,altezza:.5,tipo:"panchina"}),Object.freeze({x0:9.2,z0:20,x1:9.7,z1:22.5,altezza:.5,tipo:"panchina"}),Object.freeze({x0:16.85,z0:19.85,x1:17.15,z1:20.15,altezza:3,tipo:"lampione"}),Object.freeze({x0:10.35,z0:27.35,x1:10.65,z1:27.65,altezza:3,tipo:"lampione"}),Object.freeze({x0:-23,z0:-28.3,x1:-16,z1:-27.7,altezza:2.2,tipo:"scaffale"}),Object.freeze({x0:-23,z0:-32.3,x1:-16,z1:-31.7,altezza:2.2,tipo:"scaffale"}),Object.freeze({x0:-23,z0:-36.3,x1:-16,z1:-35.7,altezza:2.2,tipo:"scaffale"}),Object.freeze({x0:-15,z0:-26.5,x1:-13,z1:-25.5,altezza:.8,tipo:"banco"}),...[-27,-30,-33].flatMap(i=>[Object.freeze({x0:-9.5,z0:i-.3,x1:-2.5,z1:i+.3,altezza:.9,tipo:"fila"}),Object.freeze({x0:2.5,z0:i-.3,x1:9.5,z1:i+.3,altezza:.9,tipo:"fila"})]),...[[-5,-43],[5,-43],[-5,-49],[5,-49]].map(([i,e])=>Object.freeze({x0:i-.4,z0:e-.4,x1:i+.4,z1:e+.4,altezza:Vn,tipo:"pilastro"})),Object.freeze({x0:23.2,z0:-35,x1:24.8,z1:-33.8,altezza:1.3,tipo:"generatore"}),Object.freeze({x0:14,z0:-24.6,x1:20,z1:-22.3,altezza:1.2,tipo:"tribuna"}),Object.freeze({x0:22.85,z0:-26.15,x1:23.15,z1:-25.85,altezza:3,tipo:"lampione"})]);function yt(i,e,t,n,r,s,o,a=!1){const c=t==="z"?{x:(r+s)/2,z:n}:{x:n,z:(r+s)/2},l=t==="z"?ke(n,r,s):He(n,r,s),u=t==="z"?{x:0,z:o}:{x:o,z:0};return Object.freeze({id:i,zona:e,asse:t,centro:Object.freeze(c),scatola:Object.freeze(l),esterno:Object.freeze({x:c.x+u.x*1.1,z:c.z+u.z*1.1}),interno:Object.freeze({x:c.x-u.x*1.1,z:c.z-u.z*1.1}),comparsa:Object.freeze({x:c.x+u.x*4,z:c.z+u.z*4}),fuori:Object.freeze(u),recinzione:a})}const Nn=Object.freeze([yt("a1","atrio","z",-6,-5,-3,-1),yt("a2","atrio","z",-6,3,5,-1),yt("a3","atrio","x",-8,-1,1,-1),yt("c2","corridoio","x",2,13,15,1),yt("p1","palestra","z",-8,15,17,-1),yt("p2","palestra","x",24,-4,-2,1),yt("p3","palestra","x",24,3,5,1),yt("m1","mensa","x",-16,15,17,-1),yt("m2","mensa","z",24,-10,-8,1),yt("m3","mensa","z",10,-12,-10,-1),yt("l1","laboratorio","z",32,0,2,1),yt("l2","laboratorio","x",-2,27,29,-1),yt("g1","cortile","z",30,16,18,1,!0),yt("g2","cortile","x",26,18,20,1,!0),yt("k1","caldaia","z",-16,21,23,-1),yt("k2","caldaia","x",26,-13,-11,1),yt("n1","androne","x",-2,-16,-14,-1),yt("u1","aula","z",-22,-8,-6,1),yt("u2","aula","z",-22,6,8,1),yt("b1","biblioteca","x",-26,-33,-31,-1),yt("b2","biblioteca","z",-24,-20,-18,1),yt("s1","campo","z",-42,21,23,-1,!0),yt("s2","campo","x",32,-34,-32,1,!0),yt("r1","rifugio","x",-12,-48,-46,-1),yt("r2","rifugio","x",12,-48,-46,1)]),Qa=Object.freeze(["r1","r2"]);function bn(i,e,t,n,r,s=!1){return Object.freeze({id:i,nome:e,costo:t,chiusa:s,zone:Object.freeze(n),scatola:Object.freeze(r),centro:Object.freeze({x:(r.x0+r.x1)/2,z:(r.z0+r.z1)/2})})}const Ji=Object.freeze([bn("corridoio","Porta del corridoio",750,["atrio","corridoio"],ke(6,-1,1)),bn("palestra","Porta della palestra",1e3,["atrio","palestra"],He(8,-1,1)),bn("mensa","Porta della mensa",1250,["corridoio","mensa"],He(-2,13,15)),bn("laboratorio","Porta del laboratorio",1500,["corridoio","laboratorio"],ke(22,-1,1)),bn("caldaia","Porta della caldaia",1e3,["palestra","caldaia"],ke(-8,20,22)),bn("cortile","Porta del cortile",1250,["palestra","cortile"],ke(8,10,12)),bn("androne","Porta dell'androne",1500,["atrio","androne"],ke(-6,-1,1)),bn("aula","Porta dell'aula magna",1250,["androne","aula"],ke(-22,-1,1)),bn("biblioteca","Porta della biblioteca",1e3,["aula","biblioteca"],He(-12,-31,-29)),bn("campo","Porta del campo sportivo",1250,["aula","campo"],He(12,-31,-29)),bn("rifugio","Cancello del rifugio",0,["aula","rifugio"],ke(-38,-1.5,1.5),!0)]),wn=Object.freeze([Object.freeze({id:"muro-pompa",tipo:"arma",arma:"pompa",costo:800,munizioni:400,zona:"atrio",posizione:Object.freeze({x:-5,z:5.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-mitra",tipo:"arma",arma:"mitra",costo:1200,munizioni:600,zona:"corridoio",posizione:Object.freeze({x:-1.84,z:10}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-assalto",tipo:"arma",arma:"assalto",costo:1500,munizioni:750,zona:"palestra",posizione:Object.freeze({x:14,z:7.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-precisione",tipo:"arma",arma:"precisione",costo:1750,munizioni:900,zona:"mensa",posizione:Object.freeze({x:-15.84,z:20}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"bibita-ferro",tipo:"bevanda",bevanda:"ferro",zona:"atrio",posizione:Object.freeze({x:7,z:4.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-lampo",tipo:"bevanda",bevanda:"lampo",zona:"corridoio",posizione:Object.freeze({x:1.45,z:19.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"bibita-ritorno",tipo:"bevanda",bevanda:"ritorno",zona:"palestra",posizione:Object.freeze({x:23,z:-6.8}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"cassa",tipo:"cassa",zona:"palestra",posizione:Object.freeze({x:16,z:7.2}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"interruttore",tipo:"interruttore",zona:"caldaia",posizione:Object.freeze({x:25.7,z:-9.5}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"potenziatore",tipo:"potenziatore",zona:"laboratorio",posizione:Object.freeze({x:6.6,z:30.6}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-raffica",tipo:"arma",arma:"raffica",costo:900,munizioni:450,zona:"laboratorio",posizione:Object.freeze({x:7.84,z:24.2}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-carabina",tipo:"arma",arma:"carabina",costo:1600,munizioni:800,zona:"cortile",posizione:Object.freeze({x:18,z:8.16}),verso:Object.freeze({x:0,z:1})}),Object.freeze({id:"muro-doppietta",tipo:"arma",arma:"doppietta",costo:1e3,munizioni:500,zona:"caldaia",posizione:Object.freeze({x:18.16,z:-9.6}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"campanella",tipo:"campanella",zona:"atrio",posizione:Object.freeze({x:-3,z:5.84}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-commando",tipo:"arma",arma:"commando",costo:1400,munizioni:700,zona:"androne",posizione:Object.freeze({x:-1.84,z:-10}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-bullpup",tipo:"arma",arma:"bullpup",costo:1500,munizioni:750,zona:"aula",posizione:Object.freeze({x:11.84,z:-25}),verso:Object.freeze({x:-1,z:0})}),Object.freeze({id:"muro-dsv",tipo:"arma",arma:"dsv",costo:1800,munizioni:900,zona:"biblioteca",posizione:Object.freeze({x:-15,z:-24.16}),verso:Object.freeze({x:0,z:-1})}),Object.freeze({id:"muro-caccia",tipo:"arma",arma:"caccia",costo:1e3,munizioni:500,zona:"campo",posizione:Object.freeze({x:12.16,z:-35}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"muro-mitragliatrice",tipo:"arma",arma:"mitragliatrice",costo:2500,munizioni:1250,zona:"rifugio",posizione:Object.freeze({x:-11.84,z:-42}),verso:Object.freeze({x:1,z:0})}),Object.freeze({id:"quadro",tipo:"quadro",zona:"aula",posizione:Object.freeze({x:3.5,z:-37.84}),verso:Object.freeze({x:0,z:1})}),Object.freeze({id:"generatore",tipo:"generatore",zona:"campo",posizione:Object.freeze({x:24,z:-33.2}),verso:Object.freeze({x:0,z:1})}),Object.freeze({id:"allarme",tipo:"allarme",zona:"rifugio",posizione:Object.freeze({x:0,z:-53.84}),verso:Object.freeze({x:0,z:1})})]),ap=Object.freeze(new Set(["arma","interruttore","campanella","quadro","generatore","allarme"]));function uh(i){if(ap.has(i.tipo))return null;const{x:e,z:t}=i.posizione,n=i.tipo==="potenziatore"?.8:.5,r=i.tipo==="potenziatore"?.6:.35;return i.verso.x!==0?{x0:e-r,z0:t-n,x1:e+r,z1:t+n}:{x0:e-n,z0:t-r,x1:e+n,z1:t+r}}const Do=Object.freeze([Object.freeze({x:-1.5,z:0}),Object.freeze({x:1.5,z:0})]),cp=Object.freeze([Object.freeze({x:-45,z:-1.2}),Object.freeze({x:-45,z:1.2})]),Vs=Object.freeze({x:-28.16,z:0,verso:Object.freeze({x:-1,z:0})}),Yl=Object.freeze([Object.freeze({x:-21,z:-27.6,y:1.2}),Object.freeze({x:-17.5,z:-31.6,y:.62}),Object.freeze({x:-22,z:-36.4,y:1.62})]),lp=Object.freeze({x:24,z:-32.3,y:.3}),up=Object.freeze({x:24,z:-34.4}),$l=Object.freeze({x:0,z:-40.6}),fh=-38.6,qi=Object.freeze([Object.freeze({id:0,x:19.6,z:-15.3,y:.25}),Object.freeze({id:1,x:-13.4,z:13,y:.86}),Object.freeze({id:2,x:12.5,z:27.7,y:.25})]),Bt=(i,e,t,n)=>Object.freeze({x0:i-t/2,z0:e-n/2,x1:i+t/2,z1:e+n/2,altezza:1}),hh=Object.freeze([{modello:"covered_car",x:30.5,z:13.5,rot:.15},{modello:"covered_car",x:31.2,z:25.5,rot:-.2},{modello:"covered_car",x:2.5,z:36.5,rot:Math.PI/2+.1},{modello:"barrel_03",x:25.2,z:9,rot:.3,solido:Bt(25.2,9,.65,.65)},{modello:"barrel_03",x:24.4,z:9.3,rot:1.2,solido:Bt(24.4,9.3,.65,.65)},{modello:"old_military_crate",x:9.5,z:14.5,rot:Math.PI/2,solido:Bt(9.5,14.5,1,1.85)},{modello:"metal_trash_can",x:22,z:28.9,rot:Math.PI,solido:Bt(22,28.9,1.9,.6)},{modello:"trashbag",x:25.3,z:28.9,rot:0},{modello:"trashbag",x:24.6,z:29.2,rot:2},{modello:"wooden_crate_01",x:25.2,z:26.4,rot:.2},{modello:"wooden_crate_01",x:24.9,z:11.4,rot:1.4},{modello:"barrel_03",x:18.5,z:25.2,rot:0,solido:Bt(18.5,25.2,.65,.65)},{modello:"trashbag",x:9,z:9.1,rot:.8},{modello:"wooden_crate_01",x:18.6,z:-12.9,rot:Math.PI/2},{modello:"wooden_crate_01",x:25.3,z:-15.2,rot:.3},{modello:"trashbag",x:-10.2,z:23.3,rot:0},{modello:"barrel_03",x:7.3,z:23.1,rot:0,solido:Bt(7.3,23.1,.65,.65)},{modello:"old_military_crate",x:10.2,z:-7.3,rot:0,solido:Bt(10.2,-7.3,1.85,1)},{modello:"metal_office_desk",x:-5.5,z:2,rot:0},{modello:"painted_wooden_chair_01",x:-5.5,z:2.75,rot:Math.PI},{modello:"sofa_02",x:-44.5,z:4.3,rot:Math.PI,solido:Bt(-44.5,4.3,1.85,.85)},{modello:"sofa_02",x:-40,z:4.3,rot:Math.PI,solido:Bt(-40,4.3,1.85,.85)},{modello:"painted_wooden_chair_01",x:-36,z:-4.4,rot:0},{modello:"painted_wooden_chair_01",x:-35,z:-4.4,rot:.2},{modello:"barrel_03",x:-29,z:-4,rot:0,solido:Bt(-29,-4,.65,.65)},{modello:"barrel_03",x:-29,z:4,rot:1,solido:Bt(-29,4,.65,.65)},{modello:"metal_office_desk",x:-14,z:-26,rot:0},{modello:"painted_wooden_chair_01",x:-14,z:-25.25,rot:Math.PI},{modello:"sofa_02",x:-14.6,z:-37.3,rot:0,solido:Bt(-14.6,-37.3,1.85,.85)},{modello:"barrel_03",x:14,z:-40.6,rot:.4,solido:Bt(14,-40.6,.65,.65)},{modello:"barrel_03",x:14.8,z:-41.1,rot:1.3,solido:Bt(14.8,-41.1,.65,.65)},{modello:"wooden_crate_01",x:31,z:-41,rot:.3},{modello:"wooden_crate_01",x:31.1,z:-23,rot:1.1},{modello:"trashbag",x:25.5,z:-22.6,rot:.5},{modello:"barrel_03",x:-11.2,z:-53.2,rot:.2,solido:Bt(-11.2,-53.2,.65,.65)},{modello:"barrel_03",x:11.2,z:-53.3,rot:2.1,solido:Bt(11.2,-53.3,.65,.65)},{modello:"old_military_crate",x:9.8,z:-39.2,rot:0,solido:Bt(9.8,-39.2,1.85,1)},{modello:"old_military_crate",x:-9.6,z:-52.9,rot:0,solido:Bt(-9.6,-52.9,1.85,1)},{modello:"wooden_crate_01",x:10.8,z:-50.4,rot:.5}].map(Object.freeze));function tl(i,e){var t;return((t=Ps.find(n=>i>=n.x0&&i<=n.x1&&e>=n.z0&&e<=n.z1))==null?void 0:t.id)??null}function nl(i){const e=new Set(["atrio"]);for(const t of Ji)i.has(t.id)&&t.zone.forEach(n=>e.add(n));return e}function Yo(i){return[...Qc,...lh,...el,...Nn.map(e=>e.scatola),...Ji.filter(e=>!i.has(e.id)).map(e=>e.scatola),...wn.map(uh).filter(Boolean),...hh.filter(e=>e.solido).map(e=>e.solido)]}const fp=.2,Kl=(i,e,t)=>Math.min(t,Math.max(e,i));function hp(i,e,t,n){const r=Kl(i,n.x0,n.x1),s=Kl(e,n.z0,n.z1),o=i-r,a=e-s,c=o*o+a*a;if(c>=t*t)return[i,e];if(c>1e-9){const h=Math.sqrt(c);return[r+o/h*t,s+a/h*t]}const l=[[i-n.x0,n.x0-t,e],[n.x1-i,n.x1+t,e],[e-n.z0,i,n.z0-t],[n.z1-e,i,n.z1+t]],[,u,f]=l.reduce((h,d)=>d[0]<h[0]?d:h);return[u,f]}function dh(i,e,t,n,r){let{x:s,z:o}=i;const a=Math.max(1,Math.ceil(Math.hypot(e,t)/fp));for(let c=0;c<a;c++){s+=e/a,o+=t/a;for(let l=0;l<2;l++)for(const u of r)[s,o]=hp(s,o,n,u)}return{x:s,z:o}}function il(i,e,t){const n=e.x-i.x,r=e.z-i.z;for(const s of t){let o=0,a=1,c=!1;for(const[l,u,f,h]of[[i.x,n,s.x0,s.x1],[i.z,r,s.z0,s.z1]]){if(Math.abs(u)<1e-9){(l<f||l>h)&&(c=!0);continue}let d=(f-l)/u,g=(h-l)/u;d>g&&([d,g]=[g,d]),o=Math.max(o,d),a=Math.min(a,g)}if(!c&&o<=a)return!1}return!0}function Zl(i,e,t,n=0){return i>=t.x0-n&&i<=t.x1+n&&e>=t.z0-n&&e<=t.z1+n}const Eo=Object.freeze({raggio:.32,basso:0,alto:1.45}),ec=Object.freeze({raggio:.17,altezza:1.62});function dp(i,e,t,n=0,r=Vn){let s=0,o=1/0;for(const[a,c,l,u]of[[i.x,e.x,t.x0,t.x1],[i.y,e.y,n,r],[i.z,e.z,t.z0,t.z1]]){if(Math.abs(c)<1e-9){if(a<l||a>u)return 1/0;continue}let f=(l-a)/c,h=(u-a)/c;if(f>h&&([f,h]=[h,f]),s=Math.max(s,f),o=Math.min(o,h),s>o)return 1/0}return s}function pp(i,e,t,n){const r=i.x-t.x,s=i.y-t.y,o=i.z-t.z,a=r*e.x+s*e.y+o*e.z,c=r*r+s*s+o*o-n*n,l=a*a-c;if(l<0)return 1/0;const u=-a-Math.sqrt(l);return u>=0?u:1/0}function mp(i,e,t,n,r,s,o){const a=i.x-t,c=i.z-n,l=e.x*e.x+e.z*e.z;if(l<1e-12)return 1/0;const u=a*e.x+c*e.z,f=a*a+c*c-r*r,h=u*u-l*f;if(h<0)return 1/0;const d=(-u-Math.sqrt(h))/l;if(d<0)return 1/0;const g=i.y+e.y*d;return g>=s&&g<=o?d:1/0}function gp(i,e,t){let n=1/0;for(const r of t)n=Math.min(n,dp(i,e,r,0,r.altezza??Vn));return n}function ph(i,e,t,n,r=1/0){const s=Math.min(r,gp(i,e,n));let o=null;for(const a of t){const c=pp(i,e,a.testa??{x:a.x,y:ec.altezza,z:a.z},a.raggioTesta??ec.raggio),l=mp(i,e,a.x,a.z,a.raggio??Eo.raggio,Eo.basso,a.alto??Eo.alto),u=Math.min(c,l);u>=s||o&&u>=o.t||(o={id:a.id,t:u,testa:c<=l})}return o??{id:null,t:s,testa:!1}}function _p(i,e,t){const n=[];for(const r of e){const s=Math.hypot(r.x-i.x,Eo.alto/2-i.y,r.z-i.z);s<t&&n.push({id:r.id,fattore:1-s/t})}return n}function rl(i,e){const t=Math.cos(e);return{x:Math.sin(i)*t,y:Math.sin(e),z:Math.cos(i)*t}}function vp(i,e,t){if(e<=0)return i;const n=i.x+(t()-.5)*2*e,r=i.y+(t()-.5)*2*e,s=i.z+(t()-.5)*2*e,o=Math.hypot(n,r,s);return{x:n/o,y:r/o,z:s/o}}const xp=.5,mh=.35,Uo=i=>({tipo:i,caricatore:Tt[i].caricatore,riserva:Tt[i].riserva});function gh(){return{armi:[Uo("pistola")],attiva:0,attesa:0,ricarica:0,cambio:0,coltello:0}}const Qt=i=>i.armi[i.attiva],_h=i=>i.ricarica>0||i.cambio>0||i.coltello>0;function Mp(i,e){if(i.attesa=Math.max(0,i.attesa-e),i.cambio=Math.max(0,i.cambio-e),i.coltello=Math.max(0,i.coltello-e),i.ricarica<=0||(i.ricarica-=e,i.ricarica>0))return!1;i.ricarica=0;const t=Qt(i),n=Tt[t.tipo].caricatore-t.caricatore,r=Math.min(n,t.riserva);return t.caricatore+=r,t.riserva-=r,!0}function Sp(i){const e=Qt(i);return _h(i)||i.attesa>0||e.caricatore<=0?null:(e.caricatore-=1,i.attesa=Tt[e.tipo].cadenza,Tt[e.tipo])}function oa(i,e=[]){const t=Qt(i);return _h(i)||t.riserva<=0||t.caricatore>=Tt[t.tipo].caricatore?!1:(i.ricarica=Tt[t.tipo].ricarica*(e.includes("lampo")?xp:1),!0)}function yp(i){return i.coltello>0||i.cambio>0?!1:(i.ricarica=0,i.coltello=Oo.attesa,!0)}function Jl(i,e=(i.attiva+1)%i.armi.length){return e===i.attiva||!i.armi[e]?!1:(i.attiva=e,i.ricarica=0,i.cambio=mh,!0)}function bp(i,e,t=null){var s;const n=(s=Qt(i))==null?void 0:s.tipo,r=new Map(i.armi.map(o=>[o.tipo,o]));i.armi=e.map(o=>o===t?Uo(o):r.get(o)??Uo(o)),i.attiva=Math.max(0,i.armi.findIndex(o=>o.tipo===(t??n))),t&&(i.cambio=mh,i.ricarica=0)}function Ql(i,e){const t=i.armi.find(n=>n.tipo===e);t&&Object.assign(t,Uo(e))}function tc(i){Object.assign(i,gh())}const zi=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z);function Ap(i,e){var s,o;if(e.fase==="attesa")return null;const t=e.giocatori.find(a=>a.id!==i.id&&a.stato==="terra"&&zi(a,i)<=$.RIANIMA_DISTANZA);if(t)return{tipo:"rianima",testo:`Tieni premuto F per rianimare ${t.nome}`,bersaglio:t.id};const n=[];for(const a of qi){if((s=e.frammenti)!=null&&s.includes(a.id))continue;const c=zi(a,i);c<=$.DISTANZA_FRAMMENTO&&n.push({d:c-1,tipo:"frammento",id:a.id,acquisto:`frammento:${a.id}`,testo:"Premi F per raccogliere lo strano frammento luminoso"})}for(const a of((o=e.missione)==null?void 0:o.aTerra)??[]){const c=zi(a,i);c<=$.DISTANZA_FUSIBILE&&n.push({d:c-1,tipo:"compra",acquisto:`fusibile:${a.id}`,costo:0,testo:"Premi F per prendere il fusibile"})}for(const a of Ji){if(e.porte.has(a.id))continue;if(a.chiusa){const l=zi(a.centro,i);l<=$.DISTANZA_ACQUISTO&&n.push({d:l+.3,tipo:"info",testo:e.fase==="finale"?"Il cancello è sbarrato: uccidete il Custode!":"Cancello del rifugio: si apre col quadro qui accanto"});continue}const c=zi(a.centro,i);c<=$.DISTANZA_ACQUISTO&&n.push({d:c,tipo:"compra",acquisto:`porta:${a.id}`,costo:a.costo,testo:`Premi F per aprire: ${a.nome} [${a.costo}]`})}for(const a of Nn){if(e.finestre[a.id]>=$.ASSE_PER_FINESTRA)continue;const c=zi(a.interno,i);c<=$.DISTANZA_FINESTRA&&n.push({d:c+.5,tipo:"assa",finestra:a.id,testo:"Tieni premuto F per rimettere le assi"})}const r=nl(e.porte);for(const a of wn){if(!r.has(a.zona))continue;const c=zi(a.posizione,i);c>$.DISTANZA_ACQUISTO||n.push({d:c,tipo:"compra",acquisto:a.id,...Cp(a,i,e)})}return n.sort((a,c)=>a.d-c.d),n[0]??null}function Ep(i,e){const t=e.potenziatore;return e.corrente?t.stato==="pronta"&&t.per===i.id?{costo:0,testo:`Premi F per prendere: ${Tt[t.arma].nome}`}:t.stato!=="libero"?{costo:1/0,testo:t.per===i.id?"Il potenziatore sta lavorando…":"Il potenziatore è occupato"}:(i.armaAttiva?nh(i.armaAttiva):null)?{costo:$.COSTO_POTENZIA,testo:`Premi F per potenziare: ${Tt[i.armaAttiva].nome} [${$.COSTO_POTENZIA}]`}:{costo:1/0,testo:"Questa arma è già potenziata"}:{costo:1/0,testo:"Il potenziatore non ha corrente: accendila in caldaia"}}function Tp(i){const e=i.missione;return e.messi>=$.FUSIBILI?{costo:1/0,testo:"Il quadro è completo: il cancello è aperto"}:i.corrente?e.fusibili===0?{costo:1/0,testo:`Quadro del cancello: fusibili ${e.messi}/${$.FUSIBILI}`}:{costo:0,testo:`Premi F per inserire ${e.fusibili===1?"il fusibile":`${e.fusibili} fusibili`} (${e.messi}/${$.FUSIBILI})`}:{costo:1/0,testo:`Quadro del cancello senza corrente (fusibili ${e.messi}/${$.FUSIBILI})`}}function wp(i){const e=i.missione;return e.generatore==="finito"?{costo:1/0,testo:"Il generatore ha finito il suo lavoro"}:e.generatore==="acceso"?{costo:1/0,testo:`Generatore ${Math.round(e.progresso*100)}% — restate vicini!`}:i.fase!=="gioco"?{costo:1/0,testo:"Il generatore si avvia solo durante un round"}:{costo:0,testo:"Premi F per avviare il generatore (dovrete difenderlo)"}}function Rp(i){return i.fase==="finale"?{costo:1/0,testo:""}:i.giocatori.filter(t=>t.stato!=="morto").some(t=>tl(t.x,t.z)!=="rifugio"||t.z>=fh)?{costo:1/0,testo:"Entrate tutti nel rifugio per suonare l'ultima campanella"}:{costo:0,testo:"Premi F per suonare l'ultima campanella (non si torna indietro)"}}function Cp(i,e,t){var s;if(i.tipo==="arma"){const o=e.armi.some(c=>Ss(c)===i.arma),a=o?i.munizioni:i.costo;return{costo:a,testo:o?`Premi F per le munizioni: ${Tt[i.arma].nome} [${a}]`:`Premi F per comprare: ${Tt[i.arma].nome} [${a}]`}}if(i.tipo==="bevanda"){const o=Zi[i.bevanda];return e.bevande.includes(i.bevanda)?{costo:1/0,testo:`${o.nome}: ce l'hai già`}:{costo:o.costo,testo:`Premi F per bere: ${o.nome}, ${o.descrizione} [${o.costo}]`}}if(i.tipo==="interruttore")return t.corrente?{costo:1/0,testo:"La corrente è accesa"}:{costo:0,testo:"Premi F per accendere la corrente"};if(i.tipo==="potenziatore")return Ep(e,t);if(i.tipo==="quadro")return Tp(t);if(i.tipo==="generatore")return wp(t);if(i.tipo==="allarme")return Rp(t);if(i.tipo==="campanella")return{costo:0,testo:"Premi F per suonare la vecchia campanella"};const n=t.cassa;if(n.stato==="aperta"&&n.per===e.id)return{costo:0,testo:`Premi F per prendere: ${Tt[n.arma].nome}`};if(n.stato==="aperta")return{costo:1/0,testo:"La cassa è occupata"};const r=((s=t.effetti)==null?void 0:s.saldi)>0?$.COSTO_CASSA_SALDI:$.COSTO_CASSA;return{costo:r,testo:`Premi F per la cassa a sorpresa [${r}]${r<$.COSTO_CASSA?" SALDI!":""}`}}const Lr=.5,ys=Math.ceil((Ci.x1-Ci.x0)/Lr),Fo=Math.ceil((Ci.z1-Ci.z0)/Lr),vh=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,Math.SQRT2],[1,-1,Math.SQRT2],[-1,1,Math.SQRT2],[-1,-1,Math.SQRT2]],aa=new Map,vn=(i,e)=>e*ys+i,xh=(i,e)=>[Math.floor((i-Ci.x0)/Lr),Math.floor((e-Ci.z0)/Lr)],Mh=(i,e)=>[Ci.x0+(i+.5)*Lr,Ci.z0+(e+.5)*Lr],Bo=(i,e)=>i>=0&&e>=0&&i<ys&&e<Fo;function Ip(i){const e=[...i].sort().join(",");if(aa.has(e))return aa.get(e);const t=Yo(i),n=new Uint8Array(ys*Fo);for(let s=0;s<Fo;s++)for(let o=0;o<ys;o++){const[a,c]=Mh(o,s),l=Ps.some(f=>Zl(a,c,f)),u=t.some(f=>Zl(a,c,f,$.RAGGIO_ZOMBIE));n[vn(o,s)]=l&&!u?1:0}const r={libera:n};return aa.set(e,r),r}function Pp(i,e){const t=new Float32Array(ys*Fo).fill(1/0),n=[];for(const{x:r,z:s}of e){const[o,a]=xh(r,s);Bo(o,a)&&(t[vn(o,a)]=0,n.push([o,a]))}for(let r=0;r<n.length;r++){const[s,o]=n[r],a=t[vn(s,o)];for(const[c,l,u]of vh){const f=s+c,h=o+l;if(!Bo(f,h)||!i.libera[vn(f,h)]||c&&l&&(!i.libera[vn(s+c,o)]||!i.libera[vn(s,o+l)]))continue;const d=a+u;d>=t[vn(f,h)]||(t[vn(f,h)]=d,n.push([f,h]))}}return{distanze:t,libera:i.libera}}function Lp(i,e,t){const[n,r]=xh(e,t);if(!Bo(n,r))return null;let s=i.distanze[vn(n,r)],o=null;for(const[u,f]of vh){const h=n+u,d=r+f;if(!Bo(h,d)||u&&f&&(!i.libera[vn(n+u,r)]||!i.libera[vn(n,r+f)]))continue;const g=i.distanze[vn(h,d)];g<s&&(s=g,o=[h,d])}if(!o)return null;const[a,c]=Mh(o[0],o[1]),l=Math.hypot(a-e,c-t)||1;return{x:(a-e)/l,z:(c-t)/l}}const Sh=3,zr=.8,zp=2e3,Op=.25,sl=4,Np=.55,eu=.75,Gs=.06,Hs=.35,Dp=3,Up=.55,Ws=.05,Fp=1.5,yh=Object.freeze([18,14,10]),Bp="disintegratore",tu=Object.freeze({x:-3,z:4.4}),un=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),ol=i=>Nn.find(e=>e.id===i),$o=i=>Pr[i.tipo]??Pr.normale,kp=()=>Object.fromEntries(kn.filter(i=>Pn[i].durata).map(i=>[i,0]));function li(i,e,t){e.punti+=Math.round(t)*(i.effetti.doppi>0?2:1)}function Rn(i){const[e,t]=ch(i.rng);return i.rng=t,e}function Vp({seme:i,giocatori:e=[],sala:t=!1}){const n={seme:i>>>0,rng:(i^1540483477)>>>0,tempo:0,fase:t?"attesa":"intervallo",timerFase:t?0:Sh,conto:null,bonus:[],bonusRound:0,prossimoBonus:1,effetti:kp(),frammenti:[],segreto:!1,campanella:!1,round:0,daGenerare:0,attesaComparsa:0,prossimoId:1,zombie:[],finestre:Object.fromEntries(Nn.map(r=>[r.id,$.ASSE_PER_FINESTRA])),porte:[],giocatori:[],cassa:{stato:"chiusa",arma:null,per:null,timer:0},corrente:!1,potenziatore:{stato:"libero",arma:null,per:null,timer:0},campo:null,attesaCampo:0,granate:[],prossimaGranata:1,presideTra:null,missione:{fusibili:0,messi:0,aTerra:[{id:0,...Yl[(i>>>0)%Yl.length]}],presideFusibile:!0,generatore:"fermo",progresso:0},finale:null};return e.forEach(r=>al(n,r)),n}function al(i,{id:e,nome:t}){const n=i.giocatori.find(a=>a.id===e);if(n)return n.nome=t,n;const r=i.fase==="attesa"?cp:Do,s=r[i.giocatori.length%r.length],o={id:e,nome:t,x:s.x,z:s.z,yaw:i.fase==="attesa"?Math.PI/2:Math.PI,pitch:0,pronto:!1,stato:"vivo",vita:$.VITA,vitaMax:$.VITA,ultimoDanno:-1/0,timerTerra:0,punti:$.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,progressoRianimazione:0,attesaAssa:0,colpi:0,uccisioni:0,teletrasporto:0,granate:$.GRANATE_INIZIALI};return i.giocatori.push(o),o}function bh(i,e){i.giocatori=i.giocatori.filter(t=>t.id!==e)}const fn=i=>i.giocatori.filter(e=>e.stato==="vivo");function Gp(i,e){for(const t of i.giocatori){const n=e==null?void 0:e[t.id];n&&(t.armaAttiva=t.armi.includes(n.arma)?n.arma:t.armaAttiva,t.colpi=Number.isFinite(n.colpi)?n.colpi:t.colpi,!(t.stato!=="vivo"||(n.tp??0)<t.teletrasporto)&&(t.x=n.x,t.z=n.z,t.yaw=n.yaw,t.pitch=n.pitch))}}function nc(i,e,t,n,r={}){e.armi.includes(t)||(e.armi.length<2?e.armi.push(t):e.armi[e.armi.indexOf(e.armaAttiva)]=t),e.armaAttiva=t,n.push({k:"acquisto",a:e.id,arma:t,armi:[...e.armi],...r})}function Hp(i,e,t,n,r){e.armi.includes(n)&&(e.armaAttiva=n);const s=nl(new Set(i.porte));if(t.startsWith("fusibile:")){Kp(i,e,Number(t.slice(9)),s,r);return}if(t.startsWith("porta:")){const f=Ji.find(h=>`porta:${h.id}`===t);if(!f||f.chiusa||i.porte.includes(f.id)||e.punti<f.costo||un(e,f.centro)>$.DISTANZA_ACQUISTO+zr)return;e.punti-=f.costo,i.porte.push(f.id),r.push({k:"porta",id:f.id,da:e.id});return}const o=wn.find(f=>f.id===t);if(!o||!s.has(o.zona)||un(e,o.posizione)>$.DISTANZA_ACQUISTO+zr)return;if(o.tipo==="arma"){const f=e.armi.find(d=>Ss(d)===o.arma),h=f?o.munizioni:o.costo;if(e.punti<h)return;e.punti-=h,f?r.push({k:"munizioni",a:e.id,arma:f}):nc(i,e,o.arma,r);return}if(o.tipo==="interruttore"){if(i.corrente)return;i.corrente=!0,r.push({k:"corrente",da:e.id});return}if(o.tipo==="potenziatore"){Wp(i,e,r);return}if(o.tipo==="quadro"){Zp(i,r);return}if(o.tipo==="generatore"){Jp(i,e,r);return}if(o.tipo==="allarme"){if(i.finale||i.fase!=="gioco"&&i.fase!=="intervallo"||!i.giocatori.filter(f=>f.stato!=="morto").every(f=>tl(f.x,f.z)==="rifugio"&&f.z<fh))return;em(i,r);return}if(o.tipo==="campanella"){const f=!i.campanella;i.campanella=!0,f&&cl(i,tu.x,tu.z,kn[Math.floor(Rn(i)*kn.length)],r),r.push({k:"campanella",da:e.id,regalo:f});return}if(o.tipo==="bevanda"){const f=Zi[o.bevanda];if(e.bevande.includes(o.bevanda)||e.punti<f.costo)return;e.punti-=f.costo,e.bevande.push(o.bevanda),o.bevanda==="ferro"&&(e.vitaMax=$.VITA_FERRO,e.vita=$.VITA_FERRO),r.push({k:"bevanda",a:e.id,bevanda:o.bevanda});return}const a=i.cassa;if(a.stato==="aperta"&&a.per===e.id){const f=a.arma;Object.assign(a,{stato:"chiusa",arma:null,per:null,timer:0}),nc(i,e,f,r,{daCassa:!0});return}const c=i.effetti.saldi>0?$.COSTO_CASSA_SALDI:$.COSTO_CASSA;if(a.stato!=="chiusa"||e.punti<c)return;e.punti-=c;const l=new Set(e.armi.map(Ss)),u=jp(ih.filter(f=>!l.has(f)),Rn(i));Object.assign(a,{stato:"aperta",arma:u,per:e.id,timer:$.DURATA_CASSA}),r.push({k:"cassa",a:e.id,arma:u})}function Wp(i,e,t){const n=i.potenziatore;if(n.stato==="pronta"&&n.per===e.id){const s=e.armi.indexOf(Ss(n.arma));s>=0?e.armi[s]=n.arma:e.armi.length<2?e.armi.push(n.arma):e.armi[e.armi.indexOf(e.armaAttiva)]=n.arma,e.armaAttiva=n.arma,t.push({k:"acquisto",a:e.id,arma:n.arma,armi:[...e.armi],potenziata:!0}),Object.assign(n,{stato:"libero",arma:null,per:null,timer:0});return}const r=nh(e.armaAttiva);!i.corrente||n.stato!=="libero"||!r||e.punti<$.COSTO_POTENZIA||(e.punti-=$.COSTO_POTENZIA,Object.assign(n,{stato:"lavora",arma:r,per:e.id,timer:$.DURATA_POTENZIA}),t.push({k:"potenzia",a:e.id,arma:r}))}function Xp(i,e,t){const n=i.potenziatore;if(n.stato!=="libero"&&(n.timer-=e,!(n.timer>0))){if(n.stato==="lavora"){Object.assign(n,{stato:"pronta",timer:$.ATTESA_RITIRO}),t.push({k:"potenziataPronta",a:n.per,arma:n.arma});return}Object.assign(n,{stato:"libero",arma:null,per:null,timer:0})}}function jp(i,e){const t=i.reduce((r,s)=>r+ql[s],0);let n=e*t;for(const r of i)if(n-=ql[r],n<0)return r;return i[i.length-1]}function qp(i,e,t,n){const r=i.zombie.find(a=>a.id===t.zombie&&a.stato!=="morto");if(!r)return;const s=Math.min(zp,Math.max(0,Number(t.danno)||0)),o=i.effetti.secco>0&&!$o(r).boss?r.vita:s;Ah(i,e,r,o,{testa:!!t.testa,coltello:!!t.coltello},n)}function Ah(i,e,t,n,{testa:r=!1,coltello:s=!1},o){const a=$o(t);if(t.vita-=n,t.vita>0){if(li(i,e,$.PUNTI_COLPO),a.infuria&&!t.corre&&t.vita<t.vitaMax*a.infuria&&(t.corre=!0,o.push({k:"infuriato",zombie:t.id,tipo:t.tipo})),a.finale){const c=Jc(t.vita/t.vitaMax);c>(t.faseBoss??1)&&(t.faseBoss=c,t.corre=!0,o.push({k:"faseBoss",fase:c}))}o.push({k:"colpito",zombie:t.id,testa:r,da:e.id});return}t.stato="morto",t.timer=sl,o.push({k:"ucciso",zombie:t.id,testa:r,da:e.id,x:t.x,z:t.z,tipo:t.tipo}),e.uccisioni+=1,li(i,e,(s?$.PUNTI_COLTELLO:r?$.PUNTI_TESTA:$.PUNTI_UCCISIONE)*a.punti),a.boss?$p(i,t,o):Yp(i,t,o)}function Eh(i){return(i.stato==="arriva"||i.stato==="assi"||i.stato==="scavalca")&&i.finestra?ol(i.finestra).interno:i}function Yp(i,e,t){if(i.bonusRound>=$.BONUS_PER_ROUND||Rn(i)>=$.PROBABILITA_BONUS)return;const n=Eh(e);i.bonusRound+=1,cl(i,n.x,n.z,kn[Math.floor(Rn(i)*kn.length)],t)}function $p(i,e,t){for(const r of fn(i))li(i,r,$.PUNTI_BOSS);if(t.push({k:"bossUcciso",tipo:e.tipo}),e.tipo!=="preside")return;const n=Eh(e);cl(i,n.x+.9,n.z,kn[Math.floor(Rn(i)*kn.length)],t),i.missione.presideFusibile&&(i.missione.presideFusibile=!1,i.missione.aTerra.push({id:1,x:n.x,z:n.z,y:.3}),t.push({k:"fusibileCaduto",x:n.x,z:n.z}))}function Kp(i,e,t,n,r){const s=i.missione,o=s.aTerra.find(c=>c.id===t);if(!o||un(e,o)>$.DISTANZA_FUSIBILE+zr)return;const a=tl(o.x,o.z);if(!(a&&!n.has(a))){s.aTerra=s.aTerra.filter(c=>c!==o),s.fusibili+=1;for(const c of fn(i))li(i,c,$.PUNTI_FUSIBILE);r.push({k:"fusibile",da:e.id,trovati:s.fusibili+s.messi,totale:$.FUSIBILI})}}function Zp(i,e){const t=i.missione;!i.corrente||t.fusibili===0||(t.messi+=t.fusibili,t.fusibili=0,e.push({k:"fusibiliMessi",messi:t.messi,totale:$.FUSIBILI}),!(t.messi<$.FUSIBILI||i.porte.includes("rifugio"))&&(i.porte.push("rifugio"),e.push({k:"rifugio"})))}function Jp(i,e,t){const n=i.missione;i.fase!=="gioco"||n.generatore!=="fermo"||(n.generatore="acceso",n.progresso=0,t.push({k:"generatore",da:e.id}))}function Qp(i,e,t){const n=i.missione;n.generatore==="acceso"&&(fn(i).some(r=>un(r,up)<=$.DISTANZA_GENERATORE)&&(n.progresso=Math.min(1,n.progresso+e/$.DURATA_GENERATORE)),!(n.progresso<1)&&(n.generatore="finito",n.aTerra.push({id:2,...lp}),t.push({k:"generatoreFinito"})))}function em(i,e){i.fase="finale",i.daGenerare=0,i.presideTra=null,i.porte=i.porte.filter(n=>n!=="rifugio");const t=Math.round($.VITA_CUSTODE*ah(i.giocatori.length));i.zombie.push({id:i.prossimoId++,x:$l.x,z:$l.z,yaw:Math.PI,stato:"dentro",finestra:Qa[0],vita:t,vitaMax:t,tipo:"custode",corre:!1,variante:0,timer:0,attesa:2.5,bersaglio:null,scatto:0,prossimoScatto:6,faseBoss:1}),i.finale={urlo:yh[0],rinforzi:4,tempo:0},e.push({k:"finale"})}function tm(i,e,t){const n=i.finale;n.tempo+=e;const r=i.zombie.find(c=>c.tipo==="custode"&&c.stato!=="morto");if(!r){nm(i,t);return}const s=Jc(r.vita/r.vitaMax),o=i.zombie.filter(c=>c.stato!=="morto").length;if(n.rinforzi-=e,n.rinforzi<=0&&(o<=$.RINFORZI_FINALE_MAX&&ko(i,{finestre:Qa,corre:s===3?!0:void 0}),n.rinforzi=s===3?1.6:2.4),n.urlo-=e,n.urlo>0)return;const a=3+s;for(let c=0;c<a&&o+c<$.ZOMBIE_VIVI_MAX;c++)ko(i,{finestre:Qa,corre:!0});n.urlo=yh[s-1],t.push({k:"urlo"})}function nm(i,e){var t;i.fase="vinta";for(const n of i.zombie)n.stato!=="morto"&&(n.stato="morto",n.timer=sl,e.push({k:"ucciso",zombie:n.id,testa:!1,da:null,x:n.x,z:n.z,bomba:!0}));i.porte.includes("rifugio")||i.porte.push("rifugio");for(const n of i.giocatori)li(i,n,$.PUNTI_VITTORIA);e.push({k:"vittoria",round:i.round,durata:Math.round(((t=i.finale)==null?void 0:t.tempo)??0),giocatori:i.giocatori.map(n=>({nome:n.nome,punti:n.punti,uccisioni:n.uccisioni}))})}function im(i,e,t,n){if(e.granate<=0)return;e.granate-=1;const r=rl(Number(t.yaw)||0,Math.max(-1.2,Math.min(1.2,Number(t.pitch)||0)));i.granate.push({id:i.prossimaGranata++,x:e.x,y:$.ALTEZZA_OCCHI-.15,z:e.z,vx:r.x*$.VELOCITA_LANCIO,vy:r.y*$.VELOCITA_LANCIO+$.SPINTA_LANCIO,vz:r.z*$.VELOCITA_LANCIO,timer:$.MICCIA_GRANATA,da:e.id}),n.push({k:"lancio",a:e.id})}const rm=(i,e)=>Ps.some(t=>t.aperto&&i>=t.x0&&i<=t.x1&&e>=t.z0&&e<=t.z1);function nu(i,e,t,n){return n.some(r=>i>r.x0-Ws&&i<r.x1+Ws&&e>r.z0-Ws&&e<r.z1+Ws&&t<(r.altezza??Vn))}function sm(i,e,t){if(i.granate.length===0)return;const n=Yo(new Set(i.porte));i.granate=i.granate.filter(r=>{r.timer-=e,r.vy-=$.GRAVITA*e;let s=r.y+r.vy*e;const o=r.x+r.vx*e;nu(o,r.z,s,n)?r.vx*=-Hs:r.x=o;const a=r.z+r.vz*e;if(nu(r.x,a,s,n)?r.vz*=-Hs:r.z=a,s<=Gs){s=Gs;const c=Math.abs(r.vy)>=1;r.vy=c?-r.vy*Hs:0;const l=c?Up:Math.max(0,1-Dp*e);r.vx*=l,r.vz*=l}return s>=Vn-Gs&&!rm(r.x,r.z)&&(s=Vn-Gs,r.vy=-Math.abs(r.vy)*Hs),r.y=s,r.timer>0?!0:(om(i,r,n,t),!1)})}function om(i,e,t,n){n.push({k:"esplosione",x:e.x,y:e.y,z:e.z});const r=i.giocatori.find(a=>a.id===e.da);if(!r)return;const s=t.filter(a=>(a.altezza??Vn)>=Fp),o=rp(i.round);for(const a of i.zombie){if(a.stato==="morto")continue;const c=Math.hypot(a.x-e.x,.9-e.y,a.z-e.z);c>$.RAGGIO_GRANATA||!il(e,a,s)||Ah(i,r,a,Math.round(o*(.35+.65*(1-c/$.RAGGIO_GRANATA))),{},n)}}function cl(i,e,t,n,r=[]){const s={id:i.prossimoBonus++,tipo:n,x:e,z:t,timer:$.DURATA_BONUS_A_TERRA};return i.bonus.push(s),r.push({k:"bonusCompare",id:s.id,tipo:n,x:e,z:t}),s}function am(i,e,t,n){const r=Pn[e.tipo];if(r.durata&&(i.effetti[e.tipo]=r.durata),e.tipo==="bomba"){for(const s of i.zombie)s.stato==="morto"||$o(s).boss||(s.stato="morto",s.timer=sl,n.push({k:"ucciso",zombie:s.id,testa:!1,da:null,x:s.x,z:s.z,bomba:!0}));for(const s of fn(i))li(i,s,$.PUNTI_BOMBA)}if(e.tipo==="carpentiere"){for(const s of Nn)i.finestre[s.id]=$.ASSE_PER_FINESTRA;for(const s of fn(i))li(i,s,$.PUNTI_CARPENTIERE)}n.push({k:"bonus",tipo:e.tipo,da:t.id,x:e.x,z:e.z})}function cm(i,e,t){for(const n of Object.keys(i.effetti))i.effetti[n]=Math.max(0,i.effetti[n]-e);i.bonus=i.bonus.filter(n=>{n.timer-=e;const r=fn(i).find(s=>un(s,n)<=$.DISTANZA_BONUS);return r?(am(i,n,r,t),!1):n.timer>0})}function lm(i,e,t,n){const r=qi.find(s=>s.id===t);if(!(!r||i.fase==="attesa"||i.frammenti.includes(t))&&!(un(e,r)>$.DISTANZA_FRAMMENTO+zr)&&(i.frammenti.push(t),n.push({k:"frammento",id:t,da:e.id,trovati:i.frammenti.length,totale:qi.length}),!(i.frammenti.length<qi.length))){i.segreto=!0;for(const s of fn(i))li(i,s,$.PUNTI_SEGRETO),nc(i,s,Bp,n,{segreto:!0});n.push({k:"segreto"})}}function um(i,e){i.zombie=[],i.conto=null,i.fase="intervallo",i.timerFase=Sh,i.giocatori.forEach((t,n)=>{const r=Do[n%Do.length];Object.assign(t,{x:r.x,z:r.z,yaw:Math.PI,stato:"vivo",vita:$.VITA,vitaMax:$.VITA,punti:$.PUNTI_INIZIALI,armi:["pistola"],armaAttiva:"pistola",bevande:[],pronto:!1,uccisioni:0,teletrasporto:t.teletrasporto+1,granate:$.GRANATE_INIZIALI})}),e.push({k:"via"})}function fm(i,e,t){if(!(i.giocatori.length>0&&i.giocatori.every(r=>r.pronto))){i.conto!==null&&t.push({k:"contoAnnullato"}),i.conto=null;return}if(i.conto===null){i.conto=$.CONTO_ALLA_ROVESCIA,t.push({k:"conto",secondi:$.CONTO_ALLA_ROVESCIA});return}i.conto-=e,i.conto<=0&&um(i,t)}function hm(i,e,t,n){const r=ol(t);!r||e.attesaAssa>0||i.finestre[r.id]>=$.ASSE_PER_FINESTRA||un(e,r.interno)>$.DISTANZA_FINESTRA+zr||i.zombie.some(s=>s.finestra===r.id&&s.stato==="scavalca")||(i.finestre[r.id]+=1,li(i,e,$.PUNTI_ASSA),e.attesaAssa=$.RICOSTRUISCI_OGNI,n.push({k:"assaMessa",finestra:r.id,da:e.id}))}function dm(i,e,t){for(const n of e??[]){const r=i.giocatori.find(s=>s.id===n.da);if(r){if(n.tipo==="rianima"){r.rianimando=!!n.attivo;continue}if(!(r.stato!=="vivo"||i.fase==="fine"||i.fase==="vinta"))if(n.tipo==="colpo")qp(i,r,n,t);else if(n.tipo==="pronto")r.pronto=i.fase==="attesa"&&!!n.attivo;else{if(i.fase==="attesa")continue;n.tipo==="compra"?Hp(i,r,String(n.acquisto),n.arma,t):n.tipo==="assa"?hm(i,r,n.finestra,t):n.tipo==="frammento"?lm(i,r,Number(n.id),t):n.tipo==="granata"&&im(i,r,n,t)}}}}function ko(i,{tipo:e=null,finestre:t=null,corre:n}={}){const r=nl(new Set(i.porte)),s=t?Nn.filter(f=>t.includes(f.id)):Nn.filter(f=>r.has(f.zona)),o=s[Math.floor(Rn(i)*s.length)],a=e??tp(i.round,Rn(i)),c=Pr[a],l=c.boss?!1:n??(!!c.corre||Rn(i)<ip(i.round)),u=Math.round(oh(Math.max(1,i.round))*c.vita*(c.boss?ah(i.giocatori.length):1));i.zombie.push({id:i.prossimoId++,x:o.comparsa.x+(Rn(i)-.5)*2,z:o.comparsa.z+(Rn(i)-.5)*2,yaw:Math.atan2(-o.fuori.x,-o.fuori.z),stato:"arriva",finestra:o.id,vita:u,vitaMax:u,tipo:a,corre:l,variante:Math.floor(Rn(i)*4),timer:0,attesa:0,bersaglio:null})}function pm(i,e,t){if(i.fase==="attesa"){fm(i,e,t);return}if(i.fase==="finale"){tm(i,e,t);return}if(i.fase==="intervallo"){if(i.timerFase-=e,i.timerFase>0)return;i.round+=1,i.bonusRound=0,i.fase="gioco",i.daGenerare=np(i.round),i.attesaComparsa=1,i.presideTra=i.round%$.OGNI_PRESIDE===0?$.PRESIDE_DOPO:null;for(const s of i.giocatori){if(s.stato==="vivo"&&i.round>1&&(s.granate=Math.min($.GRANATE_MASSIME,s.granate+$.GRANATE_PER_ROUND)),s.stato!=="morto")continue;const o=Do[0];Object.assign(s,{stato:"vivo",vita:$.VITA,vitaMax:$.VITA,x:o.x,z:o.z,armi:["pistola"],armaAttiva:"pistola",bevande:[],rianimando:!1,teletrasporto:s.teletrasporto+1,granate:$.GRANATE_INIZIALI}),t.push({k:"rinato",a:s.id})}t.push({k:"round",round:i.round});return}if(i.fase!=="gioco")return;i.presideTra!==null&&(i.presideTra-=e,i.presideTra<=0&&(i.presideTra=null,ko(i,{tipo:"preside"}),t.push({k:"boss",tipo:"preside",fusibile:i.missione.presideFusibile})));const n=i.missione.generatore==="acceso";n&&i.daGenerare<2&&(i.daGenerare=2),i.attesaComparsa-=e;const r=i.zombie.filter(s=>s.stato!=="morto").length;if(i.attesaComparsa<=0&&i.daGenerare>0&&r<$.ZOMBIE_VIVI_MAX){ko(i),i.daGenerare-=1,i.attesaComparsa=sp(i.round)*(n?.6:1);return}i.daGenerare===0&&r===0&&i.presideTra===null&&(i.fase="intervallo",i.timerFase=$.INTERVALLO,t.push({k:"fineRound",round:i.round}))}function mm(i,e,t){let n=null;for(const r of fn(i)){const s=un(r,e);s>3||n&&s>=n.d||!il(e,r,t)||(n={g:r,d:s})}return n}function gm(i,e,t){const n=new Set(i.porte);i.attesaCampo-=e,(!i.campo||i.attesaCampo<=0)&&(i.campo=Pp(Ip(n),fn(i)),i.attesaCampo=Op);const r=Yo(n);for(const s of i.zombie){s.attesa=Math.max(0,s.attesa-e);const o=$o(s),a=o.finale&&(s.faseBoss??1)>=3,c=s.scatto>0?$.VELOCITA_SCATTO:(s.corre?$.VELOCITA_CORRE:$.VELOCITA_CAMMINA)*o.velocita*(a?1.25:1),l=$.PORTATA_ZOMBIE*o.portata,u=ol(s.finestra);if(s.stato==="morto"){s.timer-=e;continue}if(s.stato==="arriva"){const _=u.esterno.x-s.x,m=u.esterno.z-s.z,p=Math.hypot(_,m);if(p<.3)s.stato="assi",s.timer=$.ROMPI_ASSE_OGNI/(o.rompe??1);else{const v=Math.min(p,c*e);s.x+=_/p*v,s.z+=m/p*v,s.yaw=Math.atan2(_,m)}continue}if(s.stato==="assi"){s.yaw=Math.atan2(-u.fuori.x,-u.fuori.z);const _=i.zombie.some(m=>m!==s&&m.finestra===s.finestra&&m.stato==="scavalca");i.finestre[s.finestra]>0?(s.timer-=e,s.timer<=0&&(i.finestre[s.finestra]-=1,s.timer=$.ROMPI_ASSE_OGNI/(o.rompe??1),t.push({k:"assaRotta",finestra:s.finestra}))):_||(s.stato="scavalca",s.timer=$.SCAVALCA);continue}if(s.stato==="scavalca"){s.timer-=e;const _=1-Math.max(0,s.timer)/$.SCAVALCA;s.x=u.esterno.x+(u.interno.x-u.esterno.x)*_,s.z=u.esterno.z+(u.interno.z-u.esterno.z)*_,s.timer<=0&&(s.stato="dentro");continue}const f=mm(i,s,r);if(s.stato==="attacco"){if(s.timer-=e,f&&(s.yaw=Math.atan2(f.g.x-s.x,f.g.z-s.z)),s.timer>0)continue;const _=i.giocatori.find(m=>m.id===s.bersaglio&&m.stato==="vivo");_&&un(_,s)<=l+.4&&xm(i,_,t,$.DANNO_ZOMBIE*o.danno),s.stato="dentro",s.attesa=$.ATTESA_ATTACCO*(o.attesa??1)*(a?.7:1);continue}if(f&&f.d<=l&&s.attesa===0){s.stato="attacco",s.timer=Np*(o.carica??1),s.bersaglio=f.g.id,s.scatto=0,t.push({k:"attacco",zombie:s.id});continue}if(f&&f.d<=l*.8)continue;const h=o.finale?_m(i,s,e,r,t):null,d=h?{x:(h.x-s.x)/(un(h,s)||1),z:(h.z-s.z)/(un(h,s)||1)}:f&&f.d<1.5?{x:(f.g.x-s.x)/f.d,z:(f.g.z-s.z)/f.d}:Lp(i.campo,s.x,s.z);if(!d)continue;const g=dh(s,d.x*c*e,d.z*c*e,$.RAGGIO_ZOMBIE,r);s.x=g.x,s.z=g.z,s.yaw=Math.atan2(d.x,d.z)}vm(i.zombie.filter(s=>s.stato==="dentro"||s.stato==="arriva"||s.stato==="assi")),i.zombie=i.zombie.filter(s=>s.stato!=="morto"||s.timer>0)}function _m(i,e,t,n,r){if(e.prossimoScatto=Math.max(0,(e.prossimoScatto??0)-t),e.scatto=Math.max(0,(e.scatto??0)-t),e.scatto>0)return fn(i).find(o=>o.id===e.bersaglioScatto)??null;if(e.prossimoScatto>0||(e.faseBoss??1)<2)return null;const s=fn(i).map(o=>({g:o,d:un(o,e)})).filter(o=>o.d>4&&o.d<14&&il(e,o.g,n)).sort((o,a)=>o.d-a.d);return s.length===0?null:(e.scatto=$.DURATA_SCATTO,e.prossimoScatto=e.faseBoss>=3?5:8,e.bersaglioScatto=s[0].g.id,r.push({k:"scatto",zombie:e.id}),s[0].g)}function vm(i){for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length;t++){const n=i[e],r=i[t],s=r.x-n.x,o=r.z-n.z,a=Math.hypot(s,o);if(a>=eu||a<1e-6)continue;const c=(eu-a)/2,l=n.stato==="assi",u=r.stato==="assi";l||(n.x-=s/a*c,n.z-=o/a*c),u||(r.x+=s/a*c,r.z+=o/a*c)}}function xm(i,e,t,n=$.DANNO_ZOMBIE){e.vita-=n,e.ultimoDanno=i.tempo,t.push({k:"ferito",a:e.id}),!(e.vita>0)&&(Object.assign(e,{stato:"terra",vita:0,timerTerra:$.TEMPO_A_TERRA,bevande:[],vitaMax:$.VITA,progressoRianimazione:0,rianimando:!1}),t.push({k:"aTerra",a:e.id}))}function Mm(i,e,t){for(const n of i.giocatori){if(n.attesaAssa=Math.max(0,n.attesaAssa-e),n.stato==="vivo"&&i.tempo-n.ultimoDanno>$.RIGENERA_DOPO&&(n.vita=Math.min(n.vitaMax,n.vita+$.RIGENERA_AL_SECONDO*e)),n.stato!=="terra")continue;const r=fn(i).find(s=>s.rianimando&&un(s,n)<=$.RIANIMA_DISTANZA+zr);if(r){n.progressoRianimazione+=e;const s=r.bevande.includes("ritorno")?$.RIANIMA_RAPIDO:$.RIANIMA_IN;n.progressoRianimazione>=s&&(Object.assign(n,{stato:"vivo",vita:$.VITA,progressoRianimazione:0,ultimoDanno:i.tempo}),t.push({k:"rianimato",a:n.id,da:r.id}));continue}n.progressoRianimazione=0,n.timerTerra-=e,n.timerTerra<=0&&(n.stato="morto",n.rianimando=!1,t.push({k:"morto",a:n.id}))}}function Sm(i,e,t){const n=i.cassa;n.stato==="aperta"&&(n.timer-=e,!(n.timer>0)&&(Object.assign(n,{stato:"chiusa",arma:null,per:null,timer:0}),t.push({k:"cassaChiusa"})))}function ym(i,e,{posizioni:t={},azioni:n=[]}={}){const r=[];return i.fase==="fine"||i.fase==="vinta"||(i.tempo+=e,Gp(i,t),dm(i,n,r),pm(i,e,r),gm(i,e,r),Mm(i,e,r),Sm(i,e,r),Xp(i,e,r),cm(i,e,r),sm(i,e,r),Qp(i,e,r),i.fase==="vinta")||i.giocatori.length>0&&fn(i).length===0&&(i.fase="fine",r.push({k:"fine",round:i.round,giocatori:i.giocatori.map(s=>({nome:s.nome,punti:s.punti,uccisioni:s.uccisioni}))})),r}const Th=Object.freeze(["arriva","assi","scavalca","dentro","attacco","morto"]),wh=Object.freeze(["vivo","terra","morto"]),Rh=Object.freeze(["intervallo","gioco","fine","attesa","finale","vinta"]),Ch=Object.freeze(["fermo","acceso","finito"]),Ih=Object.freeze(["libero","lavora","pronta"]),Et=i=>Math.round(i*100)/100;function Ph(i){var e;return{t:Math.round(i.tempo*1e3)/1e3,f:Rh.indexOf(i.fase),r:i.round,tf:Et(Math.max(0,i.timerFase)),z:i.zombie.map(t=>[t.id,Et(t.x),Et(t.z),Et(t.yaw),Th.indexOf(t.stato),t.corre?1:0,t.variante,Math.max(0,Math.round(t.vita/t.vitaMax*100)),Math.max(0,rh.indexOf(t.tipo??"normale"))]),w:Nn.map(t=>i.finestre[t.id]),p:[...i.porte],g:i.giocatori.map(t=>({id:t.id,n:t.nome,x:Et(t.x),z:Et(t.z),y:Et(t.yaw),p:Et(t.pitch),s:wh.indexOf(t.stato),v:Math.round(t.vita),vm:t.vitaMax,pt:t.punti,a:t.armaAttiva,ar:[...t.armi],b:[...t.bevande],c:t.colpi,tt:Et(t.timerTerra),pr:Et(t.progressoRianimazione),ri:t.rianimando?1:0,u:t.uccisioni,tp:t.teletrasporto,ok:t.pronto?1:0,gn:t.granate??0})),c:[i.cassa.stato==="aperta"?1:0,i.cassa.arma??"",i.cassa.per??"",Et(i.cassa.timer)],e:i.corrente?1:0,k:[Ih.indexOf(i.potenziatore.stato),i.potenziatore.arma??"",i.potenziatore.per??"",Et(i.potenziatore.timer)],b:(i.bonus??[]).map(t=>[t.id,kn.indexOf(t.tipo),Et(t.x),Et(t.z),Et(t.timer)]),x:sh.map(t=>{var n;return Et(((n=i.effetti)==null?void 0:n[t])??0)}),fr:[...i.frammenti??[]],cp:i.campanella?1:0,co:i.conto===null||i.conto===void 0?-1:Et(i.conto),gr:(i.granate??[]).map(t=>[t.id,Et(t.x),Et(t.y),Et(t.z)]),m:i.missione?[i.missione.fusibili,i.missione.messi,Math.max(0,Ch.indexOf(i.missione.generatore)),Math.round(i.missione.progresso*100),i.missione.presideFusibile?1:0]:[0,0,0,0,1],fo:(((e=i.missione)==null?void 0:e.aTerra)??[]).map(t=>[t.id,Et(t.x),Et(t.z),Et(t.y)])}}function Lh(i){var e,t,n,r,s;return{tempo:i.t,fase:Rh[i.f],round:i.r,timerFase:i.tf,zombie:i.z.map(([o,a,c,l,u,f,h,d,g])=>({id:o,x:a,z:c,yaw:l,stato:Th[u],corre:!!f,variante:h,vita:d,tipo:rh[g]??"normale"})),finestre:Object.fromEntries(Nn.map((o,a)=>[o.id,i.w[a]])),porte:new Set(i.p),giocatori:i.g.map(o=>({id:o.id,nome:o.n,x:o.x,z:o.z,yaw:o.y,pitch:o.p,stato:wh[o.s],vita:o.v,vitaMax:o.vm,punti:o.pt,armaAttiva:o.a,armi:o.ar,bevande:o.b,colpi:o.c,timerTerra:o.tt,progressoRianimazione:o.pr,rianimando:!!o.ri,uccisioni:o.u,teletrasporto:o.tp,pronto:!!o.ok,granate:o.gn??0})),cassa:{stato:i.c[0]?"aperta":"chiusa",arma:i.c[1]||null,per:i.c[2]||null,timer:i.c[3]},corrente:!!i.e,potenziatore:{stato:Ih[i.k[0]],arma:i.k[1]||null,per:i.k[2]||null,timer:i.k[3]},bonus:(i.b??[]).map(([o,a,c,l,u])=>({id:o,tipo:kn[a],x:c,z:l,timer:u})),effetti:Object.fromEntries(sh.map((o,a)=>{var c;return[o,((c=i.x)==null?void 0:c[a])??0]})),frammenti:i.fr??[],campanella:!!i.cp,conto:i.co===void 0||i.co<0?null:i.co,granate:(i.gr??[]).map(([o,a,c,l])=>({id:o,x:a,y:c,z:l})),missione:{fusibili:((e=i.m)==null?void 0:e[0])??0,messi:((t=i.m)==null?void 0:t[1])??0,generatore:Ch[((n=i.m)==null?void 0:n[2])??0],progresso:(((r=i.m)==null?void 0:r[3])??0)/100,presideFusibile:!!(((s=i.m)==null?void 0:s[4])??1),aTerra:(i.fo??[]).map(([o,a,c,l])=>({id:o,x:a,z:c,y:l}))}}}const Yi=(i,e,t)=>i+(e-i)*t;function bm(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*t}function iu(i,e,t,n){const r=new Map(i.map(s=>[s.id,s]));return e.map(s=>{const o=r.get(s.id);if(!o||o.teletrasporto!==s.teletrasporto)return s;const a={...s,x:Yi(o.x,s.x,t),z:Yi(o.z,s.z,t),yaw:bm(o.yaw,s.yaw,t)};return n&&(a.pitch=Yi(o.pitch,s.pitch,t)),a})}function Am(i,e,t){const n=new Map(i.map(r=>[r.id,r]));return e.map(r=>{const s=n.get(r.id);return s?{id:r.id,x:Yi(s.x,r.x,t),y:Yi(s.y,r.y,t),z:Yi(s.z,r.z,t)}:r})}function Em(i,e,t){const n=Math.min(1,Math.max(0,t));return{...e,tempo:Yi(i.tempo,e.tempo,n),zombie:iu(i.zombie,e.zombie,n,!1),giocatori:iu(i.giocatori,e.giocatori,n,!0),granate:Am(i.granate??[],e.granate??[],n)}}const Tm="https://dxqmblsmawdtqhtekfnf.supabase.co",wm="sb_publishable_mjj5GumFWTwYleVvkV4pcw_tibE8HUI",Rm=Object.freeze([{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]),Cm=6e3,Im=25e3,ru=1e3,Pm=15e3,Lm=1e3,zh="zombie",zm=200;function Vo(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function Om(i){const e=new BroadcastChannel(`${zh}-${i}`),t=Vo(),n=Vo();return e.onmessage=r=>t.avvisa(r.data),{invia:r=>e.postMessage(r),suMessaggio:t.aggiungi,suStato:r=>{n.aggiungi(r),r("online")},chiudi:()=>e.close()}}function Nm(i){const e=`realtime:${zh}-${i}`,t=`${Tm.replace(/^http/,"ws")}/realtime/v1/websocket?apikey=${encodeURIComponent(wm)}&vsn=1.0.0`,n=Vo(),r=Vo(),s=[];let o=null,a=!1,c=0,l=null,u=null,f=ru,h=!1,d="connessione";const g=v=>{d=v,r.avvisa(v)},_=(v,S,x=e)=>{(o==null?void 0:o.readyState)===WebSocket.OPEN&&o.send(JSON.stringify({topic:x,event:v,payload:S,ref:String(++c),join_ref:"1"}))},m=v=>_("broadcast",{type:"broadcast",event:"m",payload:v});function p(){if(h)return;g("connessione"),a=!1;const v=new WebSocket(t);o=v,v.onopen=()=>{_("phx_join",{config:{broadcast:{self:!1,ack:!1},presence:{key:""},private:!1}}),clearInterval(l),l=setInterval(()=>_("heartbeat",{},"phoenix"),Im)},v.onmessage=S=>{var M,y,E,R;let x;try{x=JSON.parse(S.data)}catch{return}x.topic===e&&(x.event==="phx_reply"&&!a&&((M=x.payload)==null?void 0:M.status)!=="ok"?(console.error("Supabase ha rifiutato l'ingresso nel canale della stanza:",(y=x.payload)==null?void 0:y.response),v.close()):x.event==="phx_reply"&&((E=x.payload)==null?void 0:E.status)==="ok"&&!a?(a=!0,f=ru,g("online"),s.splice(0).forEach(m)):x.event==="broadcast"&&((R=x.payload)==null?void 0:R.event)==="m"?n.avvisa(x.payload.payload):(x.event==="phx_error"||x.event==="phx_close")&&v.close())},v.onclose=()=>{o!==v||h||(clearInterval(l),a=!1,g("offline"),u=setTimeout(p,f),f=Math.min(Pm,f*2))}}return p(),{invia(v,{scartabile:S=!1}={}){if(a){m(v);return}S||(s.length>=zm&&s.shift(),s.push(v))},suMessaggio:n.aggiungi,suStato:v=>{r.aggiungi(v),v(d)},chiudi(){h=!0,clearTimeout(u),clearInterval(l),o==null||o.close()}}}function Dm(i,{locale:e=!1}={}){return e?Om(i):Nm(i)}const su="ABCDEFGHJKLMNPQRSTUVWXYZ",Um=16,Fm=64;function Bm(i=Math.random){return Array.from({length:4},()=>su[Math.floor(i()*su.length)]).join("")}function Oh(i){const e=String(i??"").trim().toUpperCase();return/^[A-HJ-NP-Z]{4}$/.test(e)?e:null}function bs(i){return String(i??"").replace(/[\u0000-\u001f]/g,"").trim().slice(0,Um)||null}const Ct=i=>typeof i=="number"&&Number.isFinite(i),As=(i,e=Fm)=>typeof i=="string"&&i.length>0&&i.length<=e,Es=i=>typeof i=="string"&&Object.hasOwn(Tt,i),Xs=(i,e)=>Array.isArray(i)&&i.every(t=>Array.isArray(t)&&t.length===e&&t.every(Ct));function km(i){return!!i&&typeof i=="object"&&As(i.id)&&typeof i.n=="string"&&[i.x,i.z,i.y,i.p,i.s,i.v,i.vm,i.pt,i.c,i.tt,i.pr,i.ri,i.u,i.tp,i.gn].every(Ct)&&Es(i.a)&&Array.isArray(i.ar)&&i.ar.every(Es)&&Array.isArray(i.b)&&i.b.every(e=>Object.hasOwn(Zi,e))}function Vm(i){return!!i&&typeof i=="object"&&[i.t,i.f,i.r,i.tf].every(Ct)&&Xs(i.z,9)&&Array.isArray(i.w)&&i.w.every(Ct)&&Array.isArray(i.p)&&i.p.every(e=>As(e))&&Array.isArray(i.g)&&i.g.every(km)&&Array.isArray(i.c)&&i.c.length===4&&Ct(i.e)&&Array.isArray(i.k)&&i.k.length===4&&[0,1,2].includes(i.k[0])&&Ct(i.k[3])&&(i.k[1]===""||Es(i.k[1]))&&Xs(i.b,5)&&Array.isArray(i.x)&&i.x.every(Ct)&&Array.isArray(i.fr)&&i.fr.every(Ct)&&Ct(i.cp)&&Ct(i.co)&&Xs(i.gr,4)&&Array.isArray(i.m)&&i.m.length===5&&i.m.every(Ct)&&Xs(i.fo,4)}function Gm(i){return!i||typeof i!="object"?!1:i.tipo==="colpo"?Ct(i.zombie)&&Ct(i.danno):i.tipo==="compra"?As(i.acquisto)&&(i.arma===void 0||Es(i.arma)):i.tipo==="assa"?As(i.finestra):i.tipo==="rianima"||i.tipo==="pronto"?typeof i.attivo=="boolean":i.tipo==="frammento"?Ct(i.id):i.tipo==="granata"?Ct(i.yaw)&&Ct(i.pitch):!1}const Hm={ciao:i=>bs(i.nome)!==null&&As(i.id),lobby:i=>bs(i.nomeHost)!==null,inizia:i=>Ct(i.seme),g:i=>[i.x,i.z,i.yaw,i.pitch,i.colpi,i.tp].every(Ct)&&Es(i.arma),az:i=>Gm(i.a),st:i=>Ct(i.g)&&Vm(i.ist),ev:i=>Array.isArray(i.eventi)&&i.eventi.every(e=>e&&typeof e.k=="string"),ping:i=>Ct(i.n),pong:i=>Ct(i.n)};function Wm(i){if(!i||typeof i!="object"||typeof i.t!="string")return null;const e=Hm[i.t];return e&&e(i)?i:null}const Xm=5e3,jm=2500,qm=64*1024;function ou(){const i=new Set;return{aggiungi:e=>i.add(e),avvisa:e=>i.forEach(t=>t(e))}}function Ym({segnali:i,sonoHost:e,mioId:t,soloRiserva:n=!1}){const r=ou(),s=ou();let o=null,a=null,c={},l="attesa",u=null,f=null,h=0,d=[],g=0;const _=L=>{l!==L&&(l=L,s.avvisa(L))},m=(L,D={},q={})=>i.invia({tipo:L,da:t,a:o,...D},q);function p(L){const D=Wm(L);D&&(h=performance.now(),r.avvisa(D))}function v(){var L,D;((L=c.veloce)==null?void 0:L.readyState)!=="open"||((D=c.sicuro)==null?void 0:D.readyState)!=="open"||(clearTimeout(u),_("diretto"))}function S(){clearTimeout(u),u=setTimeout(()=>{l!=="diretto"&&_("riserva")},Cm)}function x(L){c[L.label]=L,L.onmessage=D=>{let q;try{q=JSON.parse(D.data)}catch{return}p(q)},L.onopen=v,L.onclose=()=>{c[L.label]===L&&l==="diretto"&&_("riserva")}}function M(){for(const L of Object.values(c))L.onopen=L.onclose=L.onmessage=null,L.close();c={},a&&(a.onicecandidate=a.onconnectionstatechange=a.ondatachannel=null,a.close()),a=null}function y(){if(M(),_("collegamento"),n)return clearTimeout(u),_("riserva"),null;const L=new RTCPeerConnection({iceServers:Rm});return a=L,L.onicecandidate=D=>{D.candidate&&m("ice",{c:D.candidate.toJSON()})},L.onconnectionstatechange=()=>{a===L&&(L.connectionState==="connected"?v():["failed","closed","disconnected"].includes(L.connectionState)&&l==="diretto"&&_("riserva"))},L.ondatachannel=D=>x(D.channel),S(),L}async function E(L){for(const D of d.splice(0)){if(a!==L)return;await L.addIceCandidate(D).catch(()=>{})}}async function R(L){o=L,g=performance.now(),h=performance.now(),d=[],m("benvenuto");const D=y();if(!D)return;x(D.createDataChannel("veloce",{ordered:!1,maxRetransmits:0})),x(D.createDataChannel("sicuro"));const q=await D.createOffer();a===D&&(await D.setLocalDescription(q),a===D&&m("offerta",{sdp:D.localDescription.toJSON()}))}async function b(L){const D=y();if(!D||(await D.setRemoteDescription(L),a!==D))return;await E(D);const q=await D.createAnswer();a===D&&(await D.setLocalDescription(q),a===D&&m("risposta",{sdp:D.localDescription.toJSON()}))}const A=L=>{console.error("Collegamento diretto non riuscito, passo dalla riserva:",L),_("riserva")};function I(L){o!==L&&(o=L,clearInterval(f),n?y():(_("collegamento"),S()))}function k(L){if(!(!L||typeof L!="object"||typeof L.da!="string"||L.da===t)){if(e&&L.tipo==="ciao"){if(L.da===o){l==="collegamento"&&performance.now()-g>jm&&R(L.da).catch(A);return}if(o&&performance.now()-h<Xm){i.invia({tipo:"occupata",da:t,a:L.da});return}R(L.da).catch(A);return}if(L.a===t){if(!e&&(L.tipo==="benvenuto"||L.tipo==="offerta"&&!o)&&I(L.da),!e&&L.tipo==="occupata"){o||_("occupata");return}if(L.da===o)if(!e&&L.tipo==="offerta")b(L.sdp).catch(A);else if(e&&L.tipo==="risposta"&&a){const D=a;D.setRemoteDescription(L.sdp).then(()=>E(D)).catch(A)}else L.tipo==="ice"?a!=null&&a.remoteDescription?a.addIceCandidate(L.c).catch(()=>{}):d.push(L.c):L.tipo==="gioco"&&p(L.m)}}}if(i.suMessaggio(k),!e){const L=()=>i.invia({tipo:"ciao",da:t});L(),f=setInterval(L,Lm)}return{get modo(){return l},get altroId(){return o},silenzio:()=>h?performance.now()-h:1/0,suMessaggio:r.aggiungi,suStato:s.aggiungi,invia(L,{veloce:D=!1}={}){if(l==="diretto"){const q=D?c.veloce:c.sicuro;if((q==null?void 0:q.readyState)==="open"){(!D||q.bufferedAmount<qm)&&q.send(JSON.stringify(L));return}}o&&(l==="riserva"||l==="diretto")&&m("gioco",{m:L},{scartabile:D})},chiudi(){clearInterval(f),clearTimeout(u),M(),i.chiudi()}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ll="170",$m=0,au=1,Km=2,Nh=1,Zm=2,ti=3,ui=0,en=1,cn=2,wi=0,$i=1,Or=2,cu=3,lu=4,Jm=5,Wi=100,Qm=101,e0=102,t0=103,n0=104,i0=200,r0=201,s0=202,o0=203,ic=204,rc=205,a0=206,c0=207,l0=208,u0=209,f0=210,h0=211,d0=212,p0=213,m0=214,sc=0,oc=1,ac=2,Nr=3,cc=4,lc=5,uc=6,fc=7,Dh=0,g0=1,_0=2,Ri=0,v0=1,x0=2,M0=3,Uh=4,S0=5,y0=6,b0=7,uu="attached",A0="detached",Fh=300,Dr=301,Ur=302,hc=303,dc=304,Ko=306,Ii=1e3,Ai=1001,Go=1002,Ht=1003,Bh=1004,fs=1005,ln=1006,To=1007,si=1008,fi=1009,kh=1010,Vh=1011,Ts=1012,ul=1013,Qi=1014,In=1015,Ls=1016,fl=1017,hl=1018,Fr=1020,Gh=35902,Hh=1021,Wh=1022,Mn=1023,Xh=1024,jh=1025,wr=1026,Br=1027,dl=1028,pl=1029,qh=1030,ml=1031,gl=1033,wo=33776,Ro=33777,Co=33778,Io=33779,pc=35840,mc=35841,gc=35842,_c=35843,vc=36196,xc=37492,Mc=37496,Sc=37808,yc=37809,bc=37810,Ac=37811,Ec=37812,Tc=37813,wc=37814,Rc=37815,Cc=37816,Ic=37817,Pc=37818,Lc=37819,zc=37820,Oc=37821,Po=36492,Nc=36494,Dc=36495,Yh=36283,Uc=36284,Fc=36285,Bc=36286,$h=2200,E0=2201,T0=2202,ws=2300,Rs=2301,ca=2302,br=2400,Ar=2401,Ho=2402,_l=2500,w0=2501,R0=0,Kh=1,kc=2,C0=3200,I0=3201,Zh=0,P0=1,bi="",Pt="srgb",nn="srgb-linear",Zo="linear",pt="srgb",ir=7680,fu=519,L0=512,z0=513,O0=514,Jh=515,N0=516,D0=517,U0=518,F0=519,Vc=35044,hu="300 es",oi=2e3,Wo=2001;class tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let du=1234567;const ps=Math.PI/180,kr=180/Math.PI;function Ln(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Nt(i,e,t){return Math.max(e,Math.min(t,i))}function vl(i,e){return(i%e+e)%e}function B0(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function k0(i,e,t){return i!==e?(t-i)/(e-i):0}function ms(i,e,t){return(1-t)*i+t*e}function V0(i,e,t,n){return ms(i,e,1-Math.exp(-t*n))}function G0(i,e=1){return e-Math.abs(vl(i,e*2)-e)}function H0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function W0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function X0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function j0(i,e){return i+Math.random()*(e-i)}function q0(i){return i*(.5-Math.random())}function Y0(i){i!==void 0&&(du=i);let e=du+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $0(i){return i*ps}function K0(i){return i*kr}function Z0(i){return(i&i-1)===0&&i!==0}function J0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Q0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function eg(i,e,t,n,r){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),u=o((e+n)/2),f=s((e-n)/2),h=o((e-n)/2),d=s((n-e)/2),g=o((n-e)/2);switch(r){case"XYX":i.set(a*u,c*f,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*f,a*l);break;case"ZXZ":i.set(c*f,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*d,a*l);break;case"YXY":i.set(c*d,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Gc={DEG2RAD:ps,RAD2DEG:kr,generateUUID:Ln,clamp:Nt,euclideanModulo:vl,mapLinear:B0,inverseLerp:k0,lerp:ms,damp:V0,pingpong:G0,smoothstep:H0,smootherstep:W0,randInt:X0,randFloat:j0,randFloatSpread:q0,seededRandom:Y0,degToRad:$0,radToDeg:K0,isPowerOfTwo:Z0,ceilPowerOfTwo:J0,floorPowerOfTwo:Q0,setQuaternionFromProperEuler:eg,normalize:dt,denormalize:Cn};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,r,s,o,a,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],v=r[1],S=r[4],x=r[7],M=r[2],y=r[5],E=r[8];return s[0]=o*_+a*v+c*M,s[3]=o*m+a*S+c*y,s[6]=o*p+a*x+c*E,s[1]=l*_+u*v+f*M,s[4]=l*m+u*S+f*y,s[7]=l*p+u*x+f*E,s[2]=h*_+d*v+g*M,s[5]=h*m+d*S+g*y,s[8]=h*p+d*x+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=u*o-a*l,h=a*c-u*s,d=l*s-o*c,g=t*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*l-u*n)*_,e[2]=(a*n-r*o)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(la.makeScale(e,t)),this}rotate(e){return this.premultiply(la.makeRotation(-e)),this}translate(e,t){return this.premultiply(la.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const la=new Ke;function Qh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Cs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function tg(){const i=Cs("canvas");return i.style.display="block",i}const pu={};function hs(i){i in pu||(pu[i]=!0,console.warn(i))}function ng(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function ig(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function rg(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const tt={enabled:!0,workingColorSpace:nn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===pt&&(i.r=ci(i.r),i.g=ci(i.g),i.b=ci(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===pt&&(i.r=Rr(i.r),i.g=Rr(i.g),i.b=Rr(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===bi?Zo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Rr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const mu=[.64,.33,.3,.6,.15,.06],gu=[.2126,.7152,.0722],_u=[.3127,.329],vu=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xu=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);tt.define({[nn]:{primaries:mu,whitePoint:_u,transfer:Zo,toXYZ:vu,fromXYZ:xu,luminanceCoefficients:gu,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:mu,whitePoint:_u,transfer:pt,toXYZ:vu,fromXYZ:xu,luminanceCoefficients:gu,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}});let rr;class sg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{rr===void 0&&(rr=Cs("canvas")),rr.width=e.width,rr.height=e.height;const n=rr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=rr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ci(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let og=0;class ed{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=Ln(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ua(r[o].image)):s.push(ua(r[o]))}else s=ua(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?sg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ag=0;class Dt extends tr{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=Ai,r=Ai,s=ln,o=si,a=Mn,c=fi,l=Dt.DEFAULT_ANISOTROPY,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ag++}),this.uuid=Ln(),this.name="",this.source=new ed(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ii:e.x=e.x-Math.floor(e.x);break;case Ai:e.x=e.x<0?0:1;break;case Go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ii:e.y=e.y-Math.floor(e.y);break;case Ai:e.y=e.y<0?0:1;break;case Go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=Fh;Dt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,r=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,x=(d+1)/2,M=(p+1)/2,y=(u+h)/4,E=(f+_)/4,R=(g+m)/4;return S>x&&S>M?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=y/n,s=E/n):x>M?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=y/r,s=R/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=E/s,r=R/s),this.set(n,r,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-_)/v,this.z=(h-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cg extends tr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Dt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ed(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class er extends cg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class td extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class lg extends Dt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],f=n[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==h||l!==d||u!==g){let m=1-a;const p=c*h+l*d+u*g+f*_,v=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const M=Math.sqrt(S),y=Math.atan2(M,p*v);m=Math.sin(m*y)/M,a=Math.sin(a*y)/M}const x=a*v;if(c=c*m+h*x,l=l*m+d*x,u=u*m+g*x,f=f*m+_*x,m===1-a){const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+c*d-l*h,e[t+1]=c*g+u*h+l*f-a*d,e[t+2]=l*g+u*d+a*h-c*f,e[t+3]=u*g-a*f-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),f=a(s/2),h=c(n/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),u=2*(a*t-s*r),f=2*(s*n-o*t);return this.x=t+c*l+o*f-a*u,this.y=n+c*u+a*l-s*f,this.z=r+c*f+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fa.copy(this).projectOnVector(e),this.sub(fa)}reflect(e){return this.sub(fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fa=new P,Mu=new zn;class hi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(s,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),js.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),js.copy(n.boundingBox)),js.applyMatrix4(e.matrixWorld),this.union(js)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jr),qs.subVectors(this.max,Jr),sr.subVectors(e.a,Jr),or.subVectors(e.b,Jr),ar.subVectors(e.c,Jr),mi.subVectors(or,sr),gi.subVectors(ar,or),Oi.subVectors(sr,ar);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Oi.z,Oi.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Oi.z,0,-Oi.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Oi.y,Oi.x,0];return!ha(t,sr,or,ar,qs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,sr,or,ar,qs))?!1:(Ys.crossVectors(mi,gi),t=[Ys.x,Ys.y,Ys.z],ha(t,sr,or,ar,qs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $n=[new P,new P,new P,new P,new P,new P,new P,new P],An=new P,js=new hi,sr=new P,or=new P,ar=new P,mi=new P,gi=new P,Oi=new P,Jr=new P,qs=new P,Ys=new P,Ni=new P;function ha(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ni.fromArray(i,s);const a=r.x*Math.abs(Ni.x)+r.y*Math.abs(Ni.y)+r.z*Math.abs(Ni.z),c=e.dot(Ni),l=t.dot(Ni),u=n.dot(Ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const ug=new hi,Qr=new P,da=new P;class Hn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ug.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qr.subVectors(e,this.center);const t=Qr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(da.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qr.copy(e.center).add(da)),this.expandByPoint(Qr.copy(e.center).sub(da))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Kn=new P,pa=new P,$s=new P,_i=new P,ma=new P,Ks=new P,ga=new P;class Jo{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){pa.copy(e).add(t).multiplyScalar(.5),$s.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(pa);const s=e.distanceTo(t)*.5,o=-this.direction.dot($s),a=_i.dot(this.direction),c=-_i.dot($s),l=_i.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*c-a,h=o*a-c,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*c)+l}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),d=h*(h+2*c)+l):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+h*(h+2*c)+l);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(pa).addScaledVector($s,h),d}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const n=Kn.dot(this.direction),r=Kn.dot(Kn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,r,s){ma.subVectors(t,e),Ks.subVectors(n,e),ga.crossVectors(ma,Ks);let o=this.direction.dot(ga),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_i.subVectors(this.origin,e);const c=a*this.direction.dot(Ks.crossVectors(_i,Ks));if(c<0)return null;const l=a*this.direction.dot(ma.cross(_i));if(l<0||c+l>o)return null;const u=-a*_i.dot(ga);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m)}set(e,t,n,r,s,o,a,c,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/cr.setFromMatrixColumn(e,0).length(),s=1/cr.setFromMatrixColumn(e,1).length(),o=1/cr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-a*c,t[2]=_-h*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*c}else if(e.order==="ZXY"){const h=c*u,d=c*f,g=l*u,_=l*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=c*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const h=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fg,e,hg)}lookAt(e,t,n){const r=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),vi.crossVectors(n,on),vi.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),vi.crossVectors(n,on)),vi.normalize(),Zs.crossVectors(on,vi),r[0]=vi.x,r[4]=Zs.x,r[8]=on.x,r[1]=vi.y,r[5]=Zs.y,r[9]=on.y,r[2]=vi.z,r[6]=Zs.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],S=n[7],x=n[11],M=n[15],y=r[0],E=r[4],R=r[8],b=r[12],A=r[1],I=r[5],k=r[9],L=r[13],D=r[2],q=r[6],X=r[10],ie=r[14],j=r[3],Z=r[7],ne=r[11],me=r[15];return s[0]=o*y+a*A+c*D+l*j,s[4]=o*E+a*I+c*q+l*Z,s[8]=o*R+a*k+c*X+l*ne,s[12]=o*b+a*L+c*ie+l*me,s[1]=u*y+f*A+h*D+d*j,s[5]=u*E+f*I+h*q+d*Z,s[9]=u*R+f*k+h*X+d*ne,s[13]=u*b+f*L+h*ie+d*me,s[2]=g*y+_*A+m*D+p*j,s[6]=g*E+_*I+m*q+p*Z,s[10]=g*R+_*k+m*X+p*ne,s[14]=g*b+_*L+m*ie+p*me,s[3]=v*y+S*A+x*D+M*j,s[7]=v*E+S*I+x*q+M*Z,s[11]=v*R+S*k+x*X+M*ne,s[15]=v*b+S*L+x*ie+M*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*f-r*l*f-s*a*h+n*l*h+r*a*d-n*c*d)+_*(+t*c*d-t*l*h+s*o*h-r*o*d+r*l*u-s*c*u)+m*(+t*l*f-t*a*d-s*o*f+n*o*d+s*a*u-n*l*u)+p*(-r*a*u-t*c*f+t*a*h+r*o*f-n*o*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=f*m*l-_*h*l+_*c*d-a*m*d-f*c*p+a*h*p,S=g*h*l-u*m*l-g*c*d+o*m*d+u*c*p-o*h*p,x=u*_*l-g*f*l+g*a*d-o*_*d-u*a*p+o*f*p,M=g*f*c-u*_*c-g*a*h+o*_*h+u*a*m-o*f*m,y=t*v+n*S+r*x+s*M;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/y;return e[0]=v*E,e[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*E,e[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*p+n*c*p)*E,e[3]=(f*c*s-a*h*s-f*r*l+n*h*l+a*r*d-n*c*d)*E,e[4]=S*E,e[5]=(u*m*s-g*h*s+g*r*d-t*m*d-u*r*p+t*h*p)*E,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*p-t*c*p)*E,e[7]=(o*h*s-u*c*s+u*r*l-t*h*l-o*r*d+t*c*d)*E,e[8]=x*E,e[9]=(g*f*s-u*_*s-g*n*d+t*_*d+u*n*p-t*f*p)*E,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*f*s-u*n*l+t*f*l+o*n*d-t*a*d)*E,e[12]=M*E,e[13]=(u*_*r-g*f*r+g*n*h-t*_*h-u*n*m+t*f*m)*E,e[14]=(g*a*r-o*_*r-g*n*c+t*_*c+o*n*m-t*a*m)*E,e[15]=(o*f*r-u*a*r+u*n*c-t*f*c-o*n*h+t*a*h)*E,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,f=a+a,h=s*l,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,v=c*l,S=c*u,x=c*f,M=n.x,y=n.y,E=n.z;return r[0]=(1-(_+p))*M,r[1]=(d+x)*M,r[2]=(g-S)*M,r[3]=0,r[4]=(d-x)*y,r[5]=(1-(h+p))*y,r[6]=(m+v)*y,r[7]=0,r[8]=(g+S)*E,r[9]=(m-v)*E,r[10]=(1-(h+_))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=cr.set(r[0],r[1],r[2]).length();const o=cr.set(r[4],r[5],r[6]).length(),a=cr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],En.copy(this);const l=1/s,u=1/o,f=1/a;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=f,En.elements[9]*=f,En.elements[10]*=f,t.setFromRotationMatrix(En),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=oi){const c=this.elements,l=2*s/(t-e),u=2*s/(n-r),f=(t+e)/(t-e),h=(n+r)/(n-r);let d,g;if(a===oi)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Wo)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=oi){const c=this.elements,l=1/(t-e),u=1/(n-r),f=1/(o-s),h=(t+e)*l,d=(n+r)*u;let g,_;if(a===oi)g=(o+s)*f,_=-2*f;else if(a===Wo)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const cr=new P,En=new Xe,fg=new P(0,0,0),hg=new P(1,1,1),vi=new P,Zs=new P,on=new P,Su=new Xe,yu=new zn;class Gn{constructor(e=0,t=0,n=0,r=Gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yu.setFromEuler(this),this.setFromQuaternion(yu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gn.DEFAULT_ORDER="XYZ";class nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dg=0;const bu=new P,lr=new zn,Zn=new Xe,Js=new P,es=new P,pg=new P,mg=new zn,Au=new P(1,0,0),Eu=new P(0,1,0),Tu=new P(0,0,1),wu={type:"added"},gg={type:"removed"},ur={type:"childadded",child:null},_a={type:"childremoved",child:null};class xt extends tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new P,t=new Gn,n=new zn,r=new P(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Xe},normalMatrix:{value:new Ke}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.multiply(lr),this}rotateOnWorldAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.premultiply(lr),this}rotateX(e){return this.rotateOnAxis(Au,e)}rotateY(e){return this.rotateOnAxis(Eu,e)}rotateZ(e){return this.rotateOnAxis(Tu,e)}translateOnAxis(e,t){return bu.copy(e).applyQuaternion(this.quaternion),this.position.add(bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Au,e)}translateY(e){return this.translateOnAxis(Eu,e)}translateZ(e){return this.translateOnAxis(Tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(es,Js,this.up):Zn.lookAt(Js,es,this.up),this.quaternion.setFromRotationMatrix(Zn),r&&(Zn.extractRotation(r.matrixWorld),lr.setFromRotationMatrix(Zn),this.quaternion.premultiply(lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wu),ur.child=e,this.dispatchEvent(ur),ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gg),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wu),ur.child=e,this.dispatchEvent(ur),ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,e,pg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,mg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}xt.DEFAULT_UP=new P(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new P,Jn=new P,va=new P,Qn=new P,fr=new P,hr=new P,Ru=new P,xa=new P,Ma=new P,Sa=new P,ya=new at,ba=new at,Aa=new at;class xn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Tn.subVectors(e,t),r.cross(Tn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Tn.subVectors(r,t),Jn.subVectors(n,t),va.subVectors(e,t);const o=Tn.dot(Tn),a=Tn.dot(Jn),c=Tn.dot(va),l=Jn.dot(Jn),u=Jn.dot(va),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,g=(o*u-a*c)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Qn.x),c.addScaledVector(o,Qn.y),c.addScaledVector(a,Qn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return ya.setScalar(0),ba.setScalar(0),Aa.setScalar(0),ya.fromBufferAttribute(e,t),ba.fromBufferAttribute(e,n),Aa.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ya,s.x),o.addScaledVector(ba,s.y),o.addScaledVector(Aa,s.z),o}static isFrontFacing(e,t,n,r){return Tn.subVectors(n,t),Jn.subVectors(e,t),Tn.cross(Jn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Tn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return xn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;fr.subVectors(r,n),hr.subVectors(s,n),xa.subVectors(e,n);const c=fr.dot(xa),l=hr.dot(xa);if(c<=0&&l<=0)return t.copy(n);Ma.subVectors(e,r);const u=fr.dot(Ma),f=hr.dot(Ma);if(u>=0&&f<=u)return t.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(fr,o);Sa.subVectors(e,s);const d=fr.dot(Sa),g=hr.dot(Sa);if(g>=0&&d<=g)return t.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(hr,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Ru.subVectors(s,r),a=(f-u)/(f-u+(d-g)),t.copy(r).addScaledVector(Ru,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(n).addScaledVector(fr,o).addScaledVector(hr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function Ea(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=vl(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ea(o,s,e+1/3),this.g=Ea(o,s,e),this.b=Ea(o,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,t=Pt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const n=id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return tt.fromWorkingColorSpace(jt.copy(this),e),Math.round(Nt(jt.r*255,0,255))*65536+Math.round(Nt(jt.g*255,0,255))*256+Math.round(Nt(jt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.fromWorkingColorSpace(jt.copy(this),t);const n=jt.r,r=jt.g,s=jt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=u<=.5?f/(o+a):f/(2-o-a),o){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.fromWorkingColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Pt){tt.fromWorkingColorSpace(jt.copy(this),e);const t=jt.r,n=jt.g,r=jt.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(Qs);const n=ms(xi.h,Qs.h,t),r=ms(xi.s,Qs.s,t),s=ms(xi.l,Qs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new Ne;Ne.NAMES=id;let _g=0;class On extends tr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=Ln(),this.name="",this.blending=$i,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ic,this.blendDst=rc,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=Nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ir,this.stencilZFail=ir,this.stencilZPass=ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ic&&(n.blendSrc=this.blendSrc),this.blendDst!==rc&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ir&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ir&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ir&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class At extends On{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new P,eo=new he;class tn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vc,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)eo.fromBufferAttribute(this,t),eo.applyMatrix3(e),this.setXY(t,eo.x,eo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vc&&(e.usage=this.usage),e}}class rd extends tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class sd extends tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let vg=0;const pn=new Xe,Ta=new xt,dr=new P,an=new hi,ts=new hi,kt=new P;class Vt extends tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qh(e)?sd:rd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,n){return pn.makeTranslation(e,t,n),this.applyMatrix4(pn),this}scale(e,t,n){return pn.makeScale(e,t,n),this.applyMatrix4(pn),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(dr).negate(),this.translate(dr.x,dr.y,dr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gt(n,3))}else{for(let n=0,r=t.count;n<r;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];an.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(an.min,ts.min),an.expandByPoint(kt),kt.addVectors(an.max,ts.max),an.expandByPoint(kt)):(an.expandByPoint(ts.min),an.expandByPoint(ts.max))}an.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(kt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)kt.fromBufferAttribute(a,l),c&&(dr.fromBufferAttribute(e,l),kt.add(dr)),r=Math.max(r,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new P,c[R]=new P;const l=new P,u=new P,f=new P,h=new he,d=new he,g=new he,_=new P,m=new P;function p(R,b,A){l.fromBufferAttribute(n,R),u.fromBufferAttribute(n,b),f.fromBufferAttribute(n,A),h.fromBufferAttribute(s,R),d.fromBufferAttribute(s,b),g.fromBufferAttribute(s,A),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[R].add(_),a[b].add(_),a[A].add(_),c[R].add(m),c[b].add(m),c[A].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,b=v.length;R<b;++R){const A=v[R],I=A.start,k=A.count;for(let L=I,D=I+k;L<D;L+=3)p(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const S=new P,x=new P,M=new P,y=new P;function E(R){M.fromBufferAttribute(r,R),y.copy(M);const b=a[R];S.copy(b),S.sub(M.multiplyScalar(M.dot(b))).normalize(),x.crossVectors(y,b);const I=x.dot(c[R])<0?-1:1;o.setXYZW(R,S.x,S.y,S.z,I)}for(let R=0,b=v.length;R<b;++R){const A=v[R],I=A.start,k=A.count;for(let L=I,D=I+k;L<D;L+=3)E(e.getX(L+0)),E(e.getX(L+1)),E(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new P,s=new P,o=new P,a=new P,c=new P,l=new P,u=new P,f=new P;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new tn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vt,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cu=new Xe,Di=new Jo,to=new Hn,Iu=new P,no=new P,io=new P,ro=new P,wa=new P,so=new P,Pu=new P,oo=new P;class ce extends xt{constructor(e=new Vt,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){so.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],f=s[c];u!==0&&(wa.fromBufferAttribute(f,e),o?so.addScaledVector(wa,u):so.addScaledVector(wa.sub(t),u))}t.add(so)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),to.copy(n.boundingSphere),to.applyMatrix4(s),Di.copy(e.ray).recast(e.near),!(to.containsPoint(Di.origin)===!1&&(Di.intersectSphere(to,Iu)===null||Di.origin.distanceToSquared(Iu)>(e.far-e.near)**2))&&(Cu.copy(s).invert(),Di.copy(e.ray).applyMatrix4(Cu),!(n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Di)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,M=S;x<M;x+=3){const y=a.getX(x),E=a.getX(x+1),R=a.getX(x+2);r=ao(this,p,e,n,l,u,f,y,E,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);r=ao(this,o,e,n,l,u,f,v,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,M=S;x<M;x+=3){const y=x,E=x+1,R=x+2;r=ao(this,p,e,n,l,u,f,y,E,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,S=m+1,x=m+2;r=ao(this,o,e,n,l,u,f,v,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function xg(i,e,t,n,r,s,o,a){let c;if(e.side===en?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===ui,a),c===null)return null;oo.copy(a),oo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(oo);return l<t.near||l>t.far?null:{distance:l,point:oo.clone(),object:i}}function ao(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,no),i.getVertexPosition(c,io),i.getVertexPosition(l,ro);const u=xg(i,e,t,n,no,io,ro,Pu);if(u){const f=new P;xn.getBarycoord(Pu,no,io,ro,f),r&&(u.uv=xn.getInterpolatedAttribute(r,a,c,l,f,new he)),s&&(u.uv1=xn.getInterpolatedAttribute(s,a,c,l,f,new he)),o&&(u.normal=xn.getInterpolatedAttribute(o,a,c,l,f,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new P,materialIndex:0};xn.getNormal(no,io,ro,h.normal),u.face=h,u.barycoord=f}return u}class Ot extends Vt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(f,2));function g(_,m,p,v,S,x,M,y,E,R,b){const A=x/E,I=M/R,k=x/2,L=M/2,D=y/2,q=E+1,X=R+1;let ie=0,j=0;const Z=new P;for(let ne=0;ne<X;ne++){const me=ne*I-L;for(let Re=0;Re<q;Re++){const fe=Re*A-k;Z[_]=fe*v,Z[m]=me*S,Z[p]=D,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=y>0?1:-1,u.push(Z.x,Z.y,Z.z),f.push(Re/E),f.push(1-ne/R),ie+=1}}for(let ne=0;ne<R;ne++)for(let me=0;me<E;me++){const Re=h+me+q*ne,fe=h+me+q*(ne+1),W=h+(me+1)+q*(ne+1),ee=h+(me+1)+q*ne;c.push(Re,fe,ee),c.push(fe,W,ee),j+=6}a.addGroup(d,j,b),d+=j,h+=ie}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Jt(i){const e={};for(let t=0;t<i.length;t++){const n=Vr(i[t]);for(const r in n)e[r]=n[r]}return e}function Mg(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function od(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Sg={clone:Vr,merge:Jt};var yg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends On{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yg,this.fragmentShader=bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vr(e.uniforms),this.uniformsGroups=Mg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ad extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe,this.coordinateSystem=oi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new P,Lu=new he,zu=new he;class Kt extends ad{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=kr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return kr*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,Lu,zu),t.subVectors(zu,Lu)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const pr=-90,mr=1;class Ag extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Kt(pr,mr,e,t);r.layers=this.layers,this.add(r);const s=new Kt(pr,mr,e,t);s.layers=this.layers,this.add(s);const o=new Kt(pr,mr,e,t);o.layers=this.layers,this.add(o);const a=new Kt(pr,mr,e,t);a.layers=this.layers,this.add(a);const c=new Kt(pr,mr,e,t);c.layers=this.layers,this.add(c);const l=new Kt(pr,mr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===oi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wo)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cd extends Dt{constructor(e,t,n,r,s,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Dr,super(e,t,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Eg extends er{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new cd(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ot(5,5,5),s=new Pi({name:"CubemapFromEquirect",uniforms:Vr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:wi});s.uniforms.tEquirect.value=t;const o=new ce(r,s),a=t.minFilter;return t.minFilter===si&&(t.minFilter=ln),new Ag(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}const Ra=new P,Tg=new P,wg=new Ke;class Gi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ra.subVectors(n,t).cross(Tg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ra),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wg.getNormalMatrix(e),r=this.coplanarPoint(Ra).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new Hn,co=new P;class xl{constructor(e=new Gi,t=new Gi,n=new Gi,r=new Gi,s=new Gi,o=new Gi){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=oi){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],v=r[13],S=r[14],x=r[15];if(n[0].setComponents(c-s,h-l,m-d,x-p).normalize(),n[1].setComponents(c+s,h+l,m+d,x+p).normalize(),n[2].setComponents(c+o,h+u,m+g,x+v).normalize(),n[3].setComponents(c-o,h-u,m-g,x-v).normalize(),n[4].setComponents(c-a,h-f,m-_,x-S).normalize(),t===oi)n[5].setComponents(c+a,h+f,m+_,x+S).normalize();else if(t===Wo)n[5].setComponents(a,f,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){return Ui.center.set(0,0,0),Ui.radius=.7071067811865476,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(co.x=r.normal.x>0?e.max.x:e.min.x,co.y=r.normal.y>0?e.max.y:e.min.y,co.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ld(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Rg(i){const e=new WeakMap;function t(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const u=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Yt extends Vt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,f=e/a,h=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*h-o;for(let S=0;S<l;S++){const x=S*f-s;g.push(x,-v,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){const S=v+l*p,x=v+l*(p+1),M=v+1+l*(p+1),y=v+1+l*p;d.push(S,x,y),d.push(x,M,y)}this.setIndex(d),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ig=`#ifdef USE_ALPHAHASH
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
#endif`,Pg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Og=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ng=`#ifdef USE_AOMAP
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
#endif`,Dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ug=`#ifdef USE_BATCHING
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
#endif`,Fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gg=`#ifdef USE_IRIDESCENCE
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
#endif`,Hg=`#ifdef USE_BUMPMAP
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
#endif`,Wg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Jg=`#define PI 3.141592653589793
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
} // validated`,Qg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,e_=`vec3 transformedNormal = objectNormal;
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
#endif`,t_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,s_="gl_FragColor = linearToOutputTexel( gl_FragColor );",o_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a_=`#ifdef USE_ENVMAP
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
#endif`,c_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l_=`#ifdef USE_ENVMAP
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
#endif`,u_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
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
#endif`,h_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,d_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g_=`#ifdef USE_GRADIENTMAP
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
}`,__=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M_=`uniform bool receiveShadow;
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
#endif`,S_=`#ifdef USE_ENVMAP
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
#endif`,y_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,b_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,T_=`PhysicalMaterial material;
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
#endif`,w_=`struct PhysicalMaterial {
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
}`,R_=`
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
#endif`,C_=`#if defined( RE_IndirectDiffuse )
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
#endif`,I_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,P_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,F_=`#if defined( USE_POINTS_UV )
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
#endif`,B_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,k_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,H_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`#ifdef USE_MORPHTARGETS
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
#endif`,X_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,q_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Y_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Z_=`#ifdef USE_NORMALMAP
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
#endif`,J_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ev=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ov=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dv=`float getShadowMask() {
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
}`,pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mv=`#ifdef USE_SKINNING
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
#endif`,gv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_v=`#ifdef USE_SKINNING
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
#endif`,vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yv=`#ifdef USE_TRANSMISSION
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
#endif`,bv=`#ifdef USE_TRANSMISSION
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
#endif`,Av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cv=`uniform sampler2D t2D;
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
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ov=`#include <common>
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
}`,Nv=`#if DEPTH_PACKING == 3200
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
}`,Dv=`#define DISTANCE
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
}`,Uv=`#define DISTANCE
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
}`,Fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kv=`uniform float scale;
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
}`,Vv=`uniform vec3 diffuse;
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
}`,Gv=`#include <common>
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
}`,Hv=`uniform vec3 diffuse;
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
}`,Wv=`#define LAMBERT
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
}`,Xv=`#define LAMBERT
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
}`,jv=`#define MATCAP
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
}`,qv=`#define MATCAP
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
}`,Yv=`#define NORMAL
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
}`,$v=`#define NORMAL
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
}`,Kv=`#define PHONG
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
}`,Zv=`#define PHONG
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
}`,Jv=`#define STANDARD
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
}`,Qv=`#define STANDARD
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
}`,ex=`#define TOON
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
}`,tx=`#define TOON
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
}`,nx=`uniform float size;
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
}`,ix=`uniform vec3 diffuse;
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
}`,rx=`#include <common>
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
}`,sx=`uniform vec3 color;
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
}`,ox=`uniform float rotation;
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
}`,ax=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Cg,alphahash_pars_fragment:Ig,alphamap_fragment:Pg,alphamap_pars_fragment:Lg,alphatest_fragment:zg,alphatest_pars_fragment:Og,aomap_fragment:Ng,aomap_pars_fragment:Dg,batching_pars_vertex:Ug,batching_vertex:Fg,begin_vertex:Bg,beginnormal_vertex:kg,bsdfs:Vg,iridescence_fragment:Gg,bumpmap_pars_fragment:Hg,clipping_planes_fragment:Wg,clipping_planes_pars_fragment:Xg,clipping_planes_pars_vertex:jg,clipping_planes_vertex:qg,color_fragment:Yg,color_pars_fragment:$g,color_pars_vertex:Kg,color_vertex:Zg,common:Jg,cube_uv_reflection_fragment:Qg,defaultnormal_vertex:e_,displacementmap_pars_vertex:t_,displacementmap_vertex:n_,emissivemap_fragment:i_,emissivemap_pars_fragment:r_,colorspace_fragment:s_,colorspace_pars_fragment:o_,envmap_fragment:a_,envmap_common_pars_fragment:c_,envmap_pars_fragment:l_,envmap_pars_vertex:u_,envmap_physical_pars_fragment:S_,envmap_vertex:f_,fog_vertex:h_,fog_pars_vertex:d_,fog_fragment:p_,fog_pars_fragment:m_,gradientmap_pars_fragment:g_,lightmap_pars_fragment:__,lights_lambert_fragment:v_,lights_lambert_pars_fragment:x_,lights_pars_begin:M_,lights_toon_fragment:y_,lights_toon_pars_fragment:b_,lights_phong_fragment:A_,lights_phong_pars_fragment:E_,lights_physical_fragment:T_,lights_physical_pars_fragment:w_,lights_fragment_begin:R_,lights_fragment_maps:C_,lights_fragment_end:I_,logdepthbuf_fragment:P_,logdepthbuf_pars_fragment:L_,logdepthbuf_pars_vertex:z_,logdepthbuf_vertex:O_,map_fragment:N_,map_pars_fragment:D_,map_particle_fragment:U_,map_particle_pars_fragment:F_,metalnessmap_fragment:B_,metalnessmap_pars_fragment:k_,morphinstance_vertex:V_,morphcolor_vertex:G_,morphnormal_vertex:H_,morphtarget_pars_vertex:W_,morphtarget_vertex:X_,normal_fragment_begin:j_,normal_fragment_maps:q_,normal_pars_fragment:Y_,normal_pars_vertex:$_,normal_vertex:K_,normalmap_pars_fragment:Z_,clearcoat_normal_fragment_begin:J_,clearcoat_normal_fragment_maps:Q_,clearcoat_pars_fragment:ev,iridescence_pars_fragment:tv,opaque_fragment:nv,packing:iv,premultiplied_alpha_fragment:rv,project_vertex:sv,dithering_fragment:ov,dithering_pars_fragment:av,roughnessmap_fragment:cv,roughnessmap_pars_fragment:lv,shadowmap_pars_fragment:uv,shadowmap_pars_vertex:fv,shadowmap_vertex:hv,shadowmask_pars_fragment:dv,skinbase_vertex:pv,skinning_pars_vertex:mv,skinning_vertex:gv,skinnormal_vertex:_v,specularmap_fragment:vv,specularmap_pars_fragment:xv,tonemapping_fragment:Mv,tonemapping_pars_fragment:Sv,transmission_fragment:yv,transmission_pars_fragment:bv,uv_pars_fragment:Av,uv_pars_vertex:Ev,uv_vertex:Tv,worldpos_vertex:wv,background_vert:Rv,background_frag:Cv,backgroundCube_vert:Iv,backgroundCube_frag:Pv,cube_vert:Lv,cube_frag:zv,depth_vert:Ov,depth_frag:Nv,distanceRGBA_vert:Dv,distanceRGBA_frag:Uv,equirect_vert:Fv,equirect_frag:Bv,linedashed_vert:kv,linedashed_frag:Vv,meshbasic_vert:Gv,meshbasic_frag:Hv,meshlambert_vert:Wv,meshlambert_frag:Xv,meshmatcap_vert:jv,meshmatcap_frag:qv,meshnormal_vert:Yv,meshnormal_frag:$v,meshphong_vert:Kv,meshphong_frag:Zv,meshphysical_vert:Jv,meshphysical_frag:Qv,meshtoon_vert:ex,meshtoon_frag:tx,points_vert:nx,points_frag:ix,shadow_vert:rx,shadow_frag:sx,sprite_vert:ox,sprite_frag:ax},pe={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Fn={basic:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Jt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Jt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Jt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Jt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Jt([pe.points,pe.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Jt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Jt([pe.common,pe.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Jt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Jt([pe.sprite,pe.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Jt([pe.common,pe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Jt([pe.lights,pe.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Fn.physical={uniforms:Jt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const lo={r:0,b:0,g:0},Fi=new Gn,cx=new Xe;function lx(i,e,t,n,r,s,o){const a=new Ne(0);let c=s===!0?0:1,l,u,f=null,h=0,d=null;function g(v){let S=v.isScene===!0?v.background:null;return S&&S.isTexture&&(S=(v.backgroundBlurriness>0?t:e).get(S)),S}function _(v){let S=!1;const x=g(v);x===null?p(a,c):x&&x.isColor&&(p(x,1),S=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,S){const x=g(S);x&&(x.isCubeTexture||x.mapping===Ko)?(u===void 0&&(u=new ce(new Ot(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Vr(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,y,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Fi.copy(S.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(Fi)),u.material.toneMapped=tt.getTransfer(x.colorSpace)!==pt,(f!==x||h!==x.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=x,h=x.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ce(new Yt(2,2),new Pi({name:"BackgroundMaterial",uniforms:Vr(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=tt.getTransfer(x.colorSpace)!==pt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,S){v.getRGB(lo,od(i)),n.buffers.color.setClear(lo.r,lo.g,lo.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:_,addToRenderList:m}}function ux(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,o=!1;function a(A,I,k,L,D){let q=!1;const X=f(L,k,I);s!==X&&(s=X,l(s.object)),q=d(A,L,k,D),q&&g(A,L,k,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,x(A,I,k,L),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return i.createVertexArray()}function l(A){return i.bindVertexArray(A)}function u(A){return i.deleteVertexArray(A)}function f(A,I,k){const L=k.wireframe===!0;let D=n[A.id];D===void 0&&(D={},n[A.id]=D);let q=D[I.id];q===void 0&&(q={},D[I.id]=q);let X=q[L];return X===void 0&&(X=h(c()),q[L]=X),X}function h(A){const I=[],k=[],L=[];for(let D=0;D<t;D++)I[D]=0,k[D]=0,L[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:L,object:A,attributes:{},index:null}}function d(A,I,k,L){const D=s.attributes,q=I.attributes;let X=0;const ie=k.getAttributes();for(const j in ie)if(ie[j].location>=0){const ne=D[j];let me=q[j];if(me===void 0&&(j==="instanceMatrix"&&A.instanceMatrix&&(me=A.instanceMatrix),j==="instanceColor"&&A.instanceColor&&(me=A.instanceColor)),ne===void 0||ne.attribute!==me||me&&ne.data!==me.data)return!0;X++}return s.attributesNum!==X||s.index!==L}function g(A,I,k,L){const D={},q=I.attributes;let X=0;const ie=k.getAttributes();for(const j in ie)if(ie[j].location>=0){let ne=q[j];ne===void 0&&(j==="instanceMatrix"&&A.instanceMatrix&&(ne=A.instanceMatrix),j==="instanceColor"&&A.instanceColor&&(ne=A.instanceColor));const me={};me.attribute=ne,ne&&ne.data&&(me.data=ne.data),D[j]=me,X++}s.attributes=D,s.attributesNum=X,s.index=L}function _(){const A=s.newAttributes;for(let I=0,k=A.length;I<k;I++)A[I]=0}function m(A){p(A,0)}function p(A,I){const k=s.newAttributes,L=s.enabledAttributes,D=s.attributeDivisors;k[A]=1,L[A]===0&&(i.enableVertexAttribArray(A),L[A]=1),D[A]!==I&&(i.vertexAttribDivisor(A,I),D[A]=I)}function v(){const A=s.newAttributes,I=s.enabledAttributes;for(let k=0,L=I.length;k<L;k++)I[k]!==A[k]&&(i.disableVertexAttribArray(k),I[k]=0)}function S(A,I,k,L,D,q,X){X===!0?i.vertexAttribIPointer(A,I,k,D,q):i.vertexAttribPointer(A,I,k,L,D,q)}function x(A,I,k,L){_();const D=L.attributes,q=k.getAttributes(),X=I.defaultAttributeValues;for(const ie in q){const j=q[ie];if(j.location>=0){let Z=D[ie];if(Z===void 0&&(ie==="instanceMatrix"&&A.instanceMatrix&&(Z=A.instanceMatrix),ie==="instanceColor"&&A.instanceColor&&(Z=A.instanceColor)),Z!==void 0){const ne=Z.normalized,me=Z.itemSize,Re=e.get(Z);if(Re===void 0)continue;const fe=Re.buffer,W=Re.type,ee=Re.bytesPerElement,ye=W===i.INT||W===i.UNSIGNED_INT||Z.gpuType===ul;if(Z.isInterleavedBufferAttribute){const le=Z.data,Le=le.stride,De=Z.offset;if(le.isInstancedInterleavedBuffer){for(let je=0;je<j.locationSize;je++)p(j.location+je,le.meshPerAttribute);A.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let je=0;je<j.locationSize;je++)m(j.location+je);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let je=0;je<j.locationSize;je++)S(j.location+je,me/j.locationSize,W,ne,Le*ee,(De+me/j.locationSize*je)*ee,ye)}else{if(Z.isInstancedBufferAttribute){for(let le=0;le<j.locationSize;le++)p(j.location+le,Z.meshPerAttribute);A.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let le=0;le<j.locationSize;le++)m(j.location+le);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let le=0;le<j.locationSize;le++)S(j.location+le,me/j.locationSize,W,ne,me*ee,me/j.locationSize*le*ee,ye)}}else if(X!==void 0){const ne=X[ie];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(j.location,ne);break;case 3:i.vertexAttrib3fv(j.location,ne);break;case 4:i.vertexAttrib4fv(j.location,ne);break;default:i.vertexAttrib1fv(j.location,ne)}}}}v()}function M(){R();for(const A in n){const I=n[A];for(const k in I){const L=I[k];for(const D in L)u(L[D].object),delete L[D];delete I[k]}delete n[A]}}function y(A){if(n[A.id]===void 0)return;const I=n[A.id];for(const k in I){const L=I[k];for(const D in L)u(L[D].object),delete L[D];delete I[k]}delete n[A.id]}function E(A){for(const I in n){const k=n[I];if(k[A.id]===void 0)continue;const L=k[A.id];for(const D in L)u(L[D].object),delete L[D];delete k[A.id]}}function R(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:M,releaseStatesOfGeometry:y,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function fx(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function o(l,u,f){f!==0&&(i.drawArraysInstanced(n,l,u,f),t.update(u,n,f))}function a(l,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];t.update(d,n,1)}function c(l,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function hx(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(E){return!(E!==Mn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Ls&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==fi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==In&&!R)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:M,maxSamples:y}}function dx(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Gi,a=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const v=s?0:n,S=v*4;let x=p.clippingState||null;c.value=x,x=u(g,h,S,d);for(let M=0;M!==S;++M)x[M]=t[M];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==_;++S,x+=4)o.copy(f[S]).applyMatrix4(v,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function px(i){let e=new WeakMap;function t(o,a){return a===hc?o.mapping=Dr:a===dc&&(o.mapping=Ur),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===hc||a===dc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Eg(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Ml extends ad{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Er=4,Ou=[.125,.215,.35,.446,.526,.582],Xi=20,Ca=new Ml,Nu=new Ne;let Ia=null,Pa=0,La=0,za=!1;const Hi=(1+Math.sqrt(5))/2,gr=1/Hi,Du=[new P(-Hi,gr,0),new P(Hi,gr,0),new P(-gr,0,Hi),new P(gr,0,Hi),new P(0,Hi,-gr),new P(0,Hi,gr),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Ia=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,Pa,La),this._renderer.xr.enabled=za,e.scissorTest=!1,uo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Dr||e.mapping===Ur?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),Pa=this._renderer.getActiveCubeFace(),La=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Ls,format:Mn,colorSpace:nn,depthBuffer:!1},r=Uu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uu(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mx(s)),this._blurMaterial=gx(s,e,t)}return r}_compileMaterial(e){const t=new ce(this._lodPlanes[0],e);this._renderer.compile(t,Ca)}_sceneToCubeUV(e,t,n,r){const a=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Nu),u.toneMapping=Ri,u.autoClear=!1;const d=new At({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new ce(new Ot,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Nu),_=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const S=this._cubeSize;uo(r,v*S,p>2?S:0,S,S),u.setRenderTarget(r),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Dr||e.mapping===Ur;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ce(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;uo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Ca)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Du[(r-s-1)%Du.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new ce(this._lodPlanes[r],l),h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Xi-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Xi;m>Xi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xi}`);const p=[];let v=0;for(let E=0;E<Xi;++E){const R=E/_,b=Math.exp(-R*R/2);p.push(b),E===0?v+=b:E<m&&(v+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-n;const x=this._sizeLods[r],M=3*x*(r>S-Er?r-S+Er:0),y=4*(this._cubeSize-x);uo(t,M,y,3*x,2*x),c.setRenderTarget(t),c.render(f,Ca)}}function mx(i){const e=[],t=[],n=[];let r=i;const s=i-Er+1+Ou.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-Er?c=Ou[o-i+Er-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let y=0;y<d;y++){const E=y%3*2/3-1,R=y>2?0:-1,b=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(b,_*g*y),S.set(h,m*g*y);const A=[y,y,y,y,y,y];x.set(A,p*g*y)}const M=new Vt;M.setAttribute("position",new tn(v,_)),M.setAttribute("uv",new tn(S,m)),M.setAttribute("faceIndex",new tn(x,p)),e.push(M),r>Er&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uu(i,e,t){const n=new er(i,e,t);return n.texture.mapping=Ko,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function uo(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function gx(i,e,t){const n=new Float32Array(Xi),r=new P(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Fu(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sl(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Bu(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function Sl(){return`

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
	`}function _x(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===hc||c===dc,u=c===Dr||c===Ur;if(l||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Hc(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Hc(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function vx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&hs("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function xx(i,e,t,n){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)e.update(h[g],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let S=0,x=v.length;S<x;S+=3){const M=v[S+0],y=v[S+1],E=v[S+2];h.push(M,y,y,E,E,M)}}else if(g!==void 0){const v=g.array;_=g.version;for(let S=0,x=v.length/3-1;S<x;S+=3){const M=S+0,y=S+1,E=S+2;h.push(M,y,y,E,E,M)}}else return;const m=new(Qh(h)?sd:rd)(h,1);m.version=_;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function Mx(i,e,t){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function c(h,d){i.drawElements(n,d,s,h*o),t.update(d,n,1)}function l(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),t.update(d,n,g))}function u(h,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*_[v];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Sx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function yx(i,e,t){const n=new WeakMap,r=new at;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let x=a.attributes.position.count*S,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const y=new Float32Array(x*M*4*f),E=new td(y,x,M,f);E.type=In,E.needsUpdate=!0;const R=S*4;for(let A=0;A<f;A++){const I=m[A],k=p[A],L=v[A],D=x*M*4*A;for(let q=0;q<I.count;q++){const X=q*R;d===!0&&(r.fromBufferAttribute(I,q),y[D+X+0]=r.x,y[D+X+1]=r.y,y[D+X+2]=r.z,y[D+X+3]=0),g===!0&&(r.fromBufferAttribute(k,q),y[D+X+4]=r.x,y[D+X+5]=r.y,y[D+X+6]=r.z,y[D+X+7]=0),_===!0&&(r.fromBufferAttribute(L,q),y[D+X+8]=r.x,y[D+X+9]=r.y,y[D+X+10]=r.z,y[D+X+11]=L.itemSize===4?r.w:1)}}h={count:f,texture:E,size:new he(x,M)},n.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function bx(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class ud extends Dt{constructor(e,t,n,r,s,o,a,c,l,u=wr){if(u!==wr&&u!==Br)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===wr&&(n=Qi),n===void 0&&u===Br&&(n=Fr),super(null,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ht,this.minFilter=c!==void 0?c:Ht,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fd=new Dt,ku=new ud(1,1),hd=new td,dd=new lg,pd=new cd,Vu=[],Gu=[],Hu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function Xr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Vu[r];if(s===void 0&&(s=new Float32Array(r),Vu[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Qo(i,e){let t=Gu[e];t===void 0&&(t=new Int32Array(e),Gu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Ax(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ex(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Ft(t,e)}}function Tx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Ft(t,e)}}function wx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Ft(t,e)}}function Rx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;Xu.set(n),i.uniformMatrix2fv(this.addr,!1,Xu),Ft(t,n)}}function Cx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;Wu.set(n),i.uniformMatrix3fv(this.addr,!1,Wu),Ft(t,n)}}function Ix(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;Hu.set(n),i.uniformMatrix4fv(this.addr,!1,Hu),Ft(t,n)}}function Px(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Lx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Ft(t,e)}}function zx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Ft(t,e)}}function Ox(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Ft(t,e)}}function Nx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Ft(t,e)}}function Ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Ft(t,e)}}function Fx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Ft(t,e)}}function Bx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ku.compareFunction=Jh,s=ku):s=fd,t.setTexture2D(e||s,r)}function kx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||dd,r)}function Vx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||pd,r)}function Gx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||hd,r)}function Hx(i){switch(i){case 5126:return Ax;case 35664:return Ex;case 35665:return Tx;case 35666:return wx;case 35674:return Rx;case 35675:return Cx;case 35676:return Ix;case 5124:case 35670:return Px;case 35667:case 35671:return Lx;case 35668:case 35672:return zx;case 35669:case 35673:return Ox;case 5125:return Nx;case 36294:return Dx;case 36295:return Ux;case 36296:return Fx;case 35678:case 36198:case 36298:case 36306:case 35682:return Bx;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Vx;case 36289:case 36303:case 36311:case 36292:return Gx}}function Wx(i,e){i.uniform1fv(this.addr,e)}function Xx(i,e){const t=Xr(e,this.size,2);i.uniform2fv(this.addr,t)}function jx(i,e){const t=Xr(e,this.size,3);i.uniform3fv(this.addr,t)}function qx(i,e){const t=Xr(e,this.size,4);i.uniform4fv(this.addr,t)}function Yx(i,e){const t=Xr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function $x(i,e){const t=Xr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Kx(i,e){const t=Xr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Zx(i,e){i.uniform1iv(this.addr,e)}function Jx(i,e){i.uniform2iv(this.addr,e)}function Qx(i,e){i.uniform3iv(this.addr,e)}function eM(i,e){i.uniform4iv(this.addr,e)}function tM(i,e){i.uniform1uiv(this.addr,e)}function nM(i,e){i.uniform2uiv(this.addr,e)}function iM(i,e){i.uniform3uiv(this.addr,e)}function rM(i,e){i.uniform4uiv(this.addr,e)}function sM(i,e,t){const n=this.cache,r=e.length,s=Qo(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Ft(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||fd,s[o])}function oM(i,e,t){const n=this.cache,r=e.length,s=Qo(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Ft(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||dd,s[o])}function aM(i,e,t){const n=this.cache,r=e.length,s=Qo(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Ft(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||pd,s[o])}function cM(i,e,t){const n=this.cache,r=e.length,s=Qo(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Ft(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||hd,s[o])}function lM(i){switch(i){case 5126:return Wx;case 35664:return Xx;case 35665:return jx;case 35666:return qx;case 35674:return Yx;case 35675:return $x;case 35676:return Kx;case 5124:case 35670:return Zx;case 35667:case 35671:return Jx;case 35668:case 35672:return Qx;case 35669:case 35673:return eM;case 5125:return tM;case 36294:return nM;case 36295:return iM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return sM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return aM;case 36289:case 36303:case 36311:case 36292:return cM}}class uM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hx(t.type)}}class fM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lM(t.type)}}class hM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function ju(i,e){i.seq.push(e),i.map[e.id]=e}function dM(i,e,t){const n=i.name,r=n.length;for(Oa.lastIndex=0;;){const s=Oa.exec(n),o=Oa.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){ju(t,l===void 0?new uM(a,i,e):new fM(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new hM(a),ju(t,f)),t=f}}}class Lo{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);dM(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function qu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const pM=37297;let mM=0;function gM(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Yu=new Ke;function _M(i){tt._getMatrix(Yu,tt.workingColorSpace,i);const e=`mat3( ${Yu.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Zo:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function $u(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+gM(i.getShaderSource(e),o)}else return r}function vM(i,e){const t=_M(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function xM(i,e){let t;switch(e){case v0:t="Linear";break;case x0:t="Reinhard";break;case M0:t="Cineon";break;case Uh:t="ACESFilmic";break;case y0:t="AgX";break;case b0:t="Neutral";break;case S0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fo=new P;function MM(){tt.getLuminanceCoefficients(fo);const i=fo.x.toFixed(4),e=fo.y.toFixed(4),t=fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function yM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ds(i){return i!==""}function Ku(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const AM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wc(i){return i.replace(AM,TM)}const EM=new Map;function TM(i,e){let t=Je[e];if(t===void 0){const n=EM.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wc(t)}const wM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ju(i){return i.replace(wM,RM)}function RM(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Qu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function CM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Zm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(e="SHADOWMAP_TYPE_VSM"),e}function IM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Dr:case Ur:e="ENVMAP_TYPE_CUBE";break;case Ko:e="ENVMAP_TYPE_CUBE_UV";break}return e}function PM(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ur:e="ENVMAP_MODE_REFRACTION";break}return e}function LM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dh:e="ENVMAP_BLENDING_MULTIPLY";break;case g0:e="ENVMAP_BLENDING_MIX";break;case _0:e="ENVMAP_BLENDING_ADD";break}return e}function zM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function OM(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=CM(t),l=IM(t),u=PM(t),f=LM(t),h=zM(t),d=SM(t),g=yM(s),_=r.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ds).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ds).join(`
`),p.length>0&&(p+=`
`)):(m=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),p=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?Je.tonemapping_pars_fragment:"",t.toneMapping!==Ri?xM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,vM("linearToOutputTexel",t.outputColorSpace),MM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ds).join(`
`)),o=Wc(o),o=Ku(o,t),o=Zu(o,t),a=Wc(a),a=Ku(a,t),a=Zu(a,t),o=Ju(o),a=Ju(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=v+m+o,x=v+p+a,M=qu(r,r.VERTEX_SHADER,S),y=qu(r,r.FRAGMENT_SHADER,x);r.attachShader(_,M),r.attachShader(_,y),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function E(I){if(i.debug.checkShaderErrors){const k=r.getProgramInfoLog(_).trim(),L=r.getShaderInfoLog(M).trim(),D=r.getShaderInfoLog(y).trim();let q=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,M,y);else{const ie=$u(r,M,"vertex"),j=$u(r,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+ie+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(L===""||D==="")&&(X=!1);X&&(I.diagnostics={runnable:q,programLog:k,vertexShader:{log:L,prefix:m},fragmentShader:{log:D,prefix:p}})}r.deleteShader(M),r.deleteShader(y),R=new Lo(r,_),b=bM(r,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(_,pM)),A},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=y,this}let NM=0;class DM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new UM(e),t.set(e,n)),n}}class UM{constructor(e){this.id=NM++,this.code=e,this.usedTimes=0}}function FM(i,e,t,n,r,s,o){const a=new nd,c=new DM,l=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,A,I,k,L){const D=k.fog,q=L.geometry,X=b.isMeshStandardMaterial?k.environment:null,ie=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),j=ie&&ie.mapping===Ko?ie.image.height:null,Z=g[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const ne=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,me=ne!==void 0?ne.length:0;let Re=0;q.morphAttributes.position!==void 0&&(Re=1),q.morphAttributes.normal!==void 0&&(Re=2),q.morphAttributes.color!==void 0&&(Re=3);let fe,W,ee,ye;if(Z){const ht=Fn[Z];fe=ht.vertexShader,W=ht.fragmentShader}else fe=b.vertexShader,W=b.fragmentShader,c.update(b),ee=c.getVertexShaderID(b),ye=c.getFragmentShaderID(b);const le=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),De=L.isInstancedMesh===!0,je=L.isBatchedMesh===!0,ft=!!b.map,O=!!b.matcap,se=!!ie,z=!!b.aoMap,we=!!b.lightMap,ue=!!b.bumpMap,be=!!b.normalMap,de=!!b.displacementMap,Fe=!!b.emissiveMap,re=!!b.metalnessMap,C=!!b.roughnessMap,T=b.anisotropy>0,V=b.clearcoat>0,J=b.dispersion>0,te=b.iridescence>0,K=b.sheen>0,ze=b.transmission>0,_e=T&&!!b.anisotropyMap,Ae=V&&!!b.clearcoatMap,it=V&&!!b.clearcoatNormalMap,oe=V&&!!b.clearcoatRoughnessMap,Ee=te&&!!b.iridescenceMap,Be=te&&!!b.iridescenceThicknessMap,Ge=K&&!!b.sheenColorMap,Te=K&&!!b.sheenRoughnessMap,nt=!!b.specularMap,Ze=!!b.specularColorMap,_t=!!b.specularIntensityMap,U=ze&&!!b.transmissionMap,ge=ze&&!!b.thicknessMap,Y=!!b.gradientMap,Q=!!b.alphaMap,Se=b.alphaTest>0,xe=!!b.alphaHash,qe=!!b.extensions;let wt=Ri;b.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(wt=i.toneMapping);const Wt={shaderID:Z,shaderType:b.type,shaderName:b.name,vertexShader:fe,fragmentShader:W,defines:b.defines,customVertexShaderID:ee,customFragmentShaderID:ye,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:je,batchingColor:je&&L._colorsTexture!==null,instancing:De,instancingColor:De&&L.instanceColor!==null,instancingMorph:De&&L.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:nn,alphaToCoverage:!!b.alphaToCoverage,map:ft,matcap:O,envMap:se,envMapMode:se&&ie.mapping,envMapCubeUVHeight:j,aoMap:z,lightMap:we,bumpMap:ue,normalMap:be,displacementMap:h&&de,emissiveMap:Fe,normalMapObjectSpace:be&&b.normalMapType===P0,normalMapTangentSpace:be&&b.normalMapType===Zh,metalnessMap:re,roughnessMap:C,anisotropy:T,anisotropyMap:_e,clearcoat:V,clearcoatMap:Ae,clearcoatNormalMap:it,clearcoatRoughnessMap:oe,dispersion:J,iridescence:te,iridescenceMap:Ee,iridescenceThicknessMap:Be,sheen:K,sheenColorMap:Ge,sheenRoughnessMap:Te,specularMap:nt,specularColorMap:Ze,specularIntensityMap:_t,transmission:ze,transmissionMap:U,thicknessMap:ge,gradientMap:Y,opaque:b.transparent===!1&&b.blending===$i&&b.alphaToCoverage===!1,alphaMap:Q,alphaTest:Se,alphaHash:xe,combine:b.combine,mapUv:ft&&_(b.map.channel),aoMapUv:z&&_(b.aoMap.channel),lightMapUv:we&&_(b.lightMap.channel),bumpMapUv:ue&&_(b.bumpMap.channel),normalMapUv:be&&_(b.normalMap.channel),displacementMapUv:de&&_(b.displacementMap.channel),emissiveMapUv:Fe&&_(b.emissiveMap.channel),metalnessMapUv:re&&_(b.metalnessMap.channel),roughnessMapUv:C&&_(b.roughnessMap.channel),anisotropyMapUv:_e&&_(b.anisotropyMap.channel),clearcoatMapUv:Ae&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:it&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ge&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(b.sheenRoughnessMap.channel),specularMapUv:nt&&_(b.specularMap.channel),specularColorMapUv:Ze&&_(b.specularColorMap.channel),specularIntensityMapUv:_t&&_(b.specularIntensityMap.channel),transmissionMapUv:U&&_(b.transmissionMap.channel),thicknessMapUv:ge&&_(b.thicknessMap.channel),alphaMapUv:Q&&_(b.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(be||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!q.attributes.uv&&(ft||Q),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Le,skinning:L.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:Re,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:wt,decodeVideoTexture:ft&&b.map.isVideoTexture===!0&&tt.getTransfer(b.map.colorSpace)===pt,decodeVideoTextureEmissive:Fe&&b.emissiveMap.isVideoTexture===!0&&tt.getTransfer(b.emissiveMap.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===cn,flipSided:b.side===en,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:qe&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&b.extensions.multiDraw===!0||je)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Wt.vertexUv1s=l.has(1),Wt.vertexUv2s=l.has(2),Wt.vertexUv3s=l.has(3),l.clear(),Wt}function p(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)A.push(I),A.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(v(A,b),S(A,b),A.push(i.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function v(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function S(b,A){a.disableAll(),A.supportsVertexTextures&&a.enable(0),A.instancing&&a.enable(1),A.instancingColor&&a.enable(2),A.instancingMorph&&a.enable(3),A.matcap&&a.enable(4),A.envMap&&a.enable(5),A.normalMapObjectSpace&&a.enable(6),A.normalMapTangentSpace&&a.enable(7),A.clearcoat&&a.enable(8),A.iridescence&&a.enable(9),A.alphaTest&&a.enable(10),A.vertexColors&&a.enable(11),A.vertexAlphas&&a.enable(12),A.vertexUv1s&&a.enable(13),A.vertexUv2s&&a.enable(14),A.vertexUv3s&&a.enable(15),A.vertexTangents&&a.enable(16),A.anisotropy&&a.enable(17),A.alphaHash&&a.enable(18),A.batching&&a.enable(19),A.dispersion&&a.enable(20),A.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reverseDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const A=g[b.type];let I;if(A){const k=Fn[A];I=Sg.clone(k.uniforms)}else I=b.uniforms;return I}function M(b,A){let I;for(let k=0,L=u.length;k<L;k++){const D=u[k];if(D.cacheKey===A){I=D,++I.usedTimes;break}}return I===void 0&&(I=new OM(i,A,b,s),u.push(I)),I}function y(b){if(--b.usedTimes===0){const A=u.indexOf(b);u[A]=u[u.length-1],u.pop(),b.destroy()}}function E(b){c.remove(b)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:M,releaseProgram:y,releaseShaderCache:E,programs:u,dispose:R}}function BM(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function kM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ef(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function tf(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):t.push(p)}function c(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function l(f,h){t.length>1&&t.sort(f||kM),n.length>1&&n.sort(h||ef),r.length>1&&r.sort(h||ef)}function u(){for(let f=e,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function VM(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new tf,i.set(n,[o])):r>=s.length?(o=new tf,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function GM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Ne};break;case"SpotLight":t={position:new P,direction:new P,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function HM(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let WM=0;function XM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jM(i){const e=new GM,t=HM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const r=new P,s=new Xe,o=new Xe;function a(l){let u=0,f=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,S=0,x=0,M=0,y=0,E=0;l.sort(XM);for(let b=0,A=l.length;b<A;b++){const I=l[b],k=I.color,L=I.intensity,D=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=k.r*L,f+=k.g*L,h+=k.b*L;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],L);E++}else if(I.isDirectionalLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ie=I.shadow,j=t.get(I);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=I.shadow.matrix,v++}n.directional[d]=X,d++}else if(I.isSpotLight){const X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(k).multiplyScalar(L),X.distance=D,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[_]=X;const ie=I.shadow;if(I.map&&(n.spotLightMap[M]=I.map,M++,ie.updateMatrices(I),I.castShadow&&y++),n.spotLightMatrix[_]=ie.matrix,I.castShadow){const j=t.get(I);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,n.spotShadow[_]=j,n.spotShadowMap[_]=q,x++}_++}else if(I.isRectAreaLight){const X=e.get(I);X.color.copy(k).multiplyScalar(L),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=X,m++}else if(I.isPointLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const ie=I.shadow,j=t.get(I);j.shadowIntensity=ie.intensity,j.shadowBias=ie.bias,j.shadowNormalBias=ie.normalBias,j.shadowRadius=ie.radius,j.shadowMapSize=ie.mapSize,j.shadowCameraNear=ie.camera.near,j.shadowCameraFar=ie.camera.far,n.pointShadow[g]=j,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=I.shadow.matrix,S++}n.point[g]=X,g++}else if(I.isHemisphereLight){const X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(L),X.groundColor.copy(I.groundColor).multiplyScalar(L),n.hemi[p]=X,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==S||R.numSpotShadows!==x||R.numSpotMaps!==M||R.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+M-y,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=E,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=S,R.numSpotShadows=x,R.numSpotMaps=M,R.numLightProbes=E,n.version=WM++)}function c(l,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const S=l[p];if(S.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(S.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function nf(i){const e=new jM(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function qM(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new nf(i),e.set(r,[a])):s>=o.length?(a=new nf(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class YM extends On{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=C0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $M extends On{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const KM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZM=`uniform sampler2D shadow_pass;
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
}`;function JM(i,e,t){let n=new xl;const r=new he,s=new he,o=new at,a=new YM({depthPacking:I0}),c=new $M,l={},u=t.maxTextureSize,f={[ui]:en,[en]:ui,[cn]:cn},h=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:KM,fragmentShader:ZM}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Vt;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ce(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nh;let p=this.type;this.render=function(y,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const b=i.getRenderTarget(),A=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),k=i.state;k.setBlending(wi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const L=p!==ti&&this.type===ti,D=p===ti&&this.type!==ti;for(let q=0,X=y.length;q<X;q++){const ie=y[q],j=ie.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ie,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const Z=j.getFrameExtents();if(r.multiply(Z),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,j.mapSize.y=s.y)),j.map===null||L===!0||D===!0){const me=this.type!==ti?{minFilter:Ht,magFilter:Ht}:{};j.map!==null&&j.map.dispose(),j.map=new er(r.x,r.y,me),j.map.texture.name=ie.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const ne=j.getViewportCount();for(let me=0;me<ne;me++){const Re=j.getViewport(me);o.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),k.viewport(o),j.updateMatrices(ie,me),n=j.getFrustum(),x(E,R,j.camera,ie,this.type)}j.isPointLightShadow!==!0&&this.type===ti&&v(j,R),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,A,I)};function v(y,E){const R=e.update(_);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,d.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new er(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(E,null,R,h,_,null),d.uniforms.shadow_pass.value=y.mapPass.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(E,null,R,d,_,null)}function S(y,E,R,b){let A=null;const I=R.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(I!==void 0)A=I;else if(A=R.isPointLight===!0?c:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=A.uuid,L=E.uuid;let D=l[k];D===void 0&&(D={},l[k]=D);let q=D[L];q===void 0&&(q=A.clone(),D[L]=q,E.addEventListener("dispose",M)),A=q}if(A.visible=E.visible,A.wireframe=E.wireframe,b===ti?A.side=E.shadowSide!==null?E.shadowSide:E.side:A.side=E.shadowSide!==null?E.shadowSide:f[E.side],A.alphaMap=E.alphaMap,A.alphaTest=E.alphaTest,A.map=E.map,A.clipShadows=E.clipShadows,A.clippingPlanes=E.clippingPlanes,A.clipIntersection=E.clipIntersection,A.displacementMap=E.displacementMap,A.displacementScale=E.displacementScale,A.displacementBias=E.displacementBias,A.wireframeLinewidth=E.wireframeLinewidth,A.linewidth=E.linewidth,R.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const k=i.properties.get(A);k.light=R}return A}function x(y,E,R,b,A){if(y.visible===!1)return;if(y.layers.test(E.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&A===ti)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,y.matrixWorld);const L=e.update(y),D=y.material;if(Array.isArray(D)){const q=L.groups;for(let X=0,ie=q.length;X<ie;X++){const j=q[X],Z=D[j.materialIndex];if(Z&&Z.visible){const ne=S(y,Z,b,A);y.onBeforeShadow(i,y,E,R,L,ne,j),i.renderBufferDirect(R,null,L,ne,y,j),y.onAfterShadow(i,y,E,R,L,ne,j)}}}else if(D.visible){const q=S(y,D,b,A);y.onBeforeShadow(i,y,E,R,L,q,null),i.renderBufferDirect(R,null,L,q,y,null),y.onAfterShadow(i,y,E,R,L,q,null)}}const k=y.children;for(let L=0,D=k.length;L<D;L++)x(k[L],E,R,b,A)}function M(y){y.target.removeEventListener("dispose",M);for(const R in l){const b=l[R],A=y.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}const QM={[sc]:oc,[ac]:uc,[cc]:fc,[Nr]:lc,[oc]:sc,[uc]:ac,[fc]:cc,[lc]:Nr};function eS(i,e){function t(){let U=!1;const ge=new at;let Y=null;const Q=new at(0,0,0,0);return{setMask:function(Se){Y!==Se&&!U&&(i.colorMask(Se,Se,Se,Se),Y=Se)},setLocked:function(Se){U=Se},setClear:function(Se,xe,qe,wt,Wt){Wt===!0&&(Se*=wt,xe*=wt,qe*=wt),ge.set(Se,xe,qe,wt),Q.equals(ge)===!1&&(i.clearColor(Se,xe,qe,wt),Q.copy(ge))},reset:function(){U=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,ge=!1,Y=null,Q=null,Se=null;return{setReversed:function(xe){if(ge!==xe){const qe=e.get("EXT_clip_control");ge?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const wt=Se;Se=null,this.setClear(wt)}ge=xe},getReversed:function(){return ge},setTest:function(xe){xe?le(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(xe){Y!==xe&&!U&&(i.depthMask(xe),Y=xe)},setFunc:function(xe){if(ge&&(xe=QM[xe]),Q!==xe){switch(xe){case sc:i.depthFunc(i.NEVER);break;case oc:i.depthFunc(i.ALWAYS);break;case ac:i.depthFunc(i.LESS);break;case Nr:i.depthFunc(i.LEQUAL);break;case cc:i.depthFunc(i.EQUAL);break;case lc:i.depthFunc(i.GEQUAL);break;case uc:i.depthFunc(i.GREATER);break;case fc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=xe}},setLocked:function(xe){U=xe},setClear:function(xe){Se!==xe&&(ge&&(xe=1-xe),i.clearDepth(xe),Se=xe)},reset:function(){U=!1,Y=null,Q=null,Se=null,ge=!1}}}function r(){let U=!1,ge=null,Y=null,Q=null,Se=null,xe=null,qe=null,wt=null,Wt=null;return{setTest:function(ht){U||(ht?le(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!U&&(i.stencilMask(ht),ge=ht)},setFunc:function(ht,Sn,qn){(Y!==ht||Q!==Sn||Se!==qn)&&(i.stencilFunc(ht,Sn,qn),Y=ht,Q=Sn,Se=qn)},setOp:function(ht,Sn,qn){(xe!==ht||qe!==Sn||wt!==qn)&&(i.stencilOp(ht,Sn,qn),xe=ht,qe=Sn,wt=qn)},setLocked:function(ht){U=ht},setClear:function(ht){Wt!==ht&&(i.clearStencil(ht),Wt=ht)},reset:function(){U=!1,ge=null,Y=null,Q=null,Se=null,xe=null,qe=null,wt=null,Wt=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,S=null,x=null,M=null,y=null,E=new Ne(0,0,0),R=0,b=!1,A=null,I=null,k=null,L=null,D=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=ie>=1):j.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=ie>=2);let Z=null,ne={};const me=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),fe=new at().fromArray(me),W=new at().fromArray(Re);function ee(U,ge,Y,Q){const Se=new Uint8Array(4),xe=i.createTexture();i.bindTexture(U,xe),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<Y;qe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(ge+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return xe}const ye={};ye[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(i.DEPTH_TEST),o.setFunc(Nr),ue(!1),be(au),le(i.CULL_FACE),z(wi);function le(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Le(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function De(U,ge){return f[U]!==ge?(i.bindFramebuffer(U,ge),f[U]=ge,U===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ge),U===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function je(U,ge){let Y=d,Q=!1;if(U){Y=h.get(ge),Y===void 0&&(Y=[],h.set(ge,Y));const Se=U.textures;if(Y.length!==Se.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,qe=Se.length;xe<qe;xe++)Y[xe]=i.COLOR_ATTACHMENT0+xe;Y.length=Se.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function ft(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const O={[Wi]:i.FUNC_ADD,[Qm]:i.FUNC_SUBTRACT,[e0]:i.FUNC_REVERSE_SUBTRACT};O[t0]=i.MIN,O[n0]=i.MAX;const se={[i0]:i.ZERO,[r0]:i.ONE,[s0]:i.SRC_COLOR,[ic]:i.SRC_ALPHA,[f0]:i.SRC_ALPHA_SATURATE,[l0]:i.DST_COLOR,[a0]:i.DST_ALPHA,[o0]:i.ONE_MINUS_SRC_COLOR,[rc]:i.ONE_MINUS_SRC_ALPHA,[u0]:i.ONE_MINUS_DST_COLOR,[c0]:i.ONE_MINUS_DST_ALPHA,[h0]:i.CONSTANT_COLOR,[d0]:i.ONE_MINUS_CONSTANT_COLOR,[p0]:i.CONSTANT_ALPHA,[m0]:i.ONE_MINUS_CONSTANT_ALPHA};function z(U,ge,Y,Q,Se,xe,qe,wt,Wt,ht){if(U===wi){_===!0&&(Le(i.BLEND),_=!1);return}if(_===!1&&(le(i.BLEND),_=!0),U!==Jm){if(U!==m||ht!==b){if((p!==Wi||x!==Wi)&&(i.blendEquation(i.FUNC_ADD),p=Wi,x=Wi),ht)switch(U){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.ONE,i.ONE);break;case cu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Or:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case cu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,S=null,M=null,y=null,E.set(0,0,0),R=0,m=U,b=ht}return}Se=Se||ge,xe=xe||Y,qe=qe||Q,(ge!==p||Se!==x)&&(i.blendEquationSeparate(O[ge],O[Se]),p=ge,x=Se),(Y!==v||Q!==S||xe!==M||qe!==y)&&(i.blendFuncSeparate(se[Y],se[Q],se[xe],se[qe]),v=Y,S=Q,M=xe,y=qe),(wt.equals(E)===!1||Wt!==R)&&(i.blendColor(wt.r,wt.g,wt.b,Wt),E.copy(wt),R=Wt),m=U,b=!1}function we(U,ge){U.side===cn?Le(i.CULL_FACE):le(i.CULL_FACE);let Y=U.side===en;ge&&(Y=!Y),ue(Y),U.blending===$i&&U.transparent===!1?z(wi):z(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Fe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?le(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(U){A!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),A=U)}function be(U){U!==$m?(le(i.CULL_FACE),U!==I&&(U===au?i.cullFace(i.BACK):U===Km?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),I=U}function de(U){U!==k&&(X&&i.lineWidth(U),k=U)}function Fe(U,ge,Y){U?(le(i.POLYGON_OFFSET_FILL),(L!==ge||D!==Y)&&(i.polygonOffset(ge,Y),L=ge,D=Y)):Le(i.POLYGON_OFFSET_FILL)}function re(U){U?le(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function C(U){U===void 0&&(U=i.TEXTURE0+q-1),Z!==U&&(i.activeTexture(U),Z=U)}function T(U,ge,Y){Y===void 0&&(Z===null?Y=i.TEXTURE0+q-1:Y=Z);let Q=ne[Y];Q===void 0&&(Q={type:void 0,texture:void 0},ne[Y]=Q),(Q.type!==U||Q.texture!==ge)&&(Z!==Y&&(i.activeTexture(Y),Z=Y),i.bindTexture(U,ge||ye[U]),Q.type=U,Q.texture=ge)}function V(){const U=ne[Z];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function J(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ze(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Be(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ge(U){fe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),fe.copy(U))}function Te(U){W.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),W.copy(U))}function nt(U,ge){let Y=l.get(ge);Y===void 0&&(Y=new WeakMap,l.set(ge,Y));let Q=Y.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(ge,U.name),Y.set(U,Q))}function Ze(U,ge){const Q=l.get(ge).get(U);c.get(ge)!==Q&&(i.uniformBlockBinding(ge,Q,U.__bindingPointIndex),c.set(ge,Q))}function _t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Z=null,ne={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,S=null,x=null,M=null,y=null,E=new Ne(0,0,0),R=0,b=!1,A=null,I=null,k=null,L=null,D=null,fe.set(0,0,i.canvas.width,i.canvas.height),W.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:Le,bindFramebuffer:De,drawBuffers:je,useProgram:ft,setBlending:z,setMaterial:we,setFlipSided:ue,setCullFace:be,setLineWidth:de,setPolygonOffset:Fe,setScissorTest:re,activeTexture:C,bindTexture:T,unbindTexture:V,compressedTexImage2D:J,compressedTexImage3D:te,texImage2D:Ee,texImage3D:Be,updateUBOMapping:nt,uniformBlockBinding:Ze,texStorage2D:it,texStorage3D:oe,texSubImage2D:K,texSubImage3D:ze,compressedTexSubImage2D:_e,compressedTexSubImage3D:Ae,scissor:Ge,viewport:Te,reset:_t}}function rf(i,e,t,n){const r=tS(n);switch(t){case Hh:return i*e;case Xh:return i*e;case jh:return i*e*2;case dl:return i*e/r.components*r.byteLength;case pl:return i*e/r.components*r.byteLength;case qh:return i*e*2/r.components*r.byteLength;case ml:return i*e*2/r.components*r.byteLength;case Wh:return i*e*3/r.components*r.byteLength;case Mn:return i*e*4/r.components*r.byteLength;case gl:return i*e*4/r.components*r.byteLength;case wo:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Co:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mc:case _c:return Math.max(i,16)*Math.max(e,8)/4;case pc:case gc:return Math.max(i,8)*Math.max(e,8)/2;case vc:case xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case bc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case wc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Rc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Lc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case zc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Oc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Po:case Nc:case Dc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Yh:case Uc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Fc:case Bc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tS(i){switch(i){case fi:case kh:return{byteLength:1,components:1};case Ts:case Vh:case Ls:return{byteLength:2,components:1};case fl:case hl:return{byteLength:2,components:4};case Qi:case ul:case In:return{byteLength:4,components:1};case Gh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function nS(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,T){return d?new OffscreenCanvas(C,T):Cs("canvas")}function _(C,T,V){let J=1;const te=re(C);if((te.width>V||te.height>V)&&(J=V/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const K=Math.floor(J*te.width),ze=Math.floor(J*te.height);f===void 0&&(f=g(K,ze));const _e=T?g(K,ze):f;return _e.width=K,_e.height=ze,_e.getContext("2d").drawImage(C,0,0,K,ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+ze+")."),_e}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(C,T,V,J,te=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K=T;if(T===i.RED&&(V===i.FLOAT&&(K=i.R32F),V===i.HALF_FLOAT&&(K=i.R16F),V===i.UNSIGNED_BYTE&&(K=i.R8)),T===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.R8UI),V===i.UNSIGNED_SHORT&&(K=i.R16UI),V===i.UNSIGNED_INT&&(K=i.R32UI),V===i.BYTE&&(K=i.R8I),V===i.SHORT&&(K=i.R16I),V===i.INT&&(K=i.R32I)),T===i.RG&&(V===i.FLOAT&&(K=i.RG32F),V===i.HALF_FLOAT&&(K=i.RG16F),V===i.UNSIGNED_BYTE&&(K=i.RG8)),T===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RG8UI),V===i.UNSIGNED_SHORT&&(K=i.RG16UI),V===i.UNSIGNED_INT&&(K=i.RG32UI),V===i.BYTE&&(K=i.RG8I),V===i.SHORT&&(K=i.RG16I),V===i.INT&&(K=i.RG32I)),T===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGB8UI),V===i.UNSIGNED_SHORT&&(K=i.RGB16UI),V===i.UNSIGNED_INT&&(K=i.RGB32UI),V===i.BYTE&&(K=i.RGB8I),V===i.SHORT&&(K=i.RGB16I),V===i.INT&&(K=i.RGB32I)),T===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),V===i.UNSIGNED_INT&&(K=i.RGBA32UI),V===i.BYTE&&(K=i.RGBA8I),V===i.SHORT&&(K=i.RGBA16I),V===i.INT&&(K=i.RGBA32I)),T===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),T===i.RGBA){const ze=te?Zo:tt.getTransfer(J);V===i.FLOAT&&(K=i.RGBA32F),V===i.HALF_FLOAT&&(K=i.RGBA16F),V===i.UNSIGNED_BYTE&&(K=ze===pt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function x(C,T){let V;return C?T===null||T===Qi||T===Fr?V=i.DEPTH24_STENCIL8:T===In?V=i.DEPTH32F_STENCIL8:T===Ts&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Qi||T===Fr?V=i.DEPTH_COMPONENT24:T===In?V=i.DEPTH_COMPONENT32F:T===Ts&&(V=i.DEPTH_COMPONENT16),V}function M(C,T){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ht&&C.minFilter!==ln?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function y(C){const T=C.target;T.removeEventListener("dispose",y),R(T),T.isVideoTexture&&u.delete(T)}function E(C){const T=C.target;T.removeEventListener("dispose",E),A(T)}function R(C){const T=n.get(C);if(T.__webglInit===void 0)return;const V=C.source,J=h.get(V);if(J){const te=J[T.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(C),Object.keys(J).length===0&&h.delete(V)}n.remove(C)}function b(C){const T=n.get(C);i.deleteTexture(T.__webglTexture);const V=C.source,J=h.get(V);delete J[T.__cacheKey],o.memory.textures--}function A(C){const T=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(T.__webglFramebuffer[J]))for(let te=0;te<T.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(T.__webglFramebuffer[J][te]);else i.deleteFramebuffer(T.__webglFramebuffer[J]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[J])}else{if(Array.isArray(T.__webglFramebuffer))for(let J=0;J<T.__webglFramebuffer.length;J++)i.deleteFramebuffer(T.__webglFramebuffer[J]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let J=0;J<T.__webglColorRenderbuffer.length;J++)T.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[J]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const V=C.textures;for(let J=0,te=V.length;J<te;J++){const K=n.get(V[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(V[J])}n.remove(C)}let I=0;function k(){I=0}function L(){const C=I;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),I+=1,C}function D(C){const T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function q(C,T){const V=n.get(C);if(C.isVideoTexture&&de(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){const J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(V,C,T);return}}t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+T)}function X(C,T){const V=n.get(C);if(C.version>0&&V.__version!==C.version){W(V,C,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+T)}function ie(C,T){const V=n.get(C);if(C.version>0&&V.__version!==C.version){W(V,C,T);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+T)}function j(C,T){const V=n.get(C);if(C.version>0&&V.__version!==C.version){ee(V,C,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+T)}const Z={[Ii]:i.REPEAT,[Ai]:i.CLAMP_TO_EDGE,[Go]:i.MIRRORED_REPEAT},ne={[Ht]:i.NEAREST,[Bh]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[To]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},me={[L0]:i.NEVER,[F0]:i.ALWAYS,[z0]:i.LESS,[Jh]:i.LEQUAL,[O0]:i.EQUAL,[U0]:i.GEQUAL,[N0]:i.GREATER,[D0]:i.NOTEQUAL};function Re(C,T){if(T.type===In&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===ln||T.magFilter===To||T.magFilter===fs||T.magFilter===si||T.minFilter===ln||T.minFilter===To||T.minFilter===fs||T.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Z[T.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Z[T.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Z[T.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ne[T.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ne[T.minFilter]),T.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,me[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ht||T.minFilter!==fs&&T.minFilter!==si||T.type===In&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function fe(C,T){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",y));const J=T.source;let te=h.get(J);te===void 0&&(te={},h.set(J,te));const K=D(T);if(K!==C.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),te[K].usedTimes++;const ze=te[C.__cacheKey];ze!==void 0&&(te[C.__cacheKey].usedTimes--,ze.usedTimes===0&&b(T)),C.__cacheKey=K,C.__webglTexture=te[K].texture}return V}function W(C,T,V){let J=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(J=i.TEXTURE_3D);const te=fe(C,T),K=T.source;t.bindTexture(J,C.__webglTexture,i.TEXTURE0+V);const ze=n.get(K);if(K.version!==ze.__version||te===!0){t.activeTexture(i.TEXTURE0+V);const _e=tt.getPrimaries(tt.workingColorSpace),Ae=T.colorSpace===bi?null:tt.getPrimaries(T.colorSpace),it=T.colorSpace===bi||_e===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let oe=_(T.image,!1,r.maxTextureSize);oe=Fe(T,oe);const Ee=s.convert(T.format,T.colorSpace),Be=s.convert(T.type);let Ge=S(T.internalFormat,Ee,Be,T.colorSpace,T.isVideoTexture);Re(J,T);let Te;const nt=T.mipmaps,Ze=T.isVideoTexture!==!0,_t=ze.__version===void 0||te===!0,U=K.dataReady,ge=M(T,oe);if(T.isDepthTexture)Ge=x(T.format===Br,T.type),_t&&(Ze?t.texStorage2D(i.TEXTURE_2D,1,Ge,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ge,oe.width,oe.height,0,Ee,Be,null));else if(T.isDataTexture)if(nt.length>0){Ze&&_t&&t.texStorage2D(i.TEXTURE_2D,ge,Ge,nt[0].width,nt[0].height);for(let Y=0,Q=nt.length;Y<Q;Y++)Te=nt[Y],Ze?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Te.width,Te.height,Ee,Be,Te.data):t.texImage2D(i.TEXTURE_2D,Y,Ge,Te.width,Te.height,0,Ee,Be,Te.data);T.generateMipmaps=!1}else Ze?(_t&&t.texStorage2D(i.TEXTURE_2D,ge,Ge,oe.width,oe.height),U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe.width,oe.height,Ee,Be,oe.data)):t.texImage2D(i.TEXTURE_2D,0,Ge,oe.width,oe.height,0,Ee,Be,oe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ze&&_t&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ge,nt[0].width,nt[0].height,oe.depth);for(let Y=0,Q=nt.length;Y<Q;Y++)if(Te=nt[Y],T.format!==Mn)if(Ee!==null)if(Ze){if(U)if(T.layerUpdates.size>0){const Se=rf(Te.width,Te.height,T.format,T.type);for(const xe of T.layerUpdates){const qe=Te.data.subarray(xe*Se/Te.data.BYTES_PER_ELEMENT,(xe+1)*Se/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,xe,Te.width,Te.height,1,Ee,qe)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Te.width,Te.height,oe.depth,Ee,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Ge,Te.width,Te.height,oe.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ze?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Te.width,Te.height,oe.depth,Ee,Be,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,Ge,Te.width,Te.height,oe.depth,0,Ee,Be,Te.data)}else{Ze&&_t&&t.texStorage2D(i.TEXTURE_2D,ge,Ge,nt[0].width,nt[0].height);for(let Y=0,Q=nt.length;Y<Q;Y++)Te=nt[Y],T.format!==Mn?Ee!==null?Ze?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Te.width,Te.height,Ee,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,Ge,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Te.width,Te.height,Ee,Be,Te.data):t.texImage2D(i.TEXTURE_2D,Y,Ge,Te.width,Te.height,0,Ee,Be,Te.data)}else if(T.isDataArrayTexture)if(Ze){if(_t&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ge,oe.width,oe.height,oe.depth),U)if(T.layerUpdates.size>0){const Y=rf(oe.width,oe.height,T.format,T.type);for(const Q of T.layerUpdates){const Se=oe.data.subarray(Q*Y/oe.data.BYTES_PER_ELEMENT,(Q+1)*Y/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,oe.width,oe.height,1,Ee,Be,Se)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,Ee,Be,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ge,oe.width,oe.height,oe.depth,0,Ee,Be,oe.data);else if(T.isData3DTexture)Ze?(_t&&t.texStorage3D(i.TEXTURE_3D,ge,Ge,oe.width,oe.height,oe.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,Ee,Be,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ge,oe.width,oe.height,oe.depth,0,Ee,Be,oe.data);else if(T.isFramebufferTexture){if(_t)if(Ze)t.texStorage2D(i.TEXTURE_2D,ge,Ge,oe.width,oe.height);else{let Y=oe.width,Q=oe.height;for(let Se=0;Se<ge;Se++)t.texImage2D(i.TEXTURE_2D,Se,Ge,Y,Q,0,Ee,Be,null),Y>>=1,Q>>=1}}else if(nt.length>0){if(Ze&&_t){const Y=re(nt[0]);t.texStorage2D(i.TEXTURE_2D,ge,Ge,Y.width,Y.height)}for(let Y=0,Q=nt.length;Y<Q;Y++)Te=nt[Y],Ze?U&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,Ee,Be,Te):t.texImage2D(i.TEXTURE_2D,Y,Ge,Ee,Be,Te);T.generateMipmaps=!1}else if(Ze){if(_t){const Y=re(oe);t.texStorage2D(i.TEXTURE_2D,ge,Ge,Y.width,Y.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,Be,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ge,Ee,Be,oe);m(T)&&p(J),ze.__version=K.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function ee(C,T,V){if(T.image.length!==6)return;const J=fe(C,T),te=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);const K=n.get(te);if(te.version!==K.__version||J===!0){t.activeTexture(i.TEXTURE0+V);const ze=tt.getPrimaries(tt.workingColorSpace),_e=T.colorSpace===bi?null:tt.getPrimaries(T.colorSpace),Ae=T.colorSpace===bi||ze===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const it=T.isCompressedTexture||T.image[0].isCompressedTexture,oe=T.image[0]&&T.image[0].isDataTexture,Ee=[];for(let Q=0;Q<6;Q++)!it&&!oe?Ee[Q]=_(T.image[Q],!0,r.maxCubemapSize):Ee[Q]=oe?T.image[Q].image:T.image[Q],Ee[Q]=Fe(T,Ee[Q]);const Be=Ee[0],Ge=s.convert(T.format,T.colorSpace),Te=s.convert(T.type),nt=S(T.internalFormat,Ge,Te,T.colorSpace),Ze=T.isVideoTexture!==!0,_t=K.__version===void 0||J===!0,U=te.dataReady;let ge=M(T,Be);Re(i.TEXTURE_CUBE_MAP,T);let Y;if(it){Ze&&_t&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,nt,Be.width,Be.height);for(let Q=0;Q<6;Q++){Y=Ee[Q].mipmaps;for(let Se=0;Se<Y.length;Se++){const xe=Y[Se];T.format!==Mn?Ge!==null?Ze?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,xe.width,xe.height,Ge,xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,nt,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ze?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,0,0,xe.width,xe.height,Ge,Te,xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se,nt,xe.width,xe.height,0,Ge,Te,xe.data)}}}else{if(Y=T.mipmaps,Ze&&_t){Y.length>0&&ge++;const Q=re(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,nt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(oe){Ze?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ee[Q].width,Ee[Q].height,Ge,Te,Ee[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,nt,Ee[Q].width,Ee[Q].height,0,Ge,Te,Ee[Q].data);for(let Se=0;Se<Y.length;Se++){const qe=Y[Se].image[Q].image;Ze?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,qe.width,qe.height,Ge,Te,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,nt,qe.width,qe.height,0,Ge,Te,qe.data)}}else{Ze?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ge,Te,Ee[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,nt,Ge,Te,Ee[Q]);for(let Se=0;Se<Y.length;Se++){const xe=Y[Se];Ze?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,0,0,Ge,Te,xe.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Se+1,nt,Ge,Te,xe.image[Q])}}}m(T)&&p(i.TEXTURE_CUBE_MAP),K.__version=te.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function ye(C,T,V,J,te,K){const ze=s.convert(V.format,V.colorSpace),_e=s.convert(V.type),Ae=S(V.internalFormat,ze,_e,V.colorSpace),it=n.get(T),oe=n.get(V);if(oe.__renderTarget=T,!it.__hasExternalTextures){const Ee=Math.max(1,T.width>>K),Be=Math.max(1,T.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Ae,Ee,Be,T.depth,0,ze,_e,null):t.texImage2D(te,K,Ae,Ee,Be,0,ze,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),be(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,oe.__webglTexture,0,ue(T)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,oe.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(C,T,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),T.depthBuffer){const J=T.depthTexture,te=J&&J.isDepthTexture?J.type:null,K=x(T.stencilBuffer,te),ze=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=ue(T);be(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,K,T.width,T.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,K,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,K,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ze,i.RENDERBUFFER,C)}else{const J=T.textures;for(let te=0;te<J.length;te++){const K=J[te],ze=s.convert(K.format,K.colorSpace),_e=s.convert(K.type),Ae=S(K.internalFormat,ze,_e,K.colorSpace),it=ue(T);V&&be(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,Ae,T.width,T.height):be(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,Ae,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(T.depthTexture);J.__renderTarget=T,(!J.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),q(T.depthTexture,0);const te=J.__webglTexture,K=ue(T);if(T.depthTexture.format===wr)be(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(T.depthTexture.format===Br)be(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function De(C){const T=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),J){const te=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),T.__depthDisposeCallback=te}T.__boundDepthTexture=J}if(C.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Le(T.__webglFramebuffer,C)}else if(V){T.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[J]),T.__webglDepthbuffer[J]===void 0)T.__webglDepthbuffer[J]=i.createRenderbuffer(),le(T.__webglDepthbuffer[J],C,!1);else{const te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=T.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),le(T.__webglDepthbuffer,C,!1);else{const J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,te)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(C,T,V){const J=n.get(C);T!==void 0&&ye(J.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&De(C)}function ft(C){const T=C.texture,V=n.get(C),J=n.get(T);C.addEventListener("dispose",E);const te=C.textures,K=C.isWebGLCubeRenderTarget===!0,ze=te.length>1;if(ze||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=T.version,o.memory.textures++),K){V.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[_e]=[];for(let Ae=0;Ae<T.mipmaps.length;Ae++)V.__webglFramebuffer[_e][Ae]=i.createFramebuffer()}else V.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let _e=0;_e<T.mipmaps.length;_e++)V.__webglFramebuffer[_e]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(ze)for(let _e=0,Ae=te.length;_e<Ae;_e++){const it=n.get(te[_e]);it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&be(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let _e=0;_e<te.length;_e++){const Ae=te[_e];V.__webglColorRenderbuffer[_e]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[_e]);const it=s.convert(Ae.format,Ae.colorSpace),oe=s.convert(Ae.type),Ee=S(Ae.internalFormat,it,oe,Ae.colorSpace,C.isXRRenderTarget===!0),Be=ue(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,Ee,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,V.__webglColorRenderbuffer[_e])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),le(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Re(i.TEXTURE_CUBE_MAP,T);for(let _e=0;_e<6;_e++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ae=0;Ae<T.mipmaps.length;Ae++)ye(V.__webglFramebuffer[_e][Ae],C,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Ae);else ye(V.__webglFramebuffer[_e],C,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(T)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let _e=0,Ae=te.length;_e<Ae;_e++){const it=te[_e],oe=n.get(it);t.bindTexture(i.TEXTURE_2D,oe.__webglTexture),Re(i.TEXTURE_2D,it),ye(V.__webglFramebuffer,C,it,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,0),m(it)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(_e=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,J.__webglTexture),Re(_e,T),T.mipmaps&&T.mipmaps.length>0)for(let Ae=0;Ae<T.mipmaps.length;Ae++)ye(V.__webglFramebuffer[Ae],C,T,i.COLOR_ATTACHMENT0,_e,Ae);else ye(V.__webglFramebuffer,C,T,i.COLOR_ATTACHMENT0,_e,0);m(T)&&p(_e),t.unbindTexture()}C.depthBuffer&&De(C)}function O(C){const T=C.textures;for(let V=0,J=T.length;V<J;V++){const te=T[V];if(m(te)){const K=v(C),ze=n.get(te).__webglTexture;t.bindTexture(K,ze),p(K),t.unbindTexture()}}}const se=[],z=[];function we(C){if(C.samples>0){if(be(C)===!1){const T=C.textures,V=C.width,J=C.height;let te=i.COLOR_BUFFER_BIT;const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ze=n.get(C),_e=T.length>1;if(_e)for(let Ae=0;Ae<T.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ze.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let Ae=0;Ae<T.length;Ae++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),_e){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ze.__webglColorRenderbuffer[Ae]);const it=n.get(T[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,V,J,0,0,V,J,te,i.NEAREST),c===!0&&(se.length=0,z.length=0,se.push(i.COLOR_ATTACHMENT0+Ae),C.depthBuffer&&C.resolveDepthBuffer===!1&&(se.push(K),z.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_e)for(let Ae=0;Ae<T.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,ze.__webglColorRenderbuffer[Ae]);const it=n.get(T[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,it,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ze.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const T=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function ue(C){return Math.min(r.maxSamples,C.samples)}function be(C){const T=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function de(C){const T=o.render.frame;u.get(C)!==T&&(u.set(C,T),C.update())}function Fe(C,T){const V=C.colorSpace,J=C.format,te=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==nn&&V!==bi&&(tt.getTransfer(V)===pt?(J!==Mn||te!==fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function re(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=k,this.setTexture2D=q,this.setTexture2DArray=X,this.setTexture3D=ie,this.setTextureCube=j,this.rebindTextures=je,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=be}function iS(i,e){function t(n,r=bi){let s;const o=tt.getTransfer(r);if(n===fi)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kh)return i.BYTE;if(n===Vh)return i.SHORT;if(n===Ts)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Ls)return i.HALF_FLOAT;if(n===Hh)return i.ALPHA;if(n===Wh)return i.RGB;if(n===Mn)return i.RGBA;if(n===Xh)return i.LUMINANCE;if(n===jh)return i.LUMINANCE_ALPHA;if(n===wr)return i.DEPTH_COMPONENT;if(n===Br)return i.DEPTH_STENCIL;if(n===dl)return i.RED;if(n===pl)return i.RED_INTEGER;if(n===qh)return i.RG;if(n===ml)return i.RG_INTEGER;if(n===gl)return i.RGBA_INTEGER;if(n===wo||n===Ro||n===Co||n===Io)if(o===pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===wo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===wo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Io)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===_c)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===pc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vc||n===xc||n===Mc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===vc||n===xc)return o===pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Mc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Sc||n===yc||n===bc||n===Ac||n===Ec||n===Tc||n===wc||n===Rc||n===Cc||n===Ic||n===Pc||n===Lc||n===zc||n===Oc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Sc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ac)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ec)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ic)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oc)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===Nc||n===Dc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Po)return o===pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Dc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yh||n===Uc||n===Fc||n===Bc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Po)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class rS extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class mt extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sS={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sS)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const oS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aS=`
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

}`;class cS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Dt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pi({vertexShader:oS,fragmentShader:aS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ce(new Yt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lS extends tr{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=new cS,m=t.getContextAttributes();let p=null,v=null;const S=[],x=[],M=new he;let y=null;const E=new Kt;E.viewport=new at;const R=new Kt;R.viewport=new at;const b=[E,R],A=new rS;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ee=S[W];return ee===void 0&&(ee=new Na,S[W]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(W){let ee=S[W];return ee===void 0&&(ee=new Na,S[W]=ee),ee.getGripSpace()},this.getHand=function(W){let ee=S[W];return ee===void 0&&(ee=new Na,S[W]=ee),ee.getHandSpace()};function L(W){const ee=x.indexOf(W.inputSource);if(ee===-1)return;const ye=S[ee];ye!==void 0&&(ye.update(W.inputSource,W.frame,l||o),ye.dispatchEvent({type:W.type,data:W.inputSource}))}function D(){r.removeEventListener("select",L),r.removeEventListener("selectstart",L),r.removeEventListener("selectend",L),r.removeEventListener("squeeze",L),r.removeEventListener("squeezestart",L),r.removeEventListener("squeezeend",L),r.removeEventListener("end",D),r.removeEventListener("inputsourceschange",q);for(let W=0;W<S.length;W++){const ee=x[W];ee!==null&&(x[W]=null,S[W].disconnect(ee))}I=null,k=null,_.reset(),e.setRenderTarget(p),d=null,h=null,f=null,r=null,v=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",L),r.addEventListener("selectstart",L),r.addEventListener("selectend",L),r.addEventListener("squeeze",L),r.addEventListener("squeezestart",L),r.addEventListener("squeezeend",L),r.addEventListener("end",D),r.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new er(d.framebufferWidth,d.framebufferHeight,{format:Mn,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,ye=null,le=null;m.depth&&(le=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Br:wr,ye=m.stencil?Fr:Qi);const Le={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(Le),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new er(h.textureWidth,h.textureHeight,{format:Mn,type:fi,depthTexture:new ud(h.textureWidth,h.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(W){for(let ee=0;ee<W.removed.length;ee++){const ye=W.removed[ee],le=x.indexOf(ye);le>=0&&(x[le]=null,S[le].disconnect(ye))}for(let ee=0;ee<W.added.length;ee++){const ye=W.added[ee];let le=x.indexOf(ye);if(le===-1){for(let De=0;De<S.length;De++)if(De>=x.length){x.push(ye),le=De;break}else if(x[De]===null){x[De]=ye,le=De;break}if(le===-1)break}const Le=S[le];Le&&Le.connect(ye)}}const X=new P,ie=new P;function j(W,ee,ye){X.setFromMatrixPosition(ee.matrixWorld),ie.setFromMatrixPosition(ye.matrixWorld);const le=X.distanceTo(ie),Le=ee.projectionMatrix.elements,De=ye.projectionMatrix.elements,je=Le[14]/(Le[10]-1),ft=Le[14]/(Le[10]+1),O=(Le[9]+1)/Le[5],se=(Le[9]-1)/Le[5],z=(Le[8]-1)/Le[0],we=(De[8]+1)/De[0],ue=je*z,be=je*we,de=le/(-z+we),Fe=de*-z;if(ee.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Fe),W.translateZ(de),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Le[10]===-1)W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const re=je+de,C=ft+de,T=ue-Fe,V=be+(le-Fe),J=O*ft/C*re,te=se*ft/C*re;W.projectionMatrix.makePerspective(T,V,J,te,re,C),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function Z(W,ee){ee===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ee.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let ee=W.near,ye=W.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(ye=_.depthFar)),A.near=R.near=E.near=ee,A.far=R.far=E.far=ye,(I!==A.near||k!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,k=A.far),E.layers.mask=W.layers.mask|2,R.layers.mask=W.layers.mask|4,A.layers.mask=E.layers.mask|R.layers.mask;const le=W.parent,Le=A.cameras;Z(A,le);for(let De=0;De<Le.length;De++)Z(Le[De],le);Le.length===2?j(A,E,R):A.projectionMatrix.copy(E.projectionMatrix),ne(W,A,le)};function ne(W,ee,ye){ye===null?W.matrix.copy(ee.matrixWorld):(W.matrix.copy(ye.matrixWorld),W.matrix.invert(),W.matrix.multiply(ee.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ee.projectionMatrix),W.projectionMatrixInverse.copy(ee.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=kr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(W){c=W,h!==null&&(h.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)};let me=null;function Re(W,ee){if(u=ee.getViewerPose(l||o),g=ee,u!==null){const ye=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let le=!1;ye.length!==A.cameras.length&&(A.cameras.length=0,le=!0);for(let De=0;De<ye.length;De++){const je=ye[De];let ft=null;if(d!==null)ft=d.getViewport(je);else{const se=f.getViewSubImage(h,je);ft=se.viewport,De===0&&(e.setRenderTargetTextures(v,se.colorTexture,h.ignoreDepthValues?void 0:se.depthStencilTexture),e.setRenderTarget(v))}let O=b[De];O===void 0&&(O=new Kt,O.layers.enable(De),O.viewport=new at,b[De]=O),O.matrix.fromArray(je.transform.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale),O.projectionMatrix.fromArray(je.projectionMatrix),O.projectionMatrixInverse.copy(O.projectionMatrix).invert(),O.viewport.set(ft.x,ft.y,ft.width,ft.height),De===0&&(A.matrix.copy(O.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),le===!0&&A.cameras.push(O)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const De=f.getDepthInformation(ye[0]);De&&De.isValid&&De.texture&&_.init(e,De,r.renderState)}}for(let ye=0;ye<S.length;ye++){const le=x[ye],Le=S[ye];le!==null&&Le!==void 0&&Le.update(le,ee,l||o)}me&&me(W,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const fe=new ld;fe.setAnimationLoop(Re),this.setAnimationLoop=function(W){me=W},this.dispose=function(){}}}const Bi=new Gn,uS=new Xe;function fS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,od(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),S=v.envMap,x=v.envMapRotation;S&&(m.envMap.value=S,Bi.copy(x),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),m.envMapRotation.value.setFromMatrix4(uS.makeRotationFromEuler(Bi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function hS(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,S){const x=S.program;n.uniformBlockBinding(v,x)}function l(v,S){let x=r[v.id];x===void 0&&(g(v),x=u(v),r[v.id]=x,v.addEventListener("dispose",m));const M=S.program;n.updateUBOMapping(v,M);const y=e.render.frame;s[v.id]!==y&&(h(v),s[v.id]=y)}function u(v){const S=f();v.__bindingPointIndex=S;const x=i.createBuffer(),M=v.__size,y=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,M,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function f(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const S=r[v.id],x=v.uniforms,M=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let y=0,E=x.length;y<E;y++){const R=Array.isArray(x[y])?x[y]:[x[y]];for(let b=0,A=R.length;b<A;b++){const I=R[b];if(d(I,y,b,M)===!0){const k=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let D=0;for(let q=0;q<L.length;q++){const X=L[q],ie=_(X);typeof X=="number"||typeof X=="boolean"?(I.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,k+D,I.__data)):X.isMatrix3?(I.__data[0]=X.elements[0],I.__data[1]=X.elements[1],I.__data[2]=X.elements[2],I.__data[3]=0,I.__data[4]=X.elements[3],I.__data[5]=X.elements[4],I.__data[6]=X.elements[5],I.__data[7]=0,I.__data[8]=X.elements[6],I.__data[9]=X.elements[7],I.__data[10]=X.elements[8],I.__data[11]=0):(X.toArray(I.__data,D),D+=ie.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,S,x,M){const y=v.value,E=S+"_"+x;if(M[E]===void 0)return typeof y=="number"||typeof y=="boolean"?M[E]=y:M[E]=y.clone(),!0;{const R=M[E];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return M[E]=y,!0}else if(R.equals(y)===!1)return R.copy(y),!0}return!1}function g(v){const S=v.uniforms;let x=0;const M=16;for(let E=0,R=S.length;E<R;E++){const b=Array.isArray(S[E])?S[E]:[S[E]];for(let A=0,I=b.length;A<I;A++){const k=b[A],L=Array.isArray(k.value)?k.value:[k.value];for(let D=0,q=L.length;D<q;D++){const X=L[D],ie=_(X),j=x%M,Z=j%ie.boundary,ne=j+Z;x+=Z,ne!==0&&M-ne<ie.storage&&(x+=M-ne),k.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=ie.storage}}}const y=x%M;return y>0&&(x+=M-y),v.__size=x,v.__cache={},this}function _(v){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),S}function m(v){const S=v.target;S.removeEventListener("dispose",m);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(const v in r)i.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:c,update:l,dispose:p}}class dS{constructor(e={}){const{canvas:t=tg(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pt,this.toneMapping=Ri,this.toneMappingExposure=1;const x=this;let M=!1,y=0,E=0,R=null,b=-1,A=null;const I=new at,k=new at;let L=null;const D=new Ne(0);let q=0,X=t.width,ie=t.height,j=1,Z=null,ne=null;const me=new at(0,0,X,ie),Re=new at(0,0,X,ie);let fe=!1;const W=new xl;let ee=!1,ye=!1;const le=new Xe,Le=new Xe,De=new P,je=new at,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let O=!1;function se(){return R===null?j:1}let z=n;function we(w,F){return t.getContext(w,F)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ll}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",xe,!1),z===null){const F="webgl2";if(z=we(F,w),z===null)throw we(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ue,be,de,Fe,re,C,T,V,J,te,K,ze,_e,Ae,it,oe,Ee,Be,Ge,Te,nt,Ze,_t,U;function ge(){ue=new vx(z),ue.init(),Ze=new iS(z,ue),be=new hx(z,ue,e,Ze),de=new eS(z,ue),be.reverseDepthBuffer&&h&&de.buffers.depth.setReversed(!0),Fe=new Sx(z),re=new BM,C=new nS(z,ue,de,re,be,Ze,Fe),T=new px(x),V=new _x(x),J=new Rg(z),_t=new ux(z,J),te=new xx(z,J,Fe,_t),K=new bx(z,te,J,Fe),Ge=new yx(z,be,C),oe=new dx(re),ze=new FM(x,T,V,ue,be,_t,oe),_e=new fS(x,re),Ae=new VM,it=new qM(ue),Be=new lx(x,T,V,de,K,d,c),Ee=new JM(x,K,be),U=new hS(z,Fe,be,de),Te=new fx(z,ue,Fe),nt=new Mx(z,ue,Fe),Fe.programs=ze.programs,x.capabilities=be,x.extensions=ue,x.properties=re,x.renderLists=Ae,x.shadowMap=Ee,x.state=de,x.info=Fe}ge();const Y=new lS(x,z);this.xr=Y,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const w=ue.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ue.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(X,ie,!1))},this.getSize=function(w){return w.set(X,ie)},this.setSize=function(w,F,G=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,ie=F,t.width=Math.floor(w*j),t.height=Math.floor(F*j),G===!0&&(t.style.width=w+"px",t.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(X*j,ie*j).floor()},this.setDrawingBufferSize=function(w,F,G){X=w,ie=F,j=G,t.width=Math.floor(w*G),t.height=Math.floor(F*G),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(me)},this.setViewport=function(w,F,G,H){w.isVector4?me.set(w.x,w.y,w.z,w.w):me.set(w,F,G,H),de.viewport(I.copy(me).multiplyScalar(j).round())},this.getScissor=function(w){return w.copy(Re)},this.setScissor=function(w,F,G,H){w.isVector4?Re.set(w.x,w.y,w.z,w.w):Re.set(w,F,G,H),de.scissor(k.copy(Re).multiplyScalar(j).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(w){de.setScissorTest(fe=w)},this.setOpaqueSort=function(w){Z=w},this.setTransparentSort=function(w){ne=w},this.getClearColor=function(w){return w.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(w=!0,F=!0,G=!0){let H=0;if(w){let B=!1;if(R!==null){const ae=R.texture.format;B=ae===gl||ae===ml||ae===pl}if(B){const ae=R.texture.type,Me=ae===fi||ae===Qi||ae===Ts||ae===Fr||ae===fl||ae===hl,Ce=Be.getClearColor(),Ie=Be.getClearAlpha(),We=Ce.r,Ye=Ce.g,Pe=Ce.b;Me?(g[0]=We,g[1]=Ye,g[2]=Pe,g[3]=Ie,z.clearBufferuiv(z.COLOR,0,g)):(_[0]=We,_[1]=Ye,_[2]=Pe,_[3]=Ie,z.clearBufferiv(z.COLOR,0,_))}else H|=z.COLOR_BUFFER_BIT}F&&(H|=z.DEPTH_BUFFER_BIT),G&&(H|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",xe,!1),Ae.dispose(),it.dispose(),re.dispose(),T.dispose(),V.dispose(),K.dispose(),_t.dispose(),U.dispose(),ze.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Fl),Y.removeEventListener("sessionend",Bl),Li.stop()};function Q(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=Fe.autoReset,F=Ee.enabled,G=Ee.autoUpdate,H=Ee.needsUpdate,B=Ee.type;ge(),Fe.autoReset=w,Ee.enabled=F,Ee.autoUpdate=G,Ee.needsUpdate=H,Ee.type=B}function xe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function qe(w){const F=w.target;F.removeEventListener("dispose",qe),wt(F)}function wt(w){Wt(w),re.remove(w)}function Wt(w){const F=re.get(w).programs;F!==void 0&&(F.forEach(function(G){ze.releaseProgram(G)}),w.isShaderMaterial&&ze.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,G,H,B,ae){F===null&&(F=ft);const Me=B.isMesh&&B.matrixWorld.determinant()<0,Ce=qd(w,F,G,H,B);de.setMaterial(H,Me);let Ie=G.index,We=1;if(H.wireframe===!0){if(Ie=te.getWireframeAttribute(G),Ie===void 0)return;We=2}const Ye=G.drawRange,Pe=G.attributes.position;let rt=Ye.start*We,vt=(Ye.start+Ye.count)*We;ae!==null&&(rt=Math.max(rt,ae.start*We),vt=Math.min(vt,(ae.start+ae.count)*We)),Ie!==null?(rt=Math.max(rt,0),vt=Math.min(vt,Ie.count)):Pe!=null&&(rt=Math.max(rt,0),vt=Math.min(vt,Pe.count));const Mt=vt-rt;if(Mt<0||Mt===1/0)return;_t.setup(B,H,Ce,G,Ie);let rn,ct=Te;if(Ie!==null&&(rn=J.get(Ie),ct=nt,ct.setIndex(rn)),B.isMesh)H.wireframe===!0?(de.setLineWidth(H.wireframeLinewidth*se()),ct.setMode(z.LINES)):ct.setMode(z.TRIANGLES);else if(B.isLine){let Oe=H.linewidth;Oe===void 0&&(Oe=1),de.setLineWidth(Oe*se()),B.isLineSegments?ct.setMode(z.LINES):B.isLineLoop?ct.setMode(z.LINE_LOOP):ct.setMode(z.LINE_STRIP)}else B.isPoints?ct.setMode(z.POINTS):B.isSprite&&ct.setMode(z.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ct.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ue.get("WEBGL_multi_draw"))ct.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Oe=B._multiDrawStarts,Yn=B._multiDrawCounts,lt=B._multiDrawCount,yn=Ie?J.get(Ie).bytesPerElement:1,nr=re.get(H).currentProgram.getUniforms();for(let sn=0;sn<lt;sn++)nr.setValue(z,"_gl_DrawID",sn),ct.render(Oe[sn]/yn,Yn[sn])}else if(B.isInstancedMesh)ct.renderInstances(rt,Mt,B.count);else if(G.isInstancedBufferGeometry){const Oe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Yn=Math.min(G.instanceCount,Oe);ct.renderInstances(rt,Mt,Yn)}else ct.render(rt,Mt)};function ht(w,F,G){w.transparent===!0&&w.side===cn&&w.forceSinglePass===!1?(w.side=en,w.needsUpdate=!0,Bs(w,F,G),w.side=ui,w.needsUpdate=!0,Bs(w,F,G),w.side=cn):Bs(w,F,G)}this.compile=function(w,F,G=null){G===null&&(G=w),p=it.get(G),p.init(F),S.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==G&&w.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const H=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ae=B.material;if(ae)if(Array.isArray(ae))for(let Me=0;Me<ae.length;Me++){const Ce=ae[Me];ht(Ce,G,B),H.add(Ce)}else ht(ae,G,B),H.add(ae)}),S.pop(),p=null,H},this.compileAsync=function(w,F,G=null){const H=this.compile(w,F,G);return new Promise(B=>{function ae(){if(H.forEach(function(Me){re.get(Me).currentProgram.isReady()&&H.delete(Me)}),H.size===0){B(w);return}setTimeout(ae,10)}ue.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Sn=null;function qn(w){Sn&&Sn(w)}function Fl(){Li.stop()}function Bl(){Li.start()}const Li=new ld;Li.setAnimationLoop(qn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(w){Sn=w,Y.setAnimationLoop(w),w===null?Li.stop():Li.start()},Y.addEventListener("sessionstart",Fl),Y.addEventListener("sessionend",Bl),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,F,R),p=it.get(w,S.length),p.init(F),S.push(p),Le.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),W.setFromProjectionMatrix(Le),ye=this.localClippingEnabled,ee=oe.init(this.clippingPlanes,ye),m=Ae.get(w,v.length),m.init(),v.push(m),Y.enabled===!0&&Y.isPresenting===!0){const ae=x.xr.getDepthSensingMesh();ae!==null&&sa(ae,F,-1/0,x.sortObjects)}sa(w,F,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Z,ne),O=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,O&&Be.addToRenderList(m,w),this.info.render.frame++,ee===!0&&oe.beginShadows();const G=p.state.shadowsArray;Ee.render(G,w,F),ee===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ae=F.cameras;if(B.length>0)for(let Me=0,Ce=ae.length;Me<Ce;Me++){const Ie=ae[Me];Vl(H,B,w,Ie)}O&&Be.render(w);for(let Me=0,Ce=ae.length;Me<Ce;Me++){const Ie=ae[Me];kl(m,w,Ie,Ie.viewport)}}else B.length>0&&Vl(H,B,w,F),O&&Be.render(w),kl(m,w,F);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(x,w,F),_t.resetDefaultState(),b=-1,A=null,S.pop(),S.length>0?(p=S[S.length-1],ee===!0&&oe.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function sa(w,F,G,H){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){H&&je.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Le);const Me=K.update(w),Ce=w.material;Ce.visible&&m.push(w,Me,Ce,G,je.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const Me=K.update(w),Ce=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),je.copy(w.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),je.copy(Me.boundingSphere.center)),je.applyMatrix4(w.matrixWorld).applyMatrix4(Le)),Array.isArray(Ce)){const Ie=Me.groups;for(let We=0,Ye=Ie.length;We<Ye;We++){const Pe=Ie[We],rt=Ce[Pe.materialIndex];rt&&rt.visible&&m.push(w,Me,rt,G,je.z,Pe)}}else Ce.visible&&m.push(w,Me,Ce,G,je.z,null)}}const ae=w.children;for(let Me=0,Ce=ae.length;Me<Ce;Me++)sa(ae[Me],F,G,H)}function kl(w,F,G,H){const B=w.opaque,ae=w.transmissive,Me=w.transparent;p.setupLightsView(G),ee===!0&&oe.setGlobalState(x.clippingPlanes,G),H&&de.viewport(I.copy(H)),B.length>0&&Fs(B,F,G),ae.length>0&&Fs(ae,F,G),Me.length>0&&Fs(Me,F,G),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Vl(w,F,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new er(1,1,{generateMipmaps:!0,type:ue.has("EXT_color_buffer_half_float")||ue.has("EXT_color_buffer_float")?Ls:fi,minFilter:si,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ae=p.state.transmissionRenderTarget[H.id],Me=H.viewport||I;ae.setSize(Me.z,Me.w);const Ce=x.getRenderTarget();x.setRenderTarget(ae),x.getClearColor(D),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),O&&Be.render(G);const Ie=x.toneMapping;x.toneMapping=Ri;const We=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ee===!0&&oe.setGlobalState(x.clippingPlanes,H),Fs(w,G,H),C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae),ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let Pe=0,rt=F.length;Pe<rt;Pe++){const vt=F[Pe],Mt=vt.object,rn=vt.geometry,ct=vt.material,Oe=vt.group;if(ct.side===cn&&Mt.layers.test(H.layers)){const Yn=ct.side;ct.side=en,ct.needsUpdate=!0,Gl(Mt,G,H,rn,ct,Oe),ct.side=Yn,ct.needsUpdate=!0,Ye=!0}}Ye===!0&&(C.updateMultisampleRenderTarget(ae),C.updateRenderTargetMipmap(ae))}x.setRenderTarget(Ce),x.setClearColor(D,q),We!==void 0&&(H.viewport=We),x.toneMapping=Ie}function Fs(w,F,G){const H=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ae=w.length;B<ae;B++){const Me=w[B],Ce=Me.object,Ie=Me.geometry,We=H===null?Me.material:H,Ye=Me.group;Ce.layers.test(G.layers)&&Gl(Ce,F,G,Ie,We,Ye)}}function Gl(w,F,G,H,B,ae){w.onBeforeRender(x,F,G,H,B,ae),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(x,F,G,H,w,ae),B.transparent===!0&&B.side===cn&&B.forceSinglePass===!1?(B.side=en,B.needsUpdate=!0,x.renderBufferDirect(G,F,H,B,w,ae),B.side=ui,B.needsUpdate=!0,x.renderBufferDirect(G,F,H,B,w,ae),B.side=cn):x.renderBufferDirect(G,F,H,B,w,ae),w.onAfterRender(x,F,G,H,B,ae)}function Bs(w,F,G){F.isScene!==!0&&(F=ft);const H=re.get(w),B=p.state.lights,ae=p.state.shadowsArray,Me=B.state.version,Ce=ze.getParameters(w,B.state,ae,F,G),Ie=ze.getProgramCacheKey(Ce);let We=H.programs;H.environment=w.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(w.isMeshStandardMaterial?V:T).get(w.envMap||H.environment),H.envMapRotation=H.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,We===void 0&&(w.addEventListener("dispose",qe),We=new Map,H.programs=We);let Ye=We.get(Ie);if(Ye!==void 0){if(H.currentProgram===Ye&&H.lightsStateVersion===Me)return Wl(w,Ce),Ye}else Ce.uniforms=ze.getUniforms(w),w.onBeforeCompile(Ce,x),Ye=ze.acquireProgram(Ce,Ie),We.set(Ie,Ye),H.uniforms=Ce.uniforms;const Pe=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Pe.clippingPlanes=oe.uniform),Wl(w,Ce),H.needsLights=$d(w),H.lightsStateVersion=Me,H.needsLights&&(Pe.ambientLightColor.value=B.state.ambient,Pe.lightProbe.value=B.state.probe,Pe.directionalLights.value=B.state.directional,Pe.directionalLightShadows.value=B.state.directionalShadow,Pe.spotLights.value=B.state.spot,Pe.spotLightShadows.value=B.state.spotShadow,Pe.rectAreaLights.value=B.state.rectArea,Pe.ltc_1.value=B.state.rectAreaLTC1,Pe.ltc_2.value=B.state.rectAreaLTC2,Pe.pointLights.value=B.state.point,Pe.pointLightShadows.value=B.state.pointShadow,Pe.hemisphereLights.value=B.state.hemi,Pe.directionalShadowMap.value=B.state.directionalShadowMap,Pe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pe.spotShadowMap.value=B.state.spotShadowMap,Pe.spotLightMatrix.value=B.state.spotLightMatrix,Pe.spotLightMap.value=B.state.spotLightMap,Pe.pointShadowMap.value=B.state.pointShadowMap,Pe.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=Ye,H.uniformsList=null,Ye}function Hl(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=Lo.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Wl(w,F){const G=re.get(w);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function qd(w,F,G,H,B){F.isScene!==!0&&(F=ft),C.resetTextureUnits();const ae=F.fog,Me=H.isMeshStandardMaterial?F.environment:null,Ce=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:nn,Ie=(H.isMeshStandardMaterial?V:T).get(H.envMap||Me),We=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ye=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!G.morphAttributes.position,rt=!!G.morphAttributes.normal,vt=!!G.morphAttributes.color;let Mt=Ri;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Mt=x.toneMapping);const rn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ct=rn!==void 0?rn.length:0,Oe=re.get(H),Yn=p.state.lights;if(ee===!0&&(ye===!0||w!==A)){const hn=w===A&&H.id===b;oe.setState(H,w,hn)}let lt=!1;H.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Yn.state.version||Oe.outputColorSpace!==Ce||B.isBatchedMesh&&Oe.batching===!1||!B.isBatchedMesh&&Oe.batching===!0||B.isBatchedMesh&&Oe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Oe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Oe.instancing===!1||!B.isInstancedMesh&&Oe.instancing===!0||B.isSkinnedMesh&&Oe.skinning===!1||!B.isSkinnedMesh&&Oe.skinning===!0||B.isInstancedMesh&&Oe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Oe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Oe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Oe.instancingMorph===!1&&B.morphTexture!==null||Oe.envMap!==Ie||H.fog===!0&&Oe.fog!==ae||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==oe.numPlanes||Oe.numIntersection!==oe.numIntersection)||Oe.vertexAlphas!==We||Oe.vertexTangents!==Ye||Oe.morphTargets!==Pe||Oe.morphNormals!==rt||Oe.morphColors!==vt||Oe.toneMapping!==Mt||Oe.morphTargetsCount!==ct)&&(lt=!0):(lt=!0,Oe.__version=H.version);let yn=Oe.currentProgram;lt===!0&&(yn=Bs(H,F,B));let nr=!1,sn=!1,Kr=!1;const St=yn.getUniforms(),Dn=Oe.uniforms;if(de.useProgram(yn.program)&&(nr=!0,sn=!0,Kr=!0),H.id!==b&&(b=H.id,sn=!0),nr||A!==w){de.buffers.depth.getReversed()?(le.copy(w.projectionMatrix),ig(le),rg(le),St.setValue(z,"projectionMatrix",le)):St.setValue(z,"projectionMatrix",w.projectionMatrix),St.setValue(z,"viewMatrix",w.matrixWorldInverse);const di=St.map.cameraPosition;di!==void 0&&di.setValue(z,De.setFromMatrixPosition(w.matrixWorld)),be.logarithmicDepthBuffer&&St.setValue(z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&St.setValue(z,"isOrthographic",w.isOrthographicCamera===!0),A!==w&&(A=w,sn=!0,Kr=!0)}if(B.isSkinnedMesh){St.setOptional(z,B,"bindMatrix"),St.setOptional(z,B,"bindMatrixInverse");const hn=B.skeleton;hn&&(hn.boneTexture===null&&hn.computeBoneTexture(),St.setValue(z,"boneTexture",hn.boneTexture,C))}B.isBatchedMesh&&(St.setOptional(z,B,"batchingTexture"),St.setValue(z,"batchingTexture",B._matricesTexture,C),St.setOptional(z,B,"batchingIdTexture"),St.setValue(z,"batchingIdTexture",B._indirectTexture,C),St.setOptional(z,B,"batchingColorTexture"),B._colorsTexture!==null&&St.setValue(z,"batchingColorTexture",B._colorsTexture,C));const Zr=G.morphAttributes;if((Zr.position!==void 0||Zr.normal!==void 0||Zr.color!==void 0)&&Ge.update(B,G,yn),(sn||Oe.receiveShadow!==B.receiveShadow)&&(Oe.receiveShadow=B.receiveShadow,St.setValue(z,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Dn.envMap.value=Ie,Dn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(Dn.envMapIntensity.value=F.environmentIntensity),sn&&(St.setValue(z,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&Yd(Dn,Kr),ae&&H.fog===!0&&_e.refreshFogUniforms(Dn,ae),_e.refreshMaterialUniforms(Dn,H,j,ie,p.state.transmissionRenderTarget[w.id]),Lo.upload(z,Hl(Oe),Dn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Lo.upload(z,Hl(Oe),Dn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&St.setValue(z,"center",B.center),St.setValue(z,"modelViewMatrix",B.modelViewMatrix),St.setValue(z,"normalMatrix",B.normalMatrix),St.setValue(z,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const hn=H.uniformsGroups;for(let di=0,pi=hn.length;di<pi;di++){const Xl=hn[di];U.update(Xl,yn),U.bind(Xl,yn)}}return yn}function Yd(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function $d(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,F,G){re.get(w.texture).__webglTexture=F,re.get(w.depthTexture).__webglTexture=G;const H=re.get(w);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,F){const G=re.get(w);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(w,F=0,G=0){R=w,y=F,E=G;let H=!0,B=null,ae=!1,Me=!1;if(w){const Ie=re.get(w);if(Ie.__useDefaultFramebuffer!==void 0)de.bindFramebuffer(z.FRAMEBUFFER,null),H=!1;else if(Ie.__webglFramebuffer===void 0)C.setupRenderTarget(w);else if(Ie.__hasExternalTextures)C.rebindTextures(w,re.get(w.texture).__webglTexture,re.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Pe=w.depthTexture;if(Ie.__boundDepthTexture!==Pe){if(Pe!==null&&re.has(Pe)&&(w.width!==Pe.image.width||w.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(w)}}const We=w.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Me=!0);const Ye=re.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ye[F])?B=Ye[F][G]:B=Ye[F],ae=!0):w.samples>0&&C.useMultisampledRTT(w)===!1?B=re.get(w).__webglMultisampledFramebuffer:Array.isArray(Ye)?B=Ye[G]:B=Ye,I.copy(w.viewport),k.copy(w.scissor),L=w.scissorTest}else I.copy(me).multiplyScalar(j).floor(),k.copy(Re).multiplyScalar(j).floor(),L=fe;if(de.bindFramebuffer(z.FRAMEBUFFER,B)&&H&&de.drawBuffers(w,B),de.viewport(I),de.scissor(k),de.setScissorTest(L),ae){const Ie=re.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ie.__webglTexture,G)}else if(Me){const Ie=re.get(w.texture),We=F||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ie.__webglTexture,G||0,We)}b=-1},this.readRenderTargetPixels=function(w,F,G,H,B,ae,Me){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=re.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){de.bindFramebuffer(z.FRAMEBUFFER,Ce);try{const Ie=w.texture,We=Ie.format,Ye=Ie.type;if(!be.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-H&&G>=0&&G<=w.height-B&&z.readPixels(F,G,H,B,Ze.convert(We),Ze.convert(Ye),ae)}finally{const Ie=R!==null?re.get(R).__webglFramebuffer:null;de.bindFramebuffer(z.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(w,F,G,H,B,ae,Me){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=re.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){const Ie=w.texture,We=Ie.format,Ye=Ie.type;if(!be.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=w.width-H&&G>=0&&G<=w.height-B){de.bindFramebuffer(z.FRAMEBUFFER,Ce);const Pe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Pe),z.bufferData(z.PIXEL_PACK_BUFFER,ae.byteLength,z.STREAM_READ),z.readPixels(F,G,H,B,Ze.convert(We),Ze.convert(Ye),0);const rt=R!==null?re.get(R).__webglFramebuffer:null;de.bindFramebuffer(z.FRAMEBUFFER,rt);const vt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await ng(z,vt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Pe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ae),z.deleteBuffer(Pe),z.deleteSync(vt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,F=null,G=0){w.isTexture!==!0&&(hs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,w=arguments[1]);const H=Math.pow(2,-G),B=Math.floor(w.image.width*H),ae=Math.floor(w.image.height*H),Me=F!==null?F.x:0,Ce=F!==null?F.y:0;C.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,G,0,0,Me,Ce,B,ae),de.unbindTexture()},this.copyTextureToTexture=function(w,F,G=null,H=null,B=0){w.isTexture!==!0&&(hs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,w=arguments[1],F=arguments[2],B=arguments[3]||0,G=null);let ae,Me,Ce,Ie,We,Ye,Pe,rt,vt;const Mt=w.isCompressedTexture?w.mipmaps[B]:w.image;G!==null?(ae=G.max.x-G.min.x,Me=G.max.y-G.min.y,Ce=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,We=G.min.y,Ye=G.isBox3?G.min.z:0):(ae=Mt.width,Me=Mt.height,Ce=Mt.depth||1,Ie=0,We=0,Ye=0),H!==null?(Pe=H.x,rt=H.y,vt=H.z):(Pe=0,rt=0,vt=0);const rn=Ze.convert(F.format),ct=Ze.convert(F.type);let Oe;F.isData3DTexture?(C.setTexture3D(F,0),Oe=z.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(C.setTexture2DArray(F,0),Oe=z.TEXTURE_2D_ARRAY):(C.setTexture2D(F,0),Oe=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,F.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,F.unpackAlignment);const Yn=z.getParameter(z.UNPACK_ROW_LENGTH),lt=z.getParameter(z.UNPACK_IMAGE_HEIGHT),yn=z.getParameter(z.UNPACK_SKIP_PIXELS),nr=z.getParameter(z.UNPACK_SKIP_ROWS),sn=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Mt.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Mt.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ie),z.pixelStorei(z.UNPACK_SKIP_ROWS,We),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ye);const Kr=w.isDataArrayTexture||w.isData3DTexture,St=F.isDataArrayTexture||F.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const Dn=re.get(w),Zr=re.get(F),hn=re.get(Dn.__renderTarget),di=re.get(Zr.__renderTarget);de.bindFramebuffer(z.READ_FRAMEBUFFER,hn.__webglFramebuffer),de.bindFramebuffer(z.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let pi=0;pi<Ce;pi++)Kr&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,re.get(w).__webglTexture,B,Ye+pi),w.isDepthTexture?(St&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,re.get(F).__webglTexture,B,vt+pi),z.blitFramebuffer(Ie,We,ae,Me,Pe,rt,ae,Me,z.DEPTH_BUFFER_BIT,z.NEAREST)):St?z.copyTexSubImage3D(Oe,B,Pe,rt,vt+pi,Ie,We,ae,Me):z.copyTexSubImage2D(Oe,B,Pe,rt,vt+pi,Ie,We,ae,Me);de.bindFramebuffer(z.READ_FRAMEBUFFER,null),de.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else St?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(Oe,B,Pe,rt,vt,ae,Me,Ce,rn,ct,Mt.data):F.isCompressedArrayTexture?z.compressedTexSubImage3D(Oe,B,Pe,rt,vt,ae,Me,Ce,rn,Mt.data):z.texSubImage3D(Oe,B,Pe,rt,vt,ae,Me,Ce,rn,ct,Mt):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,B,Pe,rt,ae,Me,rn,ct,Mt.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,B,Pe,rt,Mt.width,Mt.height,rn,Mt.data):z.texSubImage2D(z.TEXTURE_2D,B,Pe,rt,ae,Me,rn,ct,Mt);z.pixelStorei(z.UNPACK_ROW_LENGTH,Yn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,lt),z.pixelStorei(z.UNPACK_SKIP_PIXELS,yn),z.pixelStorei(z.UNPACK_SKIP_ROWS,nr),z.pixelStorei(z.UNPACK_SKIP_IMAGES,sn),B===0&&F.generateMipmaps&&z.generateMipmap(Oe),de.unbindTexture()},this.copyTextureToTexture3D=function(w,F,G=null,H=null,B=0){return w.isTexture!==!0&&(hs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,w=arguments[2],F=arguments[3],B=arguments[4]||0),hs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,F,G,H,B)},this.initRenderTarget=function(w){re.get(w).__webglFramebuffer===void 0&&C.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?C.setTextureCube(w,0):w.isData3DTexture?C.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?C.setTexture2DArray(w,0):C.setTexture2D(w,0),de.unbindTexture()},this.resetState=function(){y=0,E=0,R=null,de.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}class yl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new yl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bl extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class md{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vc,this.updateRanges=[],this.version=0,this.uuid=Ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Zt=new P;class Is{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyMatrix4(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.applyNormalMatrix(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zt.fromBufferAttribute(this,t),Zt.transformDirection(e),this.setXYZ(t,Zt.x,Zt.y,Zt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Cn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Cn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Cn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Cn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new tn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Is(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class jr extends On{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let _r;const ns=new P,vr=new P,xr=new P,Mr=new he,is=new he,gd=new Xe,ho=new P,rs=new P,po=new P,sf=new he,Da=new he,of=new he;class zs extends xt{constructor(e=new jr){if(super(),this.isSprite=!0,this.type="Sprite",_r===void 0){_r=new Vt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new md(t,5);_r.setIndex([0,1,2,0,2,3]),_r.setAttribute("position",new Is(n,3,0,!1)),_r.setAttribute("uv",new Is(n,2,3,!1))}this.geometry=_r,this.material=e,this.center=new he(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),vr.setFromMatrixScale(this.matrixWorld),gd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),xr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&vr.multiplyScalar(-xr.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;mo(ho.set(-.5,-.5,0),xr,o,vr,r,s),mo(rs.set(.5,-.5,0),xr,o,vr,r,s),mo(po.set(.5,.5,0),xr,o,vr,r,s),sf.set(0,0),Da.set(1,0),of.set(1,1);let a=e.ray.intersectTriangle(ho,rs,po,!1,ns);if(a===null&&(mo(rs.set(-.5,.5,0),xr,o,vr,r,s),Da.set(0,1),a=e.ray.intersectTriangle(ho,po,rs,!1,ns),a===null))return;const c=e.ray.origin.distanceTo(ns);c<e.near||c>e.far||t.push({distance:c,point:ns.clone(),uv:xn.getInterpolation(ns,ho,rs,po,sf,Da,of,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function mo(i,e,t,n,r,s){Mr.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(is.x=s*Mr.x-r*Mr.y,is.y=r*Mr.x+s*Mr.y):is.copy(Mr),i.copy(e),i.x+=is.x,i.y+=is.y,i.applyMatrix4(gd)}const af=new P,cf=new at,lf=new at,pS=new P,uf=new Xe,go=new P,Ua=new Hn,ff=new Xe,Fa=new Jo;class mS extends ce{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uu,this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new hi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,go),this.boundingBox.expandByPoint(go)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,go),this.boundingSphere.expandByPoint(go)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ua.copy(this.boundingSphere),Ua.applyMatrix4(r),e.ray.intersectsSphere(Ua)!==!1&&(ff.copy(r).invert(),Fa.copy(e.ray).applyMatrix4(ff),!(this.boundingBox!==null&&Fa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Fa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===A0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,r=this.geometry;cf.fromBufferAttribute(r.attributes.skinIndex,e),lf.fromBufferAttribute(r.attributes.skinWeight,e),af.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=lf.getComponent(s);if(o!==0){const a=cf.getComponent(s);uf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(pS.copy(af).applyMatrix4(uf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class _d extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vd extends Dt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=Ht,u=Ht,f,h){super(null,o,a,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hf=new Xe,gS=new Xe;class Al{constructor(e=[],t=[]){this.uuid=Ln(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:gS;hf.multiplyMatrices(a,t[s]),hf.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new Al(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new vd(t,e,e,Mn,In);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new _d),this.bones.push(o),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){const o=t[r];e.bones.push(o.uuid);const a=n[r];e.boneInverses.push(a.toArray())}return e}}class Xc extends tn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Sr=new Xe,df=new Xe,_o=[],pf=new hi,_S=new Xe,ss=new ce,os=new Hn;class vS extends ce{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,_S)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),pf.copy(e.boundingBox).applyMatrix4(Sr),this.boundingBox.union(pf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Sr),os.copy(e.boundingSphere).applyMatrix4(Sr),this.boundingSphere.union(os)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(ss.geometry=this.geometry,ss.material=this.material,ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),os.copy(this.boundingSphere),os.applyMatrix4(n),e.ray.intersectsSphere(os)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Sr),df.multiplyMatrices(n,Sr),ss.matrixWorld=df,ss.raycast(e,_o);for(let o=0,a=_o.length;o<a;o++){const c=_o[o];c.instanceId=s,c.object=this,t.push(c)}_o.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Xc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new vd(new Float32Array(r*this.count),r,this.count,dl,In));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class El extends On{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xo=new P,jo=new P,mf=new Xe,as=new Jo,vo=new Hn,Ba=new P,gf=new P;class ea extends xt{constructor(e=new Vt,t=new El){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Xo.fromBufferAttribute(t,r-1),jo.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Xo.distanceTo(jo);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(r),vo.radius+=s,e.ray.intersectsSphere(vo)===!1)return;mf.copy(r).invert(),as.copy(e.ray).applyMatrix4(mf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),S=xo(this,e,as,c,p,v);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=xo(this,e,as,c,_,m);p&&t.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=l){const p=xo(this,e,as,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=xo(this,e,as,c,g-1,d);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function xo(i,e,t,n,r,s){const o=i.geometry.attributes.position;if(Xo.fromBufferAttribute(o,r),jo.fromBufferAttribute(o,s),t.distanceSqToSegment(Xo,jo,Ba,gf)>n)return;Ba.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ba);if(!(c<e.near||c>e.far))return{distance:c,point:gf.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}const _f=new P,vf=new P;class xS extends ea{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)_f.fromBufferAttribute(t,r),vf.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+_f.distanceTo(vf);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class MS extends ea{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class xd extends On{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xf=new Xe,jc=new Jo,Mo=new Hn,So=new P;class SS extends xt{constructor(e=new Vt,t=new xd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(r),Mo.radius+=s,e.ray.intersectsSphere(Mo)===!1)return;xf.copy(r).invert(),jc.copy(e.ray).applyMatrix4(xf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const h=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=l.getX(g);So.fromBufferAttribute(f,m),Mf(So,m,c,r,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)So.fromBufferAttribute(f,g),Mf(So,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Mf(i,e,t,n,r,s,o){const a=jc.distanceSqToPoint(i);if(a<t){const c=new P;jc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Os extends Dt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],h=n[r+1]-u,d=(o-u)/h;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new he:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new P,r=[],s=[],o=[],a=new P,c=new Xe;for(let d=0;d<=e;d++){const g=d/e;r[d]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Nt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Nt(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Tl extends Wn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new he){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class yS extends Tl{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function wl(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,f){let h=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+f)+(c-a)/f;h*=u,d*=u,r(o,a,h,d)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const yo=new P,ka=new wl,Va=new wl,Ga=new wl;class bS extends Wn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new P){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(yo.subVectors(r[0],r[1]).add(r[0]),l=yo);const f=r[a%s],h=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(yo.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=yo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ka.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,_,m),Va.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,_,m),Ga.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(ka.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),Va.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),Ga.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(ka.calc(c),Va.calc(c),Ga.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Sf(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function AS(i,e){const t=1-i;return t*t*e}function ES(i,e){return 2*(1-i)*i*e}function TS(i,e){return i*i*e}function gs(i,e,t,n){return AS(i,e)+ES(i,t)+TS(i,n)}function wS(i,e){const t=1-i;return t*t*t*e}function RS(i,e){const t=1-i;return 3*t*t*i*e}function CS(i,e){return 3*(1-i)*i*i*e}function IS(i,e){return i*i*i*e}function _s(i,e,t,n,r){return wS(i,e)+RS(i,t)+CS(i,n)+IS(i,r)}class Md extends Wn{constructor(e=new he,t=new he,n=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new he){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(_s(e,r.x,s.x,o.x,a.x),_s(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class PS extends Wn{constructor(e=new P,t=new P,n=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new P){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(_s(e,r.x,s.x,o.x,a.x),_s(e,r.y,s.y,o.y,a.y),_s(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sd extends Wn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class LS extends Wn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class yd extends Wn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(gs(e,r.x,s.x,o.x),gs(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zS extends Wn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(gs(e,r.x,s.x,o.x),gs(e,r.y,s.y,o.y),gs(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bd extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return n.set(Sf(a,c.x,l.x,u.x,f.x),Sf(a,c.y,l.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new he().fromArray(r))}return this}}var yf=Object.freeze({__proto__:null,ArcCurve:yS,CatmullRomCurve3:bS,CubicBezierCurve:Md,CubicBezierCurve3:PS,EllipseCurve:Tl,LineCurve:Sd,LineCurve3:LS,QuadraticBezierCurve:yd,QuadraticBezierCurve3:zS,SplineCurve:bd});class OS extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yf[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new yf[r.type]().fromJSON(r))}return this}}class NS extends OS{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Sd(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new yd(this.currentPoint.clone(),new he(e,t),new he(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new Md(this.currentPoint.clone(),new he(e,t),new he(n,r),new he(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new bd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new Tl(e,t,n,r,s,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ns extends Vt{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Nt(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/t,f=new P,h=new he,d=new P,g=new P,_=new P;let m=0,p=0;for(let v=0;v<=e.length-1;v++)switch(v){case 0:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[v+1].x-e[v].x,p=e[v+1].y-e[v].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let v=0;v<=t;v++){const S=n+v*u*r,x=Math.sin(S),M=Math.cos(S);for(let y=0;y<=e.length-1;y++){f.x=e[y].x*x,f.y=e[y].y,f.z=e[y].x*M,o.push(f.x,f.y,f.z),h.x=v/t,h.y=y/(e.length-1),a.push(h.x,h.y);const E=c[3*y+0]*x,R=c[3*y+1],b=c[3*y+0]*M;l.push(E,R,b)}}for(let v=0;v<t;v++)for(let S=0;S<e.length-1;S++){const x=S+v*e.length,M=x,y=x+e.length,E=x+e.length+1,R=x+1;s.push(M,y,R),s.push(E,R,y)}this.setIndex(s),this.setAttribute("position",new gt(o,3)),this.setAttribute("uv",new gt(a,2)),this.setAttribute("normal",new gt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ns(e.points,e.segments,e.phiStart,e.phiLength)}}class Rl extends Ns{constructor(e=1,t=1,n=4,r=8){const s=new NS;s.absarc(0,-t/2,e,Math.PI*1.5,0),s.absarc(0,t/2,e,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new Rl(e.radius,e.length,e.capSegments,e.radialSegments)}}class ta extends Vt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],c=[],l=new P,u=new he;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const d=n+f/t*r;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,c.push(u.x,u.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new gt(o,3)),this.setAttribute("normal",new gt(a,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ta(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Gt extends Vt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let g=0;const _=[],m=n/2;let p=0;v(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(d,2));function v(){const x=new P,M=new P;let y=0;const E=(t-e)/n;for(let R=0;R<=s;R++){const b=[],A=R/s,I=A*(t-e)+e;for(let k=0;k<=r;k++){const L=k/r,D=L*c+a,q=Math.sin(D),X=Math.cos(D);M.x=I*q,M.y=-A*n+m,M.z=I*X,f.push(M.x,M.y,M.z),x.set(q,E,X).normalize(),h.push(x.x,x.y,x.z),d.push(L,1-A),b.push(g++)}_.push(b)}for(let R=0;R<r;R++)for(let b=0;b<s;b++){const A=_[b][R],I=_[b+1][R],k=_[b+1][R+1],L=_[b][R+1];(e>0||b!==0)&&(u.push(A,I,L),y+=3),(t>0||b!==s-1)&&(u.push(I,k,L),y+=3)}l.addGroup(p,y,0),p+=y}function S(x){const M=g,y=new he,E=new P;let R=0;const b=x===!0?e:t,A=x===!0?1:-1;for(let k=1;k<=r;k++)f.push(0,m*A,0),h.push(0,A,0),d.push(.5,.5),g++;const I=g;for(let k=0;k<=r;k++){const D=k/r*c+a,q=Math.cos(D),X=Math.sin(D);E.x=b*X,E.y=m*A,E.z=b*q,f.push(E.x,E.y,E.z),h.push(0,A,0),y.x=q*.5+.5,y.y=X*.5*A+.5,d.push(y.x,y.y),g++}for(let k=0;k<r;k++){const L=M+k,D=I+k;x===!0?u.push(D,D+1,L):u.push(D+1,D,L),R+=3}l.addGroup(p,R,x===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cl extends Vt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),u(),this.setAttribute("position",new gt(s,3)),this.setAttribute("normal",new gt(s.slice(),3)),this.setAttribute("uv",new gt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const S=new P,x=new P,M=new P;for(let y=0;y<t.length;y+=3)d(t[y+0],S),d(t[y+1],x),d(t[y+2],M),c(S,x,M,v)}function c(v,S,x,M){const y=M+1,E=[];for(let R=0;R<=y;R++){E[R]=[];const b=v.clone().lerp(x,R/y),A=S.clone().lerp(x,R/y),I=y-R;for(let k=0;k<=I;k++)k===0&&R===y?E[R][k]=b:E[R][k]=b.clone().lerp(A,k/I)}for(let R=0;R<y;R++)for(let b=0;b<2*(y-R)-1;b++){const A=Math.floor(b/2);b%2===0?(h(E[R][A+1]),h(E[R+1][A]),h(E[R][A])):(h(E[R][A+1]),h(E[R+1][A+1]),h(E[R+1][A]))}}function l(v){const S=new P;for(let x=0;x<s.length;x+=3)S.x=s[x+0],S.y=s[x+1],S.z=s[x+2],S.normalize().multiplyScalar(v),s[x+0]=S.x,s[x+1]=S.y,s[x+2]=S.z}function u(){const v=new P;for(let S=0;S<s.length;S+=3){v.x=s[S+0],v.y=s[S+1],v.z=s[S+2];const x=m(v)/2/Math.PI+.5,M=p(v)/Math.PI+.5;o.push(x,1-M)}g(),f()}function f(){for(let v=0;v<o.length;v+=6){const S=o[v+0],x=o[v+2],M=o[v+4],y=Math.max(S,x,M),E=Math.min(S,x,M);y>.9&&E<.1&&(S<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),M<.2&&(o[v+4]+=1))}}function h(v){s.push(v.x,v.y,v.z)}function d(v,S){const x=v*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function g(){const v=new P,S=new P,x=new P,M=new P,y=new he,E=new he,R=new he;for(let b=0,A=0;b<s.length;b+=9,A+=6){v.set(s[b+0],s[b+1],s[b+2]),S.set(s[b+3],s[b+4],s[b+5]),x.set(s[b+6],s[b+7],s[b+8]),y.set(o[A+0],o[A+1]),E.set(o[A+2],o[A+3]),R.set(o[A+4],o[A+5]),M.copy(v).add(S).add(x).divideScalar(3);const I=m(M);_(y,A+0,v,I),_(E,A+2,S,I),_(R,A+4,x,I)}}function _(v,S,x,M){M<0&&v.x===1&&(o[S]=v.x-1),x.x===0&&x.z===0&&(o[S]=M/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cl(e.vertices,e.indices,e.radius,e.details)}}class Il extends Cl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Il(e.radius,e.detail)}}class Ei extends Vt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],f=new P,h=new P,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],S=p/n;let x=0;p===0&&o===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){const y=M/t;f.x=-e*Math.cos(r+y*s)*Math.sin(o+S*a),f.y=e*Math.cos(o+S*a),f.z=e*Math.sin(r+y*s)*Math.sin(o+S*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(y+x,1-S),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const S=u[p][v+1],x=u[p][v],M=u[p+1][v],y=u[p+1][v+1];(p!==0||o>0)&&d.push(S,x,y),(p!==n-1||c<Math.PI)&&d.push(x,M,y)}this.setIndex(d),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ei(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Pl extends Vt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new P,f=new P,h=new P;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const _=g/r*s,m=d/n*Math.PI*2;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),a.push(f.x,f.y,f.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(f,u).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const _=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,v=(r+1)*d+g;o.push(_,m,v),o.push(m,p,v)}this.setIndex(o),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class st extends On{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Zh,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xn extends st{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new he(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function bo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function DS(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function US(i){function e(r,s){return i[r]-i[s]}const t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function bf(i,e,t){const n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)r[o++]=i[a+c]}return r}function Ad(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}class Ds{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class FS extends Ds{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:br,endingEnd:br}}intervalChanged_(e,t,n){const r=this.parameterPositions;let s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ar:s=e,a=2*t-n;break;case Ho:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ar:o=e,c=2*n-t;break;case Ho:o=1,c=n+r[1]-r[0];break;default:o=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(n-t)/(r-t),_=g*g,m=_*g,p=-h*m+2*h*_-h*g,v=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*g+1,S=(-1-d)*m+(1.5+d)*_+.5*g,x=d*m-d*_;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+v*o[l+M]+S*o[c+M]+x*o[f+M];return s}}class Ed extends Ds{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[l+h]*f+o[c+h]*u;return s}}class BS extends Ds{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}}class jn{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bo(t,this.TimeBufferType),this.values=bo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bo(e.times,Array),values:bo(e.values,Array)};const r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new BS(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ed(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new FS(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ws:t=this.InterpolantFactoryMethodDiscrete;break;case Rs:t=this.InterpolantFactoryMethodLinear;break;case ca:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return Rs;case this.InterpolantFactoryMethodSmooth:return ca}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){const n=this.times,r=n.length;let s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&DS(r))for(let a=0,c=r.length;a!==c;++a){const l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ca,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{const f=a*n,h=f-n,d=f+n;for(let g=0;g!==n;++g){const _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const f=a*n,h=o*n;for(let d=0;d!==n;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}}jn.prototype.TimeBufferType=Float32Array;jn.prototype.ValueBufferType=Float32Array;jn.prototype.DefaultInterpolation=Rs;class qr extends jn{constructor(e,t,n){super(e,t,n)}}qr.prototype.ValueTypeName="bool";qr.prototype.ValueBufferType=Array;qr.prototype.DefaultInterpolation=ws;qr.prototype.InterpolantFactoryMethodLinear=void 0;qr.prototype.InterpolantFactoryMethodSmooth=void 0;class Td extends jn{}Td.prototype.ValueTypeName="color";class Gr extends jn{}Gr.prototype.ValueTypeName="number";class kS extends Ds{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t);let l=e*a;for(let u=l+a;l!==u;l+=4)zn.slerpFlat(s,0,o,l-a,o,l,c);return s}}class Hr extends jn{InterpolantFactoryMethodLinear(e){return new kS(this.times,this.values,this.getValueSize(),e)}}Hr.prototype.ValueTypeName="quaternion";Hr.prototype.InterpolantFactoryMethodSmooth=void 0;class Yr extends jn{constructor(e,t,n){super(e,t,n)}}Yr.prototype.ValueTypeName="string";Yr.prototype.ValueBufferType=Array;Yr.prototype.DefaultInterpolation=ws;Yr.prototype.InterpolantFactoryMethodLinear=void 0;Yr.prototype.InterpolantFactoryMethodSmooth=void 0;class Wr extends jn{}Wr.prototype.ValueTypeName="vector";class qc{constructor(e="",t=-1,n=[],r=_l){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Ln(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(GS(n[o]).scale(r));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(jn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const u=US(c);c=bf(c,1,u),l=bf(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new Gr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],u=l.name.match(s);if(u&&u.length>1){const f=u[1];let h=r[f];h||(r[f]=h=[]),h.push(l)}}const o=[];for(const a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(f,h,d,g,_){if(d.length!==0){const m=[],p=[];Ad(d,m,p,g),m.length!==0&&_.push(new f(h,m,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let f=0;f<l.length;f++){const h=l[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let v=0;v!==h[g].morphTargets.length;++v){const S=h[g];m.push(S.time),p.push(S.morphTarget===_?1:0)}r.push(new Gr(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{const d=".bones["+t[f].name+"]";n(Wr,d+".position",h,"pos",r),n(Hr,d+".quaternion",h,"rot",r),n(Wr,d+".scale",h,"scl",r)}}return r.length===0?null:new this(s,c,r,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,r=e.length;n!==r;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function VS(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gr;case"vector":case"vector2":case"vector3":case"vector4":return Wr;case"color":return Td;case"quaternion":return Hr;case"bool":case"boolean":return qr;case"string":return Yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function GS(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=VS(i.type);if(i.times===void 0){const t=[],n=[];Ad(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const Ti={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class HS{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){const d=l[f],g=l[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const WS=new HS;class $r{constructor(e){this.manager=e!==void 0?e:WS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}$r.DEFAULT_MATERIAL_NAME="__DEFAULT";const ei={};class XS extends Error{constructor(e,t){super(e),this.response=t}}class wd extends $r{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ti.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(ei[e]!==void 0){ei[e].push({onLoad:t,onProgress:n,onError:r});return}ei[e]=[],ei[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=ei[e],f=l.body.getReader(),h=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=h?parseInt(h):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){f.read().then(({done:S,value:x})=>{if(S)p.close();else{_+=x.byteLength;const M=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let y=0,E=u.length;y<E;y++){const R=u[y];R.onProgress&&R.onProgress(M)}p.enqueue(x),v()}},S=>{p.error(S)})}}});return new Response(m)}else throw new XS(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{Ti.add(e,l);const u=ei[e];delete ei[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=ei[e];if(u===void 0)throw this.manager.itemError(e),l;delete ei[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jS extends $r{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ti.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Cs("img");function c(){u(),Ti.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(f){u(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Rd extends $r{constructor(e){super(e)}load(e,t,n,r){const s=new Dt,o=new jS(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class na extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Cd extends na{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ha=new Xe,Af=new P,Ef=new P;class Ll{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xl,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Af.setFromMatrixPosition(e.matrixWorld),t.position.copy(Af),Ef.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ef),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class qS extends Ll{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=kr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Id extends na{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new qS}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Tf=new Xe,cs=new P,Wa=new P;class YS extends Ll{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new he(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),cs.setFromMatrixPosition(e.matrixWorld),n.position.copy(cs),Wa.copy(n.position),Wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Wa),n.updateMatrixWorld(),r.makeTranslation(-cs.x,-cs.y,-cs.z),Tf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tf)}}class ai extends na{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new YS}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $S extends Ll{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zl extends na{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new $S}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class vs{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class KS extends $r{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Ti.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ti.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),Ti.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Ti.add(e,c),s.manager.itemStart(e)}}class ZS{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,r=this.valueSize,s=e*r+r;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,r,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,r);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){zn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){const o=this._workIndex*s;zn.multiplyQuaternionsFlat(e,o,e,t,e,n),zn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){const o=1-r;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*r}}}const Ol="\\[\\]\\.:\\/",JS=new RegExp("["+Ol+"]","g"),Nl="[^"+Ol+"]",QS="[^"+Ol.replace("\\.","")+"]",ey=/((?:WC+[\/:])*)/.source.replace("WC",Nl),ty=/(WCOD+)?/.source.replace("WCOD",QS),ny=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nl),iy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nl),ry=new RegExp("^"+ey+ty+ny+iy+"$"),sy=["material","materials","bones","map"];class oy{constructor(e,t,n){const r=n||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ut{constructor(e,t,n){this.path=t,this.parsedPath=n||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,n):new ut(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(JS,"")}static parseTrackName(e){const t=ry.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){const s=n.nodeName.substring(r+1);sy.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,r=t.propertyName;let s=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[r];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=oy;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class ay{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:br,endingEnd:br};for(let l=0;l!==o;++l){const u=s[l].createInterpolant(null);a[l]=u,u.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=E0,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const r=this._mixer,s=r.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case w0:for(let u=0,f=c.length;u!==f;++u)c[u].evaluate(o),l[u].accumulateAdditive(a);break;case _l:default:for(let u=0,f=c.length;u!==f;++u)c[u].evaluate(o),l[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let r=this.time+e,s=this._loopCount;const o=n===T0;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===$h){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){const a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){const r=this._interpolantSettings;n?(r.endingStart=Ar,r.endingEnd=Ar):(e?r.endingStart=this.zeroSlopeAtStart?Ar:br:r.endingStart=Ho,t?r.endingEnd=this.zeroSlopeAtEnd?Ar:br:r.endingEnd=Ho)}_scheduleFading(e,t,n){const r=this._mixer,s=r.time;let o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const cy=new Float32Array(1);class Pd extends tr{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let u=l[c];u===void 0&&(u={},l[c]=u);for(let f=0;f!==s;++f){const h=r[f],d=h.name;let g=u[d];if(g!==void 0)++g.referenceCount,o[f]=g;else{if(g=o[f],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,d));continue}const _=t&&t._propertyBindings[f].binding.parsedPath;g=new ZS(ut.create(n,d,_),h.ValueTypeName,h.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,d),o[f]=g}a[f].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const r=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],u=e._byClipCacheIndex;l._byClipCacheIndex=u,c[u]=l,c.pop(),e._byClipCacheIndex=null;const f=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete f[h],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const r=this._bindingsByRootAndName,s=this._bindings;let o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ed(new Float32Array(2),new Float32Array(2),1,cy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const r=t||this._root,s=r.uuid;let o=typeof e=="string"?qc.findByName(r,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=_l),c!==void 0){const f=c.actionByRoot[s];if(f!==void 0&&f.blendMode===n)return f;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const u=new ay(this,o,t,n);return this._bindAction(u,l),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,r=n.uuid,s=typeof e=="string"?qc.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(r,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const u=l._cacheIndex,f=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,f._cacheIndex=u,t[u]=f,t.pop(),this._removeInactiveBindingsForAction(l)}delete r[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ll}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ll);function qo(i){const e=new Map,t=new Map,n=i.clone();return Ld(i,n,function(r,s){e.set(s,r),t.set(r,s)}),n.traverse(function(r){if(!r.isSkinnedMesh)return;const s=r,o=e.get(r),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Ld(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Ld(i.children[n],e.children[n],t)}class ly extends bl{constructor(){super();const e=new Ot;e.deleteAttribute("uv");const t=new st({side:en}),n=new st,r=new ai(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new ce(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new ce(e,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new ce(e,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new ce(e,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new ce(e,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const u=new ce(e,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const f=new ce(e,n);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const h=new ce(e,yr(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const d=new ce(e,yr(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const g=new ce(e,yr(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new ce(e,yr(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new ce(e,yr(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new ce(e,yr(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function yr(i){const e=new At;return e.color.setScalar(i),e}function zd(i){let e=i>>>0;return()=>{const[t,n]=ch(e);return e=n,t}}const bt=64;function Rt(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e;const s=r.getContext("2d");t(s,i,e,zd(i*31+e));const o=new Os(r);return o.colorSpace=Pt,o.anisotropy=4,n&&(o.wrapS=o.wrapT=Ii),o}const uy=Object.freeze(["muro","piastrelle","parquet","soffitto","legno","legnoChiaro","porta","terra","linoleum","cemento","asfalto","metallo"]);async function fy(i="./texture/"){const e=new Rd,t=async(r,s)=>{const o=await e.loadAsync(`${i}${r}.jpg`);return o.wrapS=o.wrapT=Ii,o.anisotropy=8,s&&(o.colorSpace=Pt),o},n=await Promise.all(uy.map(async r=>{const[s,o,a]=await Promise.all([t(`${r}_diff`,!0),t(`${r}_nor`,!1),t(`${r}_rough`,!1)]);return[r,{map:s,normalMap:o,roughnessMap:a}]}));return Object.fromEntries(n)}function zt(i,e,t,n,r,s){for(let o=0;o<s;o++)i.fillStyle=r[Math.floor(n()*r.length)],i.fillRect(Math.floor(n()*e),Math.floor(n()*t),1+Math.floor(n()*2),1+Math.floor(n()*2))}function Si(i,e,t,n,r,s){for(let o=0;o<s;o++){i.fillStyle=r;const a=n()*e,c=n()*t;for(let l=0;l<14;l++)i.fillRect(Math.floor(a+(n()-.5)*10),Math.floor(c+(n()-.5)*10),2,2)}}function hy(){const i=Rt(bt,bt,(M,y,E,R)=>{M.fillStyle="#b9ae8e",M.fillRect(0,0,y,E),zt(M,y,E,R,["#a99f80","#c5bb9c","#9c9274"],500),M.fillStyle="#3f5b48",M.fillRect(0,Math.floor(E*.62),y,Math.ceil(E*.38));for(let b=0;b<y;b+=8)for(let A=Math.floor(E*.62);A<E;A+=8)M.fillStyle=(b+A)%16?"#466751":"#3a5443",M.fillRect(b,A,7,7);M.fillStyle="#2c2a22",M.fillRect(0,Math.floor(E*.6),y,2),Si(M,y,E*.6,R,"rgba(70,55,30,0.35)",5)}),e=Rt(bt,bt,(M,y,E,R)=>{for(let b=0;b<y;b+=16)for(let A=0;A<E;A+=16)M.fillStyle=(b+A)/16%2?"#8d8a80":"#5f5d57",M.fillRect(b,A,16,16);zt(M,y,E,R,["#4b4943","#9b988e","#3a3934"],400),M.fillStyle="#2a2925";for(let b=0;b<y;b+=16)M.fillRect(b,0,1,E),M.fillRect(0,b,y,1)}),t=Rt(bt,bt,(M,y,E,R)=>{for(let b=0;b<E;b+=8){const A=b/8%2?0:16;for(let I=-A;I<y;I+=32){const k=120+Math.floor(R()*30);M.fillStyle=`rgb(${k},${Math.floor(k*.68)},${Math.floor(k*.4)})`,M.fillRect(I,b,31,7)}}zt(M,y,E,R,["#5e3d22","#8e6238"],300),M.fillStyle="#d8d0b0",M.fillRect(0,30,y,1)}),n=Rt(bt,bt,(M,y,E,R)=>{M.fillStyle="#8f8b7c",M.fillRect(0,0,y,E),zt(M,y,E,R,["#7e7a6c","#a19d8d","#6a675b"],600),M.fillStyle="#4f4c43";for(let b=0;b<y;b+=32)M.fillRect(b,0,2,E),M.fillRect(0,b,y,2);Si(M,y,E,R,"rgba(90,70,30,0.4)",3)}),r=Rt(bt,16,(M,y,E,R)=>{M.fillStyle="#6b4a2b",M.fillRect(0,0,y,E),zt(M,y,E,R,["#5a3d22","#7d5834","#4a311b"],200),M.fillStyle="#3a2614",M.fillRect(0,0,y,1),M.fillRect(0,E-1,y,1),M.fillStyle="#9a9a9a",M.fillRect(4,6,2,2),M.fillRect(y-6,7,2,2)}),s=Rt(bt,bt,(M,y,E,R)=>{for(let b=0;b<y;b+=8){const A=70+Math.floor(R()*25);M.fillStyle=`rgb(${A},${Math.floor(A*.72)},${Math.floor(A*.45)})`,M.fillRect(b,0,7,E)}zt(M,y,E,R,["#3b2817","#56391f"],200),M.strokeStyle="#8f8f8f",M.lineWidth=2,M.beginPath(),M.moveTo(0,18),M.lineTo(y,46),M.moveTo(y,18),M.lineTo(0,46),M.stroke()}),o=Rt(bt,bt,(M,y,E,R)=>{for(let b=0;b<y;b+=16){M.fillStyle="#4b6a7f",M.fillRect(b,0,15,E),M.fillStyle="#2d4150";for(let A=6;A<20;A+=3)M.fillRect(b+4,A,8,1);M.fillStyle="#c0c0c0",M.fillRect(b+12,30,2,5)}zt(M,y,E,R,["#6b5a3a","#3a4d5a"],300)},!0),a=Rt(256,256,(M,y,E,R)=>{const b=["#5a1f1b","#1f3a5a","#2f4a2a","#6b5233","#3d2b4a","#7a6a4a","#2a2a2a","#4a3020","#8a7a5a","#244040"];M.fillStyle="#2a1b10",M.fillRect(0,0,y,E);const A=E/4;for(let I=0;I<4;I++){const k=(I+1)*A-6;let L=2;for(;L<y-4;){const D=5+Math.floor(R()*9),q=A*(.55+R()*.32),X=R()<.06;if(!X){const ie=R()<.05;M.save(),M.translate(L,k),ie&&M.rotate(-.18),M.fillStyle=b[Math.floor(R()*b.length)],M.fillRect(0,-q,D,q),M.fillStyle="rgba(0,0,0,0.35)",M.fillRect(D-1,-q,1,q),M.fillStyle="rgba(210,180,110,0.55)",D>7&&(M.fillRect(1,-q+6,D-2,1),M.fillRect(1,-10,D-2,1)),M.restore()}L+=D+(X?6:0)}M.fillStyle="#4a3220",M.fillRect(0,k,y,6),M.fillStyle="#1a1009",M.fillRect(0,k+5,y,1)}zt(M,y,E,R,["rgba(120,110,90,0.25)","rgba(0,0,0,0.25)"],1200)}),c=Rt(bt,bt,(M,y,E,R)=>{M.fillStyle="#2b2a1e",M.fillRect(0,0,y,E),zt(M,y,E,R,["#3a3824","#22301a","#1d1c14","#34452a"],900)}),l=Rt(bt*2,bt,(M,y,E,R)=>{M.fillStyle="#5b4026",M.fillRect(0,0,y,E),M.fillStyle="#1f3327",M.fillRect(4,4,y-8,E-8),zt(M,y,E,R,["#2a4434","#18281e"],300),M.fillStyle="rgba(230,230,220,0.85)",M.font="bold 13px monospace",M.fillText("NON USCITE",14,26),M.fillText("DI NOTTE",22,44),M.fillStyle="rgba(120,10,10,0.8)",M.fillRect(90,46,20,2)},!1),u=Rt(32,32,(M,y,E,R)=>{M.fillStyle="#3a3d40",M.fillRect(0,0,y,E),zt(M,y,E,R,["#2b2d30","#4a4e52","#55493a"],120)}),f=Rt(32,32,(M,y,E,R)=>{M.fillStyle="#8a6a44",M.fillRect(0,0,y,E),zt(M,y,E,R,["#6e5333","#9e7c52"],150);for(let b=0;b<E;b+=8)M.fillStyle="#5a4126",M.fillRect(0,b,y,1)}),h=Rt(bt,bt,(M,y,E,R)=>{for(let b=0;b<y;b+=32)for(let A=0;A<E;A+=32)M.fillStyle=(b+A)/32%2?"#b8ad86":"#6f8a6a",M.fillRect(b,A,32,32);zt(M,y,E,R,["#9a916e","#5c7358","#c9bf9a","#4a4536"],500),Si(M,y,E,R,"rgba(60,45,25,0.35)",3)}),d=Rt(bt,bt,(M,y,E,R)=>{M.fillStyle="#5d5c58",M.fillRect(0,0,y,E),zt(M,y,E,R,["#4e4d49","#6b6a65","#3f3e3a","#74706a"],900),M.strokeStyle="#2f2e2b",M.lineWidth=1,M.beginPath(),M.moveTo(4,10),M.lineTo(22,26),M.lineTo(30,24),M.lineTo(50,44),M.stroke(),Si(M,y,E,R,"rgba(40,30,15,0.5)",4)}),g=Rt(bt,bt,(M,y,E,R)=>{M.fillStyle="#2f3032",M.fillRect(0,0,y,E),zt(M,y,E,R,["#3a3b3d","#262729","#45464a","#1f2022"],1100),M.fillStyle="rgba(210,200,160,0.55)",M.fillRect(0,31,y,2),Si(M,y,E,R,"rgba(20,20,20,0.6)",3)}),_=Rt(32,32,(M,y,E)=>{M.clearRect(0,0,y,E),M.strokeStyle="#8d9499",M.lineWidth=1;for(let R=-32;R<64;R+=8)M.beginPath(),M.moveTo(R,0),M.lineTo(R+32,32),M.moveTo(R+32,0),M.lineTo(R,32),M.stroke()}),m=Rt(bt*2,bt,(M,y,E,R)=>{M.fillStyle="#d9a21b",M.fillRect(0,0,y,E),zt(M,y,E,R,["#b9861a","#e5b43a","#6b4a1a"],700),M.fillStyle="#1b2228";for(let b=6;b<y-10;b+=20)M.fillRect(b,10,15,16);M.fillStyle="#111",M.fillRect(0,34,y,4),M.font="bold 10px monospace",M.fillText("SCUOLABUS",30,50),Si(M,y,E,R,"rgba(90,50,20,0.6)",5)}),p=Rt(16,32,(M,y,E,R)=>{M.fillStyle="#3b2c1e",M.fillRect(0,0,y,E),zt(M,y,E,R,["#2a1f15","#4a3828"],120)}),v=Rt(32,32,(M,y,E,R)=>{M.fillStyle="#1f3a1e",M.fillRect(0,0,y,E),zt(M,y,E,R,["#15281a","#2b4d24","#183020"],300)}),S=Rt(32,32,(M,y,E,R)=>{M.fillStyle="#4b5237",M.fillRect(0,0,y,E),Si(M,y,E,R,"rgba(35,40,25,0.9)",7),Si(M,y,E,R,"rgba(110,98,66,0.8)",5),zt(M,y,E,R,["#3c4230","#585f40"],160)}),x=Rt(64,32,(M,y,E,R)=>{M.fillStyle="#5b4632",M.fillRect(0,0,y,E),zt(M,y,E,R,["#4a3828","#6b5440"],260),M.fillStyle="rgba(0,0,0,0.35)";for(let b=4;b<y;b+=8)for(let A=4;A<E;A+=8)M.fillRect(b,A,2,2)});return{muro:i,piastrelle:e,parquet:t,soffitto:n,legno:r,porta:s,armadietti:o,terra:c,lavagna:l,metallo:u,legnoChiaro:f,linoleum:h,cemento:d,asfalto:g,rete:_,pulmino:m,corteccia:p,fogliame:v,mimetica:S,pannello:x,libri:a}}function ni(i,{larghezza:e=128,altezza:t=64,sfondo:n=null,colore:r="#f2efe6",font:s="bold 14px monospace",bordo:o=null}={}){return Rt(e,t,a=>{n&&(a.fillStyle=n,a.fillRect(0,0,e,t)),o&&(a.strokeStyle=o,a.lineWidth=3,a.strokeRect(2,2,e-4,t-4)),a.fillStyle=r,a.font=s,a.textAlign="center",a.textBaseline="middle",i.forEach((c,l)=>a.fillText(c,e/2,(l+1)*t/(i.length+1)))},!1)}function wf(i,e){if(e===R0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===kc||e===Kh){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,r=[];if(e===kc)for(let o=1;o<=n;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=i.clone();return s.setIndex(r),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class ia extends $r{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new _y(t)}),this.register(function(t){return new vy(t)}),this.register(function(t){return new wy(t)}),this.register(function(t){return new Ry(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new My(t)}),this.register(function(t){return new Sy(t)}),this.register(function(t){return new yy(t)}),this.register(function(t){return new by(t)}),this.register(function(t){return new gy(t)}),this.register(function(t){return new Ay(t)}),this.register(function(t){return new xy(t)}),this.register(function(t){return new Ty(t)}),this.register(function(t){return new Ey(t)}),this.register(function(t){return new py(t)}),this.register(function(t){return new Iy(t)}),this.register(function(t){return new Py(t)})}load(e,t,n,r){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=vs.extractUrlBase(e);o=vs.resolveURL(l,this.path)}else o=vs.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new wd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Od){try{o[Qe.KHR_BINARY_GLTF]=new Ly(e)}catch(f){r&&r(f);return}s=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Xy(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case Qe.KHR_MATERIALS_UNLIT:o[f]=new my;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[f]=new zy(s,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[f]=new Oy;break;case Qe.KHR_MESH_QUANTIZATION:o[f]=new Ny;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){const n=this;return new Promise(function(r,s){n.parse(e,t,r,s)})}}function dy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class py{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let r=t.cache.get(n);if(r)return r;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new Ne(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],nn);const f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new zl(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new ai(u),l.distance=f;break;case"spot":l=new Id(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,ii(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class my{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return At}extendParams(e,t,n){const r=[];e.color=new Ne(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],nn),e.opacity=o[3]}s.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",s.baseColorTexture,Pt))}return Promise.all(r)}}class gy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class _y{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new he(a,a)}return Promise.all(s)}}class vy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class xy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class My{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],nn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Pt)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Sy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class yy{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(a[0],a[1],a[2],nn),Promise.all(s)}}class by{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=r.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Ay{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(a[0],a[1],a[2],nn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Pt)),Promise.all(s)}}class Ey{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Ty{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Xn}extendMaterialParams(e,t){const n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const s=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class wy{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;const s=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Ry{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Cy{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,r=n.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=r.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Iy{constructor(e){this.name=Qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const r=n.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=r.byteOffset||0,l=r.byteLength||0,u=r.count,f=r.byteStride,h=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,r.mode,r.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,r.mode,r.filter),d})})}else return null}}class Py{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const r=t.meshes[n.mesh];for(const l of r.primitives)if(l.mode!==_n.TRIANGLES&&l.mode!==_n.TRIANGLE_STRIP&&l.mode!==_n.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const u=l.pop(),f=u.isGroup?u.children:[u],h=l[0].count,d=[];for(const g of f){const _=new Xe,m=new P,p=new zn,v=new P(1,1,1),S=new vS(g.geometry,g.material,h);for(let x=0;x<h;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,x),c.SCALE&&v.fromBufferAttribute(c.SCALE,x),S.setMatrixAt(x,_.compose(m,p,v));for(const x in c)if(x==="_COLOR_0"){const M=c[x];S.instanceColor=new Xc(M.array,M.itemSize,M.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);xt.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),d.push(S)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Od="glTF",ls=12,Rf={JSON:1313821514,BIN:5130562};class Ly{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ls),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Od)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-ls,s=new DataView(e,ls);let o=0;for(;o<r;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===Rf.JSON){const l=new Uint8Array(e,ls+o,a);this.content=n.decode(l)}else if(c===Rf.BIN){const l=ls+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class zy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const f=Yc[u]||u.toLowerCase();a[f]=o[u]}for(const u in e.attributes){const f=Yc[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],d=Cr[h.componentType];l[f]=d.name,c[f]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){r.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}f(d)},a,l,nn,h)})})}}class Oy{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ny{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}}class Nd extends Ds{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let o=0;o!==r;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,r){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,f=(n-t)/u,h=f*f,d=h*f,g=e*l,_=g-l,m=-2*d+3*h,p=d-h,v=1-m,S=p-h+f;for(let x=0;x!==a;x++){const M=o[_+x+a],y=o[_+x+c]*u,E=o[g+x+a],R=o[g+x]*u;s[x]=v*M+S*y+m*E+p*R}return s}}const Dy=new zn;class Uy extends Nd{interpolate_(e,t,n,r){const s=super.interpolate_(e,t,n,r);return Dy.fromArray(s).normalize().toArray(s),s}}const _n={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Cr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Cf={9728:Ht,9729:ln,9984:Bh,9985:To,9986:fs,9987:si},If={33071:Ai,33648:Go,10497:Ii},Xa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},yi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Fy={CUBICSPLINE:void 0,LINEAR:Rs,STEP:ws},ja={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function By(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new st({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ui})),i.DefaultMaterial}function ki(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ii(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ky(i,e,t){let n=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(r=!0),f.COLOR_0!==void 0&&(s=!0),n&&r&&s)break}if(!n&&!r&&!s)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){const f=e[l];if(n){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;o.push(h)}if(r){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],f=l[1],h=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=f),s&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function Vy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Gy(i){let e;const t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+qa(t.attributes):e=i.indices+":"+qa(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+qa(i.targets[n]);return e}function qa(i){let e="";const t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function $c(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Hy(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Wy=new Xe;class Xy{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new dy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);r=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&r<17||s&&o<98?this.textureLoader=new Rd(this.options.manager):this.textureLoader=new KS(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new wd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:n,userData:{}};return ki(s,a,r),ii(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){const o=t[r].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let r=0,s=e.length;r<s;r++){const o=e[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const r=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())s(u,a.children[l])};return s(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const r=e(t[n]);if(r)return r}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let r=0;r<t.length;r++){const s=e(t[r]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(s,o){n.load(vs.resolveURL(t.uri,r.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const r=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+r)})}loadAccessor(e){const t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){const o=Xa[r.type],a=Cr[r.componentType],c=r.normalized===!0,l=new a(r.count*o);return Promise.resolve(new tn(l,o,c))}const s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Xa[r.type],l=Cr[r.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,h=r.byteOffset||0,d=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0;let _,m;if(d&&d!==f){const p=Math.floor(h/d),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count;let S=t.cache.get(v);S||(_=new l(a,p*d,r.count*d/u),S=new md(_,d/u),t.cache.add(v,S)),m=new Is(S,c,h%d/u,g)}else a===null?_=new l(r.count*c):_=new l(a,h,r.count*c),m=new tn(_,c,g);if(r.sparse!==void 0){const p=Xa.SCALAR,v=Cr[r.sparse.indices.componentType],S=r.sparse.indices.byteOffset||0,x=r.sparse.values.byteOffset||0,M=new v(o[1],S,r.sparse.count*p),y=new l(o[2],x,r.sparse.count*c);a!==null&&(m=new tn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,R=M.length;E<R;E++){const b=M[E];if(m.setX(b,y[E*c]),c>=2&&m.setY(b,y[E*c+1]),c>=3&&m.setZ(b,y[E*c+2]),c>=4&&m.setW(b,y[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const r=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=Cf[h.magFilter]||ln,u.minFilter=Cf[h.minFilter]||si,u.wrapS=If[h.wrapS]||Ii,u.wrapT=If[h.wrapT]||Ii,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Ht&&u.minFilter!==ln,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=r.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(f){l=!0;const h=new Blob([f],{type:o.mimeType});return c=a.createObjectURL(h),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(f){return new Promise(function(h,d){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Dt(_);m.needsUpdate=!0,h(m)}),t.load(vs.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return l===!0&&a.revokeObjectURL(c),ii(f,o),f.userData.mimeType=o.mimeType||Hy(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return r!==void 0&&(o.colorSpace=r),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new xd,On.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new El,On.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||s||o){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return st}loadMaterial(e){const t=this,n=this.json,r=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){const f=r[Qe.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),l.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new Ne(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],nn),a.opacity=h[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",f.baseColorTexture,Pt)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=cn);const u=s.alphaMode||ja.OPAQUE;if(u===ja.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ja.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==At&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new he(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==At&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==At){const f=s.emissiveFactor;a.emissive=new Ne().setRGB(f[0],f[1],f[2],nn)}return s.emissiveTexture!==void 0&&o!==At&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Pt)),Promise.all(l).then(function(){const f=new o(a);return s.name&&(f.name=s.name),ii(f,s),t.associations.set(f,{materials:e}),s.extensions&&ki(r,f,s),f})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,r=this.primitiveCache;function s(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Pf(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],u=Gy(l),f=r[u];if(f)o.push(f.promise);else{let h;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?h=s(l):h=Pf(new Vt,l,t),r[u]={primitive:l,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,r=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?By(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=o[d];let p;const v=l[d];if(m.mode===_n.TRIANGLES||m.mode===_n.TRIANGLE_STRIP||m.mode===_n.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new mS(_,v):new ce(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===_n.TRIANGLE_STRIP?p.geometry=wf(p.geometry,Kh):m.mode===_n.TRIANGLE_FAN&&(p.geometry=wf(p.geometry,kc));else if(m.mode===_n.LINES)p=new xS(_,v);else if(m.mode===_n.LINE_STRIP)p=new ea(_,v);else if(m.mode===_n.LINE_LOOP)p=new MS(_,v);else if(m.mode===_n.POINTS)p=new SS(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Vy(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),ii(p,s),m.extensions&&ki(r,p,m),t.assignFinalMaterial(p),f.push(p)}for(let d=0,g=f.length;d<g;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return s.extensions&&ki(r,f[0],s),f[0];const h=new mt;s.extensions&&ki(r,h,s),t.associations.set(h,{meshes:e});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Kt(Gc.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Ml(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ii(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let r=0,s=t.joints.length;r<s;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){const s=r.pop(),o=r,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const f=o[l];if(f){a.push(f);const h=new Xe;s!==null&&h.fromArray(s.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Al(a,c)})}loadAnimation(e){const t=this.json,n=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let f=0,h=r.channels.length;f<h;f++){const d=r.channels[f],g=r.samplers[d.sampler],_=d.target,m=_.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],m=f[4],p=[];for(let v=0,S=h.length;v<S;v++){const x=h[v],M=d[v],y=g[v],E=_[v],R=m[v];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=n._createAnimationTracks(x,M,y,E,R);if(b)for(let A=0;A<b.length;A++)p.push(b[A])}return new qc(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,r.mesh,s);return r.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),o})}loadNode(e){const t=this.json,n=this,r=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const u=l[0],f=l[1],h=l[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,Wy)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?r.createUniqueName(s.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(s.isBone===!0?u=new _d:l.length>1?u=new mt:l.length===1?u=l[0]:u=new xt,u!==l[0])for(let f=0,h=l.length;f<h;f++)u.add(l[f]);if(s.name&&(u.userData.name=s.name,u.name=o),ii(u,s),s.extensions&&ki(n,u,s),s.matrix!==void 0){const f=new Xe;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],r=this,s=new mt;n.name&&(s.name=r.createUniqueName(n.name)),ii(s,n),n.extensions&&ki(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(r.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,f=c.length;u<f;u++)s.add(c[u]);const l=u=>{const f=new Map;for(const[h,d]of r.associations)(h instanceof On||h instanceof Dt)&&f.set(h,d);return u.traverse(h=>{const d=r.associations.get(h);d!=null&&f.set(h,d)}),f};return r.associations=l(s),s})}_createAnimationTracks(e,t,n,r,s){const o=[],a=e.name?e.name:e.uuid,c=[];yi[s.path]===yi.weights?e.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(yi[s.path]){case yi.weights:l=Gr;break;case yi.rotation:l=Hr;break;case yi.position:case yi.scale:l=Wr;break;default:switch(n.itemSize){case 1:l=Gr;break;case 2:case 3:default:l=Wr;break}break}const u=r.interpolation!==void 0?Fy[r.interpolation]:Rs,f=this._getArrayFromAccessor(n);for(let h=0,d=c.length;h<d;h++){const g=new l(c[h]+"."+yi[s.path],t.array,f,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=$c(t.constructor),r=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)r[s]=t[s]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const r=this instanceof Hr?Uy:Nd;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function jy(i,e,t){const n=e.attributes,r=new hi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=$c(Cr[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new P,c=new P;for(let l=0,u=s.length;l<u;l++){const f=s[l];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=$c(Cr[h.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;const o=new Hn;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=o}function Pf(i,e,t){const n=e.attributes,r=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Yc[o]||o.toLowerCase();a in i.attributes||r.push(s(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(o)}return tt.workingColorSpace!==nn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${tt.workingColorSpace}" not supported.`),ii(i,e),jy(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?ky(i,e.targets,t):i})}const qy="./modelli/armi.glb",Yy="./modelli/aliene.glb",$y="Bayonet",Ky=new Ne(10312959),Zy=new Ne(3803760);function Jy(i){return i.map?{metalness:.55,roughness:.4}:/Wood/i.test(i.name)?{metalness:0,roughness:.62}:/Glass/i.test(i.name)?{metalness:.3,roughness:.08}:/Metal|Main|Black|Grey/i.test(i.name)?{metalness:.75,roughness:.38}:{metalness:.1,roughness:.6}}function Qy(i){const e=new st({name:i.name,color:i.color.clone(),map:i.map??null,emissive:i.emissiveMap?new Ne(16777215):new Ne(0),emissiveMap:i.emissiveMap??null,flatShading:!0,...Jy(i)});for(const t of[e.map,e.emissiveMap])t&&(t.anisotropy=4,t.needsUpdate=!0);return e}async function Lf(i,e){const t=await new ia().loadAsync(i),n=new Map;for(const r of[...t.scene.children])r.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>(n.has(a)||n.set(a,Qy(a)),n.get(a)));s.material=Array.isArray(s.material)?o:o[0]}),e.set(r.name,r)}async function eb(){const i=new Map;return await Promise.all([Lf(qy,i),Lf(Yy,i)]),i}function tb(i,e){return{libreria:e,varianti:new Map,guanto:new st({color:2369322,roughness:.85}),nocche:new st({color:3817284,roughness:.7}),manica:new st({map:i.mimetica??null,color:i.mimetica?16777215:4870710,roughness:.95}),polsino:new st({color:1776927,roughness:.9})}}function nb(i,e,t,n){const r=`${e.uuid}|${t}`;return i.varianti.has(r)||i.varianti.set(r,n(e.clone())),i.varianti.get(r)}function ib(i,e,t){const n=e.colore!==void 0?new Ne(e.colore):null,r=`${e.colore??"vera"}|${e.potenziata?"p":""}`;!n&&!e.potenziata||i.traverse(s=>{if(!s.isMesh)return;const o=[].concat(s.material).map(a=>nb(t,a,r,c=>(n&&(c.emissive.copy(n).multiplyScalar(e.potenziata?1.6:1.1),c.color.lerp(n,.18)),e.potenziata&&(c.color.lerp(Ky,n?.25:.45),n||c.emissive.copy(Zy)),c)));s.material=Array.isArray(s.material)?o:o[0]})}function Ir(i,e){const t=i==="coltello"?{modello:$y}:Tt[i]??Tt[Ss(i)],n=e.libreria.get(t.modello),r=n.clone();r.position.set(0,0,0),r.rotation.set(0,0,0),i!=="coltello"&&ib(r,t,e);const s=n.userData,o=new P().fromArray(s.bocca??[0,.03,-.3]),a=s.presa?new P().fromArray(s.presa):null;return{gruppo:r,bocca:o,presa:a,lunghezza:s.lunghezza??.5,colore:t.colore??null}}function ji(i,e,t,n,r){const s=new P(...n),o=new P(...r),a=new ce(new Rl(t,s.distanceTo(o),3,8),e);return a.position.copy(s).add(o).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new P(0,1,0),o.clone().sub(s).normalize()),i.add(a),a}function Dd(i,e,t,n){const r=new P(...t),s=new P(...n),o=s.clone().sub(r),a=new ce(new Gt(.036,.03,o.length(),10),e.manica);a.position.copy(r).add(s).multiplyScalar(.5),a.quaternion.setFromUnitVectors(new P(0,1,0),o.clone().normalize());const c=new ce(new Gt(.031,.031,.04,10),e.polsino);c.position.copy(r).addScaledVector(o.clone().normalize(),.02),c.quaternion.copy(a.quaternion),i.add(a,c)}function rb(i){const e=new mt;ji(e,i.guanto,.026,[.012,-.03,.032],[.008,-.075,.05]);for(let t=0;t<4;t++){const n=-.03-t*.014;ji(e,i.guanto,.0085,[.026,n,.03],[.012,n-.004,-.004]),ji(e,i.nocche,.0082,[.012,n-.004,-.004],[-.014,n-.006,.006])}return ji(e,i.guanto,.0095,[-.012,-.012,.048],[-.014,-.004,.01]),Dd(e,i,[.01,-.085,.07],[.07,-.22,.36]),e}function sb(i){const e=new mt;ji(e,i.guanto,.025,[-.012,-.03,.03],[-.006,-.03,-.02]);for(let t=0;t<4;t++){const n=.012-t*.015;ji(e,i.guanto,.0085,[.006,-.032,n],[.024,-.008,n-.004])}return ji(e,i.guanto,.009,[-.024,-.02,.02],[-.026,.004,-.012]),Dd(e,i,[-.02,-.05,.04],[-.1,-.26,.22]),e}const Un=Vn,zf=.9,Of=2.3,us=2.4,ob=Object.freeze([[0,0,!0,16765594],[0,14,!0,16765594],[12,0,!1,16765594],[20,0,!0,16765594],[-9,17,!1,16769968],[3,27,!1,14217471],[22,-10.5,!0,16738880],[0,-30,!1,16769720],[-19,-31,!0,16767136],[0,-46,!0,16724774]]),Nf=16,ab=17,cb=Object.freeze([[17,20,12375295],[10.5,27.5,13163775],[23,-26,12375295]]),lb=Object.freeze([[0,.02],[.05,.03],[.07,.08],[.085,.16],[.13,.22],[.14,.24],[0,.24]]),ub=Object.freeze({banco:"legnoChiaro",tavolo:"legnoChiaro",bancone:"metallo",cavallina:"legno"});function Kc(i,e,t,n,r=0){const s=new Ot(i,e,t),o=s.attributes.uv,a=[[t,e],[t,e],[i,t],[i,t],[i,e],[i,e]],c=new Set([0,1,4,5]);for(let l=0;l<6;l++){const u=c.has(l)?r/n:0;for(let f=0;f<4;f++){const h=l*4+f;o.setXY(h,o.getX(h)*a[l][0]/n,o.getY(h)*a[l][1]/n+u)}}return s}function mn(i,e,t,n,r,s=Un){const o=new ce(Kc(t.x1-t.x0,r-n,t.z1-t.z0,s,n),e);return o.position.set((t.x0+t.x1)/2,(n+r)/2,(t.z0+t.z1)/2),i.add(o),o}function Ya(i,e,t,n,r,s,o,a,c=!1){const l=new Yt(r-t,s-n).rotateX(c?Math.PI/2:-Math.PI/2),u=l.attributes.uv;for(let h=0;h<u.count;h++)u.setXY(h,u.getX(h)*(r-t)/a,u.getY(h)*(s-n)/a);const f=new ce(l,e);return f.position.set((t+r)/2,o,(n+s)/2),i.add(f),f}function Vi(i,e){i.rotation.y=Math.atan2(e.x,e.z)}function fb(i,e,t,n,r){const s=(O,se={})=>new st({...r[O],metalness:0,...se}),o={muro:s("muro"),soffitto:s("soffitto"),piastrelle:s("piastrelle"),parquet:s("parquet"),legno:s("legno"),legnoChiaro:s("legnoChiaro"),porta:s("porta"),armadietti:new st({map:e.armadietti,metalness:.4,roughness:.6}),terra:s("terra"),linoleum:s("linoleum"),cemento:s("cemento"),asfalto:s("asfalto"),rete:new st({map:e.rete,transparent:!0,alphaTest:.4,side:cn,metalness:.6,roughness:.5}),palo:new st({color:5922918,metalness:.7,roughness:.45}),corteccia:new st({map:e.corteccia,roughness:1}),metallo:s("metallo",{metalness:.55}),libri:new st({map:e.libri,roughness:.85}),ottone:new st({color:11569722,metalness:.85,roughness:.35,side:cn})},a=zd(77);Ya(i,o.terra,-60,-60,80,80,-.02,4);for(const O of Ps)Ya(i,o[O.pavimento],O.x0,O.z0,O.x1,O.z1,0,O.aperto?4:2),O.aperto||Ya(i,o.soffitto,O.x0,O.z0,O.x1,O.z1,Un,2,!0);for(const O of Qc)mn(i,o.muro,O,0,Un);for(const O of lh){mn(i,o.rete,O,0,ks,1);const se=Math.max(O.x1-O.x0,O.z1-O.z0);for(let z=0;z<=se;z+=3){const we=new ce(new Gt(.05,.05,ks+.2,5),o.palo);we.position.set(O.x1-O.x0>O.z1-O.z0?O.x0+z:(O.x0+O.x1)/2,(ks+.2)/2,O.x1-O.x0>O.z1-O.z0?(O.z0+O.z1)/2:O.z0+z),i.add(we)}}const c=new ce(new ta(6,16),new At({color:14674165,fog:!1}));c.position.set(-60,70,120),c.lookAt(0,0,0),i.add(c);const l=new Map;for(const O of Nn){const se=O.recinzione?.15:zf,z=O.recinzione?ks-.2:Of;O.recinzione||(mn(i,o.muro,O.scatola,0,zf),mn(i,o.muro,O.scatola,Of,Un));const we=O.asse==="z"?O.scatola.x1-O.scatola.x0:O.scatola.z1-O.scatola.z0,ue=[];for(let be=0;be<$.ASSE_PER_FINESTRA;be++){const de=new ce(Kc(we+.35,.17,.05,1),o.legno),Fe=se+.15+be*(z-se-.3)/($.ASSE_PER_FINESTRA-1);de.position.set(O.centro.x+O.fuori.x*.2,Fe,O.centro.z+O.fuori.z*.2),de.rotation.y=O.asse==="z"?0:Math.PI/2,de.rotation.z=(a()-.5)*.5,i.add(de),ue.push(de)}l.set(O.id,ue)}const u=new Map;for(const O of Ji){mn(i,o.muro,O.scatola,us,Un);const se=mn(i,O.chiusa?o.rete:o.porta,O.chiusa?{...O.scatola,z0:O.scatola.z0+.1,z1:O.scatola.z1-.1}:O.scatola,0,us,O.chiusa?1:us);u.set(O.id,{anta:se,apertura:0})}const f={spia:null,corpo:null};for(const O of el)if(O.tipo==="tribuna")for(let se=0;se<3;se++){const z=(O.z1-O.z0)/3;mn(i,o.legnoChiaro,{x0:O.x0,x1:O.x1,z0:O.z1-z*(se+1),z1:O.z1-z*se},0,O.altezza*((3-se)/3),1)}else if(O.tipo==="albero"){const se=(O.x0+O.x1)/2,z=(O.z0+O.z1)/2,we=new ce(new Gt(.12,.3,4.2,9),o.corteccia);we.position.set(se,2.1,z),i.add(we);for(const[ue,be,de]of[[.4,2.6,1.6],[2.5,3.1,1.3],[4.3,3.5,1.1],[1.6,3.8,.9]]){const Fe=new ce(new Gt(.03,.08,de,6),o.corteccia);Fe.position.set(se+Math.cos(ue)*de*.4,be+de*.3,z+Math.sin(ue)*de*.4),Fe.rotation.set(Math.sin(ue)*.9,0,-Math.cos(ue)*.9),i.add(Fe)}}else if(O.tipo==="pulmino"){const se=n.get("covered_car").clone();se.position.set((O.x0+O.x1)/2,0,(O.z0+O.z1)/2),se.rotation.y=Math.PI/2,se.scale.setScalar(1.2),i.add(se)}else{if(O.tipo==="banco")continue;if(O.tipo==="scaffale"){const se=new ce(Kc(O.x1-O.x0,O.altezza,O.z1-O.z0,O.altezza),[o.legno,o.legno,o.legno,o.legno,o.libri,o.libri]);se.position.set((O.x0+O.x1)/2,O.altezza/2,(O.z0+O.z1)/2),i.add(se)}else if(O.tipo==="fila"){const se=n.get("painted_wooden_chair_01"),z=(O.z0+O.z1)/2;for(let we=O.x0+.5;we<O.x1&&se;we+=1){const ue=se.clone(),be=a()<.08;ue.position.set(we+(a()-.5)*.15,be?.42:0,z+(a()-.5)*.2),ue.rotation.set(be?Math.PI/2:0,Math.PI+(a()-.5)*.4,0),i.add(ue)}}else if(O.tipo==="pilastro")mn(i,o.cemento,O,0,Un,2);else if(O.tipo==="generatore"){const se=new mt,z=O.x1-O.x0,we=O.z1-O.z0,ue=new ce(new Ot(z,.95,we),new st({color:3885619,metalness:.55,roughness:.55}));ue.position.y=.55;const be=new ce(new Ot(z+.08,.1,we+.08),o.metallo);be.position.y=.05;const de=new ce(new Gt(.22,.22,z*.8,12).rotateZ(Math.PI/2),new st({color:9054750,metalness:.5,roughness:.5}));de.position.y=1.2;const Fe=new ce(new Gt(.05,.05,.6,8),o.metallo);Fe.position.set(z*.38,1.35,-we*.3);const re=new ce(new Yt(.9,.22),new At({map:ni(["GENERATORE"],{larghezza:128,altezza:32,sfondo:"#1d2418",colore:"#d8d2b0",font:"bold 16px monospace"})}));re.position.set(0,.75,we/2+.005);const C=new ce(new Ei(.05,10,8),new st({color:2228224,emissive:12067867,emissiveIntensity:1.5}));C.position.set(-z*.35,.85,we/2+.02),se.add(ue,be,de,Fe,re,C),se.position.set((O.x0+O.x1)/2,0,(O.z0+O.z1)/2),i.add(se),f.spia=C,f.corpo=se}else if(O.tipo==="lampione")mn(i,o.palo,O,0,O.altezza+1.5,1);else if(O.tipo==="panchina")mn(i,o.legno,O,.3,O.altezza,1);else if(O.tipo==="caldaia"){const se=Math.min(O.x1-O.x0,O.z1-O.z0)/2,z=new ce(new Gt(se,se,O.altezza,10),o.metallo);z.position.set((O.x0+O.x1)/2,O.altezza/2,(O.z0+O.z1)/2);const we=new ce(new Gt(.15,.15,Un-O.altezza,6),o.metallo);we.position.set(z.position.x,O.altezza+(Un-O.altezza)/2,z.position.z);const ue=new ce(new Yt(.5,.3),new At({color:16734746}));ue.position.set(z.position.x+se+.01,.6,z.position.z),ue.rotation.y=Math.PI/2,i.add(z,we,ue)}else mn(i,o[ub[O.tipo]??"legno"],O,0,O.altezza,1)}for(const[O,se,z,we]of[[-1.85,-1.7,6.6,9.3],[-1.85,-1.7,10.8,16.4],[1.7,1.85,6.6,12.4],[1.7,1.85,15.6,21.4],[1.7,1.85,-21.4,-13],[1.7,1.85,-11,-6.6]])mn(i,o.armadietti,{x0:O,x1:se,z0:z,z1:we},0,1.9,1.9);const h=new ce(new Yt(2.4,1.2),new st({map:e.lavagna,roughness:.9}));h.position.set(4,1.6,5.83),h.rotation.y=Math.PI,i.add(h);for(const O of wn){const{x:se,z}=O.posizione;if(O.tipo==="arma"){const we=new mt;we.position.set(se,0,z),Vi(we,O.verso);const{gruppo:ue,lunghezza:be}=Ir(O.arma,t);ue.rotation.y=Math.PI/2,ue.position.set(-be*.12,1.55,.08);const de=new ce(new Yt(Math.max(.7,be+.25),.62),o.legno);de.position.set(0,1.5,.012);const Fe=new ce(new Yt(1,.22),new At({map:ni([Tt[O.arma].nome.toUpperCase(),`${O.costo}`],{larghezza:160,altezza:36,colore:"#ecebe2",font:"bold 12px monospace"}),transparent:!0}));Fe.position.set(0,1.08,.015),we.add(de,ue,Fe),i.add(we)}else if(O.tipo==="bevanda"){const we=Zi[O.bevanda],ue=new mt,be=new ce(new Ot(.95,2,.65),new st({color:new Ne(we.colore).multiplyScalar(.55),metalness:.5,roughness:.35}));be.position.y=1;const de=new ce(new Yt(.8,1.2),new At({map:ni([we.nome.split(" ")[0].toUpperCase(),we.nome.split(" ")[1].toUpperCase(),`${we.costo}`],{larghezza:64,altezza:96,sfondo:`#${we.colore.toString(16).padStart(6,"0")}`,font:"bold 12px monospace",bordo:"#111"})}));de.position.set(0,1.2,.33),ue.add(be,de),ue.position.set(se,0,z),Vi(ue,O.verso),i.add(ue)}}const d=(O,se,z,we,ue,be,de,Fe)=>{const re=new ce(new Yt(be,de),new At({map:ni(O,Fe),transparent:!0}));return re.position.set(se,z,we),Vi(re,ue),i.add(re),re};d(["RIFUGIO ANTIAEREO"],0,2.78,-37.83,{x:0,z:1},2.4,.4,{larghezza:384,altezza:64,sfondo:"#202020",colore:"#e7d9a8",font:"bold 34px sans-serif",bordo:"#7a6a3a"}),d(["NON SUONARE","PER NESSUN MOTIVO"],0,1.35,-53.83,{x:0,z:1},1.4,.5,{larghezza:256,altezza:92,sfondo:"#d9d2bd",colore:"#7a0d0d",font:"bold 26px sans-serif",bordo:"#3a0505"}),d(["BIBLIOTECA"],-12.16,2.7,-30,{x:1,z:0},1.6,.32,{larghezza:256,altezza:52,sfondo:"#2a2016",colore:"#e9dfc4",font:"bold 30px serif"}),d(["AULA MAGNA"],0,2.7,-21.84,{x:0,z:1},1.6,.32,{larghezza:256,altezza:52,sfondo:"#2a2016",colore:"#e9dfc4",font:"bold 30px serif"});const g=wn.find(O=>O.tipo==="quadro"),_=new mt,m=new ce(new Ot(.85,.65,.14),o.metallo),p=new ce(new Yt(.75,.13),new At({map:ni(["CANCELLO RIFUGIO"],{larghezza:192,altezza:32,sfondo:"#111",colore:"#e6e0c8",font:"bold 16px monospace"})}));p.position.set(0,.23,.072);const v=new ce(new Ei(.03,8,6),new At({color:12067867}));v.position.set(.33,.23,.08),_.add(m,p,v);const S=[-.24,0,.24].map(O=>{const se=new ce(new Ot(.12,.26,.04),new st({color:1381135,roughness:.9}));se.position.set(O,-.07,.075);const z=new ce(new Gt(.028,.028,.2,10),new st({color:3807744,emissive:16747050,emissiveIntensity:1.6,roughness:.2}));return z.position.set(O,-.07,.1),z.visible=!1,_.add(se,z),z});_.position.set(g.posizione.x,1.45,g.posizione.z),Vi(_,g.verso),i.add(_);const x=wn.find(O=>O.tipo==="allarme"),M=new mt,y=new ce(new Ns(lb.map(([O,se])=>new he(O*4.2,-se*4.2)),20),o.ottone),E=new ce(new Ei(.09,10,8),o.ottone);E.position.y=-.9,M.add(y,E);const R=new ce(new Ot(.12,.12,.75),o.metallo);R.position.set(x.posizione.x,2.85,x.posizione.z+x.verso.z*.3),M.position.set(x.posizione.x,2.8,x.posizione.z+x.verso.z*.62),i.add(M,R);let b=0;const A=wn.find(O=>O.tipo==="interruttore"),I=new mt,k=new ce(new Ot(.6,.8,.15),o.metallo),L=new ce(new Gt(.03,.03,.35,8),new st({color:12067867,roughness:.4}));L.position.set(0,.12,.12);const D=new ce(new Ei(.05,8,6),new At({color:12067867}));D.position.set(.2,.3,.09),I.add(k,L,D),I.position.set(A.posizione.x,1.4,A.posizione.z),Vi(I,A.verso),i.add(I);const q=wn.find(O=>O.tipo==="potenziatore"),X=new mt,ie=new ce(new Ot(1.6,1.9,1.15),s("metallo",{color:9406120,metalness:.65}));ie.position.y=.95;const j=new ce(new Yt(1.2,.45),new At({map:ni(["POTENZIATORE",`${$.COSTO_POTENZIA}`],{larghezza:128,altezza:48,sfondo:"#1a0b2e",colore:"#d6b8ff",font:"bold 12px monospace",bordo:"#7d3cff"})}));j.position.set(0,1.55,.58);const Z=new ce(new Pl(.35,.04,6,18),new At({color:3809376}));Z.position.set(0,.9,.6);const ne=new ai(10771711,0,5,1.5);ne.position.set(0,1.4,1),X.add(ie,j,Z,ne),X.position.set(q.posizione.x,0,q.posizione.z),Vi(X,q.verso),i.add(X);const me=new Map;let Re=null;const fe=wn.find(O=>O.tipo==="cassa"),W=new mt,ee=n.get("old_military_crate").clone();ee.scale.setScalar(.62);const ye=new mt;ye.position.set(0,.56,-.3);const le=new ce(new Yt(.3,.3),new At({map:ni(["?"],{larghezza:32,altezza:32,colore:"#7dd3fc",font:"bold 28px monospace"}),transparent:!0}));le.position.set(0,.6,.05);const Le=new ai(8246268,0,4,1.5);Le.position.set(0,1,.3),W.add(ee,ye,le,Le),W.position.set(fe.posizione.x,0,fe.posizione.z),Vi(W,fe.verso),i.add(W);const De=new Map;let je=null;const ft=ob.map(([O,se,z,we])=>{const ue=new ai(we,Nf,ab,1.5);ue.position.set(O,Un-.4,se);const be=new ce(new Ot(1.2,.06,.3),new At({color:16773583}));return be.position.set(O,Un-.04,se),i.add(ue,be),{luce:ue,plafoniera:be,tremola:z,base:Nf}});for(const[O,se,z]of cb){const we=new ai(z,24,22,1.3);we.position.set(O,4.3,se);const ue=new ce(new Ot(.5,.15,.5),new At({color:15266047}));ue.position.set(O,4.55,se),i.add(we,ue)}return{aggiorna(O,se,z){for(const re of Nn)l.get(re.id).forEach((C,T)=>{C.visible=T<O.finestre[re.id]});for(const re of Ji){const C=u.get(re.id);O.porte.has(re.id)?C.apertura=Math.min(1,C.apertura+se*1.5):C.apertura=Math.max(0,C.apertura-se*2.5),C.anta.position.y=us/2+C.apertura*us,C.anta.visible=C.apertura<1}for(const re of ft){const C=re.tremola&&Math.sin(z*13.7+re.luce.position.x)>.93;re.luce.intensity=C?.6:re.base,re.plafoniera.material.color.setHex(C?2762272:16773583)}const we=O.missione;if(we){S.forEach((C,T)=>{C.visible=T<we.messi}),v.material.color.setHex(O.corrente?we.messi>=3?3997546:16756768:12067867);const re=we.generatore==="acceso";f.spia&&(f.spia.material.emissive.setHex(re?Math.sin(z*10)>0?16760864:3811840:we.generatore==="finito"?3997546:12067867),f.corpo.position.y=re?Math.sin(z*60)*.006:0)}O.fase==="finale"?b=Math.min(1,b+se):b=Math.max(0,b-se*.3),M.rotation.x=Math.sin(z*5)*.45*b,L.rotation.x=Gc.lerp(L.rotation.x,O.corrente?-2.4:0,Math.min(1,se*5)),D.material.color.setHex(O.corrente?3997546:12067867);const ue=O.potenziatore.stato==="lavora";Z.material.color.setHex(O.corrente?ue?14725375:10771711:3809376),Z.rotation.z+=se*(ue?9:O.corrente?1:0),ne.intensity=O.corrente?ue?6+Math.sin(z*20)*3:2.5:0;const be=O.potenziatore.stato==="pronta"?O.potenziatore.arma:null;if(Re!==be){if(me.forEach(re=>{re.visible=!1}),be){if(!me.has(be)){const{gruppo:re}=Ir(be,t);re.scale.setScalar(1.2),X.add(re),me.set(be,re)}me.get(be).visible=!0}Re=be}if(be){const re=me.get(be);re.position.set(0,2.25+Math.sin(z*2)*.05,.2),re.rotation.y=z*1.8}const de=O.cassa.stato==="aperta";ye.rotation.x=Gc.lerp(ye.rotation.x,de?-1.3:0,Math.min(1,se*6)),Le.intensity=de?3+Math.sin(z*6):.6;const Fe=de?O.cassa.arma:null;if(je!==Fe){if(De.forEach(re=>{re.visible=!1}),Fe){if(!De.has(Fe)){const{gruppo:re}=Ir(Fe,t);re.scale.setScalar(1.15),W.add(re),De.set(Fe,re)}De.get(Fe).visible=!0}je=Fe}if(Fe){const re=De.get(Fe);re.position.set(0,1.15+Math.sin(z*2)*.05,0),re.rotation.y=z*1.5}}}}const hb=.25,Df=2.6,db=1,pb=5,mb=.42,gb=.35,_b=.09,zo=Object.freeze([{tinta:16777215,scala:1},{tinta:13095359,scala:.95},{tinta:14733263,scala:1.06},{tinta:10721940,scala:1.02}]),Tr=Object.freeze({normale:{url:"./modelli/zombie.glb",scala:.01,varianti:!0,clip:{cammina:"cammina",cammina2:"cammina2",corre:"corre",attacco:"attacco",attacco2:"attacco2",muore:"muore",fermo:"fermo"},velocita:{cammina:1,cammina2:.9,corre:1.05,attacco:1.6,attacco2:1.7,muore:1.2,fermo:1}},magro:{url:"./modelli/zombi_magro.glb",scala:.25,clip:{cammina:"walk",cammina2:"walk2",corre:"run",attacco:"attack2",attacco2:"attack1_r",muore:"dead1",fermo:"idle"},velocita:{},riserva:{tinta:10252902,scala:.94}},preside:{url:"./modelli/zombie.glb",scala:.0135,tinta:9407110,alto:1.95,raggio:.5,raggioTesta:.23,reazione:.45,clip:{cammina:"cammina",corre:"corre",attacco:"attacco",attacco2:"attacco2",muore:"muore",fermo:"fermo"},velocita:{cammina:.8,corre:.85,attacco:1.2,attacco2:1.15,muore:.9,fermo:.8}},custode:{url:"./modelli/zombie.glb",scala:.0158,tinta:7297618,alto:2.3,raggio:.62,raggioTesta:.27,reazione:.25,clip:{cammina:"cammina2",corre:"corre",attacco:"attacco",attacco2:"attacco2",muore:"muore",fermo:"fermo"},velocita:{cammina:.75,corre:.8,attacco:1,attacco2:.95,muore:.7,fermo:.7}}});function vb(i){i.traverse(e=>{if(e.isMesh){e.frustumCulled=!1;for(const t of[].concat(e.material))t.map&&(t.map.anisotropy=4,t.map.needsUpdate=!0)}})}function xb(i,e){return e.map(t=>{const n=new Map;return i.traverse(r=>{if(r.isMesh)for(const s of[].concat(r.material)){if(n.has(s))continue;const o=s.clone();o.color=new Ne(t),n.set(s,o)}}),n})}async function Mb(){const i=new Map,e=n=>(i.has(n)||i.set(n,new ia().loadAsync(n)),i.get(n)),t=new Map;return await Promise.all(Object.entries(Tr).map(async([n,r])=>{let s=r,o;try{o=await e(r.url)}catch(c){if(!r.riserva)throw c;o=await e(Tr.normale.url),s={...Tr.normale,varianti:!1,tinta:r.riserva.tinta,scala:Tr.normale.scala*r.riserva.scala}}vb(o.scene);const a=s.varianti?zo.map(c=>c.tinta):[s.tinta??null];t.set(n,{dati:s,modello:o.scene,clip:new Map(o.animations.map(c=>[c.name,c])),materialiVariante:a[0]===null?null:xb(o.scene,a)})})),t}function Sb(i,e){return i.stato==="morto"?"muore":i.stato==="assi"?"attacco":i.stato==="attacco"?"attacco2":i.stato==="dentro"&&!e?"fermo":i.corre?"corre":i.variante%2?"cammina2":"cammina"}function yb(i,e){const t=new Map;function n(c){const l=e.get(c.tipo)??e.get("normale"),{dati:u}=l,f=new mt,h=qo(l.modello),d=u.varianti?zo[c.variante%zo.length]:{scala:1};if(h.scale.setScalar(u.scala*d.scala),l.materialiVariante){const S=l.materialiVariante[u.varianti?c.variante%zo.length:0];h.traverse(x=>{x.isMesh&&(x.material=Array.isArray(x.material)?x.material.map(M=>S.get(M)??M):S.get(x.material)??x.material)})}h.traverse(S=>{S.isSkinnedMesh&&(S.frustumCulled=!0,S.computeBoundingSphere(),S.boundingSphere.radius*=1.8)}),f.add(h),i.add(f);let g=null,_=null;h.traverse(S=>{S.isBone&&(!g&&/head$/i.test(S.name)&&(g=S),/spine2?$/i.test(S.name)&&(_=S))});const m=new Pd(h),p=new Map;for(const[S,x]of Object.entries(u.clip)){const M=l.clip.get(x);if(!M)continue;const y=m.clipAction(M);y.timeScale=u.velocita[S]??1,S==="muore"&&(y.setLoop($h,1),y.clampWhenFinished=!0),p.set(S,y)}const v={radice:f,corpo:h,testa:g,busto:_,mixer:m,azioni:p,dati:u,attuale:null,ultimaPosizione:new he(c.x,c.z),tempoMorto:0,fase:Math.random()*3,vitaPrima:c.vita,sussulto:0,senzaTesta:!1};return t.set(c.id,v),v}function r(c,l){const u=c.azioni.has(l)?l:l==="cammina2"?"cammina":l==="attacco2"?"attacco":l;if(c.attuale===u)return;const f=c.azioni.get(u);if(!f)return;const h=c.azioni.get(c.attuale);f.reset(),u!=="muore"&&(f.time=c.fase),f.play(),h&&h.crossFadeTo(f,hb,!1),c.attuale=u}function s(c,l){c.sussulto=Math.min(db,c.sussulto+l*(c.dati.reazione??1))}function o(c,l){var u,f;c.sussulto=Math.max(0,c.sussulto-l*pb),c.sussulto>0?((u=c.busto)==null||u.rotateX(-c.sussulto*mb),c.senzaTesta||(f=c.testa)==null||f.rotateX(-c.sussulto*gb),c.corpo.position.z=-c.sussulto*_b):c.corpo.position.z=0,c.senzaTesta&&c.testa&&c.testa.scale.setScalar(.001)}function a(c){const l=t.get(c);l&&(i.remove(l.radice),l.mixer.stopAllAction(),l.mixer.uncacheRoot(l.corpo),l.corpo.traverse(u=>{var f;return(f=u.skeleton)==null?void 0:f.dispose()}),t.delete(c))}return{aggiorna(c,l){const u=new Set;for(const f of c.zombie){u.add(f.id);const h=t.get(f.id)??n(f),d=Math.hypot(f.x-h.ultimaPosizione.x,f.z-h.ultimaPosizione.y);h.ultimaPosizione.set(f.x,f.z),r(h,Sb(f,d>.2*l)),h.radice.position.set(f.x,0,f.z),h.radice.rotation.y=f.yaw,f.stato==="morto"?(h.tempoMorto+=l,h.tempoMorto>Df&&(h.radice.position.y=-(h.tempoMorto-Df)*.6)):h.tempoMorto=0,f.vita<h.vitaPrima&&f.stato!=="morto"&&s(h,.45+(h.vitaPrima-f.vita)/40),h.vitaPrima=f.vita,h.mixer.update(l),o(h,l)}for(const f of[...t.keys()])u.has(f)||a(f)},bersagli(c){const l=new P;return c.zombie.filter(u=>u.stato!=="morto").map(u=>{const f=t.get(u.id),h=Tr[u.tipo]??Tr.normale,d={id:u.id,x:u.x,z:u.z,alto:h.alto,raggio:h.raggio,raggioTesta:h.raggioTesta};return f!=null&&f.testa?(f.testa.getWorldPosition(l),{...d,testa:{x:l.x,y:l.y+.06,z:l.z}}):{...d,testa:{x:u.x,y:h.testa??ec.altezza,z:u.z}}})},colpito(c,l){const u=t.get(c);u&&s(u,l?.9:.6)},decapita(c){const l=t.get(c);return!(l!=null&&l.testa)||l.dati.alto?null:(l.senzaTesta=!0,l.testa.getWorldPosition(new P))},posizioneTesta(c){const l=t.get(c);return l!=null&&l.testa?l.testa.getWorldPosition(new P):null},svuota(){for(const c of[...t.keys()])a(c)}}}const bb=Object.freeze(["./modelli/soldato.glb"]),Ab=.2;function Uf(i,e){const t=new zs(new jr({map:ni([i],{larghezza:128,altezza:32,colore:e,font:"bold 16px monospace"}),depthTest:!1,transparent:!0}));return t.scale.set(1.4,.35,1),t.renderOrder=20,t}async function Eb(){return Promise.all(bb.map(async i=>{const e=await new ia().loadAsync(i);return e.scene.traverse(t=>{t.isMesh&&(t.frustumCulled=!1)}),{modello:e.scene,clip:new Map(e.animations.map(t=>[t.name,t]))}}))}function Tb(i,e,t,n){const r=new mt,s=new mt,o=qo(n.modello);o.rotation.y=Math.PI;let a=null;o.traverse(v=>{!a&&v.isBone&&/RightHand$/.test(v.name)&&(a=v)}),s.add(o),r.add(s);const c=new mt;r.add(c);const l=new Pd(o),u=new Map;for(const[v,S]of Object.entries({fermo:"Idle",cammina:"Walk",corre:"Run"})){const x=n.clip.get(S);x&&u.set(v,l.clipAction(x))}let f=null;const h=new Map;let d=null;const g=Uf(e,"#e8f4ff");g.position.y=2.3;const _=Uf(`▼ ${e} A TERRA`,"#ff5a4e");_.position.y=1.2,_.visible=!1,r.add(g,_),i.add(r);const m=new P;function p(v){var x;if(f===v||!u.has(v))return;const S=u.get(v);S.reset().play(),(x=u.get(f))==null||x.crossFadeTo(S,Ab,!1),f=v}return{aggiorna(v,S){r.visible=v.stato!=="morto",r.position.set(v.x,0,v.z),r.rotation.y=v.yaw;const x=v.stato==="terra";if(p(x?"fermo":v.inMovimento?v.corsa?"corre":"cammina":"fermo"),l.update(S),s.rotation.x=x?-Math.PI/2:0,s.position.y=x?.25:0,g.visible=!x,_.visible=x,c.visible=!x,d!==v.armaAttiva){if(h.forEach(M=>{M.visible=!1}),!h.has(v.armaAttiva)){const{gruppo:M}=Ir(v.armaAttiva,t);M.rotation.y=Math.PI,c.add(M),h.set(v.armaAttiva,M)}h.get(v.armaAttiva).visible=!0,d=v.armaAttiva}a?(r.updateMatrixWorld(!0),a.getWorldPosition(m),r.worldToLocal(m),c.position.copy(m)):c.position.set(.15,1.3,.35),c.rotation.x=-v.pitch},chiudi(){i.remove(r),l.stopAllAction(),l.uncacheRoot(o),o.traverse(v=>{var S;return(S=v.skeleton)==null?void 0:S.dispose()}),g.material.map.dispose(),g.material.dispose(),_.material.map.dispose(),_.material.dispose()}}}const wb="./modelli/arredi.glb";async function Rb(){const i=await new ia().loadAsync(wb),e=new Map;for(const t of[...i.scene.children])t.traverse(n=>{n.isMesh&&(n.castShadow=!1,n.receiveShadow=!1)}),e.set(t.name,t);return e}function Cb(i,e){for(const t of hh){const n=e.get(t.modello);if(!n)continue;const r=n.clone();r.position.set(t.x,0,t.z),r.rotation.y=t.rot??0,t.scala&&r.scale.setScalar(t.scala),i.add(r)}}function Ib(i,e,t,n){return new ce(new Yt(e,t),new At({map:ni(i,n),transparent:!0}))}function Pb(i){const e=Ib(["SALA D'ATTESA","","ASPETTATE IL VOSTRO AMICO","","INVIO: SONO PRONTO"],3.6,2.2,{larghezza:512,altezza:320,sfondo:"#101418",colore:"#e9f2f7",font:"bold 30px sans-serif",bordo:"#2fb7a0"});e.position.set(Vs.x,1.75,Vs.z),e.rotation.y=Math.atan2(Vs.verso.x,Vs.verso.z),i.add(e);const t=new ai(16769712,16,18,1.4);t.position.set(-38,Vn-.4,0);const n=new ce(new Ot(1.4,.06,.35),new At({color:16773583}));n.position.set(-38,Vn-.04,0),i.add(t,n)}function Lb(i){const e=Pn[i],t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d"),r=`#${e.colore.toString(16).padStart(6,"0")}`,s=n.createRadialGradient(32,32,4,32,32,31);s.addColorStop(0,r),s.addColorStop(.55,`${r}99`),s.addColorStop(1,`${r}00`),n.fillStyle=s,n.fillRect(0,0,64,64),n.fillStyle="#0b0d10",n.beginPath(),n.arc(32,32,17,0,Math.PI*2),n.fill(),n.strokeStyle="#ffffff",n.lineWidth=2,n.stroke(),n.fillStyle="#ffffff",n.textAlign="center",n.textBaseline="middle",n.font=`bold ${e.simbolo.length>2?11:18}px monospace`,n.fillText(e.simbolo,32,33);const o=new Os(t);return o.magFilter=Ht,o.colorSpace=Pt,o}function zb(i){const e=new Map(Object.keys(Pn).map(r=>[r,new jr({map:Lb(r),transparent:!0,depthWrite:!1})])),t=new Map;let n=0;return{aggiorna(r,s){n+=s;const o=new Set;for(const a of r.bonus??[]){if(o.add(a.id),!t.has(a.id)){const l=new zs(e.get(a.tipo));l.scale.setScalar(.7),i.add(l),t.set(a.id,l)}const c=t.get(a.id);c.position.set(a.x,.9+Math.sin(n*3+a.id)*.12,a.z),c.visible=a.timer>5||Math.sin(n*18)>0}for(const[a,c]of t)o.has(a)||(i.remove(c),t.delete(a))},svuota(){for(const r of t.values())i.remove(r);t.clear()}}}function Ob(){const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,0.9)"),t.addColorStop(.35,"rgba(255,255,255,0.25)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Os(i)}function Nb(i){const e=new st({color:2898730,emissive:3800938,emissiveIntensity:.9,roughness:.4,metalness:.3,flatShading:!0}),t=qi.map(m=>{const p=new ce(new Il(.09,0),e);return p.position.set(m.x,m.y,m.z),p.scale.set(1,.75,1.2),i.add(p),p}),n=wn.find(m=>m.tipo==="campanella"),r=[[0,.02],[.05,.03],[.07,.08],[.085,.16],[.13,.22],[.14,.24],[0,.24]].map(([m,p])=>new he(m,-p)),s=new mt,o=new st({color:11569722,metalness:.85,roughness:.35}),a=new ce(new Ns(r,14),o);a.material.side=cn;const c=new ce(new Gt(.015,.015,.22,6).rotateX(Math.PI/2),new st({color:2829099,metalness:.7,roughness:.5}));c.position.set(0,0,-.1);const l=new ce(new Ei(.025,8,6),o);l.position.y=-.22,s.add(a,c,l),s.position.set(n.posizione.x,2.35,n.posizione.z+n.verso.z*.12),i.add(s);const u=new st({color:3807744,emissive:16747050,emissiveIntensity:1.4,roughness:.15,metalness:.1}),f=new st({color:12170406,metalness:.9,roughness:.3}),h=new jr({map:Ob(),color:16751162,transparent:!0,depthWrite:!1,blending:Or}),d=[0,1,2].map(()=>{const m=new mt;m.add(new ce(new Gt(.028,.028,.13,10),u));for(const v of[-.075,.075]){const S=new ce(new Gt(.033,.033,.03,10),f);S.position.y=v,m.add(S)}const p=new zs(h);return p.scale.setScalar(.45),m.add(p),m.rotation.z=Math.PI/2,m.visible=!1,i.add(m),m});let g=0,_=0;return{suona(){g=1},aggiorna(m,p){var x;_+=p;const v=new Set(m.frammenti??[]);t.forEach((M,y)=>{M.visible=m.fase!=="attesa"&&!v.has(qi[y].id),M.rotation.y+=p*1.5,M.position.y=qi[y].y+Math.sin(_*2+y)*.03}),e.emissiveIntensity=.6+Math.sin(_*4)*.35;const S=new Map((((x=m.missione)==null?void 0:x.aTerra)??[]).map(M=>[M.id,M]));d.forEach((M,y)=>{const E=S.get(y);M.visible=!!E&&m.fase!=="attesa",E&&(M.position.set(E.x,E.y+Math.sin(_*2.2+y)*.03,E.z),M.rotation.y+=p*1.2)}),g=Math.max(0,g-p*.6),s.rotation.x=Math.sin(_*14)*.5*g}}}const Db=220,Ub=50;function Fb(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d"),t=e.createRadialGradient(16,16,0,16,16,16);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.45,"rgba(255,255,255,0.85)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,32,32),new Os(i)}const Bb={sangue:{colore:9047309,vita:.6,gravita:-7,dimensione:.12,sparsa:2.4,additivo:!1},scintilla:{colore:16765562,vita:.25,gravita:-2,dimensione:.07,sparsa:3,additivo:!0},polvere:{colore:9208432,vita:.7,gravita:.4,dimensione:.18,sparsa:.8,additivo:!1},legno:{colore:7031339,vita:.9,gravita:-8,dimensione:.1,sparsa:2.5,additivo:!1},energia:{colore:6285823,vita:.45,gravita:.5,dimensione:.28,sparsa:4,additivo:!0},fuoco:{colore:16747050,vita:.55,gravita:1.2,dimensione:.34,sparsa:3.5,additivo:!0},fiamma:{colore:16742938,vita:.35,gravita:1.5,dimensione:.22,sparsa:.6,additivo:!0}},Ff=Object.freeze({energia:6285823,fuoco:16747050,fulmine:14217471}),Bf=.14,kf=.18,kb=25;function Vb(i){const e=Fb(),t=[],n=[];for(let f=0;f<Db;f++){const h=new zs(new jr({map:e,transparent:!0,depthWrite:!1}));h.visible=!1,i.add(h),t.push({sprite:h,velocita:new P,vita:0,durata:1,tipo:null})}const r=[],s=new ai(6285823,0,9,1.4);i.add(s);let o=0;const a=[],c=new ta(.35,6).rotateX(-Math.PI/2),l=new At({color:4851206,transparent:!0,opacity:.85,depthWrite:!1});function u(f,h,d,g=null,_=null,m=.6){const p=Bb[f];for(let v=0;v<d&&t.length;v++){const S=t.pop();S.tipo=p,S.vita=0,S.durata=p.vita*(.6+Math.random()*.8),S.velocita.set((Math.random()-.5)*p.sparsa,Math.random()*p.sparsa*.6,(Math.random()-.5)*p.sparsa),g&&S.velocita.addScaledVector(g,p.sparsa*m),S.sprite.position.copy(h),S.sprite.material.color.setHex(_??p.colore),S.sprite.material.blending=p.additivo?Or:$i,S.sprite.scale.setScalar(p.dimensione),S.sprite.visible=!0,n.push(S)}}return{sangue(f,h){u("sangue",f,10,h)},impatto(f){u("scintilla",f,5),u("polvere",f,3)},schegge(f){u("legno",f,10)},raggio(f,h,d=8319231){const g=new Vt().setFromPoints([f,h]),_=new ea(g,new El({color:d,transparent:!0,blending:Or}));i.add(_),r.push({linea:_,vita:Bf})},esplosione(f,h="energia",d=null){const g=d??Ff[h]??Ff.energia;u(h==="fuoco"?"fuoco":"energia",f,h==="fuoco"?30:22,null,g),h==="fuoco"&&u("polvere",f,8),s.color.setHex(g),s.position.copy(f),o=kf},fiamma(f,h,d){u("fiamma",f,4,h,d,6)},macchia(f,h){const d=a.length>=Ub?a.shift():new ce(c,l);d.position.set(f+(Math.random()-.5)*.4,.012+a.length*1e-4,h+(Math.random()-.5)*.4),d.scale.setScalar(.6+Math.random()*.8),i.add(d),a.push(d)},aggiorna(f){o=Math.max(0,o-f),s.intensity=kb*(o/kf);for(let h=r.length-1;h>=0;h--){const d=r[h];d.vita-=f,d.linea.material.opacity=Math.max(0,d.vita/Bf),!(d.vita>0)&&(i.remove(d.linea),d.linea.geometry.dispose(),d.linea.material.dispose(),r.splice(h,1))}for(let h=n.length-1;h>=0;h--){const d=n[h];if(d.vita+=f,d.vita>=d.durata||d.sprite.position.y<0){d.sprite.visible=!1,n.splice(h,1),t.push(d);continue}d.velocita.y+=d.tipo.gravita*f,d.sprite.position.addScaledVector(d.velocita,f),d.sprite.material.opacity=1-d.vita/d.durata}},svuota(){for(const f of n.splice(0))f.sprite.visible=!1,t.push(f);for(const f of a.splice(0))i.remove(f)}}}const Vf=new P(.11,-.095,-.29),Gb=new P(0,-.068,-.24),Hb=.05,Wb=new P(-.018,-.05,.04),Xb=16774084;function jb(){const i=document.createElement("canvas");i.width=i.height=32;const e=i.getContext("2d");e.fillStyle="#ffffff";for(let n=0;n<8;n++){const r=n/8*Math.PI*2;e.beginPath(),e.moveTo(16,16),e.lineTo(16+Math.cos(r)*15,16+Math.sin(r)*15),e.lineTo(16+Math.cos(r+.3)*6,16+Math.sin(r+.3)*6),e.fill()}const t=new Os(i);return t.magFilter=Ht,t}function qb(i){const e=new bl,t=new Kt(60,1,.01,10);e.add(new Cd(13227752,3155484,2.6));const n=new zl(16773328,2);n.position.set(1,2,1),e.add(n);const r=new mt;r.add(rb(i));const s=sb(i);r.add(s),e.add(r);const o=new Map,a=new zs(new jr({map:jb(),blending:Or,transparent:!0,depthTest:!1}));a.scale.setScalar(.18),a.visible=!1,r.add(a);const c=Ir("coltello",i);c.gruppo.visible=!1,e.add(c.gruppo);let l=null,u=0,f=0,h=0;const d=Vf.clone();function g(_){if(l===_)return;if(o.forEach(p=>{p.gruppo.visible=!1}),!o.has(_)){const p=Ir(_,i);r.add(p.gruppo),o.set(_,p)}const m=o.get(_);m.gruppo.visible=!0,a.position.copy(m.bocca),a.material.color.setHex(m.colore??Xb),a.scale.setScalar(m.colore?.24:.18),s.visible=!0,s.position.copy(m.presa??Wb),l=_}return{scena:e,camera:t,mostra:g,spara(){u=1,f=Hb,a.material.rotation=Math.random()*Math.PI},get lampoAcceso(){return f>0},get coloreLampo(){return a.material.color.getHex()},aggiorna({dt:_,movimento:m,mira:p,ricarica:v,cambio:S,coltellata:x,corsa:M}){h+=_*(M?14:9)*m,u=Math.max(0,u-_*9),f=Math.max(0,f-_),a.visible=f>0;const y=p?Gb:Vf;d.lerp(y,Math.min(1,_*14));const E=p?.2:1;if(r.position.set(d.x+Math.cos(h)*.012*m*E,d.y+Math.abs(Math.sin(h))*.014*m*E-v*.25-S*.3-(M?.04:0),d.z+u*.05),r.rotation.set(u*.12+v*.8,(M?.5:0)+(p?0:.06),v*.4),c.gruppo.visible=x>0,x>0){const R=1-x;c.gruppo.position.set(.25-R*.45,-.18+Math.sin(R*Math.PI)*.06,-.4),c.gruppo.rotation.set(0,-.6+R*1.4,-.4)}},nascondi(_){r.visible=!_}}}const Yb=.5,Gf=.1,$b=50,Kb=58,Zb=1.5,$a=395275,Hf=72,Jb=52,Qb=20,eA=725794,tA=24,nA=40,iA=.01,Ao=.034,Wf=new P(0,1,0);function rA(i){const e=new Ei(Ao,12,10).scale(1,1.25,1),t=new Gt(.011,.014,.03,8),n=new Ot(.009,.06,.014),r=new st({color:4147756,roughness:.55,metalness:.25}),s=new st({color:10132114,roughness:.35,metalness:.85}),o=new Map;function a(){const c=new mt,l=new ce(e,r),u=new ce(t,s);u.position.y=Ao*1.25+.012;const f=new ce(n,s);return f.position.set(Ao*.9,Ao*.6,0),f.rotation.z=-.25,c.add(l,u,f),i.add(c),c}return{aggiorna(c,l){const u=new Set;for(const f of c??[]){u.add(f.id);const h=o.get(f.id)??a();o.set(f.id,h);const d=h.position.clone();h.position.set(f.x,f.y,f.z);const g=h.position.distanceTo(d);g<1&&(h.rotation.x+=g*9,h.rotation.z+=g*4)}for(const[f,h]of o)u.has(f)||(i.remove(h),o.delete(f))},svuota(){for(const c of o.values())i.remove(c);o.clear()}}}function Xf(i,e,t,n){const r=new mt;n.forEach(o=>r.add(o)),r.position.set(-40,0,0),e.add(r);const s=[];e.traverse(o=>{o.visible||(s.push(o),o.visible=!0)}),i.compile(e,t),s.forEach(o=>{o.visible=!1}),e.remove(r)}const sA=(i,e)=>Ps.some(t=>t.aperto&&i>=t.x0&&i<=t.x1&&e>=t.z0&&e<=t.z1);async function oA(i){const e=new dS({antialias:!0,powerPreference:"high-performance"});e.setPixelRatio(1),e.outputColorSpace=Pt,e.toneMapping=Uh,e.toneMappingExposure=1.2,e.autoClear=!1,i.appendChild(e.domElement);const t=new bl;t.background=new Ne($a),t.fog=new yl($a,3,24),t.add(new Cd(8359587,1774863,.55));const n=new zl(7375032,.6);n.position.set(-20,30,-30),t.add(n);const r=new Kt(Hf,1,.05,120);r.rotation.order="YXZ";const s=new Id(16773328,28,24,.45,.55,1.3);s.position.set(.15,-.1,0);const o=new xt;o.position.set(0,0,-1),s.target=o;const a=new ai(16761466,0,9,1.5);r.add(s,o,a),t.add(r);const c=new Hc(e).fromScene(new ly,.04).texture;t.environment=c,t.environmentIntensity=.12;const l=hy(),[u,f,h,d,g]=await Promise.all([eb(),Mb(),Eb(),Rb(),fy()]),_=tb(l,u),m=fb(t,l,_,d,g);Cb(t,d),Pb(t);const p=zb(t),v=Nb(t),S=yb(t,f),x=Vb(t),M=rA(t),y=qb(_);y.scena.environment=c,y.scena.environmentIntensity=.5,y.mostra("pistola"),Xf(e,t,r,[...[...f.values()].map(Z=>qo(Z.modello)),...h.map(Z=>qo(Z.modello))]),Xf(e,y.scena,y.camera,[]);const E=new Map,R=new Map;let b=0,A=0,I=1,k=0,L=0;function D(){const Z=Math.max(1,Math.floor(i.clientWidth*I)),ne=Math.max(1,Math.floor(i.clientHeight*I));e.setSize(Z,ne,!1),r.aspect=Z/ne,r.updateProjectionMatrix(),y.camera.aspect=Z/ne,y.camera.updateProjectionMatrix()}const q=new ResizeObserver(D);q.observe(i),D();function X(Z,ne,me){const Re=new Set;Z.giocatori.forEach((fe,W)=>{if(fe.id===ne)return;Re.add(fe.id),E.has(fe.id)||E.set(fe.id,Tb(t,fe.nome,_,h[W%h.length]));const ee=R.get(fe.id)??fe;R.set(fe.id,{x:fe.x,z:fe.z}),E.get(fe.id).aggiorna({...fe,inMovimento:Math.hypot(fe.x-ee.x,fe.z-ee.z)>.5*me},me)});for(const[fe,W]of E)Re.has(fe)||(W.chiudi(),E.delete(fe))}function ie(Z){if(k+=1,L+=Z,L<Zb)return;const ne=k/L;k=0,L=0;const me=ne<$b?Math.max(Yb,I-Gf):ne>Kb?Math.min(1,I+Gf/2):I;Math.abs(me-I)<.01||(I=me,D())}function j(Z,{io:ne,mioId:me,dt:Re,arma:fe,movimento:W,corsa:ee,inMira:ye,cannocchiale:le,ricarica:Le,cambio:De,coltellata:je,aTerra:ft,morto:O}){b+=Re,ie(Re),A+=Re*W*(ee?13:9);const se=ft?.45:$.ALTEZZA_OCCHI;r.position.set(ne.x,se+Math.sin(A)*iA*W*(ye?0:1),ne.z),r.rotation.y=ne.yaw+Math.PI,r.rotation.x=ne.pitch,r.rotation.z=ft?.35:0;const z=le?Qb:ye?Jb:Hf;Math.abs(r.fov-z)>.1&&(r.fov+=(z-r.fov)*Math.min(1,Re*14),r.updateProjectionMatrix()),a.intensity=y.lampoAcceso?14:0,y.lampoAcceso&&a.color.setHex(y.coloreLampo);const we=sA(ne.x,ne.z),ue=Math.min(1,Re*2);t.fog.far+=((we?nA:tA)-t.fog.far)*ue,t.fog.color.lerp(new Ne(we?eA:$a),ue),t.background.copy(t.fog.color),m.aggiorna(Z,Re,b),S.aggiorna(Z,Re),M.aggiorna(Z.granate),p.aggiorna(Z,Re),v.aggiorna(Z,Re),X(Z,me,Re),x.aggiorna(Re),y.mostra(fe),y.nascondi(ft||O||le),y.aggiorna({dt:Re,movimento:W,mira:ye,ricarica:Le,cambio:De,coltellata:je,corsa:ee}),e.clear(),e.render(t,r),e.clearDepth(),e.render(y.scena,y.camera)}return{disegna:j,camera:r,spara:()=>y.spara(),bocca(){return new P(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position)},raggio(Z,ne){const me=new P(.12,-.08,-.4).applyQuaternion(r.quaternion).add(r.position);x.raggio(me,new P(Z.x,Z.y,Z.z),ne)},campanella:()=>v.suona(),bersagli:Z=>S.bersagli(Z),colpito:(Z,ne)=>S.colpito(Z,ne),decapita(Z){const ne=S.decapita(Z);ne&&(x.sangue(ne,Wf),x.sangue(ne,Wf))},effetti:x,svuota(){S.svuota(),M.svuota(),x.svuota(),p.svuota();for(const Z of E.values())Z.chiudi();E.clear(),R.clear()},chiudi(){q.disconnect(),e.dispose(),e.domElement.remove()}}}const jf=.0022,qf=1.45,aA=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","Space","KeyR","KeyF","KeyV","KeyQ","Digit1","Digit2","Enter","NumpadEnter","KeyG"]);function cA(i){const e=new Set,t={dyaw:0,dpitch:0,sparo:!1,sparoPremuto:!1,mira:!1,fPremuto:!1,fRilasciato:!1,azioni:[]};let n=!1,r=()=>{};const s=()=>document.pointerLockElement===i,o=()=>{var p,v;const m=(p=i.requestPointerLock)==null?void 0:p.call(i);(v=m==null?void 0:m.catch)==null||v.call(m,()=>r(!1))};function a(m){!n||!aA.has(m.code)||(m.preventDefault(),!m.repeat&&(e.add(m.code),m.code==="KeyR"?t.azioni.push("ricarica"):m.code==="KeyV"?t.azioni.push("coltello"):m.code==="KeyQ"?t.azioni.push("cambia"):m.code==="Digit1"?t.azioni.push({arma:0}):m.code==="Digit2"?t.azioni.push({arma:1}):m.code==="KeyF"?t.fPremuto=!0:m.code==="KeyG"?t.azioni.push("granata"):(m.code==="Enter"||m.code==="NumpadEnter")&&t.azioni.push("pronto")))}function c(m){e.delete(m.code),m.code==="KeyF"&&(t.fRilasciato=!0)}function l(m){!n||!s()||(t.dyaw-=m.movementX*jf,t.dpitch-=m.movementY*jf)}function u(m){if(n){if(!s()){o();return}m.button===0?(t.sparo=!0,t.sparoPremuto=!0):m.button===2&&(t.mira=!0)}}function f(m){m.button===0?t.sparo=!1:m.button===2&&(t.mira=!1)}function h(m){n&&s()&&t.azioni.push("cambia")}function d(){e.clear(),t.sparo=!1,t.mira=!1,e.has("KeyF")&&(t.fRilasciato=!0)}const g=()=>{s()||d(),r(s())};window.addEventListener("keydown",a),window.addEventListener("keyup",c),window.addEventListener("blur",d),document.addEventListener("mousemove",l),i.addEventListener("mousedown",u),window.addEventListener("mouseup",f),i.addEventListener("wheel",h,{passive:!0}),i.addEventListener("contextmenu",m=>m.preventDefault()),document.addEventListener("pointerlockchange",g);const _=(...m)=>m.some(p=>e.has(p));return{attiva(m){n=m,m||(d(),s()&&document.exitPointerLock())},blocca:o,suBlocco(m){r=m},get bloccato(){return s()},applicaVista(m){m.yaw+=t.dyaw,m.pitch=Math.max(-qf,Math.min(qf,m.pitch+t.dpitch)),t.dyaw=0,t.dpitch=0},leggi(){const m={avanti:(_("KeyW","ArrowUp")?1:0)-(_("KeyS","ArrowDown")?1:0),lato:(_("KeyD","ArrowRight")?1:0)-(_("KeyA","ArrowLeft")?1:0),corsa:_("ShiftLeft","ShiftRight"),sparo:t.sparo,sparoPremuto:t.sparoPremuto,mira:t.mira,f:_("KeyF"),fPremuto:t.fPremuto,fRilasciato:t.fRilasciato,azioni:t.azioni.splice(0)};return t.sparoPremuto=!1,t.fPremuto=!1,t.fRilasciato=!1,m}}}const qt=i=>document.getElementById(i),lA=2200,uA=140,fA=240;function hA(i){const e=i.missione;if(!e||i.fase==="attesa"||i.fase==="vinta"||i.round===0)return"";if(i.fase==="finale")return"Uccidete il Custode";if(e.messi>=$.FUSIBILI)return"Scendete nel rifugio e suonate l'ultima campanella";if(!i.porte.has("aula"))return"Trovate il vecchio rifugio sotto la scuola";const t=[`Fusibili del cancello ${e.fusibili+e.messi}/${$.FUSIBILI}`];return e.fusibili>0&&t.push(i.corrente?"portateli al quadro in aula magna":"accendete la corrente e portateli al quadro"),e.generatore==="acceso"&&t.push(`generatore ${Math.round(e.progresso*100)}%`),t.join(" · ")}function dA(){const i={radice:qt("hud"),vignetta:qt("vignetta"),cannocchiale:qt("cannocchiale"),mirino:qt("mirino"),segno:qt("segno"),round:qt("round"),punti:qt("punti"),nomeArma:qt("nome-arma"),munizioni:qt("munizioni"),bibite:qt("bibite"),avviso:qt("avviso"),suggerimento:qt("suggerimento"),barra:qt("barra-rianima"),terra:qt("stato-terra"),rete:qt("rete"),clicca:qt("clicca")},e=document.createElement("div");e.id="sala",e.hidden=!0;const t=document.createElement("div");t.id="effetti";const n=document.createElement("div");n.className="boss",n.hidden=!0;const r=document.createElement("b"),s=document.createElement("div"),o=document.createElement("i");s.append(o),n.append(r,s);const a=document.createElement("div");a.className="obiettivo";const c=document.createElement("div");c.className="granate",i.munizioni.after(c),i.radice.append(e,t,n,a);let l="",u="",f=0,h=0,d=null,g="";function _(p,v="pericolo"){i.avviso.textContent=p,i.avviso.classList.toggle("bene",v==="bene"),i.avviso.classList.add("visibile"),f=performance.now()+lA}function m(p,v){const S=[...p.giocatori].sort((E,R)=>E.id===v?-1:R.id===v?1:0),x=S.map(E=>`${E.id}:${E.punti}:${E.nome}`).join("|");if(x===g)return;g=x;const M=S.find(E=>E.id===v),y=M&&d!==null&&M.punti>d?M.punti-d:0;if(d=(M==null?void 0:M.punti)??null,i.punti.replaceChildren(...S.map(E=>{const R=document.createElement("div");R.className=E.id===v?"":"altro";const b=document.createElement("span");return b.textContent=E.nome,R.append(b,String(E.punti)),R})),y>0){const E=document.createElement("div");E.className="guadagno",E.textContent=`+${y}`,i.punti.prepend(E)}}return{mostra(p){i.radice.hidden=!p},avviso:_,segno(p){i.segno.classList.contains("uccisione")&&performance.now()<h||(i.segno.classList.add("visibile"),i.segno.classList.toggle("testa",p),h=performance.now()+uA)},uccisione(){i.segno.classList.add("visibile","uccisione"),h=performance.now()+fA},aggiorna({vista:p,mioId:v,arma:S,suggerimento:x,rianimazione:M,inMira:y,cannocchiale:E,bloccato:R,rete:b,apertura:A}){const I=p.giocatori.find(fe=>fe.id===v),k=performance.now();k>f&&i.avviso.classList.remove("visibile"),k>h&&i.segno.classList.remove("visibile","uccisione");const L=String((I==null?void 0:I.granate)??0);c.dataset.n!==L&&(c.dataset.n=L,c.replaceChildren(...Array.from({length:Number(L)},()=>document.createElement("i"))));const D=p.zombie.find(fe=>fe.tipo==="custode"&&fe.stato!=="morto")??p.zombie.find(fe=>fe.tipo==="preside"&&fe.stato!=="morto");if(n.hidden=!D,D){const fe=D.tipo==="custode"?Jc(D.vita/100):0,W=fe?`${Pr.custode.nome} — fase ${fe}`:Pr[D.tipo].nome;r.textContent!==W&&(r.textContent=W),o.style.width=`${Math.max(0,Math.min(100,D.vita))}%`}const q=hA(p);a.textContent!==q&&(a.textContent=q),i.round.textContent=p.round>0?String(p.round):"",i.round.classList.toggle("lampeggia",p.fase==="intervallo"&&p.round>0),m(p,v),i.nomeArma.textContent=Tt[S.tipo].nome,i.nomeArma.classList.toggle("potenziata",S.tipo.endsWith("+")),i.munizioni.textContent=`${S.caricatore} / ${S.riserva}`,i.munizioni.classList.toggle("poche",S.caricatore<=Math.ceil(Tt[S.tipo].caricatore/4));const X=(I==null?void 0:I.bevande)??[];i.bibite.dataset.chiave!==X.join()&&(i.bibite.dataset.chiave=X.join(),i.bibite.replaceChildren(...X.map(fe=>{const W=document.createElement("i");return W.style.background=`#${Zi[fe].colore.toString(16).padStart(6,"0")}`,W.title=Zi[fe].nome,W})));const ie=I&&I.stato==="vivo"?1-I.vita/I.vitaMax:I?1:0;i.vignetta.style.opacity=String(Math.min(.9,ie*1.1)),i.cannocchiale.hidden=!E,i.mirino.classList.toggle("nascosto",y||(I==null?void 0:I.stato)!=="vivo"),i.mirino.style.setProperty("--apertura",`${A}px`),i.suggerimento.textContent=x??"",i.barra.hidden=M===null,M!==null&&(i.barra.querySelector("i").style.width=`${Math.min(100,M*100)}%`);const j=(I==null?void 0:I.stato)==="terra",Z=(I==null?void 0:I.stato)==="morto";i.terra.hidden=!j&&!Z,j&&(i.terra.textContent=`SEI A TERRA — ${Math.ceil(I.timerTerra)} s
il tuo amico deve rianimarti`),Z&&(i.terra.textContent="SEI MORTO — torni al prossimo round"),i.rete.textContent=b,i.clicca.hidden=R;const ne=p.fase==="attesa";if(e.hidden=!ne,ne){const fe=p.conto===null?null:Math.ceil(p.conto),W=`${fe}|${p.giocatori.map(ee=>`${ee.nome}:${ee.pronto}`).join()}|${I==null?void 0:I.pronto}`;if(W!==l){l=W;const ee=document.createElement("h3");ee.textContent=fe===null?"SALA D'ATTESA":`SI PARTE TRA ${fe}`;const ye=p.giocatori.map(Le=>{const De=document.createElement("div");return De.className=Le.pronto?"pronto":"",De.textContent=`${Le.nome} — ${Le.pronto?"PRONTO":"si sta preparando"}`,De}),le=document.createElement("p");le.textContent=I!=null&&I.pronto?"Invio: aspetta, non sono pronto":"Premi INVIO quando sei pronto",e.replaceChildren(ee,...ye,le)}}const me=Object.entries(p.effetti??{}).filter(([,fe])=>fe>0),Re=me.map(([fe,W])=>`${fe}${Math.ceil(W)}`).join();Re!==u&&(u=Re,t.replaceChildren(...me.map(([fe,W])=>{const ee=document.createElement("span");return ee.style.setProperty("--colore",`#${Pn[fe].colore.toString(16).padStart(6,"0")}`),ee.textContent=`${Pn[fe].simbolo} ${Pn[fe].nome} ${Math.ceil(W)}`,ee})))}}}const pA=.5,Yf=Object.freeze({pistola:{durata:.18,filtro:1800,volume:.6,botto:110},revolver:{durata:.3,filtro:1300,volume:.85,botto:75},pompa:{durata:.45,filtro:900,volume:1,botto:60},mitra:{durata:.12,filtro:2200,volume:.45,botto:130},assalto:{durata:.16,filtro:1500,volume:.6,botto:90},battaglia:{durata:.22,filtro:1250,volume:.75,botto:80},mitragliatrice:{durata:.2,filtro:1100,volume:.7,botto:70},precisione:{durata:.6,filtro:2600,volume:1,botto:55},aliena:{durata:.3,filtro:3e3,volume:.35,botto:0,raggio:!0}});function mA(){let i=null,e=null,t=null;function n(){if(i){i.state==="suspended"&&i.resume();return}i=new AudioContext,e=i.createGain(),e.gain.value=pA,e.connect(i.destination),t=i.createBuffer(1,i.sampleRate*2,i.sampleRate);const l=t.getChannelData(0);for(let d=0;d<l.length;d++)l[d]=Math.random()*2-1;const u=i.createBufferSource();u.buffer=t,u.loop=!0;const f=i.createBiquadFilter();f.type="lowpass",f.frequency.value=220;const h=i.createGain();h.gain.value=.05,u.connect(f).connect(h).connect(e),u.start()}const r=()=>i&&i.state==="running";function s({durata:l,da:u,a:f=u,tipo:h="lowpass",volume:d=.5,ritardo:g=0,destinazione:_=e}){const m=i.currentTime+g,p=i.createBufferSource();p.buffer=t,p.playbackRate.value=.8+Math.random()*.4;const v=i.createBiquadFilter();v.type=h,v.frequency.setValueAtTime(u,m),v.frequency.exponentialRampToValueAtTime(Math.max(20,f),m+l);const S=i.createGain();S.gain.setValueAtTime(d,m),S.gain.exponentialRampToValueAtTime(.001,m+l),p.connect(v).connect(S).connect(_),p.start(m,Math.random()),p.stop(m+l+.05)}function o(l,{durata:u=.2,tipo:f="sine",volume:h=.2,ritardo:d=0,scendi:g=null,destinazione:_=e}){const m=i.currentTime+d,p=i.createOscillator();p.type=f,p.frequency.setValueAtTime(l,m),g&&p.frequency.exponentialRampToValueAtTime(g,m+u);const v=i.createGain();v.gain.setValueAtTime(h,m),v.gain.exponentialRampToValueAtTime(.001,m+u),p.connect(v).connect(_),p.start(m),p.stop(m+u+.05)}function a(l,u){const f=i.createStereoPanner();f.pan.value=Math.max(-1,Math.min(1,Math.sin(u)));const h=i.createGain();return h.gain.value=Math.max(0,1-l/22),f.connect(h).connect(e),f}const c={vuoto:()=>o(900,{durata:.04,tipo:"square",volume:.12}),ricarica:()=>{o(500,{durata:.05,tipo:"square",volume:.12,ritardo:.05}),o(320,{durata:.06,tipo:"square",volume:.14,ritardo:.35})},coltello:()=>s({durata:.18,da:3e3,a:900,tipo:"bandpass",volume:.5}),carne:()=>{s({durata:.12,da:700,a:200,volume:.6}),o(90,{durata:.1,volume:.25,scendi:50})},testa:()=>{s({durata:.16,da:1200,a:300,volume:.8}),o(1400,{durata:.06,tipo:"triangle",volume:.12})},assaRotta:()=>{s({durata:.3,da:1400,a:300,tipo:"bandpass",volume:.9}),o(120,{durata:.12,volume:.3,scendi:70})},assaMessa:()=>{o(180,{durata:.08,tipo:"square",volume:.25}),o(160,{durata:.08,tipo:"square",volume:.25,ritardo:.16})},porta:()=>{s({durata:1.2,da:400,a:120,volume:.6}),o(55,{durata:1,tipo:"sawtooth",volume:.12})},acquisto:()=>{o(988,{durata:.12,tipo:"triangle",volume:.25}),o(1319,{durata:.3,tipo:"triangle",volume:.25,ritardo:.1})},bevanda:()=>{[523,659,784].forEach((l,u)=>o(l,{durata:.25,tipo:"triangle",volume:.2,ritardo:u*.12}))},cassa:()=>{[880,740,988,659,1175].forEach((l,u)=>o(l,{durata:.4,tipo:"sine",volume:.18,ritardo:u*.22}))},round:()=>{[98,92.5,87.3,73.4].forEach((l,u)=>o(l,{durata:1.1,tipo:"sawtooth",volume:.16,ritardo:u*.55})),s({durata:2.5,da:300,a:60,volume:.3})},fineRound:()=>{[73.4,87.3,110].forEach((l,u)=>o(l,{durata:.9,tipo:"triangle",volume:.18,ritardo:u*.4}))},ferito:()=>{o(70,{durata:.25,volume:.6,scendi:40}),s({durata:.2,da:500,a:150,volume:.5})},aTerra:()=>{o(60,{durata:1.5,tipo:"sawtooth",volume:.25,scendi:30})},rianimato:()=>{o(440,{durata:.3,tipo:"triangle",volume:.2}),o(660,{durata:.5,tipo:"triangle",volume:.2,ritardo:.2})},corrente:()=>{o(60,{durata:.25,tipo:"square",volume:.4}),o(110,{durata:2.2,tipo:"sawtooth",volume:.12,ritardo:.2,scendi:120}),s({durata:.6,da:2e3,a:200,volume:.4})},potenzia:()=>{for(let l=0;l<6;l++)o(220+l*70,{durata:.45,tipo:"sawtooth",volume:.08,ritardo:l*.45});s({durata:3,da:300,a:2e3,tipo:"bandpass",volume:.3})},potenziata:()=>{[392,523,659,1046].forEach((l,u)=>o(l,{durata:.4,tipo:"triangle",volume:.22,ritardo:u*.09}))},conto:()=>o(660,{durata:.15,tipo:"square",volume:.15}),bonusCompare:()=>{[1046,1318].forEach((l,u)=>o(l,{durata:.25,tipo:"sine",volume:.15,ritardo:u*.1}))},bonus:()=>{[523,784,1046,1568].forEach((l,u)=>o(l,{durata:.35,tipo:"triangle",volume:.2,ritardo:u*.08})),s({durata:.8,da:4e3,a:600,tipo:"bandpass",volume:.25})},bomba:()=>{o(45,{durata:2.5,tipo:"sawtooth",volume:.5,scendi:25}),s({durata:2.5,da:1500,a:60,volume:1})},frammento:()=>{[1568,2093,2637].forEach((l,u)=>o(l,{durata:.6,tipo:"sine",volume:.12,ritardo:u*.15}))},segreto:()=>{[262,330,392,523,392,523,659,784,1046].forEach((l,u)=>o(l,{durata:.5,tipo:"triangle",volume:.16,ritardo:u*.18})),s({durata:3,da:200,a:3e3,tipo:"bandpass",volume:.3})},campanella:()=>{for(let l=0;l<6;l++)o(1175,{durata:.5,tipo:"sine",volume:.18,ritardo:l*.16}),o(1760,{durata:.3,tipo:"sine",volume:.08,ritardo:l*.16})},lancio:()=>{o(1900,{durata:.03,tipo:"square",volume:.08}),s({durata:.28,da:2600,a:600,tipo:"bandpass",volume:.35,ritardo:.05})},boss:()=>{o(62,{durata:1.8,tipo:"sawtooth",volume:.35,scendi:38}),o(93,{durata:1.5,tipo:"sawtooth",volume:.2,scendi:52,ritardo:.1}),s({durata:1.6,da:900,a:180,tipo:"bandpass",volume:.7})},urlo:()=>{o(118,{durata:1.1,tipo:"sawtooth",volume:.3,scendi:58}),o(176,{durata:.9,tipo:"sawtooth",volume:.15,scendi:90}),s({durata:1.1,da:1600,a:300,tipo:"bandpass",volume:.7})},scatto:()=>{s({durata:.7,da:450,a:110,volume:.8}),o(52,{durata:.7,volume:.45,scendi:34})},bossUcciso:()=>{[196,247,294,392,494].forEach((l,u)=>o(l,{durata:.6,tipo:"triangle",volume:.18,ritardo:.4+u*.12})),o(48,{durata:1.6,tipo:"sawtooth",volume:.4,scendi:26}),s({durata:1.6,da:1200,a:60,volume:.8})},fusibile:()=>{o(120,{durata:.25,tipo:"square",volume:.07}),[880,1320,1760].forEach((l,u)=>o(l,{durata:.35,tipo:"triangle",volume:.16,ritardo:.1+u*.1}))},generatore:()=>{o(42,{durata:2.8,tipo:"sawtooth",volume:.22,scendi:58}),o(84,{durata:2.6,tipo:"square",volume:.05,ritardo:.4}),s({durata:2.2,da:300,a:900,tipo:"bandpass",volume:.4})},rifugio:()=>{s({durata:2.4,da:700,a:140,volume:.8}),o(68,{durata:2,tipo:"square",volume:.1,scendi:48}),[330,262,196].forEach((l,u)=>o(l,{durata:1.2,tipo:"sine",volume:.14,ritardo:.8+u*.5}))},finale:()=>{for(let l=0;l<5;l++)o(392,{durata:1.8,tipo:"sine",volume:.26,ritardo:l*.9}),o(587,{durata:1.2,tipo:"sine",volume:.1,ritardo:l*.9});o(55,{durata:2.4,tipo:"sawtooth",volume:.4,scendi:33,ritardo:4.6}),s({durata:2.2,da:1e3,a:150,tipo:"bandpass",volume:.8,ritardo:4.6})},vittoria:()=>{[262,330,392,523,659,784,1046].forEach((l,u)=>o(l,{durata:.5,tipo:"triangle",volume:.2,ritardo:u*.14})),[523,659,784].forEach(l=>o(l,{durata:2.4,tipo:"triangle",volume:.14,ritardo:1.1}))},fine:()=>{[196,165,131,98].forEach((l,u)=>o(l,{durata:1.2,tipo:"sawtooth",volume:.18,ritardo:u*.6}))}};return{prepara:n,suona(l){var u;r()&&((u=c[l])==null||u.call(c))},sparo(l,u=0,f=0){var g;if(!r())return;const h=Yf[(g=Tt[l])==null?void 0:g.famiglia]??Yf.pistola,d=u>0?a(u,f):e;if(h.raggio){o(1400,{durata:h.durata,tipo:"square",volume:.12,scendi:180,destinazione:d}),o(700,{durata:h.durata*1.4,tipo:"sine",volume:.25,scendi:90,destinazione:d}),s({durata:.5,da:900,a:80,volume:.5,ritardo:.08,destinazione:d});return}s({durata:h.durata,da:h.filtro*2,a:h.filtro*.3,volume:h.volume,destinazione:d}),o(h.botto,{durata:h.durata*.8,volume:h.volume*.6,scendi:h.botto*.4,destinazione:d})},esplosione(l,u){if(!r()||l>40)return;const f=l>1?a(l*.55,u):e;o(52,{durata:1.3,tipo:"sawtooth",volume:.6,scendi:24,destinazione:f}),s({durata:1.5,da:2400,a:70,volume:1.2,destinazione:f}),s({durata:.25,da:7e3,a:1500,tipo:"highpass",volume:.45,destinazione:f})},lamento(l,u){if(!r()||l>20)return;const f=a(l,u),h=70+Math.random()*50,d=i.currentTime,g=i.createOscillator();g.type="sawtooth",g.frequency.setValueAtTime(h,d),g.frequency.linearRampToValueAtTime(h*(.7+Math.random()*.5),d+.9);const _=i.createBiquadFilter();_.type="bandpass",_.frequency.value=400+Math.random()*300,_.Q.value=4;const m=i.createGain();m.gain.setValueAtTime(.001,d),m.gain.linearRampToValueAtTime(.35,d+.15),m.gain.exponentialRampToValueAtTime(.001,d+1),g.connect(_).connect(m).connect(f),g.start(d),g.stop(d+1.05)}}}const Dl=new URLSearchParams(location.search),$f=Dl.has("locale"),Kf=Dl.has("riserva"),Ud="campanella.nome",gA={diretto:50,riserva:100},_A={diretto:.1,riserva:.22},vA=33,xA=1e3,MA=1e3,SA=1e4,Fd=.25,yA=.5,bA=.05,AA=.3,EA=.3,TA=.12,Zf=40,wA=60,RA=64,CA=1,Ue=i=>document.getElementById(i),IA=["schermata-inizio","schermata-stanza","schermata-fine"].map(Ue),ra=i=>IA.forEach(e=>{e.hidden=e.id!==i}),et=dA(),Ve=mA(),Ki=cA(Ue("mondo"));let It=null;const N={mioId:crypto.randomUUID(),nome:null,sonoHost:!1,stanza:null,coll:null,nomeAltro:null,idAltro:null,fase:"inizio",partita:null,semeCorrente:null,buffer:[],scarto:null,ultimoArrivo:0,vista:null,azioniLocali:[],azioniRemote:[],remoto:null,accumulo:0,ultimaIstantanea:0,ultimoInvioG:0,ultimoPing:0,ultimoCiao:0,lobbyRicevuta:!1,ping:null,statoSegnali:null,colpiVisti:new Map},ve={x:0,z:0,yaw:Math.PI,pitch:0,pronto:!1,tp:0,colpi:0,movimento:0,corsa:!1,inMira:!1},ot=gh(),$t={inRianimazione:!1,ultimaAssa:0,ultimoVuoto:0,sparoForzato:!1,ultimoAcquisto:{id:null,quando:0}},Ka=new Map,Bn=()=>N.coll&&(N.coll.modo==="diretto"||N.coll.modo==="riserva"),Bd=()=>{var i;return((i=N.coll)==null?void 0:i.modo)==="diretto"?"diretto":"riserva"};function Ul(i,e){const t=`${e}|${[...i].sort().join(",")}`;if(!Ka.has(t)){const n=e?[...Qc,...el,...Ji.filter(r=>!i.has(r.id)).map(r=>r.scatola),...wn.map(uh).filter(Boolean).map(r=>({...r,altezza:2}))]:Yo(i);Ka.set(t,n)}return Ka.get(t)}function PA(){try{return localStorage.getItem(Ud)??""}catch{return""}}function LA(i){try{return localStorage.setItem(Ud,i),!0}catch{return!1}}function ri(i){var e;N.sonoHost?N.azioniLocali.push({da:N.mioId,...i}):(e=N.coll)==null||e.invia({t:"az",a:i})}function zA(){return!N.coll||!N.idAltro&&N.sonoHost?N.sonoHost?"da solo":"":N.coll.modo==="diretto"?`diretto${N.ping!==null?` · ${N.ping} ms`:""}`:N.coll.modo==="riserva"?`via Supabase${N.ping!==null?` · ${N.ping} ms`:""}`:"collegamento…"}function xs(){var e;const i=Ue("t-stato");Ue("t-codice").textContent=N.stanza,Ue("blocco-link").hidden=!N.sonoHost,Ue("parti").hidden=!N.sonoHost,((e=N.coll)==null?void 0:e.modo)==="occupata"?(i.textContent="Questa stanza ha già due giocatori.",i.dataset.tipo="errore"):N.statoSegnali==="offline"&&!Bn()?(i.textContent="Il server dei collegamenti non risponde, riprovo…",i.dataset.tipo="errore"):Bn()&&N.nomeAltro?(i.textContent=`Insieme a ${N.nomeAltro} ${N.coll.modo==="diretto"?"(diretto)":"(via Supabase)"}`,i.dataset.tipo="ok"):(i.textContent=N.sonoHost?"Aspetto il tuo amico… mandagli il link. Puoi anche entrare da solo.":"Mi collego alla stanza…",i.dataset.tipo="attesa"),Ue("parti").textContent=N.nomeAltro&&Bn()?"Entrate nella scuola":"Entra da solo",Ue("nota-stanza").textContent=N.sonoHost?"Se il tuo amico arriva dopo, entra direttamente nella partita.":N.nomeAltro?`Aspetta che ${N.nomeAltro} apra la scuola.`:""}function kd(){!N.sonoHost||!Bn()||(N.coll.invia({t:"lobby",nomeHost:N.nome,ospite:N.idAltro}),N.fase==="gioco"&&N.coll.invia({t:"inizia",seme:N.semeCorrente}))}function Vd(i,e){Ve.prepara(),N.sonoHost=i,N.stanza=e,N.fase="stanza";const t=Dm(e,{locale:$f});t.suStato(r=>{N.statoSegnali=r,xs()}),N.coll=Ym({segnali:t,sonoHost:i,mioId:N.mioId,soloRiserva:Kf}),N.coll.suStato(()=>{xs(),Bn()&&kd()}),N.coll.suMessaggio(OA);const n=[$f?"locale":null,Kf?"riserva":null].filter(Boolean).map(r=>`&${r}`).join("");Ue("link").value=`${location.origin}${location.pathname}?stanza=${e}${n}`,ra("schermata-stanza"),xs(),i&&Ue("parti").focus()}function Us(i){Ue("errore-inizio").textContent=i}function Gd(){const i=bs(Ue("nome").value);return i?(LA(i),N.nome=i,i):(Us("Scrivi il tuo nome: lo vedrà il tuo amico."),Ue("nome").focus(),null)}function Hd(i,e=!1){var t;if(N.fase="gioco",N.semeCorrente=i,N.buffer=[],N.scarto=null,N.vista=null,N.accumulo=0,N.azioniLocali=[],N.azioniRemote=[],N.remoto=null,N.colpiVisti.clear(),tc(ot),Object.assign(ve,{pronto:!1,tp:0,colpi:0,pitch:0}),$t.inRianimazione=!1,It.svuota(),N.sonoHost){const n=[{id:N.mioId,nome:N.nome}];N.idAltro&&Bn()&&n.push({id:N.idAltro,nome:N.nomeAltro}),N.partita=Vp({seme:i,giocatori:n,sala:!0})}ra(null),et.mostra(!0),Ki.attiva(!0),(t=document.activeElement)==null||t.blur(),e&&Ki.blocca()}function Wd(){if(!N.sonoHost)return;const i=op();Hd(i,!0),Bn()&&N.coll.invia({t:"inizia",seme:i})}function Zc(i){if(N.fase!=="gioco")return;N.fase="fine",Ki.attiva(!1),Ve.suona(i.vinto?"vittoria":"fine"),document.querySelector(".titolo-fine").textContent=i.vinto?"Avete vinto!":"Siete morti";const e=Math.floor((i.durata??0)/60),t=String((i.durata??0)%60).padStart(2,"0");Ue("t-dettaglio").textContent=i.vinto?`Avete suonato l'ultima campanella e abbattuto il Custode al round ${i.round}${i.durata?` dopo ${e}:${t} di battaglia`:""}.`:i.round>1?`Siete sopravvissuti fino al round ${i.round}.`:"Non siete andati oltre il primo round.",Ue("t-tabella").replaceChildren(...i.giocatori.map(n=>{const r=document.createElement("div");return r.textContent=`${n.nome} — ${n.uccisioni} zombie, ${n.punti} punti`,r})),Ue("rigioca").hidden=!N.sonoHost,Ue("t-attesa-host").textContent=N.sonoHost?"":`Aspetta che ${N.nomeAltro} faccia ripartire.`,ra("schermata-fine"),N.sonoHost&&Ue("rigioca").focus()}function Za(i){var e,t;return((t=(e=N.vista)==null?void 0:e.giocatori.find(n=>n.id===i))==null?void 0:t.nome)??"Il tuo amico"}function Xd(i){for(const e of i){const t=e.a===N.mioId;switch(e.k){case"round":Ve.suona("round"),et.avviso(`Round ${e.round}`);break;case"fineRound":Ve.suona("fineRound");break;case"ucciso":It.effetti.macchia(e.x,e.z),e.bomba?It.effetti.esplosione({x:e.x,y:1,z:e.z},"fuoco"):e.testa&&It.decapita(e.zombie),e.da===N.mioId&&et.uccisione();break;case"esplosione":It.effetti.esplosione({x:e.x,y:e.y+.3,z:e.z},"fuoco"),It.effetti.esplosione({x:e.x,y:e.y+.8,z:e.z},"fuoco",16760944),Ve.esplosione(Math.hypot(e.x-ve.x,e.z-ve.z),Math.atan2(e.x-ve.x,e.z-ve.z)-ve.yaw);break;case"boss":Ve.suona("boss"),et.avviso(e.fusibile?"Il Preside è arrivato… e ha qualcosa in tasca":"Il Preside è tornato!");break;case"infuriato":Ve.suona("urlo"),et.avviso("Il Preside si è infuriato!");break;case"bossUcciso":Ve.suona("bossUcciso"),e.tipo==="preside"&&et.avviso("Il Preside è morto!","bene");break;case"fusibileCaduto":et.avviso("Il Preside ha perso un fusibile!","bene");break;case"fusibile":Ve.suona("fusibile"),et.avviso(`Fusibile ${e.trovati}/${e.totale}`,"bene");break;case"fusibiliMessi":Ve.suona("fusibile"),et.avviso(`Quadro del cancello: ${e.messi}/${e.totale}`,"bene");break;case"rifugio":Ve.suona("rifugio"),et.avviso("Il cancello del rifugio si apre…","bene");break;case"generatore":Ve.suona("generatore"),et.avviso("Generatore acceso: difendetelo!");break;case"generatoreFinito":Ve.suona("fusibile"),et.avviso("Il generatore ha sputato un fusibile!","bene");break;case"finale":Ve.suona("finale"),et.avviso("Il cancello si chiude… il Custode si sveglia");break;case"faseBoss":Ve.suona("urlo"),et.avviso(e.fase===2?"Il Custode si infuria!":"Il Custode è fuori di sé!");break;case"urlo":Ve.suona("urlo"),et.avviso("Il Custode chiama i suoi!");break;case"scatto":Ve.suona("scatto");break;case"vittoria":Zc({...e,vinto:!0});break;case"via":tc(ot),Ve.suona("round"),et.avviso("Si comincia! Restate vicini","bene");break;case"conto":Ve.suona("conto");break;case"contoAnnullato":et.avviso("Partenza annullata: qualcuno non è pronto");break;case"bonusCompare":Ve.suona("bonusCompare");break;case"bonus":Ve.suona(e.tipo==="bomba"?"bomba":"bonus"),et.avviso(`${Pn[e.tipo].nome} — ${Pn[e.tipo].descrizione}`,"bene"),e.tipo==="munizioni"&&ot.armi.forEach(n=>Ql(ot,n.tipo));break;case"frammento":Ve.suona("frammento"),et.avviso(`Frammento di meteorite ${e.trovati}/${e.totale}`,"bene");break;case"segreto":Ve.suona("segreto"),et.avviso("La meteorite si risveglia: avete il Disintegratore!","bene");break;case"campanella":Ve.suona("campanella"),It.campanella(),e.regalo&&et.avviso("L'ultima campanella vi ha lasciato un regalo…","bene");break;case"assaRotta":Ve.suona("assaRotta");break;case"assaMessa":Ve.suona("assaMessa");break;case"porta":Ve.suona("porta"),et.avviso("Porta aperta","bene");break;case"acquisto":if(!t)break;bp(ot,e.armi,e.arma),Ve.suona(e.potenziata?"potenziata":"acquisto"),et.avviso(Tt[e.arma].nome,"bene");break;case"corrente":Ve.suona("corrente"),et.avviso("Corrente accesa!","bene");break;case"potenzia":t&&(Ve.suona("potenzia"),et.avviso("Potenziamento in corso…","bene"));break;case"potenziataPronta":t&&et.avviso("Ritira l'arma potenziata!","bene");break;case"munizioni":t&&(Ql(ot,e.arma),Ve.suona("acquisto"));break;case"bevanda":t&&(Ve.suona("bevanda"),et.avviso(Zi[e.bevanda].nome,"bene"));break;case"cassa":t&&(Ve.suona("cassa"),et.avviso(`Prendi: ${Tt[e.arma].nome}`,"bene"));break;case"ferito":t&&Ve.suona("ferito");break;case"aTerra":Ve.suona("aTerra"),et.avviso(t?"Sei a terra!":`${Za(e.a)} è a terra!`);break;case"rianimato":Ve.suona("rianimato"),et.avviso(t?"Sei di nuovo in piedi":`${Za(e.a)} è di nuovo in piedi`,"bene");break;case"morto":et.avviso(t?"Sei morto":`${Za(e.a)} è morto`);break;case"rinato":t&&tc(ot);break;case"fine":Zc(e);break}}}function OA(i){switch(i.t){case"ciao":if(!N.sonoHost)return;N.nomeAltro=bs(i.nome),N.partita&&N.idAltro&&N.idAltro!==i.id&&bh(N.partita,N.idAltro),N.idAltro=i.id,N.fase==="gioco"&&N.partita&&al(N.partita,{id:i.id,nome:N.nomeAltro}),kd(),xs();return;case"lobby":if(N.sonoHost)return;N.lobbyRicevuta=i.ospite===N.mioId,N.nomeAltro=bs(i.nomeHost),xs();return;case"inizia":if(N.sonoHost||N.fase==="gioco"&&i.seme===N.semeCorrente)return;Hd(i.seme);return;case"g":if(!N.sonoHost)return;Jf(),N.remoto={x:i.x,z:i.z,yaw:i.yaw,pitch:i.pitch,arma:i.arma,colpi:i.colpi,tp:i.tp};return;case"az":if(!N.sonoHost||!N.idAltro)return;if(Jf(),N.azioniRemote.length>=RA){const e=N.azioniRemote.findIndex(t=>t.tipo==="colpo"||t.tipo==="assa");N.azioniRemote.splice(e>=0?e:0,1)}N.azioniRemote.push({...i.a,da:N.idAltro});return;case"st":{if(N.sonoHost||N.fase==="stanza"||i.g!==N.semeCorrente)return;const e=N.buffer[N.buffer.length-1];if(e&&i.ist.t<=e.vista.tempo)return;N.ultimoArrivo=performance.now();const t=i.ist.t-N.ultimoArrivo/1e3,n=N.scarto===null||Math.abs(t-N.scarto)>yA;N.scarto=n?t:N.scarto+(t-N.scarto)*bA,N.buffer.push({vista:Lh(i.ist)}),N.buffer.length>Zf&&N.buffer.splice(0,N.buffer.length-Zf);return}case"ev":!N.sonoHost&&N.fase==="gioco"&&Xd(i.eventi);return;case"ping":N.sonoHost||N.coll.invia({t:"pong",n:i.n});return;case"pong":N.sonoHost&&(N.ping=Math.round(performance.now()-i.n));return}}function Jf(){N.fase!=="gioco"||!N.partita||!N.idAltro||N.partita.giocatori.some(i=>i.id===N.idAltro)||al(N.partita,{id:N.idAltro,nome:N.nomeAltro??"Amico"})}function NA(i,e){const t=N.partita;if(N.idAltro&&t.giocatori.some(n=>n.id===N.idAltro)&&N.coll.silenzio()>SA&&bh(t,N.idAltro),N.fase==="gioco"){N.accumulo=Math.min(N.accumulo+i,Fd);const n=[];for(;N.accumulo>=$.PASSO;){const r={};ve.pronto&&(r[N.mioId]={x:ve.x,z:ve.z,yaw:ve.yaw,pitch:ve.pitch,arma:Qt(ot).tipo,colpi:ve.colpi,tp:ve.tp}),N.remoto&&N.idAltro&&(r[N.idAltro]=N.remoto);const s=[...N.azioniLocali.splice(0),...N.azioniRemote.splice(0)];n.push(...ym(t,$.PASSO,{posizioni:r,azioni:s})),N.accumulo-=$.PASSO}n.length&&Bn()&&N.coll.invia({t:"ev",eventi:n}),Xd(n)}Bn()&&e-N.ultimaIstantanea>=gA[Bd()]&&(N.coll.invia({t:"st",g:N.semeCorrente,ist:Ph(t)},{veloce:!0}),N.ultimaIstantanea=e)}function DA(i){N.fase!=="gioco"||!ve.pronto||i-N.ultimoInvioG<vA||(N.coll.invia({t:"g",x:ve.x,z:ve.z,yaw:ve.yaw,pitch:ve.pitch,arma:Qt(ot).tipo,colpi:ve.colpi,tp:ve.tp},{veloce:!0}),N.ultimoInvioG=i)}let Qf=performance.now();function UA(){const i=performance.now(),e=Math.min(Fd,(i-Qf)/1e3);Qf=i,N.coll&&Bn()&&(N.sonoHost&&i-N.ultimoPing>xA&&(N.coll.invia({t:"ping",n:i}),N.ultimoPing=i),!N.sonoHost&&!N.lobbyRicevuta&&i-N.ultimoCiao>MA&&(N.coll.invia({t:"ciao",nome:N.nome,id:N.mioId}),N.ultimoCiao=i)),!(N.fase!=="gioco"&&N.fase!=="fine")&&(N.sonoHost&&N.partita?NA(e,i):N.sonoHost||DA(i))}function FA(i){if(N.buffer.length===0||N.scarto===null)return null;const e=i/1e3+N.scarto-_A[Bd()];for(;N.buffer.length>2&&N.buffer[1].vista.tempo<=e;)N.buffer.shift();const[t,n]=N.buffer;return n&&e>t.vista.tempo?Em(t.vista,n.vista,(e-t.vista.tempo)/Math.max(1e-6,n.vista.tempo-t.vista.tempo)):t.vista}function BA(i,e,t){const n=e.stato==="vivo"&&N.fase==="gioco";ve.inMira=n&&i.mira&&ot.ricarica===0,ve.corsa=n&&i.corsa&&i.avanti>0&&!ve.inMira;const r=Math.hypot(i.avanti,i.lato);if(ve.movimento=n&&r>0?1:0,!ve.movimento)return;const s=(ve.corsa?$.VELOCITA_CORSA:$.VELOCITA)*(ve.inMira?.6:1),o=i.avanti/r,a=i.lato/r,c=(Math.sin(ve.yaw)*o-Math.cos(ve.yaw)*a)*s*t,l=(Math.cos(ve.yaw)*o+Math.sin(ve.yaw)*a)*s*t,u=dh(ve,c,l,$.RAGGIO_GIOCATORE,Ul(N.vista.porte,!1));ve.x=u.x,ve.z=u.z}function kA(i,e){ve.colpi+=1,It.spara(),Ve.sparo(Qt(ot).tipo);const t={x:ve.x,y:$.ALTEZZA_OCCHI,z:ve.z},n=rl(ve.yaw,ve.pitch),r=It.bersagli(e),s=Ul(e.porte,!0),o=new Map;for(let a=0;a<i.pallini;a++){const c=vp(n,i.dispersione*(ve.inMira?.4:1)*(ve.movimento?1.6:1),Math.random),l=ph(t,c,r,s,i.portata??(i.esplosione?wA:1/0));if(i.fiamma&&It.effetti.fiamma(It.bocca(),c,i.colore),!Number.isFinite(l.t))continue;const u={x:t.x+c.x*l.t,y:t.y+c.y*l.t,z:t.z+c.z*l.t};if(i.esplosione){It.raggio(u,i.colore??void 0),It.effetti.esplosione(u,i.esplosione.tipo,i.esplosione.colore??i.colore??null);for(const{id:h,fattore:d}of _p(u,r,i.esplosione.raggio)){if(h===l.id)continue;const g=o.get(h)??{danno:0,testa:!1};g.danno+=Math.round(i.esplosione.danno*d),o.set(h,g)}}if(l.id===null){It.effetti.impatto(u);continue}It.effetti.sangue(u,c);const f=o.get(l.id)??{danno:0,testa:!1};f.danno+=l.testa?i.danno*2:i.danno,f.testa||(f.testa=l.testa),o.set(l.id,f)}for(const[a,{danno:c,testa:l}]of o)ri({tipo:"colpo",zombie:a,danno:c,testa:l}),It.colpito(a,l),et.segno(l),Ve.suona(l?"testa":"carne")}function VA(i,e,t,n){var a;if(Mp(ot,n)&&Ve.suona("ricarica"),e.stato!=="vivo"||N.fase!=="gioco")return;for(const c of i.azioni)if(c==="pronto")t.fase==="attesa"&&ri({tipo:"pronto",attivo:!e.pronto});else if(c==="ricarica"&&oa(ot,e.bevande))Ve.suona("ricarica");else if(c==="cambia")Jl(ot);else if(c==="granata")e.granate>0&&t.fase!=="attesa"?(ri({tipo:"granata",yaw:ve.yaw,pitch:ve.pitch}),Ve.suona("lancio")):t.fase!=="attesa"&&et.avviso("Niente granate");else if((c==null?void 0:c.arma)!==void 0)Jl(ot,c.arma);else if(c==="coltello"&&yp(ot)){Ve.suona("coltello");const l=rl(ve.yaw,Math.min(ve.pitch,-.15)),u=ph({x:ve.x,y:$.ALTEZZA_OCCHI,z:ve.z},l,It.bersagli(t),Ul(t.porte,!0),Oo.portata);u.id!==null&&(ri({tipo:"colpo",zombie:u.id,danno:Oo.danno,coltello:!0}),It.colpito(u.id,!1),Ve.suona("carne"),et.segno(!1))}const r=Tt[Qt(ot).tipo],s=$t.sparoForzato||(r.automatica?i.sparo:i.sparoPremuto);if($t.sparoForzato=!1,!s||ve.corsa)return;if(Qt(ot).caricatore===0){!oa(ot,e.bevande)&&performance.now()/1e3-$t.ultimoVuoto>EA&&(Ve.suona("vuoto"),$t.ultimoVuoto=performance.now()/1e3);return}const o=Sp(ot);o&&(((a=t.effetti)==null?void 0:a.infinite)>0&&(Qt(ot).caricatore+=1),kA(o,t),Qt(ot).caricatore===0&&oa(ot,e.bevande))}function GA(i,e,t){const n=e.stato==="vivo"&&N.fase==="gioco"?Ap({id:N.mioId,x:ve.x,z:ve.z,armi:e.armi,bevande:e.bevande,armaAttiva:Qt(ot).tipo},t):null;if($t.inRianimazione&&(!i.f||(n==null?void 0:n.tipo)!=="rianima")&&(ri({tipo:"rianima",attivo:!1}),$t.inRianimazione=!1),!n)return null;const r=performance.now()/1e3,s=$t.ultimoAcquisto.id===n.acquisto&&r-$t.ultimoAcquisto.quando<CA;return i.fPremuto&&n.tipo==="compra"&&!s&&Number.isFinite(n.costo)&&(n.costo>e.punti?et.avviso("Non hai abbastanza punti"):(ri({tipo:"compra",acquisto:n.acquisto,arma:Qt(ot).tipo}),$t.ultimoAcquisto={id:n.acquisto,quando:r})),i.fPremuto&&n.tipo==="frammento"&&!s&&(ri({tipo:"frammento",id:n.id}),$t.ultimoAcquisto={id:n.acquisto,quando:r}),i.f&&n.tipo==="rianima"&&!$t.inRianimazione&&(ri({tipo:"rianima",attivo:!0}),$t.inRianimazione=!0),i.f&&n.tipo==="assa"&&r-$t.ultimaAssa>AA&&(ri({tipo:"assa",finestra:n.finestra}),$t.ultimaAssa=r),n}function HA(i,e){for(const t of i.zombie){if(t.stato==="morto"||Math.random()>e*TA)continue;const n=t.x-ve.x,r=t.z-ve.z;Ve.lamento(Math.hypot(n,r),Math.atan2(n,r)-ve.yaw)}for(const t of i.giocatori){if(t.id===N.mioId)continue;const n=N.colpiVisti.get(t.id)??t.colpi;t.colpi>n&&Ve.sparo(t.armaAttiva,Math.hypot(t.x-ve.x,t.z-ve.z)+1,Math.atan2(t.x-ve.x,t.z-ve.z)-ve.yaw),N.colpiVisti.set(t.id,t.colpi)}}let eh=performance.now(),Ja=60;function jd(i){const e=Math.min(.1,(i-eh)/1e3);if(eh=i,e>0&&(Ja+=(1/e-Ja)*.05),(N.fase==="gioco"||N.fase==="fine")&&It){const t=N.sonoHost?N.partita?Lh(Ph(N.partita)):null:FA(i),n=t==null?void 0:t.giocatori.find(r=>r.id===N.mioId);if(t&&n){N.vista=t,(!ve.pronto||n.teletrasporto>ve.tp)&&Object.assign(ve,{x:n.x,z:n.z,yaw:n.yaw,tp:n.teletrasporto,pronto:!0}),(t.fase==="fine"||t.fase==="vinta")&&N.fase==="gioco"&&Zc({round:t.round,vinto:t.fase==="vinta",giocatori:t.giocatori.map(l=>({nome:l.nome,punti:l.punti,uccisioni:l.uccisioni}))});const r=Ki.leggi();Ki.applicaVista(ve),BA(r,n,e),VA(r,n,t,e);const s=GA(r,n,t);HA(t,e);const o=t.giocatori.find(l=>l.id!==N.mioId&&l.stato==="terra"),a=Qt(ot).tipo,c=ve.inMira&&Tt[a].mirino===!0;It.disegna(t,{io:ve,mioId:N.mioId,dt:e,arma:a,movimento:ve.movimento,corsa:ve.corsa,inMira:ve.inMira,cannocchiale:c,ricarica:ot.ricarica>0?Math.sin(Math.min(1,ot.ricarica)*Math.PI):0,cambio:ot.cambio>0?1:0,coltellata:ot.coltello/Oo.attesa,aTerra:n.stato==="terra",morto:n.stato==="morto"}),et.aggiorna({vista:t,mioId:N.mioId,arma:Qt(ot),suggerimento:(s==null?void 0:s.testo)??null,rianimazione:$t.inRianimazione&&o?o.progressoRianimazione/(n.bevande.includes("ritorno")?$.RIANIMA_RAPIDO:$.RIANIMA_IN):null,inMira:ve.inMira,cannocchiale:c,bloccato:Ki.bloccato||N.fase!=="gioco",rete:[zA(),`${Math.round(Ja)} fps`].filter(Boolean).join(" · "),apertura:6+(ve.movimento?6:0)+(ve.corsa?8:0)-(ve.inMira?4:0)})}}requestAnimationFrame(jd)}Ue("crea").addEventListener("click",()=>{Gd()&&Vd(!0,Bm())});Ue("entra").addEventListener("click",()=>{if(!Gd())return;const i=Oh(Ue("codice").value);if(!i){Us("Il codice ha 4 lettere (es. KXRT)."),Ue("codice").focus();return}Vd(!1,i)});Ue("modulo-inizio").addEventListener("submit",i=>i.preventDefault());Ue("nome").addEventListener("keydown",i=>{i.key!=="Enter"||Ue("crea").disabled||(i.preventDefault(),(Ue("codice").value.trim()?Ue("entra"):Ue("crea")).click())});Ue("codice").addEventListener("keydown",i=>{i.key!=="Enter"||Ue("entra").disabled||(i.preventDefault(),Ue("entra").click())});Ue("codice").addEventListener("input",()=>Us(""));Ue("nome").addEventListener("input",()=>Us(""));Ue("copia").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(Ue("link").value),Ue("copia").textContent="Copiato!"}catch{Ue("link").select(),Ue("copia").textContent="Premi Ctrl+C"}});Ue("parti").addEventListener("click",Wd);Ue("rigioca").addEventListener("click",Wd);Ki.suBlocco(i=>{i&&Ve.prepara()});Ue("nome").value=PA();const th=Oh(Dl.get("stanza"));th&&(Ue("codice").value=th,Ue("crea").classList.remove("primario"),Ue("entra").classList.add("primario"));ra("schermata-inizio");Ue("nome").focus();requestAnimationFrame(jd);const WA=new Worker(new URL(""+new URL("orologio-worker-CqtP_hGM.js",import.meta.url).href,import.meta.url));WA.onmessage=UA;oA(Ue("mondo")).then(i=>{It=i,Ue("crea").disabled=!1,Ue("crea").textContent="Crea una stanza",Ue("entra").disabled=!1}).catch(i=>{console.error("Caricamento della grafica non riuscito:",i),Us("Non riesco a caricare la grafica del gioco. Ricarica la pagina."),Ue("crea").textContent="Errore"});
