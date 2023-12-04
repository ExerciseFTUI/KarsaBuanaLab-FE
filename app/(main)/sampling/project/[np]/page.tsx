import Project from "@/components/sampling/projectDetail"

// prettier-ignore
export default function SamplingProject({ params }: { params: { np: string } }) { 
  return (
    <div className="border-t-light_brown border-t-2 pt-4 h-fit">
      <Project params={params} className="flex-wrap h-full" />
    </div>
  )
}
