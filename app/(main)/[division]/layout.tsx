import { headers } from "next/headers";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function Page({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";

  console.log(fullUrl);

  const routeList = ["marketing", "sampling", "lab", "pplhp", "admin"];

  const isValidRoute = routeList.some((route) => fullUrl.includes(route));

  if (!isValidRoute) {
    redirect("/denied");
  }

  return <main className="">{children}</main>;
}
