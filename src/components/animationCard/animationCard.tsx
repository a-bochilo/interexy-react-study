import { useEffect, useRef } from "react";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export type AnimationCardProps = "css" | "interval" | "raf";

const AnimationField = styled(Paper)`
    background-color: ${({ theme }) => theme.palette.success.light};
    height: 140px;
    width: 500px;
    padding: 10px;
    position: relative;

    .runner {
        background-color: ${({ theme }) => theme.palette.common.white};
        height: 120px;
        width: 120px;

        &[id="css"] {
            animation: 2s linear 0s infinite alternate runner;
        }
    }

    @keyframes runner {
        from {
            left: 0;
        }
        to {
            left: 100%;
            translate: -100%;
        }
    }
`;

const AnimationCard = ({ id }: { id: AnimationCardProps }) => {
    const boxRef = useRef(null);
    const runnerRef = useRef(null);

    useEffect(() => {
        switch (id) {
            case "css":
                break;
            case "interval": {
                if (!boxRef.current || !runnerRef.current) return;
                const intervalId = animationVSInterval(
                    boxRef.current,
                    runnerRef.current,
                    2
                );
                return () => clearInterval(intervalId);
            }
            case "raf": {
                if (!boxRef.current || !runnerRef.current) return;
                const rafId = animationRAF(
                    boxRef.current,
                    runnerRef.current,
                    2
                );
                return () => cancelAnimationFrame(rafId);
            }
            default:
                return;
        }
    }, [boxRef, runnerRef, id]);

    const getRange = (box: HTMLElement, runner: HTMLElement) => {
        const runnerWidth = runner.getBoundingClientRect().width;
        const parentPadding = parseInt(getComputedStyle(box).paddingLeft);
        const boxWidth = box.clientWidth - 2 * parentPadding;
        let range = boxWidth - runnerWidth;

        return range;
    };

    const animationVSInterval = (
        box: HTMLElement,
        runner: HTMLElement,
        duration: number
    ) => {
        const range = getRange(box, runner);

        let progress = 0;
        let delta = range / (duration * 100);

        const move = () => {
            progress += delta;
            if (progress > range || progress < 0) {
                delta *= -1;
            } else {
                runner.style.translate = `${progress}px`;
            }
        };

        const intervalId = setInterval(() => move(), 10);
        return intervalId;
    };

    const animationRAF = (
        box: HTMLElement,
        runner: HTMLElement,
        duration: number
    ) => {
        const range = getRange(box, runner);

        let start = Date.now();
        let direction: "forward" | "backward" = "forward";

        const step = () => {
            let time = Date.now();
            let timeFraction = (time - start) / (duration * 1000);
            if (timeFraction >= 1 && direction === "forward") {
                timeFraction = 1;
            }
            if (timeFraction >= 1 && direction === "backward") {
                timeFraction = 0;
            }
            let progress =
                direction === "forward"
                    ? range * timeFraction
                    : range - range * timeFraction;
            if (timeFraction === 1) {
                start = time;
                direction = "backward";
            }
            if (timeFraction === 0) {
                direction = "forward";
                start = time;
                progress = 0;
            }

            runner.style.translate = `${progress}px`;

            requestAnimationFrame(step);
        };

        return requestAnimationFrame(step);
    };

    return (
        <AnimationField ref={boxRef}>
            <AnimationField ref={runnerRef} id={`${id}`} className="runner">
                {id}
            </AnimationField>
        </AnimationField>
    );
};

export default AnimationCard;
