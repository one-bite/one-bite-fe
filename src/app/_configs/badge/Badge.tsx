import {badgeIconMap} from "app/_configs/badge/badgeIconMap";
import {badgeColorMap} from "app/_configs/badge/badgeColorMap";

interface BadgeProps {
    name: string;
    level: keyof typeof badgeColorMap;
    size?: number;
    labelColor?: string;
}

const Badge = ({name, level, size, labelColor="text-white"}:BadgeProps) => {
    const Icon = badgeIconMap[name];
    const bgColor = badgeColorMap[level] ?? "bg-gray-500";

    return (
        <div className={`${bgColor} inline-flex mx-2 md:mx-5 rounded-full pt-1 px-0.5 items-center justify-center mt-4 md:mt-5`}>
            {Icon &&
                <Icon className={'w-full h-full px-1 py-1'}/>
            }
            <span className={`${labelColor} font-linebold`}>
                {name}
            </span>
        </div>
    );
};

export default Badge;