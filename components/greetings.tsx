import { GreetingsSectionProps, Titles } from "@/types"
import Avatar from "./avatar"
import Notification from "./notifiction"

const Greetings=({name,image,role,notification}:GreetingsSectionProps)=>{
    const hrs=new Date().getHours()
    
    return(
    <section className="flex w-full items-center">
  
      <div className="flex flex-col flex-1">
        <p className="font-medium pb-3 text-grey text-lg">Good {hrs<12?'Morning':hrs<4?'Afternoon':'Evening'},</p>
        <div className="flex gap-[19px] pb-2 items-center">
          <Avatar img={image}  size='md'/>
          <h2 className="text-[28px] font-bold text-dark">{name}<span className="ml-1 text-xs text-grey">({Titles[role]})</span></h2>
        </div>
        <p className="text-sm font-normal text-grey">You are logged in as a <span className="font-bold text-dark">{role}</span> to oversee the registration of Out-Patients. We wish you all the best today.</p>
      </div>
      {notification&&<Notification {...notification}/>}
      </section>
      )
  }

export default Greetings
  