import { useState, useRef, useEffect } from "react";

import { Button, TextField, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)`
    display: flex;
    align-items: bottom;
    width: 400px;

    .MuiInputBase-root {
        background-color: white;
    }
    button {
        background-color: ${({ theme }) => theme.palette.success.light};
        color: ${({ theme }) => theme.palette.common.white};
        flex-shrink: 0;

        &:hover {
            background-color: ${({ theme }) => theme.palette.error.light};
        }
    }
`;

const WorkerComponent = () => {
    const [worker, setWorker] = useState<Worker | null>();
    const [workerResult, setWorkerResult] = useState<string>("Worker results");
    const [isWorkerRunning, setIsWorkerRunning] = useState<boolean>(false);
    const isInitialLoading = useRef<boolean>(true);

    useEffect(() => {
        if (!isInitialLoading.current) return;
        const worker = new Worker(
            new URL("../../workers/test.worker", import.meta.url)
        );
        setWorker(worker);
        worker.onmessage = (e) => {
            setWorkerResult(e.data);
            setIsWorkerRunning(false);
        };
        isInitialLoading.current = false;
    }, []);

    const handleClick = () => {
        if (!worker) return;
        worker.postMessage(2000);
        setIsWorkerRunning(true);
    };

    return (
        <CustomBox>
            <Button
                color="error"
                disabled={isWorkerRunning}
                onClick={handleClick}
            >
                Run worker
            </Button>
            <TextField
                disabled={!workerResult}
                value={workerResult}
                fullWidth
                size="small"
            />
        </CustomBox>
    );
};

export default WorkerComponent;
