import CreateProjectPage from "@/components/marketing/createProject/CreateProjectPage";
import { getSample } from "@/lib/actions/marketing.actions";

export default async function Page() {
  const response = await getSample();

  return (
    <>
      <div className="w-full px-2">
        <CreateProjectPage baseSamples={response ? response.result : []} />
      </div>
    </>
  );
}
