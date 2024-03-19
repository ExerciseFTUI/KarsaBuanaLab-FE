import getSessionServer from "@/lib/actions/getSessionServer"
import { redirect } from "next/navigation"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import CalendarSample from '@/components/sampling/dashboard/CalendarSample'
import { getDashboardSampling } from "@/lib/actions/sampling.actions"


export default async function Sampling() {
  const data = await getDashboardSampling();
  const assignSampling = data ? data.result : [];
  
  // const session = await getSessionServer()

  // if (session?.user.role == "SPV" || session?.user.role == "ADMIN")
  //   redirect("/sampling/project")

  // if (session?.user.role == "USER") redirect("/sampling/sample")

  return(
    <>
      <div className=" w-full h-fit flex flex-col">
        {/* <div className=" text-black font-semibold text-xl"> This is Dashboard</div> */}
        <CalendarSample data={assignSampling}/>
      </div>
    </>
  )

}
