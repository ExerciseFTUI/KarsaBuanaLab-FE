import ProjectDetail from "@/components/sampling/sampleDetails"

// prettier-ignore
export default function SamplingProject({ params }: { params: { np: string } }) { 
  return (
    <div className="flex overflow-auto custom-scrollbar w-full border-t-light_brown border-t-2 py-4">
      <ProjectDetail params={params} />
    </div>
  )
}
