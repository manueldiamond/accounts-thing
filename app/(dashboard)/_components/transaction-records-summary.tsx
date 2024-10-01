import Button from "@/components/button"
import { SelectInput } from "@/components/inputs"
import Table from "@/components/table"


const accounts = [
    {
        id: "001",
        description: "Main Checking Account",
        balanceSheetType: "Asset",
        accountType: "Checking",
        date: "2024-09-27",
    },
    {
        id: "002",
        description: "Savings Account",
        balanceSheetType: "Asset",
        accountType: "Savings",
        date: "2024-09-26",
    },
    {
        id: "003",
        description: "Credit Card",
        balanceSheetType: "Liability",
        accountType: "Credit",
        date: "2024-09-25",
    },
    {
        id: "004",
        description: "Mortgage Loan",
        balanceSheetType: "Liability",
        accountType: "Loan",
        date: "2024-09-24",
    },
];

const TransactionRecordsSummary=()=>{

    return(
        <div className="border  rounded-lg ">
            <div className="px-4 flex justify-between py-4">
                <h6>Transactions Records (Summary)</h6>
                <SelectInput className={'!py-1'} name="period" options={["Today", "This Week", "This Month", "This Year",]} />
            </div>
            <div className="px-4 flex justify-between pb-4">
                <Button  type="ghost" noIcon size="md">Review Transaction History</Button>
                <div className='flex gap-4'>
                    <Button  type="ghost" noIcon size="md">Edit Record</Button>
                    <Button type="primary" icons={'plus'} rightIcon size="md">Add Report</Button>
                </div>
            </div>
            <Table selectable data={accounts} headings={["Account ID", "Description", "Balance Sheet Type", "Account Type", "Date"]} />
            
        </div>
    )
}

export default TransactionRecordsSummary