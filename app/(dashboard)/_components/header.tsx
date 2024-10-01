"use client"
import { usePathname } from "next/navigation"
import { sidebarItems } from "./sidebar"
import { fancyChevronDown, notificationIcon, searchIcon } from "@/svg"
import { AvatarProps } from "@/types"
import Avatar from "@/components/avatar"
import {motion} from 'framer-motion'

const Progress=({amt=203,max=456})=>{
  
    return(
        <>
            <div className="py-4 ">
                <p className="text-primary text-xl font-medium">203/456 accounts completed</p>
                <div className="bg-light-texts rounded relative h-[3px] w-[229px] overflow-hidden">
                    <motion.div 
                        initial={{scaleX:0}} 
                        animate={{scaleX:amt/max}} 
                        className=" absolute top-0 w-full h-full left-0 origin-left progress bg-primary"
                    />
                </div>
            </div>
        </>
    )
}
const Header=()=>{
    const path = usePathname()
    const currentHeading = sidebarItems.find(({link})=>path.includes(link))?.text
    console.log(currentHeading)
    const notificationAvailable=true
    const profile={
        name:'Olateju Toluwanimi Jessica',
        email:'jessicaolateju2234@gmail.com',
        image:''
    }
    return(
        <div className={`flex  justify-between w-full items-center ${currentHeading==="Accounts"&&'border-b'} `}>
            <h1 className="2xl font-medium text-dark">{currentHeading}</h1>
            {currentHeading==='Accounts'?<>
                <Progress/>
            </>:<>
                <div className="flex gap-2  rounded-full centered px-6 border py-[10px] bg-light">
                    <span className="size-5 flex centered">{searchIcon}</span>
                    <input className="flex-1 bg-transparent outline-none" placeholder="Search Anything w-full"/>
                </div>
                
                <div className="flex gap-[11px] max-w-[399px] rounded-full items-center ">
                    <button className="flex w-5 h-6 centered text-baby-text relative">
                        {notificationIcon}
                        {notificationAvailable&&<div className="bg-[#703C9F] rounded-full aspect-square absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-2 h-2 "/>}
                    </button>

                    <div className="flex gap-2 p-[5px] centered rounded-xl border border-solid border-grey/10 ">
                        <Avatar size="md" img={profile.image}/>
                        <div className="">
                            <p className="pb-1">{profile.name}</p>
                            <p className="text-baby-text font-[13px]">{profile.email}</p>
                        </div>
                        <span className="text-29">{fancyChevronDown}</span>
                    </div>

               </div>
            </>}
        </div>
    )
}
export default Header