import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {company} from '../../data/content';

// Photography shows industrial contexts, and should not be interpreted as a specific ERAM project.
const slides=[
  {eyebrow:'ERAM HYDRAULICS / ENGINEERING',title:'Engineering Power.',accent:'Delivering Precision.',description:company.summary,photo:'https://www.eramhydraulics.com/images/products16.jpg',fallback:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=85',label:'Industrial engineering',link:'/services',cta:'Explore our solutions',position:'center'},
  {eyebrow:'OFFSHORE + ONSHORE',title:'Power for',accent:'critical operations.',description:'Hydraulic engineering for demanding energy applications, including lifting, handling, skidding and service operations.',photo:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',fallback:'https://www.eramhydraulics.com/images/products17.jpg',label:'Offshore & onshore solutions',link:'/services',cta:'Discover the services',position:'center'},
  {eyebrow:'COMPONENTS + MANUFACTURING',title:'Made to move.',accent:'Built to perform.',description:'Explore hydraulic power packs, cylinders, components, lubrication and filtration solutions for demanding operating environments.',photo:'https://www.eramhydraulics.com/images/products17.jpg',fallback:'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=85',label:'Products & systems',link:'/products',cta:'View our products',position:'center'},
  {eyebrow:'FACILITIES + PEOPLE',title:'The people.',accent:'Behind the power.',description:'Look inside ERAM Hydraulics through photographs of the facilities, workshop and company events.',photo:'https://www.eramhydraulics.com/images/products12.jpg',fallback:'https://www.eramhydraulics.com/images/products13.jpg',label:'Explore our gallery',link:'/gallery',cta:'Browse the gallery',position:'center'}
];
const DURATION=6500;
function SlideVisual({slide}){const [failed,setFailed]=useState(false);return <img key={slide.photo} src={failed?slide.fallback:slide.photo} onError={()=>setFailed(true)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" style={{objectPosition:slide.position}}/>}
export default function HeroSlider(){
  const [index,setIndex]=useState(0),[playing,setPlaying]=useState(true),[progressKey,setProgressKey]=useState(0);
  const reduce=useReducedMotion(),hover=useRef(false);
  const go=(next)=>{setIndex((next+slides.length)%slides.length);setProgressKey(x=>x+1)};
  useEffect(()=>{if(reduce||!playing)return;const id=setInterval(()=>{if(!hover.current)go(index+1)},DURATION);return()=>clearInterval(id)},[index,playing,reduce]);
  const current=slides[index];
  return <section className="relative isolate min-h-[660px] overflow-hidden bg-[#071426] text-white md:min-h-[770px]" aria-label="ERAM Hydraulics featured solutions" onMouseEnter={()=>{hover.current=true}} onMouseLeave={()=>{hover.current=false}}>
    <AnimatePresence mode="sync" initial={false}>
      <motion.div key={current.photo} initial={reduce?false:{opacity:0,scale:1.07}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduce?0:1.15,ease:'easeOut'}} className="absolute inset-0 -z-20"><SlideVisual slide={current}/></motion.div>
    </AnimatePresence>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,15,30,.96)_0%,rgba(5,15,30,.85)_42%,rgba(5,15,30,.32)_100%)]"/>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(5,15,30,.85)_0%,transparent_40%)]"/>
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 grid-bg"/>
    <div className="mx-auto flex min-h-[660px] max-w-7xl flex-col justify-center px-5 pb-28 pt-20 md:min-h-[770px] md:pb-32">
      <AnimatePresence mode="wait" initial={false}><motion.div key={index} initial={reduce?false:{opacity:0,y:36}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:reduce?0:.65,ease:[.22,1,.36,1]}} className="max-w-[920px]">
        <div className="mb-7 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.22em] text-red-400"><span className="h-px w-10 bg-red-500"/>{current.eyebrow}</div>
        <h1 className="font-display text-[clamp(3.35rem,7.4vw,7.4rem)] font-semibold leading-[.99] tracking-[-.055em]">{current.title}<span className="mt-1 block text-white/75">{current.accent}</span></h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">{current.description}</p>
        <div className="mt-9 flex flex-wrap items-center gap-4"><Link to={current.link} className="inline-flex items-center gap-2 rounded-full bg-[#D71920] px-7 py-4 font-bold text-white shadow-[0_16px_40px_rgba(215,25,32,.25)] hover:bg-red-500">{current.cta}<ArrowUpRight size={18}/></Link><Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-sm hover:bg-white/20">Request a consultation <ArrowRight size={18}/></Link></div>
      </motion.div></AnimatePresence>
    </div>
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-[#071426]/35 backdrop-blur-md"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4"><div className="flex items-center gap-2 sm:gap-3" aria-label="Select hero slide">{slides.map((slide,i)=><button key={slide.label} type="button" onClick={()=>go(i)} aria-label={`Show slide ${i+1}: ${slide.label}`} aria-current={i===index?'true':undefined} className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-bold tracking-wider transition sm:px-3 ${i===index?'text-white':'text-white/60 hover:text-white'}`}><span className={`h-1.5 w-5 rounded-full ${i===index?'bg-red-500':'bg-white/35 group-hover:bg-white/70'}`}/><span className="hidden xl:inline">{slide.label}</span><span className="xl:hidden">0{i+1}</span></button>)}</div><div className="flex items-center gap-2"><span className="mr-2 text-xs font-semibold tracking-widest text-white/75">0{index+1} / 0{slides.length}</span><button onClick={()=>go(index-1)} aria-label="Previous slide" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20"><ChevronLeft size={20}/></button><button onClick={()=>go(index+1)} aria-label="Next slide" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20"><ChevronRight size={20}/></button><button onClick={()=>setPlaying(x=>!x)} aria-label={playing?'Pause automatic slideshow':'Play automatic slideshow'} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20">{playing?<Pause size={18}/>:<Play size={18}/>}</button></div></div><div key={`${progressKey}-${playing}`} className={`h-[3px] origin-left bg-red-600 ${playing&&!reduce?'eram-slide-progress':'w-0'}`} style={playing&&!reduce?{animationDuration:`${DURATION}ms`}:undefined}/></div>
  </section>;
}
