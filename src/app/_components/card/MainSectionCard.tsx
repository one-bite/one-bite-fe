import React from "react";

interface MainSectionCardProps {
    children: React.ReactNode;
    className?: string;
    minHeight?: string;
}

export default function MainSectionCard({ children, className = "", minHeight }: MainSectionCardProps) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between h-full ${className}`}
            style={{ minHeight: minHeight || "240px" }}
        >
            {children}
        </div>
    );
}
