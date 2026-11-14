import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {MessageCircle,X,Send,ArrowUpRight,Phone,Mail,Bot} from 'lucide-react';
import {company,services,products,locations} from '../../data/content';
const choices=['Products and components','Engineering services','Locations and contacts','Request a quotation'];
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,' ');
function getAnswer(message){
 const q=normalize(message);
 if(/quote|quotation|price|cost|buy|order|enquir|rfq/.test(q)) return {answer:'For a quotation, share the product or service, model/reference (if available), operating pressure, flow or application details. Our contact page lists the company email and branch numbers.',link:'/contact',label:'Request a quotation'};
 if(/location|branch|address|where|riyadh|dammam|map/.test(q)) return {answer:`ERAM lists these Saudi locations: ${locations.map(x=>x.name).join(', ')}. Select Contact to see branch addresses and map links.`,link:'/contact',label:'View contact locations'};
 if(/phone|number|call|email|contact|human|agent|support/.test(q)) return {answer:`You can reach ERAM at ${company.email} or ${company.phones.join(' / ')}. This assistant is an automated website guide, not a live support representative.`,link:'/contact',label:'Contact ERAM'};
 if(/product|component|pump|motor|cylinder|seal|filter|lubricat|power pack|valve/.test(q)) return {answer:`Browse product families including ${products.slice(0,5).map(x=>x[0]).join(', ')} and more. Specific technical data and availability should be confirmed directly with ERAM.`,link:'/products',label:'Browse products'};
 if(/service|repair|maintenance|offshore|marine|mobile|industrial|hydraulic|engineering/.test(q)) return {answer:`ERAM covers ${services.map(x=>x.title).join(', ')}. For repair, installation or system requirements, include equipment and site details when contacting the team.`,link:'/services',label:'Explore services'};
 return {answer:'I can help you find ERAM product families, engineering services, locations and quotation channels. Choose a topic below or ask a more specific question.',link:'/contact',label:'Contact the team'};
}
export default function SupportChat(){
 const [open,setOpen]=useState(false);
 const [input,setInput]=useState('');
 const [messages,setMessages]=useState([{id:0,role:'bot',text:'Hello! Welcome to ERAM Hydraulics. I can help you explore products, services, locations, or the quotation process.'}]);
 const end=useRef(null); const inputRef=useRef(null); const count=useRef(1);
 useEffect(()=>{if(open){inputRef.current?.focus();end.current?.scrollIntoView({block:'nearest',behavior:'smooth'});}},[open,messages.length]);
 useEffect(()=>{if(!open)return;const onKey=e=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[open]);
 function ask(value){const text=value.trim();if(!text)return;const response=getAnswer(text);setMessages(current=>[...current,{id:count.current++,role:'user',text},{id:count.current++,role:'bot',text:response.answer,link:response.link,label:response.label}]);setInput('');}
 return <div className="fixed bottom-5 right-5 z-[90] sm:bottom-7 sm:right-7" aria-label="ERAM support assistant">
 {open&&<section role="dialog" aria-label="ERAM support chat" className="eram-chat-panel mb-4 flex h-[min(570px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white text-slate-900 shadow-[0_20px_80px_rgba(7,20,38,.25)]">
 <header className="flex items-center justify-between bg-[#071426] px-5 py-4 text-white"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600"><Bot size={22}/></span><div><h2 className="text-base font-bold">ERAM Support</h2><p className="text-[11px] text-slate-300">Automated website assistant</p></div></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close support chat" className="rounded-lg p-2 hover:bg-white/15"><X size={21}/></button></header>
 <div className="flex-1 space-y-3 overflow-y-auto bg-[#f3f6fa] px-4 py-5" aria-live="polite" aria-relevant="additions">{messages.map(m=><div key={m.id} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}><div className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.role==='user'?'rounded-br-sm bg-[#071426] text-white':'rounded-bl-sm border border-slate-200 bg-white text-slate-700'}`}><p>{m.text}</p>{m.link&&<Link to={m.link} onClick={()=>setOpen(false)} className="mt-3 inline-flex items-center gap-1 font-bold text-red-700 underline underline-offset-2">{m.label}<ArrowUpRight size={15}/></Link>}</div></div>)}<div ref={end}/></div>
 {messages.length<5&&<div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 py-3">{choices.map(c=><button type="button" key={c} onClick={()=>ask(c)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#071426] hover:border-red-500">{c}</button>)}</div>}
 <form className="flex items-center gap-2 border-t border-slate-200 bg-white p-3" onSubmit={e=>{e.preventDefault();ask(input)}}><label className="sr-only" htmlFor="eram-support-input">Ask a question</label><input ref={inputRef} id="eram-support-input" value={input} onChange={e=>setInput(e.target.value)} maxLength={500} placeholder="How can we help?" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm focus:border-red-500"/><button type="submit" disabled={!input.trim()} aria-label="Send message" className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white disabled:opacity-40"><Send size={18}/></button></form>
 <div className="flex justify-center gap-5 pb-3 text-[11px] font-semibold text-slate-500"><a className="inline-flex items-center gap-1 hover:text-red-700" href={`mailto:${company.email}`}><Mail size={13}/> Email</a><a className="inline-flex items-center gap-1 hover:text-red-700" href="tel:+966138374439"><Phone size={13}/> Call ERAM</a></div>
 </section>}
 <button type="button" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close support chat':'Open support chat'} aria-expanded={open} className="ml-auto flex items-center gap-3 rounded-full bg-[#D71920] px-5 py-4 font-semibold text-white shadow-[0_12px_35px_rgba(215,25,32,.30)] transition-transform hover:-translate-y-1 hover:bg-red-700"><span>{open?'Close chat':'Need help?'}</span>{open?<X size={22}/>:<MessageCircle size={22}/>}</button>
 </div>;
}
