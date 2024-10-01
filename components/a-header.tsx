import Image from "next/image";
import CloseButton from "./close-button";


export default function HeaderClose(){
    return(
        <div className="border-solid  border-b-black/5 border-b w-full">
            <div className="mx-auto container flex justify-between h-[75px] items-center">
                <Image className=" logo object-contain h-[40px]" src='/logo.svg' width={200} height={40} alt="HMS logo"/>
                <div className="right-side">
                    <CloseButton onClick={a=>a}/>
                </div>
            </div>    
        </div>
    )
}