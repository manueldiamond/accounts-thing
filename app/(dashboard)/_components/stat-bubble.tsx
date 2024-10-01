"use client"
import { SelectInput } from "@/components/inputs";
import { calenderIcon, circleMoneyFilled } from "@/svg"
import { OptionType } from "@/types";
import { useState } from "react";

const StatBubble=({icon=circleMoneyFilled, period='month', percent=25, increase = true, amt='', desc='',})=>{

    return(
        <div className="border px-[18px] py-[22px] min-w-[250px] rounded-[8px]">
            <div className="flex w-full justify-between">
                <span className="">{icon}</span>
                <p className="text-[13px]  flex centered">
                    <span className={`${increase?'text-gren':'text-red-500'}`}>{percent} {increase?'increase':'decrease'}</span>
                    {period&&<span className="ml-1">this {period.toLocaleLowerCase()}</span>}
                </p>
            </div>
            
            <p className="pt-3 pb-2 text-[23px] font-semibold text-dark">{amt}</p>
            <p className="text-20 text-[15px]" >{desc}</p>
        </div>
    )
}


export default function StatBubbles(){
    const [period,setPeriod] = useState('month')
    const periodOptions: OptionType[] = [
        { label: 'Daily', value: 'day' },
        { label: 'Weekly', value: 'week' },
        { label: 'Monthly', value: 'month' },
        { label: 'Yearly', value: 'year' }
    ];
    
    const financialData = [
        {
            percent: 25,
            increase: true,
            amt: '₦9,345,200.67',
            desc: 'Total money recorded'
        },
        {
            percent: 25,
            increase: false,
            amt: '₦2,045,200.27',
            desc: 'Cumulated Debit'
        },
        {
            percent: 25,
            increase: true,
            amt: '₦7,300,000.40',
            desc: 'Cumulated Credit'
        },
        {
            percent: 25,
            increase: true,
            amt: '107',
            desc: 'Outstanding Inputs'
        }
    ];
    

    return(
        <div>
            <div className="flex justify-end">
                <div className="py-1 px-2 gap-2 flex">
                    <SelectInput 
                        icon={
                            <span className="centered size-4 mr-1">{calenderIcon}</span>
                        }
                        name="select-month" 
                        defaultValue={period}
                        onChange={setPeriod}
                        options={periodOptions}                        
                    />
                </div>
            </div>
            <div className=" w-full flex gap-5 flex-wrap">
                {financialData.map(data=>
                    <StatBubble {...data} period={period} />
                )}
            </div>
        </div>
    )
}