"use client";

import React, { useEffect, useState } from 'react'
import SearchableDropdown from './SearchableDropdown';
import TableRegulation from "./TableRegulation";
import Parameter from "./Parameters"
import Link from 'next/link';

const CreateSamplePage = () => {
    const [value, setValue] = useState("");
    const [regulation, setRegulation] = useState(0)

    return (
        <>
            <div className='grid grid-cols-2 justify-between gap-6 max-md:flex-col max-md:items-center'>
                {/* Information for sampling and regulation */}
                <div className=' border border-dark_green rounded-lg p-3 h-full'>
                    {/* Add sampling Button */}
                    <button className=' p-3 flex hover:opacity-70 justify-center font-bold text-xl border-light_green border-2 rounded-lg w-full bg-dark_green text-white '> Create New Sample</button>
                    {/* End of Add sampling Button */}

                    {/* Sampling choose */}
                    <div className=' flex flex-col mt-7'>
                        <h1 className=' text-black font-bold text-xl mb-3'>Sample</h1>
                        {/* Dropdown Search and edit */}
                        <div className=' flex justify-between w-full items-center'>
                            <SearchableDropdown value={value} setValue={setValue} />
                            {value !== "" && (
                                <Link href={'/marketing/createSample/Test'}>
                                    <div className='mx-5 w-fit text-blue-800 hover:cursor-pointer underline'>
                                        Edit sample {value}
                                    </div>
                                </Link>
                            )}
                        </div>
                        {/* End of Dropdown Search and edit */}
                    </div>
                    {/* End of Sampling choose */}

                    {/* Regulations */}
                    <div className=' flex flex-col mt-10'> 
                        <h1 className=' text-black font-bold text-xl mb-3'>Regulation</h1>
                        <div className='flex flex-row justify-center'>
                            <TableRegulation value={value} regulation={regulation} setRegulation={setRegulation} />
                        </div>
                    </div>
                    {/* End of Regulations */}
                </div>
                {/* End Information for sampling and regulation */}
                
                {/* Information for Parameter */}
                <div className=' border border-dark_green rounded-lg p-5 h-full'>
                    {/* Parameter */}
                    <div className=' flex flex-col '>
                        <h1 className=' text-black font-bold text-xl mb-3'>Parameter</h1>
                        <div className='flex flex-row justify-center'>
                            <Parameter regulation={regulation}/>
                        </div>
                    </div>
                    {/* End of Parameter */}
                </div>
                {/* End Information for Parameter */}
            </div>
        </>
    )
}

export default CreateSamplePage