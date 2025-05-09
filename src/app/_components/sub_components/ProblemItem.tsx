"use client"

"use client";

import React from "react";

interface ProblemItemProps {
    id: number | string;
    title: string;
}

const ProblemItem = ({ id, title }: ProblemItemProps) => {
    return (
        <div className="px-1 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <span className="font-line text-medium text-gray-500 mr-2">{id}. </span>
            <span className="text-medium font-line text-ellipsis whitespace-nowrap">{title}</span>
        </div>
    );
};

export default ProblemItem;
