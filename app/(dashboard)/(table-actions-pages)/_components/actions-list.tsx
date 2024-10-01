"use client"
import { plusFolderIcon, plusDocumentIcon, editIcon, duplicateIcon, emailIcon, printIcon, tagIcon, deleteIcon } from "@/svg";
import { TableProps } from "@/types";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type SelectedAction = 
  | 'New'
  | 'Add Existing'
  | 'Edit'
  | 'Duplicate'
  | 'Email'
  | 'Print'
  | 'Labels'
  | 'Delete'
  | null;


interface ActionListContextType {
  selectedAction: SelectedAction;
  setSelectedAction: (action: SelectedAction) => void;
  clearSelectedAction: () => void;
  table:TableProps<any>;
  setupTable:((props:TableProps<any>)=>void);
}

// Create the context
const ActionListContext = createContext<ActionListContextType | undefined>(undefined);

// Create a provider component
export const ActionListProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
  const [table,setupTable] = useState<TableProps<any>>({data:[],headings:[],})

  const clearSelectedAction = () => setSelectedAction(null);
  const path = usePathname()
  
  useEffect(()=>{
    clearSelectedAction()
  },[path])
  return (
    <ActionListContext.Provider value={{table,setupTable, selectedAction, setSelectedAction, clearSelectedAction }}>
      {children}
    </ActionListContext.Provider>
  );
};

export const useActionContext = (): ActionListContextType => {
  const context = useContext(ActionListContext);
  if (!context) {
    throw new Error('useActionContext must be used within an ActionProvider');
  }
  return context;
};


interface ActionItem {
  text: string;
  icon: React.JSX.Element;
}

const ActionList = () => {
 
  const actionSet1: ActionItem[] = [
    { text: 'New', icon: plusFolderIcon },
    { text: 'Add Existing', icon: plusDocumentIcon },
    { text: 'Edit', icon: editIcon },
    { text: 'Duplicate', icon: duplicateIcon },
  ];

  const actionSet2: ActionItem[] = [
    { text: 'Email', icon: emailIcon },
    { text: 'Print', icon: printIcon },
  ];

  const actionSet3: ActionItem[] = [
    { text: 'Labels', icon: tagIcon },
    { text: 'Delete', icon: deleteIcon },
  ];
  
  const allActions = [actionSet1, actionSet2, actionSet3]
  const {setSelectedAction,selectedAction,table}=useActionContext()
  return (
    <div className="flex">
    {allActions.map((actionset,i) => (
        <div key={i} className="  border-light px-3.5 centered border-t-0 border-b last:rounded-br-xl last:rounded-tr-xl border-r">
        {actionset.map(({ icon, text }) => (
            <button key={text} className={` px-3.5 h-full py-4 rounded-lg cursor-pointer centered max-w-[64px] gap-1.5 flex flex-col ${selectedAction===text?'bg-light-texts ':'hover:bg-light '}`} onClick={()=>setSelectedAction(text as SelectedAction)}>
              <span className="centered size-6 ">{icon}</span>
              {text}
            </button>))}
        </div>))}
        
    </div>
  );
};

export default ActionList;
