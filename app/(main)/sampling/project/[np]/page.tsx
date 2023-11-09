import Project from "@/components/sampling/projectDetail"

// prettier-ignore
export default function SamplingProject({ params }: { params: { np: string } }) { 
  return (
    <div className="flex overflow-auto custom-scrollbar w-full border-t-light_brown border-t-2 py-4">
      <Project params={params} className="flex-wrap" />
    </div>
  )
}
