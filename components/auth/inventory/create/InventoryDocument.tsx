"use client";

import DeleteDialog from "@/components/DeleteDialog";
import Dropzone from "@/components/Dropzone";
import { Button } from "@/components/ui/button";
import { ImageIcon, TrashIcon } from "lucide-react";
import { FC, useState, useEffect } from "react";
import { InventoryFile } from "../InventoryType";
import { deleteProjectFile } from "@/lib/actions/inventory.client.action";
import { useRouter } from "next/navigation";

interface InventoryDocumentProps {
  uploadedFiles: any;
  setUploadedFiles: any;
  inventoryDocument: InventoryFile[];
  inventoryId: string;
  isViewOnly: boolean;
}

const projectFile = [
  {
    _id: "file_id_1",
    file_name: "image_name_1",
    file_id: "dadaudhwudhaiuwhd",
  },
  {
    _id: "file_id_2",
    file_name: "image_name_2",
    file_id: "dadaudhwudhaiuwhd",
  },
  {
    _id: "file_id_3",
    file_name: "image_name_3",
    file_id: "dadaudhwudhaiuwhd",
  },
];

const InventoryDocument: FC<InventoryDocumentProps> = ({
  uploadedFiles,
  setUploadedFiles,
  inventoryDocument,
  inventoryId,
  isViewOnly,
}) => {
  const [fileIdToDelete, setFileIdToDelete] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteFile = async (fileId: string) => {
    //Project Id
    const response = await deleteProjectFile(inventoryId, fileId);

    if (response) {
      alert("File Deleted Succesfully");
      router.refresh();
    } else {
      alert("Failed to  Delete file");
    }
  };

  if (inventoryDocument == undefined) {
    return (
      <p className=" text-sm flex flex-row justify-center py-3">
        File Not Found or no internet access, please refresh the page
      </p>
    );
  }

  return (
    <>
      <div className="px-2 space-y-10">
        <div className="text-dark_brown">
          <div className="mx-5 mt-5 ">
            <h1 className="font-semibold mb-4 text-xl">Uploaded Files</h1>
            {inventoryDocument == undefined && (
              <p className=" text-sm flex flex-row justify-center py-3">
                File Not Found
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              {inventoryDocument.map((file, index) => (
                <div
                  className="bg-dark_brown  items-center justify-between rounded-lg px-5 py-3 hover:bg-light_brown text-white font-medium flex delay-150"
                  key={index + file._id}
                >
                  <ImageIcon className="h-8 w-8 mr-2" />

                  <a
                    href={`https://drive.google.com/file/d/${file.file_id}/view`}
                    className="w-full mr-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.file_name}
                  </a>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="delay-150"
                    onClick={() => {
                      setDialogOpen(true);
                      setFileIdToDelete(file.file_id);
                    }}
                  >
                    <TrashIcon className="h-5 w-5 " />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isViewOnly && (
          <div className="">
            <h1 className="text-xl font-semibold text-dark_brown ml-5">
              Upload Image
            </h1>
            <div className="xl:max-w-2xl">
              <Dropzone
                bgColor="bg-dark_brown bg-opacity-50"
                txtColor="text-light_brown"
                setUploadedFiles={setUploadedFiles}
              />
            </div>
          </div>
        )}
      </div>
      <DeleteDialog
        setIsOpen={setDialogOpen}
        isOpen={dialogOpen}
        // deleteFunction={() => alert(`Deleted ${fileIdToDelete}`)}
        deleteFunction={() => handleDeleteFile(fileIdToDelete)}
        description="This action cannot be undone. This will be permanently delete your file "
      />
    </>
  );
};

export default InventoryDocument;
