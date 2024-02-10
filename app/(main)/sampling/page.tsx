import getSessionServer from "@/lib/actions/getSessionServer"
import { redirect } from "next/navigation"

export default async function Sampling() {
  const session = await getSessionServer()

  if (session?.user.role == "SPV") redirect("/sampling/project")

  if (session?.user.role == "USER") redirect("/sampling/sample")
}
