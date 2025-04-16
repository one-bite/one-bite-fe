"use client";

import Image from "next/image"; // next/image 임포트

export default function Footer() {
  return (
    <footer className="mt-16 p-8 text-black">
      <div className="flex justify-center items-center max-w-7xl mx-auto space-x-40">
        {/* 왼쪽: 로고 및 간단한 링크들 */}
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl font-jungM">한입코딩</span>
            <span className="text-xs font-jungM">매일 10문제</span>
          </div>
          <div className="flex gap-4 justify-center">
            {/* YouTube 아이콘 이미지 */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <Image
                src="/icons/youtube-icon.png"
                alt="YouTube"
                width={24}
                height={24}
                priority
              />
            </a>
            {/* GitHub 아이콘 이미지 */}
            <a
              href="https://github.com/one-bite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <Image
                src="/icons/github-icon.png"
                alt="GitHub"
                width={24}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        {/* 중앙: Use cases */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Use cases</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-600 hover:text-black">UI design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">UX design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Wireframing</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Explore</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-600 hover:text-black">Design</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Prototyping</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Development features</a></li>
          </ul>
        </div>

        {/* 우측: Resources */}
        <div className="space-y-2">
          <h4 className="text-xl font-semibold">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-gray-600 hover:text-black">Blog</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Best practices</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Colors</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
