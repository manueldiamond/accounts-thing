"use client"

import Modal from "@/components/modal";
import { AccountHeader, AccountTypes, InputProps } from "@/d.types";
import { fetchSWR, useAccountHeaders, useSearchAccountHeaders } from "@/hooks";
import { formatTimestampFromBackend } from "@/utils";
import { useEffect } from "react";
import { SelectedAction, useActionContext } from "../_components/actions-list";
import AddAccount from "./_components/add-account";

  
const ModalData={
  "New":{
    heading:"Add New Account",
    component:AddAccount
  
  },
  "Add Existing":{
    heading:"Add Existing Account",
    component:AddAccount

  }
} satisfies Partial<Record<SelectedAction,any>>

export default function Home() {
  const  {setupTable,selectedAction,clearSelectedAction} = useActionContext()
  const {data,error} = useAccountHeaders()
 
  useEffect(()=>{
      setupTable({
        errored:error,
        headings:[
          "ID",
          "Description",
          "AccountType",
          <div key={"account-status?"} className="text-center w-full">Status</div>,
          "Date"],
        data:data,
        formatCells:{
          "id":(value)=>(value+"").padStart(4,"0"),
          "datecreated":formatTimestampFromBackend,
          status:(status)=>
              <div className={`px-3 py-[9px] rounded-xl w-max mx-auto ${status === 'Active' ? "bg-purple-highlight text-white" : "text-head bg-light-texts"} `}>
                {status}
            </div>},
        fields:['id','description','type',"status",'datecreated']as (keyof AccountHeader)[],
      })
  },[data,error])
  
  let modalData = null
  if(Object.keys(ModalData).includes(selectedAction as any) )
    modalData=ModalData[selectedAction as keyof typeof ModalData]
  return (
    <>
      <Modal 
        open={!!modalData}
        setOpen={clearSelectedAction} 
        heading={modalData?.heading}>
          <AddAccount close={close}/>
      </Modal>
    </>
  );
}

