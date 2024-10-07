"use client"
import Button from "@/components/button";
import { AccountHeader, AccountTypes, InputProps, InputsTableDataType, OptionType, ReactChildren, TableRow } from "@/d.types";
import PostIntoAccount from "./post-into-account";
import { Input } from "@/components/inputs";
import { fetchSWR, useObjectState, useSearchAccountHeaders } from "@/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import Modal from "@/components/modal";
import { parseURL } from "@/utils";
import DropDiv from "@/components/drop-div";

const addAccount = async (data: Object) => {
    
}
  

const inputs = [
  { name: "date", type: 'text', label: 'Date(Period):', required:"Required"},
  { name: "reference", type: 'text', label: 'Reference:',},
] as const satisfies InputProps[]


// const TimedDiv=({children,visible}:ReactChildren)=>{
  
//   return(

//   )
// }
const AddAccount = ({ close }: { close: () => void }) => {
    const postingDataRef=useRef<InputsTableDataType>()
    const isPostingData=useMemo(()=>
        !!postingDataRef.current&&
          Object.values(postingDataRef.current)
            .find((row)=>Object.values(row)
            .find(cell=>!!cell))
    ,[postingDataRef.current])

    const [error,setError]=useState("")
    
    useEffect(()=>{
      let t=null
      if(error){
        t = setTimeout(()=>setError(""),5000)
      }

      return ()=>{
        if(t) clearTimeout(t)
      };
    },[error])
    
    const { register, handleSubmit, setValue,formState:{errors} } = useForm<Record<typeof inputs[number]['name'],any>>()

    const submitForm = handleSubmit(async ({date,reference}) => {
      setError("")
 
      const res = await fetch(parseURL('api/accounts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
         {}
        )
      });

      if(!res.ok){
        const errMsg=await res.text()
        setError(errMsg);
        return;
      }
    
      mutate((key:string) =>{
        console.log(key)
        return key.includes('api/accounts')
      }, undefined, true)
      
      close()
      
    })

    useEffect(()=>console.log("YES"))
    
    return (
      <>
        <form onSubmit={(submitForm)}>
          <div className="flex flex-col gap-3 pb-4 mx-auto w-max">
            {inputs.map((input) =>
              <Input
                error={errors[input.name]}
                key={input.name}
                setValue={setValue}
                register={register}//(input.name,{required:input.name"All fields are required!!"})}
                className={{ 
                  label: 'text-right !text-[14px] w-[100px]', 
                  container: "flex !items-center !rounded-[4px]  !p-0 gap-4 !flex-row ", 
                  input: '!w-[254px] !py-2 h-full ' 
                }}
                {...input}
              />)}
          </div>
          <DropDiv opened={!!error} >
            <p  className="bg-red-200 centered w-full px-6 py-5 rounded-md text-sm text-red-950">
              {error}
            </p>
          </DropDiv>

          <PostIntoAccount 
            ref={postingDataRef}
            
          />
          <div className="flex justify-end w-full gap-3 mt-8">
            <Button onClick={close} noIcon type="ghost" >Canel</Button>
            <Button submit  noIcon type="primary">Save</Button>
          </div>
        </form>
      </>
    )
}

  export default AddAccount;
