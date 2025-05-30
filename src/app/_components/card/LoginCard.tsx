// src/app/_components/card/LoginCard.tsx
import React from "react";
import { Card } from "@nextui-org/react";

interface LoginCardProps {
    children: React.ReactNode;
    className?: string;
}

const LoginCard = ({ children, className = "" }: LoginCardProps) => (
    <Card className={`w-full max-w-sm shadow-lg flex flex-col items-center py-36 px-10 ${className}`}>{children}</Card>
);

export default LoginCard;
