import { time } from "console"
import { Dispatch, useMemo } from "react"

const home1IP="192.168.100.201"//depending on whether i'm at home or at the office(ITANDT)
const home2IP="192.168.7.2"//depending on whether i'm at home or at the office(ITANDT2)
const officeIP="192.168.2.159"

export const backend=`http://${officeIP}:8080`


export const formatTimestampFromBackend=(timestamp:string)=>new Date(timestamp).toLocaleDateString()

export const parseURL=(url = '', params?: Record<string, any>, origin?:string) => {
    const urlObj = new URL(url, origin||backend)
        if (params)
            Object.keys(params).forEach(key => params[key]&&urlObj.searchParams.set(key, params[key]))
        
    return urlObj
}
export const createDispatch = <T>(setterFunction:(val:T)=>any,currentValue:T):Dispatch<T>=>
(value:Function|any)=>setterFunction(
    typeof value==="function"?
    value(currentValue):
    value
)