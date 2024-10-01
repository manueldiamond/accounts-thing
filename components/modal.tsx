'use client'

import { useClickOut } from "@/hooks"
import { ReactChildren } from "@/types"
import { AnimatePresence,motion } from "framer-motion"
import { useState } from "react"
import HeaderClose from "./a-header"
import CloseButton from "./close-button"


const Modal = ({ centerHeading, heading = 'Modal',empty ,children, open=false, setOpen=(state:any)=>{}}:{
    heading?:string;
    centerHeading?:boolean;
    open:boolean
    setOpen:Function;
    empty?:boolean;
}&ReactChildren)  => {
    const [modalOpen,setModalOpen] = typeof children==='function'? useState(false):[open,setOpen]
    const ref = useClickOut(()=>setModalOpen(false),[modalOpen],)
    return (
        <AnimatePresence>
            {modalOpen &&
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit = {{ opacity: 0 }}
                className="fixed overflow-y-scroll pl-[260px] py-20 top-0 left-0 bg-[#D9D9D9AD] w-screen h-screen flex  z-20"
            >
                {empty?
                <div className="m-auto">
                    {children}
                </div>
                :
                <motion.div 
                    ref={ref}
                    layoutId={heading+'modal'}
                    initial={{ opacity: 0, y:100 }}
                    animate={{ opacity: 1, y:0 }}
                    exit =  {{ opacity: 0, y:-100 }}
                    className="bg-white m-auto flex flex-col gap-2 max-w-[840px] py-[44px] shadow-md">
                
                    <div className="w-full items-center mb-6 flex relative px-9">
                        <h2 className={`${centerHeading&&'text-center w-full'} font-medium text-head  w-full text-xl`}>{heading}</h2>
                        <CloseButton onClick={()=>setModalOpen(false)}/>
                    </div> 
                    <div className="px-[100px] ">
                        {children}
                    </div>
                </motion.div>}
            </motion.div>
            }
        </AnimatePresence>
    )
}

export default Modal

