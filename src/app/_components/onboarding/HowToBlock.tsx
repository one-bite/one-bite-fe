import React from "react";

interface HowToBlockProps {
    step: number;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

const HowToBlock = ({ step, title, description, icon }: HowToBlockProps) => (
    <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-lime-200 rounded-full flex items-center justify-center mb-2 text-xl font-bold">{icon ? icon : step}</div>
        <p className="font-bold mb-1">{title}</p>
        <p className="text-gray-600 text-center">{description}</p>
    </div>
);

export default HowToBlock;
