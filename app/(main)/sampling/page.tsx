import getSessionServer from "@/lib/actions/getSessionServer"
import { redirect } from "next/navigation"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import CalendarSample from '@/components/sampling/dashboard/CalendarSample'
import { getDashboardSampling } from "@/lib/actions/sampling.actions"


export default async function Sampling() {
  const data = await getDashboardSampling();
  let assignSampling = data.result || [];

  const session = await getSessionServer();
  const user = session?.user || "";
  const role = user ? user.role.toUpperCase() : "";

  // // If session exists, role is "USER", and assignSampling has elements, filter assignSampling based on user.id
  if (session && role === "USER" && assignSampling.length > 0) {
    assignSampling = assignSampling.filter((sample) => sample.person.includes(session.user.name));
  }

  return(
    <>
      <div className=" w-full h-fit flex flex-col">
        {/* <div className=" text-black font-semibold text-xl"> This is Dashboard</div> */}
        <CalendarSample data={assignSampling}/>
      </div>
    </>
  )

}
