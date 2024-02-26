import InputDokumenFinalReview from "@/components/lab/InputDokumenFinalReview";
import ListDokumen from "@/components/lab/ListDokumen";
import { Separator } from "@/components/ui/separator"

const dokumenData = [
    { title: "Rekaman tahap 19.1-FIK s.d 19.132-FIK", link: "/link1" },
    { title: "Judul Dokumen 2", link: "/link2" },
    { title: "Judul Dokumen 3", link: "/link3" },
];

export default function Home({ params }: { params: { np: string } }) {

    return (
        <div className="flex flex-row justify-between m-5 mx-10 h-full">
            <div className="flex flex-col w-[45%]">
                <h1 className="text-black_brown text-2xl font-semibold pb-8">Lihat Dokumen</h1>
                <div className="space-y-5">
                    {dokumenData.map((data, index) => (
                        <ListDokumen
                            key={index} 
                            title={data.title}
                            link={data.link}
                            color="light_brown"
                        />
                    ))}
                </div>
            </div>
            <Separator orientation="vertical" className="bg-light_brown" />
            <div className="flex flex-col w-[45%] relative">
                <h1 className="text-black_brown text-2xl font-semibold pb-8">Input Dokumen</h1>
                <InputDokumenFinalReview color="light_brown" />
                <div className="flex flex-row absolute bottom-5 w-full justify-between">
                    <button className="w-[47%] text-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown" >Cancel</button>
                    <button className="w-[47%] text-white bg-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown" >Save</button>                
                </div>
            </div>
        </div>
    )
}