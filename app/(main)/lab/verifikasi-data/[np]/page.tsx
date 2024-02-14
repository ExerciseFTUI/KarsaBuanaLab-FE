import HasilPengujian from "@/components/lab/HasilPengujian";
import ListDokumen from "@/components/lab/ListDokumen";
import { Separator } from "@/components/ui/separator"

const dokumenData = [
    { title: "Rekaman 28.3-FPP: Log Penerimaan dan Pendistribusian Sampel", link: "/link1" },
    { title: "18.2-FPP: Akomodasi Lingkungan", link: "/link2" },
    { title: "Judul Dokumen 3", link: "/link3" },
];

const hasilPengujianData = [
    { title: "Air Tanah/0001-1", regulasi: 999, hasilUji: 888 },
    { title: "Judul Pengujian 2", regulasi: 777, hasilUji: 666 },
    { title: "Judul Pengujian 3", regulasi: 555, hasilUji: 444 },
];


export default function Home({ params }: { params: { np: string } }) {

    return (
        <div className="flex flex-row justify-between m-5 mx-10 h-full">
            <div className="flex flex-col w-[40%]">
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
            <div className="flex flex-col w-[50%] relative">
                <h1 className="text-black_brown text-2xl font-semibold pb-8">Hasil Pengujian</h1>
                <div className="space-y-4">
                    {hasilPengujianData.map((data, index) => (
                        <HasilPengujian
                            key={index} // Perhatikan penggunaan index sebagai key, ini sebaiknya digunakan jika data tidak memiliki properti unik (seperti id)
                            title={data.title}
                            regulasi={data.regulasi}
                            hasilUji={data.hasilUji}
                        />
                    ))}
                </div>
                <div className="flex flex-row absolute bottom-5 w-full justify-between">
                    <button className="w-[47%] text-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown" >Cancel</button>
                    <button className="w-[47%] text-white bg-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown" >Save</button>
                </div>
            </div>
        </div>
    )
}