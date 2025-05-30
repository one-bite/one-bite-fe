import MainSectionCard from "./MainSectionCard";

export default function BadgeCard() {
    return (
        <MainSectionCard minHeight="240px">
            <div className="flex flex-col justify-between h-full gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-3">획득한 뱃지</h2>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex flex-col items-center">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 flex items-center justify-center text-2xl shadow">
                                🏅
                            </span>
                            <span className="text-xs mt-1 text-gray-700">5일 연속</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-300 to-pink-500 flex items-center justify-center text-2xl shadow">
                                🔥
                            </span>
                            <span className="text-xs mt-1 text-gray-700">스트릭 10회</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-300 to-blue-500 flex items-center justify-center text-2xl shadow">
                                💡
                            </span>
                            <span className="text-xs mt-1 text-gray-700">첫 문제풀이</span>
                        </div>
                    </div>
                </div>
                <a href="#" className="inline-block mt-4 text-indigo-600 text-sm font-semibold hover:underline">
                    전체 뱃지 보기 →
                </a>
            </div>
        </MainSectionCard>
    );
}
