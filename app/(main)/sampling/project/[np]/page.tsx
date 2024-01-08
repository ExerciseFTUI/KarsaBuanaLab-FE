import Project from "@/components/sampling/projectDetail"
import { getSampleById } from "@/lib/actions/sampling.actions"

export default async function SamplingProject({ params }: { params: { np: string } }) { 
  const res = await getSampleById("2023", params.np)
  const sampleData : any = res.result; 

  return (
    <div className="border-t-light_brown border-t-2 pt-4 h-fit">
      <Project sampleData={sampleData} className="flex-wrap h-full" />
    </div>
  )
}
