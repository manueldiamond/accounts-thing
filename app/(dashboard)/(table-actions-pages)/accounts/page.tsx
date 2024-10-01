"use client"

import Button from "@/components/button";
import { Input } from "@/components/inputs";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { fetchSWR } from "@/hooks";
import { deleteIcon, duplicateIcon, editIcon, emailIcon, filterIcon, plusDocumentIcon, plusFolderIcon, printIcon, searchIcon, tagIcon } from "@/svg";
import { InputProps } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ActionList, { ActionListProvider, useActionContext } from "../_components/actions-list";

const addAccount = async (data: Object) => {
  await fetch('/api/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

const AddAccount = ({ close }: { close: () => void }) => {
  const inputs: InputProps[] = [
    { name: "id", type: 'number', label: 'Account ID:' },
    { name: "account-description", type: 'text', label: 'Description:' },
    { name: "account-type", type: 'option', label: 'Account Type:', options: ["Type 1", "Type 2"] },
  ]

  const { register, handleSubmit, setValue } = useForm()
  const submitForm = async (data: any) => {
    addAccount(data)
  }

  const data = [
    {
      id: 1,
      periodHistory: "07-09-2024",
      debit: "N234,000",
      credit: "N234,000",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 2,
      periodHistory: "08-09-2024",
      debit: "-",
      credit: "-",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 3,
      periodHistory: "09-09-2024",
      debit: "N234,000",
      credit: "N234,000",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 4,
      periodHistory: "10-09-2024",
      debit: "-",
      credit: "-",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 5,
      periodHistory: "11-09-2024",
      debit: "-",
      credit: "-",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 6,
      periodHistory: "12-09-2024",
      debit: "-",
      credit: "-",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 7,
      periodHistory: "13-09-2024",
      debit: "N234,000",
      credit: "N234,000",
      periodActivity: "-",
      runningBalance: "-",
    },
    {
      id: 8,
      periodHistory: "14-09-2024",
      debit: "-",
      credit: "-",
      periodActivity: "-",
      runningBalance: "-",
    },
  ];
  
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex flex-col gap-3 pb-4 mx-auto w-max">
        {inputs.map((input) =>
          <Input
            onChange={(val) => setValue(input.name, val)}
            hook={register(input.name)}
            className={{ 
              label: 'text-right !text-[14px] w-[100px]', 
              container: "flex !items-center !rounded-[4px]  !p-0 gap-4 !flex-row ", 
              input: '!w-[254px] !py-2 h-full ' 
            }}
            {...input}
          />)}
      </div>
      <div className="w-[610px] border-inactive border-solid border flex overflow-hidden h-max rounded-lg"> 
        <Table
          fullCowling
          data={data}
          fields={[
            'periodHistory',
            'debit',
            'credit',
            'periodActivity',
            'runningBalance'
          ]}
          classNames={{
            cell:'text-center !py-2',
            headerCell:'text-center'
          }}
          headings={['Period History', 'Debit', 'Credit', 'Period activity', 'Running Balance']}
          
        />
      </div>
      <div className="flex justify-end w-full gap-3 mt-8">
        <Button onClick={close} noIcon type="ghost" >Canel</Button>
        <Button submit noIcon type="primary">Save</Button>
      </div>
    </form>
  )
}

const AddAcctRecord = () => {
  const inputs1: InputProps[] = [
    {
      name: "acctId",
      type: 'number',
      label: 'Account id',
      placeholder: ''
    },
    {
      name: "balType",
      type: 'option',
      label: 'Balance Type',
      options: ["BalanceType1", "BalanceType2"],
    },
    {
      name: "acctStatus",
      type: 'option',
      label: 'Account Status',
      options: ["AccountStatus1", "AccountStatus2"],
    },]
  const inputs2 = [
    {
      name: "acctRef",
      type: 'text',
      label: 'Account Reference',
      placeholder: ''
    },
    {
      name: "defaultAcct",
      type: 'text',
      label: 'Default Account',
      placeholder: ''
    },
    {
      name: "taxCode",
      type: 'option',
      label: 'Tax Code',
      options: ["TaxCode1", "TaxCode2"],
    }
  ];
  const { register, handleSubmit, setValue } = useForm<{

  }>()
  const onSubmit = () => {

  }
  return (
    <>
      <div className="fixed top-0 left-0 bg-[#6D6D6D73] overflow-scroll  w-full h-full " />
      <div className="fixed top-0 left-0 w-screen h-screen px-[2rem] py-[5rem] ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <h3 className="text-2xl">Add a new account</h3>
            <p className="text-sm">Input all necessary information and data</p>
          </div>
          <div className=" flex flex-col gap-5 w-full">
            {[inputs1, inputs2].map(
              inputs => (
                <div className="flex gap-[65px] ">
                  {inputs.map(input => <Input className={"w-full min-w-[146px]"} {...input} />)}
                </div>
              )
            )}
            <div className="flex w-full gap-[65px]">
              <div className="flex-[2_0_0]">
                <Input className={"w-full"} label="Date" type='date' name="date" />
                <Input className={"w-full"} type='text' placeholder='' label="Account Description" name="AccountDescription" />
              </div>

              <Input className={{
                input: "flex-1 min-w-[146px]",
              }}
                label="Notes"
                name="notes" type="textarea" />

            </div>
          </div>
          <div className="-mr-10 flex w-full justify-end gap-9">
            <Button submit type="ghost" size="md" noIcon>Cancel</Button>
            <Button type="primary" size="md" noIcon>Save</Button>
          </div>
        </form>
      </div>
    </>
  )
}

const acctdata = [
  {
    "id": "001",
    "Description": "Main Checking Account",
    "Account Type": "Checking",
    "Status": "Active",
    "Date": "2023-09-01"
  },
  {
    "id": "002",
    "Description": "Savings Account",
    "Account Type": "Savings",
    "Status": "Inactive",
    "Date": "2023-08-15"
  },
  {
    "id": "003",
    "Description": "Business Account",
    "Account Type": "Business",
    "Status": "Active",
    "Date": "2023-07-30"
  },
  {
    "id": "004",
    "Description": "Investment Account",
    "Account Type": "Investment",
    "Status": "Closed",
    "Date": "2023-06-10"
  },
  {
    "id": "005",
    "Description": "Retirement Account",
    "Account Type": "Retirement",
    "Status": "Active",
    "Date": "2023-05-22"
  }
]


const AccountsTable = () => {
  const prettifiedData = acctdata.map(({ Status, ...data }) => (
    {
      ...data,
      "Status": <div className={`px-3 py-[9px] rounded-xl w-max mx-auto ${Status === 'Active' ? "bg-purple-highlight text-white" : "text-head bg-light-texts"} `}>{Status}</div>
    }
  ))
  return (
    <>
      <div className="centered gap-[6px] w-max px-9 py-4">
        <span className="size-5 flex">{filterIcon}</span>
        <input type="text" placeholder="Search by type/ID/Desc" className="p-2 bg-dark-white outline-none rounded-md" />
        <span className="size-5 flex">{searchIcon}</span>
      </div>
      <Table
        selectable
        headings={[
          "ID",
          "Description",
          "AccountType",
          <div className="text-center w-full">Status</div>,
          "Date"]}
        data={prettifiedData}
        fields={['id', "Description", "Account Type", "Status", "Date",]}
      />
    </>
  )
}


export default function Home() {
  const  {setupTable,selectedAction,clearSelectedAction} = useActionContext()
  useEffect(()=>{
    setupTable({
      headings:[
        "ID",
        "Description",
        "AccountType",
        <div className="text-center w-full">Status</div>,
        "Date"],
      data:acctdata.map(({Status:status,...data})=>({...data,"status": <div className={`px-3 py-[9px] rounded-xl w-max mx-auto ${status === 'Active' ? "bg-purple-highlight text-white" : "text-head bg-light-texts"} `}>{status}</div>})),

      fields:['id', "Description", "Account Type", "status", "Date",],
    
    })
  },[])
 
  return (
    < >
      <Modal open={selectedAction==='New'} setOpen={clearSelectedAction} heading="Add a new Account">
        <AddAccount close={clearSelectedAction} />
      </Modal>
    </>
  );
}

