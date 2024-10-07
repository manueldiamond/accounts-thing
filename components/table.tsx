'use client'
import { TableRow, TableProps } from "@/d.types";
import { useExternalState } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { data } from "framer-motion/client";
import React, { useState } from "react";

// Define the type for your table rows

const formatIfAvailable=(
  cellName:string|number,
  datas:TableRow,
  formatters?:{[x:string]:Function},
)=>{
  return formatters&&formatters[cellName]
        ?formatters[cellName](datas[cellName],datas.id)
        :datas[cellName]
}
const CheckCircle = ({
  checked,
  onChange,
  full = true
}: {
  checked: boolean;
  onChange: Function;
  full?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-full aspect-square hover:scale-105 ${checked ? 'bg-primary' : 'border-[3px] border-solid transition-all border-dark-grey bg-transparent'} active:scale-95 scale-100 active:bg-primary/50 centered size-5`}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            className={`aspect-square bg-white rounded-full ${!full ? 'size-3' : 'size-1'}`}
            animate={{ scale: 1 }}
            exit={{ scale: 1 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
};

const Table = <T extends TableRow>({
  errored,
  fullCowling,
  headings = [],
  data = [],
  fields,
  selectable = false,
  onClickRow,
  classNames = {},
  formatRows,
  formatCells,
  selectState
}: TableProps<T>) => {
  const [selected, setSelected] = useExternalState<T["id"][] | 'ALL'>(selectState,[]);

  const toggleSelectAll = () => {
    setSelected(selected === 'ALL' ? [] : 'ALL');
  };

  const toggleSelectRow = (id: T["id"]) => {
    setSelected(selected => {
      const selectedArray = selected === 'ALL' ? data.map(({ id }) => id) : selected;
      const updatedArray = selectedArray.includes(id as any)
        ? selectedArray.filter((i:any) => i !== id)
        : [...selectedArray, id];

      return updatedArray;
    });
  };

  if(errored){
    selectable=false
    headings=[<div className="text-center">ERROR</div>],
    classNames={
      headerCell:"bg-red-100 text-red-500",
      // row:"text-white bg-red-100 !hover:bg-red-200"
    }
    data=[{
      id:0,
      "message":<div className="text-center text-red-800">{typeof errored==='string'?errored:"An error occured, please try again later"}</div>
    } as any]
    fields=["message"]
  }
  return (
    <div className={`w-full grow  bg-white ${classNames?.table || ''}`}>
      <table className={`w-full text-20 h-auto ${classNames?.table || ''}`}>
        <thead className={`w-full py-2 ${classNames?.headerRow || ''}`}>
          <tr className={`bg-light-texts w-full text-left py-2 ${classNames?.row || ''}`}>
            {selectable && (
              <th className={`px-3 pr-10 ${classNames?.headerCell || ''}`}>
                <CheckCircle
                  checked={selected.length > 0}
                  onChange={toggleSelectAll}
                  full={selected.length === data.length || selected === 'ALL'}
                />
              </th>
            )}
            {headings.map((heading, index) => (
              <th key={index} className={`py-2 w-auto ${classNames?.headerCell || ''}`}>
                {typeof heading === 'string' ? heading : heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                onClick={() => onClickRow && onClickRow(row)}
                className={`py-2 text-left hover:bg-grey/5 border-b border-solid ${
                  onClickRow ? 'cursor-pointer' : ''
                } ${classNames?.row || ''}`}
                key={rowIndex}
              >
                {selectable && (
                  <td className={`py-4 px-3 pr-10  ${classNames?.cell || ''}`}>
                    <CheckCircle
                      checked={selected === 'ALL' ? true : selected.includes(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                    />
                  </td>
                )}
                {fields
                  ? fields.map((cellName, cellIndex) => (
                      <td className={`py-4 ${classNames?.cell || ''} ${classNames[cellName]||''} ${fullCowling?' border-inactive last:border-none border-r-[1px] border-solid ':''} `} key={cellIndex}>
                        {formatIfAvailable(cellName,row,formatCells)}
                      </td>
                    ))
                  : Object.keys(row).map((key, cellIndex) => (
                      <td className={`py-4 ${classNames?.cell || ''} ${classNames[key]||''}   ${fullCowling?'border-r-inactive border-l-0 border-[1px] border-solid last:border-none':''}`} key={cellIndex}>
                        {formatIfAvailable(key,row,formatCells,)}
                      </td>
                    ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length} className={`text-left py-4 ${classNames?.cell || ''}`}>
                loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
