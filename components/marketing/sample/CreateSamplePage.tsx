"use client";

import React, { useState } from 'react';
import SearchableDropdown from './SearchableDropdown';
import TableRegulation from "./TableRegulation";
import Parameter from "./Parameters";
import { Sampling } from '@/lib/type';
import Link from 'next/link';
import EditSample from './EditSample';
import { NewSample } from '../addSample/NewSample';

const CreateSamplePage = () => {
    const [sample, setSample] = useState<string>("");
    const [regulation, setRegulation] = useState<number>(0);
    const [newSample, setNewSample] = useState(false)

    return (
        <>
            {newSample && (
                <NewSample setNewSample={setNewSample} />
            )}
            <div className='grid grid-cols-2 justify-between gap-6 max-md:flex-col max-md:items-center'>
                {/* Information for sampling and regulation */}
                <div className='border border-dark_green rounded-lg p-3 h-full'>
                    {/* Add sampling Button */}
                    <button 
                        onClick={() => {setNewSample(true)}}
                        className='p-3 flex hover:opacity-70 justify-center font-bold text-xl border-light_green border-2 rounded-lg w-full bg-dark_green text-white'>
                        Create New Sample
                    </button>
                    {/* End of Add sampling Button */}

                    {/* Sampling choose */}
                    <div className='flex flex-col mt-7'>
                        <h1 className='text-black font-semibold text-lg mb-3'>Sample</h1>
                        {/* Dropdown Search and edit */}
                        <div className='flex justify-center w-full items-center'>
                            <SearchableDropdown sample={sample} setSample={setSample} />
                        </div>
                        {/* End of Dropdown Search and edit */}
                    </div>
                    {/* End of Sampling choose */}

                    {/* Regulations */}
                    <div className='flex flex-col mt-10'>
                        <h1 className='text-black font-semibold text-lg mb-3'>Regulation</h1>
                        <div className='flex flex-row justify-center'>
                            <TableRegulation sample={sample} regulation={regulation} setRegulation={setRegulation} />
                        </div>
                    </div>
                    {/* End of Regulations */}

                    {/* Parameter */}
                    <div className='flex flex-col mt-10'>
                        <h1 className='text-black font-bold text-xl mb-3'>Parameter</h1>
                        <div className='flex flex-row justify-center'>
                            <Parameter regulation={regulation} />
                        </div>
                    </div>
                    {/* End of Parameter */}
                </div>
                {/* End Information for sampling and regulation */}

                {/* Information for Edit */}
                <div className='border border-dark_green rounded-lg p-5 h-full'>
                    <h1 className='text-xl font-bold text-dark_green mb-10'>Edit Sample</h1>
                    <EditSample sample={sample} regulation={regulation} />
                </div>
                {/* End Information for Parameter */}
            </div>
        </>
    );
}

export default CreateSamplePage;
