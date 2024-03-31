import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command"
import { cn } from "@/lib/utils"
import { Sampling } from "@/lib/models/sampling.model"
import { format } from "date-fns"
import { Calendar } from "../../ui/calendar"
import { assignStaffDeadline, removeStaff } from "@/lib/actions/lab.actions"
import { toast } from "../../ui/use-toast"
import { useRouter } from "next/navigation"
import LoadingScreen from "../../LoadingScreen"
import { Project } from "@/lib/models/project.model"
import { User } from "@/lib/models/user.model"

export function LabAssignEdit({
  sampling,
  users,
  project,
}: {
  project: Project
  sampling: Sampling
  users: User[]
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const [selectedUser, setSelectedUser] = React.useState<User[]>(
    users
      .flatMap((u) =>
        sampling.lab_assigned_to.includes(u._id) == true ? u : null
      )
      .filter((u) => u !== null) as User[]
  )

  // DATE
  const jadwal_sampling =
    !!sampling && !!sampling.deadline
      ? sampling.deadline.split("-").reverse()
      : []

  const [date, setDate] = React.useState<Date | undefined>(
    jadwal_sampling.length
      ? new Date(
          parseInt(jadwal_sampling[0]),
          parseInt(jadwal_sampling[1]) - 1,
          parseInt(jadwal_sampling[2])
        )
      : undefined
  )

  async function editSampling() {
    if (selectedUser.length == 0)
      return toast({ title: "There must be at least 1 staff!" })
    if (!date) return toast({ title: "Cannot remove deadline!" })

    setIsLoading(true)

    const response = await assignStaffDeadline(
      sampling._id,
      selectedUser.map((u) => u._id),
      format(date, "dd-LL-y"),
      project._id
    )

    setIsLoading(false)

    if (!response) {
      toast({
        title: "Failed to Assign Deadline and User",
        description: "Please Try Again",
        variant: "destructive",
      })
    } else {
      toast({
        title: "User and Deadline Has Been Assigned",
        description: "Check again in the screen if its correct",
      })
    }

    router.replace(`/lab/dashboard/${project._id}`)
  }

  return (
    <Dialog>
      {isLoading && <LoadingScreen />}
      <DialogTrigger asChild>
        <Button className="py-4 px-4 w-fit mx-auto bg-light_brown hover:bg-dark_brown disabled:bg-transparent">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Sample</DialogTitle>
          <DialogDescription>
            Edit sample's deadline and assigned staffs.
          </DialogDescription>
        </DialogHeader>

        {/* EDIT SAMPLE */}
        <div className="pt-4">
          <h1 className="text-lg font-semibold mb-4">Select User</h1>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {"Select user..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full">
              <Command>
                <CommandInput placeholder="Search user..." />
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {users.length ? (
                    users
                      .filter((u) => selectedUser.includes(u) == false)
                      .map((u) => (
                        <CommandItem
                          key={u._id}
                          value={u._id}
                          onSelect={(currentValue) => {
                            setSelectedUser([
                              ...selectedUser,
                              users.find((u) => u._id == currentValue) as User,
                            ])
                            setOpen(false)
                          }}
                        >
                          {u.username}
                        </CommandItem>
                      ))
                  ) : (
                    <h1 className="px-2 pt-4 text-center">
                      All users are assigned.
                    </h1>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="mt-2">
            <p className="font-medium mb-2">Assigned:</p>

            {selectedUser.map((u, i) => (
              <div key={i} className="grid grid-cols-2 grid-flow-row mt-2">
                <h1>{u.username}</h1>

                <Button
                  onClick={() =>
                    setSelectedUser(selectedUser.filter((d) => d._id !== u._id))
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* SELECT DEADLINE */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold mb-4">Deadline Sampel</h1>

          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left text-sm font-medium py-5",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-6 w-6 text-black" />
                {date ? (
                  format(date, "LLL dd, y")
                ) : (
                  <span className="text-black">Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={date}
                selected={date}
                onSelect={setDate}
                weekStartsOn={1}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={editSampling}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
