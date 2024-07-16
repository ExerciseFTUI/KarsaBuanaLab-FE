import LoadingScreen from "@/components/LoadingScreen";
import getSessionServer from "@/lib/actions/getSessionServer";
import { redirect } from "next/navigation";

export default async function GatewayPage() {
  const data = await getSessionServer();
  //TODO: Handle Manajer Teknis
  if (data?.user.division) {
    data.user.division.toLowerCase() === "marketing"
      ? redirect("/marketing")
      : data.user.division.toLowerCase() === "sampling"
      ? redirect("/sampling")
      : data.user.division.toLowerCase() === "pplhp"
      ? redirect("/pplhp")
      : data.user.division.toLowerCase() === "admin"
      ? redirect("/admin")
      : redirect("/lab");
  } else {
    redirect("/denied");
  }

  return (
    <>
      <LoadingScreen text="Please Wait..." />
    </>
  );
}
