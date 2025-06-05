import {
    CheckCircleIcon,
    BookOpenIcon,
    FireIcon,
    CursorArrowRaysIcon,
    BeakerIcon,
    LightBulbIcon,
    BoltIcon,
    PlayCircleIcon,
    TrophyIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

export const badgeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "우등생": CheckCircleIcon,
    "모범생": BookOpenIcon,
    "꾸준함": FireIcon,
    "오늘의 도전": CursorArrowRaysIcon,
    "한 우물 파기": BeakerIcon,
    "척척 박사": LightBulbIcon,
    "도전자": BoltIcon,
    "자, 이제 시작이야": PlayCircleIcon,
    "내 등급은?": TrophyIcon,
    "죄송합니다": ExclamationTriangleIcon,
};
