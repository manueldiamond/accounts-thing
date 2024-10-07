import { ReactChildren } from "@/d.types"
import Header from "./_components/header"
import SideBar from "./_components/sidebar"

const DashboardLayout=({children}:ReactChildren)=>{
    return(
        <div className="my-[20px] gap-10 flex">
            <aside className=" min-w-max overflow-y-auto max-h-screen">
                <SideBar/>
            </aside>
            <div className="w-full overflow-x-hidden overflow-y-auto max-h-screen ">
                <Header/>
                {children}
                <div className="min-h-[8rem]"/>
            </div>
        </div>
    )
}

export default DashboardLayout