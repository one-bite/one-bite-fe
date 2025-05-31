"use client";

import { useRouter } from "next/navigation";
import PythonIcon from "app/_components/icon/PythonIcon";
import MainSectionCard from "../card/MainSectionCard";

interface ResumeCourseButtonProps {
    courseName?: string;
}

const ResumeCourseButton = ({ courseName = "Python" }: ResumeCourseButtonProps) => {
    const router = useRouter();

    const handleClick = async () => {
        router.push(`/quiz`);
    };

    return (
        <MainSectionCard minHeight="160px">
            <div className="flex flex-col justify-between h-full gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-full p-2 flex items-center justify-center">
                        <PythonIcon />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-blue-700">{courseName}</div>
                        <div className="text-gray-500 text-sm">문제 이어 풀기</div>
                    </div>
                </div>
                <button
                    className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition mt-2"
                    onClick={handleClick}
                >
                    이어서 풀기
                </button>
            </div>
        </MainSectionCard>
    );
};

export default ResumeCourseButton;
