import ProjectDetail from "@/components/sampling/letterDetail"
import { getProject } from "@/lib/actions/marketing.actions";
import { getSampleById } from "@/lib/actions/sampling.actions";

export default async function SamplingProject({ params }: { params: { np: string } }) { 
  const res = await getProject(params.np)
  const data : any = res ? res.result : null

  return (
    <div className="flex overflow-auto custom-scrollbar w-full border-t-light_brown border-t-2 py-4">
      <ProjectDetail data={data} />
    </div>
  )
}
