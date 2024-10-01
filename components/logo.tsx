import { logoIcon } from "@/svg";

export default function Logo({className=''}) {
    return (
    <div className={`text-[20px] font-extrabold flex items-center gap-[10px] ${className}`}>
        {logoIcon}
        Rooni
    </div>)
}


