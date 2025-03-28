"use client";

import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, Link, DropdownTrigger, Dropdown, Avatar } from "@nextui-org/react";
import Menu from "./Menu";
import { Logo } from "./icon/LogoIcon";
import UserStats from "./UserStats"; // 추가!

export default function App() {
    const pathname = usePathname();

    return (
        <Navbar className="bg-violet">
            <NavbarBrand>
                <Link href="/" className="flex items-center">
                    <Logo />
                    <p className="font-bold text-white text-lg">한입코딩</p>
                </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end" className="items-center gap-6">
                <UserStats /> {/* ✅ 아바타 왼쪽에 삽입 */}
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="default"
                            name="Jason Hughes"
                            size="sm"
                            src="/defaultAvatar.png"
                        />
                    </DropdownTrigger>
                    <Menu />
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
