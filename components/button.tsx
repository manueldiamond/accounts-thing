import { checkIcon, plusIcon } from "@/svg"
import { ButtonProps } from "@/d.types"
import { ForwardedRef, forwardRef } from "react"


const Button=forwardRef(({disabled, submit, rounded,children,onClick,icons='plus',leftIcon,rightIcon,noIcon=false, both,type='primary',size='md'}:ButtonProps,ref?:ForwardedRef<HTMLButtonElement>)=>{
    const icon=(
      icons==='plus'?
           plusIcon
      :icons==='check'?
           checkIcon
      :icons)   
  
    return(
      <button type={submit?"submit":undefined} ref={ref} onClick={disabled?undefined:onClick} className={
        `flex btn text-center ${type} ${size} ${rounded&&'!rounded-full'} ${disabled&&'cursor-not-allowed opacity-50'} items-center`
      }>
        {(both||(!noIcon&&leftIcon))&&icon}
        {children}
        {(both||(!noIcon&&rightIcon))&&icon}
      </button>
    )
  })

  export default Button