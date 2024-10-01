"use client"

import Button from "@/components/button";
import { Input, SelectInput } from "@/components/inputs";
import Modal from "@/components/modal";
import Table from "@/components/table";
import { fetchSWR } from "@/hooks";
import { deleteIcon, duplicateIcon, editIcon, emailIcon, filterIcon, plusDocumentIcon, plusFolderIcon, plusIcon, printIcon, searchIcon, tagIcon } from "@/svg";
import { InputProps } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionContext } from "../_components/actions-list";
import {motion} from 'framer-motion'
import CloseButton from "@/components/close-button";


const addAccount = async (data: Object) => {
  await fetch('/api/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

type AccountStatus = 'Active' | 'Inactive';

interface BankAccount {
  id: string; // unique identifier
  bank: string;
  accountName: string;
  accountType: string;
  status: AccountStatus;
  balance: string;
}

const bankAccounts: BankAccount[] = [
  {
    id: '1',
    bank: 'United Bank of Africa',
    accountName: 'MTN Bank Accounts',
    accountType: 'Savings',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '2',
    bank: 'Wema Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Joint',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '3',
    bank: 'First Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Domiciliary',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '4',
    bank: 'Guaranty Trust Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Current',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '5',
    bank: 'Access Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Corporate',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '6',
    bank: 'Polaris Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Fixed-Deposit',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '7',
    bank: 'Zenith Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Corporate',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '8',
    bank: 'Union Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Domiciliary',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
  {
    id: '9',
    bank: 'Sterling Bank',
    accountName: 'MTN Bank Accounts',
    accountType: 'Current',
    status: 'Active',
    balance: '₦2,045,200.27',
  },
];


export default function Page() {
  const  {setupTable,selectedAction,clearSelectedAction} = useActionContext()
  
  useEffect(()=>{
    setupTable({
      headings:[
        "Bank",
        "Account Name",
        "Account Type",
        <div key={"Acct-Staus"} className="text-center w-full">Status</div>,
        "Balance"],
      data:bankAccounts.map(
          ({status,...data})=>(
            { ...data,
              "status": 
                <div key={data.id+'-status'} className={`px-3 py-[9px] rounded-xl w-max mx-auto ${status === 'Active' ? "bg-purple-highlight text-white" : "text-head bg-light-texts"} `}
                >
                  {status}
                </div>
            })),
      
      fields:['bank', "accountName", "accountType", "status", "balance",],
    
    })
  },[])
  return (
    <>
      <AddAccount open={selectedAction==="New"} close={clearSelectedAction}/>
    </>
  );
}



const AddAccount = ({ open, close }: { open: boolean; close: Function }) => {
  const [bank, setBank] = useState('');
  const [selectedCountry, setCountry] = useState('Nigeria');

  const countries = ["Nigeria", "Ghana", "Togo", "Ethiopia", "Niger"];

  // Updated bankArray to have objects with name, abbreviation, and id
  const bankArray = {
    Nigeria: [
      { id: 1, name: "United Bank of Africa", abbr: "UBA" },
      { id: 2, name: "Zenith Bank", abbr: "ZB" },
      { id: 3, name: "Access Bank", abbr: "AB" },
      { id: 4, name: "Wema Bank", abbr: "WB" }
    ],
    Ghana: [
      { id: 5, name: "Ghana Commercial Bank", abbr: "GCB" },
      { id: 6, name: "Ecobank Ghana", abbr: "EG" },
      { id: 7, name: "Standard Chartered Bank Ghana", abbr: "SCB" }
    ],
    // Add more countries and their banks as needed
  };

  const inputs: InputProps[] = [
    { name: "account-name", type: 'text', label: 'Account Name:' },
    { name: "account-type", type: 'option', label: 'Account Type:', options: ["Type 1", "Type 2"] },
    { name: "acctid", type: 'number', label: 'Account Number:' },
  ];

  const { register, handleSubmit, setValue } = useForm();
  
  const submitForm = async (data: any) => {
    addAccount(data);
  };

  // Custom reset function to close modal and reset states
  const reset = () => {
    setBank('');
    setCountry('Nigeria');
    close();
  };

  return (
    <Modal centerHeading empty={!bank} open={open} heading={`Enter your ${bank} bank account details`} setOpen={reset}>
      {!bank ? (
        <div className="flex flex-col items-center gap-6 ">
          <div className="w-full  shadow-md bg-white relative rounded-xl pt-[28px] pb-[26px] px-6">
            <div className="absolute top-[13px] right-[24px]">
              <CloseButton onClick={reset as any} />
            </div>
            <h2 className="text-[17.2px] font-medium pb-2 text-center w-full">Find a bank account</h2>
            <p className="pb-[28px] w-full text-center text-sm text-para">Search for your bank in order to connect to Rooni</p>
            <div className="mb-[9px] rounded-md px-6 py-[10px] bg-dark-white text-para flex gap-2  mx-[49px] items-center ">
              <span className="centered size-5">{searchIcon}</span>
              <input className="h-full w-full bg-transparent" placeholder="Search for Bank account " />
            </div>
            <div className="flex gap-7 w-max mx-auto">
              {countries.map(country => (
                <button
                  key={country}
                  onClick={() => setCountry(country)}
                  className="p-1 flex text-sm text-para bg-dark-white hover:bg-light-texts transition-all rounded-lg"
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div className="shadow-md bg-white rounded-xl">
            <p className="font-medium border-b px-4 py-[14.5px]">Popular banks in {selectedCountry}</p>
            {bankArray[selectedCountry as keyof typeof bankArray]?.map(bank => (
              <button
                key={bank.id}
                className="w-full px-4 py-[14.5px] last:border-none border-b"
                onClick={() => setBank(bank.abbr)} // Set the abbreviation of the selected bank
              >
                {bank.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p className=" w-full text-center pb-[33px] text-sm text-para">Input the correct details needed to add your bank account</p>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-3 pb-4 mx-auto w-max">
              <Input
                name="acctname"
                label="Account Name:"
                hook={register('acctname')}
                className={{
                  label: 'whitespace-nowrap text-right !text-[14px] w-full max-w-[100px]',
                  container: "flex !items-center !rounded-[4px]  !p-0 gap-4 !flex-row ",
                  input: 'w-full !py-2 h-full '
                }}
                type="text"
              />
              <Input
                name="accttype"
                label="Account Type:"
                hook={register('accttype')}
                className={{
                  label: 'whitespace-nowrap text-right !text-[14px] w-full max-w-[100px]',
                  container: " flex !items-center !rounded-[4px]  !p-0 gap-4 !flex-row ",
                  input: 'w-full !py-2 h-full '
                }}
                type="option"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
              />
              <div className={`flex gap-[19px] w-full`}>
                <Input
                  name="acctno"
                  label="Account Number:"
                  hook={register('acctno')}
                  className={{
                    label: 'whitespace-nowrap text-right !text-[14px] w-[100px]',
                    container: "flex !items-center !rounded-[4px]  !p-0 gap-4 !flex-row ",
                    input: 'w-full !py-2  h-full '
                  }}
                  type="text"
                />
                <SelectInput className={{ input: "h-full !py-2" }} options={["Code 1", "Code 2", "Code 3"]} name="code" onChange={(val) => setValue('code', val)} />
              </div>
            </div>
            <div className="flex justify-end w-full gap-3 mt-8">
              <Button onClick={reset as any} noIcon type="ghost">Back</Button>
              <Button submit noIcon type="primary">Proceed</Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};
