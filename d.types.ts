import exp from "constants";
import { title } from "process";
import React, { Dispatch, HTMLInputTypeAttribute } from "react";

export type Priorities='Mild' | 'Severe' | 'Normal';


export type ReactChildren={
    children?:React.ReactNode;
}
export type ExternalState<T>=[T,Dispatch<T>]

export type AvatarSizes = 'xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export const avatarSizeMap: Record<AvatarSizes,number> = {
  xs: 20,
  sm: 24,
  md: 36,
  lg: 40,
  xl: 48,
  '2xl': 56,
  '3xl': 72,
  '4xl': 80,
};
export type AvatarProps={

  /**
   * * xs: 20px,
   * * sm: 24px,
   * * md: 36px,
   * * lg: 40px,
   * * xl: 48px,
   * * 2xl: 56px,
   * * 3xl: 72px,
   * * 4xl: 80px,
   */
    size:AvatarSizes
    
    /** path to the avatar image */
    img?:string;
}


/**correspond to css classess .btn.xs,.btn.sm ... and the like**/
type Sizes=|'xs'|'sm'|'md'|'lg'|'xl'

export type ButtonProps = {
  children?: React.ReactNode;

  /**
   * Function to be called when the button is clicked.
   */
  onClick?: (e?: any) => any|void;

  /**
   * Can be 'plus', 'check'
   * * OR: a custom element;icon={<div ./>..}
   */
  icons?: 'plus' | 'check' | React.JSX.Element;

  /**
   * If true, show the left icon
   */
  leftIcon?: boolean;

  /**
   * If true, show the right icon
   */
  rightIcon?: boolean;

  /**
   * removes all icons
   */
  noIcon?: boolean;

  /**
   * If true, both left and right icons will be displayed
   */
  both?: boolean;

  /**
   * The style type of the button, 'primary' or 'ghost'.
   */
  type?: 'primary' | 'ghost';

  /**
   * Size of the button, defined in the Sizes type.
   */
  size?: Sizes;
  disabled?:boolean;
  rounded?:boolean;
  submit?:boolean;
};


export type Roles = |'Doctor'|'Nurse'
export const Titles:Record<Roles,string>= {
  'Doctor':'MBBS',
  'Nurse':'NS'
}

export type NotificationType={
  text:string;
  priority:Priorities;
}
export type GreetingsSectionProps=
{
  name:string,
  image:string,
  role:Roles,
  notification:NotificationType;
}
export type StatsProps={
  icon?:string|React.JSX.Element;
  title:string
  amt:number|string,
  percent:number,
}

export type OptionType=
  |string
  |{
    'value':any;
    'label':any;
    [x:string]:any
  }

export type suggestionsHookType=(inputValue:string)=>OptionType[]
export type InputProps={
  required?:boolean|string;
  name:string
  placeholder?:any
  label?:string;

  type:HTMLInputTypeAttribute|'textarea'|'option'|'radio'|'suggestions';
  options?:OptionType[],
  useSuggestions?:suggestionsHookType,

  numbers?:boolean,
  customOption?: (option: OptionType) => React.ReactNode;

}

export type InputsTableDataType = Record<string|number,TableRow>

export type TableRow = { 
  id: string | number;
  [key: string]: string | number | React.JSX.Element;
};

export type TableFormatCellsType<T extends TableRow>={
  [key: string]: (cellValue:T[string],cellID:string|number)=>string|number|React.JSX.Element;
};


export interface TableProps<T extends TableRow> {
  headings: (string | React.JSX.Element)[];
  data?: T[];
  fields?: string[];
  onClickRow?: (row: T) => void;
  selectable?: boolean;
  fullCowling?: boolean;
  errored?:boolean|string;
  formatCells?:TableFormatCellsType<T>
  formatRows?:(cell:T)=>string|React.JSX.Element;
  classNames?: Partial<{
    table: string;
    row: string;
    cell: string;
    headerCell: string;
    [key: string]: string;
  }>;
  selectState?:ExternalState<T["id"][] | 'ALL'>;
}


// DATABASE TYPES






// Enum for account types
export enum AccountTypes {
  Cash = 'Cash',
  Bank = 'Bank',
  General = 'General',
}

// Enum for statuses
export enum Statuses {
  Active = 'Active',
  Inactive = 'Inactive',
}

// Interface for account headers
export interface AccountHeader {
  id: number;                       // Primary key
  description: string;              // Description of the account
  status: Statuses;                 // Status of the account
  type: AccountTypes;               // Type of account
  datecreated: string;              // Timestamp of creation in ISO format
}

// Interface for account postings
export interface AccountPosting {
  id: number //posting_id primarykey;
  account_id: number;               // Foreign key referencing account_headers
  description: string;              // Description of the posting
  credit: number;                   // Amount credited
  debit: number;                    // Amount debited
  date: string;                     // Timestamp of creation in ISO format
}
