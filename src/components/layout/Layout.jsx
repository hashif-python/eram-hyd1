import {useEffect,useLayoutEffect} from 'react';
import {Outlet,useLocation} from 'react-router-dom';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

function RouteEffects(){
  const {pathname,search,hash}=useLocation();
  useLayoutEffect(()=>{
    // Disable browser restoration so back/forward navigation also starts at the page top.
    if('scrollRestoration' in window.history) window.history.scrollRestoration='manual';
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo({top:0,left:0,behavior:'instant'});
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
    requestAnimationFrame(()=>{window.scrollTo(0,0);document.documentElement.style.scrollBehavior='';});
  },[pathname,search,hash]);
  return null;
}

function AnimatedOutlet(){
  const {pathname}=useLocation();
  useEffect(()=>{
    const sections=[...document.querySelectorAll('main section')];
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce||!('IntersectionObserver' in window))return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('section-in-view');observer.unobserve(entry.target);}
    }),{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
    sections.forEach((section,i)=>{if(i===0)return;section.classList.add('section-animated');observer.observe(section);});
    return()=>observer.disconnect();
  },[pathname]);
  return <Outlet/>;
}

export default function Layout(){
  const location=useLocation();
  const reduce=useReducedMotion();
  return <>
    <RouteEffects/>
    <Navbar/>
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={reduce?false:{opacity:0,y:20,filter:'blur(5px)'}}
        animate={{opacity:1,y:0,filter:'blur(0px)'}}
        exit={reduce?undefined:{opacity:0,y:-14,filter:'blur(4px)'}}
        transition={{duration:reduce?0:0.38,ease:[0.22,1,0.36,1]}}
        className="pt-20"
      ><AnimatedOutlet/></motion.main>
    </AnimatePresence>
    <Footer/>
  </>;
}
