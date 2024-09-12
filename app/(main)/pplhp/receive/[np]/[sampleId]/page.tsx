import PPLHPDetailParent from "@/components/auth/pplhp/PPLHPDetailParent";
import { getDetailPPLHP } from "@/lib/actions/receive.actions";

export default async function Home({
  params,
}: {
  params: { np: string; sampleId: string };
}) {
  const details = await getDetailPPLHP(params.np, params.sampleId);

  return <PPLHPDetailParent initialDetails={details} params={params} />;
}
