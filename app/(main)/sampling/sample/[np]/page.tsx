import ProjectDetail from "@/components/sampling/sampleDetails"
import { getSampleById } from "@/lib/actions/sampling.actions";

export default async function SamplingProject({ params }: { params: { np: string } }) { 
  const res = await getSampleById("2023", params.np)
  const sampleData : any = res.result;

  return (
    <div className="flex overflow-auto custom-scrollbar w-full border-t-light_brown border-t-2 py-4">
      <ProjectDetail data={sampleData} />
    </div>
  )
}
