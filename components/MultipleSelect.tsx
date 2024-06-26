"use client";

import React, { FC } from "react";
import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
}

const MultipleSelect: FC<SelectProps> = ({
  disabled,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            option: (base) => ({
              ...base,
              fontSize: "12px", // Adjust the font size to make options smaller
              padding: "8px 12px", // Adjust padding as needed
            }),
          }}
          classNames={{
            control: () => "text-sm overflow-auto max-h-[4rem]",
          }}
        />
      </div>
    </div>
  );
};

export default MultipleSelect;
