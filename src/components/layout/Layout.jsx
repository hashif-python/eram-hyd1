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
  // Render content immediately; avoid hiding entire sections behind IntersectionObserver.
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
        initial={reduce?false:{opacity:0,y:8}}
        animate={{opacity:1,y:0}}
        exit={reduce?undefined:{opacity:0,y:-6}}
        transition={{duration:reduce?0:0.16,ease:[0.22,1,0.36,1]}}
        className="pt-20"
      ><AnimatedOutlet/></motion.main>
    </AnimatePresence>
    <Footer/>
  </>;
}
