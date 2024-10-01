

export default function ActivityLog(){

    const activities = [
        "New account ID added to expenses",
        "Generate records of expense",
        "New account ID added to expenses",
        "New document upload",
        "Update on cash for reserves",
        "Update on inflow",
        "New record added to cash",
        "New account ID added to expenses"
    ];
    
    return(
        <div className=" border rounded-lg py-[18px] px-2 w-[248px] " >
            <h6 className="text- pb-[14px]">Activity log</h6>
            <div className="flex flex-col gap-5">
                {activities.map(activity=>
                    <div className="log-item group h-[28px] w-full flex items-center">
                        <div className="mr-1 bg-purple-highlight h-full w-[2px] rounded-full"/>
                        <p className="border-b group-last:border-none border-solid px-1 text-[14px] text-baby-text">{activity}</p>
                    </div>
                )}
            </div>
        </div>
    )
}