import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'

interface createProps {
    message : string,
    isCreateOpen : boolean,
    setIsCreateOpen : React.Dispatch<React.SetStateAction<boolean>>;
    from : string,
}

const CreateRegulationParam : React.FC<createProps> = ({message, isCreateOpen, from, setIsCreateOpen}) => {
    const [editedValue, setEditedValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleCancel = () => {
        setIsCreateOpen(false);
    };

    // TODO : LAST DIT INI BUAT CREATE NEW REGULATION, PARAM DAN DEFAULT PARAM
    const handleConfirm = async () => {
        try {
            if (from === "regulation") {
                console.log("New Regulation : ", editedValue);
            } else if (from === "param") {
                console.log("New param based on sample : ", editedValue);
            } else if (from === "defaultparam"){
                console.log("New param based on regulation : ", editedValue);
            }
            
            setIsCreateOpen(false); // Close the modal after successful confirmation
        } catch (error) {
            console.error('Error creating new regulation:', error);
            // Handle error, display error message, etc.
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".modal-content")) {
                setIsCreateOpen(false);
            }
        };

        if (isCreateOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCreateOpen, setIsCreateOpen]);

  return (
    <>
        {isCreateOpen && (
            <div className="modal-overlay fixed top-0 left-0 w-full h-full  flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="modal-content bg-white rounded-lg border-2 h-60 p-8 relative">
                    <p className="text-center text-xl font-bold mb-4 max-w-xl">
                        {message}
                    </p>
                    <Input
                    type='text'
                    onChange={handleInputChange}
                    placeholder={`New ${from === "regulation" ? "regulation" : "parameter"} name`}
                    className="border-b border-gray-300 placeholder:text-slate-500 text-slate-700 mt-12 font-medium focus:outline-none"
                    />
                    <div className="flex justify-center absolute my-8 left-0 right-0 space-x-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-moss_green text-white px-4 py-2 rounded-md hover:bg-dark_green"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default CreateRegulationParam
