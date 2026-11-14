import {useEffect,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';

// Split-panel engineering aperture: intentionally distinct from the old progress-bar loader.
export default function IntroLoader(){
  const [show,setShow]=useState(()=>{
    try{return sessionStorage.getItem('eram-v2-intro-shown')!=='1';}catch{return true;}
  });
  const reduce=useReducedMotion();
  useEffect(()=>{
    if(!show)return;
    const timer=window.setTimeout(()=>{
      try{sessionStorage.setItem('eram-v2-intro-shown','1');}catch{}
      setShow(false);
    },reduce?180:1750);
    return()=>window.clearTimeout(timer);
  },[show,reduce]);
  return <AnimatePresence>{show&&<motion.div
    className="fixed inset-0 z-[110] overflow-hidden text-white"
    role="status" aria-label="Loading ERAM Hydraulics" aria-live="polite"
    initial={{opacity:1}} exit={{opacity:0,transition:{duration:reduce?0:0.42,delay:reduce?0:0.18}}}
  >
    <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-[#071426]" exit={reduce?{}:{x:'-102%',transition:{duration:.62,ease:[.76,0,.24,1]}}}/>
    <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-[#0d233b]" exit={reduce?{}:{x:'102%',transition:{duration:.62,ease:[.76,0,.24,1]}}}/>
    <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true"/>
    <motion.div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center" exit={{opacity:0,scale:.94,transition:{duration:.16}}}>
      <div className="relative flex h-44 w-44 items-center justify-center md:h-56 md:w-56" aria-hidden="true">
        <motion.div className="absolute inset-0 rounded-full border border-white/15 border-t-[#D71920] border-r-[#D71920]/30" initial={{rotate:-100,scale:.7,opacity:0}} animate={{rotate:270,scale:1,opacity:1}} transition={{duration:reduce?0:1.5,ease:'easeOut'}}/>
        <motion.div className="absolute inset-5 rounded-full border border-dashed border-white/25" initial={{rotate:80,opacity:0}} animate={{rotate:-105,opacity:1}} transition={{duration:reduce?0:1.5,ease:'easeOut'}}/>
        <motion.div className="absolute inset-11 rotate-45 border border-[#D71920]/55" initial={{scale:.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:reduce?0:.15,duration:.6}}/>
        <motion.span className="font-display text-5xl font-bold tracking-[-.08em] md:text-6xl" initial={{opacity:0,scale:.65}} animate={{opacity:1,scale:1}} transition={{delay:reduce?0:.28,duration:.5}}>E<span className="text-[#D71920]">.</span></motion.span>
      </div>
      <motion.div className="mt-6 rounded-xl bg-white px-5 py-3 shadow-[0_16px_60px_rgba(0,0,0,.3)]" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:reduce?0:.45,duration:.5}}><img src="/logos/eram-logo.png" alt="ERAM Hydraulics official logo" className="h-auto w-[213px] max-w-[65vw] object-contain" width="213" height="71"/></motion.div>
      <motion.p className="mt-5 text-[10px] font-bold uppercase tracking-[.32em] text-slate-300 md:text-xs" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduce?0:.65}}>Hydraulic engineering / Saudi Arabia</motion.p>
      <motion.div className="mt-10 flex items-center gap-2" aria-hidden="true" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduce?0:.75}}>
        {[0,1,2,3,4].map(i=><motion.span key={i} className="h-1 w-6 skew-x-[-25deg] bg-[#D71920]" initial={{opacity:.14,scaleX:.4}} animate={{opacity:1,scaleX:1}} transition={{delay:reduce?0:.7+i*.12,duration:.24}}/>)}
      </motion.div>
    </motion.div>
    <div className="absolute bottom-7 left-7 z-10 text-[10px] uppercase tracking-[.2em] text-slate-400">Precision in motion</div>
    <div className="absolute bottom-7 right-7 z-10 text-[10px] uppercase tracking-[.2em] text-slate-400">ERAM / 02</div>
  </motion.div>}</AnimatePresence>;
}
