import { HiChartBar } from "react-icons/hi"
import { LiaRunningSolid } from "react-icons/lia"
import { AiFillHome, AiOutlineCheckCircle } from "react-icons/ai"
import { MdOutlineCancel } from "react-icons/md"
import { FaRunning } from "react-icons/fa"
import { ReactNode } from "react"
import { GiLoveLetter, GiPaper } from "react-icons/gi"
import { LetterCaseCapitalizeIcon } from "@radix-ui/react-icons"
import { Archive, Mail } from "lucide-react"
import { BsFileText } from "react-icons/bs"
import { BiSolidBox } from "react-icons/bi"
import { FiFileText } from "react-icons/fi"

export interface ISidebarLinks {
  route: string
  label: string
  icon: ReactNode
}

export const marketingLink: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <FaRunning />,
    route: "/running",
    label: "Running",
  },
  {
    icon: <AiOutlineCheckCircle />,
    route: "/finished",
    label: "Finished",
  },
  {
    icon: <MdOutlineCancel />,
    route: "/cancelled",
    label: "Cancelled",
  },
  {
    icon: <HiChartBar />,
    route: "/sample",
    label: "Sample",
  },
]

export const samplingLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "/project",
    label: "Project",
  },
  {
    icon: <FiFileText />,
    route: "/assignment-letter",
    label: "Assignment Letter",
  },
  {
    icon: <Archive />,
    route: "/sample",
    label: "Sample",
  },
]

export const pplhpLinks: ISidebarLinks[] = [
  {
    icon: <HiChartBar />,
    route: "/lhpdraft",
    label: "Pembuatan Draft LHP",
  },
  {
    icon: <FaRunning />,
    route: "/finalreview",
    label: "Final Review LHP dan Printing",
  },
]

export const labLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <HiChartBar />,
    route: "/ondiscuss",
    label: "Data Pengujian",
  },
  {
    icon: <FaRunning />,
    route: "/running",
    label: "Verified Data",
  },
]

export const sampleReceiveLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Projects",
  },
  {
    icon: <HiChartBar />,
    route: "/ondiscuss",
    label: "Pengamanan",
  },
]
