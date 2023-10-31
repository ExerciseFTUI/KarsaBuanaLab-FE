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

export const sidebarLinks: ISidebarLinks[] = [
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

// export const sidebarLinks = [
//   {
//     imgURL: "/assets/home.svg",
//     route: "",
//     label: "Dashboard",
//   },
//   {
//     imgURL: "/assets/discuss.svg",
//     route: "/ondiscuss",
//     label: "OnDiscuss",
//   },
//   {
//     imgURL: "/assets/running.svg",
//     route: "/running",
//     label: "Running",
//   },
//   {
//     imgURL: "/assets/finished.svg",
//     route: "/finished",
//     label: "Finished",
//   },
//   {
//     imgURL: "/assets/cancelled.svg",
//     route: "/cancelled",
//     label: "Cancelled",
//   },
// ];
