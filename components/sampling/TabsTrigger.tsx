import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * This component is the stylized version of TabsTrigger from Shadcn UI with brownish colors.
 *
 * @param value - The value of the trigger.
 * @param header - The header text of the trigger.
 * @param className - Additional className if needed.
 * @returns The rendered trigger component.
 */
export default function SamplingTabsTrigger({
  value,
  header,
  className,
}: {
  value: string;
  header: string;
  className?: string;
}) {
  const active = "data-[state=active]";
  const inactive = "data-[state=inactive]";

  return (
    <TabsTrigger
      className={cn(
        "rounded-none border-b-2 text-base w-full",
        `${active}:shadow-none  ${active}:border-b-light_brown ${active}:bg-transparent ${active}:text-dark_brown ${active}:font-bold`,
        `${inactive}:text-moss_green ${inactive}:opacity-50 ${inactive}:border-b-moss_green`,
        className
      )}
      value={value}
    >
      {header}
    </TabsTrigger>
  );
}
