import React, { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import useSWR from "swr"
import { backend, parseURL } from "./utils"
import { AccountHeader, ExternalState, suggestionsHookType } from "./d.types"

export const useExternalState=<T>(externalStateValue:ExternalState<T>|undefined,stateValue:T)=>
    externalStateValue||useState(stateValue)

export const useObjectState=<k extends string,v>(obj:Record<k,v>)=>{
    type T = Record<k,v>
    const [state,setState]=useState(obj)
    const editState=useMemo(()=>
        (changes:Partial<T>|((current:T)=>Partial<T>))=>
            setState(prevState=>({
                    ...prevState,
                    ...(typeof changes==='function'?(changes as (current:T)=>T)(prevState):changes)
                })
            )
    ,[setState])
    
    // Example: Updating state with a new value
    // editState({ name: 'Updated Name' });
    
    return [state, editState] as [T,typeof editState]
}


export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };
  
export const useDebouncedState=<T>(value:T,delay:number):[T,React.Dispatch<T>,T]=>{
    const [stateValue,setStateValue] = useState(value)
    const deValue = useDebounce(stateValue,delay)
    return [stateValue,setStateValue,deValue]
} 

export const useClickOut=(onOutClickFunction:Function,deps:any[]|boolean,ref?:RefObject<any>)=>{
    const maindiv = ref??useRef<any>(null)
    const handleClickOutside = (event: any) => {
        if (maindiv.current && !maindiv.current.contains(event.target))
            onOutClickFunction();
        // console.log('CLICK from,', maindiv.current)
    };

    useEffect(() => {
        if (( typeof deps==='boolean'&&!deps)||!maindiv.current)
            return document.removeEventListener("mousedown", handleClickOutside);

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, typeof deps==='boolean'?[deps]:deps);

    return maindiv
}

// export const useRegSectionPage=(section:RegSectionLink)=>{
//     const pageLinks=useMemo(
//         ()=>{
//             const currentPageID=regsections.findIndex(({link})=>link===section)
//             const prevPage=currentPageID>0&&baseRegURL+regsections[currentPageID-1].link
//             const nextPage=(currentPageID<(regsections.length-1))&&baseRegURL+regsections[currentPageID+1].link
//             return {prevPage,currentPageID,nextPage}
//     },[])
    
//     const prevPageID=pageLinks.currentPageID>0?(pageLinks.currentPageID-1):(pageLinks.currentPageID)
//     const data=useRegistrationData()
//     const prevSectionData=prevPageID>=0&&data&&data[regsections[prevPageID].link]
//     const router = useRouter()
    
//     if(data&&prevPageID!==pageLinks.currentPageID&&!prevSectionData)
//         router.replace(baseRegURL)


//     return pageLinks;
// }



const fetcher = (url:string) => axios.get(url).then(res => res.data).catch((e:AxiosError)=>Promise.reject(e.message));

export const fetchSWR = (url = '', params?: Record<string, any>, origin?:string) => {
    const urlObj=useMemo(()=>parseURL(url,params,origin),[url,params,origin])
    return useSWR(urlObj.href, fetcher)
}


export const useAccountHeaders=()=>{
    const {data,error,isLoading} = fetchSWR("api/accounts");
    
    return {
      data:data as AccountHeader[]|undefined,
      error:error as string
    }
  }

export const useSearchAccountHeaders:suggestionsHookType=(search)=>{
    const {data,error} = useAccountHeaders(); //fetchSWR("api/accounts/search");

    const options = useMemo(()=>
        !data?[
            {label:"Goood",value:1000},
            {label:"Foood",value:2000},
            {label:"Poood",value:4000},
            {label:"Stoood",value:5000},
        ]:(!search?data:data.filter(({id})=>String(id).includes(search))).map(
        (accountHeader)=>({
            label:accountHeader.description,
            value:accountHeader.id
        })
    )
    ,[data,search])
      
    return options
}