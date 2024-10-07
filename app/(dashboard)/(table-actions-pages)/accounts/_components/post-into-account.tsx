import { Input, SuggestionsInput } from "@/components/inputs"
import Table from "@/components/table"
import { TableRow, AccountPosting, OptionType, TableFormatCellsType, InputsTableDataType } from "@/d.types"
import { useAccountHeaders, useSearchAccountHeaders } from "@/hooks"
import { createDispatch } from "@/utils"
import { forwardRef, useState, useImperativeHandle, useEffect, useMemo, ForwardedRef } from "react"


// const CellInput=()=>{
//   return(

//   )
// }

const PostIntoAccount = forwardRef(({},ref:ForwardedRef<InputsTableDataType|undefined>) =>{
  const [inputsTableData,setInputsTableData]=useState<InputsTableDataType>({})
  useImperativeHandle(ref,()=>inputsTableData)
  
  const addEmptyRow=()=>{
      setInputsTableData(prevTableData=>{
        const newRowId=Object.keys(prevTableData).length+1
        return { ...prevTableData,
          [newRowId]:{id:newRowId}
        }
      })
    }
  
    useEffect(()=>{
      for(let i=0;i<4;i++)
        addEmptyRow()
      },[1])

    const setTableCellData = (rowId:string|number,columeName:string,data:any)=>{
      setInputsTableData(prevTableData=>(
        {
          ...prevTableData,
          [rowId]:{
            ...prevTableData[rowId],
            [columeName]:data
          }}
      ))
    }
  
    const dataFields:(keyof AccountPosting)[] = ["date","debit","credit","description","credit"/**CHANGE LATER!!!!!! */,]

    const formatCells:TableFormatCellsType<any>=useMemo(()=>Object.fromEntries(dataFields.map(
        fieldname=>[fieldname, (currentValue:any,id:string|number)=>
          <Input 
            key={id+fieldname}
            defaultValue={currentValue}
            valueControls={[currentValue,createDispatch((value)=>setTableCellData(id,fieldname,value),currentValue)]}
            name={id+fieldname}
            type={
              (fieldname==='description')?
                "text":
              fieldname==="date"?
                "date":
              fieldname==="account_id"?
                "suggestion":"number"
            }
            placeholder={"-"}
            className={
              {input:"!border-none !w-full !h-full !bg-transparent pl-2"}
            }
            useSuggestions={fieldname==='account_id'?useSearchAccountHeaders:undefined}
          />
      ])),[inputsTableData])
    
    return(
      <div className="w-[610px]  border-inactive border-solid border flex  h-max rounded-lg"> 
          <Table
            fullCowling
            data={Object.values(inputsTableData)}
            fields={dataFields}
            formatCells={formatCells}
            
            classNames={{
              cell:'text-center !py-0',
              headerCell:'text-center',
              row:"rounded-lg",
              table:"rounded-lg"
            }}
            headings={['Period History', 'Debit','Credit' ,'Trans. Description', 'Running Balance'].map(val=><div className="text-nowrap">{val}</div>)}
          />
      </div>
    )
  })


  export default PostIntoAccount