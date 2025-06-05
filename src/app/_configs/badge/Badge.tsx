import {badgeIconMap} from "app/_configs/badge/badgeIconMap";
import {badgeColorMap} from "app/_configs/badge/badgeColorMap";

interface BadgeProps {
    id: string;
    level: keyof typeof badgeColorMap;
    size?: number;
    labelColor?: string;
}

const Badge = ({id, level, size = 64, labelColor="text-black"}:BadgeProps) => {
    const icon = badgeIconMap[id];
    if (!icon) return null;

    const {name, icon: Icon} = icon;
    const bgColor = badgeColorMap[level] ?? "bg-gray-500";

    const badgeSize = size * 0.6;

    return (
        <div className="flex flex-col items-center mx-2 md:mx-3 mt-4 md:mt-5">
            <div
                className={`rounded-full flex items-center justify-center shadow ${bgColor}`}
                style={{width: size, height: size}}
            >
                <Icon className={`text-white size-12`}/>
            </div>
            <span className={`mt-1 text-center ${labelColor} text-medium font-linebold`}>
        {name}
      </span>
        </div>
    );
};

export default Badge;