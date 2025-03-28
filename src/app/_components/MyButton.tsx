"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

const MyButton = ({ className = "", children, ...props }: ButtonProps) => {
    return (
        <Button
            variant="solid"
            className={`bg-green-500 text-white 
                  shadow-[0_4px_0_#2e7d32]
                  hover:bg-green-400
                  active:translate-y-[2px] active:shadow-[0_2px_0_#2e7d32]
                  transition-all font-bold rounded-xl px-6 py-2 text-base
                  ${className}`}
            {...props}
        >
            {children}
        </Button>
    );
};

export default MyButton;
