import { TabsTrigger, TabsList } from "@/components/ui/tabs";

interface params {
  value1: string;
  value2: string;
}

export default function SamplingTabsList({ value1, value2 }: params) {
  return (
    <TabsList className="grid  grid-cols-2 shadow-none bg-transparent max-w-4xl">
      <TabsTrigger
        className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green capitalize"
        value={value1}
      >
        {value1}
      </TabsTrigger>

      <TabsTrigger
        className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green capitalize"
        value={value2}
      >
        {value2}
      </TabsTrigger>
    </TabsList>
  );
}
