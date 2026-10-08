import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { navigationCopy, navigationGroups, type NavigationItem } from './navigation-content';
export function MobileProductGroups({ items, onNavigate }: { items: NavigationItem[]; onNavigate: () => void }) {
 const [expanded, setExpanded] = useState<number | null>(0);
 const { i18n } = useTranslation();
 const labels = navigationCopy(i18n.language);
 const reduced = useReducedMotion();
 const { pathname } = useLocation();
 return <div className="space-y-1 px-3 pb-3">{navigationGroups(items).map((group,index) => <div key={index}>
  <Button variant="ghost" aria-expanded={expanded===index} aria-controls={`mobile-product-group-${index}`} className="w-full justify-between whitespace-normal text-start hover:bg-primary/10 hover:text-primary" onClick={() => setExpanded(expanded===index ? null : index)}>
   {labels[index]}<motion.span animate={{rotate:expanded===index ? 90 : 0}} transition={{duration:reduced ? 0 : .2}}><ChevronRight /></motion.span>
  </Button>
  <AnimatePresence initial={false}>{expanded===index && <motion.div id={`mobile-product-group-${index}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced ? 0 : .2}} className="overflow-hidden">
   <div className="ms-4 border-s border-primary/20 ps-3">{group.map((item,i) => <motion.div key={item.href} initial={{opacity:0,x:reduced ? 0 : -8}} animate={{opacity:1,x:0}} transition={{delay:reduced ? 0 : Math.min(i*.025,.2)}}><Button variant="ghost" asChild className="h-auto min-h-10 w-full justify-start whitespace-normal py-2 text-start text-sm font-normal hover:bg-primary/10 hover:text-primary"><Link to={item.href} aria-current={pathname===item.href ? 'page' : undefined} onClick={onNavigate}>{item.label}</Link></Button></motion.div>)}</div>
  </motion.div>}</AnimatePresence>
 </div>)}</div>;
}
