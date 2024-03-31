import { User } from "./user.model";
import { Regulation } from "./regulation.model";

export interface Sampling {
  sample_name: string;
  harga: string;
  fileId: string;
  param: string[];
  regulation_name: Regulation[];
  location: string;
  assigned_to: User[];
  status: string; // "SUBMIT" | "WAITING" | "ACCEPTED" | "REVISION"
  jadwal: Date;
  _id: string;
}

// export interface Param {
//   param: string;
//   method: string[];
//   unit: string[];
//   operator: string;
//   baku_mutu: number;
//   _id: string;
// }

export interface CalendarSample {
  _id: string;
  title: string;
  start: string;
  end: string;
  person: string[];
}
