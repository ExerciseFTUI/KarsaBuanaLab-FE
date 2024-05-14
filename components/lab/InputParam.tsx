"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { UseFormRegister } from 'react-hook-form';


interface InputParamProps {
  title: string;
  result: string;
  options: string[];
}

const InputParam: React.FC<InputParamProps> = ({ 
    title, 
    result, 
    options,
}) => {
  const [position, setPosition] = React.useState(result || "");
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    // Determine the maximum characters to display before truncation
    const maxCharacters = 8; // Adjust this based on your requirement

    // Check if the selected option length exceeds the maximum characters
    if (position.length > maxCharacters) {
      // Truncate the option and add "..." at the end
      const truncatedText = position.substring(0, maxCharacters) + '...';
      setDisplayText(truncatedText);
    } else {
      // Use the full option text if it doesn't need truncation
      setDisplayText(position);
    }
  }, [position]); // Re-run the effect when `position` changes

  // Update the display text when an option is selected
  const handleOptionChange = (selectedOption: string) => {
    setPosition(selectedOption);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-32 justify-between">
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 end-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleOptionChange}>
          {options?.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InputParam;
