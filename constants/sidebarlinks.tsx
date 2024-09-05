import { HiChartBar } from "react-icons/hi";
import { LiaRunningSolid } from "react-icons/lia";
import {
  AiFillHome,
  AiOutlineCheckCircle,
  AiOutlineGooglePlus,
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { FaRunning, FaBookmark } from "react-icons/fa";
import { ReactNode } from "react";
import { GiLoveLetter, GiPaper } from "react-icons/gi";
import { LetterCaseCapitalizeIcon, PlusIcon } from "@radix-ui/react-icons";
import { Archive, Mail } from "lucide-react";
import { BsFileText } from "react-icons/bs";
import { BiSolidBox } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { GiChemicalDrop } from "react-icons/gi";
import { FiArchive } from "react-icons/fi";

export interface ISidebarLinks {
  route: string;
  label: string;
  icon: ReactNode;
}

export const adminLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <AiOutlinePlusCircle />,
    route: "/register",
    label: "Register",
  },
  {
    icon: <Archive />,
    route: "/pplhp",
    label: "PPLHP",
  },
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
  {
    icon: <FaBookmark />,
    route: "/approval",
    label: "Project Approval",
  },
];

export const TMLinks: ISidebarLinks[] = [
  adminLinks[0],
  adminLinks[2],
  adminLinks[3],
  adminLinks[4],
  // {
  //   icon: <Archive />,
  //   route: "/inventory",
  //   label: "Inventory",
  // },
];

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
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];

export const samplingSPVLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "",
    label: "Dashboard",
  },
  {
    icon: <FaRunning />,
    route: "/project",
    label: "Project",
  },
  // {
  //   icon: <FiFileText />,
  //   route: "/assignment-letter",
  //   label: "Assignment Letter",
  // },
  {
    icon: <Archive />,
    route: "/sample",
    label: "Sample",
  },
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];

export const samplingUSERLinks: ISidebarLinks[] = [
  samplingSPVLinks[0],
  samplingSPVLinks[2],
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];

export const pplhpLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "/receive",
    label: "Receive",
  },
  {
    icon: <HiChartBar />,
    route: "/lhpdraft",
    label: "Pembuatan Draft LHP",
  },
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
  // {
  //   icon: <FaRunning />,
  //   route: "/finalreview",
  //   label: "Final Review LHP dan Printing",
  // },
];

export const labLinks: ISidebarLinks[] = [
  {
    icon: <AiFillHome />,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <FiFileText />,
    route: "/verifikasi-data",
    label: "Verifikasi Data",
  },
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];

export const labUSERLinks: ISidebarLinks[] = [
  labLinks[0],
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];

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
  {
    icon: <GiChemicalDrop />,
    route: "/inventory",
    label: "Inventory",
  },
];
