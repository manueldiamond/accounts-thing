import Image from "next/image"

const SideBarItem=({title='',active=false,dropdown=false, icon='/Gps--Streamline-Solar.svg'})=>{
    return(<div className='group px-5 gap-4 items-center flex relative text-dark text-sm font-medium'>
      {active&&<div className="absolute left-0 h-5 w-1 bg-dark rounded-tr-sm rounded-br-sm"/>}
      <div className={`group-hover:opacity-60 ${active&&'bg-white'} rounded-md px-2 py-3 items-center flex gap-4`}>
        <span className="size-5 w-5 h-5">
          {typeof icon==='string'?
            <Image width={20} height={20} alt={title+"-icon"} src={icon}/>:icon}
        </span>
        <span className="flex-1">{title}</span>
        {dropdown&&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg> }
      </div>
    </div>)
  }
  
  export default SideBarItem