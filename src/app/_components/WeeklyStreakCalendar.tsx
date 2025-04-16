import { format, startOfWeek, addDays } from "date-fns";

interface WeeklyStreakCalendarProps {
    streakDates: Date[]; // 스트릭 성공 날짜
}

const WeeklyStreakCalendar = ({ streakDates }: WeeklyStreakCalendarProps) => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 0 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    // 날짜만 문자열로 비교 (ex: 2025-04-15)
    const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
    const streakDateStrings = streakDates.map(formatDate);

    return (
        <div className="flex gap-2">
            {days.map((date, idx) => {
                const dateStr = formatDate(date);
                const isFuture = date > today;
                const isStreak = streakDateStrings.includes(dateStr);

                const bgColor = isStreak
                    ? "bg-lime-400"
                    : isFuture
                        ? "bg-gray-200"
                        : "bg-gray-400";

                return (
                    <div
                        key={idx}
                        className={`w-10 h-[72px] rounded-full flex flex-col items-center justify-between ${bgColor} text-black font-linebold`}
                    >
                        <div className="text-sm mt-2">{weekDays[idx]}</div>
                        <div className="w-8 h-8 mb-2 bg-white rounded-full flex my-0 items-center justify-center text-gray-800 text-sm">
                            {format(date, "d")}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeeklyStreakCalendar;

