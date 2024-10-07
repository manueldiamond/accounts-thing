"use client"
import { useClickOut, useDebounce, useDebouncedState, useExternalState } from "@/hooks"
import { ExternalState, InputProps, OptionType, suggestionsHookType } from "@/d.types" // Assuming you have these types defined
import React, { useState, useMemo, useEffect, useRef, Dispatch } from "react"
import DropDiv from "./drop-div"
import { fancyChevronDown,solidCheckSVG } from "@/svg"
import { cn } from "tailwind-variants"

// Define types for options (for radio and select inputs)
type BaseInputProps=Omit<Omit<InputProps,'label'>,'type'>

type ExtraInputProps=Partial<{
  defaultValue: string;
  hook: object;
  className?: string|InputClassNameType;
  valueControls?:ExternalState<any>;

}>
export type InputClassNameType = undefined | Partial<{ label:string,container: string, input: string, dropdown:string,}>
type InputPropsFull = InputProps&Omit<ExtraInputProps,'className'>&Partial<{
  error:any;
  className: string|InputClassNameType;
  register?:Function,
  
  /** from React Hook Form*/
  setValue?:Function,
}>

type RadioInputsProps=BaseInputProps&ExtraInputProps&{
  options:OptionType[]
}

type SelectInputProps=RadioInputsProps&{
  icon?:React.JSX.Element
  formatSelected?:(selected:any)=>string|number|void;
  openControls?:ExternalState<boolean>;
} 

type SuggestionsInputProps = Omit<SelectInputProps,'options'>&{
  useSuggestions:suggestionsHookType
  numbers?:boolean;
  
}

export const SuggestionsInput=({className,name,formatSelected,defaultValue,customOption,useSuggestions,placeholder,valueControls,numbers}:SuggestionsInputProps)=>{
  const InputclassName = typeof className ==='string' ?{ input: className}:className as InputClassNameType;
  const [value,setValue,] = useExternalState(valueControls,defaultValue||"")
  const debouncedValue=useDebounce(value ,300)
  console.log(debouncedValue)
  const [showingSuggestions,setShowingSuggestions] = useState(false)

  const [editing,setEditing] = useState(false)

  const options = useSuggestions(debouncedValue)

  useEffect(()=>{
    setShowingSuggestions(Boolean((options?.length>0) && !!debouncedValue?.length))
  },[options,debouncedValue])
  
  const textInputRef=useRef<HTMLInputElement>(null)
  
  return(
    <div 
      onClick={()=>setEditing(true)} 
      className={`${!value ? 'text-black/50' : 'text-head'} w-auto border hover:border-base/40 border-inactive rounded-[4px] lg cursor-pointer relative flex  ${InputclassName?.input} `}
    >
      {!editing?
        <div className="`bg-transparent flex-1 w-full min-h-full pl-4">
          {(formatSelected?formatSelected(value):value) as string|number}
        </div>
      :
        <input 
          autoFocus
          onBlur={()=>setEditing(false)}
          type={numbers?'number':"text"} 
          value={value||""} 
          ref={textInputRef} 
          placeholder={placeholder} 
          onChange={e=>setValue(e.target.value)} 
          className={`bg-transparent flex-1 w-full h-full pl-4`} 
        />
      }
      <SelectInput
        formatSelected={()=>""}
        name={name}
        defaultValue={value}
        className={{
          ...InputclassName, 
          input:"!border-none max-h-none max-w-min !py-0 ",
          dropdown:"min-w-max"
        }}
        options={options} 
        customOption={customOption}
        valueControls={[value,setValue]}
        openControls={[showingSuggestions,setShowingSuggestions]}
      />
    </div>
  )
}

export const RadioInputs = ({
  name,
  options,
  placeholder,
  hook,
  customOption,
  defaultValue,
  className,
  valueControls
}: RadioInputsProps) => {
  const [selected, setSelected] = useExternalState<string | null>(valueControls,defaultValue ?? placeholder ?? null);
  const InputclassName = typeof className ==='string' ?{ container: className}:className as InputClassNameType;

  return (
    <div className={`flex gap-1 `}>
      {options?.map((option: OptionType) => {
        const value = typeof option === "string" ? option : option.value;
        const displayLabel = typeof option === "string" ? option : option.label ?? value;
        const thisSelected = selected === value;

        return (
          <label
            onClick={() => setSelected(value)}
            key={value}
            htmlFor={value + name}
            className={`font-normal cursor-pointer border-[1px] ${InputclassName?.container} transition-colors px-4 py-3 border-solid w-max centered gap-2 rounded-[4px] ${thisSelected ? ' border-inactive ' : 'hover:border-base/40 border-transparent'}`}
          >
            <input
              className={`${!thisSelected && 'opacity-50'} ${InputclassName?.input} scale-[1.25]`}
              id={value + name}
              checked={thisSelected}
              name={name}
              type="radio"
              value={value}
              {...hook}
            />
            {customOption ? customOption(option) : displayLabel}
          </label>
        );
      })}
    </div>
  );
};

