import Project from "@/components/sampling/projectDetails"

// prettier-ignore
export default function SamplingProject({ params }: { params: { np: string } }) { 
  return (
    <div className="flex flex-col w-full border-t-light_brown border-t-2 py-4 lg:flex-row">
      <Project params={params} />
    </div>
  )
}
