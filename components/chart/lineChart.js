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

function LineChart( {detailGraph} ) {
    let maxSalesValue = 0;
    detailGraph.salesData.forEach(monthData => {
        if (monthData.sales > maxSalesValue) {
            maxSalesValue = monthData.sales;
        }
    });

    maxSalesValue = Math.ceil(maxSalesValue * 1.1);

    const data = {
        labels: detailGraph.salesData.map((data) => data.month),
        datasets: [
        {
            label: detailGraph.title,
            data: detailGraph.salesData.map((data) => data.sales),
            borderColor: detailGraph.borderColor,
            borderWidth: 3,
            pointBorderColor: detailGraph.borderColor,
            pointBorderWidth: 3,
            tension: 0.5,
            fill: true,
            backgroundColor: detailGraph.backgroundColor,
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
                min: 0,
                max: maxSalesValue
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

    var bgColor = "#03FCF0";
    if (detailGraph.title === "Project Cancelled") {
        bgColor = "#FF8383";
    } else if (detailGraph.title === "Project Finished") {
        bgColor = "#C2FC03";
    }

    return (
        <div className="h-full w-full mt-6 ">
            <h4 className={`text-xs w-fit px-2 rounded-md font-medium text-start`} style={{ backgroundColor: bgColor }}>
                {detailGraph.title}
            </h4>
            <div className="cursor-pointer flex flex-row justify-center ">
                <Line data={data} options={options}></Line>
            </div>
        </div>
    );
}

export {LineChart};