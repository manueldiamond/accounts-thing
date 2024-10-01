"use client"
import Logo from "@/components/logo";
import SideBarItem from "../dashboard/sidebar-item";
import { usePathname } from "next/navigation";

const dashboardIconSVG=(
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.33334 1.66663H2.50001C2.03977 1.66663 1.66667 2.03972 1.66667 2.49996V8.33329C1.66667 8.79353 2.03977 9.16663 2.50001 9.16663H8.33334C8.79358 9.16663 9.16667 8.79353 9.16667 8.33329V2.49996C9.16667 2.03972 8.79358 1.66663 8.33334 1.66663Z" fill="#8A84FF"/>
    <path d="M8.33334 10.8334H2.50001C2.03977 10.8334 1.66667 11.2065 1.66667 11.6667V17.5C1.66667 17.9603 2.03977 18.3334 2.50001 18.3334H8.33334C8.79358 18.3334 9.16667 17.9603 9.16667 17.5V11.6667C9.16667 11.2065 8.79358 10.8334 8.33334 10.8334Z" fill="#202020"/>
    <path d="M17.5 1.66663H11.6667C11.2064 1.66663 10.8333 2.03972 10.8333 2.49996V8.33329C10.8333 8.79353 11.2064 9.16663 11.6667 9.16663H17.5C17.9602 9.16663 18.3333 8.79353 18.3333 8.33329V2.49996C18.3333 2.03972 17.9602 1.66663 17.5 1.66663Z" fill="#202020"/>
    <path d="M17.5 10.8334H11.6667C11.2064 10.8334 10.8333 11.2065 10.8333 11.6667V17.5C10.8333 17.9603 11.2064 18.3334 11.6667 18.3334H17.5C17.9602 18.3334 18.3333 17.9603 18.3333 17.5V11.6667C18.3333 11.2065 17.9602 10.8334 17.5 10.8334Z" fill="#202020"/>
    </svg>
)
const circleDollar=(
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_569_386)">
    <g clip-path="url(#clip1_569_386)">
    <path d="M11.6667 1.85145C11.1282 1.74226 10.5708 1.68494 10 1.68494C5.39763 1.68494 1.66667 5.4118 1.66667 10.0091C1.66667 14.6064 5.39763 18.3333 10 18.3333C14.6023 18.3333 18.3333 14.6064 18.3333 10.0091C18.3333 9.43904 18.2759 8.88221 18.1667 8.34429" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9.99999 7.51186C9.07949 7.51186 8.33333 8.07089 8.33333 8.76046C8.33333 9.45004 9.07949 10.0091 9.99999 10.0091C10.9205 10.0091 11.6667 10.5682 11.6667 11.2577C11.6667 11.9473 10.9205 12.5064 9.99999 12.5064M9.99999 7.51186C10.7257 7.51186 11.343 7.85932 11.5718 8.34429M9.99999 7.51186V6.67944M9.99999 12.5064C9.27433 12.5064 8.65699 12.159 8.42816 11.674M9.99999 12.5064V13.3388" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M18.3292 1.66663L14.8494 5.14464M14.1626 2.10095L14.2611 4.67436C14.2611 5.2809 14.6237 5.65881 15.2841 5.70648L17.8875 5.82872" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </g>
    <defs>
    <clipPath id="clip0_569_386">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    <clipPath id="clip1_569_386">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>

)

export const sidebarItems = [
    { text: "Dashboard", icon: dashboardIconSVG, link: "/dashboard" },
    { text: "Accounts", icon: circleDollar, link: "/accounts" },
    { text: "Bank Accounts", icon: circleDollar, link: "/bank-accounts" },
    { text: "Customer & Vendors", icon: circleDollar, link: "/customers-vendors" },
    { text: "Products & Services", icon: circleDollar, link: "/products-services" },
    { text: "Employee/Payroll", icon: circleDollar, link: "/employee-payroll" },
    { text: "Financial Statements", icon: circleDollar, link: "/financial-statements" },
    { text: "VATS", icon: circleDollar, link: "/vats" },
    { text: "Your Settings", icon: circleDollar, link: "/settings" },
    { text: "Help & Support", icon: circleDollar, link: "/help-support" }
];


export default function SideBar(){
    const path = usePathname()
    const isActive=(link:string)=>path.includes(link);
    return(
        <div className="flex flex-col gap-4 w-[300px]">
            <Logo className=' w-max py-[10px] px-[29px] !justify-start'/>
            <div className="border-t flex flex-col py-3 gap-6">
                {sidebarItems.map(item=>
                    <SideBarItem key={item.link} link={item.link} active={isActive(item.link)} title={item.text} icon={item.icon} chevron="right"/>)}
            </div>
            <div className="flex-1"/>
            <button className="p-1 my-[99px] border-light-text rounded-[12px] border-solid " >
                <span className="sign-out-shadow px-[11px] py-[9.5px]">Sign Out</span>
            </button>
        </div>
    )
}