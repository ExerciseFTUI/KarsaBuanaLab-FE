import { options } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export default async function getSessionServer() {
  return await getServerSession(options);
}
