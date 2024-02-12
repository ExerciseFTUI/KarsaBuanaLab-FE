"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {}

const BackButton: FC<BackButtonProps> = ({}) => {
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => router.back()}>
      Back to previous page
    </Button>
  );
};

export default BackButton;
