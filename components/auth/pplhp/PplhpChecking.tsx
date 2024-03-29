"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectSeparator } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FC, useState } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

interface PplhpCheckingProps {
  title: string;
  color: string;
  id: string;
}

export const PplhpChecking: FC<PplhpCheckingProps> = ({ title, color, id }) => {
  const [note, setNote] = useState("");

  const handleAccept = async () => {
    //TODO:
    alert(`Accept ${note}`);
  };

  const handleRevisi = async () => {
    //TODO:
    alert(`Revisi ${note}`);
  };

  return (
    <div className="h-screen px-16 space-y-10 w-full max-w-3xl">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        {title}
      </h1>
      <div className="space-y-2">
        <h2 className={`text-${color} text-xl text-center md:text-left`}>
          Laporan Hasil Pemeriksaan
        </h2>
        <div className={`bg-${color} px-6 p-5 rounded-3xl`}>
          <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
            <AiOutlineFile className={`text-3xl text-${color}`} />
          </div>
          <div className="my-5 space-y-2">
            <p className="italic text-[#9fa38f] text-sm">
              Klik doc ini untuk membuat Draft LHP
            </p>
            <SelectSeparator className="bg-pastel_moss_green" />
          </div>
          <div className="flex items-center justify-between text-ghost_white italic">
            <p>Name</p>
            <a href="#" target="_blank">
              <BsArrowRight className="text-4xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Optional Note</Label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type your message here."
          id="message-2"
        />
        <p className="text-sm text-muted-foreground">
          Your message will be saved as a note on this order.
        </p>
      </div>

      <div className="w-full flex justify-around items-center gap-5">
        <Button
          className="w-full hover:bg-dark_brown bg-light_brown"
          onClick={handleRevisi}
        >
          Revisi
        </Button>
        <Button
          className="w-full bg-dark_brown hover:bg-dark_green"
          onClick={handleAccept}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};
