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

const projectsData = [
  {
    project_name: "Project 2",
    jadwal_sampling: new Date("2024-02-15"),
  },
  {
    project_name: "Project 1",
    jadwal_sampling: new Date("2024-01-28"),
  },
  {
    project_name: "Project 3",
    jadwal_sampling: new Date("2024-01-30"),
  },
]

export function DeadlineNotification() {
  // prettier-ignore
  const sortedData = projectsData.sort((a, b) => (a.jadwal_sampling as any) - (b.jadwal_sampling as any))

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-moss_green text-ghost_white hover:bg-light_green"
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
          {sortedData.map((j, i) => (
            <div
              className="w-full border-b-2 border-pastel_moss_green py-2 text-moss_green"
              key={i}
            >
              <p>
                📅 <span className="font-bold">{j.project_name}</span> deadline
                is{" "}
                <span className="font-bold">
                  {Math.round(
                    (j.jadwal_sampling.getTime() - new Date().getTime()) /
                      (1000 * 3600 * 24)
                  )}
                </span>{" "}
                days left.
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
