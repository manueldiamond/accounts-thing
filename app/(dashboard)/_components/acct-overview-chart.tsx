"use client"

import Button from "@/components/button"
import { verticalDotsIcon } from "@/svg"
import { Bar, BarChart, CartesianAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AccountOverviewChart(){

    const data = [
        { month: 'Jan', credit: 160000, debit: 100000 },
        { month: 'Feb', credit: 120000, debit: 140000 },
        { month: 'Mar', credit: 200000, debit: 80000 },
        { month: 'Apr', credit: 220000, debit: 100000 },
        { month: 'May', credit: 180000, debit: 140000 },
        { month: 'Jun', credit: 220000, debit: 100000 },
      ]
      
    const formatCurrency = (value: number) => {
        if (value < 1000) {
            return `₦${value.toFixed(0)}`; // For values less than 1,000
        } else if (value < 1_000_000) {
            return `₦${(value / 1000).toFixed(0)}k`; // For thousands
        } else if (value < 1_000_000_000) {
            return `₦${(value / 1_000_000).toFixed(0)}M`; // For millions
        } else {
            return `₦${(value / 1_000_000_000).toFixed(0)}B`; // For billions
        }
    };
  
    const totalCredit = data.reduce((sum, item) => sum + item.credit, 0)
    const totalDebit = data.reduce((sum, item) => sum + item.debit, 0)
    const totalMoney = totalCredit + totalDebit
    
    const summary=[
        {text:"Total Money Recorded", amt:totalMoney},
        {text:"Debit(money in)", amt:totalDebit},
        {text:"Credit (money out)", amt:totalCredit},
    ]
    return(
        <div className="border flex-1 rounded-lg flex flex-col py-[21px] px-[10px] ">
            <div className="flex justify-between px-[14px]">
                <h6 className="text-head font-semibold text-[19px]">Company Account Overview</h6>
                <div className="flex gap-6 centered !justify-between">
                    <Button type="ghost" noIcon size="sm" onClick={()=>'print-chart'}>Download</Button>
                    <span className="flex centered w-[3px] h-[11px]">
                        {verticalDotsIcon}
                    </span>
                </div>
            </div>
            <div className="flex flex-1 justify-between ">
                <div className="flex-1 w-[500px] relative">
                    <div style={{
                        gridTemplateRows:data.length
                    }} className="absolute top-0 left-0 grid grid-cols-1"></div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            // stackOffset="silhouette" 
                            barGap={'20%'}
                            
                            // barCategoryGap={20}
                        >
                            <XAxis dataKey="month" />
                            <YAxis domain={[0,400000]} tickFormatter={formatCurrency} />
                            <Tooltip formatter={(value:number) => formatCurrency(value)} />
                            
                            <Bar  y={20} dataKey="debit" radius={5} stackId='a' fill="var(--light-purple)"/>
                            <Bar dataKey="credit"  radius={5} stackId="a" fill="var(--baby-text)" />
                        </BarChart>
                    </ResponsiveContainer> 
                </div>
                <summary className="flex flex-col py-[52.5px] h-full gap-6 justify-between">
                    {summary.map(({text,amt},i)=>
                    <div className="text-head" key={text}>
                        <div className="text-lg w-full !justify-start centered flex">
                            <div className={`aspect-square h-[11px] w-[11px] ${text.includes('out')?'text-baby-text':text.includes('in')?'text-light-purple':'hidden'} bg-current mr-1`} />
                            <p>{text}</p>
                        </div>
                        <h6 className="pt-[6px] font-medium text-[22px]" >{formatCurrency(amt)}</h6>
                    </div>)}
                </summary>
            </div>
        </div>
    )
}