import { User } from "./user.model";
import { Regulation } from "./regulation.model";

export interface Sampling {
  sample_name: string;
  fileId: string;
  param: any[];
  regulation: Regulation;
  assigned_to: User;
  status: string;
  _id: string;
}