"use client";

import React from "react";
import IconButton from "../header/IconButton";
import AlgorithmIcon from "../icon/AlgorithmIcon";
import PythonIcon from "../icon/PythonIcon";
import JavaScriptIcon from "../icon/JavaScriptIcon";


interface CourseButtonProps {
  iconType: "algorithm" | "javascript" | "python";
  label: string;
  bgColor: string;
  onClick?: () => void;
}

const CourseButton: React.FC<CourseButtonProps> = ({
  iconType,
  label,
  bgColor,
  onClick,
}) => {
  let icon;
  switch (iconType) {
    case "algorithm":
      icon = <AlgorithmIcon />;
      break;
    case "javascript":
      icon = <JavaScriptIcon />;
      break;
    case "python":
      icon = <PythonIcon />;
      break;
    default:
      icon = <AlgorithmIcon />;
  }
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className={`rounded-full p-1 ${bgColor}`}>
        <IconButton
          icon={icon}
          color="primary"
          variant="light"
          size="sm"
          ariaLabel={label}
          hovermsg=""
          onPress={() => {}}
        />
      </div>
      <span className="text-sm font-line text-gray-800">{label}</span>
    </div>
  );
};

export default CourseButton;
