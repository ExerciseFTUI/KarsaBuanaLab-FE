"use client";

import { FC, useState } from "react";
import SelectMultiple from "./forms/SelectMultiple";
import { set } from "zod";
import { FieldValues, useForm } from "react-hook-form";

//Shadcnui Tabs
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateSamplingModal from "./createSamplingModal";
import CreateSamplingSheet from "./CreateSamplingSheet";
import CreateSamplingModal2 from "./CreateSamplingModal2";
//Shadcnui

interface SamplingProps {}

const Sampling: FC<SamplingProps> = ({}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      parameters: [],
    },
  });
  const { watch, setValue } = form;

  const parameters = watch("parameters");

  return (
    <div className="w-full px-10">
      <CreateSamplingSheet open={open} onOpenChange={handleOpenChange} />
      <CreateSamplingModal
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />
      <CreateSamplingModal2
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        form={form}
      />
      <Tabs defaultValue="sampling" className="w-[500px] max-sm:w-[420px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sampling">Sampling</TabsTrigger>
          <TabsTrigger value="document">Document</TabsTrigger>
        </TabsList>
        <TabsContent value="sampling">
          <Card>
            <CardHeader>
              <CardTitle>Sampling</CardTitle>
              <CardDescription>
                Make changes to your sampling here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter>
              <Button onClick={() => setShowCreateModal(true)}>
                Open Modal
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => setConfirmOpen(true)}
              >
                Open Modal 2
              </Button>
              <Button variant={"ghost"} onClick={() => setOpen(true)}>
                Open Drawer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
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
      </Tabs>
    </div>
  );
};

export default Sampling;
