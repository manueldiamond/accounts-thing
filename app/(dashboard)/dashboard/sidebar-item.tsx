import { ReactChildren } from "@/types";
import Image from "next/image"
import Link from "next/link";
import React, { useCallback } from "react";
import {motion} from 'framer-motion'


type SideBarItemProps = Partial<{
  title: string;
  active: boolean;
  chevron:undefined|'down'|'right';
  icon: string|React.JSX.Element;
  onClick: Function,
  link:string
}>;

const SideBarItem=({title='',onClick,link,active=false,chevron, icon='/Gps--Streamline-Solar.svg'}:SideBarItemProps)=>{
    
    const Element = link ? Link : 'button';
    const elementProps = link ? { href: link } : { onClick };

  return(
    <Element {...elementProps as any}>
    <div className='group w-full px-5 gap-4 items-center flex relative text-dark text-sm font-medium'>
      {active&&<motion.div layoutId="sidebar-active-small-left-chip" className="absolute left-0 h-5 w-1 bg-dark rounded-tr-md rounded-br-md"/>}
      <div className={` relative ${!active&&'text-baby-text'} group-hover:bg-lighter-off-white z-10 px-2 py-3 items-center w-full flex gap-4`}>
        {active&&<motion.div layoutId="sidebar-active-layout-id" className=" absolute top-0 left-0 w-full h-full bg-lighter-off-white -z-10  rounded-md"/>}
        <span className="flex centered size-5 w-5 h-5">
          {typeof icon==='string'?
            <Image width={20} height={20} alt={title+"-icon"} src={icon}/>:icon}
        </span>
        <span className="flex-1 text-left font-medium">{title}</span>
        {chevron&&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${chevron==='down'&&'rotate-90'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg> }
      </div>
    </div>
    </Element>)
  }
  
  export default SideBarItem