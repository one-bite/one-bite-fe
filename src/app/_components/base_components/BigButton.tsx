import React from "react";
import { Button } from "@nextui-org/react";

interface BigButtonProps {
    children: React.ReactNode;
    className?: string;
}

const BigButton = ({ children, className = "" }: BigButtonProps) => {
    return (
        <Button className={`bg-white rounded-3xl 
        shadow-[0_6px_0] 
        hover:bg-blue-500
        active:translate-y-[4px] 
        active:shadow-[0_2px_0] 
        transition-all duration-150 ease-in-out 
        ${className}`}>
            {children}
        </Button>
    );
};

export default BigButton;
