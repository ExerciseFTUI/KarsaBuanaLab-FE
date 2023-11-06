import { HiChartBar } from "react-icons/hi";
import { LiaRunningSolid } from "react-icons/lia";
import { AiFillHome, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { FaRunning } from "react-icons/fa";
import { ReactNode } from "react";

export interface ISidebarLinks {
  route: string;
  label: string;
  icon: ReactNode;
}

export const marketingLink: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <HiChartBar />,
    route: "/ondiscuss",
    label: "OnDiscuss",
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
];

export const samplingLinks: ISidebarLinks[] = [
  // {
  //   icon: <AiFillHome />,
  //   route: "",
  //   label: "Project",
  // },
  {
    icon: <HiChartBar />,
    route: "/ondiscuss",
    label: "Assignment Letter",
  },
  {
    icon: <FaRunning />,
    route: "/running",
    label: "Sampling",
  },
];

export const pplhpLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <HiChartBar />,
    route: "/ondiscuss",
    label: "Pembuatan Draft LHP",
  },
  {
    icon: <FaRunning />,
    route: "/running",
    label: "Final Review LHP dan Printing",
  },
];

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
];

export const sampleRecipientLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
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
];
