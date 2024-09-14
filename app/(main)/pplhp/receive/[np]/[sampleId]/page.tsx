import PPLHPDetailParent from "@/components/auth/pplhp/PPLHPDetailParent";
import { getSample } from "@/lib/actions/marketing.actions";
import { getDetailPPLHP } from "@/lib/actions/receive.actions";

export default async function Home({
  params,
}: {
  params: { np: string; sampleId: string };
}) {
  const details = await getDetailPPLHP(params.np, params.sampleId);
  const response = await getSample();

  return (
    <PPLHPDetailParent
      initialDetails={details}
      params={params}
      baseSamples={response ? response.result : []}
    />
  );
}
