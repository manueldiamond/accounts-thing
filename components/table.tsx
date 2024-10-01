'use client'
import { TableRow, TableProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

// Define the type for your table rows


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
  fullCowling,
  headings = [],
  data = [],
  fields,
  selectable = false,
  onClickRow,
  classNames = {}
}: TableProps<T>) => {
  const [selected, setSelected] = useState<Array<any> | 'ALL'>([]);

  const toggleSelectAll = () => {
    setSelected(selected === 'ALL' ? [] : 'ALL');
  };

  const toggleSelectRow = (id: string | number) => {
    setSelected((selected) => {
      const selectedArray = selected === 'ALL' ? data.map(({ id }) => id) : selected;
      const updatedArray = selectedArray.includes(id)
        ? selectedArray.filter((i) => i !== id)
        : [...selectedArray, id];

      return updatedArray;
    });
  };

  return (
    <div className={`w-full grow overflow-x-auto bg-white ${classNames?.table || ''}`}>
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
                        {row[cellName]}
                      </td>
                    ))
                  : Object.keys(row).map((key, cellIndex) => (
                      <td className={`py-4 ${classNames?.cell || ''} ${classNames[key]||''}   ${fullCowling?'border-r-inactive border-l-0 border-[1px] border-solid last:border-none':''}`} key={cellIndex}>
                        {row[key]}
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
