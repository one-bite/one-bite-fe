import React from "react";
import { Card } from "@nextui-org/react";

interface BigCardProps {
    children: React.ReactNode;
    className?: string;
}

const BigCard = ({ children, className = "" }: BigCardProps) => {
    return (
        <Card className={`w-[280px] h-[220px] rounded-3xl ${className}`}>
            {children}
        </Card>
    );
};

export default BigCard;