export const SelectInput = ({
  name,
  options,
  placeholder,
  customOption,
  defaultValue,
  icon,
  className,
  formatSelected,
  openControls,
  valueControls:selectedControls,
}: SelectInputProps) => {

  const [selected, setSelected] = useExternalState<string |number| null>(selectedControls,defaultValue ?? placeholder ?? null);
  const [opened, setOpen] = useExternalState(openControls,false,);


  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const ref = useClickOut(close, opened);

  type OptionValueType = { value:string|number, displayLabel:string , data: OptionType }
  const optionValuesObject:OptionValueType[] = useMemo(() => options?.map((option: OptionType) => {
    const value = typeof option === 'string' ? option : option.value;
    const displayLabel = typeof option === 'string' ? option : option.label ?? value;
    return { value, displayLabel, data: option };
  }), [options]);

  useEffect(() => {
    if(!selectedControls)
      if (!optionValuesObject?.find(({ value }:OptionValueType) => value === selected)) {
        setSelected(placeholder ?? null);
      }
      close();
  }, [selected]);

  const InputclassName = typeof className ==='string' ?{ container: className}:className as InputClassNameType;


  return (
    <div onClick={open} className={`${!selected ? 'text-black/50' : 'text-head'} w-auto border hover:border-base/40 border-inactive p-4 rounded-[4px] lg cursor-pointer relative ${InputclassName?.input}`}>
      <div className={`flex justify-between items-center w-full ${""}`}>
        {icon}
        <span className="flex-1 text-left">{(formatSelected?formatSelected(optionValuesObject?.find(({value})=>value===selected)):selected) ?? 'Select'}</span>
        <span className="flex centered size-5">{fancyChevronDown}</span>
      </div>
      <DropDiv ref={ref} className={`bg-white absolute top-[calc(100%+ 0.2rem)] z-50 left-0 w-full shadow-[0px_20px_66px_0px_#22304933] flex flex-col gap-1 p-3 rounded-[4px] xl ${InputclassName?.dropdown}`} opened={opened}>
        {optionValuesObject?.map(({ value, data, displayLabel }:OptionValueType) => (
          <div
            key={value}
            onClick={() => setSelected(value)}
            className={`${selected !== value && 'hover:pl-6 transition-all'} hover:bg-light rounded-[4px] lg px-4 py-2 ${selected ? 'text-head' : 'text-para'} centered gap-2 options`}
          >
            {value === selected && <span className="text-base centered size-5">{solidCheckSVG}</span>}
            <span className="text-left flex-1">
              {customOption ? customOption(data) : displayLabel}
            </span>
          </div>
        ))}
      </DropDiv>
    </div>  
  );
};

export const Input = ({
  name,
  type,
  label,
  options,
  useSuggestions,
  customOption,
  placeholder,
  error,
  hook,
  register,
  setValue:RHFsetValue,
  defaultValue,
  className,
  valueControls,
  numbers,required
}: InputPropsFull) => {
    
  const state=useExternalState(valueControls,defaultValue)
  const [value,setValue]=state
  if(register&&!hook) 
    hook=register(name,{required});

  useEffect(()=>{
    if(RHFsetValue)
      if(type==='suggestions'||type==='option'||!hook)
        RHFsetValue(name,value)
  },[value])
   

  const InputclassName = typeof className ==='string' ?{ container: className}:className as InputClassNameType;
  const I = type==='textarea'?'textarea':'input';
  return (
    <div className={`flex flex-col ${InputclassName?.container}`}>
      <label className={`text-left flex flex-col font-normal text-para ${InputclassName?.label}`} htmlFor={name}>
        {label}
        {error && <span className="error text-error">{error.message}</span>}
      </label>
      {type === "radio" ? (
        <RadioInputs
          customOption={customOption}
          name={name}
          options={options!}
          placeholder={placeholder}
          defaultValue={defaultValue}
          hook={hook}
          valueControls={state}
          className={className}
        />
      ) : type === "option" ? (
        <SelectInput
          customOption={customOption}
          name={name}
          options={options!}
          placeholder={placeholder}
          defaultValue={defaultValue}
          valueControls={state}
          className={className}

        />
      ) : type === 'suggestions'?(
        <SuggestionsInput
          numbers={numbers} 
          customOption={customOption}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={className}
          valueControls={state}
          useSuggestions={useSuggestions!}
        />
      ):(
        <I
          className={`text-left w-auto px-6 py-4 border border-gray-300 p-4 rounded-[4px] xl text-base ${InputclassName?.input}`}
          type={type as string }
          id={name}
          placeholder={placeholder ?? `Enter your ${name.toLowerCase()}`}
          defaultValue={defaultValue}
          value={value}
          onChange={e=>setValue(e.target.value)}
          {...hook}
        />
      )}
    </div>
  );
};

const InputContainer=({className=''})=>{
  return <></>//TODO: Implemet Later
}
