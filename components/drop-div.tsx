'use client'
import { AnimatePresence, motion, Variant, Variants } from 'framer-motion';
import React, { ForwardedRef, forwardRef } from 'react'

type dropDivProps={
    horizontal?:boolean,
    full?:boolean,
    opened:boolean,
    className?:string
    variants?:{
        opened:Variant,
        closed:Variant,
    },
    children?:React.ReactNode
}

const DropDiv = forwardRef(({horizontal, full,children,className,opened,variants}:dropDivProps,ref:ForwardedRef<HTMLDivElement>) => {
    const property=horizontal?'width':'height'
    return (
    <AnimatePresence>
        {opened&&<motion.div
          ref={ref}
          className={` flex overflow-hidden flex-col  ${className}`}
          variants={variants??{
            opened:{opacity:1, [property]:full?'100%':'auto'},
            closed:{opacity:0, [property]:0}
          }}
          initial={'closed'}
          animate={'opened'}
             exit={'closed'}
        >     
            {children}
        </motion.div>}
    </AnimatePresence>
  )
})

export default DropDiv