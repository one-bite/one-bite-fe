import GoogleIcon from "@/app/_components/icon/GoogleIcon";
import { Button } from "@nextui-org/react";
import React from "react";

interface GoogleLoginButtonProps {
    onClick: () => void;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => (
    <Button
        fullWidth
        className="bg-white text-black border border-gray-200 shadow font-semibold text-base py-6 hover:bg-gray-50 transition mt-8"
        startContent={<GoogleIcon />}
        onPress={onClick}
    >
        Google 로그인
    </Button>
);

export default GoogleLoginButton;
