import React, { useState, useEffect } from 'react';
import { Textarea } from './ui/textarea';

interface ValidateCancel {
    isCancelled: boolean;
    setIsCancelled: React.Dispatch<React.SetStateAction<boolean>>;   
    reason?: string;
    setReason?: React.Dispatch<React.SetStateAction<string>>;
    message: string;
    handleCancelledProject: () => Promise<void>; 
}

const CancelPopup: React.FC<ValidateCancel> = ({ isCancelled, reason, message, setReason, setIsCancelled, handleCancelledProject }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCancelConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setIsCancelled(false);
    };

    const handleConfirm = async () => {
        // Call the handleCancelledProject function to cancel the project
        try {
            await handleCancelledProject();
            setIsCancelled(false); // Close the cancel popup after successful cancellation
        } catch (error) {
            console.error('Error cancelling project:', error);
            // Handle error, display error message, etc.
        }
    };

    const handleConfirmationCancel = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".modal-content")) {
                setIsCancelled(false);
                setShowConfirmation(false);
            }
        };

        if (isCancelled) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCancelled, setIsCancelled]);

    return (
        <>
            {isCancelled && (
                <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="modal-content bg-white rounded-lg border-2 p-8">
                        <p className="text-center text-xl font-bold mb-4">
                            {message}
                        </p>
                        <form>
                            {setReason && (
                                <>
                                    <label htmlFor="reason" className="block mb-2">
                                        Reason:
                                    </label>
                                    <Textarea
                                        id="reason"
                                        name="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="border-2 border-[#bbbabf] rounded-lg h-24 mb-2"
                                        required
                                    />
                                </>
                            )}
                            <div className="flex justify-center space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelConfirmation}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Confirmation popup */}
            {showConfirmation && (
                <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="modal-content bg-white rounded-lg border-2 p-8">
                        <p className="text-center text-xl font-bold mb-4">
                            Are you sure you want to proceed it?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                type="button"
                                onClick={handleConfirmationCancel}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                            >
                                No, go back
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Yes, I&apos;m really sure!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CancelPopup;
