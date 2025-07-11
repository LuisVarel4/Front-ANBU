import { Menu, X } from "lucide-react";
import React from "react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
  background: string;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  toggle,
  background,
}) => {
  const isRedBg = background === "red";
  const textColor = isRedBg ? "text-gray3-anbu" : "text-black-anbu";
  return (
    <button
      onClick={toggle}
      className="rounded-md p-2 transition-colors hover:bg-white/10"
    >
      {isOpen ? (
        <X className="text-gray3-anbu h-6 w-6" />
      ) : (
        <Menu className={`h-6 w-6 ${textColor}`} />
      )}
    </button>
  );
};

export default MobileMenuButton;
