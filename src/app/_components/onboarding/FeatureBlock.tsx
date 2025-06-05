import React from "react";

interface FeatureBlockProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureBlock = ({ icon, title, description }: FeatureBlockProps) => (
    <div className="flex items-center gap-6 bg-white rounded-2xl shadow p-6">
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center text-2xl font-bold">{icon}</div>
        <div className="text-left">
            <h2 className="text-xl font-bold mb-1">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default FeatureBlock;
