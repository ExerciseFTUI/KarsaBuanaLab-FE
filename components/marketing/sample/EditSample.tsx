// components/EditSample.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface EditSampleProps {
  sample: string;
  regulation: number;
}

interface FormData {
  editedSample: string;
  editedRegulation: number;
  // Add more form fields if needed
}

const EditSample: React.FC<EditSampleProps> = ({ sample, regulation }) => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      editedSample: sample,
      editedRegulation: regulation,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, e.g., update data, make API calls, etc.
    console.log(data);
  };

  // Update form values when sample or regulation changes
  React.useEffect(() => {
    setValue('editedSample', sample);
    setValue('editedRegulation', regulation);
  }, [sample, regulation, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Display input fields for sample and regulations */}
      <div className=' flex flex-col'>
        <label className=' flex flex-col'>
          Sample
          <input {...register('editedSample')} />
        </label>
        <label>
          Edited Regulation:
          <input type="number" {...register('editedRegulation')} />
        </label>
        <br />
        {/* Add more input fields or components as needed */}
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditSample;
