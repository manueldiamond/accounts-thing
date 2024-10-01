"use client"
import { useClickOut } from "@/hooks"
import { InputProps, OptionType } from "@/types" // Assuming you have these types defined
import React, { useState, useMemo, useEffect } from "react"
import DropDiv from "./drop-div"
import { fancyChevronDown } from "@/svg"

// Define types for options (for radio and select inputs)
type BaseInputProps=Omit<Omit<InputProps,'label'>,'type'>
type ExtraInputProps=Partial<{
  customOption: (option: OptionType) => React.ReactNode;
  defaultValue: string;
  onChange: ((e:any)=>void)|Function;
  hook: object;
  className?: string|InputClassNameType;

}>
type InputClassNameType = undefined | Partial<{ label:string,container: string, input: string }>
type InputPropsFull = InputProps&Omit<ExtraInputProps,'className'>&Partial<{
  error:{message:string,[x:string]:string};
  className: string|InputClassNameType;
  register?:Function,
  setValue?:Function,
}>
type RadioInputsProps=BaseInputProps&ExtraInputProps
type SelectInputProps=RadioInputsProps&{icon?:React.JSX.Element}

const solidCheckSVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>

)

export const RadioInputs = ({
  name,
  options,
  placeholder,
  hook,
  customOption,
  defaultValue,
  className
}: RadioInputsProps) => {
  const [selected, setSelected] = useState<string | null>(defaultValue ?? placeholder ?? null);
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
  onChange,
  icon,
  className,
}: SelectInputProps) => {
  const [selected, setSelected] = useState<string |number| null>(defaultValue ?? placeholder ?? null);
  const [opened, setOpen] = useState(false);

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
    if (!optionValuesObject?.find(({ value }:OptionValueType) => value === selected)) {
      setSelected(placeholder ?? null);
    }
 
    onChange?.(selected);
    close();
  }, [selected]);

  const InputclassName = typeof className ==='string' ?{ container: className}:className as InputClassNameType;


  return ( 
    <div onClick={open} className={`${InputclassName?.input} ${!selected ? 'text-black/50' : 'text-head'} w-auto border hover:border-base/40 border-inactive p-4 rounded-[4px] lg cursor-pointer relative`}>
      <div className={`flex justify-between items-center w-full ${""}`}>
        {icon}
        <span className="flex-1 text-left">{selected ?? 'Select'}</span>
        <span className="flex centered size-5">{fancyChevronDown}</span>
      </div>
      <DropDiv ref={ref} className="bg-white absolute top-[calc(100%+1rem)] z-50 left-0 w-full shadow-[0px_20px_66px_0px_#22304933] flex flex-col gap-1 p-3 rounded-[4px] xl" opened={opened}>
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
  customOption,
  placeholder,
  error,
  hook,
  register,
  setValue,
  defaultValue,
  onChange,
  className,
}: InputPropsFull) => {
  if(register&&!hook) hook=register(name)
  if(setValue&&!onChange) onChange=(val)=>setValue(name,val)
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
          className={className}
        />
      ) : type === "option" ? (
        <SelectInput
          customOption={customOption}
          name={name}
          options={options!}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className={className}

        />
      ) : (
        <I
          className={`text-left w-auto px-6 py-4 border border-gray-300 p-4 rounded-[4px] xl text-base ${InputclassName?.input}`}
          type={type as string }
          id={name}
          placeholder={placeholder ?? `Enter your ${name.toLowerCase()}`}
          defaultValue={defaultValue}
          {...hook}
        />
      )}
    </div>
  );
};
