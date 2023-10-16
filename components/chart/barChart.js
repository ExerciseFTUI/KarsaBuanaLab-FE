"use client";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    BarElement,
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

function BarChart() {
    const data = {
        labels: salesData.map((data) => data.month),
        datasets: [
        {
            label: "Jumlah",
            data: salesData.map((data) => data.sales),
            borderColor: "#333D29",
            borderWidth: 3,
            pointBorderColor: "light_green",
            pointBorderWidth: 3,
            tension: 0.5,
            fill: true,
            backgroundColor: "#C2C5AA"
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
        <div className="w-auto sm:w-60 mt-6 h-auto mr-6 ">
            <h4 className="text-xs bg-light_green w-fit px-2 rounded-md font-medium text-start">
                Offers
            </h4>
            <div className="cursor-pointer ">
                <Bar data={data} options={options}></Bar>
            </div>
        </div>
    );
}

export {BarChart};