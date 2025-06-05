import {
    PencilSquareIcon,
    FlagIcon,
    FireIcon,
    TrophyIcon,
    MagnifyingGlassIcon,
    AcademicCapIcon,
    BoltIcon,
} from "@heroicons/react/24/solid";

export const badgeIconMap: Record<string, { name: string; icon: React.FC<{ className?: string }> }> = {
    "1": { name: "우등생", icon: PencilSquareIcon },
    "2": { name: "모범생", icon: FlagIcon },
    "3": { name: "꾸준함", icon: FireIcon },
    "4": { name: "오늘의 도전", icon: TrophyIcon },
    "5": { name: "한 우물 파기", icon: MagnifyingGlassIcon },
    "6": { name: "척척 박사", icon: AcademicCapIcon },
    "7": { name: "도전자", icon: BoltIcon },
};
