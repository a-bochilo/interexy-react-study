import { useState, useRef, useEffect } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

const CustomBox = styled(Box)`
    flex-grow: 1;
    height: 90%;
    justify-content: center;
    display: flex;
`;

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

const ChartsPage = () => {
    const [workerData, setWorkerData] = useState<number[]>([]);
    const isInitialLoading = useRef<boolean>(true);

    useEffect(() => {
        if (!isInitialLoading.current) return;
        const worker = new Worker(
            new URL("../../workers/charts.worker", import.meta.url)
        );
        worker.postMessage({ amount: 20000, range: 150 });
        worker.onmessage = (e) => {
            setWorkerData(e.data);
        };
        isInitialLoading.current = false;
    }, []);

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                stacked: true,
            },
        },
    };

    const lineData = {
        labels: workerData.map((_, i) => `${i + 1}`),
        datasets: [
            {
                label: "My chart",
                data: workerData,
                backgroundColor: "rgb(255, 0, 0)",
                borderColor: "red",
                borderWidth: 0.5,
                pointRadius: 1.5,
                fill: {
                    target: "origin",
                    above: "rgba(0, 255, 26, 0.441)",
                    below: "rgba(195, 255, 0, 0.441)",
                },
                tension: 0.5,
            },
        ],
    };

    return (
        <CustomBox>
            {workerData && <Line options={lineOptions} data={lineData} />}
        </CustomBox>
    );
};

export default ChartsPage;
