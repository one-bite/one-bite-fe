"useclinet";

import BigButton from "app/_components/base_components/BigButton";

interface ResumeCourseButtonProps {
    subject?: string;
}

const ResumeCourseButton = ({subject}: ResumeCourseButtonProps ) => {
  return (
      <BigButton className="m-16 mt-4 p-8 w-[280px] h-[220px] bg-blue-500 text-white justify-start items-start shadow-[0_6px_0_#3B82F6] active:shadow-[0_2px_0_#3B82F6]">
          <div>
              <h1 className="text-5xl font-jungM">{subject}</h1>
              <p className="text-lg font-linebold">문제 이어 풀기</p>
          </div>
      </BigButton>
  );
}

export default ResumeCourseButton;
