import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

function MobileMenuButton({ isOpen, toggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-white/10 transition-colors"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-gray3-anbu" />
      ) : (
        <Menu className="w-6 h-6 text-black-anbu" />
      )}
    </button>
  );
}

export default MobileMenuButton; 