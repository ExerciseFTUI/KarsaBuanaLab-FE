import Project from "@/components/sampling/projectDetail"
import { getProject } from "@/lib/actions/marketing.actions"

export default async function SamplingProject({ params }: { params: { np: string } }) { 
  const res = await getProject(params.np)
  const data : any = res ? res.result : null

  return (
    <div className="border-t-light_brown border-t-2 pt-4 h-fit">
      <Project data={data} className="flex-wrap h-full" />
    </div>
  )
}
