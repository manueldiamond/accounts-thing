
"use client"

import { ReactChildren } from "@/types";
import ActionList, { ActionListProvider, useActionContext } from "./_components/actions-list";
import { useMemo } from "react";
import { filterIcon, searchIcon } from "@/svg";
import Table from "@/components/table";



const AccountsTable = () => {
    const {table} = useActionContext()
    
    return (
      <>
        <div className="centered gap-[6px] w-max px-9 py-4">
          <span className="size-5 flex">{filterIcon}</span>
          <input type="text" placeholder="Search by type/ID/Desc" className="p-2 bg-dark-white outline-none rounded-md" />
          <span className="size-5 flex">{searchIcon}</span>
        </div>
        
        <Table
          selectable
          {...table}
        />
      </>
    )
  }

export default function TableActionsLayout({children}:ReactChildren){
    return(
        <ActionListProvider>
            <main >
                <ActionList/>
                <AccountsTable/>
                {children}
            </main>
        </ActionListProvider>    
    )
}