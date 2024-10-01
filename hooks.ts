import { RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import useSWR from "swr"

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




const fetcher = (url:string) => axios.get(url).then(res => res.data);

export const fetchSWR = (url = '',params?: Record<string, any>) => {
    const urlObj = new URL(url, 'localhost:8080')
    if (params)
      Object.keys(params).forEach(key => params[key]&&urlObj.searchParams.set(key, params[key]))
    return useSWR(urlObj.href, fetcher)
}
