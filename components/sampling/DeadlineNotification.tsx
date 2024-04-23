import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { Project } from "@/lib/models/project.model";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays, format } from "date-fns";

export function DeadlineNotification({ projects }: { projects: Project[] }) {
  let deadlineData: any = [];

  for (let i = 0; i < projects.length; ++i) {
    const d = projects[i];
    const { jadwal_sampling } = d;

    if (!jadwal_sampling) continue;

    const now = format(new Date(), "dd-LL-y").split("-");
    const from = jadwal_sampling.from ? jadwal_sampling.from.split("-") : null;
    const to = jadwal_sampling.to ? jadwal_sampling.to.split("-") : null;

    deadlineData.push({
      project_name: d.project_name,
      deadline:
        from != null
          ? to != null
            ? differenceInCalendarDays(
                new Date(parseInt(to[2]), parseInt(to[1]) - 1, parseInt(to[0])),
                new Date(
                  parseInt(now[2]),
                  parseInt(now[1]) - 1,
                  parseInt(now[0])
                )
              )
            : differenceInCalendarDays(
                new Date(
                  parseInt(from[2]),
                  parseInt(from[1]) - 1,
                  parseInt(from[0])
                ),
                new Date(
                  parseInt(now[2]),
                  parseInt(now[1]) - 1,
                  parseInt(now[0])
                )
              )
          : 0,
    });
  }

  const sortedDeadline = deadlineData.sort(
    (a: any, b: any) => a.deadline - b.deadline
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-moss_green text-ghost_white relative hover:bg-light_green",
            sortedDeadline.length && sortedDeadline[0].deadline <= 2
              ? "before:absolute before:-top-1 before:-right-1 before:w-4 before:h-4 before:bg-brick_red before:rounded-full before:border-2 before:border-black"
              : "",
            sortedDeadline.length && sortedDeadline[0].deadline <= 2
              ? "hover:bg-brick_red hover:text-ghost_white"
              : ""
          )}
        >
          Deadline Project
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-moss_green">Projects Deadline</SheetTitle>
          <SheetDescription>Track your project schedule here.</SheetDescription>
        </SheetHeader>

        <Separator orientation="horizontal" className="mt-4" />

        <div className="grid gap-4 py-4">
          {sortedDeadline.map((j: any, i: any) => (
            <div
              className={cn(
                "w-full border-b-2 border-pastel_moss_green py-2 text-moss_green",
                j.deadline <= 0 ? "text-brick_red" : ""
              )}
              key={i}
            >
              <p>
                {j.deadline <= 0 ? "🚩" : "📅"}{" "}
                <span className="font-bold">{j.project_name}</span> deadline is{" "}
                <span className="font-bold">
                  {j.deadline > 0
                    ? j.deadline + " days left."
                    : j.deadline == 0
                    ? "Today!"
                    : "is over for " + -1 * j.deadline + " days!"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
