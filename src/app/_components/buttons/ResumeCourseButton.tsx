"useclinet";

import {useRouter} from "next/navigation";
import BigButton from "app/_components/base_components/BigButton";

interface ResumeCourseButtonProps {
    courseName?: string;
}

const ResumeCourseButton = ({courseName}: ResumeCourseButtonProps ) => {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/quiz`)
    }

    return (
        <BigButton onClick={handleClick} className="m-16 mt-4 mr-2 p-8 w-[300px] h-[220px] bg-blue-400 hover:bg-blue-400 text-white justify-start items-start shadow-[0_12px_0_#3B82F6] active:shadow-[0_8px_0_#3B82F6]">
            <div className="text-left">
                <h1 className="text-5xl font-jungM">{courseName}</h1>
                <p className="text-lg font-linebold">문제 이어 풀기</p>
                <div>
                    여기에 코스 진척도 보여주는 UI
                </div>
            </div>
        </BigButton>
    );
}

export default ResumeCourseButton;
