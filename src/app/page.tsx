"use client";

import { Github, Link } from "lucide-react";
import DailyStreakCard from "app/_components/card/DailyStreakCard";
import CourseButton from "./_components/buttons/CourseButton";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";

export default function Page() {
    return (
        <>
            <div>
                <DailyStreakCard className="m-8" streakleftquiz={10} />
                <div className="flex gap-2 justify-start mt-2 max-w-4xl mx-auto">
                    <CourseButton iconType="algorithm" label="알고리즘" bgColor="bg-purple-200" />
                    <CourseButton iconType="javascript" label="자바스크립트" bgColor="bg-yellow-200" />
                    <CourseButton iconType="python" label="파이썬 기초" bgColor="bg-blue-200" />
                </div>
            </div>
            <div>
                <ResumeCourseButton courseName={"Python"}/>
            </div>
            <footer className="mt-16 p-4">
                <div className="flex justify-center space-x-4">
                    <a
                        href="https://github.com/code-spaghetti-2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-gray-400"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://github.com/code-spaghetti-2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-gray-400"
                    >
                        <Link size={20} />
                    </a>
                </div>
                <div className="text-center text-xs text-gray-400 mt-4">
                    <p>2025 캡스톤디자인 한입코딩</p>
                </div>
            </footer>
        </>
    );
}
