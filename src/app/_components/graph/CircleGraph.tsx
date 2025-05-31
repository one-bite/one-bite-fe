"use client"

import {buildStyles, CircularProgressbar} from "react-circular-progressbar";

interface CircleGraphProps {
    value: number;
    title?: string;
    color: "blue" | "lime" | "orange" | "red" | "yellow" | "indigo" | "gray";
    size: number;
    numerator:number;
    denominator: number;
}

const tailwindColorMap: Record<CircleGraphProps["color"], string> = {
    blue: "#3b82f6",
    lime: "#84cc16",
    orange: "#f97316",
    red: "#ef4444",
    yellow: "#eab308",
    indigo: "#6366f1",
    gray: "#6b7280",
};

const CircleGraph  = ({value, title, color, size, numerator, denominator} : CircleGraphProps) => {
    const hexColor = tailwindColorMap[color];

    return (
        <div className={`flex flex-col items-center justify-center`}>
            <p className={"text-xs font-medium font-linebold mb-1"} style={{color:hexColor}}> {numerator} / {denominator} </p>
            <div style={{width:size, height:size}}>
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        pathColor:hexColor,
                        textColor:hexColor,
                        trailColor:"#e5e7eb",
                        textSize:"28px",
                    })}
                />
            </div>
            {!(!title) && (
                <p className={"text-xs mt-1 text-center"} style={{color:hexColor}}>
                    {title}
                </p>
            )}
        </div>
    )
};

export default CircleGraph;