import { getLinkFiles } from "@/lib/actions/receive.actions"
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage"
import { SelectSeparator } from "@/components/ui/select"
import { AiOutlineFile } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import LHPDraftPage from "@/components/pplhp/LHPDraftPage"
import LaporanHasilPemeriksaan from "@/components/pplhp/LaporanHasilPemeriksaan"
import FNPrintPage from "@/components/pplhp/FNPrintPage"
import axios from "axios"
import { useEffect, useState } from "react"
import { changeToFinished } from "@/lib/actions/pplhp.actions"
import { revalidatePath } from "next/cache"

const LaporanHasilPemeriksaanData = {
  value: "link1.",
  label: "link 1",
}

export default async function Home({ params }: { params: { np: string } }) {
  const linkData = await getLinkFiles(params.np)
  revalidatePath("/pplhp/finalreview")
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="lg:w-3/5">
          <FNPrintPage linkData={linkData ? linkData : []} />
        </div>

        <div className="lg:w-2/5 py-24 lg:py-0">
          <LaporanHasilPemeriksaan
            title="Pengisian LHP"
            color="dark_brown"
            link={linkData ? linkData.lhp : []}
            np={params.np} // Pass params.np directly
            context="finalreview"
          />
        </div>
      </main>
    </>
  )
}
