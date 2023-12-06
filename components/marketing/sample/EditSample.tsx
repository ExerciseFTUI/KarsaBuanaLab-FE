import React, { FC, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Sampling } from '@/lib/type';
import EditParameter from './EditParameter';

interface EditSampleType {
  sample: string;
  regulation: number;
  // setRegulation: React.Dispatch<React.SetStateAction<number>>;
}

const EditSample: FC<EditSampleType> = ({ sample, regulation }) => {
  const [selectedRegulationName, setSelectedRegulationName] = useState<string | null>(null);

  // Find the selected regulation name based on the regulation number
  const findRegulationName = () => {
    const selectedSample = Sampling.samples.find((s) => s.name === sample);
    if (selectedSample) {
      const selectedRegulation = selectedSample.regulations.find((r) => r.id === regulation);
      if (selectedRegulation) {
        return selectedRegulation.name;
      }
    }
    return null;
  };

  // Update the selected regulation name when regulation changes
  React.useEffect(() => {
    setSelectedRegulationName(findRegulationName());
  }, [regulation, sample]);

  return (
    <>
      {sample !== "" && (
        <div>

          {/* Edit Sample */}
          <div className='h-fit'>
            <h1 className='text-lg mb-3 font-semibold'>Rename Sample</h1>
            <Input type="" className='py-5' placeholder={sample} />
          </div>
          {/* End of Edit Sample */}
          
          {regulation !== 0 && (
            <div>
              {/* Edit Regulation */}
              <div className='h-fit mt-10'>
                <h1 className='text-lg mb-3 font-semibold'>Rename Regulation</h1>
                <Input type="" className='py-5' placeholder={selectedRegulationName || "Select a regulation"} />
              </div>
              {/* End of Edit Regulation */}
              
              {/* Edit Parameter */}
              <div className='h-fit mt-10'>
                <h1 className='text-lg mb-3 font-semibold'>Rename Parameter</h1>
                <div className=' flex justify-center'>
                  <EditParameter regulation={regulation}/>
                </div>
              </div>
              {/* End of Edit Parameter */}
    
              {/* Button Cancel and Confirm */}
              <div className=" flex w-full flex-row justify-evenly mt-10">
                <button className=" bg-slate-100 hover:bg-slate-400 border-2 rounded-md p-3 border-slate-300 text-base font-medium"> Cancel </button>
                <button className=" bg-light_green text-white hover:bg-dark_green border-2 rounded-md p-3 border-slate-300 text-base font-medium"> Confirm </button>
              </div>
              {/* End of Button Cancel and Confirm */}
            </div>
          )}

      </div>
      )}
    </>
  );
};

export default EditSample;
