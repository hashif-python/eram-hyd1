import {useEffect,useMemo,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {X,ChevronLeft,ChevronRight,Search,ZoomIn,ZoomOut,Images,ArrowUpRight,Camera,Info} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import {galleries} from '../data/content';

function GalleryPhoto({item,className='',eager=false}){
  const [failed,setFailed]=useState(false);
  return <div className={`relative overflow-hidden bg-[#17283c] ${className}`}>
    {!failed?<img src={item.src} loading={eager?'eager':'lazy'} onError={()=>setFailed(true)} alt={item.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"/>:<div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,#10233b,#263d52)] p-6 text-center text-slate-200"><Camera size={28}/><span className="text-sm">Photograph temporarily unavailable</span><span className="text-xs text-slate-400">{item.caption}</span></div>}
  </div>;
}
function Lightbox({items,index,onChange,onClose}){
  const [zoom,setZoom]=useState(false);
  const [failed,setFailed]=useState(false);
  const closeRef=useRef(null);
  const touchStart=useRef(null);
  const reduce=useReducedMotion();
  const current=items[index];
  useEffect(()=>{setZoom(false);setFailed(false)},[index]);
  useEffect(()=>{
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const previousFocus=document.activeElement;
    closeRef.current?.focus();
    function onKey(event){
      if(event.key==='Escape'){event.preventDefault();onClose()}
      if(event.key==='ArrowLeft'){event.preventDefault();onChange((index-1+items.length)%items.length)}
      if(event.key==='ArrowRight'){event.preventDefault();onChange((index+1)%items.length)}
      if(event.key==='Tab'){
        const focusables=[...document.querySelectorAll('[data-eram-lightbox] button:not([disabled])')];
        if(!focusables.length)return;
        const first=focusables[0],last=focusables[focusables.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
      }
    }
    document.addEventListener('keydown',onKey);
    return()=>{document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',onKey);previousFocus?.focus?.()};
  },[index,items.length,onChange,onClose]);
  return createPortal(<motion.div data-eram-lightbox role="dialog" aria-modal="true" aria-label="Gallery image viewer" initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}} className="fixed inset-0 z-[9999] flex flex-col bg-[#050a12] text-white" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="relative z-20 flex min-h-[72px] shrink-0 items-center justify-between gap-3 border-b border-white/15 bg-[#071426] px-4 py-3 sm:px-6">
      <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-red-400">ERAM / Photo archive</p><p className="mt-1 truncate text-sm text-slate-200"><span className="font-bold text-white">{index+1} / {items.length}</span> <span className="mx-2 text-slate-500">•</span> {current.cat}</p></div>
      <div className="flex shrink-0 items-center gap-2"><button type="button" onClick={()=>setZoom(v=>!v)} aria-label={zoom?'Zoom out':'Zoom in'} title={zoom?'Zoom out':'Zoom in'} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 hover:bg-white/20">{zoom?<ZoomOut size={19}/>:<ZoomIn size={19}/>}</button><button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className="flex h-11 items-center justify-center gap-2 rounded-full bg-white px-3 font-bold text-[#071426] hover:bg-slate-200 sm:px-5"><X size={20}/><span className="hidden sm:inline">Close</span></button></div>
    </div>
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-12 py-3 sm:px-20" onTouchStart={e=>touchStart.current=e.touches[0].clientX} onTouchEnd={e=>{if(touchStart.current===null)return;const distance=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(distance)>55)onChange((index+(distance<0?1:-1)+items.length)%items.length);touchStart.current=null}}>
      <button type="button" onClick={()=>onChange((index-1+items.length)%items.length)} aria-label="Previous photograph" className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#19283b] hover:bg-[#314057] sm:left-5"><ChevronLeft size={24}/></button>
      {!failed?<img key={current.src} src={current.src} onError={()=>setFailed(true)} alt={current.caption} onClick={()=>setZoom(v=>!v)} className={`block max-h-full max-w-full select-none rounded-md object-contain shadow-2xl ${zoom?'scale-125 cursor-zoom-out':'cursor-zoom-in'}`} style={{transition:'transform .25s ease'}}/>:<div className="flex max-w-xl flex-col items-center gap-4 text-center"><Camera size={44} className="text-red-400"/><p className="text-xl font-semibold">This photograph could not be loaded.</p><p className="text-sm text-slate-300">{current.caption}</p><a className="text-sm text-red-300 underline" href={current.src} target="_blank" rel="noreferrer">View original image source</a></div>}
      <button type="button" onClick={()=>onChange((index+1)%items.length)} aria-label="Next photograph" className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#19283b] hover:bg-[#314057] sm:right-5"><ChevronRight size={24}/></button>
    </div>
    <div className="z-20 shrink-0 border-t border-white/15 bg-[#0a1829] px-4 py-4 sm:px-8"><div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6"><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-red-400">{current.cat}</p><h2 className="mt-1 text-base font-semibold leading-6 sm:text-xl">{current.caption}</h2><p className="mt-1 text-xs text-slate-400">Use arrows to browse · Esc to close · Click image to zoom</p></div><a href={current.src} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">Open original <ArrowUpRight size={14}/></a></div></div>
  </motion.div>,document.body);
}
export default function Gallery(){
  const [cat,setCat]=useState('All');const [q,setQ]=useState('');const [activeIndex,setActiveIndex]=useState(null);
  const categories=['All',...new Set(galleries.map(g=>g.cat))];
  const list=useMemo(()=>galleries.filter(g=>(cat==='All'||g.cat===cat)&&`${g.caption} ${g.cat}`.toLowerCase().includes(q.trim().toLowerCase())),[cat,q]);
  const open=(i)=>setActiveIndex(i);
  const close=()=>setActiveIndex(null);
  useEffect(()=>{close()},[cat,q]);
  return <>
    <PageHero variant="gallery" eyebrow="Inside ERAM" title="People. Places. Precision." lead="Explore moments from ERAM Hydraulics and Hydrofit: facilities, workshop activity, inaugurations and team celebrations from the company's published gallery."/>
    <section className="px-5 py-16 sm:py-24"><div className="mx-auto max-w-7xl">
      <div className="grid gap-5 border-b border-slate-200 pb-10 md:grid-cols-[1fr_auto] md:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-red-600"><Images size={17}/> Visual archive</div><h2 className="font-display text-3xl font-semibold sm:text-5xl">A closer look at our world.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">Discover the working environments and shared milestones behind the company. Select any image to open a full-screen viewer with readable descriptions and easy navigation.</p></div><div className="rounded-2xl border border-slate-200 bg-white px-5 py-4"><p className="text-3xl font-bold tabular-nums">{list.length}<span className="ml-2 text-sm font-medium text-slate-500">photographs</span></p><p className="mt-1 text-xs text-slate-500">Currently displayed</p></div></div>
      <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2" role="group" aria-label="Filter photographs">{categories.map(c=><button type="button" key={c} onClick={()=>setCat(c)} aria-pressed={cat===c} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${cat===c?'border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/15':'border-slate-200 bg-white text-slate-700 hover:border-red-300'}`}>{c}</button>)}</div><div className="relative w-full lg:w-72"><Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><label htmlFor="gallery-search" className="sr-only">Search gallery photos</label><input id="gallery-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search photographs..." className="w-full rounded-full border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100"/></div></div>
      {list.length?<div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((g,i)=><motion.button initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{duration:.35,delay:Math.min(i%6*.05,.25)}} key={g.src} type="button" onClick={()=>open(i)} className="group overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-500"><GalleryPhoto item={g} className="h-60 sm:h-64 lg:h-72"/><div className="flex items-start justify-between gap-4 p-5"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-red-600">{g.cat}</p><h3 className="mt-2 text-lg font-semibold leading-snug text-[#071426]">{g.caption}</h3></div><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#071426] transition group-hover:bg-red-600 group-hover:text-white"><ArrowUpRight size={17}/></span></div></motion.button>)}</div>:<div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"><Search size={28} className="mx-auto text-slate-400"/><h3 className="mt-3 text-xl font-semibold">No matching photographs</h3><p className="mt-2 text-slate-600">Try another keyword or select all categories.</p><button type="button" onClick={()=>{setQ('');setCat('All')}} className="mt-5 rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white">Clear filters</button></div>}
    </div></section>
    <section className="bg-[#071426] px-5 py-20 text-white"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"><div><span className="text-xs font-bold uppercase tracking-[.25em] text-red-400">Behind the engineering</span><h2 className="mt-4 font-display text-4xl font-semibold">Facilities, equipment and the people who keep things moving.</h2></div><div><p className="leading-8 text-slate-300">Our published photo archive captures facility inaugurations, workshop activity, team events and celebrations. For information about equipment, workshop facilities or service capabilities, our engineering team can help.</p><Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500">Contact ERAM Hydraulics <ArrowUpRight size={18}/></Link></div></div></section>
    <AnimatePresence>{activeIndex!==null&&list[activeIndex]&&<Lightbox items={list} index={activeIndex} onChange={setActiveIndex} onClose={close}/>}</AnimatePresence>
  </>;
}
