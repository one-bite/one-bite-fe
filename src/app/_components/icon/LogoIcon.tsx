import React from "react";

interface LogoIconProps {
    size?: number;
    className?: string;
}

export const Logo : React.FC<LogoIconProps> = ({size = 36, className=""}) => (
    <div className="">
        <svg className={`text-white ${className}`} width={size} height={size} viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path
                    d="M80.3333 124.556H80.4022M101 90.1111H101.069M66.5556 83.2222H66.6244M121.667 124.556H121.736M163 97C163 131.242 135.242 159 101 159C66.7584 159 39 131.242 39 97C39 62.7584 66.7584 35 101 35C101 54.0231 113.337 69.4444 128.556 69.4444C128.556 84.6627 143.977 97 163 97Z"
                    stroke="currentColor"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    </div>
);
