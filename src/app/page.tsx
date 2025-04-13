"use client";

import { Github, Link } from "lucide-react";
import DailyStreakCard from "app/_components/card/DailyStreakCard";
import ResumeCourseButton from "app/_components/buttons/ResumeCourseButton";

export default function Page() {
    return (
        <>
            <div>
                <DailyStreakCard className="m-16" streakleftquiz={10}/>
            </div>
            <div>
                <ResumeCourseButton subject={"Python"}/>
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
