import { TableRowProps, BillingTableProps } from "@/types"
import Avatar from "./avatar"
import Button from "./button"

export const TableRow=({patientImg,patientName,EMRcode,department,bill,outstanding,condition,Category}:TableRowProps)=>{
    const columns={patient:{img:patientImg,name:patientName},department,EMRcode,bill,outstanding,condition,Category}
    return(
      <tr className="text-sm text-para font-normal border-b border-solid  h-[52px]">
        {Object.keys(columns).map(key=>{
          const columnName=key as keyof typeof columns
          const value = columns[columnName]
          return(
            
            <td className="pr-10" key={columnName}>
              <div className='flex gap-2 items-center'>
              {
                columnName==='patient'?
                  <>
                    <Avatar img={columns.patient.img} size='sm'/>
                    <span>{columns.patient.name}</span>
                  </>
                :columnName==='outstanding'?
                  <span className={` px-[6px] py-[2px] ${value?"rounded-md bg-error/15 text-error ":''}`}>{Number(value)>0?value as number:'No'} Outstanding bill{Number(value)>1?'s':''}</span>
                :columnName==='condition'?
                  <div className={`
                    status
                    flex gap-2
                   
                    ${value}
                  `}>
                    <span className= 'icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </span>
                    <span>{value as string}</span>
                  </div>
                :<span>{value as string}</span>
              }
              </div>
            </td>
          )
        })}
      </tr>
    )
  }
  const BillingTable=({rows}:BillingTableProps)=>{
    const headings=[
      'Patient full name',
      'Heading Department',
      'EMR Code',
      'Billing amount',
      'Previous bill notice',
      'Condition',
      'Category'
    ]
  
    const TableHeading='Incoming Billing Patients'
    
    return(
      <div className="flex flex-col w-full">
        <div className="flex gap-3">
          <h6 className="flex-1 text-dark font-medium text-base">{TableHeading}</h6>
          <Button size="md" icons='plus' leftIcon type="ghost">
            <input className="bg-transparent select-none" placeholder="Search"/>
          </Button>
          <Button size="md" icons='plus' leftIcon type="ghost">
            Sort By Category
          </Button>
          <Button size="md" icons='plus' leftIcon type="ghost">
            Filter
          </Button>
        </div>
        <table>
          <tr className="text-left h-[52px] font-400 border-solid border-b items-center  text-grey ">
            {headings.map(heading=>
              <th key={heading}>{heading}</th>
              )}
          </tr>
          {rows.map(rowData=><TableRow key={rowData.EMRcode} {...rowData}/>)}
        </table>
      </div>
    )
  }

export default BillingTable