import MainSectionCard from "./MainSectionCard";

export default function RecentActivityCard() {
    return (
        <MainSectionCard minHeight="240px">
            <div className="flex flex-col justify-between h-full gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">최근 학습 활동</h2>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            06.08 Python <span className="font-medium text-indigo-600">for문 심화</span> 문제 풀이 완료
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            06.08 JavaScript <span className="font-medium text-orange-600">기본 문법</span> 복습
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            06.07 SQL <span className="font-medium text-green-600">JOIN 쿼리</span> 학습
                        </li>
                    </ul>
                </div>
                <a href="#" className="inline-block mt-4 text-indigo-600 text-sm font-semibold hover:underline">
                    전체 기록 보기 →
                </a>
            </div>
        </MainSectionCard>
    );
}
