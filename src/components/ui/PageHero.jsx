import {useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {ArrowRight,Home} from 'lucide-react';

const banners={
  about:{photo:'https://www.eramhydraulics.com/images/products12.jpg',fallback:'https://www.eramhydraulics.com/images/products13.jpg',label:'Company / Engineering heritage',position:'center 45%'},
  products:{photo:'https://www.eramhydraulics.com/images/products17.jpg',fallback:'https://www.eramhydraulics.com/images/products16.jpg',label:'Products / Hydraulic systems',position:'center'},
  services:{photo:'https://www.eramhydraulics.com/images/products16.jpg',fallback:'https://www.eramhydraulics.com/images/products17.jpg',label:'Services / Engineering solutions',position:'center'},
  contact:{photo:'https://www.eramhydraulics.com/images/products13.jpg',fallback:'https://www.eramhydraulics.com/images/products12.jpg',label:'Contact / Our Saudi operations',position:'center'}
};
function BannerImage({config}){const [failed,setFailed]=useState(false);return <img src={failed?config.fallback:config.photo} onError={()=>setFailed(true)} alt="" aria-hidden="true" className="h-full w-full object-cover" style={{objectPosition:config.position}}/>}
export default function PageHero({eyebrow,title,lead,variant='about'}){
  const reduce=useReducedMotion(),config=banners[variant]||banners.about;
  return <section className="relative isolate flex min-h-[470px] items-center overflow-hidden bg-[#071426] px-5 py-20 text-white md:min-h-[570px] md:py-28" aria-label={`${eyebrow} header`}>
    <motion.div key={variant} initial={reduce?false:{scale:1.08,opacity:.6}} animate={{scale:1,opacity:1}} transition={{duration:reduce?0:1.3,ease:[.22,1,.36,1]}} className="absolute inset-0 -z-20"><BannerImage config={config}/></motion.div>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,15,29,.96),rgba(4,15,29,.78)_49%,rgba(4,15,29,.37))]"/>
    <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#071426]/90 via-transparent to-[#071426]/20"/>
    <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-25"/>
    <div className="mx-auto w-full max-w-7xl"><motion.div initial={reduce?false:{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:reduce?0:.75,ease:[.22,1,.36,1],delay:.1}} className="max-w-5xl">
      <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-300"><Link to="/" aria-label="Home" className="flex items-center gap-1 hover:text-white"><Home size={14}/> Home</Link><ArrowRight size={13} className="text-red-500"/><span className="text-white">{eyebrow}</span></nav>
      <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.25em] text-red-400"><span className="h-px w-8 bg-red-500"/> {config.label}</p>
      <h1 className="font-display max-w-4xl text-[clamp(3rem,6.2vw,6rem)] font-semibold leading-[1.03] tracking-[-.045em]">{title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">{lead}</p>
    </motion.div></div><div className="pointer-events-none absolute bottom-0 left-0 h-1 w-24 bg-[#D71920] md:w-44"/>
  </section>;
}
