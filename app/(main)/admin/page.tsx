import { AdminDataTable } from "@/components/auth/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUser } from "@/lib/actions/admin.action";
import getSessionServer from "@/lib/actions/getSessionServer";
import { UserType } from "@/lib/type";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function AdminPage() {
  const response = await getAllUser();
  const accounts: UserType[] = response ? response.result : [];

  return (
    <div className="w-full">
      {/* <RunningTable projects={projects.result} /> */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Marketing Page
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="">
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </div>
            <Link href="/marketing">
              <Button variant={"outline"} className="mt-4">
                <p className="hidden mr-1 max-md:block 2xl:block">View Page</p>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sampling Page</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="">
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </div>

            <Link href={"sampling"}>
              <Button variant={"outline"} className="mt-4">
                <p className="hidden mr-1 max-md:block 2xl:block">View Page</p>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PPLHP Page</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="">
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </div>

            <Link href={"pplhp"}>
              <Button variant={"outline"} className="mt-4">
                <p className="hidden mr-1 max-md:block 2xl:block">View Page</p>
                <ChevronRightIcon className=" h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lab Page</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="">
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </div>
            <Link href={"/lab"}>
              <Button variant={"outline"} className="mt-4">
                <p className="hidden mr-1 max-md:block 2xl:block">View Page</p>
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <p className="text-2xl pt-4 px-1 font-bold text-dark_green capitalize">
        Table
      </p>
      <AdminDataTable datas={accounts} />
    </div>
  );
}
