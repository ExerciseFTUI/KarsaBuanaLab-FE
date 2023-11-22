import { DataTable } from "@/components/DataTable";
import { useRouter } from 'next/router';
import axios from 'axios'
import { number } from "zod";
import { type } from "os";
import { id } from "date-fns/locale";

type dataType = {
    id : number;
    name : string;
    username : string;
}

async function getData() : Promise<dataType[]> {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        // console.log(response.data)
        return response.data
    } catch (error : any) {
        console.log(error.message)
        return []
    }
}

export default async function Home() {
    
    const datas = await getData()

    return (
        <div className="flex justify-center flex-col items-center w-full ">
        {/* <h1>Hello From /ondiscuss</h1> */}
        {datas.map((data, index) => (
            <div key={data.id} className=" w-96 h-64 bg-green-400 justify-center">
                <p className=" text-white flex w-fit  ">Index ke : {index}</p>
                <div className=" w-80 mb-10 py-5 flex flex-col justify-center bg-green-600 text-white text-lg">
                    <p className="flex justify-center">
                        {data.name}
                    </p>
                    <p className="flex justify-center">
                        {data.username}
                    </p>
                </div>
            </div>
        ))}
        {/* <DataTable /> */}
        </div>
    );
}
