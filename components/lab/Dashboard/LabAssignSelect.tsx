import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import { cn } from "@/lib/utils";
import { Sampling } from "@/lib/models/sampling.model";
import { format } from "date-fns";
import { Calendar } from "../../ui/calendar";
import { assignStaffDeadline } from "@/lib/actions/lab.actions";
import { toast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import LoadingScreen from "../../LoadingScreen";
import { Project } from "@/lib/models/project.model";
import { User } from "@/lib/models/user.model";
import { DateRange } from "react-day-picker";

export function LabAssignSelect({
  sampling,
  users,
  project,
}: {
  project: Project;
  sampling: Sampling;
  users: User[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedUser, setSelectedUser] = React.useState<User[]>([]);

  // DATE
  const deadline = !!sampling.deadline
    ? sampling.deadline
    : { from: "", to: "" };

  let from = deadline.from ? deadline.from.split("-").reverse() : null;
  let to = deadline.to ? deadline.to.split("-").reverse() : null;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from
      ? new Date(parseInt(from[0]), parseInt(from[1]) - 1, parseInt(from[2]))
      : undefined,
    to: to
      ? new Date(parseInt(to[0]), parseInt(to[1]) - 1, parseInt(to[2]))
      : undefined,
  });

  const addSampleDeadline = async () => {
    if (!selectedUser.length) return toast({ title: "Select user first!" });
    if (!date) return toast({ title: "Select deadline first!" });

    setIsLoading(true);

    const response = await assignStaffDeadline(
      sampling._id,
      selectedUser.map((u) => u._id),
      {
        from: date?.from ? format(date.from, "dd-LL-y") : null,
        to: date?.to ? format(date.to, "dd-LL-y") : null,
      },
      project._id
    );

    setIsLoading(false);
    setDialogOpen(false);
    setSelectedUser([]);
    setDate(undefined);

    if (!response) {
      toast({
        title: "Failed to Assign Deadline and User",
        description: "Please Try Again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "User and Deadline Has Been Assigned",
        description: "Check again in the screen if its correct",
      });
    }

    router.refresh();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {isLoading && <LoadingScreen />}
      <DialogTrigger asChild>
        <Button className="py-4 px-4 w-fit mx-auto bg-light_brown hover:bg-dark_brown disabled:bg-transparent">
          Assign
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Sample</DialogTitle>
          <DialogDescription>
            Assign sample and its deadline to a lab staff.
          </DialogDescription>
        </DialogHeader>

        {/* SELECT SAMPLE */}
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
                            ]);
                            setOpen(false);
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
                {!!date?.from ? (
                  !!date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <h1 className="">Pilih tanggal</h1>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                weekStartsOn={1}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={() => addSampleDeadline()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
