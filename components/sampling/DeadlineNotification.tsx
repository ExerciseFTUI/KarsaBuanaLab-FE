import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "../ui/separator"
import { Project } from "@/lib/models/project.model"
import { cn } from "@/lib/utils"

export function DeadlineNotification({ projects }: { projects: Project[] }) {
  const deadlineData = projects.map((d) => ({
    project_name: d.project_name,
    deadline: Math.round(
      d.jadwal_sampling.to == null
        ? new Date(d.jadwal_sampling.from).getDay() - new Date().getDay()
        : new Date(d.jadwal_sampling.to).getDay() - new Date().getDay()
    ),
  }))

  const sortedDeadline = deadlineData.sort((a, b) => a.deadline - b.deadline)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-moss_green text-ghost_white relative hover:bg-light_green",
            sortedDeadline[0].deadline <= 3
              ? "before:absolute before:-top-1 before:-right-1 before:w-4 before:h-4 before:bg-brick_red before:rounded-full before:border-2 before:border-black"
              : "",
            sortedDeadline[0].deadline <= 3
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
          {sortedDeadline.map((j, i) => (
            <div
              className="w-full border-b-2 border-pastel_moss_green py-2 text-moss_green"
              key={i}
            >
              <p>
                📅 <span className="font-bold">{j.project_name}</span> deadline
                is <span className="font-bold">{j.deadline}</span> days left.
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
