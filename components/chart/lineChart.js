"use client";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

const salesData = [
    { month: "Jan", sales: 23 },
    { month: "Feb", sales: 15 },
    { month: "Mar", sales: 20 },
    { month: "Apr", sales: 12 },
    { month: "Mei", sales: 18 },
    { month: "Jun", sales: 25 },
];

function LineChart() {
    const data = {
        labels: salesData.map((data) => data.month),
        datasets: [
        {
            label: "Jumlah",
            data: salesData.map((data) => data.sales),
            borderColor: "#FF0000",
            borderWidth: 3,
            pointBorderColor: "#FF0000",
            pointBorderWidth: 3,
            tension: 0.5,
            fill: true,
            backgroundColor: "#FF8383"
        },
        ],
    };

    const options = {
        responsive: true,

        scales: {
            y: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
                title: {
                display: true,
                text: "Jumlah",
                padding: {
                    bottom: 5,
                },
                font: {
                    size: 10,
                    style: "italic",
                    family: "Arial",
                    weight: "Bold"
                },
                },
                min: 10
            },

            x: {
                ticks: {
                    font: {
                        size: 10,
                    },
                },
                title: {
                    display: true,
                    text: "Bulan",
                    padding: {
                        top: 5,
                    },
                    font: {
                        size: 10,
                        style: "italic",
                        family: "Arial",
                        weight: "bold"
                    },
                },
            },
        },
    };

    return (
        <div className="h-60 w-full sm:w-60 mr-10 mt-6 ">
            <h4 className="text-xs bg-light_green w-fit px-2 rounded-md font-medium text-start">
                Project Cancelled
            </h4>
            <div className="cursor-pointer ">
                <Line data={data} options={options}></Line>
            </div>
        </div>
    );
}

export {LineChart};