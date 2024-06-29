"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  action: () => void;
  variant: "outline" | "destructive";
  title: string;
}

const BackButton: FC<BackButtonProps> = ({ action, variant, title }) => {
  const router = useRouter();

  return (
    <Button variant={variant} onClick={() => action()}>
      {title}
    </Button>
  );
};

export default BackButton;
