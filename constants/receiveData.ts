import { PplhpReceiveSamplingType, SampleType } from "@/lib/type";
import { randomInt, randomUUID } from "crypto";
import projectJson from "@/constants/data/projectData.json";

// function generateRandomData(length: number = 100): ReceiveSamplingType[] {
//   let data: ReceiveSamplingType[] = [];

  // for (let i = 1; i <= length; i++) {
  //   let temp: ReceiveSamplingType = {
  //     _id: "1",
  //     no_penawaran: "PNW" + (i < 10 ? "0" + i : i + ""),
  //     project_name: "Project " + i,
  //     alamat_kantor: "Kantor " + i,
  //     alamat_sampling: "Alamat Sample " + i,
  //     contact_person: "Orang " + i,
  //   };

//     data.push(temp);
//   }

//   return data;
// }

const projectData: PplhpReceiveSamplingType[] = JSON.parse(
  JSON.stringify(projectJson)
);

// export { projectData };
