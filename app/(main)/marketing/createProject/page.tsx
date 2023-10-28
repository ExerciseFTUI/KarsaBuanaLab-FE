// "use client"
// import React, { useState } from 'react';
// import Dropzone from "@/components/Dropzone";
// import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
// import { ToastContainer, toast } from 'react-toastify';

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";

// export default function Home() {
//     const [uploadedFiles, setUploadedFiles] = useState([]);

//     const handleSubmit = () => {
//         // TODO: Implement your logic to submit uploadedFiles to the server
//         if (uploadedFiles.length > 0) {
//             // For demonstration purposes, show a success message using toastify
//             toast.success('Files submitted successfully!', {
//                 position: toast.POSITION.TOP_RIGHT,
//             });
//         } else {
//             // If no files are uploaded, show an error message
//             toast.error('Please upload files before submitting.', {
//                 position: toast.POSITION.TOP_RIGHT,
//             });
//         }
//     };

//     return (
//         <div className=" w-fit flex justify-between items-center">
//             {/* Left Card for general information project */}
//             <CreateProjectBaseData/>
//             {/* End of Left Card for general information project */}

//             {/* Right Card for Dropzone */}
//             <Card className={`w-[48rem] overflow-auto h-[36rem] custom-scrollbar flex flex-col justify-between mx-4`}>
//                 <div>
//                     <CardHeader>
//                         <CardTitle className="text-base font-bold">Upload your files</CardTitle>
//                     </CardHeader>

//                     {/* Drag and drop files area */}
//                     <Dropzone setUploadedFiles={setUploadedFiles}/>

//                 </div>

//                 {/* Button for submit */}
//                 <div className='m-5 flex justify-center items-center  '>
//                     <button onClick={handleSubmit} className=' bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium'> Submit </button>
//                 </div>
//             </Card>
//             {/* End of Right Card for Dropzone */}

//         </div>
//     )
// }

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sampling from "@/components/marketing/createProject/Sampling";
import { PlusIcon } from "@radix-ui/react-icons";
import { PlusCircleIcon } from "lucide-react";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";

export default function CreateProjectPage() {
  return (
    <>
      <div className="w-full flex gap-6">
        <CreateProjectBaseData />
        <Tabs defaultValue="sampling" className="w-[500px] max-sm:w-[420px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sampling">Sampling</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
          </TabsList>

          {/* Sample Section */}
          <TabsContent value="sampling">
            <SamplingTab />
          </TabsContent>
          {/* End Sample Section */}

          {/* Document Section */}
          <TabsContent value="document">
            <Card>
              <CardHeader>
                <CardTitle>Document</CardTitle>
                <CardDescription>
                  Change your document here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>

              <CardFooter>
                <Button>Save document</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* End Document Section */}
        </Tabs>
      </div>
    </>
  );
}
