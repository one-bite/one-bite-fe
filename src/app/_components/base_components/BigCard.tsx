import React from "react";
import { Card } from "@nextui-org/react";

interface BigCardProps {
    children: React.ReactNode;
    className?: string;
}

const BigCard = ({ children, className = "" }: BigCardProps) => {
    return (
        <Card className={`flex justify-center items-center m-16 rounded-3xl ${className}`}>
            {children}
        </Card>
    );
};

export default BigCard;
