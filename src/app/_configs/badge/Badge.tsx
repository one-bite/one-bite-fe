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
    const bgColor = badgeColorMap[level] ?? "bg-lime-500";

    return (
        <div className="flex flex-col items-center mx-3 md:mx-4 mt-2 md:mt-2">
            <div
                className={`rounded-full flex items-center justify-center shadow ${bgColor}`}
                style={{width: size, height: size}}
            >
                {bgColor == "bg-lime-500" ? (
                    <Icon className={`text-gray-300 size-11`}/>
                ) : (
                    <Icon className={`text-white size-11`}/>
                )}
            </div>
            <span className={`mt-1 text-center ${labelColor} text-sm md:text-xs font-linebold`}>
        {name}
      </span>
        </div>
    );
};

export default Badge;