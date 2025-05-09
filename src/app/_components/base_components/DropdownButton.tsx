//드랍다운 목록 기초 컴포넌트 구현
"use client"

import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import {ChevronDown} from "lucide-react";


interface BigButtonProps {
    options: string[];
    onSelect: (value: string) => void;
    selected: string;
}

const BigButton = ({ options, onSelect, selected }: BigButtonProps) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" endContent={<ChevronDown size={16}/>}>{selected}</Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => onSelect(key.toString())}>
                {options.map((opt) => (
                    <DropdownItem key={opt}>{opt}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default BigButton;
