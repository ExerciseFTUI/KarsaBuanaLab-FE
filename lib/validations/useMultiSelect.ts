import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const useMultiSelect = (name: string, defaultValue: string[] = []) => {
  const { setValue } = useFormContext();
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);

  const toggleOption = (option: string) => {
    setSelectedValues((prevSelected) => {
      const newSelected = prevSelected.includes(option)
        ? prevSelected.filter((value) => value !== option)
        : [...prevSelected, option];

      setValue(name, newSelected);
      return newSelected;
    });
  };

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue, name, setValue]);

  return {
    selectedValues,
    toggleOption,
  };
};

export default useMultiSelect;

