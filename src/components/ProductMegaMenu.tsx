import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Package, Layers, Activity, Blocks, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { productImages } from '@/config/galleryImages';
import { navigationCopy, navigationGroups, type NavigationItem } from './navigation-content';

export const ProductMegaMenu = ({items, highlight, onOpenChange}: {items: NavigationItem[]; highlight?: ReactNode; onOpenChange?: (open: boolean) => void}) => {
 const {t,i18n}=useTranslation();
 const {localizedPath}=useLocalizedPath();
 const {pathname}=useLocation();
 const [isOpen,setIsOpen]=useState(false);
 const closeTimer=useRef<ReturnType<typeof setTimeout>>();
 const trigger=useRef<HTMLButtonElement>(null);
 const reduced=useReducedMotion();
 const labels=navigationCopy(i18n.language);
 const groups=navigationGroups(items);
 const icons=[Layers,Activity,Blocks,Package];
 const changeOpen=(open:boolean) => {clearTimeout(closeTimer.current);setIsOpen(open);onOpenChange?.(open);};
 useEffect(() => {setIsOpen(false);onOpenChange?.(false);},[pathname]);
 useEffect(() => () => clearTimeout(closeTimer.current),[]);
 return <div className="static" onMouseEnter={()=>changeOpen(true)} onMouseLeave={()=>{closeTimer.current=setTimeout(()=>changeOpen(false),140);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node | null)) changeOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'){changeOpen(false);trigger.current?.focus();}}}>
  <Button ref={trigger} variant="ghost" aria-expanded={isOpen} aria-controls="desktop-product-menu" onClick={()=>changeOpen(!isOpen)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();changeOpen(true);requestAnimationFrame(()=>document.querySelector<HTMLAnchorElement>('#desktop-product-menu a')?.focus());}}} className="relative h-10 px-3 font-medium text-foreground/80 hover:bg-transparent hover:text-primary">
   {highlight}<span className="relative z-10">{t('nav.products')}</span><ChevronDown className={`relative z-10 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
  </Button>
  <AnimatePresence>{isOpen && <motion.div id="desktop-product-menu" initial={{opacity:0,y:reduced ? 0 : -10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced ? 0 : -6}} transition={{duration:reduced ? 0 : .2}} className="absolute inset-x-0 top-full z-50 border-t border-b border-border bg-card shadow-medium">
   <div className="container-wide grid max-h-[calc(100dvh-140px)] grid-cols-12 overflow-y-auto">
    <div className="col-span-3 border-e border-border py-6 pe-5">
     <h2 className="mb-4 text-sm font-semibold text-muted-foreground">{labels[0]}</h2>
     <div className="space-y-1">{groups[0].map((item,i)=>{const Icon=icons[i] || Package;return <Button key={item.href} variant="ghost" asChild className="h-auto min-h-16 w-full justify-start whitespace-normal px-3 py-3 text-start hover:bg-primary/5 hover:text-primary"><Link to={item.href} onClick={()=>changeOpen(false)}><Icon className="text-primary"/><span className="min-w-0"><span className="block text-sm font-semibold">{item.label}</span><span className="mt-1 block text-xs font-normal leading-relaxed text-muted-foreground">{labels[i+5]}</span></span></Link></Button>;})}</div>
     <Button variant="link" asChild className="mt-3 h-auto whitespace-normal px-0 text-start"><Link to={localizedPath('/products')} onClick={()=>changeOpen(false)}>{labels[4]}<ArrowRight /></Link></Button>
    </div>
    <div className="col-span-5 grid grid-cols-2 gap-5 border-e border-border px-5 py-6">
     {groups.slice(1).map((group,index)=><section key={index} className="min-w-0"><h2 className="mb-4 text-sm font-semibold text-muted-foreground">{labels[index+1]}</h2><div className="max-h-[360px] space-y-1 overflow-y-auto overscroll-contain pe-2">{group.map(item=><Button variant="ghost" asChild key={item.href} className="h-auto min-h-10 w-full justify-start whitespace-normal px-2 py-2 text-start text-xs font-medium leading-relaxed hover:bg-primary/5 hover:text-primary"><Link to={item.href} onClick={()=>changeOpen(false)}>{item.label}</Link></Button>)}</div></section>)}
    </div>
    <div className="col-span-4 bg-muted/30 py-6 ps-5">
     <h2 className="mb-4 text-sm font-semibold text-muted-foreground">{labels[3]}</h2>
     <div className="grid grid-cols-2 gap-4">{[0,1].map(index=><Link key={index} to={items[index]?.href || localizedPath('/products')} className="group min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={()=>changeOpen(false)}><div className="mb-3 aspect-[4/3] overflow-hidden rounded-lg border border-border"><img src={index===0 ? productImages.indoorPlayground : productImages.trampolinePark} alt={items[index]?.label} width="280" height="210" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" /></div><span className="text-sm font-semibold group-hover:text-primary">{items[index]?.label}</span></Link>)}</div>
     <div className="mt-6 border-t border-border pt-5"><p className="text-sm font-semibold">{t('nav.megaMenuCta','Need custom solutions?')}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t('nav.megaMenuCtaDesc','Get a free consultation for your project')}</p><Button variant="hero" asChild className="mt-4 max-w-full whitespace-normal"><Link to={localizedPath('/contact')} onClick={()=>changeOpen(false)}>{t('nav.getFreeQuote')}</Link></Button></div>
    </div>
   </div>
  </motion.div>}</AnimatePresence>
 </div>;
};
