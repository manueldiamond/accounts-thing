import { AvatarProps, avatarSizeMap } from "@/types"
import Image from "next/image"

const Avatar=({size,img}:AvatarProps)=>{
    const sizeValue=avatarSizeMap[size]
    return(
      <div style={{width:sizeValue+'px',height:sizeValue+'px',minWidth:sizeValue+'px',minHeight:sizeValue+'px'}} className="bg-base/40 rounded-full flex aspect-square overflow-hidden">
        <Image src={!!img?img:'/vercel.svg'} width={sizeValue} height={sizeValue} alt='avatar' className="top-0 left-0 abolute object-cover w-full h-full "/>
      </div>
    )
  }

  export default Avatar