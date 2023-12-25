import { User } from "./user.model"
import { Regulation } from "./regulation.model"

export interface Sampling {
  sample_name: string
  harga: string
  fileId: string
  param: string[]
  regulation: Regulation
  location: string
  assigned_to: User[]
  status: string // "ASSIGNED" | "NOT ASSIGNED" | "FINISHED"
  jadwal: Date
  _id: string
}
