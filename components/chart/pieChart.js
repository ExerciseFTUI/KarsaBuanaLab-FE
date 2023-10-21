// "use client";
// import { Pie } from "react-chartjs-2";

// // import {
// //     Chart as ChartJS,
// //     PieElement,
// //     CategoryScale, // x axis
// //     LinearScale, // y axis
// //     PointElement,
// //     Legend,
// //     Tooltip,
// //     Filler,
// // } from "chart.js";

// // ChartJS.register(
// //     PieElement,
// //     CategoryScale,
// //     LinearScale,
// //     PointElement,
// //     Legend,
// //     Tooltip,
// //     Filler
// // );

// const DATA_COUNT = 5;
// const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

// const data = {
// labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
// datasets: [
//     {
//     label: 'Dataset 1',
//     data: Utils.numbers(NUMBER_CFG),
//     }
// ]
// };

// function PieChart() {

//     const config = {
//         type: 'doughnut',
//         data: data,
//         options: {
//             responsive: true,
//             plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Chart.js Doughnut Chart'
//             }
//             }
//         },
//         };

//     return (
//         <div className="h-60 w-full sm:w-60 mr-10 mt-6 ">
//             <h4 className="text-xs bg-light_green w-fit px-2 rounded-md font-medium text-start">
//                 Project Cancelled
//             </h4>
//             <div className="cursor-pointer ">
//                 <Pie data={data} options={config}></Pie>
//             </div>
//         </div>
//     );
// }

// export {PieChart};