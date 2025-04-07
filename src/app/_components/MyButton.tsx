"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface MyButtonProps extends ButtonProps {
    className?: string;
    children: ReactNode;
}

const MyButton = ({ className = "", children, ...props }: MyButtonProps) => {

    const defaultClass = `
        bg-lime-500 text-white
        font-bold text-base
        px-6 py-2
        rounded-x1
        shadow-[0_4px_0_#2e7d32]
        hover:bg-lime-600
        active:translate-y-[2px] active:shadow-[0_2px_0_#2e7d32]
        transition-all
    `;

    return (
        <Button
            variant="solid"
            className={`${defaultClass} ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
};

export default MyButton;
